import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C8C6AF" id={id}>
      <path d="M850 720Q1400 620 1920 760V1080H850Z" fill="#857F5F" />
      <ellipse cx="1500" cy="910" rx="350" ry="100" fill="#A3B6A4" />
      <A.Shoe x={1490} y={840} s={1.35} fill={P.sun} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx={1260 + i * 95}
          cy={940 + 18 * A.wave(t, 5, i)}
          rx={12 + i * 2}
          ry="7"
          fill={P.clay}
          opacity={0.6 - p * 0.3}
        />
      ))}
      <path
        d={`M1690 ${280 + 120 * w}q18 40 0 56q-18-16 0-56Z`}
        fill={P.cloud}
        opacity={p}
      />
      <A.Ripple x={1740} y={966} t={t} scale={0.7} />
      <path
        d="M1130 1060Q1430 1010 1830 1060"
        stroke={P.pine}
        strokeWidth="6"
        fill="none"
      />
    </A.World>
  );
}
