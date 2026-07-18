# MISSION CONTROL — Ali Sufiyan Khan

A personal portfolio built as a **mission-control telemetry deck**: every project is a
tracked system that reports its own status — including the failures. No invented metrics,
no placeholder claims; every number on the site is traceable to a repository README or
the operator's résumé.

**Concept:** _"A working system beats a beautiful mock-up."_ The deck practices what the
operator preaches — honest status badges (`OPERATIONAL` / `IN PROGRESS` / `EARLY STAGE`),
real telemetry (256/256 reach success, 7 mm median, 59.4% strict lifts, 60 Hz, 2M+ messages,
1,000+ users at 0% failure), and a working operator console hidden under the backtick key.

## Stack

- **Vite 8 + React 19 + TypeScript** — no component library, no CSS framework
- **Hand-rolled design system** — one CSS file, four themes driven by custom properties
- **Self-hosted fonts** — Space Grotesk (display) + IBM Plex Mono (telemetry), via Fontsource
- **Canvas radar backdrop** — DPR-aware, theme-aware, freezes to a static frame under
  `prefers-reduced-motion`
- **Vitest** — unit tests for the console command parser and content-data integrity
- **oxlint + Prettier + tsc** — lint / format / typecheck
- **Playwright** — visual inspection at desktop / tablet / mobile (dev-only tooling)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

## Verify it

```bash
npx tsc -b         # typecheck
npx oxlint         # lint
npx vitest run     # 22 unit tests
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Deploy it

Any static host works — the build output is plain HTML/CSS/JS in `dist/`.

- **Vercel / Netlify:** import the repo, framework preset "Vite", build command
  `npm run build`, output directory `dist`.
- **GitHub Pages:** `npm run build`, then publish `dist/` (e.g. with `gh-pages` or an
  Actions workflow). If deploying under a sub-path, set `base: '/<repo-name>/'` in
  `vite.config.ts` first.
- **Cloudflare Pages / S3 + CDN:** upload `dist/` as-is.

## Secrets on the deck

| Trigger                        | Effect                                                     |
| ------------------------------ | ---------------------------------------------------------- |
| `` ` `` (backtick)             | Opens the operator console — try `help`                    |
| `theme <name>` in console      | `night-ops` (default) · `cyberpunk` · `phosphor` · `paper` |
| `crab` in console              | Releases the crab                                          |
| `deltarune` in console         | The forbidden word                                         |
| `sudo` / `rm -rf /` in console | Consequences                                               |
| ↑ ↑ ↓ ↓ ← → ← → B A            | FERRIS PROTOCOL                                            |

Theme choice persists in `localStorage`. All motion respects `prefers-reduced-motion`.

## Structure

```
src/
  data/          all site content — projects.ts & profile.ts are the single source of truth
  console/       the operator console command parser (pure, unit-tested)
  components/    Nav, Hero, TelemetryCanvas, Ticker, Systems, Manifest, Operator, Comms,
                 ConsoleOverlay, Crab, Toast, Reveal
  hooks/         useKonami, useReducedMotion
  styles/        global.css — the whole design system, four themes
scripts/         Playwright inspection scripts (dev-only)
```

## Editing content

Everything factual lives in `src/data/projects.ts` and `src/data/profile.ts` — update
those two files and the site, ticker, and console stay in sync. The test suite
(`src/data/projects.test.ts`) enforces data integrity (unique ids, valid URLs, at least
one metric per system, exactly one featured project).

---

Designed & built by Ali Sufiyan Khan · [github.com/sting-raider](https://github.com/sting-raider)
