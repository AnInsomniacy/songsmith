import React from "react";
import { C, frameAt, lines, smooth, turn, wave } from "../design";
import {
  Backdrop,
  Floor,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const ToySession: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p),
    r = smooth((p.frame - frameAt(lines[34].startMs)) / 80);
  return (
    <>
      <Materials id={id} top="#456C71" bottom="#6D867C" />
      <Backdrop id={id} />
      <Floor id={id} y={968} dark />
      <path
        d="M77 927V439Q80 386 143 385H561Q623 389 623 451V927Z"
        fill={url(id, "green")}
        stroke={C.ink}
        strokeWidth="7"
      />
      <path
        d="M111 452Q107 420 147 420H552Q590 423 588 458V729H111Z"
        fill={url(id, "fabric")}
        stroke="#AFBC99"
        strokeWidth="2"
      />
      <path
        d="M87 735H607V817H87Z"
        fill="#4B8D7B"
        stroke="#235657"
        strokeWidth="5"
      />
      <path
        d="M75 835V990H107L125 835M578 835L595 990H622V835"
        fill={url(id, "wood")}
      />
      <path
        d="M40 746Q37 713 75 713H127V882H48ZM560 713H618Q655 722 646 753V882H578Z"
        fill={url(id, "green")}
        stroke={C.ink}
        strokeWidth="5"
      />
      <g transform="translate(356 791)">
        <path
          d="M-145-243H150V-204H-145Z"
          fill={url(id, "wood")}
          stroke={C.darkWood}
          strokeWidth="5"
        />
        <path
          d="M-119-206V-79M124-206V-79"
          stroke={C.darkWood}
          strokeWidth="16"
        />
        <path d="M-145-80H150V-44H-145Z" fill={url(id, "wood")} />
        <g transform={`rotate(${turn(t, 5)} -104 -273)`}>
          <circle
            cx="-104"
            cy="-273"
            r="30"
            fill={url(id, "brass")}
            stroke="#865F3A"
            strokeWidth="4"
          />
          <path
            d="M-130-273H-77M-104-299V-247"
            stroke="#6F563F"
            strokeWidth="6"
          />
        </g>
        <path
          d={`M-104 -273Q-2 ${-308 + q * 16} 132 -273`}
          stroke={C.ink}
          strokeWidth="4"
          fill="none"
        />
        <g
          transform={`translate(${-64 + wave(t, 4) * 4} -318) rotate(${wave(t, 4) * 2})`}
        >
          <ellipse
            rx="43"
            ry="36"
            fill={C.yellow}
            stroke="#BB8E44"
            strokeWidth="3"
          />
          <circle
            cx="25"
            cy="-34"
            r="31"
            fill="#F1C865"
            stroke="#BB8E44"
            strokeWidth="3"
          />
          <path d="M49-38l22 12-20 9" fill={C.coral} />
          <circle cx="32" cy="-39" r="3.5" fill={C.ink} />
          <path d="M-17 29v19m21-17v17" stroke={C.coral} strokeWidth="5" />
        </g>
        <g
          transform={`translate(75 ${-317 - q * 11}) rotate(${q * wave(t, 4) * 4})`}
        >
          <circle cx="-25" cy="-50" r="16" fill="#D2987F" />
          <circle cx="27" cy="-50" r="16" fill="#D2987F" />
          <rect
            x="-38"
            y="-56"
            width="77"
            height="57"
            rx="24"
            fill="#DEA889"
            stroke="#946C5B"
            strokeWidth="3"
          />
          <rect x="-28" y="2" width="56" height="66" rx="19" fill={C.coral} />
          <circle cx="-15" cy="-27" r="3.5" fill={C.ink} />
          <circle cx="16" cy="-27" r="3.5" fill={C.ink} />
          <path
            d="M-15 50v30m30-30v30"
            stroke="#D7977A"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M-110-274H-23V-260H-110M-96-260V-243M-36-260V-243"
          fill={url(id, "wood")}
          stroke={C.darkWood}
          strokeWidth="3"
        />
        <g transform={`translate(${r * 29 - 44} -113) rotate(${r * 9})`}>
          <ellipse
            rx="77"
            ry="36"
            fill="#CBB5C3"
            stroke="#846984"
            strokeWidth="3"
          />
          <circle cx="50" cy="-32" r="35" fill="#D3BDCA" />
          <path
            d="M29-59Q8-117 29-123Q50-108 46-65M55-64Q81-111 93-92Q92-66 72-56"
            fill="#D3BDCA"
            stroke="#846984"
            strokeWidth="2.5"
          />
          <path d="M43-36l12 1m9 0 12-1" stroke={C.ink} strokeWidth="3" />
          <path
            d="M-78-8l-16 29m65 7-7 12"
            stroke="#B496B2"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </g>
        <Screw x={-123} y={-225} />
        <Screw x={123} y={-225} />
      </g>
      <path
        d="M120 181H573V281H120Z"
        fill={C.ink}
        stroke="#9FAE95"
        strokeWidth="3"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path
          key={i}
          d={`M${143 + i * 47} 207V253`}
          stroke={[C.mist, C.coral, C.yellow][i % 3]}
          strokeWidth="25"
        />
      ))}
      <path
        d="M703 91H1838M709 1000H1805"
        stroke="#B9C8B7"
        opacity=".16"
        strokeWidth="3"
      />
    </>
  );
};
