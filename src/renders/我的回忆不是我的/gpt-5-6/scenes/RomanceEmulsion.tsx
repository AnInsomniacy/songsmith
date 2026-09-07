import React from "react";
import { orbit, SceneProps, wave } from "./shared";
export const RomanceEmulsion: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  p,
  id,
}) => {
  const blend = 80 + cue * 170 + cue2 * 100;
  const gradientA = `${id}-emulsion-a`;
  const gradientB = `${id}-emulsion-b`;
  return (
    <>
      <defs>
        <linearGradient id={gradientA} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.secondary} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={gradientB} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.light} stopOpacity="0.7" />
          <stop offset="1" stopColor={p.accent} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d={`M1020 90 C1280 ${210 + wave(t, 9) * 30} 1510 180 1880 40 V760 C1560 900 1300 ${760 - blend} 980 940Z`}
        fill={`url(#${gradientA})`}
        opacity="0.72"
      />
      <path
        d={`M1880 170 C1580 ${60 + wave(t, 11, 2) * 24} 1370 430 1080 300 V1010 C1380 ${820 - blend} 1590 1010 1900 820Z`}
        fill={`url(#${gradientB})`}
        opacity="0.62"
      />
      <rect
        x="990"
        y="92"
        width="820"
        height="880"
        fill="none"
        stroke={p.surface}
        strokeWidth="18"
        opacity="0.28"
      />
      <circle
        cx={1460 + orbit(t, 8, 26)}
        cy={540 + wave(t, 7) * 18}
        r={120 + cue * 32}
        fill={p.light}
        opacity="0.24"
      />
    </>
  );
};
