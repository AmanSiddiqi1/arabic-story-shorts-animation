Verdict: REVISE

# KD-017 The Hesitant Thief: Fable review, round 1

Film reviewed: `Animations/KD-017/renders/KD-017_v1.mp4` (169.2 s, 1080x1920, 30 fps). All 29 strips of `review/v1_pack/strips/` were inspected in order, plus 24 full-size frames in `review/v1_pack/extra/` (montages `m1.jpg` to `m6.jpg`, subtitle crop `sub.jpg`).

## Summary

The film tells the story correctly and in order, and most of it is good: the two doors are established clearly, the knock lands on its word, the small-well / big-well balloon pair (62.0-63.0) is an excellent gag, the camera hold on the abandoned open door (76.0-76.5) works, the kneeling plea, the fall, the long shadow and CREAK, the catch with legs running in the air, and the servant peeking from behind the sack are all readable and funny. Subtitles are verbatim, well timed, large and never covered; the English reads naturally. No blockers.

It needs a v2 for three substantive problems: the two leads vanish from the hall in mid-shot (note 1), the routine montage shows the thief standing in plain sight of the owners (note 2), and the owner's disbelief, which is the reaction to the punchline, is not acted at all (note 3). The rest are improvements to make while the file is open.

Do not change: narration, subtitle text, subtitle timing, the balloon / thought-cloud pair at 60.5-64.7, the hold at 76.0-76.5, the catch at 141.5-145.7, the CREAK and shadow at 125.7-128.

## Notes

### 1. 103.7-107.1 s. MAJOR. The servant and the thief vanish from the hall
At 103.6 both stand in front of the two sacks (servant hands on head, thief arms folded). One frame later (103.7) they are gone, although the camera only slides a little to the left and the sacks they stood in front of are still in frame (`extra/m3.jpg` first frame against `extra/m5.jpg` first two frames). The hall stays empty for 3.4 s through BANG! BANG!. They are presumably moved to the back door positions (x 1100 / 1200) at 103.52, in view.
Why it matters: it reads as a render error, and it throws away the reaction to the louder knocking, which is the whole point of "ازدادت أصوات الطرق".
Fix: keep both at the S10 positions (servant x 720, friend x 850) until the cut to the street at 107.1; move them to x 1100 / 1200 only under that cutaway (107.1-111.2). During 103.7-107.1 act the knocks: on each hit the servant flinches (`sq` 0.92 then settle, `tremble`, gaze snapped to the front door, hands from the head to a clasp), with the flinch growing as the knocks grow; the friend does not flinch at all, arms still folded, `lid` 0.2, eyes up at where his cloud was, and only on the biggest hit (about 106.24, "الطرق") gives one slow blink. Frame the shot so the front door (left) and the pair (right) are both in it: camera x about 600, zoom 1.25. Keep BANG! BANG! where it is; it does not cover a face there.

### 2. 12.0-14.9 s. MAJOR. The thief stands in the open back door while the owners are in the room
At 12.1 the owner fades in as a ghost in the middle of the hall (`extra/m5.jpg` third frame), the wife fades in at 12.2, and from 12.5 to 13.2 all four people share the room: the owners at the centre, the servant and the masked thief at the open back door a few steps away (`extra/m1.jpg` first frame). The owners then cross to the front door in about 0.3 s (13.2 to 13.5).
Why it matters: the line is "the friend came in whenever the owners went out". On screen he is already there in full view, so the rule of the routine, and with it the sense that they are careful thieves who should have had an easy exit, is lost. The fade-in of two people in mid-room is also the only non-physical appearance in the film.
Fix: at 12.1-12.6 (the gap after "السرقة") the thief pulls his head back and the back door closes (`open` 1 to 0 by 12.6), the handshake sack going with him. The owners do not fade in: they are already walking, entering frame from the shelf side at 12.2 with `walk()` and `footfalls()`, and reach the front door on "البيت" (14.2-14.9); the servant bows them out (the mask-on pose). Front door shuts on "عندما" (14.90). Back door opens at once on "يخرج" (15.58) and the thief's head pops in, as now. If the walk cannot cover the distance without sliding, start the owners at x 560 rather than the centre.

### 3. 157.7-161.4 s. MAJOR. The owner's disbelief is not acted
From 157.7 to 161.2 the two-shot is almost frozen: the owner keeps the same hand-on-hip pose and neutral face he has had since 146, the thief only shifts his forearms (strip 156-162; `extra/m5.jpg` fourth frame at 160.5). The plan called for a look door / friend / door, letting go, the friend not running, and a hand over the face to the lens.
Why it matters: "لم يصدق الرجل ما سمعه" is the audience's own reaction and the release of the whole joke. Without it the film goes straight from punchline to exit.
Fix, all with existing fields:
- 157.7-158.5 (the pause after "البئر!»"): owner frozen, `noBlink`, brows up, mouth a small "o"; hold 0.5 s. Then one slow blink.
- 158.56-159.58 ("لم يصدق"): eyes first, head a few frames later (`gazePlan`): to the open door (right), back to the thief, to the door again. On the second look let go of the collar (hand opens and drops to the side by 159.4).
- 159.58-160.36 ("الرجل ما"): the thief is free and does not move: he stands at ease, `lid` 0.2, small polite smile, eyes up to the fading well cloud. Give this 0.8 s with the open door clearly visible beside him.
- 160.36-160.98 ("سمعه"): owner's hand to his face (palm over one eye and the brow, the other eye to the lens), `tip` -4, shoulders drop (`sq` 0.96 and settle). This is the third and last look to camera.
- To make room, move the owner about 40 px left for the whole of 146-161 so he no longer covers the thief's near arm and shoulder (see note 4), and keep the well "?" cloud up until 158.5 instead of 157.7.

