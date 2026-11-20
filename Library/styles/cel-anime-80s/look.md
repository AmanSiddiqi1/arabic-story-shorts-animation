# 80s Cel Anime (`cel-anime-80s`)

After Lemo-Opuscar's *80s Cel Anime* (`lemo-opuscar/styles/cel-anime-80s/STYLE.md`, read it for the full grammar), adapted to this project's 2D canvas engine and 9:16 layout. Lemo's version uses a WebGL CRT pass; here the tape and CRT pass is 2D (`S.finish`), and the grammar is kept.

## The look: four layers, and the contrast between them
- **Background painting:** soft airbrushed gradients (sky, dusk, cave glow), painted once (`bake`) and then only slid (parallax). Glowing windows, lit cloud undersides, wet reflections where it fits. Backgrounds may carry gradients; cels may not.
- **Cels** (characters, horses, the donkey, props): flat fills with **hard-edged** shadow and highlight shapes (`celShade(ctx, pts, fill, shade, { light, hi })` for new shapes; the Library cast's dot shading becomes a flat shade tone), **coloured** outlines (dark purple `C.black`, thin and even), never pure black. Characters move **on twos**: pose them with `celStep(t, THEME.celFps)` (12 fps); blinks and lip flaps on threes (`celStep(t, 8)`). Camera, light sweeps, effects and the CRT stay on every frame.
- **Light:** backlit glow (lamps, gold, the cave's treasure, the title) with halation; a hard neon rim light on a character against the light: `castFinish(ctx, x, y, w, h, draw, { rim: '#ff7ad9', light: [1, -1] })`.
- **Playback:** the whole frame, subtitles included, plays as videotape on a CRT (`S.finish`): halation, chroma bleed, scanlines, dark corners, faint noise. The story panel is the picture tube (`S.box(..., THEME.panel)`), the caption panel is a dark tape caption strip.

## Colour logic
- Each time of day gets its own colour model (day forest, dusk at the rock, gold-lit cave, night at home), never a filter over the frame. Skin keeps its own colour in every set.
- The hero (Ali Baba) has **one accent colour** that pops in every lighting set.
- Line colours are dark versions of their fill.

## Type
- English subtitles and labels: Barlow Semi Condensed 600, cyan on the tape strip; Arabic subtitles: Cairo 800, cream-yellow.
- Titles: heavy italic chrome (`S.title`, Barlow 800 italic: sky, white horizon line, violet, pink, gold) with a dark outline and neon glow, flickering on with a star glint. Arabic display words (a title, "افتح يا سمسم" as a magic word) in **Lalezar** with `{ font: 'Lalezar' }`.

## Engine primitives (Library/styles/cel-anime-80s/style.js)
`title` = chrome title flickering on at 12 fps with a glint; `label` = boxed tag (dark box, cyan rule, cream text; `{ balloon: true, to }` for speech); `arrow` = neon light streak; `counter` = chrome number; `emphasis` = **impact frame** (radial speed lines, a 2-frame inverted flash with `{ rect }`, a chrome word); `transition` = white flash with tape tracking noise (`{ rect, caption }`); `finish` = the CRT pass (last every frame).

## Motion (with /rossark-motion-shorts)
- Limited animation: characters on twos, performance beats on threes, hold the peak (a held drawing with a slow pan while only cycles move). Hair and cloth as ribbons on a travelling sine; a bounce is a small 12 fps jitter.
- Move light, not drawings: coloured bands sweeping across a held cel; speed lines and looping background plates for speed.
- Moving holds still apply (on twos), follow-through by delay (`lagged`), flowing key poses (`flow`, sampled at `celStep(t)`), shadows (`groundShadow`).

## Sound
Sparse synth foley in the gaps: `blip` for a land, `stamp` on an impact frame, `glitch` on a tape transition, `riser` into a reveal, `chime` for gold; `tape` bed under everything. Never over a word.

## What a reviewer checks for this style
- Cels are flat with hard-edged shade, coloured outlines (no black, no gradients inside a cel); backgrounds are soft and painted.
- Characters visibly move on twos (no smooth 30 fps character motion); the camera and effects are smooth.
- The CRT pass is present on every frame and restrained (text still sharp enough to read on a phone).
- Backlit light glows (gold, lamps, title); one accent colour for Ali Baba in every lighting set.
- Phone legibility: headlines >= 44 px, labels >= 28 px at 1280x720 scale; no em or en dashes on screen.
