import React from "react";
import { C, wave } from "../design";
import {
  Backdrop,
  Books,
  Floor,
  Materials,
  Plant,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const SofaSnacks: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#678E8E" bottom="#B9BA9D" />
      <Backdrop id={id} />
      <path
        d="M58 75H1862V798H58Z"
        fill="none"
        stroke="#CFD8C4"
        opacity=".35"
        strokeWidth="5"
      />
      <path
        d="M87 109H1834V744H87Z"
        fill="none"
        stroke="#294B59"
        opacity=".24"
        strokeWidth="3"
      />
      <path
        d="M1421 121H1807V603H1421Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="7"
      />
      <rect x="1445" y="145" width="338" height="432" fill="#1B3E4F" />
      <path
        d="M1454 145L1454 577M1535 145V577M1620 145V577M1710 145V577M1445 362H1783"
        stroke="#709193"
        strokeWidth="4"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={1466 + i * 85}
          y="379"
          width="54"
          height="164"
          fill={[C.red, C.mist, C.green, C.coral][i]}
          transform={`rotate(${i % 2 ? 3 : -2} ${1490 + i * 85} 530)`}
        />
      ))}
      <Vinyl x={1616} y={252} r={85} t={t * 0.3} color={C.yellow} />
      <Floor id={id} y={842} dark />
      <ellipse cx="990" cy="983" rx="720" ry="57" fill={C.deep} opacity=".2" />
      <path
        d="M370 787Q347 649 451 625L1416 625Q1526 638 1492 787V918H370Z"
        fill={url(id, "green")}
        stroke="#204E51"
        strokeWidth="6"
      />
      <rect
        x="476"
        y="657"
        width="414"
        height="163"
        rx="44"
        fill="#548F7C"
        stroke="#2A6A62"
        strokeWidth="4"
      />
      <rect
        x="916"
        y="657"
        width="410"
        height="163"
        rx="44"
        fill="#4F8B76"
        stroke="#2A6A62"
        strokeWidth="4"
      />
      <path
        d="M503 677H862Q873 740 862 800H503M941 677H1300Q1315 740 1300 800H941"
        fill="none"
        stroke="#A6BB96"
        opacity=".4"
        strokeWidth="2"
      />
      <rect
        x="429"
        y="803"
        width="514"
        height="98"
        rx="25"
        fill={url(id, "fabric")}
        stroke="#225B55"
        strokeWidth="4"
      />
      <rect
        x="957"
        y="803"
        width="493"
        height="98"
        rx="25"
        fill={url(id, "fabric")}
        stroke="#225B55"
        strokeWidth="4"
      />
      <path
        d="M340 761Q332 729 371 724H448Q474 730 468 771L445 927H356Z"
        fill={url(id, "green")}
        stroke="#225554"
        strokeWidth="5"
      />
      <path
        d="M1357 769Q1344 730 1387 724H1467Q1502 737 1491 774L1485 927H1375Z"
        fill={url(id, "green")}
        stroke="#225554"
        strokeWidth="5"
      />
      <path
        d="M371 927L354 988H381L407 927M1428 927L1453 988H1477L1460 927"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="3"
      />
      <path
        d="M374 743H442M1386 743H1457M465 907H1361"
        stroke="#9CC1A2"
        opacity=".4"
        strokeWidth="3"
      />
      <g transform={`translate(721 742) rotate(${wave(t, 4.8) * 1.7} 0 65)`}>
        <path
          d="M-14 48l-7 31m37-31 10 31m-51 0h20m25 0h20"
          stroke="#B67B46"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M-54 24Q-93 8-74-26L-31-9Z" fill="#D79648" />
        <ellipse
          cy="10"
          rx="61"
          ry="54"
          fill={C.yellow}
          stroke="#C09047"
          strokeWidth="3"
        />
        <path
          d="M-40 8Q-15-13 7 8Q-2 44-29 30"
          fill="#E0A646"
          stroke="#CD913F"
          strokeWidth="2"
        />
        <g transform={`rotate(${wave(t, 3.2) * 6} 18 -28)`}>
          <path
            d="M2-46Q-12-86 23-110Q66-123 88-88Q109-42 65-19L15-15Z"
            fill="#F3CE69"
            stroke="#D29D49"
            strokeWidth="3"
          />
          <circle cx="61" cy="-75" r="5" fill={C.ink} />
          <circle cx="62" cy="-76" r="1.5" fill={C.paper} />
          <path d="M89-63l25 11-24 12Z" fill={C.coral} />
          <path d="M9-104Q-2-132 18-124Q22-145 36-125" fill={C.red} />
        </g>
      </g>
      <g transform="translate(863 758) rotate(8)">
        <path
          d="M-48-78H55L66 52H-65Z"
          fill={C.coral}
          stroke={C.red}
          strokeWidth="4"
        />
        <path
          d="M-48-78l16 8 14-7 16 8 14-8 15 8 13-8 15 8V-66H-46Z"
          fill="#E4C896"
        />
        <path d="M-48 39H55" stroke="#E8A47B" strokeWidth="5" />
        <ellipse cy="-4" rx="33" ry="36" fill={C.yellow} />
        <path
          d="M-16-27Q10-14 19 16M-28-8Q-8 0 3 26"
          stroke="#C49B4A"
          strokeWidth="2.5"
          fill="none"
        />
      </g>
      <g transform={`translate(1152 739) rotate(${q * wave(t, 5) * 3} 0 60)`}>
        <ellipse cx="0" cy="88" rx="91" ry="15" fill={C.deep} opacity=".18" />
        <rect
          x="-49"
          y="21"
          width="35"
          height="59"
          rx="14"
          fill="#D88D77"
          stroke="#A96E68"
          strokeWidth="3"
        />
        <rect
          x="14"
          y="21"
          width="35"
          height="59"
          rx="14"
          fill="#D88D77"
          stroke="#A96E68"
          strokeWidth="3"
        />
        <rect
          x="-56"
          y="-65"
          width="112"
          height="113"
          rx="39"
          fill="#DE9F86"
          stroke="#B3766C"
          strokeWidth="4"
        />
        <circle
          cx="-48"
          cy="-127"
          r="30"
          fill="#D8937D"
          stroke="#AE7066"
          strokeWidth="3"
        />
        <circle
          cx="48"
          cy="-127"
          r="30"
          fill="#D8937D"
          stroke="#AE7066"
          strokeWidth="3"
        />
        <rect
          x="-62"
          y="-148"
          width="124"
          height="104"
          rx="41"
          fill="#E4AC91"
          stroke="#B77D6B"
          strokeWidth="4"
        />
        <ellipse cy="-83" rx="26" ry="19" fill="#F2C2A2" />
        <circle cx="-26" cy="-105" r="5" fill={C.ink} />
        <circle cx="26" cy="-105" r="5" fill={C.ink} />
        <path d="M-7-88H7L0-81Z" fill={C.ink} />
        <g transform={`rotate(${-9 - q * wave(t, 3) * 19} -52 -30)`}>
          <rect
            x="-79"
            y="-53"
            width="31"
            height="78"
            rx="14"
            fill="#DFA189"
            stroke="#B67B6B"
            strokeWidth="3"
          />
          <circle cx="-61" cy="-35" r="7" fill="#EFC1A3" />
        </g>
        <rect
          x="49"
          y="-48"
          width="29"
          height="71"
          rx="13"
          fill="#DE9F86"
          stroke="#B3766C"
          strokeWidth="3"
        />
        <path d="M-23-18H23V11H-23Z" fill={C.green} />
        <circle cy="-4" r="8" fill={C.yellow} />
      </g>
      <Plant x={212} y={965} s={1.25} t={t} color="#386F62" />
      <Books x={1587} y={940} s={1.08} />
      <path
        d="M1746 806V514Q1746 454 1648 454"
        fill="none"
        stroke={C.ink}
        strokeWidth="5"
      />
      <path
        d="M1717 474h-146l38-83h71Z"
        fill={C.yellow}
        stroke={C.ink}
        strokeWidth="5"
      />
      <path
        d="M1723 951H1801M1759 951V806"
        fill="none"
        stroke={C.ink}
        strokeWidth="12"
        strokeLinecap="round"
      />
    </>
  );
};
