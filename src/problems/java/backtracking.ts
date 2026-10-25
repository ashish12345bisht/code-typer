import { java, type Solution } from "../types";

export const backtrackingJava: Record<string, Solution> = {
  subsets: {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();
          private final List<Integer> path = new ArrayList<>();

          public List<List<Integer>> subsets(int[] nums) {
              backtrack(nums, 0);
              return result;
          }

          private void backtrack(int[] nums, int start) {
              result.add(new ArrayList<>(path));
              for (int i = start; i < nums.length; i++) {
                  path.add(nums[i]);
                  backtrack(nums, i + 1);
                  path.remove(path.size() - 1);
              }
          }
      }
    `,
    checks: "",
  },
  "subsets-ii": {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();
          private final List<Integer> path = new ArrayList<>();

          public List<List<Integer>> subsetsWithDup(int[] nums) {
              Arrays.sort(nums);
              backtrack(nums, 0);
              return result;
          }

          private void backtrack(int[] nums, int start) {
              result.add(new ArrayList<>(path));
              for (int i = start; i < nums.length; i++) {
                  if (i > start && nums[i] == nums[i - 1]) continue;
                  path.add(nums[i]);
                  backtrack(nums, i + 1);
                  path.remove(path.size() - 1);
              }
          }
      }
    `,
    checks: "",
  },
  permutations: {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();

          public List<List<Integer>> permute(int[] nums) {
              backtrack(nums, 0);
              return result;
          }

          private void backtrack(int[] nums, int i) {
              if (i == nums.length) {
                  List<Integer> perm = new ArrayList<>();
                  for (int n : nums) perm.add(n);
                  result.add(perm);
                  return;
              }
              for (int j = i; j < nums.length; j++) {
                  swap(nums, i, j);
                  backtrack(nums, i + 1);
                  swap(nums, i, j);
              }
          }

          private void swap(int[] nums, int i, int j) {
              int tmp = nums[i];
              nums[i] = nums[j];
              nums[j] = tmp;
          }
      }
    `,
    checks: "",
  },
  "permutations-ii": {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();
          private final List<Integer> path = new ArrayList<>();

          public List<List<Integer>> permuteUnique(int[] nums) {
              Arrays.sort(nums);
              backtrack(nums, new boolean[nums.length]);
              return result;
          }

          private void backtrack(int[] nums, boolean[] used) {
              if (path.size() == nums.length) {
                  result.add(new ArrayList<>(path));
                  return;
              }
              for (int i = 0; i < nums.length; i++) {
                  if (used[i]) continue;
                  if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                      continue;
                  }
                  used[i] = true;
                  path.add(nums[i]);
                  backtrack(nums, used);
                  path.remove(path.size() - 1);
                  used[i] = false;
              }
          }
      }
    `,
    checks: "",
  },
  "combination-sum": {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();
          private final List<Integer> path = new ArrayList<>();

          public List<List<Integer>> combinationSum(int[] candidates,
                                                    int target) {
              backtrack(candidates, 0, target);
              return result;
          }

          private void backtrack(int[] candidates, int start, int remaining) {
              if (remaining == 0) {
                  result.add(new ArrayList<>(path));
                  return;
              }
              for (int i = start; i < candidates.length; i++) {
                  if (candidates[i] > remaining) continue;
                  path.add(candidates[i]);
                  backtrack(candidates, i, remaining - candidates[i]);
                  path.remove(path.size() - 1);
              }
          }
      }
    `,
    checks: "",
  },
  "combination-sum-ii": {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();
          private final List<Integer> path = new ArrayList<>();

          public List<List<Integer>> combinationSum2(int[] candidates,
                                                     int target) {
              Arrays.sort(candidates);
              backtrack(candidates, 0, target);
              return result;
          }

          private void backtrack(int[] candidates, int start, int remaining) {
              if (remaining == 0) {
                  result.add(new ArrayList<>(path));
                  return;
              }
              for (int i = start; i < candidates.length; i++) {
                  if (i > start && candidates[i] == candidates[i - 1]) {
                      continue;
                  }
                  if (candidates[i] > remaining) break;
                  path.add(candidates[i]);
                  backtrack(candidates, i + 1, remaining - candidates[i]);
                  path.remove(path.size() - 1);
              }
          }
      }
    `,
    checks: "",
  },
  combinations: {
    code: java`
      class Solution {
          private final List<List<Integer>> result = new ArrayList<>();
          private final List<Integer> path = new ArrayList<>();

          public List<List<Integer>> combine(int n, int k) {
              backtrack(n, k, 1);
              return result;
          }

          private void backtrack(int n, int k, int start) {
              if (path.size() == k) {
                  result.add(new ArrayList<>(path));
                  return;
              }
              for (int i = start; i <= n; i++) {
                  path.add(i);
                  backtrack(n, k, i + 1);
                  path.remove(path.size() - 1);
              }
          }
      }
    `,
    checks: "",
  },
  "generate-parentheses": {
    code: java`
      class Solution {
          private final List<String> result = new ArrayList<>();

          public List<String> generateParenthesis(int n) {
              backtrack(new StringBuilder(), 0, 0, n);
              return result;
          }

          private void backtrack(StringBuilder text, int open, int closed,
                                 int n) {
              if (text.length() == 2 * n) {
                  result.add(text.toString());
                  return;
              }
              if (open < n) {
                  text.append('(');
                  backtrack(text, open + 1, closed, n);
                  text.deleteCharAt(text.length() - 1);
              }
              if (closed < open) {
                  text.append(')');
                  backtrack(text, open, closed + 1, n);
                  text.deleteCharAt(text.length() - 1);
              }
          }
      }
    `,
    checks: "",
  },
  "letter-combinations-of-a-phone-number": {
    code: java`
      class Solution {
          private static final String[] KEYS = {
              "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz",
          };

          public List<String> letterCombinations(String digits) {
              List<String> result = new ArrayList<>();
              if (digits.isEmpty()) return result;
              result.add("");
              for (char d : digits.toCharArray()) {
                  List<String> next = new ArrayList<>();
                  for (String prefix : result) {
                      for (char c : KEYS[d - '0'].toCharArray()) {
                          next.add(prefix + c);
                      }
                  }
                  result = next;
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "word-search": {
    code: java`
      class Solution {
          public boolean exist(char[][] board, String word) {
              for (int r = 0; r < board.length; r++) {
                  for (int c = 0; c < board[0].length; c++) {
                      if (dfs(board, word, r, c, 0)) return true;
                  }
              }
              return false;
          }

          private boolean dfs(char[][] board, String word, int r, int c,
                              int i) {
              if (i == word.length()) return true;
              if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) {
                  return false;
              }
              if (board[r][c] != word.charAt(i)) return false;
              board[r][c] = '#';
              boolean found = dfs(board, word, r + 1, c, i + 1)
                      || dfs(board, word, r - 1, c, i + 1)
                      || dfs(board, word, r, c + 1, i + 1)
                      || dfs(board, word, r, c - 1, i + 1);
              board[r][c] = word.charAt(i);
              return found;
          }
      }
    `,
    checks: "",
  },
  "palindrome-partitioning": {
    code: java`
      class Solution {
          private final List<List<String>> result = new ArrayList<>();
          private final List<String> path = new ArrayList<>();

          public List<List<String>> partition(String s) {
              backtrack(s, 0);
              return result;
          }

          private void backtrack(String s, int start) {
              if (start == s.length()) {
                  result.add(new ArrayList<>(path));
                  return;
              }
              for (int end = start + 1; end <= s.length(); end++) {
                  if (isPalindrome(s, start, end - 1)) {
                      path.add(s.substring(start, end));
                      backtrack(s, end);
                      path.remove(path.size() - 1);
                  }
              }
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
  "n-queens": {
    code: java`
      class Solution {
          private final List<List<String>> result = new ArrayList<>();

          public List<List<String>> solveNQueens(int n) {
              place(new int[n], 0, new boolean[n], new boolean[2 * n],
                    new boolean[2 * n]);
              return result;
          }

          private void place(int[] queens, int r, boolean[] cols,
                             boolean[] diag, boolean[] anti) {
              int n = queens.length;
              if (r == n) {
                  List<String> board = new ArrayList<>();
                  for (int c : queens) {
                      char[] row = new char[n];
                      Arrays.fill(row, '.');
                      row[c] = 'Q';
                      board.add(new String(row));
                  }
                  result.add(board);
                  return;
              }
              for (int c = 0; c < n; c++) {
                  if (cols[c] || diag[r - c + n] || anti[r + c]) continue;
                  cols[c] = diag[r - c + n] = anti[r + c] = true;
                  queens[r] = c;
                  place(queens, r + 1, cols, diag, anti);
                  cols[c] = diag[r - c + n] = anti[r + c] = false;
              }
          }
      }
    `,
    checks: "",
  },
  "pow-x-n": {
    code: java`
      class Solution {
          public double myPow(double x, int n) {
              long power = n;
              if (power < 0) {
                  x = 1 / x;
                  power = -power;
              }
              double result = 1;
              while (power > 0) {
                  if ((power & 1) == 1) result *= x;
                  x *= x;
                  power >>= 1;
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "restore-ip-addresses": {
    code: java`
      class Solution {
          private final List<String> result = new ArrayList<>();
          private final List<String> parts = new ArrayList<>();

          public List<String> restoreIpAddresses(String s) {
              backtrack(s, 0);
              return result;
          }

          private void backtrack(String s, int start) {
              if (parts.size() == 4) {
                  if (start == s.length()) result.add(String.join(".", parts));
                  return;
              }
              for (int size = 1; size <= 3; size++) {
                  if (start + size > s.length()) break;
                  String piece = s.substring(start, start + size);
                  if (piece.charAt(0) == '0' && size > 1) break;
                  if (Integer.parseInt(piece) > 255) break;
                  parts.add(piece);
                  backtrack(s, start + size);
                  parts.remove(parts.size() - 1);
              }
          }
      }
    `,
    checks: "",
  },
};
