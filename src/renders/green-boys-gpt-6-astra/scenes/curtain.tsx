import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#D7E5D8" id={id}>
      <path d="M1090 150H1840V1020H1090Z" fill={P.pine} />
      <path d="M1125 185H1805V985H1125Z" fill={P.sky} />
      <A.Cloud x={1250 + 25 * w} y={280} s={1.4} />
      <path
        d={`M1075 150H${1480 - 200 * p}Q${1330 - 170 * p + 18 * w} 530 ${1520 - 260 * p} 945L1090 1010Z`}
        fill={P.cloud}
      />
      <path
        d={`M1160 170Q${1280 - 100 * p + 14 * w} 580 1150 960`}
        stroke="#B1C9B5"
        strokeWidth="4"
        fill="none"
      />
      <path d="M1650 430V730" stroke={P.pine} strokeWidth="10" />
      <path
        d={`M1650 490l${-40 + 80 * p} ${20 - 40 * p}`}
        stroke={P.sun}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M1120 990L1700 830L1920 1080H880Z"
        fill={P.sun}
        opacity={p * 0.3}
      />
    </A.World>
  );
}
