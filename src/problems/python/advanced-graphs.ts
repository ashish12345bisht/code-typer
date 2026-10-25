import { py, type Solution } from "../types";

export const advancedGraphsPython: Record<string, Solution> = {
  "network-delay-time": {
    code: py`
      class Solution:
          def networkDelayTime(
              self, times: List[List[int]], n: int, k: int
          ) -> int:
              graph = defaultdict(list)
              for u, v, w in times:
                  graph[u].append((v, w))
              dist = {}
              heap = [(0, k)]
              while heap:
                  d, node = heappop(heap)
                  if node in dist:
                      continue
                  dist[node] = d
                  for nxt, w in graph[node]:
                      if nxt not in dist:
                          heappush(heap, (d + w, nxt))
              return max(dist.values()) if len(dist) == n else -1
    `,
    checks: "",
  },
  "cheapest-flights-within-k-stops": {
    code: py`
      class Solution:
          def findCheapestPrice(
              self, n: int, flights: List[List[int]], src: int, dst: int,
              k: int
          ) -> int:
              cost = [inf] * n
              cost[src] = 0
              for _ in range(k + 1):
                  nxt = cost[:]
                  for u, v, price in flights:
                      if cost[u] + price < nxt[v]:
                          nxt[v] = cost[u] + price
                  cost = nxt
              return -1 if cost[dst] == inf else cost[dst]
    `,
    checks: "",
  },
  "min-cost-to-connect-all-points": {
    code: py`
      class Solution:
          def minCostConnectPoints(self, points: List[List[int]]) -> int:
              n = len(points)
              best = [inf] * n
              best[0] = 0
              used = [False] * n
              total = 0
              for _ in range(n):
                  u = min((i for i in range(n) if not used[i]),
                          key=lambda i: best[i])
                  used[u] = True
                  total += best[u]
                  for v in range(n):
                      if not used[v]:
                          d = (abs(points[u][0] - points[v][0])
                               + abs(points[u][1] - points[v][1]))
                          best[v] = min(best[v], d)
              return total
    `,
    checks: "",
  },
  "alien-dictionary": {
    code: py`
      class Solution:
          def alienOrder(self, words: List[str]) -> str:
              graph = {c: {} for w in words for c in w}
              indegree = {c: 0 for c in graph}
              for a, b in zip(words, words[1:]):
                  if len(a) > len(b) and a.startswith(b):
                      return ""
                  for x, y in zip(a, b):
                      if x != y:
                          if y not in graph[x]:
                              graph[x][y] = True
                              indegree[y] += 1
                          break
              queue = deque(c for c in indegree if indegree[c] == 0)
              order = []
              while queue:
                  c = queue.popleft()
                  order.append(c)
                  for nxt in graph[c]:
                      indegree[nxt] -= 1
                      if indegree[nxt] == 0:
                          queue.append(nxt)
              return "".join(order) if len(order) == len(graph) else ""
    `,
    checks: "",
  },
  "swim-in-rising-water": {
    code: py`
      class Solution:
          def swimInWater(self, grid: List[List[int]]) -> int:
              n = len(grid)
              heap = [(grid[0][0], 0, 0)]
              seen = {(0, 0)}
              while heap:
                  t, r, c = heappop(heap)
                  if r == n - 1 and c == n - 1:
                      return t
                  for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                 (r, c - 1)):
                      if 0 <= nr < n and 0 <= nc < n:
                          if (nr, nc) not in seen:
                              seen.add((nr, nc))
                              heappush(heap, (max(t, grid[nr][nc]), nr, nc))
              return -1
    `,
    checks: "",
  },
  "reconstruct-itinerary": {
    code: py`
      class Solution:
          def findItinerary(self, tickets: List[List[str]]) -> List[str]:
              graph = defaultdict(list)
              for src, dst in sorted(tickets, reverse=True):
                  graph[src].append(dst)
              route, stack = [], ["JFK"]
              while stack:
                  while graph[stack[-1]]:
                      stack.append(graph[stack[-1]].pop())
                  route.append(stack.pop())
              return route[::-1]
    `,
    checks: "",
  },
  "accounts-merge": {
    code: py`
      class Solution:
          def accountsMerge(
              self, accounts: List[List[str]]
          ) -> List[List[str]]:
              parent = {}

              def find(x: str) -> str:
                  while parent[x] != x:
                      parent[x] = parent[parent[x]]
                      x = parent[x]
                  return x

              owner = {}
              for name, *emails in accounts:
                  for e in emails:
                      parent.setdefault(e, e)
                      owner[e] = name
                      parent[find(e)] = find(emails[0])
              groups = defaultdict(list)
              for e in parent:
                  groups[find(e)].append(e)
              return [[owner[root]] + sorted(emails)
                      for root, emails in groups.items()]
    `,
    checks: "",
  },
  "number-of-provinces": {
    code: py`
      class Solution:
          def findCircleNum(self, isConnected: List[List[int]]) -> int:
              n = len(isConnected)
              seen = [False] * n

              def visit(i: int) -> None:
                  seen[i] = True
                  for j in range(n):
                      if isConnected[i][j] and not seen[j]:
                          visit(j)

              provinces = 0
              for i in range(n):
                  if not seen[i]:
                      provinces += 1
                      visit(i)
              return provinces
    `,
    checks: "",
  },
  "path-with-minimum-effort": {
    code: py`
      class Solution:
          def minimumEffortPath(self, heights: List[List[int]]) -> int:
              rows, cols = len(heights), len(heights[0])
              effort = [[inf] * cols for _ in range(rows)]
              effort[0][0] = 0
              heap = [(0, 0, 0)]
              while heap:
                  e, r, c = heappop(heap)
                  if r == rows - 1 and c == cols - 1:
                      return e
                  if e > effort[r][c]:
                      continue
                  for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                 (r, c - 1)):
                      if 0 <= nr < rows and 0 <= nc < cols:
                          step = abs(heights[nr][nc] - heights[r][c])
                          ne = max(e, step)
                          if ne < effort[nr][nc]:
                              effort[nr][nc] = ne
                              heappush(heap, (ne, nr, nc))
              return 0
    `,
    checks: "",
  },
  "find-eventual-safe-states": {
    code: py`
      class Solution:
          def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
              state = [0] * len(graph)

              def safe(node: int) -> bool:
                  if state[node]:
                      return state[node] == 2
                  state[node] = 1
                  if all(safe(nxt) for nxt in graph[node]):
                      state[node] = 2
                  return state[node] == 2

              return [i for i in range(len(graph)) if safe(i)]
    `,
    checks: "",
  },
};
