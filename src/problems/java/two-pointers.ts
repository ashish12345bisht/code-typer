import { java, type Solution } from "../types";

export const twoPointersJava: Record<string, Solution> = {
  "valid-palindrome": {
    code: java`
      class Solution {
          public boolean isPalindrome(String s) {
              int i = 0, j = s.length() - 1;
              while (i < j) {
                  char a = s.charAt(i), b = s.charAt(j);
                  if (!Character.isLetterOrDigit(a)) {
                      i++;
                  } else if (!Character.isLetterOrDigit(b)) {
                      j--;
                  } else if (Character.toLowerCase(a)
                          != Character.toLowerCase(b)) {
                      return false;
                  } else {
                      i++;
                      j--;
                  }
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "two-sum-ii": {
    code: java`
      class Solution {
          public int[] twoSum(int[] numbers, int target) {
              int i = 0, j = numbers.length - 1;
              while (i < j) {
                  int total = numbers[i] + numbers[j];
                  if (total == target) return new int[] {i + 1, j + 1};
                  if (total < target) i++;
                  else j--;
              }
              return new int[0];
          }
      }
    `,
    checks: "",
  },
  "three-sum": {
    code: java`
      class Solution {
          public List<List<Integer>> threeSum(int[] nums) {
              Arrays.sort(nums);
              List<List<Integer>> result = new ArrayList<>();
              for (int i = 0; i + 2 < nums.length; i++) {
                  if (i > 0 && nums[i] == nums[i - 1]) continue;
                  int lo = i + 1, hi = nums.length - 1;
                  while (lo < hi) {
                      int total = nums[i] + nums[lo] + nums[hi];
                      if (total < 0) {
                          lo++;
                      } else if (total > 0) {
                          hi--;
                      } else {
                          result.add(List.of(nums[i], nums[lo], nums[hi]));
                          lo++;
                          while (lo < hi && nums[lo] == nums[lo - 1]) lo++;
                      }
                  }
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "container-with-most-water": {
    code: java`
      class Solution {
          public int maxArea(int[] height) {
              int i = 0, j = height.length - 1, best = 0;
              while (i < j) {
                  int h = Math.min(height[i], height[j]);
                  best = Math.max(best, h * (j - i));
                  if (height[i] < height[j]) i++;
                  else j--;
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "trapping-rain-water": {
    code: java`
      class Solution {
          public int trap(int[] height) {
              int i = 0, j = height.length - 1;
              int leftMax = 0, rightMax = 0, water = 0;
              while (i < j) {
                  if (height[i] < height[j]) {
                      leftMax = Math.max(leftMax, height[i]);
                      water += leftMax - height[i++];
                  } else {
                      rightMax = Math.max(rightMax, height[j]);
                      water += rightMax - height[j--];
                  }
              }
              return water;
          }
      }
    `,
    checks: "",
  },
  "remove-duplicates-from-sorted-array": {
    code: java`
      class Solution {
          public int removeDuplicates(int[] nums) {
              int k = 0;
              for (int n : nums) {
                  if (k == 0 || n != nums[k - 1]) nums[k++] = n;
              }
              return k;
          }
      }
    `,
    checks: "",
  },
  "sort-colors": {
    code: java`
      class Solution {
          public void sortColors(int[] nums) {
              int lo = 0, mid = 0, hi = nums.length - 1;
              while (mid <= hi) {
                  if (nums[mid] == 0) {
                      swap(nums, lo++, mid++);
                  } else if (nums[mid] == 2) {
                      swap(nums, mid, hi--);
                  } else {
                      mid++;
                  }
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
  "merge-sorted-array": {
    code: java`
      class Solution {
          public void merge(int[] nums1, int m, int[] nums2, int n) {
              int i = m - 1, j = n - 1, k = m + n - 1;
              while (j >= 0) {
                  if (i >= 0 && nums1[i] > nums2[j]) {
                      nums1[k--] = nums1[i--];
                  } else {
                      nums1[k--] = nums2[j--];
                  }
              }
          }
      }
    `,
    checks: "",
  },
  "squares-of-a-sorted-array": {
    code: java`
      class Solution {
          public int[] sortedSquares(int[] nums) {
              int n = nums.length;
              int[] result = new int[n];
              int i = 0, j = n - 1;
              for (int k = n - 1; k >= 0; k--) {
                  if (Math.abs(nums[i]) > Math.abs(nums[j])) {
                      result[k] = nums[i] * nums[i];
                      i++;
                  } else {
                      result[k] = nums[j] * nums[j];
                      j--;
                  }
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "is-subsequence": {
    code: java`
      class Solution {
          public boolean isSubsequence(String s, String t) {
              int i = 0;
              for (int j = 0; j < t.length() && i < s.length(); j++) {
                  if (s.charAt(i) == t.charAt(j)) i++;
              }
              return i == s.length();
          }
      }
    `,
    checks: "",
  },
  "three-sum-closest": {
    code: java`
      class Solution {
          public int threeSumClosest(int[] nums, int target) {
              Arrays.sort(nums);
              int best = nums[0] + nums[1] + nums[2];
              for (int i = 0; i + 2 < nums.length; i++) {
                  int lo = i + 1, hi = nums.length - 1;
                  while (lo < hi) {
                      int total = nums[i] + nums[lo] + nums[hi];
                      if (Math.abs(total - target) < Math.abs(best - target)) {
                          best = total;
                      }
                      if (total < target) lo++;
                      else if (total > target) hi--;
                      else return total;
                  }
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "backspace-string-compare": {
    code: java`
      class Solution {
          public boolean backspaceCompare(String s, String t) {
              int i = s.length() - 1, j = t.length() - 1;
              while (i >= 0 || j >= 0) {
                  i = nextChar(s, i);
                  j = nextChar(t, j);
                  if (i < 0 || j < 0) return i < 0 && j < 0;
                  if (s.charAt(i) != t.charAt(j)) return false;
                  i--;
                  j--;
              }
              return true;
          }

          private int nextChar(String text, int i) {
              int skip = 0;
              while (i >= 0) {
                  if (text.charAt(i) == '#') skip++;
                  else if (skip > 0) skip--;
                  else break;
                  i--;
              }
              return i;
          }
      }
    `,
    checks: "",
  },
};
