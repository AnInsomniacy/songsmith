import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Water, Clouds, Tree } from "./craft";
export default function SeaScene(p: SceneProps) {
  const { id, t } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Clouds t={t} />
      <circle cx="1140" cy="248" r="92" fill={C.sun} />
      <path
        d="M0 367Q280 274 521 382Q960 318 1300 392T1920 357V530H0Z"
        fill="#526877"
      />
      <Water id={id} t={t} y={399} />
      <path d="M0 444l95-67l160 31l67-19l209 172l70 105H0Z" fill="#254759" />
      <path
        d="M0 503l228-69l294 169"
        stroke="#648D91"
        fill="none"
        strokeWidth="3"
      />
      <path d="M282 505L819 501L858 548L331 558Z" fill={`url(#${id}-wood)`} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${336 + i * 82} 554v108`}
          stroke="#344B57"
          strokeWidth="9"
        />
      ))}
      <path d="M322 529h496" stroke={C.sun} opacity=".2" />
      <g transform={`translate(1535 ${450 + wave(t, 10) * 2})`}>
        <path d="M-53 0H66L31 25H-30Z" fill="#334C5B" />
        <path
          d="M3-119V1M3-114L-46-9H3M11-94L54-8H11"
          fill="#D9DAC5"
          stroke="#96AEAA"
          strokeWidth="2"
        />
      </g>
      <Tree x={70} y={650} s={1.13} t={t} color="#203F4E" />
      <path d="M1830 422v-69h23v69" fill="#809E9F" />
      <path d="M1824 352l17-22l18 22" fill={C.sun} />
    </World>
  );
}
