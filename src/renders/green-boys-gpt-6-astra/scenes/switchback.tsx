import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B2D2DB" id={id}>
      <A.Cloud x={1350 + 30 * w} y={90} s={1.5} />
      <path d="M780 1080L1290 290L1800 1080Z" fill="#8FB796" />
      <path
        d="M1280 1080Q1820 860 1460 690Q1110 520 1600 355"
        stroke={P.cloud}
        strokeWidth="50"
        fill="none"
      />
      <g transform={`translate(${180 * p} 0)`}>
        <path d="M1410 1060L1460 455L1690 280L1920 530V1080Z" fill={P.pine} />
        <path d="M1460 455L1690 280L1640 810Z" fill="#436E59" />
      </g>
      <path
        d="M1550 310Q1670 240 1830 320"
        stroke={P.sun}
        strokeWidth="30"
        opacity={p}
        fill="none"
      />
      <A.Sprig x={1130} y={1040} s={0.6} angle={w * 10} />
    </A.World>
  );
}
