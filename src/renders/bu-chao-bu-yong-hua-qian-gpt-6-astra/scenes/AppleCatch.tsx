import React from "react";
import {C} from "../design";
import {Apple, Glove, Lamp, Plinth, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const AppleCatch: React.FC<SceneClock> = (c) => {
  const flash = ramp(c.t, .25, .85);
  const catchIt = phase(c, 1, 0, 1.25);
  const x = 1465 - catchIt * 149;
  const y = 237 + catchIt * 264;
  return <>
    <Room id={c.scope} floor={C.lavender} horizon={719}/>
    <path d="M1440 0 V161" fill="none" stroke={C.ink} strokeWidth="5"/>
    <Plinth x={1052} y={681} width={695} height={53} color={C.yellow}/>
    <Lamp id={c.scope + "-lamp"} x={1710} y={532} scale={.79} aim={28 - flash * 38} glow={.24 + flash * .26}/>
    <Shadow x={1316} y={666} rx={165} ry={20}/>
    <Glove x={1285} y={549} scale={.88} angle={-28 + catchIt * 15}/>
    <Apple x={x + wave(c.t, 7) * (1 - catchIt) * 14} y={y} scale={.89} angle={catchIt * 79}/>
    <path d={"M190 721 Q510 " + (710 + wave(c.t, 8) * 16) + " 827 700"} fill="none" stroke={C.cobalt} strokeWidth="22" opacity=".28"/>
  </>;
};
