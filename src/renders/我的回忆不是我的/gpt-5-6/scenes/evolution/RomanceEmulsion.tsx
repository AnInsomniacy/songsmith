import type { EvolutionProps } from "./types";
export const RomanceEmulsion = ({ p, stage, resolve, t }: EvolutionProps) => {
  const breathe = Math.sin((t / 8.6) * Math.PI * 2) * 8;
  return (
    <g opacity={stage * 0.54}>
      <path
        d={`M1010 ${220 + breathe} C1240 ${390 - resolve * 90} 1550 ${690 + resolve * 40} 1890 850`}
        fill="none"
        stroke={p.light}
        strokeWidth={18 + resolve * 12}
        strokeLinecap="round"
      />
      <ellipse
        cx="1460"
        cy="545"
        rx={190 - resolve * 42}
        ry={92 + resolve * 36}
        fill="none"
        stroke={p.accent}
        strokeWidth="12"
      />
    </g>
  );
};
