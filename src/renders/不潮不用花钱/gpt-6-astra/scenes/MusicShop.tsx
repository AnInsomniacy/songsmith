import React from "react";
import { C } from "../config";
import { wave } from "../motion";
import { F } from "../typography";
import {
  Backdrop,
  Materials,
  Plant,
  Speaker,
  Tiles,
  Vinyl,
  clock,
  url,
  type SceneProps,
} from "./craft";
export const MusicShop: React.FC<SceneProps> = (p) => {
  const { id, t } = clock(p);
  return (
    <>
      <Materials id={id} top="#C3D8D5" bottom="#E7E5CC" />
      <Backdrop id={id} />
      <path d="M0 30H1920V101H0Z" fill="#B0CBC7" />
      <path
        d="M0 110H1920M0 119H1920"
        stroke="#638F95"
        strokeWidth="3"
        opacity=".25"
      />
      <Tiles x={805} y={120} w={1115} h={798} size={78} color="#8BAEAA" />
      <path
        d="M838 118H1876V948H838Z"
        fill={C.green}
        stroke={C.ink}
        strokeWidth="13"
      />
      <path d="M862 322H1510V896H862Z" fill="#1F3C4D" />
      <path d="M1538 323H1852V896H1538Z" fill="#264955" />
      <path d="M879 735H1494V894H879Z" fill={url(id, "wood")} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g
          key={i}
          transform={`translate(${888 + i * 117} 594) rotate(${i % 2 ? 3 : -2})`}
        >
          <rect
            width="103"
            height="135"
            fill={[C.coral, C.mist, C.yellow, C.paper, C.leaf][i]}
          />
          <circle cx="52" cy="51" r="30" fill={C.ink} />
          <path
            d="M21 96H80M21 109H64"
            stroke={C.ink}
            opacity=".45"
            strokeWidth="4"
          />
        </g>
      ))}
      <Vinyl x={1160} y={483} r={104} t={t * 0.5} color={C.yellow} />
      <path d="M884 747H1500" stroke="#E3B579" strokeWidth="9" />
      <Speaker id={id} x={1630} y={603} w={151} h={242} />
      <rect x="872" y="330" width="625" height="545" fill={url(id, "glass")} />
      <path
        d="M884 347L1187 347L903 805H884ZM1324 347H1399L1073 868H998"
        fill={C.paper}
        opacity=".1"
      />
      <path
        d="M1190 328V895M1533 325V895M1686 329V583"
        stroke="#769A91"
        strokeWidth="9"
      />
      <path
        d="M864 891H1851M864 324H1851"
        stroke={url(id, "metal-line")}
        strokeWidth="11"
      />
      <rect
        x="1563"
        y="650"
        width="18"
        height="138"
        rx="9"
        fill={url(id, "metal")}
        stroke={C.ink}
        strokeWidth="2"
      />
      <path
        d="M801 129H1908V300H801Z"
        fill={C.red}
        stroke="#853D39"
        strokeWidth="5"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d={`M${812 + i * 90} 136h41l12 156h-54Z`}
          fill="#E5A17C"
          opacity=".67"
        />
      ))}
      <path
        d={`M800 293Q1070 ${303 + wave(t, 6) * 3} 1350 293T1907 293V322Q1867 344 1820 323Q1775 345 1730 323Q1685 345 1640 323Q1595 345 1550 323Q1505 345 1460 323Q1415 345 1370 323Q1325 345 1280 323Q1235 345 1190 323Q1145 345 1100 323Q1055 345 1010 323Q965 345 920 323Q875 345 830 323L800 322Z`}
        fill={C.red}
      />
      <rect x="976" y="178" width="750" height="88" rx="7" fill={C.paper} />
      <text
        x="1351"
        y="243"
        textAnchor="middle"
        fontFamily={F.info}
        fontSize="54"
        letterSpacing="9"
        fill={C.ink}
      >
        SOUND &amp; SOMETHING
      </text>
      <path d="M790 918H1917V966H775V939Z" fill="#B2BDAF" />
      <path d="M762 966H1920V1015H738V991Z" fill="#8DA39E" />
      <path d="M733 1015H1920V1080H707Z" fill="#708C8C" />
      <path
        d="M803 938H1878M779 988H1919M748 1040H1920"
        stroke={C.paper}
        opacity=".35"
        strokeWidth="3"
      />
      <Plant x={908} y={964} s={0.62} t={t} />
      <path
        d="M60 920H685M77 963H618M75 966L168 965M514 1028H690"
        stroke="#869E96"
        opacity=".4"
        strokeWidth="3"
      />
      <path d="M658 0L1018 0L164 1080H0V950Z" fill="#FFF0BE" opacity=".12" />
      <path d="M775 152V846" stroke={C.ink} strokeWidth="13" opacity=".15" />
    </>
  );
};
