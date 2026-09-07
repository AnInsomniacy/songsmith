import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Materials, Tree } from "./craft";
import { World } from "./shared";
export default function Windows(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <path d="M218 40H792V599H218ZM1128 40H1702V599H1128Z" fill="#365367" />
      {[0, 1].map((i) => (
        <g key={i}>
          <path
            d={`M${243 + i * 910} 77h520v485h-520Z`}
            fill={i ? "#D9B798" : "#789BA4"}
            opacity={i ? 0.3 + q * 0.4 : 0.6}
          />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <path
              key={j}
              d={`M${222 + i * 910} ${115 + j * 76}h567`}
              stroke={C.glass}
              opacity=".17"
            />
          ))}
          <path
            d={`M${300 + i * 910} 120h405v395h-405ZM${502 + i * 910} 120v395M${300 + i * 910} 318h405`}
            fill="none"
            stroke="#D0D7C8"
            strokeWidth="11"
          />
          <path
            d={`M${288 + i * 910} 518h431v26h-431Z`}
            fill={`url(#${id}-wood)`}
          />
          <path
            d={`M${307 + i * 910} 130h85q${wave(t, 8, i) * 12} 183 5 375h-90Z`}
            fill={C.white}
            opacity=".3"
          />
          <path d={`M${601 + i * 910} 491h38l-5 27h-28Z`} fill={C.coral} />
          <Tree x={620 + i * 910} y={493} s={0.23} t={t} color="#587B75" />
        </g>
      ))}
      <path d="M160 589H1760V624H160Z" fill="#253D4F" />
      <path
        d="M790 95Q950 157 1130 95"
        stroke={C.sun}
        strokeWidth="2"
        fill="none"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path
            d={`M${820 + i * 67} ${104 + Math.sin(i * 0.78) * 24}v20`}
            stroke="#809793"
          />
          <circle
            cx={820 + i * 67}
            cy={130 + Math.sin(i * 0.78) * 24}
            r="7"
            fill={C.sun}
            opacity={0.15 + q * 0.75}
          />
        </g>
      ))}
      <path
        d="M830 600v-180h30v180m190 0v-180h30v180"
        stroke={C.night}
        strokeWidth="5"
        fill="none"
      />
    </World>
  );
}
