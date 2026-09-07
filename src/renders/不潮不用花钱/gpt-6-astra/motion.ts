import { clamp } from "../../../lib/timing";
export { frameAt, clamp, smooth } from "../../../lib/timing";

export const easeOut = (v: number) => 1 - Math.pow(1 - clamp(v), 3);

export const wave = (t: number, period = 5, phase = 0) =>
  Math.sin((t * Math.PI * 2) / period + phase);

export const turn = (t: number, period = 8) => (t * 360) / period;
