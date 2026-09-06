import React from "react";

export const NeonTube: React.FC<{
  x: number;
  y: number;
  length: number;
  color: string;
  glowId: string;
  angle?: number;
  radius?: number;
  opacity?: number;
}> = ({ x, y, length, color, glowId, angle = 0, radius = 10, opacity = 1 }) => (
  <g
    transform={`rotate(${angle} ${x} ${y})`}
    opacity={opacity}
  >
    <line
      x1={x}
      y1={y}
      x2={x + length}
      y2={y}
      stroke={color}
      strokeWidth={radius * 2.6}
      strokeLinecap="round"
      filter={`url(#${glowId})`}
    />
    <line
      x1={x}
      y1={y}
      x2={x + length}
      y2={y}
      stroke={color}
      strokeWidth={radius}
      strokeLinecap="round"
    />
    <line
      x1={x}
      y1={y}
      x2={x + length}
      y2={y}
      stroke="#FFFFFF"
      strokeWidth={radius * 0.34}
      strokeLinecap="round"
      opacity="0.85"
    />
  </g>
);

export const Coin: React.FC<{
  cx: number;
  cy: number;
  r: number;
  color: string;
  glow?: string;
  opacity?: number;
}> = ({ cx, cy, r, color, glow, opacity = 1 }) => (
  <g opacity={opacity}>
    {glow ? (
      <circle cx={cx} cy={cy} r={r * 1.6} fill={color} opacity="0.18" />
    ) : null}
    <circle cx={cx} cy={cy} r={r} fill={color} />
    <circle
      cx={cx}
      cy={cy}
      r={r * 0.62}
      fill="none"
      stroke="#F2F4F6"
      strokeWidth={Math.max(2, r * 0.14)}
      opacity="0.85"
    />
    <path
      d={`M${cx - r * 0.28} ${cy + r * 0.2} Q${cx} ${cy - r * 0.3} ${cx + r * 0.28} ${cy + r * 0.2}`}
      fill="none"
      stroke="#F2F4F6"
      strokeWidth={Math.max(2, r * 0.16)}
      strokeLinecap="round"
      opacity="0.85"
    />
    <circle
      cx={cx - r * 0.32}
      cy={cy - r * 0.34}
      r={r * 0.16}
      fill="#FFFFFF"
      opacity="0.5"
    />
  </g>
);

export const CoinSlot: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  accent: string;
  detail: string;
  surface: string;
  lit?: boolean;
}> = ({ x, y, width, height, accent, detail, surface, lit = false }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={Math.min(18, height * 0.1)}
      fill={surface}
      stroke={detail}
      strokeWidth="4"
    />
    <rect
      x={x + width * 0.22}
      y={y + height * 0.14}
      width={width * 0.56}
      height={height * 0.16}
      rx="6"
      fill={lit ? accent : "#10101C"}
      opacity={lit ? 1 : 0.9}
    />
    <rect
      x={x + width * 0.3}
      y={y + height * 0.42}
      width={width * 0.4}
      height={height * 0.26}
      rx={height * 0.06}
      fill="#0A0A14"
      stroke={detail}
      strokeWidth="3"
    />
    <rect
      x={x + width * 0.3}
      y={y + height * 0.42}
      width={width * 0.4}
      height={height * 0.08}
      rx={height * 0.03}
      fill={accent}
      opacity="0.7"
    />
  </g>
);

export const Cabinet: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  accent: string;
  detail: string;
  surface: string;
  screen: string;
  label: string;
  on?: boolean;
}> = ({ x, y, width, height, accent, detail, surface, screen, label, on }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="14"
      fill={surface}
      stroke={detail}
      strokeWidth="3"
    />
    <rect
      x={x + width * 0.1}
      y={y + height * 0.08}
      width={width * 0.8}
      height={height * 0.46}
      rx="8"
      fill={screen}
    />
    <rect
      x={x + width * 0.12}
      y={y + height * 0.09}
      width={width * 0.76}
      height={height * 0.44}
      rx="6"
      fill="none"
      stroke={accent}
      strokeWidth="2"
      opacity={on ? 0.8 : 0.3}
    />
    <text
      x={x + width * 0.5}
      y={y + height * 0.3}
      textAnchor="middle"
      fontFamily="Bungee"
      fontSize={width * 0.09}
      fill={accent}
      opacity={on ? 0.9 : 0.2}
    >
      {label}
    </text>
    <circle
      cx={x + width * 0.22}
      cy={y + height * 0.68}
      r={width * 0.05}
      fill={on ? "#FFC72C" : detail}
      opacity={on ? 1 : 0.4}
    />
    <circle
      cx={x + width * 0.5}
      cy={y + height * 0.68}
      r={width * 0.05}
      fill={on ? "#FF2E6E" : detail}
      opacity={on ? 1 : 0.4}
    />
    <circle
      cx={x + width * 0.78}
      cy={y + height * 0.68}
      r={width * 0.05}
      fill={on ? "#3DDC84" : detail}
      opacity={on ? 1 : 0.4}
    />
    <rect
      x={x + width * 0.38}
      y={y + height * 0.76}
      width={width * 0.24}
      height={height * 0.1}
      rx="4"
      fill="#0A0A14"
      stroke={detail}
      strokeWidth="2"
    />
  </g>
);

