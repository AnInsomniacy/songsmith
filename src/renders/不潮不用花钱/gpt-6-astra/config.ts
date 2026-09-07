import type { Caption } from "@remotion/captions";
import raw from "../../../../public/songs/不潮不用花钱/data/lyrics.json";

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

export const FPS = 60;

export const DURATION = 14011;

export const audio = "songs/不潮不用花钱/audio/不潮不用花钱.mp3";

export const lines = raw.lines;

export const intro = raw.intro;

export type Line = (typeof lines)[number];

export type Unit = Caption & { index: number };

export const unitsOf = (line: Line): Unit[] =>
  line.units.map((c) => ({
    ...c,
    timestampMs: c.startMs,
    confidence: null,
  }));
