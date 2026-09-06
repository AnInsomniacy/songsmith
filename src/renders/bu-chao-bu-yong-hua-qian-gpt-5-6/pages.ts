import { AUDIO_DURATION_MS, lyricLines } from "./lyrics";
import type { HighlightRule, LayoutKind, LyricPage, TextMotion } from "./types";

type PageSeed = {
  id: string;
  lineIndexes: number[];
  theme: number;
  layout: LayoutKind;
  motion: TextMotion;
  scene: string;
  highlights: HighlightRule[];
};

const seeds: PageSeed[] = [
  {
    id: "greedy-tag",
    lineIndexes: [0, 1],
    theme: 1,
    layout: "banner",
    motion: "shutter",
    scene: "tag-invite",
    highlights: [
      { term: "greedy", color: "accent", font: "display" },
      { term: "get", color: "secondary", font: "display" },
    ],
  },
  {
    id: "inventory-mirror",
    lineIndexes: [2, 3],
    theme: 2,
    layout: "split",
    motion: "slide",
    scene: "mirror-stock",
    highlights: [
      { term: "name it", color: "secondary", font: "display" },
      { term: "get", color: "accent", font: "display" },
    ],
  },
  {
    id: "left-rail",
    lineIndexes: [4, 5],
    theme: 0,
    layout: "stack",
    motion: "stamp",
    scene: "left-rail",
    highlights: [
      { term: "左", color: "accent", font: "display", scale: 1.08 },
      { term: "想太多", color: "secondary", font: "serif" },
    ],
  },
  {
    id: "pulse-fold",
    lineIndexes: [6, 7],
    theme: 5,
    layout: "stair",
    motion: "stretch",
    scene: "pulse-fold",
    highlights: [
      { term: "怦", color: "secondary", font: "display" },
      { term: "强烈", color: "accent", font: "display", scale: 1.1 },
    ],
  },
  {
    id: "scanner-apple",
    lineIndexes: [8, 9],
    theme: 4,
    layout: "split",
    motion: "shutter",
    scene: "scanner-apple",
    highlights: [
      { term: "灵光", color: "secondary", font: "serif" },
      { term: "苹果", color: "accent", font: "serif", scale: 1.13 },
    ],
  },
  {
    id: "thought-receipt",
    lineIndexes: [10, 11],
    theme: 1,
    layout: "editorial",
    motion: "rise",
    scene: "thought-receipt",
    highlights: [
      { term: "念头", color: "accent", font: "serif" },
      { term: "限时间", color: "secondary", font: "display" },
    ],
  },
  {
    id: "knock-register",
    lineIndexes: [12, 13],
    theme: 1,
    layout: "stack",
    motion: "stamp",
    scene: "knock-register",
    highlights: [
      { term: "叩叩", color: "secondary", font: "display" },
      { term: "抠抠", color: "accent", font: "display" },
    ],
  },
  {
    id: "coupon-tear",
    lineIndexes: [14, 15],
    theme: 2,
    layout: "stair",
    motion: "tilt",
    scene: "coupon-tear",
    highlights: [
      { term: "扣扣", color: "secondary", font: "display" },
      { term: "绝活", color: "accent", font: "serif", scale: 1.16 },
    ],
  },
  {
    id: "rumor-switchboard",
    lineIndexes: [16, 17],
    theme: 0,
    layout: "split",
    motion: "slide",
    scene: "rumor-switchboard",
    highlights: [
      { term: "听谁说", color: "secondary", font: "display" },
      { term: "乱走", color: "accent", font: "display" },
    ],
  },
  {
    id: "ordinary-conveyor",
    lineIndexes: [18, 19],
    theme: 4,
    layout: "banner",
    motion: "stamp",
    scene: "ordinary-conveyor",
    highlights: [
      { term: "普通", color: "accent", font: "display" },
      { term: "拒绝", color: "secondary", font: "serif" },
    ],
  },
  {
    id: "flash-prism",
    lineIndexes: [20, 21],
    theme: 5,
    layout: "editorial",
    motion: "shutter",
    scene: "flash-prism",
    highlights: [
      { term: "一闪", color: "secondary", font: "display" },
      { term: "苹果", color: "accent", font: "serif" },
    ],
  },
  {
    id: "countdown-seat",
    lineIndexes: [22, 23],
    theme: 3,
    layout: "split",
    motion: "stretch",
    scene: "countdown-seat",
    highlights: [
      { term: "念头", color: "secondary", font: "serif" },
      { term: "限时间", color: "accent", font: "display" },
      { term: "入座", color: "accent", font: "display" },
    ],
  },
  {
    id: "door-price",
    lineIndexes: [24, 25],
    theme: 1,
    layout: "stack",
    motion: "rise",
    scene: "door-price",
    highlights: [
      { term: "叩叩", color: "secondary", font: "display" },
      { term: "没抠抠", color: "accent", font: "display" },
    ],
  },
  {
    id: "coin-shredder",
    lineIndexes: [26, 27],
    theme: 0,
    layout: "stair",
    motion: "tilt",
    scene: "coin-shredder",
    highlights: [
      { term: "所有抠抠", color: "secondary", font: "display" },
      { term: "买不到", color: "accent", font: "display" },
      { term: "绝活", color: "secondary", font: "serif" },
    ],
  },
  {
    id: "sofa-chick",
    lineIndexes: [28, 29],
    theme: 4,
    layout: "editorial",
    motion: "slide",
    scene: "sofa-chick",
    highlights: [
      { term: "chick", color: "accent", font: "display" },
      { term: "Bearbricks", color: "secondary", font: "display" },
      { term: "sofa", color: "accent", font: "display" },
    ],
  },
  {
    id: "sofa-smudge",
    lineIndexes: [30, 31],
    theme: 2,
    layout: "split",
    motion: "shutter",
    scene: "sofa-smudge",
    highlights: [
      { term: "Smudge", color: "secondary", font: "display" },
      { term: "so-fa", color: "accent", font: "display" },
    ],
  },
  {
    id: "sofa-repeat",
    lineIndexes: [32, 33],
    theme: 5,
    layout: "banner",
    motion: "stamp",
    scene: "sofa-repeat",
    highlights: [
      { term: "chips", color: "secondary", font: "display" },
      { term: "Bearbricks", color: "accent", font: "display" },
    ],
  },
  {
    id: "sofa-exit",
    lineIndexes: [34],
    theme: 1,
    layout: "editorial",
    motion: "stretch",
    scene: "sofa-exit",
    highlights: [
      { term: "Smudge babies", color: "accent", font: "display" },
      { term: "sofa", color: "secondary", font: "display", scale: 1.18 },
    ],
  },
  {
    id: "greedy-window",
    lineIndexes: [35, 36],
    theme: 3,
    layout: "stack",
    motion: "tilt",
    scene: "greedy-window",
    highlights: [
      { term: "greedy", color: "accent", font: "display" },
      { term: "get", color: "secondary", font: "display" },
    ],
  },
  {
    id: "inventory-split",
    lineIndexes: [37, 38],
    theme: 0,
    layout: "split",
    motion: "rise",
    scene: "inventory-split",
    highlights: [
      { term: "have it", color: "secondary", font: "display" },
      { term: "see", color: "accent", font: "display" },
    ],
  },
  {
    id: "knock-vending",
    lineIndexes: [39, 40],
    theme: 2,
    layout: "stair",
    motion: "stamp",
    scene: "knock-vending",
    highlights: [
      { term: "叩叩", color: "secondary", font: "display" },
      { term: "潮流", color: "accent", font: "serif" },
      { term: "没抠抠", color: "secondary", font: "display" },
    ],
  },
  {
    id: "checkout-zero",
    lineIndexes: [41, 42],
    theme: 4,
    layout: "banner",
    motion: "shutter",
    scene: "checkout-zero",
    highlights: [
      { term: "花掉", color: "secondary", font: "display" },
      { term: "钱", color: "accent", font: "display", scale: 1.2 },
      { term: "绝活", color: "secondary", font: "serif" },
    ],
  },
  {
    id: "echo-tag-a",
    lineIndexes: [43, 44],
    theme: 1,
    layout: "editorial",
    motion: "slide",
    scene: "echo-tag-a",
    highlights: [
      { term: "fret", color: "secondary", font: "display" },
      { term: "get", color: "accent", font: "display" },
    ],
  },
  {
    id: "echo-tag-b",
    lineIndexes: [45, 46],
    theme: 5,
    layout: "split",
    motion: "stretch",
    scene: "echo-tag-b",
    highlights: [
      { term: "name it", color: "accent", font: "display" },
      { term: "get", color: "secondary", font: "display" },
    ],
  },
  {
    id: "echo-tag-c",
    lineIndexes: [47, 48],
    theme: 3,
    layout: "stair",
    motion: "tilt",
    scene: "echo-tag-c",
    highlights: [
      { term: "greedy", color: "secondary", font: "display" },
      { term: "see", color: "accent", font: "display" },
    ],
  },
  {
    id: "echo-tag-d",
    lineIndexes: [49, 50],
    theme: 2,
    layout: "stack",
    motion: "rise",
    scene: "echo-tag-d",
    highlights: [
      { term: "I have it", color: "secondary", font: "display" },
      { term: "get", color: "accent", font: "display" },
    ],
  },
  {
    id: "outro-perforation",
    lineIndexes: [51],
    theme: 0,
    layout: "banner",
    motion: "stamp",
    scene: "outro-perforation",
    highlights: [
      { term: "扣扣", color: "secondary", font: "display", scale: 1.12 },
    ],
  },
];

export const pages: LyricPage[] = seeds.map((seed, index) => {
  const startMs = lyricLines[seed.lineIndexes[0]].startMs;
  const nextStartMs = seeds[index + 1]
    ? lyricLines[seeds[index + 1].lineIndexes[0]].startMs
    : AUDIO_DURATION_MS;
  return { ...seed, startMs, endMs: nextStartMs };
});

const signatures = new Set(pages.map((page) => page.scene));
if (signatures.size !== pages.length) {
  throw new Error("Every lyric page must have a unique scene signature");
}
