import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#ACD1DD" id={id}>
      <A.Cloud x={1240 + 40 * w} y={170} s={1.4} />
      <path d="M0 940Q1120 580 1920 660V1080H0Z" fill={P.leaf} />
      <path
        d="M700 1080Q1500 580 1830 650"
        stroke={P.cloud}
        strokeWidth="75"
        fill="none"
      />
      <path d="M1410 410V950" stroke={P.pine} strokeWidth="24" />
      <g transform={`rotate(${-8 + 8 * p} 1410 420)`}>
        <path d="M1250 350H1630L1730 417L1630 481H1250Z" fill={P.pine} />
        <path
          d="M1300 417H1650M1590 385L1650 417L1590 450"
          stroke={P.sun}
          strokeWidth="12"
          fill="none"
        />
      </g>
      <A.Sprig x={1400} y={1065} s={1.2} angle={w * 9} />
      <path
        d="M0 1030Q600 750 960 820"
        stroke="#68A1B0"
        strokeWidth="36"
        fill="none"
      />
    </A.World>
  );
}
