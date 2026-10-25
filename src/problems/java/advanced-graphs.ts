import { java, type Solution } from "../types";

export const advancedGraphsJava: Record<string, Solution> = {
  "network-delay-time": {
    code: java`
      class Solution {
          public int networkDelayTime(int[][] times, int n, int k) {
              List<List<int[]>> graph = new ArrayList<>();
              for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
              for (int[] t : times) graph.get(t[0]).add(new int[] {t[1], t[2]});
              int[] dist = new int[n + 1];
              Arrays.fill(dist, Integer.MAX_VALUE);
              PriorityQueue<int[]> heap =
                      new PriorityQueue<>((a, b) -> a[0] - b[0]);
              heap.add(new int[] {0, k});
              int reached = 0, last = 0;
              while (!heap.isEmpty()) {
                  int[] top = heap.poll();
                  int d = top[0], node = top[1];
                  if (dist[node] != Integer.MAX_VALUE) continue;
                  dist[node] = d;
                  reached++;
                  last = d;
                  for (int[] e : graph.get(node)) {
                      if (dist[e[0]] == Integer.MAX_VALUE) {
                          heap.add(new int[] {d + e[1], e[0]});
                      }
                  }
              }
              return reached == n ? last : -1;
          }
      }
    `,
    checks: "",
  },
  "cheapest-flights-within-k-stops": {
    code: java`
      class Solution {
          public int findCheapestPrice(int n, int[][] flights, int src,
                                       int dst, int k) {
              int[] cost = new int[n];
              Arrays.fill(cost, Integer.MAX_VALUE);
              cost[src] = 0;
              for (int i = 0; i <= k; i++) {
                  int[] next = cost.clone();
                  for (int[] f : flights) {
                      if (cost[f[0]] == Integer.MAX_VALUE) continue;
                      next[f[1]] = Math.min(next[f[1]], cost[f[0]] + f[2]);
                  }
                  cost = next;
              }
              return cost[dst] == Integer.MAX_VALUE ? -1 : cost[dst];
          }
      }
    `,
    checks: "",
  },
  "min-cost-to-connect-all-points": {
    code: java`
      class Solution {
          public int minCostConnectPoints(int[][] points) {
              int n = points.length, total = 0;
              int[] best = new int[n];
              Arrays.fill(best, Integer.MAX_VALUE);
              best[0] = 0;
              boolean[] used = new boolean[n];
              for (int step = 0; step < n; step++) {
                  int u = -1;
                  for (int i = 0; i < n; i++) {
                      if (!used[i] && (u == -1 || best[i] < best[u])) u = i;
                  }
                  used[u] = true;
                  total += best[u];
                  for (int v = 0; v < n; v++) {
                      if (used[v]) continue;
                      int d = Math.abs(points[u][0] - points[v][0])
                              + Math.abs(points[u][1] - points[v][1]);
                      best[v] = Math.min(best[v], d);
                  }
              }
              return total;
          }
      }
    `,
    checks: "",
  },
  "alien-dictionary": {
    code: java`
      class Solution {
          public String alienOrder(String[] words) {
              Map<Character, Set<Character>> graph = new LinkedHashMap<>();
              Map<Character, Integer> indegree = new HashMap<>();
              for (String w : words) {
                  for (char c : w.toCharArray()) {
                      graph.putIfAbsent(c, new LinkedHashSet<>());
                      indegree.putIfAbsent(c, 0);
                  }
              }
              for (int i = 0; i + 1 < words.length; i++) {
                  String a = words[i], b = words[i + 1];
                  if (a.length() > b.length() && a.startsWith(b)) return "";
                  for (int j = 0; j < Math.min(a.length(), b.length()); j++) {
                      char x = a.charAt(j), y = b.charAt(j);
                      if (x == y) continue;
                      if (graph.get(x).add(y)) indegree.merge(y, 1, Integer::sum);
                      break;
                  }
              }
              Deque<Character> queue = new ArrayDeque<>();
              for (char c : graph.keySet()) {
                  if (indegree.get(c) == 0) queue.add(c);
              }
              StringBuilder order = new StringBuilder();
              while (!queue.isEmpty()) {
                  char c = queue.poll();
                  order.append(c);
                  for (char next : graph.get(c)) {
                      if (indegree.merge(next, -1, Integer::sum) == 0) {
                          queue.add(next);
                      }
                  }
              }
              return order.length() == graph.size() ? order.toString() : "";
          }
      }
    `,
    checks: "",
  },
  "swim-in-rising-water": {
    code: java`
      class Solution {
          public int swimInWater(int[][] grid) {
              int n = grid.length;
              boolean[][] seen = new boolean[n][n];
              PriorityQueue<int[]> heap =
                      new PriorityQueue<>((a, b) -> a[0] - b[0]);
              heap.add(new int[] {grid[0][0], 0, 0});
              seen[0][0] = true;
              int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!heap.isEmpty()) {
                  int[] top = heap.poll();
                  int t = top[0], r = top[1], c = top[2];
                  if (r == n - 1 && c == n - 1) return t;
                  for (int[] d : dirs) {
                      int nr = r + d[0], nc = c + d[1];
                      if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
                      if (seen[nr][nc]) continue;
                      seen[nr][nc] = true;
                      heap.add(new int[] {Math.max(t, grid[nr][nc]), nr, nc});
                  }
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "reconstruct-itinerary": {
    code: java`
      class Solution {
          private final Map<String, PriorityQueue<String>> graph =
                  new HashMap<>();
          private final LinkedList<String> route = new LinkedList<>();

          public List<String> findItinerary(List<List<String>> tickets) {
              for (List<String> t : tickets) {
                  graph.computeIfAbsent(t.get(0), k -> new PriorityQueue<>())
                          .add(t.get(1));
              }
              visit("JFK");
              return route;
          }

          private void visit(String airport) {
              PriorityQueue<String> next = graph.get(airport);
              while (next != null && !next.isEmpty()) visit(next.poll());
              route.addFirst(airport);
          }
      }
    `,
    checks: "",
  },
  "accounts-merge": {
    code: java`
      class Solution {
          private final Map<String, String> parent = new HashMap<>();

          public List<List<String>> accountsMerge(List<List<String>> accounts) {
              Map<String, String> owner = new HashMap<>();
              for (List<String> account : accounts) {
                  String first = account.get(1);
                  for (String e : account.subList(1, account.size())) {
                      parent.putIfAbsent(e, e);
                      owner.put(e, account.get(0));
                      parent.put(find(e), find(first));
                  }
              }
              Map<String, List<String>> groups = new HashMap<>();
              for (String e : parent.keySet()) {
                  groups.computeIfAbsent(find(e), k -> new ArrayList<>()).add(e);
              }
              List<List<String>> result = new ArrayList<>();
              for (var entry : groups.entrySet()) {
                  List<String> emails = entry.getValue();
                  Collections.sort(emails);
                  emails.add(0, owner.get(entry.getKey()));
                  result.add(emails);
              }
              return result;
          }

          private String find(String x) {
              while (!parent.get(x).equals(x)) {
                  parent.put(x, parent.get(parent.get(x)));
                  x = parent.get(x);
              }
              return x;
          }
      }
    `,
    checks: "",
  },
  "number-of-provinces": {
    code: java`
      class Solution {
          public int findCircleNum(int[][] isConnected) {
              boolean[] seen = new boolean[isConnected.length];
              int provinces = 0;
              for (int i = 0; i < isConnected.length; i++) {
                  if (!seen[i]) {
                      provinces++;
                      visit(isConnected, seen, i);
                  }
              }
              return provinces;
          }

          private void visit(int[][] isConnected, boolean[] seen, int i) {
              seen[i] = true;
              for (int j = 0; j < isConnected.length; j++) {
                  if (isConnected[i][j] == 1 && !seen[j]) {
                      visit(isConnected, seen, j);
                  }
              }
          }
      }
    `,
    checks: "",
  },
  "path-with-minimum-effort": {
    code: java`
      class Solution {
          public int minimumEffortPath(int[][] heights) {
              int rows = heights.length, cols = heights[0].length;
              int[][] effort = new int[rows][cols];
              for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);
              effort[0][0] = 0;
              PriorityQueue<int[]> heap =
                      new PriorityQueue<>((a, b) -> a[0] - b[0]);
              heap.add(new int[] {0, 0, 0});
              int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!heap.isEmpty()) {
                  int[] top = heap.poll();
                  int e = top[0], r = top[1], c = top[2];
                  if (r == rows - 1 && c == cols - 1) return e;
                  if (e > effort[r][c]) continue;
                  for (int[] d : dirs) {
                      int nr = r + d[0], nc = c + d[1];
                      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) {
                          continue;
                      }
                      int step = Math.abs(heights[nr][nc] - heights[r][c]);
                      int next = Math.max(e, step);
                      if (next < effort[nr][nc]) {
                          effort[nr][nc] = next;
                          heap.add(new int[] {next, nr, nc});
                      }
                  }
              }
              return 0;
          }
      }
    `,
    checks: "",
  },
  "find-eventual-safe-states": {
    code: java`
      class Solution {
          public List<Integer> eventualSafeNodes(int[][] graph) {
              int[] state = new int[graph.length];
              List<Integer> result = new ArrayList<>();
              for (int i = 0; i < graph.length; i++) {
                  if (safe(graph, state, i)) result.add(i);
              }
              return result;
          }

          private boolean safe(int[][] graph, int[] state, int node) {
              if (state[node] != 0) return state[node] == 2;
              state[node] = 1;
              for (int next : graph[node]) {
                  if (!safe(graph, state, next)) return false;
              }
              state[node] = 2;
              return true;
          }
      }
    `,
    checks: "",
  },
};
