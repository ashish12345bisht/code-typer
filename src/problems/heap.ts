import { topic } from "./types";

export const heap = topic("Heap", [
  {
    id: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    statement:
      "Return the k-th largest element of `nums` (in sorted order, not the k-th distinct).\n\nExample: nums = [3,2,1,5,6,4], k = 2 → 5",
    approach:
      "Quickselect: partition around a pivot like quicksort, but only continue into the side that contains index n - k. A random pivot makes this O(n) on average.",
    time: "O(n) average",
    space: "O(1)",
  },
  {
    id: "kth-largest-element-in-a-stream",
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    statement:
      "Design a class that is created with `k` and some numbers, and whose `add(val)` returns the k-th largest number seen so far.",
    approach:
      "Keep a min-heap of the k largest values. Push each new value and pop the smallest when the heap grows past k; the top of the heap is the answer.",
    time: "O(log k) per add",
    space: "O(k)",
  },
  {
    id: "last-stone-weight",
    title: "Last Stone Weight",
    difficulty: "Easy",
    statement:
      "Repeatedly smash the two heaviest stones: equal stones both break, otherwise the difference remains. Return the last stone's weight, or 0.\n\nExample: stones = [2,7,4,1,8,1] → 1",
    approach:
      "Put the stones in a max-heap. Repeatedly pop the two heaviest and push back their difference if it's non-zero.",
    time: "O(n² log n)",
    space: "O(1)",
  },
  {
    id: "k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    statement:
      "Return the `k` points closest to the origin (Euclidean distance), in any order.\n\nExample: points = [[3,3],[5,-1],[-2,4]], k = 2 → [[3,3],[-2,4]]",
    approach:
      "Compare squared distances (no square root needed) and sort by them, taking the first k. A max-heap of size k or quickselect gets this to O(n log k) or O(n).",
    time: "O(n log n)",
    space: "O(1) extra",
  },
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    statement:
      "Each task takes one interval, and the same task needs `n` intervals between runs. Return the fewest intervals (including idle ones) to finish all `tasks`.\n\nExample: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2 → 8",
    approach:
      "The most frequent task sets the frame: (maxCount - 1) gaps of n + 1 slots, plus one slot per task tied for the max count. If there are enough tasks to fill every gap, the answer is just the number of tasks.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    statement:
      "Design `addNum(num)` and `findMedian()` for a growing stream of numbers. The median of an even count is the mean of the two middle values.",
    approach:
      "Keep the smaller half in a max-heap and the larger half in a min-heap, balanced so the low heap has the same size or one more. The median is at the top(s).",
    time: "O(log n) add, O(1) median",
    space: "O(n)",
  },
]);
