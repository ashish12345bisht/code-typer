import { topic } from "./types";

export const graphs = topic("Graphs", [
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    statement:
      "In a grid of \"1\" (land) and \"0\" (water), count the islands: groups of land connected horizontally or vertically.\n\nExample: a grid with three separate land groups → 3",
    approach: "Scan the grid; each unvisited land cell starts a new island. Flood-fill it with DFS, turning its land to water so it isn't counted again.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "max-area-of-island",
    title: "Max Area of Island",
    difficulty: "Medium",
    statement:
      "In a binary grid, an island is a group of 1s connected horizontally or vertically. Return the area of the largest island, or 0.\n\nExample: [[0,0,1,0],[0,1,1,0],[0,0,0,1]] → 3",
    approach: "DFS from each land cell, sinking cells as you count them. The DFS returns the island's size; keep the maximum.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "flood-fill",
    title: "Flood Fill",
    difficulty: "Easy",
    statement:
      "Starting at pixel (sr, sc), recolor it and every connected pixel of the same original color to `color`, then return the image.\n\nExample: [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2 → [[2,2,2],[2,2,0],[2,0,1]]",
    approach: "DFS from the start pixel, painting pixels that still have the original color. If the new color equals the original, nothing changes.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    statement:
      "Each minute, rotten oranges (2) rot their fresh neighbours (1) up, down, left and right. Return the minutes until no fresh orange is left, or -1 if that never happens.\n\nExample: [[2,1,1],[1,1,0],[0,1,1]] → 4",
    approach: "Multi-source BFS: start with every rotten orange in the queue and spread one ring per minute, counting down the fresh oranges.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    statement:
      "Water flows from a cell to neighbours of equal or lower height. The Pacific touches the top and left edges, the Atlantic the bottom and right. Return every cell from which water can reach both oceans.",
    approach:
      "Search backwards from each ocean: DFS uphill (to cells at least as high) from its edge cells. Cells reached from both oceans are the answer.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "surrounded-regions",
    title: "Surrounded Regions",
    difficulty: "Medium",
    statement:
      "Capture every region of \"O\" that is fully surrounded by \"X\" by flipping it to \"X\". Regions touching the border survive.",
    approach:
      "Mark every \"O\" connected to the border as safe with DFS. Then flip all remaining \"O\" to \"X\" and restore the safe ones.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    statement:
      "There are `numCourses` courses, and `[a, b]` in `prerequisites` means b must be taken before a. Return whether all courses can be finished.\n\nExample: numCourses = 2, prerequisites = [[1,0],[0,1]] → false",
    approach:
      "Kahn's algorithm: repeatedly take courses with no remaining prerequisites and decrement their dependants. If every course gets taken there's no cycle.",
    time: "O(V + E)",
    space: "O(V + E)",
  },
  {
    id: "course-schedule-ii",
    title: "Course Schedule II",
    difficulty: "Medium",
    statement:
      "Return an order in which all courses can be taken given the `prerequisites`, or an empty array if it's impossible.\n\nExample: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] → [0,1,2,3]",
    approach: "Topological sort with Kahn's algorithm, recording courses in the order they become available.",
    time: "O(V + E)",
    space: "O(V + E)",
  },
  {
    id: "number-of-connected-components",
    title: "Number of Connected Components in an Undirected Graph",
    difficulty: "Medium",
    statement:
      "Given `n` nodes and undirected `edges`, return the number of connected components.\n\nExample: n = 5, edges = [[0,1],[1,2],[3,4]] → 2",
    approach:
      "Union-find: start with n components and merge the sets of each edge's endpoints, subtracting one whenever two different sets join.",
    time: "O(E · α(n))",
    space: "O(n)",
  },
  {
    id: "graph-valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    statement:
      "Given `n` nodes and undirected `edges`, return whether they form a valid tree: connected with no cycles.\n\nExample: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]] → true",
    approach:
      "A tree has exactly n - 1 edges. With that count, it's a tree if adding edges with union-find never connects two nodes that are already connected.",
    time: "O(E · α(n))",
    space: "O(n)",
  },
  {
    id: "walls-and-gates",
    title: "Walls and Gates",
    difficulty: "Medium",
    statement:
      "In `rooms`, -1 is a wall, 0 a gate and 2147483647 an empty room. Fill each empty room with the distance to its nearest gate (leave it if unreachable).",
    approach: "Multi-source BFS from every gate at once. The first time BFS reaches an empty room is its shortest distance.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    statement:
      "Transform `beginWord` into `endWord` by changing one letter at a time, where every intermediate word must be in `wordList`. Return the number of words in the shortest sequence, or 0.\n\nExample: \"hit\" → \"cog\" via hot, dot, dog → 5",
    approach:
      "BFS over words, one level per transformation. Generate neighbours by trying every letter at every position, and remove words from the set once visited.",
    time: "O(n · L · 26)",
    space: "O(n)",
  },
  {
    id: "shortest-path-in-binary-matrix",
    title: "Shortest Path in Binary Matrix",
    difficulty: "Medium",
    statement:
      "Return the length of the shortest path of 0-cells from the top-left to the bottom-right corner, moving in any of 8 directions, or -1 if none exists.\n\nExample: [[0,0,0],[1,1,0],[1,1,0]] → 4",
    approach: "BFS from the start, one layer per step, marking cells as visited when they're queued.",
    time: "O(n²)",
    space: "O(n²)",
  },
  {
    id: "redundant-connection",
    title: "Redundant Connection",
    difficulty: "Medium",
    statement:
      "A tree with nodes 1..n had one extra edge added. Return the edge that can be removed to make it a tree again (the last such edge in the input).\n\nExample: [[1,2],[1,3],[2,3]] → [2,3]",
    approach: "Add edges one by one with union-find. The first edge whose endpoints are already connected creates the cycle.",
    time: "O(n · α(n))",
    space: "O(n)",
  },
  {
    id: "is-graph-bipartite",
    title: "Is Graph Bipartite?",
    difficulty: "Medium",
    statement:
      "`graph[i]` lists the neighbours of node i. Return whether the nodes can be split into two groups so every edge connects the two groups.\n\nExample: [[1,3],[0,2],[1,3],[0,2]] → true",
    approach: "Two-color each component with BFS, giving neighbours the opposite color. A neighbour with the same color means it isn't bipartite.",
    time: "O(V + E)",
    space: "O(V)",
  },
  {
    id: "keys-and-rooms",
    title: "Keys and Rooms",
    difficulty: "Medium",
    statement:
      "Room 0 is unlocked and `rooms[i]` lists the keys found in room i. Return whether you can visit every room.\n\nExample: [[1],[2],[3],[]] → true",
    approach: "DFS from room 0 using the keys as edges, then check that every room was visited.",
    time: "O(V + E)",
    space: "O(V)",
  },
  {
    id: "01-matrix",
    title: "01 Matrix",
    difficulty: "Medium",
    statement:
      "For each cell of a binary matrix, return the distance to the nearest 0 (moving up, down, left or right).\n\nExample: [[0,0,0],[0,1,0],[1,1,1]] → [[0,0,0],[0,1,0],[1,2,1]]",
    approach: "Multi-source BFS starting from every 0 at distance 0; each layer outwards is one step further.",
    time: "O(m · n)",
    space: "O(m · n)",
  },
]);
