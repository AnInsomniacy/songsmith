import React from "react";
import { ArtProps } from "./shared";
export const Scene12: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <rect
      y="630"
      width="1920"
      height="450"
      fill={palette.second}
      opacity="0.28"
    />
    <path
      d="M760 1080 L1190 520 L1510 1080Z"
      fill={palette.paper}
      opacity="0.42"
    />
    <path
      d="M1135 1080 L1200 540"
      stroke={palette.accent}
      strokeWidth="8"
      strokeDasharray="48 62"
      strokeDashoffset={-t * 90}
    />
    {Array.from({ length: 8 }).map((_, i) => {
      const s = 1 - i * 0.095;
      return (
        <g
          key={i}
          transform={`translate(${1770 - i * 110} ${940 - i * 55}) scale(${s})`}
          stroke={palette.line}
          strokeWidth="8"
          opacity={0.7}
        >
          <line y2="-340" />
          <line x1="-75" x2="75" y1="-300" y2="-300" />
          <path d="M-75 -300 Q-240 -230 -430 -220" fill="none" />
        </g>
      );
    })}
    <g
      transform={`translate(${1750 - ((t * 110 + act2 * 330) % 1550)} ${260 + Math.sin(t * 0.9) * 90}) rotate(${-12 + Math.sin(t) * 6})`}
      fill={palette.accent}
    >
      <path d="M0 0 L120 35 L20 64 L42 36Z" />
    </g>
  </>
);
