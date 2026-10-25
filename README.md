# Code Typer

Learn 229 problems by typing their solutions in C++17, Java, Python or JavaScript: 18 syntax
basics for beginners, then 211 DSA problems. Each has a statement, approach and complexity; live
WPM and accuracy, auto-indent, topic and difficulty filters, and a language toggle. Progress and
best WPM are saved per language.

Built by [Ashish Bisht](https://ashishxbisht.in) with React, TypeScript and Vite.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm test` | Run the unit tests and solution checks (Vitest) |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Typecheck and build to `dist/` |
| `npm run preview` | Serve the production build |

Every solution, in all four languages, is compiled and run against test cases by `npm test`
(linked-list, tree and class-design problems included). C++ builds with `g++ -std=c++17` and the
address and undefined-behaviour sanitizers. The tests need `g++`, a JDK 17+ (`javac`, `java`) and
`python3` on the PATH. Problem statements live in `src/problems/`, one file per topic, with the
solutions in `cpp/`, `java/`, `python/` and `javascript/` next to them.

The typing logic lives in a pure module (`src/typer.ts`) with no React or DOM, which keeps it easy
to test. Progress is stored in the browser's `localStorage`; the app works without it.
