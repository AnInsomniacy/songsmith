import type { EvolutionProps } from "./types";
export const TemperamentShutter = ({
  p,
  stage,
  resolve,
  t,
}: EvolutionProps) => {
  const breathe = Math.sin((t / 8.6) * Math.PI * 2) * 8;
  return (
    <g opacity={stage * 0.58}>
      {[-1, 0, 1].map((offset) => (
        <path
          key={offset}
          d={`M1030 ${520 + offset * 92} H${1760 - stage * 90}`}
          stroke={offset === 0 ? p.accent : p.light}
          strokeWidth={offset === 0 ? 18 : 8}
          strokeLinecap="round"
          transform={`translate(${stage * 72} ${resolve * offset * 18})`}
        />
      ))}
      <circle
        cx="1500"
        cy="520"
        r={118 + resolve * 76 + breathe}
        fill="none"
        stroke={p.secondary}
        strokeWidth="12"
      />
    </g>
  );
};
