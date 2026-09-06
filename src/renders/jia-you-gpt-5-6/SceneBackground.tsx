import React from "react";
import {interpolate} from "remotion";
import type {LyricPage} from "./types";

const wave = (ms:number, period:number, phase=0) => Math.sin((ms/period)*Math.PI*2+phase);
const ease = (value:number) => (1-Math.cos(Math.PI*Math.max(0,Math.min(1,value))))/2;

const Pattern: React.FC<{page:LyricPage; localMs:number}> = ({page,localMs}) => {
  const p=page.palette; const a=wave(localMs,7200); const b=wave(localMs,10300,1.3); const travel=ease((localMs%12000)/12000);
  const common={fill:"none",stroke:p.detail,strokeWidth:12,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  switch(page.scene){
    case "smile-meter": return <><path d={`M180 620 Q480 ${500+a*45} 780 620 T1380 620`} {...common}/><circle cx={1510+b*35} cy="400" r="150" fill={p.accent}/><path d="M1450 410 Q1510 470 1570 410" {...common}/></>;
    case "reverse-city": return <>{Array.from({length:10},(_,i)=><rect key={i} x={90+i*190} y={750-(i%4)*90} width="120" height={250+(i%4)*90} fill={i%2?p.backgroundAlt:p.detail} opacity=".5" transform={`translate(${a*28*(i%2?1:-1)} 0)`}/>)}<path d="M1700 230 H1170 L1300 100 M1170 230 L1300 360" {...common}/></>;
    case "crossroads-career": return <><path d="M0 900 L760 520 L1920 840 M760 520 L1370 60" {...common}/><g transform={`translate(${travel*1250-180} ${760-travel*430})`}><rect width="150" height="90" rx="20" fill={p.accent}/><circle cx="30" cy="105" r="24" fill={p.foreground}/><circle cx="120" cy="105" r="24" fill={p.foreground}/></g></>;
    case "fortune-wheel": return <><g transform={`translate(1480 520) rotate(${a*10})`}>{Array.from({length:12},(_,i)=><path key={i} d="M0 0 L0 -300" {...common} transform={`rotate(${i*30})`}/>) }<circle r="105" fill={p.secondary}/></g><circle cx={300+b*40} cy={830} r="190" fill={p.accent} opacity=".7"/></>;
    case "seismic-embrace": return <><path d={`M0 790 L260 790 L350 ${730+a*35} L440 850 L540 690 L650 790 H1920`} {...common}/><circle cx="1450" cy="370" r="175" fill={p.secondary}/><circle cx="1600" cy="370" r="175" fill={p.accent} opacity=".82"/></>;
    case "corner-sun": return <><path d="M0 850 H1080 Q1280 850 1280 650 V0" {...common}/><circle cx={1460+b*45} cy={430+a*30} r="220" fill={p.detail}/><path d="M1280 650 Q1280 850 1080 850" stroke={p.accent} strokeWidth="34" fill="none"/></>;
    case "cheer-ripple": return <>{Array.from({length:7},(_,i)=><circle key={i} cx="1520" cy="540" r={95+i*75+a*12} fill="none" stroke={i%2?p.detail:p.secondary} strokeWidth="13" opacity={.8-i*.08}/>)}<path d="M1120 540 H400" {...common}/></>;
    case "sun-dry": return <><circle cx="1510" cy="270" r={175+a*18} fill={p.detail}/>{Array.from({length:8},(_,i)=><path key={i} d="M1510 30 V-80" {...common} transform={`rotate(${i*45} 1510 270)`}/>)}<path d={`M0 860 Q420 ${760+a*35} 820 860 T1650 860`} {...common}/><g fill={p.secondary}>{Array.from({length:7},(_,i)=><path key={i} d="M0 0 C30 50 30 80 0 105 C-30 80 -30 50 0 0" transform={`translate(${240+i*125} ${540+b*35+i%2*45}) scale(.65)`}/>)}</g></>;
    case "relay-hands": return <><path d="M100 760 C410 520 610 980 920 720 S1450 560 1850 760" {...common}/><rect x={860+a*45} y="580" width="270" height="55" rx="28" fill={p.accent} transform="rotate(-15 995 607)"/><circle cx="420" cy="760" r="95" fill={p.secondary}/><circle cx="1560" cy="710" r="95" fill={p.detail}/></>;
    case "promise-clock": return <><circle cx="1480" cy="530" r="330" fill="none" stroke={p.detail} strokeWidth="30"/><path d={`M1480 530 L1480 300 M1480 530 L${1480+190*Math.cos(localMs/2400)} ${530+190*Math.sin(localMs/2400)}`} {...common}/>{Array.from({length:12},(_,i)=><circle key={i} cx={1480+285*Math.cos(i*Math.PI/6)} cy={530+285*Math.sin(i*Math.PI/6)} r="12" fill={p.accent}/>)}</>;
    case "beat-road": return <><path d="M0 780 H300 L380 620 L500 930 L620 520 L760 780 H1920" {...common}/><g transform={`translate(${280+travel*1250} 690)`}><circle r="72" fill={p.accent}/><path d="M-28 0 H28 M0 -28 V28" stroke={p.surface} strokeWidth="12"/></g></>;
    case "current-climb": return <><path d={`M0 ${820+a*25} Q300 690 600 ${820-a*25} T1200 ${820+a*25} T1920 800`} {...common}/><path d="M1080 760 L1450 280 L1810 760" fill={p.backgroundAlt}/><path d="M1450 630 V315 M1450 315 L1375 420 M1450 315 L1525 420" {...common}/></>;
    case "walk-together": return <><path d="M0 900 C420 820 620 580 980 650 S1450 900 1920 470" {...common}/>{Array.from({length:10},(_,i)=><circle key={i} cx={160+i*160} cy={840-i*34+a*10*(i%2?1:-1)} r="22" fill={i%2?p.accent:p.secondary}/>)}</>;
    case "job-carousel": return <><g transform={`translate(1500 520) rotate(${a*8})`}><circle r="300" fill="none" stroke={p.detail} strokeWidth="22"/>{Array.from({length:6},(_,i)=><rect key={i} x="-55" y="-365" width="110" height="100" fill={i%2?p.accent:p.secondary} transform={`rotate(${i*60})`}/>)}</g><path d="M180 820 H920" {...common}/></>;
    case "sky-prank": return <><path d={`M0 760 Q430 ${630+a*45} 850 760 T1700 730`} {...common}/><circle cx={1500+b*55} cy={290} r="190" fill={p.detail}/><path d="M1390 330 Q1500 220 1610 330" stroke={p.accent} strokeWidth="24" fill="none"/></>;
    case "museum-of-good": return <>{Array.from({length:4},(_,i)=><g key={i} transform={`translate(${1040+i*210} ${220+(i%2)*190+a*12*(i%2?1:-1)})`}><rect width="160" height="210" fill={i%2?p.accent:p.secondary}/><rect x="24" y="24" width="112" height="162" fill={p.surface}/></g>)}<path d="M980 900 H1900" {...common}/></>;
    case "street-turn": return <><path d="M0 860 H1050 Q1300 860 1300 610 V0" {...common}/><g transform={`translate(${1260+b*50} 700)`}><path d="M0 0 L150 -150 L300 0" fill={p.accent}/><circle cx="150" cy="-180" r="90" fill={p.detail}/></g></>;
    case "sorrow-luggage": return <><rect x={1180+a*30} y="410" width="470" height="360" rx="45" fill={p.secondary}/><path d="M1310 410 Q1310 270 1415 270 Q1520 270 1520 410" {...common}/><g transform={`translate(${400+b*30} ${660+a*30})`}><path d="M0 0 C55 90 55 150 0 195 C-55 150 -55 90 0 0" fill={p.accent}/></g></>;
    case "sun-laundry": return <><path d={`M0 ${400+a*25} Q960 ${500-a*25} 1920 ${400+a*25}`} {...common}/>{Array.from({length:7},(_,i)=><rect key={i} x={720+i*165} y={445+(i%2)*20} width="130" height="210" fill={i%3===0?p.accent:i%3===1?p.secondary:p.detail} transform={`rotate(${a*(i%2?2:-2)} ${785+i*165} 445)`}/>)}<circle cx="300" cy="250" r="155" fill={p.detail}/></>;
    case "track-baton": return <><ellipse cx="1100" cy="600" rx="780" ry="330" fill="none" stroke={p.detail} strokeWidth="30"/><ellipse cx="1100" cy="600" rx="620" ry="240" fill="none" stroke={p.secondary} strokeWidth="15"/><rect x={430+travel*1050} y={690-a*40} width="230" height="50" rx="25" fill={p.accent} transform="rotate(-18)"/></>;
    case "watch-light": return <><circle cx="1490" cy="510" r="300" fill={p.backgroundAlt}/><path d={`M1490 510 L1490 270 M1490 510 L${1490+190*Math.cos(localMs/2800)} ${510+190*Math.sin(localMs/2800)}`} {...common}/><path d="M120 820 H920" {...common}/></>;
    case "gate-after-rain": return <>{Array.from({length:5},(_,i)=><g key={i} transform={`translate(${920+i*190} ${520+a*10*(i%2?1:-1)})`}><rect width="135" height="260" fill="none" stroke={i%2?p.accent:p.detail} strokeWidth="22"/><path d="M35 130 L60 165 L110 90" {...common}/></g>)}<circle cx="330" cy="270" r="170" fill={p.detail}/></>;
    case "rainbow-reveal": return <>{[0,1,2,3].map((i)=><path key={i} d="M850 790 A520 520 0 0 1 1890 790" fill="none" stroke={[p.accent,p.detail,p.secondary,p.surface][i]} strokeWidth="54" transform={`translate(0 ${i*58+a*6})`}/>)}</>;
    case "finish-line": return <><path d="M0 850 H1920" {...common}/><g transform={`translate(${340+travel*1100} ${760+a*16})`}><circle r="70" fill={p.accent}/><path d="M-20 -20 L28 0 L-20 20Z" fill={p.surface}/></g><g transform="translate(1540 240)">{Array.from({length:8},(_,i)=><rect key={i} x={(i%2)*70} y={Math.floor(i/2)*70} width="70" height="70" fill={i%2?p.surface:p.foreground}/>)}</g></>;
    case "prism-dry": return <><circle cx="1490" cy="250" r="150" fill={p.detail}/><path d="M1490 400 L1160 880 H1820Z" fill={p.backgroundAlt}/><path d="M1490 400 L1250 880 M1490 400 L1490 880 M1490 400 L1730 880" {...common}/><path d="M410 450 C480 570 480 650 410 710 C340 650 340 570 410 450" fill={p.secondary}/></>;
    default: return <><circle cx={1480+a*30} cy={520+b*20} r="300" fill={p.detail}/><path d="M0 860 C500 700 800 1020 1200 820 S1650 700 1920 790" {...common}/>{Array.from({length:8},(_,i)=><circle key={i} cx={850+i*120} cy={300+i%2*120+a*12} r={32+i*5} fill={i%2?p.accent:p.secondary}/>)}</>;
  }
};

export const SceneBackground: React.FC<{page:LyricPage;globalMs:number;opacity:number}> = ({page,globalMs,opacity}) => {
  const localMs=Math.max(0,globalMs-page.startMs);
  const enter=interpolate(localMs,[0,260],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{position:"absolute",inset:0,opacity:opacity*enter,background:`linear-gradient(135deg, ${page.palette.background}, ${page.palette.backgroundAlt})`,overflow:"hidden"}}>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position:"absolute",inset:0}}>
      <Pattern page={page} localMs={localMs}/><rect x="32" y="32" width="1856" height="1016" rx="44" fill="none" stroke={page.palette.surface} strokeWidth="3" opacity=".38"/>
    </svg>
  </div>;
};
