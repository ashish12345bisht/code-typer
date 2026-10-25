import { java, type Solution } from "../types";

export const treesJava: Record<string, Solution> = {
  "invert-binary-tree": {
    code: java`
      class Solution {
          public TreeNode invertTree(TreeNode root) {
              if (root == null) return null;
              TreeNode left = invertTree(root.left);
              root.left = invertTree(root.right);
              root.right = left;
              return root;
          }
      }
    `,
    checks: "",
  },
  "maximum-depth-of-binary-tree": {
    code: java`
      class Solution {
          public int maxDepth(TreeNode root) {
              if (root == null) return 0;
              return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
          }
      }
    `,
    checks: "",
  },
  "diameter-of-binary-tree": {
    code: java`
      class Solution {
          private int best = 0;

          public int diameterOfBinaryTree(TreeNode root) {
              height(root);
              return best;
          }

          private int height(TreeNode node) {
              if (node == null) return 0;
              int left = height(node.left), right = height(node.right);
              best = Math.max(best, left + right);
              return 1 + Math.max(left, right);
          }
      }
    `,
    checks: "",
  },
  "balanced-binary-tree": {
    code: java`
      class Solution {
          public boolean isBalanced(TreeNode root) {
              return height(root) >= 0;
          }

          private int height(TreeNode node) {
              if (node == null) return 0;
              int left = height(node.left), right = height(node.right);
              if (left < 0 || right < 0 || Math.abs(left - right) > 1) {
                  return -1;
              }
              return 1 + Math.max(left, right);
          }
      }
    `,
    checks: "",
  },
  "same-tree": {
    code: java`
      class Solution {
          public boolean isSameTree(TreeNode p, TreeNode q) {
              if (p == null || q == null) return p == q;
              return p.val == q.val
                      && isSameTree(p.left, q.left)
                      && isSameTree(p.right, q.right);
          }
      }
    `,
    checks: "",
  },
  "subtree-of-another-tree": {
    code: java`
      class Solution {
          public boolean isSubtree(TreeNode root, TreeNode sub) {
              if (root == null) return false;
              return same(root, sub)
                      || isSubtree(root.left, sub)
                      || isSubtree(root.right, sub);
          }

          private boolean same(TreeNode a, TreeNode b) {
              if (a == null || b == null) return a == b;
              return a.val == b.val
                      && same(a.left, b.left)
                      && same(a.right, b.right);
          }
      }
    `,
    checks: "",
  },
  "lowest-common-ancestor-of-a-bst": {
    code: java`
      class Solution {
          public int lowestCommonAncestor(TreeNode root, int p, int q) {
              TreeNode node = root;
              while (node != null) {
                  if (p < node.val && q < node.val) node = node.left;
                  else if (p > node.val && q > node.val) node = node.right;
                  else return node.val;
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "binary-tree-level-order-traversal": {
    code: java`
      class Solution {
          public List<List<Integer>> levelOrder(TreeNode root) {
              List<List<Integer>> result = new ArrayList<>();
              Deque<TreeNode> queue = new ArrayDeque<>();
              if (root != null) queue.add(root);
              while (!queue.isEmpty()) {
                  List<Integer> level = new ArrayList<>();
                  for (int i = queue.size(); i > 0; i--) {
                      TreeNode node = queue.poll();
                      level.add(node.val);
                      if (node.left != null) queue.add(node.left);
                      if (node.right != null) queue.add(node.right);
                  }
                  result.add(level);
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "binary-tree-right-side-view": {
    code: java`
      class Solution {
          public List<Integer> rightSideView(TreeNode root) {
              List<Integer> result = new ArrayList<>();
              Deque<TreeNode> queue = new ArrayDeque<>();
              if (root != null) queue.add(root);
              while (!queue.isEmpty()) {
                  result.add(queue.peekLast().val);
                  for (int i = queue.size(); i > 0; i--) {
                      TreeNode node = queue.poll();
                      if (node.left != null) queue.add(node.left);
                      if (node.right != null) queue.add(node.right);
                  }
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "count-good-nodes-in-binary-tree": {
    code: java`
      class Solution {
          public int goodNodes(TreeNode root) {
              return count(root, root.val);
          }

          private int count(TreeNode node, int high) {
              if (node == null) return 0;
              int good = node.val >= high ? 1 : 0;
              high = Math.max(high, node.val);
              return good + count(node.left, high) + count(node.right, high);
          }
      }
    `,
    checks: "",
  },
  "validate-binary-search-tree": {
    code: java`
      class Solution {
          public boolean isValidBST(TreeNode root) {
              return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
          }

          private boolean valid(TreeNode node, long lo, long hi) {
              if (node == null) return true;
              if (node.val <= lo || node.val >= hi) return false;
              return valid(node.left, lo, node.val)
                      && valid(node.right, node.val, hi);
          }
      }
    `,
    checks: "",
  },
  "kth-smallest-element-in-a-bst": {
    code: java`
      class Solution {
          public int kthSmallest(TreeNode root, int k) {
              Deque<TreeNode> stack = new ArrayDeque<>();
              TreeNode node = root;
              while (node != null || !stack.isEmpty()) {
                  while (node != null) {
                      stack.push(node);
                      node = node.left;
                  }
                  node = stack.pop();
                  if (--k == 0) return node.val;
                  node = node.right;
              }
              return -1;
          }
      }
    `,
    checks: "",
  },
  "construct-tree-from-preorder-inorder": {
    code: java`
      class Solution {
          private final Map<Integer, Integer> index = new HashMap<>();
          private int[] preorder;
          private int pos = 0;

          public TreeNode buildTree(int[] preorder, int[] inorder) {
              this.preorder = preorder;
              for (int i = 0; i < inorder.length; i++) {
                  index.put(inorder[i], i);
              }
              return build(0, inorder.length - 1);
          }

          private TreeNode build(int lo, int hi) {
              if (lo > hi) return null;
              TreeNode root = new TreeNode(preorder[pos++]);
              int mid = index.get(root.val);
              root.left = build(lo, mid - 1);
              root.right = build(mid + 1, hi);
              return root;
          }
      }
    `,
    checks: "",
  },
  "binary-tree-maximum-path-sum": {
    code: java`
      class Solution {
          private int best = Integer.MIN_VALUE;

          public int maxPathSum(TreeNode root) {
              gain(root);
              return best;
          }

          private int gain(TreeNode node) {
              if (node == null) return 0;
              int left = Math.max(gain(node.left), 0);
              int right = Math.max(gain(node.right), 0);
              best = Math.max(best, node.val + left + right);
              return node.val + Math.max(left, right);
          }
      }
    `,
    checks: "",
  },
  "serialize-and-deserialize-binary-tree": {
    code: java`
      class Codec {
          public String serialize(TreeNode root) {
              StringBuilder out = new StringBuilder();
              walk(root, out);
              return out.toString();
          }

          private void walk(TreeNode node, StringBuilder out) {
              if (out.length() > 0) out.append(',');
              if (node == null) {
                  out.append('#');
                  return;
              }
              out.append(node.val);
              walk(node.left, out);
              walk(node.right, out);
          }

          public TreeNode deserialize(String data) {
              Iterator<String> values = Arrays.asList(data.split(",")).iterator();
              return build(values);
          }

          private TreeNode build(Iterator<String> values) {
              String v = values.next();
              if (v.equals("#")) return null;
              TreeNode node = new TreeNode(Integer.parseInt(v));
              node.left = build(values);
              node.right = build(values);
              return node;
          }
      }
    `,
    checks: java`
      Codec codec = new Codec();
      Integer[] shape = {1, 2, 3, null, null, 4, 5};
      TreeNode copy = codec.deserialize(codec.serialize(toTree(shape)));
      check(fromTree(copy).equals(Arrays.asList(shape)));
      check(codec.deserialize(codec.serialize(null)) == null);
    `,
  },
  "path-sum": {
    code: java`
      class Solution {
          public boolean hasPathSum(TreeNode root, int targetSum) {
              if (root == null) return false;
              int rest = targetSum - root.val;
              if (root.left == null && root.right == null) return rest == 0;
              return hasPathSum(root.left, rest)
                      || hasPathSum(root.right, rest);
          }
      }
    `,
    checks: "",
  },
  "symmetric-tree": {
    code: java`
      class Solution {
          public boolean isSymmetric(TreeNode root) {
              return root == null || mirror(root.left, root.right);
          }

          private boolean mirror(TreeNode a, TreeNode b) {
              if (a == null || b == null) return a == b;
              return a.val == b.val
                      && mirror(a.left, b.right)
                      && mirror(a.right, b.left);
          }
      }
    `,
    checks: "",
  },
  "zigzag-level-order-traversal": {
    code: java`
      class Solution {
          public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
              List<List<Integer>> result = new ArrayList<>();
              Deque<TreeNode> queue = new ArrayDeque<>();
              if (root != null) queue.add(root);
              while (!queue.isEmpty()) {
                  LinkedList<Integer> level = new LinkedList<>();
                  boolean reverse = result.size() % 2 == 1;
                  for (int i = queue.size(); i > 0; i--) {
                      TreeNode node = queue.poll();
                      if (reverse) level.addFirst(node.val);
                      else level.addLast(node.val);
                      if (node.left != null) queue.add(node.left);
                      if (node.right != null) queue.add(node.right);
                  }
                  result.add(level);
              }
              return result;
          }
      }
    `,
    checks: "",
  },
  "insert-into-a-bst": {
    code: java`
      class Solution {
          public TreeNode insertIntoBST(TreeNode root, int val) {
              if (root == null) return new TreeNode(val);
              if (val < root.val) root.left = insertIntoBST(root.left, val);
              else root.right = insertIntoBST(root.right, val);
              return root;
          }
      }
    `,
    checks: "",
  },
};
