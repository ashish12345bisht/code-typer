import { java, type Solution } from "../types";

export const heapJava: Record<string, Solution> = {
  "kth-largest-element-in-an-array": {
    code: java`
      class Solution {
          public int findKthLargest(int[] nums, int k) {
              PriorityQueue<Integer> heap = new PriorityQueue<>();
              for (int n : nums) {
                  heap.add(n);
                  if (heap.size() > k) heap.poll();
              }
              return heap.peek();
          }
      }
    `,
    checks: "",
  },
  "kth-largest-element-in-a-stream": {
    code: java`
      class KthLargest {
          private final int k;
          private final PriorityQueue<Integer> heap = new PriorityQueue<>();

          public KthLargest(int k, int[] nums) {
              this.k = k;
              for (int n : nums) add(n);
          }

          public int add(int val) {
              heap.add(val);
              if (heap.size() > k) heap.poll();
              return heap.peek();
          }
      }
    `,
    checks: "",
  },
  "last-stone-weight": {
    code: java`
      class Solution {
          public int lastStoneWeight(int[] stones) {
              PriorityQueue<Integer> heap =
                      new PriorityQueue<>(Collections.reverseOrder());
              for (int s : stones) heap.add(s);
              while (heap.size() > 1) {
                  int a = heap.poll(), b = heap.poll();
                  if (a != b) heap.add(a - b);
              }
              return heap.isEmpty() ? 0 : heap.peek();
          }
      }
    `,
    checks: "",
  },
  "k-closest-points-to-origin": {
    code: java`
      class Solution {
          public int[][] kClosest(int[][] points, int k) {
              PriorityQueue<int[]> heap = new PriorityQueue<>(
                      (a, b) -> dist(b) - dist(a));
              for (int[] p : points) {
                  heap.add(p);
                  if (heap.size() > k) heap.poll();
              }
              return heap.toArray(new int[0][]);
          }

          private int dist(int[] p) {
              return p[0] * p[0] + p[1] * p[1];
          }
      }
    `,
    checks: "",
  },
  "task-scheduler": {
    code: java`
      class Solution {
          public int leastInterval(char[] tasks, int n) {
              int[] counts = new int[26];
              for (char t : tasks) counts[t - 'A']++;
              int top = Arrays.stream(counts).max().getAsInt();
              int ties = 0;
              for (int c : counts) {
                  if (c == top) ties++;
              }
              return Math.max(tasks.length, (top - 1) * (n + 1) + ties);
          }
      }
    `,
    checks: "",
  },
  "find-median-from-data-stream": {
    code: java`
      class MedianFinder {
          private final PriorityQueue<Integer> low =
                  new PriorityQueue<>(Collections.reverseOrder());
          private final PriorityQueue<Integer> high = new PriorityQueue<>();

          public void addNum(int num) {
              low.add(num);
              high.add(low.poll());
              if (high.size() > low.size()) low.add(high.poll());
          }

          public double findMedian() {
              if (low.size() > high.size()) return low.peek();
              return (low.peek() + (double) high.peek()) / 2;
          }
      }
    `,
    checks: "",
  },
};
