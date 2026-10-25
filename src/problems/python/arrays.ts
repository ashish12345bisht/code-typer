import { py, type Solution } from "../types";

export const arraysPython: Record<string, Solution> = {
  "two-sum": {
    code: py`
      class Solution:
          def twoSum(self, nums: List[int], target: int) -> List[int]:
              seen = {}
              for i, n in enumerate(nums):
                  if target - n in seen:
                      return [seen[target - n], i]
                  seen[n] = i
              return []
    `,
    checks: "",
  },
  "contains-duplicate": {
    code: py`
      class Solution:
          def containsDuplicate(self, nums: List[int]) -> bool:
              seen = set()
              for n in nums:
                  if n in seen:
                      return True
                  seen.add(n)
              return False
    `,
    checks: "",
  },
  "valid-anagram": {
    code: py`
      class Solution:
          def isAnagram(self, s: str, t: str) -> bool:
              return Counter(s) == Counter(t)
    `,
    checks: "",
  },
  "group-anagrams": {
    code: py`
      class Solution:
          def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
              groups = defaultdict(list)
              for s in strs:
                  groups["".join(sorted(s))].append(s)
              return list(groups.values())
    `,
    checks: "",
  },
  "top-k-frequent-elements": {
    code: py`
      class Solution:
          def topKFrequent(self, nums: List[int], k: int) -> List[int]:
              buckets = [[] for _ in range(len(nums) + 1)]
              for n, c in Counter(nums).items():
                  buckets[c].append(n)
              result = []
              for c in range(len(buckets) - 1, 0, -1):
                  result.extend(buckets[c])
                  if len(result) >= k:
                      break
              return result[:k]
    `,
    checks: "",
  },
  "product-of-array-except-self": {
    code: py`
      class Solution:
          def productExceptSelf(self, nums: List[int]) -> List[int]:
              n = len(nums)
              result = [1] * n
              prefix = 1
              for i in range(n):
                  result[i] = prefix
                  prefix *= nums[i]
              suffix = 1
              for i in range(n - 1, -1, -1):
                  result[i] *= suffix
                  suffix *= nums[i]
              return result
    `,
    checks: "",
  },
  "longest-consecutive-sequence": {
    code: py`
      class Solution:
          def longestConsecutive(self, nums: List[int]) -> int:
              values = set(nums)
              best = 0
              for n in values:
                  if n - 1 in values:
                      continue
                  length = 1
                  while n + length in values:
                      length += 1
                  best = max(best, length)
              return best
    `,
    checks: "",
  },
  "majority-element": {
    code: py`
      class Solution:
          def majorityElement(self, nums: List[int]) -> int:
              candidate, count = None, 0
              for n in nums:
                  if count == 0:
                      candidate = n
                  count += 1 if n == candidate else -1
              return candidate
    `,
    checks: "",
  },
  "valid-sudoku": {
    code: py`
      class Solution:
          def isValidSudoku(self, board: List[List[str]]) -> bool:
              seen = set()
              for r in range(9):
                  for c in range(9):
                      v = board[r][c]
                      if v == ".":
                          continue
                      box = (r // 3, c // 3)
                      keys = [("row", r, v), ("col", c, v), ("box", box, v)]
                      if any(key in seen for key in keys):
                          return False
                      seen.update(keys)
              return True
    `,
    checks: "",
  },
  "subarray-sum-equals-k": {
    code: py`
      class Solution:
          def subarraySum(self, nums: List[int], k: int) -> int:
              counts = defaultdict(int)
              counts[0] = 1
              total = prefix = 0
              for n in nums:
                  prefix += n
                  total += counts[prefix - k]
                  counts[prefix] += 1
              return total
    `,
    checks: "",
  },
  "move-zeroes": {
    code: py`
      class Solution:
          def moveZeroes(self, nums: List[int]) -> None:
              insert = 0
              for i in range(len(nums)):
                  if nums[i] != 0:
                      nums[insert], nums[i] = nums[i], nums[insert]
                      insert += 1
    `,
    checks: "",
  },
  "best-time-to-buy-and-sell-stock": {
    code: py`
      class Solution:
          def maxProfit(self, prices: List[int]) -> int:
              min_price, best = inf, 0
              for price in prices:
                  min_price = min(min_price, price)
                  best = max(best, price - min_price)
              return best
    `,
    checks: "",
  },
  "find-all-numbers-disappeared": {
    code: py`
      class Solution:
          def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
              for n in nums:
                  i = abs(n) - 1
                  nums[i] = -abs(nums[i])
              return [i + 1 for i, n in enumerate(nums) if n > 0]
    `,
    checks: "",
  },
  "rotate-image": {
    code: py`
      class Solution:
          def rotate(self, matrix: List[List[int]]) -> None:
              n = len(matrix)
              for i in range(n):
                  for j in range(i + 1, n):
                      matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
              for row in matrix:
                  row.reverse()
    `,
    checks: "",
  },
  "spiral-matrix": {
    code: py`
      class Solution:
          def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
              result = []
              top, bottom = 0, len(matrix) - 1
              left, right = 0, len(matrix[0]) - 1
              while top <= bottom and left <= right:
                  for c in range(left, right + 1):
                      result.append(matrix[top][c])
                  top += 1
                  for r in range(top, bottom + 1):
                      result.append(matrix[r][right])
                  right -= 1
                  if top <= bottom:
                      for c in range(right, left - 1, -1):
                          result.append(matrix[bottom][c])
                      bottom -= 1
                  if left <= right:
                      for r in range(bottom, top - 1, -1):
                          result.append(matrix[r][left])
                      left += 1
              return result
    `,
    checks: "",
  },
  "set-matrix-zeroes": {
    code: py`
      class Solution:
          def setZeroes(self, matrix: List[List[int]]) -> None:
              rows, cols = set(), set()
              for r, row in enumerate(matrix):
                  for c, v in enumerate(row):
                      if v == 0:
                          rows.add(r)
                          cols.add(c)
              for r, row in enumerate(matrix):
                  for c in range(len(row)):
                      if r in rows or c in cols:
                          row[c] = 0
    `,
    checks: "",
  },
  "first-missing-positive": {
    code: py`
      class Solution:
          def firstMissingPositive(self, nums: List[int]) -> int:
              n = len(nums)
              for i in range(n):
                  while 0 < nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                      j = nums[i] - 1
                      nums[i], nums[j] = nums[j], nums[i]
              for i in range(n):
                  if nums[i] != i + 1:
                      return i + 1
              return n + 1
    `,
    checks: "",
  },
  "pascals-triangle": {
    code: py`
      class Solution:
          def generate(self, numRows: int) -> List[List[int]]:
              rows = [[1]]
              for i in range(1, numRows):
                  prev = rows[-1]
                  row = [1]
                  for j in range(1, i):
                      row.append(prev[j - 1] + prev[j])
                  row.append(1)
                  rows.append(row)
              return rows
    `,
    checks: "",
  },
};
