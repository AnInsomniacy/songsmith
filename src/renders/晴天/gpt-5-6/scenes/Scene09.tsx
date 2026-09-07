import React from "react";
import { ArtProps, Particles } from "./shared";
export const Scene09: React.FC<ArtProps> = ({ t, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <polygon
      points="960,1040 1040,180 1800,70 1840,1040"
      fill={palette.paper}
    />
    <path
      d="M1000 1030 L1190 200 M1000 1030 L1660 110"
      stroke={palette.line}
      strokeWidth="12"
      opacity="0.45"
    />
    <g transform="translate(1220 230)" stroke={palette.line} strokeWidth="10">
      <path
        d={`M0 540 V0 H230 V540 L${115 - act2 * 90} ${500 - act2 * 80}Z`}
        fill={palette.second}
        opacity="0.55"
      />
      <path
        d={`M350 500 V-40 H620 V500 L${485 + act2 * 95} ${440 - act2 * 70}Z`}
        fill={palette.accent}
        opacity="0.42"
      />
    </g>
    <path
      d={`M1010 970 C${1080 - act2 * 180} 720 850 540 590 420`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="16"
    />
    <path
      d={`M1010 970 C${1190 + act2 * 180} 700 1450 520 1740 360`}
      fill="none"
      stroke={palette.second}
      strokeWidth="16"
    />
    <Particles t={t} seed={9} color={palette.paper} count={5} />
  </>
);
