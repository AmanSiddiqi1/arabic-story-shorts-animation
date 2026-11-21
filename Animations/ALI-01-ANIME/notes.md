# ALI-01-ANIME implementation notes (v1, code only)

Plan checked against inputs: MP3 and words.json SHA-256 match planning_metadata.json; duration 138.938 s. Film = 138.94 + end_hold 4.0 = 142.94 s.

## Decisions the plan left open
- **Sharp hits moved to the real onsets** (silencedetect -35 dB): impact frames at 45.45 (فانشقت, Whisper 44.86 includes silence) and 85.74 (فانفتح, Whisper 85.02); the Arabic display words of the leader at 43.09 (not 42.76), Ali Baba's at 83.19, the closing words at 64.28. The freeze stays on 137.93 (inside continuous speech).
- **Sound times** moved inside the measured pauses: riser 33.45 / 88.4 (dur 0.9), chime 49.2 and 94.55 (tails are quiet), thud 69.7, blip 77.3, stamp 123.0, whoosh 104.9. All 14 effects kept.
- **Glade layout:** thicket moved from x 220 to x 900 (right of the hide tree) so the donkey can be shoved rump-first into it in 0.7 s; in S3 the donkey stands at 720 facing left and Ali Baba at 600 (they read separately from the trunk). The riders still come from the left.
- **S1 axe:** leans on a chopping stump at x 345 (no wall peg near Ali Baba at x 430); he turns, dips and swings it to the shoulder.
- **S10 camera** {560, 560, 1.5} instead of y 430 so both the eye gap and the riders on the ground are in frame.
- **S11 sneak:** 1350 -> 1660 over 78.0-79.0 (the plan's 1100 -> 1620 in 0.9 s was a run, not a tiptoe).
- **S12 pan** ends at x 1000 (not 1100) and Ali Baba takes a few steps after the treasure so he stays in frame for the head-hold at 94.55.
- **S16 two-shot mirrored:** Cassim at 360 (door side, left, as established in S14/S15), Ali Baba at 640; Cassim's gaze already goes to the door.
- **S17:** the far home is drawn in panel space (drifts left and shrinks) so Ali Baba and his wife stay visible during the tracking; rock on the horizon at x 2250.
- **Colour models:** people take the model as a palette (abPal; skin never tinted, Ali's sash and turban band always #ff3b2f); animals and riders go through an offscreen multiply pass (abCel) with optional neon rim.
- **Close-ups:** one story head function (abFace: almond eyes, layered iris, two highlights, coin pupils, reflections, sweat, hand over mouth) for 22.41, 48.34, 87.6, 113.26 (window), 116.25, 123.81, 125.47 and the eye gap in the leaves.
- Owner questions from the plan are not decided here: THE END kept, Arabic magic words on screen, 7 drawn + strip silhouettes for the forty, the mimed closing at 101.3 without lettering.

## Not done / simplified
- Turban tails and the leader's separate cloak ribbon are drawn as cloak ribbons on riders only (the Library person has no turban tail field).
- The horses turning to face left (60.9) flip direction with a squash instead of a turnFlip tuck.

## Revision 1 (v2 source) decisions
- Impact frames stay at the measured onsets 45.45 / 85.74; the gap after "سمسم" is filled (push-in, glowing words, cloak, light band) instead of moving the hit to 44.86.
- Door close in S7 moved to 54.0-54.75 (was 53.88-55.13) so every figure is inside the arch first; S8 no longer starts a close at 62.4 (it contradicted S9).
- Trunk phases (abForestFront `ph`, world units at parallax 1.6): S2 -374 (crosses at 8.0), S5 124 (35.8, then exits at 37.4), ride -81 (104.9).
- S12: Ali walks on to x 860 so the camera can follow him at 1.6 past gold, silver and cloth; S13 is a separate set-up (bust, insert, medium at x 580 by the chest).
- S17: the cart speed after 133.6 is 200 units/s (was 260) so the freeze wide (cam x 1850, zoom 1.0) holds the cart at left and the rock (x 2150, s 0.5) on the right.
- Cast finish (`AB_FIN`): per-model light direction, shade tone and line colour; people's skin keeps its Library colour, only shaded and rimmed.

## v3 fix round (Fable review 2, notes 1-4) decisions
- S17 camera tracks at cam x = cart x - 47 (zoom 1.7): cart bed at about 58% of the panel width, Cassim's head near 60%. Freeze wide: cam x 1596, zoom 1.0 (cart centre at about 32%; zoom below 1.0 would show past the 1230-unit world bottom). End rock moved to x 1975, s 0.36 so it sits where it was on screen (right) without covering the mule.
- The three words fall in real time (not frozen), so the last word (cue 137.51) lands at 137.98 on the road during the pull to the wide and lies dim behind the cart in the end frame.
- EMPTY SACKS tag sits under the ribbons (above the road), not above them: above the ribbons is where the word stack sits.
- Skin: both puppets and close-up heads use the Library skin (C.skin) in every colour model; only the shade crescent takes the model (people in lamp/night use shadeD 6, cave shadeD 5 with a warm amber shade, violet stays the 4 px rim). The close-up heads use the local `abCS` (see library_proposals.md 15).
- 64.06 call: rideOn's arm length cannot put the hand above the keffiyeh, so the hand is thrown up-forward to brow height clear of the head, with a 7% stretch of the figure into the throw.

## v4 owner restage decisions (see review/revision_3.md)
- Base v3; colour-model wash off (AB_MODEL k 0 except 'sil'); AB_FIN shade/line passes dropped.
- Horse coats from the story table AB_HORSE_PAL drawn with `equine(ctx, P, AB_HORSE_B)` (a copy of EQUINE.horse with this palette); riders via `rideOn(c, abHorseDraw, H, PP, { name: 'horse' })`.
- Speech is English balloons (abSay). The Arabic film title line stays under the chrome title (not speech).
- The forest wide track has no foreground trunk (S5's trunk is unchanged at its old zoom).
