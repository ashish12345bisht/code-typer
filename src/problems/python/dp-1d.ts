import { py, type Solution } from "../types";

export const dp1dPython: Record<string, Solution> = {
  "climbing-stairs": {
    code: py`
      class Solution:
          def climbStairs(self, n: int) -> int:
              a, b = 1, 1
              for _ in range(n):
                  a, b = b, a + b
              return a
    `,
    checks: "",
  },
  "min-cost-climbing-stairs": {
    code: py`
      class Solution:
          def minCostClimbingStairs(self, cost: List[int]) -> int:
              a = b = 0
              for i in range(2, len(cost) + 1):
                  a, b = b, min(b + cost[i - 1], a + cost[i - 2])
              return b
    `,
    checks: "",
  },
  "house-robber": {
    code: py`
      class Solution:
          def rob(self, nums: List[int]) -> int:
              skip = take = 0
              for n in nums:
                  skip, take = max(skip, take), skip + n
              return max(skip, take)
    `,
    checks: "",
  },
  "house-robber-ii": {
    code: py`
      class Solution:
          def rob(self, nums: List[int]) -> int:
              def line(houses: List[int]) -> int:
                  skip = take = 0
                  for n in houses:
                      skip, take = max(skip, take), skip + n
                  return max(skip, take)

              if len(nums) == 1:
                  return nums[0]
              return max(line(nums[1:]), line(nums[:-1]))
    `,
    checks: "",
  },
  "longest-palindromic-substring": {
    code: py`
      class Solution:
          def longestPalindrome(self, s: str) -> str:
              start = end = 0
              for center in range(2 * len(s) - 1):
                  lo, hi = center // 2, (center + 1) // 2
                  while lo >= 0 and hi < len(s) and s[lo] == s[hi]:
                      lo, hi = lo - 1, hi + 1
                  if hi - lo - 1 > end - start:
                      start, end = lo + 1, hi
              return s[start:end]
    `,
    checks: "",
  },
  "palindromic-substrings": {
    code: py`
      class Solution:
          def countSubstrings(self, s: str) -> int:
              count = 0
              for center in range(2 * len(s) - 1):
                  lo, hi = center // 2, (center + 1) // 2
                  while lo >= 0 and hi < len(s) and s[lo] == s[hi]:
                      count += 1
                      lo, hi = lo - 1, hi + 1
              return count
    `,
    checks: "",
  },
  "decode-ways": {
    code: py`
      class Solution:
          def numDecodings(self, s: str) -> int:
              prev, cur = 1, 1 if s[0] != "0" else 0
              for i in range(1, len(s)):
                  ways = cur if s[i] != "0" else 0
                  if 10 <= int(s[i - 1:i + 1]) <= 26:
                      ways += prev
                  prev, cur = cur, ways
              return cur
    `,
    checks: "",
  },
  "coin-change": {
    code: py`
      class Solution:
          def coinChange(self, coins: List[int], amount: int) -> int:
              dp = [0] + [inf] * amount
              for a in range(1, amount + 1):
                  for c in coins:
                      if c <= a:
                          dp[a] = min(dp[a], dp[a - c] + 1)
              return -1 if dp[amount] == inf else dp[amount]
    `,
    checks: "",
  },
  "maximum-product-subarray": {
    code: py`
      class Solution:
          def maxProduct(self, nums: List[int]) -> int:
              best = hi = lo = nums[0]
              for n in nums[1:]:
                  candidates = (n, hi * n, lo * n)
                  hi, lo = max(candidates), min(candidates)
                  best = max(best, hi)
              return best
    `,
    checks: "",
  },
  "word-break": {
    code: py`
      class Solution:
          def wordBreak(self, s: str, wordDict: List[str]) -> bool:
              words = set(wordDict)
              ok = [True] + [False] * len(s)
              for end in range(1, len(s) + 1):
                  for start in range(end):
                      if ok[start] and s[start:end] in words:
                          ok[end] = True
                          break
              return ok[-1]
    `,
    checks: "",
  },
  "longest-increasing-subsequence": {
    code: py`
      class Solution:
          def lengthOfLIS(self, nums: List[int]) -> int:
              tails = []
              for n in nums:
                  i = bisect.bisect_left(tails, n)
                  if i == len(tails):
                      tails.append(n)
                  else:
                      tails[i] = n
              return len(tails)
    `,
    checks: "",
  },
  "partition-equal-subset-sum": {
    code: py`
      class Solution:
          def canPartition(self, nums: List[int]) -> bool:
              total = sum(nums)
              if total % 2:
                  return False
              reachable = {0}
              for n in nums:
                  reachable |= {r + n for r in reachable}
              return total // 2 in reachable
    `,
    checks: "",
  },
  "perfect-squares": {
    code: py`
      class Solution:
          def numSquares(self, n: int) -> int:
              dp = [0] + [inf] * n
              for i in range(1, n + 1):
                  j = 1
                  while j * j <= i:
                      dp[i] = min(dp[i], dp[i - j * j] + 1)
                      j += 1
              return dp[n]
    `,
    checks: "",
  },
  "combination-sum-iv": {
    code: py`
      class Solution:
          def combinationSum4(self, nums: List[int], target: int) -> int:
              dp = [1] + [0] * target
              for t in range(1, target + 1):
                  for n in nums:
                      if n <= t:
                          dp[t] += dp[t - n]
              return dp[target]
    `,
    checks: "",
  },
};
