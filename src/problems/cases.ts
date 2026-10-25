// Test-only: example inputs and outputs shared by the JavaScript, Python and Java harnesses,
// which turn them into checks. (C++ checks are written by hand.)
import data from "./cases.json";

/** How an argument or result is converted: plain JSON, or a linked list / tree. */
export type IOType = "raw" | "list" | "tree" | "lists" | "cycle";

export interface Case {
  /** Function or method to call, or the class to construct for design problems. */
  entry: string;
  /** Design problems: each test is [[methods, args], expected] in LeetCode style. */
  design?: boolean;
  args?: IOType[];
  result?: IOType;
  /** Compare ignoring order of the outer list, or also inside each item. */
  unordered?: "outer" | "deep";
  /** The function mutates its first argument; compare that instead of the return value. */
  inPlace?: boolean;
  tests: [unknown[], unknown][];
}

export const cases = data as unknown as Record<string, Case>;
