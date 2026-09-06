import React from "react";
import {C} from "../design";
import {Apple, Button, Group, Room, Shadow} from "../objects";
import {phase, wave} from "../motion";
import type {SceneClock} from "../types";

export const AppleOrbit: React.FC<SceneClock> = (c) => {
  const release = phase(c, 1, 0, 1.2);
  const orbit = .5 + c.t * .32;
  return <>
    <Room id={c.scope} wall={C.ink} floor={C.cobalt} horizon={600}/>
    <path d="M-30-80 L920 420" stroke={C.porcelain} strokeWidth="270" opacity=".045"/>
    <Shadow x={1171} y={555} rx={441} ry={31}/>
    <Group x={1158 + wave(c.t, 12) * 17} y={308}>
      <ellipse cy="28" rx="353" ry="244" fill={C.cobalt}/>
      <ellipse rx="353" ry="244" fill={C.lavender}/>
      <ellipse rx="323" ry="217" fill="none" stroke={C.ink} strokeWidth="7" opacity=".28"/>
      <ellipse rx="211" ry="141" fill="none" stroke={C.porcelain} strokeWidth="3" opacity=".65"/>
      <path d={"M0 0 L" + (Math.cos(orbit) * 257) + " " + (Math.sin(orbit) * 170)} stroke={C.ink} strokeWidth="19" strokeLinecap="round"/>
      <Button id={c.scope + "-axle"} radius={48} tilt={.74} color={C.cobalt} angle={orbit * 57}/>
      <Apple x={Math.cos(orbit) * (257 - release * 112)} y={Math.sin(orbit) * (170 - release * 53) - 8} scale={.84} angle={-22 + release * 56}/>
      <ellipse cx="183" cy="-144" rx="61" ry="20" fill={C.porcelain} opacity=".28" transform="rotate(-30 183 -144)"/>
    </Group>
  </>;
};
