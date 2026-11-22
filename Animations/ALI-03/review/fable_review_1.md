# ALI-03 "The Marked Door" (80s Cel Anime): Fable review, round 1 (v1)

Film reviewed: `Animations/ALI-03/renders/ALI-03_v1.mp4` (147.5 s). Sources: all 25 contact strips in `review/v1_pack/strips/` (4 frames per second), 57 panel stills pulled from the MP4 at the moments cited below (9 of them at native resolution), and a frame-difference scan of the panel (10 fps) for frozen stretches. Times are seconds on the film.

Not checked: sound was not listened to; stepped cel timing (twos and threes), winks, landing squash and follow-through fall between sampled frames and cannot be judged from stills.

## Verdict: REVISE

One BLOCKER (note 1): for the whole last shot, 142.3-147.5, the red dot of door 3 is drawn on top of Ali Baba's face as he stands in his open doorway. It is the longest-held picture of the film and the cliffhanger.

Everything else is in order: every narrated event is on screen and in sequence, subtitles are sharp and complete in both languages, TO BE CONTINUED is present, no other broken frames. The film is close. It is REVISE rather than PASS WITH NOTES because of the blocker and because four story beats are weaker than they should be for reasons confined to single shots: Morgiana's window beat is too small to read (note 2), WHICH DOOR?! is asked with no marked door in the frame (note 3), the second night is the same picture as the first (note 4), and the oil jars read as wicker baskets (note 5).

## The owner's points, as seen on screen

| Owner point | Met? | Evidence |
|---|---|---|
| Wide views, pans | **Yes** | Glade crane 0-6, market pan 7-17, street tilt 17, Morgiana's walk 35.5-41, her eyeline pan 46-47.4, marking run 59.6-64, reveal pan 70.2-74, sweep 129.6-130.6, caravan 138-141. Close-ups only at peaks (chalk hand, her eyes, brush, leader's eyes, ringed fist). |
| Full scenes | **Yes** | Street: five coloured houses, shutters, awnings, lanterns, washing, geraniums, pots, palms, cat, tufts, flowers, stones. Market: stalls, skyline, dome, birds. The market floor is a large plain brick field (note 12). |
| Varied bright colour, no tint | **Mostly** | Day, both nights, afternoon and dusk are separate painted plates and the cast keeps its colours. Misses: figures go near-black for a few frames each time they pass through the arch or the gate (note 8). Both nights are the same violet picture (note 4). |
| English speech balloons | **Yes, two at the edge** | All speech is English with the tail on the speaker. ALI BABA? is cut by the left edge at 9.4-10.3; A BED FOR THE NIGHT? touches it (note 9). |
| Readable limbs | **Singles yes, groups no** | Morgiana, the spies, the merchant and the mules read well. The thieves stand as one overlapped block in both night scenes (note 10). |
| Library cast, matches the series | **Yes** | Leader, men, Ali Baba and donkey match ALI-01-ANIME v4 and ALI-02. Morgiana's turquoise scarf reads in every plate. |
| No frozen holds | **Yes, one soft spot** | The scan finds no dead stretch. The quietest is 101.0-102.5 (Morgiana at the window, 0.4% of the panel changing; note 2). |

Episode 2's faults, checked here: near-black tint on a character (repeats only as short arch and gate passages, note 8); clipped balloons (one, note 9); too-small story objects (the jars, the cloud's cross, the picture balloon; notes 5, 6, 9); one framing per location (the day street is varied enough; the two nights are not, note 4).

Do the marks read on a phone? Mostly. The inserts (23.2-24.9, 42.5-43.2, 96.5-97.2), rings and glows carry them, and the red dot reads on every door colour. The white cross is the weak one: about 30 px across in a 972 px panel, white on pink and tan by day (note 6).

## Notes (most important first)

