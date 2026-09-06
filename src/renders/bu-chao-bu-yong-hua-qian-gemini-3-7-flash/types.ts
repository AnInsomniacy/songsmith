export type TimedUnit = {
  text: string;
  startMs: number;
  endMs: number;
  index: number;
};

export type TimedLine = {
  id: string;
  text: string;
  startMs: number;
  endMs: number;
  kind?: "credit" | "vocalise" | "lyric";
  characters: TimedUnit[];
};

export type HighlightColor = "voltage" | "crimson" | "ultramarine" | "white" | "dark";
export type FontRole = "display" | "body" | "mono" | "wenkai";

export type Highlight = {
  term: string;
  color: HighlightColor;
  font?: FontRole;
  scale?: number;
};

export type LayoutMode =
  | "offset-left"
  | "offset-right"
  | "center-card"
  | "split-horizontal"
  | "magazine-spread"
  | "street-banner"
  | "compact-stack";

export type SurfaceType =
  | "woven-label"
  | "perforated-ticket"
  | "duotone-plate"
  | "screenprint-card"
  | "stencil-box";

export type PagePalette = {
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  voltage: string;
  ultramarine: string;
  crimson: string;
  slate: string;
  detail: string;
};

export type LyricPage = {
  id: string;
  lineIndexes: number[];
  scene: string;
  verb: string;
  palette: PagePalette;
  paletteIndex: number;
  layout: LayoutMode;
  surface: SurfaceType;
  highlights: Highlight[];
  startMs: number;
  endMs: number;
};
