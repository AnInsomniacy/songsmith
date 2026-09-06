import React from "react";
import {C} from "../design";
import {Button, Curtain, Plinth, Room, Shadow} from "../objects";
import {phase, ramp, strike, wave} from "../motion";
import type {SceneClock} from "../types";

export const ButtonPortal: React.FC<SceneClock> = (c) => {
  const greet = ramp(c.t, 0, 1.3);
  const open = phase(c, 1, 0, 1.7);
  const tap = strike(c, "叩");
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.lavender} horizon={792}/>
    <path d="M1031 753 V391 A383 383 0 0 1 1797 391 V753Z" fill={C.ink}/>
    <path d="M1013 754 V391 A401 401 0 0 1 1815 391 V754" fill="none" stroke={C.porcelain} strokeWidth="17" opacity=".65"/>
    <Curtain x={1044} y={75} width={336} height={650} color={C.red} pull={open}/>
    <g transform="translate(1784 0) scale(-1 1)"><Curtain x={0} y={75} width={336} height={650} color={C.red} pull={open}/></g>
    <Plinth x={1017} y={731} width={779} height={49} color={C.yellow} depth={0}/>
    <Shadow x={1420} y={726} rx={238} ry={24}/>
    <Button id={c.scope + "-portal"} x={1417 + wave(c.t, 10) * 11} y={401 - open * 63 - tap * 14} radius={245} color={C.lavender} angle={-18 + greet * 24 + open * 76 + tap * 5}/>
    <path d="M1700 785 L1920 866" stroke={C.yellow} strokeWidth="64" opacity=".48"/>
  </>;
};
