import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#A8C9D4" id={id}>
      <A.Cloud x={1330 + 35 * w - 140 * p} y={160} s={1.8} />
      <A.Cloud x={1650 + 18 * w + 120 * p} y={280} s={1.4} />
      <path d="M680 1080L1420 260L1990 1080Z" fill="#5E896F" />
      <path d="M1420 260L1380 690L1550 750L1690 1080H1920Z" fill={P.pine} />
      <path
        d="M1110 1080L1470 690L1390 635L1420 285"
        fill="none"
        stroke={P.cloud}
        strokeWidth="32"
      />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={1270 + i * 35}
          cy={965 - i * 90}
          r="12"
          fill={P.sun}
          opacity={A.ease(p * 2 - i * 0.2)}
        />
      ))}
      <A.Flag x={1420} y={132} t={t} fill={P.clay} scale={0.5} />
    </A.World>
  );
}
