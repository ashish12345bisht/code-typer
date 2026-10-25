import { js, type Solution } from "../types";

export const binarySearchJavascript: Record<string, Solution> = {
  "binary-search": {
    code: js`
      function search(nums, target) {
        let lo = 0;
        let hi = nums.length - 1;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          if (nums[mid] === target) return mid;
          if (nums[mid] < target) lo = mid + 1;
          else hi = mid - 1;
        }
        return -1;
      }
    `,
    checks: "",
  },
  "search-insert-position": {
    code: js`
      function searchInsert(nums, target) {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (nums[mid] < target) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "search-a-2d-matrix": {
    code: js`
      function searchMatrix(matrix, target) {
        const cols = matrix[0].length;
        let lo = 0;
        let hi = matrix.length * cols - 1;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          const value = matrix[Math.floor(mid / cols)][mid % cols];
          if (value === target) return true;
          if (value < target) lo = mid + 1;
          else hi = mid - 1;
        }
        return false;
      }
    `,
    checks: "",
  },
  "koko-eating-bananas": {
    code: js`
      function minEatingSpeed(piles, h) {
        let lo = 1;
        let hi = Math.max(...piles);
        while (lo < hi) {
          const k = (lo + hi) >> 1;
          let hours = 0;
          for (const p of piles) hours += Math.ceil(p / k);
          if (hours <= h) hi = k;
          else lo = k + 1;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "find-minimum-in-rotated-sorted-array": {
    code: js`
      function findMin(nums) {
        let lo = 0;
        let hi = nums.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (nums[mid] > nums[hi]) lo = mid + 1;
          else hi = mid;
        }
        return nums[lo];
      }
    `,
    checks: "",
  },
  "search-in-rotated-sorted-array": {
    code: js`
      function search(nums, target) {
        let lo = 0;
        let hi = nums.length - 1;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          if (nums[mid] === target) return mid;
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
    `,
    checks: "",
  },
  "first-and-last-position": {
    code: js`
      function searchRange(nums, target) {
        const lowerBound = (x) => {
          let lo = 0;
          let hi = nums.length;
          while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] < x) lo = mid + 1;
            else hi = mid;
          }
          return lo;
        };
        const start = lowerBound(target);
        if (nums[start] !== target) return [-1, -1];
        return [start, lowerBound(target + 1) - 1];
      }
    `,
    checks: "",
  },
  "sqrt-x": {
    code: js`
      function mySqrt(x) {
        let lo = 0;
        let hi = x;
        while (lo < hi) {
          const mid = Math.ceil((lo + hi) / 2);
          if (mid * mid <= x) lo = mid;
          else hi = mid - 1;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "find-peak-element": {
    code: js`
      function findPeakElement(nums) {
        let lo = 0;
        let hi = nums.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (nums[mid] < nums[mid + 1]) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "median-of-two-sorted-arrays": {
    code: js`
      function findMedianSortedArrays(a, b) {
        if (a.length > b.length) return findMedianSortedArrays(b, a);
        const m = a.length;
        const n = b.length;
        const half = (m + n + 1) >> 1;
        let lo = 0;
        let hi = m;
        while (lo <= hi) {
          const i = (lo + hi) >> 1;
          const j = half - i;
          const aLeft = i > 0 ? a[i - 1] : -Infinity;
          const aRight = i < m ? a[i] : Infinity;
          const bLeft = j > 0 ? b[j - 1] : -Infinity;
          const bRight = j < n ? b[j] : Infinity;
          if (aLeft <= bRight && bLeft <= aRight) {
            const left = Math.max(aLeft, bLeft);
            if ((m + n) % 2) return left;
            return (left + Math.min(aRight, bRight)) / 2;
          }
          if (aLeft > bRight) hi = i - 1;
          else lo = i + 1;
        }
        return 0;
      }
    `,
    checks: "",
  },
  "split-array-largest-sum": {
    code: js`
      function splitArray(nums, k) {
        let lo = Math.max(...nums);
        let hi = nums.reduce((a, b) => a + b, 0);
        const parts = (limit) => {
          let count = 1;
          let sum = 0;
          for (const n of nums) {
            if (sum + n > limit) {
              count++;
              sum = 0;
            }
            sum += n;
          }
          return count;
        };
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (parts(mid) <= k) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "capacity-to-ship-packages": {
    code: js`
      function shipWithinDays(weights, days) {
        let lo = Math.max(...weights);
        let hi = weights.reduce((a, b) => a + b, 0);
        while (lo < hi) {
          const cap = (lo + hi) >> 1;
          let needed = 1;
          let load = 0;
          for (const w of weights) {
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
    `,
    checks: "",
  },
};
