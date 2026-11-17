Verdict: REVISE

# AN-001 The Bull and the Ass: Fable review, round 1 (v1 cloud render)

Reviewed: all 30 strips of `review/v1_pack/strips/` (4 fps, 0.0-179.0 s) plus 27 full-size frames pulled into `review/v1_pack/extra/` (montages `m_0.jpg`..`m_4.jpg`).

## Summary

The story is told correctly, in order, and in sync with the narration. No blockers: no wrong story event, the subtitles are verbatim and readable in both languages, the ending and THE END hold are present (film 179.25 s), and I found no broken frames. The best parts are the opening labels, the field time-lapse with the HOURS counter (102.3-104.8), the merchant planted in the window (56.7 onward) with its inset replay (87.6), the whip pan to the donkey (95.7), the right-to-left speech pictures in the butcher lie (136.7-143.1), and the cleaver punch-in (143.2).

It is REVISE because several key beats are lost to staging, not to drawing:

- The film sits at zoom 1.0 for most of the stable scenes, so the cast fills a band about a fifth of the panel high, over an empty floor. The plan's two-shot at zoom 1.3 (S4 = S13) was only partly built.
- The donkey's "mask off" beat, the plan cloud, the bull's thanks and the final image are all played at the widest framing, where faces do not read on a phone.
- The worker is drawn inside the animals twice.
- The film's main punch line (ME?!) is on screen for about 0.4 s.

All fixes below are camera keys, positions, draw order and holds. No new drawings are needed.

World reference used below (from the plan): post x 490-510, troughs at x 455 and 545, window x 440-560 / y 400-540, lantern (500, 330), stable door x 900-980.

## Notes

### 1. 147.1-152.8 (S16), MAJOR: the mask-off irony is staged in the widest shot of the scene

**What is wrong.** At 146.5 the camera pulls out to zoom 1.0 and stays there. The donkey's smirk while the bull is not looking (147.1), the mask back on (148.2), and the wink to the lens (151.9) all happen on a head about 60 px wide. At 151.95 the wink reads only as closed eyes. The thought cloud at 150.5 is small, and it shows a donkey figure lying in front of the yoked bull, which muddles the picture.

**Why it matters.** This is the line that explains the whole trick ("he did not know the donkey was saying this to get him back to work"). The audience must see the two faces of the donkey.

**Fix.**
- Do not pull out. Hold a tight two-shot from 146.8 to 152.6: `twoShot(bullHead, donkeyHead, {margin: 90})`, about `{x: 505, y: 700, zoom: 1.55}`.
- 147.12 (لم): the bull's gaze and head turn away to the left, toward the door picture he imagines, `tremble` still 3 px.
- 147.38 (يعرف): the donkey's brow relaxes, `mouth: 'smirk'`, `lid 0.45`, ears up, small head turn to the lens. Hold at least 20 frames.
- 148.22 (الحمار): the bull glances back. The donkey snaps to `brow -0.7`, ears down, 2 frames before the bull's eyes arrive.
- 150.46 (الكلام): thought cloud above the donkey, centred near (640, 470) in the tight frame, with the bull under the yoke at least 110 px on screen plus the green tick. Remove the donkey figure from inside the cloud.
- 151.94 (العمل): head turn to the lens, `wink` held 8 frames with a one-ear flick. The cloud is already gone.
- Start the sky sweep to night after 152.5, on the cut to S17.

### 2. 56.7-66.5 (S6), MAJOR: the plan cloud shrinks to a corner, so half the plan is unreadable

**What is wrong.** When the merchant slides into the window, the cloud drops to about 190 px wide in the top-left. Inside it:
- "food arrives, do not eat" (58.5-61.3) is a few-pixel yellow pile with a red X;
- the puzzled worker (63.4-64.7) is about 25 px tall;
- "they leave you to rest" (64.7-66.5) cannot be made out.

Before that (50.5-56.5) the cloud is big but the little bull fills only about a third of it.

**Why it matters.** S6 is 22 s in one set-up, and the plan flagged that it works only if the cloud reads on every word. The audience must understand the plan to enjoy its backfire.

