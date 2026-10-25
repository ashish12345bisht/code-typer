import { js, type Solution } from "../types";

export const graphsJavascript: Record<string, Solution> = {
  "number-of-islands": {
    code: js`
      function numIslands(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const sink = (r, c) => {
          if (r < 0 || c < 0 || r >= rows || c >= cols) return;
          if (grid[r][c] !== "1") return;
          grid[r][c] = "0";
          sink(r + 1, c);
          sink(r - 1, c);
          sink(r, c + 1);
          sink(r, c - 1);
        };
        let islands = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "1") {
              islands++;
              sink(r, c);
            }
          }
        }
        return islands;
      }
    `,
    checks: "",
  },
  "max-area-of-island": {
    code: js`
      function maxAreaOfIsland(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const area = (r, c) => {
          if (r < 0 || c < 0 || r >= rows || c >= cols) return 0;
          if (grid[r][c] !== 1) return 0;
          grid[r][c] = 0;
          return (
            1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)
          );
        };
        let best = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) best = Math.max(best, area(r, c));
        }
        return best;
      }
    `,
    checks: "",
  },
  "flood-fill": {
    code: js`
      function floodFill(image, sr, sc, color) {
        const start = image[sr][sc];
        if (start === color) return image;
        const fill = (r, c) => {
          if (r < 0 || c < 0 || r >= image.length || c >= image[0].length) return;
          if (image[r][c] !== start) return;
          image[r][c] = color;
          fill(r + 1, c);
          fill(r - 1, c);
          fill(r, c + 1);
          fill(r, c - 1);
        };
        fill(sr, sc);
        return image;
      }
    `,
    checks: "",
  },
  "rotting-oranges": {
    code: js`
      function orangesRotting(grid) {
        let queue = [];
        let fresh = 0;
        grid.forEach((row, r) =>
          row.forEach((v, c) => {
            if (v === 2) queue.push([r, c]);
            if (v === 1) fresh++;
          }),
        );
        let minutes = 0;
        const dirs = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ];
        while (queue.length && fresh > 0) {
          const next = [];
          for (const [r, c] of queue) {
            for (const [dr, dc] of dirs) {
              const nr = r + dr;
              const nc = c + dc;
              if (grid[nr]?.[nc] !== 1) continue;
              grid[nr][nc] = 2;
              fresh--;
              next.push([nr, nc]);
            }
          }
          queue = next;
          minutes++;
        }
        return fresh === 0 ? minutes : -1;
      }
    `,
    checks: "",
  },
  "pacific-atlantic-water-flow": {
    code: js`
      function pacificAtlantic(heights) {
        const rows = heights.length;
        const cols = heights[0].length;
        const pacific = new Set();
        const atlantic = new Set();
        const climb = (r, c, seen, prev) => {
          if (r < 0 || c < 0 || r >= rows || c >= cols) return;
          const key = r * cols + c;
          if (seen.has(key) || heights[r][c] < prev) return;
          seen.add(key);
          climb(r + 1, c, seen, heights[r][c]);
          climb(r - 1, c, seen, heights[r][c]);
          climb(r, c + 1, seen, heights[r][c]);
          climb(r, c - 1, seen, heights[r][c]);
        };
        for (let r = 0; r < rows; r++) {
          climb(r, 0, pacific, -Infinity);
          climb(r, cols - 1, atlantic, -Infinity);
        }
        for (let c = 0; c < cols; c++) {
          climb(0, c, pacific, -Infinity);
          climb(rows - 1, c, atlantic, -Infinity);
        }
        const result = [];
        for (const key of pacific) {
          if (atlantic.has(key)) result.push([Math.floor(key / cols), key % cols]);
        }
        return result;
      }
    `,
    checks: "",
  },
  "surrounded-regions": {
    code: js`
      function solve(board) {
        const rows = board.length;
        const cols = board[0].length;
        const keep = (r, c) => {
          if (r < 0 || c < 0 || r >= rows || c >= cols) return;
          if (board[r][c] !== "O") return;
          board[r][c] = "S";
          keep(r + 1, c);
          keep(r - 1, c);
          keep(r, c + 1);
          keep(r, c - 1);
        };
        for (let r = 0; r < rows; r++) {
          keep(r, 0);
          keep(r, cols - 1);
        }
        for (let c = 0; c < cols; c++) {
          keep(0, c);
          keep(rows - 1, c);
        }
        for (const row of board) {
          row.forEach((v, c) => {
            row[c] = v === "S" ? "O" : "X";
          });
        }
        return board;
      }
    `,
    checks: "",
  },
  "course-schedule": {
    code: js`
      function canFinish(numCourses, prerequisites) {
        const graph = Array.from({ length: numCourses }, () => []);
        const indegree = new Array(numCourses).fill(0);
        for (const [course, pre] of prerequisites) {
          graph[pre].push(course);
          indegree[course]++;
        }
        const queue = [];
        for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
        let taken = 0;
        while (queue.length) {
          const c = queue.shift();
          taken++;
          for (const next of graph[c]) {
            if (--indegree[next] === 0) queue.push(next);
          }
        }
        return taken === numCourses;
      }
    `,
    checks: "",
  },
  "course-schedule-ii": {
    code: js`
      function findOrder(numCourses, prerequisites) {
        const graph = Array.from({ length: numCourses }, () => []);
        const indegree = new Array(numCourses).fill(0);
        for (const [course, pre] of prerequisites) {
          graph[pre].push(course);
          indegree[course]++;
        }
        const queue = [];
        for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
        const order = [];
        while (queue.length) {
          const c = queue.shift();
          order.push(c);
          for (const next of graph[c]) {
            if (--indegree[next] === 0) queue.push(next);
          }
        }
        return order.length === numCourses ? order : [];
      }
    `,
    checks: "",
  },
  "number-of-connected-components": {
    code: js`
      function countComponents(n, edges) {
        const parent = Array.from({ length: n }, (_, i) => i);
        const find = (x) => {
          while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
          }
          return x;
        };
        let components = n;
        for (const [a, b] of edges) {
          const ra = find(a);
          const rb = find(b);
          if (ra !== rb) {
            parent[ra] = rb;
            components--;
          }
        }
        return components;
      }
    `,
    checks: "",
  },
  "graph-valid-tree": {
    code: js`
      function validTree(n, edges) {
        if (edges.length !== n - 1) return false;
        const parent = Array.from({ length: n }, (_, i) => i);
        const find = (x) => {
          while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
          }
          return x;
        };
        for (const [a, b] of edges) {
          const ra = find(a);
          const rb = find(b);
          if (ra === rb) return false;
          parent[ra] = rb;
        }
        return true;
      }
    `,
    checks: "",
  },
  "walls-and-gates": {
    code: js`
      function wallsAndGates(rooms) {
        const INF = 2147483647;
        let queue = [];
        rooms.forEach((row, r) =>
          row.forEach((v, c) => {
            if (v === 0) queue.push([r, c]);
          }),
        );
        const dirs = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ];
        while (queue.length) {
          const next = [];
          for (const [r, c] of queue) {
            for (const [dr, dc] of dirs) {
              const nr = r + dr;
              const nc = c + dc;
              if (rooms[nr]?.[nc] !== INF) continue;
              rooms[nr][nc] = rooms[r][c] + 1;
              next.push([nr, nc]);
            }
          }
          queue = next;
        }
        return rooms;
      }
    `,
    checks: "",
  },
  "word-ladder": {
    code: js`
      function ladderLength(beginWord, endWord, wordList) {
        const words = new Set(wordList);
        if (!words.has(endWord)) return 0;
        let queue = [beginWord];
        let steps = 1;
        const letters = "abcdefghijklmnopqrstuvwxyz";
        while (queue.length) {
          const next = [];
          for (const word of queue) {
            if (word === endWord) return steps;
            for (let i = 0; i < word.length; i++) {
              for (const ch of letters) {
                const candidate = word.slice(0, i) + ch + word.slice(i + 1);
                if (words.has(candidate)) {
                  words.delete(candidate);
                  next.push(candidate);
                }
              }
            }
          }
          queue = next;
          steps++;
        }
        return 0;
      }
    `,
    checks: "",
  },
  "shortest-path-in-binary-matrix": {
    code: js`
      function shortestPathBinaryMatrix(grid) {
        const n = grid.length;
        if (grid[0][0] || grid[n - 1][n - 1]) return -1;
        let queue = [[0, 0]];
        grid[0][0] = 1;
        let length = 1;
        while (queue.length) {
          const next = [];
          for (const [r, c] of queue) {
            if (r === n - 1 && c === n - 1) return length;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (grid[nr]?.[nc] !== 0) continue;
                grid[nr][nc] = 1;
                next.push([nr, nc]);
              }
            }
          }
          queue = next;
          length++;
        }
        return -1;
      }
    `,
    checks: "",
  },
  "redundant-connection": {
    code: js`
      function findRedundantConnection(edges) {
        const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
        const find = (x) => {
          while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
          }
          return x;
        };
        for (const [a, b] of edges) {
          const ra = find(a);
          const rb = find(b);
          if (ra === rb) return [a, b];
          parent[ra] = rb;
        }
        return [];
      }
    `,
    checks: "",
  },
  "is-graph-bipartite": {
    code: js`
      function isBipartite(graph) {
        const color = new Array(graph.length).fill(-1);
        for (let start = 0; start < graph.length; start++) {
          if (color[start] !== -1) continue;
          color[start] = 0;
          const queue = [start];
          while (queue.length) {
            const node = queue.shift();
            for (const next of graph[node]) {
              if (color[next] === -1) {
                color[next] = 1 - color[node];
                queue.push(next);
              } else if (color[next] === color[node]) {
                return false;
              }
            }
          }
        }
        return true;
      }
    `,
    checks: "",
  },
  "keys-and-rooms": {
    code: js`
      function canVisitAllRooms(rooms) {
        const seen = new Set([0]);
        const stack = [0];
        while (stack.length) {
          for (const key of rooms[stack.pop()]) {
            if (!seen.has(key)) {
              seen.add(key);
              stack.push(key);
            }
          }
        }
        return seen.size === rooms.length;
      }
    `,
    checks: "",
  },
  "01-matrix": {
    code: js`
      function updateMatrix(mat) {
        const rows = mat.length;
        const cols = mat[0].length;
        const dist = mat.map((row) => row.map((v) => (v ? -1 : 0)));
        let queue = [];
        dist.forEach((row, r) =>
          row.forEach((d, c) => {
            if (d === 0) queue.push([r, c]);
          }),
        );
        const dirs = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ];
        while (queue.length) {
          const next = [];
          for (const [r, c] of queue) {
            for (const [dr, dc] of dirs) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
              if (dist[nr][nc] !== -1) continue;
              dist[nr][nc] = dist[r][c] + 1;
              next.push([nr, nc]);
            }
          }
          queue = next;
        }
        return dist;
      }
    `,
    checks: "",
  },
};
