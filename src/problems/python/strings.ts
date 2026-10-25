import { py, type Solution } from "../types";

export const stringsPython: Record<string, Solution> = {
  "longest-common-prefix": {
    code: py`
      class Solution:
          def longestCommonPrefix(self, strs: List[str]) -> str:
              prefix = strs[0]
              for s in strs[1:]:
                  while not s.startswith(prefix):
                      prefix = prefix[:-1]
              return prefix
    `,
    checks: "",
  },
  "reverse-words-in-a-string": {
    code: py`
      class Solution:
          def reverseWords(self, s: str) -> str:
              return " ".join(reversed(s.split()))
    `,
    checks: "",
  },
  "string-to-integer-atoi": {
    code: py`
      class Solution:
          def myAtoi(self, s: str) -> int:
              s = s.lstrip()
              sign, i = 1, 0
              if i < len(s) and s[i] in "+-":
                  if s[i] == "-":
                      sign = -1
                  i += 1
              value = 0
              while i < len(s) and s[i].isdigit():
                  value = value * 10 + int(s[i])
                  i += 1
              return max(-2**31, min(sign * value, 2**31 - 1))
    `,
    checks: "",
  },
  "roman-to-integer": {
    code: py`
      class Solution:
          def romanToInt(self, s: str) -> int:
              values = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500,
                        "M": 1000}
              total = 0
              for i, c in enumerate(s):
                  if i + 1 < len(s) and values[c] < values[s[i + 1]]:
                      total -= values[c]
                  else:
                      total += values[c]
              return total
    `,
    checks: "",
  },
  "integer-to-roman": {
    code: py`
      class Solution:
          def intToRoman(self, num: int) -> str:
              symbols = [
                  (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
                  (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
                  (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
              ]
              out = []
              for value, symbol in symbols:
                  count, num = divmod(num, value)
                  out.append(symbol * count)
              return "".join(out)
    `,
    checks: "",
  },
  "find-the-index-of-first-occurrence": {
    code: py`
      class Solution:
          def strStr(self, haystack: str, needle: str) -> int:
              for i in range(len(haystack) - len(needle) + 1):
                  if haystack[i:i + len(needle)] == needle:
                      return i
              return -1
    `,
    checks: "",
  },
  "longest-palindrome": {
    code: py`
      class Solution:
          def longestPalindrome(self, s: str) -> int:
              length, odd = 0, False
              for count in Counter(s).values():
                  length += count // 2 * 2
                  if count % 2:
                      odd = True
              return length + 1 if odd else length
    `,
    checks: "",
  },
  "count-and-say": {
    code: py`
      class Solution:
          def countAndSay(self, n: int) -> str:
              term = "1"
              for _ in range(n - 1):
                  out, i = [], 0
                  while i < len(term):
                      j = i
                      while j < len(term) and term[j] == term[i]:
                          j += 1
                      out.append(str(j - i) + term[i])
                      i = j
                  term = "".join(out)
              return term
    `,
    checks: "",
  },
  "zigzag-conversion": {
    code: py`
      class Solution:
          def convert(self, s: str, numRows: int) -> str:
              if numRows == 1:
                  return s
              rows = [""] * numRows
              row, step = 0, 1
              for c in s:
                  rows[row] += c
                  if row == 0:
                      step = 1
                  elif row == numRows - 1:
                      step = -1
                  row += step
              return "".join(rows)
    `,
    checks: "",
  },
  "valid-palindrome-ii": {
    code: py`
      class Solution:
          def validPalindrome(self, s: str) -> bool:
              def is_pal(i: int, j: int) -> bool:
                  while i < j:
                      if s[i] != s[j]:
                          return False
                      i, j = i + 1, j - 1
                  return True

              i, j = 0, len(s) - 1
              while i < j:
                  if s[i] != s[j]:
                      return is_pal(i + 1, j) or is_pal(i, j - 1)
                  i, j = i + 1, j - 1
              return True
    `,
    checks: "",
  },
};
