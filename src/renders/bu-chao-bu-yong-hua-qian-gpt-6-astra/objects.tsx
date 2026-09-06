import React from "react";
import {C} from "./design";
import {transform} from "./motion";

type Position = {x?: number; y?: number; scale?: number; angle?: number};
export const Group: React.FC<Position & {children: React.ReactNode}> = ({x = 0, y = 0, scale = 1, angle = 0, children}) =>
  <g transform={transform(x, y, scale, angle)}>{children}</g>;

export const Shadow: React.FC<{x: number; y: number; rx: number; ry?: number; opacity?: number}> =
  ({x, y, rx, ry = 20, opacity = 0.16}) => <g fill={C.ink}>
    <ellipse cx={x} cy={y + 5} rx={rx * 1.22} ry={ry * 1.45} opacity={opacity * 0.24}/>
    <ellipse cx={x} cy={y} rx={rx} ry={ry} opacity={opacity * 0.46}/>
    <ellipse cx={x} cy={y - 2} rx={rx * 0.77} ry={ry * 0.65} opacity={opacity}/>
  </g>;

export const Room: React.FC<{id: string; wall?: string; floor?: string; horizon?: number; lightX?: number}> =
  ({id, wall = C.porcelain, floor = C.lavender, horizon = 690, lightX = 1180}) => <g>
    <defs>
      <radialGradient id={id + "-room"} cx="70%" cy="20%" r="95%">
        <stop offset="0" stopColor={C.porcelain} stopOpacity=".22"/>
        <stop offset=".65" stopColor={C.ink} stopOpacity="0"/>
        <stop offset="1" stopColor={C.ink} stopOpacity=".18"/>
      </radialGradient>
      <linearGradient id={id + "-floor"} x1="0" x2="0" y1="0" y2="1">
        <stop stopColor={C.ink} stopOpacity=".17"/><stop offset=".2" stopColor={C.ink} stopOpacity="0"/>
        <stop offset="1" stopColor={C.ink} stopOpacity=".11"/>
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill={wall}/>
    <path d={"M0 " + horizon + " Q" + lightX + " " + (horizon - 85) + " 1920 " + horizon + " V1080 H0Z"} fill={floor}/>
    <rect width="1920" height="1080" fill={"url(#" + id + "-room)"}/>
    <path d={"M0 " + horizon + " Q" + lightX + " " + (horizon - 85) + " 1920 " + horizon + " V1080 H0Z"} fill={"url(#" + id + "-floor)"}/>
  </g>;

export const Plinth: React.FC<{x: number; y: number; width: number; height?: number; color?: string; depth?: number}> =
  ({x, y, width, height = 70, color = C.cobalt, depth = 48}) => <g>
    <Shadow x={x + width / 2 + depth / 2} y={y + height + 12} rx={width / 2} ry={20}/>
    <path d={"M" + x + " " + y + " l" + depth + " -" + depth * 0.4 + " h" + width + " l-" + depth + " " + depth * 0.4 + "Z"} fill={color}/>
    <rect x={x} y={y} width={width} height={height} rx="3" fill={color}/>
    <path d={"M" + (x + width) + " " + y + " l" + depth + " -" + depth * 0.4 + " v" + height + " l-" + depth + " " + depth * 0.4 + "Z"} fill={color}/>
    <path d={"M" + (x + width) + " " + y + " l" + depth + " -" + depth * 0.4 + " v" + height + " l-" + depth + " " + depth * 0.4 + "Z"} fill={C.ink} opacity=".23"/>
    <rect x={x} y={y + height - 10} width={width} height="10" fill={C.ink} opacity=".17"/>
    <path d={"M" + (x + 3) + " " + (y + 2) + " H" + (x + width - 2)} stroke={C.porcelain} strokeWidth="3" opacity=".36"/>
  </g>;

