import React from "react";
import {C} from "./design";
import {FONTS} from "./fonts";
import {Button, Plinth, Room, Shadow} from "./objects";

export const Cover: React.FC = () => <svg width="1920" height="1080" viewBox="0 0 1920 1080" data-astra-cover="">
  <Room id="astra-cover" floor={C.lavender} horizon={911}/>
  <path d="M1230 0 H1920 V1080 H1631Z" fill={C.cobalt} opacity=".13"/>
  <Shadow x={1450} y={913} rx={305} ry={39}/>
  <Plinth x={1171} y={887} width={588} height={51} color={C.red} depth={47}/>
  <Button id="astra-cover-button" x={1454} y={494} radius={303} color={C.cobalt} angle={-17}/>
  <path d="M1390 192 Q1454 23 1586 0" fill="none" stroke={C.yellow} strokeWidth="35"/>
  <g fontFamily={FONTS.impact.family} fontWeight="400" fill={C.ink} style={{fontSynthesis: "none"}}>
    <text x="146" y="399" fontSize="321" letterSpacing="13">不潮</text>
    <text x="146" y="685" fontSize="242" letterSpacing="7">不用花钱</text>
  </g>
  <text x="157" y="895" fontFamily={FONTS.body.family} fontSize="68" fill={C.ink}>林俊杰</text>
  <text x="164" y="971" fontFamily={FONTS.info.family} fontSize="31" letterSpacing="4" fill={C.ink}>JJ LIN · 2008</text>
</svg>;
