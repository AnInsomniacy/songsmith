import type { PagePalette } from "./types";

// NEON ARCADE 语义色：厅底紫黑 / 霓虹粉（招牌·欲望）/ 电光蓝（通电·屏幕）/
// 霓虹黄（投币·金钱）/ 得分绿（绝活·灵光）/ 冷白（正文）/ 金属灰（机身）
export const COLORS = {
  hall: "#171226",
  panelDark: "#1E1833",
  screen: "#0C1024",
  neonPink: "#FF2E6E",
  neonBlue: "#4A86FF",
  neonYellow: "#FFC72C",
  scoreGreen: "#3DDC84",
  coldWhite: "#F2F4F6",
  metal: "#9AA3B5",
} as const;

export const PALETTES: PagePalette[] = [
  {
    background: "#171226",
    backgroundAlt: "#241B3D",
    surface: "#0D1128",
    foreground: "#F2F4F6",
    accent: "#4A86FF",
    secondary: "#FF2E6E",
    detail: "#9AA3B5",
    light: "#7FB4FF",
  },
  {
    background: "#171226",
    backgroundAlt: "#2A1833",
    surface: "#141030",
    foreground: "#F2F4F6",
    accent: "#FF2E6E",
    secondary: "#4A86FF",
    detail: "#8E86A8",
    light: "#FF9EC0",
  },
  {
    background: "#171226",
    backgroundAlt: "#27210F",
    surface: "#1E1833",
    foreground: "#F2F4F6",
    accent: "#FFC72C",
    secondary: "#FF2E6E",
    detail: "#B9A47C",
    light: "#FFE9A8",
  },
  {
    background: "#0E1B20",
    backgroundAlt: "#12302A",
    surface: "#0C1424",
    foreground: "#F2F4F6",
    accent: "#3DDC84",
    secondary: "#FFC72C",
    detail: "#7FA8A0",
    light: "#A9F5CD",
  },
  {
    background: "#0D0D1C",
    backgroundAlt: "#161636",
    surface: "#0A1026",
    foreground: "#F2F4F6",
    accent: "#4A86FF",
    secondary: "#3DDC84",
    detail: "#7C86A8",
    light: "#93B4FF",
  },
  {
    background: "#0A0A14",
    backgroundAlt: "#12121E",
    surface: "#10101C",
    foreground: "#F2F4F6",
    accent: "#FF2E6E",
    secondary: "#9AA3B5",
    detail: "#5A6072",
    light: "#C9CCD8",
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
