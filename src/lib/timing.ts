export const frameAt = (milliseconds: number, fps = 60) =>
  Math.round((milliseconds * fps) / 1000);

export const clamp = (value: number) => Math.max(0, Math.min(1, value));

export const smooth = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};
