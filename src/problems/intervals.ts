import { topic } from "./types";

export const intervals = topic("Intervals", [
  {
    id: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    statement:
      "Insert `newInterval` into sorted, non-overlapping `intervals`, merging where needed, and return the result.\n\nExample: intervals = [[1,3],[6,9]], newInterval = [2,5] → [[1,5],[6,9]]",
    approach:
      "Copy intervals that end before the new one starts, merge every interval that overlaps it into one, then copy the rest.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    statement:
      "Merge all overlapping intervals and return the non-overlapping result.\n\nExample: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]",
    approach: "Sort by start. Extend the last merged interval when the next one overlaps it, otherwise start a new one.",
    time: "O(n log n)",
    space: "O(n)",
  },
  {
    id: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    statement:
      "Return the minimum number of intervals to remove so the rest don't overlap.\n\nExample: [[1,2],[2,3],[3,4],[1,3]] → 1",
    approach:
      "Sort by end time and greedily keep each interval that starts after the last kept one ends; every other interval is removed.",
    time: "O(n log n)",
    space: "O(1)",
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    difficulty: "Easy",
    statement:
      "Given meeting time intervals, return whether one person could attend all of them.\n\nExample: [[0,30],[5,10],[15,20]] → false",
    approach: "Sort by start time and check that no meeting starts before the previous one ends.",
    time: "O(n log n)",
    space: "O(1)",
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    statement:
      "Return the minimum number of rooms needed to hold all the meetings.\n\nExample: [[0,30],[5,10],[15,20]] → 2",
    approach:
      "Sort start and end times separately. Sweep the starts; free a room for every meeting that has ended by then, take a room for this one, and track the peak.",
    time: "O(n log n)",
    space: "O(n)",
  },
  {
    id: "minimum-arrows-to-burst-balloons",
    title: "Minimum Number of Arrows to Burst Balloons",
    difficulty: "Medium",
    statement:
      "Balloons span horizontal ranges `[start, end]`. A vertical arrow at x bursts every balloon covering x. Return the minimum arrows to burst them all.\n\nExample: [[10,16],[2,8],[1,6],[7,12]] → 2",
    approach:
      "Sort by end. Shoot at the end of the first unburst balloon; it bursts every balloon starting at or before that point. Repeat for the next balloon that starts after it.",
    time: "O(n log n)",
    space: "O(1)",
  },
  {
    id: "interval-list-intersections",
    title: "Interval List Intersections",
    difficulty: "Medium",
    statement:
      "Given two sorted lists of disjoint closed intervals, return their intersection.\n\nExample: a = [[0,2],[5,10]], b = [[1,5],[8,12]] → [[1,2],[5,5],[8,10]]",
    approach:
      "Walk both lists with two pointers. The overlap of the current pair is [max start, min end] if non-empty; then advance whichever interval ends first.",
    time: "O(n + m)",
    space: "O(n + m)",
  },
]);
