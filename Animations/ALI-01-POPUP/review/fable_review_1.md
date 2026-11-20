# ALI-01-POPUP "Open Sesame" (Paper Pop-up Book): Fable review, round 1

Film reviewed: `Animations/ALI-01-POPUP/renders/ALI-01-POPUP_v1.mp4` (143.43 s). Pack: `review/v1_pack/`. I also pulled full-resolution frames from the MP4 at about 40 key times and measured frame-to-frame motion per second over the story panel (paper grain alone measures about 1.5 to 2; a second below about 3 is a near-frozen picture).

## Verdict: REVISE

No BLOCKER: the story events are all there and in order, the subtitles are readable and verbatim, the ending exists (THE END at 139.2, about 4.2 s hold), no broken or blank frames.

It is a revise because the film is a tidy cut-paper cartoon that does not yet play as a pop-up book, and because the acting is too small or too still at most of the story's turning points. The three biggest reasons: the film's signature mechanism (the pull-tab that opens the rock) is not on screen at all; the thieves dissolve into the door as transparent ghosts; and the treasure cave, the payoff of the whole story, neither reads as a cave nor moves.

What already works and must be kept: the curling page turns with the serif caption ("One day...", "Much later..."), one hue family per spread and the dusk reprint of the forest, the cut-paper finish (border, cardboard edge, shadow) on every figure, brown ink throughout, the sun on its stick with the tab at 8.3 to 9.2, the gold fan popping out of the door, the eyes in the leaf gap (they do squeeze shut at 53.4), the donkey's ears over the bush, Ali Baba's face in the push-in at 87.2 to 88.2, the child asleep in the hut, the sets folding down before each turn, and the last card standing.

## Notes (most important first)

### 1. The rock opens with no mechanism (42.8-48.3, 53.9-55.3, 58.5-59.0, 66.2-67.5, 85.0-86.5)
**Wrong:** the plan's central idea is "the same pull-tab that raised the sun opens the rock". `abPullTab` is called only in `ab_home.js` (sun) and `ab_cave.js` (door slab); the forest has none. The halves simply drift apart, while the lower 30% of the frame is empty green page. This is the one place where this film can beat the anime version, and it is missing.
**Why:** without the tab the reveal is an ordinary cartoon slide. The viewer was taught the book's grammar at 8.7 and is never paid.
**Fix:**
- Print a slot on the page from under the rock's seam down to y 1180 (`abSlot`), and put a tab there at about 1.6x the S1 size, pointing left (the halves part, the tab travels). It must be on the page from the moment the forest spread pops up (16.2), so it sits there as a promise for 28 s.
- 44.86 (فانشقت): the tab jerks 10 px and springs back twice with the CRACK; the crack runs up the rock.
- 46.16 (الصخرة) to 46.9: the tab slides its full travel with `K.ease.back`, the halves move in lockstep with it (same eased value), overshoot 8 px and settle; each half rocks 0.02 rad about its base as it stops. Gold fan at 46.90 as now.
- Close (53.88-55.24 and 66.20-67.42): the tab runs back, the halves meet with a 2-frame squash and a paper puff, the crack zips shut.
- Ali Baba's turn: tab dead still from 83.94 to 85.02 (the beat of nothing), one tiny twitch at 84.6, then the full slide at 85.02 to 86.4.
- Camera: for 44.8-47.0 and 84.9-86.5 frame rock and tab together (zoom about 1.2, lower the frame so y 1180 is inside it). Push in to the door only after the fan has popped (47.0, 86.6).

