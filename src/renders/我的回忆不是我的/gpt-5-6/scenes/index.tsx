import React from "react";
import { lyricLines } from "../lyrics";
import type { LyricPage } from "../types";
import { ColorProof } from "./ColorProof";
import { DandelionField } from "./DandelionField";
import { DandelionFirst } from "./DandelionFirst";
import { DandelionReverse } from "./DandelionReverse";
import { DarkLightExposure } from "./DarkLightExposure";
import { DeparturePlatform } from "./DeparturePlatform";
import { EVOLUTION_CAMERAS, SceneEvolution } from "./evolution";
import { FarewellDock } from "./FarewellDock";
import { FarewellListen } from "./FarewellListen";
import { FragmentsVault } from "./FragmentsVault";
import { IdealExposure } from "./IdealExposure";
import { InertiaDrawer } from "./InertiaDrawer";
import { LastEmptyFrame } from "./LastEmptyFrame";
import { MemoryControl } from "./MemoryControl";
import { MemoryPeel } from "./MemoryPeel";
import { MemoryTransfer } from "./MemoryTransfer";
import { PatienceThread } from "./PatienceThread";
import { PromiseReplay } from "./PromiseReplay";
import { RomanceEmulsion } from "./RomanceEmulsion";
import { RomanceNegative } from "./RomanceNegative";
import { Atmosphere, BaseField, SceneProps, smooth, wave } from "./shared";
import { SharedContactSheet } from "./SharedContactSheet";
import { SharedIndex } from "./SharedIndex";
import { SpectrumStain } from "./SpectrumStain";
import { TemperamentShutter } from "./TemperamentShutter";
import { WaterCeiling } from "./WaterCeiling";
import { WaterGround } from "./WaterGround";
import { WaterListen } from "./WaterListen";
const Artwork: React.FC<SceneProps> = (props) => {
  switch (props.scene) {
    case "temperament-shutter":
      return <TemperamentShutter {...props} />;
    case "fragments-vault":
      return <FragmentsVault {...props} />;
    case "patience-thread":
      return <PatienceThread {...props} />;
    case "dark-light-exposure":
      return <DarkLightExposure {...props} />;
    case "shared-contact-sheet":
      return <SharedContactSheet {...props} />;
    case "romance-emulsion":
      return <RomanceEmulsion {...props} />;
    case "farewell-listen":
      return <FarewellListen {...props} />;
    case "color-proof":
      return <ColorProof {...props} />;
    case "dandelion-first":
      return <DandelionFirst {...props} />;
    case "memory-control":
      return <MemoryControl {...props} />;
    case "water-listen":
      return <WaterListen {...props} />;
    case "departure-platform":
      return <DeparturePlatform {...props} />;
    case "inertia-drawer":
      return <InertiaDrawer {...props} />;
    case "ideal-exposure":
      return <IdealExposure {...props} />;
    case "shared-index":
      return <SharedIndex {...props} />;
    case "romance-negative":
      return <RomanceNegative {...props} />;
    case "promise-replay":
      return <PromiseReplay {...props} />;
    case "spectrum-stain":
      return <SpectrumStain {...props} />;
    case "dandelion-reverse":
      return <DandelionReverse {...props} />;
    case "memory-transfer":
      return <MemoryTransfer {...props} />;
    case "water-ceiling":
      return <WaterCeiling {...props} />;
    case "farewell-dock":
      return <FarewellDock {...props} />;
    case "dandelion-field":
      return <DandelionField {...props} />;
    case "memory-peel":
      return <MemoryPeel {...props} />;
    case "water-ground":
      return <WaterGround {...props} />;
    case "last-empty-frame":
      return <LastEmptyFrame {...props} />;
  }
};

export const SceneBackground: React.FC<{
  page: LyricPage;
  globalMs: number;
  opacity: number;
}> = ({ page, globalMs, opacity }) => {
  const localMs = Math.max(0, globalMs - page.startMs);
  const pageDuration = Math.max(1, page.endMs - page.startMs);
  const progress = Math.max(0, Math.min(1, localMs / pageDuration));
  const secondLine =
    page.lineIndexes[1] === undefined ? null : lyricLines[page.lineIndexes[1]];
  const cueAt = secondLine
    ? secondLine.startMs - page.startMs
    : pageDuration * 0.44;
  const cue = smooth((localMs - cueAt) / 760);
  const cue2At = cueAt + Math.min(780, Math.max(420, pageDuration * 0.16));
  const cue2 = smooth((localMs - cue2At) / 1350);
  const entry = smooth(localMs / 720);
  const props: SceneProps = {
    t: localMs / 1000,
    localMs,
    cue,
    cue2,
    entry,
    progress,
    p: page.palette,
    id: `wodehuiyi-${page.id}`,
    index: page.index,
    scene: page.scene,
  };
  const entryDirection = (page.index % 3) - 1;
  const artDriftX =
    wave(props.t, 13 + (page.index % 7), page.index * 0.19) *
    (10 + (page.index % 4) * 3);
  const artDriftY =
    wave(props.t, 17 + (page.index % 5), page.index * 0.13) *
    (7 + (page.index % 3) * 3);
  const artEntryX = (1 - entry) * entryDirection * 64;
  const artEntryY = (1 - entry) * (page.index % 2 === 0 ? -28 : 28);
  const camera = EVOLUTION_CAMERAS[page.scene];
  const stageCamera = cue * 0.72 + cue2 * 0.28;
  const cameraScale = 1 + stageCamera * (camera.scale - 1);
  const atmosphereScale = 1 + stageCamera * (camera.atmosphereScale - 1);
  const atmosphereTransform = [
    `translate(${stageCamera * camera.atmosphereX} ${stageCamera * camera.atmosphereY})`,
    `translate(${camera.pivotX} ${camera.pivotY})`,
    `scale(${atmosphereScale})`,
    `translate(${-camera.pivotX} ${-camera.pivotY})`,
  ].join(" ");
  const artworkTransform = [
    `translate(${artEntryX + artDriftX + stageCamera * camera.x} ${artEntryY + artDriftY + stageCamera * camera.y})`,
    `rotate(${stageCamera * camera.rotate} ${camera.pivotX} ${camera.pivotY})`,
    `translate(${camera.pivotX} ${camera.pivotY})`,
    `scale(${cameraScale})`,
    `translate(${-camera.pivotX} ${-camera.pivotY})`,
  ].join(" ");
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        background: page.palette.background,
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <BaseField {...props} />
        <g transform={atmosphereTransform}>
          <Atmosphere {...props} />
        </g>
        <g opacity={entry} transform={artworkTransform}>
          <Artwork {...props} />
          <SceneEvolution
            scene={page.scene}
            p={page.palette}
            t={props.t}
            stage={cue}
            resolve={cue2}
          />
        </g>
      </svg>
    </div>
  );
};
