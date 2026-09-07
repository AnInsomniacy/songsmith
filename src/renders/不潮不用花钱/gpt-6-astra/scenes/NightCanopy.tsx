import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Materials,
  Skyline,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const NightCanopy: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#203D52" bottom="#4F6A69" />
      <Backdrop id={id} />
      <Skyline y={765} night t={t} />
      <path
        d="M117 513Q985 85 1807 467"
        fill="none"
        stroke={C.ink}
        strokeWidth="13"
      />
      <path
        d="M116 515L442 213L1463 185L1806 464Q966 323 116 515Z"
        fill={C.green}
        stroke="#1E4D53"
        strokeWidth="7"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M${441 + i * 143} ${214 - i * 3.6}L${198 + i * 225} ${487 - (i % 3) * 19}L${309 + i * 207} ${474 - (i % 3) * 20}L${512 + i * 137} ${212 - i * 3.6}Z`}
          fill={i % 2 ? C.mist : C.yellow}
          opacity=".55"
        />
      ))}
      <path
        d={`M118 518Q901 ${326 + wave(t, 6) * 5} 1807 467V497Q899 ${360 + wave(t, 6) * 5} 118 550Z`}
        fill={C.green}
      />
      <path
        d="M114 513V1005M1808 467V1005"
        stroke={url(id, "metal-line")}
        strokeWidth="18"
      />
      <path
        d="M255 510Q989 485 1691 477"
        stroke={C.deep}
        strokeWidth="4"
        fill="none"
      />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${276 + i * 137} ${510 - i * 3}v37`}
            stroke={C.deep}
            strokeWidth="2"
          />
          <circle
            cx={276 + i * 137}
            cy={555 - i * 3}
            r="13"
            fill={i % 3 === 0 ? C.coral : C.yellow}
          />
          <circle
            cx={276 + i * 137}
            cy={555 - i * 3}
            r="40"
            fill={url(id, "bulb")}
            opacity={0.12 + q * 0.24}
          />
        </g>
      ))}
      <path
        d="M499 443L510 346L1408 324L1419 422Z"
        fill={C.paper}
        stroke="#B3B39A"
        strokeWidth="3"
      />
      <path
        d="M570 400L589 370L621 393L660 353L701 398M788 367H917M1011 373H1099M1175 365H1350"
        stroke={C.red}
        strokeWidth="8"
        fill="none"
        strokeLinejoin="round"
      />
      <g transform={`translate(${q * 33} 0)`}>
        <Vinyl x={1532} y={279} r={95} t={t * 0.25} color={C.coral} />
        <path d="M1518 274H1549V299H1518Z" fill={C.yellow} />
      </g>
      <path d="M193 989H1733" stroke="#AEC0A4" opacity=".35" strokeWidth="7" />
    </>
  );
};
