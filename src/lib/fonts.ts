import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const font = (family: string, file: string, weight: string) =>
  loadFont({
    family,
    url: staticFile(`fonts/${file}`),
    weight,
    style: "normal",
  });

export const LATIN = "Songsmith Barlow";
export const UTILITY = "Songsmith Barlow Regular";
export const latinReady = () =>
  Promise.all([
    font(LATIN, "BarlowSemiCondensed-SemiBold.ttf", "600"),
    font(UTILITY, "BarlowSemiCondensed-Regular.ttf", "400"),
  ]);
