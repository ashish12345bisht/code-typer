import { js, type Solution } from "../types";

export const treesJavascript: Record<string, Solution> = {
  "invert-binary-tree": {
    code: js`
      function invertTree(root) {
        if (!root) return null;
        [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
        return root;
      }
    `,
    checks: "",
  },
  "maximum-depth-of-binary-tree": {
    code: js`
      function maxDepth(root) {
        if (!root) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
      }
    `,
    checks: "",
  },
  "diameter-of-binary-tree": {
    code: js`
      function diameterOfBinaryTree(root) {
        let best = 0;
        const depth = (node) => {
          if (!node) return 0;
          const left = depth(node.left);
          const right = depth(node.right);
          best = Math.max(best, left + right);
          return 1 + Math.max(left, right);
        };
        depth(root);
        return best;
      }
    `,
    checks: "",
  },
  "balanced-binary-tree": {
    code: js`
      function isBalanced(root) {
        const height = (node) => {
          if (!node) return 0;
          const left = height(node.left);
          const right = height(node.right);
          if (left < 0 || right < 0 || Math.abs(left - right) > 1) return -1;
          return 1 + Math.max(left, right);
        };
        return height(root) >= 0;
      }
    `,
    checks: "",
  },
  "same-tree": {
    code: js`
      function isSameTree(p, q) {
        if (!p || !q) return p === q;
        return (
          p.val === q.val &&
          isSameTree(p.left, q.left) &&
          isSameTree(p.right, q.right)
        );
      }
    `,
    checks: "",
  },
  "subtree-of-another-tree": {
    code: js`
      function isSubtree(root, sub) {
        if (!root) return !sub;
        return (
          same(root, sub) || isSubtree(root.left, sub) || isSubtree(root.right, sub)
        );
      }
      function same(a, b) {
        if (!a || !b) return a === b;
        return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);
      }
    `,
    checks: "",
  },
  "lowest-common-ancestor-of-a-bst": {
    code: js`
      function lowestCommonAncestor(root, p, q) {
        let node = root;
        while (node) {
          if (p < node.val && q < node.val) node = node.left;
          else if (p > node.val && q > node.val) node = node.right;
          else return node.val;
        }
        return -1;
      }
    `,
    checks: "",
  },
  "binary-tree-level-order-traversal": {
    code: js`
      function levelOrder(root) {
        const levels = [];
        let queue = root ? [root] : [];
        while (queue.length) {
          levels.push(queue.map((n) => n.val));
          const next = [];
          for (const n of queue) {
            if (n.left) next.push(n.left);
            if (n.right) next.push(n.right);
          }
          queue = next;
        }
        return levels;
      }
    `,
    checks: "",
  },
  "binary-tree-right-side-view": {
    code: js`
      function rightSideView(root) {
        const view = [];
        let queue = root ? [root] : [];
        while (queue.length) {
          view.push(queue[queue.length - 1].val);
          const next = [];
          for (const n of queue) {
            if (n.left) next.push(n.left);
            if (n.right) next.push(n.right);
          }
          queue = next;
        }
        return view;
      }
    `,
    checks: "",
  },
  "count-good-nodes-in-binary-tree": {
    code: js`
      function goodNodes(root) {
        const count = (node, max) => {
          if (!node) return 0;
          const good = node.val >= max ? 1 : 0;
          const nextMax = Math.max(max, node.val);
          return good + count(node.left, nextMax) + count(node.right, nextMax);
        };
        return count(root, -Infinity);
      }
    `,
    checks: "",
  },
  "validate-binary-search-tree": {
    code: js`
      function isValidBST(root) {
        const valid = (node, lo, hi) => {
          if (!node) return true;
          if (node.val <= lo || node.val >= hi) return false;
          return valid(node.left, lo, node.val) && valid(node.right, node.val, hi);
        };
        return valid(root, -Infinity, Infinity);
      }
    `,
    checks: "",
  },
  "kth-smallest-element-in-a-bst": {
    code: js`
      function kthSmallest(root, k) {
        const stack = [];
        let node = root;
        while (node || stack.length) {
          while (node) {
            stack.push(node);
            node = node.left;
          }
          node = stack.pop();
          if (--k === 0) return node.val;
          node = node.right;
        }
        return -1;
      }
    `,
    checks: "",
  },
  "construct-tree-from-preorder-inorder": {
    code: js`
      function buildTree(preorder, inorder) {
        const index = new Map(inorder.map((v, i) => [v, i]));
        let next = 0;
        const build = (lo, hi) => {
          if (lo > hi) return null;
          const val = preorder[next++];
          const mid = index.get(val);
          const node = new TreeNode(val);
          node.left = build(lo, mid - 1);
          node.right = build(mid + 1, hi);
          return node;
        };
        return build(0, inorder.length - 1);
      }
    `,
    checks: "",
  },
  "binary-tree-maximum-path-sum": {
    code: js`
      function maxPathSum(root) {
        let best = -Infinity;
        const gain = (node) => {
          if (!node) return 0;
          const left = Math.max(0, gain(node.left));
          const right = Math.max(0, gain(node.right));
          best = Math.max(best, node.val + left + right);
          return node.val + Math.max(left, right);
        };
        gain(root);
        return best;
      }
    `,
    checks: "",
  },
  "serialize-and-deserialize-binary-tree": {
    code: js`
      class Codec {
        serialize(root) {
          const out = [];
          const walk = (node) => {
            if (!node) {
              out.push("#");
              return;
            }
            out.push(String(node.val));
            walk(node.left);
            walk(node.right);
          };
          walk(root);
          return out.join(",");
        }

        deserialize(data) {
          const values = data.split(",");
          let i = 0;
          const build = () => {
            const v = values[i++];
            if (v === "#") return null;
            const node = new TreeNode(Number(v));
            node.left = build();
            node.right = build();
            return node;
          };
          return build();
        }
      }
    `,
    checks: js`
      const codec = new Codec();
      const shape = [1, 2, 3, null, null, 4, 5];
      check(eq(fromTree(codec.deserialize(codec.serialize(toTree(shape)))), shape));
      check(codec.deserialize(codec.serialize(null)) === null);
    `,
  },
  "path-sum": {
    code: js`
      function hasPathSum(root, targetSum) {
        if (!root) return false;
        const rest = targetSum - root.val;
        if (!root.left && !root.right) return rest === 0;
        return hasPathSum(root.left, rest) || hasPathSum(root.right, rest);
      }
    `,
    checks: "",
  },
  "symmetric-tree": {
    code: js`
      function isSymmetric(root) {
        const mirror = (a, b) => {
          if (!a || !b) return a === b;
          return (
            a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left)
          );
        };
        return mirror(root?.left ?? null, root?.right ?? null);
      }
    `,
    checks: "",
  },
  "zigzag-level-order-traversal": {
    code: js`
      function zigzagLevelOrder(root) {
        const levels = [];
        let queue = root ? [root] : [];
        while (queue.length) {
          const values = queue.map((n) => n.val);
          levels.push(levels.length % 2 ? values.reverse() : values);
          const next = [];
          for (const n of queue) {
            if (n.left) next.push(n.left);
            if (n.right) next.push(n.right);
          }
          queue = next;
        }
        return levels;
      }
    `,
    checks: "",
  },
  "insert-into-a-bst": {
    code: js`
      function insertIntoBST(root, val) {
        if (!root) return new TreeNode(val);
        if (val < root.val) root.left = insertIntoBST(root.left, val);
        else root.right = insertIntoBST(root.right, val);
        return root;
      }
    `,
    checks: "",
  },
};
