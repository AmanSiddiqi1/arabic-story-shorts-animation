Verdict: REVISE

# KD-007 The Three Fish: Fable review, round 1 (film v1, 171.9 s)

Reviewed from all 29 strips of `review/v1_pack/strips/` (4 frames per second) plus 30 full-size frames pulled into `review/v1_pack/extra/` (sheets A to G and S). Narration, subtitle text and subtitle timing are not to be changed by any note below.

## Summary

The story is told in the right order, nothing is missing, and there are no broken frames. The split-level world, the stream squeeze and pull-out to THE WIDE RIVER (71-76 s), the BLOCKED barrier (112 s), the BOING (117.5 s), the belly-up roll (128-131 s), the tip onto the grass with SO CLOSE! (140.8 s) and the FLIP/SPLASH (143-144 s) all read well. Subtitles are legible in both languages throughout, and the English matches the Arabic.

It is REVISE rather than PASS WITH NOTES because four key character beats do not land on screen: Fish 3's introduction is half out of frame under a label that sits on the wrong fish, the fear beat is not acted, the "peeking eye" that makes the trick funny is invisible, and Fish 3's capture (the emotional climax) is played in the widest shot of the film. The last frame is also an empty river. No BLOCKER.

Blockers: none.

## Notes (most important first)

### 1. 32.2-36.0 s. MAJOR. Fish 3's portrait is off frame and the "No. 3" label sits on Fish 1
- What is wrong: during "أما الثالثة فلم تكن تفكر في الأخطار" the camera is on the rock with Fish 1 parked in the top-left corner. The `No. 3` label is drawn at a fixed screen position (`k7lbl(ctx, 'No. 3', 120, 140, ...)` in `src/main.js` line 18), which is directly on top of Fish 1. Fish 3 herself is cut in half by the right panel edge for the whole portrait (33.0-36.0), and the BONK! at 34.5 happens against the weeds and the frame edge, not against the rock. See `extra/A.jpg`, frames 3 and 4.
- Why it matters: this is the only introduction of the character who pays the price at the end. A viewer reads "No. 3 = the yellow fish" and never gets a clean look at the pink one. The planted payoff (c) in the plan (the rock she bonked is the rock that cannot hide her at 152.5) is lost because she never touches the rock.
- Fix: reframe the portrait so Fish 3 is the subject. Camera centre about 120-150 world units further right and slightly lower so the rock sits in the left third and Fish 3's whole path is inside the panel. Keep Fish 1 out of this shot (move her off the top-left or behind the camera edge from 32.2 to 36.0). Path: Fish 3 backstrokes right to left, eyes shut, from the weeds at 32.46 ("الثالثة") and her head meets the rock's right face exactly at 34.38 ("تفكر"): `impactSquash` on contact, BONK! and stars above the contact point, a 0.3 s rebound, then the unbothered smile and CAREFREE at 35.2. Anchor the `No. 3` label to the fish (above her dorsal, following her) or move it to the top-right; do the same check for `No. 1` and `No. 2` so each tag is nearer to its own fish than to any other.

