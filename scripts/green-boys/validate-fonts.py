"""Check downloaded, server-subsetted fonts against all actual on-screen text."""
import json
from pathlib import Path
from fontTools.ttLib import TTFont

base = Path(__file__).resolve().parents[2] / 'public/songs/green-boys'
data = json.loads((base / 'data/lyrics.json').read_text())
translations = json.loads((base / 'data/translations.json').read_text())
japanese = ''.join(row['text'] for row in data['lines'] if row['kind'] == 'lyric') + 'Green boys GReeeeN JIN WORDS · MUSIC ARRANGEMENT'
chinese = ''.join(translations['lines']) + '向前一点世界就打开一点未完成也继续前进日文原词中文释义'
for filename, text in [('Rounded.woff2', japanese), ('Dela.woff2', japanese), ('Klee.woff2', japanese), ('WenKai.woff2', chinese)]:
    font = TTFont(base / 'fonts' / filename)
    cmap = font.getBestCmap()
    missing = sorted(c for c in set(text) if not c.isspace() and ord(c) not in cmap)
    if missing:
        raise ValueError(filename + ': Missing glyphs ' + ''.join(missing))
    print(filename + ': all required glyphs present')
