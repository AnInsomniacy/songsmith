import { contrastRatio, PALETTES } from "./design";
import { AUDIO_DURATION_MS, lyricLines } from "./lyrics";
import type {
  FontRole,
  HighlightRule,
  LayoutKind,
  LyricPage,
  SceneKind,
  SurfaceKind,
  TextMotion,
} from "./types";

type Seed = {
  id: string;
  lines: number[];
  scene: SceneKind;
  palette: number;
  layout: LayoutKind;
  surface: SurfaceKind;
  motion: TextMotion;
  highlights: HighlightRule[];
};

const h = (
  term: string,
  color: HighlightRule["color"],
  font: FontRole = "impact",
  scale = 1.1,
): HighlightRule => ({ term, color, font, scale });

const seeds: Seed[] = [
  {
    id: "temperament-shutter",
    lines: [0, 1],
    scene: "temperament-shutter",
    palette: 2,
    layout: "offset",
    surface: "matte",
    motion: "settle",
    highlights: [
      h("伤心", "accent", "memory", 1.12),
      h("任性", "secondary"),
      h("气力", "accent"),
    ],
  },
  {
    id: "fragments-vault",
    lines: [2, 3],
    scene: "fragments-vault",
    palette: 0,
    layout: "stack",
    surface: "mount",
    motion: "expose",
    highlights: [
      h("过去", "accent", "memory", 1.12),
      h("细碎", "secondary"),
      h("眼睛", "accent", "impact", 1.15),
    ],
  },
  {
    id: "patience-thread",
    lines: [4, 5],
    scene: "patience-thread",
    palette: 5,
    layout: "split",
    surface: "strip",
    motion: "unlock",
    highlights: [
      h("失恋", "accent", "memory", 1.11),
      h("耐性", "secondary"),
      h("注定", "accent"),
    ],
  },
  {
    id: "dark-light-exposure",
    lines: [6, 7],
    scene: "dark-light-exposure",
    palette: 0,
    layout: "stack",
    surface: "glass",
    motion: "breathe",
    highlights: [
      h("黑", "accent", "impact", 1.15),
      h("光", "secondary", "impact", 1.18),
      h("气息", "accent", "memory", 1.11),
    ],
  },
  {
    id: "shared-contact-sheet",
    lines: [8, 9],
    scene: "shared-contact-sheet",
    palette: 4,
    layout: "offset",
    surface: "mount",
    motion: "register",
    highlights: [
      h("一起", "accent", "memory"),
      h("通通你的", "secondary", "impact", 1.11),
    ],
  },
  {
    id: "romance-emulsion",
    lines: [10],
    scene: "romance-emulsion",
    palette: 2,
    layout: "wide",
    surface: "glass",
    motion: "expose",
    highlights: [
      h("浪漫", "secondary", "memory", 1.17),
      h("爱情", "accent", "impact", 1.16),
    ],
  },
  {
    id: "farewell-listen",
    lines: [11, 12],
    scene: "farewell-listen",
    palette: 1,
    layout: "split",
    surface: "silver",
    motion: "slide",
    highlights: [
      h("再见", "accent", "memory", 1.13),
      h("承诺", "secondary", "impact", 1.15),
      h("再听", "accent"),
    ],
  },
  {
    id: "color-proof",
    lines: [13, 14],
    scene: "color-proof",
    palette: 3,
    layout: "cinema",
    surface: "strip",
    motion: "register",
    highlights: [
      h("不变色", "accent", "memory", 1.13),
      h("Oh baby", "secondary", "latin", 1.22),
    ],
  },
  {
    id: "dandelion-first",
    lines: [15, 16],
    scene: "dandelion-first",
    palette: 1,
    layout: "stack",
    surface: "matte",
    motion: "expose",
    highlights: [
      h("蒲公英", "accent", "memory", 1.14),
      h("风", "secondary", "impact", 1.19),
      h("清劲", "accent"),
    ],
  },
  {
    id: "memory-control",
    lines: [17, 18],
    scene: "memory-control",
    palette: 0,
    layout: "offset",
    surface: "mount",
    motion: "unlock",
    highlights: [
      h("回忆", "accent", "memory", 1.16),
      h("受制", "secondary"),
      h("我承认", "accent", "impact", 1.1),
      h("你的", "secondary", "memory", 1.15),
    ],
  },
  {
    id: "water-listen",
    lines: [19, 20],
    scene: "water-listen",
    palette: 5,
    layout: "split",
    surface: "glass",
    motion: "breathe",
    highlights: [
      h("流水声", "secondary", "memory", 1.14),
      h("大地", "accent", "impact", 1.13),
      h("倾听", "secondary"),
    ],
  },
  {
    id: "departure-platform",
    lines: [21, 22],
    scene: "departure-platform",
    palette: 2,
    layout: "stack",
    surface: "silver",
    motion: "settle",
    highlights: [
      h("送别", "accent", "memory", 1.15),
      h("回头", "secondary"),
      h("虔诚", "accent"),
      h("感性", "secondary", "memory", 1.14),
    ],
  },
  {
    id: "inertia-drawer",
    lines: [23, 24],
    scene: "inertia-drawer",
    palette: 4,
    layout: "offset",
    surface: "matte",
    motion: "unlock",
    highlights: [
      h("惰性", "accent", "memory", 1.15),
      h("约定", "secondary", "impact", 1.15),
    ],
  },
  {
    id: "ideal-exposure",
    lines: [25, 26],
    scene: "ideal-exposure",
    palette: 3,
    layout: "stack",
    surface: "mount",
    motion: "expose",
    highlights: [
      h("理想", "accent", "memory", 1.14),
      h("刹那", "secondary"),
      h("你的我的", "accent", "impact", 1.1),
    ],
  },
  {
    id: "shared-index",
    lines: [27, 28],
    scene: "shared-index",
    palette: 1,
    layout: "split",
    surface: "strip",
    motion: "register",
    highlights: [
      h("一起", "secondary", "memory", 1.12),
      h("通通你的", "accent", "impact", 1.11),
    ],
  },
  {
    id: "romance-negative",
    lines: [29],
    scene: "romance-negative",
    palette: 2,
    layout: "wide",
    surface: "silver",
    motion: "settle",
    highlights: [
      h("浪漫", "accent", "memory", 1.17),
      h("爱情", "secondary", "impact", 1.16),
    ],
  },
  {
    id: "promise-replay",
    lines: [30, 31],
    scene: "promise-replay",
    palette: 0,
    layout: "offset",
    surface: "mount",
    motion: "slide",
    highlights: [
      h("再见", "secondary", "memory", 1.13),
      h("承诺", "accent", "impact", 1.15),
      h("再听", "secondary"),
    ],
  },
  {
    id: "spectrum-stain",
    lines: [32, 33],
    scene: "spectrum-stain",
    palette: 3,
    layout: "cinema",
    surface: "glass",
    motion: "breathe",
    highlights: [
      h("不变色", "secondary", "memory", 1.13),
      h("Oh baby", "accent", "latin", 1.22),
    ],
  },
  {
    id: "dandelion-reverse",
    lines: [34, 35],
    scene: "dandelion-reverse",
    palette: 5,
    layout: "stack",
    surface: "silver",
    motion: "register",
    highlights: [
      h("蒲公英", "secondary", "memory", 1.14),
      h("风", "accent", "impact", 1.19),
      h("清劲", "secondary"),
    ],
  },
  {
    id: "memory-transfer",
    lines: [36, 37],
    scene: "memory-transfer",
    palette: 4,
    layout: "offset",
    surface: "mount",
    motion: "expose",
    highlights: [
      h("回忆", "accent", "memory", 1.16),
      h("受制", "secondary"),
      h("我承认", "accent", "impact", 1.1),
      h("你的", "secondary", "memory", 1.15),
    ],
  },
  {
    id: "water-ceiling",
    lines: [38, 39],
    scene: "water-ceiling",
    palette: 0,
    layout: "split",
    surface: "glass",
    motion: "breathe",
    highlights: [
      h("流水声", "accent", "memory", 1.14),
      h("大地", "secondary", "impact", 1.13),
      h("倾听", "accent"),
    ],
  },
  {
    id: "farewell-dock",
    lines: [40, 41],
    scene: "farewell-dock",
    palette: 2,
    layout: "stack",
    surface: "strip",
    motion: "slide",
    highlights: [
      h("送别", "secondary", "memory", 1.15),
      h("回头", "accent"),
      h("虔诚", "secondary"),
      h("感性", "accent", "memory", 1.14),
    ],
  },
  {
    id: "dandelion-field",
    lines: [42, 43],
    scene: "dandelion-field",
    palette: 3,
    layout: "stack",
    surface: "matte",
    motion: "expose",
    highlights: [
      h("蒲公英", "accent", "memory", 1.14),
      h("风", "secondary", "impact", 1.19),
      h("清劲", "accent"),
    ],
  },
  {
    id: "memory-peel",
    lines: [44, 45],
    scene: "memory-peel",
    palette: 5,
    layout: "offset",
    surface: "silver",
    motion: "unlock",
    highlights: [
      h("回忆", "secondary", "memory", 1.16),
      h("受制", "accent"),
      h("我承认", "secondary", "impact", 1.1),
      h("你的", "accent", "memory", 1.15),
    ],
  },
  {
    id: "water-ground",
    lines: [46, 47],
    scene: "water-ground",
    palette: 1,
    layout: "split",
    surface: "mount",
    motion: "breathe",
    highlights: [
      h("流水声", "secondary", "memory", 1.14),
      h("大地", "accent", "impact", 1.13),
      h("倾听", "secondary"),
    ],
  },
  {
    id: "last-empty-frame",
    lines: [48, 49],
    scene: "last-empty-frame",
    palette: 0,
    layout: "stack",
    surface: "glass",
    motion: "settle",
    highlights: [
      h("送别", "accent", "memory", 1.15),
      h("回头", "secondary"),
      h("虔诚", "accent"),
      h("感性", "secondary", "memory", 1.14),
    ],
  },
];

