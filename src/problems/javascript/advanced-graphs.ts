import { js, type Solution } from "../types";

export const advancedGraphsJavascript: Record<string, Solution> = {
  "network-delay-time": {
    code: js`
      function networkDelayTime(times, n, k) {
        const graph = Array.from({ length: n + 1 }, () => []);
        for (const [u, v, w] of times) graph[u].push([v, w]);
        const dist = new Array(n + 1).fill(Infinity);
        const done = new Array(n + 1).fill(false);
        dist[k] = 0;
        for (let round = 0; round < n; round++) {
          let u = -1;
          for (let i = 1; i <= n; i++) {
            if (!done[i] && (u === -1 || dist[i] < dist[u])) u = i;
          }
          if (dist[u] === Infinity) break;
          done[u] = true;
          for (const [v, w] of graph[u]) dist[v] = Math.min(dist[v], dist[u] + w);
        }
        const worst = Math.max(...dist.slice(1));
        return worst === Infinity ? -1 : worst;
      }
    `,
    checks: "",
  },
  "cheapest-flights-within-k-stops": {
    code: js`
      function findCheapestPrice(n, flights, src, dst, k) {
        let cost = new Array(n).fill(Infinity);
        cost[src] = 0;
        for (let i = 0; i <= k; i++) {
          const next = [...cost];
          for (const [from, to, price] of flights) {
            if (cost[from] === Infinity) continue;
            next[to] = Math.min(next[to], cost[from] + price);
          }
          cost = next;
        }
        return cost[dst] === Infinity ? -1 : cost[dst];
      }
    `,
    checks: "",
  },
  "min-cost-to-connect-all-points": {
    code: js`
      function minCostConnectPoints(points) {
        const n = points.length;
        const best = new Array(n).fill(Infinity);
        const inTree = new Array(n).fill(false);
        best[0] = 0;
        let total = 0;
        for (let round = 0; round < n; round++) {
          let u = -1;
          for (let i = 0; i < n; i++) {
            if (!inTree[i] && (u === -1 || best[i] < best[u])) u = i;
          }
          inTree[u] = true;
          total += best[u];
          for (let v = 0; v < n; v++) {
            if (inTree[v]) continue;
            const d =
              Math.abs(points[u][0] - points[v][0]) +
              Math.abs(points[u][1] - points[v][1]);
            best[v] = Math.min(best[v], d);
          }
        }
        return total;
      }
    `,
    checks: "",
  },
  "alien-dictionary": {
    code: js`
      function alienOrder(words) {
        const graph = new Map();
        const indegree = new Map();
        for (const w of words) {
          for (const c of w) {
            graph.set(c, new Set());
            indegree.set(c, 0);
          }
        }
        for (let i = 0; i + 1 < words.length; i++) {
          const a = words[i];
          const b = words[i + 1];
          if (a.length > b.length && a.startsWith(b)) return "";
          for (let j = 0; j < Math.min(a.length, b.length); j++) {
            if (a[j] === b[j]) continue;
            if (!graph.get(a[j]).has(b[j])) {
              graph.get(a[j]).add(b[j]);
              indegree.set(b[j], indegree.get(b[j]) + 1);
            }
            break;
          }
        }
        const queue = [...indegree].filter(([, d]) => d === 0).map(([c]) => c);
        let order = "";
        while (queue.length) {
          const c = queue.shift();
          order += c;
          for (const next of graph.get(c)) {
            indegree.set(next, indegree.get(next) - 1);
            if (indegree.get(next) === 0) queue.push(next);
          }
        }
        return order.length === indegree.size ? order : "";
      }
    `,
    checks: "",
  },
  "swim-in-rising-water": {
    code: js`
      function swimInWater(grid) {
        const n = grid.length;
        const canReach = (level) => {
          if (grid[0][0] > level) return false;
          const seen = new Set([0]);
          const stack = [0];
          while (stack.length) {
            const cell = stack.pop();
            const r = Math.floor(cell / n);
            const c = cell % n;
            if (r === n - 1 && c === n - 1) return true;
            const neighbors = [
              [r + 1, c],
              [r - 1, c],
              [r, c + 1],
              [r, c - 1],
            ];
            for (const [nr, nc] of neighbors) {
              if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
              const key = nr * n + nc;
              if (seen.has(key) || grid[nr][nc] > level) continue;
              seen.add(key);
              stack.push(key);
            }
          }
          return false;
        };
        let lo = 0;
        let hi = n * n - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (canReach(mid)) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "reconstruct-itinerary": {
    code: js`
      function findItinerary(tickets) {
        const graph = new Map();
        for (const [from, to] of tickets) {
          if (!graph.has(from)) graph.set(from, []);
          graph.get(from).push(to);
        }
        for (const list of graph.values()) list.sort().reverse();
        const route = [];
        const visit = (airport) => {
          const next = graph.get(airport) ?? [];
          while (next.length) visit(next.pop());
          route.push(airport);
        };
        visit("JFK");
        return route.reverse();
      }
    `,
    checks: "",
  },
  "accounts-merge": {
    code: js`
      function accountsMerge(accounts) {
        const parent = new Map();
        const owner = new Map();
        const find = (x) => {
          while (parent.get(x) !== x) x = parent.get(x);
          return x;
        };
        for (const [name, ...emails] of accounts) {
          for (const email of emails) {
            if (!parent.has(email)) parent.set(email, email);
            owner.set(email, name);
            parent.set(find(email), find(emails[0]));
          }
        }
        const groups = new Map();
        for (const email of parent.keys()) {
          const root = find(email);
          if (!groups.has(root)) groups.set(root, []);
          groups.get(root).push(email);
        }
        return [...groups.values()].map((emails) => [
          owner.get(emails[0]),
          ...emails.sort(),
        ]);
      }
    `,
    checks: "",
  },
  "number-of-provinces": {
    code: js`
      function findCircleNum(isConnected) {
        const n = isConnected.length;
        const seen = new Array(n).fill(false);
        const visit = (i) => {
          seen[i] = true;
          for (let j = 0; j < n; j++) {
            if (isConnected[i][j] && !seen[j]) visit(j);
          }
        };
        let provinces = 0;
        for (let i = 0; i < n; i++) {
          if (!seen[i]) {
            provinces++;
            visit(i);
          }
        }
        return provinces;
      }
    `,
    checks: "",
  },
  "path-with-minimum-effort": {
    code: js`
      function minimumEffortPath(heights) {
        const rows = heights.length;
        const cols = heights[0].length;
        const canReach = (limit) => {
          const seen = new Set([0]);
          const stack = [0];
          while (stack.length) {
            const cell = stack.pop();
            const r = Math.floor(cell / cols);
            const c = cell % cols;
            if (r === rows - 1 && c === cols - 1) return true;
            const neighbors = [
              [r + 1, c],
              [r - 1, c],
              [r, c + 1],
              [r, c - 1],
            ];
            for (const [nr, nc] of neighbors) {
              if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
              const key = nr * cols + nc;
              const step = Math.abs(heights[nr][nc] - heights[r][c]);
              if (seen.has(key) || step > limit) continue;
              seen.add(key);
              stack.push(key);
            }
          }
          return false;
        };
        let lo = 0;
        let hi = 1_000_000;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (canReach(mid)) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    `,
    checks: "",
  },
  "find-eventual-safe-states": {
    code: js`
      function eventualSafeNodes(graph) {
        const state = new Array(graph.length).fill(0);
        const safe = (node) => {
          if (state[node] !== 0) return state[node] === 2;
          state[node] = 1;
          for (const next of graph[node]) {
            if (!safe(next)) return false;
          }
          state[node] = 2;
          return true;
        };
        return graph.map((_, i) => i).filter(safe);
      }
    `,
    checks: "",
  },
};
