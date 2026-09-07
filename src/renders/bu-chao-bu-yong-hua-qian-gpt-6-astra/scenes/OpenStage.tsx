import React from "react";
import { C, turn, wave } from "../design";
import {
  Backdrop,
  Materials,
  Speaker,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
import { Motor } from "./geometry";
export const OpenStage: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#AFCAC0" bottom="#D6CEAE" />
      <Backdrop id={id} />
      <path
        d="M995 879V233Q1413-10 1831 233V879Z"
        fill="#325F61"
        stroke={C.ink}
        strokeWidth="9"
      />
      <path d="M1024 861V252Q1413 34 1802 252V861Z" fill="#63917F" />
      <path
        d="M1038 277Q1413 83 1788 277"
        stroke="#ADC6A5"
        strokeWidth="4"
        fill="none"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M${1052 + i * 101} 289V835`}
          stroke="#86AB94"
          strokeWidth="2"
          opacity=".35"
        />
      ))}
      <path
        d="M944 889H1902V933H944Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="5"
      />
      <path d="M978 934H1868V976H962V952Z" fill="#9F956F" />
      <path d="M962 977H1880V1020H939V998Z" fill="#7D886E" />
      <path
        d="M1108 722H1642V773H1108Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="5"
      />
      <path
        d="M1137 773V888M1612 773V888M1137 836H1612"
        fill="none"
        stroke={C.ink}
        strokeWidth="13"
      />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <rect
            x={1121 + i * 46}
            y={653 + i * 3}
            width="40"
            height={87 - i * 3}
            rx="5"
            fill={[C.yellow, C.coral, C.mist][i % 3]}
            stroke="#D4B888"
            strokeWidth="2"
          />
          <Screw x={1141 + i * 46} y={673 + i * 3} r={3} />
          <path
            d={`M${1141 + i * 46} 751v${75 - i * 4}`}
            stroke={url(id, "metal-line")}
            strokeWidth="17"
          />
        </g>
      ))}
      <path
        d="M1084 638V417H1649V638"
        fill="none"
        stroke={C.ink}
        strokeWidth="14"
        strokeLinejoin="round"
      />
      <path
        d="M1093 624V425H1640V624"
        fill="none"
        stroke={url(id, "metal-line")}
        strokeWidth="5"
      />
      <path d="M1090 523H1645" stroke={url(id, "metal-line")} strokeWidth="13" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 1143 + i * 55;
        return (
          <g key={i}>
            <g
              transform={`rotate(${wave(t, 3.3, i * 0.7) * (7 + q * 3)} ${x} 523)`}
            >
              <path d={`M${x} 523v119`} stroke="#BA935E" strokeWidth="9" />
              <ellipse cx={x} cy="647" rx="14" ry="10" fill={C.paper} />
            </g>
            <Screw x={x} y={523} r={7} />
            <path d={`M${x} 460v55`} stroke="#688F85" strokeWidth="4" />
          </g>
        );
      })}
      <Motor id={id} x={1724} y={506} angle={turn(t, 3.3)} r={49} />
      <path
        d="M1664 506H1651V524"
        stroke={url(id, "metal-line")}
        strokeWidth="8"
        fill="none"
      />
      <Speaker id={id} x={1717} y={687} w={137} h={202} />
      <path
        d="M1724 581V657Q1669 708 1744 817"
        fill="none"
        stroke={C.deep}
        strokeWidth="4"
      />
      <path
        d="M70 112H856M76 974H853"
        stroke="#76988C"
        opacity=".27"
        strokeWidth="3"
      />
    </>
  );
};
