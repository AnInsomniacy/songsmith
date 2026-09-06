import React from "react";
import {C} from "../design";
import {Button, Glove, Group, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const MirrorPalm: React.FC<SceneClock> = (c) => {
  const hello = ramp(c.t, 0, .8);
  const reveal = phase(c, 1, 0, 1.15);
  return <>
    <Room id={c.scope} floor={C.lavender} horizon={588}/>
    <Shadow x={1263} y={580} rx={259} ry={25}/>
    <Group x={1254 + wave(c.t, 9) * 9} y={309} angle={-11 + reveal * 23}>
      <rect x="-243" y="-249" width="486" height="503" rx="241" fill={C.red}/>
      <rect x="-221" y="-227" width="442" height="459" rx="220" fill={C.cobalt}/>
      <path d="M-192-46 L114-214 M-196 65 L193-149" stroke={C.porcelain} strokeWidth="34" opacity=".17"/>
      <path d="M-157-169 Q-44-247 73-203" fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".57"/>
    </Group>
    <Glove x={983 + hello * 66} y={375 - hello * 50} angle={-47} scale={.8}/>
    <Button id={c.scope + "-behind-mirror"} x={1516 + reveal * 110} y={435 - reveal * 71} radius={85} color={C.yellow} angle={reveal * 98}/>
    <path d="M239 628 L496 480" stroke={C.cobalt} strokeWidth="27" opacity=".2"/>
  </>;
};
