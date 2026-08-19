# Precision Teaching Typing Webapp
A webapp designed to give the teacher and the student control over what typing pinpoints are measured and timed.

Static site, no build step, no backend. The student picks a pinpoint, types
against it for a fixed timing, and gets correct/min, incorrect/min, and a
most-missed-keys breakdown to copy onto their own paper Standard Celeration
Chart. Nothing is stored by the app — see `webapp_for_typing.md` for the
Precision Teaching background and design rationale.

## Adding or editing a pinpoint

Edit `tests.js`. Each entry is a plain object — copy an existing one, give it
a unique `id`, and change the rest. No other file needs to change. See the
comments at the top of `tests.js` for the field reference.

## Running it locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/`.

Don't open `index.html` directly by double-clicking it (a `file://` URL) -
tests that load their content from a separate `.txt` file use `fetch()`,
which browsers block entirely for `file://` pages. A local server or the
hosted GitHub Pages site both work fine.

## Deploying

GitHub Pages: repo Settings → Pages → "Deploy from a branch" → `main` /
`(root)`. Publishes at `https://jbadgerw.github.io/precision_teaching_typing_webapp/`.
