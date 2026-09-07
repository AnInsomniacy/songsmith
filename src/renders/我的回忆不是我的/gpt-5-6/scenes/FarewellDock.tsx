import React from "react";
import { SceneProps, wave } from "./shared";
export const FarewellDock: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const fold = cue * 22 + cue2 * 18 + wave(t, 11) * 2;
  return (
    <>
      <path
        d="M930 850 H1920"
        stroke={p.light}
        strokeWidth="52"
        opacity="0.38"
      />
      <path
        d="M980 800 H1800"
        stroke={p.secondary}
        strokeWidth="18"
        opacity="0.64"
      />
      <g transform={`rotate(${-fold} 1420 770)`}>
        <rect
          x="1160"
          y="610"
          width="620"
          height="120"
          fill={p.surface}
          opacity="0.58"
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <line
            key={index}
            x1={1200 + index * 130}
            y1="610"
            x2={1200 + index * 130}
            y2="730"
            stroke={p.backgroundAlt}
            strokeWidth="10"
          />
        ))}
      </g>
      <path
        d={`M1040 650 C1230 ${480 + wave(t, 9) * 20} 1530 ${520 - cue * 100} 1810 350`}
        fill="none"
        stroke={p.accent}
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.78"
      />
      <circle cx="1040" cy="650" r="54" fill={p.surface} />
      <circle cx="1810" cy="350" r="34" fill={p.light} />
      <rect
        x="1710"
        y="90"
        width="90"
        height="320"
        fill={p.detail}
        opacity="0.5"
      />
    </>
  );
};
