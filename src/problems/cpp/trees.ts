import { cpp, type Solution } from "../types";

export const treesCpp: Record<string, Solution> = {
  "invert-binary-tree": {
    code: cpp`
      class Solution {
      public:
          TreeNode* invertTree(TreeNode* root) {
              if (!root) return nullptr;
              TreeNode* left = invertTree(root->left);
              root->left = invertTree(root->right);
              root->right = left;
              return root;
          }
      };
    `,
    checks: cpp`
      CHECK(fromTree(Solution().invertTree(toTree({4, 2, 7, 1, 3, 6, 9}))) == VI{4, 7, 2, 9, 6, 3, 1});
      CHECK(fromTree(Solution().invertTree(toTree({2, 1, 3}))) == VI{2, 3, 1});
    `,
  },
  "maximum-depth-of-binary-tree": {
    code: cpp`
      class Solution {
      public:
          int maxDepth(TreeNode* root) {
              if (!root) return 0;
              return 1 + max(maxDepth(root->left), maxDepth(root->right));
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().maxDepth(toTree({3, 9, 20, NIL, NIL, 15, 7})) == 3);
      CHECK(Solution().maxDepth(toTree({1, NIL, 2})) == 2);
    `,
  },
  "diameter-of-binary-tree": {
    code: cpp`
      class Solution {
      public:
          int diameterOfBinaryTree(TreeNode* root) {
              int best = 0;
              depth(root, best);
              return best;
          }

      private:
          int depth(TreeNode* node, int& best) {
              if (!node) return 0;
              int left = depth(node->left, best);
              int right = depth(node->right, best);
              best = max(best, left + right);
              return 1 + max(left, right);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().diameterOfBinaryTree(toTree({1, 2, 3, 4, 5})) == 3);
      CHECK(Solution().diameterOfBinaryTree(toTree({1, 2})) == 1);
    `,
  },
  "balanced-binary-tree": {
    code: cpp`
      class Solution {
      public:
          bool isBalanced(TreeNode* root) { return height(root) >= 0; }

      private:
          int height(TreeNode* node) {
              if (!node) return 0;
              int left = height(node->left);
              int right = height(node->right);
              if (left < 0 || right < 0 || abs(left - right) > 1) return -1;
              return 1 + max(left, right);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isBalanced(toTree({3, 9, 20, NIL, NIL, 15, 7})) == true);
      CHECK(Solution().isBalanced(toTree({1, 2, 2, 3, 3, NIL, NIL, 4, 4})) == false);
    `,
  },
  "same-tree": {
    code: cpp`
      class Solution {
      public:
          bool isSameTree(TreeNode* p, TreeNode* q) {
              if (!p || !q) return p == q;
              return p->val == q->val && isSameTree(p->left, q->left) &&
                     isSameTree(p->right, q->right);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isSameTree(toTree({1, 2, 3}), toTree({1, 2, 3})) == true);
      CHECK(Solution().isSameTree(toTree({1, 2}), toTree({1, NIL, 2})) == false);
    `,
  },
  "subtree-of-another-tree": {
    code: cpp`
      class Solution {
      public:
          bool isSubtree(TreeNode* root, TreeNode* sub) {
              if (!root) return !sub;
              return same(root, sub) || isSubtree(root->left, sub) ||
                     isSubtree(root->right, sub);
          }

      private:
          bool same(TreeNode* a, TreeNode* b) {
              if (!a || !b) return a == b;
              return a->val == b->val && same(a->left, b->left) &&
                     same(a->right, b->right);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isSubtree(toTree({3, 4, 5, 1, 2}), toTree({4, 1, 2})) == true);
      CHECK(Solution().isSubtree(toTree({3, 4, 5, 1, 2, NIL, NIL, NIL, NIL, 0}), toTree({4, 1, 2})) == false);
    `,
  },
  "lowest-common-ancestor-of-a-bst": {
    code: cpp`
      class Solution {
      public:
          int lowestCommonAncestor(TreeNode* root, int p, int q) {
              while (root) {
                  if (p < root->val && q < root->val) root = root->left;
                  else if (p > root->val && q > root->val) root = root->right;
                  else return root->val;
              }
              return -1;
          }
      };
    `,
    checks: cpp`
      TreeNode* t = toTree({6, 2, 8, 0, 4, 7, 9, NIL, NIL, 3, 5});
      CHECK(Solution().lowestCommonAncestor(t, 2, 8) == 6);
      CHECK(Solution().lowestCommonAncestor(t, 2, 4) == 2);
    `,
  },
  "binary-tree-level-order-traversal": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> levelOrder(TreeNode* root) {
              vector<vector<int>> levels;
              queue<TreeNode*> q;
              if (root) q.push(root);
              while (!q.empty()) {
                  vector<int> level;
                  for (int i = q.size(); i > 0; i--) {
                      TreeNode* node = q.front();
                      q.pop();
                      level.push_back(node->val);
                      if (node->left) q.push(node->left);
                      if (node->right) q.push(node->right);
                  }
                  levels.push_back(level);
              }
              return levels;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().levelOrder(toTree({3, 9, 20, NIL, NIL, 15, 7})) == VVI{{3}, {9, 20}, {15, 7}});
      CHECK(Solution().levelOrder(nullptr).empty());
    `,
  },
  "binary-tree-right-side-view": {
    code: cpp`
      class Solution {
      public:
          vector<int> rightSideView(TreeNode* root) {
              vector<int> view;
              queue<TreeNode*> q;
              if (root) q.push(root);
              while (!q.empty()) {
                  view.push_back(q.back()->val);
                  for (int i = q.size(); i > 0; i--) {
                      TreeNode* node = q.front();
                      q.pop();
                      if (node->left) q.push(node->left);
                      if (node->right) q.push(node->right);
                  }
              }
              return view;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().rightSideView(toTree({1, 2, 3, NIL, 5, NIL, 4})) == VI{1, 3, 4});
      CHECK(Solution().rightSideView(toTree({1, NIL, 3})) == VI{1, 3});
    `,
  },
  "count-good-nodes-in-binary-tree": {
    code: cpp`
      class Solution {
      public:
          int goodNodes(TreeNode* root) { return count(root, INT_MIN); }

      private:
          int count(TreeNode* node, int maxSoFar) {
              if (!node) return 0;
              int good = node->val >= maxSoFar ? 1 : 0;
              int next = max(maxSoFar, node->val);
              return good + count(node->left, next) + count(node->right, next);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().goodNodes(toTree({3, 1, 4, 3, NIL, 1, 5})) == 4);
      CHECK(Solution().goodNodes(toTree({3, 3, NIL, 4, 2})) == 3);
    `,
  },
  "validate-binary-search-tree": {
    code: cpp`
      class Solution {
      public:
          bool isValidBST(TreeNode* root) {
              return valid(root, LLONG_MIN, LLONG_MAX);
          }

      private:
          bool valid(TreeNode* node, long long lo, long long hi) {
              if (!node) return true;
              if (node->val <= lo || node->val >= hi) return false;
              return valid(node->left, lo, node->val) &&
                     valid(node->right, node->val, hi);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isValidBST(toTree({2, 1, 3})) == true);
      CHECK(Solution().isValidBST(toTree({5, 1, 4, NIL, NIL, 3, 6})) == false);
      CHECK(Solution().isValidBST(toTree({5, 4, 6, NIL, NIL, 3, 7})) == false);
      CHECK(Solution().isValidBST(toTree({2147483647})) == true);
    `,
  },
  "kth-smallest-element-in-a-bst": {
    code: cpp`
      class Solution {
      public:
          int kthSmallest(TreeNode* root, int k) {
              stack<TreeNode*> st;
              TreeNode* node = root;
              while (node || !st.empty()) {
                  while (node) {
                      st.push(node);
                      node = node->left;
                  }
                  node = st.top();
                  st.pop();
                  if (--k == 0) return node->val;
                  node = node->right;
              }
              return -1;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().kthSmallest(toTree({3, 1, 4, NIL, 2}), 1) == 1);
      CHECK(Solution().kthSmallest(toTree({5, 3, 6, 2, 4, NIL, NIL, 1}), 3) == 3);
    `,
  },
  "construct-tree-from-preorder-inorder": {
    code: cpp`
      class Solution {
      public:
          TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
              for (int i = 0; i < inorder.size(); i++) index[inorder[i]] = i;
              next = 0;
              return build(preorder, 0, inorder.size() - 1);
          }

      private:
          unordered_map<int, int> index;
          int next = 0;

          TreeNode* build(vector<int>& preorder, int lo, int hi) {
              if (lo > hi) return nullptr;
              TreeNode* node = new TreeNode(preorder[next++]);
              int mid = index[node->val];
              node->left = build(preorder, lo, mid - 1);
              node->right = build(preorder, mid + 1, hi);
              return node;
          }
      };
    `,
    checks: cpp`
      CHECK(fromTree(Solution().buildTree(lv(VI{3, 9, 20, 15, 7}), lv(VI{9, 3, 15, 20, 7}))) == VI{3, 9, 20, NIL, NIL, 15, 7});
      CHECK(fromTree(Solution().buildTree(lv(VI{-1}), lv(VI{-1}))) == VI{-1});
    `,
  },
  "binary-tree-maximum-path-sum": {
    code: cpp`
      class Solution {
      public:
          int maxPathSum(TreeNode* root) {
              int best = INT_MIN;
              gain(root, best);
              return best;
          }

      private:
          int gain(TreeNode* node, int& best) {
              if (!node) return 0;
              int left = max(0, gain(node->left, best));
              int right = max(0, gain(node->right, best));
              best = max(best, node->val + left + right);
              return node->val + max(left, right);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().maxPathSum(toTree({1, 2, 3})) == 6);
      CHECK(Solution().maxPathSum(toTree({-10, 9, 20, NIL, NIL, 15, 7})) == 42);
      CHECK(Solution().maxPathSum(toTree({-3})) == -3);
    `,
  },
  "serialize-and-deserialize-binary-tree": {
    code: cpp`
      class Codec {
      public:
          string serialize(TreeNode* root) {
              if (!root) return "#";
              return to_string(root->val) + "," + serialize(root->left) + "," +
                     serialize(root->right);
          }

          TreeNode* deserialize(string data) {
              stringstream ss(data);
              return build(ss);
          }

      private:
          TreeNode* build(stringstream& ss) {
              string value;
              getline(ss, value, ',');
              if (value == "#") return nullptr;
              TreeNode* node = new TreeNode(stoi(value));
              node->left = build(ss);
              node->right = build(ss);
              return node;
          }
      };
    `,
    checks: cpp`
      Codec codec;
      VI shape{1, 2, 3, NIL, NIL, 4, 5};
      CHECK(fromTree(codec.deserialize(codec.serialize(toTree(shape)))) == shape);
      CHECK(codec.deserialize(codec.serialize(nullptr)) == nullptr);
      VI negatives{-1, -20, 300};
      CHECK(fromTree(codec.deserialize(codec.serialize(toTree(negatives)))) == negatives);
    `,
  },
  "path-sum": {
    code: cpp`
      class Solution {
      public:
          bool hasPathSum(TreeNode* root, int targetSum) {
              if (!root) return false;
              int rest = targetSum - root->val;
              if (!root->left && !root->right) return rest == 0;
              return hasPathSum(root->left, rest) || hasPathSum(root->right, rest);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().hasPathSum(toTree({5, 4, 8, 11, NIL, 13, 4, 7, 2, NIL, NIL, NIL, 1}), 22) == true);
      CHECK(Solution().hasPathSum(toTree({1, 2, 3}), 5) == false);
    `,
  },
  "symmetric-tree": {
    code: cpp`
      class Solution {
      public:
          bool isSymmetric(TreeNode* root) {
              return !root || mirror(root->left, root->right);
          }

      private:
          bool mirror(TreeNode* a, TreeNode* b) {
              if (!a || !b) return a == b;
              return a->val == b->val && mirror(a->left, b->right) &&
                     mirror(a->right, b->left);
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isSymmetric(toTree({1, 2, 2, 3, 4, 4, 3})) == true);
      CHECK(Solution().isSymmetric(toTree({1, 2, 2, NIL, 3, NIL, 3})) == false);
    `,
  },
  "zigzag-level-order-traversal": {
    code: cpp`
      class Solution {
      public:
          vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
              vector<vector<int>> levels;
              queue<TreeNode*> q;
              if (root) q.push(root);
              while (!q.empty()) {
                  vector<int> level;
                  for (int i = q.size(); i > 0; i--) {
                      TreeNode* node = q.front();
                      q.pop();
                      level.push_back(node->val);
                      if (node->left) q.push(node->left);
                      if (node->right) q.push(node->right);
                  }
                  if (levels.size() % 2) reverse(level.begin(), level.end());
                  levels.push_back(level);
              }
              return levels;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().zigzagLevelOrder(toTree({3, 9, 20, NIL, NIL, 15, 7})) == VVI{{3}, {20, 9}, {15, 7}});
      CHECK(Solution().zigzagLevelOrder(toTree({1, 2, 3, 4, NIL, NIL, 5})) == VVI{{1}, {3, 2}, {4, 5}});
    `,
  },
  "insert-into-a-bst": {
    code: cpp`
      class Solution {
      public:
          TreeNode* insertIntoBST(TreeNode* root, int val) {
              if (!root) return new TreeNode(val);
              if (val < root->val) root->left = insertIntoBST(root->left, val);
              else root->right = insertIntoBST(root->right, val);
              return root;
          }
      };
    `,
    checks: cpp`
      CHECK(fromTree(Solution().insertIntoBST(toTree({4, 2, 7, 1, 3}), 5)) == VI{4, 2, 7, 1, 3, 5});
      CHECK(fromTree(Solution().insertIntoBST(nullptr, 5)) == VI{5});
    `,
  },
};
