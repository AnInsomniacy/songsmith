import React from "react";
import {C} from "../design";
import {Bear, Group, Room, Shadow, Sofa} from "../objects";
import {hop, phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const SofaLowAngle: React.FC<SceneClock> = (c) => {
  const lie = ramp(c.t, 0, .85);
  const sing = phase(c, 1, 0, .75);
  const dance = wave(c.t - c.cues[1], 1.8) * sing;
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={985}/>
    <path d="M1470 534 L1830 1080 H1920 V518Z" fill={C.lavender} opacity=".13"/>
    <Shadow x={1228} y={1001} rx={556} ry={22}/>
    <Group x={1210} y={802 - hop(c.t - c.cues[1], .9) * sing * 12} angle={dance * 2}>
      <Sofa scale={1.49} color={C.lavender} liftLeft={dance * 13} liftRight={-dance * 13}/>
      <Bear x={-136 + lie * 48} y={-162 + lie * 79} scale={.81} angle={lie * 70} pose={.5} color={C.yellow}/>
      <Bear x={145} y={-98 - dance * 11} scale={.72} angle={-dance * 12} pose={sing} color={C.cobalt}/>
    </Group>
    <path d={"M0 1035 Q426 " + (991 + wave(c.t, 7) * 17) + " 698 1021"} stroke={C.yellow} strokeWidth="41" fill="none" opacity=".42"/>
  </>;
};
