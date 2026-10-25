import { py, type Solution } from "../types";

export const treesPython: Record<string, Solution> = {
  "invert-binary-tree": {
    code: py`
      class Solution:
          def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
              if root:
                  root.left, root.right = (
                      self.invertTree(root.right),
                      self.invertTree(root.left),
                  )
              return root
    `,
    checks: "",
  },
  "maximum-depth-of-binary-tree": {
    code: py`
      class Solution:
          def maxDepth(self, root: Optional[TreeNode]) -> int:
              if not root:
                  return 0
              return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
    `,
    checks: "",
  },
  "diameter-of-binary-tree": {
    code: py`
      class Solution:
          def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
              best = 0

              def height(node: Optional[TreeNode]) -> int:
                  nonlocal best
                  if not node:
                      return 0
                  left, right = height(node.left), height(node.right)
                  best = max(best, left + right)
                  return 1 + max(left, right)

              height(root)
              return best
    `,
    checks: "",
  },
  "balanced-binary-tree": {
    code: py`
      class Solution:
          def isBalanced(self, root: Optional[TreeNode]) -> bool:
              def height(node: Optional[TreeNode]) -> int:
                  if not node:
                      return 0
                  left, right = height(node.left), height(node.right)
                  if left < 0 or right < 0 or abs(left - right) > 1:
                      return -1
                  return 1 + max(left, right)

              return height(root) >= 0
    `,
    checks: "",
  },
  "same-tree": {
    code: py`
      class Solution:
          def isSameTree(
              self, p: Optional[TreeNode], q: Optional[TreeNode]
          ) -> bool:
              if not p or not q:
                  return p is q
              return (
                  p.val == q.val
                  and self.isSameTree(p.left, q.left)
                  and self.isSameTree(p.right, q.right)
              )
    `,
    checks: "",
  },
  "subtree-of-another-tree": {
    code: py`
      class Solution:
          def isSubtree(
              self, root: Optional[TreeNode], sub: Optional[TreeNode]
          ) -> bool:
              def same(a: Optional[TreeNode], b: Optional[TreeNode]) -> bool:
                  if not a or not b:
                      return a is b
                  return (
                      a.val == b.val
                      and same(a.left, b.left)
                      and same(a.right, b.right)
                  )

              if not root:
                  return False
              return (
                  same(root, sub)
                  or self.isSubtree(root.left, sub)
                  or self.isSubtree(root.right, sub)
              )
    `,
    checks: "",
  },
  "lowest-common-ancestor-of-a-bst": {
    code: py`
      class Solution:
          def lowestCommonAncestor(
              self, root: Optional[TreeNode], p: int, q: int
          ) -> int:
              node = root
              while node:
                  if p < node.val and q < node.val:
                      node = node.left
                  elif p > node.val and q > node.val:
                      node = node.right
                  else:
                      return node.val
              return -1
    `,
    checks: "",
  },
  "binary-tree-level-order-traversal": {
    code: py`
      class Solution:
          def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
              result = []
              queue = deque([root] if root else [])
              while queue:
                  level = []
                  for _ in range(len(queue)):
                      node = queue.popleft()
                      level.append(node.val)
                      if node.left:
                          queue.append(node.left)
                      if node.right:
                          queue.append(node.right)
                  result.append(level)
              return result
    `,
    checks: "",
  },
  "binary-tree-right-side-view": {
    code: py`
      class Solution:
          def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
              result = []
              queue = deque([root] if root else [])
              while queue:
                  result.append(queue[-1].val)
                  for _ in range(len(queue)):
                      node = queue.popleft()
                      if node.left:
                          queue.append(node.left)
                      if node.right:
                          queue.append(node.right)
              return result
    `,
    checks: "",
  },
  "count-good-nodes-in-binary-tree": {
    code: py`
      class Solution:
          def goodNodes(self, root: TreeNode) -> int:
              def count(node: Optional[TreeNode], high: int) -> int:
                  if not node:
                      return 0
                  good = 1 if node.val >= high else 0
                  high = max(high, node.val)
                  return good + count(node.left, high) + count(node.right, high)

              return count(root, root.val)
    `,
    checks: "",
  },
  "validate-binary-search-tree": {
    code: py`
      class Solution:
          def isValidBST(self, root: Optional[TreeNode]) -> bool:
              def valid(node: Optional[TreeNode], lo: float, hi: float) -> bool:
                  if not node:
                      return True
                  if not lo < node.val < hi:
                      return False
                  return valid(node.left, lo, node.val) and valid(
                      node.right, node.val, hi
                  )

              return valid(root, -inf, inf)
    `,
    checks: "",
  },
  "kth-smallest-element-in-a-bst": {
    code: py`
      class Solution:
          def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
              stack, node = [], root
              while stack or node:
                  while node:
                      stack.append(node)
                      node = node.left
                  node = stack.pop()
                  k -= 1
                  if k == 0:
                      return node.val
                  node = node.right
              return -1
    `,
    checks: "",
  },
  "construct-tree-from-preorder-inorder": {
    code: py`
      class Solution:
          def buildTree(
              self, preorder: List[int], inorder: List[int]
          ) -> Optional[TreeNode]:
              index = {v: i for i, v in enumerate(inorder)}
              pos = 0

              def build(lo: int, hi: int) -> Optional[TreeNode]:
                  nonlocal pos
                  if lo > hi:
                      return None
                  root = TreeNode(preorder[pos])
                  pos += 1
                  mid = index[root.val]
                  root.left = build(lo, mid - 1)
                  root.right = build(mid + 1, hi)
                  return root

              return build(0, len(inorder) - 1)
    `,
    checks: "",
  },
  "binary-tree-maximum-path-sum": {
    code: py`
      class Solution:
          def maxPathSum(self, root: Optional[TreeNode]) -> int:
              best = -inf

              def gain(node: Optional[TreeNode]) -> int:
                  nonlocal best
                  if not node:
                      return 0
                  left = max(gain(node.left), 0)
                  right = max(gain(node.right), 0)
                  best = max(best, node.val + left + right)
                  return node.val + max(left, right)

              gain(root)
              return best
    `,
    checks: "",
  },
  "serialize-and-deserialize-binary-tree": {
    code: py`
      class Codec:
          def serialize(self, root: Optional[TreeNode]) -> str:
              out = []

              def walk(node: Optional[TreeNode]) -> None:
                  if not node:
                      out.append("#")
                      return
                  out.append(str(node.val))
                  walk(node.left)
                  walk(node.right)

              walk(root)
              return ",".join(out)

          def deserialize(self, data: str) -> Optional[TreeNode]:
              values = iter(data.split(","))

              def build() -> Optional[TreeNode]:
                  v = next(values)
                  if v == "#":
                      return None
                  node = TreeNode(int(v))
                  node.left = build()
                  node.right = build()
                  return node

              return build()
    `,
    checks: py`
      codec = Codec()
      shape = [1, 2, 3, None, None, 4, 5]
      check(from_tree(codec.deserialize(codec.serialize(to_tree(shape)))) == shape)
      check(codec.deserialize(codec.serialize(None)) is None)
    `,
  },
  "path-sum": {
    code: py`
      class Solution:
          def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
              if not root:
                  return False
              rest = targetSum - root.val
              if not root.left and not root.right:
                  return rest == 0
              return self.hasPathSum(root.left, rest) or self.hasPathSum(
                  root.right, rest
              )
    `,
    checks: "",
  },
  "symmetric-tree": {
    code: py`
      class Solution:
          def isSymmetric(self, root: Optional[TreeNode]) -> bool:
              def mirror(a: Optional[TreeNode], b: Optional[TreeNode]) -> bool:
                  if not a or not b:
                      return a is b
                  return (
                      a.val == b.val
                      and mirror(a.left, b.right)
                      and mirror(a.right, b.left)
                  )

              return mirror(root.left, root.right) if root else True
    `,
    checks: "",
  },
  "zigzag-level-order-traversal": {
    code: py`
      class Solution:
          def zigzagLevelOrder(
              self, root: Optional[TreeNode]
          ) -> List[List[int]]:
              result = []
              queue = deque([root] if root else [])
              while queue:
                  level = []
                  for _ in range(len(queue)):
                      node = queue.popleft()
                      level.append(node.val)
                      if node.left:
                          queue.append(node.left)
                      if node.right:
                          queue.append(node.right)
                  result.append(level[::-1] if len(result) % 2 else level)
              return result
    `,
    checks: "",
  },
  "insert-into-a-bst": {
    code: py`
      class Solution:
          def insertIntoBST(
              self, root: Optional[TreeNode], val: int
          ) -> Optional[TreeNode]:
              if not root:
                  return TreeNode(val)
              if val < root.val:
                  root.left = self.insertIntoBST(root.left, val)
              else:
                  root.right = self.insertIntoBST(root.right, val)
              return root
    `,
    checks: "",
  },
};
