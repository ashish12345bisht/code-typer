import { py, type Solution } from "../types";

export const stackPython: Record<string, Solution> = {
  "valid-parentheses": {
    code: py`
      class Solution:
          def isValid(self, s: str) -> bool:
              pairs = {")": "(", "]": "[", "}": "{"}
              stack = []
              for c in s:
                  if c in pairs:
                      if not stack or stack.pop() != pairs[c]:
                          return False
                  else:
                      stack.append(c)
              return not stack
    `,
    checks: "",
  },
  "min-stack": {
    code: py`
      class MinStack:
          def __init__(self):
              self.stack = []
              self.mins = []

          def push(self, val: int) -> None:
              self.stack.append(val)
              self.mins.append(min(val, self.mins[-1]) if self.mins else val)

          def pop(self) -> None:
              self.stack.pop()
              self.mins.pop()

          def top(self) -> int:
              return self.stack[-1]

          def getMin(self) -> int:
              return self.mins[-1]
    `,
    checks: "",
  },
  "evaluate-reverse-polish-notation": {
    code: py`
      class Solution:
          def evalRPN(self, tokens: List[str]) -> int:
              stack = []
              for t in tokens:
                  if t not in "+-*/":
                      stack.append(int(t))
                      continue
                  b, a = stack.pop(), stack.pop()
                  if t == "+":
                      stack.append(a + b)
                  elif t == "-":
                      stack.append(a - b)
                  elif t == "*":
                      stack.append(a * b)
                  else:
                      stack.append(int(a / b))
              return stack[0]
    `,
    checks: "",
  },
  "daily-temperatures": {
    code: py`
      class Solution:
          def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
              result = [0] * len(temperatures)
              waiting = []
              for i, t in enumerate(temperatures):
                  while waiting and temperatures[waiting[-1]] < t:
                      j = waiting.pop()
                      result[j] = i - j
                  waiting.append(i)
              return result
    `,
    checks: "",
  },
  "car-fleet": {
    code: py`
      class Solution:
          def carFleet(
              self, target: int, position: List[int], speed: List[int]
          ) -> int:
              cars = sorted(zip(position, speed), reverse=True)
              fleets, slowest = 0, 0.0
              for pos, spd in cars:
                  time = (target - pos) / spd
                  if time > slowest:
                      fleets += 1
                      slowest = time
              return fleets
    `,
    checks: "",
  },
  "largest-rectangle-in-histogram": {
    code: py`
      class Solution:
          def largestRectangleArea(self, heights: List[int]) -> int:
              stack, best = [], 0
              for i, h in enumerate(heights + [0]):
                  while stack and heights[stack[-1]] >= h:
                      height = heights[stack.pop()]
                      left = stack[-1] + 1 if stack else 0
                      best = max(best, height * (i - left))
                  stack.append(i)
              return best
    `,
    checks: "",
  },
  "next-greater-element-i": {
    code: py`
      class Solution:
          def nextGreaterElement(
              self, nums1: List[int], nums2: List[int]
          ) -> List[int]:
              next_greater, stack = {}, []
              for n in nums2:
                  while stack and stack[-1] < n:
                      next_greater[stack.pop()] = n
                  stack.append(n)
              return [next_greater.get(n, -1) for n in nums1]
    `,
    checks: "",
  },
  "asteroid-collision": {
    code: py`
      class Solution:
          def asteroidCollision(self, asteroids: List[int]) -> List[int]:
              stack = []
              for a in asteroids:
                  alive = True
                  while alive and a < 0 and stack and stack[-1] > 0:
                      if stack[-1] < -a:
                          stack.pop()
                          continue
                      if stack[-1] == -a:
                          stack.pop()
                      alive = False
                  if alive:
                      stack.append(a)
              return stack
    `,
    checks: "",
  },
  "decode-string": {
    code: py`
      class Solution:
          def decodeString(self, s: str) -> str:
              stack = []
              current, k = "", 0
              for c in s:
                  if c.isdigit():
                      k = k * 10 + int(c)
                  elif c == "[":
                      stack.append((current, k))
                      current, k = "", 0
                  elif c == "]":
                      prev, count = stack.pop()
                      current = prev + current * count
                  else:
                      current += c
              return current
    `,
    checks: "",
  },
  "simplify-path": {
    code: py`
      class Solution:
          def simplifyPath(self, path: str) -> str:
              stack = []
              for part in path.split("/"):
                  if part == "..":
                      if stack:
                          stack.pop()
                  elif part and part != ".":
                      stack.append(part)
              return "/" + "/".join(stack)
    `,
    checks: "",
  },
  "remove-k-digits": {
    code: py`
      class Solution:
          def removeKdigits(self, num: str, k: int) -> str:
              stack = []
              for d in num:
                  while k > 0 and stack and stack[-1] > d:
                      stack.pop()
                      k -= 1
                  stack.append(d)
              if k:
                  stack = stack[:-k]
              return "".join(stack).lstrip("0") or "0"
    `,
    checks: "",
  },
  "implement-queue-using-stacks": {
    code: py`
      class MyQueue:
          def __init__(self):
              self.input = []
              self.output = []

          def push(self, x: int) -> None:
              self.input.append(x)

          def pop(self) -> int:
              self.peek()
              return self.output.pop()

          def peek(self) -> int:
              if not self.output:
                  while self.input:
                      self.output.append(self.input.pop())
              return self.output[-1]

          def empty(self) -> bool:
              return not self.input and not self.output
    `,
    checks: "",
  },
};
