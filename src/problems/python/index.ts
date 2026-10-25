import type { Solution } from "../types";
import { advancedGraphsPython } from "./advanced-graphs";
import { arraysPython } from "./arrays";
import { backtrackingPython } from "./backtracking";
import { basicsPython } from "./basics";
import { binarySearchPython } from "./binary-search";
import { bitsMathPython } from "./bits-math";
import { dp1dPython } from "./dp-1d";
import { dp2dPython } from "./dp-2d";
import { graphsPython } from "./graphs";
import { greedyPython } from "./greedy";
import { heapPython } from "./heap";
import { intervalsPython } from "./intervals";
import { linkedListPython } from "./linked-list";
import { slidingWindowPython } from "./sliding-window";
import { stackPython } from "./stack";
import { stringsPython } from "./strings";
import { treesPython } from "./trees";
import { triesPython } from "./tries";
import { twoPointersPython } from "./two-pointers";

export const solutions: Record<string, Solution> = {
  ...basicsPython,
  ...arraysPython,
  ...twoPointersPython,
  ...slidingWindowPython,
  ...stackPython,
  ...binarySearchPython,
  ...linkedListPython,
  ...treesPython,
  ...triesPython,
  ...heapPython,
  ...backtrackingPython,
  ...graphsPython,
  ...advancedGraphsPython,
  ...dp1dPython,
  ...dp2dPython,
  ...greedyPython,
  ...intervalsPython,
  ...bitsMathPython,
  ...stringsPython,
};
