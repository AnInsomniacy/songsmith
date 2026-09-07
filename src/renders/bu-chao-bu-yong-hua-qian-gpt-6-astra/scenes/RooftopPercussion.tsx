import React from "react";
import { C, turn, wave } from "../design";
import {
  Backdrop,
  Materials,
  Skyline,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
import { Motor } from "./geometry";
export const RooftopPercussion: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#345568" bottom="#7D9080" />
      <Backdrop id={id} />
      <Skyline y={871} night t={t} />
      <path d="M0 946H1920V1080H0Z" fill="#5E7069" />
      <path
        d="M69 612H1850M84 610V947M1840 610V947"
        stroke={C.ink}
        strokeWidth="12"
        fill="none"
      />
      {Array.from({ length: 22 }, (_, i) => (
        <path
          key={i}
          d={`M${107 + i * 80} 624V947`}
          stroke="#A8BAA4"
          opacity=".34"
          strokeWidth="5"
        />
      ))}
      <ellipse
        cx="951"
        cy="1034"
        rx="682"
        ry="24"
        fill={C.deep}
        opacity=".19"
      />
      {[
        { x: 678, y: 802, r: 135, h: 179, c: "green" },
        { x: 1100, y: 851, r: 99, h: 129, c: "red" },
      ].map((b) => (
        <g key={b.x} transform={`translate(${b.x} ${b.y})`}>
          <path
            d={`M${-b.r} 0V${b.h}Q0 ${b.h + 48} ${b.r} ${b.h}V0Z`}
            fill={url(id, b.c)}
            stroke={C.ink}
            strokeWidth="4"
          />
          <ellipse
            rx={b.r}
            ry={b.r * 0.3}
            fill="#DACAA6"
            stroke={url(id, "metal-line")}
            strokeWidth="7"
          />
          <ellipse
            rx={b.r - 13}
            ry={b.r * 0.3 - 9}
            fill="#E1D1AE"
            stroke="#BAA17A"
            strokeWidth="2"
          />
          {[-0.85, -0.42, 0.42, 0.85].map((n) => (
            <path
              key={n}
              d={`M${n * b.r} ${b.r * 0.22}V${b.h + 10}`}
              stroke={url(id, "metal-line")}
              strokeWidth="6"
            />
          ))}
          <path
            d={`M${-b.r + 7} ${b.h - 13}Q0 ${b.h + 31} ${b.r - 7} ${b.h - 13}`}
            stroke="#9AA38A"
            fill="none"
            strokeWidth="6"
          />
        </g>
      ))}
      <path
        d="M394 997V648H1261V997"
        stroke={C.ink}
        strokeWidth="15"
        fill="none"
      />
      <path d="M411 661H1245" stroke={url(id, "metal-line")} strokeWidth="5" />
      {[
        { x: 620, len: 114, phase: 0 },
        { x: 1037, len: 159, phase: 1.4 },
      ].map((a) => (
        <g key={a.x}>
          <g
            transform={`rotate(${wave(t, 3.5, a.phase) * (7 + q * 2)} ${a.x} 650)`}
          >
            <path
              d={`M${a.x} 650l58 ${a.len}`}
              stroke="#BA9867"
              strokeWidth="11"
            />
            <ellipse
              cx={a.x + 58}
              cy={650 + a.len + 8}
              rx="25"
              ry="15"
              fill={C.paper}
            />
          </g>
          <Screw x={a.x} y={650} r={10} />
          <path
            d={`M${a.x} 612v28`}
            stroke={url(id, "metal-line")}
            strokeWidth="9"
          />
        </g>
      ))}
      <Motor id={id} x={1401} y={660} angle={turn(t, 3.5)} r={59} />
      <path d="M1340 660H1261" stroke={url(id, "metal-line")} strokeWidth="12" />
      <path d="M1401 747V984" stroke={C.ink} strokeWidth="13" />
      <path
        d="M1358 984H1441"
        stroke={C.ink}
        strokeWidth="15"
        strokeLinecap="round"
      />
      <g transform="translate(1611 850)">
        <path
          d="M0-41V149M0 118L-89 166M0 118L89 166"
          stroke={C.ink}
          strokeWidth="9"
          fill="none"
        />
        <g transform={`rotate(${wave(t, 6) * 1.7} 0 -39)`}>
          <path
            d="M-137-34Q-40-44-24-67Q0-89 24-67Q54-42 137-34Q0 9-137-34Z"
            fill={url(id, "brass")}
            stroke="#927342"
            strokeWidth="3"
          />
          <ellipse
            cy="-33"
            rx="111"
            ry="16"
            fill="none"
            stroke="#E4CA90"
            strokeWidth="2"
          />
        </g>
      </g>
    </>
  );
};
