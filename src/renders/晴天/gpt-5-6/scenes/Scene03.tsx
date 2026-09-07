import React from "react";
import { ArtProps } from "./shared";
export const Scene03: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.line} />
    <rect x="62" y="52" width="1796" height="976" fill={palette.paper} />
    {Array.from({ length: 5 }).map((_, i) => (
      <line
        key={i}
        x1="115"
        x2="1810"
        y1={310 + i * 82}
        y2={310 + i * 82}
        stroke={palette.second}
        strokeWidth="4"
        opacity="0.5"
      />
    ))}
    <path
      d="M90 765 C390 620 660 840 940 690 S1480 540 1840 700"
      fill="none"
      stroke={palette.accent}
      strokeWidth="9"
      strokeDasharray="180 45"
      strokeDashoffset={-t * 70}
      opacity={0.7}
    />
    {Array.from({ length: 8 }).map((_, i) => {
      const p = (t * 0.08 + i * 0.14) % 1;
      const x = 160 + p * 1600;
      const y = 650 + Math.sin(p * Math.PI * 4 + i) * 95;
      return (
        <g
          key={i}
          transform={`translate(${x} ${y}) scale(${0.5 + enter * 0.5})`}
          fill={i % 2 ? palette.second : palette.accent}
        >
          <circle r="15" />
          <rect x="12" y="-70" width="7" height="70" />
        </g>
      );
    })}
    <circle
      cx={1700 - act2 * 190}
      cy="205"
      r={45 + act2 * 28}
      fill={palette.accent}
      opacity="0.45"
    />
  </>
);
