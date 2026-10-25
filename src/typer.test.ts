import { describe, expect, it } from "vitest";
import { applyKey, computeStats, formatTime, indentMask, initialState, type TypingKey } from "./typer";

const chars = (s: string): TypingKey[] =>
  [...s].map((c) => (c === "\n" ? { type: "enter" } : { type: "char", char: c }));

function typeAll(snippet: string, keys: TypingKey[], start = 0, step = 100) {
  return keys.reduce((state, key, i) => applyKey(snippet, state, key, start + i * step), initialState());
}

describe("applyKey", () => {
  it("records correct characters and starts the clock on the first key", () => {
    const s = typeAll("let", chars("le"), 1000);
    expect(s.typed).toBe("le");
    expect(s.startedAt).toBe(1000);
    expect(s.mistakes).toBe(0);
    expect(s.finishedAt).toBeNull();
  });

  it("counts mistakes but keeps the wrong character so it can be corrected", () => {
    const s = typeAll("let", chars("lx"));
    expect(s.typed).toBe("lx");
    expect(s.mistakes).toBe(1);
    expect(s.keystrokes).toBe(2);
  });

  it("finishes only when the whole snippet matches", () => {
    const snippet = "ab";
    let s = typeAll(snippet, chars("ax"));
    expect(s.finishedAt).toBeNull();
    s = applyKey(snippet, s, { type: "backspace" }, 500);
    s = applyKey(snippet, s, { type: "char", char: "b" }, 600);
    expect(s.finishedAt).toBe(600);
  });

  it("ignores keys after the snippet is finished", () => {
    const done = typeAll("a", chars("a"));
    expect(applyKey("a", done, { type: "char", char: "b" }, 999)).toBe(done);
  });

  it("auto-types indentation after a correct Enter", () => {
    const snippet = "if (x) {\n  y();\n}";
    const s = typeAll(snippet, chars("if (x) {\n"));
    expect(s.typed).toBe("if (x) {\n  ");
    expect(s.keystrokes).toBe(9);
  });

  it("does not auto-indent after a wrong key", () => {
    const s = typeAll("a\n  b", chars("ax"));
    expect(s.typed).toBe("ax");
  });

  it("removes auto-indent together with its newline on Backspace", () => {
    const snippet = "{\n    x";
    let s = typeAll(snippet, chars("{\n"));
    expect(s.typed).toBe("{\n    ");
    s = applyKey(snippet, s, { type: "backspace" }, 999);
    expect(s.typed).toBe("{");
  });

  it("deletes a single character normally", () => {
    const s = applyKey("abc", typeAll("abc", chars("ab")), { type: "backspace" }, 999);
    expect(s.typed).toBe("a");
  });
});

describe("indentMask", () => {
  it("marks only leading whitespace on each line", () => {
    expect(indentMask("a b\n  c")).toEqual([false, false, false, false, true, true, false]);
  });
});

describe("computeStats", () => {
  it("computes WPM from correct characters, excluding auto-indent", () => {
    // 10 non-indent characters in 6 seconds = 2 words in 0.1 min = 20 WPM.
    const snippet = "abcde\n  fghi";
    const keys = chars("abcde\nfghi");
    const s = typeAll(snippet, keys, 0, 600);
    expect(s.finishedAt).toBe(9 * 600);
    const stats = computeStats(snippet, { ...s, finishedAt: 6000 }, 0);
    expect(stats.wpm).toBe(20);
    expect(stats.accuracy).toBe(100);
  });

  it("reports accuracy from keystrokes", () => {
    const s = typeAll("abcd", chars("axcd"));
    expect(computeStats("abcd", s, 1000).accuracy).toBe(75);
  });

  it("returns zeros before typing starts", () => {
    expect(computeStats("abc", initialState(), 5000)).toEqual({ wpm: 0, accuracy: 100, elapsedMs: 0 });
  });
});

describe("formatTime", () => {
  it("formats minutes and seconds", () => {
    expect(formatTime(65_400)).toBe("1:05");
    expect(formatTime(0)).toBe("0:00");
  });
});
