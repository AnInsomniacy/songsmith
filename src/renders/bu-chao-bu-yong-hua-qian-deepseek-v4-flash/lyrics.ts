import raw from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { BuChaoPayload, TimedLine } from "./types";

export const payload = raw as BuChaoPayload;
export const lyricLines: TimedLine[] = payload.lines;
export const creditInfo: { label: string; value: string }[] =
  payload.intro.credits;
export const vocaliseLines: TimedLine[] = payload.intro.vocalises;
export const AUDIO_DURATION_MS = payload.audioDurationMs;
export const FPS = 60;
export const DURATION_IN_FRAMES = Math.ceil((AUDIO_DURATION_MS / 1000) * FPS);
