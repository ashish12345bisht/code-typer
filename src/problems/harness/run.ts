import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Language, Problem } from "../types";
import { buildCpp } from "./cpp";
import { buildJava } from "./java";
import { buildJavaScript } from "./javascript";
import { buildPython } from "./python";

export interface RunResult {
  /** Compiler errors (first few lines), empty if it built. */
  buildErrors: string[];
  /** One line per failing check or crashed problem. */
  failures: string[];
  /** The program reached its end and printed its summary. */
  finished: boolean;
}

const sh = (cmd: string, args: string[], cwd: string, env?: NodeJS.ProcessEnv) =>
  spawnSync(cmd, args, { cwd, encoding: "utf8", env: { ...process.env, ...env }, maxBuffer: 64 << 20 });

const problemLines = (out: string) =>
  out.split("\n").filter((l) => l.startsWith("FAIL ") || /runtime error|AddressSanitizer|Exception in/.test(l));

/** Builds and runs all given problems' solutions in one language. */
export function runLanguage(lang: Language, problems: Problem[]): RunResult {
  const dir = mkdtempSync(join(tmpdir(), `code-typer-${lang}-`));
  let build: ReturnType<typeof sh> | null = null;
  let run: ReturnType<typeof sh>;

  if (lang === "cpp") {
    writeFileSync(join(dir, "all.cpp"), buildCpp(problems));
    build = sh(
      "g++",
      [
        "-std=c++17",
        "-O1",
        "-g",
        "-Wall",
        "-Wextra",
        "-Werror",
        "-Wno-sign-compare",
        "-Wno-unused-parameter",
        "-fsanitize=address,undefined",
        "-fno-sanitize-recover=undefined",
        "all.cpp",
        "-o",
        "all",
      ],
      dir,
    );
    run = sh(join(dir, "all"), [], dir, { ASAN_OPTIONS: "detect_leaks=0" });
  } else if (lang === "java") {
    writeFileSync(join(dir, "Main.java"), buildJava(problems));
    build = sh("javac", ["-Xlint:none", "-nowarn", "Main.java"], dir);
    run = sh("java", ["-Xss64m", "-cp", ".", "Main"], dir);
  } else if (lang === "python") {
    writeFileSync(join(dir, "all.py"), buildPython(problems));
    run = sh("python3", ["all.py"], dir);
  } else {
    writeFileSync(join(dir, "all.js"), buildJavaScript(problems));
    run = sh("node", ["--stack-size=65500", "all.js"], dir);
  }

  const buildErrors =
    build && build.status !== 0
      ? build.stderr.split("\n").filter((l) => /error/.test(l)).slice(0, 25)
      : [];
  const output = `${run.stdout ?? ""}\n${run.stderr ?? ""}`;
  return {
    buildErrors,
    failures: buildErrors.length ? [] : problemLines(output),
    finished: output.includes("DONE failures=0"),
  };
}
