import type { PagePalette } from "./types";

export const COLORS = {
  midnight: "#14263B",
  deepInk: "#121B27",
  oxidizedCyan: "#39777B",
  darkroomRed: "#8A2E4D",
  sodiumGold: "#E7A64A",
  silver: "#D9E0DD",
  coldWhite: "#F3F5F2",
  slate: "#687B82",
} as const;

export const PALETTES: PagePalette[] = [
  {
    background: "#14263B",
    backgroundAlt: "#29495A",
    surface: "#E7ECE9",
    foreground: "#121B27",
    accent: "#812A49",
    secondary: "#175C67",
    detail: "#8C9A99",
    light: "#F3F5F2",
  },
  {
    background: "#39777B",
    backgroundAlt: "#234E5B",
    surface: "#F0E8D9",
    foreground: "#151D27",
    accent: "#842C4B",
    secondary: "#6B4D11",
    detail: "#A9A887",
    light: "#F5F4EC",
  },
  {
    background: "#682940",
    backgroundAlt: "#302033",
    surface: "#ECE7E1",
    foreground: "#141C27",
    accent: "#76213F",
    secondary: "#155968",
    detail: "#A88791",
    light: "#F4F1ED",
  },
  {
    background: "#C88D3D",
    backgroundAlt: "#75482C",
    surface: "#182638",
    foreground: "#F4F5EF",
    accent: "#FFD06A",
    secondary: "#8ED8CE",
    detail: "#60492F",
    light: "#FFF2CE",
  },
  {
    background: "#9AAEB0",
    backgroundAlt: "#607881",
    surface: "#172638",
    foreground: "#F4F5EF",
    accent: "#FFD06A",
    secondary: "#A5E0D6",
    detail: "#435968",
    light: "#F3F5F2",
  },
  {
    background: "#263D58",
    backgroundAlt: "#536F7A",
    surface: "#F0E9DD",
    foreground: "#14202D",
    accent: "#812A49",
    secondary: "#175865",
    detail: "#9B9A90",
    light: "#F8F4EA",
  },
];

const channel = (hex: string, offset: number) =>
  Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;

const luminance = (hex: string) => {
  const transform = (value: number) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  const red = transform(channel(hex, 1));
  const green = transform(channel(hex, 3));
  const blue = transform(channel(hex, 5));
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
};

export const contrastRatio = (foreground: string, background: string) => {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
};
