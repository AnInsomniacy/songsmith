import { C, type SceneProps, wave } from "../design";
import { World, Sea } from "./shared";
export default function Horizon(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <path
        d="M0 290Q500 125 970 325T1920 245V460H0Z"
        fill={C.violet}
        opacity=".55"
      />
      <path
        d={`M0 420Q600 ${300 + q * 60} 1050 418T1920 355V530H0Z`}
        fill="#426777"
      />
      <Sea id={id} t={t} y={450} />
      <path
        d={`M1000 410q${110 + wave(t, 12) * 10} -15 280 -6`}
        stroke={C.sun}
        strokeWidth="6"
      />
      <path
        d="M160 450V90H188V450M160 90L660 235V450H640V245L188 112"
        fill={C.night}
      />
    </World>
  );
}
