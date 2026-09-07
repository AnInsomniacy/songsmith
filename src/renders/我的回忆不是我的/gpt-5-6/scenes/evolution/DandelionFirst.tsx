import type { EvolutionProps } from "./types";
export const DandelionFirst = ({ p, stage, resolve, t }: EvolutionProps) => {
  const breathe = Math.sin((t / 8.6) * Math.PI * 2) * 8;
  return (
    <g opacity={stage * 0.52}>
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M1010 ${300 + index * 118} C1260 ${230 + index * 106 - breathe} 1580 ${340 + index * 82} ${1950 + resolve * 90} ${230 + index * 98}`}
          fill="none"
          stroke={index === 2 ? p.accent : p.light}
          strokeWidth={index === 2 ? 14 : 6}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
};
