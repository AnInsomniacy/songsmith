import React from "react";
import { COLORS } from "./design";
import type { PagePalette } from "./types";

export const wave = (ms: number, period: number, phase = 0) =>
  Math.sin(((ms + phase) / period) * Math.PI * 2);
export const ping = (ms: number, period: number, phase = 0) =>
  (1 - Math.cos(((ms + phase) / period) * Math.PI * 2)) / 2;

export const PlaidFill: React.FC<{ id: string; a: string; b: string; c: string }> = ({
  id,
  a,
  b,
  c,
}) => (
  <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
    <rect width="64" height="64" fill={a} />
    <path d="M0 32 H64" stroke={b} strokeWidth="18" opacity="0.62" />
    <path d="M32 0 V64" stroke={b} strokeWidth="18" opacity="0.62" />
    <path d="M0 32 H64 M32 0 V64" stroke={c} strokeWidth="3.2" opacity="0.38" />
    <path d="M0 0 L64 64 M64 0 L0 64" stroke={c} strokeWidth="1.2" opacity="0.12" />
  </pattern>
);

export const WoodFill: React.FC<{ id: string; a: string; b: string }> = ({ id, a, b }) => (
  <pattern id={id} width="240" height="36" patternUnits="userSpaceOnUse">
    <rect width="240" height="36" fill={a} />
    <path d="M0 35 H240" stroke={b} strokeWidth="2" opacity="0.45" />
    <path d="M70 4 C90 18 110 6 140 20" fill="none" stroke={b} strokeWidth="1.4" opacity="0.22" />
  </pattern>
);

export const Sofa: React.FC<{
  x: number;
  y: number;
  scale?: number;
  squat?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, squat = 0, p }) => (
  <g transform={`translate(${x} ${y + squat * 36}) scale(${scale} ${scale * (1 - squat * 0.08)})`}>
    <ellipse cx="270" cy="168" rx="250" ry="18" fill="#000" opacity="0.22" />
    <rect x="48" y="126" width="24" height="52" rx="6" fill="#3D2A18" />
    <rect x="468" y="126" width="24" height="52" rx="6" fill="#3D2A18" />
    <path d="M18 48 H522 L498 136 H42 Z" fill={COLORS.sofa} />
    <path d="M42 92 H498 L486 136 H54 Z" fill={p.secondary} opacity="0.35" />
    <rect x="52" y="14" width="198" height="86" rx="20" fill={p.light} />
    <rect x="268" y="14" width="198" height="86" rx="20" fill={p.light} opacity="0.88" />
    <path d="M10 44 C10 6 78 6 78 44" fill={COLORS.sofa} />
    <path d="M460 44 C460 6 528 6 528 44" fill={COLORS.sofa} />
    <path d="M86 28 H232" stroke={p.accent} strokeWidth="5" opacity="0.35" />
  </g>
);

export const Apple: React.FC<{ x: number; y: number; scale?: number; rotate?: number }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <path d="M0 -38 C18 -58 42 -18 16 10" fill="none" stroke="#3D6B3A" strokeWidth="8" />
    <ellipse cx="0" cy="10" rx="34" ry="40" fill={COLORS.wine} />
    <ellipse cx="-11" cy="-2" rx="9" ry="7" fill="#F3E6C8" opacity="0.38" />
  </g>
);

export const LeftHand: React.FC<{
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  p: PagePalette;
}> = ({ x, y, rotate = 0, scale = 1, p }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <path
      d="M-18 34 C-86 12 -74 -44 -16 -54 C14 -78 48 -42 40 -6 C78 -20 92 24 42 40 C18 92 -34 86 -18 34 Z"
      fill={p.light}
    />
    <path d="M16 -10 C28 -52 4 -74 -10 -38" fill={p.accent} opacity="0.78" />
    <circle cx="10" cy="12" r="9" fill={p.accent} />
  </g>
);

