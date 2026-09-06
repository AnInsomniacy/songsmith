import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B8DAE5" id={id}>
      <A.Cloud x={1320 + 25 * w} y={560} s={1.6} />
      <path d="M0 1070Q1400 840 1920 980V1080H0Z" fill={P.leaf} />
      <path
        d={`M1290 1020Q${1400 + 20 * w} 740 ${1520 + 40 * w} ${400 - 100 * p}`}
        stroke={P.pine}
        strokeWidth="4"
        fill="none"
      />
      <g
        transform={`translate(${1520 + 40 * w} ${400 - 100 * p}) rotate(${10 * w})`}
      >
        <path d="M0-160L130 0L0 190L-120 0Z" fill={P.sun} />
        <path d="M0-160V190L-120 0Z" fill={P.clay} />
        <path d="M-120 0H130M0-160V190" stroke={P.cloud} strokeWidth="4" />
        <path
          d={`M0 190Q${60 + 20 * w} 220 5 280Q-55 330 15 360`}
          stroke={P.pine}
          strokeWidth="4"
          fill="none"
        />
      </g>
      <path d="M1280 930V1080" stroke={P.pine} strokeWidth="19" />
    </A.World>
  );
}
