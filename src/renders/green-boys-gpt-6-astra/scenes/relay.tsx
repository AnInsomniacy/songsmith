import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#D6C9A7" id={id}>
      <path d="M950 1080L1330 0H1920V1080Z" fill={P.clay} />
      <path
        d="M1170 1080L1530 0M1510 1080L1830 0"
        stroke={P.cloud}
        strokeWidth="7"
      />
      <path
        d="M1230 430H1920V515H1200Z"
        fill={P.sun}
        opacity={0.25 + 0.6 * p}
      />
      <g
        transform={`translate(${1390 + 180 * p} ${670 - 180 * p + 8 * w}) rotate(-28)`}
      >
        <rect x="-36" y="-220" width="72" height="410" rx="32" fill={P.sun} />
        <path d="M-30 70H30M-30 88H30" stroke={P.pine} strokeWidth="6" />
        <ellipse cy="-204" rx="27" ry="12" fill={P.cloud} />
      </g>
      <path d="M1000 1010L1880 1010" stroke={P.pine} strokeWidth="10" />
    </A.World>
  );
}
