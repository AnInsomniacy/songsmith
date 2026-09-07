import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import {
  Backdrop,
  Books,
  Materials,
  Plant,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const Invention: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  const ballX = 1408,
    ballY = 742;
  return (
    <>
      <Materials id={id} top="#D7E2D3" bottom="#ECE4CA" />
      <Backdrop id={id} />
      <path
        d="M973 135H1829V667H973Z"
        fill="#97BDBB"
        stroke={C.ink}
        strokeWidth="17"
      />
      <path d="M996 156H1805V644H996Z" fill="#BCDAD2" />
      <path
        d="M998 477Q1134 354 1260 444T1527 402T1804 449V644H998Z"
        fill="#7EA889"
      />
      <path
        d="M1460 645Q1462 425 1524 304M1492 412Q1430 359 1390 344M1507 363Q1584 293 1642 320"
        stroke="#52765D"
        strokeWidth="13"
        fill="none"
      />
      {[
        [1380, 329, -40],
        [1428, 358, -35],
        [1530, 299, 10],
        [1631, 312, 42],
        [1574, 338, 48],
      ].map(([x, y, r], i) => (
        <path
          key={i}
          d="M0 17C-48 1-51-48 0-78C45-49 43 0 0 17"
          fill={i % 2 ? "#5E9273" : "#6BA082"}
          transform={`translate(${x} ${y}) rotate(${r + wave(t, 7, i) * 2})`}
        />
      ))}
      <path
        d="M985 474H1815M1288 142V656M1570 142V656"
        stroke="#E8E4C9"
        strokeWidth="11"
      />
      <path d="M950 660H1851V692H950Z" fill={url(id, "wood")} />
      <rect
        x="1030"
        y="254"
        width="187"
        height="222"
        fill={C.paper}
        transform="rotate(-5 1030 254)"
      />
      <path
        d="M1059 393l41-76 61 114m-94-22h90M1063 445h112"
        fill="none"
        stroke="#77959C"
        strokeWidth="3"
      />
      <path
        d="M883 795H1920V854H883Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="4"
      />
      <path
        d="M902 855V1080H945V855M1848 855V1080H1890V855"
        fill={C.darkWood}
      />
      <path d="M942 990H1848" stroke={C.darkWood} strokeWidth="18" />
      <path
        d="M886 804H1918M944 827H1810M954 842H1640"
        stroke="#DBAF77"
        strokeWidth="2"
        opacity=".55"
      />
      <Books x={997} y={764} s={0.8} />
      <path
        d="M1314 789H1506"
        stroke={url(id, "wood-line")}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <ellipse cx={ballX} cy="787" rx="51" ry="7" fill={C.deep} opacity=".2" />
      <g transform={`translate(${ballX} ${ballY})`}>
        <path
          d="M0-19C-32-37-54-11-43 22C-34 51-4 54 0 44C9 54 37 46 46 19C56-14 24-40 0-19Z"
          fill={url(id, "red")}
          stroke="#8A3F38"
          strokeWidth="2.5"
        />
        <path
          d="M0-17Q-4-45 12-47"
          stroke={C.darkWood}
          strokeWidth="5"
          fill="none"
        />
        <path d="M5-33Q23-56 40-37Q25-25 5-33" fill={C.green} />
        <path
          d="M-23-12Q-38 1-28 16"
          stroke="#F0B186"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(1572 734)">
        <rect x="-22" y="35" width="239" height="21" rx="7" fill={C.ink} />
        <path
          d="M0 38V-54H190V38"
          fill="none"
          stroke={url(id, "metal-line")}
          strokeWidth="7"
        />
        {[0, 1, 2, 3, 4].map((n) => (
          <g
            key={n}
            transform={`rotate(${n === 0 ? Math.min(0, wave(t, 2.8)) * q * 22 : n === 4 ? Math.max(0, wave(t, 2.8)) * q * 22 : 0} ${23 + n * 36} -51)`}
          >
            <path
              d={`M${23 + n * 36} -51V3`}
              stroke="#56727B"
              strokeWidth="2"
            />
            <circle
              cx={23 + n * 36}
              cy="13"
              r="17"
              fill={url(id, "metal")}
              stroke="#4A6370"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </g>
      <path
        d="M1819 782H1737V759H1768V551L1708 476"
        fill="none"
        stroke={url(id, "metal-line")}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M1655 434Q1715 413 1754 470L1647 514Q1637 467 1655 434Z"
        fill={C.green}
        stroke={C.ink}
        strokeWidth="4"
      />
      <circle
        cx="1694"
        cy="514"
        r={90 + q * 45}
        fill={url(id, "bulb")}
        opacity={0.24 + q * 0.35}
      />
      <path
        d="M1638 513L1778 482"
        stroke={C.yellow}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Screw x={1769} y={552} r={8} />
      <Plant x={1825} y={662} s={0.36} t={t} />
      <path
        d="M58 137H777M59 147H701M83 952H763"
        stroke="#80A8A3"
        opacity=".3"
        strokeWidth="2"
      />
    </>
  );
};
