# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A deliberately minimal static webapp for teaching touch typing with Precision Teaching (PT): a student picks a "pinpoint" (a specific typing behavior), types against it for a fixed timing, and gets correct/min, incorrect/min, most-missed-keys, and slowest-keys numbers to copy onto their own **paper** Standard Celeration Chart.

## Running it

There is no build step, no package.json, no framework, and no automated test suite. Plain HTML/CSS/JS.

```
python3 -m http.server 8000
```

Opening `index.html` via `file://` does **not** work — pinpoints that load their content from a `.txt` file use `fetch()`, which browsers block on `file://` pages.

Deployment is GitHub Pages from `main`: https://jbadgerw.github.io/precision_teaching_typing_webapp/ — pushing to `main` publishes.

The PDFs (`teacher_guide.pdf`, `student_achievement_tracker.pdf`) are compiled from the matching `.typ` files with Typst (`typst compile file.typ`). If you edit a `.typ`, recompile its PDF.

## Architecture

Four scripts loaded as plain `<script>` tags in `index.html`, in dependency order, sharing globals (no modules):

1. **`tests.js`** — data, not unit tests. Defines the global `TESTS` array of pinpoint objects. The field reference is in the comment block at the top. Adding or editing a pinpoint touches only this file. `tests_old.js` is the kept-for-reference original revision.
2. **`stimulus.js`** — `createStimulusGenerator(test, duration)` turns a test into an endless character stream, growing on demand (`ensureAhead`) so fast typists never run out. Two test types: `"text"` (a string repeated) and `"wordbank"` (random sampling with replacement).
3. **`scoring.js`** — `createScorer(stimulusGen)` judges each keystroke. Backspace/Delete are swallowed on purpose: runs are uncorrectable fluency sprints. Also computes the results breakdowns; slowest-keys uses median + MAD (robust stats) rather than mean + stdev because keystroke intervals are right-skewed.
4. **`app.js`** — an IIFE wiring the four screens: select → ready (countdown) → running → results, looping back via "Try Again" / "Pick Another Test".

Pinpoints may set `source: "somefile.txt"` instead of inline `content`; `app.js` fetches and caches it on first use (one entry per non-blank line for wordbanks, whole file for text).

## Design constraints (intentional — don't "fix" these)

- **Nothing is persisted.** No localStorage, no accounts, no history. Students chart their own results on paper; that's the point. The only cross-run state is the in-memory, per-session last/best comparison (`sessionStats` in app.js), which is deliberately wiped on reload.
- **As few options as possible.** The README is explicit that features and settings distract students. Resist adding toggles, themes, gamification, or sounds.
- **`assessment: true` pinpoints (the benchmark and checkpoints) force live error feedback ON**, overriding the student's toggle, so every administration of a probe is measured under the same condition. This was deliberately walked back from forcing feedback *off* — see todo.md item 6 before revisiting.
- **No red/green pass–fail coloring.** Colorblind access is a standing concern; the keyboard diagram uses the Okabe–Ito palette, and aims are shown as reference numbers without met/not-met color coding.
- Pinpoint `id`s are never reused.
- Rates are reported as **correct/min and incorrect/min** (PT convention), not WPM or accuracy percent.

## Other files

- `todo.md` — the active task list; the PT-alignment section documents design decisions and their reasoning.
- `webapp_for_typing.md` — background research on applying Precision Teaching to typing; the rationale behind the pinpoint progression.
- `benchmark_sentences.txt` — the benchmark probe's pool, engineered so all letters, capitals, and `. , ' ? !` appear often enough to be diagnostic. Class rule: students never practice on it, or it stops being a generalization probe.
- `chromebook_keyboard_diagram*.svg` — B&W and color (by finger) diagrams; `*_OLD.svg` is kept for reference. Chromebook keys have their symbols centered, unlike standard PC keycaps.
