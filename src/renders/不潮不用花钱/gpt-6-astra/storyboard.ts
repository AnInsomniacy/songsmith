import { C, DURATION, FPS, lines } from "./config";
import { frameAt } from "./motion";
export type Layout = "left" | "right" | "bottom" | "top";

export type Surface = "enamel" | "paper" | "cloth";

export type Shot = {
  id: string;
  start: number;
  end: number;
  lineIds: number[];
  layout: Layout;
  dark: boolean;
  surface: Surface;
  accent: string;
  second: number;
};

export type Draft = Omit<Shot, "end" | "second">;

export const lyric = (
  id: string,
  lineIds: number[],
  layout: Layout,
  dark: boolean,
  surface: Surface,
  accent: string,
): Draft => ({
  id,
  lineIds,
  layout,
  dark,
  surface,
  accent,
  start: frameAt(lines[lineIds[0]].startMs),
});

export const empty = (id: string, seconds: number): Draft => ({
  id,
  start: Math.round(seconds * FPS),
  lineIds: [],
  layout: "left",
  dark: false,
  surface: "paper",
  accent: C.green,
});

export const drafts: Draft[] = [
  empty("music-shop", 0),
  empty("recording-room", 5.35),
  lyric("listening-window", [0, 1], "left", false, "enamel", C.red),
  lyric("record-library", [2, 3], "right", true, "cloth", C.yellow),
  lyric("crossroads", [4, 5], "left", false, "enamel", C.green),
  lyric("listening-room", [6, 7], "top", true, "cloth", C.yellow),
  lyric("invention", [8, 9], "left", false, "paper", C.red),
  lyric("corner-cafe", [10, 11], "right", false, "enamel", C.green),
  lyric("vending", [12, 13], "bottom", true, "enamel", C.yellow),
  lyric("luthier", [14, 15], "top", false, "paper", C.red),
  empty("street-percussion", 76.4),
  empty("awning-orchestra", 84.6),
  lyric("switchboard", [16, 17], "right", false, "enamel", C.red),
  lyric("mailroom", [18, 19], "left", true, "cloth", C.mist),
  lyric("greenhouse", [20, 21], "right", false, "paper", C.green),
  lyric("print-desk", [22, 23], "left", false, "paper", C.red),
  lyric("screenprint", [24, 25], "bottom", true, "cloth", C.yellow),
  lyric("shoe-atelier", [26, 27], "top", false, "enamel", C.green),
  lyric("sofa-snacks", [28, 29], "top", true, "cloth", C.yellow),
  lyric("collector-shelf", [30, 31], "right", false, "paper", C.red),
  lyric("toy-session", [32, 33, 34], "right", true, "cloth", C.mist),
  lyric("night-records", [35, 36], "left", true, "enamel", C.yellow),
  lyric("sign-painter", [37, 38], "right", false, "paper", C.green),
  lyric("night-canopy", [39, 40], "bottom", true, "enamel", C.yellow),
  lyric("rooftop-percussion", [41, 42], "top", true, "cloth", C.mist),
  lyric("open-stage", [43, 44], "left", false, "enamel", C.red),
  lyric("valve-amplifier", [45, 46], "right", true, "cloth", C.yellow),
  lyric("balcony-session", [47, 48], "left", false, "paper", C.green),
  lyric("skyline", [49, 50], "bottom", true, "enamel", C.yellow),
  lyric("last-groove", [51], "left", true, "cloth", C.mist),
  empty("after-hours", 221.4),
];

export const shots: Shot[] = drafts.map((s, i) => ({
  ...s,
  end: drafts[i + 1]?.start ?? DURATION,
  second:
    s.lineIds.length > 1 ? frameAt(lines[s.lineIds[1]].startMs) : s.start + 120,
}));

export const emphasis: Record<number, string[]> = {
  0: ["greedy"],
  1: ["see", "get"],
  2: ["name", "have"],
  3: ["see", "get"],
  4: ["左"],
  5: ["生活", "想太多"],
  6: ["心动", "张开眼睛"],
  7: ["当下", "强烈"],
  8: ["灵光", "一闪"],
  9: ["牛顿", "苹果"],
  10: ["念头", "啰嗦"],
  11: ["入座"],
  12: ["叩叩"],
  13: ["潮流", "抠抠"],
  14: ["扣扣", "抠抠"],
  15: ["买不到", "绝活"],
  16: ["听说", "谁说"],
  17: ["乱走", "闹哄哄"],
  18: ["普通"],
  19: ["不懂", "拒绝"],
  20: ["灵光"],
  21: ["苹果"],
  22: ["念头"],
  23: ["时间", "入座"],
  24: ["叩叩"],
  25: ["潮流", "抠抠"],
  26: ["扣扣", "花掉"],
  27: ["绝活"],
  28: ["chick", "chips", "sofa"],
  29: ["Bearbricks", "sofa"],
  30: ["Smudge", "sofa"],
  31: ["kiks", "sofa"],
  32: ["chick", "chips"],
  33: ["Bearbricks"],
  34: ["Smudge", "sofa"],
  35: ["greedy"],
  36: ["see", "get"],
  37: ["name", "have"],
  38: ["get"],
  39: ["叩叩"],
  40: ["潮流", "抠抠"],
  41: ["扣扣", "花掉"],
  42: ["买不到", "绝活"],
  43: ["greedy"],
  44: ["see", "get"],
  45: ["name", "have"],
  46: ["get"],
  47: ["greedy"],
  48: ["see", "get"],
  49: ["have"],
  50: ["get"],
  51: ["扣"],
};
