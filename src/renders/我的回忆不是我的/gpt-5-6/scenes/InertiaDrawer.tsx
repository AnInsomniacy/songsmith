import React from "react";
import { pingPong, SceneProps, wave } from "./shared";
export const InertiaDrawer: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const open = 45 + cue * 240 + cue2 * 150 + pingPong(t, 12.2) * 18;
  return (
    <>
      <g transform="translate(1080 95)">
        <rect width="700" height="900" fill={p.surface} opacity="0.3" />
        {[0, 1, 2, 3].map((index) => (
          <g
            key={index}
            transform={`translate(${70 + (index === 2 ? open : 0)} ${70 + index * 205})`}
          >
            <rect
              width="560"
              height="160"
              rx="12"
              fill={index === 2 ? p.accent : p.backgroundAlt}
              opacity={index === 2 ? 0.74 : 0.52}
            />
            <rect
              x="210"
              y="55"
              width="140"
              height="42"
              rx="20"
              fill={p.surface}
              opacity="0.72"
            />
            {index === 2 ? (
              <rect
                x="510"
                y="20"
                width="220"
                height="120"
                fill={p.light}
                opacity="0.42"
              />
            ) : null}
          </g>
        ))}
      </g>
      <path
        d={`M990 200 C900 ${380 + wave(t, 8) * 20} 1020 650 930 860`}
        fill="none"
        stroke={p.secondary}
        strokeWidth="18"
        opacity="0.58"
      />
    </>
  );
};
