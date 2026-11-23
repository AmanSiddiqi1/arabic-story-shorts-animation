# HORSE-05 "The Rescue in the Sky": implementation notes (v1, code only)

Inputs checked: planning_metadata MP3 sha256 (9d3224...) and words sha256 (6cf463...) match `planning/inputs/timeline.json` and the files on disk (MP3 resolved through `Library/media.py`), duration 144.508, last word 143.914, match 1.0. Film = 144.51 + 4.0 = 148.51 s (under 180). Subtitle chunks `chunks_ar.txt` / `chunks_en.txt` equal the plan's `subtitles` (only the spacing round `|` differs); `timing.json` (22 chunks) is used by the Library subtitles. Title Arabic line from `story/script.json` `title_ar` in Lalezar. No `arabicFont` in story.json.

Series files copied unchanged from HORSE-04 (`horse_kit`, `horse_cast`, `horse_sets`, `horse_city`, `horse_props`, `horse_garden_day`, `horse_riders`, `h01_deck`, `horse_far`, `horse_court`). Episode code: `h05_common.js` (helpers and the new small drawings), `h05_square.js` (S1-S10 on farPalace morning), `h05_sky.js` (two inserts, S11-S12 flight, S13 riverRun, S19 sunset), `h05_home.js` (S14-S16), `h05_road.js` (S17), `h05_pgarden.js` (S18), `h05_main.js` (shots, transitions, sound). HORSE-03's `h3Push` was not needed: every framing is keyed directly about the floor line (`h5K(t, x, zoom, groundPanelY)`).

## Decisions the plan left open (or changed after measuring)
- Opening: the first 0.3 s hold HORSE-04's last camera (1975, zoom 1.1) with the craftsman's hand at the knob, then the camera pulls out to the wide (0.8) for the title, then pushes in. King at bench x 2230 (episode 4 sat him at 2190).
- Figure size: dialogue framings at zoom 1.3-2.0 about the floor line (ground at panel y 1030-1070), the whisper at 2.0; wides keep 0.62-0.9.
- Square staging measured on the drawn horse (star 1900, head x 2010..2105): nobody stands behind the head or knob. The inventor and guards C/D stand right of the pavilion (C 2330, inventor 2375, D 2420) instead of the plan's 2025..2100 (they hid the head and the knob); his tiptoe goes to 2305 and the crossed spears stop him there. The captain stands at 2282 behind them. Guard line A 1600 and B 1660 only (the two extra line guards and the right-hand crowd were cut: they made a wall over the horse). Crowd from episode 4: two guests on the left.
- Craftsman/Firuz at 2030 (right of the knob), then kneels at 1995 by the near fore hoof; princess at 1880. Firuz points right at the inventor in S5 and the princess turns to point the same way in S6; the king turns to face the inventor for HOLD HIM FOR THE JUDGE.
- S7: the court gate lies at the end of the strip, so the camera stops at the clamp (gate in the right third). Guards C and D open and close the leaves (not A and B, who stay by the horse); the inventor walks 2370 to 2440, waits, and goes in at 63.98 (the leaves are redrawn over him as they close). The grille, the eyes from inside, the bar and the scrap on the nail are drawn over the farPalace gate leaves (`h5CourtGateOver`).
- S8: the helmet knock at 71.86 is done by C and D (back from the gate by 67.4); guard B carries and sets the footstool; D (sleepy) sits down on the paving at 79.94.
- S10: the dome front pass is the great dome (1600, base 372, r 150) and its drum redrawn over the rig 82.34-83.3; the gold ring is an ellipse round the dome drawn in two halves (back half before the dome pass, front half after).
- S13 riverRun: built in panel scale 1 (strip 2800, camera x 0 to 1700), rig at panel (420, 420); the reflection is the rig flipped about y 800 in six wobbling bands.
- S14-S16: the landing spot moved to 1140 (the plan's 1040 put the horse's head behind the father); S15 positions maid 420, queen 540, princess 640, Firuz 765, father 862 (so the father can lay a hand on Firuz's shoulder); the maid sits on a trunk at 600 and the blue guards stay at 330/280 in S16.
- Embrace: drawn as two side-view figures with world hand targets round each other (queen and princess, father's arms open behind them); reads as an embrace on the still, so the clasped-hands fallback was not used.
- S17: the Library desertRoad city (teal domes) already reads as his city; only the emerald banners with gold suns were added. Camera zoom 1.05 (plan 0.8) with the swing back to the escort at 130.2 and the catch-up at 131.5.
- S18: Firuz stands at 1265 (beyond the horse's head, not at 1150 in front of it); the household at 1370..1610. Her first flight loops right over the household and back (rise, out to 1480, turn, back to hover at 1120) instead of over the fountain, so the turn and the return fit the 0.8 s the line allows.
- S19: the land below is the `home` land with the cream palace at the lower left, her rose palace tiny on the right horizon and a gold river between, a sunset deck strip in front. Push-in from 1.15 to 1.0 (a pull-out showed the plate edges).
- Sound: the 9 effects at the plan's times; 86.45 whoosh under the cloud wipe.

## Not done / simplified
- No separate artwork in picture balloons beyond the series sprites (princessPalace, palace plate, ehHorseSil, farPalaceToy).
- The windmill/oxen/sheep in the fields are small marks in the baked tile; the farmer with two oxen is a small separate figure.
- The cat riding the wooden horse on the cart sits on the cloth (not on a saddle under it).
- 2026-11-23 revision 1: see review/revision_1.md (h5W world-reach fix, veil behind Firuz, reveal at zoom 1.3, draw-order rule for named characters).
