import { java, type Solution } from "../types";

export const bitsMathJava: Record<string, Solution> = {
  "single-number": {
    code: java`
      class Solution {
          public int singleNumber(int[] nums) {
              int result = 0;
              for (int n : nums) result ^= n;
              return result;
          }
      }
    `,
    checks: "",
  },
  "number-of-1-bits": {
    code: java`
      class Solution {
          public int hammingWeight(int n) {
              int count = 0;
              while (n != 0) {
                  n &= n - 1;
                  count++;
              }
              return count;
          }
      }
    `,
    checks: "",
  },
  "counting-bits": {
    code: java`
      class Solution {
          public int[] countBits(int n) {
              int[] bits = new int[n + 1];
              for (int i = 1; i <= n; i++) bits[i] = bits[i >> 1] + (i & 1);
              return bits;
          }
      }
    `,
    checks: "",
  },
  "reverse-bits": {
    code: java`
      class Solution {
          public long reverseBits(long n) {
              long result = 0;
              for (int i = 0; i < 32; i++) {
                  result = (result << 1) | (n & 1);
                  n >>= 1;
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "missing-number": {
    code: java`
      class Solution {
          public int missingNumber(int[] nums) {
              int result = nums.length;
              for (int i = 0; i < nums.length; i++) result ^= i ^ nums[i];
              return result;
          }
      }
    `,
    checks: "",
  },
  "sum-of-two-integers": {
    code: java`
      class Solution {
          public int getSum(int a, int b) {
              while (b != 0) {
                  int carry = (a & b) << 1;
                  a ^= b;
                  b = carry;
              }
              return a;
          }
      }
    `,
    checks: "",
  },
  "reverse-integer": {
    code: java`
      class Solution {
          public int reverse(int x) {
              long result = 0;
              while (x != 0) {
                  result = result * 10 + x % 10;
                  x /= 10;
              }
              if (result < Integer.MIN_VALUE || result > Integer.MAX_VALUE) {
                  return 0;
              }
              return (int) result;
          }
      }
    `,
    checks: "",
  },
  "happy-number": {
    code: java`
      class Solution {
          public boolean isHappy(int n) {
              Set<Integer> seen = new HashSet<>();
              while (n != 1 && seen.add(n)) {
                  int next = 0;
                  for (; n > 0; n /= 10) next += (n % 10) * (n % 10);
                  n = next;
              }
              return n == 1;
          }
      }
    `,
    checks: "",
  },
  "plus-one": {
    code: java`
      class Solution {
          public int[] plusOne(int[] digits) {
              for (int i = digits.length - 1; i >= 0; i--) {
                  if (digits[i] < 9) {
                      digits[i]++;
                      return digits;
                  }
                  digits[i] = 0;
              }
              int[] result = new int[digits.length + 1];
              result[0] = 1;
              return result;
          }
      }
    `,
    checks: "",
  },
  "count-primes": {
    code: java`
      class Solution {
          public int countPrimes(int n) {
              if (n < 3) return 0;
              boolean[] composite = new boolean[n];
              int count = 0;
              for (int i = 2; i < n; i++) {
                  if (composite[i]) continue;
                  count++;
                  for (long j = (long) i * i; j < n; j += i) {
                      composite[(int) j] = true;
                  }
              }
              return count;
          }
      }
    `,
    checks: "",
  },
};
