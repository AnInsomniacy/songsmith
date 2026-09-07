import type { EvolutionProps } from "./types";
export const WaterListen = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.58}>
      <path
        d={`M1450 455 C1450 ${590 + resolve * 70} 1370 ${700 + resolve * 80} 1530 820`}
        fill="none"
        stroke={p.accent}
        strokeWidth="18"
        strokeDasharray="620"
        strokeDashoffset={(1 - stage) * 620}
      />
      {Array.from({ length: 4 }, (_, index) => (
        <path
          key={index}
          d={`M1050 ${820 + index * 28} C1240 ${740 + index * 34} 1500 ${900 - index * 22} 1900 ${760 + index * 24}`}
          fill="none"
          stroke={index === 2 ? p.secondary : p.light}
          strokeWidth={index === 2 ? 14 : 7}
        />
      ))}
    </g>
  );
};
