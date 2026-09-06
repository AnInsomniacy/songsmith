import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#9FC5BB" id={id}>
      <path d="M0 780Q1320 450 1920 550V1080H0Z" fill="#6E9C77" />
      <path
        d="M1300 1080L1530 500L1680 500L1740 1080Z"
        fill={P.sun}
        opacity=".5"
      />
      <g transform={`translate(${-110 * p + 12 * w} 0)`}>
        <path d="M960 1080L1180 0H1300L1110 1080Z" fill={P.pine} />
        <path
          d="M1100 490Q940 150 1250 130Q1430 140 1350 370Z"
          fill="#4C805F"
        />
      </g>
      <g transform={`translate(${110 * p + 8 * w} 0)`}>
        <path d="M1880 1080L1740 0H1820L1980 1080Z" fill={P.pine} />
        <path d="M1700 440Q1430 130 1740 70Q1920 90 1980 380Z" fill="#4C805F" />
      </g>
      <A.Cloud x={1470 + 20 * w} y={220} s={0.7} />
      <A.Sprig x={1650} y={1030} s={0.9} angle={w * 6} />
    </A.World>
  );
}
