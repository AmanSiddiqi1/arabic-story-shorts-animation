Verdict: REVISE

# AN-099 Caliph al-Maamun and the Strange Scholar: Fable review, round 1

Reviewed: `renders/AN-099_v1.mp4` (172.47 s) through all 29 strips of `review/v1_pack/strips/` plus full-size frames in `review/v1_pack/extra/` (1.0, 38.6, 45.8, 53.6, 82.9, 90.6, 113.2, 116.8, 118.4, 119.4, 120.6, 121.6, 124.8, 133.6, 136.6, 140.6, 142.6, 145.6, 147.0, 150.8, 153.6, 158.3, 163.8, 166.8, 169.5, 171.5 s).

## What works (keep as is)
- The "ladder of honour" spine reads with the sound off: door (19 s), CLOSER! (61 s), CLOSER STILL! (79.5 s), BESIDE THE CALIPH (95.7 s). The shrinking floor arrow is a good device.
- The three wordless questions are clear and charming: the knot that tangles further at 40.5 and pulls straight at 50.7, the three wedges that click into one disc at 75.0, the balloon that grows to the width of the hall at 89.5 to 90.7.
- The snob thought cloud (robe = blank book with a moth, 27.7 to 31.5) and its payoff in the S13 icon row (robe crossed, coin crossed, lamp ticked, full book ticked, 133.5 to 138) are well timed to the words.
- Subtitles: Arabic verbatim, large and clean in every frame checked; English is accurate to the Arabic, two lines at most, readable, always inside the caption panel. No subtitle note.
- LATER card, 100,000 counter, sparse lettering all land on the right words. No broken frames, no narration or timing problem found.

No BLOCKER. REVISE because the three most important beats of the second half (the refusal, the moral, the last image) are the weakest staged, and each has a concrete fix.

## Notes (most important first)

### 1. 110.0-127.0 s, MAJOR: the cup sits at the stranger's lips for the whole refusal
What is wrong: from 111.5 the caliph holds the goblet at the stranger's face height, touching his cheek (113.2) and covering his chin and mouth (118.4, 119.4, 120.6, 121.6). At 119.4 the stranger's mouth is open right at the rim. The planned refusal acting (hand on chest and bow at 117.94, open palm stopping short of the cup at 120.06) is not readable: his hands stay in his lap behind the tray.
Why it matters: this is the story's turning point and the narration says "did not take the cup". On a phone it reads as the caliph feeding him the wine, or as him about to sip. It is also the family-friendly risk of the film.
Fix:
- Offer height: the cup stops at the stranger's chest height, on the centre line between the two bodies, with clear background (at least 25 world units) between the cup and his face and body at all times. Nothing ever overlaps his head.
- 111.6 (كأسًا): cup arrives at that position. 113.5 to 116.6: he is still, only pupils move cup -> caliph -> cup (already planned; make the gaze travel bigger, about 0.8).
- 116.64 nudge: 15 units toward him, still below his chin.
- 117.94 (اعتذر): `PERSON_HANDS.chest` on the near hand, `tip` about 0.08 forward as a small bow, `lid` 0.5, mouth `closed` or small `smile`. Not `o`/`open`.
- 120.06 (ولم يتناول): the other hand comes up as an upright open palm (`handLW` to a world point about 30 units short of the cup, between cup and chest), head `tip` slightly back and away from the cup. Hold to 122.2.
- 122.2: the caliph withdraws the cup 40 units toward himself before his brows fly up, so the gap between cup and guest visibly widens.
- Keep the tray, jug and small goblet low so they do not hide the stranger's hands (move the tray 40 units toward the caliph or lower it).

