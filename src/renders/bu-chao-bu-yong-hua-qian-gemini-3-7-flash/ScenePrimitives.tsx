import React from "react";
import { FONT_MONO } from "./fonts";

export const RegistrationCross: React.FC<{
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  rotationDeg?: number;
}> = ({ x, y, size = 32, color = "#E6FF00", rotationDeg = 0 }) => {
  const half = size / 2;
  const isAbsolute = x !== undefined && y !== undefined;
  return (
    <svg
      style={{
        position: isAbsolute ? "absolute" : "relative",
        left: isAbsolute ? x - half : undefined,
        top: isAbsolute ? y - half : undefined,
        width: size,
        height: size,
        transform: `rotate(${rotationDeg}deg)`,
        pointerEvents: "none",
        flexShrink: 0,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={half}
        cy={half}
        r={half * 0.65}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={size}
        stroke={color}
        strokeWidth="1.5"
      />
      <line
        x1={0}
        y1={half}
        x2={size}
        y2={half}
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const HalftoneMatrix: React.FC<{
  width: number;
  height: number;
  dotSize?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
}> = ({
  width,
  height,
  dotSize = 3,
  spacing = 24,
  color = "#FFFFFF",
  opacity = 0.15,
}) => {
  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);
  const dots: React.ReactNode[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`dot-${r}-${c}`}
          cx={c * spacing + spacing / 2}
          cy={r * spacing + spacing / 2}
          r={dotSize}
          fill={color}
        />,
      );
    }
  }

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        opacity,
        pointerEvents: "none",
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {dots}
    </svg>
  );
};

export const BarcodeStripe: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
  codeText?: string;
}> = ({
  x,
  y,
  width = 240,
  height = 42,
  color = "#0B0C10",
  codeText = "SIXOLOGY-JJ-2008",
}) => {
  const bars = [
    3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4,
    2, 1, 3, 2, 4, 1, 2, 3, 1, 4,
  ];
  let currentX = 0;
  const isAbsolute = x !== undefined && y !== undefined;

  return (
    <div
      style={{
        position: isAbsolute ? "absolute" : "relative",
        left: isAbsolute ? x : undefined,
        top: isAbsolute ? y : undefined,
        width,
        height: height + 16,
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
        flexShrink: 0,
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {bars.map((barWidth, index) => {
          const isBlack = index % 2 === 0;
          const rect = isBlack ? (
            <rect
              key={`bar-${index}`}
              x={currentX}
              y={0}
              width={barWidth * 2.2}
              height={height}
              fill={color}
            />
          ) : null;
          currentX += barWidth * 2.2 + 2;
          return rect;
        })}
      </svg>
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 12,
          color,
          letterSpacing: "3px",
          textAlign: "center",
          marginTop: 2,
          fontWeight: 700,
        }}
      >
        {codeText}
      </span>
    </div>
  );
};

export const ColorCalibrationBar: React.FC<{
  x?: number;
  y?: number;
  orientation?: "horizontal" | "vertical";
  size?: number;
}> = ({ x, y, orientation = "horizontal", size = 16 }) => {
  const patches = ["#00FFFF", "#FF00FF", "#FFFF00", "#000000", "#FF1E4B", "#1038FF", "#E6FF00"];
  const isHoriz = orientation === "horizontal";
  const isAbsolute = x !== undefined && y !== undefined;

  return (
    <div
      style={{
        position: isAbsolute ? "absolute" : "relative",
        left: isAbsolute ? x : undefined,
        top: isAbsolute ? y : undefined,
        display: "flex",
        flexDirection: isHoriz ? "row" : "column",
        gap: 4,
        padding: 3,
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.2)",
        pointerEvents: "none",
        flexShrink: 0,
      }}
    >
      {patches.map((col, i) => (
        <div
          key={`patch-${i}`}
          style={{
            width: size,
            height: size,
            background: col,
            border: "1px solid rgba(0,0,0,0.3)",
          }}
        />
      ))}
    </div>
  );
};

export const LightningBolt: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  glow?: boolean;
}> = ({ x, y, width = 60, height = 110, color = "#E6FF00", glow = true }) => {
  return (
    <svg
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        filter: glow ? `drop-shadow(0 0 12px ${color}88)` : "none",
        pointerEvents: "none",
      }}
      viewBox="0 0 60 110"
    >
      <polygon
        points="34,0 0,62 26,62 16,110 58,42 32,42"
        fill={color}
      />
    </svg>
  );
};

export const VinylGrooveDisk: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  rotationDeg: number;
  accentColor?: string;
}> = ({ cx, cy, radius, rotationDeg, accentColor = "#FF1E4B" }) => {
  const rings = [0.95, 0.88, 0.82, 0.75, 0.68, 0.60, 0.52, 0.44];

  return (
    <svg
      style={{
        position: "absolute",
        left: cx - radius,
        top: cy - radius,
        width: radius * 2,
        height: radius * 2,
        transform: `rotate(${rotationDeg}deg)`,
        pointerEvents: "none",
      }}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      {/* Vinyl Outer Base */}
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="#0D0E12"
        stroke="#232630"
        strokeWidth="3"
      />
      {/* Grooves */}
      {rings.map((r, i) => (
        <circle
          key={`groove-${i}`}
          cx={radius}
          cy={radius}
          r={radius * r}
          fill="none"
          stroke="#1B1E28"
          strokeWidth={i % 2 === 0 ? "1.5" : "0.75"}
          strokeDasharray={i % 3 === 0 ? "12 4" : "none"}
        />
      ))}
      {/* Center Label */}
      <circle
        cx={radius}
        cy={radius}
        r={radius * 0.32}
        fill={accentColor}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius * 0.28}
        fill="none"
        stroke="#FFFDF7"
        strokeWidth="1.5"
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius * 0.06}
        fill="#0B0C10"
      />
    </svg>
  );
};
