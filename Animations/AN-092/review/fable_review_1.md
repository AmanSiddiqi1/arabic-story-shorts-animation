Verdict: REVISE

# AN-092 Ali the Persian: Fable review, round 1 (v1 cloud render)

Reviewed: all 29 strips of `review/v1_pack/strips/` in order, plus full-size frames in `review/v1_pack/extra/` (2.0, 57.0, 57.3, 68.0, 90.0, 93.2, 95.0, 110.6, 122.6, 133.9, 135.6, 138.4, 143.5, 146.5, 153.7, 163.2, 164.8, 169.5 s).

## Summary

The story is told in the right order, every event is present, the ending holds, and no frame is broken. Subtitles are verbatim, in sync and readable in both languages. The pile-against-pile idea works and the tile icons (BAGHDAD, BASRA, lion, camels) read well at full size. Strong beats: the tug of war (39.5-40.6), Ali's shock and slow decision (74-79.5), the ENOUGH! collapse (96.9-98.2), the held lean-in over the open bag (120.6-124), the stranger's hopeful shrug with the bag and the rolling turban (142.7-144.7), the closing sleep.

It is REVISE and not PASS WITH NOTES because the two payoffs of the film are under-staged: the food reveal (the punchline of the tale) is small and half hidden, and the Caliph's laugh (the point of the frame story) is the quietest acting in the film, with HA HA HA! sitting over Ali instead of the Caliph. A planned comedy beat (the three sensible items) is also invisible because of draw order. No BLOCKER.

Do not change narration, subtitle text or timing. All fixes are staging, camera, draw order and acting.

## Notes (most important first)