### 2. 147.4-158.5 s. MAJOR. Fish 3's panic and capture are staged in a wide shot; her face is never seen
- What is wrong: the whole of S8 is held at zoom about 1.0. Fish 3 is roughly 60 px long on the 1080 frame. At 150.7-151.5 she is inside the weeds with four arrows and four red X marks piled on her, so the fish herself disappears (`extra/D.jpg`, frame 2). The wet-eyed look with the ? at 153.5-154.7 is a good drawing but is too small to register (frame 3). The hold on the empty pond with her bubble lasts only about 0.5 s (158.0-158.5) before the dissolve.
- Why it matters: this is the moral of the fable. The plan asks for "the smile is gone for the first time: eyes wide ... wet eyes". At phone size the audience sees a small pink dot moving about, then a bag.
- Fix (camera and timing, same events):
  - 147.4-149.4 keep the wide establishing shot with the net wall entering (it shows the trap).
  - 149.38 ("فسبحت") to 151.6 ("اتجاه"): follow her at zoom about 1.6. Show three clear bolts, one at a time, each ending in a single X that appears on impact and fades in 0.4 s: right to the barrier mesh (150.2), up to the surface where B's shadow is (150.7), down to the bed (151.2). No more than one arrow and one X on screen at once, and never on top of her body.
  - 151.66-152.9: the rock. Push to zoom about 2.0. She tries to squeeze into the dark opening and visibly does not fit (tail and half the body stick out, `sq` squash, a small wiggle). This pays off note 1.
  - 153.30 ("تختبئ") to 154.8: close-up at zoom 2.2-2.4 on her face: `eyes: 'open'`, `lid: 0`, `wet: 1`, `brow` raised and worried, `dorsal` flat, fins pulled in, `tremble`. The ? above her. The mesh slides into the frame behind her from the left during this hold.
  - 154.84 ("وقعت"): pull back to about 1.4 for the bag closing and the lift, as now.
  - Empty pond: start the hold earlier (lift completed by about 157.2) so the empty pond with the single rising bubble is on screen for at least 1.0 s before the dissolve at 158.5.

