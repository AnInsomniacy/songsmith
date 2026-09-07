import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import { Backdrop, Materials, clock, url, type SceneProps } from "./craft";
export const SkylineScene: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#16394E" bottom="#799389" />
      <Backdrop id={id} />
      <path
        d="M0 733V399H198V511H343V322H463V414H660V277H797V423H1016V305H1173V442H1338V226H1468V436H1631V351H1789V481H1920V733Z"
        fill="#3D6972"
      />
      <path
        d="M0 813V607H177V479H394V559H671V422H890V541H1151V417H1433V547H1626V416H1848V559H1920V813Z"
        fill="#527D79"
      />
      {Array.from({ length: 22 }, (_, i) => (
        <g key={i}>
          <rect
            x={44 + i * 84}
            y={521 + (i % 4) * 27}
            width="23"
            height="42"
            fill={i % 3 ? C.yellow : C.mist}
            opacity={0.26 + q * 0.25}
          />
          <rect
            x={44 + i * 84}
            y={603 + (i % 3) * 29}
            width="23"
            height="42"
            fill={C.mist}
            opacity=".32"
          />
        </g>
      ))}
      <g transform="translate(303 523)">
        <path
          d="M-149-41H155V309H-149Z"
          fill="#638B7F"
          stroke="#325765"
          strokeWidth="6"
        />
        <path
          d="M-162-39L2-158L169-39Z"
          fill={C.red}
          stroke="#784645"
          strokeWidth="6"
        />
        <path d="M-108-11H109V101H-108Z" fill="#375763" />
        <path
          d="M-92 7H-9V82H-92M10 7H94V82H10"
          fill={C.yellow}
          opacity=".55"
        />
        <path d="M-92 142H91V295H-92Z" fill="#2D505B" />
        <path
          d="M-49 150V294M-1 150V294M48 150V294"
          stroke="#7A9C87"
          strokeWidth="5"
        />
      </g>
      <g transform="translate(1435 386)">
        <path
          d="M-81 368V-47Q0-126 81-47V368Z"
          fill="#76987D"
          stroke="#41666B"
          strokeWidth="6"
        />
        <circle
          cy="-32"
          r="63"
          fill="#D3CB9F"
          stroke="#B29361"
          strokeWidth="7"
        />
        <circle cy="-32" r="52" fill={C.ink} />
        <path
          d="M0-32V-67M0-32L26-21"
          stroke={C.paper}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {[0, 90, 180, 270].map((a) => (
          <path
            key={a}
            d="M0-73V-66"
            stroke={C.yellow}
            strokeWidth="3"
            transform={`rotate(${a} 0 -32)`}
          />
        ))}
        <path d="M-53 57H53V183H-53Z" fill="#365B65" />
        <path
          d="M-28 67V170M0 67V170M28 67V170"
          stroke={C.yellow}
          opacity=".4"
          strokeWidth="11"
        />
      </g>
      <path
        d="M46 331Q809 128 1878 325"
        fill="none"
        stroke={C.ink}
        strokeWidth="4"
      />
      {Array.from({ length: 18 }, (_, i) => {
        const x = 86 + i * 103,
          y = 328 - Math.sin((i / 17) * Math.PI) * 97;
        return (
          <g key={i} transform={`rotate(${wave(t, 6, i * 0.3) * 2} ${x} ${y})`}>
            <path d={`M${x} ${y}v37`} stroke={C.deep} strokeWidth="2.5" />
            <path
              d={`M${x - 23} ${y + 35}Q${x - 43} ${y + 68} ${x - 19} ${y + 95}H${x + 19}Q${x + 43} ${y + 68} ${x + 23} ${y + 35}Z`}
              fill={i % 3 === 0 ? C.coral : C.yellow}
            />
            <path
              d={`M${x} ${y + 37}V${y + 93}`}
              stroke="#B28542"
              strokeWidth="2"
              opacity=".5"
            />
          </g>
        );
      })}
      <circle cx="1112" cy="182" r="53" fill={C.paper} opacity=".75" />
      <circle cx="1112" cy="182" r="110" fill={url(id, "bulb")} opacity=".13" />
      {[
        [129, 111],
        [471, 181],
        [737, 99],
        [1664, 127],
        [1842, 181],
        [875, 191],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x - 4} ${y}h8m-4-4v8`}
          stroke={C.paper}
          opacity=".5"
          strokeWidth="1.4"
        />
      ))}
    </>
  );
};
