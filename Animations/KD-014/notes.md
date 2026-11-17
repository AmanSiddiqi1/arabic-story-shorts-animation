# KD-014 production notes (v1 implement, code only, no render)

Film 168.0 s (narration 165.015 s + 3.0 s THE END hold). Subtitles: plan `subtitles` chunks in chunks_ar.txt / chunks_en.txt (verbatim, rebuilt by align.py on the final `.mp3.words.json`, copied to whisper.json). Scene cues use the plan's word times.
Code: src/k14_parts.js (drawings), k14_river.js (S1-S3), k14_yard.js (S4-S6), k14_sky.js (S7-S9), k14_mtn.js (S10-S14), k14_main.js (router, wipes, card, rank strip, shake, sound).

## Decisions the plan left open
- Riverside: the Library river set's right bank belongs to islandHut, so the bank is drawn locally (left bank top y 700, edge x 470..525) with a far grass bank on the right; figTree at x 130, s 0.8. Coordinates of S1-S3 are in this set (stone at 405, landing at 345), not the plan's y values.
- Hawk path, release point and fall through two leaf clumps placed on the measured fig crown; the hawk's grip offset measured on stills.
- Yard: villageYard with the cottage moved to x 600..900 (door 660..740, doorpost marks at x 645). Chalk marks step 6.6 units (12 marks from the child's head to the grown daughter's head; the plan's 14 units would overshoot her height). The bigger tree crown after the card is drawn as three extra crowns (villageYard ignores custom crowns for the default tree).
- The mother eavesdrops inside the window (winInside), drops a cloth that falls from the sill, and waves from the opened door at 63.6.
- Sky scenes: camera zoom 1.25/1.2 instead of 1.0 so the empty ground does not fill the panel; pair at s 0.6 on a grass mound. Cloud scale 2.8 so it can cover the r150 sun. The shade is a function of how much the cloud overlaps the sun (pure in t), so light returns whenever the cloud is shoved off.
- The sun's annoyed peek (73.5) is a second sun drawn above the cloud's top edge.
- S9: trees moved to x 520/620/720 and the pan is 180 units so the pair stays in frame; the turban-lift became both hands holding the head (the costume turban is not a separate prop).
- Mountain world spans x -110..1110, y -270..1230 so zoom 0.82 shows the whole mountain and sky. Holes drawn 60 wide (plan 26) so the mouse (s 0.85) fits its own door; sandal 88 wide is still about 1.5x the door.
- S12 staging: father kneels at x 520, the daughter steps from 450 to 590 to set the sandal and poke the hole (arms extend toward targets slightly out of reach); mouse at 650, hops aside to 730.
- S13-S14: maiden turns into a mouse at x 590 (burst centre 590,790); the scarf lands at 590; the father picks it up (forward tip), folds it to his chest and walks home left with his stick. The sky cast (sun, cloud, wind) sits above the mountain in S14 and looks at the lit hole. THE END at panel y 340 (below the rank strip, clear of all faces).
- Wind turn-around between shoves: it loops over the cloud to the right (82.0-82.66), then zips back left (83.2-83.85) so the final gust pushes the cloud off the right edge as planned.
- Effects: the plan's seven effects only, at its listed pause times (3.2, 22.6, 50.95, 63.2, 65.9, 144.6, 165.3).

## Skipped / simplified
- Person has no nose, so the daughter's nose twitch as a human is a 2-frame head jitter; the mice twitch with `sniff`.
- No separate "groom with huge shoulders" drawing: the black villager silhouette swells 1.9x and bursts the cloud.
- The father's shoulder-turn shield (15.48) is hands closing over the mouse plus a backward tip.
- Not rendered to video (code-only stage); checked with contact sheets at the plan's key beats and implcheck.
