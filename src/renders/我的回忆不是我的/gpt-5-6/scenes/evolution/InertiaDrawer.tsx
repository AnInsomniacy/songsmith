import type { EvolutionProps } from "./types";
export const InertiaDrawer = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g
      opacity={stage * 0.66}
      transform={`translate(${stage * 210} ${-stage * 18})`}
    >
      <rect
        x="1220"
        y="535"
        width={410 + resolve * 80}
        height="154"
        fill={p.light}
      />
      <path
        d={`M1260 575 H${1510 + resolve * 90} M1260 620 H${1450 + resolve * 130}`}
        stroke={p.accent}
        strokeWidth="14"
      />
      <rect
        x={1540 + resolve * 90}
        y="555"
        width="62"
        height="114"
        fill={p.secondary}
      />
    </g>
  );
};
