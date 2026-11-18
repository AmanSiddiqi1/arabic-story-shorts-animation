# KD-026 production notes (v1 implement, code only, no render)

Film 170.16 s (narration 166.66 s + 3.5 s THE END hold; plan duration + end_hold). Inputs checked: planning_metadata shas match timeline.json, the final MP3 and its `.mp3.words.json`. Subtitles: plan `subtitles` chunks (4 per paragraph) in chunks_ar.txt / chunks_en.txt, rebuilt verbatim by align.py on the final `.mp3.words.json` (copied to whisper.json, no transcription). Cues use the plan's word times; the second WAKE UP! burst and shake use the silence-refined onset of «استيقظ! (135.3, not 134.96).
Code: src/k26_parts.js (helpers, cow, devil costume wrapper, props, balloons, strip frames, sleep meter, inset), k26_road.js (S1-S3), k26_yard.js (S4-S6), k26_hut.js (S7-S15), k26_main.js (dispatch, camera, card, THE END, sound).

## Decisions the plan left open
- Camera: key x and zoom follow the plan; the height is derived from the zoom (ground at panel y ~1065) so the figures are never small above a wide band of earth. The close-up S13 uses a rotated camera (rot 1.7, zoom 4.6) so the lying face reads upright.
- Road (countryRoad strip 2000 wide): tree 520, "milestone" = a low stone block x 800 (w 130, h 120, a wall place) so a crouching thief can hide behind it, bush 1060, low wall 1560. The far house is not visible on the strip at this framing; HOME is an arrow off the right edge.
- Yard: cottage as planned (x 560..960, door 620..700, window 800..880); bush x 250 at h 150 (plan 170) so only beanie and eyes / the devil's head show; trough 650, ascetic 545, cow 840. The two-shot keeps the bush pair left; the door is not between their heads (geometry); racks to the background at 44.62 and 51.98 as planned. Moon from the skyCycle (one moon).
- Hut: stool + lamp moved to x 240 (plan 430) so the argument spot is free; mat 400..660, sleeper hips 560 (head ~444), cow lying at 770 facing left (s 0.76) with the rope to the peg (860, 700); argument spot devil 300 / thief 390; hug at 392/452; neighbours stand at 200-340 right of the door leaf; their lamp is hung on a wall hook at (300, 700) (a ceiling hook is out of reach).
- Dark room: the set is darkened behind the cast and again over walls/roof; the cast stays in full colour; moon patch from the window. No blue rim light.
- The thief tiptoes quickly (living room is wide): door to 450 in 1.7 s, then to the knot in 1.2 s; the devil steps in his footsteps 0.4 s later.
- Sleep meter: vertical 10-cell bar at the right panel edge (panel y 340..), so the strips (panel y 74..310, three frames 300 wide) never overlap it.
- Sound: the plan's eight effects in pauses (6.45 pop, 15.6/15.8 tick, 21.25 whoosh, 63.05 whoosh, 69.4 ding, 90.9 pop, 109.2 pop, 166.9 chime) plus the series' quiet bed.

## Skipped / simplified
- Cow "headTurn" (true look back) is done with gaze and small head angles; cow tennis-match is pupils plus head tilt.
- Devil cape lag is an extra flap behind the costume cape; turban-tail lag on the ascetic not implemented (headwear is not a separate part).
- The thief's knees-high sneak uses the plain figure's straight legs with a body tilt and bob (no knee bend).
- Ascetic's pat on the shoulder by the tall neighbour (156.54) and the two neighbours peering out of the window are replaced by shrugs at the door.
- Thief foot under the flopping arm (112.2) is approximate (the arm falls toward him, he lifts it away).

## v2 revision (2026-11-17, fable_review_1)
- Camera: `k26Cam` places the hut floor at ~90 % of the panel (900 - 490/z) and road/yard at ~86 %; wides never use zoom 1.0 (the clamp kept the camera centred there). A key with `fy: 1` sets its own y (the THE END push to the window).
- Hut geography v2: sleeper hips x 530 (head ~414), mat 370..630, cow lying at x 825 s 0.55, quarrel spot devil 185 / thief 300 (badge midpoint K26_MID 242), shout: thief 495 behind the sleeper, devil 175; after the waking: neighbours 140/205/270, thief 430, devil 545, ascetic 705.
- Yard: bush h 92 (chest-up two-shot), ascetic x 630 watering then stroking the cow, cow x 860; handshake point K26_YSHAKE (252, 738).
- Road: opening pair starts further right (ascetic 370, cow 180); YES! behind the trunk at x 566; reveal 22.6-29.4 panned at zoom 1.25-1.3.
- SLEEP meter upper left at scale 0.75; AWAKE! label at 141.22.

## v3 fix (2026-11-18, fable_review_2)
- Hut cow s 0.72 (K26_HCOWS) at x 832, rump redrawn over the corner post; sleeper lies at x 510 (mat 350..610), roll on 111.9 slides 6 (head as in v2).
- Peg/knot moved from the corner (860, 700) to the back wall (770, 730): the person arm (74 units) cannot reach the corner peg from beside the cow's head. Ascetic ties from x 690; double reach thief at x 682 (K26_REACHX), cow drawn in front.
- Climax: thief kneels at x 515 (K26_SHOUTX), devil lands at 700 (K26_DLANDX); Z's rise up-left (k26ZLeft) from 125.94, none from 139.5; badge halves tucked at the belt 125.94-143.7.
- Neighbours drawn after the front layer (in front of the door leaf, clipped at x 140), at 170/228/290, exit 157.1-158.9.