### 1. BLOCKER. 142.3-147.5 s: the red dot sits on Ali Baba's face in the final shot
- **What is wrong.** When door 3 opens, the dot of `TS_MARKS` is still drawn at its fixed spot (door centre, y 745), after the cast. Ali Baba stands in the doorway and wears it as a red clown nose from 142.3 to the last frame (stills 142.6, 143.6, 144.2, 146.0, 146.8). Same fault at 108.2-108.6 (dot on the old neighbour's face in door 2) and 134.6-135.9 (dot floating in the dark opening of door 3 as Ali Baba goes in).
- **Also in this shot.** The merchant stands in front of the doorway and covers half of Ali Baba, so "his vermilion sash in the doorway, her turquoise scarf in the window" is not a picture yet. The planned lid lifting on the near jar is not visible (144.2, 146.0 and 146.8 are identical). The balloon tail at 142.3-143.3 is a large dark wedge over the merchant's turban.
- **Why it matters.** This is the cliffhanger and the frame held longest. The dot on the hero's face turns the threat into a joke.
- **Fix.**
  - In `tsMarks`, a dot belongs to the door leaf: skip it (or draw it on the swung leaf, squashed with the leaf width `lw`) whenever that door's `open` is above about 0.15, and draw all marks before the cast in every shot. Check 56.0-57.6, 108.0-108.7, 134.5-136, 142.3-147.5.
  - Restage the two-shot: merchant at x about 820, left of the opening, turned to the door, mule behind him; Ali Baba alone in the lit opening (x 930), sash clear, one welcoming open hand, `lid` 0. Balloon above the merchant with a thin tail to his mouth, box fully inside the panel (note 9).
  - Hold beats after the last word (142.96): 143.3 Ali Baba's hand gestures him in; 144.0 the merchant's eyes slide to the cross beside the door and back (eyes only, `lid` 0.3); 144.8 the lid of the near jar lifts 12-14 px with two eye-whites in the dark gap, then drops at 145.6 (give it a small glint ring so it is found); 146.2 the shutter above narrows to a slit with the turquoise in it. One thing at a time, so the eye can follow.

### 2. 100.7-105.5 s: Morgiana's window beat is too small and half hidden
- **What is wrong.** "Morgiana saw it from the window and laughed quietly" is played by a bust about 60 px wide whose nose and mouth are behind the geranium box (stills 102.5, 104.6). The hand over the mouth and the bouncing shoulders cannot be seen. 101.0-102.5 is the quietest stretch of the film. HEE HEE is a tilted tag pasted over the right shutter.
- **Why it matters.** This is the heroine's best character moment and the turn of the second round: she is ahead of the thieves and enjoying it. It is also the plan's vertical staging (her above, the dot below).
- **Fix.**
  - On "رأتها" 101.20 push in to zoom about 2.1 on a frame holding the window (top) and the dotted door (bottom): world x 860..1200, y 400..800. This is a real peak, so a close shot is right.
  - Raise the bust in `morgianaWindow` (sill offset about 105 instead of 150) so chin and mouth clear the flowers; she leans out on her forearms.
  - Acting: 101.2 the eyes drop to the dot first, the head follows one drawing later; "مرجانة" 102.10 a slow look left down the street after the spy (`gaze` -1), scarf tail swinging late; "النافذة" 103.28 back to the dot, brows up, a half smile growing; "فضحكت" 104.30 hand to mouth, eyes in crescents, shoulders bouncing on twos; "بهدوء" 105.28 a finger to her lips toward the cat, which blinks. Then out of the window on "ووضعت" 106.20 as now.
  - HEE HEE as small italic lettering rising from her, inside the panel, not a boxed tag over the shutter.

### 3. 75.2-84.2 s: "Which door?!" is asked with no marked door in view
- **What is wrong.** In the two-shot the leader's body covers door 1 and its cross, and door 2's cross is a sliver on the right edge (stills 77.0, 82.3; the impact frame 79.0). The four men are a strip of overlapped heads at the left edge.
- **Why it matters.** The line is only funny while the audience can see the identical crosses the leader is looking at.
- **Fix.** Stand the pair between doors 1 and 2 (leader x about 520, spy about 640, both in front of bare wall), zoom about 1.25, so the cross of door 1 (x 460) shows left of the leader and the cross of door 2 (x 750) right of the spy, each with a slow pulse. "غضب" 75.55: the leader's eyes go from one cross to the other, then to the spy. "أي" 78.94: both arms thrown wide, one at each cross (the impact frame keeps both crosses inside the speed lines). "لم يستطع" 80.94-82.9: the spy's finger goes to cross 1, to cross 2, wilts; UH... as now. Men: three heads at most, staggered, at the left.

### 4. 111.3-128.3 s: the second night is the first night again
- **What is wrong.** Same plate colour, same arch-and-door-1 framing, same zoom as 66-85 (compare stills 69.5 and 113.5, 77.0 and 118.25, 85.5 and 127.8). Only the moon has moved. From 116.2 to 127.5 six figures stand in one block in front of door 1 for eleven seconds.
- **Why it matters.** The plan's own warning: one street for 110 s needs a new picture per scene. Here the leader changes from heat to cold thought, the hinge of the series, and the picture says "repeat".
- **Fix.**
  - Colour: repaint `night2` clearly apart from `night`: cooler blue-teal walls and ground, a large low amber moon, fewer but warmer lamps. A plate change, never a tint on the cast.
  - Place: keep the arrival at the arch (111.7-113.7) and the pan right (113.7-115.1), but do not cut back to the arch. Cut at 116.2 to Ali Baba's own house: leader alone at x about 1010, under the window, the cross and the dot of door 3 beside him; men in a loose staggered row at x 620..860 (note 10). Frame world y 380..1000 so the window is in the picture.
  - Irony and suspense for free: on "شخص أذكى" 119.96-120.74 the shutter directly above his head is open a slit with the turquoise in it; on "منا" 121.64 he looks up, the slit closes one drawing earlier, the cat looks down instead. This replaces the shutter slit that is now a few pixels at the right edge (85.2-85.9, 127.5-128.2).
  - "وقرر" 122.02: he turns his back on the men (cape three drawings late), beard stroke; "بنفسه" 124.42: thumb to his own chest, I WILL COME MYSELF.; "ثالث" 127.16: the saffron man's blue pot comes up and is pushed down by one flat palm without a look.

### 5. 138.2-143.3 s: the oil jars read as wicker baskets, and only one mule is seen
- **What is wrong.** Each jar is about 40 x 70 px in the panel and covered edge to edge with a cream net, so it reads as a basket or a beehive (stills 139.5, 141.0, 144.2). The second mule is never more than a head at the left edge.
- **Why it matters.** "Animals laden with oil jars" is the narrated event and the seed of episode 4: a viewer must think "jars big enough to hide a man".
- **Fix.** In `jarPannier` scale the jars to about 1.0 (near) and 0.9 (far): taller than the mule's body, glazed terracotta with a hard highlight band, a dark neck and a visible flat lid; the rope net reduced to two hoops and a carrying loop. Let the mule sag a little under them (`sq`), jars swaying one drawing late. Frame the caravan at zoom 1.0 with the merchant in the right third so two whole mules and the nose of a third are in the picture on "دواب" 138.86; a ring or glint on a jar on "جرار" 140.38.

### 6. The white cross: small by day, stood on by Morgiana, invisible in her thought
- **43.2-56.0:** while Morgiana notices and reasons about the mark, she stands on it; the cross peeks out beside her elbow (stills 49.0, 51.9, 54.2). Stand her at x about 1110 by the donkey's head, turned to the wall, one hand out toward the cross, a hand's width of bare wall around it.
- **50.9-52.1:** in the thought cloud the marked door carries a faint grey ring and a 6 px cross on cream; the four clean doors get green ticks. The point (only ours) is lost. Make door 3 half as big again as the others, with a bold dark-outlined white cross and a pulse on "بابنا" 50.86; the other four plain, no ticks. Set WHY ONLY OUR DOOR? at the balloon size (52).
- **All day shots:** enlarge the cross from 36 to about 50 world units, strokes 8 wide, on a faint darker chalk-smudge patch so it separates from pink and tan walls. Dot radius 14 to 17.
- **Door 5:** its cross sits at the last 50 px of the strip, so the fifth mark is drawn on the frame edge (63.4-64.0) and the reveal pan ends before it (73.9). Put door 5's marks on the left of the door (cx - 90).

### 7. 70.2-74.0 s: the reveal counter stops at 4
- **What is wrong.** The counter shows 1 while two crosses are already on screen, reaches 4 at 73.7 and the shot cuts at 74.0; 5 is never read. The pan has no face in it.
- **Why it matters.** This is the payoff of Morgiana's trick; the count is the laugh.
- **Fix.** Tie each number to its cross: as each cross reaches the middle third it flares with a ring and the counter ticks with it, 1 on "الشارع" 70.18, 2 on "كله" 70.82, 3 on "يحمل" 71.56, 4 on "العلامة" 72.38, 5 on "البيضاء" 73.16, then hold 5 for 0.7 s. After the cut (74.0-75.2) keep the 5 for the first half second over the spy's frozen grin and widening eyes.

### 8. Figures turn near-black in the arch and the gate
- 66.5-67.0, 67.4-67.6, 68.1-68.3, 68.9-69.1 (each thief coming out of the arch), 111.7-112.3, 135.0-135.8 (Ali Baba and the donkey as black shapes in the courtyard gate), 137.0-137.4 (the merchant).
- Short, but it is the owner's "no tint over the characters" point and ALI-02's note 2 again, and it happens on the villain's first entrance in both nights and on the merchant's reveal.
- **Fix.** Cap the passage darkening at about 30% with skin left in its own colour, or better, no darkening: draw the arch's near jamb over the figure so he is revealed by the edge, with a warm rim from the arch lantern. For the merchant keep the planned long shadow on the ground first (it reads at 137.2), then the man in full colour.

### 9. Balloons and the picture balloon
- **9.4-10.3:** ALI BABA? is cut by the left edge and the spy himself is half out of frame, overlapping a townsman (native still 9.7). Lead the pan so the spy sits in the left third with clear ground around him; clamp the box 24 px inside the panel.
- **142.3-143.3:** A BED FOR THE NIGHT? touches the left edge (see note 1).
- **131.5-132.8:** Morgiana's picture balloon is a dark box with a dim violet figure 30 px tall and a small "?" (still 131.9). Unreadable, the same fault as ALI-02 note 10. Use a light balloon filling a third of the panel width: a cloaked stranger with a hidden face and a big "?", then on "الغرباء" 134.04 the plain words BEWARE OF STRANGERS! as now.
- Put the 24 px clamp into the speech helper once (ALI-02 asked for the same).

### 10. The thieves as one block
- **What is wrong.** 68.5-75.2 and 116.2-127.5: five or six figures overlap by half a body, capes reading as coloured planks between them; arms appear only when raised (stills 75.0, 118.25, 122.5, 126.5). At 115.2-116.0 four "?" tags stack over the heads.
- **Fix.** Spacing of at least 0.8 body width; two depth rows (back row 14 px higher, scale 0.94) instead of a queue; a different silhouette for each man in the long hold (arms folded, scratching under the head cloth, peering at a door with a hand on a knee, yawning), never changing on the same drawing. Keep the tight accordion bump only for the gag at 68.5. One "?" per head, popping in sequence on "يعرفوا" 115.18.

### 11. Hands that draw must touch the wall
- **21.9-23.2:** the spy faces the camera in front of the door and strokes the air at chest height; the cross then appears on the wall beside him (still 22.5). Turn him toward the wall right of the door (`dir` 1, a small `tip` in), arm reaching to the mark's position, the two strokes on "علامة" 21.90 and "صغيرة" 22.60, a look over each shoulder between them. From 25 to 34 he clasps a white glowing ball at his chest (stills 26.5, 31.5); if that is the chalk, draw a chalk stick and pocket it on "ابتسم" 26.10.
- **59.6-64.0:** Morgiana faces the camera at each door, and at 60.5-61.3 stands on top of the old neighbour (still 60.9). Each mark: skid in with `landSquash`, reach to the wall, one fast double stroke, scarf tail arriving late, already looking at the next door. Keep the neighbour a clear step to the side, watching with her hand to her mouth.

### 12. Small things
- **7.0-16.9 market:** the lower 40% of the panel is plain brick. Add foreground dressing (baskets, a sack of oranges, pigeons, a passing porter) or lower the camera so the stalls sit larger.
- **91.0-91.6:** the red dot in the leader's balloon pops in as a flat ellipse for several frames; pop it as a circle.
- **99.8-100.6:** the second spy strolls off through the donkey's head; pass him in front with a gap, or let the donkey pull its head back with flat ears.
- **Keep:** the chalk-hand and brush inserts, both eye close-ups, the day-to-night time-lapse at 64.4-66.5, the practice dot on the first spy's turban (93.1, still there at 113-127), the paint drips on the ground, the memory inset at 53.7-54.7, the sweep pan at 129.6-130.6, the ringed fist.

## Reusable techniques worth adding to the Library
- **Marks that belong to a surface:** a mark list with a parent (wall or door leaf) so a mark hides or swings with an opening door and always draws under the cast. Needed by note 1; any story with a marked, painted or sealed door will need it.
- **Balloon clamp** in the speech helper (asked for in ALI-02, needed again here).
- **Counter tied to objects** (`countAs(ring)`): the number ticks when its object flares, so a counting pan cannot run out of time (note 7).
- **`dayToNight` plate time-lapse** (64.4-66.5, 134.6-137): works well and is worth moving to the Library after approval.
- **Window bust with a sill offset** (`windowBust`): a figure framed in a window with chin clear of the sill, for a second level of staging.
- **Edge reveal instead of darkening** for figures coming out of an arch, gate or cave mouth (note 8).
