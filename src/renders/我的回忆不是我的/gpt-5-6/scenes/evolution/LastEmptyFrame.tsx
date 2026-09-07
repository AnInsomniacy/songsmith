import type { EvolutionProps } from "./types";
export const LastEmptyFrame = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.66}>
      <rect
        x="1160"
        y="250"
        width="520"
        height="520"
        fill="none"
        stroke={p.light}
        strokeWidth={18 - resolve * 8}
      />
      <path
        d={`M1160 770 L${1370 + resolve * 270} ${520 - resolve * 150} L1680 770`}
        fill="none"
        stroke={p.accent}
        strokeWidth="16"
      />
      <rect
        x="1240"
        y={820 + resolve * 44}
        width={360 - resolve * 120}
        height="28"
        fill={p.secondary}
        opacity={0.8 - resolve * 0.3}
      />
    </g>
  );
};
