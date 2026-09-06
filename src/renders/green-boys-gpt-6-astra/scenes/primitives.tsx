import React from "react";
import { P } from "../design";
export type SceneProps = { t: number; phase: number; id: string };
export const wave = (t: number, period = 6, offset = 0) =>
  Math.sin((t * Math.PI * 2) / period + offset);
export const ease = (x: number) => {
  const p = Math.min(1, Math.max(0, x));
  return p * p * (3 - 2 * p);
};
export const World: React.FC<{
  children: React.ReactNode;
  fill: string;
  id: string;
}> = ({ children, fill, id }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    style={{ position: "absolute", inset: 0 }}
  >
    <defs>
      <pattern
        id={`${id}-paper`}
        width="47"
        height="53"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="7" cy="11" r=".7" fill={P.pine} opacity=".12" />
        <circle cx="29" cy="40" r=".8" fill={P.cloud} opacity=".25" />
      </pattern>
    </defs>
    <path fill={fill} d="M0 0H1920V1080H0Z" />
    {children}
    <path
      fill={`url(#${id}-paper)`}
      d="M0 0H1920V1080H0Z"
      pointerEvents="none"
    />
  </svg>
);
export const Cloud: React.FC<{
  x: number;
  y: number;
  s?: number;
  fill?: string;
}> = ({ x, y, s = 1, fill = P.cloud }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
    <path d="M0 54C-18 20 22 1 51 17C65-31 129-29 150 12C177-1 220 18 213 49C253 44 273 76 238 84H13C-9 84-18 66 0 54Z" />
  </g>
);
export const Sprig: React.FC<{
  x: number;
  y: number;
  s?: number;
  angle?: number;
  fill?: string;
}> = ({ x, y, s = 1, angle = 0, fill = P.leaf }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
    <path d="M0 0Q-5-70 0-168" stroke={fill} strokeWidth="7" fill="none" />
    <path
      d="M-2-53Q-79-41-63-108Q-3-103-2-53M0-94Q71-79 70-144Q16-143 0-94M0-141Q-37-161-7-200Q26-172 0-141"
      fill={fill}
    />
  </g>
);
export const Shoe: React.FC<{
  x: number;
  y: number;
  s?: number;
  fill?: string;
}> = ({ x, y, s = 1, fill = P.cloud }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M-170-65Q-119-71-85-17L18-22Q68-25 107 1L186 34Q213 56 185 77L-175 77Q-213 37-170-65Z"
      fill={fill}
    />
    <path d="M-196 54Q-50 85 203 47L190 83H-183Z" fill={P.pine} />
    <path
      d="M-42-8L28 15M-76-4L-1 23M-111-6L-38 29"
      stroke={P.clay}
      strokeWidth="11"
      strokeLinecap="round"
    />
    <path
      d="M22 30L102 35"
      stroke={P.leaf}
      strokeWidth="13"
      strokeLinecap="round"
    />
  </g>
);
export const Ripple: React.FC<{
  x: number;
  y: number;
  t: number;
  scale?: number;
  color?: string;
}> = ({ x, y, t, scale = 1, color = P.cloud }) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    fill="none"
    stroke={color}
    strokeWidth="3"
  >
    {[0, 1, 2].map((i) => (
      <ellipse
        key={i}
        rx={70 + i * 48 + wave(t, 5, i) * 12}
        ry={14 + i * 9 + wave(t, 5, i) * 2}
        opacity={0.4 - i * 0.08}
      />
    ))}
  </g>
);
export const Flag: React.FC<{
  x: number;
  y: number;
  t: number;
  fill?: string;
  scale?: number;
}> = ({ x, y, t, fill = P.clay, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 0V300" stroke={P.pine} strokeWidth="8" />
    <path
      d={`M4 0Q63 ${-22 + wave(t) * 12} 141 0L133 97Q59 ${68 + wave(t) * 12} 4 94Z`}
      fill={fill}
    />
  </g>
);
