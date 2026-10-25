import { py, type Solution } from "../types";

export const dp2dPython: Record<string, Solution> = {
  "unique-paths": {
    code: py`
      class Solution:
          def uniquePaths(self, m: int, n: int) -> int:
              row = [1] * n
              for _ in range(1, m):
                  for c in range(1, n):
                      row[c] += row[c - 1]
              return row[-1]
    `,
    checks: "",
  },
  "unique-paths-ii": {
    code: py`
      class Solution:
          def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
              row = [0] * len(grid[0])
              row[0] = 1
              for cells in grid:
                  for c, blocked in enumerate(cells):
                      if blocked:
                          row[c] = 0
                      elif c > 0:
                          row[c] += row[c - 1]
              return row[-1]
    `,
    checks: "",
  },
  "longest-common-subsequence": {
    code: py`
      class Solution:
          def longestCommonSubsequence(self, a: str, b: str) -> int:
              prev = [0] * (len(b) + 1)
              for x in a:
                  cur = [0]
                  for j, y in enumerate(b):
                      if x == y:
                          cur.append(prev[j] + 1)
                      else:
                          cur.append(max(prev[j + 1], cur[j]))
                  prev = cur
              return prev[-1]
    `,
    checks: "",
  },
  "edit-distance": {
    code: py`
      class Solution:
          def minDistance(self, a: str, b: str) -> int:
              prev = list(range(len(b) + 1))
              for i, x in enumerate(a, 1):
                  cur = [i]
                  for j, y in enumerate(b, 1):
                      if x == y:
                          cur.append(prev[j - 1])
                      else:
                          cur.append(1 + min(prev[j], cur[j - 1], prev[j - 1]))
                  prev = cur
              return prev[-1]
    `,
    checks: "",
  },
  "coin-change-ii": {
    code: py`
      class Solution:
          def change(self, amount: int, coins: List[int]) -> int:
              ways = [1] + [0] * amount
              for c in coins:
                  for a in range(c, amount + 1):
                      ways[a] += ways[a - c]
              return ways[amount]
    `,
    checks: "",
  },
  "target-sum": {
    code: py`
      class Solution:
          def findTargetSumWays(self, nums: List[int], target: int) -> int:
              ways = Counter({0: 1})
              for n in nums:
                  nxt = Counter()
                  for total, count in ways.items():
                      nxt[total + n] += count
                      nxt[total - n] += count
                  ways = nxt
              return ways[target]
    `,
    checks: "",
  },
  "interleaving-string": {
    code: py`
      class Solution:
          def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
              if len(s1) + len(s2) != len(s3):
                  return False
              dp = [False] * (len(s2) + 1)
              for i in range(len(s1) + 1):
                  for j in range(len(s2) + 1):
                      if i == 0 and j == 0:
                          dp[j] = True
                          continue
                      k = i + j - 1
                      from_a = i > 0 and dp[j] and s1[i - 1] == s3[k]
                      from_b = j > 0 and dp[j - 1] and s2[j - 1] == s3[k]
                      dp[j] = from_a or from_b
              return dp[-1]
    `,
    checks: "",
  },
  "best-time-with-cooldown": {
    code: py`
      class Solution:
          def maxProfit(self, prices: List[int]) -> int:
              hold, sold, rest = -inf, 0, 0
              for p in prices:
                  hold, sold, rest = max(hold, rest - p), hold + p, max(rest, sold)
              return max(sold, rest)
    `,
    checks: "",
  },
  "minimum-path-sum": {
    code: py`
      class Solution:
          def minPathSum(self, grid: List[List[int]]) -> int:
              cols = len(grid[0])
              row = [inf] * cols
              row[0] = 0
              for cells in grid:
                  row[0] += cells[0]
                  for c in range(1, cols):
                      row[c] = min(row[c], row[c - 1]) + cells[c]
              return row[-1]
    `,
    checks: "",
  },
  "longest-increasing-path-in-a-matrix": {
    code: py`
      class Solution:
          def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
              rows, cols = len(matrix), len(matrix[0])

              @cache
              def longest(r: int, c: int) -> int:
                  best = 1
                  for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                 (r, c - 1)):
                      if 0 <= nr < rows and 0 <= nc < cols:
                          if matrix[nr][nc] > matrix[r][c]:
                              best = max(best, 1 + longest(nr, nc))
                  return best

              return max(longest(r, c) for r in range(rows)
                         for c in range(cols))
    `,
    checks: "",
  },
  "distinct-subsequences": {
    code: py`
      class Solution:
          def numDistinct(self, s: str, t: str) -> int:
              ways = [1] + [0] * len(t)
              for c in s:
                  for j in range(len(t), 0, -1):
                      if t[j - 1] == c:
                          ways[j] += ways[j - 1]
              return ways[-1]
    `,
    checks: "",
  },
  "burst-balloons": {
    code: py`
      class Solution:
          def maxCoins(self, nums: List[int]) -> int:
              vals = [1] + nums + [1]
              n = len(vals)
              dp = [[0] * n for _ in range(n)]
              for gap in range(2, n):
                  for lo in range(n - gap):
                      hi = lo + gap
                      for k in range(lo + 1, hi):
                          coins = vals[lo] * vals[k] * vals[hi]
                          total = dp[lo][k] + coins + dp[k][hi]
                          dp[lo][hi] = max(dp[lo][hi], total)
              return dp[0][n - 1]
    `,
    checks: "",
  },
  "regular-expression-matching": {
    code: py`
      class Solution:
          def isMatch(self, s: str, p: str) -> bool:
              @cache
              def match(i: int, j: int) -> bool:
                  if j == len(p):
                      return i == len(s)
                  first = i < len(s) and p[j] in (s[i], ".")
                  if j + 1 < len(p) and p[j + 1] == "*":
                      return match(i, j + 2) or (first and match(i + 1, j))
                  return first and match(i + 1, j + 1)

              return match(0, 0)
    `,
    checks: "",
  },
};
