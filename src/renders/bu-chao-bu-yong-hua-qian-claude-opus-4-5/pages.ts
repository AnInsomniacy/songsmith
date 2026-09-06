import { basePalette } from "./design";
import { AUDIO_DURATION_MS, lyricLines } from "./lyrics";
import type {
  FontRole,
  HighlightRule,
  LayoutKind,
  LyricPage,
  SceneKind,
  StickyStyle,
  SurfaceKind,
  TextMotion,
} from "./types";

type Seed = {
  id: string;
  lines: number[];
  scene: SceneKind;
  stickyStyle: StickyStyle;
  layout: LayoutKind;
  surface: SurfaceKind;
  motion: TextMotion;
  highlights: HighlightRule[];
};

const h = (
  term: string,
  color: HighlightRule["color"],
  font: FontRole = "impact",
  scale = 1.12,
): HighlightRule => ({ term, color, font, scale });

const seeds: Seed[] = [
  // 开场英文段落 (0-3)
  {
    id: "greedy-intro",
    lines: [0, 1],
    scene: "notebook-open",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("greedy", "marker", "latin", 1.15),
      h("fret", "ballpoint", "latin"),
    ],
  },
  {
    id: "name-it",
    lines: [2, 3],
    scene: "doodle-arrows",
    stickyStyle: "white",
    layout: "stack",
    surface: "sticky",
    motion: "type",
    highlights: [
      h("name", "ballpoint", "latin"),
      h("have", "marker", "latin", 1.1),
      h("get", "highlighter", "latin"),
    ],
  },

  // 左左左左 - 生活态度 (4-5)
  {
    id: "left-hand",
    lines: [4],
    scene: "doodle-arrows",
    stickyStyle: "pink",
    layout: "sticky",
    surface: "sticky",
    motion: "stamp",
    highlights: [
      h("左", "marker", "impact", 1.2),
      h("偏", "ballpoint", "body"),
    ],
  },
  {
    id: "simple-life",
    lines: [5],
    scene: "lightbulb-moment",
    stickyStyle: "yellow",
    layout: "sticky",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("生活", "marker", "impact", 1.15),
      h("想太多", "ballpoint", "body"),
    ],
  },

  // 怦怦怦怦 - 心动 (6-7)
  {
    id: "heartbeat",
    lines: [6, 7],
    scene: "heartbeat-sketch",
    stickyStyle: "pink",
    layout: "stack",
    surface: "sticky",
    motion: "stamp",
    highlights: [
      h("怦", "marker", "impact", 1.25),
      h("心动", "marker", "impact", 1.18),
      h("强烈", "highlighter", "body"),
    ],
  },

  // 灵光闪现 (8-9)
  {
    id: "flash-apple",
    lines: [8, 9],
    scene: "apple-fall",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("灵光", "highlighter", "impact", 1.18),
      h("一闪", "marker", "impact", 1.15),
      h("牛顿", "ballpoint", "body", 1.1),
      h("苹果", "marker", "body", 1.12),
    ],
  },

  // 念头 - 入座 (10-11)
  {
    id: "thought-seat",
    lines: [10, 11],
    scene: "countdown-zero",
    stickyStyle: "blue",
    layout: "stack",
    surface: "sticky",
    motion: "type",
    highlights: [
      h("念头", "ballpoint", "body"),
      h("啰嗦", "marker", "body"),
      h("限时间", "highlighter", "impact", 1.15),
      h("入座", "marker", "impact", 1.12),
    ],
  },

  // 请你不要叩叩 (12-13)
  {
    id: "knock-knock-1",
    lines: [12, 13],
    scene: "receipt-rain",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "receipt",
    motion: "type",
    highlights: [
      h("请你", "ballpoint", "body"),
      h("叩叩", "marker", "impact", 1.2),
      h("潮流", "highlighter", "impact", 1.15),
      h("抠抠", "marker", "impact", 1.2),
    ],
  },

  // 用力到处扣扣 (14-15)
  {
    id: "spend-all",
    lines: [14, 15],
    scene: "coin-scatter",
    stickyStyle: "pink",
    layout: "stack",
    surface: "sticky",
    motion: "stamp",
    highlights: [
      h("用力", "marker", "impact", 1.15),
      h("扣扣", "marker", "impact", 1.18),
      h("花掉", "highlighter", "body"),
      h("绝活", "marker", "impact", 1.2),
    ],
  },

  // 间奏后 - 你说听说 (16-17)
  {
    id: "rumor-mill",
    lines: [16, 17],
    scene: "sticky-wall",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("听说", "marker", "body", 1.1),
      h("你说", "ballpoint", "body"),
      h("乱走", "highlighter", "impact", 1.12),
      h("闹哄哄", "marker", "impact", 1.15),
    ],
  },

  // 通通通通 - 普通 (18-19)
  {
    id: "ordinary",
    lines: [18, 19],
    scene: "barcode-scan",
    stickyStyle: "white",
    layout: "stack",
    surface: "receipt",
    motion: "type",
    highlights: [
      h("通", "marker", "impact", 1.2),
      h("普通", "ballpoint", "body"),
      h("不懂", "highlighter", "body"),
      h("拒绝", "marker", "impact", 1.12),
    ],
  },

  // 灵光闪现 重复 (20-21)
  {
    id: "flash-apple-2",
    lines: [20, 21],
    scene: "lightbulb-moment",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("灵光", "highlighter", "impact", 1.18),
      h("一闪", "marker", "impact", 1.15),
      h("牛顿", "ballpoint", "body", 1.1),
      h("苹果", "marker", "body", 1.12),
    ],
  },

  // 念头 - 入座 重复 (22-23)
  {
    id: "thought-seat-2",
    lines: [22, 23],
    scene: "piggy-bank",
    stickyStyle: "blue",
    layout: "stack",
    surface: "sticky",
    motion: "type",
    highlights: [
      h("念头", "ballpoint", "body"),
      h("限时间", "highlighter", "impact", 1.15),
      h("入座", "marker", "impact", 1.12),
    ],
  },

  // 副歌 请你不要叩叩 (24-25)
  {
    id: "knock-knock-2",
    lines: [24, 25],
    scene: "tag-dance",
    stickyStyle: "pink",
    layout: "stack",
    surface: "sticky",
    motion: "stamp",
    highlights: [
      h("叩叩", "marker", "impact", 1.2),
      h("抠抠", "marker", "impact", 1.2),
      h("潮流", "highlighter", "impact", 1.15),
    ],
  },

  // 用力到处扣扣 重复 (26-27)
  {
    id: "spend-all-2",
    lines: [26, 27],
    scene: "wallet-empty",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "receipt",
    motion: "type",
    highlights: [
      h("扣扣", "marker", "impact", 1.18),
      h("花掉", "highlighter", "body"),
      h("绝活", "marker", "impact", 1.2),
    ],
  },

  // 英文RAP段落 - Sofa系列 (28-31)
  {
    id: "sofa-chick",
    lines: [28, 29],
    scene: "sofa-sketch",
    stickyStyle: "blue",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("chick", "marker", "latin", 1.15),
      h("chips", "highlighter", "latin"),
      h("sofa", "ballpoint", "latin", 1.1),
      h("Bearbricks", "marker", "latin", 1.12),
    ],
  },
  {
    id: "sofa-smudge",
    lines: [30, 31],
    scene: "toy-parade",
    stickyStyle: "pink",
    layout: "stack",
    surface: "sticky",
    motion: "type",
    highlights: [
      h("Smudge", "marker", "latin", 1.15),
      h("babies", "highlighter", "latin"),
      h("Neighborhoods", "ballpoint", "latin"),
      h("kiks", "marker", "latin", 1.1),
    ],
  },

  // 英文RAP重复 (32-34)
  {
    id: "sofa-repeat",
    lines: [32, 33],
    scene: "sofa-sketch",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "stamp",
    highlights: [
      h("chick", "marker", "latin", 1.15),
      h("Bearbricks", "marker", "latin", 1.12),
      h("sofa", "ballpoint", "latin", 1.1),
    ],
  },
  {
    id: "smudge-end",
    lines: [34],
    scene: "toy-parade",
    stickyStyle: "green",
    layout: "sticky",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("Smudge", "marker", "latin", 1.15),
      h("babies", "highlighter", "latin"),
    ],
  },

  // 回到英文开场 (35-38)
  {
    id: "greedy-return",
    lines: [35, 36],
    scene: "notebook-open",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("greedy", "marker", "latin", 1.15),
      h("fret", "ballpoint", "latin"),
      h("get", "highlighter", "latin"),
    ],
  },
  {
    id: "name-it-return",
    lines: [37, 38],
    scene: "checklist-check",
    stickyStyle: "white",
    layout: "list",
    surface: "plain",
    motion: "type",
    highlights: [
      h("name", "ballpoint", "latin"),
      h("have", "marker", "latin", 1.1),
      h("get", "highlighter", "latin"),
    ],
  },

  // 最终副歌 (39-42)
  {
    id: "final-knock",
    lines: [39, 40],
    scene: "receipt-rain",
    stickyStyle: "pink",
    layout: "stack",
    surface: "receipt",
    motion: "stamp",
    highlights: [
      h("叩叩", "marker", "impact", 1.2),
      h("抠抠", "marker", "impact", 1.2),
      h("潮流", "highlighter", "impact", 1.15),
    ],
  },
  {
    id: "final-spend",
    lines: [41, 42],
    scene: "coin-scatter",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "type",
    highlights: [
      h("扣扣", "marker", "impact", 1.18),
      h("绝活", "marker", "impact", 1.2),
    ],
  },

  // 最后一轮 Hey greedy (43-46)
  {
    id: "last-greedy-1",
    lines: [43, 44],
    scene: "sticky-wall",
    stickyStyle: "blue",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("greedy", "marker", "latin", 1.15),
      h("get", "highlighter", "latin"),
    ],
  },
  {
    id: "last-greedy-2",
    lines: [45, 46],
    scene: "barcode-scan",
    stickyStyle: "yellow",
    layout: "stack",
    surface: "sticky",
    motion: "stamp",
    highlights: [
      h("name", "ballpoint", "latin"),
      h("have", "marker", "latin", 1.1),
    ],
  },

  // Echo段落 (47-50)
  {
    id: "echo-greedy-1",
    lines: [47, 48],
    scene: "echo-notes",
    stickyStyle: "pink",
    layout: "stack",
    surface: "sticky",
    motion: "type",
    highlights: [
      h("greedy", "marker", "latin", 1.12),
      h("get", "highlighter", "latin"),
    ],
  },
  {
    id: "echo-greedy-2",
    lines: [49, 50],
    scene: "echo-notes",
    stickyStyle: "white",
    layout: "stack",
    surface: "sticky",
    motion: "write",
    highlights: [
      h("name", "ballpoint", "latin"),
      h("have", "marker", "latin", 1.1),
    ],
  },

  // 尾声 (51)
  {
    id: "outro-wooo",
    lines: [51],
    scene: "finale-fold",
    stickyStyle: "yellow",
    layout: "sticky",
    surface: "torn",
    motion: "stamp",
    highlights: [
      h("喔噢", "marker", "impact", 1.2),
      h("扣", "highlighter", "impact", 1.15),
    ],
  },
];

export const pages: LyricPage[] = seeds.map((seed, index) => {
  const lines = seed.lines.map((i) => lyricLines[i]).filter(Boolean);
  const startMs = lines[0]?.startMs ?? 0;
  const nextSeed = seeds[index + 1];
  const nextStart = nextSeed
    ? lyricLines[nextSeed.lines[0]]?.startMs ?? AUDIO_DURATION_MS
    : AUDIO_DURATION_MS;
  const endMs = nextStart;

  return {
    id: seed.id,
    index,
    lineIndexes: seed.lines,
    startMs,
    endMs,
    scene: seed.scene,
    layout: seed.layout,
    surface: seed.surface,
    stickyStyle: seed.stickyStyle,
    motion: seed.motion,
    palette: basePalette(seed.stickyStyle),
    highlights: seed.highlights,
  };
});
