import { describe, expect, it } from "vitest";
import { cases } from "./cases";
import { runLanguage } from "./harness/run";
import { problems } from "./index";
import { languages } from "./types";

const MAX_LINE = 80;

describe("problem data", () => {
  it("has unique ids and sequential numbers", () => {
    const ids = problems.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    problems.forEach((p, i) => expect(p.number).toBe(i + 1));
  });

  it("every problem has a solution and checks in every language", () => {
    const missing = problems.flatMap((p) =>
      languages
        .filter((l) => {
          const { code, checks } = p.solutions[l];
          // Hand-written checks, or ones generated from the shared cases.
          const tested = checks || cases[p.id];
          return !code || !tested;
        })
        .map((l) => `${l}: ${p.id}`),
    );
    expect(missing).toEqual([]);
  });

  it("all code is typeable: printable ASCII, no tabs or trailing spaces, short lines", () => {
    const bad = problems.flatMap((p) =>
      languages.flatMap((l) =>
        p.solutions[l].code
          .split("\n")
          .filter((line) => line.length > MAX_LINE || / $/.test(line) || !/^[\x20-\x7E]*$/.test(line))
          .map((line) => `${l} ${p.id}: ${line}`),
      ),
    );
    expect(bad).toEqual([]);
  });
});

// Runs whatever solutions exist so far, so languages can be filled in incrementally.
describe.each(languages)("%s solutions", (lang) => {
  it("build and pass every check", () => {
    const ready = problems.filter((p) => p.solutions[lang].code);
    if (ready.length === 0) return;
    const result = runLanguage(lang, ready);
    expect(result.buildErrors).toEqual([]);
    expect(result.failures).toEqual([]);
    expect(result.finished).toBe(true);
  }, 600_000);
});
