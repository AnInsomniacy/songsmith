import React from "react";
import {C} from "../design";
import {Bear, Chick, Room, Shadow, Sofa} from "../objects";
import {hop, phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const ChickOnSofa: React.FC<SceneClock> = (c) => {
  const walk = ramp(c.t, 0, 1.75);
  const sit = phase(c, 1, 0, .8);
  return <>
    <Room id={c.scope} wall={C.lavender} floor={C.porcelain} horizon={588}/>
    <rect x="288" y="60" width="267" height="427" rx="126" fill={C.cobalt} opacity=".18"/>
    <Shadow x={1186} y={587} rx={459} ry={29}/>
    <Sofa x={1190 + wave(c.t, 8) * 7} y={365} scale={1.26} color={C.red} sink={sit * 17} liftRight={sit * 16}/>
    <Chick x={831 + walk * 268} y={102 - hop(c.t, .325) * 10 * (1 - walk)} scale={.7} step={wave(c.t, .65)}/>
    <g transform="translate(1132 111) rotate(-14)">
      {[0, 1, 2].map((i) => <path key={i} d={"M" + i * 21 + " 0 q-19-28 10-40 q22 3 20 32Z"} fill={C.yellow} stroke={C.ink} strokeWidth="2"/>)}
    </g>
    <Bear x={1356} y={227 + sit * 81} scale={.85} angle={-12 + sit * 20} pose={1 - sit} color={C.cobalt}/>
  </>;
};
