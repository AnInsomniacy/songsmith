import React from "react";
import {C} from "../design";
import {Button, Coin, Curtain, Group, Plinth, Pocket, Room, Shoe, Shadow} from "../objects";
import {hop, phase, ramp, wave} from "../motion";
import type {SceneClock} from "../types";

export const PocketSolo: React.FC<SceneClock> = (c) => {
  const spill = ramp(c.t, .2, 2.2);
  const stage = phase(c, 1, 0, 1.8);
  const solo = Math.max(0, c.t - c.cues[1] - 1.8);
  const travel = Math.sin(solo * .52) * 215 * stage;
  const heel = wave(solo, .86) * stage;
  const finish = ramp(c.t, c.duration - 3.2, 2.8);
  return <>
    <Room id={c.scope} wall={C.cobalt} floor={C.ink} horizon={1000}/>
    <path d="M820 987 V645 Q820 549 917 549 H1770 Q1846 549 1846 637 V987Z" fill={C.lavender}/>
    <path d="M870 988 V663 Q870 600 939 600 H1740 Q1792 600 1792 663 V988Z" fill={C.ink}/>
    <Curtain x={850} y={589} width={438} height={375} color={C.red} pull={stage}/>
    <g transform="translate(1810 0) scale(-1 1)"><Curtain x={0} y={589} width={455} height={375} color={C.red} pull={stage}/></g>
    <Plinth x={817} y={956} width={979} height={53} color={C.yellow} depth={0}/>
    <Group x={977} y={751} scale={.73} angle={spill * 155}>
      <Pocket open={spill} color={C.cobalt}/>
    </Group>
    {[0, 1, 2, 3, 4].map((i) => <Coin key={i} x={983 - spill * (68 + i * 55)} y={809 + spill * 167 - Math.sin(spill * Math.PI) * (110 + i * 32)} scale={.5} angle={spill * (130 + i * 42)}/>)}
    <Shadow x={1393 + travel * (1 - finish)} y={950} rx={202} ry={19}/>
    <Group x={1385 + travel * (1 - finish)} y={884 - hop(solo, .43) * stage * 50 * (1 - finish)} scale={.73 + stage * .15}>
      <Shoe x={-97} y={heel * 15} angle={-9 - heel * 15 * (1 - finish)} color={C.porcelain}/>
      <Shoe x={139} y={-heel * 18} scale={.92} angle={12 + heel * 19 * (1 - finish)} color={C.red} flip/>
    </Group>
    <Button id={c.scope + "-proscenium"} x={1330} y={590} radius={48} color={C.yellow} angle={solo * 12}/>
  </>;
};
