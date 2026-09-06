import {Audio} from "@remotion/media";
import React from "react";
import {AbsoluteFill,Easing,interpolate,staticFile,useCurrentFrame,useVideoConfig} from "remotion";
import {CoverFrame} from "./CoverFrame";
import {fontsReady} from "./fonts";
import {LyricPageView} from "./LyricPage";
import {pages} from "./pages";
import {Prelude} from "./Prelude";
import {SceneBackground} from "./SceneBackground";

const clamp={extrapolateLeft:"clamp",extrapolateRight:"clamp"} as const;
const TRANSITION_MS=260;
export const JiaYou:React.FC=()=>{
  const [ready,setReady]=React.useState(false); const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  React.useEffect(()=>{fontsReady.then(()=>setReady(true));},[]); if(!ready)return null;
  const globalMs=frame/fps*1000; let currentIndex=-1; for(let i=0;i<pages.length;i++)if(globalMs>=pages[i].startMs)currentIndex=i;
  const current=currentIndex>=0?pages[currentIndex]:null; const transition=current?interpolate(globalMs,[current.startMs,current.startMs+TRANSITION_MS],[0,1],{...clamp,easing:Easing.inOut(Easing.sin)}):0;
  return <AbsoluteFill style={{background:"#17304B",overflow:"hidden"}}>
    <Audio src={staticFile("songs/jia-you/audio/jia-you.mp3")}/>
    {currentIndex<0?<Prelude globalMs={globalMs}/>:null}
    {currentIndex===0&&current?<Prelude globalMs={globalMs} opacity={1-transition}/>:null}
    {currentIndex>0&&current?<SceneBackground page={pages[currentIndex-1]} globalMs={globalMs} opacity={1-transition}/>:null}
    {current?<SceneBackground page={current} globalMs={globalMs} opacity={transition}/>:null}
    {current?<LyricPageView page={current} globalMs={globalMs}/>:null}
    {frame===0?<CoverFrame/>:null}
  </AbsoluteFill>;
};
