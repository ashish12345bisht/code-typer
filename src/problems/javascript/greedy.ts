import { js, type Solution } from "../types";

export const greedyJavascript: Record<string, Solution> = {
  "maximum-subarray": {
    code: js`
      function maxSubArray(nums) {
        let best = nums[0];
        let current = 0;
        for (const n of nums) {
          current = Math.max(n, current + n);
          best = Math.max(best, current);
        }
        return best;
      }
    `,
    checks: "",
  },
  "jump-game": {
    code: js`
      function canJump(nums) {
        let reach = 0;
        for (let i = 0; i < nums.length; i++) {
          if (i > reach) return false;
          reach = Math.max(reach, i + nums[i]);
        }
        return true;
      }
    `,
    checks: "",
  },
  "jump-game-ii": {
    code: js`
      function jump(nums) {
        let jumps = 0;
        let end = 0;
        let farthest = 0;
        for (let i = 0; i < nums.length - 1; i++) {
          farthest = Math.max(farthest, i + nums[i]);
          if (i === end) {
            jumps++;
            end = farthest;
          }
        }
        return jumps;
      }
    `,
    checks: "",
  },
  "gas-station": {
    code: js`
      function canCompleteCircuit(gas, cost) {
        let total = 0;
        let tank = 0;
        let start = 0;
        for (let i = 0; i < gas.length; i++) {
          const diff = gas[i] - cost[i];
          total += diff;
          tank += diff;
          if (tank < 0) {
            start = i + 1;
            tank = 0;
          }
        }
        return total < 0 ? -1 : start;
      }
    `,
    checks: "",
  },
  "hand-of-straights": {
    code: js`
      function isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize) return false;
        const count = new Map();
        for (const card of hand) count.set(card, (count.get(card) ?? 0) + 1);
        const cards = [...count.keys()].sort((a, b) => a - b);
        for (const first of cards) {
          const need = count.get(first);
          if (need === 0) continue;
          for (let card = first; card < first + groupSize; card++) {
            const have = count.get(card) ?? 0;
            if (have < need) return false;
            count.set(card, have - need);
          }
        }
        return true;
      }
    `,
    checks: "",
  },
  "merge-triplets": {
    code: js`
      function mergeTriplets(triplets, target) {
        const found = [false, false, false];
        for (const t of triplets) {
          if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
          for (let i = 0; i < 3; i++) if (t[i] === target[i]) found[i] = true;
        }
        return found.every(Boolean);
      }
    `,
    checks: "",
  },
  "partition-labels": {
    code: js`
      function partitionLabels(s) {
        const last = new Map();
        for (let i = 0; i < s.length; i++) last.set(s[i], i);
        const sizes = [];
        let start = 0;
        let end = 0;
        for (let i = 0; i < s.length; i++) {
          end = Math.max(end, last.get(s[i]));
          if (i === end) {
            sizes.push(end - start + 1);
            start = i + 1;
          }
        }
        return sizes;
      }
    `,
    checks: "",
  },
  "valid-parenthesis-string": {
    code: js`
      function checkValidString(s) {
        let lo = 0;
        let hi = 0;
        for (const c of s) {
          lo += c === "(" ? 1 : -1;
          hi += c === ")" ? -1 : 1;
          if (hi < 0) return false;
          lo = Math.max(lo, 0);
        }
        return lo === 0;
      }
    `,
    checks: "",
  },
  "assign-cookies": {
    code: js`
      function findContentChildren(g, s) {
        g.sort((a, b) => a - b);
        s.sort((a, b) => a - b);
        let child = 0;
        for (const cookie of s) {
          if (child < g.length && cookie >= g[child]) child++;
        }
        return child;
      }
    `,
    checks: "",
  },
  "candy": {
    code: js`
      function candy(ratings) {
        const n = ratings.length;
        const candies = new Array(n).fill(1);
        for (let i = 1; i < n; i++) {
          if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        }
        for (let i = n - 2; i >= 0; i--) {
          if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
          }
        }
        return candies.reduce((a, b) => a + b, 0);
      }
    `,
    checks: "",
  },
};
