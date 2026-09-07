import React from "react";
import { SceneProps, Seed, wave } from "./shared";
export const DandelionField: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const wind = 24 + cue * 50 + cue2 * 36 + wave(t, 8) * 12;
  return (
    <>
      <path
        d="M880 860 C1170 730 1470 920 1920 760 V1080 H880Z"
        fill={p.detail}
        opacity="0.45"
      />
      {Array.from({ length: 8 }, (_, index) => {
        const x = 1030 + index * 125;
        const height = 210 + (index % 3) * 70;
        return (
          <g key={index}>
            <path
              d={`M${x} 900 Q${x - wind} ${900 - height / 2} ${x + wind * 0.32} ${900 - height}`}
              fill="none"
              stroke={p.secondary}
              strokeWidth="12"
              opacity="0.66"
            />
            <circle
              cx={x + wind * 0.32}
              cy={900 - height}
              r={32 + (index % 3) * 8}
              fill={index % 2 ? p.surface : p.accent}
              opacity="0.74"
            />
          </g>
        );
      })}
      {Array.from({ length: 9 }, (_, index) => (
        <Seed
          key={index}
          x={1180 + index * 90 + cue * 110 + wave(t, 7 + index) * 15}
          y={210 + (index % 4) * 95 - cue * 45}
          rotate={20 + index * 19}
          scale={0.45 + (index % 3) * 0.08}
          color={index % 3 === 0 ? p.accent : p.light}
          opacity={0.62}
        />
      ))}
    </>
  );
};
