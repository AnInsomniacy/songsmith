import React from "react";
import {C} from "../design";
import {Button, Coin, Glove, Group, Pocket, Room} from "../objects";
import {phase, strike, wave} from "../motion";
import type {SceneClock} from "../types";

export const TableKnock: React.FC<SceneClock> = (c) => {
  const tap = strike(c, "叩");
  const empty = phase(c, 1, 0, 1.45);
  return <>
    <Room id={c.scope} floor={C.yellow} horizon={1050}/>
    <Group x={1270 + wave(c.t, 11) * 12} y={772}>
      <ellipse cy="31" rx="514" ry="248" fill={C.ink} opacity=".22"/>
      <ellipse rx="514" ry="248" fill={C.lavender}/>
      <ellipse rx="481" ry="218" fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".5"/>
      <path d="M-456-46 Q0-74 451-46 M-470 15 Q0-11 477 15 M-421 91 Q0 72 421 91" stroke={C.ink} strokeWidth="3" fill="none" opacity=".09"/>
      <Button id={c.scope + "-table-button"} x={175} y={-94 + tap * 14} radius={59} tilt={.75} color={C.cobalt}/>
      <Pocket x={-149} y={-7} scale={.61} angle={-27} open={empty} color={C.red}/>
      {[0, 1, 2, 3].map((i) => <Coin key={i} x={73 + i * 58 + empty * (94 + i * 56)} y={44 + i * 27 + empty * 91} scale={.61 - empty * .14} angle={empty * (i + 1) * 53}/>)}
    </Group>
    <Glove x={1610 + tap * 8} y={709 + tap * 22} scale={.77} angle={-126}/>
  </>;
};
