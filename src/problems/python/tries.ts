import { py, type Solution } from "../types";

export const triesPython: Record<string, Solution> = {
  "implement-trie": {
    code: py`
      class Trie:
          def __init__(self):
              self.root = {}

          def insert(self, word: str) -> None:
              node = self.root
              for c in word:
                  node = node.setdefault(c, {})
              node["$"] = True

          def search(self, word: str) -> bool:
              node = self.find(word)
              return node is not None and "$" in node

          def startsWith(self, prefix: str) -> bool:
              return self.find(prefix) is not None

          def find(self, text: str) -> Optional[dict]:
              node = self.root
              for c in text:
                  if c not in node:
                      return None
                  node = node[c]
              return node
    `,
    checks: "",
  },
  "design-add-and-search-words": {
    code: py`
      class WordDictionary:
          def __init__(self):
              self.root = {}

          def addWord(self, word: str) -> None:
              node = self.root
              for c in word:
                  node = node.setdefault(c, {})
              node["$"] = True

          def search(self, word: str) -> bool:
              def match(node: dict, i: int) -> bool:
                  if i == len(word):
                      return "$" in node
                  if word[i] == ".":
                      return any(
                          match(child, i + 1)
                          for key, child in node.items()
                          if key != "$"
                      )
                  return word[i] in node and match(node[word[i]], i + 1)

              return match(self.root, 0)
    `,
    checks: "",
  },
  "word-search-ii": {
    code: py`
      class Solution:
          def findWords(
              self, board: List[List[str]], words: List[str]
          ) -> List[str]:
              root = {}
              for w in words:
                  node = root
                  for c in w:
                      node = node.setdefault(c, {})
                  node["$"] = w
              rows, cols = len(board), len(board[0])
              found = []

              def dfs(r: int, c: int, parent: dict) -> None:
                  ch = board[r][c]
                  node = parent[ch]
                  if "$" in node:
                      found.append(node.pop("$"))
                  board[r][c] = "#"
                  for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                      nr, nc = r + dr, c + dc
                      if 0 <= nr < rows and 0 <= nc < cols:
                          if board[nr][nc] in node:
                              dfs(nr, nc, node)
                  board[r][c] = ch
                  if not node:
                      parent.pop(ch)

              for r in range(rows):
                  for c in range(cols):
                      if board[r][c] in root:
                          dfs(r, c, root)
              return found
    `,
    checks: "",
  },
  "replace-words": {
    code: py`
      class Solution:
          def replaceWords(self, dictionary: List[str], sentence: str) -> str:
              root = {}
              for w in dictionary:
                  node = root
                  for c in w:
                      node = node.setdefault(c, {})
                  node["$"] = True

              def shorten(word: str) -> str:
                  node = root
                  for i, c in enumerate(word):
                      if c not in node:
                          break
                      node = node[c]
                      if "$" in node:
                          return word[:i + 1]
                  return word

              return " ".join(shorten(w) for w in sentence.split())
    `,
    checks: "",
  },
};
