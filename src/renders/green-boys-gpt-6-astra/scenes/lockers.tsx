import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#BCD4DA" id={id}>
      <path d="M0 880H1920V1080H0Z" fill="#91AFA9" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${1190 + i * 220} 140)`}>
          <path d="M0 0H200V740H0Z" fill={i === 1 ? P.pine : "#72949B"} />
          <path d="M20 15H175V715H20Z" fill={P.cloud} opacity=".1" />
          <path
            d="M45 55H150M45 80H150M45 105H150"
            stroke={P.cloud}
            strokeWidth="7"
          />
          <path d="M35 350V415" stroke={P.sun} strokeWidth="10" />
        </g>
      ))}
      <g
        transform={`translate(1412 152) skewY(${-7 * p}) scale(${1 - 0.88 * p} 1)`}
      >
        <path d="M0 0H190V715H0Z" fill={P.leaf} />
        <path d="M150 346V410" stroke={P.pine} strokeWidth="9" />
      </g>
      <g opacity={p}>
        <A.Shoe x={1510} y={754} s={0.45} />
      </g>
      <path
        d={`M1390 900L${990 + 30 * w} 1070H1490L1570 900Z`}
        fill={P.sun}
        opacity=".28"
      />
      <path d="M1120 60H1890" stroke={P.cloud} strokeWidth="15" />
    </A.World>
  );
}
