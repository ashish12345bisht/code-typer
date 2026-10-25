import { js, type Solution } from "../types";

export const dp1dJavascript: Record<string, Solution> = {
  "climbing-stairs": {
    code: js`
      function climbStairs(n) {
        let a = 1;
        let b = 1;
        for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
        return b;
      }
    `,
    checks: "",
  },
  "min-cost-climbing-stairs": {
    code: js`
      function minCostClimbingStairs(cost) {
        let a = 0;
        let b = 0;
        for (let i = 2; i <= cost.length; i++) {
          [a, b] = [b, Math.min(b + cost[i - 1], a + cost[i - 2])];
        }
        return b;
      }
    `,
    checks: "",
  },
  "house-robber": {
    code: js`
      function rob(nums) {
        let prev = 0;
        let curr = 0;
        for (const n of nums) [prev, curr] = [curr, Math.max(curr, prev + n)];
        return curr;
      }
    `,
    checks: "",
  },
  "house-robber-ii": {
    code: js`
      function rob(nums) {
        if (nums.length === 1) return nums[0];
        const line = (houses) => {
          let prev = 0;
          let curr = 0;
          for (const n of houses) [prev, curr] = [curr, Math.max(curr, prev + n)];
          return curr;
        };
        return Math.max(line(nums.slice(1)), line(nums.slice(0, -1)));
      }
    `,
    checks: "",
  },
  "longest-palindromic-substring": {
    code: js`
      function longestPalindrome(s) {
        let start = 0;
        let length = 0;
        const expand = (lo, hi) => {
          while (lo >= 0 && hi < s.length && s[lo] === s[hi]) {
            lo--;
            hi++;
          }
          if (hi - lo - 1 > length) {
            start = lo + 1;
            length = hi - lo - 1;
          }
        };
        for (let i = 0; i < s.length; i++) {
          expand(i, i);
          expand(i, i + 1);
        }
        return s.slice(start, start + length);
      }
    `,
    checks: "",
  },
  "palindromic-substrings": {
    code: js`
      function countSubstrings(s) {
        let count = 0;
        for (let center = 0; center < 2 * s.length - 1; center++) {
          let lo = Math.floor(center / 2);
          let hi = lo + (center % 2);
          while (lo >= 0 && hi < s.length && s[lo] === s[hi]) {
            count++;
            lo--;
            hi++;
          }
        }
        return count;
      }
    `,
    checks: "",
  },
  "decode-ways": {
    code: js`
      function numDecodings(s) {
        let prev = 1;
        let curr = s[0] === "0" ? 0 : 1;
        for (let i = 1; i < s.length; i++) {
          let next = 0;
          if (s[i] !== "0") next += curr;
          const two = Number(s.slice(i - 1, i + 1));
          if (two >= 10 && two <= 26) next += prev;
          [prev, curr] = [curr, next];
        }
        return curr;
      }
    `,
    checks: "",
  },
  "coin-change": {
    code: js`
      function coinChange(coins, amount) {
        const dp = new Array(amount + 1).fill(Infinity);
        dp[0] = 0;
        for (let a = 1; a <= amount; a++) {
          for (const coin of coins) {
            if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
          }
        }
        return dp[amount] === Infinity ? -1 : dp[amount];
      }
    `,
    checks: "",
  },
  "maximum-product-subarray": {
    code: js`
      function maxProduct(nums) {
        let best = nums[0];
        let hi = nums[0];
        let lo = nums[0];
        for (let i = 1; i < nums.length; i++) {
          const n = nums[i];
          const candidates = [n, hi * n, lo * n];
          hi = Math.max(...candidates);
          lo = Math.min(...candidates);
          best = Math.max(best, hi);
        }
        return best;
      }
    `,
    checks: "",
  },
  "word-break": {
    code: js`
      function wordBreak(s, wordDict) {
        const words = new Set(wordDict);
        const dp = new Array(s.length + 1).fill(false);
        dp[0] = true;
        for (let end = 1; end <= s.length; end++) {
          for (let start = 0; start < end && !dp[end]; start++) {
            if (dp[start] && words.has(s.slice(start, end))) dp[end] = true;
          }
        }
        return dp[s.length];
      }
    `,
    checks: "",
  },
  "longest-increasing-subsequence": {
    code: js`
      function lengthOfLIS(nums) {
        const tails = [];
        for (const n of nums) {
          let lo = 0;
          let hi = tails.length;
          while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < n) lo = mid + 1;
            else hi = mid;
          }
          tails[lo] = n;
        }
        return tails.length;
      }
    `,
    checks: "",
  },
  "partition-equal-subset-sum": {
    code: js`
      function canPartition(nums) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % 2) return false;
        const target = total / 2;
        const dp = new Array(target + 1).fill(false);
        dp[0] = true;
        for (const n of nums) {
          for (let s = target; s >= n; s--) dp[s] = dp[s] || dp[s - n];
        }
        return dp[target];
      }
    `,
    checks: "",
  },
  "perfect-squares": {
    code: js`
      function numSquares(n) {
        const dp = new Array(n + 1).fill(Infinity);
        dp[0] = 0;
        for (let i = 1; i <= n; i++) {
          for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
          }
        }
        return dp[n];
      }
    `,
    checks: "",
  },
  "combination-sum-iv": {
    code: js`
      function combinationSum4(nums, target) {
        const dp = new Array(target + 1).fill(0);
        dp[0] = 1;
        for (let t = 1; t <= target; t++) {
          for (const n of nums) if (n <= t) dp[t] += dp[t - n];
        }
        return dp[target];
      }
    `,
    checks: "",
  },
};
