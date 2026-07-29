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

UNDERTALE and DELTARUNE characters, sprites, and music belong to Toby Fox. This is a non-commercial fan-made portfolio. Sans and Papyrus overworld sprites were sourced from the [Undertale Wiki](https://undertale.wiki/). The Dark Fountain animation is based on the [user-provided Reddit-hosted animation](https://i.redd.it/tq0clgnp5ypg1.gif).

The SOUL death interaction uses the original `snd_break1.wav` and `snd_break2.wav` effects identified in [The Sounds Resource Undertale archive](https://sounds.spriters-resource.com/pc_computer/undertale/asset/399803/), ripped by MilesTheCreator.
