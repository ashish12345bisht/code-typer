import { cpp, type Solution } from "../types";

export const twoPointersCpp: Record<string, Solution> = {
  "valid-palindrome": {
    code: cpp`
      class Solution {
      public:
          bool isPalindrome(string s) {
              int i = 0, j = s.size() - 1;
              while (i < j) {
                  if (!isalnum(s[i])) i++;
                  else if (!isalnum(s[j])) j--;
                  else if (tolower(s[i++]) != tolower(s[j--])) return false;
              }
              return true;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isPalindrome("A man, a plan, a canal: Panama") == true);
      CHECK(Solution().isPalindrome("race a car") == false);
      CHECK(Solution().isPalindrome(" ") == true);
    `,
  },
  "two-sum-ii": {
    code: cpp`
      class Solution {
      public:
          vector<int> twoSum(vector<int>& numbers, int target) {
              int i = 0, j = numbers.size() - 1;
              while (i < j) {
                  int sum = numbers[i] + numbers[j];
                  if (sum == target) return {i + 1, j + 1};
                  if (sum < target) i++;
                  else j--;
              }
              return {};
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().twoSum(lv(VI{2, 7, 11, 15}), 9) == VI{1, 2});
      CHECK(Solution().twoSum(lv(VI{2, 3, 4}), 6) == VI{1, 3});
    `,
  },
  "three-sum": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> threeSum(vector<int>& nums) {
              sort(nums.begin(), nums.end());
              vector<vector<int>> result;
              for (int i = 0; i + 2 < nums.size(); i++) {
                  if (i > 0 && nums[i] == nums[i - 1]) continue;
                  int lo = i + 1, hi = nums.size() - 1;
                  while (lo < hi) {
                      int sum = nums[i] + nums[lo] + nums[hi];
                      if (sum < 0) lo++;
                      else if (sum > 0) hi--;
                      else {
                          result.push_back({nums[i], nums[lo], nums[hi]});
                          lo++;
                          while (lo < hi && nums[lo] == nums[lo - 1]) lo++;
                      }
                  }
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(deepSorted(Solution().threeSum(lv(VI{-1, 0, 1, 2, -1, -4}))) == VVI{{-1, -1, 2}, {-1, 0, 1}});
      CHECK(Solution().threeSum(lv(VI{0, 0, 0})) == VVI{{0, 0, 0}});
      CHECK(Solution().threeSum(lv(VI{0, 1, 1})).empty());
    `,
  },
  "container-with-most-water": {
    code: cpp`
      class Solution {
      public:
          int maxArea(vector<int>& height) {
              int i = 0, j = height.size() - 1, best = 0;
              while (i < j) {
                  best = max(best, min(height[i], height[j]) * (j - i));
                  if (height[i] < height[j]) i++;
                  else j--;
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().maxArea(lv(VI{1, 8, 6, 2, 5, 4, 8, 3, 7})) == 49);
      CHECK(Solution().maxArea(lv(VI{1, 1})) == 1);
    `,
  },
  "trapping-rain-water": {
    code: cpp`
      class Solution {
      public:
          int trap(vector<int>& height) {
              int i = 0, j = height.size() - 1;
              int leftMax = 0, rightMax = 0, water = 0;
              while (i < j) {
                  if (height[i] < height[j]) {
                      leftMax = max(leftMax, height[i]);
                      water += leftMax - height[i++];
                  } else {
                      rightMax = max(rightMax, height[j]);
                      water += rightMax - height[j--];
                  }
              }
              return water;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().trap(lv(VI{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1})) == 6);
      CHECK(Solution().trap(lv(VI{4, 2, 0, 3, 2, 5})) == 9);
    `,
  },
  "remove-duplicates-from-sorted-array": {
    code: cpp`
      class Solution {
      public:
          int removeDuplicates(vector<int>& nums) {
              int k = 0;
              for (int n : nums) {
                  if (k == 0 || n != nums[k - 1]) nums[k++] = n;
              }
              return k;
          }
      };
    `,
    checks: cpp`
      VI a{0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
      CHECK(Solution().removeDuplicates(a) == 5);
      CHECK(VI(a.begin(), a.begin() + 5) == VI{0, 1, 2, 3, 4});
      CHECK(Solution().removeDuplicates(lv(VI{1, 1, 2})) == 2);
    `,
  },
  "sort-colors": {
    code: cpp`
      class Solution {
      public:
          void sortColors(vector<int>& nums) {
              int lo = 0, mid = 0, hi = nums.size() - 1;
              while (mid <= hi) {
                  if (nums[mid] == 0) swap(nums[lo++], nums[mid++]);
                  else if (nums[mid] == 2) swap(nums[mid], nums[hi--]);
                  else mid++;
              }
          }
      };
    `,
    checks: cpp`
      VI a{2, 0, 2, 1, 1, 0};
      Solution().sortColors(a);
      CHECK(a == VI{0, 0, 1, 1, 2, 2});
      VI b{2, 0, 1};
      Solution().sortColors(b);
      CHECK(b == VI{0, 1, 2});
    `,
  },
  "merge-sorted-array": {
    code: cpp`
      class Solution {
      public:
          void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
              int i = m - 1, j = n - 1;
              for (int k = m + n - 1; j >= 0; k--) {
                  if (i >= 0 && nums1[i] > nums2[j]) nums1[k] = nums1[i--];
                  else nums1[k] = nums2[j--];
              }
          }
      };
    `,
    checks: cpp`
      VI a{1, 2, 3, 0, 0, 0};
      Solution().merge(a, 3, lv(VI{2, 5, 6}), 3);
      CHECK(a == VI{1, 2, 2, 3, 5, 6});
      VI b{0};
      Solution().merge(b, 0, lv(VI{1}), 1);
      CHECK(b == VI{1});
    `,
  },
  "squares-of-a-sorted-array": {
    code: cpp`
      class Solution {
      public:
          vector<int> sortedSquares(vector<int>& nums) {
              int n = nums.size(), i = 0, j = n - 1;
              vector<int> result(n);
              for (int k = n - 1; k >= 0; k--) {
                  if (abs(nums[i]) > abs(nums[j])) {
                      result[k] = nums[i] * nums[i];
                      i++;
                  } else {
                      result[k] = nums[j] * nums[j];
                      j--;
                  }
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().sortedSquares(lv(VI{-4, -1, 0, 3, 10})) == VI{0, 1, 9, 16, 100});
      CHECK(Solution().sortedSquares(lv(VI{-7, -3, 2, 3, 11})) == VI{4, 9, 9, 49, 121});
    `,
  },
  "is-subsequence": {
    code: cpp`
      class Solution {
      public:
          bool isSubsequence(string s, string t) {
              int i = 0;
              for (int j = 0; j < t.size() && i < s.size(); j++) {
                  if (s[i] == t[j]) i++;
              }
              return i == s.size();
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isSubsequence("abc", "ahbgdc") == true);
      CHECK(Solution().isSubsequence("axc", "ahbgdc") == false);
    `,
  },
  "three-sum-closest": {
    code: cpp`
      class Solution {
      public:
          int threeSumClosest(vector<int>& nums, int target) {
              sort(nums.begin(), nums.end());
              int best = nums[0] + nums[1] + nums[2];
              for (int i = 0; i + 2 < nums.size(); i++) {
                  int lo = i + 1, hi = nums.size() - 1;
                  while (lo < hi) {
                      int sum = nums[i] + nums[lo] + nums[hi];
                      if (abs(sum - target) < abs(best - target)) best = sum;
                      if (sum < target) lo++;
                      else if (sum > target) hi--;
                      else return sum;
                  }
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().threeSumClosest(lv(VI{-1, 2, 1, -4}), 1) == 2);
      CHECK(Solution().threeSumClosest(lv(VI{0, 0, 0}), 1) == 0);
    `,
  },
  "backspace-string-compare": {
    code: cpp`
      class Solution {
      public:
          bool backspaceCompare(string s, string t) {
              int i = s.size() - 1, j = t.size() - 1;
              while (i >= 0 || j >= 0) {
                  i = nextChar(s, i);
                  j = nextChar(t, j);
                  if (i < 0 || j < 0) return i < 0 && j < 0;
                  if (s[i--] != t[j--]) return false;
              }
              return true;
          }

      private:
          int nextChar(const string& str, int i) {
              int skip = 0;
              for (; i >= 0; i--) {
                  if (str[i] == '#') skip++;
                  else if (skip > 0) skip--;
                  else break;
              }
              return i;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().backspaceCompare("ab#c", "ad#c") == true);
      CHECK(Solution().backspaceCompare("ab##", "c#d#") == true);
      CHECK(Solution().backspaceCompare("a#c", "b") == false);
    `,
  },
};
