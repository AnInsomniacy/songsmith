import { PALETTES } from "./design";
import { AUDIO_DURATION_MS, lyricLines } from "./lyrics";
import type { Highlight, LyricPage } from "./types";

type PageSeed = Omit<LyricPage, "startMs" | "endMs" | "palette"> & {
  paletteIndex: number;
};

const h = (
  term: string,
  color: Highlight["color"],
  font: Highlight["font"] = "display",
  scale = 1.1,
): Highlight => ({ term, color, font, scale });

const pageSeeds: PageSeed[] = [
  {
    id: "p0-fret-get",
    lineIndexes: [0, 1],
    scene: "silk-stamp",
    verb: "STAMP",
    paletteIndex: 0,
    layout: "offset-left",
    surface: "woven-label",
    highlights: [
      h("greedy", "crimson", "display", 1.15),
      h("what you get", "ultramarine", "display"),
    ],
  },
  {
    id: "p1-name-have",
    lineIndexes: [2, 3],
    scene: "barcode-scanner",
    verb: "SCAN",
    paletteIndex: 1,
    layout: "offset-right",
    surface: "perforated-ticket",
    highlights: [
      h("You name it", "voltage", "display"),
      h("I have it", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p2-left-hand",
    lineIndexes: [4, 5],
    scene: "left-drift",
    verb: "DRIFT",
    paletteIndex: 2,
    layout: "split-horizontal",
    surface: "duotone-plate",
    highlights: [
      h("左左左左", "voltage", "display", 1.2),
      h("左手", "crimson", "display", 1.15),
      h("不用想太多", "ultramarine", "body"),
    ],
  },
  {
    id: "p3-heartbeat",
    lineIndexes: [6, 7],
    scene: "retina-pulse",
    verb: "PULSE",
    paletteIndex: 3,
    layout: "center-card",
    surface: "screenprint-card",
    highlights: [
      h("怦怦怦怦心动", "crimson", "display", 1.18),
      h("张开眼睛", "ultramarine", "body"),
      h("强烈", "voltage", "display", 1.2),
    ],
  },
  {
    id: "p4-newton",
    lineIndexes: [8, 9],
    scene: "gravity-drop",
    verb: "DROP",
    paletteIndex: 4,
    layout: "offset-left",
    surface: "woven-label",
    highlights: [
      h("灵光一闪", "voltage", "display", 1.15),
      h("牛顿", "crimson", "display"),
      h("苹果", "ultramarine", "display", 1.15),
    ],
  },
  {
    id: "p5-time-limit",
    lineIndexes: [10, 11],
    scene: "ticket-gate",
    verb: "LOCK",
    paletteIndex: 5,
    layout: "compact-stack",
    surface: "perforated-ticket",
    highlights: [
      h("念头", "ultramarine", "body"),
      h("限时间", "voltage", "display", 1.15),
      h("入座", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p6-chorus-1a",
    lineIndexes: [12, 13],
    scene: "cmyk-overprint",
    verb: "OVERPRINT",
    paletteIndex: 1,
    layout: "magazine-spread",
    surface: "screenprint-card",
    highlights: [
      h("到处叩叩", "crimson", "display", 1.2),
      h("潮流需要抠抠", "voltage", "display", 1.25),
      h("没抠抠", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p7-chorus-1b",
    lineIndexes: [14, 15],
    scene: "register-eject",
    verb: "EJECT",
    paletteIndex: 0,
    layout: "street-banner",
    surface: "woven-label",
    highlights: [
      h("用力到处扣扣", "crimson", "display", 1.15),
      h("所有抠抠", "ultramarine", "display"),
      h("绝活", "crimson", "display", 1.3),
    ],
  },
  {
    id: "p8-rumor",
    lineIndexes: [16, 17],
    scene: "rumor-shred",
    verb: "SHRED",
    paletteIndex: 2,
    layout: "offset-left",
    surface: "stencil-box",
    highlights: [
      h("听说听说", "crimson", "display", 1.15),
      h("听谁说", "voltage", "display", 1.15),
      h("乱走闹哄哄", "ultramarine", "body"),
    ],
  },
  {
    id: "p9-filter",
    lineIndexes: [18, 19],
    scene: "spectrum-filter",
    verb: "FILTER",
    paletteIndex: 3,
    layout: "offset-right",
    surface: "duotone-plate",
    highlights: [
      h("通通通通普通普通", "voltage", "display", 1.15),
      h("不要随便拒绝", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p10-newton-2",
    lineIndexes: [20, 21],
    scene: "prism-split",
    verb: "SPLIT",
    paletteIndex: 4,
    layout: "center-card",
    surface: "woven-label",
    highlights: [
      h("灵光一闪而过", "voltage", "display", 1.15),
      h("牛顿也吃苹果", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p11-time-limit-2",
    lineIndexes: [22, 23],
    scene: "shutter-aperture",
    verb: "FOCUS",
    paletteIndex: 5,
    layout: "compact-stack",
    surface: "perforated-ticket",
    highlights: [
      h("念头不太啰嗦", "voltage", "display"),
      h("限时间能入座", "crimson", "display", 1.18),
    ],
  },
  {
    id: "p12-chorus-2a",
    lineIndexes: [24, 25],
    scene: "street-cross",
    verb: "CROSS",
    paletteIndex: 1,
    layout: "magazine-spread",
    surface: "screenprint-card",
    highlights: [
      h("到处叩叩", "crimson", "display", 1.2),
      h("潮流需要抠抠", "voltage", "display", 1.25),
      h("没抠抠", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p13-chorus-2b",
    lineIndexes: [26, 27],
    scene: "vault-open",
    verb: "UNFOLD",
    paletteIndex: 0,
    layout: "street-banner",
    surface: "woven-label",
    highlights: [
      h("用力到处扣扣", "crimson", "display"),
      h("花掉所有抠抠", "ultramarine", "display"),
      h("钱买不到绝活", "crimson", "display", 1.3),
    ],
  },
  {
    id: "p14-sofa-chick",
    lineIndexes: [28, 29],
    scene: "sofa-pop-a",
    verb: "SPIN",
    paletteIndex: 3,
    layout: "offset-left",
    surface: "duotone-plate",
    highlights: [
      h("Little chick", "voltage", "display", 1.15),
      h("chips", "crimson", "display"),
      h("Bearbricks", "voltage", "display", 1.2),
      h("sofa", "ultramarine", "display", 1.15),
    ],
  },
  {
    id: "p15-smudge-hood",
    lineIndexes: [30, 31],
    scene: "smudge-lightning",
    verb: "FLASH",
    paletteIndex: 1,
    layout: "offset-right",
    surface: "woven-label",
    highlights: [
      h("Smudge babies", "crimson", "display", 1.22),
      h("Neighborhoods", "voltage", "display", 1.15),
      h("kiks", "ultramarine", "display"),
      h("sofa", "voltage", "display"),
    ],
  },
  {
    id: "p16-sofa-repeat",
    lineIndexes: [32, 33],
    scene: "duotone-screen",
    verb: "INVERT",
    paletteIndex: 4,
    layout: "split-horizontal",
    surface: "screenprint-card",
    highlights: [
      h("Little chick", "crimson", "display", 1.15),
      h("Bearbricks", "voltage", "display", 1.2),
      h("sofa", "ultramarine", "display"),
    ],
  },
  {
    id: "p17-smudge-solo",
    lineIndexes: [34],
    scene: "zine-fold",
    verb: "PAGE-FLIP",
    paletteIndex: 2,
    layout: "center-card",
    surface: "woven-label",
    highlights: [
      h("Smudge babies", "voltage", "display", 1.28),
      h("sofa", "crimson", "display", 1.25),
    ],
  },
  {
    id: "p18-bridge-rap-1",
    lineIndexes: [35, 36],
    scene: "neon-strobe",
    verb: "STROBE",
    paletteIndex: 5,
    layout: "offset-left",
    surface: "stencil-box",
    highlights: [
      h("greedy", "crimson", "display", 1.15),
      h("what you get", "voltage", "display", 1.15),
    ],
  },
  {
    id: "p19-bridge-rap-2",
    lineIndexes: [37, 38],
    scene: "stencil-spray",
    verb: "SPRAY",
    paletteIndex: 0,
    layout: "offset-right",
    surface: "perforated-ticket",
    highlights: [
      h("You name it", "voltage", "display", 1.15),
      h("I have it", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p20-chorus-3a",
    lineIndexes: [39, 40],
    scene: "climax-burst",
    verb: "BURST",
    paletteIndex: 1,
    layout: "magazine-spread",
    surface: "screenprint-card",
    highlights: [
      h("不要到处叩叩", "crimson", "display", 1.22),
      h("潮流需要抠抠", "voltage", "display", 1.28),
      h("没抠抠", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p21-chorus-3b",
    lineIndexes: [41, 42],
    scene: "gold-standard",
    verb: "FORGE",
    paletteIndex: 3,
    layout: "street-banner",
    surface: "woven-label",
    highlights: [
      h("用力到处扣扣", "crimson", "display"),
      h("花掉所有抠抠", "ultramarine", "display"),
      h("绝活", "crimson", "display", 1.35),
    ],
  },
  {
    id: "p22-outro-1",
    lineIndexes: [43, 44],
    scene: "cmyk-strip-a",
    verb: "CASCADE",
    paletteIndex: 4,
    layout: "offset-left",
    surface: "perforated-ticket",
    highlights: [
      h("greedy", "crimson", "display"),
      h("what you get", "voltage", "display", 1.15),
    ],
  },
  {
    id: "p23-outro-2",
    lineIndexes: [45, 46],
    scene: "cmyk-strip-b",
    verb: "ROTATE",
    paletteIndex: 2,
    layout: "offset-right",
    surface: "duotone-plate",
    highlights: [
      h("You name it", "voltage", "display"),
      h("I have it", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p24-outro-3",
    lineIndexes: [47, 48],
    scene: "cmyk-strip-c",
    verb: "WARP",
    paletteIndex: 5,
    layout: "split-horizontal",
    surface: "screenprint-card",
    highlights: [
      h("greedy", "crimson", "display"),
      h("what you get", "voltage", "display", 1.15),
    ],
  },
  {
    id: "p25-outro-4",
    lineIndexes: [49, 50],
    scene: "cmyk-strip-d",
    verb: "SNAP",
    paletteIndex: 1,
    layout: "center-card",
    surface: "stencil-box",
    highlights: [
      h("You name it", "voltage", "display"),
      h("I have it", "crimson", "display", 1.15),
    ],
  },
  {
    id: "p26-finale",
    lineIndexes: [51],
    scene: "vinyl-fadeout",
    verb: "DECELERATE",
    paletteIndex: 0,
    layout: "magazine-spread",
    surface: "woven-label",
    highlights: [
      h("喔噢", "ultramarine", "display", 1.25),
      h("扣扣扣扣", "crimson", "display", 1.35),
    ],
  },
];

export const pages: LyricPage[] = pageSeeds.map((seed, index) => {
  const palette = PALETTES[seed.paletteIndex];
  const startMs = lyricLines[seed.lineIndexes[0]].startMs;
  const endMs =
    index + 1 < pageSeeds.length
      ? lyricLines[pageSeeds[index + 1].lineIndexes[0]].startMs
      : AUDIO_DURATION_MS;

  return {
    ...seed,
    palette,
    startMs,
    endMs,
  };
});

// Assertion: Every line belongs to exactly one page
const allAssigned = pages.flatMap((p) => p.lineIndexes).sort((a, b) => a - b);
if (
  allAssigned.length !== lyricLines.length ||
  allAssigned.some((val, idx) => val !== idx)
) {
  throw new Error("Every lyric line must belong to exactly one page");
}
