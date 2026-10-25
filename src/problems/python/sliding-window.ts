import { py, type Solution } from "../types";

export const slidingWindowPython: Record<string, Solution> = {
  "longest-substring-without-repeating": {
    code: py`
      class Solution:
          def lengthOfLongestSubstring(self, s: str) -> int:
              last = {}
              start = best = 0
              for i, c in enumerate(s):
                  if last.get(c, -1) >= start:
                      start = last[c] + 1
                  last[c] = i
                  best = max(best, i - start + 1)
              return best
    `,
    checks: "",
  },
  "longest-repeating-character-replacement": {
    code: py`
      class Solution:
          def characterReplacement(self, s: str, k: int) -> int:
              count = defaultdict(int)
              start = max_freq = best = 0
              for i, c in enumerate(s):
                  count[c] += 1
                  max_freq = max(max_freq, count[c])
                  while i - start + 1 - max_freq > k:
                      count[s[start]] -= 1
                      start += 1
                  best = max(best, i - start + 1)
              return best
    `,
    checks: "",
  },
  "permutation-in-string": {
    code: py`
      class Solution:
          def checkInclusion(self, s1: str, s2: str) -> bool:
              k = len(s1)
              need, window = Counter(s1), Counter(s2[:k])
              if need == window:
                  return True
              for i in range(k, len(s2)):
                  window[s2[i]] += 1
                  window[s2[i - k]] -= 1
                  if need == window:
                      return True
              return False
    `,
    checks: "",
  },
  "minimum-window-substring": {
    code: py`
      class Solution:
          def minWindow(self, s: str, t: str) -> str:
              need = Counter(t)
              missing = len(t)
              start = best_start = 0
              best_len = inf
              for end, c in enumerate(s):
                  if need[c] > 0:
                      missing -= 1
                  need[c] -= 1
                  while missing == 0:
                      if end - start + 1 < best_len:
                          best_start, best_len = start, end - start + 1
                      need[s[start]] += 1
                      if need[s[start]] > 0:
                          missing += 1
                      start += 1
              return "" if best_len == inf else s[best_start:best_start + best_len]
    `,
    checks: "",
  },
  "sliding-window-maximum": {
    code: py`
      class Solution:
          def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
              dq = deque()
              result = []
              for i, n in enumerate(nums):
                  if dq and dq[0] <= i - k:
                      dq.popleft()
                  while dq and nums[dq[-1]] < n:
                      dq.pop()
                  dq.append(i)
                  if i >= k - 1:
                      result.append(nums[dq[0]])
              return result
    `,
    checks: "",
  },
  "maximum-average-subarray": {
    code: py`
      class Solution:
          def findMaxAverage(self, nums: List[int], k: int) -> float:
              window = best = sum(nums[:k])
              for i in range(k, len(nums)):
                  window += nums[i] - nums[i - k]
                  best = max(best, window)
              return best / k
    `,
    checks: "",
  },
  "minimum-size-subarray-sum": {
    code: py`
      class Solution:
          def minSubArrayLen(self, target: int, nums: List[int]) -> int:
              start = total = 0
              best = inf
              for end, n in enumerate(nums):
                  total += n
                  while total >= target:
                      best = min(best, end - start + 1)
                      total -= nums[start]
                      start += 1
              return 0 if best == inf else best
    `,
    checks: "",
  },
  "find-all-anagrams-in-a-string": {
    code: py`
      class Solution:
          def findAnagrams(self, s: str, p: str) -> List[int]:
              need, window = Counter(p), Counter()
              result = []
              for i, c in enumerate(s):
                  window[c] += 1
                  if i >= len(p):
                      window[s[i - len(p)]] -= 1
                  if window == need:
                      result.append(i - len(p) + 1)
              return result
    `,
    checks: "",
  },
  "fruit-into-baskets": {
    code: py`
      class Solution:
          def totalFruit(self, fruits: List[int]) -> int:
              count = defaultdict(int)
              start = best = 0
              for end, f in enumerate(fruits):
                  count[f] += 1
                  while len(count) > 2:
                      count[fruits[start]] -= 1
                      if count[fruits[start]] == 0:
                          del count[fruits[start]]
                      start += 1
                  best = max(best, end - start + 1)
              return best
    `,
    checks: "",
  },
  "max-consecutive-ones-iii": {
    code: py`
      class Solution:
          def longestOnes(self, nums: List[int], k: int) -> int:
              start = zeros = best = 0
              for end, n in enumerate(nums):
                  if n == 0:
                      zeros += 1
                  while zeros > k:
                      if nums[start] == 0:
                          zeros -= 1
                      start += 1
                  best = max(best, end - start + 1)
              return best
    `,
    checks: "",
  },
};
