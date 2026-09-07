import React from "react";
import { C, turn, wave } from "../design";
import {
  Backdrop,
  Materials,
  Plant,
  Screw,
  Tiles,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const StreetPercussion: React.FC<SceneProps> = (p) => {
  const { id, t } = clock(p);
  const crank = {
    x: 527 + 39 * Math.cos(t * Math.PI),
    y: 688 + 39 * Math.sin(t * Math.PI),
  };
  return (
    <>
      <Materials id={id} top="#7DADA7" bottom="#C2C4A7" />
      <Backdrop id={id} />
      <Tiles x={0} y={157} w={1920} h={650} size={114} color="#9BAF94" />
      <path
        d="M88 979L508 834L1723 852L1878 995L1138 1080H318Z"
        fill={C.deep}
        opacity=".16"
      />
      <path d="M115 40H1805V133H115Z" fill={C.red} />
      <path
        d="M128 61H1791M128 82H1791M128 103H1791"
        stroke="#EAAB80"
        opacity=".38"
        strokeWidth="3"
      />
      <path
        d="M228 1000V332Q225 286 275 286H1692Q1738 286 1738 338V1000"
        fill="none"
        stroke={C.ink}
        strokeWidth="21"
      />
      <path
        d="M228 1000V332Q225 286 275 286H1692Q1738 286 1738 338V1000"
        fill="none"
        stroke={url(id, "metal-line")}
        strokeWidth="13"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g
          key={i}
          transform={`rotate(${wave(t, 4.4, i * 0.5) * 2} ${836 + i * 98} 288)`}
        >
          <path
            d={`M${836 + i * 98} 294V386`}
            stroke="#425C5D"
            strokeWidth="3"
          />
          <rect
            x={810 + i * 98}
            y="379"
            width="50"
            height={142 + i * 31}
            rx="16"
            fill={url(id, "metal")}
            stroke="#4B6C6A"
            strokeWidth="3"
          />
          <ellipse cx={835 + i * 98} cy="388" rx="19" ry="6" fill="#40656A" />
          <path
            d={`M${823 + i * 98} 402v${107 + i * 31}`}
            stroke={C.paper}
            opacity=".45"
            strokeWidth="2"
          />
        </g>
      ))}
      <path
        d="M286 725H1910V988H286Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="7"
      />
      <g transform="translate(946 730)">
        <path
          d="M-141 0V189Q0 258 141 189V0Z"
          fill={url(id, "red")}
          stroke="#893D37"
          strokeWidth="5"
        />
        <ellipse
          rx="143"
          ry="49"
          fill="#E3C28D"
          stroke="#73493C"
          strokeWidth="8"
        />
        <ellipse
          rx="125"
          ry="35"
          fill="#E7D7B5"
          stroke="#C4AA7C"
          strokeWidth="3"
        />
        {[-122, -72, 0, 72, 122].map((x) => (
          <path
            key={x}
            d={`M${x} 35V201`}
            stroke={url(id, "metal-line")}
            strokeWidth="7"
          />
        ))}
        <path
          d="M-130 174Q0 230 130 174"
          stroke="#E6AD7D"
          strokeWidth="8"
          fill="none"
        />
      </g>
      <g transform="translate(1488 791)">
        <path
          d="M-110 0V118Q0 167 110 118V0Z"
          fill={url(id, "metal")}
          stroke={C.ink}
          strokeWidth="4"
        />
        <ellipse
          rx="111"
          ry="36"
          fill="#D7D7B6"
          stroke={C.ink}
          strokeWidth="6"
        />
        <ellipse rx="91" ry="25" fill="#C6C7A8" />
        {[-93, -47, 47, 93].map((x) => (
          <path key={x} d={`M${x} 29V126`} stroke="#6A8381" strokeWidth="5" />
        ))}
      </g>
      <g transform="translate(527 688)">
        <rect
          x="-145"
          y="-118"
          width="220"
          height="235"
          rx="28"
          fill={C.green}
          stroke={C.ink}
          strokeWidth="6"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-126 ${-93 + i * 26}h39`}
            stroke="#8DB39F"
            strokeWidth="4"
          />
        ))}
        <circle
          r="83"
          fill={url(id, "brass")}
          stroke="#86663F"
          strokeWidth="7"
        />
        <g transform={`rotate(${turn(t, 2)})`}>
          <path d="M-65 0H65M0-65V65" stroke="#74583C" strokeWidth="11" />
          <circle cx="39" r="10" fill={C.paper} />
        </g>
        <circle r="17" fill={url(id, "metal")} />
      </g>
      <path
        d={`M${crank.x} ${crank.y}L805 ${609 + wave(t, 2) * 15}`}
        stroke={C.ink}
        strokeWidth="12"
        fill="none"
      />
      <path
        d={`M${crank.x} ${crank.y}L805 ${609 + wave(t, 2) * 15}`}
        stroke={url(id, "metal-line")}
        strokeWidth="7"
        fill="none"
      />
      <g transform={`rotate(${wave(t, 2) * 9} 805 609)`}>
        <path
          d="M797 618L965 657"
          stroke={C.darkWood}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <ellipse
          cx="971"
          cy="660"
          rx="24"
          ry="17"
          fill={C.yellow}
          stroke="#A28244"
          strokeWidth="3"
        />
      </g>
      <path d="M805 610V940" stroke={C.ink} strokeWidth="9" />
      <Screw x={805} y={609} r={11} />
      <g transform={`rotate(${wave(t, 2, 0.9) * 7} 1354 586)`}>
        <path
          d="M1354 586L1500 733"
          stroke={C.darkWood}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <ellipse cx="1507" cy="741" rx="20" ry="15" fill={C.yellow} />
      </g>
      <path d="M1354 586V959" stroke={C.ink} strokeWidth="8" />
      <Screw x={1354} y={586} r={8} />
      <Plant x={127} y={1014} s={1.1} t={t} />
    </>
  );
};
