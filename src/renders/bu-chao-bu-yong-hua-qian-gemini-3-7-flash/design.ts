import type { PagePalette } from "./types";

export const RAW_COLORS = {
  obsidian: "#0B0C10",
  rawCanvas: "#F7F3E9",
  pureWhite: "#FFFDF7",
  voltageBright: "#E6FF00",
  voltageMuted: "#686400",
  ultramarineDeep: "#0826C7",
  ultramarineGlow: "#7BA0FF",
  crimsonDeep: "#C7002E",
  crimsonNeon: "#FF456B",
  slateDark: "#181B22",
  slateLight: "#8E95A8",
} as const;

export const PALETTES: PagePalette[] = [
  // 0: Obsidian Canvas (Light Woven Label)
  {
    background: "#0B0C10",
    backgroundAlt: "#151821",
    surface: "#F7F3E9",
    surfaceBorder: "#1038FF",
    text: "#0B0C10",
    voltage: "#686400",
    ultramarine: "#0826C7",
    crimson: "#C7002E",
    slate: "#4A4E5C",
    detail: "#E6FF00",
  },
  // 1: Obsidian Dark Plate (Dark Woven Label)
  {
    background: "#08090C",
    backgroundAlt: "#12141C",
    surface: "#141722",
    surfaceBorder: "#E6FF00",
    text: "#FFFFFF",
    voltage: "#E6FF00",
    ultramarine: "#7BA0FF",
    crimson: "#FF456B",
    slate: "#8E95A8",
    detail: "#FF1E4B",
  },
  // 2: Ultramarine Blue (Light Label)
  {
    background: "#091D8A",
    backgroundAlt: "#0E28BA",
    surface: "#FFFDF7",
    surfaceBorder: "#FF1E4B",
    text: "#091D8A",
    voltage: "#686400",
    ultramarine: "#091D8A",
    crimson: "#C7002E",
    slate: "#4A4E5C",
    detail: "#E6FF00",
  },
  // 3: Acid Voltage Street (Dark Label)
  {
    background: "#B8CC00",
    backgroundAlt: "#9EAF00",
    surface: "#0D0E12",
    surfaceBorder: "#E6FF00",
    text: "#F7F3E9",
    voltage: "#E6FF00",
    ultramarine: "#7BA0FF",
    crimson: "#FF456B",
    slate: "#8E95A8",
    detail: "#1038FF",
  },
  // 4: Crimson Streetwear (Light Label)
  {
    background: "#7A0019",
    backgroundAlt: "#A30022",
    surface: "#FFFDF7",
    surfaceBorder: "#0B0C10",
    text: "#12131A",
    voltage: "#686400",
    ultramarine: "#0826C7",
    crimson: "#A30022",
    slate: "#4A4E5C",
    detail: "#E6FF00",
  },
  // 5: Industrial Steel Slate (Dark Label)
  {
    background: "#181B22",
    backgroundAlt: "#252A36",
    surface: "#0B0C10",
    surfaceBorder: "#FF456B",
    text: "#F7F3E9",
    voltage: "#E6FF00",
    ultramarine: "#7BA0FF",
    crimson: "#FF456B",
    slate: "#8E95A8",
    detail: "#E6FF00",
  },
];

export const channel = (value: number): number => {
  const norm = value / 255;
  return norm <= 0.04045 ? norm / 12.92 : ((norm + 0.055) / 1.055) ** 2.4;
};

export const luminance = (hex: string): number => {
  const val = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) =>
    Number.parseInt(val.slice(i, i + 2), 16),
  );
  return channel(r) * 0.2126 + channel(g) * 0.7152 + channel(b) * 0.0722;
};

export const contrastRatio = (fg: string, bg: string): number => {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

// Static verification on module load
for (let i = 0; i < PALETTES.length; i++) {
  const p = PALETTES[i];
  const keys: (keyof Pick<PagePalette, "text" | "voltage" | "ultramarine" | "crimson">)[] = [
    "text",
    "voltage",
    "ultramarine",
    "crimson",
  ];
  for (const k of keys) {
    const cr = contrastRatio(p[k], p.surface);
    if (cr < 4.5) {
      throw new Error(
        `Contrast violation in Palette ${i}: ${k} (${p[k]}) on surface (${p.surface}) is ${cr.toFixed(2)}:1 (< 4.5:1)`,
      );
    }
  }
}

export const SAFE_AREA = {
  x: 120,
  y: 80,
  width: 1680,
  height: 920,
};
