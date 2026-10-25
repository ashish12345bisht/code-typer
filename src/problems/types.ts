export type Difficulty = "Easy" | "Medium" | "Hard";

export const topics = [
  "Basics",
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D DP",
  "2-D DP",
  "Greedy",
  "Intervals",
  "Bit Manipulation & Math",
  "Strings",
] as const;

export type Topic = (typeof topics)[number];

export const languages = ["cpp", "java", "python", "javascript"] as const;
export type Language = (typeof languages)[number];

export const languageInfo: Record<Language, { label: string; file: string }> = {
  cpp: { label: "C++17", file: "solution.cpp" },
  java: { label: "Java", file: "Solution.java" },
  python: { label: "Python", file: "solution.py" },
  javascript: { label: "JavaScript", file: "solution.js" },
};

/** A solution the player types, plus test assertions for it (never shown). */
export interface Solution {
  code: string;
  /** Statements run against the solution, using the language's check helpers. */
  checks: string;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  topic: Topic;
  difficulty: Difficulty;
  /** Plain text; `backticks` render as inline code, blank lines split paragraphs. */
  statement: string;
  approach: string;
  time: string;
  space: string;
  solutions: Record<Language, Solution>;
}

export type ProblemMeta = Omit<Problem, "topic" | "number" | "solutions">;

export function topic(name: Topic, problems: ProblemMeta[]) {
  return problems.map((p) => ({ ...p, topic: name }));
}

/**
 * Tag for source code: strips the leading newline and common indentation so snippets can be
 * written indented in the TypeScript file. Uses raw text, so backslashes stay literal.
 */
export function dedent(strings: TemplateStringsArray): string {
  const lines = strings.raw.join("").split("\n");
  if (lines[0].trim() === "") lines.shift();
  if (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.length - l.trimStart().length),
  );
  return lines.map((l) => l.slice(indent)).join("\n");
}

// Language-named aliases so each solution file reads naturally.
export const cpp = dedent;
export const java = dedent;
export const py = dedent;
export const js = dedent;
