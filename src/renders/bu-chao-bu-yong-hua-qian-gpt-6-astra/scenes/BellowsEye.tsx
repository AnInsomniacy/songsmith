import React from "react";
import {C} from "../design";
import {Group, Plinth, Room, Shadow} from "../objects";
import {phase, strike, wave} from "../motion";
import type {SceneClock} from "../types";

export const BellowsEye: React.FC<SceneClock> = (c) => {
  const pump = strike(c, "怦");
  const open = phase(c, 1, 0, 1.2);
  const stretch = 1 + pump * .13;
  return <>
    <Room id={c.scope} floor={C.cobalt} horizon={922}/>
    <defs><linearGradient id={c.scope + "-beam"}><stop stopColor={C.yellow} stopOpacity=".5"/><stop offset="1" stopColor={C.yellow} stopOpacity="0"/></linearGradient></defs>
    <Plinth x={865} y={936} width={856} height={53} color={C.ink}/>
    <Shadow x={1310} y={935} rx={318} ry={24}/>
    <Group x={1290 + wave(c.t, 10) * 10} y={734}>
      <path d="M-309-115 L-320 172 H310 L327-115Z" fill={C.red}/>
      <g transform={"scale(" + stretch + " 1)"}>
        {Array.from({length: 12}, (_, i) => <g key={i}>
          <path d={"M" + (-255 + i * 44) + " -149 l22 24 V169 l-22 24Z"} fill={i % 2 ? C.red : C.lavender}/>
          <path d={"M" + (-233 + i * 44) + " -125 V170"} stroke={C.ink} strokeWidth="7" opacity=".35"/>
        </g>)}
      </g>
      <rect x="-356" y="-161" width="108" height="361" rx="23" fill={C.cobalt}/>
      <rect x="250" y="-161" width="108" height="361" rx="23" fill={C.cobalt}/>
      <path d={"M260-100 L" + (260 + open * 700) + " -310 V350 L260 120Z"} fill={"url(#" + c.scope + "-beam)"}/>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={278} y={-113 + i * 54} width={59} height={18 + open * 20} rx="5" fill={C.yellow} opacity={.24 + open * .76}/>)}
    </Group>
  </>;
};
