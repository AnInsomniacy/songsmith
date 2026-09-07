import type { Palette } from "./types";

export const PALETTES: Palette[] = [
  {
    background: "#16263D",
    backgroundAlt: "#244762",
    surface: "#FFF4D8",
    foreground: "#102239",
    accent: "#F05D3E",
    secondary: "#2E8B75",
    detail: "#E9B949",
  },
  {
    background: "#E7A941",
    backgroundAlt: "#F4D785",
    surface: "#17304B",
    foreground: "#FFF8E8",
    accent: "#EF5B41",
    secondary: "#78D3C4",
    detail: "#17304B",
  },
  {
    background: "#D95A44",
    backgroundAlt: "#F2A25F",
    surface: "#FFF3DC",
    foreground: "#18283F",
    accent: "#2B7A78",
    secondary: "#C33C54",
    detail: "#F4C34D",
  },
  {
    background: "#287A75",
    backgroundAlt: "#68B7A8",
    surface: "#FFF1C9",
    foreground: "#142940",
    accent: "#D7493D",
    secondary: "#7251A8",
    detail: "#F0C34E",
  },
  {
    background: "#293D72",
    backgroundAlt: "#5066A3",
    surface: "#F9EBCB",
    foreground: "#12233D",
    accent: "#EF6A45",
    secondary: "#2F8871",
    detail: "#F2BD43",
  },
  {
    background: "#A83D58",
    backgroundAlt: "#D86668",
    surface: "#FFF0D2",
    foreground: "#172840",
    accent: "#287D78",
    secondary: "#C78A17",
    detail: "#FFCB56",
  },
];

const luminance = (hex: string) => {
  const rgb = [1, 3, 5]
    .map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
export const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
