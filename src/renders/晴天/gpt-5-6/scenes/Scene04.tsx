import React from "react";
import { ArtProps, Cloud, Particles } from "./shared";
export const Scene04: React.FC<ArtProps> = ({ t, enter, act2, palette }) => (
  <>
    <rect width="1920" height="1080" fill={palette.bg} />
    <Cloud
      x={1150 + ((t * 18) % 500)}
      y={120}
      scale={1.15}
      color={palette.paper}
    />
    <Cloud
      x={1510 - ((t * 10) % 370)}
      y={285}
      scale={0.7}
      color={palette.second}
      opacity={0.2}
    />
    <g
      transform={`translate(1300 585) rotate(-7) scale(${0.65 + enter * 0.35})`}
      stroke={palette.line}
      strokeWidth="9"
    >
      <rect width="430" height="270" rx="25" fill={palette.paper} />
      <circle cx="135" cy="100" r="47" fill="none" />
      <circle cx="295" cy="100" r="47" fill="none" />
      <path d="M135 100 H295 M88 215 H342" />
    </g>
    <path
      d={`M1428 684 C1210 ${680 - act2 * 190} 1040 ${760 - act2 * 100} 810 ${655 - act2 * 80}`}
      fill="none"
      stroke={palette.accent}
      strokeWidth="10"
      strokeDasharray="22 16"
      strokeDashoffset={-t * 45}
    />
    <Particles t={t} seed={4} color={palette.accent} count={10} />
  </>
);
