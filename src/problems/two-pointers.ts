import { topic } from "./types";

export const twoPointers = topic("Two Pointers", [
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    statement:
      "Return `true` if `s` reads the same forwards and backwards after lowercasing it and removing every non-alphanumeric character.\n\nExample: \"A man, a plan, a canal: Panama\" → true",
    approach:
      "Clean the string, then move one pointer in from each end, comparing characters until they meet.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "two-sum-ii",
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    statement:
      "`numbers` is sorted in ascending order. Return the 1-indexed positions of the two numbers that add up to `target`, using constant extra space.\n\nExample: numbers = [2,7,11,15], target = 9 → [1,2]",
    approach:
      "Start with pointers at both ends. If the sum is too small move the left pointer right, if too big move the right pointer left.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    statement:
      "Return every unique triplet `[a, b, c]` from `nums` with a + b + c = 0. The answer must not contain duplicate triplets.\n\nExample: nums = [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]",
    approach:
      "Sort the array. Fix each number in turn (skipping repeats) and solve two-sum on the rest with two pointers, skipping duplicates after each match.",
    time: "O(n²)",
    space: "O(1) extra",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    statement:
      "`height[i]` is the height of a vertical line at x = i. Pick two lines that, with the x-axis, hold the most water and return that amount.\n\nExample: height = [1,8,6,2,5,4,8,3,7] → 49",
    approach:
      "Start with the widest container. The shorter line limits the area, so always move the pointer at the shorter line inwards: it's the only move that can improve.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    statement:
      "Given bar heights `height`, return how much rain water is trapped between the bars.\n\nExample: height = [0,1,0,2,1,0,1,3,2,1,2,1] → 6",
    approach:
      "Water above a bar is bounded by the smaller of the tallest bars on its left and right. Move two pointers inwards from the side with the lower max, adding `max - height` as you go.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    statement:
      "Remove duplicates from the sorted array `nums` in place so each value appears once, keeping order. Return the number of unique values k.\n\nExample: nums = [0,0,1,1,1,2,2,3,3,4] → 5",
    approach:
      "A slow pointer marks where the next unique value goes; a fast scan copies a value only when it differs from the last one kept.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "sort-colors",
    title: "Sort Colors",
    difficulty: "Medium",
    statement:
      "`nums` contains only 0s, 1s and 2s. Sort it in place in one pass without a library sort.\n\nExample: nums = [2,0,2,1,1,0] → [0,0,1,1,2,2]",
    approach:
      "Dutch national flag: keep `lo` for the next 0 and `hi` for the next 2. Swap 0s to the front, 2s to the back, and step over 1s.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "merge-sorted-array",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    statement:
      "Merge sorted `nums2` (n values) into sorted `nums1` (m values followed by n empty slots) in place.\n\nExample: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3 → [1,2,2,3,5,6]",
    approach:
      "Fill `nums1` from the back: compare the largest remaining values of each array and write the bigger one into the last free slot.",
    time: "O(m + n)",
    space: "O(1)",
  },
  {
    id: "squares-of-a-sorted-array",
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    statement:
      "Given `nums` sorted in non-decreasing order, return the squares of each number, also sorted.\n\nExample: nums = [-4,-1,0,3,10] → [0,1,9,16,100]",
    approach:
      "The biggest square is at one of the two ends. Compare absolute values at both ends and fill the result from the back.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "is-subsequence",
    title: "Is Subsequence",
    difficulty: "Easy",
    statement:
      "Return `true` if `s` is a subsequence of `t`: its characters appear in `t` in the same order, not necessarily next to each other.\n\nExample: s = \"abc\", t = \"ahbgdc\" → true",
    approach:
      "Walk through `t` with one pointer and advance a pointer in `s` whenever the characters match. `s` is a subsequence if that pointer reaches its end.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "three-sum-closest",
    title: "3Sum Closest",
    difficulty: "Medium",
    statement:
      "Find three numbers in `nums` whose sum is closest to `target` and return that sum. Exactly one answer exists.\n\nExample: nums = [-1,2,1,-4], target = 1 → 2",
    approach:
      "Sort, fix one number, and sweep two pointers over the rest, moving them towards the target and keeping the closest sum seen.",
    time: "O(n²)",
    space: "O(1) extra",
  },
  {
    id: "backspace-string-compare",
    title: "Backspace String Compare",
    difficulty: "Easy",
    statement:
      "In strings `s` and `t`, \"#\" means backspace. Return `true` if both strings are equal after applying the backspaces, using O(1) extra space.\n\nExample: s = \"ab#c\", t = \"ad#c\" → true",
    approach:
      "Walk both strings from the end. Skip characters that would be deleted by counting pending backspaces, then compare the next real character of each.",
    time: "O(n + m)",
    space: "O(1)",
  },
]);
