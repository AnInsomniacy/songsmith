import type { EvolutionProps } from "./types";
export const WaterCeiling = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.6}>
      <line
        x1="960"
        y1={260 + resolve * 470}
        x2="1920"
        y2={260 + resolve * 470}
        stroke={p.accent}
        strokeWidth="18"
      />
      {Array.from({ length: 5 }, (_, index) => (
        <ellipse
          key={index}
          cx="1480"
          cy={260 + resolve * 470}
          rx={90 + index * 90 + resolve * 42}
          ry={18 + index * 12}
          fill="none"
          stroke={index === 2 ? p.secondary : p.light}
          strokeWidth={index === 2 ? 12 : 6}
        />
      ))}
    </g>
  );
};
