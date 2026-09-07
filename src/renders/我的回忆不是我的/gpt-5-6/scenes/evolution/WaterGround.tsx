import type { EvolutionProps } from "./types";
export const WaterGround = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.58}>
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M980 ${730 + index * 34} C1180 ${620 + index * 42} 1390 ${860 - index * 32} 1580 ${740 + index * 20} C1740 ${650 + index * 24} 1840 ${730 - index * 12} ${1980 + resolve * 70} ${650 + index * 22}`}
          fill="none"
          stroke={index === 2 ? p.accent : p.light}
          strokeWidth={index === 2 ? 16 : 7}
          strokeDasharray="1280"
          strokeDashoffset={(1 - stage) * 1280}
        />
      ))}
    </g>
  );
};
