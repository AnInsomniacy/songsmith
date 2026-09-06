export const C = {
  ink: "#18213D",
  porcelain: "#EFF0EA",
  cobalt: "#354DCB",
  red: "#AD423A",
  yellow: "#E8BD52",
  lavender: "#B3A5D6",
} as const;

export const INKS = {
  day: {panel: C.porcelain, body: C.ink, accent: C.cobalt, secondary: C.red},
  night: {panel: C.ink, body: C.porcelain, accent: C.yellow, secondary: C.lavender},
} as const;

const luminance = (hex: string) => {
  const channels = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};
export const contrast = (a: string, b: string) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);

for (const ink of Object.values(INKS)) {
  for (const text of [ink.body, ink.accent, ink.secondary]) {
    if (contrast(text, ink.panel) < 4.5) throw new Error("Theatre text contrast is below 4.5:1");
  }
}