export const pages: LyricPage[] = seeds.map((seed, index) => {
  const palette = PALETTES[seed.palette];
  const startMs = lyricLines[seed.lines[0]].startMs;
  const endMs = seeds[index + 1]
    ? lyricLines[seeds[index + 1].lines[0]].startMs
    : AUDIO_DURATION_MS;
  const pageText = seed.lines.map((line) => lyricLines[line].text).join(" ");
  for (const rule of seed.highlights) {
    if (!pageText.includes(rule.term)) {
      throw new Error(`Highlight '${rule.term}' is absent from ${seed.id}`);
    }
  }
  for (const color of [palette.foreground, palette.accent, palette.secondary]) {
    if (contrastRatio(color, palette.surface) < 4.5) {
      throw new Error(`Low text contrast on page ${seed.id}: ${color}`);
    }
  }
  return {
    ...seed,
    index,
    lineIndexes: seed.lines,
    startMs,
    endMs,
    palette,
  };
});

const allLines = pages.flatMap((page) => page.lineIndexes);
if (new Set(pages.map((page) => page.scene)).size !== pages.length) {
  throw new Error("Every lyric page must have a unique scene signature");
}
if (
  allLines.length !== lyricLines.length ||
  new Set(allLines).size !== lyricLines.length ||
  allLines.some((line, index) => line !== index)
) {
  throw new Error("Every lyric line must belong to exactly one ordered page");
}