export const Bearbrick: React.FC<{
  cx: number;
  cy: number;
  size: number;
  color: string;
  belly?: string;
  opacity?: number;
}> = ({ cx, cy, size, color, belly, opacity = 1 }) => {
  const head = size * 0.34;
  const body = size * 0.42;
  const arm = size * 0.13;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - head / 2}
        y={cy - body - head}
        width={head}
        height={head * 0.72}
        rx={head * 0.14}
        fill={color}
      />
      <rect
        x={cx - head / 2 - head * 0.42}
        y={cy - body - head + head * 0.1}
        width={head * 0.24}
        height={head * 0.3}
        rx={head * 0.07}
        fill={color}
      />
      <rect
        x={cx + head / 2 + head * 0.18}
        y={cy - body - head + head * 0.1}
        width={head * 0.24}
        height={head * 0.3}
        rx={head * 0.07}
        fill={color}
      />
      <rect
        x={cx - body / 2}
        y={cy - body}
        width={body}
        height={body}
        rx={body * 0.16}
        fill={color}
      />
      <rect
        x={cx - body / 2 - arm}
        y={cy - body * 0.82}
        width={arm}
        height={body * 0.36}
        rx={arm * 0.28}
        fill={color}
      />
      <rect
        x={cx + body / 2}
        y={cy - body * 0.82}
        width={arm}
        height={body * 0.36}
        rx={arm * 0.28}
        fill={color}
      />
      <circle
        cx={cx - head * 0.14}
        cy={cy - body - head * 0.64}
        r={head * 0.045}
        fill={belly ?? "#FFFFFF"}
      />
      <circle
        cx={cx + head * 0.14}
        cy={cy - body - head * 0.64}
        r={head * 0.045}
        fill={belly ?? "#FFFFFF"}
      />
      <rect
        cx={cx - body * 0.2}
        x={cx - body * 0.2}
        y={cy - body * 0.62}
        width={body * 0.4}
        height={body * 0.14}
        rx={body * 0.06}
        fill={belly ?? "#FFFFFF"}
        opacity="0.85"
      />
      <rect
        x={cx - body * 0.18}
        y={cy - body * 0.34}
        width={body * 0.36}
        height={body * 0.16}
        rx={body * 0.05}
        fill={belly ?? "#FFFFFF"}
        opacity="0.55"
      />
      <rect
        x={cx - body * 0.2}
        y={cy - body * 0.06}
        width={body * 0.4}
        height={body * 0.14}
        rx={body * 0.05}
        fill={belly ?? "#FFFFFF"}
        opacity="0.35"
      />
      <rect
        x={cx - body / 2}
        y={cy}
        width={body}
        height={body * 0.14}
        rx={body * 0.05}
        fill={color}
      />
    </g>
  );
};

export const Sneaker: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  sole?: string;
  opacity?: number;
}> = ({ x, y, size, color, sole, opacity = 1 }) => (
  <g opacity={opacity}>
    <path
      d={`M${x} ${y} C${x + size * 0.2} ${y - size * 0.34} ${x + size * 0.62} ${y - size * 0.26} ${x + size * 0.72} ${y - size * 0.08} C${x + size * 0.82} ${y - size * 0.02} ${x + size} ${y + size * 0.1} ${x + size * 0.92} ${y + size * 0.3} C${x + size * 0.62} ${y + size * 0.24} ${x + size * 0.3} ${y + size * 0.3} ${x} ${y + size * 0.3}Z`}
      fill={color}
    />
    <rect
      x={x + size * 0.02}
      y={y + size * 0.28}
      width={size * 0.9}
      height={size * 0.12}
      rx={size * 0.05}
      fill={sole ?? "#F2F4F6"}
      opacity="0.9"
    />
    <path
      d={`M${x + size * 0.1} ${y - size * 0.02} C${x + size * 0.3} ${y - size * 0.14} ${x + size * 0.5} ${y - size * 0.14} ${x + size * 0.66} ${y - size * 0.02}`}
      fill="none"
      stroke={sole ?? "#F2F4F6"}
      strokeWidth={size * 0.07}
      strokeLinecap="round"
      opacity="0.8"
    />
  </g>
);

