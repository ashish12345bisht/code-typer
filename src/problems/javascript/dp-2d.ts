import { js, type Solution } from "../types";

export const dp2dJavascript: Record<string, Solution> = {
  "unique-paths": {
    code: js`
      function uniquePaths(m, n) {
        const row = new Array(n).fill(1);
        for (let r = 1; r < m; r++) {
          for (let c = 1; c < n; c++) row[c] += row[c - 1];
        }
        return row[n - 1];
      }
    `,
    checks: "",
  },
  "unique-paths-ii": {
    code: js`
      function uniquePathsWithObstacles(grid) {
        const cols = grid[0].length;
        const dp = new Array(cols).fill(0);
        dp[0] = 1;
        for (const row of grid) {
          for (let c = 0; c < cols; c++) {
            if (row[c] === 1) dp[c] = 0;
            else if (c > 0) dp[c] += dp[c - 1];
          }
        }
        return dp[cols - 1];
      }
    `,
    checks: "",
  },
  "longest-common-subsequence": {
    code: js`
      function longestCommonSubsequence(a, b) {
        const dp = Array.from({ length: a.length + 1 }, () =>
          new Array(b.length + 1).fill(0),
        );
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            dp[i][j] =
              a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1] + 1
                : Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
        return dp[a.length][b.length];
      }
    `,
    checks: "",
  },
  "edit-distance": {
    code: js`
      function minDistance(word1, word2) {
        const m = word1.length;
        const n = word2.length;
        const dp = Array.from({ length: m + 1 }, (_, i) =>
          Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
        );
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else {
              dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
          }
        }
        return dp[m][n];
      }
    `,
    checks: "",
  },
  "coin-change-ii": {
    code: js`
      function change(amount, coins) {
        const dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (const coin of coins) {
          for (let a = coin; a <= amount; a++) dp[a] += dp[a - coin];
        }
        return dp[amount];
      }
    `,
    checks: "",
  },
  "target-sum": {
    code: js`
      function findTargetSumWays(nums, target) {
        let ways = new Map([[0, 1]]);
        for (const n of nums) {
          const next = new Map();
          for (const [sum, count] of ways) {
            next.set(sum + n, (next.get(sum + n) ?? 0) + count);
            next.set(sum - n, (next.get(sum - n) ?? 0) + count);
          }
          ways = next;
        }
        return ways.get(target) ?? 0;
      }
    `,
    checks: "",
  },
  "interleaving-string": {
    code: js`
      function isInterleave(s1, s2, s3) {
        if (s1.length + s2.length !== s3.length) return false;
        const dp = new Array(s2.length + 1).fill(false);
        for (let i = 0; i <= s1.length; i++) {
          for (let j = 0; j <= s2.length; j++) {
            if (i === 0 && j === 0) dp[j] = true;
            else {
              const fromTop = i > 0 && dp[j] && s1[i - 1] === s3[i + j - 1];
              const fromLeft = j > 0 && dp[j - 1] && s2[j - 1] === s3[i + j - 1];
              dp[j] = fromTop || fromLeft;
            }
          }
        }
        return dp[s2.length];
      }
    `,
    checks: "",
  },
  "best-time-with-cooldown": {
    code: js`
      function maxProfit(prices) {
        let hold = -Infinity;
        let sold = 0;
        let rest = 0;
        for (const p of prices) {
          const prevSold = sold;
          sold = hold + p;
          hold = Math.max(hold, rest - p);
          rest = Math.max(rest, prevSold);
        }
        return Math.max(sold, rest);
      }
    `,
    checks: "",
  },
  "minimum-path-sum": {
    code: js`
      function minPathSum(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const dp = new Array(cols).fill(Infinity);
        dp[0] = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const left = c > 0 ? dp[c - 1] : Infinity;
            dp[c] = grid[r][c] + Math.min(dp[c], left);
          }
        }
        return dp[cols - 1];
      }
    `,
    checks: "",
  },
  "longest-increasing-path-in-a-matrix": {
    code: js`
      function longestIncreasingPath(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const memo = new Map();
        const dfs = (r, c) => {
          const key = r * cols + c;
          const cached = memo.get(key);
          if (cached !== undefined) return cached;
          let best = 1;
          const neighbors = [
            [r + 1, c],
            [r - 1, c],
            [r, c + 1],
            [r, c - 1],
          ];
          for (const [nr, nc] of neighbors) {
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
            if (matrix[nr][nc] > matrix[r][c]) {
              best = Math.max(best, 1 + dfs(nr, nc));
            }
          }
          memo.set(key, best);
          return best;
        };
        let longest = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) longest = Math.max(longest, dfs(r, c));
        }
        return longest;
      }
    `,
    checks: "",
  },
  "distinct-subsequences": {
    code: js`
      function numDistinct(s, t) {
        const dp = new Array(t.length + 1).fill(0);
        dp[0] = 1;
        for (const c of s) {
          for (let j = t.length; j >= 1; j--) {
            if (t[j - 1] === c) dp[j] += dp[j - 1];
          }
        }
        return dp[t.length];
      }
    `,
    checks: "",
  },
  "burst-balloons": {
    code: js`
      function maxCoins(nums) {
        const vals = [1, ...nums, 1];
        const n = vals.length;
        const dp = Array.from({ length: n }, () => new Array(n).fill(0));
        for (let len = 2; len < n; len++) {
          for (let left = 0; left + len < n; left++) {
            const right = left + len;
            for (let k = left + 1; k < right; k++) {
              const gain = vals[left] * vals[k] * vals[right];
              dp[left][right] = Math.max(
                dp[left][right],
                dp[left][k] + gain + dp[k][right],
              );
            }
          }
        }
        return dp[0][n - 1];
      }
    `,
    checks: "",
  },
  "regular-expression-matching": {
    code: js`
      function isMatch(s, p) {
        const m = s.length;
        const n = p.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
        dp[0][0] = true;
        for (let j = 2; j <= n; j++) {
          if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2];
        }
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const pc = p[j - 1];
            if (pc === "*") {
              const prev = p[j - 2];
              const matchesPrev = prev === "." || prev === s[i - 1];
              dp[i][j] = dp[i][j - 2] || (matchesPrev && dp[i - 1][j]);
            } else {
              const matches = pc === "." || pc === s[i - 1];
              dp[i][j] = matches && dp[i - 1][j - 1];
            }
          }
        }
        return dp[m][n];
      }
    `,
    checks: "",
  },
};
