import React from "react";
import {C} from "../design";
import {Button, Pocket, Room, Shadow} from "../objects";
import {ramp, strike, wave} from "../motion";
import type {SceneClock} from "../types";

export const ButtonHome: React.FC<SceneClock> = (c) => {
  const tap = strike(c, "扣");
  const home = ramp(c.t, 6.7, 8.1);
  const rest = ramp(c.t, 15, 4.8);
  const x = 943 + home * 573;
  const y = 479 - Math.sin(home * Math.PI) * 60 + home * 14;
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={747}/>
    <path d="M709 692 Q1100 609 1550 675 L1760 747 H734Z" fill={C.lavender}/>
    <path d="M738 698 Q1110 634 1537 695" fill="none" stroke={C.porcelain} strokeWidth="4" strokeDasharray="12 13" opacity=".6"/>
    <Shadow x={x} y={665} rx={157 - home * 71} ry={20} opacity={.18 * (1 - home * .6)}/>
    <Pocket x={1553} y={509} scale={1.3} open={.84 - rest * .75} color={C.red}/>
    <g opacity={1 - ramp(c.t, 13.7, 1.2)}>
      <Button id={c.scope + "-home"} x={x} y={y - tap * 19 + wave(c.t, 9) * (1 - home) * 4} radius={141} angle={home * 353 + tap * 8} color={C.yellow}/>
    </g>
    <path d={"M-90-30 L860 " + (475 + rest * 80) + " L1190 692 L630 700Z"} fill={C.porcelain} opacity={.045 - rest * .02}/>
  </>;
};