export const ChipBag: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  opacity?: number;
}> = ({ x, y, size, color, opacity = 1 }) => (
  <g opacity={opacity}>
    <rect
      x={x}
      y={y}
      width={size}
      height={size * 1.35}
      rx={size * 0.1}
      fill={color}
    />
    <rect
      x={x + size * 0.06}
      y={y - size * 0.06}
      width={size * 0.88}
      height={size * 0.2}
      fill="#F2F4F6"
      opacity="0.85"
    />
    <path
      d={`M${x + size * 0.06} ${y} L${x + size * 0.2} ${y - size * 0.06} L${x + size * 0.34} ${y} L${x + size * 0.5} ${y - size * 0.07} L${x + size * 0.66} ${y} L${x + size * 0.8} ${y - size * 0.06} L${x + size * 0.94} ${y}`}
      fill="none"
      stroke="#F2F4F6"
      strokeWidth={size * 0.03}
      opacity="0.7"
    />
    <ellipse
      cx={x + size * 0.5}
      cy={y + size * 0.75}
      rx={size * 0.26}
      ry={size * 0.4}
      fill="#FFFFFF"
      opacity="0.12"
    />
  </g>
);

export const Ball: React.FC<{
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
}> = ({ cx, cy, r, color, opacity = 1 }) => (
  <g opacity={opacity}>
    <circle cx={cx} cy={cy} r={r} fill={color} />
    <path
      d={`M${cx - r * 0.6} ${cy - r * 0.4} A${r} ${r} 0 0 1 ${cx + r * 0.55} ${cy - r * 0.62}`}
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={r * 0.14}
      strokeLinecap="round"
      opacity="0.55"
    />
    <circle
      cx={cx - r * 0.3}
      cy={cy - r * 0.42}
      r={r * 0.12}
      fill="#FFFFFF"
      opacity="0.75"
    />
  </g>
);

export const Speaker: React.FC<{
  cx: number;
  cy: number;
  r: number;
  color: string;
  detail: string;
  opacity?: number;
}> = ({ cx, cy, r, color, detail, opacity = 1 }) => (
  <g opacity={opacity}>
    <circle cx={cx} cy={cy} r={r} fill={color} />
    <circle cx={cx} cy={cy} r={r * 0.68} fill={detail} />
    <circle cx={cx} cy={cy} r={r * 0.44} fill={color} />
    <circle
      cx={cx}
      cy={cy}
      r={r * 0.24}
      fill={detail}
      stroke={color}
      strokeWidth="3"
    />
    <path
      d={`M${cx + r} ${cy} L${cx + r * 2.3} ${cy - r * 0.8} L${cx + r * 2.3} ${cy + r * 0.8}Z`}
      fill={color}
    />
  </g>
);

export const Sofa: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  dark: string;
  opacity?: number;
}> = ({ x, y, width, height, color, dark, opacity = 1 }) => (
  <g opacity={opacity}>
    <rect
      x={x}
      y={y + height * 0.28}
      width={width}
      height={height * 0.72}
      rx={height * 0.16}
      fill={color}
    />
    <rect
      x={x - width * 0.08}
      y={y + height * 0.2}
      width={width * 0.16}
      height={height * 0.68}
      rx={height * 0.12}
      fill={dark}
    />
    <rect
      x={x + width * 0.92}
      y={y + height * 0.2}
      width={width * 0.16}
      height={height * 0.68}
      rx={height * 0.12}
      fill={dark}
    />
    <rect
      x={x + width * 0.08}
      y={y}
      width={width * 0.84}
      height={height * 0.3}
      rx={height * 0.12}
      fill={dark}
    />
    <rect
      x={x + width * 0.14}
      y={y + height * 0.44}
      width={width * 0.72}
      height={height * 0.2}
      rx={height * 0.1}
      fill={dark}
      opacity="0.5"
    />
  </g>
);

export const Figurine: React.FC<{
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
}> = ({ cx, cy, r, color, opacity = 1 }) => (
  <g opacity={opacity}>
    <circle cx={cx} cy={cy - r * 1.1} r={r * 0.66} fill={color} />
    <rect
      x={cx - r * 0.78}
      y={cy - r * 0.48}
      width={r * 1.56}
      height={r * 1.05}
      rx={r * 0.5}
      fill={color}
    />
    <circle cx={cx - r * 0.32} cy={cy - r * 1.24} r={r * 0.09} fill="#FFFFFF" />
    <circle cx={cx + r * 0.32} cy={cy - r * 1.24} r={r * 0.09} fill="#FFFFFF" />
    <path
      d={`M${cx - r * 0.2} ${cy - r * 1.05} Q${cx} ${cy - r * 0.92} ${cx + r * 0.2} ${cy - r * 1.05}`}
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={r * 0.08}
      strokeLinecap="round"
    />
  </g>
);

export const ScoreDigit: React.FC<{
  x: number;
  y: number;
  digit: string;
  color: string;
  size: number;
  opacity?: number;
}> = ({ x, y, digit, color, size, opacity = 1 }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontFamily="Bungee"
    fontSize={size}
    fill={color}
    opacity={opacity}
  >
    {digit}
  </text>
);
