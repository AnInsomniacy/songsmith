import React from "react";
import { C, F, wave } from "../design";
import {
  Backdrop,
  Materials,
  Skyline,
  Speaker,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const NightRecords: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#234456" bottom="#567571" />
      <Backdrop id={id} />
      <Skyline y={759} night t={t} />
      <path
        d="M998 254H1830V930H998Z"
        fill="#436D65"
        stroke={C.deep}
        strokeWidth="9"
      />
      <path d="M1024 280H1805V804H1024Z" fill="#192F42" />
      <path d="M984 824H1843V850H984" fill={url(id, "wood")} />
      <g transform={`translate(${q * 44} 0)`}>
        <path d="M1154 437L1423 387L1473 690L1200 741Z" fill={C.coral} />
        <Vinyl x={1512} y={534} r={152} t={t * 0.5} color={C.yellow} />
        <path d="M1232 519L1371 483L1403 629L1260 666Z" fill={C.paper} />
        <circle cx="1315" cy="574" r="42" fill={C.green} />
      </g>
      <path d="M1442 277V806M1026 768H1803" stroke="#6C958E" strokeWidth="9" />
      <rect
        x="1024"
        y="280"
        width="781"
        height="524"
        fill={url(id, "glass")}
        opacity=".3"
      />
      <Speaker id={id} x={1662} y={664} w={122} h={185} />
      <path
        d="M968 249L1303 169L1857 242V303L1303 227L968 308Z"
        fill={C.red}
        stroke="#723C3D"
        strokeWidth="5"
      />
      <path
        d="M1072 207Q1425 127 1820 209"
        fill="none"
        stroke={C.ink}
        strokeWidth="4"
      />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${1100 + i * 83} ${196 - Math.sin((i / 8) * Math.PI) * 33}v26`}
            stroke={C.deep}
            strokeWidth="2"
          />
          <circle
            cx={1100 + i * 83}
            cy={229 - Math.sin((i / 8) * Math.PI) * 33}
            r="10"
            fill={C.yellow}
          />
          <circle
            cx={1100 + i * 83}
            cy={230 - Math.sin((i / 8) * Math.PI) * 33}
            r="29"
            fill={url(id, "bulb")}
            opacity=".32"
          />
        </g>
      ))}
      <text
        x="1101"
        y="899"
        fontFamily={F.info}
        fontSize="30"
        letterSpacing="8"
        fill={C.mist}
      >
        RECORDS / LISTEN HERE
      </text>
      <path d="M0 951H1920V1080H0Z" fill="#3A5660" />
      <path d="M973 977L1843 969L1852 1017L961 1024Z" fill="#58766D" />
      <path
        d="M811 1012Q995 989 1260 1002T1764 1001"
        fill="none"
        stroke={C.yellow}
        opacity=".1"
        strokeWidth="20"
      />
      <path d="M885 0V161" stroke={C.deep} strokeWidth="5" />
      <g transform={`rotate(${wave(t, 7) * 2} 885 153)`}>
        <path
          d="M848 157H921L947 263Q884 289 822 263Z"
          fill={C.yellow}
          stroke="#BA9150"
          strokeWidth="4"
        />
        <path
          d="M852 160L845 267M886 158V276M918 159L927 268"
          stroke="#D69A48"
          strokeWidth="2"
        />
      </g>
    </>
  );
};
