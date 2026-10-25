import { topic } from "./types";

export const slidingWindow = topic("Sliding Window", [
  {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    statement:
      "Return the length of the longest substring of `s` with no repeated characters.\n\nExample: s = \"abcabcbb\" → 3 (\"abc\")",
    approach:
      "Slide a window and remember each character's last index. When a character repeats inside the window, jump the window start just past its previous position.",
    time: "O(n)",
    space: "O(k) for k distinct characters",
  },
  {
    id: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    statement:
      "You may replace at most `k` characters of uppercase string `s`. Return the length of the longest substring that can be made of one repeated letter.\n\nExample: s = \"AABABBA\", k = 1 → 4",
    approach:
      "A window is valid when `length - maxFreq <= k`. Grow the window, track the highest letter frequency seen, and shrink from the left whenever it becomes invalid.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "permutation-in-string",
    title: "Permutation in String",
    difficulty: "Medium",
    statement:
      "Return `true` if `s2` contains a permutation of `s1` as a substring. Both strings are lowercase.\n\nExample: s1 = \"ab\", s2 = \"eidbaooo\" → true (\"ba\")",
    approach:
      "Keep letter counts for `s1` and for a window of the same length sliding over `s2`. Whenever the two count arrays match, a permutation is present.",
    time: "O(26 · n)",
    space: "O(1)",
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    statement:
      "Return the shortest substring of `s` that contains every character of `t` (including duplicates), or \"\" if none exists.\n\nExample: s = \"ADOBECODEBANC\", t = \"ABC\" → \"BANC\"",
    approach:
      "Count what `t` needs and track how many characters are still missing. Expand the window right until nothing is missing, then shrink from the left while it stays valid, recording the smallest window.",
    time: "O(n + m)",
    space: "O(k)",
  },
  {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    statement:
      "Return the maximum of every window of size `k` as it slides from left to right across `nums`.\n\nExample: nums = [1,3,-1,-3,5,3,6,7], k = 3 → [3,3,5,5,6,7]",
    approach:
      "Keep a deque of indices whose values are decreasing. Drop indices that fall out of the window from the front and smaller values from the back; the front is always the maximum.",
    time: "O(n)",
    space: "O(k)",
  },
  {
    id: "maximum-average-subarray",
    title: "Maximum Average Subarray I",
    difficulty: "Easy",
    statement:
      "Return the maximum average of any contiguous subarray of length `k` in `nums`.\n\nExample: nums = [1,12,-5,-6,50,3], k = 4 → 12.75",
    approach:
      "Sum the first k values, then slide: add the new element and subtract the one leaving. Track the best sum and divide by k at the end.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "minimum-size-subarray-sum",
    title: "Minimum Size Subarray Sum",
    difficulty: "Medium",
    statement:
      "Given positive integers `nums` and `target`, return the length of the shortest contiguous subarray whose sum is at least `target`, or 0 if none exists.\n\nExample: target = 7, nums = [2,3,1,2,4,3] → 2 ([4,3])",
    approach:
      "Grow the window to the right; while its sum reaches the target, record its length and shrink it from the left.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "find-all-anagrams-in-a-string",
    title: "Find All Anagrams in a String",
    difficulty: "Medium",
    statement:
      "Return the start indices of every substring of `s` that is an anagram of `p`. Both are lowercase.\n\nExample: s = \"cbaebabacd\", p = \"abc\" → [0,6]",
    approach:
      "Slide a window of length |p| over `s`, keeping letter counts for it. Each time the counts equal those of `p`, record the window's start.",
    time: "O(26 · n)",
    space: "O(1)",
  },
  {
    id: "fruit-into-baskets",
    title: "Fruit Into Baskets",
    difficulty: "Medium",
    statement:
      "Trees in a row each bear one fruit type, `fruits[i]`. With two baskets that each hold one type, return the most fruit you can pick from a contiguous run of trees.\n\nExample: fruits = [1,2,3,2,2] → 4",
    approach:
      "This is the longest window with at most two distinct values. Count types in the window and shrink from the left whenever a third type appears.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "max-consecutive-ones-iii",
    title: "Max Consecutive Ones III",
    difficulty: "Medium",
    statement:
      "Given a binary array `nums`, return the longest run of 1s you can get by flipping at most `k` zeros.\n\nExample: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2 → 6",
    approach:
      "Find the longest window containing at most k zeros: grow it to the right and shrink from the left whenever the zero count exceeds k.",
    time: "O(n)",
    space: "O(1)",
  },
]);
