import React from "react";
import { ArtProps, Rain } from "./shared";
export const Scene07: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      x="1070"
      y="65"
      width="730"
      height="900"
      fill={palette.paper}
      opacity="0.48"
    />
    <g stroke={palette.line} strokeWidth="13" opacity="0.5">
      <rect x="1100" y="90" width="660" height="820" fill="none" />
      <line x1="1430" x2="1430" y1="90" y2="910" />
      <line x1="1100" x2="1760" y1="500" y2="500" />
    </g>
    <Rain t={t} seed={index} color="#EAF3F2" count={36} />
    <g
      transform={`translate(${1270 + Math.sin(t * 0.8) * 120} 770)`}
      fill={palette.line}
      opacity="0.35"
    >
      <path d="M-150 0 Q0 -210 150 0Z" />
      <rect x="-5" width="10" height="170" />
      <path
        d="M5 168 q8 70 52 35"
        fill="none"
        stroke={palette.line}
        strokeWidth="10"
      />
    </g>
    {Array.from({ length: 6 }).map((_, i) => {
      const p = (t * 0.25 + i * 0.18) % 1;
      return (
        <ellipse
          key={i}
          cx={1150 + i * 115}
          cy={875 - (i % 2) * 34}
          rx={p * 110}
          ry={p * 25}
          fill="none"
          stroke={palette.accent}
          strokeWidth="5"
          opacity={(1 - p) * (0.3 + act2 * 0.3)}
        />
      );
    })}
  </>
);
