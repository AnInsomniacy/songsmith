import type { EvolutionProps } from "./types";
export const FarewellListen = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.64}>
      {Array.from({ length: 4 }, (_, index) => (
        <path
          key={index}
          d={`M1120 ${440 + index * 74} C1320 ${330 + index * 76 - resolve * 18} 1580 ${520 + index * 38} 1840 ${390 + index * 64}`}
          fill="none"
          stroke={index === 1 ? p.accent : p.light}
          strokeWidth={index === 1 ? 18 : 8}
          strokeDasharray="1100"
          strokeDashoffset={(1 - stage) * 1100}
        />
      ))}
      <circle
        cx={1150 + resolve * 620}
        cy={585 - resolve * 108}
        r="24"
        fill={p.secondary}
      />
    </g>
  );
};