**Fix.**
- Keep the cloud large and reframe the camera instead.
- 50.2-56.5: inner scale up about 1.5x so the little bull is at least 150 px on screen.
- 56.68 (after تقم): move the cloud left so its right edge is at x 420, clear of the window (centre about (270, 450), width about 330 world units, same inner scale). At the same time ease the camera over 0.5 s to about `{x: 400, y: 600, zoom: 1.5}`. The frame then holds cloud, window with merchant, and both animals' heads. The bodies may crop.
- Icons on their words, each at least 110 px:
  - trough arrives at 58.46 (يقدمون);
  - the little bull turns his head away with a red X at 60.32 (لا);
  - the worker with "?" at 63.42 (تستطيع);
  - the worker walks out of the cloud at 64.72 (ويتركونك);
  - the little bull smiles with ZZZ at 66.00 (ترتاح).
- Keep the real bull's eyes following the cloud. Keep the merchant's `cupEar` at 61.3. Give the merchant one slow blink and a moustache twitch about 63.0 so the eavesdrop is noticed.

### 3. 106.7-109.1 (S11) and 163.5-166.8 (S18), MAJOR: the worker is drawn inside the animal

**What is wrong.**
- 106.7-109.1: the worker stands behind the donkey at the same x. His head sits on the donkey's back and his feet show between the donkey's legs (see `extra/f_107.5.png`).
- 163.7-166.8: the same with the bull, worse. Cap above the bull's back, sash and feet under the belly, and the plough beam crossing both (see `extra/f_164.2.png`). The gag "the bull takes the yoke out of the worker's hands" (162.8) cannot be seen. The worker is left holding his face, and the yoke simply appears on the bull.

**Why it matters.** These are the two yoke beats that mirror each other (yoke off the ruined donkey, yoke taken up willingly by the bull). Both currently look like rendering errors.

**Fix.** Never let the worker share the animal's x.
- S11: the worker stands in front of the donkey's chest, about 120 units ahead of the head, facing him and drawn after the donkey. 108.76 (التعب): both hands lift the yoke up and off (`handLW`/`handRW` on the yoke ends). The donkey's neck drops a further step (`sag` up to 1) as the weight goes.
- S18:
  - 161.7: the worker enters from the door side holding the yoke in front of him in both hands (`shield`), about 140 units right of the bull's nose.
  - 162.82 (خرج): the bull steps forward and dips his head (`headDown`). The yoke transfers to his neck over 6 frames. The worker's empty hands stay in the air for 12 frames with `eyes: 'wide'`.
  - 163.5 (معه): the bull marches right. The worker jogs behind the bull's tail, at least 150 units behind the rump, never overlapping.

### 4. 114.4-123.0 (S13) and 133.0-143.1 (S15), MAJOR: the mirrored two-shot is at zoom 1.0, with heads piled on the post

**What is wrong.** The plan called for `{x: 500, y: 700, zoom: 1.3}`, mirroring S4. Both scenes play at zoom 1.0.
- In S13 the bull's head, the post, his horns and the donkey's head all overlap at x 470-560 (see 118.5). The happy trot and bounce (116.3) and the bow of thanks (118.4) are invisible. The donkey's "only the pupils move" (119.0) cannot be seen.
- In S15 the speech bubble is large but the pictures inside (merchant head, sick bull, sunrise) are about 50-80 px each, in a mostly empty balloon.

**Why it matters.** S13 is the comic heart of the film: sincere thanks delivered to the wrecked donkey. S15 is the lie. Both need faces.

**Fix.**
- S13: camera `{x: 500, y: 700, zoom: 1.35}` from 114.1.
  - The bull stops with his muzzle at x 430 or less, head clear of the post. The donkey's chin on the straw is at x 570 or more.
  - 116.28 (بفرح): two visible hops (`hop` 26 px, `sq` 1.06 on landing, `tailUp`).
  - 118.5 (شكرًا): a deep bow (`headDown` 0.8) held 10 frames.
  - 119.04-120.1: the donkey is frozen, `noBlink`, and only the pupils slide to the bull and back. No ear movement until the cat stretch at 122.0.
  - The "peaceful day" balloon at 120.8 is fine. Keep its tail from covering the bull's face.
- S15: camera zoom 1.3. Scale the three pictures and the gap between them about 1.7x so each is at least 120 px on screen. Keep the right-to-left order (merchant 136.68, sick bull 138.8, sunrise 141.04), since it matches the Arabic reading direction. The cleaver sign at 143.12 is good as it is.

