# Experiment: Fable 5.2 as creative director, Opus as animator (2026-11-15)

A copy of `../lark-and-the-elephant/` (the approved film is untouched; it was `lark-and-the-elephant/Halftone Pop/` and `Experiment Fable Director/` before the 2026-11-15 reorganisation). Only the sequence **20.2-46.5 s** was re-staged and rendered: the elephant arrives, sees the nest and does not care, then crushes it; the lark comes home and grieves.

## Workflow
1. Fable 5.2 (subagent, model id `claude-fable-5-2`, self-reported in each reply) reviewed the whole original film: `review/fable_review_1.md`.
2. Opus implemented the direction for the sequence, re-timed to the Arabic word times in `timing.json`, and rendered v1. The v1 sources are in `review/v1_src/`.
3. Fable compared v1 with the original (7 of 10 criteria met, 3 partly met) and listed 6 fixes: `review/fable_review_2.md`.
4. Opus applied the 6 fixes and rendered v2 (final). Fable has **not** reviewed v2.

## Outputs (`compare/`)
- `Lark 20.2-46.5s - original.mp4`: the same window cut from the approved MP4
- `Lark 20.2-46.5s - v1 Fable-directed.mp4`
- `Lark 20.2-46.5s - v2 Fable-directed (final).mp4`
- `Lark 20.2-46.5s - side by side (original left, v2 right).mp4`

## Code changes (this folder only)
- `src/seq_tragedy.js` (new): elephant path, footfalls and stomp, chick, lark and frog acting, worm, feathers, tears, dust bursts, camera keys.
- `src/birds.js`: backward-compatible rig additions:
  - `eye2`: gaze and lids
  - lark: squash, wing sag, tail drop, head rotation, crest droop
  - elephant: bob and head lag, tail swing, raised bent leg, squash, trunk reach
  - frog: duck
  - `chickActing` and `nestRuin`
- `src/scene_d.js`: wiring only. The camera keys from 19 to 46.5 s come from `CAM_SEQ`.
- `render.mjs`: `--from` now offsets the narration and effects audio, so partial renders stay in sync.
- `build.py`: loads `seq_tragedy.js`.

Side effects outside the window: the ruin now also shows a few straw bits, and the feathers and the worm stay on the ground for the rest of the film.

## Rebuild
```
python3 build.py
node render.mjs --from 20.2 --to 46.5 --frames <scratch dir> --out <file>
```
