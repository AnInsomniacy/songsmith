import type { AccentKey, CarrierKind, Page } from "./types";

export const FPS = 60;

export const INK = "#1B1712";
export const MILK = "#F7F4EA";
export const NIGHT_FIELD = "#0E2622";

export const ACCENTS: Record<
  AccentKey,
  { bg: string; text: string; deep: string; glow: string }
> = {
  red: { bg: "#E23A2E", text: "#B3271E", deep: "#B3271E", glow: "#FF8A73" },
  yellow: { bg: "#F2B705", text: "#8A6400", deep: "#8A6400", glow: "#F2C94C" },
  teal: { bg: "#0F5E5C", text: "#0B4B49", deep: "#0B4B49", glow: "#7FD1C6" },
  orange: { bg: "#FF7A1A", text: "#A83E00", deep: "#A83E00", glow: "#FFA45B" },
  ink: { bg: "#1B1712", text: "#1B1712", deep: "#1B1712", glow: "#F7F4EA" },
  milk: { bg: "#F7F4EA", text: "#8A8272", deep: "#D8D2C0", glow: "#F7F4EA" },
};

export type CarrierPalette = {
  dark: boolean;
  bg: string;
  base: string;
  hot: string;
  hot2: string;
  border: string;
};

export const carrierPalette = (
  kind: CarrierKind,
  accent: AccentKey,
  support: AccentKey,
): CarrierPalette => {
  switch (kind) {
    case "pop":
    case "banner":
      return {
        dark: true,
        bg: ACCENTS[accent].deep,
        base: "#FFF6E8",
        hot: "#FFE9C9",
        hot2: "#FFFFFF",
        border: INK,
      };
    case "led":
      return {
        dark: true,
        bg: "#101B1A",
        base: "#EDE6CF",
        hot: "#F2C94C",
        hot2: "#8FD6C6",
        border: "#2C3E37",
      };
    case "plaque":
      return {
        dark: true,
        bg: "#173430",
        base: "#F7F4EA",
        hot: "#F2C94C",
        hot2: "#FFB27A",
        border: "#0B1B18",
      };
    case "receipt":
      return {
        dark: false,
        bg: "#FEFEFB",
        base: INK,
        hot: ACCENTS[accent].text,
        hot2: ACCENTS[support].text,
        border: "#C9C2B0",
      };
    case "tag":
    default:
      return {
        dark: false,
        bg: "#FDFBF4",
        base: INK,
        hot: ACCENTS[accent].text,
        hot2: ACCENTS[support].text,
        border: INK,
      };
  }
};

export const pagePalette = (page: Page) => ({
  field: page.field,
  ink: INK,
  milk: MILK,
  accent: ACCENTS[page.accent],
  support: ACCENTS[page.support],
  night: page.night,
});

export const luminance = (hex: string): number => {
  const rgb = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((c) => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};

export const contrastRatio = (fg: string, bg: string): number => {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

export const hardShadow = (offset = 6, alpha = 0.16): string =>
  `${offset}px ${offset}px 0 rgba(27, 23, 18, ${alpha})`;

export const nightShadow = (offset = 6, alpha = 0.5): string =>
  `0 ${offset}px 0 rgba(0, 0, 0, ${alpha})`;

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const hashSeed = (text: string): number => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const wave = (t: number, period: number, phase = 0): number =>
  Math.sin(((t + phase) / period) * Math.PI * 2);

export const scopeId = (pageId: string, name: string): string =>
  `glm53-${pageId}-${name}`;
