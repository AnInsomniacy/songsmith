import React from "react";
import {C} from "../design";
import {Chair, Glove, Group, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const SeatCarousel: React.FC<SceneClock> = (c) => {
  const arrival = ramp(c.t, 0, 1.3);
  const seat = phase(c, 1, 0, 1.5);
  return <>
    <Room id={c.scope} wall={C.lavender} floor={C.porcelain} horizon={739}/>
    <path d="M1840 0 V702 H1920" fill="none" stroke={C.red} strokeWidth="39"/>
    <Shadow x={1433} y={728} rx={306} ry={31}/>
    <Group x={1395 + wave(c.t, 12) * 9} y={711}>
      <ellipse cy="5" rx="287" ry="52" fill={C.ink}/>
      <ellipse cy="-14" rx="287" ry="54" fill={C.cobalt}/>
      <path d="M-230-20 Q0 12 230-20" stroke={C.porcelain} strokeWidth="3" opacity=".35" fill="none"/>
    </Group>
    <Chair x={1392 + (1 - arrival) * 240} y={510} scale={1.08} angle={29 - seat * 26} open={.15 + seat * .85} color={C.red}/>
    <Glove x={1681 - seat * 88} y={405 + seat * 59} scale={.6} angle={-88 + seat * 28}/>
    <path d={"M0 763 Q360 " + (718 + wave(c.t, 8) * 14) + " 699 730"} stroke={C.yellow} strokeWidth="45" fill="none" opacity=".6"/>
  </>;
};
