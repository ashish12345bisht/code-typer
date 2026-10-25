import { js, type Solution } from "../types";

export const linkedListJavascript: Record<string, Solution> = {
  "reverse-linked-list": {
    code: js`
      function reverseList(head) {
        let prev = null;
        let curr = head;
        while (curr) {
          const next = curr.next;
          curr.next = prev;
          prev = curr;
          curr = next;
        }
        return prev;
      }
    `,
    checks: "",
  },
  "merge-two-sorted-lists": {
    code: js`
      function mergeTwoLists(a, b) {
        const dummy = new ListNode();
        let tail = dummy;
        while (a && b) {
          if (a.val <= b.val) {
            tail.next = a;
            a = a.next;
          } else {
            tail.next = b;
            b = b.next;
          }
          tail = tail.next;
        }
        tail.next = a ?? b;
        return dummy.next;
      }
    `,
    checks: "",
  },
  "linked-list-cycle": {
    code: js`
      function hasCycle(head) {
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
          slow = slow.next;
          fast = fast.next.next;
          if (slow === fast) return true;
        }
        return false;
      }
    `,
    checks: "",
  },
  "remove-nth-node-from-end": {
    code: js`
      function removeNthFromEnd(head, n) {
        const dummy = new ListNode(0, head);
        let fast = dummy;
        let slow = dummy;
        for (let i = 0; i <= n; i++) fast = fast.next;
        while (fast) {
          fast = fast.next;
          slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
      }
    `,
    checks: "",
  },
  "reorder-list": {
    code: js`
      function reorderList(head) {
        if (!head || !head.next) return head;
        let slow = head;
        let fast = head;
        while (fast.next && fast.next.next) {
          slow = slow.next;
          fast = fast.next.next;
        }
        let second = reverse(slow.next);
        slow.next = null;
        let first = head;
        while (second) {
          const nextFirst = first.next;
          const nextSecond = second.next;
          first.next = second;
          second.next = nextFirst;
          first = nextFirst;
          second = nextSecond;
        }
        return head;
      }
      function reverse(node) {
        let prev = null;
        while (node) {
          const next = node.next;
          node.next = prev;
          prev = node;
          node = next;
        }
        return prev;
      }
    `,
    checks: "",
  },
  "add-two-numbers": {
    code: js`
      function addTwoNumbers(a, b) {
        const dummy = new ListNode();
        let tail = dummy;
        let carry = 0;
        while (a || b || carry) {
          const sum = (a?.val ?? 0) + (b?.val ?? 0) + carry;
          carry = Math.floor(sum / 10);
          tail.next = new ListNode(sum % 10);
          tail = tail.next;
          a = a?.next ?? null;
          b = b?.next ?? null;
        }
        return dummy.next;
      }
    `,
    checks: "",
  },
  "middle-of-the-linked-list": {
    code: js`
      function middleNode(head) {
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
          slow = slow.next;
          fast = fast.next.next;
        }
        return slow;
      }
    `,
    checks: "",
  },
  "palindrome-linked-list": {
    code: js`
      function isPalindrome(head) {
        const values = [];
        for (let node = head; node; node = node.next) values.push(node.val);
        for (let i = 0, j = values.length - 1; i < j; i++, j--) {
          if (values[i] !== values[j]) return false;
        }
        return true;
      }
    `,
    checks: "",
  },
  "remove-duplicates-from-sorted-list": {
    code: js`
      function deleteDuplicates(head) {
        let node = head;
        while (node && node.next) {
          if (node.val === node.next.val) node.next = node.next.next;
          else node = node.next;
        }
        return head;
      }
    `,
    checks: "",
  },
  "merge-k-sorted-lists": {
    code: js`
      function mergeKLists(lists) {
        if (lists.length === 0) return null;
        while (lists.length > 1) {
          const merged = [];
          for (let i = 0; i < lists.length; i += 2) {
            merged.push(mergeTwo(lists[i], lists[i + 1] ?? null));
          }
          lists = merged;
        }
        return lists[0];
      }
      function mergeTwo(a, b) {
        const dummy = new ListNode();
        let tail = dummy;
        while (a && b) {
          if (a.val <= b.val) {
            tail.next = a;
            a = a.next;
          } else {
            tail.next = b;
            b = b.next;
          }
          tail = tail.next;
        }
        tail.next = a ?? b;
        return dummy.next;
      }
    `,
    checks: "",
  },
  "reverse-nodes-in-k-group": {
    code: js`
      function reverseKGroup(head, k) {
        const dummy = new ListNode(0, head);
        let groupPrev = dummy;
        while (true) {
          let kth = groupPrev;
          for (let i = 0; i < k && kth; i++) kth = kth.next;
          if (!kth) break;
          const groupNext = kth.next;
          let prev = groupNext;
          let curr = groupPrev.next;
          while (curr !== groupNext) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
          }
          const first = groupPrev.next;
          groupPrev.next = kth;
          groupPrev = first;
        }
        return dummy.next;
      }
    `,
    checks: "",
  },
  "odd-even-linked-list": {
    code: js`
      function oddEvenList(head) {
        if (!head) return head;
        let odd = head;
        let even = head.next;
        const evenHead = even;
        while (even && even.next) {
          odd.next = even.next;
          odd = even.next;
          even.next = odd.next;
          even = even.next;
        }
        odd.next = evenHead;
        return head;
      }
    `,
    checks: "",
  },
  "lru-cache": {
    code: js`
      class LRUCache {
        capacity;
        cache = new Map();

        constructor(capacity) {
          this.capacity = capacity;
        }

        get(key) {
          const value = this.cache.get(key);
          if (value === undefined) return -1;
          this.cache.delete(key);
          this.cache.set(key, value);
          return value;
        }

        put(key, value) {
          this.cache.delete(key);
          this.cache.set(key, value);
          if (this.cache.size > this.capacity) {
            const oldest = this.cache.keys().next().value;
            this.cache.delete(oldest);
          }
        }
      }
    `,
    checks: "",
  },
};
