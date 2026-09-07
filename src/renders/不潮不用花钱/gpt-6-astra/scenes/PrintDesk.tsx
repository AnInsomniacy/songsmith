import React from "react";
import { C } from "../config";
import { F } from "../typography";
import {
  Backdrop,
  Books,
  Knob,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const PrintDesk: React.FC<SceneProps> = (p) => {
  const { id, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#D5DACA" bottom="#BDAE8C" />
      <Backdrop id={id} />
      <rect
        x="979"
        y="126"
        width="827"
        height="495"
        fill="#678C83"
        stroke={C.darkWood}
        strokeWidth="14"
      />
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 12 }, (_, i) => (
          <g key={`${r}-${i}`}>
            <rect
              x={998 + i * 66}
              y={149 + r * 88}
              width="57"
              height="72"
              fill={url(id, "wood")}
              stroke="#D6B07C"
              strokeWidth="2"
            />
            <path
              d={`M${1013 + i * 66} ${168 + r * 88}v36h22v-36Z`}
              fill="none"
              stroke="#654C35"
              strokeWidth="4"
            />
          </g>
        )),
      )}
      <path
        d="M882 842H1920V893H882Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="5"
      />
      <path
        d="M945 893V1080M1859 893V1080"
        stroke={C.darkWood}
        strokeWidth="30"
      />
      <g transform="translate(1276 813)">
        <path
          d="M-160-21H342L353 30H-173Z"
          fill={C.ink}
          stroke="#3F5C61"
          strokeWidth="4"
        />
        <path
          d="M-111-28V-298Q-110-345-62-345H258Q305-343 308-298V-28"
          fill="none"
          stroke={C.ink}
          strokeWidth="26"
        />
        <path
          d="M-99-38V-295Q-99-332-59-332H257Q293-330 293-295V-38"
          fill="none"
          stroke="#7A998C"
          strokeWidth="5"
        />
        <path
          d="M95-337V-211"
          stroke={url(id, "metal-line")}
          strokeWidth="22"
        />
        <g transform={`translate(0 ${Math.sin(q * Math.PI) * 110})`}>
          <path
            d="M-50-235H255L263-205H-60Z"
            fill={url(id, "brass")}
            stroke={C.darkWood}
            strokeWidth="4"
          />
          <path d="M-24-203H235V-173H-24Z" fill={C.ink} />
        </g>
        <path d="M-39-66H272V-33H-39Z" fill={url(id, "metal")} />
        <g transform={`translate(${q * 92} ${q * 69}) rotate(${q * 4} 81 -52)`}>
          <rect
            x="-6"
            y="-83"
            width="230"
            height="155"
            fill={C.paper}
            stroke="#B9AD8A"
            strokeWidth="2"
          />
          <g opacity={Math.max(0, (q - 0.43) / 0.57)}>
            <rect
              x="13"
              y="-66"
              width="192"
              height="119"
              rx="8"
              fill="none"
              stroke={C.red}
              strokeWidth="4"
            />
            <path d="M30-34H185M30 7H185" stroke={C.green} strokeWidth="3" />
            <text
              x="109"
              y="-4"
              fontFamily={F.en}
              fontSize="29"
              textAnchor="middle"
              fill={C.red}
            >
              ADMIT ONE
            </text>
            <path d="M52 28h115" stroke={C.ink} strokeWidth="2" />
          </g>
        </g>
        <g transform={`rotate(${-q * 38} 94 -274)`}>
          <path
            d="M94-274L290-450"
            stroke={url(id, "metal-line")}
            strokeWidth="15"
          />
          <rect
            x="262"
            y="-491"
            width="63"
            height="98"
            rx="25"
            fill={C.red}
            transform="rotate(39 292 -442)"
          />
        </g>
        <Knob id={id} x={94} y={-274} r={23} />
      </g>
      <Books x={971} y={809} s={0.64} />
      <path d="M1781 771h64v65h-64Z" fill={C.green} />
      <ellipse cx="1813" cy="771" rx="33" ry="9" fill="#84AA8D" />
      <path
        d="M1804 770l-15-96M1823 770l24-121M1815 770l4-105"
        stroke={C.ink}
        strokeWidth="8"
      />
      <Screw x={991} y={138} />
      <Screw x={1795} y={138} />
      <path
        d="M61 107H813M60 969H810"
        stroke="#849D8A"
        opacity=".25"
        strokeWidth="3"
      />
    </>
  );
};
