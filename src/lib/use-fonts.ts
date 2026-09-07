import { useEffect, useState } from "react";
import { useDelayRender } from "remotion";

/** Hold every exported frame until the exact local font files are ready. */
export function useFonts(fonts: Promise<unknown>) {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading local typography"));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fonts
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [fonts, handle, continueRender, cancelRender]);
  return ready;
}
