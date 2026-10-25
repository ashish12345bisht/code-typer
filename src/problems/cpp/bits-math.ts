import { cpp, type Solution } from "../types";

export const bitsMathCpp: Record<string, Solution> = {
  "single-number": {
    code: cpp`
      class Solution {
      public:
          int singleNumber(vector<int>& nums) {
              int result = 0;
              for (int n : nums) result ^= n;
              return result;
          }
      };
    `,
    checks: "",
  },
  "number-of-1-bits": {
    code: cpp`
      class Solution {
      public:
          int hammingWeight(uint32_t n) {
              int count = 0;
              while (n != 0) {
                  n &= n - 1;
                  count++;
              }
              return count;
          }
      };
    `,
    checks: "",
  },
  "counting-bits": {
    code: cpp`
      class Solution {
      public:
          vector<int> countBits(int n) {
              vector<int> bits(n + 1);
              for (int i = 1; i <= n; i++) bits[i] = bits[i >> 1] + (i & 1);
              return bits;
          }
      };
    `,
    checks: "",
  },
  "reverse-bits": {
    code: cpp`
      class Solution {
      public:
          uint32_t reverseBits(uint32_t n) {
              uint32_t result = 0;
              for (int i = 0; i < 32; i++) {
                  result = (result << 1) | (n & 1);
                  n >>= 1;
              }
              return result;
          }
      };
    `,
    checks: "",
  },
  "missing-number": {
    code: cpp`
      class Solution {
      public:
          int missingNumber(vector<int>& nums) {
              int n = nums.size();
              int expected = n * (n + 1) / 2;
              return expected - accumulate(nums.begin(), nums.end(), 0);
          }
      };
    `,
    checks: "",
  },
  "sum-of-two-integers": {
    code: cpp`
      class Solution {
      public:
          int getSum(int a, int b) {
              while (b != 0) {
                  unsigned carry = (unsigned)(a & b) << 1;
                  a ^= b;
                  b = (int)carry;
              }
              return a;
          }
      };
    `,
    checks: "",
  },
  "reverse-integer": {
    code: cpp`
      class Solution {
      public:
          int reverse(int x) {
              long long result = 0;
              while (x != 0) {
                  result = result * 10 + x % 10;
                  x /= 10;
              }
              if (result > INT_MAX || result < INT_MIN) return 0;
              return result;
          }
      };
    `,
    checks: "",
  },
  "happy-number": {
    code: cpp`
      class Solution {
      public:
          bool isHappy(int n) {
              unordered_set<int> seen;
              while (n != 1 && !seen.count(n)) {
                  seen.insert(n);
                  int next = 0;
                  for (; n > 0; n /= 10) next += (n % 10) * (n % 10);
                  n = next;
              }
              return n == 1;
          }
      };
    `,
    checks: "",
  },
  "plus-one": {
    code: cpp`
      class Solution {
      public:
          vector<int> plusOne(vector<int>& digits) {
              for (int i = digits.size() - 1; i >= 0; i--) {
                  if (digits[i] < 9) {
                      digits[i]++;
                      return digits;
                  }
                  digits[i] = 0;
              }
              digits.insert(digits.begin(), 1);
              return digits;
          }
      };
    `,
    checks: "",
  },
  "count-primes": {
    code: cpp`
      class Solution {
      public:
          int countPrimes(int n) {
              if (n < 3) return 0;
              vector<bool> composite(n);
              int count = 0;
              for (long long i = 2; i < n; i++) {
                  if (composite[i]) continue;
                  count++;
                  for (long long j = i * i; j < n; j += i) composite[j] = true;
              }
              return count;
          }
      };
    `,
    checks: "",
  },
};
