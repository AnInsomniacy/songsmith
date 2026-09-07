import raw from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type { Caption } from "@remotion/captions";

export const C = {
  ink: "#203A54",
  deep: "#142C40",
  green: "#0E766E",
  leaf: "#4F9676",
  red: "#BB3F3C",
  coral: "#DF795D",
  yellow: "#F2BC4B",
  mist: "#AACACD",
  paper: "#F3F0E8",
  sky: "#CBE0DE",
  wood: "#A7754B",
  darkWood: "#634838",
  brass: "#CB9957",
  metal: "#8AA8AC",
  plum: "#685068",
} as const;
export const F = {
  cn: "Street Sans",
  en: "Street Barlow",
  info: "Street Information",
  translation: "Street Round",
};
export const FPS = 60;
export const DURATION = 14011;
export const audio =
  "songs/bu-chao-bu-yong-hua-qian/audio/bu-chao-bu-yong-hua-qian.mp3";
export const lines = raw.lines;
export const intro = raw.intro;
export type Line = (typeof lines)[number];
export type Unit = Caption & { index: number };
export const unitsOf = (line: Line): Unit[] =>
  line.characters.map((c) => ({
    ...c,
    timestampMs: c.startMs,
    confidence: null,
  }));
export const frameAt = (ms: number) => Math.round((ms * FPS) / 1000);
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {
  const x = clamp(v);
  return x * x * (3 - 2 * x);
};
export const easeOut = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
export const wave = (t: number, period = 5, phase = 0) =>
  Math.sin((t * Math.PI * 2) / period + phase);
export const turn = (t: number, period = 8) => (t * 360) / period;

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
type Draft = Omit<Shot, "end" | "second">;
const lyric = (
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
const empty = (id: string, seconds: number): Draft => ({
  id,
  start: Math.round(seconds * FPS),
  lineIds: [],
  layout: "left",
  dark: false,
  surface: "paper",
  accent: C.green,
});
const drafts: Draft[] = [
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
export const translation: Record<number, string> = {
  0: "嘿，贪心鬼，别着急",
  1: "眼前所见，就是你能得到的",
  2: "你说得出，我就拿得出",
  3: "眼前所见，就是你能得到的",
  28: "小鸡在我的沙发上吃薯片",
  29: "积木熊竟在我的沙发上拉臭臭",
  30: "Smudge 公仔懒懒地躺在沙发上",
  31: "潮牌和球鞋们，也在沙发上哼着歌",
  32: "小鸡在我的沙发上吃薯片",
  33: "积木熊竟在我的沙发上拉臭臭",
  34: "Smudge 公仔懒懒地躺在沙发上",
  35: "嘿，贪心鬼，别着急",
  36: "眼前所见，就是你能得到的",
  37: "你说得出，我就拿得出",
  38: "眼前所见，就是你能得到的",
  43: "嘿，贪心鬼，别着急",
  44: "眼前所见，就是你能得到的",
  45: "你说得出，我就拿得出",
  46: "眼前所见，就是你能得到的",
  47: "嘿，贪心鬼，别着急",
  48: "眼前所见，就是你能得到的",
  49: "你说得出，我就拿得出",
  50: "眼前所见，就是你能得到的",
};
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
