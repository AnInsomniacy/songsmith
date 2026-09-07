import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Tree } from "./craft";
export default function Sundial(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M0 526Q329 433 753 536V1080H0Z" fill="#AABCB2" />
      <path d="M0 681Q370 559 759 674V1080H0Z" fill="#D0CCB7" />
      <Tree x={68} y={691} s={1.45} t={t} color="#729387" />
      <Tree x={671} y={630} s={0.9} t={t} color="#8BA394" />
      <path d="M0 535H724M0 559H724" stroke="#CCD3C0" strokeWidth="10" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M${25 + i * 98} 526v135`}
          stroke="#BCC7B5"
          strokeWidth="12"
        />
      ))}
      <path d="M271 759h241l-29 49H300Z" fill="#B0B7A6" />
      <path d="M314 802h157v120H314Z" fill={`url(#${id}-ceramic)`} />
      <path
        d="M314 819h157m-145 8v85m22-85v85m22-85v85m22-85v85m22-85v85m22-85v85"
        stroke="#8B9F98"
        strokeWidth="3"
      />
      <path d="M291 922h201l29 28H262Z" fill="#A6B1A1" />
      <ellipse cx="393" cy="715" rx="237" ry="85" fill="#B4BDAA" />
      <ellipse cx="393" cy="701" rx="242" ry="79" fill={`url(#${id}-brass)`} />
      <ellipse
        cx="393"
        cy="701"
        rx="219"
        ry="65"
        fill="none"
        stroke="#8C795F"
        strokeWidth="2"
      />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * Math.PI) / 12;
        return (
          <path
            key={i}
            d={`M${393 + 195 * Math.cos(a)} ${701 + 55 * Math.sin(a)}l${15 * Math.cos(a)} ${5 * Math.sin(a)}`}
            stroke="#596B68"
            strokeWidth={i % 2 ? 1 : 2}
          />
        );
      })}
      <path
        d={`M394 700L${559 + q * 43 + wave(t, 15) * 4} 732L428 723Z`}
        fill="#6E746B"
        opacity=".55"
      />
      <path
        d="M393 700V454L456 712Z"
        fill="#698989"
        stroke="#B6BEA7"
        strokeWidth="2"
      />
      <path
        d="M162 930q22-30 40-18q-9 22-40 18m406-100q28-43 60-25q-15 28-60 25"
        fill={C.coral}
        opacity=".65"
      />
      <path
        d="M82 834q235 36 514 197"
        stroke="#9FB09E"
        strokeWidth="3"
        opacity=".6"
        fill="none"
      />
    </World>
  );
}
