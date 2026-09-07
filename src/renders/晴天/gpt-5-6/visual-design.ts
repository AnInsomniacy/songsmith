export type Chapter = "memory" | "rain" | "clearing";
export type SceneMood =
  | "memory"
  | "playground"
  | "notes"
  | "classroom"
  | "rain"
  | "choice"
  | "distance"
  | "clearing"
  | "farewell";
export type TypeMotion =
  | "plain"
  | "bloom"
  | "swing"
  | "rain"
  | "choice"
  | "wind"
  | "sun"
  | "farewell";

export const COLORS = {
  ink: "#14233A",
  sky: "#AFC9D4",
  cloud: "#DCE4E2",
  paper: "#E8E5DA",
  school: "#31584E",
  rain: "#4C6B8A",
  sun: "#F0C75A",
  red: "#B85B52",
} as const;

export const getChapter = (timeMs: number): Chapter => {
  if (timeMs >= 196_942) return "clearing";
  if (timeMs >= 64_129) return "rain";
  return "memory";
};

export const getSceneMood = (text: string, notesOnly: boolean): SceneMood => {
  if (notesOnly) return "notes";
  if (/拜/u.test(text)) return "farewell";
  if (/放晴/u.test(text)) return "clearing";
  if (/距离|好远/u.test(text)) return "distance";
  if (/等待|离开/u.test(text)) return "choice";
  if (/雨|淋|看不见/u.test(text)) return "rain";
  if (/教室|翘课/u.test(text)) return "classroom";
  if (/童年|秋千|记忆/u.test(text)) return "playground";
  return "memory";
};

const phrasesByLine: Record<string, string[]> = {
  故事的小黄花: ["故事的", "小黄花"],
  从出生那年就飘着: ["从出生那年", "飘着"],
  童年的荡秋千: ["童年的", "荡秋千"],
  随记忆一直晃到现在: ["随记忆", "一直", "晃到现在"],
  吹着前奏望着天空: ["吹着前奏", "望着天空"],
  我想起花瓣试着掉落: ["我想起", "花瓣", "试着掉落"],
  为你翘课的那一天: ["为你", "翘课", "的那一天"],
  花落的那一天: ["花落", "的那一天"],
  教室的那一间: ["教室", "的那一间"],
  我怎么看不见: ["我怎么", "看不见"],
  消失的下雨天: ["消失的", "下雨天"],
  我好想再淋一遍: ["我好想", "再淋一遍"],
  没想到失去的勇气我还留着: ["没想到", "失去的", "勇气", "我还留着"],
  好想再问一遍: ["好想", "再问一遍"],
  你会等待还是离开: ["你会", "等待", "还是", "离开"],
  刮风这天我试过握着你手: ["刮风这天", "我试过", "握着你手"],
  但偏偏雨渐渐大到我看你不见: ["但偏偏", "雨渐渐大", "到我", "看你不见"],
  还要多久我才能在你身边: ["还要多久", "我才能", "在你身边"],
  还要多久我才能够在你身边: ["还要多久", "我才能够", "在你身边"],
  等到放晴的那天也许我会比较好一点: [
    "等到",
    "放晴",
    "的那天",
    "也许我会",
    "比较好一点",
  ],
  等到放晴那天也许我会比较好一点: [
    "等到",
    "放晴",
    "那天",
    "也许我会",
    "比较好一点",
  ],
  从前从前有个人爱你很久: ["从前从前", "有个人", "爱你很久"],
  但偏偏风渐渐把距离吹得好远: ["但偏偏", "风渐渐", "把距离", "吹得好远"],
  偏偏风渐渐把距离吹得好远: ["偏偏", "风渐渐", "把距离", "吹得好远"],
  但偏偏雨渐渐把距离吹得好远: ["但偏偏", "雨渐渐", "把距离", "吹得好远"],
  好不容易又能再多爱一天: ["好不容易", "又能", "再多爱一天"],
  但故事的最后你好像还是说了拜拜: [
    "但故事的最后",
    "你好像",
    "还是说了",
    "拜拜",
  ],
  但故事的最后你好像还是说了拜: ["但故事的最后", "你好像", "还是说了", "拜"],
};

