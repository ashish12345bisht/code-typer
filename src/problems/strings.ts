import { topic } from "./types";

export const strings = topic("Strings", [
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    statement:
      "Return the longest prefix shared by every string in `strs`, or \"\".\n\nExample: [\"flower\",\"flow\",\"flight\"] → \"fl\"",
    approach: "Start with the first string as the prefix and trim it until each other string starts with it.",
    time: "O(total characters)",
    space: "O(1)",
  },
  {
    id: "reverse-words-in-a-string",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    statement:
      "Reverse the order of the words in `s`. Words are separated by one or more spaces; the result uses single spaces with none at the ends.\n\nExample: \"  hello world  \" → \"world hello\"",
    approach: "Trim, split on runs of spaces, reverse the list of words and join with single spaces.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    statement:
      "Parse a 32-bit signed integer from `s`: skip leading spaces, read an optional sign, read digits until a non-digit, and clamp to the 32-bit range.\n\nExample: \"   -42\" → -42",
    approach: "Follow the rules step by step with an index. Stop reading once the value exceeds 2³¹ and clamp at the end.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    statement: "Convert a Roman numeral to an integer.\n\nExample: \"MCMXCIV\" → 1994",
    approach: "Add each symbol's value, but subtract it when a larger symbol follows (as in IV or CM).",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "integer-to-roman",
    title: "Integer to Roman",
    difficulty: "Medium",
    statement: "Convert an integer from 1 to 3999 to a Roman numeral.\n\nExample: 1994 → \"MCMXCIV\"",
    approach:
      "List the values largest first, including subtractive pairs like 900 (CM). Greedily take each value as many times as it fits.",
    time: "O(1)",
    space: "O(1)",
  },
  {
    id: "find-the-index-of-first-occurrence",
    title: "Find the Index of the First Occurrence in a String",
    difficulty: "Easy",
    statement:
      "Return the index of the first occurrence of `needle` in `haystack`, or -1.\n\nExample: haystack = \"sadbutsad\", needle = \"sad\" → 0",
    approach:
      "KMP: precompute, for each prefix of the needle, the longest proper prefix that's also a suffix. On a mismatch, fall back using that table instead of restarting.",
    time: "O(n + m)",
    space: "O(m)",
  },
  {
    id: "longest-palindrome",
    title: "Longest Palindrome",
    difficulty: "Easy",
    statement:
      "Return the length of the longest palindrome you can build from the letters of `s` (case-sensitive).\n\nExample: s = \"abccccdd\" → 7 (\"dccaccd\")",
    approach:
      "Use every pair of equal letters, so add each count rounded down to even. If any letter has an odd count, one can sit in the middle.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "count-and-say",
    title: "Count and Say",
    difficulty: "Medium",
    statement:
      "\"1\" is the first term, and each next term describes the previous one by counting runs of digits. Return the n-th term.\n\nExample: n = 4 → \"1211\" (1 → 11 → 21 → 1211)",
    approach: "Build each term from the last by scanning runs of equal digits and writing \"count + digit\" for each run.",
    time: "O(n · length)",
    space: "O(length)",
  },
  {
    id: "zigzag-conversion",
    title: "Zigzag Conversion",
    difficulty: "Medium",
    statement:
      "Write `s` in a zigzag pattern over `numRows` rows, then read it row by row.\n\nExample: s = \"PAYPALISHIRING\", numRows = 3 → \"PAHNAPLSIIGYIR\"",
    approach: "Keep one string per row and walk down and up the rows, appending each character to the current row.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "valid-palindrome-ii",
    title: "Valid Palindrome II",
    difficulty: "Easy",
    statement:
      "Return whether `s` can become a palindrome after deleting at most one character.\n\nExample: s = \"abca\" → true (delete \"b\" or \"c\")",
    approach:
      "Compare from both ends. At the first mismatch, try skipping either character and check whether the rest is a palindrome.",
    time: "O(n)",
    space: "O(1)",
  },
]);