### 2. 109.7-154.7 s, MAJOR: the long two-shot wastes the lower 40 % of the panel
What is wrong: in every close shot of the meal (109.7 to 113.7, 117.0 to 138.5, 144.5 to 154.7) the faces sit in a band at 30 to 55 % of the panel height and the bottom 40 % is blank food cloth and floor tiles. The figures the scene depends on are about a third of the size they could be.
Why it matters: about 40 s of the film, including the refusal and the moral speech, is played smaller than necessary; expressions and hands are the content here.
Fix: frame the two-shot on the heads and hands, not on the floor. Camera centre about 110 to 130 world units higher in y and zoom about 2.6 to 2.8 (use `twoShot(stranger, caliph, {margin})`), so that the heads are in the upper-middle third, the cup and hands in the centre, and at most a thin strip of cloth shows at the bottom. S13 icons (note 9) then go in the top band above the heads. Keep the wider shots at 114.0 to 116.7 and 139 to 143.5 as they are.

### 3. 139.0-143.6 s, MAJOR: the "if I drink" thought cloud is too small to read
What is wrong: the cloud holds a miniature of the whole hall. The imagined stranger is about 45 px tall at 1080 wide; the sip (139.5), the lamp going out (140.4) and his wobble cannot be seen. The knot (141.0 on) is drawn across the cloud's scalloped top outline, so it reads as a scribble on the border. Only the slide back toward the door (142.2 to 143.5) registers, faintly.
Why it matters: this is the moral ("if I drink what takes away my mind, I ruin what raised me"). It is the one image the film must make unmistakable.
Fix: replace the miniature hall with three large, simple beats inside the same cloud, each filling most of the cloud:
- 139.5 (شربت): the imagined stranger as a bust (scale about 3x the current), cup at his own lips in his own hand. This is the only place a cup touches a mouth.
- 140.4 (يذهب) to 141.0 (عقلي): the lit lamp icon from S13, same drawing and same size as at 136.7, above his head; it goes dark with a small puff. Lids drop to 0.7, `tilt` wobble (already coded). Then the straight line from Q1 curls back into the knot, inside the cloud interior with clear margin from the outline.
- 142.04 (أفسدت) to 143.5: cut the cloud content to a simple strip: door arch at the left, throne at the right, the four seat marks, and the small figure sliding from seat D back to the door with a dashed arrow (the reverse of the FAR AWAY arrow at 19.8).
- 143.6: he bats the cloud away (keep).
Keep the real cup visible at the bottom of the frame as now.

### 4. 159.4-172.5 s, MAJOR: the exit and the last image do not deliver the planned ending
What is wrong:
- The whole exit plays in the widest shot; the stranger is small and is covered by the servant with the chest and the proud scholar at the door (163.8 to 169.0).
- The temple tap in the doorway (166.3) is a few pixels with a tiny lamp icon (166.8).
- He does not step out: he turns into a transparent ghost standing in the doorway (169.0 to 169.9, `P.alpha` in `a99_cast.js`), which looks like a render fault.
- The planned last image (the untouched full cup in the foreground with one glint) is missing. THE END is held on two scholars and the caliph with his hands on his hips; the full cup is half cut off by the right panel edge (171.5).
- The scholars' bows in turn (160.2 to 162.1) and the proud scholar's "lowest and longest bow" are not readable.
Why it matters: the ending should mirror the entrance (same door, now honoured) and close on the cup, which states the moral without words.
Fix:
- 159.67 to 162.1 (خرج الرجل مكرمًا): medium shot (zoom about 1.6) as he rises and bows to the caliph, then tracks left with him while the scholars rise and bow with `stagger(i)`; proud scholar `tip` at least 0.35, held longest. Keep the servant and chest behind him (to his right), never between him and the camera, never in front of the door.
- 162.26 to 165.2: wide for the walk to the door (mirror of 14.2 to 19.0), the caliph standing and waving at 162.84.
- 165.24 to 168.4: push to the doorway (zoom about 2.0) for the turn, the temple tap at 166.28 (بعقله) with the lamp icon at the S13 size, and the bow.
- 168.48: he walks out through the door with `walk()` (x continues past the arch edge, clipped by the door frame, or scale down slightly into the light). No alpha fade.
- 169.4 to 172.47: cut or pan to the planned final composition: the full goblet large in the right foreground, completely inside the panel, the empty doorway bright at the left, the caliph looking at the door; one glint on the cup with the existing 170.2 sound. THE END over the top band, not covering the cup.

