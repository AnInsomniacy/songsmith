import { AUDIO_DURATION_MS, DURATION_FRAMES, lineAt } from "./lyrics";
import { FPS, INK, carrierPalette, contrastRatio } from "./design";
import type {
  AccentKey,
  CarrierKind,
  LineBox,
  Mark,
  MarkColor,
  MarkRole,
  Page,
  SceneKey,
} from "./types";

const m = (
  term: string,
  color: MarkColor = "accent",
  role: MarkRole = "impact",
  scale = 1.1,
): Mark => ({ term, color, role, scale });

const box = (x: number, y: number, width: number, max: number): LineBox => ({
  x,
  y,
  width,
  max,
});

type Seed = {
  id: string;
  scene: SceneKey;
  title: string;
  floor: string;
  dept: string;
  lines: number[];
  layout: LineBox[];
  carrier: CarrierKind;
  accent: AccentKey;
  support: AccentKey;
  field: string;
  night?: boolean;
  marks: Mark[][];
};

const seeds: Seed[] = [
  {
    id: "prelude",
    scene: "prelude",
    title: "不潮百货",
    floor: "1F",
    dept: "大堂",
    lines: [],
    layout: [],
    carrier: "tag",
    accent: "red",
    support: "yellow",
    field: "#F7F4EA",
    marks: [],
  },
  {
    id: "mirror",
    scene: "mirror",
    title: "试衣镜",
    floor: "2F",
    dept: "时装",
    lines: [0, 1],
    layout: [box(180, 320, 880, 78), box(180, 540, 1000, 78)],
    carrier: "tag",
    accent: "red",
    support: "teal",
    field: "#EAF2EE",
    marks: [
      [m("greedy", "accent", "latin", 1.12), m("fret", "support", "latin")],
      [m("see", "accent", "latin"), m("get", "support", "latin", 1.1)],
    ],
  },
  {
    id: "shelf",
    scene: "shelf",
    title: "百货大楼",
    floor: "2F",
    dept: "百货",
    lines: [2, 3],
    layout: [box(180, 796, 1560, 74), box(180, 916, 1560, 74)],
    carrier: "pop",
    accent: "red",
    support: "yellow",
    field: "#F7F4EA",
    marks: [
      [m("name", "hot2", "latin"), m("have", "hot2", "latin", 1.12)],
      [m("get", "hot2", "latin")],
    ],
  },
  {
    id: "escalator",
    scene: "escalator",
    title: "上行扶梯",
    floor: "3F",
    dept: "服饰",
    lines: [4, 5],
    layout: [box(180, 300, 1000, 80), box(340, 560, 1200, 80)],
    carrier: "tag",
    accent: "yellow",
    support: "teal",
    field: "#F5EFE0",
    marks: [
      [m("左", "accent", "impact", 1.16), m("左手", "support", "impact")],
      [m("想太多", "support", "impact")],
    ],
  },
  {
    id: "jewelry",
    scene: "jewelry",
    title: "珠宝柜台",
    floor: "1F",
    dept: "珠宝",
    lines: [6, 7],
    layout: [box(160, 260, 1240, 82), box(300, 452, 1240, 82)],
    carrier: "plaque",
    accent: "red",
    support: "yellow",
    field: "#F9EFE7",
    marks: [
      [
        m("怦", "hot2", "impact", 1.2),
        m("心动", "hot2", "impact", 1.15),
        m("眼睛", "base", "impact"),
      ],
      [m("强烈", "hot2", "impact", 1.18)],
    ],
  },
  {
    id: "lamps",
    scene: "lamps",
    title: "灯具店",
    floor: "3F",
    dept: "灯饰",
    lines: [8, 9],
    layout: [box(150, 240, 1050, 78), box(150, 436, 1050, 78)],
    carrier: "tag",
    accent: "yellow",
    support: "red",
    field: "#F7F4EA",
    marks: [
      [m("灵光", "accent", "impact", 1.15), m("一闪", "support", "impact")],
      [m("牛顿", "support", "impact"), m("苹果", "accent", "impact", 1.12)],
    ],
  },
  {
    id: "flipwall",
    scene: "flipwall",
    title: "翻牌价签",
    floor: "4F",
    dept: "数码",
    lines: [10, 11],
    layout: [box(180, 760, 1560, 80), box(180, 900, 1560, 80)],
    carrier: "led",
    accent: "red",
    support: "yellow",
    field: "#EFECE2",
    marks: [
      [m("念头", "hot2", "impact", 1.12), m("啰嗦", "base", "impact")],
      [m("限时间", "hot", "impact", 1.12), m("入座", "hot2", "impact", 1.15)],
    ],
  },
  {
    id: "shopwindow",
    scene: "shopwindow",
    title: "临街橱窗",
    floor: "2F",
    dept: "橱窗",
    lines: [12],
    layout: [box(180, 860, 1560, 86)],
    carrier: "pop",
    accent: "red",
    support: "milk",
    field: "#3F7E74",
    marks: [[m("叩叩", "hot", "impact", 1.22), m("到处", "hot2", "impact")]],
  },
  {
    id: "gacha",
    scene: "gacha",
    title: "扭蛋机",
    floor: "2F",
    dept: "玩具",
    lines: [13],
    layout: [box(180, 820, 1320, 88)],
    carrier: "receipt",
    accent: "yellow",
    support: "red",
    field: "#F3EDE0",
    marks: [
      [m("潮流", "support", "impact"), m("抠抠", "accent", "impact", 1.16), m("没抠抠", "accent", "impact")],
    ],
  },
  {
    id: "register",
    scene: "register",
    title: "收银台",
    floor: "1F",
    dept: "收银",
    lines: [14],
    layout: [box(960, 620, 800, 72)],
    carrier: "receipt",
    accent: "red",
    support: "yellow",
    field: "#F5EFE0",
    marks: [
      [m("扣扣", "accent", "impact", 1.18), m("花掉", "support", "impact"), m("抠抠", "accent", "impact")],
    ],
  },
  {
    id: "atrium",
    scene: "atrium",
    title: "中庭",
    floor: "5F",
    dept: "中庭",
    lines: [15],
    layout: [box(460, 430, 1000, 110)],
    carrier: "tag",
    accent: "red",
    support: "yellow",
    field: "#F2ECDD",
    marks: [[m("绝活", "accent", "impact", 1.3), m("买不到", "support", "impact")]],
  },
  {
    id: "broadcast",
    scene: "broadcast",
    title: "播音室",
    floor: "RF",
    dept: "广播",
    lines: [16, 17],
    layout: [box(900, 240, 900, 64), box(980, 404, 820, 64)],
    carrier: "led",
    accent: "teal",
    support: "red",
    field: "#EDE7DA",
    marks: [
      [m("听说", "hot2", "impact", 1.12), m("听谁说", "hot", "impact")],
      [m("乱走", "hot", "impact", 1.14)],
    ],
  },
  {
    id: "racks",
    scene: "racks",
    title: "衣架阵列",
    floor: "3F",
    dept: "服饰",
    lines: [18, 19],
    layout: [box(150, 600, 1200, 78), box(150, 780, 1300, 78)],
    carrier: "tag",
    accent: "teal",
    support: "red",
    field: "#F7F4EA",
    marks: [
      [m("普通", "hot2", "impact", 1.14), m("通通", "base", "impact")],
      [m("拒绝", "hot", "impact", 1.16), m("随便", "base", "impact")],
    ],
  },
  {
    id: "tvwall",
    scene: "tvwall",
    title: "电视墙",
    floor: "4F",
    dept: "家电",
    lines: [20, 21],
    layout: [box(180, 780, 1560, 76), box(180, 906, 1560, 76)],
    carrier: "led",
    accent: "yellow",
    support: "teal",
    field: "#DFE8E2",
    marks: [
      [m("灵光", "hot", "impact", 1.14), m("一闪", "hot2", "impact")],
      [m("牛顿", "hot2", "impact"), m("苹果", "hot", "impact", 1.12)],
    ],
  },
  {
    id: "foodcourt",
    scene: "foodcourt",
    title: "美食街",
    floor: "6F",
    dept: "美食",
    lines: [22, 23],
    layout: [box(180, 790, 1560, 76), box(180, 912, 1560, 76)],
    carrier: "led",
    accent: "red",
    support: "yellow",
    field: "#F5EDDC",
    marks: [
      [m("念头", "hot2", "impact"), m("啰嗦", "base", "impact")],
      [m("限时间", "hot", "impact", 1.12), m("入座", "hot2", "impact", 1.15)],
    ],
  },
  {
    id: "autodoor",
    scene: "autodoor",
    title: "自动门",
    floor: "1F",
    dept: "出口",
    lines: [24, 25],
    layout: [box(180, 200, 1200, 80), box(180, 860, 1560, 86)],
    carrier: "pop",
    accent: "red",
    support: "milk",
    field: "#3A7268",
    marks: [
      [m("叩叩", "hot", "impact", 1.2)],
      [m("抠抠", "hot", "impact", 1.16), m("没抠抠", "hot", "impact")],
    ],
  },
  {
    id: "flags",
    scene: "flags",
    title: "甩卖广场",
    floor: "1F",
    dept: "广场",
    lines: [26],
    layout: [box(260, 430, 1400, 96)],
    carrier: "banner",
    accent: "red",
    support: "yellow",
    field: "#F6E9E0",
    marks: [[m("扣扣", "hot", "impact", 1.2), m("抠抠", "hot", "impact", 1.16)]],
  },
  {
    id: "wallet",
    scene: "wallet",
    title: "展示柜",
    floor: "1F",
    dept: "展示",
    lines: [27],
    layout: [box(1020, 360, 760, 76)],
    carrier: "plaque",
    accent: "yellow",
    support: "ink",
    field: "#EFE9DC",
    marks: [[m("绝活", "hot", "impact", 1.28), m("买不到", "base", "impact")]],
  },
  {
    id: "sofa1",
    scene: "sofa1",
    title: "沙发陈列",
    floor: "5F",
    dept: "家居",
    lines: [28, 29, 30],
    layout: [
      box(160, 230, 860, 62),
      box(160, 400, 860, 62),
      box(160, 570, 860, 62),
    ],
    carrier: "pop",
    accent: "yellow",
    support: "teal",
    field: "#F3ECDF",
    marks: [
      [m("chick", "hot", "latin", 1.12), m("chips", "hot2", "latin")],
      [m("Bearbricks", "hot", "latin")],
      [m("babies", "hot2", "latin"), m("sofa", "hot", "latin", 1.12)],
    ],
  },
  {
    id: "sofa2",
    scene: "sofa2",
    title: "沙发陈列",
    floor: "5F",
    dept: "家居",
    lines: [31, 32, 33, 34],
    layout: [
      box(180, 170, 1500, 60),
      box(180, 300, 1500, 60),
      box(180, 430, 1500, 60),
      box(180, 560, 1500, 60),
    ],
    carrier: "pop",
    accent: "teal",
    support: "yellow",
    field: "#EDE6D8",
    marks: [
      [m("kiks", "hot2", "latin"), m("sofa", "hot", "latin")],
      [m("chips", "hot", "latin", 1.1)],
      [m("Bearbricks", "hot", "latin")],
      [m("babies", "hot2", "latin"), m("sofa", "hot", "latin")],
    ],
  },
  {
    id: "mirrorhall",
    scene: "mirrorhall",
    title: "镜面回廊",
    floor: "2F",
    dept: "回廊",
    lines: [35, 36],
    layout: [box(150, 280, 900, 70), box(150, 470, 900, 70)],
    carrier: "tag",
    accent: "teal",
    support: "red",
    field: "#F4F1E8",
    marks: [
      [m("greedy", "support", "latin", 1.1), m("fret", "base", "latin")],
      [m("see", "hot2", "latin"), m("get", "hot2", "latin", 1.1)],
    ],
  },
  {
    id: "mirrorhall2",
    scene: "mirrorhall2",
    title: "镜面回廊",
    floor: "2F",
    dept: "回廊",
    lines: [37, 38],
    layout: [box(1090, 280, 700, 64), box(1090, 450, 700, 64)],
    carrier: "tag",
    accent: "red",
    support: "teal",
    field: "#F4F1E8",
    marks: [
      [m("have", "hot2", "latin", 1.1)],
      [m("get", "hot2", "latin")],
    ],
  },
  {
    id: "closingpa",
    scene: "closingpa",
    title: "闭店广播",
    floor: "闭店",
    dept: "闭店",
    lines: [39, 40],
    layout: [box(180, 300, 1560, 80), box(180, 450, 1560, 80)],
    carrier: "led",
    accent: "orange",
    support: "yellow",
    field: "#24333A",
    night: true,
    marks: [
      [m("叩叩", "hot2", "impact", 1.18)],
      [m("抠抠", "hot", "impact", 1.14), m("潮流", "hot2", "impact")],
    ],
  },
  {
    id: "shutter",
    scene: "shutter",
    title: "正门卷帘",
    floor: "闭店",
    dept: "正门",
    lines: [41, 42],
    layout: [box(180, 300, 1300, 76), box(180, 850, 1100, 78)],
    carrier: "led",
    accent: "orange",
    support: "red",
    field: "#1B2A30",
    night: true,
    marks: [
      [m("扣扣", "hot2", "impact", 1.16), m("花掉", "base", "impact")],
      [m("绝活", "hot", "impact", 1.26)],
    ],
  },
  {
    id: "nightwindow",
    scene: "nightwindow",
    title: "夜街橱窗",
    floor: "街",
    dept: "夜",
    lines: [43, 44],
    layout: [box(180, 820, 900, 70), box(1000, 820, 760, 70)],
    carrier: "plaque",
    accent: "orange",
    support: "yellow",
    field: "#0E2622",
    night: true,
    marks: [
      [m("greedy", "hot2", "latin", 1.1), m("fret", "base", "latin")],
      [m("see", "hot", "latin"), m("get", "hot", "latin", 1.1)],
    ],
  },
  {
    id: "stuckdoor",
    scene: "stuckdoor",
    title: "停摆的门",
    floor: "街",
    dept: "夜",
    lines: [45, 46],
    layout: [box(180, 250, 900, 70), box(180, 420, 900, 70)],
    carrier: "plaque",
    accent: "orange",
    support: "milk",
    field: "#102B27",
    night: true,
    marks: [
      [m("have", "hot2", "latin", 1.1)],
      [m("get", "hot2", "latin")],
    ],
  },
  {
    id: "bannerdown",
    scene: "bannerdown",
    title: "感谢光临",
    floor: "闭店",
    dept: "中庭",
    lines: [47, 48],
    layout: [box(180, 700, 900, 68), box(1000, 700, 760, 68)],
    carrier: "banner",
    accent: "red",
    support: "orange",
    field: "#142E2A",
    night: true,
    marks: [
      [m("fret", "hot2", "latin")],
      [m("get", "hot2", "latin", 1.1), m("see", "base", "latin")],
    ],
  },
  {
    id: "lastlights",
    scene: "lastlights",
    title: "全馆熄灯",
    floor: "闭店",
    dept: "全馆",
    lines: [49, 50],
    layout: [box(180, 200, 900, 68), box(180, 360, 900, 68)],
    carrier: "plaque",
    accent: "yellow",
    support: "orange",
    field: "#0C211E",
    night: true,
    marks: [
      [m("have", "hot2", "latin")],
      [m("get", "hot2", "latin", 1.1), m("see", "base", "latin")],
    ],
  },
  {
    id: "finale",
    scene: "finale",
    title: "灯下绝活",
    floor: "街",
    dept: "灯下",
    lines: [51],
    layout: [box(180, 760, 1000, 92)],
    carrier: "plaque",
    accent: "orange",
    support: "yellow",
    field: "#0A1D1A",
    night: true,
    marks: [
      [
        m("扣", "hot", "impact", 1.22),
        m("喔噢", "base", "impact"),
      ],
    ],
  },
];

