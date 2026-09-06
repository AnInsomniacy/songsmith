"""Sample soundtrack comparison only; never certifies lyric-to-vocal audition."""
import json
from pathlib import Path
import subprocess
import sys
import numpy as np

root = Path(__file__).resolve().parents[2]
output = Path(sys.argv[1])
source = root / 'public/songs/one-last-kiss/audio/one-last-kiss.mp3'
probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(output)]))
video = next(s for s in probe['streams'] if s['codec_type'] == 'video')
audio = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
assert (video['width'], video['height'], video['avg_frame_rate'], int(video['nb_frames'])) == (1920, 1080, '60/1', 15122)
assert video['codec_name'] == 'h264' and audio['codec_name'] == 'aac' and audio['channels'] == 2

def pcm(path, start):
    return np.frombuffer(subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(path), '-ss', str(start), '-t', '4', '-vn', '-ac', '1', '-ar', '16000', '-f', 'f32le', 'pipe:1']), dtype='<f4').astype(np.float64)

checks = []
for start in [19.5, 149.0, 225.7]:
    a, b = pcm(source, start), pcm(output, start)
    n = min(len(a), len(b)); a = a[:n] - a[:n].mean(); b = b[:n] - b[:n].mean()
    size = 1 << (2*n-1).bit_length()
    corr = np.fft.irfft(np.fft.rfft(b, size) * np.conj(np.fft.rfft(a, size)), size)
    lags = np.arange(-3200, 3201)
    lag = int(lags[np.argmax(corr[lags % size])])
    aa, bb = (a[:n-lag], b[lag:]) if lag >= 0 else (a[-lag:], b[:n+lag])
    similarity = float(np.dot(aa, bb) / (np.linalg.norm(aa) * np.linalg.norm(bb)))
    checks.append({'startSeconds': start, 'offsetMs': lag/16, 'similarity': round(similarity, 6)})
print(json.dumps({'file': str(output), 'frames': int(video['nb_frames']), 'duration': float(probe['format']['duration']), 'bytes': int(probe['format']['size']), 'checks': checks, 'passed': all(abs(c['offsetMs']) <= 1000/60 and c['similarity'] > .98 for c in checks), 'scope': 'Sampled source/output audio agreement only. Native KRC retained; no human lyric-to-vocal audition certified.'}))
