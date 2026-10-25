import { py, type Solution } from "../types";

export const heapPython: Record<string, Solution> = {
  "kth-largest-element-in-an-array": {
    code: py`
      class Solution:
          def findKthLargest(self, nums: List[int], k: int) -> int:
              heap = []
              for n in nums:
                  heappush(heap, n)
                  if len(heap) > k:
                      heappop(heap)
              return heap[0]
    `,
    checks: "",
  },
  "kth-largest-element-in-a-stream": {
    code: py`
      class KthLargest:
          def __init__(self, k: int, nums: List[int]):
              self.k = k
              self.heap = []
              for n in nums:
                  self.add(n)

          def add(self, val: int) -> int:
              heappush(self.heap, val)
              if len(self.heap) > self.k:
                  heappop(self.heap)
              return self.heap[0]
    `,
    checks: "",
  },
  "last-stone-weight": {
    code: py`
      class Solution:
          def lastStoneWeight(self, stones: List[int]) -> int:
              heap = [-s for s in stones]
              heapify(heap)
              while len(heap) > 1:
                  a, b = -heappop(heap), -heappop(heap)
                  if a != b:
                      heappush(heap, b - a)
              return -heap[0] if heap else 0
    `,
    checks: "",
  },
  "k-closest-points-to-origin": {
    code: py`
      class Solution:
          def kClosest(
              self, points: List[List[int]], k: int
          ) -> List[List[int]]:
              heap = []
              for x, y in points:
                  heappush(heap, (-(x * x + y * y), x, y))
                  if len(heap) > k:
                      heappop(heap)
              return [[x, y] for _, x, y in heap]
    `,
    checks: "",
  },
  "task-scheduler": {
    code: py`
      class Solution:
          def leastInterval(self, tasks: List[str], n: int) -> int:
              counts = Counter(tasks).values()
              top = max(counts)
              ties = sum(1 for c in counts if c == top)
              return max(len(tasks), (top - 1) * (n + 1) + ties)
    `,
    checks: "",
  },
  "find-median-from-data-stream": {
    code: py`
      class MedianFinder:
          def __init__(self):
              self.low = []
              self.high = []

          def addNum(self, num: int) -> None:
              heappush(self.low, -num)
              heappush(self.high, -heappop(self.low))
              if len(self.high) > len(self.low):
                  heappush(self.low, -heappop(self.high))

          def findMedian(self) -> float:
              if len(self.low) > len(self.high):
                  return -self.low[0]
              return (self.high[0] - self.low[0]) / 2
    `,
    checks: "",
  },
};
