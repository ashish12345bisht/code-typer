import { java, type Solution } from "../types";

export const dp2dJava: Record<string, Solution> = {
  "unique-paths": {
    code: java`
      class Solution {
          public int uniquePaths(int m, int n) {
              int[] row = new int[n];
              Arrays.fill(row, 1);
              for (int r = 1; r < m; r++) {
                  for (int c = 1; c < n; c++) row[c] += row[c - 1];
              }
              return row[n - 1];
          }
      }
    `,
    checks: "",
  },
  "unique-paths-ii": {
    code: java`
      class Solution {
          public int uniquePathsWithObstacles(int[][] grid) {
              int cols = grid[0].length;
              int[] row = new int[cols];
              row[0] = 1;
              for (int[] cells : grid) {
                  for (int c = 0; c < cols; c++) {
                      if (cells[c] == 1) row[c] = 0;
                      else if (c > 0) row[c] += row[c - 1];
                  }
              }
              return row[cols - 1];
          }
      }
    `,
    checks: "",
  },
  "longest-common-subsequence": {
    code: java`
      class Solution {
          public int longestCommonSubsequence(String a, String b) {
              int[][] dp = new int[a.length() + 1][b.length() + 1];
              for (int i = 1; i <= a.length(); i++) {
                  for (int j = 1; j <= b.length(); j++) {
                      if (a.charAt(i - 1) == b.charAt(j - 1)) {
                          dp[i][j] = dp[i - 1][j - 1] + 1;
                      } else {
                          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                      }
                  }
              }
              return dp[a.length()][b.length()];
          }
      }
    `,
    checks: "",
  },
  "edit-distance": {
    code: java`
      class Solution {
          public int minDistance(String a, String b) {
              int m = a.length(), n = b.length();
              int[][] dp = new int[m + 1][n + 1];
              for (int i = 0; i <= m; i++) dp[i][0] = i;
              for (int j = 0; j <= n; j++) dp[0][j] = j;
              for (int i = 1; i <= m; i++) {
                  for (int j = 1; j <= n; j++) {
                      if (a.charAt(i - 1) == b.charAt(j - 1)) {
                          dp[i][j] = dp[i - 1][j - 1];
                      } else {
                          int best = Math.min(dp[i - 1][j], dp[i][j - 1]);
                          dp[i][j] = 1 + Math.min(best, dp[i - 1][j - 1]);
                      }
                  }
              }
              return dp[m][n];
          }
      }
    `,
    checks: "",
  },
  "coin-change-ii": {
    code: java`
      class Solution {
          public int change(int amount, int[] coins) {
              int[] ways = new int[amount + 1];
              ways[0] = 1;
              for (int c : coins) {
                  for (int a = c; a <= amount; a++) ways[a] += ways[a - c];
              }
              return ways[amount];
          }
      }
    `,
    checks: "",
  },
  "target-sum": {
    code: java`
      class Solution {
          public int findTargetSumWays(int[] nums, int target) {
              Map<Integer, Integer> ways = new HashMap<>(Map.of(0, 1));
              for (int n : nums) {
                  Map<Integer, Integer> next = new HashMap<>();
                  for (var e : ways.entrySet()) {
                      next.merge(e.getKey() + n, e.getValue(), Integer::sum);
                      next.merge(e.getKey() - n, e.getValue(), Integer::sum);
                  }
                  ways = next;
              }
              return ways.getOrDefault(target, 0);
          }
      }
    `,
    checks: "",
  },
  "interleaving-string": {
    code: java`
      class Solution {
          public boolean isInterleave(String s1, String s2, String s3) {
              int m = s1.length(), n = s2.length();
              if (m + n != s3.length()) return false;
              boolean[] dp = new boolean[n + 1];
              for (int i = 0; i <= m; i++) {
                  for (int j = 0; j <= n; j++) {
                      if (i == 0 && j == 0) {
                          dp[j] = true;
                          continue;
                      }
                      char c = s3.charAt(i + j - 1);
                      boolean fromA = i > 0 && dp[j] && s1.charAt(i - 1) == c;
                      boolean fromB = j > 0 && dp[j - 1]
                              && s2.charAt(j - 1) == c;
                      dp[j] = fromA || fromB;
                  }
              }
              return dp[n];
          }
      }
    `,
    checks: "",
  },
  "best-time-with-cooldown": {
    code: java`
      class Solution {
          public int maxProfit(int[] prices) {
              int hold = Integer.MIN_VALUE, sold = 0, rest = 0;
              for (int p : prices) {
                  int prevSold = sold;
                  sold = hold + p;
                  hold = Math.max(hold, rest - p);
                  rest = Math.max(rest, prevSold);
              }
              return Math.max(sold, rest);
          }
      }
    `,
    checks: "",
  },
  "minimum-path-sum": {
    code: java`
      class Solution {
          public int minPathSum(int[][] grid) {
              int rows = grid.length, cols = grid[0].length;
              int[] row = new int[cols];
              Arrays.fill(row, Integer.MAX_VALUE);
              row[0] = 0;
              for (int r = 0; r < rows; r++) {
                  row[0] += grid[r][0];
                  for (int c = 1; c < cols; c++) {
                      row[c] = Math.min(row[c], row[c - 1]) + grid[r][c];
                  }
              }
              return row[cols - 1];
          }
      }
    `,
    checks: "",
  },
  "longest-increasing-path-in-a-matrix": {
    code: java`
      class Solution {
          private int[][] matrix, memo;

          public int longestIncreasingPath(int[][] matrix) {
              this.matrix = matrix;
              memo = new int[matrix.length][matrix[0].length];
              int best = 0;
              for (int r = 0; r < matrix.length; r++) {
                  for (int c = 0; c < matrix[0].length; c++) {
                      best = Math.max(best, longest(r, c, Integer.MIN_VALUE));
                  }
              }
              return best;
          }

          private int longest(int r, int c, int prev) {
              if (r < 0 || c < 0 || r >= matrix.length
                      || c >= matrix[0].length) {
                  return 0;
              }
              if (matrix[r][c] <= prev) return 0;
              if (memo[r][c] > 0) return memo[r][c];
              int v = matrix[r][c];
              int best = Math.max(longest(r + 1, c, v), longest(r - 1, c, v));
              best = Math.max(best, longest(r, c + 1, v));
              best = Math.max(best, longest(r, c - 1, v));
              return memo[r][c] = best + 1;
          }
      }
    `,
    checks: "",
  },
  "distinct-subsequences": {
    code: java`
      class Solution {
          public int numDistinct(String s, String t) {
              long[] ways = new long[t.length() + 1];
              ways[0] = 1;
              for (char c : s.toCharArray()) {
                  for (int j = t.length(); j > 0; j--) {
                      if (t.charAt(j - 1) == c) ways[j] += ways[j - 1];
                  }
              }
              return (int) ways[t.length()];
          }
      }
    `,
    checks: "",
  },
  "burst-balloons": {
    code: java`
      class Solution {
          public int maxCoins(int[] nums) {
              int n = nums.length + 2;
              int[] vals = new int[n];
              vals[0] = vals[n - 1] = 1;
              for (int i = 0; i < nums.length; i++) vals[i + 1] = nums[i];
              int[][] dp = new int[n][n];
              for (int gap = 2; gap < n; gap++) {
                  for (int lo = 0; lo + gap < n; lo++) {
                      int hi = lo + gap;
                      for (int k = lo + 1; k < hi; k++) {
                          int coins = vals[lo] * vals[k] * vals[hi];
                          int total = dp[lo][k] + coins + dp[k][hi];
                          dp[lo][hi] = Math.max(dp[lo][hi], total);
                      }
                  }
              }
              return dp[0][n - 1];
          }
      }
    `,
    checks: "",
  },
  "regular-expression-matching": {
    code: java`
      class Solution {
          public boolean isMatch(String s, String p) {
              int m = s.length(), n = p.length();
              boolean[][] dp = new boolean[m + 1][n + 1];
              dp[m][n] = true;
              for (int i = m; i >= 0; i--) {
                  for (int j = n - 1; j >= 0; j--) {
                      boolean first = i < m && (p.charAt(j) == s.charAt(i)
                              || p.charAt(j) == '.');
                      if (j + 1 < n && p.charAt(j + 1) == '*') {
                          dp[i][j] = dp[i][j + 2] || (first && dp[i + 1][j]);
                      } else {
                          dp[i][j] = first && dp[i + 1][j + 1];
                      }
                  }
              }
              return dp[0][0];
          }
      }
    `,
    checks: "",
  },
};
