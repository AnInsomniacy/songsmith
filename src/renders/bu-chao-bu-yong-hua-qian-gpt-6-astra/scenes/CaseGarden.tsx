import React from "react";
import {C} from "../design";
import {Group, Room, Shadow, Shoe} from "../objects";
import {hop, phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const CaseGarden: React.FC<SceneClock> = (c) => {
  const lid = ramp(c.t, 0, 1);
  const unfold = phase(c, 1, 0, 1.8);
  const practice = Math.max(0, c.t - c.cues[1] - 1.8);
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={998}/>
    <Shadow x={1280} y={995} rx={528} ry={26}/>
    <Group x={1277 + wave(c.t, 12) * 13} y={894}>
      <g transform={"rotate(" + (-27 * lid) + " -388 -25)"}>
        <rect x="-386" y="-221" width="810" height="226" rx="32" fill={C.red}/>
        <rect x="-364" y="-201" width="766" height="186" rx="23" fill={C.lavender}/>
        <path d="M-96-223 V-256 Q-94-276-72-275 H103 Q126-275 126-253 V-223" fill="none" stroke={C.yellow} strokeWidth="17"/>
      </g>
      <rect x="-410" y="-43" width="847" height="124" rx="29" fill={C.red}/>
      <path d="M-404-30 H430" stroke={C.porcelain} strokeWidth="5" opacity=".3"/>
      <path d={"M-356-55 Q-156 " + (-88 - unfold * 32) + " 28-47 Q244 11 447-41 Q" + (455 + unfold * 175) + " " + (-40 - unfold * 89) + " " + (474 + unfold * 245) + " " + (-25 - unfold * 119)} fill="none" stroke={C.yellow} strokeWidth="57" strokeLinecap="round"/>
      <Shoe x={-43 + unfold * 133 + Math.sin(practice * 1.1) * 139} y={-118 - unfold * 5 - hop(practice, .55) * unfold * 27} scale={.71} angle={-8 + Math.sin(practice * 1.1) * 10} color={C.porcelain}/>
      <rect x="-296" y="26" width="41" height="44" rx="6" fill={C.yellow}/>
      <rect x="277" y="26" width="41" height="44" rx="6" fill={C.yellow}/>
    </Group>
  </>;
};
