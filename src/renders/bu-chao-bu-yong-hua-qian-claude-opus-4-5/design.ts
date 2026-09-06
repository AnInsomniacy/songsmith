import type { PagePalette, StickyStyle } from "./types";

export const COLORS = {
  paper: "#FFF8E7",
  ink: "#1C1917",
  pencil: "#78716C",
  marker: "#DC2626",
  highlighter: "#FCD34D",
  ballpoint: "#2563EB",
  stickyYellow: "#FEF08A",
  stickyPink: "#FBCFE8",
  stickyBlue: "#BFDBFE",
  stickyWhite: "#FAFAF9",
  stickyGreen: "#BBF7D0",
  stickyBorderYellow: "#EAB308",
  stickyBorderPink: "#EC4899",
  stickyBorderBlue: "#3B82F6",
  stickyBorderWhite: "#D6D3D1",
  stickyBorderGreen: "#22C55E",
} as const;

export const stickyPalette = (style: StickyStyle): { bg: string; border: string } => {
  switch (style) {
    case "yellow":
      return { bg: COLORS.stickyYellow, border: COLORS.stickyBorderYellow };
    case "pink":
      return { bg: COLORS.stickyPink, border: COLORS.stickyBorderPink };
    case "blue":
      return { bg: COLORS.stickyBlue, border: COLORS.stickyBorderBlue };
    case "green":
      return { bg: COLORS.stickyGreen, border: COLORS.stickyBorderGreen };
    case "white":
    default:
      return { bg: COLORS.stickyWhite, border: COLORS.stickyBorderWhite };
  }
};

export const basePalette = (stickyStyle: StickyStyle): PagePalette => {
  const sticky = stickyPalette(stickyStyle);
  return {
    paper: COLORS.paper,
    ink: COLORS.ink,
    pencil: COLORS.pencil,
    marker: COLORS.marker,
    highlighter: COLORS.highlighter,
    ballpoint: COLORS.ballpoint,
    stickyBg: sticky.bg,
    stickyBorder: sticky.border,
  };
};

export const contrastRatio = (fg: string, bg: string): number => {
  const luminance = (hex: string) => {
    const rgb = hex
      .slice(1)
      .match(/.{2}/g)!
      .map((c) => {
        const v = parseInt(c, 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
