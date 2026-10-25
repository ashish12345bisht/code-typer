import { java, type Solution } from "../types";

export const greedyJava: Record<string, Solution> = {
  "maximum-subarray": {
    code: java`
      class Solution {
          public int maxSubArray(int[] nums) {
              int best = nums[0], current = nums[0];
              for (int i = 1; i < nums.length; i++) {
                  current = Math.max(nums[i], current + nums[i]);
                  best = Math.max(best, current);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "jump-game": {
    code: java`
      class Solution {
          public boolean canJump(int[] nums) {
              int reach = 0;
              for (int i = 0; i < nums.length; i++) {
                  if (i > reach) return false;
                  reach = Math.max(reach, i + nums[i]);
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "jump-game-ii": {
    code: java`
      class Solution {
          public int jump(int[] nums) {
              int jumps = 0, end = 0, farthest = 0;
              for (int i = 0; i < nums.length - 1; i++) {
                  farthest = Math.max(farthest, i + nums[i]);
                  if (i == end) {
                      jumps++;
                      end = farthest;
                  }
              }
              return jumps;
          }
      }
    `,
    checks: "",
  },
  "gas-station": {
    code: java`
      class Solution {
          public int canCompleteCircuit(int[] gas, int[] cost) {
              int total = 0, tank = 0, start = 0;
              for (int i = 0; i < gas.length; i++) {
                  total += gas[i] - cost[i];
                  tank += gas[i] - cost[i];
                  if (tank < 0) {
                      start = i + 1;
                      tank = 0;
                  }
              }
              return total < 0 ? -1 : start;
          }
      }
    `,
    checks: "",
  },
  "hand-of-straights": {
    code: java`
      class Solution {
          public boolean isNStraightHand(int[] hand, int groupSize) {
              TreeMap<Integer, Integer> counts = new TreeMap<>();
              for (int card : hand) counts.merge(card, 1, Integer::sum);
              while (!counts.isEmpty()) {
                  int first = counts.firstKey();
                  for (int c = first; c < first + groupSize; c++) {
                      Integer count = counts.get(c);
                      if (count == null) return false;
                      if (count == 1) counts.remove(c);
                      else counts.put(c, count - 1);
                  }
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "merge-triplets": {
    code: java`
      class Solution {
          public boolean mergeTriplets(int[][] triplets, int[] target) {
              boolean[] found = new boolean[3];
              for (int[] t : triplets) {
                  if (t[0] > target[0] || t[1] > target[1]
                          || t[2] > target[2]) {
                      continue;
                  }
                  for (int i = 0; i < 3; i++) {
                      if (t[i] == target[i]) found[i] = true;
                  }
              }
              return found[0] && found[1] && found[2];
          }
      }
    `,
    checks: "",
  },
  "partition-labels": {
    code: java`
      class Solution {
          public List<Integer> partitionLabels(String s) {
              int[] last = new int[26];
              for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
              List<Integer> sizes = new ArrayList<>();
              int start = 0, end = 0;
              for (int i = 0; i < s.length(); i++) {
                  end = Math.max(end, last[s.charAt(i) - 'a']);
                  if (i == end) {
                      sizes.add(end - start + 1);
                      start = i + 1;
                  }
              }
              return sizes;
          }
      }
    `,
    checks: "",
  },
  "valid-parenthesis-string": {
    code: java`
      class Solution {
          public boolean checkValidString(String s) {
              int lo = 0, hi = 0;
              for (char c : s.toCharArray()) {
                  if (c == '(') {
                      lo++;
                      hi++;
                  } else if (c == ')') {
                      lo--;
                      hi--;
                  } else {
                      lo--;
                      hi++;
                  }
                  if (hi < 0) return false;
                  lo = Math.max(lo, 0);
              }
              return lo == 0;
          }
      }
    `,
    checks: "",
  },
  "assign-cookies": {
    code: java`
      class Solution {
          public int findContentChildren(int[] g, int[] s) {
              Arrays.sort(g);
              Arrays.sort(s);
              int child = 0;
              for (int cookie : s) {
                  if (child < g.length && cookie >= g[child]) child++;
              }
              return child;
          }
      }
    `,
    checks: "",
  },
  candy: {
    code: java`
      class Solution {
          public int candy(int[] ratings) {
              int n = ratings.length;
              int[] candies = new int[n];
              Arrays.fill(candies, 1);
              for (int i = 1; i < n; i++) {
                  if (ratings[i] > ratings[i - 1]) {
                      candies[i] = candies[i - 1] + 1;
                  }
              }
              for (int i = n - 2; i >= 0; i--) {
                  if (ratings[i] > ratings[i + 1]) {
                      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
                  }
              }
              return Arrays.stream(candies).sum();
          }
      }
    `,
    checks: "",
  },
};