### 3. 131.7-141.4 s. MAJOR. The peek is invisible, so the float reads as "fish really is dead"
- What is wrong: the peeks at 132.8, 136.4 and 140.8 exist in code (`story.js` line 223) but use `lid = 0.8` for 0.55 s on a fish that is half hidden by the waterline, by fisherman A's feet and, at 136.4, competing with the DEAD? label. In every frame I pulled (132.8, 134.9, 136.3, 136.7, 140.8) the eye still reads as the shut X.
- Why it matters: the peek is what tells the audience she is alive and in control. It is the plan's main humour and suspense device for this scene ("the float where only one eyelid moves", "whose eye peeks behind his back"). Without it the FLIP at 143 is a surprise with no setup, and young viewers may think she died.
- Fix: make each peek unmistakable. Use `eyes: 'open'`, `lid: 0.35`, pupil sliding toward the men (`gaze` toward A/B, not straight up), hold 0.7-0.8 s, then snap shut. Time each one to a moment when the men look away: 132.8 (before they arrive; glance toward the footfall rings), 136.4 (while B pinches his nose and turns his head aside), 140.8 (after A's back turns). Add a small white glint/"blink" tick mark beside the eye on each peek. If the eye is still under 20 px at the current framing, add a circular inset close-up of her head (panel-in-panel, top-right of the animation area, away from the men) for the three peeks only. Also keep her head clear: no foot, net pole or label may overlap her eye from 132 to 141.

### 4. 132.5-137.2 s. MAJOR. Fisherman A stands on the fish; faces are covered at the DEAD? beat
- What is wrong: from 132.5 A's feet are planted directly over the floating fish's belly, so he appears to be standing on her (`extra/C.jpg` frame 2, `extra/F.jpg` frames 1-2). At 135.7-136.3 A's hand net is held across his own face. At 136.4-137.0 the DEAD? lettering touches A's head and sits between the two faces.
- Why it matters: the split-level staging depends on a clean line between bank and water; the overlap breaks it and hides the acting the plan asks for (prod, shrug, nose pinch).
- Fix: stop A about 90-110 world units further left so both men stand clear of the fish with open water between their feet and her. A leans (`tip`) and reaches the net out over her. Hold the net low and to the side (hoop below chest height) whenever he is not scooping. Put DEAD? above both heads with at least 30 px clearance, or over the fish. Make the three reactions sequential and readable: B prods (134.9), both look at each other (`gaze`), A `palmsUp` shrug at 136.30 ("ميتة"), B pinches his nose and turns his head away at 136.6.

### 5. 58.8-64.5 s. MAJOR. "وشعرت بالخوف" is not acted, and Fish 3 disappears behind Fish 2 for 8 s
- What is wrong: at 59-62 Fish 1 has a half-lidded, bored eye and Fish 3 a sleepy sideways look (`extra/F.jpg` frame 3). Only Fish 2 looks alarmed. At 62.0-62.5 Fish 3 slides behind Fish 2 and stays there until about 70.2; the two read as one odd two-coloured shape (`extra/B.jpg` frame 3) through the whole of Fish 1's speech.
- Why it matters: this is the inciting moment. The plan asks for "fear in three flavours". If the fish do not look afraid, the three different answers that follow have nothing to answer.
- Fix: on "سمعت" (58.82) all three freeze mid-stroke (`amp` 0) with gaze snapped up to the surface. On "وشعرت" (61.89), staggered 0.2 s apart: Fish 1 one sharp start, `lid: 0`, brow down, then still (controlled fear); Fish 2 pupils ping-pong, `tremble`, fins out; Fish 3 reacts last (0.5 s late), eyes pop open for the first time in the film, then she ducks toward Fish 2. Keep her at least half a body visible: tuck her below and behind Fish 2's tail with her whole face showing, not under Fish 2's body. From 64.7 separate the three so that Fish 1 faces two distinct listeners during "لن أنتظر عودتهما", and let the pointing arrow at 68.0-69.2 start beyond Fish 2's head instead of across it.

### 6. 168.6-171.9 s. MAJOR. The film ends on an empty river
- What is wrong: the two fish swim out of the right edge during the THE END hold; from 171.0 to 171.9 the frame is empty except for a sliver of yellow tail stuck on the right border (`extra/G.jpg` frame 1).
- Why it matters: the plan's ending is "the last picture is two fish, not three, in open water". That image is the moral; the current last second throws it away, and the clipped tail looks like an error.
- Fix: keep both fish inside the panel to the last frame. Let them drift right slowly (about 120 world units over the 3.3 s) at centre-right, side by side, Fish 1's long blink at 166.6 as planned, with a gap beside them where a third fish would be. Alternatively have the camera drift with them. THE END and ACT IN TIME stay where they are.

### 7. 144.0-146.7 s. MINOR. No reaction to the escape
- What is wrong: after SPLASH! fisherman A is cropped to a strip in the top-left corner for 2.5 s and the planned cap-throw at 145.28 cannot be seen (`extra/E.jpg` frame 2). The shot is just Fish 2 swimming.
- Why it matters: the gag needs its victim's face; it is the film's last laugh before the sad beat.
- Fix: hold the bank in frame for about 1 s after the splash (144.0-145.0): A whips round, `headHold` or arms out, mouth open, a "?!" above him, the empty net swinging. Then tilt down to follow Fish 2 away on "وسبحت بعيدًا" (145.3).

### 8. 100.4-103.1 s. MINOR. "السباحة واللعب" is too small, and PLAN? outstays its welcome
- What is wrong: the playing is shown in the widest shot; Fish 3's loop is a few pixels across. The PLAN? cloud stays on from 91.5 to about 104.3 (nearly 13 s) and at 99.7-100.2 it covers Fish 3's head.
- Why it matters: the contrast between worry and play is the point of the beat, and it sets up her being asleep in the weeds next morning (a nice touch at 104-107).
- Fix: stay at zoom about 1.5 on Fish 3 from 100.4 to 102.0 for one big readable loop and a bubble bounced on her nose, Fish 2 at the frame edge watching with the cloud; then pull out to the dusk wide shot for the last second before the card. Fade PLAN? out at about 96.5 and bring it back briefly at 100.4, or shrink it and keep it clear of Fish 3.

### 9. 84.7-88.5 s. MINOR. The "setting sun" irony does not read
- What is wrong: while Fish 2 says "we have until tomorrow", the sun slides into the top-right corner high in a full day-blue sky; it looks like midday. The sky only turns orange at 92.5.
- Why it matters: the plan's dramatic irony (she points at a sun that is already going down) is lost.
- Fix: from 84.7 place the sun low, touching the tree line and visibly sinking through "وقت حتى الغد" (86.14-87.82), with the sky already warming (start the dusk blend at about 85 instead of 92). A short arrow or her fin pointing at it on "الغد" would complete the gag.

### 10. 107.2-107.7 s. MINOR. Sky colour jump
- What is wrong: the dawn sky goes yellow, grey, then blue within about 0.5 s during the push-in on the men (107.2, 107.5, 107.7). It reads as a flash.
- Fix: either hold the yellow dawn sky through 110 and ease to blue over 2-3 s, or finish the blend before the camera move begins.

### 11. 1.2-3.0 s, 39.5-40.5 s, 45.2-47.7 s. MINOR. Crowded introductions
- What is wrong: in the opening count the three number bursts overlap each other and Fish 1 (`extra/A.jpg` frame 1); the same at 40.5. The fishermen's entrance (45.2-47.7) is played very small, B is hidden behind A from 46.5, and the TWO FISHERMEN arrow tip lands on A's face (`extra/B.jpg` frame 1), so the planned bump gag (B walks into A at 46.62) cannot be seen.
- Fix: space the three fish at least one body length apart for the counts and put each burst above its own fish with no overlap. For the entrance, start the push-in to the bank by 45.2 (the framing reached at 48.5), keep B a clear half-figure behind A until the bump, show the bump with an `impactSquash` on B and a head turn from A, and end the arrow above their heads.

### 12. Subtitles and small lettering. MINOR
- 48.3-54.0 s: the English line `ONE LOOKED INTO THE POND AND SAID, "LOOK AT THOSE FISH!` is set on one line and runs to within about 10 px of both caption borders (`extra/S.jpg`). Reduce the wrap width for the English so it breaks into two balanced lines like the other chunks (layout only; text unchanged).
- 13.1-20.9 s: the Arabic wraps with a single orphan word "يوم." on a third line. If the layout allows a balanced wrap (two even lines), use it; do not alter the text.
- Under-size lettering at phone scale: `HMM...` (30.2-30.7), `ZIP!` (71.2), `FREE` (164.5-165.0), `STAYS` at its first frames (88.7). Bring them to the 28 px label minimum or drop HMM... and FREE as the plan allows.
- 166.7-168.2 s: the old-pond thought cloud is too small to see that the pink fish is fading. Enlarge the cloud about 1.6x and draw the three fish larger inside it, the pink one going to an outline over 1 s.

## What works and should not be touched
- The stream squeeze and pull-out to THE WIDE RIVER (71.5-76.0) and SAFE with the crossed-out net (78.5-80.7).
- Staking the barrier and BLOCKED (110.7-113.2); the dash and BOING (114.3-118.5) echoing Fish 1's dash.
- The idea beat: memory cloud of Fish 3 floating, the "!", the smirk and blush (122.7-125.5).
- The roll onto her back (128.0-131.0), the scoop, carry and tip onto the grass, SO CLOSE!, FLIP! and SPLASH! (137.5-144.2).
- The restraint at the catch: no gloating, no harm shown. Family-friendly as it stands.
- NEXT MORNING... card (103.2-103.9) and Fish 3 asleep in the weeds at dawn.

## Reusable techniques worth adding to the Library
- Split-level cutaway set (`pondStream`): bank above, water in cross-section below, with one narrow connecting channel. Reusable for any pond, well or river story.
- Character-anchored tags: a `No. N` or name label that follows its character rather than a fixed screen corner (the fixed version caused note 1). Worth a small helper.
- "Play dead" pose preset for swimmers (`roll: 1, limp: 1, eyes: 'shut'`) plus a `peek(t0, dur)` helper that guarantees a minimum on-screen eye size (falls back to an inset close-up).
- Icon speech balloons (sun + TOMORROW!, net; two men crossed out) to show dialogue content without adding narration.
- Deformable mesh used as wall, barrier and bag (`fishingNet`).

Second review advice: Yes, a second Fable review of v2 is warranted, but it can be a short comparison review limited to 32-36 s, 58-70 s, 131-146 s, 147-159 s and 166-172 s. Notes 1, 2, 3 and 5 change camera framing, character paths and acting in the film's four most important beats, and re-staging of that kind can introduce new overlaps, off-frame characters or label collisions that only show in the rendered frames. The remaining notes are low risk and need no separate check.
