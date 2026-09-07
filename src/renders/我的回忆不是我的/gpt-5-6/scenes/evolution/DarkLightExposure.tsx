import type { EvolutionProps } from "./types";
export const DarkLightExposure = ({ p, stage, resolve }: EvolutionProps) => {
  return (
    <g opacity={stage * 0.48}>
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M${1210 + index * 42} ${520 + index * 44} C${1320 + index * 40} ${430 - resolve * 35} ${1550 + index * 28} ${440 + index * 20} ${1790 + resolve * 70} ${360 + index * 52}`}
          fill="none"
          stroke={index === 2 ? p.accent : p.light}
          strokeWidth={index === 2 ? 16 : 7}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
};
