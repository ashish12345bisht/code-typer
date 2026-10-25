import { js, type Solution } from "../types";

export const slidingWindowJavascript: Record<string, Solution> = {
  "longest-substring-without-repeating": {
    code: js`
      function lengthOfLongestSubstring(s) {
        const last = new Map();
        let start = 0;
        let best = 0;
        for (let i = 0; i < s.length; i++) {
          const prev = last.get(s[i]);
          if (prev !== undefined && prev >= start) start = prev + 1;
          last.set(s[i], i);
          best = Math.max(best, i - start + 1);
        }
        return best;
      }
    `,
    checks: "",
  },
  "longest-repeating-character-replacement": {
    code: js`
      function characterReplacement(s, k) {
        const count = new Map();
        let start = 0;
        let maxFreq = 0;
        let best = 0;
        for (let i = 0; i < s.length; i++) {
          const c = (count.get(s[i]) ?? 0) + 1;
          count.set(s[i], c);
          maxFreq = Math.max(maxFreq, c);
          while (i - start + 1 - maxFreq > k) {
            count.set(s[start], count.get(s[start]) - 1);
            start++;
          }
          best = Math.max(best, i - start + 1);
        }
        return best;
      }
    `,
    checks: "",
  },
  "permutation-in-string": {
    code: js`
      function checkInclusion(s1, s2) {
        if (s1.length > s2.length) return false;
        const need = new Array(26).fill(0);
        const window = new Array(26).fill(0);
        for (let i = 0; i < s1.length; i++) {
          need[s1.charCodeAt(i) - 97]++;
          window[s2.charCodeAt(i) - 97]++;
        }
        const same = () => need.every((n, i) => n === window[i]);
        for (let i = s1.length; i < s2.length; i++) {
          if (same()) return true;
          window[s2.charCodeAt(i) - 97]++;
          window[s2.charCodeAt(i - s1.length) - 97]--;
        }
        return same();
      }
    `,
    checks: "",
  },
  "minimum-window-substring": {
    code: js`
      function minWindow(s, t) {
        const need = new Map();
        for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
        let missing = t.length;
        let start = 0;
        let bestStart = 0;
        let bestLen = Infinity;
        for (let end = 0; end < s.length; end++) {
          const c = s[end];
          if ((need.get(c) ?? 0) > 0) missing--;
          need.set(c, (need.get(c) ?? 0) - 1);
          while (missing === 0) {
            if (end - start + 1 < bestLen) {
              bestLen = end - start + 1;
              bestStart = start;
            }
            const d = s[start];
            need.set(d, need.get(d) + 1);
            if (need.get(d) > 0) missing++;
            start++;
          }
        }
        if (bestLen === Infinity) return "";
        return s.slice(bestStart, bestStart + bestLen);
      }
    `,
    checks: "",
  },
  "sliding-window-maximum": {
    code: js`
      function maxSlidingWindow(nums, k) {
        const deque = [];
        let head = 0;
        const result = [];
        const back = () => nums[deque[deque.length - 1]];
        for (let i = 0; i < nums.length; i++) {
          if (head < deque.length && deque[head] <= i - k) head++;
          while (deque.length > head && back() < nums[i]) deque.pop();
          deque.push(i);
          if (i >= k - 1) result.push(nums[deque[head]]);
        }
        return result;
      }
    `,
    checks: "",
  },
  "maximum-average-subarray": {
    code: js`
      function findMaxAverage(nums, k) {
        let sum = 0;
        for (let i = 0; i < k; i++) sum += nums[i];
        let best = sum;
        for (let i = k; i < nums.length; i++) {
          sum += nums[i] - nums[i - k];
          best = Math.max(best, sum);
        }
        return best / k;
      }
    `,
    checks: "",
  },
  "minimum-size-subarray-sum": {
    code: js`
      function minSubArrayLen(target, nums) {
        let start = 0;
        let sum = 0;
        let best = Infinity;
        for (let end = 0; end < nums.length; end++) {
          sum += nums[end];
          while (sum >= target) {
            best = Math.min(best, end - start + 1);
            sum -= nums[start++];
          }
        }
        return best === Infinity ? 0 : best;
      }
    `,
    checks: "",
  },
  "find-all-anagrams-in-a-string": {
    code: js`
      function findAnagrams(s, p) {
        const result = [];
        const need = new Array(26).fill(0);
        const window = new Array(26).fill(0);
        for (const c of p) need[c.charCodeAt(0) - 97]++;
        for (let i = 0; i < s.length; i++) {
          window[s.charCodeAt(i) - 97]++;
          if (i >= p.length) window[s.charCodeAt(i - p.length) - 97]--;
          const full = i >= p.length - 1;
          if (full && need.every((n, j) => n === window[j])) {
            result.push(i - p.length + 1);
          }
        }
        return result;
      }
    `,
    checks: "",
  },
  "fruit-into-baskets": {
    code: js`
      function totalFruit(fruits) {
        const count = new Map();
        let start = 0;
        let best = 0;
        for (let end = 0; end < fruits.length; end++) {
          count.set(fruits[end], (count.get(fruits[end]) ?? 0) + 1);
          while (count.size > 2) {
            const f = fruits[start++];
            count.set(f, count.get(f) - 1);
            if (count.get(f) === 0) count.delete(f);
          }
          best = Math.max(best, end - start + 1);
        }
        return best;
      }
    `,
    checks: "",
  },
  "max-consecutive-ones-iii": {
    code: js`
      function longestOnes(nums, k) {
        let start = 0;
        let zeros = 0;
        let best = 0;
        for (let end = 0; end < nums.length; end++) {
          if (nums[end] === 0) zeros++;
          while (zeros > k) {
            if (nums[start] === 0) zeros--;
            start++;
          }
          best = Math.max(best, end - start + 1);
        }
        return best;
      }
    `,
    checks: "",
  },
};
