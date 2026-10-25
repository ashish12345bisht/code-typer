import { java, type Solution } from "../types";

export const linkedListJava: Record<string, Solution> = {
  "reverse-linked-list": {
    code: java`
      class Solution {
          public ListNode reverseList(ListNode head) {
              ListNode prev = null;
              while (head != null) {
                  ListNode next = head.next;
                  head.next = prev;
                  prev = head;
                  head = next;
              }
              return prev;
          }
      }
    `,
    checks: "",
  },
  "merge-two-sorted-lists": {
    code: java`
      class Solution {
          public ListNode mergeTwoLists(ListNode a, ListNode b) {
              ListNode dummy = new ListNode(), tail = dummy;
              while (a != null && b != null) {
                  if (a.val <= b.val) {
                      tail.next = a;
                      a = a.next;
                  } else {
                      tail.next = b;
                      b = b.next;
                  }
                  tail = tail.next;
              }
              tail.next = a != null ? a : b;
              return dummy.next;
          }
      }
    `,
    checks: "",
  },
  "linked-list-cycle": {
    code: java`
      class Solution {
          public boolean hasCycle(ListNode head) {
              ListNode slow = head, fast = head;
              while (fast != null && fast.next != null) {
                  slow = slow.next;
                  fast = fast.next.next;
                  if (slow == fast) return true;
              }
              return false;
          }
      }
    `,
    checks: "",
  },
  "remove-nth-node-from-end": {
    code: java`
      class Solution {
          public ListNode removeNthFromEnd(ListNode head, int n) {
              ListNode dummy = new ListNode(0, head);
              ListNode fast = dummy, slow = dummy;
              for (int i = 0; i < n; i++) fast = fast.next;
              while (fast.next != null) {
                  fast = fast.next;
                  slow = slow.next;
              }
              slow.next = slow.next.next;
              return dummy.next;
          }
      }
    `,
    checks: "",
  },
  "reorder-list": {
    code: java`
      class Solution {
          public void reorderList(ListNode head) {
              ListNode slow = head, fast = head;
              while (fast != null && fast.next != null) {
                  slow = slow.next;
                  fast = fast.next.next;
              }
              ListNode prev = null, cur = slow.next;
              slow.next = null;
              while (cur != null) {
                  ListNode next = cur.next;
                  cur.next = prev;
                  prev = cur;
                  cur = next;
              }
              ListNode first = head, second = prev;
              while (second != null) {
                  ListNode nextFirst = first.next, nextSecond = second.next;
                  first.next = second;
                  second.next = nextFirst;
                  first = nextFirst;
                  second = nextSecond;
              }
          }
      }
    `,
    checks: "",
  },
  "add-two-numbers": {
    code: java`
      class Solution {
          public ListNode addTwoNumbers(ListNode a, ListNode b) {
              ListNode dummy = new ListNode(), tail = dummy;
              int carry = 0;
              while (a != null || b != null || carry != 0) {
                  int total = carry;
                  if (a != null) {
                      total += a.val;
                      a = a.next;
                  }
                  if (b != null) {
                      total += b.val;
                      b = b.next;
                  }
                  carry = total / 10;
                  tail.next = new ListNode(total % 10);
                  tail = tail.next;
              }
              return dummy.next;
          }
      }
    `,
    checks: "",
  },
  "middle-of-the-linked-list": {
    code: java`
      class Solution {
          public ListNode middleNode(ListNode head) {
              ListNode slow = head, fast = head;
              while (fast != null && fast.next != null) {
                  slow = slow.next;
                  fast = fast.next.next;
              }
              return slow;
          }
      }
    `,
    checks: "",
  },
  "palindrome-linked-list": {
    code: java`
      class Solution {
          public boolean isPalindrome(ListNode head) {
              ListNode slow = head, fast = head;
              while (fast != null && fast.next != null) {
                  slow = slow.next;
                  fast = fast.next.next;
              }
              ListNode prev = null;
              while (slow != null) {
                  ListNode next = slow.next;
                  slow.next = prev;
                  prev = slow;
                  slow = next;
              }
              while (prev != null) {
                  if (prev.val != head.val) return false;
                  prev = prev.next;
                  head = head.next;
              }
              return true;
          }
      }
    `,
    checks: "",
  },
  "remove-duplicates-from-sorted-list": {
    code: java`
      class Solution {
          public ListNode deleteDuplicates(ListNode head) {
              ListNode cur = head;
              while (cur != null && cur.next != null) {
                  if (cur.val == cur.next.val) cur.next = cur.next.next;
                  else cur = cur.next;
              }
              return head;
          }
      }
    `,
    checks: "",
  },
  "merge-k-sorted-lists": {
    code: java`
      class Solution {
          public ListNode mergeKLists(ListNode[] lists) {
              PriorityQueue<ListNode> heap =
                      new PriorityQueue<>((a, b) -> a.val - b.val);
              for (ListNode node : lists) {
                  if (node != null) heap.add(node);
              }
              ListNode dummy = new ListNode(), tail = dummy;
              while (!heap.isEmpty()) {
                  ListNode node = heap.poll();
                  tail.next = node;
                  tail = node;
                  if (node.next != null) heap.add(node.next);
              }
              return dummy.next;
          }
      }
    `,
    checks: "",
  },
  "reverse-nodes-in-k-group": {
    code: java`
      class Solution {
          public ListNode reverseKGroup(ListNode head, int k) {
              ListNode dummy = new ListNode(0, head), before = dummy;
              while (true) {
                  ListNode end = before;
                  for (int i = 0; i < k; i++) {
                      end = end.next;
                      if (end == null) return dummy.next;
                  }
                  ListNode after = end.next;
                  ListNode prev = after, cur = before.next;
                  while (cur != after) {
                      ListNode next = cur.next;
                      cur.next = prev;
                      prev = cur;
                      cur = next;
                  }
                  ListNode first = before.next;
                  before.next = end;
                  before = first;
              }
          }
      }
    `,
    checks: "",
  },
  "odd-even-linked-list": {
    code: java`
      class Solution {
          public ListNode oddEvenList(ListNode head) {
              if (head == null) return null;
              ListNode odd = head, even = head.next, evenHead = even;
              while (even != null && even.next != null) {
                  odd.next = even.next;
                  odd = odd.next;
                  even.next = odd.next;
                  even = even.next;
              }
              odd.next = evenHead;
              return head;
          }
      }
    `,
    checks: "",
  },
  "lru-cache": {
    code: java`
      class LRUCache {
          private final int capacity;
          private final LinkedHashMap<Integer, Integer> items;

          public LRUCache(int capacity) {
              this.capacity = capacity;
              this.items = new LinkedHashMap<>(16, 0.75f, true);
          }

          public int get(int key) {
              return items.getOrDefault(key, -1);
          }

          public void put(int key, int value) {
              items.put(key, value);
              if (items.size() > capacity) {
                  items.remove(items.keySet().iterator().next());
              }
          }
      }
    `,
    checks: "",
  },
};