export const pages: Page[] = seeds.map((seed) => {
  const startMs =
    seed.lines.length > 0 ? lineAt(seed.lines[0]).startMs : 0;
  return {
    id: seed.id,
    scene: seed.scene,
    title: seed.title,
    floor: seed.floor,
    dept: seed.dept,
    startMs,
    lines: seed.lines,
    layout: seed.layout,
    carrier: seed.carrier,
    accent: seed.accent,
    support: seed.support,
    field: seed.field,
    night: seed.night ?? false,
    marks: seed.marks,
  };
});

export const pageAt = (globalMs: number): number => {
  let index = 0;
  for (let i = 0; i < pages.length; i += 1) {
    if (globalMs >= pages[i].startMs) index = i;
  }
  return index;
};

// ---- load-time integrity checks -------------------------------------------

const assigned = pages.flatMap((p) => p.lines);
if (assigned.length !== 52) {
  throw new Error("Not every lyric line is staged: " + assigned.length);
}
assigned.forEach((lineIndex, slot) => {
  if (lineIndex !== slot) {
    throw new Error("Lyric lines must be staged in order at " + slot);
  }
});
for (let i = 1; i < pages.length; i += 1) {
  if (pages[i].startMs <= pages[i - 1].startMs) {
    throw new Error("Page start must increase: " + pages[i].id);
  }
  if (pages[i].layout.length !== pages[i].lines.length) {
    throw new Error("Layout mismatch: " + pages[i].id);
  }
  if (pages[i].marks.length !== pages[i].lines.length) {
    throw new Error("Marks mismatch: " + pages[i].id);
  }
}
if (pages[0].startMs !== 0 || pages[1].startMs !== lineAt(0).startMs) {
  throw new Error("Prelude must own the timeline start");
}
if (DURATION_FRAMES !== Math.ceil((AUDIO_DURATION_MS / 1000) * FPS)) {
  throw new Error("Duration mismatch");
}
for (const page of pages) {
  page.lines.forEach((lineIndex, i) => {
    const line = lineAt(lineIndex);
    for (const mark of page.marks[i]) {
      if (!line.text.includes(mark.term)) {
        throw new Error(`Unknown mark "${mark.term}" on ${page.id}`);
      }
    }
  });
  const palette = carrierPalette(page.carrier, page.accent, page.support);
  for (const [name, fg, bg] of [
    ["base", palette.base, palette.bg],
    ["hot", palette.hot, palette.bg],
    ["hot2", palette.hot2, palette.bg],
  ] as const) {
    if (fg.toLowerCase() === bg.toLowerCase()) continue;
    if (contrastRatio(fg, bg) < 4.5) {
      throw new Error(
        `Contrast ${name} ${fg} on ${bg} = ${contrastRatio(fg, bg).toFixed(2)} at ${page.id}`,
      );
    }
  }
  if (contrastRatio(INK, page.field) < 3 && !page.night) {
    throw new Error("Field too close to ink: " + page.id);
  }
}
