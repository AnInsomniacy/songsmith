import React from "react";
import { ArtProps } from "./shared";
export const Scene18: React.FC<ArtProps> = ({ t, act2, palette }) => {
  const busX = 1180 + act2 * 780 + t * 22;
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <rect
        y="760"
        width="1920"
        height="320"
        fill={palette.line}
        opacity="0.22"
      />
      <g transform="translate(1080 240)" stroke={palette.line}>
        <path
          d="M0 570 V0 H560 V570"
          fill={palette.paper}
          opacity="0.52"
          strokeWidth="12"
        />
        <line x1="70" x2="490" y1="100" y2="100" strokeWidth="8" />
        <line x1="80" x2="80" y1="110" y2="570" strokeWidth="8" />
      </g>
      <g transform={`translate(${busX} 560)`}>
        <rect
          width="520"
          height="230"
          rx="38"
          fill={palette.second}
          opacity="0.78"
        />
        <rect
          x="55"
          y="38"
          width="290"
          height="92"
          fill={palette.paper}
          opacity="0.55"
        />
        <circle cx="115" cy="235" r="54" fill={palette.line} />
        <circle cx="420" cy="235" r="54" fill={palette.line} />
        <circle cx="485" cy="170" r="22" fill={palette.accent} />
      </g>
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={900 - i * 90}
          x2={1550 + i * 120 + act2 * 250}
          y1={650 + i * 50}
          y2={650 + i * 50}
          stroke={palette.accent}
          strokeWidth={5 + i * 2}
          opacity={0.2}
        />
      ))}
    </>
  );
};
