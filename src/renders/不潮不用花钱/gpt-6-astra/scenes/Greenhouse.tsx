import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Materials,
  Plant,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Greenhouse: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#D1DCC2" bottom="#B6BE91" />
      <Backdrop id={id} />
      <path
        d="M53 339L371 68L745 326V934H53Z"
        fill="#89AFA3"
        stroke="#52746C"
        strokeWidth="9"
      />
      <path d="M76 348L373 97L722 338V910H76Z" fill="#C3D8B8" />
      <path
        d="M53 339L371 68L745 326M371 80V916M76 545H722M76 734H722M219 226V916M548 201V916M64 354H736"
        stroke="#D4DCC2"
        fill="none"
        strokeWidth="9"
      />
      <path
        d="M109 345L381 120L447 169L219 361Z"
        fill={C.paper}
        opacity=".25"
      />
      <path
        d="M249 90L421 81L683 922H536Z"
        fill={C.yellow}
        opacity={0.025 + 0.11 * q}
      />
      <path
        d="M124 830H691V856H124M152 856V999M657 856V999"
        fill="none"
        stroke={C.darkWood}
        strokeWidth="21"
      />
      <Plant x={187} y={824} s={0.64} t={t} color="#618657" />
      <Plant x={593} y={824} s={0.73} t={t} color="#438775" />
      <g transform="translate(390 833)">
        <path
          d="M-76-94H76L60 0Q0 24-60 0Z"
          fill={C.coral}
          stroke="#976447"
          strokeWidth="4"
        />
        <ellipse cy="-94" rx="78" ry="16" fill="#D99D70" />
        <ellipse cy="-96" rx="65" ry="10" fill="#75563C" />
        <g transform={`rotate(${wave(t, 7) * 1.6} 0 -91)`}>
          <path
            d="M0-94Q-29-239 0-387M-5-220Q-87-263-94-323M-1-291Q81-299 107-366M-14-199Q16-198 43-180M-12-246L-24-258"
            stroke="#66764C"
            strokeWidth="10"
            fill="none"
          />
          {[
            [0, -382, 0],
            [-70, -288, -59],
            [64, -308, 42],
            [103, -352, 60],
            [-24, -258, -26],
            [43, -180, 68],
          ].map(([x, y, a], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
              <path
                d="M0 0Q-53-24-7-92Q43-60 0 0"
                fill={i % 2 ? "#4E895E" : "#65936C"}
              />
              <path
                d="M-2-8L-7-77"
                stroke="#ABC58C"
                strokeWidth="2"
                opacity=".65"
              />
            </g>
          ))}
          <path
            d={`M-63-284L${-68 + q * 8} ${-279 + q * 11}`}
            stroke="#66764C"
            strokeWidth="4"
            fill="none"
          />
          <g transform={`translate(${-72 + q * 8} ${-248 + q * 11})`}>
            <path
              d="M0-13C-27-32-56-11-44 18C-39 44-9 45 0 33C13 47 43 32 44 7C44-20 17-33 0-13Z"
              fill={url(id, "red")}
              stroke="#92523D"
              strokeWidth="3"
            />
            <path d="M0-14L4-31" stroke={C.darkWood} strokeWidth="4" />
            <path
              d="M-29-10Q-37 0-31 12"
              stroke="#EDAC7F"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
      <path d="M0 974H1920V1080H0Z" fill="#8E9B80" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${50 + i * 268} 993h211l36 61H${32 + i * 268}Z`}
          fill="#C2C8A7"
          stroke="#849579"
          strokeWidth="3"
        />
      ))}
      <g transform="translate(724 974)">
        <path
          d="M-72-91H46L63 0H-74Z"
          fill={url(id, "green")}
          stroke="#355F56"
          strokeWidth="4"
        />
        <path
          d="M46-64Q118-91 125-39L61-18"
          fill="none"
          stroke="#527C61"
          strokeWidth="11"
        />
        <path d="M-72-51L-146-91L-151-75L-67-10Z" fill={C.green} />
        <path d="M-158-107L-133-90L-155-62L-179-80Z" fill={url(id, "metal")} />
      </g>
      <Screw x={371} y={354} r={7} />
      <path
        d="M842 102H1817M859 965H1751"
        stroke="#648779"
        opacity=".25"
        strokeWidth="3"
      />
    </>
  );
};
