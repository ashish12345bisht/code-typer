import { py, type Solution } from "../types";

export const graphsPython: Record<string, Solution> = {
  "number-of-islands": {
    code: py`
      class Solution:
          def numIslands(self, grid: List[List[str]]) -> int:
              rows, cols = len(grid), len(grid[0])

              def sink(r: int, c: int) -> None:
                  if not (0 <= r < rows and 0 <= c < cols):
                      return
                  if grid[r][c] != "1":
                      return
                  grid[r][c] = "0"
                  sink(r + 1, c)
                  sink(r - 1, c)
                  sink(r, c + 1)
                  sink(r, c - 1)

              count = 0
              for r in range(rows):
                  for c in range(cols):
                      if grid[r][c] == "1":
                          count += 1
                          sink(r, c)
              return count
    `,
    checks: "",
  },
  "max-area-of-island": {
    code: py`
      class Solution:
          def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
              rows, cols = len(grid), len(grid[0])

              def area(r: int, c: int) -> int:
                  if not (0 <= r < rows and 0 <= c < cols):
                      return 0
                  if grid[r][c] != 1:
                      return 0
                  grid[r][c] = 0
                  return (1 + area(r + 1, c) + area(r - 1, c)
                          + area(r, c + 1) + area(r, c - 1))

              return max(
                  (area(r, c) for r in range(rows) for c in range(cols)),
                  default=0,
              )
    `,
    checks: "",
  },
  "flood-fill": {
    code: py`
      class Solution:
          def floodFill(
              self, image: List[List[int]], sr: int, sc: int, color: int
          ) -> List[List[int]]:
              start = image[sr][sc]
              if start == color:
                  return image

              def fill(r: int, c: int) -> None:
                  if not (0 <= r < len(image) and 0 <= c < len(image[0])):
                      return
                  if image[r][c] != start:
                      return
                  image[r][c] = color
                  fill(r + 1, c)
                  fill(r - 1, c)
                  fill(r, c + 1)
                  fill(r, c - 1)

              fill(sr, sc)
              return image
    `,
    checks: "",
  },
  "rotting-oranges": {
    code: py`
      class Solution:
          def orangesRotting(self, grid: List[List[int]]) -> int:
              rows, cols = len(grid), len(grid[0])
              queue, fresh = deque(), 0
              for r in range(rows):
                  for c in range(cols):
                      if grid[r][c] == 2:
                          queue.append((r, c))
                      elif grid[r][c] == 1:
                          fresh += 1
              minutes = 0
              while queue and fresh:
                  minutes += 1
                  for _ in range(len(queue)):
                      r, c = queue.popleft()
                      for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                     (r, c - 1)):
                          if 0 <= nr < rows and 0 <= nc < cols:
                              if grid[nr][nc] == 1:
                                  grid[nr][nc] = 2
                                  fresh -= 1
                                  queue.append((nr, nc))
              return -1 if fresh else minutes
    `,
    checks: "",
  },
  "pacific-atlantic-water-flow": {
    code: py`
      class Solution:
          def pacificAtlantic(
              self, heights: List[List[int]]
          ) -> List[List[int]]:
              rows, cols = len(heights), len(heights[0])

              def flow(starts: List[Tuple[int, int]]) -> Set[Tuple[int, int]]:
                  seen = set(starts)
                  stack = list(starts)
                  while stack:
                      r, c = stack.pop()
                      for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                     (r, c - 1)):
                          if not (0 <= nr < rows and 0 <= nc < cols):
                              continue
                          if (nr, nc) in seen:
                              continue
                          if heights[nr][nc] < heights[r][c]:
                              continue
                          seen.add((nr, nc))
                          stack.append((nr, nc))
                  return seen

              pacific = flow([(0, c) for c in range(cols)]
                             + [(r, 0) for r in range(rows)])
              atlantic = flow([(rows - 1, c) for c in range(cols)]
                              + [(r, cols - 1) for r in range(rows)])
              return [[r, c] for r, c in pacific & atlantic]
    `,
    checks: "",
  },
  "surrounded-regions": {
    code: py`
      class Solution:
          def solve(self, board: List[List[str]]) -> None:
              rows, cols = len(board), len(board[0])

              def mark(r: int, c: int) -> None:
                  if not (0 <= r < rows and 0 <= c < cols):
                      return
                  if board[r][c] != "O":
                      return
                  board[r][c] = "#"
                  mark(r + 1, c)
                  mark(r - 1, c)
                  mark(r, c + 1)
                  mark(r, c - 1)

              for r in range(rows):
                  mark(r, 0)
                  mark(r, cols - 1)
              for c in range(cols):
                  mark(0, c)
                  mark(rows - 1, c)
              for row in board:
                  for c, v in enumerate(row):
                      row[c] = "O" if v == "#" else "X"
    `,
    checks: "",
  },
  "course-schedule": {
    code: py`
      class Solution:
          def canFinish(
              self, numCourses: int, prerequisites: List[List[int]]
          ) -> bool:
              graph = [[] for _ in range(numCourses)]
              indegree = [0] * numCourses
              for course, pre in prerequisites:
                  graph[pre].append(course)
                  indegree[course] += 1
              queue = deque(i for i in range(numCourses) if indegree[i] == 0)
              taken = 0
              while queue:
                  c = queue.popleft()
                  taken += 1
                  for nxt in graph[c]:
                      indegree[nxt] -= 1
                      if indegree[nxt] == 0:
                          queue.append(nxt)
              return taken == numCourses
    `,
    checks: "",
  },
  "course-schedule-ii": {
    code: py`
      class Solution:
          def findOrder(
              self, numCourses: int, prerequisites: List[List[int]]
          ) -> List[int]:
              graph = [[] for _ in range(numCourses)]
              indegree = [0] * numCourses
              for course, pre in prerequisites:
                  graph[pre].append(course)
                  indegree[course] += 1
              queue = deque(i for i in range(numCourses) if indegree[i] == 0)
              order = []
              while queue:
                  c = queue.popleft()
                  order.append(c)
                  for nxt in graph[c]:
                      indegree[nxt] -= 1
                      if indegree[nxt] == 0:
                          queue.append(nxt)
              return order if len(order) == numCourses else []
    `,
    checks: "",
  },
  "number-of-connected-components": {
    code: py`
      class Solution:
          def countComponents(self, n: int, edges: List[List[int]]) -> int:
              parent = list(range(n))

              def find(x: int) -> int:
                  while parent[x] != x:
                      parent[x] = parent[parent[x]]
                      x = parent[x]
                  return x

              components = n
              for a, b in edges:
                  ra, rb = find(a), find(b)
                  if ra != rb:
                      parent[ra] = rb
                      components -= 1
              return components
    `,
    checks: "",
  },
  "graph-valid-tree": {
    code: py`
      class Solution:
          def validTree(self, n: int, edges: List[List[int]]) -> bool:
              if len(edges) != n - 1:
                  return False
              parent = list(range(n))

              def find(x: int) -> int:
                  while parent[x] != x:
                      parent[x] = parent[parent[x]]
                      x = parent[x]
                  return x

              for a, b in edges:
                  ra, rb = find(a), find(b)
                  if ra == rb:
                      return False
                  parent[ra] = rb
              return True
    `,
    checks: "",
  },
  "walls-and-gates": {
    code: py`
      class Solution:
          def wallsAndGates(self, rooms: List[List[int]]) -> None:
              rows, cols = len(rooms), len(rooms[0])
              queue = deque((r, c) for r in range(rows)
                            for c in range(cols) if rooms[r][c] == 0)
              while queue:
                  r, c = queue.popleft()
                  for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                 (r, c - 1)):
                      if 0 <= nr < rows and 0 <= nc < cols:
                          if rooms[nr][nc] == 2147483647:
                              rooms[nr][nc] = rooms[r][c] + 1
                              queue.append((nr, nc))
    `,
    checks: "",
  },
  "word-ladder": {
    code: py`
      class Solution:
          def ladderLength(
              self, beginWord: str, endWord: str, wordList: List[str]
          ) -> int:
              words = set(wordList)
              if endWord not in words:
                  return 0
              queue = deque([(beginWord, 1)])
              seen = {beginWord}
              while queue:
                  word, steps = queue.popleft()
                  if word == endWord:
                      return steps
                  for i in range(len(word)):
                      for ch in "abcdefghijklmnopqrstuvwxyz":
                          nxt = word[:i] + ch + word[i + 1:]
                          if nxt in words and nxt not in seen:
                              seen.add(nxt)
                              queue.append((nxt, steps + 1))
              return 0
    `,
    checks: "",
  },
  "shortest-path-in-binary-matrix": {
    code: py`
      class Solution:
          def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
              n = len(grid)
              if grid[0][0] or grid[n - 1][n - 1]:
                  return -1
              queue = deque([(0, 0, 1)])
              grid[0][0] = 1
              while queue:
                  r, c, d = queue.popleft()
                  if r == n - 1 and c == n - 1:
                      return d
                  for dr in (-1, 0, 1):
                      for dc in (-1, 0, 1):
                          nr, nc = r + dr, c + dc
                          if 0 <= nr < n and 0 <= nc < n:
                              if grid[nr][nc] == 0:
                                  grid[nr][nc] = 1
                                  queue.append((nr, nc, d + 1))
              return -1
    `,
    checks: "",
  },
  "redundant-connection": {
    code: py`
      class Solution:
          def findRedundantConnection(
              self, edges: List[List[int]]
          ) -> List[int]:
              parent = list(range(len(edges) + 1))

              def find(x: int) -> int:
                  while parent[x] != x:
                      parent[x] = parent[parent[x]]
                      x = parent[x]
                  return x

              for a, b in edges:
                  ra, rb = find(a), find(b)
                  if ra == rb:
                      return [a, b]
                  parent[ra] = rb
              return []
    `,
    checks: "",
  },
  "is-graph-bipartite": {
    code: py`
      class Solution:
          def isBipartite(self, graph: List[List[int]]) -> bool:
              color = [-1] * len(graph)
              for start in range(len(graph)):
                  if color[start] != -1:
                      continue
                  color[start] = 0
                  queue = deque([start])
                  while queue:
                      node = queue.popleft()
                      for nxt in graph[node]:
                          if color[nxt] == -1:
                              color[nxt] = 1 - color[node]
                              queue.append(nxt)
                          elif color[nxt] == color[node]:
                              return False
              return True
    `,
    checks: "",
  },
  "keys-and-rooms": {
    code: py`
      class Solution:
          def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
              seen = {0}
              stack = [0]
              while stack:
                  for key in rooms[stack.pop()]:
                      if key not in seen:
                          seen.add(key)
                          stack.append(key)
              return len(seen) == len(rooms)
    `,
    checks: "",
  },
  "01-matrix": {
    code: py`
      class Solution:
          def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
              rows, cols = len(mat), len(mat[0])
              dist = [[-1] * cols for _ in range(rows)]
              queue = deque()
              for r in range(rows):
                  for c in range(cols):
                      if mat[r][c] == 0:
                          dist[r][c] = 0
                          queue.append((r, c))
              while queue:
                  r, c = queue.popleft()
                  for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1),
                                 (r, c - 1)):
                      if 0 <= nr < rows and 0 <= nc < cols:
                          if dist[nr][nc] == -1:
                              dist[nr][nc] = dist[r][c] + 1
                              queue.append((nr, nc))
              return dist
    `,
    checks: "",
  },
};
