import { topic } from "./types";

export const dp1d = topic("1-D DP", [
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    statement:
      "You climb a staircase of `n` steps, taking 1 or 2 steps at a time. Return how many distinct ways you can reach the top.\n\nExample: n = 5 → 8",
    approach:
      "The ways to reach step i are ways(i - 1) + ways(i - 2): the Fibonacci sequence. Keep only the last two values.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    statement:
      "`cost[i]` is the cost of stepping on stair i, after which you climb 1 or 2 stairs. Starting from stair 0 or 1, return the minimum cost to reach the top (past the last stair).\n\nExample: cost = [10,15,20] → 15",
    approach:
      "The cheapest way to reach position i comes from i - 1 or i - 2 plus that stair's cost. Roll the two previous answers forward.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    statement:
      "Houses in a row hold `nums[i]` money. You can't rob two adjacent houses. Return the most money you can rob.\n\nExample: nums = [2,7,9,3,1] → 12",
    approach:
      "For each house, either skip it (keep the best so far) or rob it (best from two houses back plus this one). Track just those two values.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    statement:
      "Same as House Robber, but the houses form a circle, so the first and last houses are adjacent.\n\nExample: nums = [2,3,2] → 3",
    approach:
      "You can't rob both the first and last house, so solve the straight-line problem twice (without the first house, and without the last) and take the better result.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    statement:
      "Return the longest substring of `s` that is a palindrome.\n\nExample: s = \"babad\" → \"bab\" (\"aba\" is also valid)",
    approach:
      "Every palindrome expands from a centre: a single character or a gap between two. Expand from all 2n - 1 centres and keep the longest.",
    time: "O(n²)",
    space: "O(1)",
  },
  {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    statement:
      "Count the substrings of `s` that are palindromes (substrings at different positions count separately).\n\nExample: s = \"aaa\" → 6",
    approach: "Expand around each of the 2n - 1 centres, counting one palindrome for every successful expansion step.",
    time: "O(n²)",
    space: "O(1)",
  },
  {
    id: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    statement:
      "Letters A–Z are encoded as \"1\"–\"26\". Return how many ways the digit string `s` can be decoded.\n\nExample: s = \"226\" → 3 (\"BZ\", \"VF\", \"BBF\")",
    approach:
      "Ways to decode up to i = (ways up to i - 1 if digit i is 1–9) + (ways up to i - 2 if the last two digits form 10–26). Keep two rolling values.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    statement:
      "Return the fewest coins (unlimited supply of each denomination in `coins`) needed to make `amount`, or -1 if it's impossible.\n\nExample: coins = [1,2,5], amount = 11 → 3 (5 + 5 + 1)",
    approach: "dp[a] = fewest coins for amount a = 1 + min(dp[a - coin]) over coins that fit. Build it up from 0.",
    time: "O(amount · coins)",
    space: "O(amount)",
  },
  {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    statement:
      "Return the largest product of any contiguous subarray of `nums`.\n\nExample: nums = [2,3,-2,4] → 6",
    approach:
      "Track both the largest and smallest product ending at each position, since a negative number turns the smallest into the largest.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    statement:
      "Return whether `s` can be split into a sequence of words from `wordDict` (words can be reused).\n\nExample: s = \"leetcode\", wordDict = [\"leet\",\"code\"] → true",
    approach: "dp[i] is true if some dp[j] is true and s[j..i) is a dictionary word. dp[0] (the empty prefix) is true.",
    time: "O(n² · L)",
    space: "O(n)",
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    statement:
      "Return the length of the longest strictly increasing subsequence of `nums`.\n\nExample: nums = [10,9,2,5,3,7,101,18] → 4 ([2,3,7,101])",
    approach:
      "Patience sorting: `tails[k]` is the smallest possible tail of an increasing subsequence of length k + 1. Binary search where each number fits and replace that tail.",
    time: "O(n log n)",
    space: "O(n)",
  },
  {
    id: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    statement:
      "Return whether `nums` can be split into two subsets with equal sums.\n\nExample: nums = [1,5,11,5] → true ([1,5,5] and [11])",
    approach:
      "We need a subset summing to half the total. Use a 0/1 knapsack boolean array, iterating sums downwards so each number is used once.",
    time: "O(n · sum)",
    space: "O(sum)",
  },
  {
    id: "perfect-squares",
    title: "Perfect Squares",
    difficulty: "Medium",
    statement:
      "Return the fewest perfect squares (1, 4, 9, …) that add up to `n`.\n\nExample: n = 12 → 3 (4 + 4 + 4)",
    approach: "dp[i] = 1 + min(dp[i - j²]) over all squares j² ≤ i, built from dp[0] = 0.",
    time: "O(n √n)",
    space: "O(n)",
  },
  {
    id: "combination-sum-iv",
    title: "Combination Sum IV",
    difficulty: "Medium",
    statement:
      "Return the number of ordered sequences of numbers from `nums` (distinct, reusable) that add up to `target`.\n\nExample: nums = [1,2,3], target = 4 → 7",
    approach:
      "Because order matters, loop over targets on the outside: dp[t] = sum of dp[t - n] for each n ≤ t, starting from dp[0] = 1.",
    time: "O(target · n)",
    space: "O(target)",
  },
]);
