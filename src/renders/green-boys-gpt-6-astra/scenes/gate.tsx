import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C6DBB2" id={id}>
      <path d="M1200 370L1850 370V1010H1200Z" fill={P.sky} />
      <A.Cloud x={1360 + 18 * w} y={405} s={1.1} />
      <path d="M1530 660L1160 1080H1920L1600 660Z" fill="#E2D5A5" />
      <path
        d="M1160 100V950M1850 100V950M1160 120H1850"
        stroke={P.pine}
        strokeWidth="34"
      />
      <g transform={`rotate(${-79 * p} 1200 560)`}>
        <path d="M1190 542H1835V581H1190Z" fill={P.cloud} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${1220 + i * 108} 542l31 39h40l-31-39Z`}
            fill={P.clay}
          />
        ))}
      </g>
      <path d="M1180 982L1820 790V1080H700Z" fill={P.sun} opacity={p * 0.3} />
      <A.Sprig x={1820} y={1070} s={0.9} angle={w * 7} />
    </A.World>
  );
}
