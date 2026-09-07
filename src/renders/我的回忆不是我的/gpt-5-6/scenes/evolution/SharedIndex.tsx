import type { EvolutionProps } from "./types";
export const SharedIndex = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.68} transform={`translate(${stage * 140} 0)`}>
      <path
        d="M1230 280 H1320 M1230 280 V370 M1720 800 H1630 M1720 800 V710"
        fill="none"
        stroke={p.light}
        strokeWidth="16"
      />
      <rect
        x={1320 + resolve * 150}
        y={330 - resolve * 30}
        width="300"
        height="360"
        fill="none"
        stroke={p.accent}
        strokeWidth="14"
      />
      <circle
        cx={1470 + resolve * 150}
        cy={510 - resolve * 30}
        r={60 + resolve * 26}
        fill={p.secondary}
      />
    </g>
  );
};
