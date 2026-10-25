import { java, type Solution } from "../types";

export const stackJava: Record<string, Solution> = {
  "valid-parentheses": {
    code: java`
      class Solution {
          public boolean isValid(String s) {
              Deque<Character> stack = new ArrayDeque<>();
              for (char c : s.toCharArray()) {
                  if (c == '(') stack.push(')');
                  else if (c == '[') stack.push(']');
                  else if (c == '{') stack.push('}');
                  else if (stack.isEmpty() || stack.pop() != c) return false;
              }
              return stack.isEmpty();
          }
      }
    `,
    checks: "",
  },
  "min-stack": {
    code: java`
      class MinStack {
          private final Deque<int[]> stack = new ArrayDeque<>();

          public void push(int val) {
              int min = stack.isEmpty() ? val : Math.min(val, getMin());
              stack.push(new int[] {val, min});
          }

          public void pop() {
              stack.pop();
          }

          public int top() {
              return stack.peek()[0];
          }

          public int getMin() {
              return stack.peek()[1];
          }
      }
    `,
    checks: "",
  },
  "evaluate-reverse-polish-notation": {
    code: java`
      class Solution {
          public int evalRPN(String[] tokens) {
              Deque<Integer> stack = new ArrayDeque<>();
              for (String t : tokens) {
                  if (!"+-*/".contains(t)) {
                      stack.push(Integer.parseInt(t));
                      continue;
                  }
                  int b = stack.pop(), a = stack.pop();
                  switch (t) {
                      case "+" -> stack.push(a + b);
                      case "-" -> stack.push(a - b);
                      case "*" -> stack.push(a * b);
                      default -> stack.push(a / b);
                  }
              }
              return stack.pop();
          }
      }
    `,
    checks: "",
  },
  "daily-temperatures": {
    code: java`
      class Solution {
          public int[] dailyTemperatures(int[] temperatures) {
              int[] result = new int[temperatures.length];
              Deque<Integer> waiting = new ArrayDeque<>();
              for (int i = 0; i < temperatures.length; i++) {
                  while (!waiting.isEmpty()
                          && temperatures[waiting.peek()] < temperatures[i]) {
                      int j = waiting.pop();
                      result[j] = i - j;
                  }
                  waiting.push(i);
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "car-fleet": {
    code: java`
      class Solution {
          public int carFleet(int target, int[] position, int[] speed) {
              int n = position.length;
              Integer[] order = new Integer[n];
              for (int i = 0; i < n; i++) order[i] = i;
              Arrays.sort(order, (a, b) -> position[b] - position[a]);
              int fleets = 0;
              double slowest = 0;
              for (int i : order) {
                  double time = (double) (target - position[i]) / speed[i];
                  if (time > slowest) {
                      fleets++;
                      slowest = time;
                  }
              }
              return fleets;
          }
      }
    `,
    checks: "",
  },
  "largest-rectangle-in-histogram": {
    code: java`
      class Solution {
          public int largestRectangleArea(int[] heights) {
              Deque<Integer> stack = new ArrayDeque<>();
              int best = 0, n = heights.length;
              for (int i = 0; i <= n; i++) {
                  int h = i == n ? 0 : heights[i];
                  while (!stack.isEmpty() && heights[stack.peek()] >= h) {
                      int height = heights[stack.pop()];
                      int left = stack.isEmpty() ? 0 : stack.peek() + 1;
                      best = Math.max(best, height * (i - left));
                  }
                  stack.push(i);
              }
              return best;
          }
      }
    `,
    checks: "",
  },
  "next-greater-element-i": {
    code: java`
      class Solution {
          public int[] nextGreaterElement(int[] nums1, int[] nums2) {
              Map<Integer, Integer> next = new HashMap<>();
              Deque<Integer> stack = new ArrayDeque<>();
              for (int n : nums2) {
                  while (!stack.isEmpty() && stack.peek() < n) {
                      next.put(stack.pop(), n);
                  }
                  stack.push(n);
              }
              int[] result = new int[nums1.length];
              for (int i = 0; i < nums1.length; i++) {
                  result[i] = next.getOrDefault(nums1[i], -1);
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "asteroid-collision": {
    code: java`
      class Solution {
          public int[] asteroidCollision(int[] asteroids) {
              Deque<Integer> stack = new ArrayDeque<>();
              for (int a : asteroids) {
                  boolean alive = true;
                  while (alive && a < 0 && !stack.isEmpty()
                          && stack.peek() > 0) {
                      if (stack.peek() < -a) {
                          stack.pop();
                          continue;
                      }
                      if (stack.peek() == -a) stack.pop();
                      alive = false;
                  }
                  if (alive) stack.push(a);
              }
              int[] result = new int[stack.size()];
              for (int i = result.length - 1; i >= 0; i--) {
                  result[i] = stack.pop();
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "decode-string": {
    code: java`
      class Solution {
          public String decodeString(String s) {
              Deque<StringBuilder> texts = new ArrayDeque<>();
              Deque<Integer> counts = new ArrayDeque<>();
              StringBuilder current = new StringBuilder();
              int k = 0;
              for (char c : s.toCharArray()) {
                  if (Character.isDigit(c)) {
                      k = k * 10 + (c - '0');
                  } else if (c == '[') {
                      texts.push(current);
                      counts.push(k);
                      current = new StringBuilder();
                      k = 0;
                  } else if (c == ']') {
                      String inner = current.toString().repeat(counts.pop());
                      current = texts.pop().append(inner);
                  } else {
                      current.append(c);
                  }
              }
              return current.toString();
          }
      }
    `,
    checks: "",
  },
  "simplify-path": {
    code: java`
      class Solution {
          public String simplifyPath(String path) {
              Deque<String> stack = new ArrayDeque<>();
              for (String part : path.split("/")) {
                  if (part.equals("..")) {
                      if (!stack.isEmpty()) stack.pollLast();
                  } else if (!part.isEmpty() && !part.equals(".")) {
                      stack.addLast(part);
                  }
              }
              return "/" + String.join("/", stack);
          }
      }
    `,
    checks: "",
  },
  "remove-k-digits": {
    code: java`
      class Solution {
          public String removeKdigits(String num, int k) {
              StringBuilder stack = new StringBuilder();
              for (char d : num.toCharArray()) {
                  while (k > 0 && stack.length() > 0
                          && stack.charAt(stack.length() - 1) > d) {
                      stack.deleteCharAt(stack.length() - 1);
                      k--;
                  }
                  stack.append(d);
              }
              stack.setLength(stack.length() - k);
              int i = 0;
              while (i < stack.length() && stack.charAt(i) == '0') i++;
              String result = stack.substring(i);
              return result.isEmpty() ? "0" : result;
          }
      }
    `,
    checks: "",
  },
  "implement-queue-using-stacks": {
    code: java`
      class MyQueue {
          private final Deque<Integer> input = new ArrayDeque<>();
          private final Deque<Integer> output = new ArrayDeque<>();

          public void push(int x) {
              input.push(x);
          }

          public int pop() {
              peek();
              return output.pop();
          }

          public int peek() {
              if (output.isEmpty()) {
                  while (!input.isEmpty()) output.push(input.pop());
              }
              return output.peek();
          }

          public boolean empty() {
              return input.isEmpty() && output.isEmpty();
          }
      }
    `,
    checks: "",
  },
};
