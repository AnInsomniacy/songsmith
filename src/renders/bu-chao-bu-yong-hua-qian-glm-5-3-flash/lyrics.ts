import raw from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { LyricPayload, TimedLine } from "./types";

const payload = raw as unknown as LyricPayload;

import { FPS } from "./design";

export const AUDIO_DURATION_MS = payload.audioDurationMs;
export const DURATION_FRAMES = Math.ceil((AUDIO_DURATION_MS / 1000) * FPS);
export const SONG_TITLE = payload.title;
export const SONG_ARTIST = payload.artist;
export const INTRO_CREDITS = payload.intro.credits;
export const INTRO_VOCALISES = payload.intro.vocalises;

export const lyricLines: TimedLine[] = payload.lines;

export const lineAt = (index: number): TimedLine => {
  const line = lyricLines[index];
  if (!line) throw new Error("Missing lyric line: " + index);
  return line;
};

export const localFrame = (
  ms: number,
  pageStartMs: number,
  fps: number,
): number => Math.round(((ms - pageStartMs) / 1000) * fps);
