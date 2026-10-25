import { java, type Solution } from "../types";

export const stringsJava: Record<string, Solution> = {
  "longest-common-prefix": {
    code: java`
      class Solution {
          public String longestCommonPrefix(String[] strs) {
              String prefix = strs[0];
              for (String s : strs) {
                  while (!s.startsWith(prefix)) {
                      prefix = prefix.substring(0, prefix.length() - 1);
                  }
              }
              return prefix;
          }
      }
    `,
    checks: "",
  },
  "reverse-words-in-a-string": {
    code: java`
      class Solution {
          public String reverseWords(String s) {
              List<String> words = Arrays.asList(s.trim().split(" +"));
              Collections.reverse(words);
              return String.join(" ", words);
          }
      }
    `,
    checks: "",
  },
  "string-to-integer-atoi": {
    code: java`
      class Solution {
          public int myAtoi(String s) {
              int i = 0, n = s.length(), sign = 1;
              while (i < n && s.charAt(i) == ' ') i++;
              if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                  if (s.charAt(i) == '-') sign = -1;
                  i++;
              }
              long value = 0;
              while (i < n && Character.isDigit(s.charAt(i))) {
                  value = value * 10 + (s.charAt(i++) - '0');
                  if (sign * value > Integer.MAX_VALUE) {
                      return Integer.MAX_VALUE;
                  }
                  if (sign * value < Integer.MIN_VALUE) {
                      return Integer.MIN_VALUE;
                  }
              }
              return (int) (sign * value);
          }
      }
    `,
    checks: "",
  },
  "roman-to-integer": {
    code: java`
      class Solution {
          public int romanToInt(String s) {
              Map<Character, Integer> values = Map.of(
                      'I', 1, 'V', 5, 'X', 10, 'L', 50,
                      'C', 100, 'D', 500, 'M', 1000);
              int total = 0;
              for (int i = 0; i < s.length(); i++) {
                  int v = values.get(s.charAt(i));
                  if (i + 1 < s.length() && v < values.get(s.charAt(i + 1))) {
                      total -= v;
                  } else {
                      total += v;
                  }
              }
              return total;
          }
      }
    `,
    checks: "",
  },
  "integer-to-roman": {
    code: java`
      class Solution {
          private static final int[] VALUES =
                  {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
          private static final String[] SYMBOLS =
                  {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V",
                   "IV", "I"};

          public String intToRoman(int num) {
              StringBuilder out = new StringBuilder();
              for (int i = 0; i < VALUES.length; i++) {
                  while (num >= VALUES[i]) {
                      out.append(SYMBOLS[i]);
                      num -= VALUES[i];
                  }
              }
              return out.toString();
          }
      }
    `,
    checks: "",
  },
  "find-the-index-of-first-occurrence": {
    code: java`
      class Solution {
          public int strStr(String haystack, String needle) {
              int n = haystack.length(), m = needle.length();
              for (int i = 0; i + m <= n; i++) {
                  if (haystack.startsWith(needle, i)) return i;
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "longest-palindrome": {
    code: java`
      class Solution {
          public int longestPalindrome(String s) {
              int[] count = new int[128];
              for (char c : s.toCharArray()) count[c]++;
              int length = 0;
              boolean odd = false;
              for (int c : count) {
                  length += c / 2 * 2;
                  if (c % 2 == 1) odd = true;
              }
              return odd ? length + 1 : length;
          }
      }
    `,
    checks: "",
  },
  "count-and-say": {
    code: java`
      class Solution {
          public String countAndSay(int n) {
              String term = "1";
              for (int k = 1; k < n; k++) {
                  StringBuilder out = new StringBuilder();
                  int i = 0;
                  while (i < term.length()) {
                      int j = i;
                      while (j < term.length()
                              && term.charAt(j) == term.charAt(i)) {
                          j++;
                      }
                      out.append(j - i).append(term.charAt(i));
                      i = j;
                  }
                  term = out.toString();
              }
              return term;
          }
      }
    `,
    checks: "",
  },
  "zigzag-conversion": {
    code: java`
      class Solution {
          public String convert(String s, int numRows) {
              if (numRows == 1) return s;
              StringBuilder[] rows = new StringBuilder[numRows];
              for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
              int row = 0, step = 1;
              for (char c : s.toCharArray()) {
                  rows[row].append(c);
                  if (row == 0) step = 1;
                  else if (row == numRows - 1) step = -1;
                  row += step;
              }
              StringBuilder out = new StringBuilder();
              for (StringBuilder r : rows) out.append(r);
              return out.toString();
          }
      }
    `,
    checks: "",
  },
  "valid-palindrome-ii": {
    code: java`
      class Solution {
          public boolean validPalindrome(String s) {
              int i = 0, j = s.length() - 1;
              while (i < j) {
                  if (s.charAt(i) != s.charAt(j)) {
                      return isPalindrome(s, i + 1, j)
                              || isPalindrome(s, i, j - 1);
                  }
                  i++;
                  j--;
              }
              return true;
          }

          private boolean isPalindrome(String s, int i, int j) {
              while (i < j) {
                  if (s.charAt(i++) != s.charAt(j--)) return false;
              }
              return true;
          }
      }
    `,
    checks: "",
  },
};
