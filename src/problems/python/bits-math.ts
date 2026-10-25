import { py, type Solution } from "../types";

export const bitsMathPython: Record<string, Solution> = {
  "single-number": {
    code: py`
      class Solution:
          def singleNumber(self, nums: List[int]) -> int:
              result = 0
              for n in nums:
                  result ^= n
              return result
    `,
    checks: "",
  },
  "number-of-1-bits": {
    code: py`
      class Solution:
          def hammingWeight(self, n: int) -> int:
              count = 0
              while n:
                  n &= n - 1
                  count += 1
              return count
    `,
    checks: "",
  },
  "counting-bits": {
    code: py`
      class Solution:
          def countBits(self, n: int) -> List[int]:
              bits = [0] * (n + 1)
              for i in range(1, n + 1):
                  bits[i] = bits[i >> 1] + (i & 1)
              return bits
    `,
    checks: "",
  },
  "reverse-bits": {
    code: py`
      class Solution:
          def reverseBits(self, n: int) -> int:
              result = 0
              for _ in range(32):
                  result = (result << 1) | (n & 1)
                  n >>= 1
              return result
    `,
    checks: "",
  },
  "missing-number": {
    code: py`
      class Solution:
          def missingNumber(self, nums: List[int]) -> int:
              result = len(nums)
              for i, n in enumerate(nums):
                  result ^= i ^ n
              return result
    `,
    checks: "",
  },
  "sum-of-two-integers": {
    code: py`
      class Solution:
          def getSum(self, a: int, b: int) -> int:
              mask = 0xFFFFFFFF
              while b & mask:
                  a, b = a ^ b, (a & b) << 1
              a &= mask
              return a if a <= 0x7FFFFFFF else ~(a ^ mask)
    `,
    checks: "",
  },
  "reverse-integer": {
    code: py`
      class Solution:
          def reverse(self, x: int) -> int:
              sign = -1 if x < 0 else 1
              result = sign * int(str(abs(x))[::-1])
              return result if -2**31 <= result < 2**31 else 0
    `,
    checks: "",
  },
  "happy-number": {
    code: py`
      class Solution:
          def isHappy(self, n: int) -> bool:
              seen = set()
              while n != 1 and n not in seen:
                  seen.add(n)
                  n = sum(int(d) ** 2 for d in str(n))
              return n == 1
    `,
    checks: "",
  },
  "plus-one": {
    code: py`
      class Solution:
          def plusOne(self, digits: List[int]) -> List[int]:
              for i in range(len(digits) - 1, -1, -1):
                  if digits[i] < 9:
                      digits[i] += 1
                      return digits
                  digits[i] = 0
              return [1] + digits
    `,
    checks: "",
  },
  "count-primes": {
    code: py`
      class Solution:
          def countPrimes(self, n: int) -> int:
              if n < 3:
                  return 0
              prime = [True] * n
              prime[0] = prime[1] = False
              for i in range(2, int(n ** 0.5) + 1):
                  if prime[i]:
                      for j in range(i * i, n, i):
                          prime[j] = False
              return sum(prime)
    `,
    checks: "",
  },
};
