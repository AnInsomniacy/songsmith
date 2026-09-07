import React from "react";
import { orbit, SceneProps, wave } from "./shared";
export const SharedContactSheet: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  p,
}) => {
  const pull = cue * 240 + cue2 * 120 + wave(t, 7.6) * 10;
  return (
    <>
      <g transform={`translate(${1020 + orbit(t, 17, 12)} 115)`}>
        <rect width="760" height="850" fill={p.surface} opacity="0.28" />
        {Array.from({ length: 9 }, (_, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);
          const selected = index === 4;
          return (
            <g
              key={index}
              transform={`translate(${60 + col * 230 + (selected ? pull : 0)} ${70 + row * 250})`}
            >
              <rect
                width="190"
                height="190"
                fill={selected ? p.accent : p.backgroundAlt}
                opacity={selected ? 0.84 : 0.55}
              />
              <circle
                cx={95 + wave(t, 6 + index) * 8}
                cy="88"
                r={42 + (index % 3) * 8}
                fill={selected ? p.light : p.secondary}
                opacity="0.58"
              />
              <rect
                y="200"
                width="140"
                height="10"
                fill={p.light}
                opacity="0.45"
              />
            </g>
          );
        })}
      </g>
      <path
        d="M940 90 V990"
        stroke={p.accent}
        strokeWidth="14"
        opacity="0.64"
      />
    </>
  );
};
