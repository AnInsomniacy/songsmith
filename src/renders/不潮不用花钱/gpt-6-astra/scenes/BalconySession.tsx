import React from "react";
import { C } from "../config";
import { turn, wave } from "../motion";
import {
  Backdrop,
  Materials,
  Plant,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
import { Cabinet } from "./geometry";
export const BalconySession: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#B2CDBE" bottom="#C9C6A3" />
      <Backdrop id={id} />
      <path
        d="M1002 167H1847V945H1002Z"
        fill="#A9977A"
        stroke="#7C806B"
        strokeWidth="8"
      />
      <path d="M1027 188H1821V817H1027Z" fill="#274F57" />
      <path d="M1043 206H1375V800H1043Z" fill="#6C9687" />
      <path d="M1406 206H1802V800H1406Z" fill="#44726E" />
      <path
        d={`M1043 206H1155Q${1107 + wave(t, 6) * 11} 482 1178 800H1043Z`}
        fill="#C5C7A1"
        opacity=".86"
      />
      <path
        d={`M1718 206H1802V800H1676Q${1737 + wave(t, 6, 1) * 9} 506 1718 206Z`}
        fill="#D6C0A2"
        opacity=".74"
      />
      <path d="M1391 189V807M1028 496H1818" stroke="#D4CCA9" strokeWidth="13" />
      <path d="M978 820H1874V864H978Z" fill={url(id, "wood")} />
      <path d="M1360 572V612M1649 572V612" stroke={C.ink} strokeWidth="14" />
      <rect
        x="1302"
        y="432"
        width="405"
        height="144"
        rx="16"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="5"
      />
      <rect x="1321" y="449" width="367" height="108" rx="8" fill={C.ink} />
      <rect x="1417" y="469" width="170" height="67" fill={C.paper} />
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          d={`M${1424 + i * 16} ${483 + (i % 3) * 10}v17`}
          stroke={C.ink}
          strokeWidth="4"
          opacity={0.45 + q * 0.25}
        />
      ))}
      {[1378, 1630].map((x, i) => (
        <g key={x} transform={`translate(${x} 503) rotate(${turn(t, 5 + i)})`}>
          <circle
            r="45"
            fill={url(id, "brass")}
            stroke="#8D6B44"
            strokeWidth="3"
          />
          {[0, 120, 240].map((a) => (
            <ellipse
              key={a}
              cy="-23"
              rx="10"
              ry="15"
              transform={`rotate(${a})`}
              fill={C.ink}
            />
          ))}
          <circle r="6" fill={C.paper} />
        </g>
      ))}
      <Cabinet id={id} x={1232} y={611} w={516} d={231} h={64} floor={900}>
        <rect x="13" y="14" width="490" height="203" rx="5" fill={C.red} />
        {Array.from({ length: 14 }, (_, i) => (
          <g key={i}>
            <rect
              x={28 + i * 33}
              y="55"
              width="32"
              height="143"
              rx="2"
              fill={C.paper}
              stroke="#949B83"
              strokeWidth="1.5"
            />
            <rect
              x={28 + i * 33}
              y="55"
              width="32"
              height="143"
              fill={C.green}
              opacity={q * Math.max(0, wave(t, 5, i)) * 0.09}
            />
          </g>
        ))}
        {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((i) => (
          <rect
            key={i}
            x={49 + i * 33}
            y="55"
            width="19"
            height="86"
            rx="2"
            fill={C.ink}
          />
        ))}
      </Cabinet>
      <path
        d="M933 934H1900M945 843V1030M1889 843V1030"
        fill="none"
        stroke={C.ink}
        strokeWidth="13"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d={`M${967 + i * 81} 940V1068`}
          stroke="#617A70"
          strokeWidth="7"
        />
      ))}
      <Plant x={1765} y={842} s={0.53} t={t} />
      <path
        d="M1128 119Q1459 88 1788 119"
        stroke={C.ink}
        strokeWidth="3"
        fill="none"
      />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${1149 + i * 101} ${118 - Math.sin((i / 6) * Math.PI) * 19}v19`}
            stroke={C.ink}
            strokeWidth="2"
          />
          <circle
            cx={1149 + i * 101}
            cy={145 - Math.sin((i / 6) * Math.PI) * 19}
            r="10"
            fill={C.yellow}
          />
        </g>
      ))}
      <Screw x={1391} y={496} r={7} />
      <path
        d="M72 109H872M65 976H903"
        stroke="#719487"
        opacity=".3"
        strokeWidth="3"
      />
    </>
  );
};
