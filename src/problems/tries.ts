import { topic } from "./types";

export const tries = topic("Tries", [
  {
    id: "implement-trie",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    statement:
      "Implement a trie with `insert(word)`, `search(word)` (is the exact word stored?) and `startsWith(prefix)` (is any stored word starting with it?).",
    approach:
      "Each node maps a character to a child node and marks whether a word ends there. Insert walks and creates nodes; search and startsWith walk existing nodes.",
    time: "O(L) per operation",
    space: "O(total characters)",
  },
  {
    id: "design-add-and-search-words",
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    statement:
      "Support `addWord(word)` and `search(word)`, where the search pattern may contain \".\" matching any single letter.\n\nExample: after adding \"bad\", search(\".ad\") → true",
    approach:
      "Store words in a trie. Searching follows the exact child for letters and tries every child for \".\", recursively.",
    time: "O(L) add, O(26^L) worst-case search",
    space: "O(total characters)",
  },
  {
    id: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    statement:
      "Return every word from `words` that can be traced on the letter `board` by moving between horizontally or vertically adjacent cells, using each cell at most once per word.\n\nExample: board with \"oath\" and \"eat\" traceable → [\"eat\",\"oath\"]",
    approach:
      "Put all words in a trie, then DFS from every cell, following trie edges as you step. Reaching a node that ends a word records it (once). Mark cells as visited during the DFS.",
    time: "O(m · n · 4^L)",
    space: "O(total characters)",
  },
  {
    id: "replace-words",
    title: "Replace Words",
    difficulty: "Medium",
    statement:
      "Replace every word in `sentence` with the shortest root from `dictionary` that it starts with, if any.\n\nExample: dictionary = [\"cat\",\"bat\",\"rat\"], \"the cattle was rattled by the battery\" → \"the cat was rat by the bat\"",
    approach:
      "Build a trie of the roots. For each word, walk the trie letter by letter and stop at the first node that ends a root.",
    time: "O(total characters)",
    space: "O(dictionary characters)",
  },
]);