### 4. 146.0-157.7 s. MAJOR. The interrogation two-shot is static and the figures overlap
For almost 12 s the owner and the thief stand shoulder inside shoulder in front of the open door leaf, both facing the lens, in one unchanged framing. The owner hides the thief's left arm; the thief's head sits exactly on the door leaf so his dark mask and hat merge with it at phone size. The owner's question is carried only by the arrow and frame highlight at 148.7-149.5.
Why it matters: this is the comic payoff scene and it has the least acting in the film. The plan's "anger turns to plain curiosity" is not visible.
Fix:
- Separate them: owner x about 1215, thief x about 1300 (on the threshold, the yard wall behind his head, not the door leaf), owner's arm reaching to the collar with `handRW`.
- 146.13-147.84 ("سأل صاحب البيت"): owner still angry from the catch (brow down, `flush` fading from 1 to 0.3), then on 147.84 the anger drops to puzzlement (one brow up, head `tip` 5).
- 148.22 ("لماذا"): free arm points at the open door with a full arm; 150.16 ("الخلفي"): palm turns up, shrug, gaze thief to door to thief. Keep the arrow, drop the rectangle highlight or make it the door opening only.
- 151.92-153.60: thief scratches his head on "قال", eyes wander up and sideways on "حيرة" (slow, calm, never frightened).
- 154.07 ("وجدت"): the thumb over the shoulder and proud nod, the same `aR` as at 79.0. It is in the film now but small; give it anticipation (2-frame dip) and a nod. Repeat the little door-with-tick balloon from 79.2 so the callback is unmistakable.
- 156.54 ("أجد"): palms up; well "?" cloud as now.
- Servant behind the sack: keep; sink him fully on "لكنني" (155.57) as planned, eyes only above the sack.
- Camera: a slow push from zoom 1.5 to 1.7 across 151.9-157.7 so the answer plays closer than the question.

### 5. 77.0-103.5 s. MAJOR. The argument: the shove has no effect and the open door is never in the picture
For 26 s the two stand side by side in the same framing. Individual gestures are good (thumb and tick 79.2, the swatted well 86.5, the air-drawn door 88.5-89.5, the red X at 100.2, folded arms at 101.2). Two things are missing:
(a) 90.5-93.5: the servant holds a straight arm against the thief's chest for 3 s and nothing happens to either body; the only wider view (91.5-92.5) shows them still planted. The plan's spin and shove are not there, so "فاخرج فورًا" has no physical comedy.
(b) The escape route is never visible during the refusal, so the irony relies on memory.
Fix:
- 90.57 ("إذا"): servant grabs the thief's shoulders and turns him toward the right (the figure is front-facing only, so play it as `tip` 8 toward the door, gaze right, a 30 px sidestep with `footfalls`).
- 91.56 ("فاخرج"): two-handed shove with `anticipate`; the thief leans (`tip` 12) and slides about 60 px right with a `dustBurst`, GO! as now. 92.46 ("فورًا"): servant stamps. 93.2-93.76 (the gap): the thief straightens and walks calmly back the 60 px to his mark (`rebound`), then raises the finger on "رد" (93.76) as now. He must return, unhurried: that is the joke.
- 101.35-103.5 ("كيف أخرج دون أن أراها"): pull out and drift right (zoom 1.5 to about 1.05, camera x to about 1000) so that the thief with folded arms, the frantic servant and the wide-open back door with its wedge of moonlight are in one frame. On "أراها" (102.84) the thief shuts his eyes as planned (not visible now) and the servant does his door / friend / door look. Keep the X cloud above the thief, clear of the hourglass.
- Small: in 77-90 stand them about 20 px further apart; their shoulders touch and the servant's gesturing arm is often hidden behind the thief.

