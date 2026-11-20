# Paper Pop-up Book (`paper-popup`)

After Lemo-Opuscar style 41 *Paper Pop-up Book* (`lemo-opuscar/styles/paper-popup/STYLE.md`, read it for the full grammar), adapted to this project's 2D canvas engine and 9:16 layout. Lemo's version is three.js with real lens blur; here light, depth and blur are painted, and the grammar is kept.

## The look
- **Two worlds in one frame.** The real world: a wooden desk under a warm lamp (`S.background`), seen around the book. The paper world: an open pop-up book (`S.box(..., THEME.panel)` draws the cloth cover, page block and page) whose upper half is the standing **backdrop board** and lower half the **page** (the ground). Draw the crease where they meet with `bookFold(ctx, 0, WW, GR)` right after the backdrop.
- **Everything is cut paper.** Characters and props go through `castFinish(ctx, x, y, w, h, draw)`: an off-white border, a grey cardboard edge and a cut-out shadow. Set pieces (trees, rocks, houses, the cave) **pop up** from the page with `popCard(ctx, t, t0, x, y, w, h, draw, { delay })`: far pieces first (back to front), with a back() overshoot; they fold down in the same order (`out`). Flat backdrops (sky, hills) are printed on the board and do not pop.
- **Ink:** one dark-brown ink (`C.black` is `#4a2c1a`), thick, round joins, slightly wobbly; never black. Shading: soft printed stipple (`dotPat`), never Ben-Day dots.
- **Colour:** saturated children's-book colour, never neon. **One dominant hue family per spread** (scene), so a page turn is also a colour change; a few accents (the red, the yellow, a gold) recur across spreads. Night is a change of the paper art, the lamp stays warm.
- **Type:** Lilita One for signs, action words and comic words (`BF`); Fredoka for labels, bubbles and the English subtitle; IM Fell English italic for a storybook caption (page-turn caption, a tagline); Arabic subtitles in **Baloo Bhaijaan 2** (rounded, matching Fredoka). The caption panel is a paper card with a cardboard edge.

## Engine primitives (Library/styles/paper-popup/style.js)
`title` = a cardboard sign dropping on two strings and swinging to rest; `label` = a paper tag, or a speech-bubble card with `{ balloon: true, to: [x, y] }` whose text types on; `arrow` = a cut-paper strip arrow; `counter` = a round paper badge; `emphasis` = an action word like a game rating (italic Lilita, double stroke, paper rays) with `{ word }`; `transition` = a **page turn** (a leaf hinged at the right edge, the spine of an Arabic book, falls over the spread and lifts off; `{ caption: 'Later...' }` prints on its back); `finish` = warm lamp grade, paper grain, lens vignette (last every frame).

## Motion (with /rossark-motion-shorts)
- Paper moves stiffly; life comes from easing: back() overshoot for pop-ups, springs for things on strings, squash and stretch on characters. Plants and light props sway a few hundredths of a radian around their base (`idleSway`).
- Characters walk with `walk()` (feet never slide); turning around is a mirror flip (`dir`), never an edge-on rotation. Jumps: arcs with squash at both ends and a small paper puff on landing.
- Moving holds, follow-through by delay (`lagged`), flowing poses (`flow`) and ground shadows (`groundShadow` on the page) as in the motion skill.
- **Never moves:** the desk and the book. The camera may push in on the spread (keyed `K.camera` inside the panel), never shake the room.

## Sound
Paper foley in the gaps: `paper` for pop-ups and page turns, `pop` for a card landing, `tick` for footsteps, `pluck`/`chime` for small magic; `room` bed under everything. Never over a word.

## What a reviewer checks for this style
- Every character and prop has the off-white border, cardboard edge and cut-out shadow (nothing drawn raw on the page).
- Set pieces pop up back to front when a spread begins and fold down before a page turn; nothing just appears.
- Brown ink everywhere, no black outlines; no Ben-Day dots; colours saturated but not neon; one hue family per spread.
- The book and desk stay still; the crease (`bookFold`) is drawn on every spread.
- Phone legibility: headlines >= 44 px, labels >= 28 px at 1280x720 scale; no em or en dashes on screen.
