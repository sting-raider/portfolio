# Ali Sufiyan Khan — Portfolio

An Undertale/Deltarune-inspired portfolio for Ali Sufiyan Khan, featuring project case studies, an evidence-based skills inventory, character encounters, and a persistent shuffled soundtrack player.

## Current archive

Eight standalone projects: DANTE, Project SuperJoin, AegisFlow, RoleAtlas, the hybrid robotics controller, Hybrid K3s, F1 Agent, and The Abstract. Content reflects the September 2026 repository documentation and distinguishes demos, test-mode results, and ongoing research from production claims.

Scrolling layers the fountain and title, opens a sticky battle-frame chapter transition, and glides a SOUL between the current project choices. Native scrolling is untouched; geometry is cached outside the animation loop. Project cards remain visible, while selected narrative sections use smooth eased entrances. Reduced-motion preferences disable the scroll scenes and entrances, and all content remains accessible without JavaScript. Quick View stays animation-free with full-width project headings.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production build

```bash
pnpm build
```

The site uses Next.js static export and writes the deployable site to `out/`. Pushes to `master` deploy to GitHub Pages through `.github/workflows/deploy-pages.yml`.

## Private analytics

The public portfolio supports cookie-free, anonymous PostHog pageview and résumé-download tracking when the `POSTHOG_KEY` GitHub Actions repository variable is set to the PostHog project API key (`phc_…`). The optional `POSTHOG_HOST` variable selects the region (default `https://us.i.posthog.com`; use `https://eu.i.posthog.com` for EU Cloud).

The login-gated Alphys analytics console is a separate server-rendered app in [`analytics-dashboard`](./analytics-dashboard). It embeds a public, read-only PostHog dashboard, so no PostHog API secret is stored. It still needs a server host such as Vercel because GitHub Pages cannot safely hold its admin credentials. Its setup and required environment variables are documented in that directory.

## Fan project credits

UNDERTALE and DELTARUNE characters, sprites, music, and dialogue sounds belong to Toby Fox. This is a non-commercial fan-made portfolio. Sans and Papyrus overworld sprites were sourced from the [Undertale Wiki](https://undertale.wiki/). The Dark Fountain animation is based on the [user-provided Reddit-hosted animation](https://i.redd.it/tq0clgnp5ypg1.gif).

The SOUL death interaction uses the original `snd_break1.wav` and `snd_break2.wav` effects identified in [The Sounds Resource Undertale archive](https://sounds.spriters-resource.com/pc_computer/undertale/asset/399803/), ripped by MilesTheCreator.

Ralsei, Susie, Sans, and Papyrus dialogue use the clean `snd_txtral.wav`, `snd_txtsus.wav`, `snd_txtsans.wav`, and `snd_txtpap.wav` game-sound files mirrored by the [DeltaRune Engine Godot 4 project](https://github.com/Ricoh2A03/DeltaRune-Engine-Godot-4). The supplied gameplay recording was used only as a visual timing reference; none of its soundtrack audio is included.

Sans dialogue is rendered as static bitmap artwork with [Pixel Comic Sans (Undertale Sans Font)](https://fontstruct.com/fontstructions/show/1534860) by ColorSwitchFan25, under its FontStruct Non-Commercial License. The font software itself is not distributed or served as a webfont. Papyrus dialogue uses [Papyrus Font [UNDERTALE]](https://fontstruct.com/fontstructions/show/1817942/papyrus-text-6-9) by DecorouzSpoNge.YT, shared under CC BY-SA 3.0.
