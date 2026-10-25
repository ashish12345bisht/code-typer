import { cpp, type Solution } from "../types";

export const heapCpp: Record<string, Solution> = {
  "kth-largest-element-in-an-array": {
    code: cpp`
      class Solution {
      public:
          int findKthLargest(vector<int>& nums, int k) {
              int target = nums.size() - k, lo = 0, hi = nums.size() - 1;
              while (true) {
                  int pivot = nums[hi], store = lo;
                  for (int i = lo; i < hi; i++) {
                      if (nums[i] < pivot) swap(nums[i], nums[store++]);
                  }
                  swap(nums[store], nums[hi]);
                  if (store == target) return nums[store];
                  if (store < target) lo = store + 1;
                  else hi = store - 1;
              }
          }
      };
    `,
    checks: "",
  },
  "kth-largest-element-in-a-stream": {
    code: cpp`
      class KthLargest {
      public:
          KthLargest(int k, vector<int>& nums) : k(k) {
              for (int n : nums) add(n);
          }

          int add(int val) {
              heap.push(val);
              if (heap.size() > k) heap.pop();
              return heap.top();
          }

      private:
          int k;
          priority_queue<int, vector<int>, greater<int>> heap;
      };
    `,
    checks: "",
  },
  "last-stone-weight": {
    code: cpp`
      class Solution {
      public:
          int lastStoneWeight(vector<int>& stones) {
              priority_queue<int> heap(stones.begin(), stones.end());
              while (heap.size() > 1) {
                  int y = heap.top();
                  heap.pop();
                  int x = heap.top();
                  heap.pop();
                  if (y > x) heap.push(y - x);
              }
              return heap.empty() ? 0 : heap.top();
          }
      };
    `,
    checks: "",
  },
  "k-closest-points-to-origin": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
              auto dist = [](const vector<int>& p) {
                  return p[0] * p[0] + p[1] * p[1];
              };
              sort(points.begin(), points.end(), [&](auto& a, auto& b) {
                  return dist(a) < dist(b);
              });
              return vector<vector<int>>(points.begin(), points.begin() + k);
          }
      };
    `,
    checks: "",
  },
  "task-scheduler": {
    code: cpp`
      class Solution {
      public:
          int leastInterval(vector<char>& tasks, int n) {
              int count[26] = {};
              for (char t : tasks) count[t - 'A']++;
              int maxCount = *max_element(count, count + 26);
              int withMax = 0;
              for (int c : count) withMax += c == maxCount;
              return max((int)tasks.size(), (maxCount - 1) * (n + 1) + withMax);
          }
      };
    `,
    checks: "",
  },
  "find-median-from-data-stream": {
    code: cpp`
      class MedianFinder {
      public:
          void addNum(int num) {
              low.push(num);
              high.push(low.top());
              low.pop();
              if (high.size() > low.size()) {
                  low.push(high.top());
                  high.pop();
              }
          }

          double findMedian() {
              if (low.size() > high.size()) return low.top();
              return (low.top() + (double)high.top()) / 2;
          }

      private:
          priority_queue<int> low;
          priority_queue<int, vector<int>, greater<int>> high;
      };
    `,
    checks: "",
  },
};
