import type {ComponentType} from "react";
import type {SceneClock} from "../types";
import {PalmInvitation} from "./PalmInvitation";
import {ShoeboxReveal} from "./ShoeboxReveal";
import {LeftGlove} from "./LeftGlove";
import {BellowsEye} from "./BellowsEye";
import {AppleCatch} from "./AppleCatch";
import {FoldingThought} from "./FoldingThought";
import {KnockingDoor} from "./KnockingDoor";
import {PocketSolo} from "./PocketSolo";
import {RumourHats} from "./RumourHats";
import {OrdinaryShirts} from "./OrdinaryShirts";
import {AppleOrbit} from "./AppleOrbit";
import {SeatCarousel} from "./SeatCarousel";
import {TableKnock} from "./TableKnock";
import {CuffUnlock} from "./CuffUnlock";
import {ChickOnSofa} from "./ChickOnSofa";
import {SofaLowAngle} from "./SofaLowAngle";
import {ChipsOverhead} from "./ChipsOverhead";
import {SofaLamp} from "./SofaLamp";
import {CoatstandGreeting} from "./CoatstandGreeting";
import {CaseGarden} from "./CaseGarden";
import {ButtonPortal} from "./ButtonPortal";
import {AssembledStage} from "./AssembledStage";
import {MirrorPalm} from "./MirrorPalm";
import {ShoeMobile} from "./ShoeMobile";
import {ChairBow} from "./ChairBow";
import {SofaCurtain} from "./SofaCurtain";
import {ButtonHome} from "./ButtonHome";

export const scenes = {
  "palm-invitation": PalmInvitation,
  "shoebox-reveal": ShoeboxReveal,
  "left-glove": LeftGlove,
  "bellows-eye": BellowsEye,
  "apple-catch": AppleCatch,
  "folding-thought": FoldingThought,
  "knocking-door": KnockingDoor,
  "pocket-solo": PocketSolo,
  "rumour-hats": RumourHats,
  "ordinary-shirts": OrdinaryShirts,
  "apple-orbit": AppleOrbit,
  "seat-carousel": SeatCarousel,
  "table-knock": TableKnock,
  "cuff-unlock": CuffUnlock,
  "chick-on-sofa": ChickOnSofa,
  "sofa-low-angle": SofaLowAngle,
  "chips-overhead": ChipsOverhead,
  "sofa-lamp": SofaLamp,
  "coatstand-greeting": CoatstandGreeting,
  "case-garden": CaseGarden,
  "button-portal": ButtonPortal,
  "assembled-stage": AssembledStage,
  "mirror-palm": MirrorPalm,
  "shoe-mobile": ShoeMobile,
  "chair-bow": ChairBow,
  "sofa-curtain": SofaCurtain,
  "button-home": ButtonHome,
} satisfies Record<string, ComponentType<SceneClock>>;
export type ShotId = keyof typeof scenes;
