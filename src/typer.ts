// Pure typing-test logic: no React, no DOM, so it's easy to test.

export interface TypingState {
  /** Everything typed so far, including mistakes. */
  typed: string;
  /** Characters the player typed themselves (auto-indent not included). */
  keystrokes: number;
  /** Keystrokes that didn't match the snippet. */
  mistakes: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export type TypingKey = { type: "char"; char: string } | { type: "enter" } | { type: "backspace" };

export interface Stats {
  wpm: number;
  accuracy: number;
  elapsedMs: number;
}

export const initialState = (): TypingState => ({
  typed: "",
  keystrokes: 0,
  mistakes: 0,
  startedAt: null,
  finishedAt: null,
});

const isIndent = (ch: string | undefined) => ch === " " || ch === "\t";

/** Applies one key press. Enter after a correct newline also types the next line's indentation. */
export function applyKey(snippet: string, state: TypingState, key: TypingKey, now: number): TypingState {
  if (state.finishedAt !== null) return state;

  if (key.type === "backspace") {
    return { ...state, typed: state.typed.slice(0, deletionStart(snippet, state.typed)) };
  }

  const expected = snippet[state.typed.length];
  if (expected === undefined) return state;

  const input = key.type === "enter" ? "\n" : key.char;
  const correct = input === expected;
  let typed = state.typed + input;

  if (correct && input === "\n") {
    while (isIndent(snippet[typed.length])) typed += snippet[typed.length];
  }

  return {
    typed,
    keystrokes: state.keystrokes + 1,
    mistakes: state.mistakes + (correct ? 0 : 1),
    startedAt: state.startedAt ?? now,
    finishedAt: typed === snippet ? now : null,
  };
}

/**
 * Where Backspace deletes from. Normally one character, but auto-inserted indentation is removed
 * together with the newline before it, so Backspace never strands the caret mid-indent.
 */
function deletionStart(snippet: string, typed: string): number {
  if (typed.length === 0) return 0;
  let i = typed.length;
  while (i > 0 && isIndent(typed[i - 1]) && typed[i - 1] === snippet[i - 1]) i--;
  const wasAutoIndent = i < typed.length && typed[i - 1] === "\n" && snippet[i - 1] === "\n";
  return wasAutoIndent ? i - 1 : typed.length - 1;
}

/** Marks which characters of the snippet are leading indentation (typed automatically). */
export function indentMask(snippet: string): boolean[] {
  const mask: boolean[] = [];
  let lineStart = true;
  for (const ch of snippet) {
    if (ch === "\n") {
      mask.push(false);
      lineStart = true;
    } else if (lineStart && isIndent(ch)) {
      mask.push(true);
    } else {
      mask.push(false);
      lineStart = false;
    }
  }
  return mask;
}

/** WPM uses correctly typed characters (5 chars = 1 word), excluding auto-indent. */
export function computeStats(snippet: string, state: TypingState, now: number): Stats {
  const elapsedMs = state.startedAt === null ? 0 : (state.finishedAt ?? now) - state.startedAt;
  const mask = indentMask(snippet);

  let correctChars = 0;
  for (let i = 0; i < state.typed.length; i++) {
    if (state.typed[i] === snippet[i] && !mask[i]) correctChars++;
  }

  const minutes = elapsedMs / 60_000;
  const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;
  const accuracy =
    state.keystrokes === 0
      ? 100
      : Math.round(((state.keystrokes - state.mistakes) / state.keystrokes) * 100);

  return { wpm, accuracy, elapsedMs };
}

export function formatTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
