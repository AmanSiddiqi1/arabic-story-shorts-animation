# The original Creator OS engine (external dependency, not stored here)

- **Files:** `kit.js`, `sound.js` (`skills/motion-styles/engine/`) and `halftone-pop.js` (`skills/motion-styles/styles/`) of
  **https://github.com/kevinbadi/claude-motion-faceless-skills** (MIT License, © its author). They are no longer copied into this
  repository: clone that repository next to this project folder (like `lemo-opuscar`), e.g.
  `~/Downloads/Claude Code/claude-motion-faceless-skills`, or run its `install.sh` (`~/.claude/skills/motion-styles`), or set
  `MOTION_STYLES` to its `skills/motion-styles` folder. `Library/engine.py` and `scripts/hp-build.py` find it.
- **History:** the style was first supplied on 2026-11-09 as a pasted snippet from the Creator OS Motion Style Atlas web page
  ("Halftone Pop Panel"); on 2026-11-17 the project switched to the published repository (commit `ca04944`). The pasted `kit.js` and
  `sound.js` differed from the repository only in their first comment line; `halftone-pop.js` was identical; drawing output is
  unchanged (regression test). The verbatim brief and style card that were copied from the web page were removed from this skill.
- **Do not edit the engine.** Improvements live in `../enhanced/` and presets.

SHA-256 of the repository files (commit ca04944):
- `kit.js`: `cbf7ad13811b7f75eb3af77d180f38dde180715e4d1e802625725a69b52ce055`
- `sound.js`: `5cf5915eb7f2417843fa02b04d179fccd7458a852ba6f22e28b0a65436f9a2eb`
- `halftone-pop.js`: `af7aa0d45b4ecf317a1ef0efee1b1bb35134f5af2fc376325e245059116a8ab0`
