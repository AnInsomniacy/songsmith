import { ColorProof } from "./ColorProof";
import { DandelionField } from "./DandelionField";
import { DandelionFirst } from "./DandelionFirst";
import { DandelionReverse } from "./DandelionReverse";
import { DarkLightExposure } from "./DarkLightExposure";
import { DeparturePlatform } from "./DeparturePlatform";
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
import { SharedContactSheet } from "./SharedContactSheet";
import { SharedIndex } from "./SharedIndex";
import { SpectrumStain } from "./SpectrumStain";
import { TemperamentShutter } from "./TemperamentShutter";
import type { EvolutionProps } from "./types";
import { WaterCeiling } from "./WaterCeiling";
import { WaterGround } from "./WaterGround";
import { WaterListen } from "./WaterListen";
const scenes = {
  "temperament-shutter": TemperamentShutter,
  "fragments-vault": FragmentsVault,
  "patience-thread": PatienceThread,
  "dark-light-exposure": DarkLightExposure,
  "shared-contact-sheet": SharedContactSheet,
  "romance-emulsion": RomanceEmulsion,
  "farewell-listen": FarewellListen,
  "color-proof": ColorProof,
  "dandelion-first": DandelionFirst,
  "memory-control": MemoryControl,
  "water-listen": WaterListen,
  "departure-platform": DeparturePlatform,
  "inertia-drawer": InertiaDrawer,
  "ideal-exposure": IdealExposure,
  "shared-index": SharedIndex,
  "romance-negative": RomanceNegative,
  "promise-replay": PromiseReplay,
  "spectrum-stain": SpectrumStain,
  "dandelion-reverse": DandelionReverse,
  "memory-transfer": MemoryTransfer,
  "water-ceiling": WaterCeiling,
  "farewell-dock": FarewellDock,
  "dandelion-field": DandelionField,
  "memory-peel": MemoryPeel,
  "water-ground": WaterGround,
  "last-empty-frame": LastEmptyFrame,
};
export function SceneEvolution(props: EvolutionProps) {
  const Scene = scenes[props.scene];
  return <Scene {...props} />;
}
export { EVOLUTION_CAMERAS } from "./camera";
