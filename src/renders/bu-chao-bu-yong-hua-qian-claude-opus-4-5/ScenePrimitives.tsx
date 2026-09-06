import React from "react";
import type { PagePalette } from "./types";

export const SpiralHoles: React.FC<{ x: number; count?: number; color: string }> = ({
  x,
  count = 20,
  color,
}) => (
  <g>
    {Array.from({ length: count }, (_, i) => (
      <circle
        key={i}
        cx={x}
        cy={60 + i * 50}
        r={12}
        fill="none"
        stroke={color}
        strokeWidth={3}
      />
    ))}
  </g>
);

export const GridLines: React.FC<{ color: string; opacity?: number }> = ({
  color,
  opacity = 0.15,
}) => (
  <g opacity={opacity}>
    {Array.from({ length: 22 }, (_, i) => (
      <line
        key={`h-${i}`}
        x1={0}
        y1={i * 50}
        x2={1920}
        y2={i * 50}
        stroke={color}
        strokeWidth={1}
      />
    ))}
    {Array.from({ length: 39 }, (_, i) => (
      <line
        key={`v-${i}`}
        x1={i * 50}
        y1={0}
        x2={i * 50}
        y2={1080}
        stroke={color}
        strokeWidth={1}
      />
    ))}
  </g>
);

export const Receipt: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotate?: number;
  p: PagePalette;
}> = ({ x, y, width = 280, height = 400, rotate = 0, p }) => {
  const tearPath = `M0 ${height - 20} ${Array.from(
    { length: Math.floor(width / 12) },
    (_, i) => `L${i * 12 + 6} ${height - 20 + (i % 2 === 0 ? 12 : 0)} L${(i + 1) * 12} ${height - 20}`,
  ).join(" ")} V0 H0 Z`;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d={tearPath} fill="#FEFEFE" />
      <rect x={20} y={30} width={width - 40} height={12} fill={p.pencil} opacity={0.6} />
      <rect x={20} y={60} width={width - 80} height={8} fill={p.pencil} opacity={0.4} />
      <rect x={20} y={80} width={width - 60} height={8} fill={p.pencil} opacity={0.4} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x={20}
          y={120 + i * 28}
          width={width - 40 - (i % 3) * 30}
          height={6}
          fill={p.pencil}
          opacity={0.3}
        />
      ))}
      <rect x={20} y={height - 80} width={width - 40} height={2} fill={p.ink} opacity={0.2} />
      <text
        x={width / 2}
        y={height - 50}
        textAnchor="middle"
        fontFamily="JetBrains Mono"
        fontSize={24}
        fill={p.ink}
        fontWeight={700}
      >
        ¥0.00
      </text>
      <Barcode x={30} y={height - 100} width={width - 60} color={p.ink} />
    </g>
  );
};

export const Barcode: React.FC<{
  x: number;
  y: number;
  width?: number;
  color: string;
}> = ({ x, y, color }) => {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1];
  let offset = 0;
  return (
    <g transform={`translate(${x} ${y})`}>
      {bars.map((w, i) => {
        const barX = offset;
        offset += w * 4 + 4;
        return i % 2 === 0 ? (
          <rect key={i} x={barX} y={0} width={w * 4} height={40} fill={color} />
        ) : null;
      })}
    </g>
  );
};

export const StickyNote: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotate?: number;
  bg: string;
  border: string;
  shadow?: boolean;
}> = ({ x, y, width = 320, height = 200, rotate = 0, bg, border, shadow = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    {shadow && (
      <rect
        x={8}
        y={8}
        width={width}
        height={height}
        fill="#00000020"
        rx={4}
      />
    )}
    <rect width={width} height={height} fill={bg} rx={4} />
    <rect x={0} y={0} width={width} height={6} fill={border} />
    <path
      d={`M${width - 30} ${height} L${width} ${height - 30} V${height} Z`}
      fill={border}
      opacity={0.3}
    />
  </g>
);

export const Coin: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, rotate = 0, p }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <circle cx={0} cy={0} r={40} fill={p.highlighter} />
    <circle cx={0} cy={0} r={32} fill="none" stroke={p.ink} strokeWidth={3} opacity={0.3} />
    <text
      x={0}
      y={8}
      textAnchor="middle"
      fontFamily="JetBrains Mono"
      fontSize={28}
      fontWeight={700}
      fill={p.ink}
      opacity={0.5}
    >
      ¥
    </text>
  </g>
);

