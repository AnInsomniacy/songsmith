import React from "react";
import {C} from "../design";
import {Glove, Group, Room, Shoe} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const LeftGlove: React.FC<SceneClock> = (c) => {
  const lefts = c.units.filter((u) => u.text === "左").slice(0, 4);
  const reach = lefts.reduce((n, u) => n + ramp(c.t, u.at, .18), 0) / 4;
  const road = phase(c, 1, 0, 1.7);
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={584}/>
    <path d="M1750-40 L1778 636" stroke={C.porcelain} strokeWidth="90" opacity=".12"/>
    <path d={"M1920 300 H" + (1340 - reach * 390) + " Q" + (1200 - reach * 300) + " 300 " + (1190 - reach * 370) + " 399 V496"} stroke={C.lavender} strokeWidth="144" fill="none"/>
    <Glove x={1280 - reach * 410} y={319} angle={-90} scale={1.04}/>
    <Group y={wave(c.t, 8) * 7}>
      <path d={"M1920 577 H" + (1830 - road * 1630) + " L" + (1760 - road * 1630) + " 623 H1920Z"} fill={C.yellow}/>
      <path d={"M1920 592 H" + (1820 - road * 1620)} stroke={C.ink} strokeWidth="4" opacity=".3"/>
      <Shoe x={1760 - road * 510} y={540 - Math.sin(road * Math.PI) * 52} scale={.73} angle={-road * 8} color={C.red}/>
    </Group>
  </>;
};
