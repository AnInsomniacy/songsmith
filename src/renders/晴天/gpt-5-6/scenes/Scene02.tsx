import React from "react";
import { ArtProps, Cloud, Particles } from "./shared";
export const Scene02: React.FC<ArtProps> = ({ t, enter, act2, palette }) => {
  const angle = Math.sin(t * 1.7) * (4 + act2 * 4);
  return (
    <>
      <rect width="1920" height="1080" fill={palette.bg} />
      <Cloud x={1240 + Math.sin(t * 0.3) * 60} y={90} color={palette.paper} />
      <path
        d="M70 860 C450 760 800 890 1100 810 C1370 740 1640 810 1870 750"
        fill="none"
        stroke={palette.second}
        strokeWidth="12"
      />
      <g
        transform={`translate(1280 135) scale(${enter})`}
        stroke={palette.line}
        strokeLinecap="round"
      >
        <path
          d="M0 0 H470 M70 0 L10 690 M395 0 L460 690"
          strokeWidth="17"
          fill="none"
        />
        <g transform={`rotate(${angle} 235 0)`}>
          <line x1="158" y1="5" x2="140" y2="500" strokeWidth="8" />
          <line x1="310" y1="5" x2="328" y2="500" strokeWidth="8" />
          <path
            d="M118 505 Q234 545 350 505"
            fill="none"
            stroke={palette.accent}
            strokeWidth="22"
          />
        </g>
      </g>
      <ellipse
        cx="1510"
        cy="900"
        rx={190 + Math.sin(t * 1.7) * 45}
        ry="24"
        fill={palette.line}
        opacity="0.18"
      />
      <Particles t={t} seed={2} color={palette.accent} count={7} area="right" />
    </>
  );
};
