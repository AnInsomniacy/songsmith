import React from "react";
import {C} from "../design";
import {Button, Coin, Group, Pocket, Room, Shadow} from "../objects";
import {phase, strike, wave} from "../motion";
import type {SceneClock} from "../types";

export const KnockingDoor: React.FC<SceneClock> = (c) => {
  const knock = strike(c, "叩");
  const reveal = phase(c, 1, 0, 1.2);
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.lavender} horizon={801}/>
    <rect x="1229" y="45" width="479" height="699" rx="217" fill={C.ink}/>
    <path d="M1243 706 V279 Q1243 58 1466 58 Q1692 58 1692 279 V706" fill="none" stroke={C.porcelain} strokeWidth="15" opacity=".3"/>
    <Shadow x={1473} y={774} rx={239} ry={23}/>
    <Group x={1462} y={423} angle={-reveal * 20}>
      <rect x="-191" y="-324" width="382" height="640" rx="183" fill={C.red}/>
      <rect x="-165" y="-292" width="330" height="580" rx="160" fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".28"/>
      <Button id={c.scope + "-ring"} y={-65 - knock * 27} radius={107} color={C.yellow} angle={knock * 13}/>
      <Pocket y={230 - reveal * 57} scale={.71} open={reveal} color={C.cobalt}/>
    </Group>
    {[0, 1, 2, 3].map((i) => <Coin key={i} x={1440 - reveal * (130 + i * 95)} y={616 + reveal * 126 + Math.sin(reveal * Math.PI) * (-100 - i * 24)} scale={.58} angle={reveal * (140 + i * 68) + wave(c.t, 9) * 3}/>)}
  </>;
};
