import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Materials,
  Plant,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const AwningOrchestra: React.FC<SceneProps> = (p) => {
  const { id, t } = clock(p);
  return (
    <>
      <Materials id={id} top="#C0D6D2" bottom="#DDCFAB" />
      <Backdrop id={id} />
      <path d="M58 147H576V940H58Z" fill="#C49D76" />
      <path d="M603 90H1236V940H603Z" fill="#92B0A0" />
      <path d="M1263 177H1861V940H1263Z" fill="#BD876F" />
      {[
        [94, 272, 437, 501],
        [645, 208, 553, 565],
        [1306, 301, 509, 491],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill="#345762"
            stroke={C.ink}
            strokeWidth="12"
          />
          <rect
            x={x + 14}
            y={y + 14}
            width={w - 28}
            height={h - 28}
            fill={url(id, "glass")}
          />
          <path
            d={`M${x + w / 2} ${y}v${h}M${x} ${y + h * 0.54}h${w}`}
            stroke="#D5CAAA"
            strokeWidth="10"
          />
          <path
            d={`M${x + 20} ${y + 23}h${w * 0.3}L${x + 20} ${y + h * 0.7}Z`}
            fill={C.paper}
            opacity=".13"
          />
        </g>
      ))}
      <path d="M6 178H599L559 283H38Z" fill={C.green} />
      <path d="M592 119H1247L1206 232H625Z" fill={C.red} />
      <path d="M1246 200H1889L1845 303H1280Z" fill={C.green} />
      {[
        { x: 38, y: 275, w: 518, c: C.green },
        { x: 625, y: 225, w: 581, c: C.red },
        { x: 1280, y: 295, w: 565, c: C.green },
      ].map((a, i) => (
        <path
          key={i}
          d={`M${a.x} ${a.y}Q${a.x + a.w * 0.5} ${a.y + wave(t, 5, i) * 7} ${a.x + a.w} ${a.y}V${a.y + 34}Q${a.x + a.w * 0.5} ${a.y + 44 + wave(t, 5, i) * 7} ${a.x} ${a.y + 34}Z`}
          fill={a.c}
        />
      ))}
      <path
        d="M72 769Q934 391 1832 769"
        fill="none"
        stroke={C.ink}
        strokeWidth="5"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x = 174 + i * 218,
          y = 727 - Math.sin((i / 7) * Math.PI) * 151;
        return (
          <g
            key={i}
            transform={`rotate(${wave(t, 4.8, i * 0.35) * 4} ${x} ${y})`}
          >
            <path
              d={`M${x} ${y}v${55 + (i % 3) * 18}`}
              stroke="#3E615E"
              strokeWidth="3"
            />
            <path
              d={`M${x - 26} ${y + 53 + (i % 3) * 18}Q${x - 40} ${y + 88 + (i % 3) * 18} ${x - 46} ${y + 113 + (i % 3) * 18}Q${x} ${y + 133 + (i % 3) * 18} ${x + 46} ${y + 113 + (i % 3) * 18}Q${x + 40} ${y + 88 + (i % 3) * 18} ${x + 26} ${y + 53 + (i % 3) * 18}Z`}
              fill={url(id, i % 2 ? "metal" : "brass")}
              stroke="#597370"
              strokeWidth="3"
            />
            <ellipse
              cx={x}
              cy={y + 115 + (i % 3) * 18}
              rx="45"
              ry="11"
              fill="#4A615D"
            />
            <path
              d={`M${x} ${y + 114 + (i % 3) * 18}v46`}
              stroke={C.ink}
              strokeWidth="2.5"
            />
            <path
              d={`M${x - 12} ${y + 147 + (i % 3) * 18}h24l-5 42h-14Z`}
              fill={i % 2 ? C.coral : C.yellow}
            />
          </g>
        );
      })}
      <path d="M0 939H1920V1080H0Z" fill="#839A8F" />
      <path
        d="M0 969H1920M0 1026H1920"
        stroke="#CDD2B6"
        opacity=".45"
        strokeWidth="3"
      />
      <Plant x={84} y={951} s={1.22} t={t} />
      <Plant x={1814} y={958} s={1.06} t={t} color="#678B62" />
      <path
        d="M611 858H1228V886H611M694 885V956M1150 885V956"
        fill="none"
        stroke={C.darkWood}
        strokeWidth="21"
      />
    </>
  );
};
