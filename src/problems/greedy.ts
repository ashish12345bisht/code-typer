import { topic } from "./types";

export const greedy = topic("Greedy", [
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    statement:
      "Return the largest sum of any non-empty contiguous subarray of `nums`.\n\nExample: nums = [-2,1,-3,4,-1,2,1,-5,4] → 6 ([4,-1,2,1])",
    approach:
      "Kadane's algorithm: at each element, either extend the current subarray or start fresh from this element, whichever is larger. Track the best sum seen.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    statement:
      "From index i you can jump up to `nums[i]` steps forward. Starting at index 0, return whether you can reach the last index.\n\nExample: nums = [3,2,1,0,4] → false",
    approach: "Track the farthest index reachable so far. If you ever stand beyond it, you're stuck.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    statement:
      "Same jumps as Jump Game, and the end is always reachable. Return the minimum number of jumps to reach the last index.\n\nExample: nums = [2,3,1,1,4] → 2",
    approach:
      "BFS in disguise: the current jump covers indices up to `end`. While scanning that range track the farthest next reach; when you hit `end`, take a jump.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "gas-station",
    title: "Gas Station",
    difficulty: "Medium",
    statement:
      "Stations on a circle give `gas[i]`, and driving to the next costs `cost[i]`. Return the starting station that lets you complete the loop, or -1.\n\nExample: gas = [1,2,3,4,5], cost = [3,4,5,1,2] → 3",
    approach:
      "If total gas ≥ total cost, an answer exists. Drive from a start; whenever the tank goes negative, no station up to here can be the start, so restart from the next one.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "hand-of-straights",
    title: "Hand of Straights",
    difficulty: "Medium",
    statement:
      "Return whether the cards in `hand` can be split into groups of `groupSize` consecutive values.\n\nExample: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3 → true",
    approach:
      "Count the cards and go through values in increasing order. The smallest remaining value must start a group, so take that many of each of the next groupSize values.",
    time: "O(n log n)",
    space: "O(n)",
  },
  {
    id: "merge-triplets",
    title: "Merge Triplets to Form Target Triplet",
    difficulty: "Medium",
    statement:
      "Merging two triplets takes the element-wise maximum. Return whether some sequence of merges can produce `target`.\n\nExample: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5] → true",
    approach:
      "Ignore any triplet with a value above the target (it would overshoot). Among the rest, check that each target value is matched by at least one triplet.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "partition-labels",
    title: "Partition Labels",
    difficulty: "Medium",
    statement:
      "Split `s` into as many parts as possible so each letter appears in at most one part. Return the part sizes.\n\nExample: \"ababcbacadefegdehijhklij\" → [9,7,8]",
    approach:
      "Record each letter's last index. Extend the current part's end to the last index of every letter in it; when you reach the end, close the part.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "valid-parenthesis-string",
    title: "Valid Parenthesis String",
    difficulty: "Medium",
    statement:
      "`s` contains \"(\", \")\" and \"*\", where \"*\" can be \"(\", \")\" or empty. Return whether `s` can be valid.\n\nExample: s = \"(*))\" → true",
    approach:
      "Track the range [lo, hi] of possible open-bracket counts. \"*\" widens the range; fail if hi drops below 0, and clamp lo at 0. Valid if lo can end at 0.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "assign-cookies",
    title: "Assign Cookies",
    difficulty: "Easy",
    statement:
      "Child i is content with a cookie of size at least `g[i]`; cookie j has size `s[j]`. Each child gets at most one cookie. Return the most content children.\n\nExample: g = [1,2,3], s = [1,1] → 1",
    approach: "Sort both. Walk the cookies from smallest, giving each to the least greedy child it satisfies.",
    time: "O(n log n)",
    space: "O(1)",
  },
  {
    id: "candy",
    title: "Candy",
    difficulty: "Hard",
    statement:
      "Children stand in a line with `ratings`. Each gets at least one candy, and a child with a higher rating than a neighbour gets more than that neighbour. Return the minimum total.\n\nExample: ratings = [1,0,2] → 5",
    approach:
      "Two passes: left to right, give one more than the left neighbour when rated higher; right to left, make sure each child also beats a lower-rated right neighbour.",
    time: "O(n)",
    space: "O(n)",
  },
]);
