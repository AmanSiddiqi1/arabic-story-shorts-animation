---
name: halftone-pop-shorts
description: Build Halftone Pop Panel animations (Lichtenstein-style comic panels drawn in canvas 2D with Ben-Day dots, brush outlines, Bangers lettering, synthesized sound) as a self-contained HTML player plus an MP4 render. Optional Arabic preset (Noto Naskh Arabic subtitles) and optional narration sync. Project copy for Arabic Story Shorts (authoritative here). Explicit use only (/halftone-pop-shorts).
disable-model-invocation: true
argument-hint: "[script or narration to animate] [arabic preset?]"
---

# Halftone Pop

Reusable animation system. Don't rewrite the engine: scaffold a project, write a scene, build, check stills, then render.
The skill folder is the folder holding this file: in the Arabic Story Shorts repository it is `.claude/skills/halftone-pop/` (call it `$HP`; resolve it from this file's location, never from a user's home folder). The skill itself never depends on any particular film project.

## Arabic Story Shorts (this repository)
This copy is the **authoritative** Halftone Pop skill for Arabic Story Shorts. It is invoked as `/halftone-pop-shorts`; the folder name `halftone-pop` is kept so paths match the original. A personal copy at `~/.claude/skills/halftone-pop` (if present) wins the name `/halftone-pop` in Claude Code, which is why this copy has its own name. See `DEVELOPMENT_SETUP.md` at the repository root.

Inside this repository, stories are **not** built from the skill's examples or `hp-build.py`. They use the shared library, which runs on the same engine (`kit.js`, `sound.js`, `halftone-pop.js` from the installed claude-motion-faceless-skills repo, found by `Library/engine.py`; see `engine/original/PROVENANCE.md`):
1. Read `CLAUDE.md` (series rules) and `Library/Animation_Capabilities_Guide.md` before staging; look at `Library/catalogue/cast.png` and `sets.png` first.
2. Start a story by copying `Library/template/` to `Animations/<story>/`; draw with the Library cast, sets, props and motion helpers (`Library/registry.js`).
3. **Length limit: a finished film is at most 3 minutes (180.0 s) including the THE END hold**; if the narration is longer than 178.5 s, shorten the hold so the total is 180.0 s.
4. Narration and other large media live outside Git in the checkout's own folders (local mode, `media.config.json` default root `"."`): narration in `Animations/<story>/`, final MP4s in `MP4s/`. Code reaches them through `Library/media.py` / `media.mjs`, so setting `ARABIC_STORY_MEDIA` (or `.media-root`) to a shared folder moves them for another account without code changes.
4. After any Library change run `node Library/tests/regression.mjs` (must print "all identical").
Use the skill's `engine/enhanced`, presets and scripts below for stand-alone experiments outside `Animations/`, or as a reference.

## Layers (keep them separate)
- `engine/original/`: the supplied Creator OS code, **unchanged and read-only** (`kit.js`, `sound.js`, `halftone-pop.js`, style card, provenance). Private reference; licence unverified; never edit it, never publish it.
- `engine/enhanced/`: improvements built over four films: `helpers.js` (brush ink, dot fills, shapes, lettering, balloons, a comic figure, camera/hit helpers), `stage.js` (page, panel, camera, overlays, transition, caption), `subtitle.js` (colour- and language-neutral caption component), `player.js`.
- `presets/arabic.json`: optional Arabic typography and subtitle layout (default Noto Naskh Arabic 700; alternatives Cairo 800, Scheherazade New 700). Only when asked for.
- `modules/narration-sync/`: optional Whisper transcription and word alignment. Only when the user wants scenes or subtitles timed to a recording.
- `examples/characters/`: optional example characters (monkey, turtle, birds, elephant, frog, fox, drum). Never add them unless asked.
- `references/`: read as needed: `VISUAL-STANDARDS.md`, `ARCHITECTURE.md`, `ORIGINAL-VS-ENHANCED.md`, `DEPENDENCIES.md`, `LESSONS.md`, `UPDATING.md`.

