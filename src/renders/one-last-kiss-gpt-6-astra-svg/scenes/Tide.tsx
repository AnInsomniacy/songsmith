import { type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials } from "./craft";
export default function Tide(p: SceneProps) {
  const { id, t, q } = p;
  const d = wave(t, 12) * 15;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M0 0H1920V1080H0Z" fill="#ADCAC4" />
      <path d="M0 0H438Q730 380 538 1080H0Z" fill="#DBD0B8" />
      <path
        d={`M434 0Q${730 + d} 390 ${535 + d} 1080`}
        stroke="#EDF0D8"
        strokeWidth="20"
        fill="none"
        opacity=".7"
      />
      <path
        d={`M476 0Q${800 + d} 460 ${588 + d} 1080`}
        stroke="#D1E1CD"
        strokeWidth="5"
        fill="none"
      />
      {Array.from({ length: 15 }, (_, i) => (
        <path
          key={i}
          d={`M${570 + i * 47} 0Q${870 + i * 32 + d} 450 ${685 + i * 50} 1080`}
          fill="none"
          stroke={i % 3 ? "#7FAAA5" : "#DCE5CF"}
          opacity=".24"
          strokeWidth={i % 3 ? 1 : 2}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g
          key={i}
          transform={`translate(${214 + i * 32} ${154 + i * 128}) rotate(17)`}
          opacity={i > 3 ? 0.3 - q * 0.14 : 0.32}
        >
          <ellipse
            cx={i % 2 ? 28 : -13}
            cy="0"
            rx="14"
            ry="27"
            fill="#8C9E91"
          />
          <ellipse
            cx={i % 2 ? 24 : -17}
            cy="37"
            rx="11"
            ry="12"
            fill="#8C9E91"
          />
        </g>
      ))}
      <g transform="translate(111 744) rotate(-13)">
        <path
          d="M0 0Q131-66 316-34Q240 44 47 58Z"
          fill={`url(#${id}-wood)`}
          stroke="#60776F"
          strokeWidth="5"
        />
        <path d="M27 7Q151-41 274-26Q187 21 58 39Z" fill="#405D61" />
        <path
          d="M93-2l25 39m51-54l17 37m39-47l16 28"
          stroke="#A6B29F"
          strokeWidth="11"
        />
        <path d="M67-68L192 79" stroke="#8D8E77" strokeWidth="8" />
        <path d="M175 60l28 32l-10 14l-31-34Z" fill="#B3AD91" />
      </g>
      <path
        d="M101 273l-37 131m10-64l36-38m-34 11l-37-23"
        stroke="#9E9E89"
        strokeWidth="5"
        fill="none"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${50 + i * 62} ${908 + (i % 3) * 39}q12-15 24 0q-9 11-24 0`}
          fill="#A9B4A0"
          opacity=".7"
        />
      ))}
    </World>
  );
}
