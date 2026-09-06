export type TimedUnit = {
  text: string;
  index: number;
  startMs: number;
  endMs: number;
};

export type TimedLine = {
  id: string;
  text: string;
  startMs: number;
  endMs: number;
  kind: "credit" | "vocalise" | "lyric";
  characters: TimedUnit[];
};

export type LyricPayload = {
  title: string;
  artist: string;
  audioDurationMs: number;
  intro: {
    credits: Array<{ label: string; value: string }>;
    vocalises: TimedLine[];
  };
  lines: TimedLine[];
};

export const SCENE_KINDS = [
  "notebook-open",
  "doodle-arrows",
  "heartbeat-sketch",
  "lightbulb-moment",
  "apple-fall",
  "receipt-rain",
  "coin-scatter",
  "tag-dance",
  "sofa-sketch",
  "toy-parade",
  "checklist-check",
  "sticky-wall",
  "barcode-scan",
  "spiral-spin",
  "coffee-stain",
  "tape-strip",
  "price-slash",
  "wallet-empty",
  "piggy-bank",
  "shopping-cart",
  "cash-register",
  "countdown-zero",
  "echo-notes",
  "finale-fold",
] as const;

export type SceneKind = (typeof SCENE_KINDS)[number];

export type LayoutKind = "sticky" | "stack" | "scatter" | "receipt" | "list";

export type SurfaceKind = "sticky" | "receipt" | "plain" | "torn";

export type StickyStyle = "yellow" | "pink" | "blue" | "white" | "green";

export type TextMotion = "write" | "stamp" | "type" | "underline";

export type FontRole = "body" | "impact" | "latin" | "mono";

export type HighlightRule = {
  term: string;
  color: "marker" | "ballpoint" | "highlighter" | "ink";
  font: FontRole;
  scale?: number;
};

export type PagePalette = {
  paper: string;
  ink: string;
  pencil: string;
  marker: string;
  highlighter: string;
  ballpoint: string;
  stickyBg: string;
  stickyBorder: string;
};

export type LyricPage = {
  id: string;
  index: number;
  lineIndexes: number[];
  startMs: number;
  endMs: number;
  scene: SceneKind;
  layout: LayoutKind;
  surface: SurfaceKind;
  stickyStyle: StickyStyle;
  motion: TextMotion;
  palette: PagePalette;
  highlights: HighlightRule[];
};
