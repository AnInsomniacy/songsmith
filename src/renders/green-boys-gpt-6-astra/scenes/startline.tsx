import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill={P.sky} id={id}>
      <A.Cloud x={1250 + 20 * w} y={110} s={1.6} />
      <path d="M0 760Q980 650 1920 710V1080H0Z" fill={P.leaf} />
      <path d="M1260 360L550 1080H1920V360Z" fill={P.clay} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${1270 + i * 120} 360L${600 + i * 330} 1080`}
          stroke={P.cloud}
          strokeWidth="7"
          fill="none"
        />
      ))}
      <path d="M1150 520L1920 520" stroke={P.cloud} strokeWidth="45" />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={1290 + i * 155}
          cy={518}
          r={18}
          fill={P.sun}
          opacity={0.3 + 0.7 * A.ease(p * 2 - i * 0.25)}
        />
      ))}
      <A.Flag x={1720} y={125} t={t} fill={P.pine} scale={0.7} />
    </A.World>
  );
}
