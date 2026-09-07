import { C } from "../config";
import { wave } from "../motion";
import { type SceneProps } from "../storyboard";
import { Clouds, Materials, Water } from "./craft";
import { World } from "./shared";
export default function Horizon(p: SceneProps) {
  const { id, t, q } = p;
  return (
    <World p={p}>
      <Materials id={id} />
      <Clouds t={t} y={110} />
      <circle cx="1450" cy={299 + q * 18} r="71" fill={C.sun} />
      <path d="M0 335Q640 224 973 329T1920 301V510H0Z" fill="#566E7B" />
      <Water id={id} t={t} y={377} />
      <path d="M0 552L870 407L1180 487L361 656H0Z" fill="#3B5362" />
      <path d="M0 601L935 437" stroke="#A8B8AE" strokeWidth="7" />
      <path d="M0 629L1005 452" stroke="#809A9B" strokeWidth="4" />
      {Array.from({ length: 13 }, (_, i) => (
        <path
          key={i}
          d={`M${i * 75 - 70} ${650 - i * 15}l118-2`}
          stroke="#20394D"
          strokeWidth={13 - i * 0.55}
        />
      ))}
      <path d="M108 0V562M653 0V462" stroke="#203A4B" strokeWidth="20" />
      <path
        d="M64 44H708L928 146L356 155Z"
        fill="#384E60"
        stroke="#809995"
        strokeWidth="3"
      />
      <path
        d="M108 72L350 155M653 72L872 145"
        stroke="#A5B1A4"
        opacity=".5"
        strokeWidth="4"
      />
      <path d="M344 155v361M876 145v292" stroke="#2C4656" strokeWidth="13" />
      <path d="M483 341h210l43 35H522Z" fill={`url(#${id}-wood)`} />
      <path d="M522 376v94m186-94v61" stroke="#243D4C" strokeWidth="9" />
      <path
        d="M150 404h83v119h-83Z"
        fill="#61757B"
        stroke="#A8B5AC"
        strokeWidth="2"
      />
      <path
        d="M170 404v-22h42v22"
        fill="none"
        stroke="#A8B5AC"
        strokeWidth="5"
      />
      <path d="M153 436h78m-78 35h78" stroke="#304B5C" strokeWidth="5" />
      <path
        d={`M1160 ${320 + wave(t, 16) * 2}q22-14 42 0q20-12 39 0`}
        fill="none"
        stroke="#D0D7C7"
        strokeWidth="2"
      />
    </World>
  );
}
