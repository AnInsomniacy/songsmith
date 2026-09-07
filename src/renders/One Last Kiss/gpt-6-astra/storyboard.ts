import data from "../../../../public/songs/One Last Kiss/data/lyrics.json";
import { C, FRAMES } from "./config";
export type Shot = {
  id: string;
  lines: number[];
  layout: "left" | "right" | "bottom";
  light: boolean;
  accent: string;
  terms: string[];
  start: number;
  end: number;
  second: number;
};

export const specs: [
  string,
  number[],
  "left" | "right" | "bottom",
  boolean,
  string[],
][] = [
  ["gallery", [0, 1], "left", false, ["ルーブル"]],
  ["portrait", [2, 3], "right", true, ["モナリザ", "出会"]],
  ["gears", [4, 5], "left", false, ["あなた", "歯車"]],
  ["fracture", [6], "bottom", false, ["喪失", "予感"]],
  ["archive", [7, 8], "left", true, ["もう一つ"]],
  ["kiss", [9], "bottom", false, ["last", "kiss"]],
  ["memory", [10, 11], "left", false, ["忘れたくない"]],
  ["reflection", [12, 13], "right", true, ["忘れたくない"]],
  ["sea", [14], "bottom", false, ["love", "know"]],
  ["camera", [15, 16], "left", true, ["写真", "いらない"]],
  ["projector", [17, 18], "left", false, ["焼きついた", "プロジェクター"]],
  ["windows", [19, 20], "bottom", false, ["寂しくない", "お互い"]],
  ["porcelain", [21, 22], "right", true, ["求める", "傷つく"]],
  ["prism", [23, 24], "bottom", false, ["last", "燃える", "キス"]],
  ["exposure", [25, 26], "left", false, ["忘れ"]],
  ["ripples", [27, 28], "bottom", true, ["love", "know"]],
  ["horizon", [29, 30], "bottom", false, ["love", "know"]],
  ["eclipse", [31, 32], "left", false, ["分かって", "終わり"]],
  ["sundial", [33, 34], "right", true, ["年", "忘れられない"]],
  ["lantern", [35, 36], "left", false, ["忘れられない"]],
  ["orbit", [37, 38], "bottom", false, ["love", "know"]],
  ["tide", [39, 40], "right", true, ["忘れられない"]],
  ["constellation", [41, 42], "bottom", false, ["love", "know"]],
  ["wind", [43, 44], "left", true, ["風", "眩しい", "午後"]],
];

export const shots: Shot[] = specs.map(
  ([id, lines, layout, light, terms], i) => ({
    id,
    lines,
    layout,
    light,
    terms,
    accent: light ? (i % 2 ? "#28696D" : "#914862") : i % 2 ? C.sun : C.glass,
    start: Math.round(data.lines[lines[0]].startMs * 0.06),
    end:
      i + 1 < specs.length
        ? Math.round(data.lines[specs[i + 1][1][0]].startMs * 0.06)
        : FRAMES,
    second: Math.round(data.lines[lines[1] ?? lines[0]].startMs * 0.06),
  }),
);

export type SceneProps = {
  shot: Shot;
  frame: number;
  t: number;
  q: number;
  id: string;
};
