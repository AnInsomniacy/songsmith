import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
export const F = {
  body: "Green Rounded",
  impact: "Green Dela",
  inner: "Green Klee",
  chinese: "Green WenKai",
};
export const fontsReady = Promise.all([
  loadFont({
    family: F.body,
    url: staticFile("songs/green-boys/fonts/Rounded.woff2"),
    weight: "700",
  }),
  loadFont({
    family: F.impact,
    url: staticFile("songs/green-boys/fonts/Dela.woff2"),
    weight: "400",
  }),
  loadFont({
    family: F.inner,
    url: staticFile("songs/green-boys/fonts/Klee.woff2"),
    weight: "600",
  }),
  loadFont({
    family: F.chinese,
    url: staticFile("songs/green-boys/fonts/WenKai.woff2"),
    weight: "400",
  }),
]);
