import type { EvolutionProps } from "./types";
export const MemoryControl = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.68}>
      <path
        d={`M1090 250 H${1390 + resolve * 240} V820 H1090`}
        fill="none"
        stroke={p.accent}
        strokeWidth="18"
      />
      <path
        d={`M1770 250 H${1470 - resolve * 120} V820 H1770`}
        fill="none"
        stroke={p.secondary}
        strokeWidth="18"
      />
      <rect
        x={1370 + resolve * 210}
        y="414"
        width="110"
        height="230"
        rx="18"
        fill={p.surface}
      />
    </g>
  );
};
