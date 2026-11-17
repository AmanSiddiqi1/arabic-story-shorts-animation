Verdict: REVISE

# KD-015 The Ascetic, the Ghee, and the Honey: Fable review, round 1

Reviewed: `renders/KD-015_v1.mp4` (171.1 s) through all 29 strips of `review/v1_pack/strips/` plus 25 full-size frames and four tiled detail sheets in `review/v1_pack/extra/` (`s1.png` to `s4.png`). Word times below are the final ones in `timing.json` (the same as `review/v1_pack/narration.txt`), not the planning `timeline.md`.

## Summary

The film tells the story in order and most of it works. The single-room idea reads well: the jar stays in frame over his head from 22 s, the cloud outgrows the room, the plumb line (26.0-27.2), the near miss (124.0), CRACK (135.6), the look up (137.2-139.2), SMASH with the dream bursting in the same frame (139.5), and the closing wide with the three crossed-out ghosts and the last drop are all there and clear. Subtitles are verbatim, large and readable in both languages at every sampled frame; the ending holds 3 s. No broken frames, no blockers.

It needs a v2 for three reasons, all in the payoff: (1) the raise and the swing of the stick are keyed to stale plan times and play about 1 to 1.4 s before the words that describe them, leaving 3.6 s of a frozen pose under the film's key sentence; (2) the swing does not pass through the imaginary son, so the story's central joke is not staged; (3) the ghee and honey are drawn as rigid vertical bars from turban to floor, which reads as a cage, not as a spill. The rest are legibility and acting improvements.

Cause of (1): the scene hard-codes times from `planning/inputs/timeline.md`. In that file a word's start often includes the pause before it. The final word times differ by 0.3 to 1.4 s on 26 words. Most differences are harmless (the action leads the word by under 0.5 s). The ones that matter are listed in notes 1 and 9.

## Notes

### 1. 125.7-133.7 s, MAJOR: the raise and the swing are out of sync with the narration
What is wrong: the raise runs 125.68-127.6 (code: `k15e(t, 125.68, 1.9)`), but "رفع" is spoken at 127.08 (the audio is silent 125.7-127.14, and the caption panel is empty for that time). The swing and SWISH! fire at 129.12, but "وضرب" is spoken at 130.10 (silence 129.14-130.15). Result: he swings while the caption still reads "He raised the stick", and then stands frozen with the stick on the floor from 129.6 to 133.7 while the narrator says "and swung it as though striking his imaginary son".
Why it matters: this is the sentence the whole film has built towards, and the picture has nothing happening under it.
Fix (re-key to the real words, keep every later cue):
- 125.7-127.0: hold the thrust pose from 125.10, breathing hard (`tremble`), eyes locked on the boy. No raise yet.
- 127.08 ("رفع") to 128.44 ("الهواء"): the slow raise, 1.4 s. Tip quiver and the red dotted tip-to-jar line from 128.0 to 130.0. The boy's tongue and wink 128.6-130.0.
- 129.14-130.10 (silence): hold at the top, a 0.25 s `anticipate` dip just before 130.10.
- 130.10 ("وضرب"): the swing, 0.36 s, SWISH! 130.10-130.95, whoosh effect inside 129.3-130.0 only if it stays clear of the words, otherwise drop it.
- 130.5-132.3: the picture ripples and re-forms (currently 129.3-131.1).
- 131.98 ("يضرب") label IMAGINARY SON as now; keep it up until 133.7.
- 133.04-133.74 ("الخيالي"): the two-handed crouch, so the upswing on "لكن" (134.42) starts from a fresh pose. Leave 134.42 onwards as it is.

