import { js, type Solution } from "../types";

export const stringsJavascript: Record<string, Solution> = {
  "longest-common-prefix": {
    code: js`
      function longestCommonPrefix(strs) {
        let prefix = strs[0];
        for (const s of strs) {
          while (!s.startsWith(prefix)) prefix = prefix.slice(0, -1);
        }
        return prefix;
      }
    `,
    checks: "",
  },
  "reverse-words-in-a-string": {
    code: js`
      function reverseWords(s) {
        return s.trim().split(/ +/).reverse().join(" ");
      }
    `,
    checks: "",
  },
  "string-to-integer-atoi": {
    code: js`
      function myAtoi(s) {
        let i = 0;
        while (s[i] === " ") i++;
        let sign = 1;
        if (s[i] === "+" || s[i] === "-") sign = s[i++] === "-" ? -1 : 1;
        let result = 0;
        while (i < s.length && s[i] >= "0" && s[i] <= "9") {
          result = result * 10 + Number(s[i++]);
          if (result > 2 ** 31) break;
        }
        return Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, sign * result));
      }
    `,
    checks: "",
  },
  "roman-to-integer": {
    code: js`
      function romanToInt(s) {
        const value = {
          I: 1,
          V: 5,
          X: 10,
          L: 50,
          C: 100,
          D: 500,
          M: 1000,
        };
        let total = 0;
        for (let i = 0; i < s.length; i++) {
          const v = value[s[i]];
          if (i + 1 < s.length && v < value[s[i + 1]]) total -= v;
          else total += v;
        }
        return total;
      }
    `,
    checks: "",
  },
  "integer-to-roman": {
    code: js`
      function intToRoman(num) {
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const symbols = [
          "M",
          "CM",
          "D",
          "CD",
          "C",
          "XC",
          "L",
          "XL",
          "X",
          "IX",
          "V",
          "IV",
          "I",
        ];
        let result = "";
        values.forEach((v, i) => {
          while (num >= v) {
            result += symbols[i];
            num -= v;
          }
        });
        return result;
      }
    `,
    checks: "",
  },
  "find-the-index-of-first-occurrence": {
    code: js`
      function strStr(haystack, needle) {
        if (needle === "") return 0;
        const lps = new Array(needle.length).fill(0);
        for (let i = 1, len = 0; i < needle.length;) {
          if (needle[i] === needle[len]) lps[i++] = ++len;
          else if (len > 0) len = lps[len - 1];
          else lps[i++] = 0;
        }
        for (let i = 0, j = 0; i < haystack.length;) {
          if (haystack[i] === needle[j]) {
            i++;
            j++;
            if (j === needle.length) return i - j;
          } else if (j > 0) {
            j = lps[j - 1];
          } else {
            i++;
          }
        }
        return -1;
      }
    `,
    checks: "",
  },
  "longest-palindrome": {
    code: js`
      function longestPalindrome(s) {
        const count = new Map();
        for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
        let length = 0;
        let hasOdd = false;
        for (const c of count.values()) {
          length += c - (c % 2);
          if (c % 2) hasOdd = true;
        }
        return length + (hasOdd ? 1 : 0);
      }
    `,
    checks: "",
  },
  "count-and-say": {
    code: js`
      function countAndSay(n) {
        let s = "1";
        for (let k = 1; k < n; k++) {
          let next = "";
          for (let i = 0; i < s.length;) {
            let j = i;
            while (j < s.length && s[j] === s[i]) j++;
            next += String(j - i) + s[i];
            i = j;
          }
          s = next;
        }
        return s;
      }
    `,
    checks: "",
  },
  "zigzag-conversion": {
    code: js`
      function convert(s, numRows) {
        if (numRows === 1) return s;
        const rows = new Array(numRows).fill("");
        let row = 0;
        let step = 1;
        for (const c of s) {
          rows[row] += c;
          if (row === 0) step = 1;
          else if (row === numRows - 1) step = -1;
          row += step;
        }
        return rows.join("");
      }
    `,
    checks: "",
  },
  "valid-palindrome-ii": {
    code: js`
      function validPalindrome(s) {
        const isPal = (i, j) => {
          while (i < j) if (s[i++] !== s[j--]) return false;
          return true;
        };
        let i = 0;
        let j = s.length - 1;
        while (i < j) {
          if (s[i] !== s[j]) return isPal(i + 1, j) || isPal(i, j - 1);
          i++;
          j--;
        }
        return true;
      }
    `,
    checks: "",
  },
};
