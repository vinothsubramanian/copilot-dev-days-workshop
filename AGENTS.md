# Dev Days Quiz: Agent Instructions

## Project
- Small quiz web app built with plain HTML, CSS, and JavaScript.
- Follow the workflow and feature context in [workshops/vscode.md](workshops/vscode.md).

## Rules
- Do not add frameworks, build tools, or npm dependencies.
- Keep pure quiz logic in `src/quiz.js`; do not put DOM code there.
- Export quiz logic with `module.exports` so Node tests can load it.
- Keep DOM queries, rendering, and event handling in `src/app.js`.
- Keep quiz data in `src/questions.js` and follow its existing shape.
- Define colors only as CSS variables in `:root` in `src/style.css`; use those variables elsewhere.
- Make actions real `<button>` elements, preserve visible keyboard focus, and use `aria-live` for changing messages.
- Add or update focused tests for logic and data changes. Use only `node:test` and `node:assert/strict`.
- Run `npm test` after changes; one failing grade-boundary test is intentionally planted until Chapter 4.
- Keep changes small and consistent with nearby code.
