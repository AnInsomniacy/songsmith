import type { EvolutionProps } from "./types";
export const MemoryTransfer = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.66}>
      <rect
        x={1100 + stage * 460}
        y={210 - resolve * 54}
        width="170"
        height="230"
        fill={p.light}
        stroke={p.accent}
        strokeWidth="14"
      />
      <path
        d={`M1185 ${440 - resolve * 54} V${650 - resolve * 80} H${1550 + resolve * 120}`}
        fill="none"
        stroke={p.secondary}
        strokeWidth="18"
        strokeDasharray="620"
        strokeDashoffset={(1 - stage) * 620}
      />
      <rect
        x={1580 + resolve * 110}
        y="650"
        width="190"
        height="34"
        fill={p.accent}
      />
    </g>
  );
};
