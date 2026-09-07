import React from "react";
import { ArtProps } from "./shared";
export const Scene21: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <path
      d="M820 1080 L1240 540 L1570 1080Z"
      fill={palette.paper}
      opacity="0.32"
    />
    {Array.from({ length: 7 }).map((_, i) => {
      const x = 1770 - i * 118,
        y = 900 - i * 61;
      return (
        <g
          key={i}
          transform={`translate(${x} ${y}) scale(${1 - i * 0.1})`}
          stroke={palette.line}
          strokeWidth="9"
          opacity="0.68"
        >
          <line y2="-330" />
          <line x1="-75" x2="75" y1="-285" y2="-285" />
          <path d="M-75 -285 Q-260 -220 -480 -200" fill="none" />
        </g>
      );
    })}
    {Array.from({ length: 14 }).map((_, i) => {
      const x = 1040 + ((i * 137 + t * (11 + (i % 3))) % 780),
        y = 180 + ((i * 101 + Math.sin(t + i) * 60) % 700);
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={3 + (i % 3)}
          fill={i % 2 ? palette.accent : palette.second}
          opacity={0.22 + act2 * 0.28}
        />
      );
    })}
    <path
      d={`M1080 430 Q1390 ${310 + Math.sin(t * 0.5) * 35} 1810 370`}
      stroke={palette.accent}
      strokeWidth="8"
      fill="none"
      strokeDasharray="28 18"
      strokeDashoffset={-t * 45}
    />
  </>
);
