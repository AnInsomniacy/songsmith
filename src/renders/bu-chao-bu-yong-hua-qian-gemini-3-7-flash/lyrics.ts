import raw from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { TimedLine } from "./types";

type RawPayload = {
  title: string;
  artist: string;
  audioDurationMs: number;
  intro: {
    credits: { label: string; value: string }[];
    vocalises: TimedLine[];
  };
  lines: TimedLine[];
};

const payload = raw as unknown as RawPayload;

export const AUDIO_DURATION_MS = payload.audioDurationMs;
export const SONG_TITLE = payload.title;
export const SONG_ARTIST = payload.artist;
export const INTRO_CREDITS = payload.intro.credits;
export const INTRO_VOCALISES = payload.intro.vocalises;

export const lyricLines: TimedLine[] = payload.lines.map((line, index) => ({
  ...line,
  id: line.id || `line-${index}`,
}));

export const allLines: TimedLine[] = [...INTRO_VOCALISES, ...lyricLines];
