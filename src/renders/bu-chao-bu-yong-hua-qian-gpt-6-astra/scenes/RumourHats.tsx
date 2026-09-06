import React from "react";
import {C} from "../design";
import {Hat, Room, Shadow} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const RumourHats: React.FC<SceneClock> = (c) => {
  const scatter = phase(c, 1, 0, 1.2);
  return <>
    <Room id={c.scope} floor={C.yellow} horizon={602}/>
    <path d="M410 527 Q630 220 946 351 T1612 413" stroke={C.ink} strokeWidth="19" fill="none"/>
    <path d="M420 531 V589 M989 368 V589 M1607 414 V589" stroke={C.ink} strokeWidth="14"/>
    {[0, 1, 2, 3].map((i) => {
      const angle = (ramp(c.t, i * .46, .38) - ramp(c.t, i * .46 + .72, .38)) * 25;
      const x = 508 + i * 336 + scatter * (i - 1.5) * 74;
      const y = [353, 278, 326, 357][i] + scatter * (i % 2 ? -70 : 61);
      return <g key={i}><Shadow x={x} y={571} rx={89} ry={10}/><Hat x={x} y={y + wave(c.t, 9, i) * 6} scale={.91} angle={angle + scatter * (i - 1.5) * 17} color={[C.cobalt, C.red, C.lavender, C.cobalt][i]}/></g>;
    })}
    <path d={"M0 618 Q270 " + (620 + wave(c.t, 7) * 18) + " 513 576"} fill="none" stroke={C.red} strokeWidth="25" opacity=".3"/>
  </>;
};
