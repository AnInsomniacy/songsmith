import type { EvolutionProps } from "./types";
export const PatienceThread = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.7}>
      <path
        d="M1260 510 C1340 420 1450 620 1530 510 C1600 420 1710 590 1780 500"
        fill="none"
        stroke={p.accent}
        strokeWidth="22"
        strokeLinecap="round"
        strokeDasharray="980"
        strokeDashoffset={(1 - stage) * 980}
      />
      <circle
        cx={1510 + resolve * 35}
        cy={520 - resolve * 18}
        r={42 + resolve * 18}
        fill={p.surface}
        stroke={p.secondary}
        strokeWidth="12"
      />
    </g>
  );
};
