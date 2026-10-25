import { cpp, type Solution } from "../types";

export const greedyCpp: Record<string, Solution> = {
  "maximum-subarray": {
    code: cpp`
      class Solution {
      public:
          int maxSubArray(vector<int>& nums) {
              int best = nums[0], current = 0;
              for (int n : nums) {
                  current = max(n, current + n);
                  best = max(best, current);
              }
              return best;
          }
      };
    `,
    checks: "",
  },
  "jump-game": {
    code: cpp`
      class Solution {
      public:
          bool canJump(vector<int>& nums) {
              int reach = 0;
              for (int i = 0; i < nums.size(); i++) {
                  if (i > reach) return false;
                  reach = max(reach, i + nums[i]);
              }
              return true;
          }
      };
    `,
    checks: "",
  },
  "jump-game-ii": {
    code: cpp`
      class Solution {
      public:
          int jump(vector<int>& nums) {
              int jumps = 0, end = 0, farthest = 0;
              for (int i = 0; i + 1 < nums.size(); i++) {
                  farthest = max(farthest, i + nums[i]);
                  if (i == end) {
                      jumps++;
                      end = farthest;
                  }
              }
              return jumps;
          }
      };
    `,
    checks: "",
  },
  "gas-station": {
    code: cpp`
      class Solution {
      public:
          int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
              int total = 0, tank = 0, start = 0;
              for (int i = 0; i < gas.size(); i++) {
                  int diff = gas[i] - cost[i];
                  total += diff;
                  tank += diff;
                  if (tank < 0) {
                      start = i + 1;
                      tank = 0;
                  }
              }
              return total < 0 ? -1 : start;
          }
      };
    `,
    checks: "",
  },
  "hand-of-straights": {
    code: cpp`
      class Solution {
      public:
          bool isNStraightHand(vector<int>& hand, int groupSize) {
              if (hand.size() % groupSize) return false;
              map<int, int> count;
              for (int card : hand) count[card]++;
              for (auto& [first, need] : count) {
                  if (need == 0) continue;
                  int take = need;
                  for (int card = first; card < first + groupSize; card++) {
                      if (count[card] < take) return false;
                      count[card] -= take;
                  }
              }
              return true;
          }
      };
    `,
    checks: "",
  },
  "merge-triplets": {
    code: cpp`
      class Solution {
      public:
          bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
              bool found[3] = {};
              for (auto& t : triplets) {
                  if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                      continue;
                  }
                  for (int i = 0; i < 3; i++) found[i] |= t[i] == target[i];
              }
              return found[0] && found[1] && found[2];
          }
      };
    `,
    checks: "",
  },
  "partition-labels": {
    code: cpp`
      class Solution {
      public:
          vector<int> partitionLabels(string s) {
              int last[26] = {};
              for (int i = 0; i < s.size(); i++) last[s[i] - 'a'] = i;
              vector<int> sizes;
              int start = 0, end = 0;
              for (int i = 0; i < s.size(); i++) {
                  end = max(end, last[s[i] - 'a']);
                  if (i == end) {
                      sizes.push_back(end - start + 1);
                      start = i + 1;
                  }
              }
              return sizes;
          }
      };
    `,
    checks: "",
  },
  "valid-parenthesis-string": {
    code: cpp`
      class Solution {
      public:
          bool checkValidString(string s) {
              int lo = 0, hi = 0;
              for (char c : s) {
                  lo += c == '(' ? 1 : -1;
                  hi += c == ')' ? -1 : 1;
                  if (hi < 0) return false;
                  lo = max(lo, 0);
              }
              return lo == 0;
          }
      };
    `,
    checks: "",
  },
  "assign-cookies": {
    code: cpp`
      class Solution {
      public:
          int findContentChildren(vector<int>& g, vector<int>& s) {
              sort(g.begin(), g.end());
              sort(s.begin(), s.end());
              int child = 0;
              for (int cookie : s) {
                  if (child < g.size() && cookie >= g[child]) child++;
              }
              return child;
          }
      };
    `,
    checks: "",
  },
  candy: {
    code: cpp`
      class Solution {
      public:
          int candy(vector<int>& ratings) {
              int n = ratings.size();
              vector<int> candies(n, 1);
              for (int i = 1; i < n; i++) {
                  if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
              }
              for (int i = n - 2; i >= 0; i--) {
                  if (ratings[i] > ratings[i + 1]) {
                      candies[i] = max(candies[i], candies[i + 1] + 1);
                  }
              }
              return accumulate(candies.begin(), candies.end(), 0);
          }
      };
    `,
    checks: "",
  },
};
