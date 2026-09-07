import raw from "../../../../public/songs/我的回忆不是我的/data/lyrics.json";
import type { LyricPayload, TimedLine } from "./types";

export const lyricData = raw as LyricPayload;
export const lyricLines: TimedLine[] = lyricData.lines;
export const creditLines: TimedLine[] = lyricData.credits;
export const AUDIO_DURATION_MS = lyricData.audioDurationMs;
export const FPS = 60;
export const DURATION_IN_FRAMES = Math.ceil((AUDIO_DURATION_MS / 1000) * FPS);
