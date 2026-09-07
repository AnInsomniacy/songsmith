import React from "react";
import { C } from "../config";
import { Screw, url } from "./craft";
export const plane = (x: number, y: number) => `matrix(1 0 -.38 .48 ${x} ${y})`;
export const Cabinet: React.FC<{
  id: string;
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  floor: number;
  children: React.ReactNode;
}> = ({ id, x, y, w, d, h, floor, children }) => {
  const fx = x - 0.38 * d,
    fy = y + 0.48 * d;
  return (
    <g>
      <ellipse
        cx={fx + w * 0.55}
        cy={floor + 9}
        rx={w * 0.62}
        ry="29"
        fill={C.deep}
        opacity=".17"
      />
      {[fx + 36, fx + w - 54, x + w - 37].map((lx, i) => (
        <path
          key={i}
          d={`M${lx} ${i === 2 ? y + h : fy + h}V${i === 2 ? floor - 0.48 * d : floor}h20V${i === 2 ? y + h : fy + h}Z`}
          fill={C.darkWood}
        />
      ))}
      <path
        d={`M${x + w} ${y}L${fx + w} ${fy}v${h}L${x + w} ${y + h}Z`}
        fill="#76583F"
        stroke={C.darkWood}
        strokeWidth="3"
      />
      <path
        d={`M${fx} ${fy}h${w}v${h}h${-w}Z`}
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="4"
      />
      <path
        d={`M${fx + 8} ${fy + 13}h${w - 16}m${-w + 25} ${h - 29}h${w - 43}`}
        stroke="#DFC196"
        strokeWidth="2"
        opacity=".4"
      />
      <g transform={plane(x, y)}>
        <rect
          width={w}
          height={d}
          rx="5"
          fill={url(id, "wood")}
          stroke={C.darkWood}
          strokeWidth="5"
        />
        {children}
      </g>
    </g>
  );
};
export const Motor: React.FC<{
  id: string;
  x: number;
  y: number;
  angle: number;
  r?: number;
}> = ({ id, x, y, angle, r = 52 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect
      x={-r - 23}
      y={-r - 21}
      width={r * 2 + 46}
      height={r * 2 + 49}
      rx="13"
      fill={C.green}
      stroke={C.ink}
      strokeWidth="4"
    />
    <circle r={r} fill={url(id, "brass")} stroke="#765A3D" strokeWidth="4" />
    <g transform={`rotate(${angle})`}>
      {[0, 90, 180, 270].map((a) => (
        <path
          key={a}
          d={`M0 ${-r + 9}V${-r * 0.32}`}
          stroke="#6E583C"
          strokeWidth="11"
          strokeLinecap="round"
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx={r * 0.55} r="7" fill={C.paper} />
    </g>
    <Screw x={0} y={0} r={9} />
  </g>
);
