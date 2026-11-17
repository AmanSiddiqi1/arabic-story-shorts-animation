Verdict: REVISE

# AN-084 Ma'an and the Bedouin: Fable review, round 1 (v1 cloud render)

Reviewed: `renders/AN-084_v1.mp4` through all 30 strips of `review/v1_pack/strips/` plus 26 full-size frames in `review/v1_pack/extra/` (sheets `s1.jpg` .. `s7.jpg`). Narration, subtitle text and timing must stay exactly as they are; every fix below is staging, acting, camera or prop state only.

## What already works (keep)
- Story order is correct and complete; no wrong event, no missing beat, THE END held 175.6-178.6.
- Subtitles: Arabic and English readable in every frame checked, two lines at most, never covered, in sync with the chunk times. English is accurate to the Arabic. (Only nit, no action because text is frozen: the English of 85.53-89.60 ends with a comma where the Arabic ends with a full stop.)
- Tag hits land on the words: 1000 at 51.1, 500 at 57.9, 300/200/100/50/30 on 65.0/67.0/68.9/70.3/72.5; counter 1000 to 2180 follows the spoken sums in 164-171.
- Strong beats: the drought-to-green cloud (21.6-30.7), the faceless crowned silhouette with "PRINCE MA'AN" (31-40), the wink aside "SHH! HE IS THE PRINCE" (42.6-44.4), the eyes-shut "LAST PRICE" close-up (72.5-74.0), the cucumber and donkey mime balloons (93.9-95.6), the throne reveal pan (99.2-101), the donkey chewing the spear tassel with "READY!" (141.2-143.5), the slashes peeling off the row with "ALL OF THEM!" (158.9-162).
- Family-friendly throughout.

## Notes (most important first)

### 1. 172.3-178.6 MAJOR: the ending does not show him going home, and the final image is muddled
What is wrong: on "وعاد متعجبًا بثروة كبيرة" the Bedouin never leaves. Two money bags pop into his hands at 172.2 and sit **in front of his face** from 172.5 to the last frame (only the top of his keffiyeh shows). He stops in the doorway on top of the donkey's head and pressed against the guard, three figures in one clump. The whole coin pile stays on the hall floor, so it reads as if he took two bags and left the 2,180 dinars behind. The prince's cucumber is drawn over his mouth and beard as a green blob (174.7-178.6), so his face is lost too. The film's last 6 seconds hide both leads' faces.
Why it matters: this is the payoff of the whole story (hope rewarded, "amazed, with a great fortune"). The viewer must see his amazed face and see the fortune go with him.
Fix:
- 171.0-172.3 (on "دينارًا،"): drain the pile into what he carries. Animate `coinPile` fill 1 -> 0.12 while the donkey's panniers switch to the coin-filled basket variant (fill 0 -> 1) and the two bags inflate from sq 0.6 to 1 with `settleTo`. Leave a few stray coins on the floor only.
- Bags held at hip height, one per hand (hand targets about [-46, -70] and [46, -70] instead of chest/face height). Face fully visible: wet happy eyes (`wet: 1`), `mouth: 'open'` then `'smile'`, brows up.
- 172.34 "وعاد": he turns and goes with the bouncy `walk` (use `footfalls`) toward the arch; the guard lowers his arm, steps 70 units right of the arch and bows his head (`tip 0.1`) so the doorway is clear.
- 172.74 "متعجبًا": donkey ears snap straight up (`earL/earR`), it looks back at its own gold panniers; one `hop` of the Bedouin's with `landSquash` here.
- 173.8 "بثروة": donkey backs/turns out through the arch (flip `dir`, drawn outside behind the wall), Bedouin beside it framed alone inside the blue arch.
- 174.52 "كبيرة": he looks back to the lens from the doorway and raises one bag in salute; the prince answers with a raised hand. Prince holds the cucumber **beside** his cheek (hand about [58, -150]), a visible bite missing from its tip, `mouth: 'smile'` with a small chewing `sq` pulse; never over the face.
- Camera: stay on the door medium until 174.5, then the pull-out to the present end frame. In the held THE END frame the arch must contain only the Bedouin (face visible) and the donkey's gold-loaded rump or head, with a clear gap to the guard.
- Fade "2180 DINARS" by 173.8 so it does not sit over the doorway action.

### 2. 128.8-133.5 MAJOR: the recognition has no visible cause (the wink is off screen)
What is wrong: the prince's wink is coded at 130.3-130.75, but the camera is on the guard and the Bedouin then, so nobody sees it. The Bedouin jolts at 131.1 for no visible reason. The close-up of the prince that follows (131.85-133.5) shows a neutral, almost stern face (frame 132.2). The second wink at 134.4 happens in the wide shot at thumbnail size.
Why it matters: the plan's rule was that recognition must work without reading. It currently depends entirely on the subtitle and the later "THE SAME MAN!" label.
Fix (cuts on existing word times):
- 128.78-130.1: keep the Bedouin close shot with the travelling pupils (good).
- 130.13 "فجأة": cut to the prince close-up (the 132.0 framing). He repeats the desert aside exactly: finger to lips, `wink: 'R'` 130.3-130.8, corner smile. Use the same pose function as 42.64 so it is the identical gesture.
- 130.95: cut back to the Bedouin; jolt, `hop` and "!" at 131.08-131.85 as now.
- 131.85-133.5: prince close-up again, but now openly smiling (`mouth: 'smile'`, `lid 0.2`, shoulders `tremble`), a small "caught me" open-palm shrug at 132.8 "الأمير".
- 133.92 "الرجل": inset as now (see note 8 for its placement).

