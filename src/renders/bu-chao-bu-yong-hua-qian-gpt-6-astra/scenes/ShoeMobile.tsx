import React from "react";
import {C} from "../design";
import {Group, Room, Shadow, Shoe} from "../objects";
import {phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const ShoeMobile: React.FC<SceneClock> = (c) => {
  const descend = ramp(c.t, 0, 1.1);
  const land = phase(c, 1, 0, .8);
  const x = 1470 - descend * 40 - land * 131;
  const y = 396 + descend * 105 + land * 138;
  return <>
    <Room id={c.scope} wall={C.lavender} floor={C.porcelain} horizon={752}/>
    <path d="M1870 0 L1720 690" stroke={C.cobalt} strokeWidth="28" opacity=".18"/>
    <path d={"M1174-10 Q" + (1290 + wave(c.t, 8) * 26) + " 156 " + x + " " + (y - 98)} stroke={C.yellow} strokeWidth={10 - land * 5} fill="none"/>
    <path d={"M1637-10 Q1770 166 " + (x - 108 + land * 375) + " " + (y - 80 - land * 371)} stroke={C.yellow} strokeWidth="8" fill="none"/>
    <Shadow x={1346} y={746} rx={226} ry={20}/>
    <Group x={wave(c.t, 11) * 10}>
      <path d="M853 753 Q1131 682 1453 723 Q1650 751 1920 704 L1920 772 Q1650 819 1453 790 Q1131 750 853 821Z" fill={C.cobalt}/>
      <path d="M886 769 Q1147 711 1453 747 Q1650 780 1890 734" stroke={C.porcelain} strokeWidth="4" fill="none" opacity=".5"/>
    </Group>
    <Shoe x={x} y={y} scale={1.21} angle={-19 + land * 21} color={C.red}/>
  </>;
};
