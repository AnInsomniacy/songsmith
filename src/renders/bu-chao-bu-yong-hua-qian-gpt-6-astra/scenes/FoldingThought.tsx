import React from "react";
import {C} from "../design";
import {Chair, Group, Plinth, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const FoldingThought: React.FC<SceneClock> = (c) => {
  const thought = ramp(c.t, 0, 1.6);
  const seat = phase(c, 1, .05, 1.25);
  return <>
    <Room id={c.scope} wall={C.lavender} floor={C.porcelain} horizon={909}/>
    <path d="M1640 0 L1880 1080" stroke={C.cobalt} strokeWidth="250" opacity=".16"/>
    <Group x={wave(c.t, 9) * 18}>
      <Plinth x={929} y={943} width={656} height={47} color={C.yellow}/>
      <Shadow x={1240} y={940} rx={210} ry={22}/>
      <Chair x={1240} y={720} scale={1.22} angle={-20 + thought * 10 + seat * 10} open={thought * .24 + seat * .76} color={C.red}/>
    </Group>
    <path d={"M1630 891 Q1770 " + (823 + wave(c.t, 6) * 23) + " 1920 888"} fill="none" stroke={C.ink} strokeWidth="13" opacity=".3"/>
  </>;
};
