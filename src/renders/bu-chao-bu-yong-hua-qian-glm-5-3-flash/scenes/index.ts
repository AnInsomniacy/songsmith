import React from "react";
import { Atrium } from "./Atrium";
import { AutoDoor } from "./AutoDoor";
import { BannerDown } from "./BannerDown";
import { Broadcast } from "./Broadcast";
import { ClosingPA } from "./ClosingPA";
import { Escalator } from "./Escalator";
import { Finale } from "./Finale";
import { Flags } from "./Flags";
import { FlipWall } from "./FlipWall";
import { FoodCourt } from "./FoodCourt";
import { Gacha } from "./Gacha";
import { Jewelry } from "./Jewelry";
import { Lamps } from "./Lamps";
import { LastLights } from "./LastLights";
import { Mirror } from "./Mirror";
import { MirrorHall } from "./MirrorHall";
import { MirrorHall2 } from "./MirrorHall2";
import { NightWindow } from "./NightWindow";
import { Prelude } from "../Prelude";
import { Racks } from "./Racks";
import { Register } from "./Register";
import { Shelf } from "./Shelf";
import { Shutter } from "./Shutter";
import { ShopWindow } from "./ShopWindow";
import { Sofa1 } from "./Sofa1";
import { Sofa2 } from "./Sofa2";
import { StuckDoor } from "./StuckDoor";
import { TVWall } from "./TVWall";
import { Wallet } from "./Wallet";
import type { Page, SceneKey } from "../types";

export type SceneProps = { page: Page; f: number; fps: number };

export const SCENES: Record<SceneKey, React.FC<SceneProps>> = {
  prelude: Prelude,
  mirror: Mirror,
  shelf: Shelf,
  escalator: Escalator,
  jewelry: Jewelry,
  lamps: Lamps,
  flipwall: FlipWall,
  shopwindow: ShopWindow,
  gacha: Gacha,
  register: Register,
  atrium: Atrium,
  broadcast: Broadcast,
  racks: Racks,
  tvwall: TVWall,
  foodcourt: FoodCourt,
  autodoor: AutoDoor,
  flags: Flags,
  wallet: Wallet,
  sofa1: Sofa1,
  sofa2: Sofa2,
  mirrorhall: MirrorHall,
  mirrorhall2: MirrorHall2,
  closingpa: ClosingPA,
  shutter: Shutter,
  nightwindow: NightWindow,
  stuckdoor: StuckDoor,
  bannerdown: BannerDown,
  lastlights: LastLights,
  finale: Finale,
};
