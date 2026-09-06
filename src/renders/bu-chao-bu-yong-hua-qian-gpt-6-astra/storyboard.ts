import lyrics from "../../../public/songs/bu-chao-bu-yong-hua-qian/data/lyrics.json";
import type {Box, LinePlan, Mark, Page, PageSeed, TimedLine} from "./types";

export const FPS = 60;
export const AUDIO_MS = lyrics.audioDurationMs;
export const DURATION = Math.ceil(AUDIO_MS / 1000 * FPS);
export const data = lyrics;
export const sourceLines: TimedLine[] = lyrics.lines;
const box = (x: number, y: number, width: number, size: number): Box => ({x, y, width, size});
const lowA = box(150, 655, 1600, 116);
const lowB = box(150, 832, 1600, 119);
const highA = box(150, 184, 1570, 118);
const highB = box(150, 370, 1550, 122);
const splitA = box(150, 218, 1200, 122);
const splitB = box(268, 790, 1440, 120);
const m = (text: string, color: Mark["color"] = "accent", role: Mark["role"] = "impact", motion: Mark["motion"] = "tap", size = 1.08): Mark => ({text, color, role, motion, size});
const l = (source: number, position: Box, ...marks: Mark[]): LinePlan => ({source, box: position, marks});

export const seeds = [
  {id: "palm-invitation", tone: "day", lines: [
    l(0, lowA, m("greedy", "secondary", "latin", "turn")),
    l(1, lowB, m("see", "accent", "latin", "unfold"), m("get", "secondary", "latin", "tap")),
  ], action: "手套翻掌，展示一枚纽扣", continuation: "纽扣升起，掌心成为小型展示台"},
  {id: "shoebox-reveal", tone: "day", lines: [
    l(2, splitA, m("name", "accent", "latin", "reach"), m("have", "secondary", "latin", "unfold")),
    l(3, splitB, m("get", "accent", "latin", "tap")),
  ], action: "鞋盒翻开第一片盒盖", continuation: "运动鞋沿盒内斜面登场"},
  {id: "left-glove", tone: "night", lines: [
    l(4, lowA, m("左", "accent", "impact", "reach")),
    l(5, lowB, m("想太多", "secondary", "thought", "lift")),
  ], action: "左手套按四次左字逐次伸出", continuation: "袖口展开，铺出一条可行走的布路"},
  {id: "bellows-eye", tone: "day", lines: [
    l(6, highA, m("怦", "secondary", "impact", "tap"), m("眼睛", "accent", "body", "unfold")),
    l(7, highB, m("强烈", "secondary", "impact", "turn", 1.18)),
  ], action: "手风琴形风箱按怦字吸气", continuation: "百叶打开，光从箱内照到舞台"},
  {id: "apple-catch", tone: "day", lines: [
    l(8, splitA, m("灵光", "accent", "thought", "lift")),
    l(9, splitB, m("牛顿", "secondary", "body", "turn"), m("苹果", "secondary", "impact", "lift")),
  ], action: "台灯转向悬在高处的苹果", continuation: "苹果沿弧线坠入伸出的手套"},
  {id: "folding-thought", tone: "day", lines: [
    l(10, highA, m("念头", "accent", "thought", "unfold")),
    l(11, highB, m("入座", "secondary", "impact", "unfold", 1.14)),
  ], action: "折叠椅的靠背先展开", continuation: "坐面转平，四条腿撑开接住重量"},
  {id: "knocking-door", tone: "night", lines: [
    l(12, box(150, 225, 1030, 122), m("叩叩", "accent", "impact", "tap")),
    l(13, box(150, 816, 1600, 114), m("抠抠", "secondary", "impact", "turn")),
  ], action: "门上的纽扣门环随叩字敲击", continuation: "门板翻开露出口袋，零钱沿门槽滑出"},
  {id: "pocket-solo", tone: "night", lines: [
    l(14, highA, m("扣扣", "accent", "impact", "tap"), m("花掉", "secondary", "body", "reach")),
    l(15, box(150, 387, 1130, 154), m("买不到", "secondary", "thought", "unfold"), m("绝活", "accent", "impact", "turn", 1.15)),
  ], action: "口袋倒出零钱", continuation: "口袋展开为舞台，鞋子接续一整段踢踏独舞"},
  {id: "rumour-hats", tone: "day", lines: [
    l(16, lowA, m("听说", "secondary", "body", "turn"), m("听谁说", "accent", "impact", "reach")),
    l(17, lowB, m("乱走", "secondary", "impact", "turn")),
  ], action: "帽子沿一条弯曲衣帽架接力转头", continuation: "衣帽架分叉，帽子各自走向不同出口"},
  {id: "ordinary-shirts", tone: "day", lines: [
    l(18, highA, m("普通", "accent", "impact", "tap")),
    l(19, highB, m("不懂", "secondary", "thought", "lift"), m("拒绝", "secondary", "impact", "unfold")),
  ], action: "相同衣服按同样姿态排队", continuation: "中间一件伸展双袖，从队列里转身出来"},
  {id: "apple-orbit", tone: "night", lines: [
    l(20, lowA, m("一闪", "accent", "impact", "turn")),
    l(21, lowB, m("苹果", "secondary", "impact", "lift", 1.13)),
  ], action: "俯视台灯沿圆弧掠过玻璃罩", continuation: "罩内苹果脱离摆臂，滑入偏心圆盘"},
  {id: "seat-carousel", tone: "day", lines: [
    l(22, splitA, m("念头", "accent", "thought", "unfold")),
    l(23, splitB, m("限时间", "secondary", "impact", "reach"), m("入座", "accent", "impact", "tap")),
  ], action: "斜向地台转出一把收起的椅子", continuation: "手套轻推椅背，椅子展开并转向观众"},
  {id: "table-knock", tone: "day", lines: [
    l(24, highA, m("叩叩", "accent", "impact", "tap")),
    l(25, highB, m("潮流", "secondary", "body", "reach"), m("没抠抠", "secondary", "impact", "turn")),
  ], action: "俯视手套轻敲圆桌", continuation: "桌上的零钱滑到边缘，空钱包随之张开"},
  {id: "cuff-unlock", tone: "night", lines: [
    l(26, lowA, m("扣扣", "accent", "impact", "tap")),
    l(27, lowB, m("绝活", "accent", "impact", "unfold", 1.18)),
  ], action: "袖口两端拉开纽扣扣眼", continuation: "纽扣转动解锁，袖口展开为两片舞台侧翼"},
  {id: "chick-on-sofa", tone: "day", lines: [
    l(28, lowA, m("chick", "secondary", "latin", "lift"), m("chips", "accent", "latin", "tap")),
    l(29, lowB, m("Bearbricks", "accent", "latin", "turn"), m("sofa", "secondary", "latin", "unfold")),
  ], action: "小鸡沿沙发靠背走向薯片", continuation: "玩具熊坐上另一块坐垫，引起有重量的下陷"},
  {id: "sofa-low-angle", tone: "night", lines: [
    l(30, highA, m("Smudge", "accent", "latin", "unfold")),
    l(31, highB, m("kiks", "secondary", "latin", "tap"), m("sofa", "accent", "latin", "lift")),
  ], action: "低机位看到玩具从坐垫后躺下", continuation: "沙发脚依次踮起，坐垫像琴键一样交替动作"},
  {id: "chips-overhead", tone: "day", lines: [
    l(32, lowA, m("chips", "secondary", "latin", "turn")),
    l(33, lowB, m("Bearbricks", "accent", "latin", "tap")),
  ], action: "俯视薯片沿托盘边缘滚动", continuation: "玩具熊伸手截住托盘，靠垫被推向两侧"},
  {id: "sofa-lamp", tone: "day", lines: [
    l(34, box(150, 807, 1600, 124), m("babies", "accent", "latin", "lift"), m("sofa", "secondary", "latin", "unfold")),
  ], action: "玩具滑进沙发中央的凹槽", continuation: "台灯转向坐垫，房间灯光渐渐聚拢"},
  {id: "coatstand-greeting", tone: "day", lines: [
    l(35, splitA, m("fret", "secondary", "latin", "turn")),
    l(36, splitB, m("see", "accent", "latin", "unfold")),
  ], action: "衣帽架用帽檐向观众致意", continuation: "挂钩展开，手套从另一侧递来一枚纽扣"},
  {id: "case-garden", tone: "night", lines: [
    l(37, highA, m("have", "accent", "latin", "unfold")),
    l(38, highB, m("get", "secondary", "latin", "tap")),
  ], action: "手提箱翻开两侧箱盖", continuation: "箱内卷着的布条展开，成为鞋子的练习路线"},
  {id: "button-portal", tone: "night", lines: [
    l(39, box(150, 215, 1050, 124), m("叩叩", "accent", "impact", "tap")),
    l(40, box(150, 817, 1600, 114), m("抠抠", "secondary", "impact", "turn")),
  ], action: "巨型纽扣在门洞中旋转回应敲击", continuation: "门洞两侧的帘布向后展开，露出宽阔地台"},
  {id: "assembled-stage", tone: "night", lines: [
    l(41, highA, m("花掉", "secondary", "body", "reach")),
    l(42, box(150, 391, 1210, 156), m("绝活", "accent", "impact", "turn", 1.16)),
  ], action: "鞋、椅子和玩具从不同高度进入地台", continuation: "四孔纽扣升起，物件围绕它完成各自的舞步"},
  {id: "mirror-palm", tone: "day", lines: [
    l(43, lowA, m("greedy", "secondary", "latin", "reach")),
    l(44, lowB, m("see", "accent", "latin", "unfold")),
  ], action: "手套沿镜框边缘探出", continuation: "镜面倾转，露出藏在框后的纽扣"},
  {id: "shoe-mobile", tone: "day", lines: [
    l(45, splitA, m("name", "accent", "latin", "reach")),
    l(46, splitB, m("get", "secondary", "latin", "turn")),
  ], action: "悬着的鞋子沿斜向细绳下降", continuation: "鞋带解开悬挂点，鞋底踏上布路"},
  {id: "chair-bow", tone: "night", lines: [
    l(47, highA, m("fret", "secondary", "latin", "lift")),
    l(48, highB, m("get", "accent", "latin", "tap")),
  ], action: "椅子用椅背向前鞠躬", continuation: "双腿转回正面，坐面平稳接住帽子"},
  {id: "sofa-curtain", tone: "day", lines: [
    l(49, lowA, m("have", "accent", "latin", "unfold")),
    l(50, lowB, m("get", "secondary", "latin", "tap")),
  ], action: "高机位看到沙发向房间中央归位", continuation: "侧翼合拢，灯光留下安静的舞台出口"},
  {id: "button-home", tone: "night", lines: [
    l(51, box(150, 808, 1580, 150), m("扣扣扣扣", "accent", "impact", "tap", 1.15)),
  ], action: "纽扣跟随末段扣字完成最后几次转动", continuation: "纽扣沿布路滚回口袋，场景自然安静到曲终"},
] satisfies PageSeed[];

export type SceneId = typeof seeds[number]["id"];
export const pages: Page[] = seeds.map((seed, i) => ({
  ...seed,
  start: Math.round(sourceLines[seed.lines[0].source].startMs / 1000 * FPS),
  end: i + 1 < seeds.length
    ? Math.round(sourceLines[seeds[i + 1].lines[0].source].startMs / 1000 * FPS)
    : DURATION,
}));

const assigned = pages.flatMap((p) => p.lines.map((line) => line.source));
if (assigned.length !== sourceLines.length || new Set(assigned).size !== sourceLines.length) {
  throw new Error("Every retained lyric must belong to exactly one page");
}
if (new Set(pages.map((p) => p.id)).size !== pages.length) throw new Error("Duplicate theatre shot");
for (const page of pages) {
  if (page.end <= page.start) throw new Error("Invalid page duration: " + page.id);
  for (const line of page.lines) {
    for (const mark of line.marks) {
      if (!sourceLines[line.source].text.includes(mark.text)) throw new Error("Unknown emphasis: " + mark.text);
    }
  }
}
