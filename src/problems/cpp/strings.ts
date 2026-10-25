import { cpp, type Solution } from "../types";

export const stringsCpp: Record<string, Solution> = {
  "longest-common-prefix": {
    code: cpp`
      class Solution {
      public:
          string longestCommonPrefix(vector<string>& strs) {
              string prefix = strs[0];
              for (const string& s : strs) {
                  while (s.compare(0, prefix.size(), prefix) != 0) prefix.pop_back();
              }
              return prefix;
          }
      };
    `,
    checks: "",
  },
  "reverse-words-in-a-string": {
    code: cpp`
      class Solution {
      public:
          string reverseWords(string s) {
              stringstream in(s);
              vector<string> words;
              string word;
              while (in >> word) words.push_back(word);
              string result;
              for (int i = words.size() - 1; i >= 0; i--) {
                  result += words[i];
                  if (i > 0) result += " ";
              }
              return result;
          }
      };
    `,
    checks: "",
  },
  "string-to-integer-atoi": {
    code: cpp`
      class Solution {
      public:
          int myAtoi(string s) {
              int i = 0, n = s.size(), sign = 1;
              while (i < n && s[i] == ' ') i++;
              if (i < n && (s[i] == '+' || s[i] == '-')) {
                  sign = s[i++] == '-' ? -1 : 1;
              }
              long long result = 0;
              while (i < n && isdigit(s[i])) {
                  result = result * 10 + (s[i++] - '0');
                  if (result * sign > INT_MAX) return INT_MAX;
                  if (result * sign < INT_MIN) return INT_MIN;
              }
              return result * sign;
          }
      };
    `,
    checks: "",
  },
  "roman-to-integer": {
    code: cpp`
      class Solution {
      public:
          int romanToInt(string s) {
              unordered_map<char, int> value = {{'I', 1},   {'V', 5},   {'X', 10},
                                                {'L', 50},  {'C', 100}, {'D', 500},
                                                {'M', 1000}};
              int total = 0;
              for (int i = 0; i < s.size(); i++) {
                  int v = value[s[i]];
                  if (i + 1 < s.size() && v < value[s[i + 1]]) total -= v;
                  else total += v;
              }
              return total;
          }
      };
    `,
    checks: "",
  },
  "integer-to-roman": {
    code: cpp`
      class Solution {
      public:
          string intToRoman(int num) {
              int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
              string symbols[] = {"M",  "CM", "D",  "CD", "C",  "XC", "L",
                                  "XL", "X",  "IX", "V",  "IV", "I"};
              string result;
              for (int i = 0; i < 13; i++) {
                  while (num >= values[i]) {
                      result += symbols[i];
                      num -= values[i];
                  }
              }
              return result;
          }
      };
    `,
    checks: "",
  },
  "find-the-index-of-first-occurrence": {
    code: cpp`
      class Solution {
      public:
          int strStr(string haystack, string needle) {
              int m = needle.size();
              if (m == 0) return 0;
              vector<int> lps(m);
              for (int i = 1, len = 0; i < m;) {
                  if (needle[i] == needle[len]) lps[i++] = ++len;
                  else if (len > 0) len = lps[len - 1];
                  else lps[i++] = 0;
              }
              for (int i = 0, j = 0; i < haystack.size();) {
                  if (haystack[i] == needle[j]) {
                      i++;
                      j++;
                      if (j == m) return i - j;
                  } else if (j > 0) {
                      j = lps[j - 1];
                  } else {
                      i++;
                  }
              }
              return -1;
          }
      };
    `,
    checks: "",
  },
  "longest-palindrome": {
    code: cpp`
      class Solution {
      public:
          int longestPalindrome(string s) {
              unordered_map<char, int> count;
              for (char c : s) count[c]++;
              int length = 0;
              bool hasOdd = false;
              for (auto& [c, n] : count) {
                  length += n - n % 2;
                  if (n % 2) hasOdd = true;
              }
              return length + (hasOdd ? 1 : 0);
          }
      };
    `,
    checks: "",
  },
  "count-and-say": {
    code: cpp`
      class Solution {
      public:
          string countAndSay(int n) {
              string s = "1";
              for (int k = 1; k < n; k++) {
                  string next;
                  for (int i = 0; i < s.size();) {
                      int j = i;
                      while (j < s.size() && s[j] == s[i]) j++;
                      next += to_string(j - i) + s[i];
                      i = j;
                  }
                  s = next;
              }
              return s;
          }
      };
    `,
    checks: "",
  },
  "zigzag-conversion": {
    code: cpp`
      class Solution {
      public:
          string convert(string s, int numRows) {
              if (numRows == 1) return s;
              vector<string> rows(numRows);
              int row = 0, step = 1;
              for (char c : s) {
                  rows[row] += c;
                  if (row == 0) step = 1;
                  else if (row == numRows - 1) step = -1;
                  row += step;
              }
              string result;
              for (const string& r : rows) result += r;
              return result;
          }
      };
    `,
    checks: "",
  },
  "valid-palindrome-ii": {
    code: cpp`
      class Solution {
      public:
          bool validPalindrome(string s) {
              int i = 0, j = s.size() - 1;
              while (i < j) {
                  if (s[i] != s[j]) return isPal(s, i + 1, j) || isPal(s, i, j - 1);
                  i++;
                  j--;
              }
              return true;
          }

      private:
          bool isPal(const string& s, int i, int j) {
              while (i < j) {
                  if (s[i++] != s[j--]) return false;
              }
              return true;
          }
      };
    `,
    checks: "",
  },
};
