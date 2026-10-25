import type { Solution } from "../types";
import { advancedGraphsJavascript } from "./advanced-graphs";
import { arraysJavascript } from "./arrays";
import { backtrackingJavascript } from "./backtracking";
import { basicsJavascript } from "./basics";
import { binarySearchJavascript } from "./binary-search";
import { bitsMathJavascript } from "./bits-math";
import { dp1dJavascript } from "./dp-1d";
import { dp2dJavascript } from "./dp-2d";
import { graphsJavascript } from "./graphs";
import { greedyJavascript } from "./greedy";
import { heapJavascript } from "./heap";
import { intervalsJavascript } from "./intervals";
import { linkedListJavascript } from "./linked-list";
import { slidingWindowJavascript } from "./sliding-window";
import { stackJavascript } from "./stack";
import { stringsJavascript } from "./strings";
import { treesJavascript } from "./trees";
import { triesJavascript } from "./tries";
import { twoPointersJavascript } from "./two-pointers";

export const solutions: Record<string, Solution> = {
  ...basicsJavascript,
  ...arraysJavascript,
  ...twoPointersJavascript,
  ...slidingWindowJavascript,
  ...stackJavascript,
  ...binarySearchJavascript,
  ...linkedListJavascript,
  ...treesJavascript,
  ...triesJavascript,
  ...heapJavascript,
  ...backtrackingJavascript,
  ...graphsJavascript,
  ...advancedGraphsJavascript,
  ...dp1dJavascript,
  ...dp2dJavascript,
  ...greedyJavascript,
  ...intervalsJavascript,
  ...bitsMathJavascript,
  ...stringsJavascript,
};
