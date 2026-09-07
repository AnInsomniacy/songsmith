import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Books,
  Floor,
  Materials,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const CollectorShelf: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#C5D6C6" bottom="#DBD4B6" />
      <Backdrop id={id} />
      <Floor id={id} y={938} />
      <path
        d="M112 102H741V950H112Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="9"
      />
      <rect x="133" y="125" width="587" height="799" fill="#4C7971" />
      <path
        d="M421 125V580M133 420H720M133 609H720M133 808H720"
        stroke={url(id, "wood-line")}
        strokeWidth="22"
      />
      <Vinyl x={568} y={274} r={112} t={t * 0.3} color={C.coral} />
      <g transform={`translate(259 319) rotate(${wave(t, 5) * 1.4} 0 51)`}>
        <ellipse cy="83" rx="82" ry="15" fill={C.deep} opacity=".25" />
        <path
          d="M-53-25Q-72 55-40 72H47Q82 44 55-24Z"
          fill="#D4BFC1"
          stroke="#856D80"
          strokeWidth="4"
        />
        <path
          d="M-42-68Q-79-148-49-170Q-20-167-11-91M20-91Q44-173 69-151Q84-116 43-60"
          fill="#D7C6C7"
          stroke="#8B7380"
          strokeWidth="4"
        />
        <ellipse
          cy="-49"
          rx="70"
          ry="54"
          fill="#DFCCCB"
          stroke="#8B7380"
          strokeWidth="4"
        />
        <path
          d="M-44-52l20 4m29 0 20-4"
          stroke={C.ink}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M-8-30Q1-22 11-31"
          stroke="#A57376"
          fill="none"
          strokeWidth="3"
        />
        <path
          d="M-45 27Q-4 44 49 27"
          stroke="#C098A4"
          strokeWidth="9"
          fill="none"
        />
      </g>
      <g transform="translate(256 548) rotate(-4)">
        <path d="M-98-65H91V53H-98Z" fill={C.paper} />
        <path d="M-80 29L-30-28L13 3L44-25L73 29Z" fill={C.green} />
        <circle cx="48" cy="-35" r="17" fill={C.yellow} />
      </g>
      <g
        transform={`translate(${570 + q * 22} ${542 - q * 7}) rotate(${-5 - q * 5})`}
      >
        <path
          d="M-86 3L-65-55H-16L15-12H62Q103-7 109 24V44H-93Z"
          fill={C.red}
          stroke="#863B3A"
          strokeWidth="3"
        />
        <path d="M-91 28H105V47H-91Z" fill={C.paper} />
        <path d="M-59-11L7 5M-48-22L-6-10" stroke={C.paper} strokeWidth="4" />
      </g>
      <Books x={177} y={772} s={1.2} />
      <Books x={469} y={757} s={0.94} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g
          key={i}
          transform={`translate(${153 + i * 68} 839) rotate(${(i % 3) - 1})`}
        >
          <rect
            width="57"
            height="79"
            fill={[C.mist, C.coral, C.leaf, C.yellow][i % 4]}
          />
          <path
            d="M10 13H46M10 30H37M10 63H48"
            stroke={C.ink}
            opacity=".3"
            strokeWidth="3"
          />
        </g>
      ))}
      <path
        d="M149 128L280 128L141 918H134V204Z"
        fill={C.paper}
        opacity=".07"
      />
      <path
        d="M851 90H1831M857 947H1750"
        stroke="#70968B"
        opacity=".28"
        strokeWidth="3"
      />
      <path
        d="M729 742Q794 689 801 753V874Q788 914 735 914"
        stroke={C.green}
        fill="none"
        strokeWidth="10"
      />
    </>
  );
};
