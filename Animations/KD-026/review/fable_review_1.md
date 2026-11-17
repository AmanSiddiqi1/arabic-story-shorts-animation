Verdict: REVISE

# KD-026 The Thief and the Devil: Fable review, round 1

Reviewed: `renders/KD-026_v1.mp4` (170.16 s) through all 29 strips in `review/v1_pack/strips/` plus 22 full-size frames pulled into `review/v1_pack/extra/` (`f_<time>.png`, montages `m1.jpg`..`m4.jpg`).

## Summary

The story is told in order, complete and faithful, and it is family friendly: the devil is a vain comic imp, nobody is hit, the escape is harmless. The ideas are strong and most of them land: the horns rising behind the thief's own tree (22.8), the icon balloons and the two three-frame strips, the SLEEP meter counting down, the staged waking in close-up (139.5-143.5, the best shot in the film), the cow licking the turban, the SO CLOSE insets merging into the torn badge. Subtitles are verbatim, well timed and readable in both languages; the new English is accurate. THE END holds 3.5 s.

It needs a v2 for one broken text and for staging in the middle of the film. The 45 s quarrel and the climax are played by two figures who overlap each other, face the camera and stand on the sleeper's head, and in the thief's big shout the picture shows the devil instead of the thief. Those are the scenes the fable exists for.

Nothing below changes narration, subtitle text or timing.

## Notes

### 1. 10.68-12.2 s. BLOCKER. The day counter prints "NAN"
- Wrong: the yellow burst above the thought cloud reads **NAN** for 1.5 s instead of DAY 1..5 (`extra/f_11.0.png`).
- Why: broken on-screen text in the first 12 s, exactly on "every day" (`كل يوم`, 10.68-11.81).
- Cause: `src/k26_road.js` line 116 calls `S0.counter(c, 'DAY ' + n, ...)`. The style's `counter` formats its value with `K.fmt`, which is numeric only, so a string becomes NaN.
- Fix: pass the number and letter the word separately, the same way the film already does STOLEN: 0 at 153.82 (`k26_hut.js` line 386): `S0.label(c, 'DAY', ...)` to the left and `S0.counter(c, n, ...)` beside it, size about 90, each step on 10.68, 10.92, 11.14, 11.38, 11.62 as now. Keep the burst inside the panel and clear of the cloud's top edge. After the change, grep the story for any other `counter(` given a string.

