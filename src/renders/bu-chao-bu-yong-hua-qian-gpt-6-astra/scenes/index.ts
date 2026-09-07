import type React from "react";
import type { SceneProps } from "./craft";
import { MusicShop } from "./MusicShop";
import { Invention } from "./Invention";
import { SofaSnacks } from "./SofaSnacks";
import { RecordingRoom } from "./RecordingRoom";
import { ListeningWindow } from "./ListeningWindow";
import { RecordLibrary } from "./RecordLibrary";
import { Crossroads } from "./Crossroads";
import { ListeningRoom } from "./ListeningRoom";
import { CornerCafe } from "./CornerCafe";
import { Vending } from "./Vending";
import { Luthier } from "./Luthier";
import { StreetPercussion } from "./StreetPercussion";
import { AwningOrchestra } from "./AwningOrchestra";
import { Switchboard } from "./Switchboard";
import { Mailroom } from "./Mailroom";
import { Greenhouse } from "./Greenhouse";
import { PrintDesk } from "./PrintDesk";
import { Screenprint } from "./Screenprint";
import { ShoeAtelier } from "./ShoeAtelier";
import { CollectorShelf } from "./CollectorShelf";
import { ToySession } from "./ToySession";
import { NightRecords } from "./NightRecords";
import { SignPainter } from "./SignPainter";
import { NightCanopy } from "./NightCanopy";
import { RooftopPercussion } from "./RooftopPercussion";
import { OpenStage } from "./OpenStage";
import { ValveAmplifier } from "./ValveAmplifier";
import { BalconySession } from "./BalconySession";
import { SkylineScene } from "./SkylineScene";
import { LastGroove } from "./LastGroove";
import { AfterHours } from "./AfterHours";
export const sceneMap: Record<string, React.FC<SceneProps>> = {
  "music-shop": MusicShop,
  invention: Invention,
  "sofa-snacks": SofaSnacks,
  "recording-room": RecordingRoom,
  "listening-window": ListeningWindow,
  "record-library": RecordLibrary,
  crossroads: Crossroads,
  "listening-room": ListeningRoom,
  "corner-cafe": CornerCafe,
  vending: Vending,
  luthier: Luthier,
  "street-percussion": StreetPercussion,
  "awning-orchestra": AwningOrchestra,
  switchboard: Switchboard,
  mailroom: Mailroom,
  greenhouse: Greenhouse,
  "print-desk": PrintDesk,
  screenprint: Screenprint,
  "shoe-atelier": ShoeAtelier,
  "collector-shelf": CollectorShelf,
  "toy-session": ToySession,
  "night-records": NightRecords,
  "sign-painter": SignPainter,
  "night-canopy": NightCanopy,
  "rooftop-percussion": RooftopPercussion,
  "open-stage": OpenStage,
  "valve-amplifier": ValveAmplifier,
  "balcony-session": BalconySession,
  skyline: SkylineScene,
  "last-groove": LastGroove,
  "after-hours": AfterHours,
};
