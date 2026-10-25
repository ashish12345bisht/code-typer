import { topic } from "./types";

export const arrays = topic("Arrays & Hashing", [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    statement:
      "Given an array `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Exactly one answer exists and you may not use the same element twice.\n\nExample: nums = [2,7,11,15], target = 9 → [0,1]",
    approach:
      "Walk the array once and store each value's index in a hash map. For each number, check whether its complement `target - num` has already been seen.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    statement:
      "Return `true` if any value appears at least twice in `nums`, and `false` if every element is distinct.\n\nExample: nums = [1,2,3,1] → true",
    approach:
      "Keep a set of values seen so far. The first time a value is already in the set, there's a duplicate.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    statement:
      "Given two lowercase strings `s` and `t`, return `true` if `t` is an anagram of `s`: the same letters with the same counts.\n\nExample: s = \"anagram\", t = \"nagaram\" → true",
    approach:
      "Count letters with a 26-slot array: add one for each letter of `s`, subtract one for each letter of `t`. They're anagrams if every count ends at zero.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    statement:
      "Group the strings in `strs` so that anagrams end up together. Return the groups in any order.\n\nExample: [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"] → [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    approach:
      "Anagrams share the same letters once sorted, so use the sorted string as a hash map key and collect each word under its key.",
    time: "O(n · k log k)",
    space: "O(n · k)",
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    statement:
      "Return the `k` most frequent elements of `nums`, in any order.\n\nExample: nums = [1,1,1,2,2,3], k = 2 → [1,2]",
    approach:
      "Count frequencies, then bucket numbers by their count (a count is at most n). Walk the buckets from the highest count down until you have k numbers.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    statement:
      "Return an array where `answer[i]` is the product of every element of `nums` except `nums[i]`, without using division.\n\nExample: nums = [1,2,3,4] → [24,12,8,6]",
    approach:
      "First pass: store the product of everything to the left of each index. Second pass from the right: multiply in the running product of everything to the right.",
    time: "O(n)",
    space: "O(1) extra",
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    statement:
      "Return the length of the longest run of consecutive integers that can be formed from `nums`, in O(n) time.\n\nExample: nums = [100,4,200,1,3,2] → 4 (1,2,3,4)",
    approach:
      "Put every number in a set. Only start counting from numbers that begin a run (n - 1 isn't in the set), then extend upward while the next number exists.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "majority-element",
    title: "Majority Element",
    difficulty: "Easy",
    statement:
      "Return the element that appears more than ⌊n / 2⌋ times in `nums`. It always exists.\n\nExample: nums = [2,2,1,1,1,2,2] → 2",
    approach:
      "Boyer–Moore voting: keep a candidate and a counter. Matching values add a vote, others remove one; when the counter hits zero, switch candidates. The majority survives.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "valid-sudoku",
    title: "Valid Sudoku",
    difficulty: "Medium",
    statement:
      "Decide whether a partially filled 9×9 Sudoku `board` is valid: no digit repeats in any row, column or 3×3 box. Empty cells are \".\".",
    approach:
      "Scan every filled cell once and record keys like \"row 3 has 5\", \"column 1 has 5\" and \"box 4 has 5\" in a set. Seeing a key twice means the board is invalid.",
    time: "O(81)",
    space: "O(81)",
  },
  {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    statement:
      "Return how many contiguous subarrays of `nums` sum to exactly `k`. Values can be negative.\n\nExample: nums = [1,1,1], k = 2 → 2",
    approach:
      "Track the running prefix sum and how often each prefix sum has occurred. A subarray ending here sums to k whenever `sum - k` appeared earlier.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    difficulty: "Easy",
    statement:
      "Move every 0 in `nums` to the end in place, keeping the relative order of the non-zero values.\n\nExample: nums = [0,1,0,3,12] → [1,3,12,0,0]",
    approach:
      "Keep an insert pointer for the next non-zero slot. Swap each non-zero value into that slot and advance it; zeros naturally drift to the end.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    statement:
      "`prices[i]` is a stock's price on day i. Buy on one day and sell on a later day; return the maximum profit, or 0 if no profit is possible.\n\nExample: prices = [7,1,5,3,6,4] → 5",
    approach:
      "Scan once, tracking the lowest price so far. Selling today earns `price - minPrice`; keep the best of those.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "find-all-numbers-disappeared",
    title: "Find All Numbers Disappeared in an Array",
    difficulty: "Easy",
    statement:
      "`nums` has n values in the range [1, n], some repeated. Return every number in that range that doesn't appear, using no extra space besides the output.\n\nExample: nums = [4,3,2,7,8,2,3,1] → [5,6]",
    approach:
      "Use the array as its own hash set: for each value v, mark index v - 1 by making it negative. Indices that stay positive are the missing numbers.",
    time: "O(n)",
    space: "O(1) extra",
  },
  {
    id: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    statement:
      "Rotate an n×n `matrix` 90 degrees clockwise in place.\n\nExample: [[1,2,3],[4,5,6],[7,8,9]] → [[7,4,1],[8,5,2],[9,6,3]]",
    approach:
      "A clockwise rotation is a transpose (swap across the diagonal) followed by reversing each row.",
    time: "O(n²)",
    space: "O(1)",
  },
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    statement:
      "Return all elements of an m×n `matrix` in spiral order, starting top-left and moving clockwise.\n\nExample: [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]",
    approach:
      "Keep four boundaries (top, bottom, left, right). Walk right, down, left and up along them, shrinking each boundary after its pass until they cross.",
    time: "O(m · n)",
    space: "O(1) extra",
  },
  {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    statement:
      "If a cell of `matrix` is 0, set its entire row and column to 0, in place.\n\nExample: [[1,1,1],[1,0,1],[1,1,1]] → [[1,0,1],[0,0,0],[1,0,1]]",
    approach:
      "First pass: record which rows and columns contain a zero. Second pass: zero every cell whose row or column was recorded.",
    time: "O(m · n)",
    space: "O(m + n)",
  },
  {
    id: "first-missing-positive",
    title: "First Missing Positive",
    difficulty: "Hard",
    statement:
      "Return the smallest positive integer that does not appear in the unsorted array `nums`, in O(n) time and O(1) extra space.\n\nExample: nums = [3,4,-1,1] → 2",
    approach:
      "Cyclic sort: swap each value v in [1, n] into index v - 1 until every slot holds its own number or junk. The first index i where nums[i] !== i + 1 gives the answer.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "Easy",
    statement:
      "Return the first `numRows` rows of Pascal's triangle, where each number is the sum of the two numbers above it.\n\nExample: numRows = 5 → [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    approach:
      "Build row by row: each row starts and ends with 1, and every inner value is the sum of the two neighbours above it in the previous row.",
    time: "O(n²)",
    space: "O(n²)",
  },
]);
