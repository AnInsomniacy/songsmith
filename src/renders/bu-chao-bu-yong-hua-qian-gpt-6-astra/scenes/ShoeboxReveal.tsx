import React from "react";
import {C} from "../design";
import {Group, Plinth, Room, Shoe, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const ShoeboxReveal: React.FC<SceneClock> = (c) => {
  const lid = ramp(c.t, 0, 1.1);
  const reveal = phase(c, 1, 0, .95);
  return <>
    <Room id={c.scope} wall={C.lavender} floor={C.porcelain} horizon={724}/>
    <path d="M0 0 H510 L690 1080 H0Z" fill={C.porcelain} opacity=".44"/>
    <Group x={wave(c.t, 9) * 16}>
      <Shadow x={1390} y={700} rx={295} ry={32}/>
      <Plinth x={1090} y={602} width={556} height={98} color={C.red} depth={96}/>
      <path d="M1090 602 L1186 514 H1742 L1646 602Z" fill={C.ink}/>
      <g transform={"translate(1186 514) rotate(" + (-lid * 32) + ")"}>
        <path d="M0 0 L-20-116 H536 L556 0Z" fill={C.red}/>
        <path d="M18-88 H510" stroke={C.porcelain} strokeWidth="6" opacity=".3"/>
      </g>
      <Shoe x={1380 + reveal * 53} y={604 - reveal * 172} scale={1.23} angle={-20 + reveal * 9} color={C.cobalt}/>
      <path d="M1090 602 V676 H1646 V602Z" fill={C.red}/>
      <path d="M1110 620 H1616" stroke={C.porcelain} strokeWidth="5" opacity=".26"/>
    </Group>
    <path d={"M1840 1010 Q1770 " + (700 + wave(c.t, 7) * 30) + " 1860 420"} fill="none" stroke={C.yellow} strokeWidth="54"/>
  </>;
};
