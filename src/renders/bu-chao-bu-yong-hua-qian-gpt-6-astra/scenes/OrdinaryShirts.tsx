import React from "react";
import {C} from "../design";
import {Group, Plinth, Room, Shirt, Shadow} from "../objects";
import {hop, phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const OrdinaryShirts: React.FC<SceneClock> = (c) => {
  const choose = phase(c, 1, 0, 1.8);
  const march = ramp(c.t, 0, 1);
  return <>
    <Room id={c.scope} wall={C.porcelain} floor={C.lavender} horizon={934}/>
    <path d="M517 581 H1760" stroke={C.ink} strokeWidth="15"/>
    <path d="M540 578 V961 M1738 578 V961" stroke={C.ink} strokeWidth="13"/>
    <Plinth x={541} y={960} width={1193} height={31} color={C.cobalt}/>
    {[0, 1, 2, 3, 4].map((i) => {
      const special = i === 2;
      const x = 675 + i * 228 + (special ? choose * 122 : wave(c.t, 4) * 14);
      const y = 733 + (special ? choose * 85 : -hop(c.t, 1) * 10 * march);
      return <Group key={i}>
        <Shadow x={x} y={954} rx={77} ry={9}/>
        <path d={"M" + (675 + i * 228) + " 582 V633"} stroke={C.ink} strokeWidth="5"/>
        <Shirt x={x} y={y} scale={.64 + (special ? choose * .19 : 0)} angle={special ? choose * -11 : wave(c.t, 4) * 3} spread={special ? choose : 0} color={special ? C.red : C.cobalt}/>
      </Group>;
    })}
  </>;
};
