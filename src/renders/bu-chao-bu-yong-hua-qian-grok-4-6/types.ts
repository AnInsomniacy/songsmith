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
  kind: "lyric" | "vocalise";
  characters: TimedUnit[];
};

export type Credit = { label: string; value: string };

export type LyricPayload = {
  source: { primary: string; references: string[] };
  songId: string;
  title: string;
  artist: string;
  audioDurationMs: number;
  intro: { credits: Credit[]; vocalises: TimedLine[] };
  lines: TimedLine[];
};

export type FontRole = "body" | "impact" | "latin";
export type LayoutKind = "stack" | "offset" | "split";
export type TextMotion = "stamp" | "lift" | "knock" | "pinch" | "drop";
export type AcrosticMode = "none" | "nail" | "hold" | "restamp";

export const SCENE_KINDS = [
  "curtain-lift",
  "name-drop",
  "left-stamp",
  "pulse-open",
  "apple-fall",
  "sit-down",
  "knock-pinch",
  "nail-skill",
  "rumor-walk",
  "clone-stop",
  "apple-side",
  "seat-spot",
  "door-refuse",
  "coin-slide",
  "climb-toys",
  "occupy-sofa",
  "crowd-sofa",
  "empty-corner",
  "look-back",
  "already-there",
  "restamp-title",
  "skill-closeup",
  "english-wide",
  "english-near",
  "plaid-face",
  "light-left",
  "punch-out",
] as const;

export type SceneKind = (typeof SCENE_KINDS)[number];

export type HighlightRule = {
  term: string;
  color: "accent" | "secondary" | "foreground";
  font: FontRole;
  scale?: number;
};

export type PagePalette = {
  background: string;
  backgroundAlt: string;
  surface: string;
  foreground: string;
  accent: string;
  secondary: string;
  detail: string;
  light: string;
};

export type LyricPage = {
  id: string;
  index: number;
  lineIndexes: number[];
  startMs: number;
  endMs: number;
  startFrame: number;
  durationFrames: number;
  scene: SceneKind;
  layout: LayoutKind;
  motion: TextMotion;
  palette: PagePalette;
  highlights: HighlightRule[];
  acrostic: number;
  acrosticMode: AcrosticMode;
};