export const Button: React.FC<Position & {id: string; color?: string; radius?: number; tilt?: number}> =
  ({id, x = 0, y = 0, scale = 1, angle = 0, color = C.yellow, radius = 135, tilt = 1}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <defs>
      <linearGradient id={id + "-enamel"} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor={C.porcelain} stopOpacity=".65"/>
        <stop offset=".4" stopColor={C.porcelain} stopOpacity="0"/>
        <stop offset=".85" stopColor={C.ink} stopOpacity=".13"/>
        <stop offset="1" stopColor={C.ink} stopOpacity=".34"/>
      </linearGradient>
    </defs>
    <g transform={"scale(1 " + tilt + ")"}>
      <circle cy="17" r={radius} fill={color}/>
      <circle cy="17" r={radius} fill={C.ink} opacity=".3"/>
      <circle r={radius} fill={color}/>
      <circle r={radius} fill={"url(#" + id + "-enamel)"}/>
      <circle r={radius * .82} fill="none" stroke={C.ink} strokeWidth="4" opacity=".15"/>
      <circle cy="-2" r={radius * .81} fill="none" stroke={C.porcelain} strokeWidth="3" opacity=".45"/>
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <g key={i}>
        <circle cx={a * radius * .27} cy={b * radius * .27 + 3} r={radius * .125} fill={C.porcelain} opacity=".7"/>
        <circle cx={a * radius * .27} cy={b * radius * .27} r={radius * .12} fill={C.ink}/>
        <path d={"M" + (a * radius * .27 - radius * .07) + " " + (b * radius * .27 + radius * .02) + " q" + radius * .07 + " " + radius * .05 + " " + radius * .14 + " 0"} stroke={C.porcelain} strokeWidth="2" opacity=".2" fill="none"/>
      </g>)}
      <path d={"M" + (-radius * .65) + " " + (-radius * .5) + " Q" + (-radius * .25) + " " + (-radius * .92) + " " + (radius * .25) + " " + (-radius * .75)} fill="none" stroke={C.porcelain} strokeWidth={radius * .045} opacity=".6" strokeLinecap="round"/>
    </g>
  </Group>;

