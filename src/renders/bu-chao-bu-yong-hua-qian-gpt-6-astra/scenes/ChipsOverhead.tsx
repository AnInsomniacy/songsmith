import React from "react";
import {C} from "../design";
import {Bear, Group, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const ChipsOverhead: React.FC<SceneClock> = (c) => {
  const roll = ramp(c.t, 0, 1.4);
  const catchIt = phase(c, 1, 0, .9);
  return <>
    <Room id={c.scope} wall={C.porcelain} floor={C.yellow} horizon={602}/>
    <Group x={1139 + wave(c.t, 8) * 11} y={305} angle={-9}>
      <Shadow x={0} y={245} rx={477} ry={27}/>
      <rect x="-460" y="-205" width="920" height="430" rx="102" fill={C.red}/>
      <rect x="-388" y="-152" width="328" height="322" rx="58" fill={C.lavender} transform={"translate(" + (-catchIt * 38) + " 0)"}/>
      <rect x="61" y="-152" width="328" height="322" rx="58" fill={C.lavender} transform={"translate(" + (catchIt * 38) + " 0)"}/>
      <g transform={"translate(" + (25 - catchIt * 22) + " 15) rotate(" + (roll * 19 - catchIt * 15) + ")"}>
        <ellipse rx="196" ry="111" fill={C.ink} opacity=".25" cy="9"/>
        <ellipse rx="196" ry="111" fill={C.porcelain}/>
        <ellipse rx="173" ry="91" fill="none" stroke={C.cobalt} strokeWidth="6"/>
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d="M-23-14 Q-13-49 26-22 Q38 3 6 27 Q-22 26-23-14Z" transform={"translate(" + (Math.cos(i * 1.4 + roll) * 118) + " " + (Math.sin(i * 1.4 + roll) * 52) + ") rotate(" + i * 42 + ")"} fill={C.yellow} stroke={C.ink} strokeWidth="2"/>)}
      </g>
      <Bear x={323 - catchIt * 51} y={-54} scale={.82} angle={-45} pose={catchIt} color={C.cobalt}/>
    </Group>
  </>;
};
