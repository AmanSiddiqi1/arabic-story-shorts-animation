# AN-135 King Kisra Anushirwan and the Village Damsel: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (41970cec...) and `.mp3.words.json` (09991192...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json` (script sha d9df39f5...).
- Film 174.0 s = 170.503 narration + 3.5 s end hold (plan). THE END 170.5. implcheck PASS.
- Subtitles: the plan's chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py on the final `.words.json` (245/245 words). No dashes in either script.
- Sound: the plan's nine effects in the real gaps (pop 1.27, whoosh 3.78, pop 21.6, pop 43.3, pop 94.73, thud 135.66, pop 149.5, pop 170.35, chime 171.0). The whoosh moved from 3.90 to 3.78 so its tail ends before the word at 4.18.
- Owner questions: all plan defaults kept (cane as meter with recovery, crown in the saddlebag, torn scroll, light wedding, villagers + ghost TAX sack, the twelve lettered words).
- Source: `src/a135_rig.js` (helpers), `a135_props.js` (new props/effects), `a135_road.js` (S1-S2), `a135_hut.js` (S5), `a135_yard.js` (one timeline for every yard actor, S3-S4, S6-S16), `a135_main.js` (scenes, cameras, cloud, balloons, lettering, sound).

Decisions the plan left open or the measured sets changed:
- No Library change: the hidden crown uses the caliph costume with `pal: {head: 'bigTurban'}` (pal overrides the headwear) and switches to `crownTurban` when the crown prop lands on his head (157.28). The plan's `crown:false` option is not needed.
- Sky: morning u 0.26 (u 0.10/0.20 render as a grey dawn sky); time-lapse 0.26 -> 0.46; evening 0.47 -> 0.55; S16 golden 0.40.
- Horse s 0.85 in the yard (at 0.62 a rider at the king's 1.05 looked twice the horse's size); road horse 0.6 with rider 0.72.
- Evening: the horse comes back from the right (same road) and stops at the hitching post facing LEFT (x 200), not at x 880. This keeps the saddlebag near the king for the pupil glance (133.66), the horse's accusing look back (137.98, headTurn) and the crown at 156.4 (the horse backs up to x 236, the king steps to x 392 and takes it from the bag).
- Cottage {x0 600, x1 960, top 560}, door 630..730 top 640 (taller, so the figures fit), window enlarged to 120 x 105 (785..905, 595..700) for the silhouette.
- Hut: she kneels on a mat with the bowl on the floor in front of her (cross-section, s 1); the low table was dropped because a bowl on a table covered her face. Jug on the floor at her right, powder jar on a small wall shelf.
- The king walks up to the door to knock (x 545) and steps back to his mark 455 as the door cracks open.
- Bowl handling: king holds it in both hands, then in his right hand (toward her); she holds it in her left hand at the hip (toward the door), so her right hand is free for the stalk, the leaf stroke and the hand at the proposal. In S13 she takes it back at 129.3; in S16 it stands on the doorstep.
- The wrung stalk leans on the wall left of the door until she lifts it (73.34).
- Thought cloud scale 0.62 (at 0.42 the throne king was under 60 px); S14 version greyed.
- S13 balloon moved to (610, 455) so it stays in the push-in frame.
- S16: villagers from the left to x 70 / 175 / 268, the horse (repositioned at the dissolve) at x 150 facing right behind them; it bites the woman's cane bundle at 171.4. Final camera zoom 1.2 instead of 1.0 so the people read.
- Transitions: wipes S2->S3, S4->S5, S5->S6; THAT EVENING... card 98.2-99.6 (layout swaps under it at 98.9); dissolve S15->S16 at 159.4; cuts elsewhere.
