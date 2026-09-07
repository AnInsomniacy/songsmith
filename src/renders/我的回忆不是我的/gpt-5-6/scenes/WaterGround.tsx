import React from "react";
import { orbit, RippleRings, SceneProps, wave } from "./shared";
export const WaterGround: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    {Array.from({ length: 7 }, (_, index) => (
      <path
        key={index}
        d={`M920 ${180 + index * 110} C1120 ${110 + index * 120 + wave(t, 8 + index) * 20} 1370 ${250 + index * 82} 1570 ${170 + index * 105 - cue * 18} C1730 ${120 + index * 115} 1830 ${210 + index * 95} 1960 ${160 + index * 108}`}
        fill="none"
        stroke={index === 3 ? p.accent : p.light}
        strokeWidth={index === 3 ? 18 : 8}
        opacity={0.22 + index * 0.055}
      />
    ))}
    <path
      d={`M900 820 C1130 ${700 + wave(t, 10) * 22} 1330 930 1530 790 C1700 670 1810 760 1920 700 V1080 H900Z`}
      fill={p.detail}
      opacity="0.5"
    />
    <RippleRings
      cx={1530}
      cy={790}
      p={p}
      pulse={wave(t, 7) * 6 + cue * 9 + cue2 * 8}
      count={4}
    />
    <circle
      cx={1170 + orbit(t, 9, 22)}
      cy={520 + wave(t, 8) * 16}
      r="44"
      fill={p.secondary}
      opacity="0.74"
    />
  </>
);
