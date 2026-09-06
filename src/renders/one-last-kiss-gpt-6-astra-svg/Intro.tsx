import { C, F, smooth, wave } from "./design";
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
      <path
        d={`M1250 230Q${1470 + wave(t, 16) * 18} 390 1660 235V690Q1450 535 1250 720Z`}
        fill={C.sun}
        opacity=".45"
      />
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
