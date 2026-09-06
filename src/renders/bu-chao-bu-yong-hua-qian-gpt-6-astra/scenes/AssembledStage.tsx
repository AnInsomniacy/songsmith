import React from "react";
import {C} from "../design";
import {Bear, Button, Chair, Chick, Group, Plinth, Room, Shoe} from "../objects";
import {hop, phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const AssembledStage: React.FC<SceneClock> = (c) => {
  const arrival = ramp(c.t, 0, 2);
  const show = phase(c, 1, 0, 1.4);
  const groove = Math.max(0, c.t - c.cues[1]) * show;
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={1030}/>
    <path d={"M642 1080 L" + (1056 + wave(c.t, 8) * 38) + " 578 L" + (1277 + wave(c.t, 8) * 38) + " 581 L1663 1080Z"} fill={C.lavender} opacity=".12"/>
    <Plinth x={642} y={978} width={1139} height={47} color={C.yellow} depth={50}/>
    <Plinth x={929} y={863} width={593} height={115} color={C.red} depth={35}/>
    <Button id={c.scope + "-stage-heart"} x={1258} y={759 - show * 83} radius={156} color={C.yellow} angle={show * 86 + wave(groove, 3) * 12}/>
    <Group x={(1 - arrival) * 263}>
      <Chair x={1572} y={856} scale={.65} angle={-9 + wave(groove, 2.2) * 7} open={.3 + arrival * .7} color={C.lavender}/>
      <Bear x={1076} y={866 - hop(groove, .7) * 39} scale={.57} pose={show} color={C.porcelain}/>
    </Group>
    <Shoe x={858 - (1 - arrival) * 393} y={923 - hop(groove, .7) * 22} scale={.77} angle={wave(groove, 1.4) * 14} color={C.porcelain}/>
    <Chick x={1714 - show * 56} y={915 - hop(groove, .7, 1.2) * show * 13} scale={.61} step={wave(groove, 1.4)}/>
  </>;
};
