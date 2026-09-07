import React from "react";
import { Cabinet } from "./geometry";
import { C, wave, turn } from "../design";
import {
  Backdrop,
  Floor,
  Knob,
  Materials,
  Speaker,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const RecordingRoom: React.FC<SceneProps> = (p) => {
  const { id, t } = clock(p);
  return (
    <>
      <Materials id={id} top="#18394A" bottom="#35595B" />
      <Backdrop id={id} />
      <Floor id={id} y={790} dark />
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          x={798 + i * 47}
          y="85"
          width="29"
          height="645"
          rx="5"
          fill={i % 3 === 0 ? "#B58C59" : "#775E43"}
        />
      ))}
      <path d="M742 65H1920V99H742M742 737H1920V769H742" fill="#C5A477" />
      <rect
        x="890"
        y="177"
        width="691"
        height="416"
        rx="17"
        fill="#254651"
        stroke="#1B2F3B"
        strokeWidth="12"
      />
      <rect
        x="905"
        y="193"
        width="660"
        height="385"
        rx="7"
        fill={url(id, "metal")}
      />
      {[1085, 1413].map((x, i) => (
        <g key={i} transform={`translate(${x} 363) rotate(${turn(t, 5 + i)})`}>
          <circle r="136" fill="#587277" stroke="#CBD5C7" strokeWidth="7" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cy="-70"
              rx="28"
              ry="47"
              fill="#294753"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="22" fill={C.ink} />
          <circle r="7" fill={C.paper} />
          <path d="M0-19V19M-19 0H19" stroke="#9CB1AF" strokeWidth="3" />
        </g>
      ))}
      <path
        d="M1015 467L1184 528H1312L1478 469"
        fill="none"
        stroke="#514D42"
        strokeWidth="8"
      />
      <path d="M1170 519H1334V550H1170Z" fill={C.ink} />
      <rect x="914" y="548" width="107" height="17" rx="4" fill={C.red} />
      <Knob id={id} x={1510} y={533} r={22} angle={wave(t, 6) * 8} />
      <Cabinet id={id} x={997} y={723} w={784} d={396} h={42} floor={1048}>
        <rect
          x="15"
          y="15"
          width="754"
          height="366"
          rx="7"
          fill={url(id, "metal")}
          stroke={C.ink}
          strokeWidth="4"
        />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i} transform={`translate(${54 + i * 66} 86)`}>
            <path d="M0 46V265" stroke="#48636D" strokeWidth="2" />
            <path d="M0 60V246" stroke="#253F4C" strokeWidth="7" />
            <path
              d={`M-13 ${126 + wave(t, 9, i) * 3}h26v25h-26Z`}
              fill={i % 3 === 0 ? C.red : C.paper}
            />
            <circle cx="2" cy="2" r="13" fill={C.deep} />
          </g>
        ))}
      </Cabinet>
      <path
        d="M1661 796H1883V816H1661M1688 816V967M1852 816V967"
        stroke={C.darkWood}
        strokeWidth="12"
        fill="none"
      />
      <Speaker id={id} x={1670} y={464} w={198} h={331} />
      <g transform="translate(707 690)">
        <path
          d="M0 222V-258M-94 304L0 220L107 304"
          stroke={url(id, "metal-line")}
          strokeWidth="9"
          fill="none"
        />
        <rect
          x="-23"
          y="-348"
          width="46"
          height="111"
          rx="21"
          fill={url(id, "mesh")}
          stroke="#C6CEC1"
          strokeWidth="4"
        />
        <path
          d="M-30-308V-256Q0-220 30-256V-308"
          fill="none"
          stroke={C.ink}
          strokeWidth="5"
        />
        <path
          d="M21 62Q65-12 43-171"
          stroke={C.ink}
          strokeWidth="4"
          fill="none"
        />
        <ellipse
          cx="53"
          cy="-195"
          rx="43"
          ry="65"
          fill="#1F3440"
          fillOpacity=".4"
          stroke="#8EAEAA"
          strokeWidth="5"
        />
        <path
          d="M0 180Q-51 248 4 294T169 320"
          stroke={C.deep}
          strokeWidth="5"
          fill="none"
        />
      </g>
      <Screw x={931} y={219} />
      <Screw x={1543} y={219} />
      <Screw x={1543} y={561} />
      <path
        d="M79 82V969M96 83V968"
        stroke="#8BABA1"
        opacity=".15"
        strokeWidth="3"
      />
    </>
  );
};
