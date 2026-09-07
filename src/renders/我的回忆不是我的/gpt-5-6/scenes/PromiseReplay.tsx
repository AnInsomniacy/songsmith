import React from "react";
import { SceneProps, wave } from "./shared";
export const PromiseReplay: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const angle = t * 24;
  return (
    <>
      {[1190, 1640].map((cx, reel) => (
        <g key={cx} transform={`rotate(${reel ? -angle : angle} ${cx} 510)`}>
          <circle
            cx={cx}
            cy="510"
            r={reel ? 210 : 175}
            fill={p.surface}
            opacity="0.28"
          />
          {[0, 1, 2].map((index) => (
            <ellipse
              key={index}
              cx={cx}
              cy={reel ? 360 : 385}
              rx="48"
              ry="112"
              fill={reel ? p.secondary : p.accent}
              opacity="0.68"
              transform={`rotate(${index * 120} ${cx} 510)`}
            />
          ))}
          <circle cx={cx} cy="510" r="58" fill={p.backgroundAlt} />
        </g>
      ))}
      <path
        d={`M1190 335 C1360 ${230 + wave(t, 8) * 18 - cue2 * 26} 1510 250 1640 300 C1820 365 1830 ${750 + cue * 35 + cue2 * 52} 1640 720 C1470 700 1370 760 1190 685 C1010 610 1010 410 1190 335Z`}
        fill="none"
        stroke={p.light}
        strokeWidth="22"
        opacity="0.68"
      />
      <rect
        x="1360"
        y="430"
        width="120"
        height="160"
        rx="26"
        fill={p.accent}
        opacity="0.72"
      />
    </>
  );
};
