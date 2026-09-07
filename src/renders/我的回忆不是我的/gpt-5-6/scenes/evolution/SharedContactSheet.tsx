import type { EvolutionProps } from "./types";
export const SharedContactSheet = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g
      opacity={stage * 0.66}
      transform={`translate(${stage * 120} ${-stage * 54})`}
    >
      <rect
        x="1320"
        y="345"
        width="230"
        height="230"
        fill="none"
        stroke={p.accent}
        strokeWidth="16"
      />
      <path
        d="M1280 315 H1360 M1280 315 V395 M1590 605 H1510 M1590 605 V525"
        fill="none"
        stroke={p.light}
        strokeWidth="10"
      />
      <rect
        x={1530 + resolve * 80}
        y="560"
        width="180"
        height="28"
        fill={p.secondary}
      />
    </g>
  );
};