### 5. 152.7-160.6 (S17), MAJOR: the donkey is half out of frame and under the bull's head for the whole morning scene

**What is wrong.** After the night sweep, the camera sits left of the stalls. The donkey is cropped by the right panel edge, and his head is overlapped by the bull's head and horns (see 159.1). The planned one-eye check at 159.04 cannot be seen. Also, at 153.7-155.7 the bull lies with his head down and eyes closed. He looks asleep, not "awake with one eye on the door".

**Why it matters.** The donkey watching his lie work is the payoff of S16. The bull's fear-driven eagerness is the joke.

**Fix.**
- Camera `{x: 500, y: 690, zoom: 1.2}`, both animals fully in frame.
- 154.06 (الصباح): the bull lies stiff with one eye wide open, pupil pinned toward the door (`gaze [1, 0]`), and a 2 px `tremble`.
- 155.5: `anticipate` crouch.
- 156.24 (نهض): the spring-up, landing with the muzzle at x 430 or less so his head is clear of the post.
- 158.04 (وأكل): CHOMP! with head bobs into the trough.
- 159.04 (طعامه): the donkey, lying in the clear at x 580 or more, opens one eye (`lid` 1 to 0.3) toward the bull for at least 12 frames, small smirk, then shuts it.
- 159.96 (كله): the trough shown empty, and the bull licks his nose.

### 6. 96.2-98.4 (S9 to S10), MAJOR: the punch line is cut off

**What is wrong.** The donkey freezes at 96.2, the hoof goes to his chest and ME?! appears at about 96.9, and the film cuts to the field at 97.4. ME?! is legible for about 0.4 s, and the cut lands in the middle of the word مكانه (96.92-97.71).

**Why it matters.** This is surprise number one of the film (smugness collapsing). It needs a beat to land, and there is a free silence until 98.67.

**Fix.**
- Move the cut to the field from 97.4 to 98.35.
- 96.38 (الحمار): freeze mid-chew, both ears straight up, `eyes: 'wide'`.
- 96.7: the barley drops from his mouth.
- 96.92 (مكانه): hoof to chest, ME?! pops and holds until 98.2.
- 97.4 and 97.6: the ears drop one after the other.
- 97.8: the bull's grin and one slow blink behind him.
- In the field, start with the yoke already going onto the donkey at 98.67 (ربط). Traces go taut at 99.72 (المحراث), and the hooves scrabble at 100.38 (بالحمار), as now.

### 7. 172.4-179.25 (S19 ending), MAJOR: the final image loses the bull and the donkey's expression

**What is wrong.**
- The pull-out ends at zoom 1.0. The donkey is small, mid-frame, over a third of the panel of empty floor.
- The rueful smile and ear salute at 174.7 read only as one ear sticking out.
- The bull in the window is about 30 px. He walks out of the window more than once, at 171.7-173.5 and again during the THE END hold. At 177.5 only a black plough handle remains in the window.

**Why it matters.** The plan's closing picture is "the donkey resting while the tiny bull ploughs above him", meaning respect, not revenge. On the last frame the bull is not there.

**Fix.**
- End framing about `{x: 560, y: 600, zoom: 1.3}`: window top-left, donkey bottom-right, floor trimmed.
- Draw the window bull and plough about 1.7x larger, at least 70 px on screen, with the worker behind.
- Time one slow crossing so he enters the window at 172.42 (after أنفاسه) and is still inside it, near its centre, from 176.3 to 179.25. Slow him to a crawl, or have him stop and plod in place, during the hold.
- 173.32 (جرب): the shudder and the plough-memory cloud as now. Clear the cloud by 174.5.
- 174.74 (عمل): the donkey lifts his eyes to the window (`lookAt` the window bull), half smile, one ear raised and dipped (the salute) over 14 frames.
- 176.0: eyes close, a long breath, ZZZ.
- Keep THE END top-right, clear of the window.

### 8. 163.5-166.9 (S18), MINOR: "went out to the field" is shown as ploughing the farmyard

**What is wrong.** The plough is hooked up and dragged across the yard in front of the merchant's house (165.0-166.7). There is no field.

**Why it matters.** It contradicts the narration and the geography set up in S2 and S10.

