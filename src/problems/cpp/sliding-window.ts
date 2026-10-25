import { cpp, type Solution } from "../types";

export const slidingWindowCpp: Record<string, Solution> = {
  "longest-substring-without-repeating": {
    code: cpp`
      class Solution {
      public:
          int lengthOfLongestSubstring(string s) {
              vector<int> last(128, -1);
              int start = 0, best = 0;
              for (int i = 0; i < s.size(); i++) {
                  start = max(start, last[s[i]] + 1);
                  last[s[i]] = i;
                  best = max(best, i - start + 1);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().lengthOfLongestSubstring("abcabcbb") == 3);
      CHECK(Solution().lengthOfLongestSubstring("bbbbb") == 1);
      CHECK(Solution().lengthOfLongestSubstring("pwwkew") == 3);
      CHECK(Solution().lengthOfLongestSubstring("") == 0);
    `,
  },
  "longest-repeating-character-replacement": {
    code: cpp`
      class Solution {
      public:
          int characterReplacement(string s, int k) {
              int count[26] = {};
              int start = 0, maxFreq = 0, best = 0;
              for (int i = 0; i < s.size(); i++) {
                  maxFreq = max(maxFreq, ++count[s[i] - 'A']);
                  while (i - start + 1 - maxFreq > k) count[s[start++] - 'A']--;
                  best = max(best, i - start + 1);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().characterReplacement("AABABBA", 1) == 4);
      CHECK(Solution().characterReplacement("ABAB", 2) == 4);
    `,
  },
  "permutation-in-string": {
    code: cpp`
      class Solution {
      public:
          bool checkInclusion(string s1, string s2) {
              if (s1.size() > s2.size()) return false;
              vector<int> need(26), window(26);
              for (int i = 0; i < s1.size(); i++) {
                  need[s1[i] - 'a']++;
                  window[s2[i] - 'a']++;
              }
              for (int i = s1.size(); i < s2.size(); i++) {
                  if (need == window) return true;
                  window[s2[i] - 'a']++;
                  window[s2[i - s1.size()] - 'a']--;
              }
              return need == window;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().checkInclusion("ab", "eidbaooo") == true);
      CHECK(Solution().checkInclusion("ab", "eidboaoo") == false);
    `,
  },
  "minimum-window-substring": {
    code: cpp`
      class Solution {
      public:
          string minWindow(string s, string t) {
              vector<int> need(128);
              for (char c : t) need[c]++;
              int missing = t.size(), start = 0;
              int bestStart = 0, bestLen = INT_MAX;
              for (int end = 0; end < s.size(); end++) {
                  if (need[s[end]]-- > 0) missing--;
                  while (missing == 0) {
                      if (end - start + 1 < bestLen) {
                          bestLen = end - start + 1;
                          bestStart = start;
                      }
                      if (++need[s[start++]] > 0) missing++;
                  }
              }
              return bestLen == INT_MAX ? "" : s.substr(bestStart, bestLen);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().minWindow("ADOBECODEBANC", "ABC") == "BANC");
      CHECK(Solution().minWindow("a", "a") == "a");
      CHECK(Solution().minWindow("a", "aa") == "");
    `,
  },
  "sliding-window-maximum": {
    code: cpp`
      class Solution {
      public:
          vector<int> maxSlidingWindow(vector<int>& nums, int k) {
              deque<int> dq;
              vector<int> result;
              for (int i = 0; i < nums.size(); i++) {
                  if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
                  while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
                  dq.push_back(i);
                  if (i >= k - 1) result.push_back(nums[dq.front()]);
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().maxSlidingWindow(lv(VI{1, 3, -1, -3, 5, 3, 6, 7}), 3) == VI{3, 3, 5, 5, 6, 7});
      CHECK(Solution().maxSlidingWindow(lv(VI{1}), 1) == VI{1});
    `,
  },
  "maximum-average-subarray": {
    code: cpp`
      class Solution {
      public:
          double findMaxAverage(vector<int>& nums, int k) {
              int sum = 0;
              for (int i = 0; i < k; i++) sum += nums[i];
              int best = sum;
              for (int i = k; i < nums.size(); i++) {
                  sum += nums[i] - nums[i - k];
                  best = max(best, sum);
              }
              return (double)best / k;
          }
      };
    `,
    checks: cpp`
      CHECK(near(Solution().findMaxAverage(lv(VI{1, 12, -5, -6, 50, 3}), 4), 12.75));
      CHECK(near(Solution().findMaxAverage(lv(VI{5}), 1), 5.0));
    `,
  },
  "minimum-size-subarray-sum": {
    code: cpp`
      class Solution {
      public:
          int minSubArrayLen(int target, vector<int>& nums) {
              int start = 0, sum = 0, best = INT_MAX;
              for (int end = 0; end < nums.size(); end++) {
                  sum += nums[end];
                  while (sum >= target) {
                      best = min(best, end - start + 1);
                      sum -= nums[start++];
                  }
              }
              return best == INT_MAX ? 0 : best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().minSubArrayLen(7, lv(VI{2, 3, 1, 2, 4, 3})) == 2);
      CHECK(Solution().minSubArrayLen(11, lv(VI{1, 1, 1, 1})) == 0);
    `,
  },
  "find-all-anagrams-in-a-string": {
    code: cpp`
      class Solution {
      public:
          vector<int> findAnagrams(string s, string p) {
              vector<int> result, need(26), window(26);
              for (char c : p) need[c - 'a']++;
              for (int i = 0; i < s.size(); i++) {
                  window[s[i] - 'a']++;
                  if (i >= p.size()) window[s[i - p.size()] - 'a']--;
                  if (window == need) result.push_back(i - p.size() + 1);
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().findAnagrams("cbaebabacd", "abc") == VI{0, 6});
      CHECK(Solution().findAnagrams("abab", "ab") == VI{0, 1, 2});
    `,
  },
  "fruit-into-baskets": {
    code: cpp`
      class Solution {
      public:
          int totalFruit(vector<int>& fruits) {
              unordered_map<int, int> count;
              int start = 0, best = 0;
              for (int end = 0; end < fruits.size(); end++) {
                  count[fruits[end]]++;
                  while (count.size() > 2) {
                      if (--count[fruits[start]] == 0) count.erase(fruits[start]);
                      start++;
                  }
                  best = max(best, end - start + 1);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().totalFruit(lv(VI{1, 2, 3, 2, 2})) == 4);
      CHECK(Solution().totalFruit(lv(VI{0, 1, 2, 2})) == 3);
    `,
  },
  "max-consecutive-ones-iii": {
    code: cpp`
      class Solution {
      public:
          int longestOnes(vector<int>& nums, int k) {
              int start = 0, zeros = 0, best = 0;
              for (int end = 0; end < nums.size(); end++) {
                  if (nums[end] == 0) zeros++;
                  while (zeros > k) {
                      if (nums[start++] == 0) zeros--;
                  }
                  best = max(best, end - start + 1);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().longestOnes(lv(VI{1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0}), 2) == 6);
      CHECK(Solution().longestOnes(lv(VI{0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1}), 3) == 10);
    `,
  },
};
