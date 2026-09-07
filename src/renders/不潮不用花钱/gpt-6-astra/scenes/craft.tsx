import React from "react";
import { C } from "../config";
import { smooth, turn, wave } from "../motion";
import { type Shot } from "../storyboard";
export type SceneProps = { frame: number; shot: Shot };
export const clock = ({ frame, shot }: SceneProps) => ({
  id: shot.id,
  t: (frame - shot.start) / 60,
  q: smooth((frame - shot.second) / 76),
});
export const url = (id: string, name: string) => `url(#${id}-${name})`;

export const Materials: React.FC<{
  id: string;
  top?: string;
  bottom?: string;
}> = ({ id, top = C.sky, bottom = C.paper }) => (
  <defs>
    <linearGradient
      id={`${id}-metal-line`}
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="170"
      y2="70"
      spreadMethod="reflect"
    >
      <stop stopColor="#68838B" />
      <stop offset=".45" stopColor="#D9E0CF" />
      <stop offset="1" stopColor="#779397" />
    </linearGradient>
    <linearGradient
      id={`${id}-wood-line`}
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="130"
      y2="50"
      spreadMethod="reflect"
    >
      <stop stopColor="#936D46" />
      <stop offset=".5" stopColor="#D0A578" />
      <stop offset="1" stopColor="#876142" />
    </linearGradient>
    <linearGradient id={`${id}-wall`} x2="0.2" y2="1">
      <stop stopColor={top} />
      <stop offset="1" stopColor={bottom} />
    </linearGradient>
    <linearGradient id={`${id}-metal`} x2="1" y2=".3">
      <stop stopColor="#486777" />
      <stop offset=".23" stopColor="#BCD2D0" />
      <stop offset=".42" stopColor="#F0F2DF" />
      <stop offset=".56" stopColor="#749498" />
      <stop offset=".78" stopColor="#C5D6CF" />
      <stop offset="1" stopColor="#456171" />
    </linearGradient>
    <linearGradient id={`${id}-brass`} x2=".7" y2="1">
      <stop stopColor="#FAE1A0" />
      <stop offset=".28" stopColor="#BA884A" />
      <stop offset=".48" stopColor="#E8C57A" />
      <stop offset="1" stopColor="#886139" />
    </linearGradient>
    <linearGradient id={`${id}-wood`} x2="0" y2="1">
      <stop stopColor="#C29463" />
      <stop offset=".16" stopColor="#B8895B" />
      <stop offset="1" stopColor="#76523F" />
    </linearGradient>
    <linearGradient id={`${id}-glass`} x2=".85" y2="1">
      <stop stopColor="#A4D1D0" stopOpacity=".64" />
      <stop offset=".47" stopColor="#DCE6D8" stopOpacity=".14" />
      <stop offset="1" stopColor="#4E808A" stopOpacity=".6" />
    </linearGradient>
    <linearGradient id={`${id}-red`} x2=".8" y2="1">
      <stop stopColor="#DF7B61" />
      <stop offset=".4" stopColor={C.red} />
      <stop offset="1" stopColor="#883A39" />
    </linearGradient>
    <linearGradient id={`${id}-green`} x2=".3" y2="1">
      <stop stopColor="#4F9E85" />
      <stop offset=".45" stopColor={C.green} />
      <stop offset="1" stopColor="#225D59" />
    </linearGradient>
    <radialGradient id={`${id}-bulb`}>
      <stop stopColor="#FFF3C5" />
      <stop offset=".32" stopColor="#FFD775" stopOpacity=".8" />
      <stop offset="1" stopColor="#F2BC4B" stopOpacity="0" />
    </radialGradient>
    <pattern
      id={`${id}-mesh`}
      width="9"
      height="9"
      patternUnits="userSpaceOnUse"
    >
      <rect width="9" height="9" fill="#294B59" />
      <path d="M0 1H9M1 0V9" stroke="#91ACAB" strokeWidth="1.4" opacity=".56" />
      <circle cx="5" cy="5" r="1.3" fill="#112838" />
    </pattern>
    <pattern
      id={`${id}-fabric`}
      width="11"
      height="11"
      patternUnits="userSpaceOnUse"
    >
      <rect width="11" height="11" fill="#337D78" />
      <path
        d="M0 2H11M3 0V11M0 7H11M8 0V11"
        stroke="#C8D4B4"
        opacity=".16"
        strokeWidth="1"
      />
    </pattern>
    <pattern
      id={`${id}-paper`}
      width="37"
      height="31"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="7" cy="11" r=".7" fill={C.ink} opacity=".11" />
      <path
        d="M21 24h3M32 5h2"
        stroke={C.ink}
        strokeWidth=".65"
        opacity=".08"
      />
    </pattern>
  </defs>
);

