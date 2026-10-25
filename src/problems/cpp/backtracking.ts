import { cpp, type Solution } from "../types";

export const backtrackingCpp: Record<string, Solution> = {
  subsets: {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> subsets(vector<int>& nums) {
              dfs(nums, 0);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;

          void dfs(const vector<int>& nums, int start) {
              result.push_back(path);
              for (int i = start; i < nums.size(); i++) {
                  path.push_back(nums[i]);
                  dfs(nums, i + 1);
                  path.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
  "subsets-ii": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> subsetsWithDup(vector<int>& nums) {
              sort(nums.begin(), nums.end());
              dfs(nums, 0);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;

          void dfs(const vector<int>& nums, int start) {
              result.push_back(path);
              for (int i = start; i < nums.size(); i++) {
                  if (i > start && nums[i] == nums[i - 1]) continue;
                  path.push_back(nums[i]);
                  dfs(nums, i + 1);
                  path.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
  permutations: {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> permute(vector<int>& nums) {
              used.assign(nums.size(), false);
              dfs(nums);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;
          vector<bool> used;

          void dfs(const vector<int>& nums) {
              if (path.size() == nums.size()) {
                  result.push_back(path);
                  return;
              }
              for (int i = 0; i < nums.size(); i++) {
                  if (used[i]) continue;
                  used[i] = true;
                  path.push_back(nums[i]);
                  dfs(nums);
                  path.pop_back();
                  used[i] = false;
              }
          }
      };
    `,
    checks: "",
  },
  "permutations-ii": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> permuteUnique(vector<int>& nums) {
              sort(nums.begin(), nums.end());
              used.assign(nums.size(), false);
              dfs(nums);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;
          vector<bool> used;

          void dfs(const vector<int>& nums) {
              if (path.size() == nums.size()) {
                  result.push_back(path);
                  return;
              }
              for (int i = 0; i < nums.size(); i++) {
                  if (used[i]) continue;
                  if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
                  used[i] = true;
                  path.push_back(nums[i]);
                  dfs(nums);
                  path.pop_back();
                  used[i] = false;
              }
          }
      };
    `,
    checks: "",
  },
  "combination-sum": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
              dfs(candidates, 0, target);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;

          void dfs(const vector<int>& candidates, int start, int remaining) {
              if (remaining == 0) {
                  result.push_back(path);
                  return;
              }
              for (int i = start; i < candidates.size(); i++) {
                  if (candidates[i] > remaining) continue;
                  path.push_back(candidates[i]);
                  dfs(candidates, i, remaining - candidates[i]);
                  path.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
  "combination-sum-ii": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
              sort(candidates.begin(), candidates.end());
              dfs(candidates, 0, target);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;

          void dfs(const vector<int>& candidates, int start, int remaining) {
              if (remaining == 0) {
                  result.push_back(path);
                  return;
              }
              for (int i = start; i < candidates.size(); i++) {
                  if (i > start && candidates[i] == candidates[i - 1]) continue;
                  if (candidates[i] > remaining) break;
                  path.push_back(candidates[i]);
                  dfs(candidates, i + 1, remaining - candidates[i]);
                  path.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
  combinations: {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> combine(int n, int k) {
              dfs(1, n, k);
              return result;
          }

      private:
          vector<vector<int>> result;
          vector<int> path;

          void dfs(int start, int n, int k) {
              if (path.size() == k) {
                  result.push_back(path);
                  return;
              }
              for (int i = start; i <= n; i++) {
                  path.push_back(i);
                  dfs(i + 1, n, k);
                  path.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
  "generate-parentheses": {
    code: cpp`
      class Solution {
      public:
          vector<string> generateParenthesis(int n) {
              dfs("", 0, 0, n);
              return result;
          }

      private:
          vector<string> result;

          void dfs(const string& current, int open, int close, int n) {
              if (current.size() == 2 * n) {
                  result.push_back(current);
                  return;
              }
              if (open < n) dfs(current + "(", open + 1, close, n);
              if (close < open) dfs(current + ")", open, close + 1, n);
          }
      };
    `,
    checks: "",
  },
  "letter-combinations-of-a-phone-number": {
    code: cpp`
      class Solution {
      public:
          vector<string> letterCombinations(string digits) {
              if (digits.empty()) return {};
              dfs(digits, 0, "");
              return result;
          }

      private:
          vector<string> keys = {"",    "",    "abc",  "def", "ghi",
                                 "jkl", "mno", "pqrs", "tuv", "wxyz"};
          vector<string> result;

          void dfs(const string& digits, int i, const string& current) {
              if (i == digits.size()) {
                  result.push_back(current);
                  return;
              }
              for (char c : keys[digits[i] - '0']) dfs(digits, i + 1, current + c);
          }
      };
    `,
    checks: "",
  },
  "word-search": {
    code: cpp`
      class Solution {
      public:
          bool exist(vector<vector<char>>& board, string word) {
              for (int r = 0; r < board.size(); r++) {
                  for (int c = 0; c < board[0].size(); c++) {
                      if (dfs(board, word, r, c, 0)) return true;
                  }
              }
              return false;
          }

      private:
          bool dfs(vector<vector<char>>& board, const string& word, int r, int c,
                   int i) {
              if (i == word.size()) return true;
              if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size()) {
                  return false;
              }
              if (board[r][c] != word[i]) return false;
              board[r][c] = '#';
              bool found = dfs(board, word, r + 1, c, i + 1) ||
                           dfs(board, word, r - 1, c, i + 1) ||
                           dfs(board, word, r, c + 1, i + 1) ||
                           dfs(board, word, r, c - 1, i + 1);
              board[r][c] = word[i];
              return found;
          }
      };
    `,
    checks: "",
  },
  "palindrome-partitioning": {
    code: cpp`
      class Solution {
      public:
          vector<vector<string>> partition(string s) {
              dfs(s, 0);
              return result;
          }

      private:
          vector<vector<string>> result;
          vector<string> path;

          bool isPal(const string& s, int i, int j) {
              while (i < j) {
                  if (s[i++] != s[j--]) return false;
              }
              return true;
          }

          void dfs(const string& s, int start) {
              if (start == s.size()) {
                  result.push_back(path);
                  return;
              }
              for (int end = start; end < s.size(); end++) {
                  if (!isPal(s, start, end)) continue;
                  path.push_back(s.substr(start, end - start + 1));
                  dfs(s, end + 1);
                  path.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
  "n-queens": {
    code: cpp`
      class Solution {
      public:
          vector<vector<string>> solveNQueens(int n) {
              board.assign(n, string(n, '.'));
              cols.assign(n, false);
              diag.assign(2 * n, false);
              anti.assign(2 * n, false);
              place(0, n);
              return result;
          }

      private:
          vector<vector<string>> result;
          vector<string> board;
          vector<bool> cols, diag, anti;

          void place(int r, int n) {
              if (r == n) {
                  result.push_back(board);
                  return;
              }
              for (int c = 0; c < n; c++) {
                  if (cols[c] || diag[r - c + n] || anti[r + c]) continue;
                  cols[c] = diag[r - c + n] = anti[r + c] = true;
                  board[r][c] = 'Q';
                  place(r + 1, n);
                  board[r][c] = '.';
                  cols[c] = diag[r - c + n] = anti[r + c] = false;
              }
          }
      };
    `,
    checks: "",
  },
  "pow-x-n": {
    code: cpp`
      class Solution {
      public:
          double myPow(double x, int n) {
              long long exp = n;
              if (exp < 0) {
                  x = 1 / x;
                  exp = -exp;
              }
              double result = 1;
              while (exp > 0) {
                  if (exp % 2) result *= x;
                  x *= x;
                  exp /= 2;
              }
              return result;
          }
      };
    `,
    checks: "",
  },
  "restore-ip-addresses": {
    code: cpp`
      class Solution {
      public:
          vector<string> restoreIpAddresses(string s) {
              dfs(s, 0);
              return result;
          }

      private:
          vector<string> result;
          vector<string> parts;

          void dfs(const string& s, int start) {
              if (parts.size() == 4) {
                  if (start == s.size()) {
                      result.push_back(parts[0] + "." + parts[1] + "." + parts[2] +
                                       "." + parts[3]);
                  }
                  return;
              }
              for (int len = 1; len <= 3 && start + len <= s.size(); len++) {
                  string part = s.substr(start, len);
                  if ((len > 1 && part[0] == '0') || stoi(part) > 255) break;
                  parts.push_back(part);
                  dfs(s, start + len);
                  parts.pop_back();
              }
          }
      };
    `,
    checks: "",
  },
};
