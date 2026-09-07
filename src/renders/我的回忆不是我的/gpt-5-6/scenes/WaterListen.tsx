import React from "react";
import { orbit, RippleRings, SceneProps, wave } from "./shared";
export const WaterListen: React.FC<SceneProps> = ({ t, cue, cue2, p }) => (
  <>
    <RippleRings
      cx={1450}
      cy={455 + wave(t, 8) * 10}
      p={p}
      pulse={wave(t, 6.4) * 7 + cue * 8 + cue2 * 8}
    />
    <path
      d={`M900 870 C1120 ${760 + wave(t, 10) * 20} 1260 910 1460 820 C1650 735 1770 810 1920 760 V1080 H900Z`}
      fill={p.detail}
      opacity="0.52"
    />
    <path
      d="M900 870 C1120 760 1260 910 1460 820 C1650 735 1770 810 1920 760"
      fill="none"
      stroke={p.light}
      strokeWidth="16"
      opacity="0.5"
    />
    {[0, 1, 2, 3].map((index) => (
      <circle
        key={index}
        cx={1230 + index * 170 + orbit(t, 7 + index, 16)}
        cy={300 + index * 70 + wave(t, 6 + index) * 12}
        r={12 + index * 6}
        fill={index === 2 ? p.accent : p.surface}
        opacity="0.72"
      />
    ))}
  </>
);
