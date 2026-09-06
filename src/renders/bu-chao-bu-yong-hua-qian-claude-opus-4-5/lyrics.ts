import raw from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { LyricPayload, TimedLine } from "./types";

const payload = raw as unknown as LyricPayload;

export const AUDIO_DURATION_MS = payload.audioDurationMs;
export const SONG_TITLE = payload.title;
export const SONG_ARTIST = payload.artist;
export const INTRO_CREDITS = payload.intro.credits;
export const INTRO_VOCALISES = payload.intro.vocalises;

export const lyricLines: TimedLine[] = payload.lines.map((line, index) => ({
  ...line,
  id: line.id || `line-${index}`,
}));

export const allLines: TimedLine[] = [
  ...INTRO_VOCALISES,
  ...lyricLines,
];
