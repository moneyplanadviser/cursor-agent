# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a Node.js + TypeScript REST API for article management, built with Express. It uses `tsx` for development with hot-reload, TypeScript for building, ESLint (flat config) for linting, and Jest + `ts-jest` for testing.

### Standard commands

See `package.json` scripts:

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (starts on port 3000 with hot-reload via tsx) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Test | `npm test` |

### Notes

- The dev server (`npm run dev`) uses `tsx watch` which auto-restarts on file changes. If you install new dependencies, you may need to restart the dev server manually for the changes to take effect.
- ESLint uses the flat config format (`eslint.config.mjs`), not the legacy `.eslintrc` format.
- Jest is configured with `ts-jest` preset; test files follow the `*.test.ts` naming pattern inside `src/`.
- No external services (databases, caches, etc.) are required — the API uses in-memory storage.
