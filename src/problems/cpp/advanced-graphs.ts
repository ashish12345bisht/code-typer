import { cpp, type Solution } from "../types";

export const advancedGraphsCpp: Record<string, Solution> = {
  "network-delay-time": {
    code: cpp`
      class Solution {
      public:
          int networkDelayTime(vector<vector<int>>& times, int n, int k) {
              vector<vector<pair<int, int>>> graph(n + 1);
              for (auto& t : times) graph[t[0]].push_back({t[1], t[2]});
              vector<int> dist(n + 1, INT_MAX);
              vector<bool> done(n + 1);
              dist[k] = 0;
              for (int round = 0; round < n; round++) {
                  int u = -1;
                  for (int i = 1; i <= n; i++) {
                      if (!done[i] && (u == -1 || dist[i] < dist[u])) u = i;
                  }
                  if (dist[u] == INT_MAX) break;
                  done[u] = true;
                  for (auto [v, w] : graph[u]) dist[v] = min(dist[v], dist[u] + w);
              }
              int worst = *max_element(dist.begin() + 1, dist.end());
              return worst == INT_MAX ? -1 : worst;
          }
      };
    `,
    checks: "",
  },
  "cheapest-flights-within-k-stops": {
    code: cpp`
      class Solution {
      public:
          int findCheapestPrice(int n, vector<vector<int>>& flights, int src,
                                int dst, int k) {
              vector<int> cost(n, INT_MAX);
              cost[src] = 0;
              for (int i = 0; i <= k; i++) {
                  vector<int> next = cost;
                  for (auto& f : flights) {
                      if (cost[f[0]] == INT_MAX) continue;
                      next[f[1]] = min(next[f[1]], cost[f[0]] + f[2]);
                  }
                  cost = next;
              }
              return cost[dst] == INT_MAX ? -1 : cost[dst];
          }
      };
    `,
    checks: "",
  },
  "min-cost-to-connect-all-points": {
    code: cpp`
      class Solution {
      public:
          int minCostConnectPoints(vector<vector<int>>& points) {
              int n = points.size(), total = 0;
              vector<int> best(n, INT_MAX);
              vector<bool> inTree(n);
              best[0] = 0;
              for (int round = 0; round < n; round++) {
                  int u = -1;
                  for (int i = 0; i < n; i++) {
                      if (!inTree[i] && (u == -1 || best[i] < best[u])) u = i;
                  }
                  inTree[u] = true;
                  total += best[u];
                  for (int v = 0; v < n; v++) {
                      if (inTree[v]) continue;
                      int d = abs(points[u][0] - points[v][0]) +
                              abs(points[u][1] - points[v][1]);
                      best[v] = min(best[v], d);
                  }
              }
              return total;
          }
      };
    `,
    checks: "",
  },
  "alien-dictionary": {
    code: cpp`
      class Solution {
      public:
          string alienOrder(vector<string>& words) {
              map<char, set<char>> graph;
              map<char, int> indegree;
              for (auto& w : words) {
                  for (char c : w) indegree[c] = 0;
              }
              for (int i = 0; i + 1 < words.size(); i++) {
                  const string &a = words[i], &b = words[i + 1];
                  if (a.size() > b.size() && a.compare(0, b.size(), b) == 0) {
                      return "";
                  }
                  for (int j = 0; j < min(a.size(), b.size()); j++) {
                      if (a[j] == b[j]) continue;
                      if (graph[a[j]].insert(b[j]).second) indegree[b[j]]++;
                      break;
                  }
              }
              queue<char> q;
              for (auto [c, d] : indegree) {
                  if (d == 0) q.push(c);
              }
              string order;
              while (!q.empty()) {
                  char c = q.front();
                  q.pop();
                  order += c;
                  for (char next : graph[c]) {
                      if (--indegree[next] == 0) q.push(next);
                  }
              }
              return order.size() == indegree.size() ? order : "";
          }
      };
    `,
    checks: "",
  },
  "swim-in-rising-water": {
    code: cpp`
      class Solution {
      public:
          int swimInWater(vector<vector<int>>& grid) {
              int n = grid.size(), lo = 0, hi = n * n - 1;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (canReach(grid, mid)) hi = mid;
                  else lo = mid + 1;
              }
              return lo;
          }

      private:
          bool canReach(vector<vector<int>>& grid, int level) {
              int n = grid.size();
              if (grid[0][0] > level) return false;
              vector<vector<bool>> seen(n, vector<bool>(n));
              stack<pair<int, int>> st;
              st.push({0, 0});
              seen[0][0] = true;
              int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!st.empty()) {
                  auto [r, c] = st.top();
                  st.pop();
                  if (r == n - 1 && c == n - 1) return true;
                  for (auto& d : dirs) {
                      int nr = r + d[0], nc = c + d[1];
                      if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
                      if (seen[nr][nc] || grid[nr][nc] > level) continue;
                      seen[nr][nc] = true;
                      st.push({nr, nc});
                  }
              }
              return false;
          }
      };
    `,
    checks: "",
  },
  "reconstruct-itinerary": {
    code: cpp`
      class Solution {
      public:
          vector<string> findItinerary(vector<vector<string>>& tickets) {
              for (auto& t : tickets) graph[t[0]].push_back(t[1]);
              for (auto& [from, list] : graph) {
                  sort(list.rbegin(), list.rend());
              }
              visit("JFK");
              reverse(route.begin(), route.end());
              return route;
          }

      private:
          unordered_map<string, vector<string>> graph;
          vector<string> route;

          void visit(const string& airport) {
              auto& next = graph[airport];
              while (!next.empty()) {
                  string to = next.back();
                  next.pop_back();
                  visit(to);
              }
              route.push_back(airport);
          }
      };
    `,
    checks: "",
  },
  "accounts-merge": {
    code: cpp`
      class Solution {
      public:
          vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
              unordered_map<string, string> owner;
              for (auto& acc : accounts) {
                  for (int i = 1; i < acc.size(); i++) {
                      if (!parent.count(acc[i])) parent[acc[i]] = acc[i];
                      owner[acc[i]] = acc[0];
                      parent[find(acc[i])] = find(acc[1]);
                  }
              }
              map<string, vector<string>> groups;
              for (auto& [email, p] : parent) groups[find(email)].push_back(email);
              vector<vector<string>> result;
              for (auto& [root, emails] : groups) {
                  sort(emails.begin(), emails.end());
                  emails.insert(emails.begin(), owner[root]);
                  result.push_back(emails);
              }
              return result;
          }

      private:
          unordered_map<string, string> parent;

          string find(string x) {
              while (parent[x] != x) x = parent[x];
              return x;
          }
      };
    `,
    checks: "",
  },
  "number-of-provinces": {
    code: cpp`
      class Solution {
      public:
          int findCircleNum(vector<vector<int>>& isConnected) {
              int n = isConnected.size(), provinces = 0;
              vector<bool> seen(n);
              for (int i = 0; i < n; i++) {
                  if (!seen[i]) {
                      provinces++;
                      visit(isConnected, seen, i);
                  }
              }
              return provinces;
          }

      private:
          void visit(vector<vector<int>>& g, vector<bool>& seen, int i) {
              seen[i] = true;
              for (int j = 0; j < g.size(); j++) {
                  if (g[i][j] && !seen[j]) visit(g, seen, j);
              }
          }
      };
    `,
    checks: "",
  },
  "path-with-minimum-effort": {
    code: cpp`
      class Solution {
      public:
          int minimumEffortPath(vector<vector<int>>& heights) {
              int lo = 0, hi = 1000000;
              while (lo < hi) {
                  int mid = lo + (hi - lo) / 2;
                  if (canReach(heights, mid)) hi = mid;
                  else lo = mid + 1;
              }
              return lo;
          }

      private:
          bool canReach(vector<vector<int>>& h, int limit) {
              int rows = h.size(), cols = h[0].size();
              vector<vector<bool>> seen(rows, vector<bool>(cols));
              stack<pair<int, int>> st;
              st.push({0, 0});
              seen[0][0] = true;
              int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!st.empty()) {
                  auto [r, c] = st.top();
                  st.pop();
                  if (r == rows - 1 && c == cols - 1) return true;
                  for (auto& d : dirs) {
                      int nr = r + d[0], nc = c + d[1];
                      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
                      if (seen[nr][nc] || abs(h[nr][nc] - h[r][c]) > limit) continue;
                      seen[nr][nc] = true;
                      st.push({nr, nc});
                  }
              }
              return false;
          }
      };
    `,
    checks: "",
  },
  "find-eventual-safe-states": {
    code: cpp`
      class Solution {
      public:
          vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
              state.assign(graph.size(), 0);
              vector<int> result;
              for (int i = 0; i < graph.size(); i++) {
                  if (safe(graph, i)) result.push_back(i);
              }
              return result;
          }

      private:
          vector<int> state;

          bool safe(vector<vector<int>>& graph, int node) {
              if (state[node] != 0) return state[node] == 2;
              state[node] = 1;
              for (int next : graph[node]) {
                  if (!safe(graph, next)) return false;
              }
              state[node] = 2;
              return true;
          }
      };
    `,
    checks: "",
  },
};
