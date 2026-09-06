import raw from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { LyricPayload, TimedLine } from "./types";

export const lyricData = raw as LyricPayload;
export const lyricLines: TimedLine[] = lyricData.lines;
export const creditLines = lyricData.intro.credits;
export const vocalises = lyricData.intro.vocalises;
export const AUDIO_DURATION_MS = lyricData.audioDurationMs;
export const FPS = 60;
export const DURATION_IN_FRAMES = Math.ceil((AUDIO_DURATION_MS / 1000) * FPS);
export const OVERLAP_FRAMES = Math.round(0.26 * FPS);

export const msToFrame = (ms: number) => Math.round((ms / 1000) * FPS);
