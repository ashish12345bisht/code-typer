// Turns shared test cases into checks for JavaScript, Python and Java.

import type { Case, IOType } from "../cases";

const json = (v: unknown) => JSON.stringify(v);

// ---------- JavaScript ----------

function jsIn(type: IOType | undefined, v: unknown): string {
  if (type === "list") return `toList(${json(v)})`;
  if (type === "lists") return `${json(v)}.map((x) => toList(x))`;
  if (type === "tree") return `toTree(${json(v)})`;
  if (type === "cycle") return `toCycle(${json((v as unknown[])[0])}, ${json((v as unknown[])[1])})`;
  return json(v);
}

function jsOut(type: IOType | undefined, expr: string): string {
  if (type === "list") return `fromList(${expr})`;
  if (type === "tree") return `fromTree(${expr})`;
  return expr;
}

export function jsChecks(c: Case): string {
  const lines: string[] = [];
  for (const [args, expected] of c.tests) {
    if (c.design) {
      const [methods, params] = args as [string[], unknown[][]];
      const exp = expected as unknown[];
      lines.push("{", `const obj = new ${c.entry}(${params[0].map(json).join(", ")});`);
      methods.slice(1).forEach((m, k) => {
        const call = `obj.${m}(${params[k + 1].map(json).join(", ")})`;
        lines.push(exp[k + 1] === null ? `${call};` : `check(eq(${call}, ${json(exp[k + 1])}));`);
      });
      lines.push("}");
      continue;
    }
    const inputs = args.map((a, i) => jsIn(c.args?.[i], a));
    if (c.inPlace) {
      lines.push(
        "{",
        `const a0 = ${inputs[0]};`,
        `${c.entry}(${["a0", ...inputs.slice(1)].join(", ")});`,
        `check(eq(${jsOut(c.args?.[0], "a0")}, ${json(expected)}));`,
        "}",
      );
      continue;
    }
    let actual = jsOut(c.result, `${c.entry}(${inputs.join(", ")})`);
    let exp = json(expected);
    if (c.unordered === "outer") [actual, exp] = [`sorted(${actual})`, `sorted(${exp})`];
    if (c.unordered === "deep") [actual, exp] = [`deepSorted(${actual})`, `deepSorted(${exp})`];
    lines.push(`check(eq(${actual}, ${exp}));`);
  }
  return lines.join("\n");
}

// ---------- Python ----------

function py(v: unknown): string {
  if (v === null || v === undefined) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (Array.isArray(v)) return `[${v.map(py).join(", ")}]`;
  return JSON.stringify(v);
}

function pyIn(type: IOType | undefined, v: unknown): string {
  if (type === "list") return `to_list(${py(v)})`;
  if (type === "lists") return `[to_list(x) for x in ${py(v)}]`;
  if (type === "tree") return `to_tree(${py(v)})`;
  if (type === "cycle") return `to_cycle(${py((v as unknown[])[0])}, ${py((v as unknown[])[1])})`;
  return py(v);
}

function pyOut(type: IOType | undefined, expr: string): string {
  if (type === "list") return `from_list(${expr})`;
  if (type === "tree") return `from_tree(${expr})`;
  return expr;
}

export function pyChecks(c: Case): string {
  const lines: string[] = [];
  for (const [args, expected] of c.tests) {
    if (c.design) {
      const [methods, params] = args as [string[], unknown[][]];
      const exp = expected as unknown[];
      lines.push(`obj = ${c.entry}(${params[0].map(py).join(", ")})`);
      methods.slice(1).forEach((m, k) => {
        const call = `obj.${m}(${params[k + 1].map(py).join(", ")})`;
        lines.push(exp[k + 1] === null ? call : `check(${call} == ${py(exp[k + 1])})`);
      });
      continue;
    }
    const inputs = args.map((a, i) => pyIn(c.args?.[i], a));
    if (c.inPlace) {
      lines.push(
        `a0 = ${inputs[0]}`,
        `Solution().${c.entry}(${["a0", ...inputs.slice(1)].join(", ")})`,
        `check(${pyOut(c.args?.[0], "a0")} == ${py(expected)})`,
      );
      continue;
    }
    let actual = pyOut(c.result, `Solution().${c.entry}(${inputs.join(", ")})`);
    let exp = py(expected);
    if (c.unordered === "outer") [actual, exp] = [`sorted(${actual})`, `sorted(${exp})`];
    if (c.unordered === "deep") [actual, exp] = [`deep_sorted(${actual})`, `deep_sorted(${exp})`];
    lines.push(`check(${actual} == ${exp})`);
  }
  return lines.join("\n");
}

// ---------- C++ (types read from the solution's own signatures) ----------

interface CppParam {
  type: string;
  ref: boolean;
}

/** Splits on top-level commas (ignoring commas inside <...>). */
function splitTop(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of s) {
    if (ch === "<") depth++;
    if (ch === ">") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else current += ch;
  }
  if (current.trim()) parts.push(current);
  return parts.map((p) => p.trim());
}

function parseParams(list: string): CppParam[] {
  return splitTop(list).map((p) => {
    const ref = /&/.test(p) && !/^const /.test(p);
    const type = p
      .replace(/^const /, "")
      .replace(/\s*[&*]?\s*\w+$/, (m) => (m.includes("*") ? "*" : ""))
      .replace(/&/g, "")
      .trim();
    return { type: type.replace(/\s+\*$/, "*"), ref };
  });
}

