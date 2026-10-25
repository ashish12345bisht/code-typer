import { py, type Solution } from "../types";

export const twoPointersPython: Record<string, Solution> = {
  "valid-palindrome": {
    code: py`
      class Solution:
          def isPalindrome(self, s: str) -> bool:
              i, j = 0, len(s) - 1
              while i < j:
                  if not s[i].isalnum():
                      i += 1
                  elif not s[j].isalnum():
                      j -= 1
                  elif s[i].lower() != s[j].lower():
                      return False
                  else:
                      i, j = i + 1, j - 1
              return True
    `,
    checks: "",
  },
  "two-sum-ii": {
    code: py`
      class Solution:
          def twoSum(self, numbers: List[int], target: int) -> List[int]:
              i, j = 0, len(numbers) - 1
              while i < j:
                  total = numbers[i] + numbers[j]
                  if total == target:
                      return [i + 1, j + 1]
                  if total < target:
                      i += 1
                  else:
                      j -= 1
              return []
    `,
    checks: "",
  },
  "three-sum": {
    code: py`
      class Solution:
          def threeSum(self, nums: List[int]) -> List[List[int]]:
              nums.sort()
              result = []
              for i in range(len(nums) - 2):
                  if i > 0 and nums[i] == nums[i - 1]:
                      continue
                  lo, hi = i + 1, len(nums) - 1
                  while lo < hi:
                      total = nums[i] + nums[lo] + nums[hi]
                      if total < 0:
                          lo += 1
                      elif total > 0:
                          hi -= 1
                      else:
                          result.append([nums[i], nums[lo], nums[hi]])
                          lo += 1
                          while lo < hi and nums[lo] == nums[lo - 1]:
                              lo += 1
              return result
    `,
    checks: "",
  },
  "container-with-most-water": {
    code: py`
      class Solution:
          def maxArea(self, height: List[int]) -> int:
              i, j, best = 0, len(height) - 1, 0
              while i < j:
                  best = max(best, min(height[i], height[j]) * (j - i))
                  if height[i] < height[j]:
                      i += 1
                  else:
                      j -= 1
              return best
    `,
    checks: "",
  },
  "trapping-rain-water": {
    code: py`
      class Solution:
          def trap(self, height: List[int]) -> int:
              i, j = 0, len(height) - 1
              left_max = right_max = water = 0
              while i < j:
                  if height[i] < height[j]:
                      left_max = max(left_max, height[i])
                      water += left_max - height[i]
                      i += 1
                  else:
                      right_max = max(right_max, height[j])
                      water += right_max - height[j]
                      j -= 1
              return water
    `,
    checks: "",
  },
  "remove-duplicates-from-sorted-array": {
    code: py`
      class Solution:
          def removeDuplicates(self, nums: List[int]) -> int:
              k = 0
              for n in nums:
                  if k == 0 or n != nums[k - 1]:
                      nums[k] = n
                      k += 1
              return k
    `,
    checks: "",
  },
  "sort-colors": {
    code: py`
      class Solution:
          def sortColors(self, nums: List[int]) -> None:
              lo, mid, hi = 0, 0, len(nums) - 1
              while mid <= hi:
                  if nums[mid] == 0:
                      nums[lo], nums[mid] = nums[mid], nums[lo]
                      lo += 1
                      mid += 1
                  elif nums[mid] == 2:
                      nums[mid], nums[hi] = nums[hi], nums[mid]
                      hi -= 1
                  else:
                      mid += 1
    `,
    checks: "",
  },
  "merge-sorted-array": {
    code: py`
      class Solution:
          def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
              i, j = m - 1, n - 1
              for k in range(m + n - 1, -1, -1):
                  if j < 0:
                      break
                  if i >= 0 and nums1[i] > nums2[j]:
                      nums1[k] = nums1[i]
                      i -= 1
                  else:
                      nums1[k] = nums2[j]
                      j -= 1
    `,
    checks: "",
  },
  "squares-of-a-sorted-array": {
    code: py`
      class Solution:
          def sortedSquares(self, nums: List[int]) -> List[int]:
              n = len(nums)
              result = [0] * n
              i, j = 0, n - 1
              for k in range(n - 1, -1, -1):
                  if abs(nums[i]) > abs(nums[j]):
                      result[k] = nums[i] * nums[i]
                      i += 1
                  else:
                      result[k] = nums[j] * nums[j]
                      j -= 1
              return result
    `,
    checks: "",
  },
  "is-subsequence": {
    code: py`
      class Solution:
          def isSubsequence(self, s: str, t: str) -> bool:
              i = 0
              for c in t:
                  if i < len(s) and s[i] == c:
                      i += 1
              return i == len(s)
    `,
    checks: "",
  },
  "three-sum-closest": {
    code: py`
      class Solution:
          def threeSumClosest(self, nums: List[int], target: int) -> int:
              nums.sort()
              best = nums[0] + nums[1] + nums[2]
              for i in range(len(nums) - 2):
                  lo, hi = i + 1, len(nums) - 1
                  while lo < hi:
                      total = nums[i] + nums[lo] + nums[hi]
                      if abs(total - target) < abs(best - target):
                          best = total
                      if total < target:
                          lo += 1
                      elif total > target:
                          hi -= 1
                      else:
                          return total
              return best
    `,
    checks: "",
  },
  "backspace-string-compare": {
    code: py`
      class Solution:
          def backspaceCompare(self, s: str, t: str) -> bool:
              def next_char(text: str, i: int) -> int:
                  skip = 0
                  while i >= 0:
                      if text[i] == "#":
                          skip += 1
                      elif skip > 0:
                          skip -= 1
                      else:
                          break
                      i -= 1
                  return i

              i, j = len(s) - 1, len(t) - 1
              while i >= 0 or j >= 0:
                  i, j = next_char(s, i), next_char(t, j)
                  if i < 0 or j < 0:
                      return i < 0 and j < 0
                  if s[i] != t[j]:
                      return False
                  i, j = i - 1, j - 1
              return True
    `,
    checks: "",
  },
};
