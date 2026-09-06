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

export const SCENE_KINDS = [
  "power-screen",
  "window-promise",
  "pinball-left",
  "note-heartbeat",
  "shoot-apple",
  "countdown-seat",
  "coin-slot",
  "reel-spend",
  "prize-unbuyable",
  "speaker-rumor",
  "clone-rows",
  "shoot-apple-reprise",
  "countdown-seat-reprise",
  "coin-slot-close",
  "reel-jackpot",
  "prize-reject",
  "sofa-treasures",
  "sofa-closeup",
  "sign-flicker",
  "window-late-night",
  "coin-slot-final",
  "reel-break",
  "prize-empty",
  "shutdown",
  "last-sign",
  "final-coin",
] as const;

export type SceneKind = (typeof SCENE_KINDS)[number];
export type LayoutKind = "screen-single" | "screen-duo" | "split-machine";
export type SurfaceKind = "crt" | "panel";
export type TextMotion = "refresh" | "coin";
export type FontRole = "body" | "impact" | "latin" | "sign";

export type HighlightRule = {
  term: string;
  color: "accent" | "secondary" | "foreground";
  font?: FontRole;
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

export type BuChaoPayload = {
  title: string;
  artist: string;
  audioDurationMs: number;
  intro: {
    credits: { label: string; value: string }[];
    vocalises: TimedLine[];
  };
  lines: TimedLine[];
};