### 2. 129.1-131.1 s (130.1-132.3 after note 1), MAJOR: the swing never touches the picture of the son
What is wrong: the stick comes down from over his shoulder to the floor at lower right (frames 129.35, 129.5 in `extra/s2.png`). The boy floats 250 px higher in the cloud and is never crossed by the stick; he only wobbles a little afterwards.
Why it matters: the plan's joke is that the blow passes through a picture and does nothing. As drawn, it looks like he hit the floor.
Fix: aim the swing at the boy. Either lower the boy and the dream father for this beat to about the height of the man's raised hand (cloud-local move starting 126.5, 0.6 s, `settleTo`), or make the swing a diagonal from upper left to right that ends with the stick tip beyond the boy at shoulder height. The stick must visibly overlap the boy for 2 to 3 frames. On the overlap frame split the boy into two halves offset 12 px along the stick line (or draw him at alpha 0.4 with a `ripple` ring from the crossing point), then let the halves slide back together over 0.5 s and have him open one eye and grin. Put SWISH! on the far side of the boy, not on the dream father's face (it covers his head at 129.2-129.6 now).

### 3. 144.0-171.1 s, MAJOR: the spill reads as yellow bars, not ghee and honey
What is wrong: from SPLAT on, the goo is a flat yellow cap on the turban with six straight, parallel, equal-width strips that run in front of his eyes, beard and robe all the way to the floor, and the floor puddle has spikes that hang below the floor line into the ground band (frames 144.2, 148.5, 161.4 in `extra/s3.png`, `s4.png`). The strips hide his eyes in the close shots, which are the only acting in S8.
Why it matters: "ghee and honey dripped from his hair" is the comic and sad image of the ending, and his stunned eyes carry the regret.
Fix in `k15goo` / `k15drips`:
- Cap: an irregular blob with a scalloped lower edge that follows the turban, two tones (ghee yellow `#ffd21f` on top, honey amber below), with one glint.
- Runs: 4 or 5 of unequal length and width, tapering, each ending in a round bead; keep them on the turban edge, the cheeks beside the eyes, the beard and the shoulders. None across the eyes or mouth. The longest stops at the chest.
- Robe: 3 or 4 blotches and short streaks (yellow and amber) instead of full-height stripes.
- Drips: separate drops that form at a bead, stretch, fall with `fallY` and land with a small ring; yellow at 149.88 ("والسمن"), amber at 150.54 ("والعسل"), then one every 0.6 s until 153.0.
- Puddle: a flat two-tone ellipse on the mat with no downward spikes; it must end at the floor line.
- The blob that falls 141.7-143.9 is good; give the hit at 144.04 an `impactSquash` (`sq 0.88`) and a ring of 6 to 8 drops that fly out and fall, instead of the hook marks above the head.

### 4. 42.5-80.5 s, MAJOR: the dream is small inside a large empty cloud, and the herd is a tangle
What is wrong: the cloud is about 900 px wide and 500 px tall on screen, but its contents sit in one thin band. The dream self is about 110 px tall and the sheaves, sacks and loaves 40 to 60 px (frame 67.2); the first three goats are thin white outlines on cream (frame 49.8). At 51.7-58.5 goats, kids and cows are stacked on top of each other so that no animal can be counted, and the two cows are lost among the goats (frame 57.3). The field is a short green roll under the pile.
Why it matters: 38 s of the film happen inside the cloud. On a phone the viewer should be able to read goats, then more goats, then cows, then a field, then harvest, at a glance.
Fix:
- Scale the cloud contents by about 1.5 (dream self at least 160 px on screen, goats about 150 px long) and move the ground line of the dream down to use the lower third of the cloud; keep at most four pictograms at a time.
- Goats: give them a fill that separates from the paper (the brown patch larger, or a light grey body with a 5 px outline).
- Herd growth at 51.64 ("ويكبر") and 52.22 ("القطيع"): two rows with clear spacing (back row smaller and higher), no overlap of heads; GOATS counter as now.
- 53.78 ("أبيع"): half of the goats trot out to the right before the cows arrive, so that at 55.88 ("أبقارًا") the two cows drop into clear space, larger than the goats, with black patches and one lazy blink each.
- 56.80 ("وحقلًا") to 57.58 ("واسعًا"): the field should unroll under everything and run on past the cloud edge, with the animals standing on it in a row.
- The sheaves at 66.5-67.7 read as yellow goblets. Draw them as bundles: a fan of 5 to 7 stalks with ears at the top, tied in the middle, or stand three in a stook.

