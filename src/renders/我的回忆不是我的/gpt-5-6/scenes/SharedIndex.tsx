import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const SharedIndex: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const transfer = cue * 330 + cue2 * 190 + pingPong(t, 13.5) * 24;
  return (
    <>
      <g transform="translate(1030 160)">
        {[0, 1, 2].map((index) => (
          <g
            key={index}
            transform={`translate(${index * 46} ${index * 38}) rotate(${-5 + index * 3})`}
          >
            <rect
              width="430"
              height="620"
              fill={p.surface}
              opacity={0.28 + index * 0.12}
            />
            <rect
              x="55"
              y="70"
              width="320"
              height="250"
              fill={p.backgroundAlt}
              opacity="0.72"
            />
          </g>
        ))}
      </g>
      <g
        transform={`translate(${1190 + transfer} ${310 + wave(t, 8) * 12}) rotate(${3 + cue * 4})`}
      >
        <rect width="420" height="570" fill={p.surface} opacity="0.78" />
        <rect
          x="48"
          y="55"
          width="324"
          height="330"
          fill={p.accent}
          opacity="0.58"
        />
        <circle cx="210" cy="220" r="92" fill={p.secondary} opacity="0.66" />
      </g>
      <path
        d={`M980 900 C1260 ${820 + wave(t, 10) * 18} 1570 980 1900 820`}
        fill="none"
        stroke={p.light}
        strokeWidth="18"
        opacity="0.46"
      />
    </>
  );
};
