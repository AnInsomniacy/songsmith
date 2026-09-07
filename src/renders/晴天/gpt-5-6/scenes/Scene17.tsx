import React from "react";
import { ArtProps, Particles } from "./shared";
export const Scene17: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <path
      d="M980 1080 V260 Q1370 100 1840 300 V1080Z"
      fill={palette.paper}
      opacity="0.62"
    />
    <path
      d="M1060 410 Q1410 250 1760 420"
      fill="none"
      stroke={palette.line}
      strokeWidth="16"
    />
    <g
      transform={`translate(1290 ${720 - act2 * 300}) rotate(${-7 + Math.sin(t * 0.8) * 2})`}
    >
      <rect
        width="360"
        height="260"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="10"
      />
      <rect
        x="35"
        y="40"
        width="290"
        height="155"
        fill={palette.second}
        opacity="0.4"
      />
      <circle cx="110" cy="118" r="38" fill={palette.accent} opacity="0.65" />
      <path d="M35 220 H325" stroke={palette.accent} strokeWidth="9" />
    </g>
    <path
      d={`M1080 860 C1220 ${760 - act2 * 120} 1500 ${850 + Math.sin(t) * 45} ${1800 - act2 * 180} 580`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="12"
      strokeDasharray="44 18"
      strokeDashoffset={-t * 35}
    />
    <Particles t={t} seed={17} color={palette.accent} count={5} area="right" />
  </>
);
