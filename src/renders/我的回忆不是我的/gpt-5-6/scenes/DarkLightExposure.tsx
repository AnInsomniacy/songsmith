import React from "react";
import { orbit, pingPong, SceneProps, wave } from "./shared";
export const DarkLightExposure: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  p,
  id,
}) => {
  const fogId = `${id}-fog`;
  const open = 260 + cue * 300 + cue2 * 180 + pingPong(t, 10) * 50;
  return (
    <>
      <defs>
        <radialGradient id={fogId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.light} stopOpacity="0.52" />
          <stop offset="1" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x="980"
        y="0"
        width={open}
        height="1080"
        fill="#07111D"
        opacity="0.78"
      />
      <path
        d={`M${980 + open} 0 L1920 250 V930 L${980 + open} 1080Z`}
        fill={p.light}
        opacity="0.26"
      />
      <circle
        cx={1430 + wave(t, 8) * 42}
        cy={530 + wave(t, 10, 2) * 26}
        r="390"
        fill={`url(#${fogId})`}
      />
      {[0, 1, 2].map((index) => (
        <ellipse
          key={index}
          cx={1320 + index * 190 + orbit(t, 8 + index, 25)}
          cy={420 + index * 95 + wave(t, 7 + index) * 18}
          rx={180 + index * 50}
          ry={85 + index * 24}
          fill={p.light}
          opacity={0.1 + index * 0.055}
        />
      ))}
      <rect
        x="1740"
        y="120"
        width="36"
        height="840"
        fill={p.accent}
        opacity={0.74}
      />
    </>
  );
};
