import type { Solution } from "../types";
import { advancedGraphsJava } from "./advanced-graphs";
import { arraysJava } from "./arrays";
import { backtrackingJava } from "./backtracking";
import { basicsJava } from "./basics";
import { binarySearchJava } from "./binary-search";
import { bitsMathJava } from "./bits-math";
import { dp1dJava } from "./dp-1d";
import { dp2dJava } from "./dp-2d";
import { graphsJava } from "./graphs";
import { greedyJava } from "./greedy";
import { heapJava } from "./heap";
import { intervalsJava } from "./intervals";
import { linkedListJava } from "./linked-list";
import { slidingWindowJava } from "./sliding-window";
import { stackJava } from "./stack";
import { stringsJava } from "./strings";
import { treesJava } from "./trees";
import { triesJava } from "./tries";
import { twoPointersJava } from "./two-pointers";

export const solutions: Record<string, Solution> = {
  ...basicsJava,
  ...arraysJava,
  ...twoPointersJava,
  ...slidingWindowJava,
  ...stackJava,
  ...binarySearchJava,
  ...linkedListJava,
  ...treesJava,
  ...triesJava,
  ...heapJava,
  ...backtrackingJava,
  ...graphsJava,
  ...advancedGraphsJava,
  ...dp1dJava,
  ...dp2dJava,
  ...greedyJava,
  ...intervalsJava,
  ...bitsMathJava,
  ...stringsJava,
};
