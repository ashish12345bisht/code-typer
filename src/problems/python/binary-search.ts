import { py, type Solution } from "../types";

export const binarySearchPython: Record<string, Solution> = {
  "binary-search": {
    code: py`
      class Solution:
          def search(self, nums: List[int], target: int) -> int:
              lo, hi = 0, len(nums) - 1
              while lo <= hi:
                  mid = (lo + hi) // 2
                  if nums[mid] == target:
                      return mid
                  if nums[mid] < target:
                      lo = mid + 1
                  else:
                      hi = mid - 1
              return -1
    `,
    checks: "",
  },
  "search-insert-position": {
    code: py`
      class Solution:
          def searchInsert(self, nums: List[int], target: int) -> int:
              lo, hi = 0, len(nums)
              while lo < hi:
                  mid = (lo + hi) // 2
                  if nums[mid] < target:
                      lo = mid + 1
                  else:
                      hi = mid
              return lo
    `,
    checks: "",
  },
  "search-a-2d-matrix": {
    code: py`
      class Solution:
          def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
              cols = len(matrix[0])
              lo, hi = 0, len(matrix) * cols - 1
              while lo <= hi:
                  mid = (lo + hi) // 2
                  value = matrix[mid // cols][mid % cols]
                  if value == target:
                      return True
                  if value < target:
                      lo = mid + 1
                  else:
                      hi = mid - 1
              return False
    `,
    checks: "",
  },
  "koko-eating-bananas": {
    code: py`
      class Solution:
          def minEatingSpeed(self, piles: List[int], h: int) -> int:
              lo, hi = 1, max(piles)
              while lo < hi:
                  k = (lo + hi) // 2
                  hours = sum((p + k - 1) // k for p in piles)
                  if hours <= h:
                      hi = k
                  else:
                      lo = k + 1
              return lo
    `,
    checks: "",
  },
  "find-minimum-in-rotated-sorted-array": {
    code: py`
      class Solution:
          def findMin(self, nums: List[int]) -> int:
              lo, hi = 0, len(nums) - 1
              while lo < hi:
                  mid = (lo + hi) // 2
                  if nums[mid] > nums[hi]:
                      lo = mid + 1
                  else:
                      hi = mid
              return nums[lo]
    `,
    checks: "",
  },
  "search-in-rotated-sorted-array": {
    code: py`
      class Solution:
          def search(self, nums: List[int], target: int) -> int:
              lo, hi = 0, len(nums) - 1
              while lo <= hi:
                  mid = (lo + hi) // 2
                  if nums[mid] == target:
                      return mid
                  if nums[lo] <= nums[mid]:
                      if nums[lo] <= target < nums[mid]:
                          hi = mid - 1
                      else:
                          lo = mid + 1
                  else:
                      if nums[mid] < target <= nums[hi]:
                          lo = mid + 1
                      else:
                          hi = mid - 1
              return -1
    `,
    checks: "",
  },
  "first-and-last-position": {
    code: py`
      class Solution:
          def searchRange(self, nums: List[int], target: int) -> List[int]:
              start = bisect.bisect_left(nums, target)
              if start == len(nums) or nums[start] != target:
                  return [-1, -1]
              return [start, bisect.bisect_right(nums, target) - 1]
    `,
    checks: "",
  },
  "sqrt-x": {
    code: py`
      class Solution:
          def mySqrt(self, x: int) -> int:
              lo, hi = 0, x
              while lo < hi:
                  mid = (lo + hi + 1) // 2
                  if mid * mid <= x:
                      lo = mid
                  else:
                      hi = mid - 1
              return lo
    `,
    checks: "",
  },
  "find-peak-element": {
    code: py`
      class Solution:
          def findPeakElement(self, nums: List[int]) -> int:
              lo, hi = 0, len(nums) - 1
              while lo < hi:
                  mid = (lo + hi) // 2
                  if nums[mid] < nums[mid + 1]:
                      lo = mid + 1
                  else:
                      hi = mid
              return lo
    `,
    checks: "",
  },
  "median-of-two-sorted-arrays": {
    code: py`
      class Solution:
          def findMedianSortedArrays(self, a: List[int], b: List[int]) -> float:
              if len(a) > len(b):
                  a, b = b, a
              m, n = len(a), len(b)
              half = (m + n + 1) // 2
              lo, hi = 0, m
              while lo <= hi:
                  i = (lo + hi) // 2
                  j = half - i
                  a_left = a[i - 1] if i > 0 else -inf
                  a_right = a[i] if i < m else inf
                  b_left = b[j - 1] if j > 0 else -inf
                  b_right = b[j] if j < n else inf
                  if a_left <= b_right and b_left <= a_right:
                      left = max(a_left, b_left)
                      if (m + n) % 2:
                          return left
                      return (left + min(a_right, b_right)) / 2
                  if a_left > b_right:
                      hi = i - 1
                  else:
                      lo = i + 1
              return 0.0
    `,
    checks: "",
  },
  "split-array-largest-sum": {
    code: py`
      class Solution:
          def splitArray(self, nums: List[int], k: int) -> int:
              def parts(limit: int) -> int:
                  count, total = 1, 0
                  for n in nums:
                      if total + n > limit:
                          count += 1
                          total = 0
                      total += n
                  return count

              lo, hi = max(nums), sum(nums)
              while lo < hi:
                  mid = (lo + hi) // 2
                  if parts(mid) <= k:
                      hi = mid
                  else:
                      lo = mid + 1
              return lo
    `,
    checks: "",
  },
  "capacity-to-ship-packages": {
    code: py`
      class Solution:
          def shipWithinDays(self, weights: List[int], days: int) -> int:
              lo, hi = max(weights), sum(weights)
              while lo < hi:
                  cap = (lo + hi) // 2
                  needed, load = 1, 0
                  for w in weights:
                      if load + w > cap:
                          needed += 1
                          load = 0
                      load += w
                  if needed <= days:
                      hi = cap
                  else:
                      lo = cap + 1
              return lo
    `,
    checks: "",
  },
};
