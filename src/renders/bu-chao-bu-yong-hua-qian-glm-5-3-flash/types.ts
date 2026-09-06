export type TimedUnit = {
  text: string;
  index: number;
  startMs: number;
  endMs: number;
};

export type TimedLine = {
  id?: string;
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

export type AccentKey = "red" | "yellow" | "teal" | "orange" | "ink" | "milk";

export type MarkColor =
  | "accent"
  | "support"
  | "ink"
  | "hot"
  | "hot2"
  | "base";

export type MarkRole = "impact" | "body" | "latin";

export type Mark = {
  term: string;
  color: MarkColor;
  role: MarkRole;
  scale?: number;
};

export type CarrierKind = "tag" | "pop" | "receipt" | "led" | "plaque" | "banner";

export type LineBox = { x: number; y: number; width: number; max: number };

export type SceneKey =
  | "prelude"
  | "mirror"
  | "shelf"
  | "escalator"
  | "jewelry"
  | "lamps"
  | "flipwall"
  | "shopwindow"
  | "gacha"
  | "register"
  | "atrium"
  | "broadcast"
  | "racks"
  | "tvwall"
  | "foodcourt"
  | "autodoor"
  | "flags"
  | "wallet"
  | "sofa1"
  | "sofa2"
  | "mirrorhall"
  | "mirrorhall2"
  | "closingpa"
  | "shutter"
  | "nightwindow"
  | "stuckdoor"
  | "bannerdown"
  | "lastlights"
  | "finale";

export type Page = {
  id: string;
  scene: SceneKey;
  title: string;
  floor: string;
  dept: string;
  startMs: number;
  lines: number[];
  layout: LineBox[];
  carrier: CarrierKind;
  accent: AccentKey;
  support: AccentKey;
  field: string;
  night: boolean;
  marks: Mark[][];
};
