import React from "react";
import {C} from "../design";
import {Curtain, Group, Lamp, Room, Shadow, Sofa} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const SofaCurtain: React.FC<SceneClock> = (c) => {
  const arrive = ramp(c.t, 0, .9);
  const close = phase(c, 1, 0, 1.05);
  return <>
    <Room id={c.scope} floor={C.lavender} horizon={588}/>
    <path d="M697 557 L1108 147 H1475 L1887 557Z" fill={C.cobalt} opacity=".15"/>
    <Shadow x={1263} y={555} rx={372} ry={23}/>
    <Group x={1261 + (1 - arrive) * 100} y={393 - arrive * 30} scale={.91} angle={-9 + arrive * 9}>
      <Sofa color={C.red}/>
    </Group>
    <Lamp id={c.scope + "-exit"} x={1720} y={463} scale={.63} aim={-20 - close * 25} glow={.28}/>
    <Curtain x={555 - close * 87} y={0} width={187 + close * 86} height={537} color={C.cobalt}/>
    <g transform={"translate(" + (1888 + close * 88 + wave(c.t, 8) * 5) + " 0) scale(-1 1)"}><Curtain x={0} y={0} width={184 + close * 74} height={537} color={C.cobalt}/></g>
  </>;
};
