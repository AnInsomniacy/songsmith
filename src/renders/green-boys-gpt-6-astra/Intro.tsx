import { measureText } from "@remotion/layout-utils";
import { F } from "./fonts";
import { P } from "./design";
import {
  World,
  Cloud,
  Sprig,
  SceneProps,
  wave,
  ease,
} from "./scenes/primitives";

export function IntroWorld({ t, phase, id }: SceneProps) {
  const w = wave(t);
  return (
    <World id={id} fill={P.sky}>
      <Cloud x={1230 + 30 * w} y={135} s={1.8} />
      <path
        d="M0 980Q1040 940 1460 720Q1780 635 1920 760V1080H0Z"
        fill={P.leaf}
      />
      <path d="M1170 1080L1500 735L1560 735L1650 1080Z" fill={P.cloud} />
      <g
        opacity={1 - phase}
        transform={`translate(1480 775) rotate(${-6 + 2 * w})`}
      >
        <path d="M-260-580H190V70H-260Z" fill={P.pine} />
        <path d="M-235-555H165V45H-235Z" fill={P.sun} />
        <path
          d="M-235-555L-35-450L165-555"
          stroke={P.pine}
          strokeWidth="5"
          fill="none"
        />
        <Sprig x={-35} y={-50} s={1.35} angle={3 * w} fill={P.pine} />
        <path d="M-165-26H95" stroke={P.pine} strokeWidth="5" />
      </g>
      <g opacity={phase} transform={`translate(${80 * (1 - phase)} 0)`}>
        <path
          d="M1200 965V255H1810V965M1170 238H1840"
          fill="none"
          stroke={P.pine}
          strokeWidth="25"
        />
        <path
          d={`M1230 730L${1770 - 140 * phase} ${730 - 380 * phase}`}
          stroke={P.cloud}
          strokeWidth="32"
        />
      </g>
      <Sprig x={1820} y={1030} s={1.5} angle={7 * w} />
    </World>
  );
}

function Title({
  text,
  x,
  y,
  size,
  start,
  frame,
  color = P.pine,
}: {
  text: string;
  x: number;
  y: number;
  size: number;
  start: number;
  frame: number;
  color?: string;
}) {
  let cursor = 0;
  return (
    <g>
      {Array.from(text).map((char, i) => {
        const width = measureText({
          text: char,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: size,
          validateFontIsLoaded: true,
        }).width;
        const cx = x + cursor;
        cursor += width + 1;
        if (frame < start + i * 4) return null;
        const p = ease((frame - start - i * 4) / 14);
        return (
          <text
            key={i}
            x={cx}
            y={y + 20 * (1 - p)}
            fill={color}
            fontFamily={F.body}
            fontSize={size}
            fontWeight="700"
            opacity={p}
          >
            {char}
          </text>
        );
      })}
    </g>
  );
}

export function IntroText({ frame }: { frame: number }) {
  const credits = frame >= 320;
  const p = ease((frame - (credits ? 320 : 1)) / 16);
  return (
    <svg
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <rect
        x="105"
        y="208"
        width="965"
        height="650"
        rx="12"
        fill={credits ? P.pine : P.cloud}
        opacity={p}
      />
      {credits ? (
        <>
          <Title
            text="WORDS · MUSIC"
            x={152}
            y={315}
            size={40}
            start={325}
            frame={frame}
            color={P.sky}
          />
          <Title
            text="GReeeeN"
            x={145}
            y={457}
            size={115}
            start={345}
            frame={frame}
            color={P.cloud}
          />
          <Title
            text="ARRANGEMENT"
            x={152}
            y={610}
            size={40}
            start={400}
            frame={frame}
            color={P.sky}
          />
          <Title
            text="JIN"
            x={145}
            y={756}
            size={112}
            start={420}
            frame={frame}
            color={P.sun}
          />
        </>
      ) : (
        <>
          <Title
            text="Green"
            x={145}
            y={390}
            size={178}
            start={4}
            frame={frame}
          />
          <Title
            text="boys"
            x={145}
            y={588}
            size={178}
            start={22}
            frame={frame}
          />
          <Title
            text="GReeeeN"
            x={154}
            y={756}
            size={69}
            start={78}
            frame={frame}
            color={P.clay}
          />
        </>
      )}
    </svg>
  );
}

export function Cover() {
  return (
    <>
      <IntroWorld t={0} phase={0} id="green-cover" />
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path d="M106 208H1070V858H106Z" fill={P.cloud} />
        <text
          x="145"
          y="390"
          fontFamily={F.body}
          fontWeight="700"
          fontSize="178"
          fill={P.pine}
        >
          Green
        </text>
        <text
          x="145"
          y="588"
          fontFamily={F.body}
          fontWeight="700"
          fontSize="178"
          fill={P.pine}
        >
          boys
        </text>
        <text
          x="154"
          y="756"
          fontFamily={F.body}
          fontWeight="700"
          fontSize="69"
          fill={P.clay}
        >
          GReeeeN
        </text>
      </svg>
    </>
  );
}