### 3. 147.1-150.4 MAJOR: "laughed so hard he leaned back" is barely seen and the face reads angry
What is wrong: in the medium shot (147.2-149.0) the prince sits upright with eyes shut, slanted brows and an open red mouth; it looks like shouting (frame 148.7). The actual tip backward starts at 149.0 exactly as the camera pulls out to the full hall, so the lean plays at tiny size for about 1 s, and the throne tilt of 6 degrees is not noticeable.
Why it matters: this is the emotional turn (the tease ends, two men laugh as equals) and it is the one physical action the narration names.
Fix:
- Laugh face: brows raised (`brow -0.4` or the style's happy brow), `lid 1` with curved happy lids if available, `mouth: 'open'` wide, head bob on `Math.abs(Math.sin(t*10))`, shoulders shaking, belly `sq` pulse. No angled brows.
- Hold the medium shot (prince + courtiers, the 148.7 framing, widened about 15% so the Bedouin's laughing face is fully in at the left) through 150.4. Move the pull-out to 150.4-151.2.
- 149.0 "مال": `anticipate` forward 0.1 s, then tip back to `tip -0.3` by 149.45 with the throne rotating about 14 degrees about its rear base, feet kicking up off the dais, crown sliding (offset the crown/turban if there is no field), then `rebound` at 150.0. Courtier A lunges both hands to catch the throne back at 149.3 (late, `stagger`), courtier B covers his mouth.
- "HA HA HA!" in this medium shot from 147.6, top right, clear of faces.
- The Bedouin laughs too (hands on belly, `tip -0.08`), so the shot shows both.

### 4. 58-90 and 119-157 MAJOR: struck tags are unreadable, and the ladder sits under the sun
What is wrong: once struck, each tag turns dark olive, is overlapped about 60% by the next tag and has a thick red slash, so 1000/500/300/200/100 become a murky ribbon (frames 70.5, 73.0, 84.5, 130.3). In the desert the top of the ladder is also drawn over the sun and its rays from 58 to 86. The 30 tag is the smallest object on screen.
Why it matters: the ending pays every sum on this ladder. The viewer has to keep seeing the seven numbers as a list of losses for the un-striking at 158.9 to land.
Fix:
- Struck state: keep the tag paper-yellow at about 75% brightness (no olive), digits black at full opacity, a thinner red slash (about 40% of the current width) that does not cover the digits' centre.
- Spacing: step the staircase so each tag overlaps the previous by at most 15% (about 58/50 per step at scale 0.7), or make it a clean vertical column on the outer edge (desert: right edge under the top border; hall: left edge) now that the faces are lower in frame.
- Desert: park the sun on the left third of the sky (or behind the far dune) from 50 s on, so nothing glows behind the tags.
- Draw the 30 tag at least at the size of the 200 tag once it is "LAST PRICE"; it is the story's key number.

### 5. 56.4-58.0 MAJOR: the first strike happens off screen
What is wrong: during the push-in for the gulp, the 1000 tag slides out through the top border (57.2-57.9); only its lower edge and the word "DINARS" remain, and the red slash on it is cut off. The 500 then appears in a different place when the camera returns (58.0-58.2).
Why it matters: this is the first step of the ladder and the film's first joke (the gulp, then half the price). The viewer should see the 1000 being struck and the 500 land under it.
Fix: draw the price tags in panel (screen) space, not world space, so camera moves never crop them; or limit the push so the tag stays fully inside the panel. Sequence in the real gap: gulp 57.52-57.9 (Adam's-apple `sq` dip, pupils to the tag), slash across 1000 at 57.9, 500 slams in below it at 57.94 with the 2-frame panel shake.

### 6. 89.7-175 MAJOR: the guard holds one arm straight out for 85 seconds
What is wrong: from his first frame to THE END the guard's left arm is extended horizontally to the right, in every shot (90.0, 97.2, 108, 126, 142, 156, 165, 177.5). When the Bedouin enters (96.7-98.5) that arm lies across the Bedouin's body and looks like a grab.
Why it matters: he is in most hall frames, often next to the lead; a frozen pointing arm makes the hall look like a still picture and blocks the Bedouin.
Fix: arm out only as an "enter" gesture 97.4-99.0 (after the Bedouin has stopped beside him, not across him), then down to hold the spear upright with both hands at rest. Give him the planned reactions as real poses: sideways look at the donkey mime 95.0-95.7, forehead slap 136.0-137.0 (it exists but is tiny; let the hand reach the brow), startled look and spear tug when the donkey chews the tassel 142.0-143.5, eyes following each falling tag 164-170. `breathe` and blinks otherwise.

### 7. 86.5-88.3 MINOR: the galloping horse rides through the donkey
What is wrong: horse and donkey stand nose to nose on the same line, so when Ma'an gallops off to the right the horse passes through the donkey and its rider (frames 87.5-87.7: Ma'an's head behind the donkey's ears, the horse's head in front of the Bedouin).
Fix: at 86.5 the horse rears (`rear`), swings onto a nearer lane (y + 34, scale + 6%, drawn in front) and gallops past in front of the donkey; the donkey flattens its ears and the Bedouin's keffiyeh tail and the cucumber leaves blow right for 0.5 s, then he turns his head to follow (`gazePlan`) and coughs in the dust. Make the far palace readable when "HIS PALACE" appears at 88.9: silhouette at least 90 px wide at panel scale with a dome and two towers, the arrow tip touching it.

### 8. 133.9-137.6 MINOR: the match-shot inset is laid over the tag ladder
What is wrong: the round desert inset and "THE SAME MAN!" sit on top of the tag staircase, which pokes out behind them, and the connecting arc crosses the 30 tag (frame 135.0).
Fix: hide the ladder (alpha 0) from 133.7 to 137.4, or place the inset top right above the courtiers. Enlarge the inset to about 1.3x and frame the prince closer (the 132.0 framing with the inset beside his head) so the two faces are the same size side by side; fire the paired wink at 134.4 in that framing.

### 9. 8.7-86 MINOR: the two mounts overlap for the whole desert act
What is wrong: in the standard two-shot the donkey's head and neck cover the horse's chest and forelegs, and the horse's head pokes out behind the donkey's ears (frames 12.0, 54.0, 70.5). It reads as one grey-and-white animal at phone size, and the 30 tag later floats between the two heads close to Ma'an's cheek.
Fix: move the donkey about 70 world units right (or the horse left) so the muzzles are 10-20 units apart, truly nose to nose; re-run `twoShot` on the new positions. Keep the nose-to-nose lurch at 11.86.

### 10. 77.3-79.2 MINOR: "NOT ONE LESS!" is run over by the thought cloud
What is wrong: the red lettering appears at 77.7 and the palace thought cloud grows over it at 78.5-79.2 (both top left), so for 0.7 s the words and the cloud's door are tangled.
Fix: bring the lettering in on "لن" 76.78, hold to 78.2, fade out by 78.4; start the cloud at 78.5 on a clear sky. Hide or shift the tag ladder where the cloud overlaps it (the cloud tail currently crosses the tags).

### 11. 89.7-91.6 MINOR: first palace frames
What is wrong: at 90.0 Ma'an's feet are splayed sideways in black shoes for a few frames (entry squash), and the "PRINCE MA'AN" label is cropped by the right border ("PRINCE MA'A") for its whole life, 90.2-91.6.
Fix: start him already settled (or use a normal `landSquash` with feet under the body); move the label about 90 px left so it is fully inside the panel, arrow to the crown. This label matters: it tells the viewer the crowned man is the hunter.

### 12. 158.9-164.2 and 111.5-112.0 MINOR: small prop slips
- Tag row: the 500 tag covers the last digit of the 1000 ("100(") from 159.0 to 164.2 (frame 160.0, 163.5). Space the row about 12% wider or shrink the 500, so all seven read cleanly; this is the "ALL OF THEM!" image.
- The basket jumps from the Bedouin's hands to the floor to the dais between 111.5 and 112.0. Let courtier A carry it up in an arc 111.3-112.2, or let the Bedouin step forward and place it.
- 107.2-109.7 "لم يعرفه": the shot shows only the guard and the Bedouin. Widen slightly or offset so the edge of the throne and the prince's straight face are in frame at the right, which makes "did not recognise him" visible.

## Reusable techniques worth adding to the Library
- **Screen-space overlay props**: a `priceTags`/counter layer drawn in panel coordinates so camera pushes never crop it (note 5). Add a "struck but legible" tag state as the default (note 4).
- **Setup/payoff pose function** `(t, t0)` used for two cues (the wink aside at 42.64 reused at 130.3): record it in the guide under humour and suspense as the standard way to build a recognition beat.
- **Thought cloud with a living scene** (drought to green wipe, the donkey strolling up the carpet): worth a guide example.
- **Carry heights**: a guide rule that anything held (bags, baskets, food) is anchored at hip or beside the cheek, never across the face.

Second review advice: Yes. Notes 1, 2 and 3 restage the three most important beats of the film (the ending, the recognition and the laugh) with new cuts and poses, and note 4 changes a prop that is on screen for about 70 s. A short comparison review of v2 focused on 56-58, 128-151 and 171-178.6 is warranted to confirm that faces are visible, the wink is seen, the lean reads and the fortune leaves with the Bedouin.
