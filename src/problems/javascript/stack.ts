import { js, type Solution } from "../types";

export const stackJavascript: Record<string, Solution> = {
  "valid-parentheses": {
    code: js`
      function isValid(s) {
        const pairs = { ")": "(", "]": "[", "}": "{" };
        const stack = [];
        for (const c of s) {
          if (c in pairs) {
            if (stack.pop() !== pairs[c]) return false;
          } else {
            stack.push(c);
          }
        }
        return stack.length === 0;
      }
    `,
    checks: "",
  },
  "min-stack": {
    code: js`
      class MinStack {
        stack = [];
        mins = [];

        push(val) {
          this.stack.push(val);
          const min = this.mins.length ? this.getMin() : val;
          this.mins.push(Math.min(min, val));
        }

        pop() {
          this.stack.pop();
          this.mins.pop();
        }

        top() {
          return this.stack[this.stack.length - 1];
        }

        getMin() {
          return this.mins[this.mins.length - 1];
        }
      }
    `,
    checks: "",
  },
  "evaluate-reverse-polish-notation": {
    code: js`
      function evalRPN(tokens) {
        const stack = [];
        for (const t of tokens) {
          if (!["+", "-", "*", "/"].includes(t)) {
            stack.push(Number(t));
            continue;
          }
          const b = stack.pop();
          const a = stack.pop();
          if (t === "+") stack.push(a + b);
          else if (t === "-") stack.push(a - b);
          else if (t === "*") stack.push(a * b);
          else stack.push(Math.trunc(a / b));
        }
        return stack[0];
      }
    `,
    checks: "",
  },
  "daily-temperatures": {
    code: js`
      function dailyTemperatures(temperatures) {
        const result = new Array(temperatures.length).fill(0);
        const stack = [];
        temperatures.forEach((t, i) => {
          while (stack.length && temperatures[stack[stack.length - 1]] < t) {
            const j = stack.pop();
            result[j] = i - j;
          }
          stack.push(i);
        });
        return result;
      }
    `,
    checks: "",
  },
  "car-fleet": {
    code: js`
      function carFleet(target, position, speed) {
        const cars = position
          .map((p, i) => [p, (target - p) / speed[i]])
          .sort((a, b) => b[0] - a[0]);
        let fleets = 0;
        let slowest = 0;
        for (const [, time] of cars) {
          if (time > slowest) {
            fleets++;
            slowest = time;
          }
        }
        return fleets;
      }
    `,
    checks: "",
  },
  "largest-rectangle-in-histogram": {
    code: js`
      function largestRectangleArea(heights) {
        const stack = [];
        let best = 0;
        for (let i = 0; i <= heights.length; i++) {
          const h = i === heights.length ? 0 : heights[i];
          while (stack.length && heights[stack[stack.length - 1]] >= h) {
            const height = heights[stack.pop()];
            const left = stack.length ? stack[stack.length - 1] + 1 : 0;
            best = Math.max(best, height * (i - left));
          }
          stack.push(i);
        }
        return best;
      }
    `,
    checks: "",
  },
  "next-greater-element-i": {
    code: js`
      function nextGreaterElement(nums1, nums2) {
        const next = new Map();
        const stack = [];
        for (const n of nums2) {
          while (stack.length && stack[stack.length - 1] < n) {
            next.set(stack.pop(), n);
          }
          stack.push(n);
        }
        return nums1.map((n) => next.get(n) ?? -1);
      }
    `,
    checks: "",
  },
  "asteroid-collision": {
    code: js`
      function asteroidCollision(asteroids) {
        const stack = [];
        for (const a of asteroids) {
          let alive = true;
          while (alive && a < 0 && stack.length && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];
            if (top < -a) stack.pop();
            else {
              if (top === -a) stack.pop();
              alive = false;
            }
          }
          if (alive) stack.push(a);
        }
        return stack;
      }
    `,
    checks: "",
  },
  "decode-string": {
    code: js`
      function decodeString(s) {
        const counts = [];
        const parts = [];
        let current = "";
        let k = 0;
        for (const c of s) {
          if (c >= "0" && c <= "9") {
            k = k * 10 + Number(c);
          } else if (c === "[") {
            counts.push(k);
            parts.push(current);
            current = "";
            k = 0;
          } else if (c === "]") {
            current = parts.pop() + current.repeat(counts.pop());
          } else {
            current += c;
          }
        }
        return current;
      }
    `,
    checks: "",
  },
  "simplify-path": {
    code: js`
      function simplifyPath(path) {
        const stack = [];
        for (const part of path.split("/")) {
          if (part === "" || part === ".") continue;
          if (part === "..") stack.pop();
          else stack.push(part);
        }
        return "/" + stack.join("/");
      }
    `,
    checks: "",
  },
  "remove-k-digits": {
    code: js`
      function removeKdigits(num, k) {
        const stack = [];
        for (const d of num) {
          while (k > 0 && stack.length && stack[stack.length - 1] > d) {
            stack.pop();
            k--;
          }
          stack.push(d);
        }
        stack.length -= k;
        const result = stack.join("").replace(/^0+/, "");
        return result || "0";
      }
    `,
    checks: "",
  },
  "implement-queue-using-stacks": {
    code: js`
      class MyQueue {
        input = [];
        output = [];

        push(x) {
          this.input.push(x);
        }

        pop() {
          this.peek();
          return this.output.pop();
        }

        peek() {
          if (this.output.length === 0) {
            while (this.input.length) this.output.push(this.input.pop());
          }
          return this.output[this.output.length - 1];
        }

        empty() {
          return this.input.length === 0 && this.output.length === 0;
        }
      }
    `,
    checks: "",
  },
};
