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
  alignment?: "krc-primary";
};

export type Credit = {
  label: string;
  value: string;
};

export type LyricPayload = {
  source: {
    primary: string;
    references: string[];
  };
  songId: string;
  title: string;
  artist: string;
  audioDurationMs: number;
  intro: {
    credits: Credit[];
    vocalises: TimedLine[];
  };
  lines: TimedLine[];
};

export type LayoutKind = "stack" | "split" | "stair" | "banner" | "editorial";
export type TextMotion =
  | "slide"
  | "stamp"
  | "shutter"
  | "tilt"
  | "stretch"
  | "rise";

export type HighlightRule = {
  term: string;
  color: "accent" | "secondary" | "foreground";
  font?: "display" | "serif" | "body";
  scale?: number;
};

export type LyricSurfaceVariant =
  | "solid"
  | "outline"
  | "rail"
  | "double"
  | "underline"
  | "ticket";

export type LyricLineStyle = {
  surface: string;
  foreground: string;
  accent: string;
  secondary: string;
  detail: string;
  variant: LyricSurfaceVariant;
};

export type LyricPage = {
  id: string;
  lineIndexes: number[];
  startMs: number;
  endMs: number;
  theme: number;
  layout: LayoutKind;
  motion: TextMotion;
  scene: string;
  highlights: HighlightRule[];
};
