import { java, type Solution } from "../types";

export const slidingWindowJava: Record<string, Solution> = {
  "longest-substring-without-repeating": {
    code: java`
      class Solution {
          public int lengthOfLongestSubstring(String s) {
              Map<Character, Integer> last = new HashMap<>();
              int start = 0, best = 0;
              for (int i = 0; i < s.length(); i++) {
                  Integer prev = last.put(s.charAt(i), i);
                  if (prev != null && prev >= start) start = prev + 1;
                  best = Math.max(best, i - start + 1);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "longest-repeating-character-replacement": {
    code: java`
      class Solution {
          public int characterReplacement(String s, int k) {
              int[] count = new int[26];
              int start = 0, maxFreq = 0, best = 0;
              for (int i = 0; i < s.length(); i++) {
                  maxFreq = Math.max(maxFreq, ++count[s.charAt(i) - 'A']);
                  while (i - start + 1 - maxFreq > k) {
                      count[s.charAt(start++) - 'A']--;
                  }
                  best = Math.max(best, i - start + 1);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "permutation-in-string": {
    code: java`
      class Solution {
          public boolean checkInclusion(String s1, String s2) {
              int k = s1.length();
              if (k > s2.length()) return false;
              int[] need = new int[26], window = new int[26];
              for (int i = 0; i < k; i++) {
                  need[s1.charAt(i) - 'a']++;
                  window[s2.charAt(i) - 'a']++;
              }
              if (Arrays.equals(need, window)) return true;
              for (int i = k; i < s2.length(); i++) {
                  window[s2.charAt(i) - 'a']++;
                  window[s2.charAt(i - k) - 'a']--;
                  if (Arrays.equals(need, window)) return true;
              }
              return false;
          }
      }
    `,
    checks: "",
  },
  "minimum-window-substring": {
    code: java`
      class Solution {
          public String minWindow(String s, String t) {
              int[] need = new int[128];
              for (char c : t.toCharArray()) need[c]++;
              int missing = t.length(), start = 0;
              int bestStart = 0, bestLen = Integer.MAX_VALUE;
              for (int end = 0; end < s.length(); end++) {
                  if (need[s.charAt(end)]-- > 0) missing--;
                  while (missing == 0) {
                      if (end - start + 1 < bestLen) {
                          bestStart = start;
                          bestLen = end - start + 1;
                      }
                      if (++need[s.charAt(start++)] > 0) missing++;
                  }
              }
              if (bestLen == Integer.MAX_VALUE) return "";
              return s.substring(bestStart, bestStart + bestLen);
          }
      }
    `,
    checks: "",
  },
  "sliding-window-maximum": {
    code: java`
      class Solution {
          public int[] maxSlidingWindow(int[] nums, int k) {
              Deque<Integer> dq = new ArrayDeque<>();
              int[] result = new int[nums.length - k + 1];
              for (int i = 0; i < nums.length; i++) {
                  if (!dq.isEmpty() && dq.peekFirst() <= i - k) {
                      dq.pollFirst();
                  }
                  while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) {
                      dq.pollLast();
                  }
                  dq.addLast(i);
                  if (i >= k - 1) result[i - k + 1] = nums[dq.peekFirst()];
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "maximum-average-subarray": {
    code: java`
      class Solution {
          public double findMaxAverage(int[] nums, int k) {
              int window = 0;
              for (int i = 0; i < k; i++) window += nums[i];
              int best = window;
              for (int i = k; i < nums.length; i++) {
                  window += nums[i] - nums[i - k];
                  best = Math.max(best, window);
              }
              return (double) best / k;
          }
      }
    `,
    checks: "",
  },
  "minimum-size-subarray-sum": {
    code: java`
      class Solution {
          public int minSubArrayLen(int target, int[] nums) {
              int start = 0, total = 0, best = Integer.MAX_VALUE;
              for (int end = 0; end < nums.length; end++) {
                  total += nums[end];
                  while (total >= target) {
                      best = Math.min(best, end - start + 1);
                      total -= nums[start++];
                  }
              }
              return best == Integer.MAX_VALUE ? 0 : best;
          }
      }
    `,
    checks: "",
  },
  "find-all-anagrams-in-a-string": {
    code: java`
      class Solution {
          public List<Integer> findAnagrams(String s, String p) {
              int[] need = new int[26], window = new int[26];
              for (char c : p.toCharArray()) need[c - 'a']++;
              List<Integer> result = new ArrayList<>();
              int k = p.length();
              for (int i = 0; i < s.length(); i++) {
                  window[s.charAt(i) - 'a']++;
                  if (i >= k) window[s.charAt(i - k) - 'a']--;
                  if (Arrays.equals(need, window)) result.add(i - k + 1);
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "fruit-into-baskets": {
    code: java`
      class Solution {
          public int totalFruit(int[] fruits) {
              Map<Integer, Integer> count = new HashMap<>();
              int start = 0, best = 0;
              for (int end = 0; end < fruits.length; end++) {
                  count.merge(fruits[end], 1, Integer::sum);
                  while (count.size() > 2) {
                      int f = fruits[start++];
                      if (count.merge(f, -1, Integer::sum) == 0) {
                          count.remove(f);
                      }
                  }
                  best = Math.max(best, end - start + 1);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "max-consecutive-ones-iii": {
    code: java`
      class Solution {
          public int longestOnes(int[] nums, int k) {
              int start = 0, zeros = 0, best = 0;
              for (int end = 0; end < nums.length; end++) {
                  if (nums[end] == 0) zeros++;
                  while (zeros > k) {
                      if (nums[start++] == 0) zeros--;
                  }
                  best = Math.max(best, end - start + 1);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
};
