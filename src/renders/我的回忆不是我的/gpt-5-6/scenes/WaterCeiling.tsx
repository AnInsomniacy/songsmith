import React from "react";
import { RippleRings, SceneProps, wave } from "./shared";
export const WaterCeiling: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    <g transform="translate(0 20) scale(1 -1) translate(0 -500)">
      <RippleRings
        cx={1480}
        cy={80}
        p={p}
        pulse={wave(t, 7) * 8 + cue * 8 + cue2 * 9}
        count={7}
      />
    </g>
    {Array.from({ length: 8 }, (_, index) => (
      <path
        key={index}
        d={`M${990 + index * 120} 0 C${1040 + index * 100} ${300 + wave(t, 8 + index) * 30} ${930 + index * 130} ${590 + wave(t, 9 + index, 2) * 26} ${1040 + index * 110} 1080`}
        fill="none"
        stroke={index % 3 === 0 ? p.accent : p.light}
        strokeWidth={index % 3 === 0 ? 18 : 8}
        opacity={0.2 + (index % 4) * 0.08}
      />
    ))}
    <rect
      x="960"
      y="900"
      width="960"
      height="180"
      fill={p.detail}
      opacity="0.34"
    />
    <circle
      cx={1700 + wave(t, 7) * 22}
      cy={790 - cue * 90 - cue2 * 70}
      r="42"
      fill={p.secondary}
    />
  </>
);
