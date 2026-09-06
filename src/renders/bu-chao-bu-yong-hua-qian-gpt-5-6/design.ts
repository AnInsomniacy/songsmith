import type { LyricLineStyle } from "./types";

export const COLORS = {
  ink: "#14151A",
  paper: "#F5F0E6",
  cyan: "#00BFD1",
  orange: "#FF5A36",
  lime: "#B8ED45",
  pink: "#E64F87",
} as const;

export type ScenePalette = {
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  quiet: string;
  panel: string;
};

export const PALETTES: ScenePalette[] = [
  {
    background: COLORS.paper,
    foreground: COLORS.ink,
    accent: COLORS.cyan,
    secondary: COLORS.orange,
    quiet: "#D8D1C4",
    panel: "#FFF9EE",
  },
  {
    background: COLORS.ink,
    foreground: COLORS.paper,
    accent: COLORS.lime,
    secondary: COLORS.pink,
    quiet: "#3A3B42",
    panel: "#202126",
  },
  {
    background: COLORS.cyan,
    foreground: COLORS.ink,
    accent: COLORS.paper,
    secondary: COLORS.orange,
    quiet: "#36CBD8",
    panel: "#7FE1E7",
  },
  {
    background: COLORS.orange,
    foreground: COLORS.ink,
    accent: COLORS.paper,
    secondary: COLORS.cyan,
    quiet: "#FF8063",
    panel: "#FF9C83",
  },
  {
    background: COLORS.lime,
    foreground: COLORS.ink,
    accent: COLORS.pink,
    secondary: COLORS.cyan,
    quiet: "#D2F57D",
    panel: "#E1F8A7",
  },
  {
    background: COLORS.pink,
    foreground: COLORS.ink,
    accent: COLORS.paper,
    secondary: COLORS.lime,
    quiet: "#EF79AD",
    panel: "#F49BC1",
  },
];

export const SAFE = {
  x: 138,
  y: 92,
  width: 1644,
  height: 896,
};

const lineStyle = (
  surface: string,
  foreground: string,
  accent: string,
  secondary: string,
  detail: string,
  variant: LyricLineStyle["variant"],
): LyricLineStyle => ({
  surface,
  foreground,
  accent,
  secondary,
  detail,
  variant,
});

const INK_LABEL = ["#171827", "#F5F0E6", "#53D9E7", "#D6F46D"] as const;
const TEAL_LABEL = ["#10353A", "#FFF6E6", "#75E2EB", "#F8C967"] as const;
const PLUM_LABEL = ["#2D1835", "#FFF1E5", "#EF89B0", "#C9F26A"] as const;
const BLUE_LABEL = ["#203A72", "#FFF4DB", "#78E3E6", "#F6D15D"] as const;
const CREAM_LABEL = ["#FFF0CC", "#14151A", "#2446A8", "#8E3152"] as const;
const CYAN_LABEL = ["#C7EFF0", "#14151A", "#155E67", "#8A3156"] as const;
const PINK_LABEL = ["#F7D8E4", "#14151A", "#174F71", "#932852"] as const;
const LIME_LABEL = ["#E5F5BA", "#14151A", "#2E4F98", "#8B2D4A"] as const;
const ORANGE_LABEL = ["#FFD9C9", "#14151A", "#225A75", "#94324A"] as const;
const GRAY_LABEL = ["#E7E3DA", "#14151A", "#2B4B9B", "#8D304D"] as const;
const RED_LABEL = ["#872D43", "#FFF7E8", "#FFE16A", "#7BE4E5"] as const;
const ROYAL_LABEL = ["#293E9A", "#FFF7E8", "#D8F45A", "#7EE3E7"] as const;

const material = (
  colors: readonly [string, string, string, string],
  variant: LyricLineStyle["variant"],
  detail = colors[2],
) => lineStyle(colors[0], colors[1], colors[2], colors[3], detail, variant);

