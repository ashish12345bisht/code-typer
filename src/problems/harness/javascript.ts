import { cases } from "../cases";
import type { Problem } from "../types";
import { jsChecks } from "./checks";

/** Classes the solutions assume exist, plus test helpers. Everything runs in strict mode. */
const PRELUDE = String.raw`
"use strict";
const { isDeepStrictEqual } = require("node:util");

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const NIL = null;
let failures = 0;

const eq = (a, b) => isDeepStrictEqual(a, b);
const near = (a, b) => Math.abs(a - b) < 1e-6;

function toList(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  return head;
}

function toCycle(values, pos) {
  const head = toList(values);
  if (pos < 0) return head;
  let tail = head;
  while (tail.next) tail = tail.next;
  let target = head;
  for (let i = 0; i < pos; i++) target = target.next;
  tail.next = target;
  return head;
}

function fromList(head) {
  const out = [];
  for (; head; head = head.next) out.push(head.val);
  return out;
}

function toTree(values) {
  if (!values.length || values[0] === null) return null;
  const root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const node = queue.shift();
    if (i < values.length && values[i] !== null) queue.push((node.left = new TreeNode(values[i])));
    i++;
    if (i < values.length && values[i] !== null) queue.push((node.right = new TreeNode(values[i])));
    i++;
  }
  return root;
}

function fromTree(root) {
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    out.push(node ? node.val : null);
    if (node) queue.push(node.left, node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

const cmp = (a, b) => (JSON.stringify(a) < JSON.stringify(b) ? -1 : JSON.stringify(a) > JSON.stringify(b) ? 1 : 0);
const sorted = (arr) => [...arr].sort((a, b) => (typeof a === "number" && typeof b === "number" ? a - b : cmp(a, b)));
const deepSorted = (arr) => arr.map((x) => sorted(x)).sort(cmp);

function captureOutput(fn) {
  const lines = [];
  const original = console.log;
  console.log = (...args) => lines.push(args.join(" "));
  try {
    fn();
  } finally {
    console.log = original;
  }
  return lines.map((l) => l + "\n").join("");
}

function makeCheck(id) {
  let n = 0;
  return (condition) => {
    n++;
    if (!condition) {
      failures++;
      console.log("FAIL " + id + ": check #" + n);
    }
  };
}
`;

/** One script: each problem's code and checks run in their own function scope. */
export function buildJavaScript(problems: Problem[]): string {
  const parts = [PRELUDE];
  for (const p of problems) {
    const { code } = p.solutions.javascript;
    const checks = p.solutions.javascript.checks || (cases[p.id] ? jsChecks(cases[p.id]) : "");
    parts.push(
      `(() => {`,
      `const check = makeCheck(${JSON.stringify(p.id)});`,
      `try {`,
      code,
      checks,
      `} catch (e) {`,
      `  failures++;`,
      `  console.log("FAIL ${p.id}: " + (e && e.stack ? e.stack.split("\\n")[0] : e));`,
      `}`,
      `})();`,
    );
  }
  parts.push(`console.log("DONE failures=" + failures);`);
  return parts.join("\n");
}
