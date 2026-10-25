import { advancedGraphs } from "./advanced-graphs";
import { arrays } from "./arrays";
import { backtracking } from "./backtracking";
import { basics } from "./basics";
import { binarySearch } from "./binary-search";
import { bitsMath } from "./bits-math";
import { solutions as cppSolutions } from "./cpp";
import { solutions as javaSolutions } from "./java";
import { solutions as javascriptSolutions } from "./javascript";
import { solutions as pythonSolutions } from "./python";
import { dp1d } from "./dp-1d";
import { dp2d } from "./dp-2d";
import { graphs } from "./graphs";
import { greedy } from "./greedy";
import { heap } from "./heap";
import { intervals } from "./intervals";
import { linkedList } from "./linked-list";
import { slidingWindow } from "./sliding-window";
import { stack } from "./stack";
import { strings } from "./strings";
import { trees } from "./trees";
import { tries } from "./tries";
import { twoPointers } from "./two-pointers";
import type { Language, Problem, Solution } from "./types";

export {
  languageInfo,
  languages,
  topics,
  type Difficulty,
  type Language,
  type Problem,
  type Topic,
} from "./types";

const byLanguage: Record<Language, Record<string, Solution>> = {
  cpp: cppSolutions,
  java: javaSolutions,
  python: pythonSolutions,
  javascript: javascriptSolutions,
};

const EMPTY: Solution = { code: "", checks: "" };

// Ordered roughly from fundamentals to advanced topics.
const meta = [
  ...basics,
  ...arrays,
  ...twoPointers,
  ...slidingWindow,
  ...stack,
  ...binarySearch,
  ...linkedList,
  ...trees,
  ...tries,
  ...heap,
  ...backtracking,
  ...graphs,
  ...advancedGraphs,
  ...dp1d,
  ...dp2d,
  ...greedy,
  ...intervals,
  ...bitsMath,
  ...strings,
];

export const problems: Problem[] = meta.map((p, i) => ({
  ...p,
  number: i + 1,
  solutions: {
    cpp: byLanguage.cpp[p.id] ?? EMPTY,
    java: byLanguage.java[p.id] ?? EMPTY,
    python: byLanguage.python[p.id] ?? EMPTY,
    javascript: byLanguage.javascript[p.id] ?? EMPTY,
  },
}));
