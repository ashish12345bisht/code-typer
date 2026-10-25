import { useEffect, useMemo, useRef, useState } from "react";
import {
  languageInfo,
  languages,
  problems,
  topics,
  type Difficulty,
  type Language,
  type Problem,
  type Topic,
} from "./problems";
import { loadLanguage, loadProgress, saveLanguage, saveProgress } from "./storage";
import {
  applyKey,
  computeStats,
  formatTime,
  initialState,
  type TypingKey,
  type TypingState,
} from "./typer";

type TopicFilter = Topic | "All";
type DifficultyFilter = Difficulty | "All";

const difficulties: DifficultyFilter[] = ["All", "Easy", "Medium", "Hard"];

/** Renders `code` spans and splits paragraphs; "Example:" paragraphs get their own style. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className={para.startsWith("Example") ? "example" : undefined}>
          {para.split("`").map((part, j) => (j % 2 ? <code key={j}>{part}</code> : part))}
        </p>
      ))}
    </>
  );
}

export default function App() {
  const [topic, setTopic] = useState<TopicFilter>("All");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [language, setLanguage] = useState(loadLanguage);
  const [progress, setProgress] = useState(loadProgress);
  const { solved, best } = progress[language];
  const [currentId, setCurrentId] = useState(() => {
    const done = loadProgress()[loadLanguage()].solved;
    return (problems.find((p) => !done.has(p.id)) ?? problems[0]).id;
  });
  const [state, setState] = useState<TypingState>(initialState);
  const [now, setNow] = useState(() => Date.now());
  const [newBest, setNewBest] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      problems.filter(
        (p) =>
          (topic === "All" || p.topic === topic) &&
          (difficulty === "All" || p.difficulty === difficulty),
      ),
    [topic, difficulty],
  );

  const problem = problems.find((p) => p.id === currentId) ?? problems[0];
  const code = problem.solutions[language].code;
  const running = state.startedAt !== null && state.finishedAt === null;
  const finished = state.finishedAt !== null;
  const stats = computeStats(code, state, now);

  // Tick while typing so live WPM and the timer update.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [running]);

  // Keep the caret on screen in long solutions.
  useEffect(() => {
    document.querySelector(".code .caret")?.scrollIntoView({ block: "nearest" });
  }, [state.typed.length]);

  useEffect(() => {
    if (finished) resultRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [finished]);

  const focus = () => inputRef.current?.focus({ preventScroll: true });
  useEffect(focus, []);

  const open = (next: Problem) => {
    setCurrentId(next.id);
    setState(initialState());
    setNewBest(false);
    focus();
  };

  const switchLanguage = (next: Language) => {
    if (next === language) return;
    setLanguage(next);
    saveLanguage(next);
    open(problem);
  };

  const step = (delta: number) => {
    if (filtered.length === 0) return;
    const i = filtered.findIndex((p) => p.id === problem.id);
    open(filtered[(i + delta + filtered.length) % filtered.length]);
  };

  const random = () => {
    const pool = filtered.filter((p) => !solved.has(p.id) && p.id !== problem.id);
    const from = pool.length ? pool : filtered;
    if (from.length) open(from[Math.floor(Math.random() * from.length)]);
  };

  const changeFilter = (nextTopic: TopicFilter, nextDifficulty: DifficultyFilter) => {
    setTopic(nextTopic);
    setDifficulty(nextDifficulty);
    const matches = problems.filter(
      (p) =>
        (nextTopic === "All" || p.topic === nextTopic) &&
        (nextDifficulty === "All" || p.difficulty === nextDifficulty),
    );
    if (matches.length && !matches.some((p) => p.id === problem.id)) {
      open(matches.find((p) => !solved.has(p.id)) ?? matches[0]);
    }
  };

  // Applies keys in order and commits once, so multi-character input isn't lost.
  const press = (...keys: TypingKey[]) => {
    const at = Date.now();
    const next = keys.reduce((s, key) => applyKey(code, s, key, at), state);
    if (next === state) return;
    setState(next);
    setNow(at);
    if (next.finishedAt === null) return;

    const { wpm } = computeStats(code, next, at);
    const updated = {
      best: Math.max(best, wpm),
      solved: new Set(solved).add(problem.id),
    };
    setProgress({ ...progress, [language]: updated });
    saveProgress(language, updated);
    setNewBest(wpm > best);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let shortcut: (() => void) | null = null;
    if (e.key === "Escape") shortcut = () => open(problem);
    else if (e.key === "Tab") shortcut = () => step(e.shiftKey ? -1 : 1);
    else if (finished && e.key === "Enter") shortcut = () => step(1);
    if (shortcut) {
      e.preventDefault();
      shortcut();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === "Backspace") press({ type: "backspace" });
    else if (e.key === "Enter") press({ type: "enter" });
    else if (e.key.length === 1) press({ type: "char", char: e.key });
    else return; // Mobile keyboards send "Unidentified"; handled in onInput.
    e.preventDefault();
  };

  // Fallback for on-screen keyboards that don't report real keys.
  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const event = e.nativeEvent as InputEvent;
    if (event.inputType === "deleteContentBackward") press({ type: "backspace" });
    else if (event.inputType === "insertLineBreak") press({ type: "enter" });
    else press(...[...(event.data ?? "")].map((char) => ({ type: "char" as const, char })));
    e.currentTarget.value = "";
  };

  const lines = useMemo(() => {
    let offset = 0;
    return code.split("\n").map((text) => {
      const line = { text, start: offset };
      offset += text.length + 1;
      return line;
    });
  }, [code]);

  const charClass = (i: number) => {
    if (i < state.typed.length) return state.typed[i] === code[i] ? "ok" : "bad";
    return i === state.typed.length && !finished ? "caret" : "todo";
  };

  const solvedHere = filtered.filter((p) => solved.has(p.id)).length;

  return (
    <div className="page">
      <header className="top">
        <div className="brand">
          <span className="logo" aria-hidden>
            {"</>"}
          </span>
          <div>
            <h1>Code Typer</h1>
            <p className="muted">
              {problems.length} problems, from first syntax to DSA patterns. Type the solution
              in C++, Java, Python or JavaScript.
            </p>
          </div>
        </div>
        <div className="side">
          <div className="segmented languages" role="group" aria-label="Language">
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={l === language}
                aria-label={`${languageInfo[l].label}, ${progress[l].solved.size} typed`}
                className={l === language ? "active" : undefined}
                onClick={() => switchLanguage(l)}
              >
                {languageInfo[l].label}
                <span className="count">{progress[l].solved.size}</span>
              </button>
            ))}
          </div>
          <div className="progress-box" aria-label="Progress">
            <span>
              <strong>{solved.size}</strong> / {problems.length} typed in{" "}
              {languageInfo[language].label}
            </span>
            <span className="bar" aria-hidden>
              <span style={{ width: `${(solved.size / problems.length) * 100}%` }} />
            </span>
          </div>
        </div>
      </header>

      <div className="controls">
        <label className="field">
          <span>Topic</span>
          <select
            value={topic}
            onChange={(e) => changeFilter(e.target.value as TopicFilter, difficulty)}
          >
            <option value="All">All topics</option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <div className="segmented" role="group" aria-label="Difficulty">
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={d === difficulty}
              className={d === difficulty ? "active" : undefined}
              onClick={() => changeFilter(topic, d)}
            >
              {d}
            </button>
          ))}
        </div>
        <label className="field grow">
          <span>Problem</span>
          <select value={problem.id} onChange={(e) => open(problems.find((p) => p.id === e.target.value)!)}>
            {(filtered.some((p) => p.id === problem.id) ? filtered : [problem, ...filtered]).map((p) => (
              <option key={p.id} value={p.id}>
                {solved.has(p.id) ? "✓ " : ""}
                {p.number}. {p.title}
              </option>
            ))}
          </select>
        </label>
        <div className="nav-buttons">
          <button type="button" className="btn" onClick={() => step(-1)} aria-label="Previous problem">
            ←
          </button>
          <button type="button" className="btn" onClick={random}>
            Random
          </button>
          <button type="button" className="btn" onClick={() => step(1)} aria-label="Next problem">
            →
          </button>
        </div>
      </div>
      <p className="filter-note muted">
        {filtered.length} problems · {solvedHere} typed
      </p>

      <main className="layout">
        <article className="problem" aria-labelledby="problem-title">
          <p className="meta">
            #{problem.number} · {problem.topic}
          </p>
          <h2 id="problem-title">{problem.title}</h2>
          <div className="badges">
            <span className={`badge ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
            {solved.has(problem.id) && <span className="badge done">✓ Typed</span>}
          </div>
          <section className="statement">
            <RichText text={problem.statement} />
          </section>
          <section>
            <h3>Approach</h3>
            <RichText text={problem.approach} />
          </section>
          <dl className="complexity">
            <div>
              <dt>Time</dt>
              <dd>{problem.time}</dd>
            </div>
            <div>
              <dt>Space</dt>
              <dd>{problem.space}</dd>
            </div>
          </dl>
        </article>

        <section className="workspace" aria-label="Type the solution">
          <dl className="stats">
            <div>
              <dt>WPM</dt>
              <dd>{stats.wpm}</dd>
            </div>
            <div>
              <dt>Accuracy</dt>
              <dd>{stats.accuracy}%</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{formatTime(stats.elapsedMs)}</dd>
            </div>
            <div>
              <dt>Best</dt>
              <dd>{best || "—"}</dd>
            </div>
          </dl>

          {finished && (
            <div className="result" role="status" ref={resultRef}>
              <p className="result-title">{newBest ? "New best! 🎉" : "Solution typed ✓"}</p>
              <div className="result-grid">
                <div>
                  <strong>{stats.wpm}</strong>
                  <span>WPM</span>
                </div>
                <div>
                  <strong>{stats.accuracy}%</strong>
                  <span>accuracy</span>
                </div>
                <div>
                  <strong>{formatTime(stats.elapsedMs)}</strong>
                  <span>time</span>
                </div>
                <div>
                  <strong>{state.mistakes}</strong>
                  <span>mistakes</span>
                </div>
              </div>
              <div className="result-actions">
                <button type="button" className="btn primary" onClick={() => step(1)}>
                  Next problem <kbd>Enter</kbd>
                </button>
                <button type="button" className="btn" onClick={() => open(problem)}>
                  Retry <kbd>Esc</kbd>
                </button>
              </div>
            </div>
          )}

          <div className="editor" onClick={focus}>
            <div className="editor-bar">
              <span className="dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className="file">{languageInfo[language].file}</span>
              <span className="progress" aria-hidden>
                <span style={{ width: `${(state.typed.length / code.length) * 100}%` }} />
              </span>
            </div>

            <pre className="code" aria-hidden>
              {lines.map((line, n) => (
                <div className="line" key={line.start}>
                  <span className="gutter">{n + 1}</span>
                  <span>
                    {[...line.text].map((ch, j) => {
                      const i = line.start + j;
                      return (
                        <span key={i} className={charClass(i)}>
                          {ch}
                        </span>
                      );
                    })}
                    {n < lines.length - 1 && (
                      <span className={`nl ${charClass(line.start + line.text.length)}`}>↵</span>
                    )}
                  </span>
                </div>
              ))}
            </pre>

            <textarea
              ref={inputRef}
              className="sr-input"
              aria-label="Type the solution here"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              onKeyDown={onKeyDown}
              onInput={onInput}
            />

            {!running && !finished && (
              <p className="start-hint">
                Click here and start typing · Enter for new lines, indentation is automatic
              </p>
            )}
          </div>

          <p className="keys muted">
            <kbd>Esc</kbd> restart · <kbd>Tab</kbd> next · <kbd>Shift</kbd>+<kbd>Tab</kbd> previous ·{" "}
            <kbd>Backspace</kbd> fix mistakes
          </p>
        </section>
      </main>

      <footer className="muted">
        Built by{" "}
        <a href="https://ashishxbisht.in" target="_blank" rel="noopener noreferrer">
          Ashish Bisht
        </a>
      </footer>
    </div>
  );
}
