import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const DeparturePlatform: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  p,
}) => {
  const leave = cue * 380 + cue2 * 210 + pingPong(t, 14) * 30;
  return (
    <>
      <rect
        x="970"
        y="120"
        width="900"
        height="790"
        fill={p.surface}
        opacity="0.18"
      />
      <g transform={`translate(${leave} 0)`}>
        <rect
          x="1090"
          y="210"
          width="620"
          height="570"
          fill={p.backgroundAlt}
          stroke={p.light}
          strokeWidth="18"
          opacity="0.72"
        />
        {[0, 1, 2, 3].map((index) => (
          <line
            key={index}
            x1={1190 + index * 140}
            y1="230"
            x2={1190 + index * 140}
            y2="760"
            stroke={p.detail}
            strokeWidth="14"
            opacity="0.58"
          />
        ))}
      </g>
      <path
        d="M880 840 H1920"
        stroke={p.light}
        strokeWidth="32"
        opacity="0.42"
      />
      <path
        d={`M1040 900 H${1680 - cue * 220}`}
        stroke={p.accent}
        strokeWidth="16"
        opacity="0.72"
      />
      <circle cx={1790 + wave(t, 8) * 10} cy="150" r="52" fill={p.secondary} />
    </>
  );
};
