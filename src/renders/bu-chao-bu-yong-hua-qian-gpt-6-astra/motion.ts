import type {SceneClock} from "./types";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const ease = (v: number) => {const p = clamp01(v); return p * p * (3 - 2 * p);};
export const ramp = (t: number, start: number, duration = 0.8) => ease((t - start) / duration);
export const phase = (c: SceneClock, node = 1, delay = 0, duration = 0.8) =>
  ramp(c.t, c.cues[node] + delay, duration);
export const wave = (t: number, period = 4, offset = 0) => Math.sin(t * Math.PI * 2 / period + offset);
export const hop = (t: number, period = 1, offset = 0) => (1 - Math.cos(t * Math.PI * 2 / period + offset)) / 2;
export const transform = (x: number, y: number, scale = 1, rotate = 0) =>
  "translate(" + x + " " + y + ") rotate(" + rotate + ") scale(" + scale + ")";
export const strike = (c: SceneClock, word: string) =>
  c.units.filter((unit) => unit.text.trim() === word).reduce((sum, unit) => {
    const age = c.t - unit.at;
    return sum + (age >= 0 && age < 0.32 ? Math.sin(age / 0.32 * Math.PI) : 0);
  }, 0);
