export type { TimedLine, TimedUnit } from "../../../lib/lyrics";

export type Palette = {
  background: string;
  backgroundAlt: string;
  surface: string;
  foreground: string;
  accent: string;
  secondary: string;
  detail: string;
};
export type Highlight = {
  term: string;
  color: "accent" | "secondary";
  font?: "display" | "body" | "english";
  scale?: number;
};
export type LyricPage = {
  id: string;
  lineIndexes: number[];
  startMs: number;
  endMs: number;
  scene: string;
  palette: Palette;
  layout: "stack" | "offset" | "split" | "compact";
  surface: "card" | "banner" | "glass" | "ticket";
  highlights: Highlight[];
};
