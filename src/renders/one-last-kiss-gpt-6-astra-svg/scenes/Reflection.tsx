import { C, type SceneProps, wave } from "../design";
import { World } from "./shared";
import { Materials, Moulding, Landscape, Book } from "./craft";
export default function Reflection(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M0 726H739V1080H0Z" fill={`url(#${id}-wood)`} />
      <Moulding x={135} y={103} w={479} h={579} id={id} />
      <Landscape x={165} y={133} w={419} h={519} id={id} t={t} />
      <path
        d="M166 149l418 342v61L166 220Z"
        fill={C.white}
        opacity={0.05 + q * 0.06}
      />
      <path d="M0 739H738M0 764H738" stroke={C.sun} opacity=".2" />
      <g transform="translate(357 786)">
        <ellipse rx="288" ry="55" fill="#748F94" />
        <ellipse rx="270" ry="43" fill="#C1D5C9" />
        <ellipse rx="255" ry="35" fill="#658F95" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${-170 + i * 8 + wave(t, 8, i) * 7} ${-19 + i * 7}h${260 - i * 12}`}
            stroke={i % 2 ? C.sun : C.glass}
            strokeWidth="2"
            opacity=".5"
          />
        ))}
      </g>
      <Book x={62} y={835} w={137} color="#AC7F7B" angle={-11} />
      <path
        d="M627 801v100q-35 22-69 0V801Z"
        fill={`url(#${id}-glass)`}
        stroke="#B7C7BD"
      />
      <path
        d="M583 801q18-55 58-76"
        stroke="#608C83"
        fill="none"
        strokeWidth="3"
      />
      <path d="M620 750q-41-44-14-55q35 7 14 55" fill="#83A796" />
    </World>
  );
}
