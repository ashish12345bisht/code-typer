import { js, type Solution } from "../types";

export const intervalsJavascript: Record<string, Solution> = {
  "insert-interval": {
    code: js`
      function insert(intervals, newInterval) {
        const result = [];
        let [start, end] = newInterval;
        let i = 0;
        while (i < intervals.length && intervals[i][1] < start) {
          result.push(intervals[i++]);
        }
        while (i < intervals.length && intervals[i][0] <= end) {
          start = Math.min(start, intervals[i][0]);
          end = Math.max(end, intervals[i][1]);
          i++;
        }
        result.push([start, end]);
        while (i < intervals.length) result.push(intervals[i++]);
        return result;
      }
    `,
    checks: "",
  },
  "merge-intervals": {
    code: js`
      function merge(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        const merged = [];
        for (const [start, end] of intervals) {
          const last = merged[merged.length - 1];
          if (last && start <= last[1]) last[1] = Math.max(last[1], end);
          else merged.push([start, end]);
        }
        return merged;
      }
    `,
    checks: "",
  },
  "non-overlapping-intervals": {
    code: js`
      function eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let removed = 0;
        let end = -Infinity;
        for (const [s, e] of intervals) {
          if (s >= end) end = e;
          else removed++;
        }
        return removed;
      }
    `,
    checks: "",
  },
  "meeting-rooms": {
    code: js`
      function canAttendMeetings(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        for (let i = 1; i < intervals.length; i++) {
          if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
      }
    `,
    checks: "",
  },
  "meeting-rooms-ii": {
    code: js`
      function minMeetingRooms(intervals) {
        const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
        const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
        let rooms = 0;
        let best = 0;
        let e = 0;
        for (const s of starts) {
          while (ends[e] <= s) {
            e++;
            rooms--;
          }
          rooms++;
          best = Math.max(best, rooms);
        }
        return best;
      }
    `,
    checks: "",
  },
  "minimum-arrows-to-burst-balloons": {
    code: js`
      function findMinArrowShots(points) {
        points.sort((a, b) => a[1] - b[1]);
        let arrows = 0;
        let end = -Infinity;
        for (const [s, e] of points) {
          if (s > end) {
            arrows++;
            end = e;
          }
        }
        return arrows;
      }
    `,
    checks: "",
  },
  "interval-list-intersections": {
    code: js`
      function intervalIntersection(a, b) {
        const result = [];
        let i = 0;
        let j = 0;
        while (i < a.length && j < b.length) {
          const lo = Math.max(a[i][0], b[j][0]);
          const hi = Math.min(a[i][1], b[j][1]);
          if (lo <= hi) result.push([lo, hi]);
          if (a[i][1] < b[j][1]) i++;
          else j++;
        }
        return result;
      }
    `,
    checks: "",
  },
};
