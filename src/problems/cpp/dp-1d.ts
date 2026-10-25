import { cpp, type Solution } from "../types";

export const dp1dCpp: Record<string, Solution> = {
  "climbing-stairs": {
    code: cpp`
      class Solution {
      public:
          int climbStairs(int n) {
              int a = 1, b = 1;
              for (int i = 2; i <= n; i++) {
                  int next = a + b;
                  a = b;
                  b = next;
              }
              return b;
          }
      };
    `,
    checks: "",
  },
  "min-cost-climbing-stairs": {
    code: cpp`
      class Solution {
      public:
          int minCostClimbingStairs(vector<int>& cost) {
              int a = 0, b = 0;
              for (int i = 2; i <= cost.size(); i++) {
                  int next = min(b + cost[i - 1], a + cost[i - 2]);
                  a = b;
                  b = next;
              }
              return b;
          }
      };
    `,
    checks: "",
  },
  "house-robber": {
    code: cpp`
      class Solution {
      public:
          int rob(vector<int>& nums) {
              int prev = 0, curr = 0;
              for (int n : nums) {
                  int next = max(curr, prev + n);
                  prev = curr;
                  curr = next;
              }
              return curr;
          }
      };
    `,
    checks: "",
  },
  "house-robber-ii": {
    code: cpp`
      class Solution {
      public:
          int rob(vector<int>& nums) {
              if (nums.size() == 1) return nums[0];
              return max(line(nums, 1, nums.size()), line(nums, 0, nums.size() - 1));
          }

      private:
          int line(const vector<int>& nums, int from, int to) {
              int prev = 0, curr = 0;
              for (int i = from; i < to; i++) {
                  int next = max(curr, prev + nums[i]);
                  prev = curr;
                  curr = next;
              }
              return curr;
          }
      };
    `,
    checks: "",
  },
  "longest-palindromic-substring": {
    code: cpp`
      class Solution {
      public:
          string longestPalindrome(string s) {
              int start = 0, length = 0;
              for (int i = 0; i < s.size(); i++) {
                  for (int odd = 0; odd < 2; odd++) {
                      int lo = i, hi = i + 1 - odd;
                      while (lo >= 0 && hi < s.size() && s[lo] == s[hi]) {
                          lo--;
                          hi++;
                      }
                      if (hi - lo - 1 > length) {
                          start = lo + 1;
                          length = hi - lo - 1;
                      }
                  }
              }
              return s.substr(start, length);
          }
      };
    `,
    checks: "",
  },
  "palindromic-substrings": {
    code: cpp`
      class Solution {
      public:
          int countSubstrings(string s) {
              int n = s.size(), count = 0;
              for (int center = 0; center < 2 * n - 1; center++) {
                  int lo = center / 2, hi = lo + center % 2;
                  while (lo >= 0 && hi < n && s[lo] == s[hi]) {
                      count++;
                      lo--;
                      hi++;
                  }
              }
              return count;
          }
      };
    `,
    checks: "",
  },
  "decode-ways": {
    code: cpp`
      class Solution {
      public:
          int numDecodings(string s) {
              int prev = 1, curr = s[0] == '0' ? 0 : 1;
              for (int i = 1; i < s.size(); i++) {
                  int next = 0;
                  if (s[i] != '0') next += curr;
                  int two = stoi(s.substr(i - 1, 2));
                  if (two >= 10 && two <= 26) next += prev;
                  prev = curr;
                  curr = next;
              }
              return curr;
          }
      };
    `,
    checks: "",
  },
  "coin-change": {
    code: cpp`
      class Solution {
      public:
          int coinChange(vector<int>& coins, int amount) {
              vector<int> dp(amount + 1, INT_MAX);
              dp[0] = 0;
              for (int a = 1; a <= amount; a++) {
                  for (int coin : coins) {
                      if (coin <= a && dp[a - coin] != INT_MAX) {
                          dp[a] = min(dp[a], dp[a - coin] + 1);
                      }
                  }
              }
              return dp[amount] == INT_MAX ? -1 : dp[amount];
          }
      };
    `,
    checks: "",
  },
  "maximum-product-subarray": {
    code: cpp`
      class Solution {
      public:
          int maxProduct(vector<int>& nums) {
              int best = nums[0], hi = nums[0], lo = nums[0];
              for (int i = 1; i < nums.size(); i++) {
                  int n = nums[i];
                  int a = hi * n, b = lo * n;
                  hi = max({n, a, b});
                  lo = min({n, a, b});
                  best = max(best, hi);
              }
              return best;
          }
      };
    `,
    checks: "",
  },
  "word-break": {
    code: cpp`
      class Solution {
      public:
          bool wordBreak(string s, vector<string>& wordDict) {
              unordered_set<string> words(wordDict.begin(), wordDict.end());
              vector<bool> dp(s.size() + 1);
              dp[0] = true;
              for (int end = 1; end <= s.size(); end++) {
                  for (int start = 0; start < end && !dp[end]; start++) {
                      if (dp[start] && words.count(s.substr(start, end - start))) {
                          dp[end] = true;
                      }
                  }
              }
              return dp[s.size()];
          }
      };
    `,
    checks: "",
  },
  "longest-increasing-subsequence": {
    code: cpp`
      class Solution {
      public:
          int lengthOfLIS(vector<int>& nums) {
              vector<int> tails;
              for (int n : nums) {
                  auto it = lower_bound(tails.begin(), tails.end(), n);
                  if (it == tails.end()) tails.push_back(n);
                  else *it = n;
              }
              return tails.size();
          }
      };
    `,
    checks: "",
  },
  "partition-equal-subset-sum": {
    code: cpp`
      class Solution {
      public:
          bool canPartition(vector<int>& nums) {
              int total = accumulate(nums.begin(), nums.end(), 0);
              if (total % 2) return false;
              int target = total / 2;
              vector<bool> dp(target + 1);
              dp[0] = true;
              for (int n : nums) {
                  for (int s = target; s >= n; s--) dp[s] = dp[s] || dp[s - n];
              }
              return dp[target];
          }
      };
    `,
    checks: "",
  },
  "perfect-squares": {
    code: cpp`
      class Solution {
      public:
          int numSquares(int n) {
              vector<int> dp(n + 1, INT_MAX);
              dp[0] = 0;
              for (int i = 1; i <= n; i++) {
                  for (int j = 1; j * j <= i; j++) {
                      dp[i] = min(dp[i], dp[i - j * j] + 1);
                  }
              }
              return dp[n];
          }
      };
    `,
    checks: "",
  },
  "combination-sum-iv": {
    code: cpp`
      class Solution {
      public:
          int combinationSum4(vector<int>& nums, int target) {
              vector<unsigned long long> dp(target + 1);
              dp[0] = 1;
              for (int t = 1; t <= target; t++) {
                  for (int n : nums) {
                      if (n <= t) dp[t] += dp[t - n];
                  }
              }
              return dp[target];
          }
      };
    `,
    checks: "",
  },
};
