import type { EvolutionProps } from "./types";
const wave = (t: number, period: number, phase = 0) =>
  Math.sin(((t + phase) / period) * Math.PI * 2);
export const PromiseReplay = ({ p, t, stage, resolve }: EvolutionProps) => {
  const breathe = Math.sin((t / 8.6) * Math.PI * 2) * 8;
  return (
    <g opacity={stage * 0.66}>
      <path
        d={`M1070 780 C1190 ${690 - breathe} 1260 ${850 + breathe} 1370 760 C1490 660 1600 850 1810 ${690 - resolve * 80}`}
        fill="none"
        stroke={p.accent}
        strokeWidth="20"
        strokeDasharray="1180"
        strokeDashoffset={(1 - stage) * 1180}
      />
      {Array.from({ length: 5 }, (_, index) => (
        <circle
          key={index}
          cx={1190 + index * 135}
          cy={760 + wave(t, 5.4, index * 0.7) * (18 + resolve * 14)}
          r={14 + index * 3}
          fill={index === 2 ? p.secondary : p.light}
        />
      ))}
    </g>
  );
};