### 2. 125.0-132.4 s. MAJOR. The thief's shout is shown as the devil's
- Wrong: from 126.0 the thief is a small figure tucked against the devil's right side; the red WAKE UP! burst (128.7-129.9) sits over the devil, who has both hands at his head, so the devil reads as the shouter. From 130.0 to 131.7 the thief is not visible at all: only the devil stands over the sleeper under a DEVIL! label and arrow (`extra/f_129.2.png`, `f_131.0.png`).
- Why: this is the surprise of the fable, "suddenly the thief shouted". The viewer must see who betrays whom. As rendered, the picture contradicts the narration.
- Fix:
  - On `صرخ` (125.94) the thief leaps clear to the far side of the sleeper's head (about x 520, between the head and the window patch), drawn after the devil, facing left toward the sleeper and the devil. The devil stays at about x 300, at least 180 units from him.
  - 127.72-128.80 (`أيها الناسك`): thief cups both hands to his mouth, `sq` 1.1 inhale on 127.72, bends over the sleeper, mouth wide open.
  - 128.80 (`استيقظ`): WAKE UP! burst anchored at the thief's mouth, on his side of the frame, not over the devil. Devil reacts only: recoil, `gaze` to the sleeper, hands to ears is fine if he is clear of the burst.
  - 130.56 (`شيطان`): thief's arm fully extended pointing at the devil; DEVIL! label and arrow stay over the devil; the devil does an innocent "who, me?" (hand on chest, brows up).
  - 131.70 (`خطفك`): thief mimes the sack over a head (the plan's sack mime), still visible.
  - Keep the second half (133.0-139.5) as it is; it already works: the devil leaps across (133.7-134.2), yellow WAKE UP! over him, THIEF! arrow on the thief, crossed pointing arms at 138. Mirror that clarity in the first half.

### 3. 80.0-124.5 s. MAJOR. The quarrel pair overlap, face the camera and stand on the sleeper
- Wrong: for about 45 s the devil and the thief stand shoulder inside shoulder (the thief's left third is behind the devil), both frontal, and the sleeper's turbaned head lies across the thief's shins. In 116.6-120.5 the thief is almost entirely hidden behind the devil while ME FIRST! / NO, ME! / ME!! are lettered (`extra/f_86.0.png`, `f_119.8.png`). Body positions barely change from 80.5 to 116.
- Why: an argument reads through two bodies opposed in profile with air between them. Here they look like one two-headed figure addressing the audience, and standing on the victim removes the "don't wake him" tension the SLEEP meter is building.
- Fix:
  - Clear floor: move the pair left so that the devil is at about x 215 and the thief at about x 330, and/or slide the mat 60-80 right, so the sleeper's head is at least 60 units right of the thief's feet. Move stool and jar behind the devil or off to the door side.
  - Separation: at least 110 units between body centres at rest; they close to 70 only on the loud beats (118.96, 119.70) and for the tug of war (121.14).
  - Facing: turn them toward each other (three-quarter or profile via the person `face`/flip field, heads tilted in), with `gaze` on the other; the speaker leans in (`tip` 0.08-0.12), the listener leans back.
  - Alternate status so the picture changes every 2-3 s: devil's speech 86.5-100.0 he looms and the thief shrinks (`sq` 0.94, arms folding on 101.00); thief's speech 104.9-116.6 the thief steps forward on `بل` (106.35), jabs a finger up at the devil's chest on `أولًا` (108.30), and the devil leans back with the slow blink at 115.78.
  - Every near-wake (97.54, 112.20) both freeze and turn heads to the sleeper together, then resume. The freeze exists now but is hard to see because they already look at camera.
  - Camera: keep zoom about 1.7-2.1 but frame so both full figures and the sleeping head are inside the panel, heads not under the strip frames.

### 4. 33.3-58.5 s. MAJOR. Yard: the thief is hidden in his own scene and the owner stands idle beside the bush
- Wrong: (a) behind the bush only the thief's beanie and eyes show while the devil shows head and horns, so during the thief's line (42.5-47.4) the speaker is a cap; his rope mime, sleep mime and thumb are invisible, and so is the shrug at 52.54. (b) The handshake on `فاتفقا` (57.02) happens inside the bush; only a small spark shows (`extra/f_56.95.png`). (c) The ascetic stands facing the camera, motionless, one body width from the bush from 35.5 to 60.0, while two intruders discuss kidnapping him. (d) Static holds with nothing changing: 38.5-39.7, 47.5-50.2, 53.0-55.7.
- Why: the "false harmony" act is where the audience learns each one's plan and the pact. Hidden gestures make it a devil monologue, and an owner who stares past them at arm's length breaks the logic of hiding.
- Fix:
  - Raise both actors so they show from the chest up when they talk (stand up from the crouch on 36.98 `وسأله`, duck together when the ascetic turns), or lower the bush to about h 110. Give the thief's head the same clearance as the devil's.
  - Thief's line: rope-pull mime with both hands above the bush on 43.95-44.62, head on folded hands on 46.08 (`ينام`), thumb toward the owner on 46.58.
  - Devil's line: keep the sack balloon; add the moustache twirl on 48.90 and the sack flourish above the bush on 50.90; thief's gulp then shrug visible on 52.54.
  - Handshake above the bush top on 57.02, held to 58.1 with the spark, both grinning at each other, then they sink to wait on `الانتظار` (58.14).
  - Ascetic business, back or side to the bush, at least 250 units away (by the trough or the door): pours water or strokes the cow from 35.7, turns his head toward the bush once at 35.74 (they duck, the cow keeps staring), then goes back to it. He should never stand frontal and idle.
  - Fill the holds: cow chewing with ear flicks, the devil's tail curling above the bush, a blink and a look between the two.

### 5. 149.6-152.6 s. MAJOR. The escape is a six-figure clump and both exits are nearly invisible
- Wrong: the neighbours stop directly on top of the intruders, so door leaf, three neighbours, thief, devil and ascetic share about 300 units (`extra/f_150.75.png`). The thief's leap to the window is visible in one sampled frame (150.7); the devil's POOF! is hidden behind his own sack and a neighbour's head (`f_151.4.png`). The planned innocent whistling (148.86) cannot be read.
- Why: "fled empty-handed" is the payoff of the whole quarrel and it has 4.5 s of narration (150.23-154.70). The audience should see each one go and see that the hands are empty.
- Fix:
  - Keep the neighbours near the door (x 200-340 as planned) and the intruders in clear floor between the mat and the window, at least 120 units from the nearest neighbour, the ascetic on the other side with the stick. Three separate groups.
  - 148.86-149.56: whistling, eyes up, hands behind backs, held a full 0.7 s in the lamp light.
  - `فهرب` 150.23: run on the spot and bump (0.4 s). `اللص` 150.74: the thief's jump to the window as an arc lasting about 0.7 s, then his legs kicking in the window frame for 0.4 s before they vanish.
  - `والشيطان` 151.34: POOF! in open space with a `dustBurst`, lettering above the cloud and not covered; the sack hangs a beat, then floats down (152.40) to land flat. EMPTY / STILL TIED / STOLEN: 0 as now (those read well).

### 6. 22.5-29.5 s and 33.2-35.0 s. MAJOR. Wide shots with tiny figures over a deep band of empty ground
- Wrong: in the devil's introduction the bottom third of the panel is flat brown earth and the top third empty sky; the devil, thief, cow and ascetic are a thin row in the middle, and the cow and ascetic are cut by the right edge. The first yard shot has the same deep empty ground. The production notes say the camera height was derived to avoid exactly this; it did not work at these zooms.
- Why: this is the reveal of the second villain and of the chain "devil follows thief follows man". On a phone the faces are a few pixels and the cow X balloon (28.56) is small.
- Fix: lower the camera so the ground line sits at about 80-85 % of panel height in every shot (at most about 15 % of the panel below the feet), and raise the zoom to about 1.2-1.3 for 22.5-29.5 with the frame spanning from the tree to the ascetic. If all four cannot fit at that size, pan: tree and horns (22.78-24.7), then a move right along the yellow arrow to the cow and ascetic on `الناسك` (25.50), then back to the devil for the balloon. Enlarge balloon icons by about 1.3 here.

### 7. 63.7-79.7 s, 126.0-139.5 s, 145.2-152.5 s. MAJOR. Hut wide shot is loose and the double reach is small
- Wrong: at the wide setting the cast fills only the lower third; the top 15 % is plain dark blue roof and the wall above the window is empty. In the double reach (77.38-79.5, `extra/f_77.9.png`) the thief at the knot is pressed into the right post, half covered by the cow and the meter, and the devil stands on the sleeper's head with the sack touching the Z's.
- Why: the plan calls the double reach the picture of the moral, and it is replayed in the insets at 160.28. It should be the clearest wide frame in the film.
- Fix: frame the wide shot from the floor line up to just above the window (zoom about 1.45-1.5, camera lower, roof band out of frame), keeping door, mat, cow and peg inside. For 77.78: devil one step left of the head (not on it) with the open sack held about 30 units above the turban; thief a clear step left of the post with his hand about 20 units from the knot, drawn in front of the cow's rump; hold both frozen with a small `->|` gap marker or two short dashed lines at the gaps until `يتحرك` (78.82), then the mutual look. Move the SLEEP meter to the upper left or shrink its footprint so it is not over the thief.

### 8. 0.0-6.0 s. MINOR. The cow is half out of frame for the whole first sentence
- Wrong: the cow is cut by the left panel edge until about 5.7 s; the MILKING COW label (1.62-3.0) points at a head and a shoulder.
- Why: the opening sentence is about the cow, and she is the prize everyone wants.
- Fix: start the pair about one cow length further right (or the camera further left) so that the whole cow is inside the panel by `بقرة` (1.62); keep the taut-rope graze beat at 3.42.

### 9. 12.6-17.0 s. MINOR. The thief decides in the open, touching the cow
- Wrong: at 15.5-17.0 the thief stands fully exposed one step behind the cow with a red YES! burst while the ascetic is two steps away.
- Why: it weakens "saw him on the road and followed": he looks caught, not hidden.
- Fix: keep him half behind the trunk for the YES! (16.18, burst smaller, about 0.7 scale, with a finger to his lips straight after), and let the pair walk on a further 150 units before he leaves cover on `يتبعه` (17.14) and tiptoes to the stone.

### 10. 72.2-79.5 s and onward. MINOR. Sleeper and cow are tangled
- Wrong: the lying cow's muzzle rests on the sleeper's blanket and feet, so the two prizes read as one white shape in the dark, and at 133-138 the devil has to stand among cow legs and rope.
- Fix: put 80-100 units of clear floor between the sleeper's feet and the cow's muzzle (cow further right or scaled 0.7), rope clearly visible to the peg.

### 11. 166.7-170.2 s. MINOR. The epilogue gag is invisible
- Wrong: the two silhouettes still arguing outside the window are a few pixels wide inside the small window.
- Fix: during the THE END hold push the camera toward the window (zoom to about 2 over 1.2 s, the man and cow staying in the lower part of the frame), or enlarge the silhouettes to fill the window height with alternating tiny ME! / NO, ME! puffs. If neither fits, drop the gag and hold on the man and cow.

### 12. 91.0-116.2 s. MINOR. Strip frames and labels at phone size
- Wrong: the three strip frames are clear at full size but their figures are about 60 px tall; the AWAKE! cap on the meter (141.2) and the meter's numbers are very small.
- Fix: enlarge the figures inside each frame to fill about 80 % of the frame height, MOO! at least 28 px at 1280x720 scale, and make AWAKE! a normal label (>= 28 px) beside the meter on `الصياح` (141.22).

## What to keep unchanged
- 22.78 horns behind the tree and the DEVIL label; 30.5-33.0 the sack and moon balloon close shot.
- 59.2-62.7 the shared thought cloud (lit window, lamp, dark window, Z) and the THAT NIGHT... card.
- 63.8-72.5 entering with the lamp, tying, TIED, supper, lamp out.
- 133.0-139.5 the devil's counter-shout and crossed pointing.
- 139.5-143.5 the waking close-up, step by step, and the look to camera.
- 152.7-154.7 the three verdict labels; 157-159.5 the lick and heart; 159.7-164.7 the insets and the merge.

## Subtitles
Arabic verbatim, large and clear; English accurate, complete and readable (two lines at most). Fade-ins do not clip any chunk. No change requested.

## Reusable techniques worth adding to the Library
- `iconBalloon` with a three-frame strip that fills on cue words: wordless reported speech that works without reading.
- `sleepMeter` as a visible countdown for "voices grew louder" (needs a larger AWAKE state).
- Circular replay insets that merge into one (the moral as a picture).
- A guard in the story template or `implcheck.py`: fail when `counter()` receives a non-numeric value, and a rendered-text scan for "NaN"/"undefined".
- A framing check: warn when the lowest foot in a shot is above about 80 % of panel height (empty ground band) or when two speaking characters' bounding boxes overlap by more than a third for longer than 2 s.

Second review advice: Yes. Notes 2 to 7 re-stage about 90 s of the film (quarrel, climax, escape, yard, camera heights), which changes blocking, draw order and framing in ways that can introduce new overlaps or cut-offs. A second Fable review of v2 should check specifically: the day counter text, who is visibly shouting at 128.8 and 135.4, separation and facing of the pair through 80-124 s, the two exits at 150.7 and 151.3, and the ground band in the road and yard wides.