export const PriceTag: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotate?: number;
  bg: string;
  hole: string;
}> = ({ x, y, width = 200, height = 100, rotate = 0, bg, hole }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <path
      d={`M0 0 H${width - 40} L${width} ${height / 2} L${width - 40} ${height} H0 Z`}
      fill={bg}
    />
    <circle cx={width - 25} cy={height / 2} r={10} fill={hole} />
  </g>
);

export const DoodleHeart: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color: string;
  fill?: boolean;
}> = ({ x, y, scale = 1, color, fill = false }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M0 -20 C-15 -40 -40 -30 -40 -5 C-40 20 0 45 0 45 C0 45 40 20 40 -5 C40 -30 15 -40 0 -20"
      fill={fill ? color : "none"}
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

export const DoodleArrow: React.FC<{
  x: number;
  y: number;
  rotate?: number;
  length?: number;
  color: string;
}> = ({ x, y, rotate = 0, length = 100, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <path
      d={`M0 0 L${length} 0 M${length - 20} -15 L${length} 0 L${length - 20} 15`}
      fill="none"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

export const DoodleLightbulb: React.FC<{
  x: number;
  y: number;
  scale?: number;
  on?: boolean;
  p: PagePalette;
}> = ({ x, y, scale = 1, on = false, p }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {on && (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={Math.cos((i * Math.PI) / 4) * 70}
            y2={Math.sin((i * Math.PI) / 4) * 70 - 20}
            stroke={p.highlighter}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ))}
      </>
    )}
    <ellipse cx={0} cy={-20} rx={35} ry={45} fill={on ? p.highlighter : "#F5F5F5"} />
    <ellipse
      cx={0}
      cy={-20}
      rx={35}
      ry={45}
      fill="none"
      stroke={p.ink}
      strokeWidth={3}
    />
    <rect x={-15} y={25} width={30} height={20} fill={p.pencil} rx={4} />
    <line x1={-15} y1={32} x2={15} y2={32} stroke={p.ink} strokeWidth={2} />
    <line x1={-15} y1={39} x2={15} y2={39} stroke={p.ink} strokeWidth={2} />
  </g>
);

export const DoodleApple: React.FC<{
  x: number;
  y: number;
  scale?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, p }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx={0} cy={10} rx={40} ry={45} fill={p.marker} />
    <ellipse cx={0} cy={10} rx={40} ry={45} fill="none" stroke={p.ink} strokeWidth={3} />
    <path
      d="M0 -35 Q5 -50 15 -55"
      fill="none"
      stroke={p.ink}
      strokeWidth={4}
      strokeLinecap="round"
    />
    <ellipse cx={15} cy={-50} rx={12} ry={8} fill="#22C55E" />
  </g>
);

export const DoodleSofa: React.FC<{
  x: number;
  y: number;
  scale?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, p }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-100} y={-30} width={200} height={80} rx={20} fill={p.ballpoint} />
    <rect x={-110} y={-60} width={40} height={90} rx={10} fill={p.ballpoint} />
    <rect x={70} y={-60} width={40} height={90} rx={10} fill={p.ballpoint} />
    <ellipse cx={-40} cy={-10} rx={30} ry={20} fill="#FEFEFE" opacity={0.3} />
    <ellipse cx={40} cy={-10} rx={30} ry={20} fill="#FEFEFE" opacity={0.3} />
    <rect x={-80} y={50} width={20} height={25} fill={p.ink} rx={4} />
    <rect x={60} y={50} width={20} height={25} fill={p.ink} rx={4} />
  </g>
);

export const DoodleChick: React.FC<{
  x: number;
  y: number;
  scale?: number;
}> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle cx={0} cy={0} r={35} fill="#FCD34D" />
    <circle cx={0} cy={0} r={35} fill="none" stroke="#1C1917" strokeWidth={3} />
    <circle cx={-10} cy={-8} r={5} fill="#1C1917" />
    <circle cx={10} cy={-8} r={5} fill="#1C1917" />
    <polygon points="-8,8 8,8 0,20" fill="#F97316" />
    <ellipse cx={0} cy={-40} rx={8} ry={15} fill="#FCD34D" />
    <ellipse cx={0} cy={-40} rx={8} ry={15} fill="none" stroke="#1C1917" strokeWidth={2} />
  </g>
);

