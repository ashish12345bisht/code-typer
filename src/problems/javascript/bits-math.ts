import { js, type Solution } from "../types";

export const bitsMathJavascript: Record<string, Solution> = {
  "single-number": {
    code: js`
      function singleNumber(nums) {
        return nums.reduce((a, b) => a ^ b, 0);
      }
    `,
    checks: "",
  },
  "number-of-1-bits": {
    code: js`
      function hammingWeight(n) {
        let count = 0;
        while (n !== 0) {
          n &= n - 1;
          count++;
        }
        return count;
      }
    `,
    checks: "",
  },
  "counting-bits": {
    code: js`
      function countBits(n) {
        const bits = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) bits[i] = bits[i >> 1] + (i & 1);
        return bits;
      }
    `,
    checks: "",
  },
  "reverse-bits": {
    code: js`
      function reverseBits(n) {
        let result = 0;
        for (let i = 0; i < 32; i++) {
          result = (result << 1) | (n & 1);
          n >>>= 1;
        }
        return result >>> 0;
      }
    `,
    checks: "",
  },
  "missing-number": {
    code: js`
      function missingNumber(nums) {
        const n = nums.length;
        const expected = (n * (n + 1)) / 2;
        return expected - nums.reduce((a, b) => a + b, 0);
      }
    `,
    checks: "",
  },
  "sum-of-two-integers": {
    code: js`
      function getSum(a, b) {
        while (b !== 0) {
          const carry = (a & b) << 1;
          a = a ^ b;
          b = carry;
        }
        return a;
      }
    `,
    checks: "",
  },
  "reverse-integer": {
    code: js`
      function reverse(x) {
        let n = Math.abs(x);
        let result = 0;
        while (n > 0) {
          result = result * 10 + (n % 10);
          n = Math.floor(n / 10);
        }
        if (result > 2 ** 31 - 1) return 0;
        return x < 0 ? -result : result;
      }
    `,
    checks: "",
  },
  "happy-number": {
    code: js`
      function isHappy(n) {
        const seen = new Set();
        while (n !== 1 && !seen.has(n)) {
          seen.add(n);
          let next = 0;
          for (const d of String(n)) next += Number(d) ** 2;
          n = next;
        }
        return n === 1;
      }
    `,
    checks: "",
  },
  "plus-one": {
    code: js`
      function plusOne(digits) {
        for (let i = digits.length - 1; i >= 0; i--) {
          if (digits[i] < 9) {
            digits[i]++;
            return digits;
          }
          digits[i] = 0;
        }
        return [1, ...digits];
      }
    `,
    checks: "",
  },
  "count-primes": {
    code: js`
      function countPrimes(n) {
        if (n < 3) return 0;
        const composite = new Array(n).fill(false);
        let count = 0;
        for (let i = 2; i < n; i++) {
          if (composite[i]) continue;
          count++;
          for (let j = i * i; j < n; j += i) composite[j] = true;
        }
        return count;
      }
    `,
    checks: "",
  },
};
