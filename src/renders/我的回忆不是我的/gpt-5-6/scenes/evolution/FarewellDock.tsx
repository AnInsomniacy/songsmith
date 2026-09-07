import type { EvolutionProps } from "./types";
export const FarewellDock = ({ p, stage, resolve, t }: EvolutionProps) => {
  const breathe = Math.sin((t / 8.6) * Math.PI * 2) * 8;
  return (
    <g opacity={stage * 0.64}>
      <path
        d={`M1050 650 C1160 ${560 - resolve * 90} 1330 ${720 + breathe} ${1510 + resolve * 260} ${500 - resolve * 120}`}
        fill="none"
        stroke={p.accent}
        strokeWidth="24"
        strokeLinecap="round"
        strokeDasharray="980"
        strokeDashoffset={(1 - stage) * 980}
      />
      <circle
        cx={1510 + resolve * 260}
        cy={500 - resolve * 120}
        r={56 - resolve * 18}
        fill={p.surface}
        stroke={p.secondary}
        strokeWidth="12"
      />
    </g>
  );
};
