# Style profiles

A **style profile** holds everything that makes a film look like one visual style. The rest of the workflow stays the same for every style: narration, transcription, subtitle chunks, the Library cast, sets and motion, the Fable plan/review loop, build, render, QC and cloud rendering.

A story picks its style in `story.json`:

```json
{ "title": "The Lion and the Hare", "style": "halftone-pop", ... }
```

When a story has no `style`, it uses `halftone-pop`. Every film made before style profiles has no `style`, so it renders exactly as before.

```bash
python3 Library/style.py            # list the profiles
python3 Library/style.py --check    # check every profile (files, fonts, engine module)
```

## What a profile contains

`Library/styles/<id>/`:

| file | what it sets | used by |
|---|---|---|
| `style.json` | engine style module: `engineStyle` is the id the module registers; it is a Creator OS `styles/<id>.js` in claude-motion-faceless-skills, or, with `"module": "style.js"`, the profile's own module file (for styles that have no Creator OS module, such as the Lemo-Opuscar adaptations). Also: display name, file-name label (`fileLabel`, giving `<title> - <fileLabel> - <Arabic font>.html/.mp4`), player page title, lettering fonts to embed (`fonts`: family, weight, optional `style`, file in the profile folder or `Library/fonts/`), default Arabic subtitle font (`arabicFont`) and the profile's own Arabic fonts (`arabicFonts`: key -> [family, weight, arabic file, latin file] without `.woff2`; the shared ones are in `Library/fonts/arabic.json`), player page and button colours, catalogue background. Player and MP4 names end with the story's Arabic font family | `lib.py`, `build.py`, `render.mjs`, `stills.mjs`, `implcheck.py`, `prod.py finalize`, `smoke_test.sh`, catalogue |
| `theme.js` | the look of every Library drawing: palette `C` (paper, black = outline ink, yellow, red, blue, skin, white), `NAVY`/`NAVY2`/`WALL`/`WOOD`, the shared tones (greens, sand, water, animal colours), lettering font `BF`, fill texture `dotPat(ctx, col, pitch, rad)`, outline brush `ink(ctx, pts, w, seed, color)`, the character finish `castFinish(ctx, x, y, w, h, draw, o)` (Halftone: drawn as it is; Pop-up: cut-paper border, edge and shadow; Anime: optional rim light), and `THEME` (subtitle colours and caption panel, page and story-panel framing). A theme may add helpers of its own (Pop-up: `popCard`, `bookFold`; Anime: `celShade`), used only by stories in that style | loaded first in every player, before `core/helpers.js` |
| `look.md` | the look in words, the engine primitives, and what a reviewer checks for this style | Fable planner and reviewer, Opus animator |
| fonts (optional) | `.woff2` files named in `style.json` `fonts` (found in the profile folder or `Library/fonts/`) | `font_css()` |
| `catalogue/` (made on demand) | the cast and sets drawn in this style | `build_catalogue.py --style <id>` + `catalogue.mjs --style <id>` |

**The theme contract.** Every `theme.js` must define every top-level name that `halftone-pop/theme.js` defines (`C`, `NAVY`, `NAVY2`, `WALL`, `WOOD`, `GREEN` ... `ELEPHD`, `BF`, `dotPat`, `ink`, `castFinish`, `THEME`). The shared drawings call these names, so a theme that sets them changes the whole cast and every set. `node Library/tests/regression.mjs` checks this for every profile, and checks that the library loads and draws with that profile's engine module.

**Kept outside the theme:** the Arabic subtitle font (`arabicFont`, per story), the layout (panel 54..1026 x 54..1250, caption panel 1296..1862), timing, sound mixing and the drawing shapes themselves. A few drawings use fixed in-between tones (for example a horn shade), which stay as they are in every style.

## Halftone Pop (`halftone-pop`)
The house style and the default. Its `theme.js` is the code that used to sit in `core/helpers.js` and `palette.js`, unchanged, so every finished film renders identically (`tests/regression.mjs` "all identical", plus a frame-by-frame comparison of built players made when profiles were introduced on 2026-11-21).

## Profiles
| id | name | engine | Arabic subtitles | notes |
|---|---|---|---|---|
| `halftone-pop` | Halftone Pop Panel | Creator OS `halftone-pop.js` | Noto Naskh Arabic | the default; every film before 2026-11-21 |
| `paper-popup` | Paper Pop-up Book | own `style.js` (after Lemo-Opuscar style 41) | Baloo Bhaijaan 2 | Lilita One / Fredoka / IM Fell English; cut-paper `castFinish`, `popCard`, `bookFold`; page-turn transition |
| `cel-anime-80s` | 80s Cel Anime | own `style.js` (after Lemo-Opuscar 80s Cel Anime) | Cairo | Barlow Semi Condensed (+800 italic chrome), Lalezar for Arabic display; `celShade`, `celStep`, CRT finish |

The Lemo-Opuscar originals are written style guides for three.js/WebGL films (`lemo-opuscar/styles/<slug>/STYLE.md`); these profiles adapt their grammar to this 2D canvas engine (painted light and blur, CPU rendering), so the Library cast, the layout and cloud rendering stay the same.

## Adding a style
1. Pick the engine style: `ls ../claude-motion-faceless-skills/skills/motion-styles/styles/` (each has a `.md` card). Its primitives (`title`, `label`, `arrow`, `box`, `counter`, `emphasis`, `transition`, `background`, `finish`) have the same signatures in every style, so story scenes need no changes for them.
2. Copy the Halftone profile: `cp -R Library/styles/halftone-pop Library/styles/<id>`.
3. Edit `style.json`: `id` (= folder name), `name`, `engineStyle`, `fileLabel` (for example `Linocut 9x16`), `playerTitle`, `fonts`, `player` colours, `catalogue.background`; remove `skill` unless the style has its own skill.
4. Add the engine style's fonts as `.woff2` files (Google Fonts, OFL) to the profile folder, with their licences, and list them in `fonts`. Fonts are embedded so renders work offline.
5. Edit `theme.js`: keep every name, change the values: palette to the medium's colours, `BF` to its lettering font, `dotPat` to its fill texture (hatching, grain, wash...), `ink` to its outline (gouged edge, pencil, no outline...), and `THEME` (subtitle colours, caption panel, `page` and `panel` options for the engine's `background` and `box`).
6. Write `look.md`: the look, the engine primitives, and what a reviewer checks.
7. `python3 Library/style.py --check`, then `node Library/tests/regression.mjs` (must print "all identical"), then the catalogue in this style: `python3 Library/catalogue/build_catalogue.py --style <id> && node Library/catalogue/catalogue.mjs --style <id>`.
8. Try it on one story in a test folder before using it for a real film: copy the story to `Animations/<story>-<id>-test/`, set `"style": "<id>"`, `python3 build.py`, check stills with `./sh.sh`.

## Scenes and styles
New scenes (from `Library/template/`) take page and panel framing from the theme (`S.background(ctx, W, H, t, THEME.page)`, `S.box(..., THEME.panel)`) and draw with the palette names, so the same scene works in any style. The scenes of the films made before profiles pass Halftone options directly (`{ dot: C.blue }`); in another style those options are ignored or take that theme's colours. Such a film still builds in another style, but its staging was designed for Halftone and needs a visual review.
