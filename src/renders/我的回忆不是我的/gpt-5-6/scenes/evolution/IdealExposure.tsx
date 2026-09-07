import type { EvolutionProps } from "./types";
export const IdealExposure = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.62}>
      <line
        x1="1440"
        y1="120"
        x2="1440"
        y2="960"
        stroke={p.detail}
        strokeWidth={22 - resolve * 16}
        opacity={1 - resolve * 0.82}
      />
      <ellipse
        cx="1440"
        cy="640"
        rx={90 + resolve * 300}
        ry={60 + resolve * 118}
        fill="none"
        stroke={p.light}
        strokeWidth="20"
      />
      <circle cx="1440" cy="640" r={32 + resolve * 38} fill={p.accent} />
    </g>
  );
};
