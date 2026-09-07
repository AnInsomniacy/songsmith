import { C } from "../config";
import { wave } from "../motion";
export function Materials({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-brass`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#8A6C58" />
        <stop offset=".25" stopColor={C.sun} />
        <stop offset=".5" stopColor="#B89472" />
        <stop offset=".75" stopColor="#F7DFC0" />
        <stop offset="1" stopColor="#866653" />
      </linearGradient>
      <linearGradient id={`${id}-metal`}>
        <stop stopColor="#314A59" />
        <stop offset=".3" stopColor="#819D9F" />
        <stop offset=".48" stopColor="#D2DDCF" />
        <stop offset=".55" stopColor="#6B898F" />
        <stop offset="1" stopColor="#294458" />
      </linearGradient>
      <linearGradient id={`${id}-wood`} x2="0" y2="1">
        <stop stopColor="#937968" />
        <stop offset=".5" stopColor="#665B58" />
        <stop offset="1" stopColor="#3A424D" />
      </linearGradient>
      <linearGradient id={`${id}-ceramic`}>
        <stop stopColor="#8BA9AA" />
        <stop offset=".25" stopColor="#D7E5DD" />
        <stop offset=".55" stopColor="#F4F0DC" />
        <stop offset="1" stopColor="#95B8B8" />
      </linearGradient>
      <radialGradient id={`${id}-lens`} cx=".35" cy=".27">
        <stop stopColor="#B9DCD2" />
        <stop offset=".2" stopColor="#658C9C" />
        <stop offset=".5" stopColor="#3C4569" />
        <stop offset=".72" stopColor="#214156" />
        <stop offset="1" stopColor="#111F32" />
      </radialGradient>
      <pattern
        id={`${id}-paper`}
        width="47"
        height="43"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M3 5h2m12 20h1m20-13h2m-12 25h2"
          stroke={C.white}
          strokeWidth="1"
          opacity=".11"
        />
      </pattern>
      <pattern
        id={`${id}-leather`}
        width="9"
        height="7"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 2l4 1l3-2M3 6l4-1"
          stroke="#B0BDAE"
          opacity=".12"
          fill="none"
        />
      </pattern>
    </defs>
  );
}
export function WallPanels({ light = false }: { light?: boolean }) {
  return (
    <g
      stroke={light ? "#677F83" : C.glass}
      fill="none"
      opacity={light ? 0.2 : 0.13}
    >
      <path d="M0 115H1920M0 135H1920M0 786H1920M0 808H1920" />
      {[60, 550, 1040, 1530].map((x) => (
        <path
          key={x}
          d={`M${x} 170h410v585H${x}ZM${x + 10} 180h390v565H${x + 10}Z`}
        />
      ))}
    </g>
  );
}
export function Parquet({ id, y = 820 }: { id: string; y?: number }) {
  return (
    <g>
      <path d={`M0 ${y}H1920V1080H0Z`} fill={`url(#${id}-floor)`} />
      <g fill="none" stroke={C.sun} opacity=".14">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path
            key={i}
            d={`M${760 + (i - 4) * 75} ${y}L${-400 + i * 320} 1080`}
          />
        ))}
        {[0.1, 0.28, 0.55, 0.9].map((a) => (
          <path key={a} d={`M0 ${y + (1080 - y) * a}H1920`} />
        ))}
      </g>
    </g>
  );
}
export function Moulding({
  x,
  y,
  w,
  h,
  id,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
}) {
  return (
    <g>
      <rect
        x={x + 13}
        y={y + 18}
        width={w}
        height={h}
        fill={C.night}
        opacity=".22"
      />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-brass)`} />
      {[5, 11, 19, 25].map((d, i) => (
        <rect
          key={d}
          x={x + d}
          y={y + d}
          width={w - d * 2}
          height={h - d * 2}
          fill="none"
          stroke={i % 2 ? "#765C4C" : "#F5D6AF"}
          strokeWidth={i % 2 ? 2 : 1}
        />
      ))}
      {[
        [x + 17, y + 17],
        [x + w - 17, y + 17],
        [x + 17, y + h - 17],
        [x + w - 17, y + h - 17],
      ].map(([a, b], i) => (
        <path
          key={i}
          d={`M${a - 7} ${b}q7-13 14 0q-7 13-14 0`}
          fill="#98775E"
        />
      ))}
      <rect
        x={x + 29}
        y={y + 29}
        width={w - 58}
        height={h - 58}
        fill={C.night}
      />
    </g>
  );
}
export function Landscape({
  x,
  y,
  w,
  h,
  id,
  t = 0,
  variant = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  t?: number;
  variant?: number;
}) {
  const clip = `${id}-land-${variant}`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={w} height={h} fill="#9BB7BC" />
        <circle cx={x + w * 0.7} cy={y + h * 0.24} r={w * 0.12} fill={C.sun} />
        <path
          d={`M${x} ${y + h * 0.59}Q${x + w * 0.2} ${y + h * 0.28} ${x + w * 0.45} ${y + h * 0.55}T${x + w} ${y + h * 0.4}V${y + h}H${x}Z`}
          fill="#739498"
        />
        <path
          d={`M${x} ${y + h * 0.7}Q${x + w * 0.55} ${y + h * 0.4} ${x + w} ${y + h * 0.65}V${y + h}H${x}Z`}
          fill="#466B74"
        />
        <path
          d={`M${x + w * 0.47} ${y + h * 0.58}Q${x + w * 0.8} ${y + h * 0.75} ${x + w * 0.35} ${y + h}h${w * 0.27}Q${x + w * 0.97} ${y + h * 0.77} ${x + w * 0.5} ${y + h * 0.58}Z`}
          fill={C.glass}
        />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${x + w * 0.52 + wave(t, 12, i) * 2} ${y + h * (0.74 + i * 0.063)}h${w * (0.14 - i * 0.02)}`}
            stroke={C.sun}
            opacity=".4"
          />
        ))}
        <path
          d={`M${x} ${y + h}v${-h * 0.22}l${w * 0.2} ${-h * 0.11}l${w * 0.13} ${h * 0.33}Z`}
          fill="#274A57"
        />
      </g>
    </g>
  );
}
export function Clouds({
  t,
  y = 130,
  color = C.white,
}: {
  t: number;
  y?: number;
  color?: string;
}) {
  return (
    <g fill={color} opacity=".18">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          transform={`translate(${wave(t, 40, i) * 17} ${i * 33})`}
          d={`M${120 + i * 540} ${y}q35-25 79-12q12-43 65-37q36 1 51 35q42-20 83 14Z`}
        />
      ))}
    </g>
  );
}
export function Water({
  id,
  t,
  y = 410,
}: {
  id: string;
  t: number;
  y?: number;
}) {
  return (
    <g>
      <path d={`M0 ${y}H1920V1080H0Z`} fill={`url(#${id}-floor)`} />
      {Array.from({ length: 24 }, (_, i) => {
        const yy = y + 12 + i * i * 0.87;
        return (
          <g key={i} opacity={0.12 + i * 0.009}>
            <path
              d={`M-80 ${yy}Q300 ${yy + wave(t, 8 + i * 0.1, i * 0.6) * 7} 790 ${yy}T2020 ${yy}`}
              stroke={i % 4 === 0 ? C.sun : C.glass}
              strokeWidth={1 + i * 0.055}
              fill="none"
            />
            <path
              d={`M${1070 - i * 12 + wave(t, 9, i) * 13} ${yy + 4}h${25 + i * 4}`}
              stroke={C.sun}
              strokeWidth="2"
            />
          </g>
        );
      })}
    </g>
  );
}
export function Tree({
  x,
  y,
  s = 1,
  t,
  color = "#426B6E",
}: {
  x: number;
  y: number;
  s?: number;
  t: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-13 0Q-3-70-6-145L-23-207L-11-203L2-161L15-240L23-240L11-141Q10-64 5 0Z"
        fill={color}
      />
      {Array.from({ length: 30 }, (_, i) => {
        const a = i * 2.4;
        const xx = Math.sin(a) * (30 + i * 2.7);
        const yy = -219 - Math.cos(a) * 50 - i * 1.9;
        return (
          <g key={i}>
            <path
              d={`M0 -145Q${xx * 0.35} ${yy + 42} ${xx} ${yy}`}
              stroke={color}
              strokeWidth={i % 3 === 0 ? 3 : 1.5}
              fill="none"
            />
            <g
              transform={`translate(${xx} ${yy}) rotate(${i * 37 + wave(t, 7, i) * 3})`}
            >
              <path
                d="M0 0Q-21-25-44-8Q-26 14 0 0M0 0Q8-31 28-37Q34-10 0 0M0 0Q20 16 40 3Q20-16 0 0"
                fill={color}
              />
              <path
                d="M-3-1l-32-5M2-3l21-28M4 0l25 3"
                stroke={C.glass}
                opacity=".25"
                strokeWidth=".8"
              />
            </g>
          </g>
        );
      })}
    </g>
  );
}
export function Book({
  x,
  y,
  w = 180,
  color = C.violet,
  angle = 0,
}: {
  x: number;
  y: number;
  w?: number;
  color?: string;
  angle?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0 0h${w}l26 16H26Z`} fill={color} />
      <path d={`M26 16h${w}v20H26Z`} fill="#CFD5C7" />
      {[21, 25, 29].map((yy) => (
        <path
          key={yy}
          d={`M32 ${yy}h${w - 10}`}
          stroke="#829B98"
          strokeWidth=".8"
        />
      ))}
      <path d={`M0 0l26 16v20L0 21Z`} fill={color} />
      <path d={`M0 22l26 15h${w}`} stroke={color} strokeWidth="4" />
    </g>
  );
}
export function Screw({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4" fill="#A9B9B6" />
      <path d={`M${x - 2} ${y - 1}l4 2`} stroke={C.night} />
    </g>
  );
}
export function Reel({
  x,
  y,
  r,
  t,
  id,
}: {
  x: number;
  y: number;
  r: number;
  t: number;
  id: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${t * 18})`}>
      <circle
        r={r}
        fill={`url(#${id}-metal)`}
        stroke="#AFBDB6"
        strokeWidth="2"
      />
      <circle r={r - 8} fill="none" stroke={C.night} opacity=".5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx="0"
          cy={-r * 0.58}
          rx={r * 0.21}
          ry={r * 0.26}
          transform={`rotate(${i * 72})`}
          fill={C.night}
        />
      ))}
      <circle r={r * 0.16} fill={C.sun} />
      <circle r="5" fill={C.night} />
    </g>
  );
}
