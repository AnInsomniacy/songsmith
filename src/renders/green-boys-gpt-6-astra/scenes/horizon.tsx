import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B8DBDF" id={id}>
      <circle cx={1550} cy={310 - 45 * p} r={125} fill={P.sun} />
      <A.Cloud x={1210 + 28 * w} y={190} s={1.3} />
      <A.Cloud x={1660 + 15 * w} y={490} s={0.8} />
      <path
        d="M0 970Q900 930 1370 700Q1740 650 1920 700V1080H0Z"
        fill={P.leaf}
      />
      <path
        d="M1050 1080Q1550 880 1550 685Q1660 880 1680 1080Z"
        fill={P.cloud}
      />
      <path
        d="M1150 1080Q1550 900 1550 695"
        stroke={P.sun}
        strokeWidth="8"
        fill="none"
      />
      <g transform={`translate(1810 1030) scale(${0.8 + 0.25 * p})`}>
        <A.Sprig x={0} y={0} s={1.9} angle={6 * w} fill={P.pine} />
      </g>
      <A.Sprig x={1020} y={1080} s={0.7} angle={8 * w} />
    </A.World>
  );
}
