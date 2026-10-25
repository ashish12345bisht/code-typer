import { cpp, type Solution } from "../types";

export const arraysCpp: Record<string, Solution> = {
  "two-sum": {
    code: cpp`
      class Solution {
      public:
          vector<int> twoSum(vector<int>& nums, int target) {
              unordered_map<int, int> seen;
              for (int i = 0; i < nums.size(); i++) {
                  auto it = seen.find(target - nums[i]);
                  if (it != seen.end()) return {it->second, i};
                  seen[nums[i]] = i;
              }
              return {};
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().twoSum(lv(VI{2, 7, 11, 15}), 9) == VI{0, 1});
      CHECK(Solution().twoSum(lv(VI{3, 2, 4}), 6) == VI{1, 2});
    `,
  },
  "contains-duplicate": {
    code: cpp`
      class Solution {
      public:
          bool containsDuplicate(vector<int>& nums) {
              unordered_set<int> seen;
              for (int n : nums) {
                  if (!seen.insert(n).second) return true;
              }
              return false;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().containsDuplicate(lv(VI{1, 2, 3, 1})) == true);
      CHECK(Solution().containsDuplicate(lv(VI{1, 2, 3, 4})) == false);
    `,
  },
  "valid-anagram": {
    code: cpp`
      class Solution {
      public:
          bool isAnagram(string s, string t) {
              if (s.size() != t.size()) return false;
              int count[26] = {};
              for (int i = 0; i < s.size(); i++) {
                  count[s[i] - 'a']++;
                  count[t[i] - 'a']--;
              }
              for (int c : count) {
                  if (c != 0) return false;
              }
              return true;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isAnagram("anagram", "nagaram") == true);
      CHECK(Solution().isAnagram("rat", "car") == false);
    `,
  },
  "group-anagrams": {
    code: cpp`
      class Solution {
      public:
          vector<vector<string>> groupAnagrams(vector<string>& strs) {
              unordered_map<string, vector<string>> groups;
              for (const string& s : strs) {
                  string key = s;
                  sort(key.begin(), key.end());
                  groups[key].push_back(s);
              }
              vector<vector<string>> result;
              for (auto& entry : groups) result.push_back(entry.second);
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(deepSorted(Solution().groupAnagrams(lv(VS{"eat", "tea", "tan", "ate", "nat", "bat"}))) ==
            deepSorted(VVS{{"bat"}, {"nat", "tan"}, {"ate", "eat", "tea"}}));
    `,
  },
  "top-k-frequent-elements": {
    code: cpp`
      class Solution {
      public:
          vector<int> topKFrequent(vector<int>& nums, int k) {
              unordered_map<int, int> count;
              for (int n : nums) count[n]++;
              vector<vector<int>> buckets(nums.size() + 1);
              for (auto& [n, c] : count) buckets[c].push_back(n);
              vector<int> result;
              for (int c = buckets.size() - 1; c > 0; c--) {
                  for (int n : buckets[c]) {
                      if (result.size() < k) result.push_back(n);
                  }
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(sorted(Solution().topKFrequent(lv(VI{1, 1, 1, 2, 2, 3}), 2)) == VI{1, 2});
      CHECK(Solution().topKFrequent(lv(VI{1}), 1) == VI{1});
    `,
  },
  "product-of-array-except-self": {
    code: cpp`
      class Solution {
      public:
          vector<int> productExceptSelf(vector<int>& nums) {
              int n = nums.size();
              vector<int> result(n, 1);
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
      };
    `,
    checks: cpp`
      CHECK(Solution().productExceptSelf(lv(VI{1, 2, 3, 4})) == VI{24, 12, 8, 6});
      CHECK(Solution().productExceptSelf(lv(VI{-1, 1, 0, -3, 3})) == VI{0, 0, 9, 0, 0});
    `,
  },
  "longest-consecutive-sequence": {
    code: cpp`
      class Solution {
      public:
          int longestConsecutive(vector<int>& nums) {
              unordered_set<int> values(nums.begin(), nums.end());
              int best = 0;
              for (int n : values) {
                  if (values.count(n - 1)) continue;
                  int length = 1;
                  while (values.count(n + length)) length++;
                  best = max(best, length);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().longestConsecutive(lv(VI{100, 4, 200, 1, 3, 2})) == 4);
      CHECK(Solution().longestConsecutive(lv(VI{0, 3, 7, 2, 5, 8, 4, 6, 0, 1})) == 9);
      CHECK(Solution().longestConsecutive(lv(VI{})) == 0);
    `,
  },
  "majority-element": {
    code: cpp`
      class Solution {
      public:
          int majorityElement(vector<int>& nums) {
              int candidate = 0, count = 0;
              for (int n : nums) {
                  if (count == 0) candidate = n;
                  count += n == candidate ? 1 : -1;
              }
              return candidate;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().majorityElement(lv(VI{2, 2, 1, 1, 1, 2, 2})) == 2);
      CHECK(Solution().majorityElement(lv(VI{3, 2, 3})) == 3);
    `,
  },
  "valid-sudoku": {
    code: cpp`
      class Solution {
      public:
          bool isValidSudoku(vector<vector<char>>& board) {
              bool rows[9][9] = {}, cols[9][9] = {}, boxes[9][9] = {};
              for (int r = 0; r < 9; r++) {
                  for (int c = 0; c < 9; c++) {
                      if (board[r][c] == '.') continue;
                      int d = board[r][c] - '1';
                      int b = (r / 3) * 3 + c / 3;
                      if (rows[r][d] || cols[c][d] || boxes[b][d]) return false;
                      rows[r][d] = cols[c][d] = boxes[b][d] = true;
                  }
              }
              return true;
          }
      };
    `,
    checks: cpp`
      VVC board = {{'5', '3', '.', '.', '7', '.', '.', '.', '.'},
                   {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
                   {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
                   {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
                   {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
                   {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
                   {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
                   {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
                   {'.', '.', '.', '.', '8', '.', '.', '7', '9'}};
      CHECK(Solution().isValidSudoku(board) == true);
      board[0][0] = '8';
      CHECK(Solution().isValidSudoku(board) == false);
    `,
  },
  "subarray-sum-equals-k": {
    code: cpp`
      class Solution {
      public:
          int subarraySum(vector<int>& nums, int k) {
              unordered_map<int, int> counts{{0, 1}};
              int sum = 0, total = 0;
              for (int n : nums) {
                  sum += n;
                  auto it = counts.find(sum - k);
                  if (it != counts.end()) total += it->second;
                  counts[sum]++;
              }
              return total;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().subarraySum(lv(VI{1, 1, 1}), 2) == 2);
      CHECK(Solution().subarraySum(lv(VI{1, 2, 3}), 3) == 2);
      CHECK(Solution().subarraySum(lv(VI{1, -1, 0}), 0) == 3);
    `,
  },
  "move-zeroes": {
    code: cpp`
      class Solution {
      public:
          void moveZeroes(vector<int>& nums) {
              int insert = 0;
              for (int i = 0; i < nums.size(); i++) {
                  if (nums[i] != 0) swap(nums[insert++], nums[i]);
              }
          }
      };
    `,
    checks: cpp`
      VI a{0, 1, 0, 3, 12};
      Solution().moveZeroes(a);
      CHECK(a == VI{1, 3, 12, 0, 0});
      VI b{0};
      Solution().moveZeroes(b);
      CHECK(b == VI{0});
    `,
  },
  "best-time-to-buy-and-sell-stock": {
    code: cpp`
      class Solution {
      public:
          int maxProfit(vector<int>& prices) {
              int minPrice = INT_MAX, best = 0;
              for (int p : prices) {
                  minPrice = min(minPrice, p);
                  best = max(best, p - minPrice);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().maxProfit(lv(VI{7, 1, 5, 3, 6, 4})) == 5);
      CHECK(Solution().maxProfit(lv(VI{7, 6, 4, 3, 1})) == 0);
    `,
  },
  "find-all-numbers-disappeared": {
    code: cpp`
      class Solution {
      public:
          vector<int> findDisappearedNumbers(vector<int>& nums) {
              for (int n : nums) {
                  int i = abs(n) - 1;
                  nums[i] = -abs(nums[i]);
              }
              vector<int> missing;
              for (int i = 0; i < nums.size(); i++) {
                  if (nums[i] > 0) missing.push_back(i + 1);
              }
              return missing;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().findDisappearedNumbers(lv(VI{4, 3, 2, 7, 8, 2, 3, 1})) == VI{5, 6});
      CHECK(Solution().findDisappearedNumbers(lv(VI{1, 1})) == VI{2});
    `,
  },
  "rotate-image": {
    code: cpp`
      class Solution {
      public:
          void rotate(vector<vector<int>>& matrix) {
              int n = matrix.size();
              for (int i = 0; i < n; i++) {
                  for (int j = i + 1; j < n; j++) swap(matrix[i][j], matrix[j][i]);
              }
              for (auto& row : matrix) reverse(row.begin(), row.end());
          }
      };
    `,
    checks: cpp`
      VVI m{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
      Solution().rotate(m);
      CHECK(m == VVI{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}});
    `,
  },
  "spiral-matrix": {
    code: cpp`
      class Solution {
      public:
          vector<int> spiralOrder(vector<vector<int>>& matrix) {
              vector<int> result;
              int top = 0, bottom = matrix.size() - 1;
              int left = 0, right = matrix[0].size() - 1;
              while (top <= bottom && left <= right) {
                  for (int c = left; c <= right; c++) {
                      result.push_back(matrix[top][c]);
                  }
                  top++;
                  for (int r = top; r <= bottom; r++) {
                      result.push_back(matrix[r][right]);
                  }
                  right--;
                  if (top <= bottom) {
                      for (int c = right; c >= left; c--) {
                          result.push_back(matrix[bottom][c]);
                      }
                      bottom--;
                  }
                  if (left <= right) {
                      for (int r = bottom; r >= top; r--) {
                          result.push_back(matrix[r][left]);
                      }
                      left++;
                  }
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().spiralOrder(lv(VVI{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})) ==
            VI{1, 2, 3, 6, 9, 8, 7, 4, 5});
      CHECK(Solution().spiralOrder(lv(VVI{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}})) ==
            VI{1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7});
    `,
  },
  "set-matrix-zeroes": {
    code: cpp`
      class Solution {
      public:
          void setZeroes(vector<vector<int>>& matrix) {
              int m = matrix.size(), n = matrix[0].size();
              vector<bool> zeroRow(m), zeroCol(n);
              for (int r = 0; r < m; r++) {
                  for (int c = 0; c < n; c++) {
                      if (matrix[r][c] == 0) zeroRow[r] = zeroCol[c] = true;
                  }
              }
              for (int r = 0; r < m; r++) {
                  for (int c = 0; c < n; c++) {
                      if (zeroRow[r] || zeroCol[c]) matrix[r][c] = 0;
                  }
              }
          }
      };
    `,
    checks: cpp`
      VVI m{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
      Solution().setZeroes(m);
      CHECK(m == VVI{{1, 0, 1}, {0, 0, 0}, {1, 0, 1}});
    `,
  },
  "first-missing-positive": {
    code: cpp`
      class Solution {
      public:
          int firstMissingPositive(vector<int>& nums) {
              int n = nums.size();
              for (int i = 0; i < n; i++) {
                  while (nums[i] > 0 && nums[i] <= n &&
                         nums[nums[i] - 1] != nums[i]) {
                      swap(nums[i], nums[nums[i] - 1]);
                  }
              }
              for (int i = 0; i < n; i++) {
                  if (nums[i] != i + 1) return i + 1;
              }
              return n + 1;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().firstMissingPositive(lv(VI{3, 4, -1, 1})) == 2);
      CHECK(Solution().firstMissingPositive(lv(VI{1, 2, 0})) == 3);
      CHECK(Solution().firstMissingPositive(lv(VI{7, 8, 9, 11, 12})) == 1);
    `,
  },
  "pascals-triangle": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> generate(int numRows) {
              vector<vector<int>> rows;
              for (int i = 0; i < numRows; i++) {
                  vector<int> row(i + 1, 1);
                  for (int j = 1; j < i; j++) {
                      row[j] = rows[i - 1][j - 1] + rows[i - 1][j];
                  }
                  rows.push_back(row);
              }
              return rows;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().generate(5) == VVI{{1}, {1, 1}, {1, 2, 1}, {1, 3, 3, 1}, {1, 4, 6, 4, 1}});
      CHECK(Solution().generate(1) == VVI{{1}});
    `,
  },
};
