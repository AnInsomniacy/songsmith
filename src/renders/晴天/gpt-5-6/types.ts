import type { TimedLine } from "../../../lib/lyrics";
export type { TimedLine, TimedUnit } from "../../../lib/lyrics";

export type LyricPayload = {
  source: {
    provider: string;
    songId: number;
    songMid: string;
    title: string;
    artist: string;
    album: string;
    retrievedAt: string;
  };
  audioDurationMs: number;
  lines: TimedLine[];
};