## Workflow
1. **Check dependencies:** `node $HP/scripts/check-deps.mjs` (add `--sync` only for narration sync; `--save` remembers the playwright path). If something is missing, tell the user exactly what, using its message; don't fail silently or install without asking.
2. **Scaffold** into the user's chosen folder (not inside the skill): `node $HP/scripts/new-project.mjs <dir> --title "..." [--preset arabic] [--narration file.mp3]`. This writes `halftone.config.json`, `scene.js` (a working starter) and, for Arabic, a sample `timing.json`.
3. **Storyboard first** (a short list of scenes, key beats, camera moves, one `transition`, a held ending). Time each beat to the spoken words when there is narration. Every frame must be a pure function of time `t` (seeded randomness only: `K.rng`/`K.noise`).
4. **Write `scene.js`** with `HP.stage({...})` (see the template and `references/ARCHITECTURE.md`): `drawWorld(ctx,t,cam)`, `overlays`, `cameraKeys`, `score(k,S)`. Reuse helpers (`shape`, `bubble`, `sfx`, `person`, `cloud`, `layer1`...) and the style primitives (`S.title`, `S.label`, `S.arrow`, `S.box`, `S.counter`, `S.emphasis`, `S.transition`). Draw static layers once with `layer1` (2x resolution). Don't redefine helper names that exist in `helpers.js`.
5. **Build:** `python3 $HP/scripts/hp-build.py <dir>` -> `<output>.html` (self-contained player with Play/Pause/scrub/sound/loop) and `<output>.hp.json`.
6. **Preview with stills before anything expensive:** `node $HP/scripts/hp-stills.mjs <dir>/<output>.html 1 5 9 --out <dir>/stills` (add `--json` to print subtitle state) and `node $HP/scripts/hp-sheet.mjs sheet.jpg stills/*.jpg`. Look at the sheet: blockers, empty frames, text legibility, text overlapping art, promised actions that never happen. Iterate.
7. **Render only when approved:** test with `--from 0 --to 3` first, then `node $HP/scripts/hp-render.mjs <html> --out <film>.mp4` (about 6 to 7 minutes for 3 minutes of film with 3 workers). It refuses to overwrite an existing file, mixes narration with the effects, and normalizes loudness. Never delete the frames folder before ffmpeg finishes.

## Defaults and what is configurable
- Layout `9x16` (1080x1920): panel in the top two thirds, plain caption box in the bottom third. This is the only layout that has been rendered and checked; `16x9`, `1x1`, `9x16-nocaption` exist in `stage.js` but are **experimental**: say so if used.
- No subtitles unless a `timing.json` (and normally a preset) is configured; no characters, language, length, palette or storyline are imposed. Palette is the style's (paper, black, yellow, red, blue, skin, white) plus derived greens/browns.
- Subtitles (`HP.config.subtitle`): fonts, colours, sizes, line spacing, field names, box. The component itself is colour-neutral; blue translation text belongs to the Arabic preset only.
- Sound: effects only through `score(k,S)` (pop, stamp, thud, whoosh, tick, click, chime, ding, count, wrong, scribble...), quiet (`master` 0.6) and never over a spoken word. With narration, the narration is the soundtrack.

## Arabic preset (when the user says "Arabic preset")
Set `"preset": "arabic"` (and optionally `"arabicFont": "naskh" | "cairo" | "scheherazade"`) in `halftone.config.json`. Arabic is shown verbatim (diacritics kept), right to left, black, in the caption box; the translation sits below it in smaller blue Bangers. Chunks come from `modules/narration-sync` (text always rebuilt from the supplied script) or a hand-made `timing.json` with `{a, b, ar, en}` chunks. See `references/VISUAL-STANDARDS.md` for the exact values. If a recording lacks a paragraph of the script, say so; never invent narration or timings. Embedded fonts keep renders offline.

## Rules
- Don't modify `engine/original/`. Put reusable improvements in `engine/enhanced/` (see `references/UPDATING.md`), film-specific code in the project.
- Never overwrite a user's approved MP4/HTML; write new files, use `--out`.
- Keep user scripts verbatim; check subtitle text against the supplied files by program.
- Run `node $HP/tests/selftest.mjs` after changing the skill; it needs no film project.
