import { py, type Solution } from "../types";

export const linkedListPython: Record<string, Solution> = {
  "reverse-linked-list": {
    code: py`
      class Solution:
          def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
              prev = None
              while head:
                  head.next, prev, head = prev, head, head.next
              return prev
    `,
    checks: "",
  },
  "merge-two-sorted-lists": {
    code: py`
      class Solution:
          def mergeTwoLists(
              self, a: Optional[ListNode], b: Optional[ListNode]
          ) -> Optional[ListNode]:
              dummy = tail = ListNode()
              while a and b:
                  if a.val <= b.val:
                      tail.next, a = a, a.next
                  else:
                      tail.next, b = b, b.next
                  tail = tail.next
              tail.next = a or b
              return dummy.next
    `,
    checks: "",
  },
  "linked-list-cycle": {
    code: py`
      class Solution:
          def hasCycle(self, head: Optional[ListNode]) -> bool:
              slow = fast = head
              while fast and fast.next:
                  slow, fast = slow.next, fast.next.next
                  if slow is fast:
                      return True
              return False
    `,
    checks: "",
  },
  "remove-nth-node-from-end": {
    code: py`
      class Solution:
          def removeNthFromEnd(
              self, head: Optional[ListNode], n: int
          ) -> Optional[ListNode]:
              dummy = ListNode(0, head)
              fast = slow = dummy
              for _ in range(n):
                  fast = fast.next
              while fast.next:
                  fast, slow = fast.next, slow.next
              slow.next = slow.next.next
              return dummy.next
    `,
    checks: "",
  },
  "reorder-list": {
    code: py`
      class Solution:
          def reorderList(self, head: Optional[ListNode]) -> None:
              slow = fast = head
              while fast and fast.next:
                  slow, fast = slow.next, fast.next.next
              prev, cur = None, slow.next
              slow.next = None
              while cur:
                  cur.next, prev, cur = prev, cur, cur.next
              first, second = head, prev
              while second:
                  first.next, first = second, first.next
                  second.next, second = first, second.next
    `,
    checks: "",
  },
  "add-two-numbers": {
    code: py`
      class Solution:
          def addTwoNumbers(
              self, a: Optional[ListNode], b: Optional[ListNode]
          ) -> Optional[ListNode]:
              dummy = tail = ListNode()
              carry = 0
              while a or b or carry:
                  total = carry
                  if a:
                      total, a = total + a.val, a.next
                  if b:
                      total, b = total + b.val, b.next
                  carry, digit = divmod(total, 10)
                  tail.next = ListNode(digit)
                  tail = tail.next
              return dummy.next
    `,
    checks: "",
  },
  "middle-of-the-linked-list": {
    code: py`
      class Solution:
          def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
              slow = fast = head
              while fast and fast.next:
                  slow, fast = slow.next, fast.next.next
              return slow
    `,
    checks: "",
  },
  "palindrome-linked-list": {
    code: py`
      class Solution:
          def isPalindrome(self, head: Optional[ListNode]) -> bool:
              slow = fast = head
              while fast and fast.next:
                  slow, fast = slow.next, fast.next.next
              prev = None
              while slow:
                  slow.next, prev, slow = prev, slow, slow.next
              while prev:
                  if prev.val != head.val:
                      return False
                  prev, head = prev.next, head.next
              return True
    `,
    checks: "",
  },
  "remove-duplicates-from-sorted-list": {
    code: py`
      class Solution:
          def deleteDuplicates(
              self, head: Optional[ListNode]
          ) -> Optional[ListNode]:
              cur = head
              while cur and cur.next:
                  if cur.val == cur.next.val:
                      cur.next = cur.next.next
                  else:
                      cur = cur.next
              return head
    `,
    checks: "",
  },
  "merge-k-sorted-lists": {
    code: py`
      class Solution:
          def mergeKLists(
              self, lists: List[Optional[ListNode]]
          ) -> Optional[ListNode]:
              heap = []
              for i, node in enumerate(lists):
                  if node:
                      heappush(heap, (node.val, i, node))
              dummy = tail = ListNode()
              while heap:
                  _, i, node = heappop(heap)
                  tail.next = node
                  tail = node
                  if node.next:
                      heappush(heap, (node.next.val, i, node.next))
              return dummy.next
    `,
    checks: "",
  },
  "reverse-nodes-in-k-group": {
    code: py`
      class Solution:
          def reverseKGroup(
              self, head: Optional[ListNode], k: int
          ) -> Optional[ListNode]:
              dummy = ListNode(0, head)
              before = dummy
              while True:
                  end = before
                  for _ in range(k):
                      end = end.next
                      if not end:
                          return dummy.next
                  after = end.next
                  prev, cur = after, before.next
                  while cur is not after:
                      cur.next, prev, cur = prev, cur, cur.next
                  first = before.next
                  before.next = end
                  before = first
    `,
    checks: "",
  },
  "odd-even-linked-list": {
    code: py`
      class Solution:
          def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
              if not head:
                  return head
              odd, even = head, head.next
              even_head = even
              while even and even.next:
                  odd.next = even.next
                  odd = odd.next
                  even.next = odd.next
                  even = even.next
              odd.next = even_head
              return head
    `,
    checks: "",
  },
  "lru-cache": {
    code: py`
      class LRUCache:
          def __init__(self, capacity: int):
              self.capacity = capacity
              self.items = OrderedDict()

          def get(self, key: int) -> int:
              if key not in self.items:
                  return -1
              self.items.move_to_end(key)
              return self.items[key]

          def put(self, key: int, value: int) -> None:
              self.items[key] = value
              self.items.move_to_end(key)
              if len(self.items) > self.capacity:
                  self.items.popitem(last=False)
    `,
    checks: "",
  },
};
