import data from "../../../../public/songs/One Last Kiss/data/lyrics.json";

export const FPS = 60;

export const FRAMES = Math.ceil(data.audioDurationMs * 0.06);

export const C = {
  night: "#172D46",
  violet: "#716785",
  glass: "#8DC8CD",
  sun: "#F4C7A4",
  coral: "#D67D87",
  white: "#EDF3EF",
};

export { data };
