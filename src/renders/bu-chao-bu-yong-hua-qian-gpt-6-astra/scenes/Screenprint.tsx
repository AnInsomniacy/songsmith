import React from "react";
import { Cabinet } from "./geometry";
import { C } from "../design";
import {
  Backdrop,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Screenprint: React.FC<SceneProps> = (p) => {
  const { id, q } = clock(p);
  const stroke = 432 + q * 934;
  return (
    <>
      <Materials id={id} top="#99B6A5" bottom="#D2C49F" />
      <Backdrop id={id} />
      <Cabinet id={id} x={506} y={166} w={1230} d={768} h={50} floor={993}>
        <g transform="translate(65 42)">
          <rect
            width="1087"
            height="672"
            fill="#DCB37A"
            stroke="#72533B"
            strokeWidth="15"
          />
          <rect
            x="37"
            y="35"
            width="1014"
            height="598"
            fill={C.paper}
            stroke="#B38C5D"
            strokeWidth="8"
          />
          <defs>
            <clipPath id={`${id}-ink-pass`}>
              <rect
                x="49"
                y="46"
                width={Math.max(0, stroke - 363)}
                height="576"
              />
            </clipPath>
          </defs>
          <g clipPath={url(id, "ink-pass")}>
            <rect x="108" y="91" width="879" height="477" fill="#A7C8B2" />
            <path
              d="M181 485V201H369V485M398 485V143H617V485M651 485V246H899V485"
              fill={C.green}
            />
            <path
              d="M157 203H394V223H157M375 143H643V168H375M624 246H924V267H624"
              fill={C.red}
            />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={219 + i * 220}
                  y={280 - (i % 2) * 83}
                  width="65"
                  height="94"
                  fill={C.yellow}
                />
                <path
                  d={`M${251 + i * 220} ${281 - (i % 2) * 83}v91`}
                  stroke={C.green}
                  strokeWidth="5"
                />
              </g>
            ))}
            <path d="M123 507H973" stroke={C.ink} strokeWidth="7" />
            <circle cx="830" cy="156" r="45" fill={C.yellow} />
          </g>
          {Array.from({ length: 32 }, (_, i) => (
            <path
              key={i}
              d={`M${48 + i * 31} 48V621`}
              stroke="#486760"
              opacity=".08"
              strokeWidth="1"
            />
          ))}
          <g transform={`translate(${stroke - 341} 0)`}>
            <path d="M-17 42H29V629H-17Z" fill={C.ink} />
            <path
              d="M-23 52H37V601H-23Z"
              fill={url(id, "wood")}
              stroke="#745839"
              strokeWidth="4"
            />
            <path d="M2 93V558" stroke="#E6BF87" strokeWidth="6" />
            <path
              d="M28 62Q51 181 30 299T29 593"
              stroke={C.green}
              strokeWidth="13"
              fill="none"
            />
          </g>
          <Screw x={21} y={22} />
          <Screw x={1066} y={646} />
        </g>
      </Cabinet>
      <path
        d="M1555 891H1854V913H1555M1580 913V1048M1827 913V1048"
        fill="none"
        stroke={C.darkWood}
        strokeWidth="16"
      />
      <g transform="translate(1710 807)">
        <path
          d="M-62-48H62V66Q0 105-62 66Z"
          fill={C.green}
          stroke={C.ink}
          strokeWidth="4"
        />
        <ellipse cy="-48" rx="62" ry="19" fill="#82AB94" />
        <ellipse cy="-50" rx="49" ry="12" fill={C.green} />
        <path d="M-44 5H44V45H-44Z" fill={C.paper} />
        <path d="M-29 16H28M-29 29H6" stroke={C.green} strokeWidth="4" />
      </g>
      <path d="M96 111H781" stroke="#E4DABD" opacity=".5" strokeWidth="4" />
    </>
  );
};
