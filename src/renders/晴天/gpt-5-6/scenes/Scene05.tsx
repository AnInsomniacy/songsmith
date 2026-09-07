import React from "react";
import { ArtProps } from "./shared";
export const Scene05: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon points="1060,90 1830,20 1830,1030 1060,930" fill={palette.paper} />
    {Array.from({ length: 7 }).map((_, i) => (
      <path
        key={i}
        d={`M${1100 + i * 105} ${155 - i * 8} V${915 + i * 10}`}
        stroke={palette.line}
        strokeWidth="7"
        opacity="0.55"
      />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <polygon
        key={i}
        points={`${1000 + i * 80},${980 - i * 82} ${1830 - i * 35},${980 - i * 82} ${1830 - i * 35},${1045 - i * 82} ${960 + i * 75},${1045 - i * 82}`}
        fill={i % 2 ? palette.paper : palette.second}
        opacity="0.22"
      />
    ))}
    <g
      transform={`translate(${1450 + Math.sin(t) * 80} ${120 + ((t * 120) % 860)}) rotate(${t * 55})`}
    >
      <rect width="92" height="125" fill={palette.accent} opacity="0.72" />
      <line
        x1="15"
        x2="72"
        y1="35"
        y2="35"
        stroke={palette.paper}
        strokeWidth="5"
      />
      <line
        x1="15"
        x2="62"
        y1="56"
        y2="56"
        stroke={palette.paper}
        strokeWidth="5"
      />
    </g>
    <path
      d={`M1080 880 L${1510 + act2 * 230} 520`}
      stroke={palette.accent}
      strokeWidth="13"
      opacity="0.5"
    />
  </>
);
