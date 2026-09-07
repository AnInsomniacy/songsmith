import React from "react";
import { C, F, wave } from "../design";
import {
  Backdrop,
  Floor,
  Materials,
  Plant,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const SignPainter: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#C1D1C5" bottom="#BCA889" />
      <Backdrop id={id} />
      <Floor id={id} y={936} />
      <path
        d="M163 961L329 191M661 961L509 191M301 330H532M236 633H594M196 810H630"
        stroke={C.darkWood}
        fill="none"
        strokeWidth="20"
      />
      <g>
        <rect
          x="91"
          y="261"
          width="656"
          height="448"
          rx="8"
          fill={url(id, "wood")}
          stroke={C.darkWood}
          strokeWidth="7"
        />
        <rect x="116" y="286" width="606" height="399" rx="5" fill={C.green} />
        <rect
          x="132"
          y="301"
          width="574"
          height="369"
          rx="4"
          fill="none"
          stroke={C.yellow}
          strokeWidth="3"
        />
        <defs>
          <clipPath id={`${id}-lettering`}>
            <rect x="137" y="310" width={251 + q * 320} height="350" />
          </clipPath>
        </defs>
        <g clipPath={url(id, "lettering")}>
          <text
            x="169"
            y="475"
            fontFamily={F.en}
            fontWeight="600"
            fontSize="121"
            fill={C.paper}
          >
            OWN YOUR
          </text>
          <text
            x="172"
            y="625"
            fontFamily={F.en}
            fontWeight="600"
            fontSize="137"
            fill={C.yellow}
          >
            GROOVE
          </text>
        </g>
        <path d="M149 651H682" stroke={C.paper} opacity=".2" strokeWidth="2" />
      </g>
      <path
        d="M111 248V211H730V248M111 715V746H730V715"
        fill="none"
        stroke={C.ink}
        strokeWidth="12"
      />
      <path
        d="M115 212H725M115 746H725"
        stroke={url(id, "metal-line")}
        strokeWidth="5"
      />
      <g transform={`translate(${388 + q * 320} 212)`}>
        <rect
          x="-19"
          y="-15"
          width="38"
          height="31"
          rx="6"
          fill={C.green}
          stroke={C.ink}
          strokeWidth="3"
        />
        <path d="M0 15V533" stroke={url(id, "metal-line")} strokeWidth="9" />
        <rect
          x="-9"
          y="105"
          width="18"
          height="341"
          rx="8"
          fill={C.yellow}
          stroke="#AE8C45"
          strokeWidth="3"
        />
        <rect
          x="-18"
          y="520"
          width="36"
          height="29"
          rx="6"
          fill={C.green}
          stroke={C.ink}
          strokeWidth="3"
        />
      </g>
      <path d="M62 975H712V1010H62Z" fill={url(id, "wood")} />
      {[188, 339, 496].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x - 49} 889H${x + 49}V971Q${x} 988 ${x - 49} 971Z`}
            fill={[C.red, C.green, C.yellow][i]}
            stroke={C.ink}
            strokeWidth="3"
          />
          <ellipse cx={x} cy="889" rx="49" ry="12" fill={C.paper} />
          <ellipse
            cx={x}
            cy="891"
            rx="39"
            ry="7"
            fill={[C.red, C.green, C.yellow][i]}
          />
          <path
            d={`M${x - 42} 907Q${x - 93} 938 ${x - 37} 962`}
            fill="none"
            stroke={url(id, "metal-line")}
            strokeWidth="4"
          />
        </g>
      ))}
      <Plant x={738} y={975} s={0.5} t={t} />
      <path
        d={`M-10 115Q375 ${68 + wave(t, 9) * 3} 768 115`}
        stroke="#7E9F93"
        opacity=".4"
        strokeWidth="3"
        fill="none"
      />
    </>
  );
};
