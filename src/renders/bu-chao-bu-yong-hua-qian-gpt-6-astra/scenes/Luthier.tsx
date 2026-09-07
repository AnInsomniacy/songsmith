import React from "react";
import { C, wave } from "../design";
import {
  Backdrop,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Luthier: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#D2DDD0" bottom="#B7956E" />
      <Backdrop id={id} />
      <path
        d="M69 591H1851V1038H69Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="6"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M81 ${633 + i * 61}Q544 ${624 + i * 63} 1014 ${633 + i * 61}T1840 ${633 + i * 61}`}
          fill="none"
          stroke={i % 2 ? "#E1B682" : "#825B40"}
          strokeWidth="2"
          opacity=".38"
        />
      ))}
      <g transform="translate(748 783) rotate(-17)">
        <ellipse
          cx="35"
          cy="73"
          rx="364"
          ry="109"
          fill={C.deep}
          opacity=".18"
        />
        <path
          d="M47-56C-2-160-119-191-175-94C-234-40-328-88-338 36C-362 210-112 237-62 94C-14 30 55 63 47-56Z"
          fill="#A5653C"
          stroke="#714A36"
          strokeWidth="7"
        />
        <path
          d="M36-52C-9-145-107-173-164-83C-229-31-315-74-325 40C-344 193-122 218-70 82C-21 23 43 53 36-52Z"
          fill="#D9AD6C"
          stroke="#EED29A"
          strokeWidth="5"
        />
        <path
          d="M-231 57Q-195 3-193-55M-159 176Q-137 117-107 89"
          stroke="#B88751"
          strokeWidth="2"
          opacity=".5"
          fill="none"
        />
        <circle
          cx="-112"
          cy="-9"
          r="58"
          fill="#533D30"
          stroke="#8B613B"
          strokeWidth="6"
        />
        <circle
          cx="-112"
          cy="-9"
          r="67"
          fill="none"
          stroke="#D2BD8F"
          strokeWidth="3"
        />
        <circle
          cx="-112"
          cy="-9"
          r="72"
          fill="none"
          stroke="#A27344"
          strokeWidth="2"
        />
        <path d="M-183 50Q-174 9-203-1L-238 63L-178 111Z" fill="#7D4933" />
        <path
          d="M-44-60L462-61L462-14L-49-13Z"
          fill="#574032"
          stroke="#322E28"
          strokeWidth="3"
        />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <path
            key={i}
            d={`M${-12 + i * 34} -59V-15`}
            stroke="#D2BC8E"
            strokeWidth="2.2"
          />
        ))}
        {[67, 169, 271, 373].map((x) => (
          <circle key={x} cx={x} cy="-37" r="4" fill="#D0C8A8" />
        ))}
        <path
          d="M457-61L571-78L585-49L575 1L457-15Z"
          fill={url(id, "wood")}
          stroke={C.darkWood}
          strokeWidth="4"
        />
        {[477, 514, 551].map((x) => (
          <g key={x}>
            <path
              d={`M${x} -66v-15M${x + 2} -5v17`}
              stroke="#ABC1B9"
              strokeWidth="4"
            />
            <ellipse cx={x} cy="-83" rx="12" ry="6" fill={url(id, "metal")} />
            <ellipse
              cx={x + 2}
              cy="15"
              rx="12"
              ry="6"
              fill={url(id, "metal")}
            />
          </g>
        ))}
        <rect x="-236" y="-42" width="23" height="63" rx="5" fill="#533D2F" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-222 ${-35 + i * 7}Q-113 ${-34 + i * 7 + q * wave(t, 0.45, i) * 1.3} 11 ${-35 + i * 7}L567 ${-52 + i * 7}`}
            stroke="#E9D7AF"
            opacity=".8"
            fill="none"
            strokeWidth={0.8 + i * 0.12}
          />
        ))}
      </g>
      <g transform="translate(1641 693) rotate(18)">
        <path d="M-17-102H17V114H-17Z" fill={C.green} />
        <path d="M-15-120H15V-92H-15Z" fill={url(id, "metal")} />
        <path d="M-17 115H17L0 143Z" fill="#E7C89B" />
        <path d="M-7 133H7L0 143Z" fill={C.ink} />
      </g>
      <path
        d="M1519 955Q1579 862 1660 946T1801 873"
        stroke="#E7D1A6"
        fill="none"
        strokeWidth="3"
      />
      <g transform="translate(207 701)">
        <rect width="151" height="61" rx="10" fill={C.ink} />
        <rect x="14" y="12" width="84" height="35" fill={C.mist} />
        <path
          d="M27 36l20-13 24 16 17-9"
          stroke={C.green}
          fill="none"
          strokeWidth="3"
        />
        <circle cx="123" cy="31" r="12" fill={C.red} />
      </g>
      <Screw x={92} y={616} />
      <Screw x={1827} y={1016} />
    </>
  );
};
