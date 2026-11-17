# Dependencies

| Need | For | Found how | If missing |
|---|---|---|---|
| Node 18+ | scripts | `node` | install Node |
| Python 3.8+ | `hp-build.py` (standard library only) | `python3` | install Python |
| ffmpeg | render, contact sheets | `ffmpeg` on PATH | install ffmpeg |
| `playwright-core` + a Chromium | stills and render (headless Chrome) | see below | `npm i playwright-core && npx playwright-core install chromium`, or `HP_PLAYWRIGHT=/path/to/playwright-core` |
| `faster-whisper` | narration sync only | `modules/narration-sync/README.md` | create a venv; never needed otherwise |

## Lemo-Opuscar
The original films used a Lemo-Opuscar checkout only as a convenient copy of `playwright-core` and a few Chrome launch flags (`browser.mjs`: Metal on macOS, GPU on, sRGB colour). Nothing in the animation or render code depends on the rest of that library. This skill is independent of it: `scripts/lib/resolve.mjs` finds `playwright-core` from `$HP_PLAYWRIGHT`, `$LIB`, `local.json` (written by `check-deps.mjs --save`), `node_modules` or a `lemo-opuscar/node_modules` in the working directory and each parent, the global npm root, then a `lemo-opuscar` folder under `~`, `~/Downloads`, `~/Documents`, `~/Developer`. It launches Playwright's Chromium (or `$PLAYWRIGHT_CHROME`, or system Chrome) with portable flags; GPU back-end flags are opt-in via `HP_ANGLE=metal|gl|vulkan|swiftshader`. The Python venv of that library is not needed (contact sheets use ffmpeg). Do not copy or modify Lemo-Opuscar.
On the original Mac the npm registry is not reachable, so reusing Lemo-Opuscar's `node_modules` (playwright-core 1.63.0) is the practical route there.

## Fonts
Bangers, Cairo, Noto Naskh Arabic, Scheherazade New: bundled in `assets/fonts/` (unmodified Google Fonts woff2 subsets, SIL OFL 1.1; notices in `assets/fonts/NOTICE.md` and `licenses/`). No system fonts are required.

## Platform notes
Written and tested on macOS (Intel, Chrome headless shell, Metal not required for 2D canvas). Nothing is macOS-only; paths are never assumed. Linux/Windows are untested.
