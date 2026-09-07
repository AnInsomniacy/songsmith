import React from "react";
import { ArtProps, Rain } from "./shared";
export const Scene16: React.FC<ArtProps> = ({ t, act2, palette, index }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <ellipse
      cx="1390"
      cy="650"
      rx="560"
      ry="300"
      fill={palette.paper}
      opacity="0.36"
    />
    <ellipse
      cx="1390"
      cy="650"
      rx="510"
      ry="250"
      fill={palette.line}
      opacity="0.18"
    />
    <Rain t={t} seed={index} color={palette.paper} count={22} />
    {Array.from({ length: 8 }).map((_, i) => {
      const p = (t * 0.32 + i * 0.14) % 1;
      return (
        <ellipse
          key={i}
          cx={1050 + i * 95}
          cy={570 + (i % 3) * 65}
          rx={p * 145}
          ry={p * 42}
          fill="none"
          stroke={i % 2 ? palette.accent : palette.second}
          strokeWidth="6"
          opacity={(1 - p) * 0.45}
        />
      );
    })}
    <g
      transform={`translate(${1780 - ((t * 70 + act2 * 260) % 900)} ${330 + ((t * 28) % 370)}) rotate(${t * 36})`}
      fill={palette.accent}
    >
      <path d="M0 0 Q55 -40 100 10 Q50 70 0 0Z" />
    </g>
    <path
      d={`M980 710 Q1390 ${520 + Math.sin(t) * 30} 1790 700`}
      stroke={palette.paper}
      strokeWidth="8"
      fill="none"
      opacity="0.32"
    />
  </>
);