### 1. 128.3-136.2, MAJOR: the food reveal is the punchline and it is the smallest thing on screen
What is wrong: in the insert the two claimants' heads fill the upper half, the judge's head is cut by the top of the panel (133.9), the lower 45% is the desk front and empty floor, and the food is four small items crowded on the right end of the red cloth: bread partly behind the bag, cheese a tiny wedge at the far right, olives at the cloth edge, and the lemon (135.4) landing behind the tipped bag where it is almost hidden. The counter badge sits on Ali's turban.
Why it matters: "only bread, a little cheese, olives and a lemon" is the anticlimax the whole tale builds to. The viewer must see four small, clear things against the memory of cities and armies.
Fix: make this a true table-top insert. From 128.3 move the camera so the red cloth top fills the middle of the panel (cloth top edge near panel y 600, zoom about 1.5 on the cloth; the men are cut at chest height with only chins and hands in frame, the judge is out of frame). Lay the items out in a row left to right in open cloth, each at least 110 px wide on screen, one per word: bread at 130.82, the pinch gesture at 131.44 then cheese at 132.76, olives at 133.52 (keep the one runaway), lemon at 135.44. Keep the bag at the far left of the row so nothing lands behind it; the lemon must bounce twice in clear cloth and roll toward the stranger's side. Move the counter badge to the open wall area top centre (never on a turban) and let it tick 1, 2, 3, 4 on the same words. Cut back up to the three faces only at 135.9 for THAT'S ALL! (stranger's jaw drop, Ali deadpan), then the wide at 136.22.

### 2. 144.9-152.4, MAJOR: the Caliph's laugh is underplayed and the lettering points at the wrong man
What is wrong: HA HA HA! (145.4-149.4) is placed top left, directly above Ali, while the Caliph is at the right edge, partly cropped (146.5), with closed eyes and a small round mouth. Ja'far stands dead centre between them. The worry scribble pop planned for the burst is not visible in any frame from 145.2 on. Read at phone size, it looks as if Ali or nobody in particular is laughing.
Why it matters: the Caliph could not sleep and asked to be made to laugh. This is the emotional answer to the first shot.
Fix: at 144.92 frame a `twoShot` of Ali and the Caliph with the Caliph fully inside the panel (shift the camera right about 150 px, or zoom out slightly). Hold the puffed, trembling beat 144.92-145.3 with the scribble still over his head, then on 145.3 burst: scribble pops in a `dustBurst` and is gone, big open mouth (`talk` high), head thrown back (tip -0.2 rocking at 2.5 Hz as planned but with twice the present amplitude), shoulders bouncing (`drop` pulses), arms up or slapping the diwan, tears (`wet`) at 148.16 with the smaller second wave. Put HA HA HA! above the Caliph (open wall right of centre, clear of his crown), and move Ja'far back to x about 470 or behind the diwan end so he does not stand between storyteller and listener; keep his behind-the-hand laugh at 147.0.

### 3. 56.1-58.4, MAJOR: the three "reasonable items" never appear (draw order)
What is wrong: on "يعدد أشياء معقولة" the stranger only lifts a hand; no cup, comb or cloth tile is visible (checked 57.0 and 57.3 at full size). In `src/a92_court.js` the `A92_SMALL` tiles are drawn at y 735, x 440-560 before the judge and the desk, so the judge's body and desk cover them completely.
Why it matters: the rule of three (three small sensible things that fit the bag, then tents) is what makes the first tent funny, and the narration says he "began listing reasonable items".
Fix: draw the three small tiles after the desk and the people, or move them to open wall beside the stranger (for example x 250, 320, 390 at y about 560, size 70 or more), one per beat at 56.12, 56.6, 57.0, each with a small pop-in and a finger count from the stranger. Keep the judge's approving nod and quill strokes. At 60.62 the first tent tile shoves them aside as planned.

### 4. 59.0-71.0 and 80.7-96.7, MAJOR: 27 s of one static wide shot with a third of the panel empty floor
What is wrong: in the court wide the figures are about 15% of the panel height, the lower 35% is bare checker floor, and the camera does not move while the piles grow. The tiles are readable at full size but small on a phone, and the acting that the plan relies on (the judge's frozen nod at 60.62, the stranger's smugness cracking tile by tile, the turban slip at 89.52) happens at a size where it barely registers.
Why it matters: this is the main comedy escalation. It needs to keep changing every 1-2 s.
Fix: keep the symmetrical wide only as bookends. Left list: at 59.24 push to a left two-thirds framing (stranger, his pile, the judge; zoom about 1.3, floor cropped to a thin strip) and tilt up with the pile as it grows from 60.62 to 69.32; cut once to the judge's frozen nod about 61.0 (0.6 s), and at 67.50 to the woman onlooker covering her mouth at the lion. Right list: at 83.2 mirror it (Ali, his pile, the judge) and tilt up through 87.86 BAGHDAD and 89.52 BASRA; give one 0.7 s reaction of the stranger at 90.16 (arms unfold, lids open) and one of the judge sinking at 93.46. Return to the full symmetrical wide at 96.0 so both piles are seen together for the tap on the chest, the slam and the collapse.

### 5. 136.2-140.8, MAJOR: the toss, the named action of the paragraph, plays in an extreme wide
What is wrong: at 136.2 the camera jumps to the widest framing of the film. The weigh, back-swing (137.74) and toss (138.02) are a few pixels of movement; the bag in flight is seen in one strip frame (138.2) and lands half hidden beside the desk. The stranger's look down and up at 139.18 is unreadable.
Why it matters: "ألقى علي الكيس أمام خصمه" is the resolution of the quarrel and Ali's last word.
Fix: frame Ali, the desk corner and the stranger at about zoom 1.4 from 136.22 to 139.9. Give the toss a clear arc in open space in front of the desk (`hop` path, peak above head height, 0.5 s), a `landSquash` and a small `dustBurst` at the stranger's shoes in clear floor, not against the desk. Hold 0.5 s on the stranger: eyes down to the bag, then up to Ali. Then widen as Ali dusts his hands and walks out (139.96) with the onlookers' heads following.

### 6. 141.8-144.2, MINOR: the judge's facepalm and look to camera do not read
What is wrong: at 143.5 the judge's hand goes up beside or behind his head and his eyes look sideways; there is no clear hand over the face and no stare into the lens. The plan's single look to camera (143.36) is missing in effect.
Why it matters: "leaving the judge to face the absurd dispute" is carried by this one reaction.
Fix: three clear looks 141.78-142.6 (door, bag, stranger), then at 143.36 `gaze = [0, 0.05]` straight to the lens with half lids, held 0.5 s with nothing else moving, then the palm drawn over the face in front of the head (hand target on the nose, drawn after the head), then the head drop and the turban roll at 144.24 (which already works).

### 7. 108.3-114.8, MINOR: the judge's two images are small and the balloon sits on his turban
What is wrong: the thought cloud's tail bubbles touch the turban and the cloud covers the frieze; inside, the bag as a sea is clear, but "300 FT..." is tiny and overlaps the bag outline (unreadable), and the bag as a hall (112-114.5) shows figures only a few pixels tall, so "a place where all people gather" is not legible.
Fix: raise the cloud so the tail clears the turban by 30 px or push the camera in on judge plus cloud (zoom about 1.25) for 108.3-114.8. Sea: drop the depth text or set it at 28 px or more outside the bag outline; let the anchor chain run out of the bottom of the bag and keep going. Hall: make the doorway about one third of the bag height and the queue of people at least 40 px tall, 5 or 6 of them walking in from the left, with heads popping out of the top at 113.66 as planned.

### 8. 92.4-96.7, MINOR: the "thousands of witnesses" are jammed against the ceiling
What is wrong: the crowd heads are drawn at y 8-70, over the roof beam and cut by the panel edge; the top soldiers tile and the stranger's "rooms" tile also overlap the beam and the red band. The marching soldiers (91.72) are a few pixels at the very top. At 95.0 the sunken judge's blue sleeves show on the red front cloth under the bag, which looks like a layering slip.
Fix: with the tighter right framing of note 4, give the crowd its own band on the open wall (for example between the piles above the arch, y 120-330, beside the 1000S counter), heads about 26 px, rows popping in from 92.44 and all hands up at 94.62. Lower both pile bases or shrink the top tile so nothing crosses the beam. For the sink at 93.46 show only turban and eyes above the upper desk; keep his arms behind the desk.

### 9. 20.3-24.0 and 150-155, MINOR: Ja'far stands between Ali and the Caliph, and the Caliph is cropped
What is wrong: when Ali enters and sits (20.5-22.7) the Caliph is half out of the right edge, and Ja'far stands centre frame facing us, so "sat before the caliph" shows Ali sitting before Ja'far. The same line-up returns at 150-152.
Fix: at 20.28 step Ja'far back toward the wall or to the far side of the diwan (he gestures Ali forward as he goes), and hold a two-shot that keeps the Caliph's whole head and crown in frame from 21.76 to 23.98; the Caliph leans in toward Ali at 22.62. For the gift (152.4-154.3) Ja'far may step in between them because he is the one carrying the purse; that part is fine.

### 10. 0.0-5.7, MINOR: the opening gags are too far away
What is wrong: for the first 3 s the Caliph is a small shape on the diwan in a wide hall (2.0 s frame); the eyes-wide (0.26), the turn (2.2) and the one eye popping open (3.44) cannot be seen until the push-in arrives at about 3 s. The clap at 5.5 reads as hands on his head.
Fix: open already at the 3.0 s framing (or reach it by 0.8 s) and keep the wide establishing for the last 0.5 s before Ja'far runs in. Make the clap two visible hand contacts in front of the chest with small impact lines, just before the existing effect at 5.3.

### 11. 155.3-166.6, MINOR: recap card items are small and float
What is wrong: the bag drops into an empty yellow card and sits small for 1.4 s (155.3-156.7); at 162.8-165 the four foods are tiny and hang in the air at belt height between the two men (163.2), with the cheese under the bag and the lemon as an outline; the ghost piles are faint on yellow.
Fix: scale the bag up about 1.6 for the solo beat; when it opens at 162.26 set the four foods in a clear arc above or in front of the bag at 70 px or more each, popping one after another from 162.84; raise the ghost piles' alpha so FALSE! FALSE! (164.44) is stamped on something visible, then crumble at 165.42.

### 12. Whole film, MINOR: caption line breaks and one lettering overlap
- Arabic lines leave single-word orphans on the second line in several chunks: 33.2-37.0 ("غريبة،"), 37.4-41.6 ("منه،"), 42.3-46.6 ("الحقيقي."), 92.4-96.7 ("ملكه."). Balance the wrap (two lines of similar length) without changing text or timing. The same applies to English orphans ("HIM,", "OWNER.", "HIS.", "GARDEN,", "LEMON.").
- 40.6-41.6: YOINK! overlaps the top of Ali's turban; move it to the open wall above the stranger's raised bag.
- 79.8-81.0: EVEN BIGGER! crosses the judge's desk edge and, after the cut wide at 80.7, floats over the judge's head; end it at the cut or place it on open wall.
- English checked against the Arabic chunk by chunk: accurate and natural; no changes needed.

## Reusable techniques worth adding to the Library
- `claimPile` with one tile per spoken word and a shared collapse time: effective for any list or boast; note in the guide that it needs a camera that follows the pile, not a fixed wide.
- The turban running gag (tilt, slip, straighten, roll off) as a patience meter for a straight man.
- The `worryScribble` mood meter over a head, shrinking as interest grows.
- Guide rule to add: overlay props that belong "in the air" of a set must be drawn after desks and seated figures, or placed on open wall (see note 3); and a punchline prop gets its own insert with the prop, not the faces, filling the frame (note 1).

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1, 2, 4 and 5 re-stage the two payoffs and re-frame about 40 s of the court with new camera moves and cutaways, which can introduce cropping, continuity and layering errors (bag position across cuts, tiles against the beam, lettering over faces) that only show in a render. A comparison pass limited to 56-60, 59-97, 128-153 would be enough.
