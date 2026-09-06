import { PALETTES } from "./design";
import {
  AUDIO_DURATION_MS,
  DURATION_IN_FRAMES,
  OVERLAP_FRAMES,
  lyricLines,
  msToFrame,
} from "./lyrics";
import type {
  AcrosticMode,
  FontRole,
  HighlightRule,
  LayoutKind,
  LyricPage,
  SceneKind,
  TextMotion,
} from "./types";

type Seed = {
  id: string;
  lines: number[];
  scene: SceneKind;
  palette: keyof typeof PALETTES;
  layout: LayoutKind;
  motion: TextMotion;
  acrostic: number;
  acrosticMode: AcrosticMode;
  highlights: HighlightRule[];
};

const h = (
  term: string,
  color: HighlightRule["color"],
  font: FontRole = "impact",
  scale = 1.12,
): HighlightRule => ({ term, color, font, scale });

const seeds: Seed[] = [
  {
    id: "curtain-lift",
    lines: [0, 1],
    scene: "curtain-lift",
    palette: "party",
    layout: "stack",
    motion: "lift",
    acrostic: 0,
    acrosticMode: "none",
    highlights: [h("greedy", "accent", "latin", 1.14), h("get", "secondary", "latin")],
  },
  {
    id: "name-drop",
    lines: [2, 3],
    scene: "name-drop",
    palette: "party",
    layout: "offset",
    motion: "drop",
    acrostic: 0,
    acrosticMode: "none",
    highlights: [h("name it", "accent", "latin"), h("have it", "secondary", "latin")],
  },
  {
    id: "left-stamp",
    lines: [4, 5],
    scene: "left-stamp",
    palette: "room",
    layout: "stack",
    motion: "stamp",
    acrostic: 0,
    acrosticMode: "none",
    highlights: [h("左", "accent", "impact", 1.18), h("想太多", "secondary")],
  },
  {
    id: "pulse-open",
    lines: [6, 7],
    scene: "pulse-open",
    palette: "lamp",
    layout: "offset",
    motion: "lift",
    acrostic: 0,
    acrosticMode: "none",
    highlights: [h("怦", "accent", "impact", 1.2), h("强烈", "secondary")],
  },
  {
    id: "apple-fall",
    lines: [8, 9],
    scene: "apple-fall",
    palette: "lamp",
    layout: "split",
    motion: "drop",
    acrostic: 0,
    acrosticMode: "none",
    highlights: [h("灵光", "secondary"), h("苹果", "accent", "impact", 1.16)],
  },
  {
    id: "sit-down",
    lines: [10, 11],
    scene: "sit-down",
    palette: "room",
    layout: "stack",
    motion: "stamp",
    acrostic: 0,
    acrosticMode: "none",
    highlights: [h("念头", "secondary"), h("入座", "accent")],
  },
  {
    id: "knock-pinch",
    lines: [12, 13],
    scene: "knock-pinch",
    palette: "chorus",
    layout: "stack",
    motion: "knock",
    acrostic: 3,
    acrosticMode: "nail",
    highlights: [h("叩叩", "secondary"), h("潮", "accent", "impact", 1.18), h("抠抠", "accent")],
  },
  {
    id: "nail-skill",
    lines: [14, 15],
    scene: "nail-skill",
    palette: "chorus",
    layout: "offset",
    motion: "stamp",
    acrostic: 6,
    acrosticMode: "nail",
    highlights: [h("扣扣", "secondary"), h("钱", "accent", "impact", 1.2), h("绝活", "accent", "impact", 1.22)],
  },
  {
    id: "rumor-walk",
    lines: [16, 17],
    scene: "rumor-walk",
    palette: "room",
    layout: "split",
    motion: "lift",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("听谁说", "secondary"), h("乱走", "accent")],
  },
  {
    id: "clone-stop",
    lines: [18, 19],
    scene: "clone-stop",
    palette: "room",
    layout: "stack",
    motion: "stamp",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("普通", "secondary"), h("拒绝", "accent")],
  },
  {
    id: "apple-side",
    lines: [20, 21],
    scene: "apple-side",
    palette: "lamp",
    layout: "offset",
    motion: "drop",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("一闪", "secondary"), h("苹果", "accent")],
  },
  {
    id: "seat-spot",
    lines: [22, 23],
    scene: "seat-spot",
    palette: "lamp",
    layout: "stack",
    motion: "lift",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("念头", "secondary"), h("入座", "accent")],
  },
  {
    id: "door-refuse",
    lines: [24, 25],
    scene: "door-refuse",
    palette: "chorus",
    layout: "offset",
    motion: "knock",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("叩叩", "secondary"), h("抠抠", "accent")],
  },
  {
    id: "coin-slide",
    lines: [26, 27],
    scene: "coin-slide",
    palette: "chorus",
    layout: "split",
    motion: "pinch",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("花掉", "secondary"), h("绝活", "accent", "impact", 1.2)],
  },
  {
    id: "climb-toys",
    lines: [28, 29],
    scene: "climb-toys",
    palette: "sofa",
    layout: "stack",
    motion: "drop",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("chick", "accent", "latin"), h("Bearbricks", "secondary", "latin"), h("sofa", "accent", "latin")],
  },
  {
    id: "occupy-sofa",
    lines: [30, 31],
    scene: "occupy-sofa",
    palette: "sofa",
    layout: "offset",
    motion: "lift",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("Smudge", "accent", "latin"), h("kiks", "secondary", "latin"), h("sofa", "accent", "latin")],
  },
  {
    id: "crowd-sofa",
    lines: [32, 33],
    scene: "crowd-sofa",
    palette: "sofa",
    layout: "split",
    motion: "stamp",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("chips", "secondary", "latin"), h("shit", "accent", "latin"), h("sofa", "accent", "latin")],
  },
  {
    id: "empty-corner",
    lines: [34],
    scene: "empty-corner",
    palette: "sofa",
    layout: "stack",
    motion: "lift",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("Smudge babies", "accent", "latin"), h("sofa", "secondary", "latin", 1.16)],
  },
  {
    id: "look-back",
    lines: [35, 36],
    scene: "look-back",
    palette: "party",
    layout: "stack",
    motion: "lift",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("greedy", "accent", "latin"), h("get", "secondary", "latin")],
  },
  {
    id: "already-there",
    lines: [37, 38],
    scene: "already-there",
    palette: "party",
    layout: "offset",
    motion: "drop",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("have it", "accent", "latin"), h("see", "secondary", "latin")],
  },
  {
    id: "restamp-title",
    lines: [39, 40],
    scene: "restamp-title",
    palette: "chorus",
    layout: "stack",
    motion: "stamp",
    acrostic: 6,
    acrosticMode: "restamp",
    highlights: [h("叩叩", "secondary"), h("潮流", "accent"), h("抠抠", "accent")],
  },
  {
    id: "skill-closeup",
    lines: [41, 42],
    scene: "skill-closeup",
    palette: "chorus",
    layout: "offset",
    motion: "stamp",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("钱", "secondary", "impact", 1.18), h("绝活", "accent", "impact", 1.24)],
  },
  {
    id: "english-wide",
    lines: [43, 44],
    scene: "english-wide",
    palette: "party",
    layout: "stack",
    motion: "lift",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("fret", "secondary", "latin"), h("get", "accent", "latin")],
  },
  {
    id: "english-near",
    lines: [45, 46],
    scene: "english-near",
    palette: "party",
    layout: "offset",
    motion: "knock",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("name it", "accent", "latin"), h("get", "secondary", "latin")],
  },
  {
    id: "plaid-face",
    lines: [47, 48],
    scene: "plaid-face",
    palette: "room",
    layout: "stack",
    motion: "stamp",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("greedy", "accent", "latin"), h("see", "secondary", "latin")],
  },
  {
    id: "light-left",
    lines: [49, 50],
    scene: "light-left",
    palette: "finale",
    layout: "offset",
    motion: "pinch",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("I have it", "secondary", "latin"), h("get", "accent", "latin")],
  },
  {
    id: "punch-out",
    lines: [51],
    scene: "punch-out",
    palette: "finale",
    layout: "stack",
    motion: "knock",
    acrostic: 6,
    acrosticMode: "hold",
    highlights: [h("扣扣", "accent", "impact", 1.2)],
  },
];

