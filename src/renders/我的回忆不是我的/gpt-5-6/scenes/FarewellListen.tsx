import React from "react";
import { FilmMount, pingPong, SceneProps, wave } from "./shared";
export const FarewellListen: React.FC<SceneProps> = ({ t, cue, cue2, p }) => {
  const separation = 35 + cue * 230 + cue2 * 120 + pingPong(t, 12) * 18;
  return (
    <>
      <FilmMount
        x={1030 - separation}
        y={210 + wave(t, 9) * 12}
        width={410}
        height={590}
        p={p}
        image={p.accent}
        rotate={-4}
        opacity={0.74}
      />
      <FilmMount
        x={1370 + separation}
        y={270 - wave(t, 10) * 14}
        width={410}
        height={590}
        p={p}
        image={p.secondary}
        rotate={5}
        opacity={0.72}
      />
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M1190 ${430 + index * 58} C1390 ${390 + index * 62 + wave(t, 6 + index) * 12} 1560 ${470 + index * 40} 1770 ${430 + index * 58}`}
          fill="none"
          stroke={index === 2 ? p.accent : p.light}
          strokeWidth={index === 2 ? 15 : 7}
          opacity={0.56 - index * 0.05}
        />
      ))}
    </>
  );
};
