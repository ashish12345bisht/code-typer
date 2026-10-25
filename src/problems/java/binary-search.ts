import { java, type Solution } from "../types";

export const binarySearchJava: Record<string, Solution> = {
  "binary-search": {
    code: java`
      class Solution {
          public int search(int[] nums, int target) {
              int lo = 0, hi = nums.length - 1;
              while (lo <= hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] == target) return mid;
                  if (nums[mid] < target) lo = mid + 1;
                  else hi = mid - 1;
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "search-insert-position": {
    code: java`
      class Solution {
          public int searchInsert(int[] nums, int target) {
              int lo = 0, hi = nums.length;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] < target) lo = mid + 1;
                  else hi = mid;
              }
              return lo;
          }
      }
    `,
    checks: "",
  },
  "search-a-2d-matrix": {
    code: java`
      class Solution {
          public boolean searchMatrix(int[][] matrix, int target) {
              int cols = matrix[0].length;
              int lo = 0, hi = matrix.length * cols - 1;
              while (lo <= hi) {
                  int mid = lo + (hi - lo) / 2;
                  int value = matrix[mid / cols][mid % cols];
                  if (value == target) return true;
                  if (value < target) lo = mid + 1;
                  else hi = mid - 1;
              }
              return false;
          }
      }
    `,
    checks: "",
  },
  "koko-eating-bananas": {
    code: java`
      class Solution {
          public int minEatingSpeed(int[] piles, int h) {
              int lo = 1, hi = Arrays.stream(piles).max().getAsInt();
              while (lo < hi) {
                  int k = lo + (hi - lo) / 2;
                  long hours = 0;
                  for (int p : piles) hours += (p + k - 1) / k;
                  if (hours <= h) hi = k;
                  else lo = k + 1;
              }
              return lo;
          }
      }
    `,
    checks: "",
  },
  "find-minimum-in-rotated-sorted-array": {
    code: java`
      class Solution {
          public int findMin(int[] nums) {
              int lo = 0, hi = nums.length - 1;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] > nums[hi]) lo = mid + 1;
                  else hi = mid;
              }
              return nums[lo];
          }
      }
    `,
    checks: "",
  },
  "search-in-rotated-sorted-array": {
    code: java`
      class Solution {
          public int search(int[] nums, int target) {
              int lo = 0, hi = nums.length - 1;
              while (lo <= hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] == target) return mid;
                  if (nums[lo] <= nums[mid]) {
                      if (nums[lo] <= target && target < nums[mid]) {
                          hi = mid - 1;
                      } else {
                          lo = mid + 1;
                      }
                  } else {
                      if (nums[mid] < target && target <= nums[hi]) {
                          lo = mid + 1;
                      } else {
                          hi = mid - 1;
                      }
                  }
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "first-and-last-position": {
    code: java`
      class Solution {
          public int[] searchRange(int[] nums, int target) {
              int start = lowerBound(nums, target);
              if (start == nums.length || nums[start] != target) {
                  return new int[] {-1, -1};
              }
              return new int[] {start, lowerBound(nums, target + 1) - 1};
          }

          private int lowerBound(int[] nums, int target) {
              int lo = 0, hi = nums.length;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] < target) lo = mid + 1;
                  else hi = mid;
              }
              return lo;
          }
      }
    `,
    checks: "",
  },
  "sqrt-x": {
    code: java`
      class Solution {
          public int mySqrt(int x) {
              long lo = 0, hi = x;
              while (lo < hi) {
                  long mid = (lo + hi + 1) / 2;
                  if (mid * mid <= x) lo = mid;
                  else hi = mid - 1;
              }
              return (int) lo;
          }
      }
    `,
    checks: "",
  },
  "find-peak-element": {
    code: java`
      class Solution {
          public int findPeakElement(int[] nums) {
              int lo = 0, hi = nums.length - 1;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (nums[mid] < nums[mid + 1]) lo = mid + 1;
                  else hi = mid;
              }
              return lo;
          }
      }
    `,
    checks: "",
  },
  "median-of-two-sorted-arrays": {
    code: java`
      class Solution {
          public double findMedianSortedArrays(int[] a, int[] b) {
              if (a.length > b.length) return findMedianSortedArrays(b, a);
              int m = a.length, n = b.length;
              int half = (m + n + 1) / 2;
              int lo = 0, hi = m;
              while (lo <= hi) {
                  int i = (lo + hi) / 2, j = half - i;
                  int aLeft = i > 0 ? a[i - 1] : Integer.MIN_VALUE;
                  int aRight = i < m ? a[i] : Integer.MAX_VALUE;
                  int bLeft = j > 0 ? b[j - 1] : Integer.MIN_VALUE;
                  int bRight = j < n ? b[j] : Integer.MAX_VALUE;
                  if (aLeft <= bRight && bLeft <= aRight) {
                      int left = Math.max(aLeft, bLeft);
                      if ((m + n) % 2 == 1) return left;
                      return (left + (double) Math.min(aRight, bRight)) / 2;
                  }
                  if (aLeft > bRight) hi = i - 1;
                  else lo = i + 1;
              }
              return 0;
          }
      }
    `,
    checks: "",
  },
  "split-array-largest-sum": {
    code: java`
      class Solution {
          public int splitArray(int[] nums, int k) {
              int lo = 0, hi = 0;
              for (int n : nums) {
                  lo = Math.max(lo, n);
                  hi += n;
              }
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (parts(nums, mid) <= k) hi = mid;
                  else lo = mid + 1;
              }
              return lo;
          }

          private int parts(int[] nums, int limit) {
              int count = 1, total = 0;
              for (int n : nums) {
                  if (total + n > limit) {
                      count++;
                      total = 0;
                  }
                  total += n;
              }
              return count;
          }
      }
    `,
    checks: "",
  },
  "capacity-to-ship-packages": {
    code: java`
      class Solution {
          public int shipWithinDays(int[] weights, int days) {
              int lo = 0, hi = 0;
              for (int w : weights) {
                  lo = Math.max(lo, w);
                  hi += w;
              }
              while (lo < hi) {
                  int cap = lo + (hi - lo) / 2;
                  int needed = 1, load = 0;
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
      }
    `,
    checks: "",
  },
};
