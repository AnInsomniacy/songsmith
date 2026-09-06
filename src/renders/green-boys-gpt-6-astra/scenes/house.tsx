import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#D2E0BA" id={id}>
      <A.Cloud x={1370 + 30 * w} y={140} s={1.4} />
      <path d="M1190 990V490L1510 215L1840 490V990Z" fill={P.cloud} />
      <path
        d="M1190 490L1510 215L1840 490"
        stroke={P.pine}
        strokeWidth="28"
        fill="none"
      />
      <path d="M1190 490L1400 315" stroke={P.clay} strokeWidth="45" />
      <path
        d={`M${1510 + 100 * (1 - p)} ${215 - 100 * (1 - p)}L${1680 + 100 * (1 - p)} ${355 - 100 * (1 - p)}`}
        stroke={P.clay}
        strokeWidth="45"
        opacity={p}
      />
      <path d="M1540 990V660H1720V990" fill={P.pine} />
      <path d="M1280 590H1440V765H1280Z" fill={P.sky} />
      <path d="M1360 590V765M1280 677H1440" stroke={P.pine} strokeWidth="8" />
      <path d="M1440 370L1080 1080H1680L1620 370Z" fill={P.sun} opacity=".18" />
      <A.Sprig x={1830} y={1060} s={0.8} angle={7 * w} />
    </A.World>
  );
}