### 6. 119.0-122.9 s. MAJOR. The yard detour is unclear and the thief ends up standing on the servant
The thief side-steps, the servant falls flat (good). The thief then walks into the yard (119.2-120.2), stands by the flowerpot with arms out for about 0.5 s (120.5-120.7), walks back in and stops with both feet on the servant's legs (`extra/m3.jpg` fourth frame, 121.5-122.9). The planned looks under the flowerpot and under the carpet corner are not readable.
Why it matters: "ظل يسأل عن البئر المفقودة" is the funniest idea in the plan (he is outside, free, and comes back). At the moment it is a short wander, and the standing-on-a-person frame looks like a collision error.
Fix:
- 119.96 ("ظل"): in the yard, bend (`sq` 0.85, `tip` 15) and lift the flowerpot with `handRW`, head tilted to look under it; hold 0.45 s; a small "?" beside the pot, not over his face. Set it down.
- 120.56 ("يسأل"): walk back in. Stop at about x 1235, to the right of the servant's head, so no part of him overlaps the servant (or lay the servant 70 px further left).
- 121.42 ("البئر"): cloud with well "?" as now; add the polite shoulder tap on the prone servant (`handLW` to his shoulder, two taps on 121.42 and 121.96). Servant beats the floor once with a fist on "المفقودة" (121.96) and lets his face drop.
- Keep the inset of the front door; it reads well.

### 7. 162.7-164.5 s. MINOR. Label says TO THE JUDGE, subtitle says governor
The English subtitle now reads "He took the thief to the governor" (re-translated 2026-11-17) while the on-screen label says TO THE JUDGE.
Fix: change the label to `TO THE GOVERNOR` (same position and timing, on "الحاكم" 162.78). Check it still fits at >= 28 px without covering the lamp.

### 8. 164.5-169.2 s. MINOR. The last image leaves out the open back door
The closing frame shows the servant, the tipped sack, the rolled cup and the open front door; the back door is out of frame on the right (strip 162-168, `extra/m6.jpg` third frame). The plan's final image was the sacks and the unused open door, which is the moral shown without words.
Fix: end on the zoom 1.0 hall shot (camera x 850), or drift right from 165.5 so that by 166.4 the open back door with its moonlight wedge is in frame at the right and the sacks in the middle; servant at the shelf on the left. THE END stays top centre. Give the servant one last glance at the back door at about 167.5, then down at the cup.

### 9. 48.0-53.7 s. MINOR. In the street shot the servant inside looks unconcerned
While the owner pounds and shouts, the part of the hall visible on the right shows the servant standing square to the lens with a neutral face and no movement; the thief is cut by the frame edge (`extra/m1.jpg` second and third frames).
Fix: either frame them out (camera 80 px further left), or better keep both in and frozen in fear: gaze locked on the door, `noBlink`, `tremble`, a flinch on each fist hit, and on "افتحوا" (52.81) both drop about 10 px (`sq` 0.9) with the friend 3 frames late.

### 10. 73.4-74.8 s. MINOR. The ghost well is drawn on top of the flowerpot
The dashed well outline and its "?" overlap the flowerpot, so the outline is hard to read as a well at phone size (`extra/m2.jpg` third frame).
Fix: move the ghost well to clear ground beside the door, about x 1440, between the door and the pot ("بجانبه" means beside the door), dashes 1.5x thicker and paper white; "?" above it. Keep NO WELL? where it is.

### 11. 52.7-53.7, 91.7-92.3, 141.6-143.6 s. MINOR. Red lettering on navy is weak at phone size
OPEN UP!, GO!, TOO LATE! and GOTCHA! are red with a black outline on dark blue night backgrounds; they read at full size but lose punch in the strips, unlike the yellow KNOCK! KNOCK!, BANG! BANG! and NO WELL?.
Fix: give the red words a paper-white (`#fffaf0`) outer keyline of 4-5 px, or set them in yellow with the red drop. Also move TOO LATE! about 40 px left; it sits close to the panel's right border.

### 12. 22.2-24.5 s. MINOR. The farewell at the front door is a cluster
Owner, wife and servant overlap in and around the door leaf at the left edge of the frame, the servant half hidden behind the leaf.
Fix: centre the shot on the door (camera about 120 px left) and put the servant inside at about x 500, clear of the leaf, bowing; owner and wife leave one after the other (wife 6 frames behind, not in step). Keep the wave and the listen at the door that follow; the grin on "أقاربهم" (26.72) could be held 0.3 s longer before he turns.

## Reusable techniques worth adding to the Library
- The balloon pair for a misunderstanding: the same two icons in the speaker's balloon and the listener's thought cloud with their sizes swapped (60.5-64.7). Worth a helper, for example `iconBalloon(ctx, {icons:[{draw, s}], kind:'speech'|'thought'})`.
- Hold on the abandoned exit before the whip (76.0-76.5): a 0.5-0.7 s empty-frame hold on the thing a character should have used.
- Hourglass as a panel-space suspense meter that tips over and turns red on "too late" (36.2-146).
- Inset circle for an off-screen threat (117-122.5).
- Ghost (dashed) outline with "?" for a thing that is expected and absent.

Second review advice: Yes, a short second Fable review of v2 is warranted. Notes 1-6 restage about 60 s of acting in the argument, the yard detour, the interrogation and the disbelief beat, and those are the scenes the film's humour depends on; they can only be judged from rendered frames. The review can be limited to 12-16 s, 77-123 s and 146-169 s.
