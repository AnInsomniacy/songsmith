import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C6DDD4" id={id}>
      <circle cx="1660" cy="270" r="120" fill={P.sun} />
      <path d="M0 1080Q1430 800 1920 980V1080Z" fill={P.leaf} />
      <path
        d={`M1550 1020Q1520 750 ${1550 + 25 * w} 480`}
        stroke={P.pine}
        strokeWidth="39"
        fill="none"
      />
      <g transform={`rotate(${6 * w} 1550 870)`}>
        <path
          d="M1560 790L1360 590M1540 660L1730 460"
          stroke={P.pine}
          strokeWidth="20"
        />
        <path
          d="M1230 550C1150 350 1420 210 1540 370C1690 160 1900 300 1860 510C1850 720 1670 770 1530 650C1380 800 1170 720 1230 550Z"
          fill="#56896A"
        />
        <A.Sprig x={1730} y={488} s={0.5 + 0.35 * p} angle={-20} fill={P.sun} />
      </g>
      <A.Cloud x={1120 + 18 * w} y={140} />
    </A.World>
  );
}
