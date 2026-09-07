import React from "react";
import { ArtProps, Rain } from "./shared";
export const Scene10: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <Rain t={t} seed={index} color={palette.paper} count={28} />
    {Array.from({ length: 8 }).map((_, i) => (
      <path
        key={i}
        d={`M980 ${170 + i * 92} C1230 ${80 + i * 90 + Math.sin(t * 2 + i) * 25} 1500 ${250 + i * 65} 1860 ${130 + i * 90}`}
        fill="none"
        stroke={i % 2 ? palette.second : palette.paper}
        strokeWidth={5 + (i % 3) * 2}
        opacity="0.24"
      />
    ))}
    <path
      d={`M980 780 C1160 ${620 - act2 * 80} 1290 650 1430 760`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="36"
      strokeLinecap="round"
    />
    <path
      d={`M1780 670 C1610 ${540 + act2 * 80} 1520 650 1430 760`}
      fill="none"
      stroke={palette.second}
      strokeWidth="36"
      strokeLinecap="round"
    />
    <circle cx="1430" cy="760" r={26 + act2 * 10} fill={palette.paper} />
    <path
      d={`M1160 510 C1350 ${430 + Math.sin(t * 2) * 45} 1520 500 1740 350`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="14"
      strokeDasharray="60 24"
      strokeDashoffset={-t * 80}
    />
  </>
);
