import { PALETTES, contrastRatio } from "./design";
import { lyricData, lyricLines } from "./lyrics";
import type { Highlight, LyricPage } from "./types";

type Seed = Omit<LyricPage, "startMs" | "endMs" | "palette"> & {
  palette: number;
};
const h = (
  term: string,
  color: Highlight["color"],
  font: Highlight["font"] = "display",
  scale = 1.12,
): Highlight => ({ term, color, font, scale });

const seeds: Seed[] = [
  {
    id: "quiet-check-in",
    lineIndexes: [0, 1],
    scene: "smile-meter",
    palette: 0,
    layout: "offset",
    surface: "card",
    highlights: [h("微笑", "accent"), h("少", "secondary")],
  },
  {
    id: "world-reverse",
    lineIndexes: [2, 3],
    scene: "reverse-city",
    palette: 4,
    layout: "stack",
    surface: "banner",
    highlights: [h("逆转", "accent"), h("反向思考", "secondary")],
  },
  {
    id: "running-away",
    lineIndexes: [4, 5],
    scene: "crossroads-career",
    palette: 2,
    layout: "split",
    surface: "ticket",
    highlights: [
      h("到处跑", "secondary"),
      h("升职", "accent"),
      h("被炒", "accent"),
    ],
  },
  {
    id: "cosmic-joke",
    lineIndexes: [6, 7],
    scene: "fortune-wheel",
    palette: 1,
    layout: "offset",
    surface: "glass",
    highlights: [h("莫名其妙", "secondary"), h("玩笑", "accent")],
  },
  {
    id: "earthquake-embrace",
    lineIndexes: [8, 9],
    scene: "seismic-embrace",
    palette: 5,
    layout: "stack",
    surface: "card",
    highlights: [h("拥抱", "accent"), h("美好", "secondary")],
  },
  {
    id: "corner-happiness",
    lineIndexes: [10, 11],
    scene: "corner-sun",
    palette: 3,
    layout: "offset",
    surface: "banner",
    highlights: [
      h("放掉", "accent"),
      h("幸福", "secondary"),
      h("转角", "accent"),
    ],
  },
  {
    id: "cheer-chorus-one",
    lineIndexes: [12, 13],
    scene: "cheer-ripple",
    palette: 1,
    layout: "stack",
    surface: "card",
    highlights: [h("加油", "accent", "display", 1.22), h("悲伤", "secondary")],
  },
  {
    id: "tears-to-sun",
    lineIndexes: [14, 15],
    scene: "sun-dry",
    palette: 0,
    layout: "offset",
    surface: "glass",
    highlights: [h("泪", "secondary"), h("阳光", "accent"), h("褪", "accent")],
  },
  {
    id: "everyone-needs",
    lineIndexes: [16, 17],
    scene: "relay-hands",
    palette: 2,
    layout: "split",
    surface: "ticket",
    highlights: [
      h("人人都需要", "accent"),
      h("手牵手", "secondary"),
      h("赛跑", "accent"),
    ],
  },
  {
    id: "promise-time",
    lineIndexes: [18, 19],
    scene: "promise-clock",
    palette: 4,
    layout: "offset",
    surface: "banner",
    highlights: [
      h("不见不散", "secondary"),
      h("每分每秒", "accent"),
      h("到老", "secondary"),
    ],
  },
  {
    id: "beat-life",
    lineIndexes: [20, 21],
    scene: "beat-road",
    palette: 0,
    layout: "compact",
    surface: "card",
    highlights: [
      h("The beat goes on", "accent", "english"),
      h("Life goes on", "secondary", "english"),
      h("痛", "accent"),
    ],
  },
  {
    id: "raise-head",
    lineIndexes: [22, 23],
    scene: "current-climb",
    palette: 3,
    layout: "stack",
    surface: "glass",
    highlights: [
      h("顺流", "secondary"),
      h("逆流", "accent"),
      h("抬起头", "secondary"),
    ],
  },
  {
    id: "walk-together",
    lineIndexes: [24, 25],
    scene: "shared-path",
    palette: 5,
    layout: "offset",
    surface: "ticket",
    highlights: [
      h("一起走", "accent"),
      h("艰难", "secondary"),
      h("困惑", "secondary"),
    ],
  },
  {
    id: "job-carousel",
    lineIndexes: [26, 27, 28],
    scene: "job-carousel",
    palette: 1,
    layout: "compact",
    surface: "banner",
    highlights: [
      h("升职", "secondary"),
      h("被炒", "accent"),
      h("莫名其妙", "accent"),
    ],
  },
  {
    id: "second-joke",
    lineIndexes: [29, 30],
    scene: "sky-prank",
    palette: 4,
    layout: "offset",
    surface: "card",
    highlights: [
      h("上天", "secondary"),
      h("玩笑", "accent"),
      h("拥抱", "secondary"),
    ],
  },
  {
    id: "life-beauty",
    lineIndexes: [31, 32],
    scene: "museum-of-good",
    palette: 2,
    layout: "stack",
    surface: "glass",
    highlights: [h("生命中的美好", "accent"), h("放掉", "secondary")],
  },
  {
    id: "corner-repeat",
    lineIndexes: [33, 34],
    scene: "street-turn",
    palette: 0,
    layout: "split",
    surface: "ticket",
    highlights: [
      h("幸福", "accent"),
      h("转角", "secondary"),
      h("加油", "accent", "display", 1.22),
    ],
  },
  {
    id: "sorrow-luggage",
    lineIndexes: [35, 36],
    scene: "sorrow-luggage",
    palette: 5,
    layout: "offset",
    surface: "banner",
    highlights: [h("悲伤", "secondary"), h("泪", "accent")],
  },
  {
    id: "sun-laundry",
    lineIndexes: [37, 38],
    scene: "sun-laundry",
    palette: 1,
    layout: "stack",
    surface: "card",
    highlights: [
      h("伤口", "secondary"),
      h("阳光", "accent"),
      h("人人都需要", "secondary"),
    ],
  },
  {
    id: "relay-repeat",
    lineIndexes: [39, 40, 41],
    scene: "track-baton",
    palette: 3,
    layout: "compact",
    surface: "glass",
    highlights: [
      h("手牵手", "accent"),
      h("赛跑", "secondary"),
      h("不见不散", "accent"),
    ],
  },
  {
    id: "guard-until-old",
    lineIndexes: [42],
    scene: "watch-light",
    palette: 4,
    layout: "stack",
    surface: "ticket",
    highlights: [h("守候", "accent"), h("到老", "secondary")],
  },
  {
    id: "pass-every-gate",
    lineIndexes: [43, 44],
    scene: "gate-after-rain",
    palette: 0,
    layout: "offset",
    surface: "card",
    highlights: [
      h("关关过", "accent"),
      h("雨后天晴", "secondary"),
      h("阳光", "accent"),
    ],
  },
  {
    id: "rainbow-understood",
    lineIndexes: [45, 46],
    scene: "rainbow-reveal",
    palette: 2,
    layout: "stack",
    surface: "banner",
    highlights: [
      h("彩虹", "accent"),
      h("才懂", "secondary"),
      h("马拉松", "accent"),
    ],
  },
  {
    id: "finish-line-cheer",
    lineIndexes: [47, 48],
    scene: "finish-line",
    palette: 1,
    layout: "split",
    surface: "glass",
    highlights: [
      h("一起加油", "accent", "display", 1.2),
      h("悲伤", "secondary"),
    ],
  },
  {
    id: "healed-tears",
    lineIndexes: [49, 50],
    scene: "prism-dry",
    palette: 3,
    layout: "offset",
    surface: "ticket",
    highlights: [
      h("泪", "secondary"),
      h("阳光", "accent"),
      h("伤口", "secondary"),
    ],
  },
  {
    id: "final-together",
    lineIndexes: [51],
    scene: "endless-horizon",
    palette: 5,
    layout: "stack",
    surface: "card",
    highlights: [
      h("每分每秒", "accent"),
      h("守候", "secondary"),
      h("到老", "accent"),
    ],
  },
];

export const pages: LyricPage[] = seeds.map((seed, index) => {
  const palette = PALETTES[seed.palette];
  if (contrastRatio(palette.foreground, palette.surface) < 4.5)
    throw new Error(`Low contrast: ${seed.id}`);
  return {
    ...seed,
    palette,
    startMs: lyricLines[seed.lineIndexes[0]].startMs,
    endMs:
      index + 1 < seeds.length
        ? lyricLines[seeds[index + 1].lineIndexes[0]].startMs
        : lyricData.audioDurationMs,
  };
});

const assigned = pages
  .flatMap((page) => page.lineIndexes)
  .sort((a, b) => a - b);
if (
  assigned.length !== lyricLines.length ||
  assigned.some((value, index) => value !== index)
)
  throw new Error("Every lyric line must belong to exactly one page");