### 5. 49.4-55.6 s, MAJOR: the first answer is played entirely in the widest shot
What is wrong: after the push-in for the raised hand, the answer itself (49.5 to 55.6) is the full hall. The stranger is about 60 px tall at the left edge with a long diagonal balloon tail; the three reasons counted on his fingers (52.98, 53.96, 54.90) are invisible and appear only as three tiny dashes under the line. The proud scholar's folded arms (54.9) cannot be seen.
Why it matters: this is the first time the overlooked man speaks; the audience should watch him, not a balloon across the room.
Fix: keep the wide for the knot pulling straight and the tick (50.3 to 52.0). At 52.4 (وشرح) cut to a medium on the stranger with the green and old scholars at the right edge (zoom about 1.8, as at 45.5). The three reasons appear as three clear numbered ticks beside him on أسبابه / بألفاظ / سهلة while he counts with `pointUp` fingers; the scholars' heads turn to him with `stagger`. CLEAR! stays at 55.0. Do the caliph's reaction at 55.7 as now.

### 6. 45.5-170 s, MAJOR (acting): the stranger looks worried or unhappy in most close shots
What is wrong: frown mouth and worried brows at the raised hand (45.8), on arriving at seat C (82.9), stepping up to the dais (95.0), through the meal, and while the caliph praises him (153.6). In several speech frames he has a wide `o` mouth with startled eyes (119.4, 133.6, 136.6).
Why it matters: the plan's arc is hopeful (S2), steady (S3), calm authority (S5 to S9), warmth (S10), plain conviction (S13, S14), dignity (S16). A permanently anxious face turns the hero into a victim and weakens the refusal.
Fix: from 43.6 on, default `mouth: 'closed'`, `brow` 0 to -0.1, `lid` 0.15. Small `smile` at each promotion (61.0, 80.5, 95.5), at the bread (99.9), at the shoulder clasp (150.66) and in the doorway (166.3). Speech uses `talk` with small amplitude, not `o`. Keep the worried brow only for the entrance (14 to 22) and the one held breath at the cup (113.5 to 117.9). Posture: head level by 59 s, upright by 79 s, as the plan says.

### 7. 76.9-79.2 s and 92.8-94.2 s, MAJOR: the caliph's invitations happen off screen or too small
What is wrong: at 76.95 (أشار الخليفة إليه أن يتقدم) the camera is on the four seated men; the caliph is out of frame until 79.2, and the stranger is already walking. At 92.86 (فدعاه المأمون للجلوس إلى جانبه) the pat on the honour cushion (92.3, 92.9) is a tiny motion in the full wide with the big balloon still up; the push to the dais only starts at 94.2.
Why it matters: each promotion is the caliph's decision. The cause should be seen before the effect.
Fix:
- 76.94: frame the right half of the hall (as at 79.5, zoom about 1.15) with the caliph in frame; `PERSON_HANDS.pointFwd` then a two-beat beckon on أشار / إليه; the stranger looks up at 77.4 and starts to rise at 77.9 (يتقدم), walk 78.3 to 80.0.
- 91.9: the wide balloon shrinks away by 92.5. At 92.86 cut to the dais two-shot (the 95.5 framing) for the two pats on فدعاه / المأمون, then the stranger enters frame from the left, hesitates (94.4), steps up and sits by 95.34. Label at 95.6 as now.

### 8. 80.4-84.6 s, MINOR: the proud scholar's cushion is unreadable
What is wrong: the offered cushion (82.68) and its acceptance (83.5) are a small dark-red shape between two small figures in a wide shot (82.9).
Why it matters: the plan calls his change of heart "the film's second story"; it is the emotional proof of "those who had ignored him".
Fix: after ALL EYES ON HIM has registered (81.0 to 82.2), push to a medium on the proud scholar and the stranger (zoom about 2.0) at 82.4. Proud scholar: eyes lowered (`lid` 0.6, gaze down), holds the cushion out with both hands (`handLW/handRW`) on يتجاهلونه (82.68); the stranger takes it with a small smile and a chest-hand nod at 83.5. Hold to 84.6.