export const LYRIC_LINE_STYLES: Record<string, LyricLineStyle[]> = {
  "greedy-tag": [
    material(INK_LABEL, "ticket", "#53D9E7"),
    material(CREAM_LABEL, "rail", "#8E3152"),
  ],
  "inventory-mirror": [
    material(CYAN_LABEL, "outline", "#155E67"),
    material(PLUM_LABEL, "double", "#EF89B0"),
  ],
  "left-rail": [
    material(GRAY_LABEL, "rail", "#2B4B9B"),
    material(TEAL_LABEL, "underline", "#F8C967"),
  ],
  "pulse-fold": [
    material(PINK_LABEL, "double", "#932852"),
    material(ROYAL_LABEL, "outline", "#D8F45A"),
  ],
  "scanner-apple": [
    material(LIME_LABEL, "underline", "#8B2D4A"),
    material(INK_LABEL, "ticket", "#D6F46D"),
  ],
  "thought-receipt": [
    material(CREAM_LABEL, "ticket", "#2446A8"),
    material(BLUE_LABEL, "rail", "#F6D15D"),
  ],
  "knock-register": [
    material(RED_LABEL, "rail", "#FFE16A"),
    material(CYAN_LABEL, "double", "#8A3156"),
  ],
  "coupon-tear": [
    material(ORANGE_LABEL, "ticket", "#94324A"),
    material(TEAL_LABEL, "outline", "#75E2EB"),
  ],
  "rumor-switchboard": [
    material(GRAY_LABEL, "double", "#8D304D"),
    material(ROYAL_LABEL, "underline", "#7EE3E7"),
  ],
  "ordinary-conveyor": [
    material(LIME_LABEL, "rail", "#2E4F98"),
    material(PLUM_LABEL, "ticket", "#C9F26A"),
  ],
  "flash-prism": [
    material(PINK_LABEL, "outline", "#174F71"),
    material(INK_LABEL, "double", "#53D9E7"),
  ],
  "countdown-seat": [
    material(ORANGE_LABEL, "underline", "#225A75"),
    material(BLUE_LABEL, "ticket", "#78E3E6"),
  ],
  "door-price": [
    material(TEAL_LABEL, "rail", "#F8C967"),
    material(CREAM_LABEL, "outline", "#8E3152"),
  ],
  "coin-shredder": [
    material(RED_LABEL, "double", "#7BE4E5"),
    material(GRAY_LABEL, "ticket", "#2B4B9B"),
  ],
  "sofa-chick": [
    material(CYAN_LABEL, "underline", "#8A3156"),
    material(PLUM_LABEL, "rail", "#EF89B0"),
  ],
  "sofa-smudge": [
    material(LIME_LABEL, "outline", "#2E4F98"),
    material(BLUE_LABEL, "double", "#F6D15D"),
  ],
  "sofa-repeat": [
    material(PINK_LABEL, "ticket", "#932852"),
    material(TEAL_LABEL, "underline", "#75E2EB"),
  ],
  "sofa-exit": [material(INK_LABEL, "outline", "#D6F46D")],
  "greedy-window": [
    material(ORANGE_LABEL, "double", "#94324A"),
    material(ROYAL_LABEL, "rail", "#7EE3E7"),
  ],
  "inventory-split": [
    material(CREAM_LABEL, "underline", "#2446A8"),
    material(RED_LABEL, "ticket", "#FFE16A"),
  ],
  "knock-vending": [
    material(CYAN_LABEL, "rail", "#155E67"),
    material(PLUM_LABEL, "outline", "#C9F26A"),
  ],
  "checkout-zero": [
    material(LIME_LABEL, "double", "#8B2D4A"),
    material(INK_LABEL, "underline", "#53D9E7"),
  ],
  "echo-tag-a": [
    material(BLUE_LABEL, "ticket", "#F6D15D"),
    material(PINK_LABEL, "rail", "#174F71"),
  ],
  "echo-tag-b": [
    material(TEAL_LABEL, "outline", "#75E2EB"),
    material(ORANGE_LABEL, "double", "#225A75"),
  ],
  "echo-tag-c": [
    material(ROYAL_LABEL, "underline", "#D8F45A"),
    material(GRAY_LABEL, "ticket", "#8D304D"),
  ],
  "echo-tag-d": [
    material(PLUM_LABEL, "rail", "#EF89B0"),
    material(CYAN_LABEL, "outline", "#155E67"),
  ],
  "outro-perforation": [material(RED_LABEL, "ticket", "#7BE4E5")],
};

const channel = (value: number) => {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const value = hex.slice(1);
  const [r, g, b] = [0, 2, 4].map((index) =>
    Number.parseInt(value.slice(index, index + 2), 16),
  );
  return channel(r) * 0.2126 + channel(g) * 0.7152 + channel(b) * 0.0722;
};

const contrast = (a: string, b: string) => {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

for (const [pageId, styles] of Object.entries(LYRIC_LINE_STYLES)) {
  for (const style of styles) {
    for (const color of [style.foreground, style.accent, style.secondary]) {
      if (contrast(color, style.surface) < 4.5) {
        throw new Error(`Insufficient fixed lyric contrast on ${pageId}`);
      }
    }
  }
}
