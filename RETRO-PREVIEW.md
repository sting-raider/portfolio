# Original-layout retro motion revision

Local preview only. No deployment or publishing is part of this study.

Build with `./scripts/build-motion-previews.ps1 -Variant retro`, then serve with
`node scripts/serve-motion-preview.mjs .artifacts/motion-previews/retro 3004`.
Open http://localhost:3004/.

The original homepage and inner-page layouts remain the base. The first three
motion studies are not used by this preview. Without the preview environment
flag, the original site continues to render normally.

Reference material: official in-game screenshots at https://undertale.com/about/
and the game's pixel-animation presentation at https://deltarune.com/.

Design interpretation, not a claim of exact game timings:

- Snap the SOUL between menu items, with arrow-key navigation; no spring physics.
- Keep orange/yellow command outlines, black interiors, white dialogue frames,
  existing character portraits, fonts, voices and soundtrack.
- Open the archive battle frame before revealing its contents in discrete frames.
- Use brief black shutter transitions, not bright flashes or floating panels.
- Keep native scroll and normal page lengths, with no pinned cinematic sections.
- Preserve readable phone dialogue sizes and fixed-height text boxes.
- Respect reduced motion and keep the Quick View free of entrance choreography.
