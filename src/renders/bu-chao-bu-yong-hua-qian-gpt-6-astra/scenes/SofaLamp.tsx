import React from "react";
import {C} from "../design";
import {Bear, Lamp, Room, Shadow, Sofa} from "../objects";
import {ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const SofaLamp: React.FC<SceneClock> = (c) => {
  const slide = ramp(c.t, 0, 1.1);
  const light = ramp(c.t, 1.15, 1.6);
  return <>
    <Room id={c.scope} wall={C.lavender} floor={C.porcelain} horizon={742}/>
    <path d="M102 0 V742 H595" fill="none" stroke={C.cobalt} strokeWidth="24" opacity=".2"/>
    <Shadow x={1121} y={731} rx={380} ry={28}/>
    <Sofa x={1112} y={547} scale={1.03} color={C.cobalt} sink={slide * 12}/>
    <Bear x={1130 - slide * 74} y={375 + slide * 107} scale={.76} angle={slide * -69} color={C.yellow}/>
    <Lamp id={c.scope + "-reading"} x={1660} y={573} scale={1.1} aim={-17 - light * 31} glow={.22 + light * .25}/>
    <path d={"M1668 733 Q1740 " + (789 + wave(c.t, 8) * 13) + " 1919 706"} stroke={C.ink} strokeWidth="7" fill="none"/>
  </>;
};
