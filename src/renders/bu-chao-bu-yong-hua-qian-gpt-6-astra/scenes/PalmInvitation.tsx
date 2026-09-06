import React from "react";
import {C} from "../design";
import {Button, Glove, Group, Plinth, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const PalmInvitation: React.FC<SceneClock> = (c) => {
  const turn = ramp(c.t, .1, 1.2);
  const offer = phase(c, 1, 0, 1.2);
  const x = 1090 + wave(c.t, 8) * 34;
  return <>
    <Room id={c.scope} floor={C.lavender} horizon={584}/>
    <path d="M1660 0 V552 Q1660 590 1730 590 H1920" fill="none" stroke={C.cobalt} strokeWidth="38" opacity=".26"/>
    <Group x={wave(c.t, 11) * 12}>
      <Plinth x={735} y={515} width={725} height={85} color={C.cobalt}/>
      <Shadow x={x} y={513} rx={190} ry={24}/>
      <Glove x={x} y={364} scale={1.04} angle={-78 + turn * 66}/>
    </Group>
    <Button id={c.scope + "-button"} x={x + 46} y={237 - offer * 100 + wave(c.t, 5) * 13} radius={111} angle={-20 + offer * 60 + wave(c.t, 8) * 12}/>
    <path d={"M0 565 Q260 " + (615 + wave(c.t, 6) * 22) + " 523 544"} fill="none" stroke={C.red} strokeWidth="25" opacity=".36"/>
  </>;
};
