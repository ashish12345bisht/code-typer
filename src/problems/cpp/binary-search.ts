import { cpp, type Solution } from "../types";

export const binarySearchCpp: Record<string, Solution> = {
  "binary-search": {
    code: cpp`
      class Solution {
      public:
          int search(vector<int>& nums, int target) {
              int lo = 0, hi = nums.size() - 1;
              while (lo <= hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] == target) return mid;
                  if (nums[mid] < target) lo = mid + 1;
                  else hi = mid - 1;
              }
              return -1;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().search(lv(VI{-1, 0, 3, 5, 9, 12}), 9) == 4);
      CHECK(Solution().search(lv(VI{-1, 0, 3, 5, 9, 12}), 2) == -1);
    `,
  },
  "search-insert-position": {
    code: cpp`
      class Solution {
      public:
          int searchInsert(vector<int>& nums, int target) {
              int lo = 0, hi = nums.size();
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] < target) lo = mid + 1;
                  else hi = mid;
              }
              return lo;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().searchInsert(lv(VI{1, 3, 5, 6}), 5) == 2);
      CHECK(Solution().searchInsert(lv(VI{1, 3, 5, 6}), 2) == 1);
      CHECK(Solution().searchInsert(lv(VI{1, 3, 5, 6}), 7) == 4);
    `,
  },
  "search-a-2d-matrix": {
    code: cpp`
      class Solution {
      public:
          bool searchMatrix(vector<vector<int>>& matrix, int target) {
              int rows = matrix.size(), cols = matrix[0].size();
              int lo = 0, hi = rows * cols - 1;
              while (lo <= hi) {
                  int mid = lo + (hi - lo) / 2;
                  int value = matrix[mid / cols][mid % cols];
                  if (value == target) return true;
                  if (value < target) lo = mid + 1;
                  else hi = mid - 1;
              }
              return false;
          }
      };
    `,
    checks: cpp`
      VVI m{{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}};
      CHECK(Solution().searchMatrix(m, 3) == true);
      CHECK(Solution().searchMatrix(m, 13) == false);
    `,
  },
  "koko-eating-bananas": {
    code: cpp`
      class Solution {
      public:
          int minEatingSpeed(vector<int>& piles, int h) {
              int lo = 1, hi = *max_element(piles.begin(), piles.end());
              while (lo < hi) {
                  int k = lo + (hi - lo) / 2;
                  long long hours = 0;
                  for (int p : piles) hours += (p + k - 1) / k;
                  if (hours <= h) hi = k;
                  else lo = k + 1;
              }
              return lo;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().minEatingSpeed(lv(VI{3, 6, 7, 11}), 8) == 4);
      CHECK(Solution().minEatingSpeed(lv(VI{30, 11, 23, 4, 20}), 5) == 30);
      CHECK(Solution().minEatingSpeed(lv(VI{30, 11, 23, 4, 20}), 6) == 23);
    `,
  },
  "find-minimum-in-rotated-sorted-array": {
    code: cpp`
      class Solution {
      public:
          int findMin(vector<int>& nums) {
              int lo = 0, hi = nums.size() - 1;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] > nums[hi]) lo = mid + 1;
                  else hi = mid;
              }
              return nums[lo];
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().findMin(lv(VI{3, 4, 5, 1, 2})) == 1);
      CHECK(Solution().findMin(lv(VI{4, 5, 6, 7, 0, 1, 2})) == 0);
      CHECK(Solution().findMin(lv(VI{11, 13, 15, 17})) == 11);
    `,
  },
  "search-in-rotated-sorted-array": {
    code: cpp`
      class Solution {
      public:
          int search(vector<int>& nums, int target) {
              int lo = 0, hi = nums.size() - 1;
              while (lo <= hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] == target) return mid;
                  if (nums[lo] <= nums[mid]) {
                      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
                      else lo = mid + 1;
                  } else {
                      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
                      else hi = mid - 1;
                  }
              }
              return -1;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().search(lv(VI{4, 5, 6, 7, 0, 1, 2}), 0) == 4);
      CHECK(Solution().search(lv(VI{4, 5, 6, 7, 0, 1, 2}), 3) == -1);
      CHECK(Solution().search(lv(VI{1}), 0) == -1);
    `,
  },
  "first-and-last-position": {
    code: cpp`
      class Solution {
      public:
          vector<int> searchRange(vector<int>& nums, int target) {
              auto first = lower_bound(nums.begin(), nums.end(), target);
              if (first == nums.end() || *first != target) return {-1, -1};
              auto last = upper_bound(nums.begin(), nums.end(), target);
              int start = first - nums.begin();
              int end = last - nums.begin() - 1;
              return {start, end};
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().searchRange(lv(VI{5, 7, 7, 8, 8, 10}), 8) == VI{3, 4});
      CHECK(Solution().searchRange(lv(VI{5, 7, 7, 8, 8, 10}), 6) == VI{-1, -1});
      CHECK(Solution().searchRange(lv(VI{}), 0) == VI{-1, -1});
    `,
  },
  "sqrt-x": {
    code: cpp`
      class Solution {
      public:
          int mySqrt(int x) {
              long long lo = 0, hi = x;
              while (lo < hi) {
                  long long mid = lo + (hi - lo + 1) / 2;
                  if (mid * mid <= x) lo = mid;
                  else hi = mid - 1;
              }
              return lo;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().mySqrt(8) == 2);
      CHECK(Solution().mySqrt(4) == 2);
      CHECK(Solution().mySqrt(0) == 0);
      CHECK(Solution().mySqrt(2147395599) == 46339);
    `,
  },
  "find-peak-element": {
    code: cpp`
      class Solution {
      public:
          int findPeakElement(vector<int>& nums) {
              int lo = 0, hi = nums.size() - 1;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] < nums[mid + 1]) lo = mid + 1;
                  else hi = mid;
              }
              return lo;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().findPeakElement(lv(VI{1, 2, 3, 1})) == 2);
      CHECK(Solution().findPeakElement(lv(VI{1, 2, 1, 3, 5, 6, 4})) == 5);
    `,
  },
  "median-of-two-sorted-arrays": {
    code: cpp`
      class Solution {
      public:
          double findMedianSortedArrays(vector<int>& a, vector<int>& b) {
              if (a.size() > b.size()) return findMedianSortedArrays(b, a);
              int m = a.size(), n = b.size(), half = (m + n + 1) / 2;
              int lo = 0, hi = m;
              while (lo <= hi) {
                  int i = (lo + hi) / 2, j = half - i;
                  int aLeft = i > 0 ? a[i - 1] : INT_MIN;
                  int aRight = i < m ? a[i] : INT_MAX;
                  int bLeft = j > 0 ? b[j - 1] : INT_MIN;
                  int bRight = j < n ? b[j] : INT_MAX;
                  if (aLeft <= bRight && bLeft <= aRight) {
                      int left = max(aLeft, bLeft);
                      if ((m + n) % 2) return left;
                      return (left + (double)min(aRight, bRight)) / 2;
                  }
                  if (aLeft > bRight) hi = i - 1;
                  else lo = i + 1;
              }
              return 0;
          }
      };
    `,
    checks: cpp`
      CHECK(near(Solution().findMedianSortedArrays(lv(VI{1, 3}), lv(VI{2})), 2.0));
      CHECK(near(Solution().findMedianSortedArrays(lv(VI{1, 2}), lv(VI{3, 4})), 2.5));
      CHECK(near(Solution().findMedianSortedArrays(lv(VI{}), lv(VI{1})), 1.0));
    `,
  },
  "split-array-largest-sum": {
    code: cpp`
      class Solution {
      public:
          int splitArray(vector<int>& nums, int k) {
              long long lo = *max_element(nums.begin(), nums.end());
              long long hi = accumulate(nums.begin(), nums.end(), 0LL);
              while (lo < hi) {
                  long long mid = lo + (hi - lo) / 2;
                  if (parts(nums, mid) <= k) hi = mid;
                  else lo = mid + 1;
              }
              return lo;
          }

      private:
          int parts(const vector<int>& nums, long long limit) {
              int count = 1;
              long long sum = 0;
              for (int n : nums) {
                  if (sum + n > limit) {
                      count++;
                      sum = 0;
                  }
                  sum += n;
              }
              return count;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().splitArray(lv(VI{7, 2, 5, 10, 8}), 2) == 18);
      CHECK(Solution().splitArray(lv(VI{1, 2, 3, 4, 5}), 2) == 9);
    `,
  },
  "capacity-to-ship-packages": {
    code: cpp`
      class Solution {
      public:
          int shipWithinDays(vector<int>& weights, int days) {
              int lo = *max_element(weights.begin(), weights.end());
              int hi = accumulate(weights.begin(), weights.end(), 0);
              while (lo < hi) {
                  int cap = lo + (hi - lo) / 2, needed = 1, load = 0;
                  for (int w : weights) {
                      if (load + w > cap) {
                          needed++;
                          load = 0;
                      }
                      load += w;
                  }
                  if (needed <= days) hi = cap;
                  else lo = cap + 1;
              }
              return lo;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().shipWithinDays(lv(VI{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}), 5) == 15);
      CHECK(Solution().shipWithinDays(lv(VI{3, 2, 2, 4, 1, 4}), 3) == 6);
    `,
  },
};
