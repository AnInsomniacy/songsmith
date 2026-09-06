import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B3D3D9" id={id}>
      <path d="M0 820H1920V1080H0Z" fill="#B2C39C" />
      <path
        d="M880 1080L1810 660M960 1080L1910 660"
        stroke={P.pine}
        strokeWidth="12"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${910 + i * 175} ${1060 - i * 80}l100 14`}
          stroke={P.pine}
          strokeWidth="12"
        />
      ))}
      <path d="M1400 970V360M1700 890V340" stroke={P.pine} strokeWidth="16" />
      <g transform={`rotate(${-80 * p} 1400 460)`}>
        <path d="M1390 448H1820V478H1390Z" fill={P.sun} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${1410 + i * 90} 448l30 30h30l-30-30Z`}
            fill={P.pine}
          />
        ))}
      </g>
      <A.Cloud x={1270 + 22 * w} y={190} s={1.4} />
    </A.World>
  );
}
