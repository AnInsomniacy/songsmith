import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B5CDCA" id={id}>
      <path d="M1080 500H1920V1080H1080Z" fill={P.leaf} />
      <path d="M1510 490L980 1080H1910L1660 490Z" fill={P.clay} />
      <path d="M1570 490L1360 1080" stroke={P.cloud} strokeWidth="6" />
      <g transform={`translate(${-260 * p} 0)`}>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${1130 + i * 90} 265V965`}
            stroke={P.pine}
            strokeWidth="19"
          />
        ))}
        <path
          d="M1110 420H1430M1110 760H1430"
          stroke={P.pine}
          strokeWidth="17"
        />
      </g>
      <g transform={`translate(${250 * p} 0)`}>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${1570 + i * 90} 265V965`}
            stroke={P.pine}
            strokeWidth="19"
          />
        ))}
        <path
          d="M1550 420H1870M1550 760H1870"
          stroke={P.pine}
          strokeWidth="17"
        />
      </g>
      <A.Cloud x={1280 + 24 * w} y={105} s={1.3} />
    </A.World>
  );
}
