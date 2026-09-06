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
  artists: string[];
  album: string;
  language: string;
  audioDurationMs: number;
  source: {
    platform: string;
    format: string;
    designation: string;
    songPage: string;
    lyricId: string;
    lyricDurationMs: number;
  };
  credits: TimedLine[];
  lines: TimedLine[];
};

export const SCENE_KINDS = [
  "temperament-shutter",
  "fragments-vault",
  "patience-thread",
  "dark-light-exposure",
  "shared-contact-sheet",
  "romance-emulsion",
  "farewell-listen",
  "color-proof",
  "dandelion-first",
  "memory-control",
  "water-listen",
  "departure-platform",
  "inertia-drawer",
  "ideal-exposure",
  "shared-index",
  "romance-negative",
  "promise-replay",
  "spectrum-stain",
  "dandelion-reverse",
  "memory-transfer",
  "water-ceiling",
  "farewell-dock",
  "dandelion-field",
  "memory-peel",
  "water-ground",
  "last-empty-frame",
] as const;

export type SceneKind = (typeof SCENE_KINDS)[number];
export type LayoutKind = "stack" | "offset" | "split" | "cinema" | "wide";
export type SurfaceKind = "mount" | "silver" | "strip" | "matte" | "glass";
export type TextMotion =
  | "expose"
  | "settle"
  | "slide"
  | "unlock"
  | "breathe"
  | "register";
export type FontRole = "body" | "impact" | "memory" | "latin";

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
  scene: SceneKind;
  layout: LayoutKind;
  surface: SurfaceKind;
  motion: TextMotion;
  palette: PagePalette;
  highlights: HighlightRule[];
};
