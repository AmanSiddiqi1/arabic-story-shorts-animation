# Original implementation vs enhanced implementation

## What the original is
`engine/original/` holds three files exactly as supplied (checksums in `PROVENANCE.md`): `kit.js` (seeded random and noise, easing, camera, paths, text and layout helpers), `sound.js` (synthesized effects kit: `pop`, `stamp`, `thud`, `whoosh`, `tick`, `chime`, `scribble`, beds, offline rendering), and `halftone-pop.js` (the style: background, finish, title, label, arrow, box, counter, emphasis, transition, plus a 12-second demo). The brief that came with it (`the original brief (removed 2026-11-17; see engine/original/PROVENANCE.md)`) asked for one scene object `{duration, draw(ctx,W,H,t,S), score(k,S)}` and an MP4 render path.
**The original was never modified in any of the four films.** Defining traits: flat process colours, blue/red Ben-Day dot fields (cached staggered tiles), fat tapering brush outlines with noisy width, Bangers lettering slammed in word by word, jagged burst shapes, slanted-panel "MEANWHILE" transition, and an off-register newsprint finish (cyan ghost plate, aged paper, grain).

## What was added (all around the original)
| Added | Where | Why it exists | Universal? |
|---|---|---|---|
| Brush ink outline for any closed shape, noise cache, dot-filled `shape()`, limbs `seg()`, `star`, `ell` | `helpers.js` | The original only had its internal `brush()`; characters and props need the same inked look | core |
| Comic lettering `sfx`, speech `bubble`, thought `cloud`, `bulb`, ZZZ, clock, dizzy stars, sound arcs | `helpers.js` | Visual vocabulary for story beats | core |
| Blocky comic figure `person()`, eyes/mouth/talk helpers, `kfn` keyframes | `helpers.js` | Character animation without a rig | core (figure design is a sample) |
| 2x-resolution cached static layers (`layer1`), sun and cloud | `helpers.js` | Crisp when the camera zooms; fast frames | core |
| Camera with clamp, panel mapping for overlays, panel framing, shake, transitions, caption box | `stage.js` | Same structure rewritten four times | core |
| Subtitle component (fit loop, RTL, fade, hold rules) | `subtitle.js` | Identical in all four films | core, neutral |
| Hit pulse / dip / shake helpers | `helpers.js` | Fox film (drum hits) | core, small |
| Player with narration sync, loop and Pause fix | `player.js` | Original had no player UI | core |
| Build, render (parallel frames, offline effects mix, loudnorm, 48 kHz), stills, sheet, dependency check | `scripts/` | Original only described the render path | core |
| Arabic fonts, sizes, line height, colours | `presets/arabic.json` | Kalila wa Dimna subtitle standards | optional |
| Narration transcription, alignment, time warp | `modules/narration-sync/` | Needed for narrated films | optional |
| Monkey, turtle, birds, elephant, frog, fox, drum, nest | `examples/characters/` | Demonstrations | example only |
| Story timelines, camera keys, balloons, titles | (not included) | Story-specific | no |

## Differences that change behaviour
- Original demo used a 1280x720 canvas; the films use **1080x1920** with a different page (panel in the top 2/3 and a caption box). The style's functions scale with `K.layout(W,H)`, so they work at both.
- Original `score()` plays a bed plus effects; the films keep the same call but quieter (`master 0.6`) under narration.
- Original text primitives uppercase and split words (`title`, `label`). **They cannot draw Arabic**; Arabic is drawn only by `subtitle.js` using canvas shaping.
