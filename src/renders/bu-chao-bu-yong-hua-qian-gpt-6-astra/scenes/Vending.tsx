import React from "react";
import { C, F, wave } from "../design";
import {
  Backdrop,
  Knob,
  Materials,
  Screw,
  Tiles,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Vending: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#A4C6BF" bottom="#D2D4BB" />
      <Backdrop id={id} />
      <Tiles x={38} y={54} w={1844} h={788} size={91} color="#8AADA0" />
      <path d="M68 914H1848" stroke="#D7D7BF" strokeWidth="13" />
      <path
        d="M114 525H674V827H114Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="5"
      />
      <rect
        x="138"
        y="178"
        width="492"
        height="396"
        rx="56"
        fill={url(id, "green")}
        stroke={C.ink}
        strokeWidth="9"
      />
      <rect
        x="168"
        y="216"
        width="426"
        height="220"
        rx="27"
        fill="#27434E"
        stroke="#A9BAA0"
        strokeWidth="5"
      />
      <Vinyl x={385} y={328} r={91} t={t} color={C.yellow} />
      <path
        d="M385 241L418 216H491"
        fill="none"
        stroke="#B5C5BC"
        strokeWidth="7"
      />
      <path d="M189 477H491" stroke={C.ink} strokeWidth="9" />
      <Knob id={id} x={543} y={488} r={26} angle={q * 43} />
      <path
        d="M681 149H1498Q1581 155 1581 228V739H681Z"
        fill={url(id, "red")}
        stroke="#753C3B"
        strokeWidth="9"
      />
      <path
        d="M722 192H1423V563H722Z"
        fill="#25424C"
        stroke="#A5B3A2"
        strokeWidth="6"
      />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g
              key={i}
              transform={`translate(${771 + i * 128} ${250 + row * 106})`}
            >
              <rect
                x="-28"
                y="-24"
                width="63"
                height="68"
                rx="8"
                fill={
                  [C.yellow, C.mist, C.coral, C.leaf, C.paper][(i + row) % 5]
                }
              />
              <path
                d="M-18-10H23M-18 25H18"
                stroke={C.ink}
                strokeWidth="3"
                opacity=".4"
              />
              <path
                d={`M-43 42Q-10 ${24 + wave(t, 6, i) * 2} 21 42T67 42`}
                fill="none"
                stroke={url(id, "metal-line")}
                strokeWidth="5"
              />
            </g>
          ))}
          <path
            d={`M733 ${315 + row * 106}H1409`}
            stroke="#839D94"
            strokeWidth="10"
          />
        </g>
      ))}
      <rect x="1450" y="218" width="87" height="105" rx="9" fill={C.ink} />
      <text
        x="1494"
        y="287"
        textAnchor="middle"
        fontFamily={F.en}
        fontSize="41"
        fill={C.yellow}
      >
        {q < 0.5 ? "02" : "00"}
      </text>
      <rect
        x="1474"
        y="364"
        width="34"
        height="88"
        rx="10"
        fill={url(id, "metal")}
      />
      <path d="M1489 379V429" stroke={C.ink} strokeWidth="5" />
      <path
        d="M775 616H1381L1409 703H748Z"
        fill="#203A43"
        stroke="#E09B6E"
        strokeWidth="7"
      />
      <g
        transform={`translate(${1651 - q * 107} ${355 + q * 219}) rotate(${q * 154})`}
      >
        <ellipse
          rx="40"
          ry="43"
          fill={url(id, "brass")}
          stroke="#987141"
          strokeWidth="4"
        />
        <circle r="29" fill="none" stroke="#F0D295" strokeWidth="2" />
        <path d="M-9-18H9M0-18V18M-9 18H9" stroke="#8D6538" strokeWidth="4" />
      </g>
      {[739, 1398].map((x) =>
        [209, 547].map((y) => <Screw key={`${x}-${y}`} x={x} y={y} />),
      )}
      <path d="M1647 654H1832V884H1647Z" fill={C.green} />
      <path d="M1634 654H1845V680H1634Z" fill="#517F66" />
      <path
        d="M1681 704V846M1719 704V846M1757 704V846M1795 704V846"
        stroke="#ACC2A1"
        opacity=".26"
        strokeWidth="4"
      />
    </>
  );
};