export const Glove: React.FC<Position & {color?: string; flip?: boolean}> =
  ({x = 0, y = 0, scale = 1, angle = 0, color = C.porcelain, flip = false}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <path d="M-85 141 Q-150 60-127 13 L-168-42 Q-187-78-161-92 Q-140-105-118-76 L-85-42 L-104-164 Q-106-195-83-198 Q-59-198-54-169 L-34-77 L-39-209 Q-39-237-14-235 Q10-233 11-208 L17-77 L26-198 Q30-225 52-219 Q76-213 71-187 L61-67 L81-150 Q89-175 108-168 Q128-160 119-132 L89 5 Q112 95 57 142Z" fill={C.ink} transform="translate(8 13)" opacity=".22"/>
      <path d="M-85 141 Q-150 60-127 13 L-168-42 Q-187-78-161-92 Q-140-105-118-76 L-85-42 L-104-164 Q-106-195-83-198 Q-59-198-54-169 L-34-77 L-39-209 Q-39-237-14-235 Q10-233 11-208 L17-77 L26-198 Q30-225 52-219 Q76-213 71-187 L61-67 L81-150 Q89-175 108-168 Q128-160 119-132 L89 5 Q112 95 57 142Z" fill={color} stroke={C.ink} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M-85-42 Q-55-12-72 32 M-73 78 Q-13 112 48 64 M-31-43 L-27 23 M16-44 L17 19 M59-35 L50 22" fill="none" stroke={C.ink} strokeWidth="4" opacity=".25" strokeLinecap="round"/>
      <path d="M-76 142 L-75 188 L65 188 L61 141Z" fill={C.cobalt}/>
      <path d="M-75 152 H62 M-73 170 H63" stroke={C.porcelain} strokeWidth="3" opacity=".6"/>
    </g>
  </Group>;

export const Shoe: React.FC<Position & {color?: string; flip?: boolean}> =
  ({x = 0, y = 0, scale = 1, angle = 0, color = C.cobalt, flip = false}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <path d="M-173 37 Q-167 0-142-91 L-47-105 Q-25-57 30-31 L149 3 Q187 17 187 49 L173 79 H-170Z" fill={color} stroke={C.ink} strokeWidth="5"/>
      <path d="M-173 40 Q-20 61 184 35 L184 71 Q12 100-176 72Z" fill={C.porcelain} stroke={C.ink} strokeWidth="5"/>
      <path d="M-174 65 Q-6 89 182 59" fill="none" stroke={C.ink} strokeWidth="3"/>
      <path d="M108-5 Q173 1 187 35 Q124 49 66 42 Q69 9 108-5Z" fill={C.porcelain}/>
      <path d="M-48-103 Q-42-61 45-26 L16-6 Q-46-37-81-95Z" fill={C.ink} opacity=".26"/>
      {Array.from({length: 5}, (_, i) => <g key={i}>
        <circle cx={-65 + i * 23} cy={-73 + i * 12} r="5.5" fill={C.porcelain}/>
        <path d={"M" + (-65 + i * 23) + " " + (-73 + i * 12) + " l-26 17"} stroke={C.porcelain} strokeWidth="6" strokeLinecap="round"/>
      </g>)}
      <path d="M-146 4 L-127-71 L-103-73 M-148 14 Q-138 38-84 34" fill="none" stroke={C.porcelain} strokeWidth="3" opacity=".6"/>
      <circle cx="-91" cy="-3" r="18" fill={C.porcelain} opacity=".88"/>
      <circle cx="-91" cy="-3" r="8" fill={color}/>
    </g>
  </Group>;

export const Apple: React.FC<Position> = ({x = 0, y = 0, scale = 1, angle = 0}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <path d="M0-76 C68-116 119-64 103 10 C91 73 40 110 0 86 C-43 110-97 71-105 5 C-114-68-60-107 0-76Z" fill={C.red}/>
    <path d="M57-70 Q119 12 37 83 Q79 74 97 29 Q127-45 57-70Z" fill={C.ink} opacity=".2"/>
    <path d="M-66-34 Q-49-65-29-62" fill="none" stroke={C.porcelain} strokeWidth="13" strokeLinecap="round" opacity=".6"/>
    <path d="M-2-75 Q-15-108 15-128" fill="none" stroke={C.ink} strokeWidth="12" strokeLinecap="round"/>
    <path d="M8-108 Q40-137 71-112 Q44-86 8-108Z" fill={C.cobalt}/>
  </Group>;

export const Chair: React.FC<Position & {open?: number; color?: string}> =
  ({x = 0, y = 0, scale = 1, angle = 0, open = 1, color = C.red}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <g stroke={C.ink} strokeWidth="17" strokeLinecap="round" fill="none">
      <path d={"M-93-21 L" + (-106 - open * 30) + " 175"}/>
      <path d={"M81-21 L" + (95 + open * 43) + " 175"}/>
      <path d={"M-92-65 L" + (-80 + open * 185) + " 153"}/>
      <path d={"M83-65 L" + (75 - open * 185) + " 153"}/>
      <path d="M-96-58 L-112-252 Q-114-275-89-277 H65 Q88-277 92-252 L110-64"/>
    </g>
    <g transform={"translate(0 -204) rotate(" + (-40 * (1 - open)) + ")"}>
      <rect x="-107" y="-55" width="207" height="105" rx="28" fill={color}/>
      <path d="M-87-35 Q-7-47 76-31" stroke={C.porcelain} strokeWidth="6" opacity=".35" fill="none" strokeLinecap="round"/>
      <path d="M-100 24 Q-10 47 97 20" fill="none" stroke={C.ink} strokeWidth="9" opacity=".2"/>
    </g>
    <g transform={"rotate(" + (-72 * (1 - open)) + " -104 -46)"}>
      <path d="M-110-50 L93-64 L132 9 Q30 63-129 18Z" fill={color}/>
      <path d="M-129 18 Q30 63 132 9 V34 Q20 88-129 41Z" fill={color}/>
      <path d="M-129 18 Q30 63 132 9 V34 Q20 88-129 41Z" fill={C.ink} opacity=".22"/>
      <path d="M-103-31 Q-6-38 95-43" fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".5"/>
    </g>
  </Group>;

export const Sofa: React.FC<Position & {color?: string; sink?: number; liftLeft?: number; liftRight?: number}> =
  ({x = 0, y = 0, scale = 1, angle = 0, color = C.red, sink = 0, liftLeft = 0, liftRight = 0}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <path d="M-244 80 L-252 148 H-214 L-195 80 M204 80 L220 148 H257 L246 80" fill={C.ink}/>
    <rect x="-273" y="-199" width="546" height="240" rx="67" fill={color}/>
    <path d="M-231-167 Q0-206 231-167" fill="none" stroke={C.porcelain} strokeWidth="6" opacity=".3"/>
    <rect x="-260" y="-100" width="520" height="210" rx="50" fill={color}/>
    <rect x="-260" y="54" width="520" height="60" rx="27" fill={C.ink} opacity=".23"/>
    <rect x="-218" y={-64 + liftLeft} width="212" height={119 + sink} rx="37" fill={color} stroke={C.ink} strokeWidth="4"/>
    <rect x="7" y={-64 + liftRight} width="213" height={119 + sink} rx="37" fill={color} stroke={C.ink} strokeWidth="4"/>
    <path d={"M-194 " + (-44 + liftLeft) + " Q-113 " + (-61 + liftLeft) + " -26 " + (-44 + liftLeft)} fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".38"/>
    <path d={"M27 " + (-44 + liftRight) + " Q110 " + (-61 + liftRight) + " 196 " + (-44 + liftRight)} fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".38"/>
    <rect x="-304" y="-79" width="85" height="190" rx="38" fill={color} stroke={C.ink} strokeWidth="4"/>
    <rect x="219" y="-79" width="85" height="190" rx="38" fill={color} stroke={C.ink} strokeWidth="4"/>
    <path d="M-280-50 V50 M244-50 V50" stroke={C.porcelain} strokeWidth="7" opacity=".3" strokeLinecap="round"/>
  </Group>;

export const Bear: React.FC<Position & {color?: string; pose?: number}> =
  ({x = 0, y = 0, scale = 1, angle = 0, color = C.lavender, pose = 0}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <g fill={color} stroke={C.ink} strokeWidth="4">
      <rect x="-48" y="65" width="38" height="67" rx="17"/>
      <rect x="10" y="65" width="38" height="67" rx="17"/>
      <rect x="-67" y="-3" width="33" height="81" rx="15" transform={"rotate(" + (pose * 45) + " -50 8)"}/>
      <rect x="34" y="-3" width="33" height="81" rx="15" transform={"rotate(" + (-pose * 55) + " 50 8)"}/>
      <rect x="-42" y="-9" width="84" height="99" rx="28"/>
      <circle cx="-44" cy="-77" r="26"/><circle cx="44" cy="-77" r="26"/>
      <rect x="-63" y="-89" width="126" height="101" rx="43"/>
    </g>
    <path d="M-37-63 Q-11-80 17-71" stroke={C.porcelain} strokeWidth="7" opacity=".5" fill="none" strokeLinecap="round"/>
    <ellipse cy="-21" rx="20" ry="14" fill={C.porcelain} opacity=".7"/>
    <circle cx="-24" cy="-41" r="6" fill={C.ink}/><circle cx="24" cy="-41" r="6" fill={C.ink}/>
    <path d="M-6-27 Q0-32 6-27 L0-19Z" fill={C.ink}/>
    <path d="M-24 23 H24 V50 H-24Z" fill={C.cobalt} opacity=".5"/>
  </Group>;

export const Chick: React.FC<Position & {step?: number}> =
  ({x = 0, y = 0, scale = 1, angle = 0, step = 0}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <path d={"M-16 40 L" + (-20 + step * 14) + " 74 h-17 M21 42 L" + (25 - step * 14) + " 74 h17"} fill="none" stroke={C.ink} strokeWidth="8" strokeLinecap="round"/>
    <ellipse cy="7" rx="61" ry="53" fill={C.yellow}/>
    <circle cx="20" cy="-37" r="48" fill={C.yellow}/>
    <path d="M59-29 L91-15 L60-4Z" fill={C.red}/>
    <path d="M-10 0 Q-45-18-37 28 Q-13 43 6 15" fill="none" stroke={C.ink} strokeWidth="4" opacity=".32"/>
    <circle cx="36" cy="-40" r="6" fill={C.ink}/>
    <path d="M1-76 L-8-94 M12-81 L13-103" stroke={C.yellow} strokeWidth="12" strokeLinecap="round"/>
  </Group>;

export const Coin: React.FC<Position> = ({x = 0, y = 0, scale = 1, angle = 0}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <ellipse cy="5" rx="38" ry="35" fill={C.ink} opacity=".25"/>
    <ellipse rx="38" ry="35" fill={C.yellow}/>
    <ellipse rx="29" ry="26" fill="none" stroke={C.ink} strokeWidth="3" opacity=".25"/>
    <path d="M-8-15 V15 M8-15 V15 M-17-2 H17" stroke={C.ink} strokeWidth="5" opacity=".4"/>
  </Group>;

export const Pocket: React.FC<Position & {open?: number; color?: string}> =
  ({x = 0, y = 0, scale = 1, angle = 0, open = 0, color = C.cobalt}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <path d="M-159-96 H159 L136 117 Q0 235-136 117Z" fill={color}/>
    <path d="M-144-72 H144 L124 106 Q0 209-124 106Z" fill="none" stroke={C.porcelain} strokeWidth="3" strokeDasharray="9 9" opacity=".65"/>
    <ellipse cy="-91" rx="153" ry={9 + open * 62} fill={C.ink}/>
    <path d={"M-158-94 Q0 " + (-52 + open * 80) + " 158-94 L154-63 Q0 " + (-22 + open * 80) + " -154-63Z"} fill={color}/>
    <path d={"M-148-80 Q0 " + (-43 + open * 80) + " 148-80"} fill="none" stroke={C.porcelain} strokeWidth="4" opacity=".4"/>
  </Group>;

export const Shirt: React.FC<Position & {color?: string; spread?: number}> =
  ({x = 0, y = 0, scale = 1, angle = 0, color = C.cobalt, spread = 0}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <path d="M-48-122 L-135-93 L-184-6 L-114 28 L-83-29 L-95 149 Q0 169 95 149 L83-29 L114 28 L184-6 L135-93 L48-122Z" fill={color} stroke={C.ink} strokeWidth="4"/>
    <path d={"M-127-84 L" + (-189 - spread * 37) + " " + (-10 - spread * 85) + " L" + (-133 - spread * 26) + " " + (15 - spread * 82) + " -91-47 M127-84 L" + (189 + spread * 37) + " " + (-10 - spread * 85) + " L" + (133 + spread * 26) + " " + (15 - spread * 82) + " 91-47"} fill={color} stroke={C.ink} strokeWidth="4"/>
    <path d="M-48-122 Q0-87 48-122 L26-83 L0-66 L-26-83Z" fill={C.porcelain}/>
    <path d="M0-64 V152" stroke={C.ink} strokeWidth="3" opacity=".3"/>
    {[-34, 9, 52, 95].map((y) => <circle key={y} cx="8" cy={y} r="5" fill={C.porcelain}/>)}
    <path d="M-62 4 H-19 V47 L-40 61 L-62 47Z" fill="none" stroke={C.porcelain} strokeWidth="3" opacity=".6"/>
    <path d="M-73 132 Q0 145 74 132" fill="none" stroke={C.porcelain} strokeWidth="3" opacity=".5"/>
  </Group>;

export const Hat: React.FC<Position & {color?: string}> =
  ({x = 0, y = 0, scale = 1, angle = 0, color = C.cobalt}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <ellipse cy="40" rx="135" ry="35" fill={C.ink} opacity=".2"/>
    <path d="M-89 25 L-70-86 Q0-130 73-85 L93 25Z" fill={color}/>
    <path d="M-83-6 Q0 20 87-6 V21 Q0 47-88 21Z" fill={C.ink} opacity=".55"/>
    <ellipse cy="33" rx="138" ry="31" fill={color}/>
    <path d="M-101 31 Q0 49 113 28" fill="none" stroke={C.porcelain} strokeWidth="4" opacity=".36"/>
    <path d="M-49-81 Q0-101 49-77" fill="none" stroke={C.porcelain} strokeWidth="5" opacity=".3"/>
  </Group>;

export const Lamp: React.FC<Position & {id: string; aim?: number; glow?: number}> =
  ({x = 0, y = 0, scale = 1, angle = 0, id, aim = 0, glow = 0.2}) => <Group x={x} y={y} scale={scale} angle={angle}>
    <defs><linearGradient id={id + "-light"} x1="0" y1="0" x2="0" y2="1">
      <stop stopColor={C.yellow} stopOpacity={glow}/><stop offset="1" stopColor={C.yellow} stopOpacity="0"/>
    </linearGradient></defs>
    <path d="M0 133 L-5-98 L70-238" fill="none" stroke={C.ink} strokeWidth="13" strokeLinecap="round"/>
    <circle cy="-98" r="15" fill={C.yellow}/>
    <ellipse cy="143" rx="94" ry="22" fill={C.ink}/>
    <ellipse cy="136" rx="94" ry="22" fill={C.cobalt}/>
    <g transform={"rotate(" + aim + " 70 -238)"}>
      <path d="M18-230 L-114 215 H310 L130-230Z" fill={"url(#" + id + "-light)"}/>
      <path d="M34-277 Q80-310 110-277 L144-219 H0Z" fill={C.cobalt} stroke={C.ink} strokeWidth="4"/>
      <ellipse cx="73" cy="-219" rx="73" ry="15" fill={C.yellow}/>
      <path d="M35-270 L18-235" stroke={C.porcelain} strokeWidth="5" opacity=".5" strokeLinecap="round"/>
    </g>
  </Group>;

export const Curtain: React.FC<{x: number; y: number; width: number; height: number; color?: string; pull?: number}> =
  ({x, y, width, height, color = C.cobalt, pull = 0}) => <g transform={"translate(" + x + " " + y + ") scale(" + (1 - pull * .72) + " 1)"}>
    <path d={"M0 0 H" + width + " V" + height + " Q" + width * .8 + " " + (height + 28) + " " + width * .65 + " " + height + " Q" + width * .42 + " " + (height + 30) + " " + width * .3 + " " + height + " Q" + width * .1 + " " + (height + 25) + " 0 " + height + "Z"} fill={color}/>
    {[.12, .34, .58, .82].map((v) => <path key={v} d={"M" + width * v + " 0 Q" + width * (v - .07) + " " + height * .5 + " " + width * v + " " + height} fill="none" stroke={C.ink} strokeWidth={width * .055} opacity=".16"/>)}
  </g>;
