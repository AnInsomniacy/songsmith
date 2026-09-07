import React from "react";
import { ArtProps, Rain } from "./shared";
export const Scene23: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <g opacity="0.34">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={1040 + i * 72}
          y={270 + (i % 4) * 75}
          width={28 + (i % 3) * 18}
          height={260 - (i % 5) * 30}
          fill={i % 3 ? palette.paper : palette.accent}
          transform={`translate(${Math.sin(t + i) * 18} 0)`}
        />
      ))}
    </g>
    <Rain t={t} seed={index} color={palette.paper} count={38} />
    <path
      d={`M960 980 Q1380 ${220 - act2 * 80} 1820 950`}
      fill="none"
      stroke={palette.line}
      strokeWidth="38"
      opacity="0.48"
    />
    <path
      d={`M960 960 Q1380 ${220 - act2 * 80} 1820 930`}
      fill="none"
      stroke={palette.paper}
      strokeWidth="9"
      opacity="0.46"
      strokeDasharray="120 50"
      strokeDashoffset={-t * 100}
    />
    <g transform={`rotate(${-24 + Math.sin(t * 0.7) * 7} 1420 1040)`}>
      <rect
        x="1408"
        y="320"
        width="24"
        height="760"
        rx="12"
        fill={palette.accent}
      />
    </g>
  </>
);
