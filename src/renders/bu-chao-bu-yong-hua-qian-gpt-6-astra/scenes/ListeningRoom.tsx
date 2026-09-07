import React from "react";
import { Cabinet } from "./geometry";
import { C, wave } from "../design";
import {
  Backdrop,
  Floor,
  Knob,
  Materials,
  Speaker,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const ListeningRoom: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#376875" bottom="#71918D" />
      <Backdrop id={id} />
      <Floor id={id} y={790} dark />
      <rect
        x="73"
        y="103"
        width="1775"
        height="595"
        fill="#234651"
        stroke="#739B94"
        strokeWidth="7"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect
            x={101 + i * 290}
            y="126"
            width="262"
            height="550"
            fill={i % 2 ? "#527F7E" : "#6D9990"}
          />
          {Array.from({ length: 11 }, (_, j) => (
            <path
              key={j}
              d={`M${101 + i * 290} ${139 + j * 48}h262l0 ${13 + q * 9}h-262Z`}
              fill="#C1C5A5"
              opacity=".6"
            />
          ))}
        </g>
      ))}
      <Cabinet id={id} x={852} y={697} w={852} d={494} h={48} floor={1060}>
        <g transform="translate(39 15)">
          <rect
            width="730"
            height="461"
            rx="17"
            fill={url(id, "metal")}
            stroke={C.ink}
            strokeWidth="8"
          />
          <rect
            x="15"
            y="15"
            width="699"
            height="430"
            rx="14"
            fill="#567B79"
            stroke="#B9CAC1"
            strokeWidth="4"
          />
          <Vinyl x={249} y={227} r={195} t={t} color={C.yellow} />
          <circle cx="249" cy="227" r="9" fill={url(id, "metal")} />
          <g transform={`rotate(${-7 + q * 22} 618 94)`}>
            <path
              d="M618 94L610 246L470 321"
              fill="none"
              stroke={C.ink}
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M618 94L610 246L470 321"
              fill="none"
              stroke={url(id, "metal-line")}
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M454 305l43 23-19 34-43-23Z"
              fill={C.red}
              stroke={C.ink}
              strokeWidth="3"
            />
          </g>
          <Knob id={id} x={618} y={94} r={27} />
          <Knob id={id} x={636} y={363} r={25} />
          <rect x="41" y="386" width="70" height="30" rx="5" fill={C.red} />
          <circle cx="44" cy="46" r="7" fill={C.yellow} />
        </g>
      </Cabinet>
      <Speaker id={id} x={145} y={578} w={295} h={435} />
      <path
        d="M376 1007Q505 1062 684 987"
        stroke={C.deep}
        strokeWidth="7"
        fill="none"
      />
      <path
        d="M1817 524H1770V870"
        stroke={url(id, "metal-line")}
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M1690 591Q1731 513 1817 533L1899 645Z"
        fill={C.yellow}
        stroke={C.ink}
        strokeWidth="5"
      />
      <path
        d="M1693 645L1428 849L1821 925L1888 648Z"
        fill={C.yellow}
        opacity={0.035 + 0.05 * q}
      />
      <path
        d={`M748 ${973 + wave(t, 9) * 2}l81 54`}
        stroke="#B7B492"
        opacity=".18"
        strokeWidth="3"
      />
    </>
  );
};
