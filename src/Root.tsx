import React from "react";
import { Composition, Folder } from "remotion";
import { calculateMetadata as calculateGrokMetadata } from "./renders/bu-chao-bu-yong-hua-qian-grok-4-6/meta";
import { calculateMetadata as calculateGlmMetadata } from "./renders/bu-chao-bu-yong-hua-qian-glm-5-3-flash/meta";

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
    <Folder name="GreenBoys">
      <Composition
        id="GreenBoys-GPT6Astra"
        lazyComponent={() => import("./renders/green-boys-gpt-6-astra/entry")}
        durationInFrames={13904}
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
      <Composition
        id="BuChaoBuYongHuaQian-GPT56"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-gpt-5-6/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="BuChaoBuYongHuaQian-Grok46"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-grok-4-6/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
        calculateMetadata={calculateGrokMetadata}
      />
      <Composition
        id="BuChaoBuYongHuaQian-ClaudeOpus45"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-claude-opus-4-5/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="BuChaoBuYongHuaQian-Gemini37Flash"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-gemini-3-7-flash/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="BuChaoBuYongHuaQian-DeepSeekV4Flash"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-deepseek-v4-flash/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="BuChaoBuYongHuaQian-Glm53Flash"
        lazyComponent={() =>
          import("./renders/bu-chao-bu-yong-hua-qian-glm-5-3-flash/entry")
        }
        durationInFrames={14011}
        fps={60}
        width={1920}
        height={1080}
        calculateMetadata={calculateGlmMetadata}
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