export const splitPhrases = (text: string) => phrasesByLine[text] ?? [text];

export const isEmphasis = (phrase: string) =>
  /小黄花|飘着|荡秋千|晃到现在|天空|花瓣|翘课|花落|教室|看不见|下雨天|再淋一遍|勇气|再问一遍|等待|离开|握着你手|还要多久|在你身边|放晴|爱你很久|距离|好远|多爱一天|拜/u.test(
    phrase,
  );

export const getTypeMotion = (phrase: string): TypeMotion => {
  if (/拜/u.test(phrase)) return "farewell";
  if (/放晴|勇气|爱你很久|多爱一天/u.test(phrase)) return "sun";
  if (/距离|好远|风渐渐|飘着/u.test(phrase)) return "wind";
  if (/等待|离开|还要多久/u.test(phrase)) return "choice";
  if (/雨|淋|看不见/u.test(phrase)) return "rain";
  if (/秋千|晃到现在/u.test(phrase)) return "swing";
  if (/花|天空/u.test(phrase)) return "bloom";
  return "plain";
};

export const getPhraseFont = (phrase: string, motion: TypeMotion) => {
  if (motion === "bloom" || motion === "swing") return "Clear Sky WenKai";
  if (motion === "rain") return "Clear Sky Serif";
  if (motion === "choice" || motion === "farewell") return "Clear Sky Sans";
  if (motion === "wind") return "Clear Sky Sans";
  if (motion === "sun") return "Clear Sky Serif";
  if (/故事|从前|记忆/u.test(phrase)) return "Clear Sky Serif";
  return "Clear Sky WenKai";
};

const sceneTextAccents: [string, string, string][] = [
  ["#B98517", "#367567", "#C15B50"],
  ["#C46055", "#426D62", "#93617D"],
  ["#D6A92E", "#547B9C", "#B44F50"],
  ["#D38E32", "#526FA2", "#8F5E83"],
  ["#C85B4C", "#446D8E", "#B18624"],
  ["#BC6B2D", "#3F766B", "#6A628E"],
  ["#C28D25", "#27688C", "#7A5A8D"],
  ["#B34847", "#3E7665", "#A17A1F"],
  ["#A36B22", "#735487", "#347565"],
  ["#C14D49", "#2B6E8C", "#B68B25"],
  ["#D19A25", "#467B68", "#80608F"],
  ["#A67B26", "#315F86", "#7E557C"],
  ["#B84646", "#365F7F", "#C09225"],
  ["#D1664E", "#367566", "#765985"],
  ["#C65C45", "#506F91", "#9A6A24"],
  ["#B88722", "#236D8A", "#79568B"],
  ["#B83E43", "#397062", "#C29022"],
  ["#C64F49", "#765186", "#356C86"],
  ["#B94248", "#2C6686", "#B58A22"],
  ["#D59A20", "#377B69", "#8A5984"],
  ["#B67F20", "#355F81", "#80577C"],
  ["#B83E43", "#476887", "#B88A24"],
  ["#C3544E", "#2F7187", "#76568A"],
  ["#D59A21", "#397864", "#C35C4D"],
  ["#A97624", "#6B5186", "#B94648"],
  ["#C03F43", "#356D81", "#D09A24"],
];

export const getPhraseColor = (
  phrase: string,
  chapter: Chapter,
  sceneIndex: number,
) => {
  const palette = sceneTextAccents[Math.max(0, Math.min(25, sceneIndex))];
  if (/拜|离开/u.test(phrase)) return palette[2];
  if (/雨|淋|看不见|距离|好远/u.test(phrase)) return palette[1];
  if (/花|勇气|放晴|爱|天空/u.test(phrase)) return palette[0];
  return chapter === "rain"
    ? palette[1]
    : palette[(phrase.length + sceneIndex) % 3];
};
