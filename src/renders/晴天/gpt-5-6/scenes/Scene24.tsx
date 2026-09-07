import React from "react";
import { ArtProps } from "./shared";
export const Scene24: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      x="1040"
      y="90"
      width="780"
      height="860"
      fill={palette.paper}
      opacity="0.5"
    />
    <g stroke={palette.line} strokeWidth="14">
      <rect x="1080" y="120" width="700" height="800" fill="none" />
      <line x1="1430" x2="1430" y1="120" y2="920" />
    </g>
    <polygon
      points={`1080,120 ${1430 + act2 * 330},120 ${1320 + act2 * 280},920 1080,920`}
      fill={palette.accent}
      opacity={0.08 + act2 * 0.18}
    />
    <g fill={palette.line} opacity="0.35">
      <circle cx="1240" cy="650" r="65" />
      <path d="M1160 900 Q1240 690 1320 900Z" />
      <circle cx="1630" cy="620" r="62" />
      <path d="M1555 900 Q1630 675 1705 900Z" />
    </g>
    <path
      d={`M1250 470 C1390 ${390 + Math.sin(t) * 30} 1500 520 1630 ${430 - act2 * 70}`}
      fill="none"
      stroke={palette.second}
      strokeWidth="9"
      strokeDasharray="30 20"
      strokeDashoffset={-t * 30}
    />
  </>
);
