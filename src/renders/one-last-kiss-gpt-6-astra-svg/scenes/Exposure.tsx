import { C, type SceneProps, wave } from "../design";
import { World, Floor } from "./shared";
export default function Exposure(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Floor id={id} y={860} />
      <path d="M1160 130H1770V770H1160Z" fill={C.sun} />
      <path d="M1190 160H1740V690H1190Z" fill={C.night} />
      <path d="M1190 520Q1420 330 1740 505V690H1190Z" fill={C.violet} />
      <circle cx="1480" cy="360" r={85 + q * 30} fill={C.coral} />
      <path
        d={`M1200 540Q1450 ${490 + wave(t, 12) * 12} 1730 555`}
        stroke={C.glass}
        fill="none"
        strokeWidth="3"
      />
      <rect
        x="1190"
        y="160"
        width="550"
        height="530"
        fill={C.sun}
        opacity={0.25 * (1 - q)}
      />
      <path d="M1200 780L1310 910H1880L1760 780Z" fill={C.coral} opacity=".1" />
    </World>
  );
}
