import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#A8CDD9" id={id}>
      <path d="M0 670Q900 550 1920 630V1080H0Z" fill="#5F9CAF" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M800 ${720 + i * 100}Q1100 ${630 + i * 100 + 25 * A.wave(t, 5, i)} 1440 ${730 + i * 100}T2000 ${700 + i * 100}`}
          stroke={P.cloud}
          strokeWidth="5"
          opacity=".45"
          fill="none"
        />
      ))}
      <path d="M1260 1080L1430 690L1590 710L1510 1080Z" fill={P.pine} />
      <path d="M1660 670L1690 260H1810L1840 690Z" fill={P.cloud} />
      <path d="M1680 420H1820V485H1680Z" fill={P.clay} />
      <path d="M1680 235H1820V300H1680Z" fill={P.pine} />
      <path d="M1660 235L1750 175L1840 235Z" fill={P.clay} />
      <path
        d={`M1750 270L${1120 - 120 * p} ${60 + 80 * w}L1040 ${660 + 40 * w}Z`}
        fill={P.sun}
        opacity={0.16 + 0.16 * p}
      />
    </A.World>
  );
}
