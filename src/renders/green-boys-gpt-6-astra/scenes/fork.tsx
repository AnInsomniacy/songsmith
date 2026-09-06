import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#C6DBB7" id={id}>
      <A.Cloud x={1130 + 23 * w} y={120} s={1.5} />
      <path d="M0 980Q1300 650 1920 740V1080H0Z" fill={P.leaf} />
      <path
        d="M1460 1080V790Q1420 650 1110 540M1460 810Q1700 690 1850 410"
        stroke={P.cloud}
        strokeWidth="82"
        fill="none"
      />
      <path
        d="M1460 1080V800Q1700 690 1850 410"
        stroke={P.sun}
        strokeWidth="24"
        fill="none"
        opacity={p}
      />
      <path d="M1510 620V890" stroke={P.pine} strokeWidth="14" />
      <path d="M1460 585H1690L1740 625L1690 665H1460Z" fill={P.pine} />
      <g opacity={p}>
        <A.Flag x={1820} y={230} t={t} scale={0.55} fill={P.clay} />
      </g>
      <A.Sprig x={1120} y={1040} s={1.1} angle={w * 7} />
    </A.World>
  );
}
