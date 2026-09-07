import type { EvolutionProps } from "./types";
export const DandelionReverse = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.56}>
      {Array.from({ length: 4 }, (_, index) => (
        <path
          key={index}
          d={`M1900 ${240 + index * 170} C1680 ${150 + index * 170} 1480 ${360 + index * 112} ${1190 - resolve * 80} ${250 + index * 138}`}
          fill="none"
          stroke={index === 1 ? p.accent : p.light}
          strokeWidth={index === 1 ? 15 : 7}
          strokeLinecap="round"
        />
      ))}
      <path
        d={`M1260 860 Q${1430 - resolve * 120} ${700 - resolve * 70} 1570 530`}
        fill="none"
        stroke={p.secondary}
        strokeWidth="18"
      />
    </g>
  );
};
