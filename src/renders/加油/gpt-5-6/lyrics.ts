import raw from "../../../../public/songs/加油/data/lyrics.json";
import type { TimedLine } from "./types";

export const lyricData = raw as typeof raw & {
  lines: TimedLine[];
  credits: TimedLine[];
};
export const lyricLines = lyricData.lines;
export const FPS = 60;
export const DURATION_IN_FRAMES = Math.ceil(
  (lyricData.audioDurationMs / 1000) * FPS,
);
