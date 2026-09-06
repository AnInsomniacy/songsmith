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
  font: FontRole = "body",
  scale = 1.1,
): HighlightRule => ({ term, color, font, scale });

const seeds: Seed[] = [
  {
    id: "power-screen",
    lines: [0, 1],
    scene: "power-screen",
    palette: 0,
    layout: "split-machine",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("greedy", "accent", "latin", 1.12),
      h("What you see", "secondary", "latin"),
    ],
  },
  {
    id: "window-promise",
    lines: [2, 3],
    scene: "window-promise",
    palette: 1,
    layout: "split-machine",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("You name it", "accent", "latin", 1.12),
      h("I have it", "secondary", "latin"),
    ],
  },
  {
    id: "pinball-left",
    lines: [4, 5],
    scene: "pinball-left",
    palette: 1,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("左左左左", "accent", "impact", 1.14),
      h("偏左", "secondary"),
    ],
  },
  {
    id: "note-heartbeat",
    lines: [6, 7],
    scene: "note-heartbeat",
    palette: 2,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("怦怦怦怦", "accent", "impact", 1.14),
      h("心动", "secondary"),
      h("张开眼睛", "secondary"),
    ],
  },
  {
    id: "shoot-apple",
    lines: [8, 9],
    scene: "shoot-apple",
    palette: 0,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("灵光一闪", "secondary"),
      h("牛顿", "secondary"),
      h("苹果", "accent", "impact", 1.16),
    ],
  },
  {
    id: "countdown-seat",
    lines: [10, 11],
    scene: "countdown-seat",
    palette: 2,
    layout: "screen-duo",
    surface: "panel",
    motion: "refresh",
    highlights: [
      h("念头", "secondary"),
      h("限时间", "accent", "impact", 1.16),
      h("入座", "secondary"),
    ],
  },
  {
    id: "coin-slot",
    lines: [12],
    scene: "coin-slot",
    palette: 2,
    layout: "split-machine",
    surface: "panel",
    motion: "coin",
    highlights: [
      h("叩叩", "accent", "impact", 1.18),
      h("到处", "secondary"),
    ],
  },
  {
    id: "reel-spend",
    lines: [13, 14],
    scene: "reel-spend",
    palette: 3,
    layout: "split-machine",
    surface: "panel",
    motion: "coin",
    highlights: [
      h("潮流", "accent", "impact", 1.12),
      h("抠抠", "accent"),
      h("用力", "secondary"),
      h("扣扣", "secondary"),
      h("花掉", "secondary"),
    ],
  },
  {
    id: "prize-unbuyable",
    lines: [15],
    scene: "prize-unbuyable",
    palette: 4,
    layout: "screen-single",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("钱", "secondary"),
      h("绝活", "accent", "impact", 1.25),
    ],
  },
  {
    id: "speaker-rumor",
    lines: [16, 17],
    scene: "speaker-rumor",
    palette: 1,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("听说", "accent"),
      h("乱走", "secondary"),
    ],
  },
  {
    id: "clone-rows",
    lines: [18, 19],
    scene: "clone-rows",
    palette: 0,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("通通通通", "accent"),
      h("普通", "accent", "impact", 1.14),
      h("拒绝", "secondary"),
    ],
  },
  {
    id: "shoot-apple-reprise",
    lines: [20, 21],
    scene: "shoot-apple-reprise",
    palette: 4,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("灵光一闪", "secondary"),
      h("苹果", "accent", "impact", 1.16),
    ],
  },
  {
    id: "countdown-seat-reprise",
    lines: [22, 23],
    scene: "countdown-seat-reprise",
    palette: 2,
    layout: "screen-duo",
    surface: "panel",
    motion: "refresh",
    highlights: [
      h("限时间", "accent", "impact", 1.16),
      h("入座", "secondary"),
    ],
  },
  {
    id: "coin-slot-close",
    lines: [24],
    scene: "coin-slot-close",
    palette: 2,
    layout: "split-machine",
    surface: "panel",
    motion: "coin",
    highlights: [h("叩叩", "accent", "impact", 1.18)],
  },
  {
    id: "reel-jackpot",
    lines: [25, 26],
    scene: "reel-jackpot",
    palette: 3,
    layout: "split-machine",
    surface: "panel",
    motion: "coin",
    highlights: [
      h("潮流", "accent", "impact", 1.12),
      h("抠抠", "accent"),
      h("花掉", "secondary"),
    ],
  },
  {
    id: "prize-reject",
    lines: [27],
    scene: "prize-reject",
    palette: 5,
    layout: "screen-single",
    surface: "crt",
    motion: "refresh",
    highlights: [h("绝活", "accent", "impact", 1.25)],
  },
  {
    id: "sofa-treasures",
    lines: [28, 29, 30, 31],
    scene: "sofa-treasures",
    palette: 1,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("Little chick", "accent", "latin", 1.1),
      h("Bearbricks", "secondary", "latin"),
      h("Smudge babies", "secondary", "latin"),
      h("kiks", "accent", "latin"),
    ],
  },
  {
    id: "sofa-closeup",
    lines: [32, 33, 34],
    scene: "sofa-closeup",
    palette: 4,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("Little chick", "secondary", "latin"),
      h("Bearbricks", "accent", "latin"),
      h("Smudge babies", "secondary", "latin"),
    ],
  },
  {
    id: "sign-flicker",
    lines: [35, 36],
    scene: "sign-flicker",
    palette: 1,
    layout: "split-machine",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("greedy", "accent", "latin", 1.12),
      h("What you see", "secondary", "latin"),
    ],
  },
  {
    id: "window-late-night",
    lines: [37, 38],
    scene: "window-late-night",
    palette: 5,
    layout: "split-machine",
    surface: "crt",
    motion: "refresh",
    highlights: [h("You name it", "accent", "latin", 1.12)],
  },
  {
    id: "coin-slot-final",
    lines: [39],
    scene: "coin-slot-final",
    palette: 5,
    layout: "split-machine",
    surface: "panel",
    motion: "coin",
    highlights: [h("叩叩", "accent", "impact", 1.18)],
  },
  {
    id: "reel-break",
    lines: [40, 41],
    scene: "reel-break",
    palette: 5,
    layout: "split-machine",
    surface: "panel",
    motion: "coin",
    highlights: [
      h("潮流", "accent"),
      h("抠抠", "secondary"),
      h("扣扣", "accent"),
    ],
  },
  {
    id: "prize-empty",
    lines: [42],
    scene: "prize-empty",
    palette: 5,
    layout: "screen-single",
    surface: "crt",
    motion: "refresh",
    highlights: [h("绝活", "accent", "impact", 1.25)],
  },
  {
    id: "shutdown",
    lines: [43, 44, 45, 46],
    scene: "shutdown",
    palette: 5,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [
      h("greedy", "secondary", "latin"),
      h("What you see", "accent", "latin"),
    ],
  },
  {
    id: "last-sign",
    lines: [47, 48, 49, 50],
    scene: "last-sign",
    palette: 0,
    layout: "screen-duo",
    surface: "crt",
    motion: "refresh",
    highlights: [h("Hey greedy", "accent", "latin", 1.12)],
  },
  {
    id: "final-coin",
    lines: [51],
    scene: "final-coin",
    palette: 5,
    layout: "screen-single",
    surface: "panel",
    motion: "coin",
    highlights: [h("扣扣扣扣", "accent", "impact", 1.2)],
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
