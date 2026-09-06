import type { PagePalette } from "./types";

export const COLORS = {
  navy: "#1C2438",
  navyAlt: "#2B344C",
  cream: "#F3E6C8",
  wine: "#8B2E3A",
  sofa: "#C4A06A",
  violet: "#6E5BFF",
  brass: "#C49A3C",
  ink: "#14141C",
  night: "#121722",
} as const;

export const PALETTES: Record<"room" | "lamp" | "party" | "chorus" | "sofa" | "finale", PagePalette> = {
  room: {
    background: COLORS.navy,
    backgroundAlt: COLORS.navyAlt,
    surface: COLORS.cream,
    foreground: COLORS.ink,
    accent: COLORS.wine,
    secondary: "#5C3D16",
    detail: "#8A7A5C",
    light: "#F7EFD8",
  },
  lamp: {
    background: "#243044",
    backgroundAlt: "#3A465C",
    surface: COLORS.cream,
    foreground: COLORS.ink,
    accent: "#7A4E00",
    secondary: COLORS.wine,
    detail: "#9A7A40",
    light: "#FFE7B0",
  },
  party: {
    background: "#1A1B33",
    backgroundAlt: "#2C2750",
    surface: COLORS.cream,
    foreground: COLORS.ink,
    accent: "#4A2A86",
    secondary: COLORS.wine,
    detail: "#6B5AA8",
    light: "#E8E2FF",
  },
  chorus: {
    background: "#241820",
    backgroundAlt: "#3A2430",
    surface: COLORS.cream,
    foreground: COLORS.ink,
    accent: COLORS.wine,
    secondary: "#7A4E00",
    detail: "#A45A62",
    light: "#F6D9C8",
  },
  sofa: {
    background: "#2A241C",
    backgroundAlt: "#3E3428",
    surface: COLORS.cream,
    foreground: COLORS.ink,
    accent: COLORS.wine,
    secondary: "#6A3A22",
    detail: "#B08A4C",
    light: "#F3E0B8",
  },
  finale: {
    background: "#10141C",
    backgroundAlt: "#1C2230",
    surface: COLORS.cream,
    foreground: COLORS.ink,
    accent: COLORS.wine,
    secondary: "#5C3D16",
    detail: "#6A5850",
    light: "#E8DCC0",
  },
};

const channel = (hex: string, offset: number) =>
  Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;

const luminance = (hex: string) => {
  const to = (value: number) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  return (
    to(channel(hex, 1)) * 0.2126 +
    to(channel(hex, 3)) * 0.7152 +
    to(channel(hex, 5)) * 0.0722
  );
};

export const contrastRatio = (a: string, b: string) => {
  const light = Math.max(luminance(a), luminance(b));
  const dark = Math.min(luminance(a), luminance(b));
  return (light + 0.05) / (dark + 0.05);
};

for (const [name, palette] of Object.entries(PALETTES)) {
  for (const color of [palette.foreground, palette.accent, palette.secondary]) {
    if (contrastRatio(color, palette.surface) < 4.5) {
      throw new Error(`Low lyric contrast on ${name}: ${color}`);
    }
  }
}