### 2. Thieves fade into the door as ghosts (51.3-54.3 in, 58.9-61.2 out)
**Wrong:** `ab_forest.js` lines 356 and 362 set `alpha` by distance to the door (x < 330). On screen this is a half-transparent man with a pale rectangle over his face (the shoulder sack drawn at the same alpha), clearly visible at 52.0 and 53.4, and pale figures hatching out of the fan at 59.0 to 59.7.
**Why:** paper cannot dissolve. It is the single most un-paper frame in the film and it happens during "the men entered the cave".
**Fix:** alpha stays 1. Hide them with paper: draw the walkers before the left rock-half card and clip them to the arch shape of the door (`ctx.clip` on the arch path), so each man slides behind the edge of the rock like a card going into a slot. Keep the 0.85 shrink. Optionally darken with a navy `source-atop` tint (in the cave's shadow), which is still opaque paper. Sacks opaque, on the shoulder, sagging with `lagged`. Coming out: the same in reverse, sacks flat (`abSack` fill 0.1) and tucked under an arm so "light coming out" reads.

### 3. The treasure cave does not read as a cave and stands still (88.9-104.4)
**Wrong:** the spread is a flat dark-green dome on navy, with seven small triangles floating above it (not attached to any ceiling), an orange slab and a strip of the dusk forest at the right, and a blank navy lower third. The heaps are waist high. Ali Baba is about 110 px tall and stands in one pose while tags pop: measured motion 90 to 94 s is 2.3 to 2.9, and 93 s is 1.47 (frozen). "Amazed by the treasure" (95.4) is a small arm move.
**Why:** this is the story's surprise and the set-up for its moral (one tiny sack against a mountain). A viewer comparing with the anime film sees a shelf of props here.
**Fix:**
- Set: a cave arch that fills the board (about x 60..940, crown near y 300) in two or three layered indigo cards, popping back to front; stalactites hinged on the arch's underside that unfold downward one after another (89.5-90.6, staggered 0.12 s). Drop the outside cross-section on the right; show the way out as one arch-shaped doorway card with dusk colour inside it, where the donkey's head and ears peek in.
- Heaps at twice the size: gold heap at least 1.6x Ali Baba's height, popping up with back() exactly on ذهبًا 90.82, silver on 91.56, cloth bolts unrolling toward the reader on 92.56, stars dropping on strings at 93.84 and continuing to swing.
- Camera: enter tight on Ali Baba in the doorway (zoom 1.6 at 89.5), pull back to the full spread as the gold pops (90.8-91.4). Do not sit wide and static.
- Acting, one reaction per word: 90.82 a startled hop back (`anticipate`, `hop`, `landSquash`, `groundShadow`), eyes wide; `gazePlan` saccades gold, silver, cloth, then up to the stars; turban trailing with `lagged`; 95.40 (دهش) stretch 1.08, both hands to the cheeks, mouth open, a held moving pose with `breathe`; 96.36 he walks in among the heaps with `walk`, head turning with a blink.
- 97.30 (لكنه): the "but" must be a clear stop: head shake (two flips of gaze, `flow` on tip), hand on heart, a glance at the big sacks then away. 98.80-99.50: he picks the smallest sack with two fingers; push in to zoom 1.9 with the gold heap filling the background; badge "1" as now. 100.42: three coins dropped in one by one with a `tick` each.

### 4. The climb and the descent are a man floating in front of a trunk (25.6-28.2, 74.2-76.6)
**Wrong:** Ali Baba faces the camera with both hands on his head and slides up the trunk, feet hanging (26.5); the same pose comes down at 75.5. Left and right arms mirror, there is no grip, no effort, no shadow change.
**Why:** this is the fear beat; it should be a scramble. On the way down it should be the opposite, and the twig scare (75.44) is the only comic relief in the suspense section.
**Fix:**
- Stage him half behind the trunk card: draw the body before the trunk, then one hand card and one foot card over the trunk edge, so he hugs it. Five hitches on 25.61, 26.1, 26.6, 27.1, 27.6: each one reaches with the other arm (never both), `sq` 0.93 gather then 1.06 stretch, height on `flow` so he never stops dead, turban and sash with `lagged(…, 0.12, 0.5)`. A `groundShadow` at the foot of the tree that shrinks as he rises. One sandal slip at 27.1 (drop 15 px, catch) sells the height. Donkey: head follows him up with `lookAt`, then walks behind the bush (24.6 as planned) with only ears showing.
- 28.21 (واختبأ): the leaf flap folds down over him as a hinged card with a back() overshoot and a paper sound, not a fade or a pop.
- Descent 74.70-76.20: half the climb's speed, one leg stretched down and feeling for the trunk (`flow` on the leg), eyes looking down. 75.44: twig snap, total freeze for 8 frames, eyes wide, a 2-frame gaze snap left and right, then breathe out. 76.20 (بحذر): toes touch first, then the heel, small `landSquash`.

### 5. The two looks up at the tree are lost (41.7-42.5 and 53.28-53.9)
**Wrong:** the plan calls the leader's sweep of the eyes "the film's tightest moment". At 53.4 he is a 90 px figure at the door in a wide shot and the answering squeeze of Ali Baba's eyes happens in a gap about 45 px wide. Nobody will see either. Meanwhile Ali Baba's toes hang below the leaf flap in plain view directly above the thieves for 40 s, which cancels the hiding.
**Why:** suspense needs the audience to see the threat look and the hider react.
**Fix:**
- Toes tucked up out of sight by default from 28.5; they are a gag to be used twice, not a constant.
- 41.74 (قائدهم): the nervous rider 3 glances up; one leaf drops; in the gap the eyes dart to him and freeze. Wide is fine here, but stop the flap's sway completely for the 0.6 s.
- 53.10: hard cut (or fast push) to zoom 1.7 on a diagonal that holds the leader at the door lower left and the leaf gap upper right. 53.28 (ثم): the leader stops in the doorway, head turn with a blink, gaze up right, held 0.5 s with only his cape settling (`swing`). In the gap: eyes squeeze shut, and the toes slip into view and curl up. Leaves frozen. 53.80: he turns and goes in; 53.88 (أغلق) the tab runs back and the rock shuts behind his cape. Cut wide at 54.5.
- Same grammar at the first push-in (31.25): the eyes should scan left to right along the dashed line, with one blink, not sit centred.

### 6. The crowd mechanisms do not read (rider strip 19.4-34.0, concertina chain 35.8-56 and 59-69)
**Wrong:** (a) `abSlideStrip` (line 245) slides the tiny rider silhouettes in by 21.7 and then parks them until 34.0. For 12 s there are small black horsemen hovering between the trunks, right under Ali Baba's feet (clear at 29.7 and 30.5), on no visible ridge or slot. (b) The concertina chain is a cream strip with pin-sized heads behind the horses (37.5, 52.0); it reads as a fence. So the "40" badge counts up over five riders.
**Why:** "horses approaching quickly" and "forty men" are the two crowd images of the story, and both are meant to be pop-up tricks.
**Fix:**
- Strip: print the ridge road and its slot on the board (a pale band with `abSlot` along y 610 and y 700). The strips enter at 19.41 (خيول), cross and leave past the slot's end by 22.2, each rider bobbing out of phase; Ali Baba's cupped ear at 18.03 and then his eyes follow them (`lookAt`). Nothing remains after 22.4, when the fear beat starts.
- Chain: dolls at 1.8x, standing on the back row (y about 905) from behind the trees toward the rock, unfolding panel by panel as a real zigzag (alternate panels turned and shaded, each one opening with a small overshoot and a `paper` tick) between 35.78 and 37.0, so the badge reaching 40 lands on the last panel. Folding back into itself when they file in, and again at dusk.

### 7. The thieves look frightened, and the leader's pose is not the one Ali Baba copies (34.5-69)
**Wrong:** every rider has round eyes and a small turned-down mouth (37.5, 60.5, 62.6): they read as five worried men. Only the leader on foot at 46.3 has brows. The leader calls with one raised hand (43.6); Ali Baba copies with two (83.2), so the set-up and pay-off do not match. Ali Baba's bubble is as big and steady as the leader's.
**Why:** the fear in the tree needs something to fear, and the copy is the film's main character joke.
**Fix:** thieves `brow` 0.5 to 0.7, `lid` about 0.7, flat or grinning mouths, each with his own seed; only rider 3 stays nervous. Leader: chin high, the shared `ARMS_UP` with both arms on 42.76 (افتح), held through 43.80 with the cape following (`lagged`), arms down on 44.86. Ali Baba at 82.84: the same angles on bent knees (`sq` 0.92), `tremble`, his bubble at about 60% size with a wobbly tail; 83.94-85.0 eyes shut, then one eye opens (`wink`) at 84.6.

### 8. The hut scene: frozen stretches, faces covered, three figures in a clump (105.6-131.0)
**Wrong:** motion measures 1.6 to 2.9 from 108 to 112 (telling his wife) and 2.5 to 3.1 from 128 to 131 (the map). The picture card of the rock sits on the table in front of both bodies and, at 120.4 to 123.0, covers Ali Baba's whole face exactly when he gives in and Cassim grins. During the questions (118.5-120.3) Cassim stands on top of Ali Baba and the wife. Cassim's peek (114.5-116.0) is cropped at the right edge of the frame. The coin bite (116.87) is not visible. The room card ends at mid-frame and the lower 30% is blank pink page.
**Why:** this is the turn of the story, told entirely by faces.
**Fix:**
- Hang the picture card on two strings above the heads (a card dropping in like the title sign and swinging) at 108.37-111.2 and 120.4-123.0. Under it Ali Baba mimes `ARMS_UP` at 108.4; the wife's `cheeks`, then hands to her mouth.
- 108.95 hands held; 110.37 (ألا) he leans in (`tip` 0.08) with a finger to his lips and the SHHH! tag; 110.97 she locks her lips with a little key-turn and nods through `flow`; 111.67 the coin rolls to the door with their eyes on each other, not on it. Both keep `breathe` and `idleSway`.
- Peek: keep the door at least 120 px inside the frame. 113.26 the door creaks open a crack, turban first; 114.55 eyes; 115.35 a 2-frame saccade to the coin, which glints; 116.25 he steps in and picks it up; 116.87 push in to zoom 1.8 for the bite, eyebrows up.
- Questions: at least 150 px between figures. 118.47 Cassim on Ali Baba's right, `tip` 0.12, brow 0.8, first "?"; 119.05 mirror flip to his left, second "?"; 119.61 leaning over him, third and largest. Ali Baba leans away further each time (`tip` -0.05, -0.09, -0.13), eyes avoiding; the wife hides behind him and peeks. 120.35 (عرف) he sags: `sq` 0.93, `lid` 0.5, a slow nod. 121.37 push in on Cassim's slow grin.
- 128.49-130.09: Ali Baba draws the map reluctantly (hand moving, eyes down); 130.09 the snatch is a fast grab with Ali Baba's hand left in the air; 130.77 he whispers with a cupped hand while Cassim already faces the door, eyes on the map.
- Frame the room so its floor sits near the lower third of the picture, or stand the figures on the page with the room as the card behind them.

### 9. Opening spread: the characters are specks and the gags pass unseen (0.5-15.2; 17-20)
**Wrong:** from 1.5 to 11 s Ali Baba is about 12% of the panel height in a wide frame; the family in the door, the axe, the empty pouch and the moth (6.46-7.5) are a few pixels. Motion is 2.1 to 3.0 at 5 to 6 s. In the forest, 17 to 19 s measures 2.0 to 2.8: he and the donkey stand while the narration says "one day".
**Why:** the first eight seconds decide whether a viewer stays, and they must make him likeable and poor.
**Fix:** let the wide pop-up play to 1.9, then push to zoom 1.5 on the doorway for 1.94-7.3 (wave to the family, child tugging his robe; axe onto the shoulder with a small `sq` at 5.52; at 6.46 he turns the pouch inside out, looks into it, and the moth flutters up past his nose while his eyes follow it). Widen for the sun tab at 8.3. In the forest give him the stick-gathering as real action from 16.5: bend, pick, tuck under the arm, twice, the donkey grazing with one ear swivelling, so the ear prick at 17.7 interrupts something.

### 10. The road spread is a thin band, and Cassim's end gags do not read (131.8-138.7)
**Wrong:** 55% of the frame is empty sky and 25% empty sand; Cassim is about 110 px tall. The map is stuck to the top of his head like a hat (133-139), so "not looking where he goes" and "map upside down" cannot be seen. The ten empty sacks are three flat sheets in the cart; the slipping sack and the moth (134.0-135.2) are invisible.
**Why:** greed against need is "ten empty sacks against one tiny one"; the final question depends on seeing a man who was not listening.
**Fix:** start at zoom 1.5 travelling with Cassim (the page stays still, the camera keys move). Map held in both hands at chest height, nose in it, chin first (`tip` 0.1), stumbling once over a stone because he does not look. 133.07: the cart follows with a tall, countable pile of flat sacks and a round badge "10" (echo of the "1"). 134.01: push to the cart; one sack slips off; 135.11 the mule shakes it and a moth comes out (echo of 6.46); the mule's flat look to camera. 135.87 (هل): he stops; 136.63 turns the map upside down, scratches under the turban, `headHold`; 137.51 push past him to the far shut rock.

### 11. The end hold: strings through the rock, then a still picture (139.2-143.4)
**Wrong:** THE END hangs low in the middle, so its two strings run straight down the face of the rock, the one card the ending is about. From 141 to 143.4 motion is 1.6 to 1.9: nothing moves.
**Why:** the open question should stay alive until the last frame.
**Fix:** hang THE END at upper right over the printed hills (strings clear of the rock) and let it keep a slow damped swing. The "?" hangs over the rock on its own string with a spring. The sparrow hops along the top and looks down the seam. The rock's pull-tab is in frame below it and gives one small twitch at about 142.0. Cassim folds down last, after the trees, so the eye is led to him and then to the rock.

### 12. Polish that makes it more of a book (throughout)
- The lower quarter of the page is empty in every spread. Use it for the book's furniture: the slots and tabs (notes 1, 6), a printed path, and one or two front-row cards (grass, stones) larger than the back rows, so the three depth rows are felt.
- The crease is faint: strengthen `bookFold` (a darker line with a soft highlight below it) and let standing cards drop their shadow forward onto the page across it.
- 57.2-58.5: Ali Baba sits on the branch in front of the leaf flap in full view, then is back inside at 58.7. Keep him behind the flap: eyelids closed in the gap, a small paper "z" drifting up, the eyes snapping open at 58.5 when the rock cracks.
- Bubbles: the leader's balloon at 42.8-44.5 sits across the rock where the crack is about to run; move it up onto the sky board.
- 45.4-49.0: the Arabic wraps as one long line plus the single word "سري." on its own line. If the subtitle library can balance the two lines without touching text or timing, do it; otherwise leave it.

## Reusable techniques worth adding to the Library (paper-popup style)
- `abPullTab` + `abSlot` (a tab that drives a mechanism with one eased value), `abSunStick`, `abSlideStrip`, `abGoldFan`, `abThiefChain`: move to `Library/styles/paper-popup/` once approved, as the style's mechanisms.
- "Into a slot" entrances and exits: a helper that clips a walker to a doorway shape and to the card in front (no alpha), for any character entering a building, cave or tree in this style.
- The hiding flap with an eye gap (`peekFlap`: a hinged foliage card, gap position, eyes driven by `gaze`, `lid`, `wink`).
- The reprint: one spread layout re-coloured by palette (`day`/`dusk`) for "much later".
- A string-hung card (`hangCard`) for pictures inside the story (the rock picture, the map, the "?" at the end), sharing the title sign's swing.
- Ending pattern "one card stays up".
- Review method: per-second frame-difference over the story panel (ffmpeg `tblend=difference` + `signalstats`) finds frozen holds quickly; worth adding to `tools/review/make_pack.py` as a motion row in the index.
