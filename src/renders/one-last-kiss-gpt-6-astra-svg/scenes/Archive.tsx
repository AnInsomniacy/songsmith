import { C, type SceneProps } from "../design";
import { World } from "./shared";
import { Materials, Parquet, Book } from "./craft";
export default function Archive(p: SceneProps) {
  const { id, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Parquet id={id} y={866} />
      <path d="M1160 144H1788V840H1160Z" fill={`url(#${id}-wood)`} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="1190"
            y={173 + i * 157}
            width="565"
            height="136"
            fill="#465F67"
            stroke="#ABB8AD"
            strokeWidth="2"
          />
          <path
            d={`M1200 ${187 + i * 157}H1744`}
            stroke={C.glass}
            opacity=".28"
          />
          <rect
            x="1410"
            y={211 + i * 157}
            width="130"
            height="40"
            rx="3"
            fill={`url(#${id}-brass)`}
          />
          <rect
            x="1420"
            y={220 + i * 157}
            width="110"
            height="22"
            fill="#D2D7C5"
          />
          <path d={`M1440 ${230 + i * 157}h60`} stroke="#627577" opacity=".5" />
          <path
            d={`M1375 ${271 + i * 157}q100 22 200 0`}
            stroke={`url(#${id}-metal)`}
            strokeWidth="7"
            fill="none"
          />
        </g>
      ))}
      <Book x={1240} y={110} w={195} color="#A17A78" />
      <Book x={1293} y={87} w={187} color="#4C777A" angle={3} />
      <g transform={`translate(1250 ${700 - q * 98})`}>
        <path d="M0 0l380-25l30 75l-368 31Z" fill="#E5DBC4" />
        <path d="M18 8l335-20l13 49l-320 27Z" fill="#A8C5BF" />
        <path
          d="M37 53q109-73 297-30"
          stroke="#789D97"
          strokeWidth="15"
          fill="none"
        />
        <circle cx="300" cy="10" r="10" fill={C.sun} />
        <path d="M335-12l18-2l12 49l-19 2Z" fill={C.coral} opacity=".6" />
      </g>
      <path d="M1145 845h657v32h-657" fill="#4E626A" />
    </World>
  );
}
