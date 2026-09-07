import React from "react";
import { C, wave } from "../design";
import {
  Backdrop,
  Materials,
  Plant,
  Speaker,
  Knob,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const ListeningWindow: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#C9DECE" bottom="#DFDEC3" />
      <Backdrop id={id} />
      <path
        d="M1018 78H1844V902H1018Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="9"
      />
      <path d="M1042 103H1817V799H1042Z" fill="#1D4650" />
      <path d="M1080 140H1775V570H1080Z" fill="#447776" />
      <path
        d="M1095 154L1449 155L1122 569H1095ZM1572 154H1670L1343 569H1239Z"
        fill="#D0DEC7"
        opacity=".1"
      />
      <path d="M1440 106V570M1043 568H1816" stroke="#A4B7A3" strokeWidth="10" />
      <path
        d="M1160 251L1420 202L1548 491L1285 542Z"
        fill={C.coral}
        stroke={C.red}
        strokeWidth="4"
      />
      <g transform={`translate(${q * 44} ${-q * 19})`}>
        <Vinyl x={1501} y={335} r={148} t={t * 0.6} color={C.mist} />
      </g>
      <path d="M1211 354l171-35 68 142-176 34Z" fill={C.paper} />
      <path
        d="M1266 444l34-58 58 38 26-28"
        fill="none"
        stroke={C.red}
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <rect
        x="1135"
        y="603"
        width="493"
        height="143"
        rx="12"
        fill={url(id, "metal")}
        stroke={C.ink}
        strokeWidth="5"
      />
      <rect
        x="1154"
        y="622"
        width="248"
        height="86"
        rx="6"
        fill={url(id, "mesh")}
      />
      <Knob id={id} x={1473} y={663} r={35} angle={-20 + q * 45} />
      <Knob id={id} x={1560} y={663} r={24} />
      <path d="M1442 719H1581" stroke={C.ink} strokeWidth="4" />
      <Speaker id={id} x={1664} y={588} w={120} h={189} />
      <rect
        x="1044"
        y="106"
        width="771"
        height="667"
        fill={url(id, "glass")}
        opacity=".36"
      />
      <path
        d={`M${1087 + q * 92} 117l108 0-286 666h-51Z`}
        fill={C.paper}
        opacity=".09"
      />
      <rect x="1000" y="785" width="862" height="41" fill={C.darkWood} />
      <rect x="1018" y="826" width="827" height="75" fill={C.green} />
      <path d="M1000 901H1868V939H977V923Z" fill="#9BAD9B" />
      <path d="M0 953H1920V1080H0Z" fill="#8FA89F" />
      <path
        d="M58 1002H1810M284 953L103 1080M974 953L913 1080M1518 953L1655 1080"
        stroke="#D0D5BB"
        opacity=".42"
        strokeWidth="3"
      />
      <Plant x={1747} y={986} s={0.87} t={t} />
      <path
        d={`M783 0Q${744 + wave(t, 7) * 4} 280 800 381`}
        stroke={C.ink}
        fill="none"
        strokeWidth="4"
      />
      <path
        d="M752 377h95v74h-95Z"
        fill={C.yellow}
        stroke={C.ink}
        strokeWidth="3"
      />
      <path
        d="M764 390h68M764 405h68M764 420h37"
        stroke={C.ink}
        opacity=".35"
        strokeWidth="3"
      />
    </>
  );
};
