import React from "react";
import { Cabinet } from "./geometry";
import { C, F, smooth, wave } from "../design";
import {
  Backdrop,
  Books,
  Materials,
  Plant,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const AfterHours: React.FC<SceneProps> = (p) => {
  const { id, t } = clock(p),
    end = smooth((t - 3) / 8);
  return (
    <>
      <Materials id={id} top="#193D52" bottom="#57756F" />
      <Backdrop id={id} />
      <path
        d="M110 91H1821V825H110Z"
        fill="#587B73"
        stroke={C.deep}
        strokeWidth="17"
      />
      <rect x="131" y="112" width="1668" height="689" fill="#234B5F" />
      <path
        d="M142 730V439H369V540H553V371H754V612H934V463H1163V326H1321V500H1511V417H1788V730Z"
        fill="#4C797B"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <g key={i}>
          <rect
            x={172 + i * 125}
            y={501 - (i % 3) * 42}
            width="31"
            height="57"
            fill={C.yellow}
            opacity={0.22 + 0.14 * (1 - end)}
          />
          <rect
            x={172 + i * 125}
            y={625 - (i % 3) * 24}
            width="31"
            height="57"
            fill={C.mist}
            opacity=".23"
          />
        </g>
      ))}
      <g opacity=".63">
        <path
          d="M934 463H1162V476H934M1164 326H1321V340H1164M1322 500H1509V514H1322M1511 417H1788V431H1511"
          fill="#779989"
        />
        {[
          { x: 959, y: 526, w: 156 },
          { x: 1179, y: 396, w: 113 },
          { x: 1359, y: 561, w: 123 },
          { x: 1558, y: 494, w: 185 },
        ].map(({ x, y, w }, i) => (
          <g key={i}>
            <path
              d={`M${x} ${y}h${w}v114H${x}Z`}
              fill="#2C5563"
              stroke="#7A9A87"
              strokeWidth="3"
            />
            <path
              d={`M${x + 8} ${y + 10}h${w - 16}v94H${x + 8}Z`}
              fill={C.yellow}
              opacity={0.15 + 0.12 * (1 - end)}
            />
            <path
              d={`M${x + w / 2} ${y}v114M${x} ${y + 57}h${w}`}
              stroke="#769181"
              strokeWidth="3"
            />
            <path
              d={`M${x - 7} ${y + 114}h${w + 14}`}
              stroke="#94A58E"
              strokeWidth="5"
            />
          </g>
        ))}
        <path
          d="M1458 617H1757V637H1458M1491 636V696M1725 636V696"
          stroke="#203E4E"
          strokeWidth="7"
          fill="none"
        />
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={`M${1470 + i * 27} 621V679`}
            stroke="#8BA28B"
            strokeWidth="3"
          />
        ))}
        <path
          d="M1531 621L1467 681H1623L1718 730M1472 680H1613"
          fill="none"
          stroke="#739585"
          strokeWidth="4"
        />
        <path
          d="M1212 327V267M1186 282H1234M1598 417V367M1580 379H1622"
          stroke="#84A296"
          strokeWidth="3"
          fill="none"
        />
      </g>
      <path
        d="M730 103V811M1279 103V811M124 702H1804"
        stroke="#839C87"
        strokeWidth="13"
      />
      <path
        d="M148 132H473L147 700ZM931 127H1078L755 690H749V494Z"
        fill={C.paper}
        opacity=".045"
      />
      <path
        d="M93 820H1846V866H93Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="6"
      />
      <Cabinet id={id} x={1290} y={813} w={561} d={391} h={34} floor={1063}>
        <g transform="translate(29 9)">
          <rect
            width="487"
            height="370"
            rx="16"
            fill={C.green}
            stroke={C.ink}
            strokeWidth="7"
          />
          <Vinyl
            x={199}
            y={180}
            r={148}
            t={(1 - Math.exp(-t / 4)) * 3}
            color={C.coral}
          />
          <path
            d="M424 59L414 217L317 260"
            fill="none"
            stroke={url(id, "metal-line")}
            strokeWidth="8"
          />
          <rect
            x="289"
            y="249"
            width="35"
            height="20"
            fill={C.yellow}
            transform="rotate(-29 306 259)"
          />
          <circle cx="425" cy="59" r="23" fill={url(id, "metal")} />
        </g>
      </Cabinet>
      <Books x={852} y={826} s={0.72} />
      <Plant x={1115} y={824} s={0.56} t={t} />
      <g opacity={smooth(t / 1.1)}>
        <rect
          x="145"
          y="284"
          width="886"
          height="292"
          rx="12"
          fill={C.deep}
          opacity=".93"
        />
        <text
          x="181"
          y="441"
          fontFamily={F.cn}
          fontWeight="500"
          fontSize="132"
          fill={C.paper}
        >
          不潮不用花钱
        </text>
        <text
          x="191"
          y="526"
          fontFamily={F.translation}
          fontSize="43"
          fill={C.yellow}
        >
          林俊杰
        </text>
        <text
          x="430"
          y="526"
          fontFamily={F.info}
          fontSize="38"
          letterSpacing="5"
          fill={C.mist}
        >
          JJ LIN
        </text>
      </g>
      <path
        d={`M362 891Q604 ${924 + wave(t, 7) * 3} 915 885`}
        fill="none"
        stroke="#A1B49A"
        strokeWidth="3"
        opacity=".2"
      />
      <rect width="1920" height="1080" fill={C.deep} opacity={end * 0.11} />
    </>
  );
};
