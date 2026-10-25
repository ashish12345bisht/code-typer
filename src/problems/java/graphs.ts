import { java, type Solution } from "../types";

export const graphsJava: Record<string, Solution> = {
  "number-of-islands": {
    code: java`
      class Solution {
          public int numIslands(char[][] grid) {
              int count = 0;
              for (int r = 0; r < grid.length; r++) {
                  for (int c = 0; c < grid[0].length; c++) {
                      if (grid[r][c] == '1') {
                          count++;
                          sink(grid, r, c);
                      }
                  }
              }
              return count;
          }

          private void sink(char[][] grid, int r, int c) {
              if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) {
                  return;
              }
              if (grid[r][c] != '1') return;
              grid[r][c] = '0';
              sink(grid, r + 1, c);
              sink(grid, r - 1, c);
              sink(grid, r, c + 1);
              sink(grid, r, c - 1);
          }
      }
    `,
    checks: "",
  },
  "max-area-of-island": {
    code: java`
      class Solution {
          public int maxAreaOfIsland(int[][] grid) {
              int best = 0;
              for (int r = 0; r < grid.length; r++) {
                  for (int c = 0; c < grid[0].length; c++) {
                      best = Math.max(best, area(grid, r, c));
                  }
              }
              return best;
          }

          private int area(int[][] grid, int r, int c) {
              if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) {
                  return 0;
              }
              if (grid[r][c] != 1) return 0;
              grid[r][c] = 0;
              return 1 + area(grid, r + 1, c) + area(grid, r - 1, c)
                      + area(grid, r, c + 1) + area(grid, r, c - 1);
          }
      }
    `,
    checks: "",
  },
  "flood-fill": {
    code: java`
      class Solution {
          public int[][] floodFill(int[][] image, int sr, int sc, int color) {
              if (image[sr][sc] != color) {
                  fill(image, sr, sc, image[sr][sc], color);
              }
              return image;
          }

          private void fill(int[][] image, int r, int c, int start,
                            int color) {
              if (r < 0 || c < 0 || r >= image.length || c >= image[0].length) {
                  return;
              }
              if (image[r][c] != start) return;
              image[r][c] = color;
              fill(image, r + 1, c, start, color);
              fill(image, r - 1, c, start, color);
              fill(image, r, c + 1, start, color);
              fill(image, r, c - 1, start, color);
          }
      }
    `,
    checks: "",
  },
  "rotting-oranges": {
    code: java`
      class Solution {
          public int orangesRotting(int[][] grid) {
              int rows = grid.length, cols = grid[0].length, fresh = 0;
              Deque<int[]> queue = new ArrayDeque<>();
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (grid[r][c] == 2) queue.add(new int[] {r, c});
                      else if (grid[r][c] == 1) fresh++;
                  }
              }
              int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              int minutes = 0;
              while (!queue.isEmpty() && fresh > 0) {
                  minutes++;
                  for (int i = queue.size(); i > 0; i--) {
                      int[] cell = queue.poll();
                      for (int[] d : dirs) {
                          int nr = cell[0] + d[0], nc = cell[1] + d[1];
                          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) {
                              continue;
                          }
                          if (grid[nr][nc] != 1) continue;
                          grid[nr][nc] = 2;
                          fresh--;
                          queue.add(new int[] {nr, nc});
                      }
                  }
              }
              return fresh > 0 ? -1 : minutes;
          }
      }
    `,
    checks: "",
  },
  "pacific-atlantic-water-flow": {
    code: java`
      class Solution {
          public List<List<Integer>> pacificAtlantic(int[][] heights) {
              int rows = heights.length, cols = heights[0].length;
              boolean[][] pacific = new boolean[rows][cols];
              boolean[][] atlantic = new boolean[rows][cols];
              for (int r = 0; r < rows; r++) {
                  flow(heights, pacific, r, 0, 0);
                  flow(heights, atlantic, r, cols - 1, 0);
              }
              for (int c = 0; c < cols; c++) {
                  flow(heights, pacific, 0, c, 0);
                  flow(heights, atlantic, rows - 1, c, 0);
              }
              List<List<Integer>> result = new ArrayList<>();
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (pacific[r][c] && atlantic[r][c]) {
                          result.add(List.of(r, c));
                      }
                  }
              }
              return result;
          }

          private void flow(int[][] h, boolean[][] seen, int r, int c,
                            int prev) {
              if (r < 0 || c < 0 || r >= h.length || c >= h[0].length) return;
              if (seen[r][c] || h[r][c] < prev) return;
              seen[r][c] = true;
              flow(h, seen, r + 1, c, h[r][c]);
              flow(h, seen, r - 1, c, h[r][c]);
              flow(h, seen, r, c + 1, h[r][c]);
              flow(h, seen, r, c - 1, h[r][c]);
          }
      }
    `,
    checks: "",
  },
  "surrounded-regions": {
    code: java`
      class Solution {
          public void solve(char[][] board) {
              int rows = board.length, cols = board[0].length;
              for (int r = 0; r < rows; r++) {
                  mark(board, r, 0);
                  mark(board, r, cols - 1);
              }
              for (int c = 0; c < cols; c++) {
                  mark(board, 0, c);
                  mark(board, rows - 1, c);
              }
              for (char[] row : board) {
                  for (int c = 0; c < cols; c++) {
                      row[c] = row[c] == '#' ? 'O' : 'X';
                  }
              }
          }

          private void mark(char[][] board, int r, int c) {
              if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) {
                  return;
              }
              if (board[r][c] != 'O') return;
              board[r][c] = '#';
              mark(board, r + 1, c);
              mark(board, r - 1, c);
              mark(board, r, c + 1);
              mark(board, r, c - 1);
          }
      }
    `,
    checks: "",
  },
  "course-schedule": {
    code: java`
      class Solution {
          public boolean canFinish(int numCourses, int[][] prerequisites) {
              List<List<Integer>> graph = new ArrayList<>();
              for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
              int[] indegree = new int[numCourses];
              for (int[] p : prerequisites) {
                  graph.get(p[1]).add(p[0]);
                  indegree[p[0]]++;
              }
              Deque<Integer> queue = new ArrayDeque<>();
              for (int i = 0; i < numCourses; i++) {
                  if (indegree[i] == 0) queue.add(i);
              }
              int taken = 0;
              while (!queue.isEmpty()) {
                  int c = queue.poll();
                  taken++;
                  for (int next : graph.get(c)) {
                      if (--indegree[next] == 0) queue.add(next);
                  }
              }
              return taken == numCourses;
          }
      }
    `,
    checks: "",
  },
  "course-schedule-ii": {
    code: java`
      class Solution {
          public int[] findOrder(int numCourses, int[][] prerequisites) {
              List<List<Integer>> graph = new ArrayList<>();
              for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
              int[] indegree = new int[numCourses];
              for (int[] p : prerequisites) {
                  graph.get(p[1]).add(p[0]);
                  indegree[p[0]]++;
              }
              Deque<Integer> queue = new ArrayDeque<>();
              for (int i = 0; i < numCourses; i++) {
                  if (indegree[i] == 0) queue.add(i);
              }
              int[] order = new int[numCourses];
              int taken = 0;
              while (!queue.isEmpty()) {
                  int c = queue.poll();
                  order[taken++] = c;
                  for (int next : graph.get(c)) {
                      if (--indegree[next] == 0) queue.add(next);
                  }
              }
              return taken == numCourses ? order : new int[0];
          }
      }
    `,
    checks: "",
  },
  "number-of-connected-components": {
    code: java`
      class Solution {
          private int[] parent;

          public int countComponents(int n, int[][] edges) {
              parent = new int[n];
              for (int i = 0; i < n; i++) parent[i] = i;
              int components = n;
              for (int[] e : edges) {
                  int a = find(e[0]), b = find(e[1]);
                  if (a != b) {
                      parent[a] = b;
                      components--;
                  }
              }
              return components;
          }

          private int find(int x) {
              while (parent[x] != x) {
                  parent[x] = parent[parent[x]];
                  x = parent[x];
              }
              return x;
          }
      }
    `,
    checks: "",
  },
  "graph-valid-tree": {
    code: java`
      class Solution {
          private int[] parent;

          public boolean validTree(int n, int[][] edges) {
              if (edges.length != n - 1) return false;
              parent = new int[n];
              for (int i = 0; i < n; i++) parent[i] = i;
              for (int[] e : edges) {
                  int a = find(e[0]), b = find(e[1]);
                  if (a == b) return false;
                  parent[a] = b;
              }
              return true;
          }

          private int find(int x) {
              while (parent[x] != x) {
                  parent[x] = parent[parent[x]];
                  x = parent[x];
              }
              return x;
          }
      }
    `,
    checks: "",
  },
  "walls-and-gates": {
    code: java`
      class Solution {
          public void wallsAndGates(int[][] rooms) {
              int rows = rooms.length, cols = rooms[0].length;
              Deque<int[]> queue = new ArrayDeque<>();
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (rooms[r][c] == 0) queue.add(new int[] {r, c});
                  }
              }
              int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!queue.isEmpty()) {
                  int[] cell = queue.poll();
                  for (int[] d : dirs) {
                      int nr = cell[0] + d[0], nc = cell[1] + d[1];
                      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) {
                          continue;
                      }
                      if (rooms[nr][nc] != Integer.MAX_VALUE) continue;
                      rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;
                      queue.add(new int[] {nr, nc});
                  }
              }
          }
      }
    `,
    checks: "",
  },
  "word-ladder": {
    code: java`
      class Solution {
          public int ladderLength(String beginWord, String endWord,
                                  List<String> wordList) {
              Set<String> words = new HashSet<>(wordList);
              if (!words.contains(endWord)) return 0;
              Deque<String> queue = new ArrayDeque<>(List.of(beginWord));
              words.remove(beginWord);
              for (int steps = 1; !queue.isEmpty(); steps++) {
                  for (int i = queue.size(); i > 0; i--) {
                      String word = queue.poll();
                      if (word.equals(endWord)) return steps;
                      char[] chars = word.toCharArray();
                      for (int j = 0; j < chars.length; j++) {
                          char original = chars[j];
                          for (char ch = 'a'; ch <= 'z'; ch++) {
                              chars[j] = ch;
                              String next = new String(chars);
                              if (words.remove(next)) queue.add(next);
                          }
                          chars[j] = original;
                      }
                  }
              }
              return 0;
          }
      }
    `,
    checks: "",
  },
  "shortest-path-in-binary-matrix": {
    code: java`
      class Solution {
          public int shortestPathBinaryMatrix(int[][] grid) {
              int n = grid.length;
              if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
              Deque<int[]> queue = new ArrayDeque<>();
              queue.add(new int[] {0, 0, 1});
              grid[0][0] = 1;
              while (!queue.isEmpty()) {
                  int[] cell = queue.poll();
                  int r = cell[0], c = cell[1], d = cell[2];
                  if (r == n - 1 && c == n - 1) return d;
                  for (int dr = -1; dr <= 1; dr++) {
                      for (int dc = -1; dc <= 1; dc++) {
                          int nr = r + dr, nc = c + dc;
                          if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
                          if (grid[nr][nc] != 0) continue;
                          grid[nr][nc] = 1;
                          queue.add(new int[] {nr, nc, d + 1});
                      }
                  }
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "redundant-connection": {
    code: java`
      class Solution {
          private int[] parent;

          public int[] findRedundantConnection(int[][] edges) {
              parent = new int[edges.length + 1];
              for (int i = 0; i < parent.length; i++) parent[i] = i;
              for (int[] e : edges) {
                  int a = find(e[0]), b = find(e[1]);
                  if (a == b) return e;
                  parent[a] = b;
              }
              return new int[0];
          }

          private int find(int x) {
              while (parent[x] != x) {
                  parent[x] = parent[parent[x]];
                  x = parent[x];
              }
              return x;
          }
      }
    `,
    checks: "",
  },
  "is-graph-bipartite": {
    code: java`
      class Solution {
          public boolean isBipartite(int[][] graph) {
              int[] color = new int[graph.length];
              Arrays.fill(color, -1);
              for (int start = 0; start < graph.length; start++) {
                  if (color[start] != -1) continue;
                  color[start] = 0;
                  Deque<Integer> queue = new ArrayDeque<>(List.of(start));
                  while (!queue.isEmpty()) {
                      int node = queue.poll();
                      for (int next : graph[node]) {
                          if (color[next] == -1) {
                              color[next] = 1 - color[node];
                              queue.add(next);
                          } else if (color[next] == color[node]) {
                              return false;
                          }
                      }
                  }
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "keys-and-rooms": {
    code: java`
      class Solution {
          public boolean canVisitAllRooms(List<List<Integer>> rooms) {
              boolean[] seen = new boolean[rooms.size()];
              seen[0] = true;
              Deque<Integer> stack = new ArrayDeque<>(List.of(0));
              int visited = 1;
              while (!stack.isEmpty()) {
                  for (int key : rooms.get(stack.pop())) {
                      if (!seen[key]) {
                          seen[key] = true;
                          visited++;
                          stack.push(key);
                      }
                  }
              }
              return visited == rooms.size();
          }
      }
    `,
    checks: "",
  },
  "01-matrix": {
    code: java`
      class Solution {
          public int[][] updateMatrix(int[][] mat) {
              int rows = mat.length, cols = mat[0].length;
              int[][] dist = new int[rows][cols];
              Deque<int[]> queue = new ArrayDeque<>();
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (mat[r][c] == 0) {
                          queue.add(new int[] {r, c});
                      } else {
                          dist[r][c] = -1;
                      }
                  }
              }
              int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!queue.isEmpty()) {
                  int[] cell = queue.poll();
                  for (int[] d : dirs) {
                      int nr = cell[0] + d[0], nc = cell[1] + d[1];
                      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) {
                          continue;
                      }
                      if (dist[nr][nc] != -1) continue;
                      dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
                      queue.add(new int[] {nr, nc});
                  }
              }
              return dist;
          }
      }
    `,
    checks: "",
  },
};
