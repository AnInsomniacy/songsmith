import { P } from "../design";
import * as A from "./primitives";
export default function Scene({ t, phase, id }: A.SceneProps) {
  const p = phase;
  const w = A.wave(t);
  return (
    <A.World fill="#D1DED2" id={id}>
      <path d="M1000 955H1920V1080H1000Z" fill="#ADBEAB" />
      <path
        d="M1130 820H1830M1150 850V1040M1800 850V1040"
        stroke={P.pine}
        strokeWidth="26"
      />
      <path d="M1190 685H1800M1190 745H1800" stroke={P.clay} strokeWidth="36" />
      <path d="M1390 475L1550 430L1690 485L1650 820H1380Z" fill={P.leaf} />
      <path
        d={`M1400 495Q${1200 + 100 * p} ${555 + 12 * w} ${1290 + 180 * p} 745L${1390 + 130 * p} 720L1450 550Z`}
        fill="#4B7F5E"
      />
      <path
        d={`M1630 490Q${1820 - 90 * p} ${600 + 9 * w} ${1730 - 170 * p} 745L${1640 - 130 * p} 710L1570 540Z`}
        fill="#4B7F5E"
      />
      <path d="M1490 480L1550 480L1610 770L1530 800Z" fill={P.sun} />
      <path
        d="M1310 280Q1490 245 1740 280"
        stroke={P.cloud}
        strokeWidth="5"
        fill="none"
        opacity=".6"
      />
    </A.World>
  );
}
