import { py, type Solution } from "../types";

export const backtrackingPython: Record<string, Solution> = {
  subsets: {
    code: py`
      class Solution:
          def subsets(self, nums: List[int]) -> List[List[int]]:
              result, path = [], []

              def backtrack(start: int) -> None:
                  result.append(path[:])
                  for i in range(start, len(nums)):
                      path.append(nums[i])
                      backtrack(i + 1)
                      path.pop()

              backtrack(0)
              return result
    `,
    checks: "",
  },
  "subsets-ii": {
    code: py`
      class Solution:
          def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
              nums.sort()
              result, path = [], []

              def backtrack(start: int) -> None:
                  result.append(path[:])
                  for i in range(start, len(nums)):
                      if i > start and nums[i] == nums[i - 1]:
                          continue
                      path.append(nums[i])
                      backtrack(i + 1)
                      path.pop()

              backtrack(0)
              return result
    `,
    checks: "",
  },
  permutations: {
    code: py`
      class Solution:
          def permute(self, nums: List[int]) -> List[List[int]]:
              result = []

              def backtrack(i: int) -> None:
                  if i == len(nums):
                      result.append(nums[:])
                      return
                  for j in range(i, len(nums)):
                      nums[i], nums[j] = nums[j], nums[i]
                      backtrack(i + 1)
                      nums[i], nums[j] = nums[j], nums[i]

              backtrack(0)
              return result
    `,
    checks: "",
  },
  "permutations-ii": {
    code: py`
      class Solution:
          def permuteUnique(self, nums: List[int]) -> List[List[int]]:
              result, path = [], []
              counts = Counter(nums)

              def backtrack() -> None:
                  if len(path) == len(nums):
                      result.append(path[:])
                      return
                  for n in counts:
                      if counts[n] == 0:
                          continue
                      counts[n] -= 1
                      path.append(n)
                      backtrack()
                      path.pop()
                      counts[n] += 1

              backtrack()
              return result
    `,
    checks: "",
  },
  "combination-sum": {
    code: py`
      class Solution:
          def combinationSum(
              self, candidates: List[int], target: int
          ) -> List[List[int]]:
              result, path = [], []

              def backtrack(start: int, remaining: int) -> None:
                  if remaining == 0:
                      result.append(path[:])
                      return
                  for i in range(start, len(candidates)):
                      if candidates[i] <= remaining:
                          path.append(candidates[i])
                          backtrack(i, remaining - candidates[i])
                          path.pop()

              backtrack(0, target)
              return result
    `,
    checks: "",
  },
  "combination-sum-ii": {
    code: py`
      class Solution:
          def combinationSum2(
              self, candidates: List[int], target: int
          ) -> List[List[int]]:
              candidates.sort()
              result, path = [], []

              def backtrack(start: int, remaining: int) -> None:
                  if remaining == 0:
                      result.append(path[:])
                      return
                  for i in range(start, len(candidates)):
                      if i > start and candidates[i] == candidates[i - 1]:
                          continue
                      if candidates[i] > remaining:
                          break
                      path.append(candidates[i])
                      backtrack(i + 1, remaining - candidates[i])
                      path.pop()

              backtrack(0, target)
              return result
    `,
    checks: "",
  },
  combinations: {
    code: py`
      class Solution:
          def combine(self, n: int, k: int) -> List[List[int]]:
              result, path = [], []

              def backtrack(start: int) -> None:
                  if len(path) == k:
                      result.append(path[:])
                      return
                  for i in range(start, n + 1):
                      path.append(i)
                      backtrack(i + 1)
                      path.pop()

              backtrack(1)
              return result
    `,
    checks: "",
  },
  "generate-parentheses": {
    code: py`
      class Solution:
          def generateParenthesis(self, n: int) -> List[str]:
              result = []

              def backtrack(text: str, opened: int, closed: int) -> None:
                  if len(text) == 2 * n:
                      result.append(text)
                      return
                  if opened < n:
                      backtrack(text + "(", opened + 1, closed)
                  if closed < opened:
                      backtrack(text + ")", opened, closed + 1)

              backtrack("", 0, 0)
              return result
    `,
    checks: "",
  },
  "letter-combinations-of-a-phone-number": {
    code: py`
      class Solution:
          def letterCombinations(self, digits: str) -> List[str]:
              if not digits:
                  return []
              keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv",
                      "wxyz"]
              result = [""]
              for d in digits:
                  result = [p + c for p in result for c in keys[int(d)]]
              return result
    `,
    checks: "",
  },
  "word-search": {
    code: py`
      class Solution:
          def exist(self, board: List[List[str]], word: str) -> bool:
              rows, cols = len(board), len(board[0])

              def dfs(r: int, c: int, i: int) -> bool:
                  if i == len(word):
                      return True
                  if not (0 <= r < rows and 0 <= c < cols):
                      return False
                  if board[r][c] != word[i]:
                      return False
                  board[r][c] = "#"
                  found = (
                      dfs(r + 1, c, i + 1)
                      or dfs(r - 1, c, i + 1)
                      or dfs(r, c + 1, i + 1)
                      or dfs(r, c - 1, i + 1)
                  )
                  board[r][c] = word[i]
                  return found

              return any(
                  dfs(r, c, 0) for r in range(rows) for c in range(cols)
              )
    `,
    checks: "",
  },
  "palindrome-partitioning": {
    code: py`
      class Solution:
          def partition(self, s: str) -> List[List[str]]:
              result, path = [], []

              def backtrack(start: int) -> None:
                  if start == len(s):
                      result.append(path[:])
                      return
                  for end in range(start + 1, len(s) + 1):
                      piece = s[start:end]
                      if piece == piece[::-1]:
                          path.append(piece)
                          backtrack(end)
                          path.pop()

              backtrack(0)
              return result
    `,
    checks: "",
  },
  "n-queens": {
    code: py`
      class Solution:
          def solveNQueens(self, n: int) -> List[List[str]]:
              result = []
              cols, diag, anti = set(), set(), set()
              queens = []

              def place(r: int) -> None:
                  if r == n:
                      result.append(["." * c + "Q" + "." * (n - c - 1)
                                     for c in queens])
                      return
                  for c in range(n):
                      if c in cols or r - c in diag or r + c in anti:
                          continue
                      cols.add(c)
                      diag.add(r - c)
                      anti.add(r + c)
                      queens.append(c)
                      place(r + 1)
                      queens.pop()
                      cols.remove(c)
                      diag.remove(r - c)
                      anti.remove(r + c)

              place(0)
              return result
    `,
    checks: "",
  },
  "pow-x-n": {
    code: py`
      class Solution:
          def myPow(self, x: float, n: int) -> float:
              if n < 0:
                  x, n = 1 / x, -n
              result = 1.0
              while n:
                  if n & 1:
                      result *= x
                  x *= x
                  n >>= 1
              return result
    `,
    checks: "",
  },
  "restore-ip-addresses": {
    code: py`
      class Solution:
          def restoreIpAddresses(self, s: str) -> List[str]:
              result, parts = [], []

              def backtrack(start: int) -> None:
                  if len(parts) == 4:
                      if start == len(s):
                          result.append(".".join(parts))
                      return
                  for size in range(1, 4):
                      piece = s[start:start + size]
                      if len(piece) < size:
                          break
                      if (piece[0] == "0" and size > 1) or int(piece) > 255:
                          break
                      parts.append(piece)
                      backtrack(start + size)
                      parts.pop()

              backtrack(0)
              return result
    `,
    checks: "",
  },
};
