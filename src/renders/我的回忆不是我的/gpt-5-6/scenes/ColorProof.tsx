import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const ColorProof: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const wash = cue * 250 + cue2 * 140 + pingPong(t, 9.6) * 45;
  return (
    <>
      {[p.accent, p.secondary, p.light].map((color, index) => (
        <g
          key={color}
          transform={`translate(${1080 + index * 220} ${150 + index * 95 + wave(t, 7 + index) * 12})`}
        >
          <rect
            width="440"
            height="620"
            fill={color}
            opacity={0.34 + index * 0.12}
          />
          <path
            d={`M0 ${260 + wash * (index + 1) * 0.24} C110 ${210 - wash * 0.12} 310 ${330 + wash * 0.1} 440 ${240 + wash * 0.08} V620 H0Z`}
            fill={p.backgroundAlt}
            opacity={0.52}
          />
        </g>
      ))}
      <rect
        x="990"
        y="90"
        width="850"
        height="900"
        fill="none"
        stroke={p.surface}
        strokeWidth="20"
        opacity="0.35"
      />
      <circle
        cx={1670 + wave(t, 8) * 18}
        cy="820"
        r={80 + cue * 40}
        fill={p.accent}
        opacity="0.72"
      />
    </>
  );
};
