import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C4D8AD" id={id}>
      <path d="M1100 0H1920V795H1100Z" fill={P.pine} />
      <path d="M1250 60H1820V795H1250Z" fill={P.sky} />
      <path d="M1450 730L1110 1080H1920L1660 730Z" fill={P.sun} opacity=".6" />
      <g transform={`translate(${12 * p} ${-5 * p})`}>
        <A.Shoe x={1480} y={890} s={1.25} />
        <path
          d={`M1460 850C${1300 + 120 * p} ${650 + 70 * p} ${1250 + 140 * p} ${670 + 60 * p} 1460 850C${1640 - 120 * p} ${640 + 80 * p} ${1700 - 110 * p} ${720 + 40 * p} 1460 850`}
          fill="none"
          stroke={P.clay}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>
      <path
        d={`M1280 350Q1500 ${310 + 12 * w} 1810 350`}
        stroke={P.cloud}
        opacity=".4"
        strokeWidth="3"
        fill="none"
      />
    </A.World>
  );
}
