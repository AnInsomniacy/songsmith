import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Parquet, Tree, Book } from "./craft";
export default function Wind(p: SceneProps) {
  const { id, t, q } = p;
  const d = wave(t, 8) * 24;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={895} />
      <path d="M1133 60H1814V820H1133Z" fill="#809D9E" />
      <defs>
        <clipPath id={`${id}-garden`}>
          <rect x="1161" y="91" width="626" height="700" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-garden)`}>
        <rect x="1161" y="91" width="626" height="700" fill="#B9D5D1" />
        <circle cx="1530" cy="241" r="83" fill={C.sun} />
        <path d="M1161 539Q1420 437 1787 517V791H1161Z" fill="#86AAA2" />
        <path
          d="M1320 791Q1480 628 1720 555l26 12Q1540 660 1470 791Z"
          fill="#CECEC0"
        />
        <Tree x={1695} y={727} s={1.3} t={t} color="#678F84" />
        <Tree x={1230} y={722} s={0.85} t={t} color="#598783" />
        <path d="M1180 668h570m-570 14h570" stroke="#D6DBCA" strokeWidth="6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <path
            key={i}
            d={`M${1190 + i * 63} 654v112`}
            stroke="#D6DBCA"
            strokeWidth="8"
          />
        ))}
      </g>
      <path
        d="M1147 75H1801V807H1147ZM1475 75V807M1147 435H1801"
        fill="none"
        stroke="#E6E8D8"
        strokeWidth="17"
      />
      <path
        d="M1159 89H1462V422H1159ZM1490 89H1788V422H1490Z"
        fill="none"
        stroke="#9CB6AF"
        strokeWidth="3"
      />
      <path d="M1459 505h25v52h-25Z" fill={`url(#${id}-brass)`} />
      <path d="M1466 521h43" stroke="#7D8174" strokeWidth="7" />
      <path d="M1113 812H1836V852H1113Z" fill="#EDF0DC" />
      <path d="M1113 852h723l45 17h-719Z" fill="#AABBB1" />
      <path d="M1102 53h747" stroke={`url(#${id}-brass)`} strokeWidth="8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={1128 + i * 25}
          cy="60"
          r="9"
          fill="none"
          stroke={C.white}
          strokeWidth="3"
        />
      ))}
      <path
        d={`M1115 65H1243Q${1200 + d} 400 ${1230 + d + q * 24} 890L1060 933Q${1140 + d} 401 1115 65Z`}
        fill={C.white}
        opacity=".76"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${1131 + i * 25} 70Q${1110 + i * 29 + d} 410 ${1080 + i * 38 + d} 910`}
          stroke="#ADC4BF"
          opacity=".48"
          fill="none"
        />
      ))}
      <path d="M1300 870L1020 1080H1630L1780 870Z" fill={C.sun} opacity=".22" />
      <Book x={1480} y={813} w={115} color="#987F7B" />
      <path d="M1695 795h60l-10 68h-40Z" fill={`url(#${id}-ceramic)`} />
      <Tree x={1725} y={797} s={0.36} t={t} color="#467873" />
    </World>
  );
}
