import { py, type Solution } from "../types";

export const greedyPython: Record<string, Solution> = {
  "maximum-subarray": {
    code: py`
      class Solution:
          def maxSubArray(self, nums: List[int]) -> int:
              best = current = nums[0]
              for n in nums[1:]:
                  current = max(n, current + n)
                  best = max(best, current)
              return best
    `,
    checks: "",
  },
  "jump-game": {
    code: py`
      class Solution:
          def canJump(self, nums: List[int]) -> bool:
              reach = 0
              for i, n in enumerate(nums):
                  if i > reach:
                      return False
                  reach = max(reach, i + n)
              return True
    `,
    checks: "",
  },
  "jump-game-ii": {
    code: py`
      class Solution:
          def jump(self, nums: List[int]) -> int:
              jumps = end = farthest = 0
              for i in range(len(nums) - 1):
                  farthest = max(farthest, i + nums[i])
                  if i == end:
                      jumps += 1
                      end = farthest
              return jumps
    `,
    checks: "",
  },
  "gas-station": {
    code: py`
      class Solution:
          def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
              if sum(gas) < sum(cost):
                  return -1
              start = tank = 0
              for i in range(len(gas)):
                  tank += gas[i] - cost[i]
                  if tank < 0:
                      start, tank = i + 1, 0
              return start
    `,
    checks: "",
  },
  "hand-of-straights": {
    code: py`
      class Solution:
          def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
              counts = Counter(hand)
              for card in sorted(counts):
                  need = counts[card]
                  if need == 0:
                      continue
                  for c in range(card, card + groupSize):
                      if counts[c] < need:
                          return False
                      counts[c] -= need
              return True
    `,
    checks: "",
  },
  "merge-triplets": {
    code: py`
      class Solution:
          def mergeTriplets(
              self, triplets: List[List[int]], target: List[int]
          ) -> bool:
              found = set()
              for t in triplets:
                  if all(t[i] <= target[i] for i in range(3)):
                      found.update(i for i in range(3) if t[i] == target[i])
              return len(found) == 3
    `,
    checks: "",
  },
  "partition-labels": {
    code: py`
      class Solution:
          def partitionLabels(self, s: str) -> List[int]:
              last = {c: i for i, c in enumerate(s)}
              sizes = []
              start = end = 0
              for i, c in enumerate(s):
                  end = max(end, last[c])
                  if i == end:
                      sizes.append(end - start + 1)
                      start = i + 1
              return sizes
    `,
    checks: "",
  },
  "valid-parenthesis-string": {
    code: py`
      class Solution:
          def checkValidString(self, s: str) -> bool:
              lo = hi = 0
              for c in s:
                  if c == "(":
                      lo, hi = lo + 1, hi + 1
                  elif c == ")":
                      lo, hi = lo - 1, hi - 1
                  else:
                      lo, hi = lo - 1, hi + 1
                  if hi < 0:
                      return False
                  lo = max(lo, 0)
              return lo == 0
    `,
    checks: "",
  },
  "assign-cookies": {
    code: py`
      class Solution:
          def findContentChildren(self, g: List[int], s: List[int]) -> int:
              g.sort()
              s.sort()
              child = 0
              for cookie in s:
                  if child < len(g) and cookie >= g[child]:
                      child += 1
              return child
    `,
    checks: "",
  },
  candy: {
    code: py`
      class Solution:
          def candy(self, ratings: List[int]) -> int:
              n = len(ratings)
              candies = [1] * n
              for i in range(1, n):
                  if ratings[i] > ratings[i - 1]:
                      candies[i] = candies[i - 1] + 1
              for i in range(n - 2, -1, -1):
                  if ratings[i] > ratings[i + 1]:
                      candies[i] = max(candies[i], candies[i + 1] + 1)
              return sum(candies)
    `,
    checks: "",
  },
};
