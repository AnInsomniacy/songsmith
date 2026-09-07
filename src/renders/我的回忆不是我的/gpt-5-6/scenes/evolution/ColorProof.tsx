import type { EvolutionProps } from "./types";
export const ColorProof = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.62}>
      {[p.accent, p.secondary, p.light].map((color, index) => (
        <circle
          key={color}
          cx={1450 + (1 - stage) * (index - 1) * 210}
          cy={520 + (1 - stage) * (index % 2 ? 150 : -120)}
          r={126 + resolve * 28}
          fill="none"
          stroke={color}
          strokeWidth={18 - index * 3}
        />
      ))}
      <circle cx="1450" cy="520" r={34 + resolve * 24} fill={p.accent} />
    </g>
  );
};
