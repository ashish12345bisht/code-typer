import { cpp, type Solution } from "../types";

export const graphsCpp: Record<string, Solution> = {
  "number-of-islands": {
    code: cpp`
      class Solution {
      public:
          int numIslands(vector<vector<char>>& grid) {
              int islands = 0;
              for (int r = 0; r < grid.size(); r++) {
                  for (int c = 0; c < grid[0].size(); c++) {
                      if (grid[r][c] == '1') {
                          islands++;
                          sink(grid, r, c);
                      }
                  }
              }
              return islands;
          }

      private:
          void sink(vector<vector<char>>& grid, int r, int c) {
              if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size()) return;
              if (grid[r][c] != '1') return;
              grid[r][c] = '0';
              sink(grid, r + 1, c);
              sink(grid, r - 1, c);
              sink(grid, r, c + 1);
              sink(grid, r, c - 1);
          }
      };
    `,
    checks: "",
  },
  "max-area-of-island": {
    code: cpp`
      class Solution {
      public:
          int maxAreaOfIsland(vector<vector<int>>& grid) {
              int best = 0;
              for (int r = 0; r < grid.size(); r++) {
                  for (int c = 0; c < grid[0].size(); c++) {
                      best = max(best, area(grid, r, c));
                  }
              }
              return best;
          }

      private:
          int area(vector<vector<int>>& grid, int r, int c) {
              if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size()) return 0;
              if (grid[r][c] != 1) return 0;
              grid[r][c] = 0;
              return 1 + area(grid, r + 1, c) + area(grid, r - 1, c) +
                     area(grid, r, c + 1) + area(grid, r, c - 1);
          }
      };
    `,
    checks: "",
  },
  "flood-fill": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc,
                                        int color) {
              if (image[sr][sc] != color) fill(image, sr, sc, image[sr][sc], color);
              return image;
          }

      private:
          void fill(vector<vector<int>>& image, int r, int c, int start, int color) {
              if (r < 0 || c < 0 || r >= image.size() || c >= image[0].size()) return;
              if (image[r][c] != start) return;
              image[r][c] = color;
              fill(image, r + 1, c, start, color);
              fill(image, r - 1, c, start, color);
              fill(image, r, c + 1, start, color);
              fill(image, r, c - 1, start, color);
          }
      };
    `,
    checks: "",
  },
  "rotting-oranges": {
    code: cpp`
      class Solution {
      public:
          int orangesRotting(vector<vector<int>>& grid) {
              int rows = grid.size(), cols = grid[0].size(), fresh = 0;
              queue<pair<int, int>> q;
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (grid[r][c] == 2) q.push({r, c});
                      if (grid[r][c] == 1) fresh++;
                  }
              }
              int minutes = 0;
              int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!q.empty() && fresh > 0) {
                  for (int i = q.size(); i > 0; i--) {
                      auto [r, c] = q.front();
                      q.pop();
                      for (auto& d : dirs) {
                          int nr = r + d[0], nc = c + d[1];
                          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
                          if (grid[nr][nc] != 1) continue;
                          grid[nr][nc] = 2;
                          fresh--;
                          q.push({nr, nc});
                      }
                  }
                  minutes++;
              }
              return fresh == 0 ? minutes : -1;
          }
      };
    `,
    checks: "",
  },
  "pacific-atlantic-water-flow": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
              int rows = heights.size(), cols = heights[0].size();
              vector<vector<bool>> pacific(rows, vector<bool>(cols));
              vector<vector<bool>> atlantic(rows, vector<bool>(cols));
              for (int r = 0; r < rows; r++) {
                  climb(heights, r, 0, pacific, INT_MIN);
                  climb(heights, r, cols - 1, atlantic, INT_MIN);
              }
              for (int c = 0; c < cols; c++) {
                  climb(heights, 0, c, pacific, INT_MIN);
                  climb(heights, rows - 1, c, atlantic, INT_MIN);
              }
              vector<vector<int>> result;
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (pacific[r][c] && atlantic[r][c]) result.push_back({r, c});
                  }
              }
              return result;
          }

      private:
          void climb(vector<vector<int>>& h, int r, int c,
                     vector<vector<bool>>& seen, int prev) {
              if (r < 0 || c < 0 || r >= h.size() || c >= h[0].size()) return;
              if (seen[r][c] || h[r][c] < prev) return;
              seen[r][c] = true;
              climb(h, r + 1, c, seen, h[r][c]);
              climb(h, r - 1, c, seen, h[r][c]);
              climb(h, r, c + 1, seen, h[r][c]);
              climb(h, r, c - 1, seen, h[r][c]);
          }
      };
    `,
    checks: "",
  },
  "surrounded-regions": {
    code: cpp`
      class Solution {
      public:
          void solve(vector<vector<char>>& board) {
              int rows = board.size(), cols = board[0].size();
              for (int r = 0; r < rows; r++) {
                  keep(board, r, 0);
                  keep(board, r, cols - 1);
              }
              for (int c = 0; c < cols; c++) {
                  keep(board, 0, c);
                  keep(board, rows - 1, c);
              }
              for (auto& row : board) {
                  for (char& cell : row) cell = cell == 'S' ? 'O' : 'X';
              }
          }

      private:
          void keep(vector<vector<char>>& board, int r, int c) {
              if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size()) return;
              if (board[r][c] != 'O') return;
              board[r][c] = 'S';
              keep(board, r + 1, c);
              keep(board, r - 1, c);
              keep(board, r, c + 1);
              keep(board, r, c - 1);
          }
      };
    `,
    checks: "",
  },
  "course-schedule": {
    code: cpp`
      class Solution {
      public:
          bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
              vector<vector<int>> graph(numCourses);
              vector<int> indegree(numCourses);
              for (auto& p : prerequisites) {
                  graph[p[1]].push_back(p[0]);
                  indegree[p[0]]++;
              }
              queue<int> q;
              for (int i = 0; i < numCourses; i++) {
                  if (indegree[i] == 0) q.push(i);
              }
              int taken = 0;
              while (!q.empty()) {
                  int course = q.front();
                  q.pop();
                  taken++;
                  for (int next : graph[course]) {
                      if (--indegree[next] == 0) q.push(next);
                  }
              }
              return taken == numCourses;
          }
      };
    `,
    checks: "",
  },
  "course-schedule-ii": {
    code: cpp`
      class Solution {
      public:
          vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
              vector<vector<int>> graph(numCourses);
              vector<int> indegree(numCourses), order;
              for (auto& p : prerequisites) {
                  graph[p[1]].push_back(p[0]);
                  indegree[p[0]]++;
              }
              queue<int> q;
              for (int i = 0; i < numCourses; i++) {
                  if (indegree[i] == 0) q.push(i);
              }
              while (!q.empty()) {
                  int course = q.front();
                  q.pop();
                  order.push_back(course);
                  for (int next : graph[course]) {
                      if (--indegree[next] == 0) q.push(next);
                  }
              }
              if (order.size() != numCourses) return {};
              return order;
          }
      };
    `,
    checks: "",
  },
  "number-of-connected-components": {
    code: cpp`
      class Solution {
      public:
          int countComponents(int n, vector<vector<int>>& edges) {
              parent.resize(n);
              iota(parent.begin(), parent.end(), 0);
              int components = n;
              for (auto& e : edges) {
                  int a = find(e[0]), b = find(e[1]);
                  if (a != b) {
                      parent[a] = b;
                      components--;
                  }
              }
              return components;
          }

      private:
          vector<int> parent;

          int find(int x) {
              while (parent[x] != x) x = parent[x] = parent[parent[x]];
              return x;
          }
      };
    `,
    checks: "",
  },
  "graph-valid-tree": {
    code: cpp`
      class Solution {
      public:
          bool validTree(int n, vector<vector<int>>& edges) {
              if (edges.size() != n - 1) return false;
              parent.resize(n);
              iota(parent.begin(), parent.end(), 0);
              for (auto& e : edges) {
                  int a = find(e[0]), b = find(e[1]);
                  if (a == b) return false;
                  parent[a] = b;
              }
              return true;
          }

      private:
          vector<int> parent;

          int find(int x) {
              while (parent[x] != x) x = parent[x] = parent[parent[x]];
              return x;
          }
      };
    `,
    checks: "",
  },
  "walls-and-gates": {
    code: cpp`
      class Solution {
      public:
          void wallsAndGates(vector<vector<int>>& rooms) {
              const int INF = INT_MAX;
              int rows = rooms.size(), cols = rooms[0].size();
              queue<pair<int, int>> q;
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (rooms[r][c] == 0) q.push({r, c});
                  }
              }
              int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!q.empty()) {
                  auto [r, c] = q.front();
                  q.pop();
                  for (auto& d : dirs) {
                      int nr = r + d[0], nc = c + d[1];
                      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
                      if (rooms[nr][nc] != INF) continue;
                      rooms[nr][nc] = rooms[r][c] + 1;
                      q.push({nr, nc});
                  }
              }
          }
      };
    `,
    checks: "",
  },
  "word-ladder": {
    code: cpp`
      class Solution {
      public:
          int ladderLength(string beginWord, string endWord,
                           vector<string>& wordList) {
              unordered_set<string> words(wordList.begin(), wordList.end());
              if (!words.count(endWord)) return 0;
              queue<string> q;
              q.push(beginWord);
              for (int steps = 1; !q.empty(); steps++) {
                  for (int i = q.size(); i > 0; i--) {
                      string word = q.front();
                      q.pop();
                      if (word == endWord) return steps;
                      for (int j = 0; j < word.size(); j++) {
                          char original = word[j];
                          for (char ch = 'a'; ch <= 'z'; ch++) {
                              word[j] = ch;
                              if (words.erase(word)) q.push(word);
                          }
                          word[j] = original;
                      }
                  }
              }
              return 0;
          }
      };
    `,
    checks: "",
  },
  "shortest-path-in-binary-matrix": {
    code: cpp`
      class Solution {
      public:
          int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
              int n = grid.size();
              if (grid[0][0] || grid[n - 1][n - 1]) return -1;
              queue<pair<int, int>> q;
              q.push({0, 0});
              grid[0][0] = 1;
              for (int length = 1; !q.empty(); length++) {
                  for (int i = q.size(); i > 0; i--) {
                      auto [r, c] = q.front();
                      q.pop();
                      if (r == n - 1 && c == n - 1) return length;
                      for (int dr = -1; dr <= 1; dr++) {
                          for (int dc = -1; dc <= 1; dc++) {
                              int nr = r + dr, nc = c + dc;
                              if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
                              if (grid[nr][nc] != 0) continue;
                              grid[nr][nc] = 1;
                              q.push({nr, nc});
                          }
                      }
                  }
              }
              return -1;
          }
      };
    `,
    checks: "",
  },
  "redundant-connection": {
    code: cpp`
      class Solution {
      public:
          vector<int> findRedundantConnection(vector<vector<int>>& edges) {
              parent.resize(edges.size() + 1);
              iota(parent.begin(), parent.end(), 0);
              for (auto& e : edges) {
                  int a = find(e[0]), b = find(e[1]);
                  if (a == b) return e;
                  parent[a] = b;
              }
              return {};
          }

      private:
          vector<int> parent;

          int find(int x) {
              while (parent[x] != x) x = parent[x] = parent[parent[x]];
              return x;
          }
      };
    `,
    checks: "",
  },
  "is-graph-bipartite": {
    code: cpp`
      class Solution {
      public:
          bool isBipartite(vector<vector<int>>& graph) {
              vector<int> color(graph.size(), -1);
              for (int start = 0; start < graph.size(); start++) {
                  if (color[start] != -1) continue;
                  color[start] = 0;
                  queue<int> q;
                  q.push(start);
                  while (!q.empty()) {
                      int node = q.front();
                      q.pop();
                      for (int next : graph[node]) {
                          if (color[next] == -1) {
                              color[next] = 1 - color[node];
                              q.push(next);
                          } else if (color[next] == color[node]) {
                              return false;
                          }
                      }
                  }
              }
              return true;
          }
      };
    `,
    checks: "",
  },
  "keys-and-rooms": {
    code: cpp`
      class Solution {
      public:
          bool canVisitAllRooms(vector<vector<int>>& rooms) {
              vector<bool> seen(rooms.size());
              seen[0] = true;
              stack<int> st;
              st.push(0);
              int visited = 1;
              while (!st.empty()) {
                  int room = st.top();
                  st.pop();
                  for (int key : rooms[room]) {
                      if (!seen[key]) {
                          seen[key] = true;
                          visited++;
                          st.push(key);
                      }
                  }
              }
              return visited == rooms.size();
          }
      };
    `,
    checks: "",
  },
  "01-matrix": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
              int rows = mat.size(), cols = mat[0].size();
              vector<vector<int>> dist(rows, vector<int>(cols, -1));
              queue<pair<int, int>> q;
              for (int r = 0; r < rows; r++) {
                  for (int c = 0; c < cols; c++) {
                      if (mat[r][c] == 0) {
                          dist[r][c] = 0;
                          q.push({r, c});
                      }
                  }
              }
              int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
              while (!q.empty()) {
                  auto [r, c] = q.front();
                  q.pop();
                  for (auto& d : dirs) {
                      int nr = r + d[0], nc = c + d[1];
                      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
                      if (dist[nr][nc] != -1) continue;
                      dist[nr][nc] = dist[r][c] + 1;
                      q.push({nr, nc});
                  }
              }
              return dist;
          }
      };
    `,
    checks: "",
  },
};
