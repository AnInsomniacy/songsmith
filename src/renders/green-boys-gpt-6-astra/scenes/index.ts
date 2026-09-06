import window from "./window";
import lockers from "./lockers";
import startline from "./startline";
import gate from "./gate";
import rain from "./rain";
import steps from "./steps";
import grass from "./grass";
import bridge from "./bridge";
import laces from "./laces";
import sign from "./sign";
import curtain from "./curtain";
import storm from "./storm";
import bowl from "./bowl";
import house from "./house";
import kite from "./kite";
import fence from "./fence";
import breakwater from "./breakwater";
import mud from "./mud";
import tree from "./tree";
import stones from "./stones";
import switchback from "./switchback";
import coat from "./coat";
import prints from "./prints";
import crossing from "./crossing";
import canopy from "./canopy";
import bleachers from "./bleachers";
import dandelion from "./dandelion";
import relay from "./relay";
import track from "./track";
import door from "./door";
import ridge from "./ridge";
import fork from "./fork";
import horizon from "./horizon";
import type { ComponentType } from "react";
import type { SceneProps } from "./primitives";
export const SCENES: Record<string, ComponentType<SceneProps>> = {
  window,
  lockers,
  startline,
  gate,
  rain,
  steps,
  grass,
  bridge,
  laces,
  sign,
  curtain,
  storm,
  bowl,
  house,
  kite,
  fence,
  breakwater,
  mud,
  tree,
  stones,
  switchback,
  coat,
  prints,
  crossing,
  canopy,
  bleachers,
  dandelion,
  relay,
  track,
  door,
  ridge,
  fork,
  horizon,
};
