import { js, type Solution } from "../types";

export const backtrackingJavascript: Record<string, Solution> = {
  "subsets": {
    code: js`
      function subsets(nums) {
        const result = [];
        const path = [];
        const dfs = (start) => {
          result.push([...path]);
          for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            dfs(i + 1);
            path.pop();
          }
        };
        dfs(0);
        return result;
      }
    `,
    checks: "",
  },
  "subsets-ii": {
    code: js`
      function subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        const result = [];
        const path = [];
        const dfs = (start) => {
          result.push([...path]);
          for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            path.push(nums[i]);
            dfs(i + 1);
            path.pop();
          }
        };
        dfs(0);
        return result;
      }
    `,
    checks: "",
  },
  "permutations": {
    code: js`
      function permute(nums) {
        const result = [];
        const path = [];
        const used = new Array(nums.length).fill(false);
        const dfs = () => {
          if (path.length === nums.length) {
            result.push([...path]);
            return;
          }
          for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            dfs();
            path.pop();
            used[i] = false;
          }
        };
        dfs();
        return result;
      }
    `,
    checks: "",
  },
  "permutations-ii": {
    code: js`
      function permuteUnique(nums) {
        nums.sort((a, b) => a - b);
        const result = [];
        const path = [];
        const used = new Array(nums.length).fill(false);
        const dfs = () => {
          if (path.length === nums.length) {
            result.push([...path]);
            return;
          }
          for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
            used[i] = true;
            path.push(nums[i]);
            dfs();
            path.pop();
            used[i] = false;
          }
        };
        dfs();
        return result;
      }
    `,
    checks: "",
  },
  "combination-sum": {
    code: js`
      function combinationSum(candidates, target) {
        const result = [];
        const path = [];
        const dfs = (start, remaining) => {
          if (remaining === 0) {
            result.push([...path]);
            return;
          }
          for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) continue;
            path.push(candidates[i]);
            dfs(i, remaining - candidates[i]);
            path.pop();
          }
        };
        dfs(0, target);
        return result;
      }
    `,
    checks: "",
  },
  "combination-sum-ii": {
    code: js`
      function combinationSum2(candidates, target) {
        candidates.sort((a, b) => a - b);
        const result = [];
        const path = [];
        const dfs = (start, remaining) => {
          if (remaining === 0) {
            result.push([...path]);
            return;
          }
          for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > remaining) break;
            path.push(candidates[i]);
            dfs(i + 1, remaining - candidates[i]);
            path.pop();
          }
        };
        dfs(0, target);
        return result;
      }
    `,
    checks: "",
  },
  "combinations": {
    code: js`
      function combine(n, k) {
        const result = [];
        const path = [];
        const dfs = (start) => {
          if (path.length === k) {
            result.push([...path]);
            return;
          }
          for (let i = start; i <= n; i++) {
            path.push(i);
            dfs(i + 1);
            path.pop();
          }
        };
        dfs(1);
        return result;
      }
    `,
    checks: "",
  },
  "generate-parentheses": {
    code: js`
      function generateParenthesis(n) {
        const result = [];
        const dfs = (current, open, close) => {
          if (current.length === 2 * n) {
            result.push(current);
            return;
          }
          if (open < n) dfs(current + "(", open + 1, close);
          if (close < open) dfs(current + ")", open, close + 1);
        };
        dfs("", 0, 0);
        return result;
      }
    `,
    checks: "",
  },
  "letter-combinations-of-a-phone-number": {
    code: js`
      function letterCombinations(digits) {
        if (!digits) return [];
        const keys = [
          "",
          "",
          "abc",
          "def",
          "ghi",
          "jkl",
          "mno",
          "pqrs",
          "tuv",
          "wxyz",
        ];
        const result = [];
        const dfs = (i, current) => {
          if (i === digits.length) {
            result.push(current);
            return;
          }
          for (const c of keys[Number(digits[i])]) dfs(i + 1, current + c);
        };
        dfs(0, "");
        return result;
      }
    `,
    checks: "",
  },
  "word-search": {
    code: js`
      function exist(board, word) {
        const rows = board.length;
        const cols = board[0].length;
        const dfs = (r, c, i) => {
          if (i === word.length) return true;
          if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
          if (board[r][c] !== word[i]) return false;
          board[r][c] = "#";
          const found =
            dfs(r + 1, c, i + 1) ||
            dfs(r - 1, c, i + 1) ||
            dfs(r, c + 1, i + 1) ||
            dfs(r, c - 1, i + 1);
          board[r][c] = word[i];
          return found;
        };
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (dfs(r, c, 0)) return true;
          }
        }
        return false;
      }
    `,
    checks: "",
  },
  "palindrome-partitioning": {
    code: js`
      function partition(s) {
        const result = [];
        const path = [];
        const isPal = (i, j) => {
          while (i < j) if (s[i++] !== s[j--]) return false;
          return true;
        };
        const dfs = (start) => {
          if (start === s.length) {
            result.push([...path]);
            return;
          }
          for (let end = start; end < s.length; end++) {
            if (!isPal(start, end)) continue;
            path.push(s.slice(start, end + 1));
            dfs(end + 1);
            path.pop();
          }
        };
        dfs(0);
        return result;
      }
    `,
    checks: "",
  },
  "n-queens": {
    code: js`
      function solveNQueens(n) {
        const result = [];
        const queens = [];
        const cols = new Set();
        const diag = new Set();
        const anti = new Set();
        const place = (r) => {
          if (r === n) {
            result.push(
              queens.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1)),
            );
            return;
          }
          for (let c = 0; c < n; c++) {
            if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
            cols.add(c);
            diag.add(r - c);
            anti.add(r + c);
            queens.push(c);
            place(r + 1);
            queens.pop();
            cols.delete(c);
            diag.delete(r - c);
            anti.delete(r + c);
          }
        };
        place(0);
        return result;
      }
    `,
    checks: "",
  },
  "pow-x-n": {
    code: js`
      function myPow(x, n) {
        if (n < 0) return 1 / myPow(x, -n);
        if (n === 0) return 1;
        const half = myPow(x, Math.floor(n / 2));
        return n % 2 ? half * half * x : half * half;
      }
    `,
    checks: "",
  },
  "restore-ip-addresses": {
    code: js`
      function restoreIpAddresses(s) {
        const result = [];
        const parts = [];
        const dfs = (start) => {
          if (parts.length === 4) {
            if (start === s.length) result.push(parts.join("."));
            return;
          }
          for (let len = 1; len <= 3 && start + len <= s.length; len++) {
            const part = s.slice(start, start + len);
            if ((part.length > 1 && part[0] === "0") || Number(part) > 255) break;
            parts.push(part);
            dfs(start + len);
            parts.pop();
          }
        };
        dfs(0);
        return result;
      }
    `,
    checks: "",
  },
};
