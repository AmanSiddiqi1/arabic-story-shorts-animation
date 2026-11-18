Verdict: REVISE

# AN-149 The Schoolmaster Who Fell in Love by Report: Fable review, round 1

Film reviewed: `Animations/AN-149/renders/AN-149_v1.mp4` (174.9 s). All 30 strips of `review/v1_pack/strips/` inspected in order, plus full-size detail frames in `review/v1_pack/extra/` (montages `m1.jpg` to `m7.jpg`, `cloud.jpg`, `subs.jpg`).

## Summary

The story is told in the right order, every event of the script is on screen, and the film has real charm: the 3/3 test, the three crossed-out relatives, the question-mark lady, the heart that stays on the teacher's turban, the pupils cheering when school shuts, the scholar rescuing the dropped book, the pupils playing ball outside the closed school at the end. Subtitles are large, correctly placed, in sync and readable in both languages; nothing sits in the caption third. Presentation is family friendly (death shown only as a plain marker).

It needs a v2 because the two images that carry the point of the story do not read yet:
1. the closing "tower on two songs" has a visible rendering artefact for 7 seconds and does not read as a tower;
2. the song balloon (which must show only "gone") contains a small headstone-shaped road marker, so the picture says the opposite of the narration "the song never said so".
The comic peak (the recoil at 99.8) is also thrown away in a wide shot. None of this needs new narration or timing; all fixes are staging, scale and prop changes inside the existing scenes.

No BLOCKER. 3 MAJOR, 9 MINOR.

## Notes (most important first)

### 1. 158.5-172.5 s, MAJOR: the moral image (tower on two songs) has an artefact and does not read
What is wrong (see `extra/cloud.jpg`, `extra/m7.jpg`):
- From 158.5 to 165.4 a cream "mist" patch sits on the cloud floor to the right of the mini teacher. It is a visibly different colour from the cloud, it covers the teacher's feet at 159-160, and bits of the hidden red and black notes show through its edges. On screen it looks like a rendering fault, and it gives away that something is hidden there (source: `sm_main.js` line 65, "the mist that hides the foundation").
- The "tower" is a grey marker sitting on a heart whose top is hidden by the marker's base, so the heart reads as a red funnel or spinning top. Heart = love is lost.
- The whole stack is about 150 px tall on a 1080 px frame, inside a cloud that is mostly empty. The reveal of the two notes at 165.4 is a tiny change at the bottom of it.
- "2 SONGS" is yellow lettering on the cream cloud band: low contrast, and at 172.5 THE END lands directly on top of it and against the SCHOOL sign.
- BOOK and LAMP icons (the payoff of the 40.98 / 42.40 setup) appear at 161.0 at about 50 px, pressed against the top edge of the cloud, and are gone by 162.4. The lamp is simply shown lit yellow, with nothing saying "judgment missing".

Why it matters: this is the last 14 seconds and the meaning of the story ("much learning, yet love and grief built on two lines of song"). A viewer should get it with the sound off.

Fix:
- Remove the mist patch completely. Hide the foundation by composition instead: until 165.40 (بيتين) draw the tower with its base below the cloud's lower edge (clip to the cloud shape), then slide the whole tower up about 90 units over 0.45 s so the two notes rise into view, with a small overshoot (`settleTo`). Nothing may cover the mini teacher.
- Build the tower from separate, fully visible pieces, each at least 110 px on screen: two notes side by side at the bottom (one black, one red, as now), a big red heart resting on them (lands on حبًا 163.44 with `landSquash`), the grey marker on top of the heart (lands on وحزنًا 164.16). Heart about 130 px wide, marker about 120 px wide and no wider than the heart, so the heart's lobes stay visible. Keep the gentle sway.
- Move the mini teacher and book stack to the left third of the cloud and shrink them slightly (books about 150 px tall) so the tower owns the right two thirds. Use the whole cloud height.
- "2 SONGS": put it in a white `label` box with black text (or yellow fill with a black outline at least 6 px) beside the notes with a short `arrow` to them; at least 44 px text height on the 1080 frame. Pop it at 165.6 as now.
- BOOK and LAMP: draw them about 100 px each, inside the cloud above the book stack and the teacher, from 160.90 (كثيرة) to 162.9. Green tick on the BOOK; on the LAMP the same red cross used at 42.7 (stamp it at 161.4) so the payoff matches the setup exactly.
- Topple at 171.6 as now (it works), but let the marker and heart fall to the right, away from the teacher, and keep the lady and donkey question (168.94, 170.84) in the upper right corner clear of the falling pieces.
- THE END: fade the "2 SONGS" label out at 172.3 and place THE END in the sky above the cloud or centred lower over the street wall (around panel y 760), not on the cloud's edge and not touching the SCHOOL sign.

