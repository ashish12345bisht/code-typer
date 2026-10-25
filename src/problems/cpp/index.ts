import type { Solution } from "../types";
import { advancedGraphsCpp } from "./advanced-graphs";
import { arraysCpp } from "./arrays";
import { backtrackingCpp } from "./backtracking";
import { basicsCpp } from "./basics";
import { binarySearchCpp } from "./binary-search";
import { bitsMathCpp } from "./bits-math";
import { dp1dCpp } from "./dp-1d";
import { dp2dCpp } from "./dp-2d";
import { graphsCpp } from "./graphs";
import { greedyCpp } from "./greedy";
import { heapCpp } from "./heap";
import { intervalsCpp } from "./intervals";
import { linkedListCpp } from "./linked-list";
import { slidingWindowCpp } from "./sliding-window";
import { stackCpp } from "./stack";
import { stringsCpp } from "./strings";
import { treesCpp } from "./trees";
import { triesCpp } from "./tries";
import { twoPointersCpp } from "./two-pointers";

export const solutions: Record<string, Solution> = {
  ...basicsCpp,
  ...arraysCpp,
  ...twoPointersCpp,
  ...slidingWindowCpp,
  ...stackCpp,
  ...binarySearchCpp,
  ...linkedListCpp,
  ...treesCpp,
  ...triesCpp,
  ...heapCpp,
  ...backtrackingCpp,
  ...graphsCpp,
  ...advancedGraphsCpp,
  ...dp1dCpp,
  ...dp2dCpp,
  ...greedyCpp,
  ...intervalsCpp,
  ...bitsMathCpp,
  ...stringsCpp,
};
