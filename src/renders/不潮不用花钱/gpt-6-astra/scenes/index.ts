import type React from "react";
import { AfterHours } from "./AfterHours";
import { AwningOrchestra } from "./AwningOrchestra";
import { BalconySession } from "./BalconySession";
import { CollectorShelf } from "./CollectorShelf";
import { CornerCafe } from "./CornerCafe";
import type { SceneProps } from "./craft";
import { Crossroads } from "./Crossroads";
import { Greenhouse } from "./Greenhouse";
import { Invention } from "./Invention";
import { LastGroove } from "./LastGroove";
import { ListeningRoom } from "./ListeningRoom";
import { ListeningWindow } from "./ListeningWindow";
import { Luthier } from "./Luthier";
import { Mailroom } from "./Mailroom";
import { MusicShop } from "./MusicShop";
import { NightCanopy } from "./NightCanopy";
import { NightRecords } from "./NightRecords";
import { OpenStage } from "./OpenStage";
import { PrintDesk } from "./PrintDesk";
import { RecordingRoom } from "./RecordingRoom";
import { RecordLibrary } from "./RecordLibrary";
import { RooftopPercussion } from "./RooftopPercussion";
import { Screenprint } from "./Screenprint";
import { ShoeAtelier } from "./ShoeAtelier";
import { SignPainter } from "./SignPainter";
import { SkylineScene } from "./SkylineScene";
import { SofaSnacks } from "./SofaSnacks";
import { StreetPercussion } from "./StreetPercussion";
import { Switchboard } from "./Switchboard";
import { ToySession } from "./ToySession";
import { ValveAmplifier } from "./ValveAmplifier";
import { Vending } from "./Vending";
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