/** Finds `ReturnType name(params)` for a method or constructor in C++ source. */
function cppSignature(code: string, name: string): { ret: string; params: CppParam[] } {
  const re = new RegExp(`^[ \\t]*(?:([\\w:<>,* \\t]+?)[ \\t]+)?${name}\\(([^)]*)\\)`, "m");
  const m = code.match(re);
  if (!m) throw new Error(`C++ signature for ${name} not found`);
  return { ret: (m[1] ?? "").replace(/\s+\*/, "*").trim(), params: parseParams(m[2]) };
}

function cppLit(type: string, v: unknown, top = true): string {
  const vec = type.match(/^vector<(.+)>$/);
  if (vec) {
    const items = (v as unknown[]).map((x) => cppLit(vec[1], x, false)).join(", ");
    return top ? `${type}{${items}}` : `{${items}}`;
  }
  if (type === "char") return `'${v}'`;
  if (type === "string") return JSON.stringify(v);
  if (type === "bool") return v ? "true" : "false";
  if (type === "double") return Number.isInteger(v) ? `${v}.0` : String(v);
  if (v === null) return "NIL";
  return String(v);
}

function cppIn(p: CppParam, io: IOType | undefined, v: unknown): string {
  let lit: string;
  if (io === "list") lit = `toList(${cppLit("vector<int>", v)})`;
  else if (io === "tree") lit = `toTree(${cppLit("vector<int>", v)})`;
  else if (io === "cycle") {
    const [vals, pos] = v as [number[], number];
    lit = `toCycle(${cppLit("vector<int>", vals)}, ${pos})`;
  } else if (io === "lists") {
    lit = `vector<ListNode*>{${(v as number[][]).map((x) => `toList(${cppLit("vector<int>", x)})`).join(", ")}}`;
  } else lit = cppLit(p.type, v);
  return p.ref ? `lv(${lit})` : lit;
}

function cppCompare(ret: string, io: IOType | undefined, call: string, expected: unknown, unordered?: string) {
  if (io === "list") return `fromList(${call}) == ${cppLit("vector<int>", expected)}`;
  if (io === "tree") return `fromTree(${call}) == ${cppLit("vector<int>", expected)}`;
  if (ret === "double") return `near(${call}, ${cppLit("double", expected)})`;
  const exp = cppLit(ret, expected);
  if (unordered === "outer") return `sorted(${call}) == sorted(${exp})`;
  if (unordered === "deep") return `deepSorted(${call}) == deepSorted(${exp})`;
  return `${call} == ${exp}`;
}

export function cppChecks(c: Case, code: string): string {
  const lines: string[] = [];
  for (const [args, expected] of c.tests) {
    if (c.design) {
      const [methods, params] = args as [string[], unknown[][]];
      const exp = expected as unknown[];
      const ctor = params[0].length ? cppSignature(code, c.entry).params : [];
      const ctorArgs = params[0].map((a, i) => cppIn(ctor[i], undefined, a));
      lines.push("{", ctorArgs.length ? `${c.entry} obj(${ctorArgs.join(", ")});` : `${c.entry} obj;`);
      methods.slice(1).forEach((m, k) => {
        const sig = cppSignature(code, m);
        const call = `obj.${m}(${params[k + 1].map((a, i) => cppIn(sig.params[i], undefined, a)).join(", ")})`;
        lines.push(exp[k + 1] === null ? `${call};` : `CHECK(${cppCompare(sig.ret, undefined, call, exp[k + 1])});`);
      });
      lines.push("}");
      continue;
    }
    const sig = cppSignature(code, c.entry);
    const inputs = args.map((a, i) => cppIn(sig.params[i], c.args?.[i], a));
    if (c.inPlace) {
      const first = inputs[0].replace(/^lv\((.*)\)$/, "$1");
      lines.push(
        "{",
        `auto a0 = ${first};`,
        `Solution().${c.entry}(${["a0", ...inputs.slice(1)].join(", ")});`,
        `CHECK(${cppCompare(sig.params[0].type, c.args?.[0], "a0", expected)});`,
        "}",
      );
      continue;
    }
    const call = `Solution().${c.entry}(${inputs.join(", ")})`;
    lines.push(`CHECK(${cppCompare(sig.ret, c.result, call, expected, c.unordered)});`);
  }
  return lines.join("\n");
}

// ---------- Java (reflection-based, see the runner in java.ts) ----------

/** A JSON value as a Java string literal. */
const jstr = (v: unknown) => JSON.stringify(JSON.stringify(v));

export function javaChecks(c: Case, className: string): string {
  return c.tests
    .map(([args, expected]) => {
      if (c.design) {
        const [methods, params] = args as [string[], unknown[][]];
        return `runDesign(${c.entry}.class, ${jstr(methods)}, ${jstr(params)}, ${jstr(expected)});`;
      }
      return `runCase(${className}.class, ${jstr(c.entry)}, ${jstr(args)}, ${jstr(expected)}, ${jstr(
        c.args ?? [],
      )}, ${jstr(c.result ?? "raw")}, ${jstr(c.unordered ?? "")}, ${c.inPlace ? "true" : "false"});`;
    })
    .join("\n");
}
