import React from "react";
import { orbit, pingPong, SceneProps, wave } from "./shared";
export const TemperamentShutter: React.FC<SceneProps> = ({
  t,
  cue,
  cue2,
  p,
}) => {
  const turn = wave(t, 8.4) * 9 + cue * 5 + cue2 * 12;
  const aperture = 96 + pingPong(t, 6.8) * 34 + cue2 * 28;
  return (
    <>
      <g transform={`translate(${orbit(t, 13, 18)} ${wave(t, 10) * 9})`}>
        <circle cx="1500" cy="520" r="370" fill={p.surface} opacity="0.18" />
        <circle
          cx="1500"
          cy="520"
          r="285"
          fill={p.backgroundAlt}
          opacity="0.72"
        />
        {Array.from({ length: 8 }, (_, index) => (
          <path
            key={index}
            d="M1500 520 L1500 220 Q1670 250 1760 390Z"
            fill={index % 2 ? p.detail : p.secondary}
            opacity="0.62"
            transform={`rotate(${index * 45 + turn} 1500 520)`}
          />
        ))}
        <circle cx="1500" cy="520" r={aperture} fill={p.accent} />
        <circle
          cx="1500"
          cy="520"
          r={aperture * 0.52}
          fill={p.light}
          opacity="0.8"
        />
      </g>
      <g opacity="0.34" transform={`translate(${cue * 100} 0)`}>
        <rect x="90" y="120" width="520" height="74" fill={p.light} />
        <rect x="90" y="900" width="720" height="44" fill={p.accent} />
      </g>
    </>
  );
};
