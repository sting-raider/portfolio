# Local motion design studies

These are three comparison prototypes, not a new published design. Nothing is pushed automatically. Ordinary `npm run dev` and `npm run build` keep the original portfolio when `NEXT_PUBLIC_MOTION_VARIANT` is unset.

| Study | URL | Signature interactions |
| --- | --- | --- |
| Battle Theatre | http://localhost:3001/ | Pointer-following SOUL, spring command selection, encounter inspector, animated system trace |
| Fountain Descent | http://localhost:3002/ | Fountain camera movement, split scroll typography, project records emerging through a pinned scene |
| Save File OS | http://localhost:3003/ | Save-file tabs, shared-layout project selection, animated equipment loadouts |

Each includes the existing routes, characters, typewriter dialogue, fonts, SOUL effects, and persistent soundtrack. Analytics are disabled in preview mode. Mobile layouts simplify the pinned scene; reduced-motion preferences remove spatial animation.

To rebuild all three optimized static previews:

```powershell
./scripts/build-motion-previews.ps1
```

To start them in hidden background processes:

```powershell
./scripts/start-motion-previews.ps1
```

Generated previews and screenshots live in `.artifacts/` (ignored by Git). The server listens only on IPv4 and IPv6 loopback. The 01 / 02 / 03 strip on each preview lets you switch between directions.

These prototypes intentionally reuse the approved game assets. No new AI-generated artwork, challenge entries, or Roblox content is introduced.