### 9. 102.8-105.2 s and 133.5-138.5 s, MINOR: label and icon placement
- 102.8 to 104.0: GUEST OF HONOUR sits directly over the caliph's crown, so it labels the caliph. Move it above the stranger (about 120 units left) or add the style arrow pointing down at him.
- 104.2 to 105.2: the inset meant to show the empty spot by the door is a plain orange disc; it reads as a sun. Either draw it as a recognisable piece of the entrance (yellow arch edge, floor line, a dotted outline of the seated figure, no fill) or remove it and let the stranger glance toward the door on الغريب المنسي (104.12).
- 135.2 to 138.5: the crossed coin sits on the young scholar's turban, and the book icon touches the caliph's crown (137.5). With the tighter framing of note 2, put the four icons in one row in the top band above the stranger: robe X, coin X on the left, lamp tick, book tick on the right, none touching a head.

### 10. 0.5-3.3 s, MINOR: the title's first line is hidden
What is wrong: the plate "THE CALIPH AND" is three-quarters covered by the plate "THE STRANGE SCHOLAR" (frame 1.0); only the tops of the letters show.
Fix: give the two title lines separate rows (first line about 60 px higher) or one two-line plate, keeping clear of the caliph's crown. Check that the first line is fully legible at 1.0 s.

### 11. 146.5-150.5 s and 150.5-172 s, MINOR: stray goblets at the frame edges
What is wrong: when the scholars put their cups down (146.7 on), two goblets appear at the bottom-left edge of the close shot with no owner in frame, looking like floating props. The cup the caliph moves away (149.56) ends half outside the right edge of the close shot (150.8) and of the final shot (171.5).
Fix: with the tighter framing of note 2 the scholars' cups fall outside the shot; show them being set down in the wider shot at 144.0 instead. Place the moved-away full cup fully inside the frame (it is the film's last image, note 4).

### 12. 36.1-42.6 s, MINOR: only one scholar visibly fails
What is wrong: only the green (young) scholar gets a small tangled balloon (37.2 to 41.7) with a low-contrast grey HMM...; the proud and old scholars' attempts (planned at 35.9 and 38.4) do not read, so "some scholars could not answer" becomes one man.
Fix: three small balloons in turn with `stagger`: the proud scholar first and loudest at 36.1 (عجز), chin up, his balloon a bigger tangle; the young one at 37.4 (العلماء); the old one at 38.4 (الإجابة) opens an empty balloon, blinks and lets it pop (he forgot). The big knot tightens at 40.4 as now. HMM... in black on paper white so it reads.

## Technical observations
- No broken frames, flicker or missing drawings found. Walks keep the feet planted.
- Subtitle chunks change on the word starts listed in `narration.txt`; nothing overlaps the caption panel.
- The transparent stranger at 169.0 to 169.9 is intentional alpha in `a99_cast.js` but looks like a fault (note 4).

## Reusable techniques for the Library
- `answerBalloon` with icon content and a ? / tick badge (knot with `untie`, wedges to disc, growing wide balloon): a clean way to show questions and answers without inventing words. Worth moving to `Library/` after approval.
- "Ladder of honour" staging: a row of seat marks plus a shrinking dashed floor arrow and short labels to show rising status in one set.
- Rule worth adding to the guide: an offered object stops at chest height on the centre line between two front-facing figures and never overlaps the receiver's head; a refusal needs an upright palm between the object and the body.
- Rule worth adding to the guide: a thought cloud holds at most one large subject at a time; never a miniature of the whole set.

Second review advice: Yes. Notes 1 to 4 restage the refusal, the moral cloud and the ending, and notes 2 and 5 to 8 add new camera cuts; these are new compositions that cannot be judged from the v1 frames, and the cup-to-face distance in particular should be checked on rendered stills of 111 to 127 s before the film is finalized. A short comparison review of v2 limited to 49 to 56 s, 76 to 96 s and 109 to 172 s is enough.
