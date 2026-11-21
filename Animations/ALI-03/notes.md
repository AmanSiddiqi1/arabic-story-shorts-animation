# ALI-03 "The Marked Door" (80s Cel Anime): implementation notes (v1, code only)

Plan checked against the inputs: MP3 and `.words.json` SHA-256 match `planning/planning_metadata.json`; MP3 143.481 s. Film = 143.48 + end hold 4.0 = **147.48 s** (`AB_DUR`). Subtitles: library subtitles from `timing.json` (chunks unchanged). Style `cel-anime-80s`, no `arabicFont` in story.json.

## Series files (for ALI-04..06 to copy)
- `ab_kit.js`, `ab_cast.js`, `ab_sets.js`: copies of ALI-02's (only `AB_DUR` changed; `abHandCel` from ALI-01-ANIME appended unchanged). `a3_base.js`: ALI-02 `a2_base.js` machinery (shot dispatch, balloons, body points, cloaks, horses, morning glade model, far town, tape inset), names unchanged.
- `a3_series_town.js`: `townStreet` (TS anchors, models day / afternoon / evening / night / night2, sky + town layers baked per model), `a3Door`, `a3Window`, `a3Gate`, `a3Arch`, `tsWashing`, `tsLanterns`, `doorMark`, `TS_MARKS` + `tsMarks`, `tsRing`, `dayToNight`, `tsPlates`, `oilJar`, `jarPannier`, `silverRing`.
- `a3_series_cast.js`: `morgiana` (+ `abMorgiana`, scarf tail, waistcoat, basket, `morgianaWindow` = windowBust, `a3Eyes` close-up for morgiana / leader), `spyDisguise` (spy 1 / spy 2), `oilMerchant`, `a3Neighbour`, market `a3Folk`, `sneakChain`.

## Decisions the plan left open
- House 2 wall is pink-rose `#f2a6b4` (the plan's `#e8a888` was nearly the same as Ali Baba's cottage wash `#e0a888`).
- Washing line raised to (800, 404)-(1180, 384) and all items hang left of x 1036 so they never cover Ali Baba's window. The robe hangs at x 853; the "slipping corner" Morgiana tucks back is a sleeve that slips down to hand height (39.0-40.15).
- The moon of night 1 is at (1350, 230) (rises there in the time-lapse); night 2 at (700, 260).
- S2 market: stalls 240 wide; sellers stand in front of their stalls (fruit 410, cloth 780, the old woman 900 beside the crate with the cat at 962, jar seller 1190).
- S3 tilt starts at zoom 1.25 (y 492) because the 1230-high world cannot tilt above y 615 at zoom 1.0. The spy enters already past door 1 (x 700 at 16.9) so his walk is not a sprint.
- S4: the cat sits on the courtyard wall top (1215, 586), not on the roof, so it is in the zoom-1.4 medium. The near miss with Morgiana is at x ~300 (not in the arch) at 35.3.
- S5: the carrot beat is 40.6-41.1 (0.2 s later than planned) so the walk from the washing to the donkey is not a sprint; the freeze is at 41.3 as planned.
- S8/S9: the chain stops with the spy at x 400 presenting door 1's cross; the S9 two-shot cheats the leader to 300 and the spy to 450 (facing him), men at 80..200. Reveal pan: a flow path 520 -> 1500; the counter counts crosses passing the picture centre (the fifth at 73.7 near the right edge, the camera stops at the strip end).
- S11: the practice dot is dabbed in passing as the second spy marches off left past the seated first spy (93.0).
- S13: dots pressed standing beside each door; Morgiana runs back past door 2 (108.3) where the neighbour is in her doorway.
- S14: the chain is spy 2, leader, two men (indigo, saffron) and spy 1 (one man fewer than planned, so the whole line stays on screen in the group shot); spy 2 presents door 1's dot from its left side.
- S15: the volunteer is the saffron man (i4) with a blue pot; the wide moment that shows the shutter slit closing is the exit pan (127.1-128.3, camera to x 650).
- S17: the lid that lifts is the near jar of the FIRST mule (the last mule is out of the window shot); balloon A BED FOR THE NIGHT? after the ring insert (142.35-143.3). Mules use the series `dusk` cel model (k 0).
- Dissolves at 64.4, 111.3, 128.3 (0.5 s, through an offscreen layer); tape transition NEXT DAY... 85.9-86.7.
- Sound: as planned except the chime for Morgiana moved from 35.4 to 35.0 so its 1.3 s tail ends before the next word (36.16).
- Owner questions: plan defaults (TO BE CONTINUED..., balloon lines, marks, henna, the ring, lid and window additions).

## Not done / simplified
- No separate turban slide over one eye (S9 78.1): a head tilt instead; no tongue drawings.
- The oil jars' rope nets are drawn on the jars; no separate lantern light on the glazed shoulders beyond a light band sweep.
