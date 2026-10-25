// Progress lives in the player's browser. Storage can be unavailable (private mode, blocked
// cookies), so every access is guarded and the game works without it.

import { languages, type Language } from "./problems";

const LANGUAGE_KEY = "code-typer:language";
const bestKey = (lang: Language) => `code-typer:${lang}:best-wpm`;
const solvedKey = (lang: Language) => `code-typer:${lang}:solved`;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore: progress just won't persist.
  }
}

export interface Progress {
  best: number;
  solved: Set<string>;
}

export function loadLanguage(): Language {
  const saved = read<string>(LANGUAGE_KEY, "");
  return languages.find((l) => l === saved) ?? "cpp";
}
export const saveLanguage = (lang: Language) => write(LANGUAGE_KEY, lang);

/** Each language keeps its own solved set and best WPM. */
export function loadProgress(): Record<Language, Progress> {
  const entries = languages.map((lang) => [
    lang,
    { best: read<number>(bestKey(lang), 0), solved: new Set(read<string[]>(solvedKey(lang), [])) },
  ]);
  return Object.fromEntries(entries) as Record<Language, Progress>;
}

export function saveProgress(lang: Language, progress: Progress) {
  write(bestKey(lang), progress.best);
  write(solvedKey(lang), [...progress.solved]);
}
