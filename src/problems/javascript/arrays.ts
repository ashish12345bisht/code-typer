import { js, type Solution } from "../types";

export const arraysJavascript: Record<string, Solution> = {
  "two-sum": {
    code: js`
      function twoSum(nums, target) {
        const seen = new Map();
        for (let i = 0; i < nums.length; i++) {
          const j = seen.get(target - nums[i]);
          if (j !== undefined) return [j, i];
          seen.set(nums[i], i);
        }
        return [];
      }
    `,
    checks: "",
  },
  "contains-duplicate": {
    code: js`
      function containsDuplicate(nums) {
        const seen = new Set();
        for (const n of nums) {
          if (seen.has(n)) return true;
          seen.add(n);
        }
        return false;
      }
    `,
    checks: "",
  },
  "valid-anagram": {
    code: js`
      function isAnagram(s, t) {
        if (s.length !== t.length) return false;
        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
          count[s.charCodeAt(i) - 97]++;
          count[t.charCodeAt(i) - 97]--;
        }
        return count.every((c) => c === 0);
      }
    `,
    checks: "",
  },
  "group-anagrams": {
    code: js`
      function groupAnagrams(strs) {
        const groups = new Map();
        for (const s of strs) {
          const key = s.split("").sort().join("");
          const group = groups.get(key);
          if (group) group.push(s);
          else groups.set(key, [s]);
        }
        return [...groups.values()];
      }
    `,
    checks: "",
  },
  "top-k-frequent-elements": {
    code: js`
      function topKFrequent(nums, k) {
        const count = new Map();
        for (const n of nums) count.set(n, (count.get(n) ?? 0) + 1);
        const buckets = Array.from({ length: nums.length + 1 }, () => []);
        for (const [n, c] of count) buckets[c].push(n);
        const result = [];
        for (let c = buckets.length - 1; c > 0; c--) {
          result.push(...buckets[c]);
          if (result.length >= k) break;
        }
        return result.slice(0, k);
      }
    `,
    checks: "",
  },
  "product-of-array-except-self": {
    code: js`
      function productExceptSelf(nums) {
        const result = new Array(nums.length).fill(1);
        let prefix = 1;
        for (let i = 0; i < nums.length; i++) {
          result[i] = prefix;
          prefix *= nums[i];
        }
        let suffix = 1;
        for (let i = nums.length - 1; i >= 0; i--) {
          result[i] *= suffix;
          suffix *= nums[i];
        }
        return result;
      }
    `,
    checks: "",
  },
  "longest-consecutive-sequence": {
    code: js`
      function longestConsecutive(nums) {
        const set = new Set(nums);
        let best = 0;
        for (const n of set) {
          if (set.has(n - 1)) continue;
          let length = 1;
          while (set.has(n + length)) length++;
          best = Math.max(best, length);
        }
        return best;
      }
    `,
    checks: "",
  },
  "majority-element": {
    code: js`
      function majorityElement(nums) {
        let candidate = nums[0];
        let count = 0;
        for (const n of nums) {
          if (count === 0) candidate = n;
          count += n === candidate ? 1 : -1;
        }
        return candidate;
      }
    `,
    checks: "",
  },
  "valid-sudoku": {
    code: js`
      function isValidSudoku(board) {
        const seen = new Set();
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            const v = board[r][c];
            if (v === ".") continue;
            const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            const keys = ["r" + r + v, "c" + c + v, "b" + box + v];
            if (keys.some((k) => seen.has(k))) return false;
            keys.forEach((k) => seen.add(k));
          }
        }
        return true;
      }
    `,
    checks: "",
  },
  "subarray-sum-equals-k": {
    code: js`
      function subarraySum(nums, k) {
        const counts = new Map([[0, 1]]);
        let sum = 0;
        let total = 0;
        for (const n of nums) {
          sum += n;
          total += counts.get(sum - k) ?? 0;
          counts.set(sum, (counts.get(sum) ?? 0) + 1);
        }
        return total;
      }
    `,
    checks: "",
  },
  "move-zeroes": {
    code: js`
      function moveZeroes(nums) {
        let insert = 0;
        for (let i = 0; i < nums.length; i++) {
          if (nums[i] !== 0) {
            [nums[insert], nums[i]] = [nums[i], nums[insert]];
            insert++;
          }
        }
        return nums;
      }
    `,
    checks: "",
  },
  "best-time-to-buy-and-sell-stock": {
    code: js`
      function maxProfit(prices) {
        let minPrice = Infinity;
        let best = 0;
        for (const price of prices) {
          minPrice = Math.min(minPrice, price);
          best = Math.max(best, price - minPrice);
        }
        return best;
      }
    `,
    checks: "",
  },
  "find-all-numbers-disappeared": {
    code: js`
      function findDisappearedNumbers(nums) {
        for (const n of nums) {
          const i = Math.abs(n) - 1;
          nums[i] = -Math.abs(nums[i]);
        }
        const missing = [];
        nums.forEach((n, i) => {
          if (n > 0) missing.push(i + 1);
        });
        return missing;
      }
    `,
    checks: "",
  },
  "rotate-image": {
    code: js`
      function rotate(matrix) {
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
          }
        }
        for (const row of matrix) row.reverse();
        return matrix;
      }
    `,
    checks: "",
  },
  "spiral-matrix": {
    code: js`
      function spiralOrder(matrix) {
        const result = [];
        let top = 0;
        let bottom = matrix.length - 1;
        let left = 0;
        let right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
          for (let c = left; c <= right; c++) result.push(matrix[top][c]);
          top++;
          for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
          right--;
          if (top <= bottom) {
            for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
            bottom--;
          }
          if (left <= right) {
            for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
            left++;
          }
        }
        return result;
      }
    `,
    checks: "",
  },
  "set-matrix-zeroes": {
    code: js`
      function setZeroes(matrix) {
        const rows = new Set();
        const cols = new Set();
        matrix.forEach((row, r) =>
          row.forEach((v, c) => {
            if (v === 0) {
              rows.add(r);
              cols.add(c);
            }
          }),
        );
        matrix.forEach((row, r) =>
          row.forEach((_, c) => {
            if (rows.has(r) || cols.has(c)) row[c] = 0;
          }),
        );
        return matrix;
      }
    `,
    checks: "",
  },
  "first-missing-positive": {
    code: js`
      function firstMissingPositive(nums) {
        const n = nums.length;
        for (let i = 0; i < n; i++) {
          while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const j = nums[i] - 1;
            [nums[i], nums[j]] = [nums[j], nums[i]];
          }
        }
        for (let i = 0; i < n; i++) {
          if (nums[i] !== i + 1) return i + 1;
        }
        return n + 1;
      }
    `,
    checks: "",
  },
  "pascals-triangle": {
    code: js`
      function generate(numRows) {
        const rows = [[1]];
        for (let i = 1; i < numRows; i++) {
          const prev = rows[i - 1];
          const row = [1];
          for (let j = 1; j < i; j++) row.push(prev[j - 1] + prev[j]);
          row.push(1);
          rows.push(row);
        }
        return rows;
      }
    `,
    checks: "",
  },
};
