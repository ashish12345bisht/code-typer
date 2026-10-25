import { java, type Solution } from "../types";

export const arraysJava: Record<string, Solution> = {
  "two-sum": {
    code: java`
      class Solution {
          public int[] twoSum(int[] nums, int target) {
              Map<Integer, Integer> seen = new HashMap<>();
              for (int i = 0; i < nums.length; i++) {
                  Integer j = seen.get(target - nums[i]);
                  if (j != null) return new int[] {j, i};
                  seen.put(nums[i], i);
              }
              return new int[0];
          }
      }
    `,
    checks: "",
  },
  "contains-duplicate": {
    code: java`
      class Solution {
          public boolean containsDuplicate(int[] nums) {
              Set<Integer> seen = new HashSet<>();
              for (int n : nums) {
                  if (!seen.add(n)) return true;
              }
              return false;
          }
      }
    `,
    checks: "",
  },
  "valid-anagram": {
    code: java`
      class Solution {
          public boolean isAnagram(String s, String t) {
              if (s.length() != t.length()) return false;
              int[] count = new int[26];
              for (int i = 0; i < s.length(); i++) {
                  count[s.charAt(i) - 'a']++;
                  count[t.charAt(i) - 'a']--;
              }
              for (int c : count) {
                  if (c != 0) return false;
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "group-anagrams": {
    code: java`
      class Solution {
          public List<List<String>> groupAnagrams(String[] strs) {
              Map<String, List<String>> groups = new HashMap<>();
              for (String s : strs) {
                  char[] chars = s.toCharArray();
                  Arrays.sort(chars);
                  String key = new String(chars);
                  groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
              }
              return new ArrayList<>(groups.values());
          }
      }
    `,
    checks: "",
  },
  "top-k-frequent-elements": {
    code: java`
      class Solution {
          public int[] topKFrequent(int[] nums, int k) {
              Map<Integer, Integer> count = new HashMap<>();
              for (int n : nums) count.merge(n, 1, Integer::sum);
              List<List<Integer>> buckets = new ArrayList<>();
              for (int i = 0; i <= nums.length; i++) {
                  buckets.add(new ArrayList<>());
              }
              for (var e : count.entrySet()) {
                  buckets.get(e.getValue()).add(e.getKey());
              }
              int[] result = new int[k];
              int i = 0;
              for (int c = nums.length; c > 0 && i < k; c--) {
                  for (int n : buckets.get(c)) {
                      if (i < k) result[i++] = n;
                  }
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "product-of-array-except-self": {
    code: java`
      class Solution {
          public int[] productExceptSelf(int[] nums) {
              int n = nums.length;
              int[] result = new int[n];
              int prefix = 1;
              for (int i = 0; i < n; i++) {
                  result[i] = prefix;
                  prefix *= nums[i];
              }
              int suffix = 1;
              for (int i = n - 1; i >= 0; i--) {
                  result[i] *= suffix;
                  suffix *= nums[i];
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "longest-consecutive-sequence": {
    code: java`
      class Solution {
          public int longestConsecutive(int[] nums) {
              Set<Integer> values = new HashSet<>();
              for (int n : nums) values.add(n);
              int best = 0;
              for (int n : values) {
                  if (values.contains(n - 1)) continue;
                  int length = 1;
                  while (values.contains(n + length)) length++;
                  best = Math.max(best, length);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "majority-element": {
    code: java`
      class Solution {
          public int majorityElement(int[] nums) {
              int candidate = 0, count = 0;
              for (int n : nums) {
                  if (count == 0) candidate = n;
                  count += n == candidate ? 1 : -1;
              }
              return candidate;
          }
      }
    `,
    checks: "",
  },
  "valid-sudoku": {
    code: java`
      class Solution {
          public boolean isValidSudoku(char[][] board) {
              Set<String> seen = new HashSet<>();
              for (int r = 0; r < 9; r++) {
                  for (int c = 0; c < 9; c++) {
                      char v = board[r][c];
                      if (v == '.') continue;
                      int box = r / 3 * 3 + c / 3;
                      if (!seen.add(v + " row " + r)
                              || !seen.add(v + " col " + c)
                              || !seen.add(v + " box " + box)) {
                          return false;
                      }
                  }
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "subarray-sum-equals-k": {
    code: java`
      class Solution {
          public int subarraySum(int[] nums, int k) {
              Map<Integer, Integer> counts = new HashMap<>();
              counts.put(0, 1);
              int total = 0, prefix = 0;
              for (int n : nums) {
                  prefix += n;
                  total += counts.getOrDefault(prefix - k, 0);
                  counts.merge(prefix, 1, Integer::sum);
              }
              return total;
          }
      }
    `,
    checks: "",
  },
  "move-zeroes": {
    code: java`
      class Solution {
          public void moveZeroes(int[] nums) {
              int insert = 0;
              for (int i = 0; i < nums.length; i++) {
                  if (nums[i] != 0) {
                      int tmp = nums[insert];
                      nums[insert++] = nums[i];
                      nums[i] = tmp;
                  }
              }
          }
      }
    `,
    checks: "",
  },
  "best-time-to-buy-and-sell-stock": {
    code: java`
      class Solution {
          public int maxProfit(int[] prices) {
              int minPrice = Integer.MAX_VALUE, best = 0;
              for (int price : prices) {
                  minPrice = Math.min(minPrice, price);
                  best = Math.max(best, price - minPrice);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "find-all-numbers-disappeared": {
    code: java`
      class Solution {
          public List<Integer> findDisappearedNumbers(int[] nums) {
              for (int n : nums) {
                  int i = Math.abs(n) - 1;
                  nums[i] = -Math.abs(nums[i]);
              }
              List<Integer> result = new ArrayList<>();
              for (int i = 0; i < nums.length; i++) {
                  if (nums[i] > 0) result.add(i + 1);
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "rotate-image": {
    code: java`
      class Solution {
          public void rotate(int[][] matrix) {
              int n = matrix.length;
              for (int i = 0; i < n; i++) {
                  for (int j = i + 1; j < n; j++) {
                      int tmp = matrix[i][j];
                      matrix[i][j] = matrix[j][i];
                      matrix[j][i] = tmp;
                  }
              }
              for (int[] row : matrix) {
                  for (int i = 0, j = n - 1; i < j; i++, j--) {
                      int tmp = row[i];
                      row[i] = row[j];
                      row[j] = tmp;
                  }
              }
          }
      }
    `,
    checks: "",
  },
  "spiral-matrix": {
    code: java`
      class Solution {
          public List<Integer> spiralOrder(int[][] matrix) {
              List<Integer> result = new ArrayList<>();
              int top = 0, bottom = matrix.length - 1;
              int left = 0, right = matrix[0].length - 1;
              while (top <= bottom && left <= right) {
                  for (int c = left; c <= right; c++) {
                      result.add(matrix[top][c]);
                  }
                  top++;
                  for (int r = top; r <= bottom; r++) {
                      result.add(matrix[r][right]);
                  }
                  right--;
                  if (top <= bottom) {
                      for (int c = right; c >= left; c--) {
                          result.add(matrix[bottom][c]);
                      }
                      bottom--;
                  }
                  if (left <= right) {
                      for (int r = bottom; r >= top; r--) {
                          result.add(matrix[r][left]);
                      }
                      left++;
                  }
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "set-matrix-zeroes": {
    code: java`
      class Solution {
          public void setZeroes(int[][] matrix) {
              int rows = matrix.length, cols = matrix[0].length;
              boolean[] zeroRow = new boolean[rows];
              boolean[] zeroCol = new boolean[cols];
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (matrix[r][c] == 0) {
                          zeroRow[r] = true;
                          zeroCol[c] = true;
                      }
                  }
              }
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (zeroRow[r] || zeroCol[c]) matrix[r][c] = 0;
                  }
              }
          }
      }
    `,
    checks: "",
  },
  "first-missing-positive": {
    code: java`
      class Solution {
          public int firstMissingPositive(int[] nums) {
              int n = nums.length;
              for (int i = 0; i < n; i++) {
                  while (nums[i] > 0 && nums[i] <= n
                          && nums[nums[i] - 1] != nums[i]) {
                      int j = nums[i] - 1;
                      int tmp = nums[i];
                      nums[i] = nums[j];
                      nums[j] = tmp;
                  }
              }
              for (int i = 0; i < n; i++) {
                  if (nums[i] != i + 1) return i + 1;
              }
              return n + 1;
          }
      }
    `,
    checks: "",
  },
  "pascals-triangle": {
    code: java`
      class Solution {
          public List<List<Integer>> generate(int numRows) {
              List<List<Integer>> rows = new ArrayList<>();
              for (int i = 0; i < numRows; i++) {
                  List<Integer> row = new ArrayList<>();
                  for (int j = 0; j <= i; j++) {
                      if (j == 0 || j == i) {
                          row.add(1);
                      } else {
                          List<Integer> prev = rows.get(i - 1);
                          row.add(prev.get(j - 1) + prev.get(j));
                      }
                  }
                  rows.add(row);
              }
              return rows;
          }
      }
    `,
    checks: "",
  },
};
