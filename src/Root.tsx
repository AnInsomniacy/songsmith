import React from "react";
import { Composition, Folder } from "remotion";

export const RemotionRoot: React.FC = () => (
  <Folder name="Songs">
    <Folder name="OneLastKiss">
      <Composition
        id="OneLastKiss-GPT6Astra-SVG"
        lazyComponent={() => import("./renders/one-last-kiss-gpt-6-astra-svg/entry")}
        durationInFrames={15122}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="WoDeHuiYiBuShiWoDe">
      <Composition
        id="WoDeHuiYiBuShiWoDe-GPT56"
        lazyComponent={() =>
          import("./renders/wo-de-hui-yi-bu-shi-wo-de-gpt-5-6/entry")
        }
        durationInFrames={13805}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="JiaYou">
      <Composition
        id="JiaYou-GPT56"
        lazyComponent={() => import("./renders/jia-you-gpt-5-6/entry")}
        durationInFrames={13659}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="BuChaoBuYongHuaQian">
      <Composition
        id="BuChaoBuYongHuaQian-GPT6Astra"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-gpt-6-astra/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
      />
    </Folder>
    <Folder name="QingTian">
      <Composition
        id="QingTian-GPT56"
        lazyComponent={() => import("./renders/qing-tian-gpt-5-6/entry")}
        durationInFrames={16197}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          audioFile: "songs/qing-tian/audio/qing-tian.official.mp3",
        }}
      />
    </Folder>
  </Folder>
);
