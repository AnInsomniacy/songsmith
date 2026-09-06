import React from "react";
import {C} from "../design";
import {Button, Glove, Hat, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const CoatstandGreeting: React.FC<SceneClock> = (c) => {
  const hello = ramp(c.t, 0, .65) - ramp(c.t, .9, .65);
  const offer = phase(c, 1, 0, 1.1);
  return <>
    <Room id={c.scope} floor={C.lavender} horizon={746}/>
    <path d="M1760 65 Q1870 101 1870 225 V730" stroke={C.red} strokeWidth="32" fill="none" opacity=".35"/>
    <Shadow x={1429} y={735} rx={252} ry={22}/>
    <path d="M1420 716 V252 M1420 432 Q1210 493 1202 346 M1420 385 Q1634 455 1662 294 M1420 716 L1263 736 M1420 716 L1588 736" stroke={C.cobalt} strokeWidth="26" fill="none" strokeLinecap="round"/>
    <path d={"M1420 330 Q" + (1550 + offer * 35) + " 320 " + (1575 + offer * 57) + " " + (204 - offer * 16)} stroke={C.cobalt} strokeWidth="21" fill="none" strokeLinecap="round"/>
    <Hat x={1408} y={224} scale={1.12} angle={hello * 18 + wave(c.t, 11) * 2} color={C.red}/>
    <Glove x={1640 - offer * 22} y={442 - offer * 68} angle={-101 + offer * 38} scale={.62}/>
    <Button id={c.scope + "-gift"} x={1533 - offer * 130} y={460 - offer * 60} radius={59} angle={offer * -80}/>
  </>;
};
