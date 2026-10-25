import { java, type Solution } from "../types";

export const dp1dJava: Record<string, Solution> = {
  "climbing-stairs": {
    code: java`
      class Solution {
          public int climbStairs(int n) {
              int a = 1, b = 1;
              for (int i = 0; i < n; i++) {
                  int next = a + b;
                  a = b;
                  b = next;
              }
              return a;
          }
      }
    `,
    checks: "",
  },
  "min-cost-climbing-stairs": {
    code: java`
      class Solution {
          public int minCostClimbingStairs(int[] cost) {
              int a = 0, b = 0;
              for (int i = 2; i <= cost.length; i++) {
                  int next = Math.min(b + cost[i - 1], a + cost[i - 2]);
                  a = b;
                  b = next;
              }
              return b;
          }
      }
    `,
    checks: "",
  },
  "house-robber": {
    code: java`
      class Solution {
          public int rob(int[] nums) {
              int skip = 0, take = 0;
              for (int n : nums) {
                  int next = skip + n;
                  skip = Math.max(skip, take);
                  take = next;
              }
              return Math.max(skip, take);
          }
      }
    `,
    checks: "",
  },
  "house-robber-ii": {
    code: java`
      class Solution {
          public int rob(int[] nums) {
              int n = nums.length;
              if (n == 1) return nums[0];
              return Math.max(line(nums, 0, n - 2), line(nums, 1, n - 1));
          }

          private int line(int[] nums, int lo, int hi) {
              int skip = 0, take = 0;
              for (int i = lo; i <= hi; i++) {
                  int next = skip + nums[i];
                  skip = Math.max(skip, take);
                  take = next;
              }
              return Math.max(skip, take);
          }
      }
    `,
    checks: "",
  },
  "longest-palindromic-substring": {
    code: java`
      class Solution {
          public String longestPalindrome(String s) {
              int start = 0, end = 0;
              for (int center = 0; center < 2 * s.length() - 1; center++) {
                  int lo = center / 2, hi = (center + 1) / 2;
                  while (lo >= 0 && hi < s.length()
                          && s.charAt(lo) == s.charAt(hi)) {
                      lo--;
                      hi++;
                  }
                  if (hi - lo - 1 > end - start) {
                      start = lo + 1;
                      end = hi;
                  }
              }
              return s.substring(start, end);
          }
      }
    `,
    checks: "",
  },
  "palindromic-substrings": {
    code: java`
      class Solution {
          public int countSubstrings(String s) {
              int count = 0;
              for (int center = 0; center < 2 * s.length() - 1; center++) {
                  int lo = center / 2, hi = (center + 1) / 2;
                  while (lo >= 0 && hi < s.length()
                          && s.charAt(lo) == s.charAt(hi)) {
                      count++;
                      lo--;
                      hi++;
                  }
              }
              return count;
          }
      }
    `,
    checks: "",
  },
  "decode-ways": {
    code: java`
      class Solution {
          public int numDecodings(String s) {
              int prev = 1, cur = s.charAt(0) == '0' ? 0 : 1;
              for (int i = 1; i < s.length(); i++) {
                  int ways = s.charAt(i) == '0' ? 0 : cur;
                  int two = Integer.parseInt(s.substring(i - 1, i + 1));
                  if (two >= 10 && two <= 26) ways += prev;
                  prev = cur;
                  cur = ways;
              }
              return cur;
          }
      }
    `,
    checks: "",
  },
  "coin-change": {
    code: java`
      class Solution {
          public int coinChange(int[] coins, int amount) {
              int[] dp = new int[amount + 1];
              Arrays.fill(dp, amount + 1);
              dp[0] = 0;
              for (int a = 1; a <= amount; a++) {
                  for (int c : coins) {
                      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
                  }
              }
              return dp[amount] > amount ? -1 : dp[amount];
          }
      }
    `,
    checks: "",
  },
  "maximum-product-subarray": {
    code: java`
      class Solution {
          public int maxProduct(int[] nums) {
              int best = nums[0], hi = nums[0], lo = nums[0];
              for (int i = 1; i < nums.length; i++) {
                  int n = nums[i];
                  int a = hi * n, b = lo * n;
                  hi = Math.max(n, Math.max(a, b));
                  lo = Math.min(n, Math.min(a, b));
                  best = Math.max(best, hi);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "word-break": {
    code: java`
      class Solution {
          public boolean wordBreak(String s, List<String> wordDict) {
              Set<String> words = new HashSet<>(wordDict);
              boolean[] ok = new boolean[s.length() + 1];
              ok[0] = true;
              for (int end = 1; end <= s.length(); end++) {
                  for (int start = 0; start < end; start++) {
                      if (ok[start] && words.contains(s.substring(start, end))) {
                          ok[end] = true;
                          break;
                      }
                  }
              }
              return ok[s.length()];
          }
      }
    `,
    checks: "",
  },
  "longest-increasing-subsequence": {
    code: java`
      class Solution {
          public int lengthOfLIS(int[] nums) {
              int[] tails = new int[nums.length];
              int size = 0;
              for (int n : nums) {
                  int lo = 0, hi = size;
                  while (lo < hi) {
                      int mid = (lo + hi) / 2;
                      if (tails[mid] < n) lo = mid + 1;
                      else hi = mid;
                  }
                  tails[lo] = n;
                  if (lo == size) size++;
              }
              return size;
          }
      }
    `,
    checks: "",
  },
  "partition-equal-subset-sum": {
    code: java`
      class Solution {
          public boolean canPartition(int[] nums) {
              int total = Arrays.stream(nums).sum();
              if (total % 2 == 1) return false;
              int target = total / 2;
              boolean[] reachable = new boolean[target + 1];
              reachable[0] = true;
              for (int n : nums) {
                  for (int s = target; s >= n; s--) {
                      reachable[s] |= reachable[s - n];
                  }
              }
              return reachable[target];
          }
      }
    `,
    checks: "",
  },
  "perfect-squares": {
    code: java`
      class Solution {
          public int numSquares(int n) {
              int[] dp = new int[n + 1];
              Arrays.fill(dp, Integer.MAX_VALUE);
              dp[0] = 0;
              for (int i = 1; i <= n; i++) {
                  for (int j = 1; j * j <= i; j++) {
                      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
                  }
              }
              return dp[n];
          }
      }
    `,
    checks: "",
  },
  "combination-sum-iv": {
    code: java`
      class Solution {
          public int combinationSum4(int[] nums, int target) {
              int[] dp = new int[target + 1];
              dp[0] = 1;
              for (int t = 1; t <= target; t++) {
                  for (int n : nums) {
                      if (n <= t) dp[t] += dp[t - n];
                  }
              }
              return dp[target];
          }
      }
    `,
    checks: "",
  },
};
