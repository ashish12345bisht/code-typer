import { cpp, type Solution } from "../types";

export const stackCpp: Record<string, Solution> = {
  "valid-parentheses": {
    code: cpp`
      class Solution {
      public:
          bool isValid(string s) {
              stack<char> st;
              for (char c : s) {
                  if (c == '(' || c == '[' || c == '{') {
                      st.push(c);
                      continue;
                  }
                  if (st.empty()) return false;
                  char open = st.top();
                  st.pop();
                  if ((c == ')' && open != '(') || (c == ']' && open != '[') ||
                      (c == '}' && open != '{')) {
                      return false;
                  }
              }
              return st.empty();
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isValid("()[]{}") == true);
      CHECK(Solution().isValid("(]") == false);
      CHECK(Solution().isValid("([)]") == false);
      CHECK(Solution().isValid("{[]}") == true);
      CHECK(Solution().isValid("]") == false);
    `,
  },
  "min-stack": {
    code: cpp`
      class MinStack {
      public:
          void push(int val) {
              st.push(val);
              mins.push(mins.empty() ? val : min(mins.top(), val));
          }

          void pop() {
              st.pop();
              mins.pop();
          }

          int top() { return st.top(); }

          int getMin() { return mins.top(); }

      private:
          stack<int> st, mins;
      };
    `,
    checks: cpp`
      MinStack s;
      s.push(-2);
      s.push(0);
      s.push(-3);
      CHECK(s.getMin() == -3);
      s.pop();
      CHECK(s.top() == 0);
      CHECK(s.getMin() == -2);
    `,
  },
  "evaluate-reverse-polish-notation": {
    code: cpp`
      class Solution {
      public:
          int evalRPN(vector<string>& tokens) {
              stack<int> st;
              for (const string& t : tokens) {
                  if (t != "+" && t != "-" && t != "*" && t != "/") {
                      st.push(stoi(t));
                      continue;
                  }
                  int b = st.top();
                  st.pop();
                  int a = st.top();
                  st.pop();
                  if (t == "+") st.push(a + b);
                  else if (t == "-") st.push(a - b);
                  else if (t == "*") st.push(a * b);
                  else st.push(a / b);
              }
              return st.top();
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().evalRPN(lv(VS{"2", "1", "+", "3", "*"})) == 9);
      CHECK(Solution().evalRPN(lv(VS{"4", "13", "5", "/", "+"})) == 6);
      CHECK(Solution().evalRPN(lv(VS{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"})) == 22);
    `,
  },
  "daily-temperatures": {
    code: cpp`
      class Solution {
      public:
          vector<int> dailyTemperatures(vector<int>& temperatures) {
              vector<int> result(temperatures.size());
              stack<int> waiting;
              for (int i = 0; i < temperatures.size(); i++) {
                  while (!waiting.empty() &&
                         temperatures[waiting.top()] < temperatures[i]) {
                      result[waiting.top()] = i - waiting.top();
                      waiting.pop();
                  }
                  waiting.push(i);
              }
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().dailyTemperatures(lv(VI{73, 74, 75, 71, 69, 72, 76, 73})) == VI{1, 1, 4, 2, 1, 1, 0, 0});
      CHECK(Solution().dailyTemperatures(lv(VI{30, 60, 90})) == VI{1, 1, 0});
    `,
  },
  "car-fleet": {
    code: cpp`
      class Solution {
      public:
          int carFleet(int target, vector<int>& position, vector<int>& speed) {
              vector<pair<int, double>> cars;
              for (int i = 0; i < position.size(); i++) {
                  double time = (double)(target - position[i]) / speed[i];
                  cars.push_back({position[i], time});
              }
              sort(cars.rbegin(), cars.rend());
              int fleets = 0;
              double slowest = 0;
              for (auto& [pos, time] : cars) {
                  if (time > slowest) {
                      fleets++;
                      slowest = time;
                  }
              }
              return fleets;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().carFleet(12, lv(VI{10, 8, 0, 5, 3}), lv(VI{2, 4, 1, 1, 3})) == 3);
      CHECK(Solution().carFleet(100, lv(VI{0, 2, 4}), lv(VI{4, 2, 1})) == 1);
    `,
  },
  "largest-rectangle-in-histogram": {
    code: cpp`
      class Solution {
      public:
          int largestRectangleArea(vector<int>& heights) {
              stack<int> st;
              int best = 0, n = heights.size();
              for (int i = 0; i <= n; i++) {
                  int h = i == n ? 0 : heights[i];
                  while (!st.empty() && heights[st.top()] >= h) {
                      int height = heights[st.top()];
                      st.pop();
                      int left = st.empty() ? 0 : st.top() + 1;
                      best = max(best, height * (i - left));
                  }
                  st.push(i);
              }
              return best;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().largestRectangleArea(lv(VI{2, 1, 5, 6, 2, 3})) == 10);
      CHECK(Solution().largestRectangleArea(lv(VI{2, 4})) == 4);
    `,
  },
  "next-greater-element-i": {
    code: cpp`
      class Solution {
      public:
          vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
              unordered_map<int, int> next;
              stack<int> st;
              for (int n : nums2) {
                  while (!st.empty() && st.top() < n) {
                      next[st.top()] = n;
                      st.pop();
                  }
                  st.push(n);
              }
              vector<int> result;
              for (int n : nums1) result.push_back(next.count(n) ? next[n] : -1);
              return result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().nextGreaterElement(lv(VI{4, 1, 2}), lv(VI{1, 3, 4, 2})) == VI{-1, 3, -1});
      CHECK(Solution().nextGreaterElement(lv(VI{2, 4}), lv(VI{1, 2, 3, 4})) == VI{3, -1});
    `,
  },
  "asteroid-collision": {
    code: cpp`
      class Solution {
      public:
          vector<int> asteroidCollision(vector<int>& asteroids) {
              vector<int> st;
              for (int a : asteroids) {
                  bool alive = true;
                  while (alive && a < 0 && !st.empty() && st.back() > 0) {
                      if (st.back() < -a) {
                          st.pop_back();
                          continue;
                      }
                      if (st.back() == -a) st.pop_back();
                      alive = false;
                  }
                  if (alive) st.push_back(a);
              }
              return st;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().asteroidCollision(lv(VI{5, 10, -5})) == VI{5, 10});
      CHECK(Solution().asteroidCollision(lv(VI{8, -8})).empty());
      CHECK(Solution().asteroidCollision(lv(VI{10, 2, -5})) == VI{10});
    `,
  },
  "decode-string": {
    code: cpp`
      class Solution {
      public:
          string decodeString(string s) {
              stack<int> counts;
              stack<string> parts;
              string current;
              int k = 0;
              for (char c : s) {
                  if (isdigit(c)) {
                      k = k * 10 + (c - '0');
                  } else if (c == '[') {
                      counts.push(k);
                      parts.push(current);
                      current = "";
                      k = 0;
                  } else if (c == ']') {
                      string repeated;
                      for (int i = 0; i < counts.top(); i++) repeated += current;
                      current = parts.top() + repeated;
                      counts.pop();
                      parts.pop();
                  } else {
                      current += c;
                  }
              }
              return current;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().decodeString("3[a]2[bc]") == "aaabcbc");
      CHECK(Solution().decodeString("3[a2[c]]") == "accaccacc");
      CHECK(Solution().decodeString("2[abc]3[cd]ef") == "abcabccdcdcdef");
    `,
  },
  "simplify-path": {
    code: cpp`
      class Solution {
      public:
          string simplifyPath(string path) {
              vector<string> dirs;
              stringstream ss(path);
              string part;
              while (getline(ss, part, '/')) {
                  if (part.empty() || part == ".") continue;
                  if (part == "..") {
                      if (!dirs.empty()) dirs.pop_back();
                  } else {
                      dirs.push_back(part);
                  }
              }
              string result;
              for (const string& d : dirs) result += "/" + d;
              return result.empty() ? "/" : result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().simplifyPath("/home//foo/") == "/home/foo");
      CHECK(Solution().simplifyPath("/a/./b/../../c/") == "/c");
      CHECK(Solution().simplifyPath("/../") == "/");
    `,
  },
  "remove-k-digits": {
    code: cpp`
      class Solution {
      public:
          string removeKdigits(string num, int k) {
              string st;
              for (char d : num) {
                  while (k > 0 && !st.empty() && st.back() > d) {
                      st.pop_back();
                      k--;
                  }
                  st.push_back(d);
              }
              st.resize(st.size() - k);
              int start = 0;
              while (start < st.size() && st[start] == '0') start++;
              string result = st.substr(start);
              return result.empty() ? "0" : result;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().removeKdigits("1432219", 3) == "1219");
      CHECK(Solution().removeKdigits("10200", 1) == "200");
      CHECK(Solution().removeKdigits("10", 2) == "0");
    `,
  },
  "implement-queue-using-stacks": {
    code: cpp`
      class MyQueue {
      public:
          void push(int x) { input.push(x); }

          int pop() {
              int front = peek();
              output.pop();
              return front;
          }

          int peek() {
              if (output.empty()) {
                  while (!input.empty()) {
                      output.push(input.top());
                      input.pop();
                  }
              }
              return output.top();
          }

          bool empty() { return input.empty() && output.empty(); }

      private:
          stack<int> input, output;
      };
    `,
    checks: cpp`
      MyQueue q;
      q.push(1);
      q.push(2);
      CHECK(q.peek() == 1);
      CHECK(q.pop() == 1);
      CHECK(q.empty() == false);
      CHECK(q.pop() == 2);
      CHECK(q.empty() == true);
    `,
  },
};
