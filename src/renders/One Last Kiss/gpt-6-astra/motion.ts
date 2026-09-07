export { clamp, smooth } from "../../../lib/timing";

export const wave = (t: number, period = 7, phase = 0) =>
  Math.sin((t * Math.PI * 2) / period + phase);
