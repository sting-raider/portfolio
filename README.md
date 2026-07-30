# Ali Sufiyan Khan — Portfolio

An Undertale/Deltarune-inspired portfolio for Ali Sufiyan Khan, featuring project case studies, an evidence-based skills inventory, character encounters, and a persistent shuffled soundtrack player.

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

The public portfolio supports cookie-free Umami page and résumé-download tracking when the `UMAMI_WEBSITE_ID` GitHub Actions repository variable is configured. Optional `UMAMI_SCRIPT_URL` and `UMAMI_DOMAINS` variables override the Cloud script and allowed hostnames.

The owner-only Alphys analytics console is a separate server-rendered app in [`analytics-dashboard`](./analytics-dashboard). It must be deployed to a server host such as Vercel because GitHub Pages cannot safely hold its admin credentials or private API key. Its setup and required environment variables are documented in that directory.

## Fan project credits

UNDERTALE and DELTARUNE characters, sprites, music, and dialogue sounds belong to Toby Fox. This is a non-commercial fan-made portfolio. Sans and Papyrus overworld sprites were sourced from the [Undertale Wiki](https://undertale.wiki/). The Dark Fountain animation is based on the [user-provided Reddit-hosted animation](https://i.redd.it/tq0clgnp5ypg1.gif).

The SOUL death interaction uses the original `snd_break1.wav` and `snd_break2.wav` effects identified in [The Sounds Resource Undertale archive](https://sounds.spriters-resource.com/pc_computer/undertale/asset/399803/), ripped by MilesTheCreator.

Ralsei, Susie, Sans, and Papyrus dialogue use the clean `snd_txtral.wav`, `snd_txtsus.wav`, `snd_txtsans.wav`, and `snd_txtpap.wav` game-sound files mirrored by the [DeltaRune Engine Godot 4 project](https://github.com/Ricoh2A03/DeltaRune-Engine-Godot-4). The supplied gameplay recording was used only as a visual timing reference; none of its soundtrack audio is included.

Sans dialogue is rendered as static bitmap artwork with [Pixel Comic Sans (Undertale Sans Font)](https://fontstruct.com/fontstructions/show/1534860) by ColorSwitchFan25, under its FontStruct Non-Commercial License. The font software itself is not distributed or served as a webfont. Papyrus dialogue uses [Papyrus Font [UNDERTALE]](https://fontstruct.com/fontstructions/show/1817942/papyrus-text-6-9) by DecorouzSpoNge.YT, shared under CC BY-SA 3.0.
