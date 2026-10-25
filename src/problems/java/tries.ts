import { java, type Solution } from "../types";

export const triesJava: Record<string, Solution> = {
  "implement-trie": {
    code: java`
      class Trie {
          private static class Node {
              Node[] next = new Node[26];
              boolean end;
          }

          private final Node root = new Node();

          public void insert(String word) {
              Node node = root;
              for (char c : word.toCharArray()) {
                  if (node.next[c - 'a'] == null) {
                      node.next[c - 'a'] = new Node();
                  }
                  node = node.next[c - 'a'];
              }
              node.end = true;
          }

          public boolean search(String word) {
              Node node = find(word);
              return node != null && node.end;
          }

          public boolean startsWith(String prefix) {
              return find(prefix) != null;
          }

          private Node find(String text) {
              Node node = root;
              for (char c : text.toCharArray()) {
                  node = node.next[c - 'a'];
                  if (node == null) return null;
              }
              return node;
          }
      }
    `,
    checks: "",
  },
  "design-add-and-search-words": {
    code: java`
      class WordDictionary {
          private static class Node {
              Node[] next = new Node[26];
              boolean end;
          }

          private final Node root = new Node();

          public void addWord(String word) {
              Node node = root;
              for (char c : word.toCharArray()) {
                  if (node.next[c - 'a'] == null) {
                      node.next[c - 'a'] = new Node();
                  }
                  node = node.next[c - 'a'];
              }
              node.end = true;
          }

          public boolean search(String word) {
              return match(root, word, 0);
          }

          private boolean match(Node node, String word, int i) {
              if (i == word.length()) return node.end;
              char c = word.charAt(i);
              if (c != '.') {
                  Node child = node.next[c - 'a'];
                  return child != null && match(child, word, i + 1);
              }
              for (Node child : node.next) {
                  if (child != null && match(child, word, i + 1)) return true;
              }
              return false;
          }
      }
    `,
    checks: "",
  },
  "word-search-ii": {
    code: java`
      class Solution {
          private static class Node {
              Node[] next = new Node[26];
              String word;
          }

          private final List<String> found = new ArrayList<>();

          public List<String> findWords(char[][] board, String[] words) {
              Node root = new Node();
              for (String w : words) {
                  Node node = root;
                  for (char c : w.toCharArray()) {
                      if (node.next[c - 'a'] == null) {
                          node.next[c - 'a'] = new Node();
                      }
                      node = node.next[c - 'a'];
                  }
                  node.word = w;
              }
              for (int r = 0; r < board.length; r++) {
                  for (int c = 0; c < board[0].length; c++) {
                      dfs(board, r, c, root);
                  }
              }
              return found;
          }

          private void dfs(char[][] board, int r, int c, Node parent) {
              if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) {
                  return;
              }
              char ch = board[r][c];
              if (ch == '#' || parent.next[ch - 'a'] == null) return;
              Node node = parent.next[ch - 'a'];
              if (node.word != null) {
                  found.add(node.word);
                  node.word = null;
              }
              board[r][c] = '#';
              dfs(board, r + 1, c, node);
              dfs(board, r - 1, c, node);
              dfs(board, r, c + 1, node);
              dfs(board, r, c - 1, node);
              board[r][c] = ch;
          }
      }
    `,
    checks: "",
  },
  "replace-words": {
    code: java`
      class Solution {
          private static class Node {
              Node[] next = new Node[26];
              boolean end;
          }

          public String replaceWords(List<String> dictionary, String sentence) {
              Node root = new Node();
              for (String w : dictionary) {
                  Node node = root;
                  for (char c : w.toCharArray()) {
                      if (node.next[c - 'a'] == null) {
                          node.next[c - 'a'] = new Node();
                      }
                      node = node.next[c - 'a'];
                  }
                  node.end = true;
              }
              StringJoiner out = new StringJoiner(" ");
              for (String word : sentence.split(" ")) {
                  out.add(shorten(root, word));
              }
              return out.toString();
          }

          private String shorten(Node root, String word) {
              Node node = root;
              for (int i = 0; i < word.length(); i++) {
                  node = node.next[word.charAt(i) - 'a'];
                  if (node == null) break;
                  if (node.end) return word.substring(0, i + 1);
              }
              return word;
          }
      }
    `,
    checks: "",
  },
};
