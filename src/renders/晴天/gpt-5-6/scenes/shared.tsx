import { noise2D } from "@remotion/noise";
import React from "react";
export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export type Palette = {
  bg: string;
  paper: string;
  line: string;
  accent: string;
  second: string;
};

export type ArtProps = {
  t: number;
  enter: number;
  act2: number;
  palette: Palette;
  index: number;
};

export const PALETTES: Palette[] = [
  {
    bg: "#AFC9D4",
    paper: "#E9E4D6",
    line: "#263A52",
    accent: "#D7A72E",
    second: "#5C806A",
  },
  {
    bg: "#9FC5C7",
    paper: "#ECE3D2",
    line: "#20364E",
    accent: "#CB7468",
    second: "#526F62",
  },
  {
    bg: "#283B56",
    paper: "#D9DDD2",
    line: "#4C6B8A",
    accent: "#F0C75A",
    second: "#B85B52",
  },
  {
    bg: "#B9D5DD",
    paper: "#E9E5DA",
    line: "#334A62",
    accent: "#E5A84C",
    second: "#8B6A83",
  },
  {
    bg: "#9CB5B7",
    paper: "#E6DFD0",
    line: "#284157",
    accent: "#C86A5A",
    second: "#D5A637",
  },
  {
    bg: "#42665D",
    paper: "#DAD9CD",
    line: "#183047",
    accent: "#D99B4D",
    second: "#7399A3",
  },
  {
    bg: "#4D6E8A",
    paper: "#D9E0DD",
    line: "#203B58",
    accent: "#69A7B6",
    second: "#D1A248",
  },
  {
    bg: "#A8BBAE",
    paper: "#ECE0CA",
    line: "#283A4D",
    accent: "#B9534E",
    second: "#B28A32",
  },
  {
    bg: "#B8C9C4",
    paper: "#E5DFD2",
    line: "#253B53",
    accent: "#8A5878",
    second: "#447A6A",
  },
  {
    bg: "#536F88",
    paper: "#D7DEDB",
    line: "#1E354E",
    accent: "#C85D55",
    second: "#D0A142",
  },
  {
    bg: "#C0D2CC",
    paper: "#ECE6D9",
    line: "#30485B",
    accent: "#E0A52C",
    second: "#5D8173",
  },
  {
    bg: "#667F96",
    paper: "#D8DCD5",
    line: "#233850",
    accent: "#8E5F82",
    second: "#E1B347",
  },
  {
    bg: "#405875",
    paper: "#DCD9D0",
    line: "#182D47",
    accent: "#B94E4C",
    second: "#C8943E",
  },
  {
    bg: "#9BB8C0",
    paper: "#E8E1D4",
    line: "#263C53",
    accent: "#D77458",
    second: "#547769",
  },
  {
    bg: "#BCB8A7",
    paper: "#ECE1CC",
    line: "#314255",
    accent: "#CB684E",
    second: "#6C8396",
  },
  {
    bg: "#577895",
    paper: "#D8E0DD",
    line: "#1D3753",
    accent: "#4A99A8",
    second: "#D0A449",
  },
  {
    bg: "#7E8D84",
    paper: "#E7DECE",
    line: "#293A4B",
    accent: "#B94F4C",
    second: "#E0B03C",
  },
  {
    bg: "#50677F",
    paper: "#D8DFDC",
    line: "#1C334D",
    accent: "#C85D55",
    second: "#87618B",
  },
  {
    bg: "#607C93",
    paper: "#D8DDDA",
    line: "#20364D",
    accent: "#B84D50",
    second: "#D6A33C",
  },
  {
    bg: "#BDD4CF",
    paper: "#ECE6D8",
    line: "#30495A",
    accent: "#E3AD32",
    second: "#4E806F",
  },
  {
    bg: "#75899A",
    paper: "#DDDCD4",
    line: "#23364B",
    accent: "#8D617F",
    second: "#D6A743",
  },
  {
    bg: "#465D76",
    paper: "#D9D9D1",
    line: "#172D46",
    accent: "#B64B4C",
    second: "#CB9A3A",
  },
  {
    bg: "#435E79",
    paper: "#D5DDDC",
    line: "#1B324B",
    accent: "#6AA7B2",
    second: "#C75B55",
  },
  {
    bg: "#C6D9D2",
    paper: "#EFE7D8",
    line: "#2E4857",
    accent: "#E4A72F",
    second: "#5B866F",
  },
  {
    bg: "#657A91",
    paper: "#DADDD8",
    line: "#20354D",
    accent: "#765D91",
    second: "#C85A54",
  },
  {
    bg: "#98B8BD",
    paper: "#E9E2D5",
    line: "#253B52",
    accent: "#C44E4B",
    second: "#E0AA36",
  },
];

export const Cloud: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color: string;
  opacity?: number;
}> = ({ x, y, scale = 1, color, opacity = 0.38 }) => (
  <path
    d="M0 64 C18 24 58 24 82 42 C100 -4 164 -8 187 38 C230 24 263 55 252 86 C190 98 64 98 0 84 Z"
    transform={`translate(${x} ${y}) scale(${scale})`}
    fill={color}
    opacity={opacity}
  />
);

export const Particles: React.FC<{
  t: number;
  seed: number;
  color: string;
  count?: number;
  area?: "full" | "right";
}> = ({ t, seed, color, count = 9, area = "full" }) => (
  <g fill={color} opacity="0.42">
    {Array.from({ length: count }).map((_, i) => {
      const span = area === "right" ? 760 : 1780;
      const start = area === "right" ? 1080 : 70;
      const x = start + ((i * 197 + t * (22 + (i % 4) * 5) + seed * 41) % span);
      const y = 100 + ((i * 131 + t * (13 + (i % 3) * 4) + seed * 29) % 820);
      return (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={7 + (i % 3) * 3}
          ry={3 + (i % 2) * 2}
          transform={`rotate(${t * 58 + i * 43} ${x} ${y})`}
        />
      );
    })}
  </g>
);

export const Rain: React.FC<{
  t: number;
  seed: number;
  color: string;
  count?: number;
}> = ({ t, seed, color, count = 30 }) => (
  <g stroke={color} strokeLinecap="round">
    {Array.from({ length: count }).map((_, i) => {
      const x =
        50 + i * (1820 / count) + noise2D(seed, i * 0.18, t * 0.16) * 28;
      const y = -170 + ((t * (250 + (i % 5) * 34) + i * 91) % 1320);
      return (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x - 24}
          y2={y + 118 + (i % 4) * 18}
          strokeWidth={i % 5 === 0 ? 3 : 1.7}
          opacity={0.2 + (i % 4) * 0.07}
        />
      );
    })}
  </g>
);