export const Brick: React.FC<{ x: number; y: number; scale?: number; p: PagePalette }> = ({
  x,
  y,
  scale = 1,
  p,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x="-40" y="-6" width="80" height="92" rx="12" fill={p.accent} />
    <rect x="-34" y="-74" width="68" height="68" rx="22" fill={p.accent} />
    <circle cx="-12" cy="-48" r="7" fill={p.surface} />
    <circle cx="14" cy="-48" r="7" fill={p.surface} />
    <path d="M-12 -30 L14 -30" stroke={p.surface} strokeWidth="4" />
    <rect x="-28" y="16" width="22" height="30" fill={p.secondary} />
    <rect x="8" y="16" width="22" height="30" fill={p.secondary} />
    <rect x="-18" y="8" width="14" height="8" fill={p.light} opacity="0.45" />
  </g>
);

export const Coin: React.FC<{ x: number; y: number; scale?: number; spin?: number }> = ({
  x,
  y,
  scale = 1,
  spin = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale * spin}, ${scale})`}>
    <ellipse cx="0" cy="5" rx="28" ry="26" fill="#8A6A20" />
    <ellipse cx="0" cy="0" rx="28" ry="26" fill={COLORS.brass} />
    <ellipse cx="0" cy="0" rx="15" ry="13" fill="none" stroke="#8A6A20" strokeWidth="3" />
  </g>
);

export const Chick: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="0" cy="10" rx="30" ry="22" fill="#E7C25A" />
    <circle cx="12" cy="-10" r="17" fill="#E7C25A" />
    <circle cx="18" cy="-14" r="3.2" fill="#14141C" />
    <path d="M26 -10 L42 -5 L26 0 Z" fill="#D4652A" />
    <path d="M-8 28 L-2 18 L6 28" fill="#D4652A" />
  </g>
);

export const Smudge: React.FC<{ x: number; y: number; scale?: number; p: PagePalette }> = ({
  x,
  y,
  scale = 1,
  p,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="0" cy="16" rx="58" ry="20" fill={p.detail} opacity="0.9" />
    <circle cx="-20" cy="-4" r="18" fill={p.accent} />
    <circle cx="18" cy="0" r="22" fill={p.secondary} />
    <circle cx="-8" cy="8" r="10" fill={p.light} opacity="0.55" />
  </g>
);

export const Lamp: React.FC<{ x: number; y: number; glow: number; p: PagePalette }> = ({
  x,
  y,
  glow,
  p,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="-5" y="8" width="10" height="168" fill={p.detail} />
    <path d="M-52 -10 H52 L30 44 H-30 Z" fill={p.accent} />
    <ellipse
      cx="0"
      cy="12"
      rx={80 + glow * 70}
      ry={30 + glow * 18}
      fill={p.light}
      opacity={0.2 + glow * 0.32}
    />
  </g>
);

export const Door: React.FC<{ x: number; y: number; open: number; p: PagePalette }> = ({
  x,
  y,
  open,
  p,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="228" height="540" fill={p.backgroundAlt} />
    <g transform={`scale(${1 - open * 0.78}, 1)`}>
      <rect width="228" height="540" fill={p.secondary} />
      <rect x="24" y="36" width="180" height="210" fill={p.background} opacity="0.28" />
      <rect x="24" y="270" width="180" height="210" fill={p.background} opacity="0.18" />
      <circle cx="184" cy="278" r="11" fill={p.accent} />
    </g>
  </g>
);

export const Eyes: React.FC<{ x: number; y: number; open: number; p: PagePalette }> = ({
  x,
  y,
  open,
  p,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx="-52" cy="0" rx="38" ry={7 + open * 30} fill={p.surface} />
    <ellipse cx="52" cy="0" rx="38" ry={7 + open * 30} fill={p.surface} />
    <circle cx="-52" cy="0" r={open * 13} fill={p.foreground} />
    <circle cx="52" cy="0" r={open * 13} fill={p.foreground} />
  </g>
);

export const Figure: React.FC<{
  x: number;
  y: number;
  stopped?: boolean;
  lean?: number;
  p: PagePalette;
}> = ({ x, y, stopped, lean = 0, p }) => (
  <g transform={`translate(${x} ${y}) rotate(${lean})`}>
    <circle cx="0" cy="-74" r="22" fill={stopped ? p.accent : p.detail} />
    <rect
      x="-18"
      y="-52"
      width="36"
      height="74"
      rx="11"
      fill={stopped ? p.accent : p.secondary}
    />
    <rect x="-24" y="22" width="14" height="42" fill={p.foreground} opacity="0.72" />
    <rect x="10" y="22" width="14" height="42" fill={p.foreground} opacity="0.72" />
  </g>
);

export const Window: React.FC<{ x: number; y: number; p: PagePalette }> = ({ x, y, p }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="280" height="360" fill={p.detail} />
    <rect x="16" y="16" width="114" height="150" fill={p.background} />
    <rect x="150" y="16" width="114" height="150" fill={p.background} />
    <rect x="16" y="184" width="114" height="150" fill={p.backgroundAlt} />
    <rect x="150" y="184" width="114" height="150" fill={p.backgroundAlt} />
    <rect x="16" y="16" width="248" height="36" fill={p.light} opacity="0.16" />
  </g>
);

export const Shirt: React.FC<{ x: number; y: number; sway: number; p: PagePalette }> = ({
  x,
  y,
  sway,
  p,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${sway})`}>
    <path d="M-8 -8 H8 V6" stroke={p.detail} strokeWidth="6" />
    <path d="M-70 8 L0 -6 L70 8 L58 120 H-58 Z" fill={p.accent} opacity="0.92" />
    <path d="M-48 28 H48 M-48 58 H48 M-48 88 H48" stroke={p.light} strokeWidth="8" opacity="0.35" />
    <path d="M-20 8 V120 M20 8 V120" stroke={p.light} strokeWidth="8" opacity="0.35" />
  </g>
);

