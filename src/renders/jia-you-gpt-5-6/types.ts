export type TimedUnit = {text: string; index: number; startMs: number; endMs: number};
export type TimedLine = {
  id: string;
  text: string;
  startMs: number;
  endMs: number;
  kind: "credit" | "lyric";
  characters: TimedUnit[];
};
export type Palette = {
  background: string;
  backgroundAlt: string;
  surface: string;
  foreground: string;
  accent: string;
  secondary: string;
  detail: string;
};
export type Highlight = {term: string; color: "accent" | "secondary"; font?: "display" | "body" | "english"; scale?: number};
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
