# Visual standards (recovered from the original brief and the four approved films)

## The style (original)
Blown-up Lichtenstein comic panel; paper gutter, white field with blue Ben-Day dots, fat tapering black brush border; flat process yellow, red dot shading, Bangers lettering; aged-newsprint finish with a slightly slipped cyan plate. Palette: paper `#fbf2da`, black `#141414`, yellow `#ffd21f`, red `#e2231a`, blue `#1d5bd0`, skin `#f05a5a`, white `#fffaf0`. Faces are white with `skin` dots; backgrounds and props use dot fills, never gradients. Words and titles slam in (1.6x down to 1x with overshoot); balloons and boxes pop with a back-ease; arrows grow along their path.
Derived tones used by the films (not in the original palette): greens `#3f9d4a #6cc35a #2b7a38`, wood `#a8741a`, navy `#16337f #0d2260`, earth `#d9a441`, water highlight `#5fa0ff`.

## Composition standards used in all four films (9:16, 1080x1920, 30 fps)
- Page: style background, then a bordered panel (x 54, y 54, 972 x 1196; S.box with fill blue, border 11) holding the world, clipped 9 px inside the border. World units 1000 x 1230. Caption box (x 54, y 1296, 972 x 566) in the bottom third; nothing else lives there.
- Depth by layers: sky (cached) -> distant shapes -> scenery -> characters -> water/foreground front layers (a translucent blue layer over a character's lower half reads as water) -> world effects -> panel overlays (title, counters, emphasis, "THE END"). Static layers are cached at 2x.
- Camera: keyframed `K.camAt` between keys `[t,{x,y,zoom}]`, always clamped inside the drawn world. Wide establishing shot first, push in on the action, pull back for the ending. Ground sits about 70 to 78% down the panel so balloons have sky above.
- Beats: something changes every 1 to 2 s; arrows, labels and counters on key beats; one full `S.transition` ("LATER...", "NEXT MORNING...") when time passes; emphasis (`S.emphasis`) on the key hit with a camera shake; a short held ending with `THE END`.
- Title card: first ~3.5 s, two stacked `S.title` boxes low in the panel, then slides down and fades out.
- Comic lettering (HA HA!, PECK!, BOING!) is short, black-outlined Bangers, popped in with a back-ease; it is picture, not script text.
- No em or en dashes in on-screen text. Phone-legible sizes (headline >= 44 px, label >= 28 px at 1280x720 scale).

## Sound
Effects only, synthesized: `pop` (labels), `stamp`/`thud` (impacts), `whoosh` (transitions, movement), `tick` (counters, clocks), `ding`/`chime` (ideas, endings), `wrong` (failure), `scribble` (arrows). Quiet (`SND` master 0.6), placed in gaps, never over a word; narration is the soundtrack. Final loudness about -15 LUFS, AAC 48 kHz (mixing with `amix normalize=0`).

## Arabic typography: approved values (presets/arabic.json)
Recovered from the code of the four films (`subtitle()` was identical in all four):
| Setting | Value |
|---|---|
| Arabic font | **Noto Naskh Arabic 700** default (Monkey, Lark, Fox, Thief-Naskh); **Cairo 800** (Thief, first version); **Scheherazade New 700** (Thief, third version) |
| Arabic size | fitted from **70 px down to 44 px in steps of 2** until the block fits 340 px tall; line height **1.72 x size**; text width = box width - 90 = 882 px |
| Arabic colour / direction | black `#141414`; `ctx.direction = 'rtl'`, `textAlign center`, `textBaseline middle`; canvas shaping (no manual reversal) |
| Diacritics | kept verbatim; the 1.72 line height prevents harakat collisions; fonts are loaded with an Arabic sample text so the Arabic subset is fetched |
| Translation | Bangers 400, fitted **44 down to 30 px**, line height 1.25, 1 px letter spacing, blue `#1d5bd0`, block max 150 px, centred, 22 px below the Arabic |
| Caption box | white `#fffaf0`, brush border 9 px (seed 13), (54,1296) 972 x 566 |
| Animation | a chunk fades in over 0.14 s, appears 0.12 s before its first word, is held to the next chunk when the gap is under 1.4 s, otherwise 0.6 s past its end |
| Chunking | 2 to 4 chunks per paragraph (a phrase or sentence, up to about 11 words); text rebuilt from the supplied script by word count |
| Fonts embedding | base64 woff2 subsets (Arabic + Latin) with `unicode-range`, so a film is one offline file |
### Font decisions per film (do not invent a single preference)
- Thief and the Moonbeam: three finished versions kept side by side (Cairo, Noto Naskh Arabic, Scheherazade New). No single approved font was named for it.
- Monkey and the Turtle, Lark and the Elephant, Fox and the Drum: Noto Naskh Arabic 700 (explicitly requested).
- Scheherazade New is a more traditional calligraphic face; Cairo is geometric and heavier. Both stay selectable.

## Things that were deliberately NOT made universal
The Arabic fonts and blue translation, the 9:16 geometry, narration sync, the title wording, "THE END", the characters and all story timelines.