export const Vinyl: React.FC<{ x: number; y: number; spin: number }> = ({ x, y, spin }) => (
  <g transform={`translate(${x} ${y}) rotate(${spin})`}>
    <circle r="78" fill="#14141C" />
    <circle r="24" fill={COLORS.cream} />
    <circle r="8" fill="#14141C" />
    <circle r="62" fill="none" stroke="#2A3144" strokeWidth="2" />
  </g>
);

export const Cabinet: React.FC<{ x: number; y: number; p: PagePalette }> = ({ x, y, p }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="220" height="280" fill={p.secondary} />
    <rect x="12" y="14" width="196" height="72" fill={p.background} />
    <rect x="12" y="102" width="196" height="72" fill={p.background} />
    <rect x="12" y="190" width="196" height="72" fill={p.background} />
  </g>
);

export const Print: React.FC<{ x: number; y: number; rotate: number; opacity: number; p: PagePalette }> = ({
  x,
  y,
  rotate,
  opacity,
  p,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={opacity}>
    <ellipse cx="0" cy="8" rx="34" ry="42" fill={p.accent} />
    <path d="M-8 -28 C8 -48 28 -8 8 8" fill={p.accent} />
  </g>
);

export const Plaque: React.FC<{ x: number; y: number; w: number; h: number; p: PagePalette }> = ({
  x,
  y,
  w,
  h,
  p,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} fill={p.surface} />
    <rect width="18" height={h} fill={p.accent} />
    <rect x="28" y="10" width="16" height="8" fill={p.detail} opacity="0.55" />
    <rect x="52" y="10" width="16" height="8" fill={p.detail} opacity="0.55" />
    <rect x="76" y="10" width="16" height="8" fill={p.detail} opacity="0.55" />
  </g>
);

export const Room: React.FC<{
  id: string;
  p: PagePalette;
  camera: { x: number; y: number; scale: number; rotate: number };
  dim?: number;
  children?: React.ReactNode;
}> = ({ id, p, camera, dim = 0, children }) => (
  <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
    <defs>
      <PlaidFill id={`plaid-${id}`} a={p.background} b={p.accent} c={p.light} />
      <WoodFill id={`wood-${id}`} a={p.backgroundAlt} b={p.background} />
    </defs>
    <rect width="1920" height="1080" fill={p.background} />
    <g
      transform={`translate(${960 + camera.x} ${540 + camera.y}) rotate(${camera.rotate}) scale(${camera.scale}) translate(-960 -540)`}
    >
      <rect x="-280" y="-160" width="2480" height="980" fill={`url(#plaid-${id})`} />
      <rect x="-280" y="760" width="2480" height="560" fill={`url(#wood-${id})`} />
      {children}
    </g>
    {dim > 0 ? <rect width="1920" height="1080" fill="#000" opacity={dim} /> : null}
  </svg>
);
