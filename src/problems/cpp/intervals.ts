import { cpp, type Solution } from "../types";

export const intervalsCpp: Record<string, Solution> = {
  "insert-interval": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> insert(vector<vector<int>>& intervals,
                                     vector<int>& newInterval) {
              vector<vector<int>> result;
              int start = newInterval[0], end = newInterval[1], i = 0;
              int n = intervals.size();
              while (i < n && intervals[i][1] < start) {
                  result.push_back(intervals[i++]);
              }
              while (i < n && intervals[i][0] <= end) {
                  start = min(start, intervals[i][0]);
                  end = max(end, intervals[i][1]);
                  i++;
              }
              result.push_back({start, end});
              while (i < n) result.push_back(intervals[i++]);
              return result;
          }
      };
    `,
    checks: "",
  },
  "merge-intervals": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> merge(vector<vector<int>>& intervals) {
              sort(intervals.begin(), intervals.end());
              vector<vector<int>> merged;
              for (auto& in : intervals) {
                  if (!merged.empty() && in[0] <= merged.back()[1]) {
                      merged.back()[1] = max(merged.back()[1], in[1]);
                  } else {
                      merged.push_back(in);
                  }
              }
              return merged;
          }
      };
    `,
    checks: "",
  },
  "non-overlapping-intervals": {
    code: cpp`
      class Solution {
      public:
          int eraseOverlapIntervals(vector<vector<int>>& intervals) {
              sort(intervals.begin(), intervals.end(),
                   [](auto& a, auto& b) { return a[1] < b[1]; });
              int removed = 0;
              long long end = LLONG_MIN;
              for (auto& in : intervals) {
                  if (in[0] >= end) end = in[1];
                  else removed++;
              }
              return removed;
          }
      };
    `,
    checks: "",
  },
  "meeting-rooms": {
    code: cpp`
      class Solution {
      public:
          bool canAttendMeetings(vector<vector<int>>& intervals) {
              sort(intervals.begin(), intervals.end());
              for (int i = 1; i < intervals.size(); i++) {
                  if (intervals[i][0] < intervals[i - 1][1]) return false;
              }
              return true;
          }
      };
    `,
    checks: "",
  },
  "meeting-rooms-ii": {
    code: cpp`
      class Solution {
      public:
          int minMeetingRooms(vector<vector<int>>& intervals) {
              vector<int> starts, ends;
              for (auto& in : intervals) {
                  starts.push_back(in[0]);
                  ends.push_back(in[1]);
              }
              sort(starts.begin(), starts.end());
              sort(ends.begin(), ends.end());
              int rooms = 0, best = 0, e = 0;
              for (int s : starts) {
                  while (e < ends.size() && ends[e] <= s) {
                      e++;
                      rooms--;
                  }
                  best = max(best, ++rooms);
              }
              return best;
          }
      };
    `,
    checks: "",
  },
  "minimum-arrows-to-burst-balloons": {
    code: cpp`
      class Solution {
      public:
          int findMinArrowShots(vector<vector<int>>& points) {
              sort(points.begin(), points.end(),
                   [](auto& a, auto& b) { return a[1] < b[1]; });
              int arrows = 0;
              long long end = LLONG_MIN;
              for (auto& p : points) {
                  if (p[0] > end) {
                      arrows++;
                      end = p[1];
                  }
              }
              return arrows;
          }
      };
    `,
    checks: "",
  },
  "interval-list-intersections": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> intervalIntersection(vector<vector<int>>& a,
                                                   vector<vector<int>>& b) {
              vector<vector<int>> result;
              int i = 0, j = 0;
              while (i < a.size() && j < b.size()) {
                  int lo = max(a[i][0], b[j][0]);
                  int hi = min(a[i][1], b[j][1]);
                  if (lo <= hi) result.push_back({lo, hi});
                  if (a[i][1] < b[j][1]) i++;
                  else j++;
              }
              return result;
          }
      };
    `,
    checks: "",
  },
};
