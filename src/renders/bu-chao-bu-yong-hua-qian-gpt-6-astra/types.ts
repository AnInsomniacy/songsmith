import type {CSSProperties} from "react";

export type Unit = {text: string; index: number; startMs: number; endMs: number};
export type TimedLine = {id: string; text: string; startMs: number; endMs: number; characters: Unit[]};
export type Role = "body" | "impact" | "thought" | "latin" | "info";
export type Motion = "tap" | "reach" | "unfold" | "turn" | "lift";
export type Accent = "accent" | "secondary";
export type Mark = {text: string; role: Role; color: Accent; motion: Motion; size?: number};
export type Box = {x: number; y: number; width: number; size: number};
export type LinePlan = {source: number; box: Box; marks: Mark[]};
export type PageSeed = {
  id: string;
  tone: "day" | "night";
  lines: LinePlan[];
  action: string;
  continuation: string;
};
export type Page = PageSeed & {start: number; end: number};
export type SceneClock = {
  t: number;
  duration: number;
  cues: number[];
  units: {text: string; at: number}[];
  scope: string;
};
export type Slot = {
  text: string;
  index: number;
  x: number;
  width: number;
  start: number;
  end: number;
  settle: number;
  size: number;
  font: string;
  weight: number;
  color: string;
  motion: Motion;
};
export type LineLayout = {
  id: string;
  start: number;
  x: number;
  y: number;
  width: number;
  height: number;
  panel: string;
  slots: Slot[];
};
export type PreparedPage = {page: Page; lines: LineLayout[]};
export type TextStyle = Pick<CSSProperties, "fontFamily" | "fontSize" | "fontWeight">;
