import { py, type Solution } from "../types";

export const intervalsPython: Record<string, Solution> = {
  "insert-interval": {
    code: py`
      class Solution:
          def insert(
              self, intervals: List[List[int]], newInterval: List[int]
          ) -> List[List[int]]:
              result = []
              start, end = newInterval
              for s, e in intervals:
                  if e < start:
                      result.append([s, e])
                  elif s > end:
                      result.append([start, end])
                      start, end = s, e
                  else:
                      start, end = min(start, s), max(end, e)
              result.append([start, end])
              return result
    `,
    checks: "",
  },
  "merge-intervals": {
    code: py`
      class Solution:
          def merge(self, intervals: List[List[int]]) -> List[List[int]]:
              merged = []
              for s, e in sorted(intervals):
                  if merged and s <= merged[-1][1]:
                      merged[-1][1] = max(merged[-1][1], e)
                  else:
                      merged.append([s, e])
              return merged
    `,
    checks: "",
  },
  "non-overlapping-intervals": {
    code: py`
      class Solution:
          def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
              removed, end = 0, -inf
              for s, e in sorted(intervals, key=lambda x: x[1]):
                  if s >= end:
                      end = e
                  else:
                      removed += 1
              return removed
    `,
    checks: "",
  },
  "meeting-rooms": {
    code: py`
      class Solution:
          def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
              intervals.sort()
              for a, b in zip(intervals, intervals[1:]):
                  if b[0] < a[1]:
                      return False
              return True
    `,
    checks: "",
  },
  "meeting-rooms-ii": {
    code: py`
      class Solution:
          def minMeetingRooms(self, intervals: List[List[int]]) -> int:
              ends = []
              for s, e in sorted(intervals):
                  if ends and ends[0] <= s:
                      heappop(ends)
                  heappush(ends, e)
              return len(ends)
    `,
    checks: "",
  },
  "minimum-arrows-to-burst-balloons": {
    code: py`
      class Solution:
          def findMinArrowShots(self, points: List[List[int]]) -> int:
              arrows, end = 0, -inf
              for s, e in sorted(points, key=lambda p: p[1]):
                  if s > end:
                      arrows += 1
                      end = e
              return arrows
    `,
    checks: "",
  },
  "interval-list-intersections": {
    code: py`
      class Solution:
          def intervalIntersection(
              self, first: List[List[int]], second: List[List[int]]
          ) -> List[List[int]]:
              result = []
              i = j = 0
              while i < len(first) and j < len(second):
                  lo = max(first[i][0], second[j][0])
                  hi = min(first[i][1], second[j][1])
                  if lo <= hi:
                      result.append([lo, hi])
                  if first[i][1] < second[j][1]:
                      i += 1
                  else:
                      j += 1
              return result
    `,
    checks: "",
  },
};
