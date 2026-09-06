import React from "react";
import {C} from "../design";
import {Button, Curtain, Group, Plinth, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const CuffUnlock: React.FC<SceneClock> = (c) => {
  const tug = ramp(c.t, .1, 1.5);
  const unlock = phase(c, 1, 0, 1.2);
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={594}/>
    <Plinth x={625} y={558} width={1093} height={43} color={C.lavender}/>
    <Shadow x={1230} y={545} rx={359} ry={26}/>
    <Group x={1240 + wave(c.t, 10) * 15} y={299}>
      <path d={"M-630-103 H" + (-80 - tug * 52 - unlock * 135) + " Q" + (85 - tug * 52 - unlock * 135) + " 0 " + (-80 - tug * 52 - unlock * 135) + " 137 H-630Z"} fill={C.lavender}/>
      <path d={"M620-103 H" + (95 + tug * 44 + unlock * 131) + " Q" + (-70 + tug * 44 + unlock * 131) + " 0 " + (95 + tug * 44 + unlock * 131) + " 137 H620Z"} fill={C.lavender}/>
      <path d={"M-592-78 H" + (-92 - tug * 52 - unlock * 135) + " M-592 112 H" + (-92 - tug * 52 - unlock * 135)} stroke={C.porcelain} strokeWidth="4" strokeDasharray="11 10" fill="none"/>
      <Curtain x={-180 - unlock * 245} y={20} width={174} height={215} color={C.red} pull={unlock}/>
      <Curtain x={134 + unlock * 245} y={20} width={174} height={215} color={C.red} pull={unlock}/>
      <Button id={c.scope + "-lock"} x={unlock * 9} y={-unlock * 60} radius={132} color={C.yellow} angle={unlock * 180 + wave(c.t, 7) * 5}/>
    </Group>
  </>;
};
