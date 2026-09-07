import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import { F } from "../typography";
import {
  Backdrop,
  Floor,
  Knob,
  Materials,
  Screw,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const ValveAmplifier: React.FC<SceneProps> = (p) => {
  const { id, t, q } = clock(p);
  return (
    <>
      <Materials id={id} top="#446870" bottom="#739081" />
      <Backdrop id={id} />
      <Floor id={id} y={936} dark />
      <path
        d="M73 521H767V945H73Z"
        fill={url(id, "wood")}
        stroke={C.darkWood}
        strokeWidth="8"
      />
      <rect
        x="99"
        y="548"
        width="642"
        height="312"
        rx="11"
        fill={url(id, "mesh")}
        stroke="#D3BD8C"
        strokeWidth="5"
      />
      <circle
        cx="427"
        cy="704"
        r="132"
        fill="#193744"
        stroke="#526F6C"
        strokeWidth="9"
      />
      <circle
        cx="427"
        cy="704"
        r="96"
        fill="#345662"
        stroke="#172F3D"
        strokeWidth="13"
      />
      <circle cx="427" cy="704" r="38" fill="#93ACA5" />
      <path
        d="M59 466H778V550H59Z"
        fill={url(id, "metal")}
        stroke={C.ink}
        strokeWidth="6"
      />
      <path
        d="M118 263H675V477H118Z"
        fill={url(id, "green")}
        stroke={C.ink}
        strokeWidth="6"
      />
      {[182, 289, 396, 503, 610].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x - 33} 313V199Q${x} 141 ${x + 33} 199V313Z`}
            fill={url(id, "glass")}
            stroke="#B9CDC0"
            strokeWidth="3"
          />
          <ellipse
            cx={x}
            cy="252"
            rx="39"
            ry="73"
            fill={url(id, "bulb")}
            opacity={0.34 + q * 0.25}
          />
          <path
            d={`M${x - 13} 302V206H${x + 13}V302M${x - 9} 277l19-17-19-18 19-18`}
            stroke="#D8B777"
            strokeWidth="2"
            fill="none"
          />
          <path d={`M${x - 37} 303H${x + 37}V326H${x - 37}Z`} fill={C.ink} />
          <Knob
            id={id}
            x={x}
            y={396}
            r={27}
            angle={i === 2 ? -20 + q * 90 : 15 + i * 28}
          />
        </g>
      ))}
      <rect x="180" y="892" width="346" height="29" rx="5" fill={C.ink} />
      <text
        x="199"
        y="914"
        fontFamily={F.info}
        fontSize="19"
        letterSpacing="6"
        fill={C.mist}
      >
        MADE TO MAKE A SOUND
      </text>
      <path
        d="M646 435Q813 566 646 874T373 1029"
        stroke={C.deep}
        strokeWidth="8"
        fill="none"
      />
      {[99, 741].map((x) =>
        [573, 833].map((y) => <Screw key={`${x}-${y}`} x={x} y={y} r={6} />),
      )}
      <path
        d="M868 110H1832M863 978H1798"
        stroke="#D8DAC1"
        opacity=".15"
        strokeWidth="3"
      />
      <path
        d={`M72 ${65 + wave(t, 9) * 2}H763`}
        stroke="#ACC2AE"
        opacity=".18"
        strokeWidth="3"
      />
    </>
  );
};
