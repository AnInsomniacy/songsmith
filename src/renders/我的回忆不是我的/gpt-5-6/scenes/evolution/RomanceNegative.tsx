import type { EvolutionProps } from "./types";
export const RomanceNegative = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.6}>
      <path
        d={`M1010 ${470 - resolve * 42} L1880 ${650 + resolve * 36}`}
        stroke={p.accent}
        strokeWidth="18"
      />
      {Array.from({ length: 9 }, (_, index) => (
        <rect
          key={index}
          x={1100 + index * 82}
          y={500 + index * 17 + resolve * 12}
          width="42"
          height="26"
          fill={index % 2 ? p.light : p.secondary}
          transform={`rotate(12 ${1120 + index * 82} ${513 + index * 17})`}
        />
      ))}
      <rect
        x="1380"
        y="500"
        width={120 + resolve * 100}
        height="84"
        fill={p.surface}
        opacity="0.76"
      />
    </g>
  );
};
