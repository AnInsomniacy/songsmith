import { C, type SceneProps, wave } from "../design";
import { World, Floor, Reeds } from "./shared";
export default function Wind(p: SceneProps) {
  const { id, t, q } = p;
  const d = wave(t, 8) * 35;
  return (
    <World p={p}>
      <Floor id={id} y={825} />
      <path d="M1160 80H1810V825H1160Z" fill="#A3C5C7" />
      <circle cx="1560" cy="310" r="93" fill={C.sun} />
      <path d="M1175 700Q1500 440 1795 650V810H1175Z" fill="#6F9997" />
      <path
        d="M1160 80H1810V825H1160ZM1485 80V825M1160 400H1810"
        fill="none"
        stroke={C.white}
        strokeWidth="16"
      />
      <path
        d={`M1150 70H1300Q${1290 + d} 360 ${1230 + d + q * 35} 810L1100 845Q${1210 + d} 400 1150 70Z`}
        fill={C.white}
        opacity=".8"
      />
      <path d="M1270 825L1050 1080H1710L1795 825Z" fill={C.sun} opacity=".28" />
      <Reeds x={1660} y={1000} t={t} color="#497C7A" scale={0.9} />
    </World>
  );
}
