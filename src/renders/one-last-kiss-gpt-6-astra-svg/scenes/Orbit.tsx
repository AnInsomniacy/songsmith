import { C, type SceneProps } from "../design";
import { World } from "./shared";
import { Materials, Reel, Book } from "./craft";
export default function Orbit(p: SceneProps) {
  const { id, t, q } = p;
  const a = t * 0.16;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M205 571L1560 491L1780 628L425 711Z" fill={`url(#${id}-wood)`} />
      <path
        d="M380 44H1620V527H380Z"
        fill="#233F55"
        stroke="#6B8188"
        strokeWidth="3"
      />
      <path
        d="M410 75h1180v423H410Z"
        fill="none"
        stroke="#708A8F"
        opacity=".3"
      />
      <g opacity=".4" stroke={C.glass} fill="none">
        <circle cx="1325" cy="290" r="163" />
        <ellipse cx="1325" cy="290" rx="105" ry="163" />
        <path d="M1163 290h324m-295-69h265m-265 138h265" />
      </g>
      <ellipse cx="918" cy="513" rx="210" ry="49" fill={`url(#${id}-brass)`} />
      <path d="M899 506V269h38v237" fill={`url(#${id}-metal)`} />
      <circle cx="918" cy="265" r="65" fill={C.sun} />
      <g transform={`rotate(-13 918 330)`}>
        <ellipse
          cx="918"
          cy="330"
          rx="320"
          ry="110"
          stroke={`url(#${id}-brass)`}
          strokeWidth="5"
          fill="none"
        />
        <path
          d={`M918 390L${918 + 320 * Math.cos(a)} ${330 + 110 * Math.sin(a)}`}
          stroke="#A8B5A4"
          strokeWidth="4"
        />
        <circle
          cx={918 + 320 * Math.cos(a)}
          cy={330 + 110 * Math.sin(a)}
          r="28"
          fill={C.glass}
        />
        <ellipse
          cx="918"
          cy="345"
          rx="230"
          ry="73"
          stroke="#92ABAA"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx={918 + 230 * Math.cos(-a + 0.8)}
          cy={345 + 73 * Math.sin(-a + 0.8)}
          r={15 + q * 3}
          fill={C.coral}
        />
      </g>
      <g transform="translate(593 485) scale(.43)">
        <Reel x={0} y={0} r={90} t={t} id={id} />
      </g>
      <Book x={1280} y={550} w={214} color="#7E7582" angle={-4} />
      <Book x={1310} y={527} w={184} color="#547D83" />
      <path
        d="M523 450q-110 22-68 96q40 48 129 4"
        stroke={C.sun}
        strokeWidth="3"
        fill="none"
      />
      <path d="M470 488l-29 97" stroke={C.glass} strokeWidth="10" />
    </World>
  );
}
