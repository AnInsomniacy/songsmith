import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Floor,
  Materials,
  Pendant,
  Plant,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const RecordLibrary: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#355861" bottom="#54706C" />
      <Backdrop id={id} />
      <Floor id={id} y={923} dark />
      <path
        d="M75 113H769V930H75Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="12"
      />
      <path d="M101 141H743V900H101Z" fill="#244650" />
      {[150, 350, 551, 751].map((y, row) => (
        <g key={y}>
          {Array.from({ length: 12 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${115 + i * 50} ${y}) rotate(${(i % 4) - 2} 10 157)`}
            >
              <rect
                width={i % 3 === 0 ? 43 : 34}
                height="164"
                fill={
                  [C.mist, C.coral, C.yellow, C.leaf, C.paper][
                    (i + row * 2) % 5
                  ]
                }
              />
              <path
                d="M7 9V152m9-115v42m6 6v33"
                stroke={C.ink}
                opacity=".32"
                strokeWidth="3"
              />
            </g>
          ))}
          <rect
            x="95"
            y={y + 169}
            width="655"
            height="22"
            fill={url(id, "wood")}
          />
          <path d={`M102 ${y + 170}H741`} stroke="#E2B781" strokeWidth="3" />
        </g>
      ))}
      <g
        transform={`translate(${-q * 52} ${q * 7}) rotate(${-9 - q * 9} 438 608)`}
      >
        <path
          d="M191 473H578V859H191Z"
          fill={C.red}
          stroke="#853B3D"
          strokeWidth="6"
        />
        <Vinyl x={569} y={655} r={171} t={t * 0.35} color={C.yellow} />
        <path d="M204 487H567V847H204Z" fill={C.red} />
        <path d="M262 728L472 559L520 618L306 788Z" fill={C.paper} />
        <path d="M244 547H400M243 567H360" stroke={C.yellow} strokeWidth="4" />
        <circle cx="378" cy="670" r="70" fill={C.ink} />
        <circle cx="378" cy="670" r="21" fill={C.yellow} />
      </g>
      <path
        d="M869 97H1847M869 121H1704M931 960H1823"
        stroke="#CFD0B9"
        opacity=".18"
        strokeWidth="3"
      />
      <Pendant id={id} x={471} y={84} lit={0.6 + wave(t, 10) * 0.1} />
      <Plant x={145} y={988} s={0.63} t={t} />
    </>
  );
};
