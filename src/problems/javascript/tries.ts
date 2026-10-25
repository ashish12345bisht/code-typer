import { js, type Solution } from "../types";

export const triesJavascript: Record<string, Solution> = {
  "implement-trie": {
    code: js`
      class TrieNode {
        children = new Map();
        isWord = false;
      }
      class Trie {
        root = new TrieNode();

        insert(word) {
          let node = this.root;
          for (const c of word) {
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c);
          }
          node.isWord = true;
        }

        search(word) {
          return this.find(word)?.isWord ?? false;
        }

        startsWith(prefix) {
          return this.find(prefix) !== null;
        }

        find(s) {
          let node = this.root;
          for (const c of s) {
            const next = node.children.get(c);
            if (!next) return null;
            node = next;
          }
          return node;
        }
      }
    `,
    checks: "",
  },
  "design-add-and-search-words": {
    code: js`
      class WordDictionary {
        root = { children: {}, end: false };

        addWord(word) {
          let node = this.root;
          for (const c of word) {
            node = node.children[c] ??= { children: {}, end: false };
          }
          node.end = true;
        }

        search(word) {
          const dfs = (node, i) => {
            if (i === word.length) return node.end;
            const c = word[i];
            if (c !== ".") {
              const next = node.children[c];
              return next !== undefined && dfs(next, i + 1);
            }
            return Object.values(node.children).some((n) => dfs(n, i + 1));
          };
          return dfs(this.root, 0);
        }
      }
    `,
    checks: "",
  },
  "word-search-ii": {
    code: js`
      function findWords(board, words) {
        const root = { children: new Map(), word: null };
        for (const w of words) {
          let node = root;
          for (const c of w) {
            if (!node.children.has(c)) {
              node.children.set(c, { children: new Map(), word: null });
            }
            node = node.children.get(c);
          }
          node.word = w;
        }
        const found = [];
        const rows = board.length;
        const cols = board[0].length;
        const dfs = (r, c, parent) => {
          const ch = board[r][c];
          const node = parent.children.get(ch);
          if (!node) return;
          if (node.word) {
            found.push(node.word);
            node.word = null;
          }
          board[r][c] = "#";
          const neighbors = [
            [r + 1, c],
            [r - 1, c],
            [r, c + 1],
            [r, c - 1],
          ];
          for (const [nr, nc] of neighbors) {
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) dfs(nr, nc, node);
          }
          board[r][c] = ch;
        };
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) dfs(r, c, root);
        }
        return found;
      }
    `,
    checks: "",
  },
  "replace-words": {
    code: js`
      function replaceWords(dictionary, sentence) {
        const root = { children: new Map(), end: false };
        for (const word of dictionary) {
          let node = root;
          for (const c of word) {
            if (!node.children.has(c)) {
              node.children.set(c, { children: new Map(), end: false });
            }
            node = node.children.get(c);
          }
          node.end = true;
        }
        const shortestRoot = (word) => {
          let node = root;
          for (let i = 0; i < word.length; i++) {
            const next = node.children.get(word[i]);
            if (!next) return word;
            if (next.end) return word.slice(0, i + 1);
            node = next;
          }
          return word;
        };
        return sentence.split(" ").map(shortestRoot).join(" ");
      }
    `,
    checks: "",
  },
};
