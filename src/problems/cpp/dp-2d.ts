import { cpp, type Solution } from "../types";

export const dp2dCpp: Record<string, Solution> = {
  "unique-paths": {
    code: cpp`
      class Solution {
      public:
          int uniquePaths(int m, int n) {
              vector<int> row(n, 1);
              for (int r = 1; r < m; r++) {
                  for (int c = 1; c < n; c++) row[c] += row[c - 1];
              }
              return row[n - 1];
          }
      };
    `,
    checks: "",
  },
  "unique-paths-ii": {
    code: cpp`
      class Solution {
      public:
          int uniquePathsWithObstacles(vector<vector<int>>& grid) {
              int cols = grid[0].size();
              vector<long long> dp(cols);
              dp[0] = 1;
              for (auto& row : grid) {
                  for (int c = 0; c < cols; c++) {
                      if (row[c] == 1) dp[c] = 0;
                      else if (c > 0) dp[c] += dp[c - 1];
                  }
              }
              return dp[cols - 1];
          }
      };
    `,
    checks: "",
  },
  "longest-common-subsequence": {
    code: cpp`
      class Solution {
      public:
          int longestCommonSubsequence(string a, string b) {
              int m = a.size(), n = b.size();
              vector<vector<int>> dp(m + 1, vector<int>(n + 1));
              for (int i = 1; i <= m; i++) {
                  for (int j = 1; j <= n; j++) {
                      if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
                      else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                  }
              }
              return dp[m][n];
          }
      };
    `,
    checks: "",
  },
  "edit-distance": {
    code: cpp`
      class Solution {
      public:
          int minDistance(string word1, string word2) {
              int m = word1.size(), n = word2.size();
              vector<vector<int>> dp(m + 1, vector<int>(n + 1));
              for (int i = 0; i <= m; i++) dp[i][0] = i;
              for (int j = 0; j <= n; j++) dp[0][j] = j;
              for (int i = 1; i <= m; i++) {
                  for (int j = 1; j <= n; j++) {
                      if (word1[i - 1] == word2[j - 1]) {
                          dp[i][j] = dp[i - 1][j - 1];
                      } else {
                          dp[i][j] =
                              1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
                      }
                  }
              }
              return dp[m][n];
          }
      };
    `,
    checks: "",
  },
  "coin-change-ii": {
    code: cpp`
      class Solution {
      public:
          int change(int amount, vector<int>& coins) {
              vector<unsigned long long> dp(amount + 1);
              dp[0] = 1;
              for (int coin : coins) {
                  for (int a = coin; a <= amount; a++) dp[a] += dp[a - coin];
              }
              return dp[amount];
          }
      };
    `,
    checks: "",
  },
  "target-sum": {
    code: cpp`
      class Solution {
      public:
          int findTargetSumWays(vector<int>& nums, int target) {
              unordered_map<int, int> ways{{0, 1}};
              for (int n : nums) {
                  unordered_map<int, int> next;
                  for (auto [sum, count] : ways) {
                      next[sum + n] += count;
                      next[sum - n] += count;
                  }
                  ways = next;
              }
              return ways[target];
          }
      };
    `,
    checks: "",
  },
  "interleaving-string": {
    code: cpp`
      class Solution {
      public:
          bool isInterleave(string s1, string s2, string s3) {
              int m = s1.size(), n = s2.size();
              if (m + n != s3.size()) return false;
              vector<bool> dp(n + 1);
              for (int i = 0; i <= m; i++) {
                  for (int j = 0; j <= n; j++) {
                      if (i == 0 && j == 0) {
                          dp[j] = true;
                          continue;
                      }
                      bool fromTop = i > 0 && dp[j] && s1[i - 1] == s3[i + j - 1];
                      bool fromLeft =
                          j > 0 && dp[j - 1] && s2[j - 1] == s3[i + j - 1];
                      dp[j] = fromTop || fromLeft;
                  }
              }
              return dp[n];
          }
      };
    `,
    checks: "",
  },
  "best-time-with-cooldown": {
    code: cpp`
      class Solution {
      public:
          int maxProfit(vector<int>& prices) {
              int hold = INT_MIN / 2, sold = 0, rest = 0;
              for (int p : prices) {
                  int prevSold = sold;
                  sold = hold + p;
                  hold = max(hold, rest - p);
                  rest = max(rest, prevSold);
              }
              return max(sold, rest);
          }
      };
    `,
    checks: "",
  },
  "minimum-path-sum": {
    code: cpp`
      class Solution {
      public:
          int minPathSum(vector<vector<int>>& grid) {
              int cols = grid[0].size();
              vector<int> dp(cols, INT_MAX);
              dp[0] = 0;
              for (auto& row : grid) {
                  for (int c = 0; c < cols; c++) {
                      int left = c > 0 ? dp[c - 1] : INT_MAX;
                      dp[c] = row[c] + min(dp[c], left);
                  }
              }
              return dp[cols - 1];
          }
      };
    `,
    checks: "",
  },
  "longest-increasing-path-in-a-matrix": {
    code: cpp`
      class Solution {
      public:
          int longestIncreasingPath(vector<vector<int>>& matrix) {
              int rows = matrix.size(), cols = matrix[0].size(), longest = 0;
              memo.assign(rows, vector<int>(cols, 0));
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      longest = max(longest, dfs(matrix, r, c));
                  }
              }
              return longest;
          }

      private:
          vector<vector<int>> memo;

          int dfs(vector<vector<int>>& m, int r, int c) {
              if (memo[r][c]) return memo[r][c];
              int best = 1;
              int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              for (auto& d : dirs) {
                  int nr = r + d[0], nc = c + d[1];
                  if (nr < 0 || nc < 0 || nr >= m.size() || nc >= m[0].size()) {
                      continue;
                  }
                  if (m[nr][nc] > m[r][c]) best = max(best, 1 + dfs(m, nr, nc));
              }
              return memo[r][c] = best;
          }
      };
    `,
    checks: "",
  },
  "distinct-subsequences": {
    code: cpp`
      class Solution {
      public:
          int numDistinct(string s, string t) {
              vector<unsigned long long> dp(t.size() + 1);
              dp[0] = 1;
              for (char c : s) {
                  for (int j = t.size(); j >= 1; j--) {
                      if (t[j - 1] == c) dp[j] += dp[j - 1];
                  }
              }
              return dp[t.size()];
          }
      };
    `,
    checks: "",
  },
  "burst-balloons": {
    code: cpp`
      class Solution {
      public:
          int maxCoins(vector<int>& nums) {
              vector<int> vals = {1};
              vals.insert(vals.end(), nums.begin(), nums.end());
              vals.push_back(1);
              int n = vals.size();
              vector<vector<int>> dp(n, vector<int>(n));
              for (int len = 2; len < n; len++) {
                  for (int left = 0; left + len < n; left++) {
                      int right = left + len;
                      for (int k = left + 1; k < right; k++) {
                          int gain = vals[left] * vals[k] * vals[right];
                          dp[left][right] =
                              max(dp[left][right], dp[left][k] + gain + dp[k][right]);
                      }
                  }
              }
              return dp[0][n - 1];
          }
      };
    `,
    checks: "",
  },
  "regular-expression-matching": {
    code: cpp`
      class Solution {
      public:
          bool isMatch(string s, string p) {
              int m = s.size(), n = p.size();
              vector<vector<bool>> dp(m + 1, vector<bool>(n + 1));
              dp[0][0] = true;
              for (int j = 2; j <= n; j++) {
                  if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
              }
              for (int i = 1; i <= m; i++) {
                  for (int j = 1; j <= n; j++) {
                      if (p[j - 1] == '*') {
                          bool matchesPrev = p[j - 2] == '.' || p[j - 2] == s[i - 1];
                          dp[i][j] = dp[i][j - 2] || (matchesPrev && dp[i - 1][j]);
                      } else {
                          bool matches = p[j - 1] == '.' || p[j - 1] == s[i - 1];
                          dp[i][j] = matches && dp[i - 1][j - 1];
                      }
                  }
              }
              return dp[m][n];
          }
      };
    `,
    checks: "",
  },
};
