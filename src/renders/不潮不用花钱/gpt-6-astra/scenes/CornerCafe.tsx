import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Floor,
  Materials,
  Plant,
  Screw,
  Tiles,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const CornerCafe: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#DADDC7" bottom="#C6D3C1" />
      <Backdrop id={id} />
      <Tiles x={0} y={708} w={1920} h={211} size={54} color="#739F91" />
      <Floor id={id} y={919} />
      <path
        d="M119 150Q403-67 699 150V642H119Z"
        fill="#779EA0"
        stroke={C.ink}
        strokeWidth="15"
      />
      <path d="M142 163Q403-31 676 163V619H142Z" fill="#ABD0C9" />
      <path
        d="M149 511L328 403L441 515L574 391L674 461V617H149Z"
        fill="#6E9A93"
      />
      <path d="M412 53V634M125 327H690" stroke="#E3DEBD" strokeWidth="12" />
      <path d="M138 227L631 82L646 143L139 305Z" fill={C.paper} opacity=".2" />
      <g transform="translate(223 831)">
        <path
          d="M0-118Q1-212 92-208H168Q256-198 252-115L230 85H20Z"
          fill={url(id, "green")}
          stroke="#295953"
          strokeWidth="7"
        />
        <path
          d="M32-128Q22-171 71-174H186Q228-167 218-116L194 20H55Z"
          fill="#518C76"
          stroke="#9EBE96"
          strokeWidth="3"
        />
        <path
          d="M21 83L8 189M223 83L245 189"
          stroke={C.darkWood}
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path d="M51 34H196" stroke="#183F45" strokeWidth="9" />
      </g>
      <g transform="translate(435 763)">
        <ellipse cy="150" rx="179" ry="27" fill={C.deep} opacity=".15" />
        <path
          d="M-80 170L0 99L88 170M0 99V-7"
          fill="none"
          stroke={C.ink}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <ellipse
          rx="176"
          ry="47"
          fill={url(id, "wood")}
          stroke={C.darkWood}
          strokeWidth="5"
        />
        <ellipse cy="-9" rx="173" ry="37" fill="#DBB384" />
        <path
          d="M-123-22Q-42-42 124-20M-117-2Q15-21 135-3"
          stroke="#B48B5B"
          opacity=".6"
          strokeWidth="1.5"
        />
      </g>
      <g transform="translate(405 708)">
        <ellipse
          cy="25"
          rx="62"
          ry="14"
          fill={C.paper}
          stroke="#B5B49A"
          strokeWidth="3"
        />
        <path
          d="M-38-32H35V5Q0 42-34 5Z"
          fill={C.paper}
          stroke="#ABB3A0"
          strokeWidth="3"
        />
        <path
          d="M35-21Q79-27 63-1Q56 11 34 8"
          fill="none"
          stroke={C.paper}
          strokeWidth="12"
        />
        <ellipse cy="-31" rx="36" ry="8" fill="#785F47" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${-20 + i * 19} -47Q${-41 + i * 24 + wave(t, 5, i) * 6} -77 ${-16 + i * 19} -107Q${13 + i * 12} -126 ${-4 + i * 16} -151`}
            fill="none"
            stroke={C.paper}
            strokeWidth="3"
            opacity=".33"
          />
        ))}
      </g>
      <g transform="translate(574 719) rotate(7)">
        <path d="M-66-39H68V7H-66Z" fill={C.red} />
        <path
          d="M-58-30H56M-58-18H41M-58-6H8"
          stroke={C.paper}
          strokeWidth="3"
          opacity=".5"
        />
      </g>
      <Plant x={141} y={631} s={0.41} t={t} />
      <Screw x={412} y={327} r={8} />
      <path
        d="M696 54L959 54L445 1002L171 1002Z"
        fill={C.yellow}
        opacity={0.025 + 0.09 * q}
      />
      <path
        d="M840 120H1810M844 941H1745"
        stroke="#557E7D"
        opacity=".2"
        strokeWidth="3"
      />
    </>
  );
};
