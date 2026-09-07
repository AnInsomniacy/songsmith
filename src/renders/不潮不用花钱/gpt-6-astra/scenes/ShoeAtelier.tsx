import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const ShoeAtelier: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#C0D6C6" bottom="#D9C298" />
      <Backdrop id={id} />
      <path
        d="M53 599H1868V1076H53Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="8"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M67 ${643 + i * 77}Q961 ${652 + i * 77} 1851 ${633 + i * 77}`}
          stroke={i % 2 ? "#E4BA82" : "#876040"}
          opacity=".4"
          strokeWidth="2"
          fill="none"
        />
      ))}
      <g transform="translate(935 789) rotate(-10)">
        <ellipse cy="146" rx="326" ry="41" fill={C.deep} opacity=".17" />
        <path
          d="M-221-162L-18-134L-25-56L54-29L152-12Q277 3 301 77V113H-260L-274 59L-235 13Z"
          fill={url(id, "red")}
          stroke="#913E37"
          strokeWidth="7"
        />
        <path
          d="M-214-136L-45-115L-39-62L73 9L36 89H-234L-244 27Z"
          fill={C.paper}
        />
        <path d="M-236 23L-137 78L-95 36L-157-48Z" fill={C.green} />
        <path
          d="M-257 101Q-27 142 301 78V134Q14 190-260 144Z"
          fill="#D5D7BC"
          stroke={C.ink}
          strokeWidth="5"
        />
        <path
          d="M-241 127Q-28 169 285 111"
          fill="none"
          stroke="#989B83"
          strokeWidth="3"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle
              cx={-64 + i * 32}
              cy={-85 + i * 25}
              r="8"
              fill={url(id, "metal")}
            />
            <path
              d={`M${-62 + i * 32} ${-82 + i * 25}l-73 17`}
              stroke={C.ink}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        ))}
        <path
          d="M122 22Q198 29 250 78M-221-123Q-147-85-112-23L-195 33"
          fill="none"
          stroke="#BBA988"
          strokeWidth="2"
          strokeDasharray="3 5"
        />
        <path
          d={`M59 24Q${165 + q * 150} ${-183 + wave(t, 6) * 4} 282 -107`}
          stroke={C.ink}
          strokeWidth="3"
          fill="none"
        />
      </g>
      <g transform="translate(442 796) rotate(8)">
        <ellipse cy="109" rx="90" ry="24" fill={C.deep} opacity=".2" />
        <path d="M-56-103H56V98H-56Z" fill={C.yellow} />
        <ellipse cy="-101" rx="64" ry="17" fill="#EDD295" />
        <ellipse cy="99" rx="65" ry="17" fill="#BD884B" />
        {Array.from({ length: 22 }, (_, i) => (
          <path
            key={i}
            d={`M-56 ${-88 + i * 8}Q0 ${-75 + i * 8} 56 ${-88 + i * 8}`}
            fill="none"
            stroke="#C09048"
            strokeWidth="1.3"
            opacity=".7"
          />
        ))}
        <path
          d="M57 33Q156 19 168 143T482 176"
          stroke="#E7C074"
          fill="none"
          strokeWidth="3"
        />
      </g>
      <g transform="translate(1527 839) rotate(26)">
        <path d="M0-127V130" stroke={url(id, "wood-line")} strokeWidth="29" />
        <path
          d="M-77-153H80V-99H-77Z"
          fill={url(id, "metal")}
          stroke={C.ink}
          strokeWidth="4"
        />
        <path d="M-64-142V-111M64-142V-111" stroke="#E3E5D1" strokeWidth="3" />
      </g>
      <path d="M1749 646L1847 982" stroke="#DBC392" strokeWidth="29" />
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${1740 + i * 6.8} ${663 + i * 23}l${i % 3 === 0 ? 23 : 12} -7`}
          stroke="#795B3D"
          strokeWidth="2"
        />
      ))}
      <Screw x={81} y={627} />
      <Screw x={1833} y={1044} />
    </>
  );
};
