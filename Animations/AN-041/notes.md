# AN-041 The Fox and the Crow: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (6ba5cf71...) and its `.mp3.words.json` (13648929...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 167.81 s = plan duration 164.809 + end_hold 3.0 (under 180.0). THE END at 165.0 s.
- Subtitles: chunk marks from the plan's `subtitles` (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (228/228 words matched).
- Owner questions: all plan defaults taken (flea bites the sleeping merchant, mouse takes one coin; fox creeps off with the shared bone; sparrow stuck in the wool, lamb carried off unharmed; belly, shadow, tongue and heart kept; the 17 lettering items; crow with three eggs, no gendered lettering).

Decisions the plan left open or that the measured set changed:
- Fox top-zone mark x 440 (not 380): at s 0.8 the Library fox's toes sit about 60 units ahead of x, so 440 keeps the toes about 100 units from the edge; "the very edge" step goes to 500 (toes about 40 from the drop, nose over the gap); the spring back lands at 392; the walk away goes 392 to 190.
- S2: the fox sits at x 540 (plan 300 was inside the cave mouth x 200..460); the yellow cloud is at (590, 1535).
- The mountain is drawn from x -700 to 1700 so the S12 look-back (zoom 0.62, 163.4-163.6) shows the whole mountain with the tiny crow on top; then the camera returns to the cave for the eyes and THE END (plan's zoom 0.95 would not have shown the summit).
- Sky: dawn preset until the wipe at 21.54 (the dawn-to-day cross-fade of skyCycle looked olive, so it is hidden under the wipe), plain day after, and the "morning to dusk" drift is a multiply warm tint (F41_WARM) rising from 61 s to 161 s; dusk proper (u 0.47) under the LATER card.
- The wipe at 21.54 is a slanted yellow halftone band (story code); the LATER card is S.transition 160.75-161.55 with the camera cut at 161.15.
- Sparrow: the Library now has `bird` kind 'sparrow', used instead of the lark. Eagle = hawk pal 1 with `carry` (a lamb drawn by `sheep`); falcon = hawk pal 0; the falcon's age is shown with a grayscale filter, drop, lid and brow (no `age` field in the Library hawk).
- Wolf = the Library fox drawn through a grayscale canvas filter (no new rig). Hunter shadow = the fox redrawn with `filter: brightness(0)`, skewed and scaled up, clipped to the wall, using the pose of 2 frames earlier.
- Crow `crest` does not exist for kind 'crow' (lark only): alarm is shown with eyes wide, sq and sag instead.
- Limit line (136.12) is a vertical red dotted line at the terrace edge (x 598), with YOUR LIMIT below it on the rock; reads more clearly than a line along the ground at phone size.
- Falcon medallion: a round inset (story code) with the old falcon close-up, parked at (352, 690) beside the fox's face, "=" and SAME TRICK between them; both blink together at 120.62.
- Sound: exactly the plan's nine cues (rumbles at 3.62, 41.4, 164.7 built from SND tones; paper ruffle 11.9; pop 20.45; three trot ticks 21.1-21.38; ticks 42.2 and 56.0; chime 165.05), all inside measured pauses.

## v2 (Fable round 1) decisions
- Walk-away ends at x 305 and the moral two-shot is zoom 0.97 (fox tail and crow whole); kicked pebble starts at x 290.
- Medallion at (740, 720) r 78 over the chasm; the heart lifts 150 / right 30 while it is up. SAME TRICK sits above the fox's head (above the medallion it covered the nest).
- Crow pointing wing, crest, flat hunter shadow, paws-over-mouth, lick, drop/splash and fleeing-bird V are story code in src/f41_cast.js (proposed in library_proposals.md).
- Fox ears are one Library field, so "one ear after the other" was not possible; both flatten together at 145.21.
- Sky: u 0.25 from t 0 (S1 summit now the same blue); sun drawn by the story so it can fade under the story clouds.
