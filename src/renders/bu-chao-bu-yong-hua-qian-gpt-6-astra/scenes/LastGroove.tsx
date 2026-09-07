import React from "react";
import { C, turn, wave } from "../design";
import {
  Backdrop,
  Floor,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const LastGroove: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#315665" bottom="#819381" />
      <Backdrop id={id} />
      <Floor id={id} y={931} dark />
      <path
        d="M1030 823L1718 725L1884 907L1154 1024Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="7"
      />
      <path
        d="M1154 1024V1080H1201V1018M1817 921V1080H1858V916"
        fill={C.darkWood}
      />
      <path
        d="M1101 804V319Q1448 71 1798 310V799"
        fill="none"
        stroke={C.darkWood}
        strokeWidth="33"
      />
      <path
        d="M1101 804V319Q1448 71 1798 310V799"
        fill="none"
        stroke="#CDAD78"
        strokeWidth="12"
      />
      <path d="M1117 343Q1447 111 1781 333V778H1117Z" fill="#48756C" />
      <path
        d="M1157 786L1722 754L1776 839L1191 886Z"
        fill={url(id, "brass")}
        stroke="#805C3C"
        strokeWidth="6"
      />
      <defs>
        <clipPath id={`${id}-drum`}>
          <rect x="1207" y="481" width="490" height="198" rx="25" />
        </clipPath>
        <pattern
          id={`${id}-pins`}
          width="69"
          height="35"
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${t * 22} 0)`}
        >
          <circle cx="18" cy="9" r="3" fill="#4D5847" />
          <circle cx="52" cy="29" r="3" fill="#4D5847" />
          <path d="M20 10h6M54 30h6" stroke="#EFD69B" strokeWidth="2" />
        </pattern>
      </defs>
      <rect
        x="1207"
        y="481"
        width="490"
        height="198"
        rx="25"
        fill={url(id, "brass")}
        stroke="#876A41"
        strokeWidth="5"
      />
      <g clipPath={url(id, "drum")}>
        <rect
          x="1198"
          y="481"
          width="510"
          height="198"
          fill={url(id, "pins")}
        />
        <path
          d="M1207 520H1700"
          stroke="#F6DBA2"
          strokeWidth="13"
          opacity=".3"
        />
      </g>
      <ellipse
        cx="1209"
        cy="580"
        rx="27"
        ry="99"
        fill="#B1894D"
        stroke="#705A3D"
        strokeWidth="4"
      />
      <ellipse
        cx="1698"
        cy="580"
        rx="26"
        ry="99"
        fill="#DAB877"
        stroke="#846640"
        strokeWidth="4"
      />
      {Array.from({ length: 13 }, (_, i) => (
        <path
          key={i}
          d={`M${1221 + i * 35} 678L${1210 + i * 37} ${790 + wave(t, 1.8, i * 0.4) * (2 + q)}`}
          stroke={url(id, "metal-line")}
          strokeWidth="17"
        />
      ))}
      <path d="M1187 807L1730 781" stroke={C.ink} strokeWidth="11" />
      <g transform={`translate(1746 700) rotate(${turn(t, 6)})`}>
        <circle
          r="76"
          fill={url(id, "brass")}
          stroke="#72583E"
          strokeWidth="6"
        />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cy="-43"
            rx="13"
            ry="23"
            fill="#54786A"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="18" fill={url(id, "metal")} />
      </g>
      <path
        d="M1746 699H1836V774H1883"
        fill="none"
        stroke={url(id, "metal-line")}
        strokeWidth="13"
        strokeLinejoin="round"
      />
      <rect x="1866" y="733" width="39" height="84" rx="18" fill={C.red} />
      <Screw x={1218} y={832} r={7} />
      <Screw x={1704} y={805} r={7} />
      <path
        d="M1197 377Q1431 251 1682 365"
        fill="none"
        stroke="#D6C394"
        opacity=".5"
        strokeWidth="3"
      />
      <path
        d="M1196 396Q1431 275 1682 385"
        fill="none"
        stroke="#D6C394"
        opacity=".24"
        strokeWidth="2"
      />
      <path
        d="M77 157H941M77 927H920"
        stroke="#D0CFAC"
        opacity=".2"
        strokeWidth="3"
      />
    </>
  );
};
