import { topic } from "./types";

const NOTE = "\n\n`ListNode` (with `val` and `next`) is provided.";

export const linkedList = topic("Linked List", [
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    statement: "Reverse a singly linked list and return the new head.\n\nExample: 1→2→3→4→5 → 5→4→3→2→1" + NOTE,
    approach:
      "Walk the list once, pointing each node's `next` back at the previous node. Keep the original `next` before overwriting it.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    statement:
      "Merge two sorted linked lists into one sorted list by splicing their nodes together, and return its head.\n\nExample: 1→2→4 and 1→3→4 → 1→1→2→3→4→4" + NOTE,
    approach:
      "Use a dummy head and a tail pointer. Repeatedly attach the smaller front node, then attach whatever remains of the other list.",
    time: "O(n + m)",
    space: "O(1)",
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    statement:
      "Return `true` if the linked list contains a cycle, using O(1) memory.\n\nExample: 3→2→0→-4 with -4 linking back to 2 → true" + NOTE,
    approach:
      "Floyd's tortoise and hare: move one pointer one step and another two steps at a time. They meet only if there's a cycle.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    statement: "Remove the n-th node from the end of the list in one pass and return the head.\n\nExample: 1→2→3→4→5, n = 2 → 1→2→3→5" + NOTE,
    approach:
      "Move a fast pointer n + 1 steps ahead of a slow pointer (both starting at a dummy head). When fast falls off the end, slow is just before the node to remove.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    statement:
      "Reorder L0→L1→…→Ln into L0→Ln→L1→Ln-1→… in place.\n\nExample: 1→2→3→4 → 1→4→2→3" + NOTE,
    approach:
      "Find the middle with slow and fast pointers, reverse the second half, then weave the two halves together one node at a time.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    statement:
      "Two non-negative numbers are stored as linked lists with digits in reverse order. Return their sum as a linked list in the same format.\n\nExample: 2→4→3 + 5→6→4 → 7→0→8 (342 + 465 = 807)" + NOTE,
    approach:
      "Add digit by digit like on paper, carrying into the next position. Keep going while either list has digits or a carry remains.",
    time: "O(max(n, m))",
    space: "O(max(n, m))",
  },
  {
    id: "middle-of-the-linked-list",
    title: "Middle of the Linked List",
    difficulty: "Easy",
    statement:
      "Return the middle node of the list. With two middle nodes, return the second one.\n\nExample: 1→2→3→4→5 → node 3 (3→4→5)" + NOTE,
    approach:
      "Move a slow pointer one step and a fast pointer two steps at a time. When fast reaches the end, slow is in the middle.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "palindrome-linked-list",
    title: "Palindrome Linked List",
    difficulty: "Easy",
    statement: "Return `true` if the linked list reads the same forwards and backwards.\n\nExample: 1→2→2→1 → true" + NOTE,
    approach:
      "Copy the values into an array and compare with two pointers. (For O(1) space, reverse the second half and compare it with the first.)",
    time: "O(n)",
    space: "O(n)",
  },
  {
    id: "remove-duplicates-from-sorted-list",
    title: "Remove Duplicates from Sorted List",
    difficulty: "Easy",
    statement: "Delete duplicates from a sorted linked list so each value appears once, and return the head.\n\nExample: 1→1→2→3→3 → 1→2→3" + NOTE,
    approach:
      "Walk the list; whenever the next node has the same value, skip it by relinking. Otherwise move forward.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    statement: "Merge an array of k sorted linked lists into one sorted list.\n\nExample: [1→4→5, 1→3→4, 2→6] → 1→1→2→3→4→4→5→6" + NOTE,
    approach:
      "Divide and conquer: merge the lists in pairs, halving their number each round, until one list remains. Each node takes part in log k merges.",
    time: "O(N log k)",
    space: "O(k)",
  },
  {
    id: "reverse-nodes-in-k-group",
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    statement:
      "Reverse the list's nodes k at a time. A final group with fewer than k nodes stays as it is.\n\nExample: 1→2→3→4→5, k = 2 → 2→1→4→3→5" + NOTE,
    approach:
      "For each group, check that k nodes exist, reverse them in place pointing the group's tail at the next group, then reconnect the previous group to the new group head.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "odd-even-linked-list",
    title: "Odd Even Linked List",
    difficulty: "Medium",
    statement:
      "Group the nodes at odd positions followed by the nodes at even positions, keeping relative order, in O(1) space.\n\nExample: 1→2→3→4→5 → 1→3→5→2→4" + NOTE,
    approach:
      "Build two chains as you walk: odd nodes and even nodes, relinking as you go. Finally attach the even chain after the last odd node.",
    time: "O(n)",
    space: "O(1)",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    statement:
      "Design a Least Recently Used cache with a fixed `capacity`: `get(key)` returns the value or -1, and `put(key, value)` inserts or updates, evicting the least recently used key when full. Both run in O(1).",
    approach:
      "Keep keys in a doubly linked list ordered by recency, plus a hash map from key to its list node. Access moves a node to the front; eviction removes the back.",
    time: "O(1) per operation",
    space: "O(capacity)",
  },
]);