export const pages: LyricPage[] = seeds.map((seed, index) => {
  const startMs = lyricLines[seed.lines[0]].startMs;
  const nextStartMs = seeds[index + 1]
    ? lyricLines[seeds[index + 1].lines[0]].startMs
    : AUDIO_DURATION_MS;
  const startFrame = msToFrame(startMs);
  const nextFrame = seeds[index + 1]
    ? msToFrame(lyricLines[seeds[index + 1].lines[0]].startMs)
    : DURATION_IN_FRAMES;
  const palette = PALETTES[seed.palette];
  const pageText = seed.lines.map((line) => lyricLines[line].text).join(" ");
  for (const rule of seed.highlights) {
    if (!pageText.includes(rule.term)) {
      throw new Error(`Highlight '${rule.term}' missing on ${seed.id}`);
    }
  }
  return {
    ...seed,
    index,
    lineIndexes: seed.lines,
    startMs,
    endMs: nextStartMs,
    startFrame,
    durationFrames: Math.max(1, nextFrame - startFrame + OVERLAP_FRAMES),
    palette,
  };
});

const assigned = pages.flatMap((page) => page.lineIndexes);
if (new Set(pages.map((page) => page.scene)).size !== pages.length) {
  throw new Error("Every lyric page must have a unique scene signature");
}
if (
  assigned.length !== lyricLines.length ||
  assigned.some((line, index) => line !== index)
) {
  throw new Error("Every lyric line must belong to exactly one ordered page");
}
