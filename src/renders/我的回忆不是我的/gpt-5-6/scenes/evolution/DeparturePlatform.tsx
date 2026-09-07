import type { EvolutionProps } from "./types";
export const DeparturePlatform = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.62}>
      {Array.from({ length: 6 }, (_, index) => (
        <rect
          key={index}
          x={1080 + index * 145 + resolve * index * 24}
          y="790"
          width={82 - index * 7}
          height="18"
          fill={index < 2 ? p.accent : p.light}
        />
      ))}
      <path
        d={`M1040 875 H${1510 + resolve * 400}`}
        stroke={p.secondary}
        strokeWidth="12"
        strokeDasharray="42 28"
      />
      <circle
        cx={1260 + stage * 510}
        cy="842"
        r={24 - resolve * 7}
        fill={p.accent}
      />
    </g>
  );
};