export const DoodleToy: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color: string;
}> = ({ x, y, scale = 1, color }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-20} y={-40} width={40} height={60} rx={8} fill={color} />
    <rect x={-20} y={-40} width={40} height={60} rx={8} fill="none" stroke="#1C1917" strokeWidth={3} />
    <circle cx={-8} cy={-20} r={6} fill="#FEFEFE" />
    <circle cx={8} cy={-20} r={6} fill="#FEFEFE" />
    <circle cx={-8} cy={-20} r={3} fill="#1C1917" />
    <circle cx={8} cy={-20} r={3} fill="#1C1917" />
    <rect x={-25} y={-15} width={10} height={30} rx={4} fill={color} />
    <rect x={15} y={-15} width={10} height={30} rx={4} fill={color} />
    <rect x={-15} y={20} width={12} height={25} rx={4} fill={color} />
    <rect x={3} y={20} width={12} height={25} rx={4} fill={color} />
  </g>
);

export const Checkbox: React.FC<{
  x: number;
  y: number;
  checked?: boolean;
  color: string;
}> = ({ x, y, checked = false, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-12} y={-12} width={24} height={24} fill="none" stroke={color} strokeWidth={3} rx={4} />
    {checked && (
      <path
        d="M-6 0 L-2 6 L8 -6"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </g>
);

export const CoffeeStain: React.FC<{
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}> = ({ x, y, scale = 1, opacity = 0.15 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <ellipse cx={0} cy={0} rx={60} ry={50} fill="#92400E" />
    <ellipse cx={10} cy={-5} rx={45} ry={35} fill="#FFF8E7" />
  </g>
);

export const TapeStrip: React.FC<{
  x: number;
  y: number;
  width?: number;
  rotate?: number;
  color?: string;
}> = ({ x, y, width = 120, rotate = 0, color = "#FCD34D" }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <rect x={-width / 2} y={-15} width={width} height={30} fill={color} opacity={0.7} />
    <line
      x1={-width / 2 + 10}
      y1={0}
      x2={width / 2 - 10}
      y2={0}
      stroke="#00000015"
      strokeWidth={1}
      strokeDasharray="8 4"
    />
  </g>
);

export const ShoppingCart: React.FC<{
  x: number;
  y: number;
  scale?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, p }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M-50 -30 L-35 -30 L-20 30 H50 L60 -10 H-10"
      fill="none"
      stroke={p.pencil}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx={-10} cy={45} r={12} fill="none" stroke={p.pencil} strokeWidth={4} />
    <circle cx={40} cy={45} r={12} fill="none" stroke={p.pencil} strokeWidth={4} />
  </g>
);

export const PiggyBank: React.FC<{
  x: number;
  y: number;
  scale?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, p }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx={0} cy={0} rx={70} ry={50} fill="#FBCFE8" />
    <ellipse cx={0} cy={0} rx={70} ry={50} fill="none" stroke={p.ink} strokeWidth={3} />
    <ellipse cx={-55} cy={-10} rx={20} ry={15} fill="#FBCFE8" />
    <ellipse cx={-55} cy={-10} rx={20} ry={15} fill="none" stroke={p.ink} strokeWidth={2} />
    <circle cx={-60} cy={-15} r={4} fill={p.ink} />
    <ellipse cx={-48} cy={-5} rx={8} ry={5} fill="#EC4899" opacity={0.5} />
    <rect x={-20} y={-55} width={40} height={8} rx={4} fill={p.ink} opacity={0.5} />
    <ellipse cx={-40} cy={40} rx={10} ry={15} fill="#FBCFE8" stroke={p.ink} strokeWidth={2} />
    <ellipse cx={-15} cy={45} rx={10} ry={15} fill="#FBCFE8" stroke={p.ink} strokeWidth={2} />
    <ellipse cx={15} cy={45} rx={10} ry={15} fill="#FBCFE8" stroke={p.ink} strokeWidth={2} />
    <ellipse cx={40} cy={40} rx={10} ry={15} fill="#FBCFE8" stroke={p.ink} strokeWidth={2} />
  </g>
);

export const Wallet: React.FC<{
  x: number;
  y: number;
  scale?: number;
  open?: number;
  p: PagePalette;
}> = ({ x, y, scale = 1, open = 0, p }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-60} y={-40 + open * 20} width={120} height={80 - open * 20} rx={10} fill={p.pencil} />
    <rect x={-50} y={-30 + open * 15} width={100} height={60 - open * 15} rx={6} fill="#FEFEFE" />
    {open > 0.5 && (
      <text
        x={0}
        y={10}
        textAnchor="middle"
        fontFamily="JetBrains Mono"
        fontSize={20}
        fill={p.pencil}
      >
        EMPTY
      </text>
    )}
  </g>
);
