import { js, type Solution } from "../types";

export const heapJavascript: Record<string, Solution> = {
  "kth-largest-element-in-an-array": {
    code: js`
      function findKthLargest(nums, k) {
        const target = nums.length - k;
        let lo = 0;
        let hi = nums.length - 1;
        while (true) {
          const pivot = nums[hi];
          let store = lo;
          for (let i = lo; i < hi; i++) {
            if (nums[i] < pivot) {
              [nums[i], nums[store]] = [nums[store], nums[i]];
              store++;
            }
          }
          [nums[store], nums[hi]] = [nums[hi], nums[store]];
          if (store === target) return nums[store];
          if (store < target) lo = store + 1;
          else hi = store - 1;
        }
      }
    `,
    checks: "",
  },
  "kth-largest-element-in-a-stream": {
    code: js`
      class KthLargest {
        k;
        heap = [];

        constructor(k, nums) {
          this.k = k;
          for (const n of nums) this.add(n);
        }

        add(val) {
          const h = this.heap;
          h.push(val);
          let i = h.length - 1;
          while (i > 0) {
            const parent = (i - 1) >> 1;
            if (h[parent] <= h[i]) break;
            [h[parent], h[i]] = [h[i], h[parent]];
            i = parent;
          }
          if (h.length > this.k) this.popMin();
          return h[0];
        }

        popMin() {
          const h = this.heap;
          h[0] = h.pop();
          let i = 0;
          while (true) {
            const l = 2 * i + 1;
            const r = l + 1;
            let smallest = i;
            if (l < h.length && h[l] < h[smallest]) smallest = l;
            if (r < h.length && h[r] < h[smallest]) smallest = r;
            if (smallest === i) return;
            [h[smallest], h[i]] = [h[i], h[smallest]];
            i = smallest;
          }
        }
      }
    `,
    checks: "",
  },
  "last-stone-weight": {
    code: js`
      function lastStoneWeight(stones) {
        while (stones.length > 1) {
          stones.sort((a, b) => a - b);
          const y = stones.pop();
          const x = stones.pop();
          if (y > x) stones.push(y - x);
        }
        return stones[0] ?? 0;
      }
    `,
    checks: "",
  },
  "k-closest-points-to-origin": {
    code: js`
      function kClosest(points, k) {
        const dist = (p) => p[0] * p[0] + p[1] * p[1];
        return points.sort((a, b) => dist(a) - dist(b)).slice(0, k);
      }
    `,
    checks: "",
  },
  "task-scheduler": {
    code: js`
      function leastInterval(tasks, n) {
        const counts = new Map();
        for (const t of tasks) counts.set(t, (counts.get(t) ?? 0) + 1);
        const values = [...counts.values()];
        const maxCount = Math.max(...values);
        const withMax = values.filter((c) => c === maxCount).length;
        return Math.max(tasks.length, (maxCount - 1) * (n + 1) + withMax);
      }
    `,
    checks: "",
  },
  "find-median-from-data-stream": {
    code: js`
      class Heap {
        before;
        data = [];

        constructor(before) {
          this.before = before;
        }

        get size() {
          return this.data.length;
        }

        peek() {
          return this.data[0];
        }

        push(value) {
          const d = this.data;
          d.push(value);
          let i = d.length - 1;
          while (i > 0) {
            const p = (i - 1) >> 1;
            if (!this.before(d[i], d[p])) break;
            [d[i], d[p]] = [d[p], d[i]];
            i = p;
          }
        }

        pop() {
          const d = this.data;
          const top = d[0];
          const last = d.pop();
          if (d.length > 0) {
            d[0] = last;
            let i = 0;
            while (true) {
              const l = 2 * i + 1;
              const r = l + 1;
              let best = i;
              if (l < d.length && this.before(d[l], d[best])) best = l;
              if (r < d.length && this.before(d[r], d[best])) best = r;
              if (best === i) break;
              [d[i], d[best]] = [d[best], d[i]];
              i = best;
            }
          }
          return top;
        }
      }
      class MedianFinder {
        low = new Heap((a, b) => a > b);
        high = new Heap((a, b) => a < b);

        addNum(num) {
          this.low.push(num);
          this.high.push(this.low.pop());
          if (this.high.size > this.low.size) this.low.push(this.high.pop());
        }

        findMedian() {
          if (this.low.size > this.high.size) return this.low.peek();
          return (this.low.peek() + this.high.peek()) / 2;
        }
      }
    `,
    checks: "",
  },
};
