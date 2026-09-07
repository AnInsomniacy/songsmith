import React from "react";
import { ArtProps } from "./shared";
export const Scene20: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      y="690"
      width="1920"
      height="390"
      fill={palette.paper}
      opacity="0.45"
    />
    <circle
      cx="1510"
      cy={700 - act2 * 420}
      r={90 + act2 * 55}
      fill={palette.accent}
      opacity={0.25 + act2 * 0.25}
    />
    {Array.from({ length: 4 }).map((_, i) => (
      <g
        key={i}
        transform={`translate(${1150 + i * 185} ${240 + (i % 2) * 180}) scale(${0.62 + i * 0.08})`}
        stroke={palette.line}
        fill={palette.paper}
        opacity={0.3 + i * 0.1}
      >
        <circle r="95" strokeWidth="9" />
        <line
          y2="-55"
          strokeWidth="6"
          transform={`rotate(${t * (8 + i * 2)})`}
        />
        <line
          y2="48"
          strokeWidth="9"
          transform={`rotate(${t * 0.7 + i * 30})`}
        />
      </g>
    ))}
    <path
      d={`M80 825 C500 ${780 - act2 * 25} 860 850 1190 790 S1570 ${770 - act2 * 90} 1860 ${650 - act2 * 80}`}
      fill="none"
      stroke={palette.second}
      strokeWidth="12"
    />
    <path
      d={`M1120 0 L${1340 + act2 * 360} 0 L${1050 + act2 * 350} 1080 H720Z`}
      fill={palette.accent}
      opacity={0.06 + act2 * 0.12}
    />
  </>
);
