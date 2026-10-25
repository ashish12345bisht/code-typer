import { topic } from "./types";

export const binarySearch = topic("Binary Search", [
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    statement:
      "Given a sorted array `nums` and a `target`, return the target's index or -1 if it isn't present, in O(log n) time.\n\nExample: nums = [-1,0,3,5,9,12], target = 9 → 4",
    approach:
      "Keep a [lo, hi] range. Compare the middle element with the target and discard the half that can't contain it.",
    time: "O(log n)",
    space: "O(1)",
  },
  {
    id: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "Easy",
    statement:
      "Return the index of `target` in sorted `nums`, or the index where it would be inserted to keep the order.\n\nExample: nums = [1,3,5,6], target = 2 → 1",
    approach:
      "Find the lower bound: the first index whose value is at least the target, with a half-open [lo, hi) binary search.",
    time: "O(log n)",
    space: "O(1)",
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    statement:
      "Each row of `matrix` is sorted, and each row starts after the previous one ends. Return `true` if `target` is in the matrix.\n\nExample: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3 → true",
    approach:
      "Treat the matrix as one sorted array of m·n values and binary search it, converting an index to (row, col) with division and modulo.",
    time: "O(log(m · n))",
    space: "O(1)",
  },
  {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    statement:
      "Koko eats at most `k` bananas from one pile per hour. Return the minimum speed k that lets her finish all `piles` within `h` hours.\n\nExample: piles = [3,6,7,11], h = 8 → 4",
    approach:
      "Binary search on the answer: a speed works if the total hours `sum(ceil(pile / k))` is at most h. Find the smallest speed that works.",
    time: "O(n log max)",
    space: "O(1)",
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    statement:
      "A sorted array of unique values was rotated. Return its minimum element in O(log n) time.\n\nExample: nums = [4,5,6,7,0,1,2] → 0",
    approach:
      "Compare the middle with the right end. If the middle is bigger, the minimum is to its right; otherwise it's at the middle or to its left.",
    time: "O(log n)",
    space: "O(1)",
  },
  {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    statement:
      "Search for `target` in a rotated sorted array of unique values and return its index, or -1, in O(log n) time.\n\nExample: nums = [4,5,6,7,0,1,2], target = 0 → 4",
    approach:
      "At each step one half is sorted. Check whether the target lies inside that sorted half's range; if so search there, otherwise search the other half.",
    time: "O(log n)",
    space: "O(1)",
  },
  {
    id: "first-and-last-position",
    title: "Find First and Last Position of Element",
    difficulty: "Medium",
    statement:
      "In sorted `nums`, return the first and last index of `target`, or [-1, -1] if it's missing, in O(log n) time.\n\nExample: nums = [5,7,7,8,8,10], target = 8 → [3,4]",
    approach:
      "Use a lower-bound search twice: once for the target (first position) and once for target + 1 (one past the last position).",
    time: "O(log n)",
    space: "O(1)",
  },
  {
    id: "sqrt-x",
    title: "Sqrt(x)",
    difficulty: "Easy",
    statement:
      "Return the square root of the non-negative integer `x`, rounded down, without using a built-in power or sqrt function.\n\nExample: x = 8 → 2",
    approach:
      "Binary search for the largest m with m * m <= x. Round the midpoint up so the search always makes progress.",
    time: "O(log x)",
    space: "O(1)",
  },
  {
    id: "find-peak-element",
    title: "Find Peak Element",
    difficulty: "Medium",
    statement:
      "A peak is an element strictly greater than its neighbours (the ends count as -∞). Return the index of any peak in O(log n) time.\n\nExample: nums = [1,2,3,1] → 2",
    approach:
      "If the middle is smaller than its right neighbour, a peak must exist to the right (the values have to come down eventually); otherwise one exists at the middle or to its left.",
    time: "O(log n)",
    space: "O(1)",
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    statement:
      "Return the median of two sorted arrays `a` and `b` in O(log(min(m, n))) time.\n\nExample: a = [1,2], b = [3,4] → 2.5",
    approach:
      "Binary search a split of the smaller array so that, together with a matching split of the other, the left halves hold half the elements and every left value is ≤ every right value. The median comes from the values around the split.",
    time: "O(log(min(m, n)))",
    space: "O(1)",
  },
  {
    id: "split-array-largest-sum",
    title: "Split Array Largest Sum",
    difficulty: "Hard",
    statement:
      "Split `nums` into `k` non-empty contiguous parts so that the largest part sum is as small as possible. Return that sum.\n\nExample: nums = [7,2,5,10,8], k = 2 → 18",
    approach:
      "Binary search the answer between max(nums) and sum(nums). For a limit, greedily count how many parts are needed; the smallest limit needing ≤ k parts wins.",
    time: "O(n log sum)",
    space: "O(1)",
  },
  {
    id: "capacity-to-ship-packages",
    title: "Capacity To Ship Packages Within D Days",
    difficulty: "Medium",
    statement:
      "Packages with `weights` must ship in order within `days` days. Return the smallest ship capacity that makes this possible.\n\nExample: weights = [1,2,3,4,5,6,7,8,9,10], days = 5 → 15",
    approach:
      "Binary search the capacity. For each candidate, load packages greedily day by day and count the days needed.",
    time: "O(n log sum)",
    space: "O(1)",
  },
]);
