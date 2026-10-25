import { java, type Solution } from "../types";

export const intervalsJava: Record<string, Solution> = {
  "insert-interval": {
    code: java`
      class Solution {
          public int[][] insert(int[][] intervals, int[] newInterval) {
              List<int[]> result = new ArrayList<>();
              int start = newInterval[0], end = newInterval[1];
              for (int[] iv : intervals) {
                  if (iv[1] < start) {
                      result.add(iv);
                  } else if (iv[0] > end) {
                      result.add(new int[] {start, end});
                      start = iv[0];
                      end = iv[1];
                  } else {
                      start = Math.min(start, iv[0]);
                      end = Math.max(end, iv[1]);
                  }
              }
              result.add(new int[] {start, end});
              return result.toArray(new int[0][]);
          }
      }
    `,
    checks: "",
  },
  "merge-intervals": {
    code: java`
      class Solution {
          public int[][] merge(int[][] intervals) {
              Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
              List<int[]> merged = new ArrayList<>();
              for (int[] iv : intervals) {
                  int[] last = merged.isEmpty() ? null
                          : merged.get(merged.size() - 1);
                  if (last != null && iv[0] <= last[1]) {
                      last[1] = Math.max(last[1], iv[1]);
                  } else {
                      merged.add(new int[] {iv[0], iv[1]});
                  }
              }
              return merged.toArray(new int[0][]);
          }
      }
    `,
    checks: "",
  },
  "non-overlapping-intervals": {
    code: java`
      class Solution {
          public int eraseOverlapIntervals(int[][] intervals) {
              Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
              int removed = 0;
              long end = Long.MIN_VALUE;
              for (int[] iv : intervals) {
                  if (iv[0] >= end) end = iv[1];
                  else removed++;
              }
              return removed;
          }
      }
    `,
    checks: "",
  },
  "meeting-rooms": {
    code: java`
      class Solution {
          public boolean canAttendMeetings(int[][] intervals) {
              Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
              for (int i = 1; i < intervals.length; i++) {
                  if (intervals[i][0] < intervals[i - 1][1]) return false;
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "meeting-rooms-ii": {
    code: java`
      class Solution {
          public int minMeetingRooms(int[][] intervals) {
              Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
              PriorityQueue<Integer> ends = new PriorityQueue<>();
              for (int[] iv : intervals) {
                  if (!ends.isEmpty() && ends.peek() <= iv[0]) ends.poll();
                  ends.add(iv[1]);
              }
              return ends.size();
          }
      }
    `,
    checks: "",
  },
  "minimum-arrows-to-burst-balloons": {
    code: java`
      class Solution {
          public int findMinArrowShots(int[][] points) {
              Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
              int arrows = 0;
              long end = Long.MIN_VALUE;
              for (int[] p : points) {
                  if (p[0] > end) {
                      arrows++;
                      end = p[1];
                  }
              }
              return arrows;
          }
      }
    `,
    checks: "",
  },
  "interval-list-intersections": {
    code: java`
      class Solution {
          public int[][] intervalIntersection(int[][] first, int[][] second) {
              List<int[]> result = new ArrayList<>();
              int i = 0, j = 0;
              while (i < first.length && j < second.length) {
                  int lo = Math.max(first[i][0], second[j][0]);
                  int hi = Math.min(first[i][1], second[j][1]);
                  if (lo <= hi) result.add(new int[] {lo, hi});
                  if (first[i][1] < second[j][1]) i++;
                  else j++;
              }
              return result.toArray(new int[0][]);
          }
      }
    `,
    checks: "",
  },
};
