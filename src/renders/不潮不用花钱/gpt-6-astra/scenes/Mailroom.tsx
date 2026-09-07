import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import { F } from "../typography";
import {
  Backdrop,
  Floor,
  Materials,
  Plant,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Mailroom: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#547F7A" bottom="#849E87" />
      <Backdrop id={id} />
      <Floor id={id} y={932} dark />
      <path
        d="M1091 166H1837V929H1091Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="9"
      />
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 3 }, (_, i) => {
          const x = 1112 + i * 239,
            y = 189 + r * 177,
            special = i === 1 && r === 1;
          return (
            <g key={`${r}-${i}`}>
              <rect
                x={x}
                y={y}
                width="216"
                height="153"
                rx="7"
                fill="#193E47"
              />
              <g
                transform={
                  special
                    ? `translate(${x} ${y}) scale(${1 - q * 0.19} 1)`
                    : undefined
                }
              >
                <rect
                  x={special ? 0 : x}
                  y={special ? 0 : y}
                  width="216"
                  height="153"
                  rx="7"
                  fill={
                    special
                      ? C.coral
                      : ["#ABC1AD", "#9DB8A5", "#B5C7B1"][(i + r) % 3]
                  }
                  stroke="#597E71"
                  strokeWidth="3"
                />
                <path
                  d={`M${special ? 23 : x + 23} ${special ? 39 : y + 39}h170`}
                  stroke={C.ink}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <rect
                  x={special ? 66 : x + 66}
                  y={special ? 71 : y + 71}
                  width="87"
                  height="29"
                  rx="3"
                  fill="#D8D9BD"
                />
                <text
                  x={special ? 109 : x + 109}
                  y={special ? 92 : y + 92}
                  fontFamily={F.info}
                  textAnchor="middle"
                  fontSize="21"
                  fill={C.ink}
                >
                  {12 + r * 3 + i}
                </text>
                <circle
                  cx={special ? 109 : x + 109}
                  cy={special ? 127 : y + 127}
                  r="10"
                  fill={url(id, "metal")}
                />
              </g>
              <Screw x={x + 9} y={y + 12} r={3} />
            </g>
          );
        }),
      )}
      <g
        transform={`translate(${1340 - q * 117} ${482 + q * 109}) rotate(${-7 - q * 8})`}
      >
        <rect
          x="-8"
          y="-92"
          width="217"
          height="145"
          fill={C.paper}
          stroke="#B9AD8D"
          strokeWidth="3"
        />
        <path
          d="M-8-91L99-3L209-91M-8 52L64-28M208 51L136-29"
          fill="none"
          stroke="#C4BBA0"
          strokeWidth="2"
        />
        <rect x="165" y="-75" width="29" height="35" fill={C.green} />
        <path
          d="M178-72V-45M168-54H191"
          stroke={C.paper}
          opacity=".5"
          strokeWidth="2"
        />
      </g>
      <path d="M988 980H1900" stroke={C.deep} strokeWidth="6" opacity=".22" />
      <Plant x={1777} y={1002} s={0.76} t={t} />
      <g transform={`translate(949 286) rotate(${wave(t, 6) * 1.5} 0 -66)`}>
        <path d="M0-101V-56" stroke={C.ink} strokeWidth="3" />
        <rect
          x="-72"
          y="-51"
          width="143"
          height="79"
          rx="7"
          fill={C.yellow}
          stroke={C.ink}
          strokeWidth="3"
        />
        <path
          d="M-50-22H48M-50-7H30M-50 8H2"
          stroke={C.ink}
          opacity=".4"
          strokeWidth="3"
        />
      </g>
      <path
        d="M71 117H936M74 945H971"
        stroke="#D1D9BF"
        opacity=".17"
        strokeWidth="3"
      />
    </>
  );
};
