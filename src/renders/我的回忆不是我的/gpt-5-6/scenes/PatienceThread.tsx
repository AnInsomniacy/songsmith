import React from "react";
import { SceneProps, wave } from "./shared";
export const PatienceThread: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const rotation = t * 16 + cue2 * 15;
  const tension = 90 + cue * 150 + cue2 * 70 + wave(t, 5.2) * 12;
  return (
    <>
      <circle cx="1220" cy="360" r="190" fill={p.surface} opacity="0.34" />
      <circle cx="1220" cy="360" r="72" fill={p.background} />
      <circle cx="1630" cy="720" r="230" fill={p.surface} opacity="0.42" />
      <circle cx="1630" cy="720" r="82" fill={p.background} />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <line
          key={`a-${index}`}
          x1="1220"
          y1="360"
          x2="1220"
          y2="200"
          stroke={p.accent}
          strokeWidth="12"
          transform={`rotate(${index * 60 + rotation} 1220 360)`}
          opacity="0.65"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <line
          key={`b-${index}`}
          x1="1630"
          y1="720"
          x2="1630"
          y2="520"
          stroke={p.secondary}
          strokeWidth="14"
          transform={`rotate(${index * 60 - rotation * 0.82} 1630 720)`}
          opacity="0.65"
        />
      ))}
      <path
        d={`M1220 170 C1360 ${250 + tension} 1430 ${520 - tension * 0.3} 1630 480`}
        fill="none"
        stroke={p.light}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M1000 930 H1860"
        stroke={p.detail}
        strokeWidth="24"
        opacity="0.5"
      />
    </>
  );
};
