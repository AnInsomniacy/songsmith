import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import { F } from "../typography";
import {
  Backdrop,
  Floor,
  Knob,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Switchboard: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#C9D3BC" bottom="#C3BD9D" />
      <Backdrop id={id} />
      <Floor id={id} y={929} />
      <path
        d="M64 197H758V931H64Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="9"
      />
      <rect
        x="91"
        y="222"
        width="638"
        height="466"
        rx="11"
        fill="#274750"
        stroke="#D5BF8D"
        strokeWidth="5"
      />
      {[0, 1, 2, 3].map((r) =>
        Array.from({ length: 7 }, (_, i) => (
          <g
            key={`${r}-${i}`}
            transform={`translate(${149 + i * 87} ${279 + r * 112})`}
          >
            <circle r="18" fill={url(id, "metal")} />
            <circle r="9" fill={C.deep} />
            <rect x="-25" y="31" width="49" height="15" rx="3" fill="#B6C1A7" />
            <circle
              cy="-33"
              r="6"
              fill={(i + r) % 3 === 0 ? C.yellow : C.coral}
              opacity={(i + r) % 3 === 0 ? 0.5 + 0.3 * wave(t, 4, i) : 0.2}
            />
          </g>
        )),
      )}
      <path
        d="M149 279C125 634 598 700 584 503M323 391C357 771 685 820 671 616M236 503C194 777 530 792 496 280"
        fill="none"
        stroke={C.deep}
        strokeWidth="11"
      />
      <path
        d="M149 279C125 634 598 700 584 503"
        fill="none"
        stroke={C.coral}
        strokeWidth="6"
      />
      <path
        d="M323 391C357 771 685 820 671 616"
        fill="none"
        stroke={C.yellow}
        strokeWidth="6"
      />
      <path
        d="M236 503C194 777 530 792 496 280"
        fill="none"
        stroke="#83A99A"
        strokeWidth="6"
      />
      <path
        d="M46 765L783 765L821 973H22Z"
        fill={url(id, "metal")}
        stroke={C.darkWood}
        strokeWidth="7"
      />
      <g transform="translate(288 841)">
        <path
          d="M-105 88L-75-12H89L128 88Z"
          fill={url(id, "green")}
          stroke={C.ink}
          strokeWidth="5"
        />
        <ellipse cx="9" cy="35" rx="63" ry="42" fill={url(id, "metal")} />
        <ellipse cx="9" cy="35" rx="27" ry="18" fill={C.ink} />
        {Array.from({ length: 10 }, (_, i) => (
          <circle
            key={i}
            cx={9 + 46 * Math.cos(i * 0.59)}
            cy={35 + 29 * Math.sin(i * 0.59)}
            r="6"
            fill={C.ink}
          />
        ))}
        <g transform={`rotate(${wave(t, 1.8) * 1.5 * (1 - q)} 0 -12)`}>
          <path
            d="M-122-41Q-136-82-87-83Q-73-67-78-41Q5-69 90-41Q84-83 122-83Q165-79 153-41L113-12Q99-9 89-30Q0-47-75-25Q-74-5-95-13Z"
            fill={C.ink}
            stroke="#355A5E"
            strokeWidth="3"
          />
        </g>
      </g>
      <Knob id={id} x={575} y={833} r={31} angle={q * 80 - 30} />
      <Knob id={id} x={674} y={853} r={25} />
      <path
        d="M294 943Q526 999 689 974T753 1050"
        fill="none"
        stroke={C.deep}
        strokeWidth="6"
      />
      <rect x="99" y="130" width="243" height="43" fill={C.green} />
      <text
        x="119"
        y="162"
        fontFamily={F.info}
        fontSize="29"
        letterSpacing="5"
        fill={C.paper}
      >
        SWITCHBOARD
      </text>
      <Screw x={113} y={244} />
      <Screw x={706} y={667} />
      <path
        d="M836 95H1848M842 971H1782"
        stroke="#769A90"
        opacity=".3"
        strokeWidth="3"
      />
    </>
  );
};
