import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#B5D3B1" id={id}>
      <path
        d="M1130 1180V530C1130 85 1830 90 1830 530V1180"
        stroke={P.clay}
        strokeWidth="420"
        fill="none"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${980 + i * 100} 1130V530C${980 + i * 100} ${-80 + i * 125} ${1980 - i * 100} ${-80 + i * 125} ${1980 - i * 100} 530V1130`}
          stroke={P.cloud}
          strokeWidth="5"
          fill="none"
        />
      ))}
      <path
        d={`M1330 ${950 - 220 * p + 10 * w}H1660`}
        stroke={P.sun}
        strokeWidth="110"
        opacity=".6"
      />
      <path d="M1850 0L1240 1080H1400L1920 190Z" fill={P.pine} opacity=".18" />
    </A.World>
  );
}
