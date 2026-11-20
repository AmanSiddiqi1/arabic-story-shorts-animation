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
