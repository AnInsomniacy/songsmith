import { C, type SceneProps } from "../design";
import { World } from "./shared";
import { Materials, Parquet, WallPanels, Moulding, Book } from "./craft";
export default function Portrait(p: SceneProps) {
  const { id, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <WallPanels light />
      <Parquet id={id} y={870} />
      <Moulding x={123} y={120} w={510} h={618} id={id} />
      <defs>
        <clipPath id={`${id}-portrait`}>
          <rect x="154" y="151" width="448" height="556" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-portrait)`}>
        <rect x="154" y="151" width="448" height="556" fill="#789698" />
        <path d="M154 500Q290 319 602 427V707H154Z" fill="#51777E" />
        <path d="M154 560Q375 413 602 521V707H154Z" fill="#3A606B" />
        <path
          d="M256 655Q245 464 314 417Q300 266 383 244Q479 244 478 414Q534 457 518 707H227Z"
          fill="#2E414B"
        />
        <path
          d="M333 334Q320 266 388 269Q444 267 435 344Q432 386 407 402L416 439L357 448L360 403Q337 387 333 334"
          fill="#D8B599"
        />
        <path
          d="M349 328q16-10 29 0m20-1q15-10 27-2"
          stroke="#6D5C59"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M389 332l-5 29h12m-24 15q17 8 34-3"
          stroke="#AA7D6B"
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M333 294Q374 255 434 294L452 365L461 271L386 233L318 282Z"
          fill="#384249"
        />
        <path d="M293 466Q349 509 485 465L510 648L282 657Z" fill="#5F6A66" />
        <path d="M316 573q63 14 94 57l-19 18q-65-20-92-42Z" fill="#C6A386" />
        <path d="M469 581q-49 16-101 48l15 22q78-17 103-46Z" fill="#DCBA9A" />
        <path
          d="M315 610l98 27m-43-6l-16 12m32-9l-16 12"
          stroke="#967863"
          strokeWidth="2"
        />
        <path
          d="M291 470q48 46 190 2M292 487q100 35 188 0"
          stroke={C.sun}
          opacity=".22"
          fill="none"
        />
        <rect
          x="154"
          y="151"
          width="448"
          height="556"
          fill={`url(#${id}-paper)`}
        />
      </g>
      <path
        d="M152 165l410 15v42L152 690Z"
        fill={C.white}
        opacity={0.035 + q * 0.035}
      />
      <path d="M93 807H686L744 880H140Z" fill={`url(#${id}-wood)`} />
      <Book x={206} y={786} w={197} color="#627C80" />
      <path d="M632 835q39-76 73-19" stroke={C.sun} fill="none" />
      <path d="M645 825q22-39 44-11q-14 22-44 11" fill={C.coral} />
    </World>
  );
}
