import React from "react";
import { ArtProps, Particles } from "./shared";
export const Scene08: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <g transform={`translate(1120 220) scale(${0.7 + enter * 0.3})`}>
      <path
        d="M0 120 Q330 0 660 120 V710 Q330 590 0 710Z"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="9"
      />
      <line
        x1="330"
        y1="90"
        x2="330"
        y2="680"
        stroke={palette.line}
        strokeWidth="7"
      />
      <path
        d={`M330 100 Q${500 + act2 * 130} ${90 - act2 * 40} 660 120 V710 Q500 590 330 680Z`}
        fill={palette.accent}
        opacity={0.1 + act2 * 0.16}
      />
      <g
        transform={`translate(470 ${520 - act2 * 210}) rotate(${Math.sin(t) * 3})`}
      >
        <path
          d="M0 130 C-8 60 10 10 0 -80"
          stroke={palette.second}
          strokeWidth="9"
          fill="none"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            rx="37"
            ry="15"
            fill={palette.accent}
            transform={`rotate(${i * 60}) translate(46 0)`}
          />
        ))}
      </g>
    </g>
    <Particles t={t} seed={8} color={palette.accent} count={6} area="right" />
  </>
);
