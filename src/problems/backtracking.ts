import { topic } from "./types";

export const backtracking = topic("Backtracking", [
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    statement:
      "Return every subset (the power set) of the unique integers `nums`, in any order.\n\nExample: nums = [1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    approach:
      "Backtrack over start positions: record the current path as a subset, then try adding each later element, recurse, and remove it again.",
    time: "O(n · 2^n)",
    space: "O(n)",
  },
  {
    id: "subsets-ii",
    title: "Subsets II",
    difficulty: "Medium",
    statement:
      "`nums` may contain duplicates. Return every subset without duplicate subsets.\n\nExample: nums = [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]",
    approach:
      "Sort first. While backtracking, skip a number at the same depth if it equals the previous one, so each distinct subset is built once.",
    time: "O(n · 2^n)",
    space: "O(n)",
  },
  {
    id: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    statement:
      "Return every permutation of the distinct integers `nums`, in any order.\n\nExample: nums = [1,2,3] → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    approach:
      "Build permutations position by position, marking which elements are already used. When the path is full, record a copy.",
    time: "O(n · n!)",
    space: "O(n)",
  },
  {
    id: "permutations-ii",
    title: "Permutations II",
    difficulty: "Medium",
    statement:
      "`nums` may contain duplicates. Return all unique permutations.\n\nExample: nums = [1,1,2] → [[1,1,2],[1,2,1],[2,1,1]]",
    approach:
      "Sort, then skip a value equal to the previous one unless that previous copy is already in the path. This uses duplicates in a fixed order, avoiding repeats.",
    time: "O(n · n!)",
    space: "O(n)",
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    statement:
      "Return every unique combination of `candidates` (distinct, reusable any number of times) that sums to `target`.\n\nExample: candidates = [2,3,6,7], target = 7 → [[2,2,3],[7]]",
    approach:
      "Backtrack with a start index so combinations are built in non-decreasing order. Recursing with the same index allows reusing a number.",
    time: "O(2^target) roughly",
    space: "O(target)",
  },
  {
    id: "combination-sum-ii",
    title: "Combination Sum II",
    difficulty: "Medium",
    statement:
      "Each number in `candidates` (which may contain duplicates) can be used once. Return every unique combination summing to `target`.\n\nExample: [10,1,2,7,6,1,5], target = 8 → [[1,1,6],[1,2,5],[1,7],[2,6]]",
    approach:
      "Sort, recurse with i + 1 (each number used once), skip duplicates at the same depth, and stop early once a candidate exceeds what's left.",
    time: "O(2^n)",
    space: "O(n)",
  },
  {
    id: "combinations",
    title: "Combinations",
    difficulty: "Medium",
    statement:
      "Return every combination of `k` numbers chosen from 1 to `n`.\n\nExample: n = 4, k = 2 → [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
    approach: "Backtrack: pick numbers in increasing order starting after the last one picked, and record the path when it has k numbers.",
    time: "O(k · C(n, k))",
    space: "O(k)",
  },
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    statement:
      "Return every well-formed combination of `n` pairs of parentheses.\n\nExample: n = 3 → [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
    approach:
      "Build strings character by character: add \"(\" while fewer than n are open, and \")\" only while it would close an open one.",
    time: "O(4^n / √n)",
    space: "O(n)",
  },
  {
    id: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    statement:
      "Given digits 2–9, return every letter combination they could spell on a phone keypad.\n\nExample: digits = \"23\" → [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
    approach: "Backtrack through the digits, appending each letter mapped to the current digit before moving to the next one.",
    time: "O(4^n · n)",
    space: "O(n)",
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    statement:
      "Return `true` if `word` can be traced on the letter grid `board` through horizontally or vertically adjacent cells, using each cell once.\n\nExample: \"ABCCED\" on [[A,B,C,E],[S,F,C,S],[A,D,E,E]] → true",
    approach:
      "DFS from every cell, matching one letter per step. Temporarily mark the cell as used and restore it when backtracking.",
    time: "O(m · n · 4^L)",
    space: "O(L)",
  },
  {
    id: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    statement:
      "Split `s` into pieces that are all palindromes. Return every possible split.\n\nExample: s = \"aab\" → [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
    approach: "Backtrack over cut positions: take each palindromic prefix of the rest of the string and recurse on what follows.",
    time: "O(n · 2^n)",
    space: "O(n)",
  },
  {
    id: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    statement:
      "Place `n` queens on an n×n board so that none attack each other. Return every solution as rows of \"Q\" and \".\".\n\nExample: n = 4 → [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
    approach:
      "Place one queen per row. Track used columns and both diagonals (r - c and r + c) in sets so each placement check is O(1).",
    time: "O(n!)",
    space: "O(n)",
  },
  {
    id: "pow-x-n",
    title: "Pow(x, n)",
    difficulty: "Medium",
    statement:
      "Compute x raised to the integer power `n` (which may be negative) without a built-in power function.\n\nExample: x = 2, n = 10 → 1024",
    approach:
      "Fast exponentiation by recursion: x^n = (x^(n/2))², times x when n is odd. Handle negative n as 1 / x^-n.",
    time: "O(log n)",
    space: "O(log n)",
  },
  {
    id: "restore-ip-addresses",
    title: "Restore IP Addresses",
    difficulty: "Medium",
    statement:
      "Insert three dots into the digit string `s` to form every valid IPv4 address: four parts, each 0–255 with no leading zeros.\n\nExample: \"25525511135\" → [\"255.255.11.135\",\"255.255.111.35\"]",
    approach:
      "Backtrack over the four parts, trying lengths 1–3 for each. Stop a branch on leading zeros or values over 255, and accept when four parts use the whole string.",
    time: "O(3^4)",
    space: "O(1)",
  },
]);
