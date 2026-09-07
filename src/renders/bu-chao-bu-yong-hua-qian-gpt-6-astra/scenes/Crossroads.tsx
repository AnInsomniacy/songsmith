import React from "react";
import { C, F } from "../design";
import {
  Backdrop,
  Materials,
  Skyline,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Crossroads: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#C7DEDA" bottom="#E3DDBF" />
      <Backdrop id={id} />
      <Skyline y={639} t={t} />
      <path d="M912 338L1541 223L1872 351V888H912Z" fill="#B8976E" />
      <path d="M912 338L1541 223V864L912 888Z" fill="#C7AA82" />
      <path
        d="M891 340L1541 199L1894 337V366L1537 249L891 381Z"
        fill={C.green}
      />
      {[
        [1030, 408],
        [1260, 358],
        [1648, 413],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 11} y={y - 12} width="165" height="216" fill="#A68968" />
          <rect x={x} y={y} width="140" height="184" fill="#385C67" />
          <path
            d={`M${x + 70} ${y}v184M${x} ${y + 92}h140`}
            stroke="#E9D0A8"
            strokeWidth="6"
          />
          <path
            d={`M${x + 11} ${y + 14}l48 0-48 68M${x + 90} ${y + 15}l36 0-36 56`}
            fill={C.mist}
            opacity=".24"
          />
        </g>
      ))}
      <path d="M0 884L1458 745L1920 876V1080H0Z" fill="#8E9A92" />
      <path d="M0 870L1457 731L1920 856V884L1457 759L0 904Z" fill="#C8CDB8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${989 + i * 144} ${882 + i * 8}l66 14-36 176-84-8Z`}
          fill="#E4E3C9"
          opacity=".78"
        />
      ))}
      <path d="M1363 208V863" stroke={url(id, "metal-line")} strokeWidth="18" />
      <path d="M1363 855l-52 19h101Z" fill={C.ink} />
      <g transform={`rotate(${-q * 6} 1363 316)`}>
        <path
          d="M1222 269H1552V363H1222L1157 316Z"
          fill={C.yellow}
          stroke={C.ink}
          strokeWidth="5"
        />
        <path
          d="M1490 316H1247m45-26-46 26 46 26"
          fill="none"
          stroke={C.ink}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(1374 436)">
        <path
          d="M-136-26H113V49H-136L-185 12Z"
          fill={C.green}
          stroke={C.ink}
          strokeWidth="4"
        />
        <text
          x="-109"
          y="25"
          fontFamily={F.info}
          fontSize="31"
          letterSpacing="3"
          fill={C.paper}
        >
          YOUR OWN WAY
        </text>
      </g>
      <ellipse
        cx="1670"
        cy="979"
        rx="172"
        ry="20"
        fill={C.deep}
        opacity=".17"
      />
      <g transform="translate(1531 882)">
        <path
          d="M44-49Q110-25 160-40L199 12Q251 22 275 53L274 80H-18Q-47 52-8 25L38-6Z"
          fill={url(id, "red")}
          stroke="#883C3B"
          strokeWidth="5"
        />
        <path d="M36-4Q84 18 139 19L178 54H3Z" fill={C.paper} />
        <path
          d="M-24 57Q121 69 275 52L274 86Q120 101-25 87Z"
          fill="#D8D7C0"
          stroke={C.ink}
          strokeWidth="4"
        />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${54 + i * 19} ${3 + i * 6}l39-9`}
            stroke={C.ink}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        <path
          d="M4 80H253M195 30Q228 35 237 53"
          stroke="#A89678"
          strokeWidth="2"
          fill="none"
        />
      </g>
      <path
        d="M58 52H704M58 69H507"
        stroke="#739FA4"
        opacity=".22"
        strokeWidth="2"
      />
    </>
  );
};