### 5. 6.0-14.7 s, MAJOR: the saving of the leftovers is hidden and the pour does not read
What is wrong: in S1 he stands in front of the low jar for eight seconds, so half of the jar is behind his shoulder, including when the CLAY JAR label points at it (13.0-14.2). At 11.2-12.6 he lifts a bowl beside the rope above the jar; there is no stream, the bowl is not over the jar's mouth and the fill window stays white (frames 11.6, 12.4 in `extra/s1.png`).
Why it matters: this is the setup of the whole story (he saves a little every day in that jar). The viewer must see the food go in.
Fix: stand him one body width to the right of the jar (jar fully visible, his near hand at the jar's mouth). On "ويضع" (11.38) tip the ghee bowl over the mouth with a short yellow stream for 0.5 s, on "الباقي" (11.88) the honey bowl with an amber stream; the fill window gains a thin yellow band, then an amber one; the jar dips and swings on each pour as planned. Use `handLW` to put the hand at the jar mouth. Keep the single stomach pat at 9.0-10.4.

### 6. 29.2-32.9 s, MINOR: "He looked at it and said" has no pointing or reaching for the jar
What is wrong: during the speech one arm sticks out sideways and the other hand goes to his head (29.5-31.2); it reads as a shrug or a scratch. The plan asked for a look up and a point.
Why it matters: this is the moment his appetite starts; the gesture should connect him to the jar.
Fix: gaze up at the jar from 28.13 ("نظر"), head `tilt` back a little; on "«كم" (30.43) `PERSON_HANDS.pointUp` towards the jar with the near hand and a bounce on "السمن" (31.54) and "والعسل" (32.10) in time with the yellow and amber glints; the other hand on his chest. Mouth open on the words, eyebrows raised.

### 7. 86.2-105.0 s, MINOR: the old house is parked as a tiny shelf behind the jar rope
What is wrong: at 86.2-87.0 the house and field shrink into the upper left corner of the cloud and stay there as a 60 px house on a green strip, cut by the wall post and crossed by the jar's rope (frame 92.5), until the pop at 105.0.
Why it matters: it is unreadable clutter next to the most important prop.
Fix: either fade it out by 87.5, or keep it clearly as "his estate" at about twice the size in the upper right of the cloud, clear of the rope, post and the family.

### 8. 160.3-164.2 s, MINOR: the three ghosts are small and the field ghost is behind the post
What is wrong: the coin pile, goat and field are about 60 px each in a strip under the roof beam; the field ghost and its X sit on the right wall post (frame 163.8).
Why it matters: "no money, no goats, no field" replays the dream in four seconds; it is the moral and should be easy to read.
Fix: draw the ghosts about 1.6 times larger in the empty wall between the rope and the window (the upper right area where the first cloud appeared at 33.6), spaced 150 px apart, all clear of the post and window. X on "مال" (161.16), "ماعز" (162.16), "حقل" (163.44) as now; his head sinks a little on each X and his gaze goes to each one (`gazePlan`). Leave each crossed ghost on screen until 164.2 instead of popping it after 0.8 s, then fade all three together.

### 9. 104.6-116.3 s, MINOR: small timing and label fixes in the turn
- The palace and crowd pop at 105.0, inside the silence 104.47-105.97, and the cloud turns blue before "ثم" (105.91). Move the pop and the colour change to 105.9-106.3 so the narrator's "Then" causes the turn.
- NOT REAL (115.0-116.0) is cut by the right panel border and its arrow runs along the border (frame 115.3). Move the label left to about x 600-760 and keep the arrow pointing at the boy.
- REAL JAR (137.0-139.3) sits on top of the boy at the right edge. Put it at the left of the jar or below the boy so that IMAGINARY SON and REAL JAR can be compared.
- The anger flush (111.7-136.7) is a field of red dots and rings over the whole face, which up close reads as a rash (frame 112.6). Limit the flush to cheeks and forehead, or use a flat red tint with the V brows and steam doing the work.

### 10. 42.5-58.0 and 63.5-80.5 s, MINOR: the dreamer himself is nearly static in the corner
What is wrong: he is cropped at the chest in the lower left with hands on his knees for most of 32 s; the planned mirroring (arms wide on "واسعًا", two stomach pats on "طعام", hands on hips on "غني") happens only once (57.7-58.5, arms out).
Why it matters: the comedy is a small man acting out a big dream; his reactions keep the real room alive under the cloud.
Fix: frame him from the waist up (shift the camera 60 to 80 units down, the cloud has spare room at the top). Add: counting on fingers at 44.2-46.5; a nod per GOATS counter step (51.64, 52.22); two stomach pats on "طعام" (69.42); a chin stroke on "أثاثًا" (74.58); chest out and `hipsHands` on "غني" (79.28) at the same frame as the dream self; eyes closed and rocking (`breathe`) between lines.

### 11. 145.6-159.3 s, MINOR: S8 acting is one held face
What is wrong: after he sits (146.5) the mouth stays in the same "o" for about eight seconds, and the stick lies on the floor while the narration ends with "the stick in his hand" (he does pick it up at 157.7, which is good).
Fix: 147.2-149.5 two slow blinks as planned, then the mouth closes to a small flat line; on "نظر" (154.16) the head drops and the gaze goes to the shards, brows up in the middle (sad, not angry), `wet: 0.5`; on "ثم" (157.31) he lifts the stick and looks at it, the shoulders drop on "يده" (158.76), and he lets it fall in the pause 159.3-160.0 with one small clatter effect inside that pause. Keep the last drop and the cross-eyed look at 167.0; add one long exhale (shoulders down, `sq 0.97`) at 167.8-168.6 before THE END settles.

### 12. Whole film, MINOR: information for the coordinator (no change requested here)
- English, 127.08-129.12: "He raised the stick" leaves out "في الهواء" (in the air). Everything else in the English is accurate and natural. Subtitle text and timing are not to be changed by the animator.
- The caption panel is empty 125.7-127.08 and 129.12-130.10 because nothing is spoken there; that is correct once note 1 puts the action under the words.
- THE END label covers the centre of the roof beam (168.5-171.1). Acceptable; the upper right wall (where the dream was) would match the plan better.

## What works and should not be changed
- The single set with the jar always over his head, the dusk palette and the plumb line.
- The cloud growing in steps on "يكبر كل لحظة" (80.5-83.7) until it fills the room, with the roof beam and posts in front of it.
- The costume change and RICH! (78.7-80.2), the family and the slate lesson (89.7-98.9), the boy's NO! (109.2-110.2) and folded arms.
- The blind grope for the stick with the STICK label (116.3-118.2).
- CRACK flash, the crawling crack, the look up (135.5-139.2), the cut wide for SMASH with the dream bursting into dots, and the hanging blob.
- The final wide with the swinging stub of the jar and the arrow to it on "اختفى".

## Reusable techniques for the Library
- Dream that outgrows the room: a `thoughtCloud` keyed in stages whose box ends larger than the set, with the set's beam and posts drawn in front. Worth a guide entry with the stage boxes used here.
- Dream and real object destroyed in the same frame: jar shards and the cloud's burst dots share one start time and one seeded generator.
- Plumb line: a dotted line from a hanging danger to the head below it, shown once early, then never again.
- Ghost recap: three pictograms of lost things crossed out on their words. Should become a small helper (`ghostList(items, times)`) once the size and placement are fixed (note 8).
- Rule for the guide: key actions with the final word times from `timing.json` (or `w(p, n)`), never from `planning/inputs/timeline.md`, whose word starts can include the preceding pause (up to 1.4 s in this film).
- After the fix in note 3, the goo set (cap, runs with beads, falling drops, flat puddle) should move to `Library/` as `gooSpill` with a `goo` overlay for `person`.

Second review advice: Yes, a short second Fable review of v2 is warranted, limited to 125-171 s (the raise, swing, crack, spill and aftermath) and 42-80 s (dream legibility). Notes 1 to 3 change the timing and drawing of the film's climax and payoff, and the swing through the boy and the new goo are new drawings that can only be judged in motion. If only notes 6 to 12 are done, no second review is needed.
