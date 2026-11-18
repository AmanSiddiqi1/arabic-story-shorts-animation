# AN-098 Yahya and the forged letter: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (0db79dd8...) and its `.mp3.words.json` (e1d6a5d5...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 175.9 s = plan duration 171.41 + end_hold 4.5 (under 180.0). THE END at 171.6.
- Subtitles: the plan's chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (232/233 words matched, 38 silence-refined starts).
- Effects: exactly the plan's nine cues; every one is inside a measured silence (silencedetect -35 dB) or after the last word (171.24).
- Library: horse, rideOn, desertRoad, palaceHall, hutRoom, marketStreet, thoughtCloud, skyCycle all exist and are used directly (the plan listed horse and rideOn as new).
- Owner questions: all plan defaults taken (softened punishment, gift cloak, ten horses as heads + x10 tag, medallions and rift, Yahya's wink, the invented lettering, mountains for Armenia, the yellow-sealed reply).

Decisions the plan left open or that the measured set changed:
- Hut: the Library jar hangs from a ceiling hook too high to reach, so the story draws its own jar on a long cord at x 300 (bottom near y 690); the forger starts at x 380, turns to tap it, then walks to the stool (x 470, seated at 492). Table x 540..660. Opening title card "THE FORGED LETTER" (0-1.7 s).
- Phrase onsets measured: كتب 19.71, قرأ 41.24, أقام 61.83, فهم 84.30, فرح 105.88, عاد 130.15, ذهب 136.38, ابتسم 151.22 (timeline starts include silence); actions keyed to the measured onsets where it mattered (writing, the governor's jump, the walk in).
- S5: the forger stops at x 480 (not 430) so the hand-over reaches Abdullah's hand; the cloud of doubt sits at (520, 450) so it stays inside the push-in frame.
- S8: Abdullah hands the scroll up at the gate; it flies on an arc into the satchel (rider hands stay on the reins). The rider shrinks and rises toward the horizon after 71.3 while the camera stops.
- S10 decision cloud moved to (625, 420), 270 x 180, so it fits the zoom-2.0 push on Yahya.
- S11 layout: forger x 380, coin heap x 480, chests x 600 and 690 (servants bring them from the right edge), white horse steps through the arch to nuzzle him (114). The cloak comes out of the first chest; the casket is set on the second chest.
- S12: cut to Abdullah alone on the dais edge (x 760) with the letter; the gifts and people are not in the close shot. The banner is panel space (r 100).
- S13: three led horses (bay, black, bay) with loads; the walking servant at the back would be out of frame and is left out.
- S14-S16: Yahya stands and steps to the dais edge to lift the forger by the elbow (141.7), sits again, then in S15 steps down to the floor at x 600 to close the chest and slide it back (it stops at 470, the forger hops back to 385). Fortune 1 = chest 1 (open, coins and cloth) + horse row 1; fortune 2 = chest 2 at 700 + coin heap at 820 + horse row 2. No separate first coin heap. He sits down on chest 1.
- S17: single-screen street (w 1000) so the palace door and Yahya's balcony stay in frame at THE END; five horses would exceed the four-horse limit, so string 2 is one horse.

Skipped (small): foot tap while waiting (no single-leg field); turban tipping off at the horse's nuzzle (tilt only); per-servant bows in S16.

## v2 (Fable review 1)
- Captions: story copy of the Library subtitle with balanced line breaks (src/a98_sub.js; "subtitle": "scene").
- Bows use `lean` (upper body about the hips) instead of `tip` (whole-figure rotation about the feet), which looked stiff on a kneeling figure.
- S16 layout: forger 235, set A chest 330 + heap 432, set B chest 625 + heap 727, Yahya back on the dais at 810. Heap A pours in after the clap so the two sets are identical.
- S17: palace moved to x0 600 (door 750..890, balcony 820); the procession clip is x < door right jamb. End camera zoom 1.15 (1.25 would cut group 2).
