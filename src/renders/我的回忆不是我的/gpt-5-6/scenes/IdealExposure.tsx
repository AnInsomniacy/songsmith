import React from "react";
import { SceneProps, wave } from "./shared";
export const IdealExposure: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const converge = 260 - cue * 150 - cue2 * 80 + wave(t, 9) * 16;
  return (
    <>
      <circle cx="1110" cy="270" r="100" fill={p.accent} opacity="0.74" />
      <circle cx="1780" cy="270" r="100" fill={p.secondary} opacity="0.74" />
      <path
        d={`M1110 270 L${1435 - converge} 930 H1435Z`}
        fill={p.accent}
        opacity="0.32"
      />
      <path
        d={`M1780 270 L${1435 + converge} 930 H1435Z`}
        fill={p.secondary}
        opacity="0.32"
      />
      <rect
        x="1190"
        y="690"
        width="500"
        height="250"
        fill={p.surface}
        opacity="0.42"
      />
      <circle
        cx="1440"
        cy={810 + wave(t, 7) * 12}
        r={75 + cue * 36}
        fill={p.light}
        opacity="0.65"
      />
      <path
        d="M950 960 H1910"
        stroke={p.light}
        strokeWidth="12"
        opacity="0.34"
      />
    </>
  );
};
