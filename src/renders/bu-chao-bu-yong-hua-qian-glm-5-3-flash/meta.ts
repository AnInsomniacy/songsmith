import type { CalculateMetadataFunction } from "remotion";
import { DURATION_FRAMES } from "./lyrics";

export const calculateMetadata: CalculateMetadataFunction<
  Record<string, unknown>
> = () => ({
  durationInFrames: DURATION_FRAMES,
  defaultOutName: "不潮不用花钱 GLM-5.3 Flash",
});
