# Architecture

```
project/ (anywhere)                         $HP (.claude/skills/halftone-pop/)
  halftone.config.json   -- read by -->       scripts/hp-build.py
  scene.js (your film)                          includes, in order: engine/original/{kit,sound,halftone-pop}.js
  timing.json (optional)                          -> window.HP_CONFIG (layout, fonts, subtitle preset)
  narration.mp3 (optional)                        -> engine/enhanced/{helpers,stage,subtitle}.js
                                                  -> examples/characters/<lib>.js (only if listed)
  <output>.html  <-- one offline file --          -> TIMING (if timing.json), your scene files, engine/enhanced/player.js
  <output>.hp.json (sidecar)                    scripts/hp-render.mjs / hp-stills.mjs use the HTML + sidecar
```
Everything is plain browser JavaScript sharing one global scope (as in the original films), so a scene can call any helper by name. Global names to avoid redefining: those in `helpers.js` (`C`, `ink`, `shape`, `seg`, `ell`, `star`, `sfx`, `bubble`, `cloud`, `bulb`, `person`, `layer1`, `drawSun`, `cloudFlat`, `soundArcs`, `kfn`, `talk`, `dotPat`, `GREEN*`...) and `HP`, `K`, `SND`, `MS`.

## A scene file
```js
HP.stage({
  duration: 60,
  cameraKeys: [[0,{x:500,y:640,zoom:1}], [5,{x:300,y:780,zoom:1.7}]],   // world units; clamped inside the world
  shake: (t) => shakeAt(t, [12.5, 30]),                                  // optional
  drawWorld(ctx, t, cam) { /* sky, scenery, characters; pure function of t */ },
  overlays(ctx, t, cam, S, camera) { /* S.title, S.counter, S.emphasis; camera.toPanel(x,y,cam) maps world->panel */ },
  transitions: [{ from: 40.9, to: 42.5, caption: 'LATER...' }],
  score(k, S) { k.play('pop', 6.4, { gain: 0.5 }); },
});
```
`HP.stage` sets `window.SCENE`; `player.js` and `hp-render.mjs` use it. Seeded randomness only (`K.rng(seed)`, `K.noise(seed)`); cache static art with `layer1`.

## Config (`halftone.config.json`)
`title`, `output`, `layout` (`9x16` tested; others experimental), `preset` (`"arabic"`), `arabicFont`, `narration`, `timing`, `characters` (example libs), `scenes` (files in order), `subtitle` (overrides merged over the preset, e.g. colours or sizes). Keys starting with `_` are notes.

## Subtitle component
`HP.subtitle` reads `HP.config.subtitle`: `fields` (names of the primary/secondary text keys in `TIMING.chunks`), `box`, `pad`, `gap`, `primary`/`secondary` (`font, weight, color, dir, max, min, step, lineHeight, maxBlock, letterSpacing`), `timing`. Defaults are neutral (Bangers, black, left to right); the Arabic preset overrides them. `HP.debug.subtitle` reports the last frame's lines, sizes and direction (used by the tests).

## Why this shape
The four films each copied the same files and edited them per story. Here the shared parts are written once, the original stays separate and unmodified, and a film is just its scene file, config, timing and narration. Working code was reused rather than rewritten: `helpers.js` is the films' shared `scene_a.js`, `subtitle.js` is their identical `subtitle()` (verified pixel-equal against an approved Fox frame), `player.js`/render are their tested versions with paths and fonts lifted into configuration.
