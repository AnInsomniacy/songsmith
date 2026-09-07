import React from "react";
import { FilmStrip, orbit, SceneProps, wave } from "./shared";
export const RomanceNegative: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    <circle cx="1170" cy="310" r="190" fill={p.surface} opacity="0.3" />
    <circle cx="1170" cy="310" r="64" fill={p.background} />
    <circle cx="1680" cy="760" r="240" fill={p.surface} opacity="0.34" />
    <circle cx="1680" cy="760" r="76" fill={p.background} />
    <FilmStrip
      x={1020 + orbit(t, 10, 18)}
      y={365 + wave(t, 8) * 14}
      width={820}
      height={260}
      p={p}
      offset={cue * 22 + cue2 * 38}
      rotate={9}
    />
    <path
      d="M1170 120 C1410 180 1480 610 1680 520"
      fill="none"
      stroke={p.accent}
      strokeWidth="24"
      opacity="0.68"
    />
    <circle
      cx={1440 + wave(t, 7) * 18}
      cy="500"
      r={80 + cue * 28 + cue2 * 24}
      fill={p.light}
      opacity="0.24"
    />
  </>
);
