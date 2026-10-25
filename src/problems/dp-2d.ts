import { topic } from "./types";

export const dp2d = topic("2-D DP", [
  {
    id: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    statement:
      "A robot starts at the top-left of an m×n grid and moves only right or down. Return how many paths reach the bottom-right corner.\n\nExample: m = 3, n = 7 → 28",
    approach:
      "Paths to a cell = paths from above + paths from the left. A single row array is enough: each cell adds the value to its left.",
    time: "O(m · n)",
    space: "O(n)",
  },
  {
    id: "unique-paths-ii",
    title: "Unique Paths II",
    difficulty: "Medium",
    statement:
      "Like Unique Paths, but some cells are obstacles (1) that can't be entered. Return the number of paths.\n\nExample: [[0,0,0],[0,1,0],[0,0,0]] → 2",
    approach: "Same rolling-row DP, but an obstacle cell has 0 paths.",
    time: "O(m · n)",
    space: "O(n)",
  },
  {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    statement:
      "Return the length of the longest subsequence common to strings `a` and `b`.\n\nExample: a = \"abcde\", b = \"ace\" → 3",
    approach:
      "dp[i][j] is the LCS of the first i and j characters: if the characters match it's dp[i-1][j-1] + 1, otherwise the larger of dropping one character from either string.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "edit-distance",
    title: "Edit Distance",
    difficulty: "Medium",
    statement:
      "Return the minimum number of insertions, deletions and replacements to turn `word1` into `word2`.\n\nExample: \"horse\" → \"ros\" = 3",
    approach:
      "dp[i][j] = edits for the first i and j characters. Matching characters cost nothing; otherwise take 1 + the best of insert, delete or replace.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "coin-change-ii",
    title: "Coin Change II",
    difficulty: "Medium",
    statement:
      "Return how many combinations of `coins` (unlimited supply) make `amount`. Order doesn't matter.\n\nExample: amount = 5, coins = [1,2,5] → 4",
    approach:
      "Loop over coins on the outside so each combination is counted once: dp[a] += dp[a - coin].",
    time: "O(amount · coins)",
    space: "O(amount)",
  },
  {
    id: "target-sum",
    title: "Target Sum",
    difficulty: "Medium",
    statement:
      "Put a + or - in front of every number in `nums`. Return how many ways the expression can equal `target`.\n\nExample: nums = [1,1,1,1,1], target = 3 → 5",
    approach: "Track a map from every reachable running sum to the number of ways to reach it, updating it number by number.",
    time: "O(n · sum)",
    space: "O(sum)",
  },
  {
    id: "interleaving-string",
    title: "Interleaving String",
    difficulty: "Medium",
    statement:
      "Return whether `s3` is formed by interleaving `s1` and `s2` while keeping each one's character order.\n\nExample: s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\" → true",
    approach:
      "dp[i][j] says whether the first i characters of s1 and j of s2 form the first i + j of s3. Each cell comes from the cell above (taking from s1) or to the left (from s2). One row suffices.",
    time: "O(m · n)",
    space: "O(n)",
  },
  {
    id: "best-time-with-cooldown",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    statement:
      "Buy and sell as many times as you like, holding at most one share, but after selling you must wait one day before buying again. Return the maximum profit.\n\nExample: prices = [1,2,3,0,2] → 3",
    approach:
      "A small state machine per day: holding a share, just sold, or resting. Each day's states come from the previous day's.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "minimum-path-sum",
    title: "Minimum Path Sum",
    difficulty: "Medium",
    statement:
      "Moving only right or down, return the minimum sum of a path from the top-left to the bottom-right of `grid`.\n\nExample: [[1,3,1],[1,5,1],[4,2,1]] → 7",
    approach: "Each cell's best total is its value plus the smaller of the best totals above and to the left; a single row array holds them.",
    time: "O(m · n)",
    space: "O(n)",
  },
  {
    id: "longest-increasing-path-in-a-matrix",
    title: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    statement:
      "Return the length of the longest strictly increasing path in `matrix`, moving up, down, left or right.\n\nExample: [[9,9,4],[6,6,8],[2,1,1]] → 4 (1→2→6→9)",
    approach:
      "DFS from every cell with memoization: a cell's answer is 1 + the best answer among its larger neighbours, computed once.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "distinct-subsequences",
    title: "Distinct Subsequences",
    difficulty: "Hard",
    statement:
      "Return how many distinct subsequences of `s` equal `t`.\n\nExample: s = \"rabbbit\", t = \"rabbit\" → 3",
    approach:
      "dp[j] counts ways to form the first j characters of t. For each character of s, update j from right to left: if it matches t[j - 1], add dp[j - 1].",
    time: "O(m · n)",
    space: "O(n)",
  },
  {
    id: "burst-balloons",
    title: "Burst Balloons",
    difficulty: "Hard",
    statement:
      "Bursting balloon i earns nums[i - 1] · nums[i] · nums[i + 1] (missing neighbours count as 1), after which its neighbours become adjacent. Return the most coins you can collect.\n\nExample: nums = [3,1,5,8] → 167",
    approach:
      "Pad with 1s and think about the last balloon k burst in each open interval (left, right): it earns vals[left] · vals[k] · vals[right] plus the best of both sides. Fill intervals by increasing length.",
    time: "O(n³)",
    space: "O(n²)",
  },
  {
    id: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    statement:
      "Implement matching of `s` against pattern `p`, where \".\" matches any character and \"*\" matches zero or more of the preceding element. The match must cover the whole string.\n\nExample: s = \"aa\", p = \"a*\" → true",
    approach:
      "dp[i][j] says whether the first i characters of s match the first j of p. For \"x*\", either skip it (j - 2) or, if x matches s[i - 1], consume one character (i - 1).",
    time: "O(m · n)",
    space: "O(m · n)",
  },
]);
