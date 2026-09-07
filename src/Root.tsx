import React from "react";
import { Composition, Folder } from "remotion";

export const RemotionRoot: React.FC = () => (
  <Folder name="Songs">
    <Folder name="OneLastKiss">
      <Composition
        id="OneLastKiss-GPT6Astra-SVG"
        lazyComponent={() =>
          import("./renders/One Last Kiss/gpt-6-astra-svg/Video")
        }
        durationInFrames={15122}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="WoDeHuiYiBuShiWoDe">
      <Composition
        id="WoDeHuiYiBuShiWoDe-GPT56"
        lazyComponent={() => import("./renders/我的回忆不是我的/gpt-5-6/Video")}
        durationInFrames={13805}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="JiaYou">
      <Composition
        id="JiaYou-GPT56"
        lazyComponent={() => import("./renders/加油/gpt-5-6/Video")}
        durationInFrames={13659}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="BuChaoBuYongHuaQian">
      <Composition
        id="BuChaoBuYongHuaQian-GPT6Astra"
        lazyComponent={() => import("./renders/不潮不用花钱/gpt-6-astra/Video")}
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="QingTian">
      <Composition
        id="QingTian-GPT56"
        lazyComponent={() => import("./renders/晴天/gpt-5-6/Video")}
        durationInFrames={16197}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          audioFile: "songs/晴天/audio/晴天.mp3",
        }}
      />
    </Folder>
  </Folder>
);
