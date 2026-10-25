import { cpp, type Solution } from "../types";

export const triesCpp: Record<string, Solution> = {
  "implement-trie": {
    code: cpp`
      class Trie {
      public:
          void insert(string word) {
              Node* node = &root;
              for (char c : word) {
                  if (!node->next[c - 'a']) node->next[c - 'a'] = new Node();
                  node = node->next[c - 'a'];
              }
              node->isWord = true;
          }

          bool search(string word) {
              Node* node = find(word);
              return node && node->isWord;
          }

          bool startsWith(string prefix) { return find(prefix) != nullptr; }

      private:
          struct Node {
              Node* next[26] = {};
              bool isWord = false;
          };
          Node root;

          Node* find(const string& s) {
              Node* node = &root;
              for (char c : s) {
                  node = node->next[c - 'a'];
                  if (!node) return nullptr;
              }
              return node;
          }
      };
    `,
    checks: "",
  },
  "design-add-and-search-words": {
    code: cpp`
      class WordDictionary {
      public:
          void addWord(string word) {
              Node* node = &root;
              for (char c : word) {
                  if (!node->next[c - 'a']) node->next[c - 'a'] = new Node();
                  node = node->next[c - 'a'];
              }
              node->isWord = true;
          }

          bool search(string word) { return dfs(&root, word, 0); }

      private:
          struct Node {
              Node* next[26] = {};
              bool isWord = false;
          };
          Node root;

          bool dfs(Node* node, const string& word, int i) {
              if (i == word.size()) return node->isWord;
              if (word[i] != '.') {
                  Node* next = node->next[word[i] - 'a'];
                  return next && dfs(next, word, i + 1);
              }
              for (Node* child : node->next) {
                  if (child && dfs(child, word, i + 1)) return true;
              }
              return false;
          }
      };
    `,
    checks: "",
  },
  "word-search-ii": {
    code: cpp`
      class Solution {
      public:
          vector<string> findWords(vector<vector<char>>& board,
                                   vector<string>& words) {
              for (const string& w : words) {
                  Node* node = &root;
                  for (char c : w) {
                      if (!node->next[c - 'a']) node->next[c - 'a'] = new Node();
                      node = node->next[c - 'a'];
                  }
                  node->word = w;
              }
              for (int r = 0; r < board.size(); r++) {
                  for (int c = 0; c < board[0].size(); c++) dfs(board, r, c, &root);
              }
              return found;
          }

      private:
          struct Node {
              Node* next[26] = {};
              string word;
          };
          Node root;
          vector<string> found;

          void dfs(vector<vector<char>>& board, int r, int c, Node* parent) {
              if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size()) return;
              char ch = board[r][c];
              if (ch == '#' || !parent->next[ch - 'a']) return;
              Node* node = parent->next[ch - 'a'];
              if (!node->word.empty()) {
                  found.push_back(node->word);
                  node->word.clear();
              }
              board[r][c] = '#';
              dfs(board, r + 1, c, node);
              dfs(board, r - 1, c, node);
              dfs(board, r, c + 1, node);
              dfs(board, r, c - 1, node);
              board[r][c] = ch;
          }
      };
    `,
    checks: "",
  },
  "replace-words": {
    code: cpp`
      class Solution {
      public:
          string replaceWords(vector<string>& dictionary, string sentence) {
              for (const string& word : dictionary) {
                  Node* node = &root;
                  for (char c : word) {
                      if (!node->next[c - 'a']) node->next[c - 'a'] = new Node();
                      node = node->next[c - 'a'];
                  }
                  node->end = true;
              }
              stringstream in(sentence);
              string word, result;
              while (in >> word) {
                  if (!result.empty()) result += " ";
                  result += shortestRoot(word);
              }
              return result;
          }

      private:
          struct Node {
              Node* next[26] = {};
              bool end = false;
          };
          Node root;

          string shortestRoot(const string& word) {
              Node* node = &root;
              for (int i = 0; i < word.size(); i++) {
                  node = node->next[word[i] - 'a'];
                  if (!node) return word;
                  if (node->end) return word.substr(0, i + 1);
              }
              return word;
          }
      };
    `,
    checks: "",
  },
};
