import { C, F, smooth, wave } from "./design";
import { Materials, Moulding, Landscape, Book } from "./scenes/craft";
export function Intro({
  frame,
  backgroundOnly = false,
}: {
  frame: number;
  backgroundOnly?: boolean;
}) {
  const t = frame / 60;
  const credits = smooth((t - 9) / 1.2);
  const p = smooth(t / 15);
  return (
    <g>
      <defs>
        <linearGradient id="intro-wall" x1="0" x2="1" y2="1">
          <stop stopColor={C.night} />
          <stop offset="1" stopColor="#55526D" />
        </linearGradient>
        <linearGradient id="intro-beam">
          <stop stopColor={C.sun} stopOpacity="0" />
          <stop offset="1" stopColor={C.sun} stopOpacity=".5" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#intro-wall)" />
      <Materials id="intro-craft" />
      <path d="M0 885H1920V1080H0Z" fill={C.night} />
      <path
        d="M1190 120H1680V850H1190Z"
        fill={C.glass}
        opacity=".13"
        stroke={C.glass}
        strokeWidth="3"
      />
      <path
        d={`M1220 130L${1700 + p * 160} 0H1920V900L1220 840Z`}
        fill="url(#intro-beam)"
      />
      <Moulding x={1210} y={152} w={480} h={619} id="intro-craft" />
      <Landscape x={1240} y={182} w={420} h={559} id="intro-craft" t={t} />
      <path
        d="M1243 186L1654 632V704L1243 257Z"
        fill={C.white}
        opacity={0.04 + 0.025 * (1 + wave(t, 16))}
      />
      <path
        d="M1150 96H1750M1150 106H1750M1148 92V854M1755 92V854"
        fill="none"
        stroke={C.sun}
        opacity=".23"
      />
      <path d="M1200 846h510l89 40h-510Z" fill="url(#intro-craft-wood)" />
      <path d="M1289 886v110m468-110v110" stroke="#142A40" strokeWidth="14" />
      <Book x={1330} y={813} w={154} color="#8D7F82" angle={-3} />
      <path
        d="M1380 91v37m-26 0h52l9 29h-69Z"
        fill="#698087"
        stroke="#A8B9AF"
        strokeWidth="2"
      />
      <ellipse cx="1380" cy="157" rx="32" ry="5" fill={C.sun} />
      <path d="M1210 860L1445 1030H1900L1665 860Z" fill={C.sun} opacity=".12" />
      <path d="M1695 120V852M1705 120V852" stroke={C.white} opacity=".5" />
      {!backgroundOnly && (
        <g opacity={1 - smooth((t - 19.7) / 0.9)}>
          <g opacity={1 - credits}>
            <text
              x="145"
              y="350"
              fontFamily={F.en}
              fontWeight="500"
              fontSize="151"
              fill={C.white}
            >
              One Last
            </text>
            <text
              x="135"
              y={565}
              fontFamily={F.en}
              fontWeight="500"
              fontSize="233"
              fill={C.sun}
            >
              Kiss
            </text>
            <text
              x="152"
              y="697"
              fontFamily={F.info}
              fontSize="45"
              fill={C.glass}
            >
              宇多田ヒカル
            </text>
          </g>
          <g opacity={credits}>
            <text
              x="150"
              y="365"
              fontFamily={F.en}
              fontSize="42"
              fill={C.glass}
            >
              WORDS / MUSIC
            </text>
            <text
              x="143"
              y="485"
              fontFamily={F.ja}
              fontWeight="600"
              fontSize="94"
              fill={C.white}
            >
              宇多田ヒカル
            </text>
            <text
              x="150"
              y="585"
              fontFamily={F.en}
              fontWeight="500"
              fontSize="46"
              fill={C.sun}
            >
              One Last Kiss
            </text>
          </g>
        </g>
      )}
    </g>
  );
}
