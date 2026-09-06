import React from "react";
import {C} from "../design";
import {Chair, Hat, Plinth, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const ChairBow: React.FC<SceneClock> = (c) => {
  const bow = ramp(c.t, .1, .65);
  const recover = phase(c, 1, 0, .85);
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={997}/>
    <path d="M1270 570 L789 1030 H1835 L1437 570Z" fill={C.lavender} opacity=".16"/>
    <Plinth x={1012} y={979} width={718} height={35} color={C.red}/>
    <Shadow x={1357} y={976} rx={221} ry={24}/>
    <Chair x={1351} y={748 + bow * (1 - recover) * 12} scale={1.17} angle={bow * 22 - recover * 22} open={.97} color={C.lavender}/>
    <Hat x={1590 - recover * 213} y={578 + recover * 155 - Math.sin(recover * Math.PI) * 78} scale={.64} angle={-18 + recover * 25} color={C.yellow}/>
    <path d={"M1817 610 Q" + (1870 + wave(c.t, 7) * 12) + " 797 1796 1080"} stroke={C.porcelain} strokeWidth="37" opacity=".1" fill="none"/>
  </>;
};
