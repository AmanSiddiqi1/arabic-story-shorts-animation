# 80s Cel Anime (`cel-anime-80s`)

After Lemo-Opuscar's *80s Cel Anime* (`lemo-opuscar/styles/cel-anime-80s/STYLE.md`, read it for the full grammar), adapted to this project's 2D canvas engine and 9:16 layout. Lemo's version uses a WebGL CRT pass; here the tape and CRT pass is 2D (`S.finish`), and the grammar is kept.

## Owner direction (2026-11-21, from ALI-01 "Open Sesame" v4; this overrides the rest of this file where they conflict)
The owner compared four versions and chose v4 (`Animations/ALI-01-ANIME`, `review/revision_3.md`) as the reference for this style. Plan, animate and review every 80s cel film this way:
- **Wide where the place matters, pans where it is detailed.** Establishing shots show the whole place (the village, the forest, the rock, the room). Closer shots pan across a detailed set to show the same amount of the world (the cave pan in ALI-01 is the model). Do not push in until the ground sits low in the frame and the lower picture is empty; use close-ups only for real peak moments (eyes, a hand on a coin).
- **Full scenes.** Every set has several layers of things to look at: sun, clouds and birds; houses, domes, palms, washing lines; plants, stones, flowers and mushrooms on the ground; props and furniture indoors; coins, jewels and crystals on a cave floor.
- **Varied, bright colour.** No single-hue colour-model tint over the characters (it turned whole scenes purple or brown in v3). Horses in varied coats, costumes in varied colours, bright day scenes; dusk and night are repainted lighter and warmer, distinguishable but never monochrome.
- **English speech bubbles.** On-screen speech is English (`S.label(ctx, text, x, y, p, { balloon: true, to: [x, y] })` pointing at the speaker), because the narration is Arabic. Arabic display lettering is for a title only.
- **Readable bodies.** Every character's arms and legs stay readable; no dark shade pass that merges limbs into robes or horse legs into masses. Lighter sleeves or outlines where a robe is dark.
- **The existing Library cast.** Use the Library figures (person, horse, donkey...) with this style's lines and flat fills. (A new anime cast was tried on 2026-11-21 and rejected for unnatural walking; it is kept only in the local `scratch/anime-cast-modelsheet-rejected/`.)
- **Light presentation** (the profile default since 2026-11-21): cream 80s TV housing, light caption strip with dark-purple Arabic and blue English, a gentle CRT pass (soft corners, light scanlines, warm halation, slight chroma bleed). `S.background(..., { dark: true })` gives the old charcoal housing only if a story asks for it.
- **Keep:** characters on twos, eye close-ups and inserts at the peaks, impact frames, light bands, the motion helpers (moving holds, follow-through, flowing poses, ground shadows), and no frozen holds where only the camera moves.

## The look: four layers, and the contrast between them
- **Background painting:** soft airbrushed gradients (sky, dusk, cave glow), painted once (`bake`) and then only slid (parallax). Glowing windows, lit cloud undersides, wet reflections where it fits. Backgrounds may carry gradients; cels may not.
- **Cels** (characters, horses, the donkey, props): flat fills with **hard-edged** shadow and highlight shapes (`celShade(ctx, pts, fill, shade, { light, hi })` for new shapes; the Library cast's dot shading becomes a flat shade tone), **coloured** outlines (dark purple `C.black`, thin and even), never pure black. Characters move **on twos**: pose them with `celStep(t, THEME.celFps)` (12 fps); blinks and lip flaps on threes (`celStep(t, 8)`). Camera, light sweeps, effects and the CRT stay on every frame.
- **Light:** backlit glow (lamps, gold, the cave's treasure, the title) with halation; a hard neon rim light on a character against the light: `castFinish(ctx, x, y, w, h, draw, { rim: '#ff7ad9', light: [1, -1] })`.
- **Playback:** the whole frame, subtitles included, plays as videotape on a CRT (`S.finish`): halation, chroma bleed, scanlines, dark corners, faint noise. The story panel is the picture tube (`S.box(..., THEME.panel)`), the caption panel is a light caption strip in the cream housing.

## Colour logic
- Each time of day gets its own painted background (day forest, dusk at the rock, gold-lit cave, night at home), never a filter over the frame or a tint over the characters. Skin keeps its own colour in every set.
- The hero (Ali Baba) has **one accent colour** that pops in every lighting set.
- Line colours are dark versions of their fill.

## Type
- Subtitles on the light caption strip: Arabic in Cairo 800, dark purple; English in Barlow Semi Condensed 600, blue. Labels and speech bubbles: Barlow Semi Condensed, English.
- Titles: heavy italic chrome (`S.title`, Barlow 800 italic: sky, white horizon line, violet, pink, gold) with a dark outline and neon glow, flickering on with a star glint. Arabic display lettering (the film title's Arabic line) in **Lalezar** with `{ font: 'Lalezar' }`; spoken words on screen are English bubbles (owner direction).

## Engine primitives (Library/styles/cel-anime-80s/style.js)
`title` = chrome title flickering on at 12 fps with a glint; `label` = boxed tag (dark box, cyan rule, cream text; `{ balloon: true, to }` for speech); `arrow` = neon light streak; `counter` = chrome number; `emphasis` = **impact frame** (radial speed lines, a 2-frame inverted flash with `{ rect }`, a chrome word); `transition` = white flash with tape tracking noise (`{ rect, caption }`); `finish` = the CRT pass (last every frame).

## Motion (with /rossark-motion-shorts)
- Limited animation: characters on twos, performance beats on threes, hold the peak (a held drawing with a slow pan while only cycles move). Hair and cloth as ribbons on a travelling sine; a bounce is a small 12 fps jitter.
- Move light, not drawings: coloured bands sweeping across a held cel; speed lines and looping background plates for speed.
- Moving holds still apply (on twos), follow-through by delay (`lagged`), flowing key poses (`flow`, sampled at `celStep(t)`), shadows (`groundShadow`).

## Sound
Sparse synth foley in the gaps: `blip` for a land, `stamp` on an impact frame, `glitch` on a tape transition, `riser` into a reveal, `chime` for gold; `tape` bed under everything. Never over a word.

## What a reviewer checks for this style
- First the owner direction above: wide views and pans, full scenes, varied bright colour without a tint, English speech bubbles, readable limbs, no frozen holds.
- Cels are flat with hard-edged shade, coloured outlines (no black, no gradients inside a cel); backgrounds are soft and painted.
- Characters visibly move on twos (no smooth 30 fps character motion); the camera and effects are smooth.
- The CRT pass is present on every frame and restrained (text still sharp enough to read on a phone).
- Backlit light glows (gold, lamps, title); one accent colour for Ali Baba in every lighting set.
- Phone legibility: headlines >= 44 px, labels >= 28 px at 1280x720 scale; no em or en dashes on screen.