### 2. 131.5-137.6 s and 146.6-150.2 s, MAJOR: the song balloon contains a headstone lookalike
What is wrong (`extra/m5.jpg` frames 2 and 3, `extra/m6.jpg` frames 1 and 2): the road in the singer's balloon ends in a small grey round-topped marker with a line on it. It has the same shape as the grave marker that rises in the teacher's cloud at 141.5 (where the small one is also still present beside the big one). So "THE SONG: GONE" already shows a little tombstone at the place where Umm Amr disappears.

Why it matters: the whole joke is that the song said only "gone" and the grave is the teacher's invention. The picture currently supports the teacher.

Fix: remove that marker from every copy of the song road (balloon 131.5-137.6, the cloud replay 139.96-141.5, the insert 146.6-150.2, and the closing cloud's donkey road if it uses the same drawing). If the horizon needs an end point, use something that cannot be read as a grave: a small palm, or a two-armed signpost. In the teacher's cloud the only stone must be the big marker that thumps up on ماتت 141.54.

### 3. 99.2-101.8 s, MAJOR: the comic peak is played small
What is wrong: the confession is held in a good close two-shot (94.2-99.5, zoom about 1.75). Exactly as the scholar recoils (99.7) the camera jumps back to the widest room framing, so the recoil, the open mouth and the look to camera are about a third of their previous size, and WHAT?! (about 60 px tall) sits on the bookshelf where it tangles with the book spines (`extra/m4.jpg` frame 1). The freeze and double blink before it (98.8-99.5) are there but are over quickly.

Why it matters: the plan calls this the comic peak of the present-day story; it is the laugh the film is built on.

Fix:
- Stay in the close two-shot until 101.1 (دهشة). Do the recoil inside it: at 99.22 `anticipate` 0.12 s toward the teacher, then throw the scholar back and left about 70 units with `tip` -0.14, `sq` 1.06, both hands up, brows at -1, mouth open, turban knocked crooked and left crooked until 107. Let the camera follow with a 6 to 8 % pull-back and the panel shake that is planned for 99.22.
- WHAT?! at about 150 px tall, yellow with black outline, in the clear wall area above and left of the scholar (not over the shelf or the window), 99.9 to 101.1.
- Look to camera on دهشة 101.10 for 0.6 s (`gaze [0, 0.05]`, one slow blink), still in the close shot; only then ease out to the wider framing for "HOW?" at 102.96.
- The teacher should react to the recoil: flinch 0.15 s late, eyes down, `lid` 0.6, hands clasped.

### 4. 146.6-150.2 s, MINOR (important): the SONG / GUESS comparison is small and tied to the wrong character
What is wrong (`extra/m6.jpg` frames 1 and 2): the two pictures are each about 400 x 280 px in the middle band of the panel, the lower 45 % of the panel is empty dark wall, and the dimmed singer stands under the right-hand picture so that "HIS GUESS: DEAD?" appears to belong to the singer. The singer's lute and head poke out from behind the label.

Fix: make this the flat insert the plan describes. Darken the street further (or use a plain blue Ben-Day field) and do not draw the singer or the fallen book under the pictures. Stack the two pictures vertically, each about 780 x 400 px: top "THE SONG: GONE" (lady on donkey trots off the road's end, dust, empty road), bottom "HIS GUESS: DEAD?" (the marker, red question mark stamped on تؤكد 148.82 with a small squash). Labels at their present size are fine. Put a small mini teacher bust (green, heart on turban) at the corner of the GUESS picture with the thought tail going to him. The singer can stroll across the very bottom edge at 149.56 if wanted, at full colour, not dimmed.

### 5. 107.7-112.5 s, MINOR (important): the flashback is not announced and opens with 4.5 s of nothing
What is wrong: after the match cut the frame is a held shot of the house with a small teacher reading at the window from 107.7 to 112.5; the ear cup at 111.0 is the only change. The corner dream wash is too faint to notice, so the only signal that this is the past is the teacher's green robe. The lower half of the frame is empty wall.

Fix:
- Add a caption box "EARLIER..." (style `label`, top left, same look as "2 DAYS LATER") from 107.9 to 110.6, and raise the dream wash strength (0.35 to about 0.6) so the corners are clearly vignetted for the whole flashback.
- Start closer on the window (zoom about 1.6 on the bust) from 107.7 so the reading, the page turn and the ear cup on سمع 110.80 are readable, then pull back and down on رجلًا 111.34 to reveal the street as the singer walks in. Bring the singer's first notes into frame at 111.3 (before he is visible) so the ear cup has a cause.

### 6. 116.8-120.0 s, MINOR: "UMM AMR" is hard to read; the singer exits as a grey cut-off figure
What is wrong (`extra/m4.jpg` frames 3 and 4): the name is red with a dark shadow over a dark red roof and dusk sky, about 35 px tall, and it slides behind the shutter. It is the only time her name is shown. From 118.5 to 120.2 (and again 138.5-139.7) the camera pushes in while the singer, dimmed to blue-grey, is cut off by the bottom edge of the panel with his head and a waving hand sticking up into frame.

Fix: letter UMM AMR in yellow with a black outline, at least 70 px tall on the 1080 frame, in the open sky above the roof line, held 116.84 to 119.4, never overlapping shutters or the window. For the singer: let him finish walking out of frame to the right at full colour before the push-in starts (he has from 117.9), or keep the push-in framed so its bottom edge is above his head. Do not dim him; a grey face reads as a different character.

### 7. 119.7-128.0 s, MINOR: the praising poet looks like the teacher
What is wrong (`extra/m5.jpg` frame 1): the poet in the cloud wears the same green robe as the teacher, floats tilted in mid-air and is cut by the cloud's left edge, so it reads as the teacher flying toward the lady.

Fix: give the poet a different costume and colour (for example `ascetic` or `villager` in blue or white), stand him upright on the same ground line as the pedestal, fully inside the cloud, bowing with the scroll held out (bow on يمدحونها 120.80). Then the lady rises with the glow as now (that part is good).

### 8. 32.6-43.2 s, MINOR: the BOOK / LAMP setup is small and brief; the real teacher is hidden
What is wrong (`extra/m1.jpg` frame 4): BOOK and LAMP are pressed against the top corners of the cloud, the LAMP arrives at 41.7 and its red cross at about 42.6, and the cloud is gone by 43.1, so the "no judgment" half of the idea is on screen for about half a second. Meanwhile the real teacher is cut by the right edge of the frame with a writing tablet held over his face for the whole 10 seconds.

Fix: draw BOOK and LAMP larger (about 110 px) and lower, on either side of the grey stereotype teacher. BOOK and tick on العلم 40.98 as now; LAMP on وحسن 41.66; cross on التفكير 42.40 with a small puff as the flame goes out; hold the finished cloud until 43.3 before the LATER wipe. Lower the real teacher's tablet (or shift the framing 60 units right) so his proud face is visible; the scholar's glance at him at 42.7 then has a target.

### 9. 64.3-69.6 s, MINOR: the "signs of grief" arrows are unlabeled and one seems to point at the scholar
What is wrong (`extra/m2.jpg` frame 3): three long yellow arrows sweep in from the floor between 66.9 and 69.3. One ends at the pile of handkerchiefs right beside the scholar's knees and reads as pointing at him. The teacher's tears (two single drops) are not noticeable against the black beard and robe.

Fix: push in to the teacher (zoom about 1.5) on ظهرت 66.90 and use three short arrows with small labels, one at a time: "TEARS" at the eyes (67.0), "BLACK ROBE" at the chest (67.6), "TISSUES" at the pile (68.3). Move the handkerchief pile to the teacher's far side (screen right), away from the scholar. Give him a steady `teardrops` stream on both cheeks at rate 3 or more from 66.9 to 69.5 with one slow sigh (`breathe`, then `tremble`) at 68.8.

### 10. 53.4-58.7 s and 70.4-77.7 s, MINOR: balloons empty or cramped
What is wrong: the neighbour's balloon is empty from 53.4 to 55.6 and then holds a house icon only about 110 px wide (`extra/m2.jpg` frame 1); the old woman at the upper window reads as a brown bearded man. In the scholar's question balloon the father is cut by the balloon's left edge and all figures are cut at the knees by its lower edge (`extra/m2.jpg` frame 4).

Fix: neighbour balloon: show the mini teacher bust on المعلم 54.64 as soon as the balloon opens, the house around him on بيته 55.60, the tear on حزين 56.22; make the picture fill about 70 % of the balloon. Give the upper-window neighbour the `oldWoman` head covering in a light colour so she is clearly a woman. Question balloon: enlarge it about 15 % and centre the three groups with at least 20 px clearance from the outline, feet visible.

### 11. 107.0-107.6 s and 46.5-58.7 s, MINOR: small staging slips
- 107.0-107.6: as the camera moves toward the window for the match cut, the scholar's HOW balloon slides off the left edge with the heart cut in half (`extra/m4.jpg` frame 2). Fade the balloon out by 106.9, before the move.
- 46.5-58.7: the scholar stands directly in front of the CLOSED board, so it reads "LOSED" or "OSED" for most of the scene. Stop him about 90 units further left so the whole board and the crossed planks stay visible; the knock at 49.26 can be a reach to the door frame.
- 141.8-142.2: the SOB! wail gets only 0.4 s before the whip pan. Start the wail at 141.54 (ماتت) and begin the whip pan at 142.45 so the head-back pose holds for about 0.9 s (فأغلق starts at 142.70).

### 12. 93.89 s, MINOR (for the coordinator, not the animator): English capitalisation
The English chunk at 93.89 starts "but the teacher admitted..." in lower case although the previous chunk ends with a full stop ("...many women in the world."). On screen it is all capitals (Bangers), so viewers will not see it; it only matters in `chunks_en.txt`. No change requested from the animator; subtitle text and timing must stay as they are unless the owner decides otherwise. All other English lines checked against the Arabic are accurate and readable.

## What works and should not be changed
- S2 test (12.7-22.5): tokens, ticks, 3 / 3 counter, the teacher's proud hand.
- VISIT counter with the wheeling window light (22.7-27).
- The three red crosses and NO! (79.6-82.3) and the mystery lady with the question-mark face (83.2 onward).
- The heart on the turban from 124.5 that survives the "2 DAYS LATER" cut, and its crack at 141.9.
- Lady on the donkey trotting out of the balloon with dust (133-136).
- Pupils cheering and running off at 144.5, the costume change inside the turn, and the pupils playing ball outside the closed school at the end.
- The scholar picking up the fallen book (153.2) and the nose blow at the window.
- Subtitle panel: size, placement, sync and colours are right throughout.

## Reusable techniques worth adding to the Library
- `iconBalloon` with sequential pictures and cross-out stamps (the three relatives): reusable for any "was it A, B or C? No" exchange.
- `mysteryFace` (question-mark face overlay) for an unseen or imagined person.
- Persistent emotion marker carried across a time cut (the turban heart), later broken.
- Rule to record in the guide: never hide a later reveal behind a colour-matched cover patch; clip to the cloud or balloon shape and slide the content in. Also: props inside "evidence" pictures must not share a silhouette with the thing being denied (the milestone versus the grave).

Second review advice: Yes, a short second Fable review of v2 is warranted. Notes 1, 2, 3 and 4 rebuild the film's ending, its central comparison and its comic peak, and note 1 replaces a hidden-reveal mechanism that already produced an artefact once; those four passages (99-102 s, 131-150 s, 156-175 s) should be looked at again as rendered frames. The rest are local and can be checked from stills.
