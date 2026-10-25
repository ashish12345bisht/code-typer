import { cpp, type Solution } from "../types";

export const linkedListCpp: Record<string, Solution> = {
  "reverse-linked-list": {
    code: cpp`
      class Solution {
      public:
          ListNode* reverseList(ListNode* head) {
              ListNode* prev = nullptr;
              while (head) {
                  ListNode* next = head->next;
                  head->next = prev;
                  prev = head;
                  head = next;
              }
              return prev;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().reverseList(toList({1, 2, 3, 4, 5}))) == VI{5, 4, 3, 2, 1});
      CHECK(Solution().reverseList(nullptr) == nullptr);
    `,
  },
  "merge-two-sorted-lists": {
    code: cpp`
      class Solution {
      public:
          ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
              ListNode dummy;
              ListNode* tail = &dummy;
              while (a && b) {
                  if (a->val <= b->val) {
                      tail->next = a;
                      a = a->next;
                  } else {
                      tail->next = b;
                      b = b->next;
                  }
                  tail = tail->next;
              }
              tail->next = a ? a : b;
              return dummy.next;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().mergeTwoLists(toList({1, 2, 4}), toList({1, 3, 4}))) == VI{1, 1, 2, 3, 4, 4});
      CHECK(fromList(Solution().mergeTwoLists(nullptr, toList({0}))) == VI{0});
    `,
  },
  "linked-list-cycle": {
    code: cpp`
      class Solution {
      public:
          bool hasCycle(ListNode* head) {
              ListNode *slow = head, *fast = head;
              while (fast && fast->next) {
                  slow = slow->next;
                  fast = fast->next->next;
                  if (slow == fast) return true;
              }
              return false;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().hasCycle(toCycle({3, 2, 0, -4}, 1)) == true);
      CHECK(Solution().hasCycle(toCycle({1, 2}, 0)) == true);
      CHECK(Solution().hasCycle(toCycle({1}, -1)) == false);
    `,
  },
  "remove-nth-node-from-end": {
    code: cpp`
      class Solution {
      public:
          ListNode* removeNthFromEnd(ListNode* head, int n) {
              ListNode dummy(0, head);
              ListNode *fast = &dummy, *slow = &dummy;
              for (int i = 0; i <= n; i++) fast = fast->next;
              while (fast) {
                  fast = fast->next;
                  slow = slow->next;
              }
              ListNode* removed = slow->next;
              slow->next = removed->next;
              delete removed;
              return dummy.next;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().removeNthFromEnd(toList({1, 2, 3, 4, 5}), 2)) == VI{1, 2, 3, 5});
      CHECK(Solution().removeNthFromEnd(toList({1}), 1) == nullptr);
      CHECK(fromList(Solution().removeNthFromEnd(toList({1, 2}), 1)) == VI{1});
    `,
  },
  "reorder-list": {
    code: cpp`
      class Solution {
      public:
          void reorderList(ListNode* head) {
              if (!head || !head->next) return;
              ListNode *slow = head, *fast = head;
              while (fast->next && fast->next->next) {
                  slow = slow->next;
                  fast = fast->next->next;
              }
              ListNode* second = reverse(slow->next);
              slow->next = nullptr;
              for (ListNode* first = head; second;) {
                  ListNode* nextFirst = first->next;
                  ListNode* nextSecond = second->next;
                  first->next = second;
                  second->next = nextFirst;
                  first = nextFirst;
                  second = nextSecond;
              }
          }

      private:
          ListNode* reverse(ListNode* node) {
              ListNode* prev = nullptr;
              while (node) {
                  ListNode* next = node->next;
                  node->next = prev;
                  prev = node;
                  node = next;
              }
              return prev;
          }
      };
    `,
    checks: cpp`
      ListNode* a = toList({1, 2, 3, 4});
      Solution().reorderList(a);
      CHECK(fromList(a) == VI{1, 4, 2, 3});
      ListNode* b = toList({1, 2, 3, 4, 5});
      Solution().reorderList(b);
      CHECK(fromList(b) == VI{1, 5, 2, 4, 3});
    `,
  },
  "add-two-numbers": {
    code: cpp`
      class Solution {
      public:
          ListNode* addTwoNumbers(ListNode* a, ListNode* b) {
              ListNode dummy;
              ListNode* tail = &dummy;
              int carry = 0;
              while (a || b || carry) {
                  int sum = carry;
                  if (a) {
                      sum += a->val;
                      a = a->next;
                  }
                  if (b) {
                      sum += b->val;
                      b = b->next;
                  }
                  carry = sum / 10;
                  tail = tail->next = new ListNode(sum % 10);
              }
              return dummy.next;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().addTwoNumbers(toList({2, 4, 3}), toList({5, 6, 4}))) == VI{7, 0, 8});
      CHECK(fromList(Solution().addTwoNumbers(toList({9, 9, 9, 9}), toList({9, 9}))) == VI{8, 9, 0, 0, 1});
    `,
  },
  "middle-of-the-linked-list": {
    code: cpp`
      class Solution {
      public:
          ListNode* middleNode(ListNode* head) {
              ListNode *slow = head, *fast = head;
              while (fast && fast->next) {
                  slow = slow->next;
                  fast = fast->next->next;
              }
              return slow;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().middleNode(toList({1, 2, 3, 4, 5}))) == VI{3, 4, 5});
      CHECK(fromList(Solution().middleNode(toList({1, 2, 3, 4, 5, 6}))) == VI{4, 5, 6});
    `,
  },
  "palindrome-linked-list": {
    code: cpp`
      class Solution {
      public:
          bool isPalindrome(ListNode* head) {
              vector<int> values;
              for (; head; head = head->next) values.push_back(head->val);
              for (int i = 0, j = values.size() - 1; i < j; i++, j--) {
                  if (values[i] != values[j]) return false;
              }
              return true;
          }
      };
    `,
    checks: cpp`
      CHECK(Solution().isPalindrome(toList({1, 2, 2, 1})) == true);
      CHECK(Solution().isPalindrome(toList({1, 2})) == false);
    `,
  },
  "remove-duplicates-from-sorted-list": {
    code: cpp`
      class Solution {
      public:
          ListNode* deleteDuplicates(ListNode* head) {
              ListNode* node = head;
              while (node && node->next) {
                  if (node->val == node->next->val) {
                      ListNode* duplicate = node->next;
                      node->next = duplicate->next;
                      delete duplicate;
                  } else {
                      node = node->next;
                  }
              }
              return head;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().deleteDuplicates(toList({1, 1, 2, 3, 3}))) == VI{1, 2, 3});
      CHECK(fromList(Solution().deleteDuplicates(toList({1, 1, 1}))) == VI{1});
    `,
  },
  "merge-k-sorted-lists": {
    code: cpp`
      class Solution {
      public:
          ListNode* mergeKLists(vector<ListNode*>& lists) {
              if (lists.empty()) return nullptr;
              while (lists.size() > 1) {
                  vector<ListNode*> merged;
                  for (int i = 0; i < lists.size(); i += 2) {
                      ListNode* b = i + 1 < lists.size() ? lists[i + 1] : nullptr;
                      merged.push_back(mergeTwo(lists[i], b));
                  }
                  lists = merged;
              }
              return lists[0];
          }

      private:
          ListNode* mergeTwo(ListNode* a, ListNode* b) {
              ListNode dummy;
              ListNode* tail = &dummy;
              while (a && b) {
                  if (a->val <= b->val) {
                      tail->next = a;
                      a = a->next;
                  } else {
                      tail->next = b;
                      b = b->next;
                  }
                  tail = tail->next;
              }
              tail->next = a ? a : b;
              return dummy.next;
          }
      };
    `,
    checks: cpp`
      vector<ListNode*> lists{toList({1, 4, 5}), toList({1, 3, 4}), toList({2, 6})};
      CHECK(fromList(Solution().mergeKLists(lists)) == VI{1, 1, 2, 3, 4, 4, 5, 6});
      vector<ListNode*> none;
      CHECK(Solution().mergeKLists(none) == nullptr);
    `,
  },
  "reverse-nodes-in-k-group": {
    code: cpp`
      class Solution {
      public:
          ListNode* reverseKGroup(ListNode* head, int k) {
              ListNode dummy(0, head);
              ListNode* groupPrev = &dummy;
              while (true) {
                  ListNode* kth = groupPrev;
                  for (int i = 0; i < k && kth; i++) kth = kth->next;
                  if (!kth) break;
                  ListNode* groupNext = kth->next;
                  ListNode *prev = groupNext, *curr = groupPrev->next;
                  while (curr != groupNext) {
                      ListNode* next = curr->next;
                      curr->next = prev;
                      prev = curr;
                      curr = next;
                  }
                  ListNode* first = groupPrev->next;
                  groupPrev->next = kth;
                  groupPrev = first;
              }
              return dummy.next;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().reverseKGroup(toList({1, 2, 3, 4, 5}), 2)) == VI{2, 1, 4, 3, 5});
      CHECK(fromList(Solution().reverseKGroup(toList({1, 2, 3, 4, 5}), 3)) == VI{3, 2, 1, 4, 5});
    `,
  },
  "odd-even-linked-list": {
    code: cpp`
      class Solution {
      public:
          ListNode* oddEvenList(ListNode* head) {
              if (!head) return head;
              ListNode *odd = head, *even = head->next, *evenHead = even;
              while (even && even->next) {
                  odd->next = even->next;
                  odd = odd->next;
                  even->next = odd->next;
                  even = even->next;
              }
              odd->next = evenHead;
              return head;
          }
      };
    `,
    checks: cpp`
      CHECK(fromList(Solution().oddEvenList(toList({1, 2, 3, 4, 5}))) == VI{1, 3, 5, 2, 4});
      CHECK(fromList(Solution().oddEvenList(toList({2, 1, 3, 5, 6, 4, 7}))) == VI{2, 3, 6, 7, 1, 5, 4});
    `,
  },
  "lru-cache": {
    code: cpp`
      class LRUCache {
      public:
          LRUCache(int capacity) : capacity(capacity) {}

          int get(int key) {
              auto it = pos.find(key);
              if (it == pos.end()) return -1;
              order.splice(order.begin(), order, it->second);
              return it->second->second;
          }

          void put(int key, int value) {
              auto it = pos.find(key);
              if (it != pos.end()) {
                  it->second->second = value;
                  order.splice(order.begin(), order, it->second);
                  return;
              }
              order.emplace_front(key, value);
              pos[key] = order.begin();
              if (pos.size() > capacity) {
                  pos.erase(order.back().first);
                  order.pop_back();
              }
          }

      private:
          int capacity;
          list<pair<int, int>> order;
          unordered_map<int, list<pair<int, int>>::iterator> pos;
      };
    `,
    checks: cpp`
      LRUCache c(2);
      c.put(1, 1);
      c.put(2, 2);
      CHECK(c.get(1) == 1);
      c.put(3, 3);
      CHECK(c.get(2) == -1);
      c.put(4, 4);
      CHECK(c.get(1) == -1);
      CHECK(c.get(3) == 3);
      CHECK(c.get(4) == 4);
    `,
  },
};
