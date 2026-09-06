import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B5D3DE" id={id}>
      <path d="M1170 80H1830V1010H1170Z" fill={P.cloud} />
      <path d="M1200 110H1800V980H1200Z" fill={P.sky} />
      <A.Cloud x={1360 + 25 * w} y={210} />
      <path d="M1200 690Q1510 510 1800 620V980H1200Z" fill={P.leaf} />
      <path d="M1560 620L1360 980H1730L1610 620Z" fill={P.sun} />
      <g
        transform={`translate(1200 110) skewY(${-12 * p}) scale(${1 - 0.92 * p} 1)`}
      >
        <path d="M0 0H540V870H0Z" fill={P.pine} />
        <path
          d="M65 70H465V780H65Z"
          stroke={P.leaf}
          strokeWidth="7"
          fill="none"
        />
        <circle cx="450" cy="470" r="17" fill={P.sun} />
      </g>
      <path
        d="M1200 995L870 1080H1860L1780 995Z"
        fill={P.sun}
        opacity={p * 0.4}
      />
    </A.World>
  );
}
