import type { EvolutionProps } from "./types";
export const FragmentsVault = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.72}>
      {[
        [1190, 535, 1320, 535],
        [1610, 535, 1740, 535],
        [1465, 180, 1465, 320],
        [1465, 750, 1465, 890],
      ].map(([x1, y1, x2, y2], index) => (
        <line
          key={index}
          x1={x1 + (1 - stage) * (x1 < 1400 ? -110 : x1 > 1500 ? 110 : 0)}
          y1={y1 + (1 - stage) * (y1 < 500 ? -90 : y1 > 600 ? 90 : 0)}
          x2={x2}
          y2={y2}
          stroke={index % 2 ? p.accent : p.light}
          strokeWidth="20"
          strokeLinecap="square"
        />
      ))}
      <rect
        x={1330 - resolve * 24}
        y={400 - resolve * 18}
        width={270 + resolve * 48}
        height={270 + resolve * 36}
        fill="none"
        stroke={p.secondary}
        strokeWidth="8"
      />
    </g>
  );
};
