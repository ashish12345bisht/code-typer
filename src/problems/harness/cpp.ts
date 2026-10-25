import { cases } from "../cases";
import type { Problem } from "../types";
import { cppChecks } from "./checks";

/** What the solutions assume exists (like LeetCode's headers), plus test helpers. */
const PRELUDE = String.raw`
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x = 0, TreeNode* l = nullptr, TreeNode* r = nullptr)
        : val(x), left(l), right(r) {}
};

namespace testing {
using VI = vector<int>;
using VVI = vector<vector<int>>;
using VS = vector<string>;
using VVS = vector<vector<string>>;
using VVC = vector<vector<char>>;
const int NIL = INT_MIN;

int failures = 0;

// Lets tests pass temporaries to solutions that take non-const references.
template <class T> T& lv(T&& value) { return value; }

ListNode* toList(const VI& v) {
    ListNode* head = nullptr;
    for (int i = (int)v.size() - 1; i >= 0; i--) head = new ListNode(v[i], head);
    return head;
}

ListNode* toCycle(const VI& v, int pos) {
    ListNode* head = toList(v);
    if (pos < 0) return head;
    ListNode *tail = head, *target = head;
    while (tail->next) tail = tail->next;
    for (int i = 0; i < pos; i++) target = target->next;
    tail->next = target;
    return head;
}

VI fromList(ListNode* head) {
    VI out;
    for (; head; head = head->next) out.push_back(head->val);
    return out;
}

// Level-order with NIL for missing children, like LeetCode's [3,9,20,null,null,15,7].
TreeNode* toTree(const VI& v) {
    if (v.empty() || v[0] == NIL) return nullptr;
    TreeNode* root = new TreeNode(v[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < v.size()) {
        TreeNode* node = q.front();
        q.pop();
        if (i < v.size() && v[i] != NIL) q.push(node->left = new TreeNode(v[i]));
        i++;
        if (i < v.size() && v[i] != NIL) q.push(node->right = new TreeNode(v[i]));
        i++;
    }
    return root;
}

VI fromTree(TreeNode* root) {
    VI out;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        out.push_back(node ? node->val : NIL);
        if (node) {
            q.push(node->left);
            q.push(node->right);
        }
    }
    while (!out.empty() && out.back() == NIL) out.pop_back();
    return out;
}

template <class T> vector<T> sorted(vector<T> v) {
    sort(v.begin(), v.end());
    return v;
}

// Sorts each inner vector, then the outer one: order-insensitive comparison.
template <class T> vector<vector<T>> deepSorted(vector<vector<T>> v) {
    for (auto& x : v) sort(x.begin(), x.end());
    sort(v.begin(), v.end());
    return v;
}

bool near(double a, double b) { return fabs(a - b) < 1e-6; }

// Runs fn and returns everything it printed to cout.
template <class F> string captureOutput(F fn) {
    ostringstream out;
    streambuf* old = cout.rdbuf(out.rdbuf());
    fn();
    cout.rdbuf(old);
    return out.str();
}
}  // namespace testing

#define CHECK(...)                                                        \
    do {                                                                  \
        if (!(__VA_ARGS__)) {                                             \
            testing::failures++;                                          \
            printf("FAIL %s: %s\n", PROBLEM_ID, #__VA_ARGS__);            \
        }                                                                 \
    } while (0)
`;

/** One translation unit: each problem lives in its own namespace with its own test(). */
export function buildCpp(problems: Problem[]): string {
  const parts = [PRELUDE];
  for (const p of problems) {
    const { code } = p.solutions.cpp;
    const checks = p.solutions.cpp.checks || (cases[p.id] ? cppChecks(cases[p.id], code) : "");
    parts.push(
      `namespace p${p.number} {`,
      `static const char* PROBLEM_ID = "${p.id}";`,
      code,
      `void test() {`,
      `using namespace testing;`,
      checks,
      `}`,
      `}  // namespace p${p.number}`,
    );
  }
  parts.push(
    `int main() {`,
    ...problems.map((p) => `    p${p.number}::test();`),
    `    printf("DONE failures=%d\\n", testing::failures);`,
    `    return 0;`,
    `}`,
  );
  return parts.join("\n");
}
