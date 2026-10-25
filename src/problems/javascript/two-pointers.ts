import { js, type Solution } from "../types";

export const twoPointersJavascript: Record<string, Solution> = {
  "valid-palindrome": {
    code: js`
      function isPalindrome(s) {
        const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
        let i = 0;
        let j = clean.length - 1;
        while (i < j) {
          if (clean[i] !== clean[j]) return false;
          i++;
          j--;
        }
        return true;
      }
    `,
    checks: "",
  },
  "two-sum-ii": {
    code: js`
      function twoSum(numbers, target) {
        let i = 0;
        let j = numbers.length - 1;
        while (i < j) {
          const sum = numbers[i] + numbers[j];
          if (sum === target) return [i + 1, j + 1];
          if (sum < target) i++;
          else j--;
        }
        return [];
      }
    `,
    checks: "",
  },
  "three-sum": {
    code: js`
      function threeSum(nums) {
        nums.sort((a, b) => a - b);
        const result = [];
        for (let i = 0; i < nums.length - 2; i++) {
          if (i > 0 && nums[i] === nums[i - 1]) continue;
          let lo = i + 1;
          let hi = nums.length - 1;
          while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];
            if (sum < 0) lo++;
            else if (sum > 0) hi--;
            else {
              result.push([nums[i], nums[lo], nums[hi]]);
              lo++;
              while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
            }
          }
        }
        return result;
      }
    `,
    checks: "",
  },
  "container-with-most-water": {
    code: js`
      function maxArea(height) {
        let i = 0;
        let j = height.length - 1;
        let best = 0;
        while (i < j) {
          best = Math.max(best, Math.min(height[i], height[j]) * (j - i));
          if (height[i] < height[j]) i++;
          else j--;
        }
        return best;
      }
    `,
    checks: "",
  },
  "trapping-rain-water": {
    code: js`
      function trap(height) {
        let i = 0;
        let j = height.length - 1;
        let leftMax = 0;
        let rightMax = 0;
        let water = 0;
        while (i < j) {
          if (height[i] < height[j]) {
            leftMax = Math.max(leftMax, height[i]);
            water += leftMax - height[i];
            i++;
          } else {
            rightMax = Math.max(rightMax, height[j]);
            water += rightMax - height[j];
            j--;
          }
        }
        return water;
      }
    `,
    checks: "",
  },
  "remove-duplicates-from-sorted-array": {
    code: js`
      function removeDuplicates(nums) {
        let k = 0;
        for (const n of nums) {
          if (k === 0 || n !== nums[k - 1]) nums[k++] = n;
        }
        return k;
      }
    `,
    checks: "",
  },
  "sort-colors": {
    code: js`
      function sortColors(nums) {
        let lo = 0;
        let mid = 0;
        let hi = nums.length - 1;
        while (mid <= hi) {
          if (nums[mid] === 0) {
            [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
            lo++;
            mid++;
          } else if (nums[mid] === 2) {
            [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
            hi--;
          } else {
            mid++;
          }
        }
        return nums;
      }
    `,
    checks: "",
  },
  "merge-sorted-array": {
    code: js`
      function merge(nums1, m, nums2, n) {
        let i = m - 1;
        let j = n - 1;
        for (let k = m + n - 1; j >= 0; k--) {
          if (i >= 0 && nums1[i] > nums2[j]) nums1[k] = nums1[i--];
          else nums1[k] = nums2[j--];
        }
        return nums1;
      }
    `,
    checks: "",
  },
  "squares-of-a-sorted-array": {
    code: js`
      function sortedSquares(nums) {
        const result = new Array(nums.length);
        let i = 0;
        let j = nums.length - 1;
        for (let k = nums.length - 1; k >= 0; k--) {
          if (Math.abs(nums[i]) > Math.abs(nums[j])) {
            result[k] = nums[i] * nums[i];
            i++;
          } else {
            result[k] = nums[j] * nums[j];
            j--;
          }
        }
        return result;
      }
    `,
    checks: "",
  },
  "is-subsequence": {
    code: js`
      function isSubsequence(s, t) {
        let i = 0;
        for (let j = 0; j < t.length && i < s.length; j++) {
          if (s[i] === t[j]) i++;
        }
        return i === s.length;
      }
    `,
    checks: "",
  },
  "three-sum-closest": {
    code: js`
      function threeSumClosest(nums, target) {
        nums.sort((a, b) => a - b);
        let best = nums[0] + nums[1] + nums[2];
        for (let i = 0; i < nums.length - 2; i++) {
          let lo = i + 1;
          let hi = nums.length - 1;
          while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];
            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            if (sum < target) lo++;
            else if (sum > target) hi--;
            else return sum;
          }
        }
        return best;
      }
    `,
    checks: "",
  },
  "backspace-string-compare": {
    code: js`
      function backspaceCompare(s, t) {
        let i = s.length - 1;
        let j = t.length - 1;
        while (i >= 0 || j >= 0) {
          i = nextChar(s, i);
          j = nextChar(t, j);
          if (i < 0 || j < 0) return i < 0 && j < 0;
          if (s[i] !== t[j]) return false;
          i--;
          j--;
        }
        return true;
      }
      function nextChar(str, i) {
        let skip = 0;
        while (i >= 0) {
          if (str[i] === "#") skip++;
          else if (skip > 0) skip--;
          else break;
          i--;
        }
        return i;
      }
    `,
    checks: "",
  },
};
