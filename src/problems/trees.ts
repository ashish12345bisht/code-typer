import { topic } from "./types";

const NOTE = "\n\n`TreeNode` (with `val`, `left` and `right`) is provided.";

export const trees = topic("Trees", [
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    statement: "Mirror a binary tree by swapping every node's left and right children, and return the root.\n\nExample: [4,2,7,1,3,6,9] → [4,7,2,9,6,3,1]" + NOTE,
    approach: "Recursively invert both subtrees and swap them.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    statement: "Return the number of nodes on the longest path from the root down to a leaf.\n\nExample: [3,9,20,null,null,15,7] → 3" + NOTE,
    approach: "The depth of a node is 1 plus the larger depth of its two subtrees; an empty tree has depth 0.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    statement: "Return the length (in edges) of the longest path between any two nodes. The path may skip the root.\n\nExample: [1,2,3,4,5] → 3" + NOTE,
    approach:
      "Compute each subtree's height recursively. The longest path through a node is left height + right height; track the best across all nodes.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    statement:
      "A tree is balanced if, at every node, the heights of the two subtrees differ by at most one. Return whether the tree is balanced.\n\nExample: [3,9,20,null,null,15,7] → true" + NOTE,
    approach:
      "Compute heights bottom-up and return -1 as soon as any subtree is unbalanced, so every node is visited once.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    statement: "Return `true` if two binary trees have the same structure and node values.\n\nExample: [1,2,3] and [1,2,3] → true" + NOTE,
    approach: "Two trees are equal if both roots are empty, or both values match and both pairs of subtrees are equal.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    statement:
      "Return `true` if `sub` is identical to some node of `root` together with all of that node's descendants.\n\nExample: root = [3,4,5,1,2], sub = [4,1,2] → true" + NOTE,
    approach: "At every node of `root`, check whether the tree starting there is the same as `sub`.",
    time: "O(n · m)",
    space: "O(h)",
  },
  {
    id: "lowest-common-ancestor-of-a-bst",
    title: "Lowest Common Ancestor of a BST",
    difficulty: "Medium",
    statement:
      "In a binary search tree, return the value of the lowest node that has both values `p` and `q` as descendants (a node counts as its own descendant).\n\nExample: [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8 → 6" + NOTE,
    approach:
      "Walk down from the root: if both values are smaller go left, if both are bigger go right. The first node where they split is the answer.",
    time: "O(h)",
    space: "O(1)",
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    statement: "Return the node values level by level, from left to right.\n\nExample: [3,9,20,null,null,15,7] → [[3],[9,20],[15,7]]" + NOTE,
    approach: "Breadth-first search one level at a time: record the current level's values, then build the next level from their children.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    statement: "Imagine standing on the right of the tree. Return the values you can see, top to bottom.\n\nExample: [1,2,3,null,5,null,4] → [1,3,4]" + NOTE,
    approach: "Do a level-order traversal and take the last node of each level.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "count-good-nodes-in-binary-tree",
    title: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    statement:
      "A node is good if no node on the path from the root to it has a greater value. Return the number of good nodes.\n\nExample: [3,1,4,3,null,1,5] → 4" + NOTE,
    approach: "DFS while carrying the largest value seen on the path so far. A node is good if its value is at least that maximum.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    statement:
      "Return `true` if the tree is a valid BST: every left subtree holds only smaller values and every right subtree only larger values.\n\nExample: [5,1,4,null,null,3,6] → false" + NOTE,
    approach: "Pass down the allowed (low, high) range. Going left tightens the upper bound, going right tightens the lower bound.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "kth-smallest-element-in-a-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    statement: "Return the k-th smallest value (1-indexed) in a binary search tree.\n\nExample: [3,1,4,null,2], k = 1 → 1" + NOTE,
    approach: "An in-order traversal of a BST visits values in sorted order. Traverse iteratively with a stack and stop at the k-th node.",
    time: "O(h + k)",
    space: "O(h)",
  },
  {
    id: "construct-tree-from-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    statement:
      "Rebuild a binary tree (with unique values) from its preorder and inorder traversals.\n\nExample: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] → [3,9,20,null,null,15,7]" + NOTE,
    approach:
      "The next preorder value is the root. Its position in the inorder array splits the remaining values into the left and right subtrees; a map gives that position in O(1).",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    statement:
      "A path is any sequence of connected nodes, each used at most once. Return the largest sum of node values along any non-empty path.\n\nExample: [-10,9,20,null,null,15,7] → 42 (15→20→7)" + NOTE,
    approach:
      "For each node, compute the best downward gain from each child (ignoring negative gains). The best path through the node uses both gains; the node passes only its better side upwards.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    statement:
      "Design `serialize` to turn a binary tree into a string and `deserialize` to rebuild the same tree from that string." + NOTE,
    approach:
      "Write a preorder traversal with \"#\" for empty children, joined by commas. Rebuilding reads the values back in the same preorder.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "path-sum",
    title: "Path Sum",
    difficulty: "Easy",
    statement:
      "Return `true` if some root-to-leaf path adds up to `targetSum`.\n\nExample: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22 → true" + NOTE,
    approach: "Subtract each node's value from the target as you go down. At a leaf, check whether the remainder is exactly zero.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "symmetric-tree",
    title: "Symmetric Tree",
    difficulty: "Easy",
    statement: "Return `true` if the tree is a mirror of itself around its centre.\n\nExample: [1,2,2,3,4,4,3] → true" + NOTE,
    approach: "Compare the two subtrees as mirrors: outer children with outer children, inner with inner.",
    time: "O(n)",
    space: "O(h)",
  },
  {
    id: "zigzag-level-order-traversal",
    title: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "Medium",
    statement:
      "Return the level order traversal, alternating left-to-right and right-to-left on each level.\n\nExample: [3,9,20,null,null,15,7] → [[3],[20,9],[15,7]]" + NOTE,
    approach: "Do a normal level-order traversal and reverse every other level's values before storing them.",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "insert-into-a-bst",
    title: "Insert into a Binary Search Tree",
    difficulty: "Medium",
    statement: "Insert `val` (not already present) into the BST and return the root.\n\nExample: [4,2,7,1,3], val = 5 → [4,2,7,1,3,5]" + NOTE,
    approach: "Go left or right by comparing with each node until you reach an empty spot, and put the new node there.",
    time: "O(h)",
    space: "O(h)",
  },
]);
