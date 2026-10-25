import { topic } from "./types";

export const stack = topic("Stack", [
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    statement:
      "Given a string of brackets `()[]{}`, return `true` if every bracket is closed by the same type in the correct order.\n\nExample: s = \"()[]{}\" → true, s = \"(]\" → false",
    approach:
      "Push opening brackets onto a stack. Each closing bracket must match the top of the stack; the string is valid if the stack ends empty.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    statement:
      "Design a stack that supports `push`, `pop`, `top` and retrieving the minimum element with `getMin`, all in O(1) time.",
    approach:
      "Keep a second stack where each entry is the minimum of everything at or below that position. Push and pop both stacks together.",
    time: "O(1) per operation",
    space: "O(n)",
  },
  {
    id: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    statement:
      "Evaluate an arithmetic expression in Reverse Polish Notation, given as `tokens`. Division truncates toward zero.\n\nExample: [\"2\",\"1\",\"+\",\"3\",\"*\"] → 9",
    approach:
      "Push numbers onto a stack. On an operator, pop the top two numbers, apply it (second-popped first), and push the result.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    statement:
      "For each day in `temperatures`, return how many days you'd wait for a warmer temperature, or 0 if it never comes.\n\nExample: [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]",
    approach:
      "Keep a stack of days still waiting, with decreasing temperatures. A warmer day resolves every colder day on top of the stack.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "car-fleet",
    title: "Car Fleet",
    difficulty: "Medium",
    statement:
      "Cars at `position[i]` drive toward `target` at `speed[i]`. A faster car that catches a slower one joins it as a fleet. Return how many fleets arrive.\n\nExample: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3] → 3",
    approach:
      "Sort cars by position from the target backwards and compute each one's arrival time. A car that arrives later than the slowest fleet ahead of it starts a new fleet.",
    time: "O(n log n)",
    space: "O(n)",
  },
  {
    id: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    statement:
      "Given bar heights of a histogram (each bar is 1 wide), return the area of the largest rectangle that fits inside it.\n\nExample: heights = [2,1,5,6,2,3] → 10",
    approach:
      "Keep a stack of bars with increasing heights. When a shorter bar arrives, pop taller bars: each popped bar's rectangle spans from the bar below it in the stack to the current index.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "next-greater-element-i",
    title: "Next Greater Element I",
    difficulty: "Easy",
    statement:
      "`nums1` is a subset of `nums2`. For each value in `nums1`, return the first greater value to its right in `nums2`, or -1.\n\nExample: nums1 = [4,1,2], nums2 = [1,3,4,2] → [-1,3,-1]",
    approach:
      "Scan `nums2` with a decreasing stack; when a bigger value arrives, it's the next greater element for everything it pops. Store those answers in a map.",
    time: "O(n + m)",
    space: "O(n)",
  },
  {
    id: "asteroid-collision",
    title: "Asteroid Collision",
    difficulty: "Medium",
    statement:
      "Asteroids move along a line: positive values go right, negative go left, and the absolute value is the size. On collision the smaller one explodes (both if equal). Return the survivors.\n\nExample: [5,10,-5] → [5,10]",
    approach:
      "Push asteroids onto a stack. A left-moving asteroid fights right-moving ones on top of the stack until it's destroyed or no right-movers remain.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "decode-string",
    title: "Decode String",
    difficulty: "Medium",
    statement:
      "Decode strings like `k[encoded]`, where the encoded part repeats k times. Encodings can be nested.\n\nExample: \"3[a2[c]]\" → \"accaccacc\"",
    approach:
      "On \"[\" push the current string and repeat count onto stacks and start fresh. On \"]\" pop them and append the current string repeated that many times.",
    time: "O(output length)",
    space: "O(n)",
  },
  {
    id: "simplify-path",
    title: "Simplify Path",
    difficulty: "Medium",
    statement:
      "Convert an absolute Unix path to its canonical form: resolve \".\" and \"..\", and collapse repeated slashes.\n\nExample: \"/a/./b/../../c/\" → \"/c\"",
    approach:
      "Split on \"/\" and use a stack of directory names: skip empty parts and \".\", pop on \"..\", push anything else. Join the stack back with slashes.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "remove-k-digits",
    title: "Remove K Digits",
    difficulty: "Medium",
    statement:
      "Remove `k` digits from the number string `num` to make the smallest possible number. Return it without leading zeros (\"0\" if empty).\n\nExample: num = \"1432219\", k = 3 → \"1219\"",
    approach:
      "Build the result with a monotonic stack: while the previous digit is bigger than the current one and removals remain, pop it. Trim any leftover removals from the end.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    statement:
      "Implement a first-in-first-out queue (`push`, `pop`, `peek`, `empty`) using only two stacks.",
    approach:
      "Push onto an input stack. When you need the front, move everything from input to an output stack (reversing the order) only if output is empty. Each element moves at most once.",
    time: "O(1) amortized",
    space: "O(n)",
  },
]);
