import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const MemoryPeel: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const peel = 80 + cue * 310 + cue2 * 220 + pingPong(t, 15) * 26;
  return (
    <>
      <rect
        x="1050"
        y="120"
        width="720"
        height="840"
        fill={p.surface}
        opacity="0.3"
      />
      <rect
        x="1110"
        y="180"
        width="600"
        height="700"
        fill={p.backgroundAlt}
        opacity="0.68"
      />
      <path
        d={`M1110 180 H1710 V880 H${1370 + peel} Q${1280 + peel} ${740 - peel * 0.22} ${1110 + peel * 0.36} ${560 - peel * 0.34}Z`}
        fill={p.accent}
        opacity="0.6"
      />
      <path
        d={`M${1370 + peel} 880 Q${1280 + peel} ${740 - peel * 0.22} ${1110 + peel * 0.36} ${560 - peel * 0.34}`}
        fill="none"
        stroke={p.light}
        strokeWidth="20"
        opacity="0.64"
      />
      <circle
        cx={1450 + wave(t, 8) * 16}
        cy={420 - cue * 30}
        r="112"
        fill={p.secondary}
        opacity="0.5"
      />
      <path
        d="M990 980 H1850"
        stroke={p.detail}
        strokeWidth="22"
        opacity="0.42"
      />
    </>
  );
};
