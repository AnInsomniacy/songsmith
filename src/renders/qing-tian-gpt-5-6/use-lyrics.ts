import {useCallback, useEffect, useState} from "react";
import {staticFile, useDelayRender} from "remotion";
import type {LyricPayload} from "./types";

export const useLyrics = () => {
  const [payload, setPayload] = useState<LyricPayload | null>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender("Loading official QRC timing"));

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        staticFile("songs/qing-tian/data/qing-tian.words.json"),
      );
      if (!response.ok) throw new Error(`Could not load QRC data: ${response.status}`);
      setPayload((await response.json()) as LyricPayload);
      continueRender(handle);
    } catch (error) {
      cancelRender(error instanceof Error ? error : new Error(String(error)));
    }
  }, [cancelRender, continueRender, handle]);

  useEffect(() => {
    load();
  }, [load]);

  return payload;
};