export const Backdrop: React.FC<{ id: string }> = ({ id }) => (
  <>
    <rect width="1920" height="1080" fill={url(id, "wall")} />
    <rect width="1920" height="1080" fill={url(id, "paper")} />
  </>
);
export const Screw: React.FC<{ x: number; y: number; r?: number }> = ({
  x,
  y,
  r = 5,
}) => (
  <g>
    <circle cx={x + 1} cy={y + 2} r={r} fill={C.deep} opacity=".3" />
    <circle
      cx={x}
      cy={y}
      r={r}
      fill="#D7DECF"
      stroke="#54707B"
      strokeWidth="1.5"
    />
    <path
      d={`M${x - r * 0.6} ${y + r * 0.35}l${r * 1.2} ${-r * 0.7}`}
      stroke="#456171"
      strokeWidth="1.5"
    />
  </g>
);
export const Floor: React.FC<{ id: string; y?: number; dark?: boolean }> = ({
  id,
  y = 845,
  dark = false,
}) => (
  <g>
    <rect
      x="0"
      y={y}
      width="1920"
      height={1080 - y}
      fill={dark ? "#48565A" : url(id, "wood")}
    />
    {Array.from({ length: 18 }, (_, i) => (
      <path
        key={i}
        d={`M${(i - 2) * 150} ${y}L${(i - 2) * 150 - (0.38 * (1080 - y)) / 0.48} 1080`}
        stroke={dark ? "#263E4D" : "#795442"}
        strokeWidth="3"
        opacity=".5"
      />
    ))}
    {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
      <path
        key={i}
        d={`M0 ${y + (1080 - y) * p}H1920`}
        stroke={dark ? "#768381" : "#E7B781"}
        opacity=".25"
        strokeWidth="2"
      />
    ))}
    <path d={`M0 ${y}H1920`} stroke={C.deep} strokeWidth="10" opacity=".22" />
  </g>
);
export const Tiles: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  size?: number;
  color?: string;
}> = ({ x, y, w, h, size = 66, color = C.mist }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={color} />
    {Array.from({ length: Math.ceil(h / size) }, (_, j) => (
      <g key={j}>
        <path
          d={`M${x} ${y + j * size}H${x + w}`}
          stroke={C.paper}
          strokeWidth="3"
          opacity=".4"
        />
        {Array.from({ length: Math.ceil(w / size) }, (_, i) => (
          <path
            key={i}
            d={`M${x + i * size} ${y + j * size}v${Math.min(size, h - j * size)}`}
            stroke={C.deep}
            opacity=".13"
            strokeWidth="2"
          />
        ))}
      </g>
    ))}
  </g>
);
export const Skyline: React.FC<{ y?: number; night?: boolean; t?: number }> = ({
  y = 560,
  night = false,
  t = 0,
}) => (
  <g>
    {[
      { x: 10, w: 190, h: 180 },
      { x: 200, w: 290, h: 260 },
      { x: 490, w: 135, h: 205 },
      { x: 660, w: 285, h: 330 },
      { x: 956, w: 185, h: 235 },
      { x: 1150, w: 274, h: 290 },
      { x: 1460, w: 165, h: 390 },
      { x: 1650, w: 280, h: 215 },
    ].map((b, i) => (
      <g key={i}>
        <path
          d={`M${b.x} ${y}v${-b.h}h${b.w}v${b.h}`}
          fill={
            night
              ? i % 2
                ? "#254A60"
                : "#355D6C"
              : i % 2
                ? "#91B6B9"
                : "#AFCCC7"
          }
        />
        <path
          d={`M${b.x - 7} ${y - b.h}h${b.w + 14}`}
          stroke={night ? "#3C6471" : "#6F9D9F"}
          strokeWidth="9"
        />
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: Math.floor(b.w / 47) }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={b.x + 18 + c * 44}
              y={y - b.h + 32 + r * 55}
              width="20"
              height="32"
              fill={
                night
                  ? (r + c + i) % 3 === 0
                    ? C.yellow
                    : "#7CA2AA"
                  : "#D8E3D5"
              }
              opacity={night ? 0.4 + 0.12 * wave(t, 12, i + r) : 0.6}
            />
          )),
        )}
        {i % 2 === 0 && (
          <path
            d={`M${b.x + b.w * 0.65} ${y - b.h}v-53m-23 17h46m-34-12h26`}
            fill="none"
            stroke={night ? "#466976" : "#7EA5A8"}
            strokeWidth="4"
          />
        )}
      </g>
    ))}
  </g>
);
export const Plant: React.FC<{
  x: number;
  y: number;
  s?: number;
  t?: number;
  color?: string;
}> = ({ x, y, s = 1, t = 0, color = C.green }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="0" cy="15" rx="61" ry="16" fill={C.deep} opacity=".18" />
    <g transform={`rotate(${wave(t, 6) * 1.5} 0 -60)`}>
      <path
        d="M0-28C-8-97 19-141 4-235M0-106Q-40-138-48-183M5-147Q52-175 50-213M0-66Q-58-86-67-126"
        stroke="#537C5F"
        fill="none"
        strokeWidth="6"
      />
      {[
        [-43, -173, -42],
        [35, -211, 35],
        [-7, -224, -10],
        [-62, -118, -65],
        [43, -145, 60],
        [-27, -111, -48],
      ].map(([lx, ly, a], i) => (
        <g
          key={i}
          transform={`translate(${lx} ${ly}) rotate(${a + wave(t, 5, i) * 2})`}
        >
          <path d="M0 19C-33 1-34-40 0-61C31-37 30 3 0 19" fill={color} />
          <path
            d="M0 14V-47m0 23-12-12m12 1 11-11"
            stroke="#B2C692"
            opacity=".5"
            strokeWidth="1.6"
            fill="none"
          />
        </g>
      ))}
    </g>
    <path
      d="M-49-66H49L37 7Q0 25-37 7Z"
      fill={C.coral}
      stroke="#9C5848"
      strokeWidth="3"
    />
    <ellipse cy="-66" rx="51" ry="11" fill="#E8AD7D" />
    <ellipse cy="-68" rx="41" ry="6" fill="#6B5140" />
    <path
      d="M-34-44H33M-29-25H29"
      stroke="#F0BC8A"
      opacity=".45"
      strokeWidth="3"
    />
  </g>
);
export const Vinyl: React.FC<{
  x: number;
  y: number;
  r?: number;
  t?: number;
  color?: string;
}> = ({ x, y, r = 120, t = 0, color = C.red }) => (
  <g transform={`translate(${x} ${y}) rotate(${turn(t, 12)})`}>
    <circle r={r} fill="#182E3B" stroke="#617978" strokeWidth="4" />
    {Array.from({ length: 13 }, (_, i) => (
      <circle
        key={i}
        r={r * (0.37 + i * 0.043)}
        fill="none"
        stroke={i % 3 === 0 ? "#73858A" : "#395361"}
        opacity=".65"
        strokeWidth=".9"
      />
    ))}
    <path
      d={`M0 0L${-0.6 * r} ${-0.8 * r}A${r} ${r} 0 0 1 ${0.32 * r} ${-0.947 * r}Z`}
      fill="#ABC8C6"
      opacity=".1"
    />
    <circle r={r * 0.33} fill={color} />
    <circle
      r={r * 0.23}
      fill="none"
      stroke={C.paper}
      opacity=".4"
      strokeWidth="1.5"
    />
    <path
      d={`M${-0.17 * r} ${-0.08 * r}h${0.34 * r}m${-0.34 * r} ${0.13 * r}h${0.34 * r}`}
      stroke={C.paper}
      opacity=".6"
      strokeWidth={r * 0.035}
    />
    <circle r={r * 0.035} fill={C.paper} />
  </g>
);
export const Speaker: React.FC<{
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
}> = ({ id, x, y, w = 200, h = 320 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect
      x="8"
      y="12"
      width={w}
      height={h}
      rx="12"
      fill={C.deep}
      opacity=".2"
    />
    <rect
      width={w}
      height={h}
      rx="10"
      fill={url(id, "wood")}
      stroke={C.darkWood}
      strokeWidth="5"
    />
    <rect
      x="15"
      y="16"
      width={w - 30}
      height={h - 32}
      rx="6"
      fill={url(id, "mesh")}
    />
    <circle
      cx={w / 2}
      cy={h * 0.68}
      r={w * 0.33}
      fill="#172D3A"
      stroke="#7B9390"
      strokeWidth="5"
    />
    <circle
      cx={w / 2}
      cy={h * 0.68}
      r={w * 0.24}
      fill="#35505B"
      stroke="#1D3440"
      strokeWidth="9"
    />
    <circle cx={w / 2} cy={h * 0.68} r={w * 0.11} fill="#718C8C" />
    <circle
      cx={w / 2}
      cy={h * 0.24}
      r={w * 0.13}
      fill="#1B3445"
      stroke="#9BAEA7"
      strokeWidth="4"
    />
    {[20, w - 20].map((a) =>
      [21, h - 21].map((b) => <Screw key={`${a}-${b}`} x={a} y={b} r={3} />),
    )}
  </g>
);
export const Knob: React.FC<{
  id: string;
  x: number;
  y: number;
  r?: number;
  angle?: number;
}> = ({ id, x, y, r = 25, angle = -25 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cy="3" r={r + 4} fill={C.deep} opacity=".3" />
    <circle r={r} fill={url(id, "metal")} stroke="#4A6370" strokeWidth="2" />
    {Array.from({ length: 16 }, (_, i) => (
      <path
        key={i}
        d={`M0 ${-r + 2}v4`}
        transform={`rotate(${i * 22.5})`}
        stroke="#718885"
        strokeWidth="1.3"
      />
    ))}
    <path
      d={`M0 -4V${-r + 7}`}
      stroke={C.deep}
      strokeWidth="3.5"
      transform={`rotate(${angle})`}
      strokeLinecap="round"
    />
  </g>
);
export const Books: React.FC<{ x: number; y: number; s?: number }> = ({
  x,
  y,
  s = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((i) => (
      <g
        key={i}
        transform={`translate(${(i % 2) * 12} ${-i * 28}) rotate(${i === 1 ? -3 : 1})`}
      >
        <rect
          width="188"
          height="27"
          rx="4"
          fill={[C.red, C.green, C.ink][i]}
        />
        <path d="M16 4H182V22H16" fill="#DED9C3" />
        <path d="M22 10H174M18 16H174" stroke="#B8AE92" strokeWidth="1.5" />
        <path d="M4 3V24" stroke={C.paper} opacity=".4" />
      </g>
    ))}
  </g>
);
export const Pendant: React.FC<{
  id: string;
  x: number;
  y: number;
  lit?: number;
}> = ({ id, x, y, lit = 1 }) => (
  <g>
    <path d={`M${x} 0V${y}`} stroke={C.ink} strokeWidth="6" />
    <ellipse
      cx={x}
      cy={y + 155}
      rx="160"
      ry="190"
      fill={url(id, "bulb")}
      opacity={lit * 0.32}
    />
    <path
      d={`M${x - 65} ${y + 40}Q${x - 54} ${y - 14} ${x} ${y - 24}Q${x + 54} ${y - 14} ${x + 65} ${y + 40}Z`}
      fill={C.green}
      stroke={C.ink}
      strokeWidth="4"
    />
    <ellipse cx={x} cy={y + 39} rx="65" ry="12" fill="#D5CEAA" />
    <ellipse
      cx={x}
      cy={y + 44}
      rx="27"
      ry="9"
      fill={C.yellow}
      opacity={0.6 + lit * 0.4}
    />
  </g>
);
