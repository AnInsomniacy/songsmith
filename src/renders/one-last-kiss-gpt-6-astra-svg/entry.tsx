import { useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Html5Audio,
  staticFile,
  useCurrentFrame,
  delayRender,
  continueRender,
  cancelRender,
} from "remotion";
import { shots, smooth, type Shot } from "./design";
import { fontsReady } from "./fonts";
import { prepare, Lyrics } from "./Lyrics";
import { Intro } from "./Intro";
import { scenes } from "./scenes";
function Art({ shot, frame }: { shot: Shot; frame: number }) {
  const Scene = scenes[shot.id as keyof typeof scenes];
  return (
    <Scene
      shot={shot}
      frame={frame}
      t={(frame - shot.start) / 60}
      q={smooth((frame - shot.second) / 105)}
      id={`svg-${shot.id}`}
    />
  );
}
export default function Film() {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender("Load One Last Kiss SVG fonts"));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fontsReady
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle]);
  const pages = useMemo(() => (ready ? prepare() : []), [ready]);
  const index = shots.reduce(
    (active, s, i) => (frame >= s.start ? i : active),
    -1,
  );
  const shot = shots[index];
  const transition = shot ? smooth((frame - shot.start) / 36) : 0;
  return (
    <AbsoluteFill style={{ background: "#172D46" }}>
      <Html5Audio
        src={staticFile("songs/one-last-kiss/audio/one-last-kiss.mp3")}
      />
      {ready && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ overflow: "hidden", fontSynthesis: "none" }}
        >
          {index < 0 ? (
            <Intro frame={frame} />
          ) : (
            <>
              {transition < 1 &&
                (index === 0 ? (
                  <Intro frame={frame} />
                ) : (
                  <Art shot={shots[index - 1]} frame={frame} />
                ))}
              <g opacity={transition}>
                <Art shot={shot} frame={frame} />
              </g>
              <Lyrics prepared={pages[index]} frame={frame} />
            </>
          )}
        </svg>
      )}
    </AbsoluteFill>
  );
}
