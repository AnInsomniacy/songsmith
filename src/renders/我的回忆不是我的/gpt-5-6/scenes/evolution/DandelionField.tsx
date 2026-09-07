import type { EvolutionProps } from "./types";
export const DandelionField = ({ p, stage, resolve, t }: EvolutionProps) => {
  const breathe = Math.sin((t / 8.6) * Math.PI * 2) * 8;
  return (
    <g opacity={stage * 0.5}>
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M920 ${310 + index * 122} C1210 ${200 + index * 120 - breathe} 1530 ${390 + index * 86} ${1990 + resolve * 100} ${240 + index * 108}`}
          fill="none"
          stroke={index === 3 ? p.accent : p.light}
          strokeWidth={index === 3 ? 16 : 7}
          strokeLinecap="round"
        />
      ))}
      <path
        d={`M960 860 Q1300 ${680 - resolve * 80} 1910 ${770 - resolve * 60}`}
        fill="none"
        stroke={p.secondary}
        strokeWidth="20"
      />
    </g>
  );
};
