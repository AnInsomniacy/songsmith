import type { EvolutionProps } from "./types";
export const MemoryPeel = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.62}>
      <path
        d={`M1210 270 H${1660 + resolve * 120} V${760 - resolve * 80} L${1460 + resolve * 160} 910 H1210Z`}
        fill={p.light}
        opacity="0.32"
      />
      <path
        d={`M1460 910 Q${1540 + resolve * 130} ${760 - resolve * 60} ${1780 + resolve * 70} ${680 - resolve * 90}`}
        fill="none"
        stroke={p.accent}
        strokeWidth="20"
      />
      <rect
        x={1600 + resolve * 150}
        y={330 - resolve * 40}
        width="120"
        height="260"
        fill={p.secondary}
        opacity="0.72"
      />
    </g>
  );
};
