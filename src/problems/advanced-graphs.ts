import { topic } from "./types";

export const advancedGraphs = topic("Advanced Graphs", [
  {
    id: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Medium",
    statement:
      "`times[i] = [u, v, w]` is a directed edge from u to v taking w time. A signal starts at node `k`. Return how long until all `n` nodes receive it, or -1 if some never do.\n\nExample: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2 → 2",
    approach:
      "Dijkstra's shortest paths from k. With up to 100 nodes, the simple O(V²) version (pick the closest unfinished node each round) is enough. The answer is the largest distance.",
    time: "O(V² + E)",
    space: "O(V + E)",
  },
  {
    id: "cheapest-flights-within-k-stops",
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    statement:
      "Return the cheapest price from `src` to `dst` using at most `k` stops, or -1 if impossible. `flights[i] = [from, to, price]`.\n\nExample: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1 → 700",
    approach:
      "Bellman–Ford limited to k + 1 rounds. Relax every flight from a copy of the previous round's prices so each round adds at most one flight.",
    time: "O(k · E)",
    space: "O(n)",
  },
  {
    id: "min-cost-to-connect-all-points",
    title: "Min Cost to Connect All Points",
    difficulty: "Medium",
    statement:
      "Connecting two points costs their Manhattan distance. Return the minimum total cost to connect all `points`.\n\nExample: [[0,0],[2,2],[3,10],[5,2],[7,0]] → 20",
    approach:
      "This is a minimum spanning tree on a complete graph. Prim's algorithm with an array of best distances runs in O(n²), with no edge list needed.",
    time: "O(n²)",
    space: "O(n)",
  },
  {
    id: "alien-dictionary",
    title: "Alien Dictionary",
    difficulty: "Hard",
    statement:
      "`words` are sorted in an alien language's alphabet. Return a valid letter order, or \"\" if the input is inconsistent.\n\nExample: [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"] → \"wertf\"",
    approach:
      "The first differing letter of each adjacent pair gives an edge \"a comes before b\". Topologically sort the letters; a cycle (or a word before its own prefix) means no valid order.",
    time: "O(total characters)",
    space: "O(1) (bounded alphabet)",
  },
  {
    id: "swim-in-rising-water",
    title: "Swim in Rising Water",
    difficulty: "Hard",
    statement:
      "At time t the water level is t, and you can swim between adjacent cells whose elevation is at most t. Return the earliest time you can get from the top-left to the bottom-right of the n×n `grid`.\n\nExample: [[0,2],[1,3]] → 3",
    approach:
      "Binary search on the time t: for a candidate t, check with DFS whether the corner is reachable through cells no higher than t.",
    time: "O(n² log n²)",
    space: "O(n²)",
  },
  {
    id: "reconstruct-itinerary",
    title: "Reconstruct Itinerary",
    difficulty: "Hard",
    statement:
      "Use every ticket `[from, to]` exactly once to build an itinerary starting at \"JFK\". If several work, return the lexically smallest.\n\nExample: [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]] → [\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]",
    approach:
      "Hierholzer's algorithm for an Eulerian path: DFS always taking the smallest remaining destination, and add each airport to the route after its edges are used up. Reverse at the end.",
    time: "O(E log E)",
    space: "O(E)",
  },
  {
    id: "accounts-merge",
    title: "Accounts Merge",
    difficulty: "Medium",
    statement:
      "Each account is [name, ...emails]. Accounts sharing any email belong to the same person. Merge them and return each person's name followed by their sorted emails.",
    approach:
      "Union-find over emails: join every email in an account with the account's first email. Then group emails by their root and attach the owner's name.",
    time: "O(N log N)",
    space: "O(N)",
  },
  {
    id: "number-of-provinces",
    title: "Number of Provinces",
    difficulty: "Medium",
    statement:
      "`isConnected[i][j] = 1` means cities i and j are directly connected. A province is a group of connected cities. Return the number of provinces.\n\nExample: [[1,1,0],[1,1,0],[0,0,1]] → 2",
    approach: "Count how many times you need to start a new DFS to visit every city.",
    time: "O(n²)",
    space: "O(n)",
  },
  {
    id: "path-with-minimum-effort",
    title: "Path With Minimum Effort",
    difficulty: "Medium",
    statement:
      "A path's effort is the largest height difference between two consecutive cells on it. Return the minimum effort to get from the top-left to the bottom-right of `heights`.\n\nExample: [[1,2,2],[3,8,2],[5,3,5]] → 2",
    approach: "Binary search the effort limit, checking with DFS whether the corner is reachable using only steps within that limit.",
    time: "O(m · n · log maxHeight)",
    space: "O(m · n)",
  },
  {
    id: "find-eventual-safe-states",
    title: "Find Eventual Safe States",
    difficulty: "Medium",
    statement:
      "In a directed graph, a node is safe if every path from it ends at a terminal node (no outgoing edges). Return all safe nodes in ascending order.\n\nExample: [[1,2],[2,3],[5],[0],[5],[],[]] → [2,4,5,6]",
    approach:
      "DFS with three states: unvisited, visiting and safe. Reaching a node that's still \"visiting\" means a cycle, so the path isn't safe.",
    time: "O(V + E)",
    space: "O(V)",
  },
]);
