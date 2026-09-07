import React from "react";
import { Dandelion, SceneProps, Seed, wave } from "./shared";
export const DandelionFirst: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const release = cue * 260 + cue2 * 180;
  return (
    <>
      <Dandelion x={1430} y={590} radius={215} p={p} sway={wave(t, 8) * 26} />
      {Array.from({ length: 10 }, (_, index) => {
        const spread = release * (0.34 + index * 0.06);
        return (
          <Seed
            key={index}
            x={1540 + index * 36 + spread + wave(t, 6 + index * 0.3) * 18}
            y={390 - index * 28 - spread * 0.38 + wave(t, 5 + index * 0.4) * 16}
            rotate={24 + index * 17 + wave(t, 7 + index) * 8}
            scale={0.62 + index * 0.035}
            color={index % 3 === 0 ? p.accent : p.light}
            opacity={0.62 + index * 0.025}
          />
        );
      })}
      <path
        d="M960 900 Q1420 780 1920 850"
        fill="none"
        stroke={p.secondary}
        strokeWidth="34"
        opacity="0.28"
      />
    </>
  );
};
