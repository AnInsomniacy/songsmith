export type TimedUnit = {
  text: string;
  index: number;
  startMs: number;
  endMs: number;
  kind?: "vocal" | "layout";
  nativeText?: string;
};

export type TimedLine = {
  id: string;
  text: string;
  startMs: number;
  endMs: number;
  kind: "credit" | "vocalise" | "lyric";
  units: TimedUnit[];
  translation?: string;
};
