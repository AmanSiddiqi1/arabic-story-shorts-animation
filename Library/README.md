# Kalila wa Dimna shared cast and set library

Drawings shared by every new story: characters, props, effects, sets, motion helpers and the engine.
Later stories reuse these drawings, so the work on a new story can go into staging, acting and motion.
**Read [Animation_Capabilities_Guide.md](Animation_Capabilities_Guide.md) first** (capabilities, when to use them, examples). Then look at the catalogue: [catalogue/cast.png](catalogue/cast.png) (every character in sample poses) and [catalogue/sets.png](catalogue/sets.png) (every set and prop), plus [catalogue/people.png](catalogue/people.png) and [catalogue/animals.png](catalogue/animals.png) (round 3 animals, walk frames and riders).

## Layout
```
Library/
  core/        kit.js, sound.js, halftone-pop.js (Creator OS engine, unchanged copies), helpers.js (ink, shapes, lettering,
               balloons, person figure, eyes), subtitle.js, player.js
  palette.js   shared colours (the style palette C lives in core/helpers.js)
  cast/        lion (+ lionFace), hare, deer, fox, monkey, turtle + tortoise, bird (lark, crow, coloured) + songbird, elephant, frog
               (person is in core/helpers.js); people.js: person costumes (costume, pal, age, child) and poses (sit, seat, kneel, lie);
               hooves.js: horse, donkey, camel, rideOn (a person on a mount), mountSeat, packLoad, BEAST leg rig + GAIT strides;
               small.js: cat, rat (rat, mouse), sheep (ewe, ram, lamb); birds2.js: bird kinds hawk, dove, sparrow (guide section 13)
  props/       nest (+ chicks, crushed nest, worm), fig, drum
  fx/          thoughtCloud, drops, steam, note, heart, peekEyes, soundArcs, ripple, dustBurst, teardrops, feather, halftoneShadow
  sets/        sky (day, dawn, dusk, night), dayCycle + skyCycle (time of day), hillTrees, sun, cloudFlat, moon, stars, nightCity; ground, groundWithPit + pitBack,
               river; tree (+ TREE presets), treeRow, bush, thicket, figTree; den, wellShaft, riverBank, islandHut, houseRoom, houseRoof;
               towns.js: marketStreet, palaceHall (palace / merchant), desertRoad, hutRoom, villageYard + yardLeaves, countryRoad,
               townDoor, townWindow, marketStall, townProp, palmTree, hangingLamp, rainStreaks (guide section 12)
  motion.js    blink, lookAt, blend, pulse, speed, walk, footfalls, kick, hop, landSquash, anticipate, tremble
  registry.js  the shared acting wrapper and the catalogue lists (CAST, PROPS, SETS)
  fonts/       Bangers + the three Arabic fonts (embedded by the build)
  lib.py       head_scripts(), font_css(), library_js(): used by a story's build.py
  template/    new-story starter (build.py, render.mjs, stills.mjs, sh.sh, sheet.py, tx.py, align.py, story.json, src/scene.js)
  catalogue/   build_catalogue.py + catalogue.mjs -> cast.png, sets.png, people.png (costumes and poses), animals.png (round 3 animals, walk frames, riders)
  tests/       regression.mjs: every library drawing is pixel-identical to its original story's drawing
```

## Starting a new story
1. Copy the template: `cp -R Library/template Animations/<story-slug>`.
2. Edit `story.json`: the title and the paths to the story's Arabic and English script files.
3. Put the narration in the folder as `narration.mp3`.
4. Run `tx.py`, then mark the subtitle chunks (`chunks_ar.txt` / `chunks_en.txt`) and run `align.py`. See [../tools/transcription/README.md](../tools/transcription/README.md).
5. Write the story in `src/scene.js`. It starts as a working example: a lion walks in, a hare reacts, and cues are taken from word times.
6. Build with `python3 build.py`.
7. Check stills with `./sh.sh sheet.jpg 1.5 4 7.2`.
8. Render with `node render.mjs`. The output goes to `MP4s/` and the script refuses to overwrite an existing file. For tests, use `--out` and `--frames <scratch dir>`.

The build inlines the engine and the whole library, so the player HTML stays self-contained and works offline.

## Using the cast
Every character is a function `name(ctx, P)` with its feet at `(P.x, P.y)`, scale `P.s` and facing `P.dir` (1 right, -1 left). Each file's header lists that character's own pose fields (walk phase `ph`/`amp`, mouth, brow, ears, tail and so on).
On top of those, **every character accepts the same acting fields**:

| field | meaning |
|---|---|
| `gaze: [gx, gy]` | where the pupils look, in screen space (-1..1). Use `lookAt([x, y], [tx, ty])`. |
| `lid: 0..1` | upper eyelid. For natural blinks: `lid: Math.max(base, blink(t, seed))`. |
| `wet: true` | wet eyes |
| `sq` | squash (< 1) or stretch (> 1) about the feet, keeping volume |
| `tip` | tilt the whole body about the feet in radians (positive = forward). Not `lean`: the person figure has its own torso `lean`. |
| `alpha` | fade |

Without acting fields, each drawing is pixel-identical to its original story's drawing (checked by `tests/regression.mjs`).

Motion helpers keep animation a pure function of time:
- **Walking:** `walk(xf, t)` derives the leg phase and amplitude from a position function `xf(t)`, so legs never slide.
- **Footfalls:** `footfalls(xf, t0, t1)` gives the landing times for dust (`dustBurst`), thuds and `kick()` micro-shakes.
- **Acting beats:** `hop`, `landSquash`, `anticipate`, `blend`, `pulse` and `tremble`.

## Using the sets
Each set draws in the shared world of 1000 x 1230 units, with the ground at y 900.
- **Positioning:** sets that come from one story's scene (`den`, `wellShaft`, `riverBank`, `islandHut`, `figTree`, `houseRoom`, `houseRoof`, `nightCity`) draw at their original position by default; `o.x`/`o.y` move the anchor and `o.s` scales about it.
- **Shared sets (`sets/towns.js`):** each `set(ctx, o)` returns its anchors (door x, ground y, seat and hiding spots); `<set>Anchors(o)` and the constants `MARKET`, `HALL`, `MERCHANT`, `DESERT`, `HUT`, `VYARD`, `CROAD` give them without drawing. Strips take `o.camX` for parallax, and `o.front: true` (hut: `layer: 'front'`) redraws occluders after the cast. See guide section 12.
- **Baking:** bake static artwork once with `bake(key, w, h, draw)` and draw the cached layer every frame. `sky`, `ground` and `groundWithPit` bake themselves.

## Adding to the library (as new stories are made)
- When a story needs a new character, prop or set, draw it in the story first. Once it is approved, move it here:
  - one function per drawing, with a header comment listing its pose fields and the story it comes from
  - register it in `registry.js`: wrap characters with `acting(...)` and add a `CAST`, `PROPS` or `SETS` entry with sample poses
- Keep changes backward compatible. New pose fields must default to the current look, and never change an existing drawing's defaults.
- After any change:
  1. Run `node tests/regression.mjs`; it must report "all identical" and "no duplicate names".
  2. Rebuild the catalogue: `python3 catalogue/build_catalogue.py && node catalogue/catalogue.mjs`.
- Names in the library are global, so a story's scene must not redefine them. The regression test lists the top-level names.
- Since the 2026-11 five-film upgrade the finished stories in `Animations/` load this library (pre-upgrade sources in each story's `_pre_upgrade/`). Keep every change backward compatible: the regression test must stay "all identical", and new options must default to the old look.
