import { C } from "../config";
import { smooth, wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Book, Materials } from "./craft";
import { World } from "./shared";
const stars = [
  [526, 248],
  [719, 159],
  [912, 294],
  [1101, 137],
  [1304, 213],
  [1452, 112],
];
export default function Constellation(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path
        d="M241 591V197Q241-19 960-19Q1679-19 1679 197V591Z"
        fill="#19374D"
      />
      <path
        d="M265 578V206Q265 12 960 12Q1655 12 1655 206V578"
        stroke="#677F87"
        strokeWidth="6"
        fill="none"
      />
      <path
        d="M411 564V229Q411 37 960 37Q1509 37 1509 229V564"
        stroke="#516D7D"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M960 12V578M270 355H1650"
        stroke="#667F85"
        strokeWidth="5"
        opacity=".5"
      />
      {Array.from({ length: 35 }, (_, i) => (
        <circle
          key={i}
          cx={380 + ((i * 173) % 1160)}
          cy={64 + ((i * 89) % 393)}
          r={i % 4 === 0 ? 2 : 1}
          fill={C.white}
          opacity={0.25 + (0.2 * (1 + wave(t, 15, i))) / 2}
        />
      ))}
      {stars.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 3 ? 5 : 3} fill={C.sun} />
          {i > 0 && (
            <path
              d={`M${stars[i - 1][0]} ${stars[i - 1][1]}L${x} ${y}`}
              fill="none"
              stroke={C.glass}
              opacity={0.18 + q * 0.2}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - smooth((t - i * 0.7) / 3)}
            />
          )}
        </g>
      ))}
      <path d="M166 581H1756L1870 673H275Z" fill={`url(#${id}-wood)`} />
      <g transform="translate(1420 425) rotate(-26)">
        <rect
          x="-217"
          y="-43"
          width="288"
          height="86"
          rx="8"
          fill={`url(#${id}-metal)`}
        />
        <path
          d="M-240-52h40v104h-40Z"
          fill="#354E62"
          stroke="#AAB8AD"
          strokeWidth="3"
        />
        <ellipse cx="-242" cy="0" rx="11" ry="49" fill={`url(#${id}-lens)`} />
        <rect x="71" y="-23" width="62" height="46" fill="#2E4659" />
        <path d="M129-32h27v64h-27" fill="#788F96" />
      </g>
      <path
        d="M1420 447v55m0 0l-94 126m94-126l94 126m-94-126v123"
        stroke="#8D9E9B"
        strokeWidth="8"
      />
      <Book x={353} y={562} w={236} color="#647784" angle={-6} />
      <path d="M760 552q58-21 104 1l-7 56q-55-19-104 0Z" fill="#D5D7C0" />
      <path
        d="M770 566h69m-69 12h53m-53 12h66"
        stroke="#8B9E97"
        strokeWidth="2"
      />
      <path d="M619 541l77 83" stroke={C.sun} strokeWidth="5" />
    </World>
  );
}