**Fix.** With the staging of note 3:
- the bull marches out of the right edge of frame at 164.42-165.08 (الحقل), worker jogging after with the plough over his shoulder;
- the camera holds the empty doorway for a few frames, with dust puffs;
- let the already-planned window view in S19 be the "back to ploughing" picture.
- If time allows, a 0.8 s cut to `ploughField` at 166.1 (الحرث) with the bull's first furrow would be better still.

### 9. 90.5-95.5 (S9) and 86.5-87.5 (S8), MINOR: the merchant's order plays wide, and the animal-speech bubbles are tiny

**What is wrong.**
- After the good push-in of S8, the camera returns to zoom 1.0 for 5 s. The merchant's raised finger (90.5) and the wave-off of the bull (93.9) are small gestures on small figures.
- The two animal speech bubbles that float to his ear at 86.5 are about 55 px.

**Fix.**
- Hold the S8 framing (zoom about 1.45 on merchant and worker) through 95.7.
- `pointUp` on 92.06 (التاجر).
- 94.5 (الثور): a flat-palm wave toward the stable.
- 95.95 (وخذ): `anticipate` 3 frames, then the arm snaps out with the whip pan along it, as now.
- Scale the animal bubbles 1.7x and let them arrive at the cupped ear on 86.5 (الحيوانات).

### 10. 109.2-110.7 (S12), MINOR: a cratered yellow disc sits on the yard fence

**What is wrong.** As the donkey hobbles in, a moon-like disc with dots rests at ground level behind the fence, between the trees (see 110.0). It looks like a wheel of cheese.

**Fix.** Put the dusk sun or moon in the sky (y 250 or less, as the set's `dayCycle` normally gives), or drop it for this shot.

### 11. Whole film (stable wides), MINOR: too much empty floor

**What is wrong.** The stable shots at zoom 1.0 give the bottom 30% of the panel to bare floor, and the cast sits in a band at y 640-900. Examples: 3.0-5.0, 23-31, 45-56, 67.7-78.2, 133-143.

**Fix.**
- Use zoom 1.0 only where the full set is the point: the opening pan at 1.7-5.0, the eavesdrop reveal, and the doorway.
- Make the working "wide" for stall scenes about `{x: 500, y: 660, zoom: 1.2}`.
- S7 (67.7-78.2) can stay static as planned, but at zoom 1.2. Shift the worker's mark so that he stands left of the bull's head for the horn heave (74.88), not on top of the post and trough cluster. His silhouette then reads against the wall.

### 12. 129.9-132.5 (S14), MINOR: the "way out" icons are ambiguous

**What is wrong.** A door icon and a plough icon appear over the donkey. They do not say who goes where.

**Fix.** Make it one small sequence in a single thought bubble: little bull, arrow, door, plough. Bull at 130.3 (كيف), arrow and door at 130.66 (يخرج), plough at 131.84 (الموقف). Then the ears rise and the smirk comes, as now.

## Subtitles

- The Arabic is verbatim and large. The English is accurate, in blue Bangers, and readable at phone size (checked at full size at 3.9, 118.5 and 147.5 s).
- One observation for the coordinator only, not for the animator: at 161.12-166.86 the English reads "When the worker came, he went out to the field and began plowing again." It drops معه ("with him") and leaves "he" ambiguous. I have not changed it.

## Reusable techniques worth adding to the Library

- **Right-to-left speech pictures.** A speech balloon whose pictures appear from right to left, on their words (136.7-143.1), matches the Arabic reading order. Worth a line in the Capabilities Guide, section 8 or 11.
- **Plant and replay.** A character slid into a set window, clipped by the wall hole (56.7), then replayed later in an inset circle (87.6). A good general pattern for dramatic irony.
- **HOURS counter with sun arc.** The counter, sun arc and accumulating furrow rows (102.3-104.8) make a compact time-lapse.
- **Rule to record.** Never give a person the same x as a quadruped. Stand him ahead of the chest or behind the tail (note 3). When a thought cloud must share the frame with something else, reframe the camera and do not shrink the cloud (note 2).

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1 to 7 change camera framing in about 60 s of the film, and they re-block two physical gags (the yoke hand-offs) and the final image. The new zooms can crop heads or balloons, and the re-timed punch line and ending need to be seen in motion. A short comparison review is enough, covering 45-67, 95-99, 105-123, 133-166 and 167-179.
