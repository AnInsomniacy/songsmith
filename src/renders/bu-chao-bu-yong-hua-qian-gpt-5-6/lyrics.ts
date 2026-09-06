import raw from  "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { LyricPayload, TimedLine } from "./types";

export const lyricData = raw as LyricPayload;
export const lyricLines: TimedLine[] = lyricData.lines;
export const AUDIO_DURATION_MS = 233_508;
export const FPS = 60;
export const DURATION_IN_FRAMES = Math.ceil((AUDIO_DURATION_MS / 1000) * FPS);
