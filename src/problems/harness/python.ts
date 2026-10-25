import { cases } from "../cases";
import type { Problem } from "../types";
import { pyChecks } from "./checks";

/**
 * Names the solutions can use without importing, like LeetCode's environment, plus test helpers.
 * Each problem runs in a fresh namespace built from these.
 */
const PRELUDE = String.raw`
import collections, contextlib, functools, heapq, io, itertools, math, bisect, sys
from collections import Counter, defaultdict, deque, OrderedDict
from functools import cache, lru_cache
from heapq import heappush, heappop, heapify
from math import inf
from typing import Dict, List, Optional, Set, Tuple

sys.setrecursionlimit(10000)


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


NIL = None


def to_list(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def to_cycle(values, pos):
    head = to_list(values)
    if pos < 0:
        return head
    tail = head
    while tail.next:
        tail = tail.next
    target = head
    for _ in range(pos):
        target = target.next
    tail.next = target
    return head


def from_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


def to_tree(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while queue and i < len(values):
        node = queue.popleft()
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


def from_tree(root):
    out, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        out.append(node.val if node else None)
        if node:
            queue.append(node.left)
            queue.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out


def deep_sorted(items):
    return sorted(sorted(x) for x in items)


def near(a, b):
    return abs(a - b) < 1e-6


def capture_output(fn):
    buffer = io.StringIO()
    with contextlib.redirect_stdout(buffer):
        fn()
    return buffer.getvalue()


failures = 0
BASE = dict(globals())


def run(problem_id, code, checks):
    global failures
    count = [0]

    def check(condition):
        global failures
        count[0] += 1
        if not condition:
            failures += 1
            print(f"FAIL {problem_id}: check #{count[0]}")

    namespace = dict(BASE)
    namespace["__name__"] = "solution"
    namespace["check"] = check
    try:
        exec(code, namespace)
        exec(checks, namespace)
    except Exception as e:
        failures += 1
        print(f"FAIL {problem_id}: {type(e).__name__}: {e}")
`;

/** One script that runs every problem's code and checks in isolated namespaces. */
export function buildPython(problems: Problem[]): string {
  const parts = [PRELUDE];
  for (const p of problems) {
    const { code } = p.solutions.python;
    const checks = p.solutions.python.checks || (cases[p.id] ? pyChecks(cases[p.id]) : "");
    parts.push(`run(${JSON.stringify(p.id)}, ${JSON.stringify(code)}, ${JSON.stringify(checks)})`);
  }
  parts.push(`print(f"DONE failures={failures}")`);
  return parts.join("\n");
}
