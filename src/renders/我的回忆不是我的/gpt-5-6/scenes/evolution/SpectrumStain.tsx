import type { EvolutionProps } from "./types";
export const SpectrumStain = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.58}>
      {[p.accent, p.secondary, p.light].map((color, index) => (
        <rect
          key={color}
          x={1110 + index * 210 - resolve * index * 96}
          y={190 + index * 130 - resolve * index * 52}
          width={480 - index * 60}
          height={650 - index * 40}
          fill="none"
          stroke={color}
          strokeWidth={18 - index * 3}
          transform={`rotate(${-8 + index * 7 - resolve * (-8 + index * 7)} ${1350 + index * 180} 520)`}
        />
      ))}
      <circle cx="1450" cy="520" r={42 + resolve * 52} fill={p.accent} />
    </g>
  );
};
