Verdict: REVISE

# AN-145 Al-Maamun and the Pyramids of Egypt: Fable review, round 1 (v1)

Reviewed: `renders/AN-145_v1.mp4` through all 30 strips of `review/v1_pack/strips/` plus 23 full-size frames in `review/v1_pack/extra/` (montages `m1.jpg` to `m6.jpg`).

## Summary

The story is told in order, every sentence has its own picture, the subtitles are verbatim and readable in both languages, there are no broken frames, and the ending holds correctly (THE END 173.7 to 177.9). No BLOCKER.

What works and must be kept as it is: the gossip scene framing (13.1 to 18.8), the red demolition outline (26.9 to 32.9), the DAY 1 / 9 / 30 sky time-lapse, the TINY! bracket (58.1 to 60.7), the caliph close-up with PROFIT 0 (87.6 to 95.2), the blade test close-up (117.0 to 119.6, the best-framed shot of the film), the IRON / LEAD macro joint, the LEGEND stamp, and the night-camp push-in at 138.7 to 142.3.

Why REVISE: one problem runs through most of the film and it weakens the turn, the climax and the ending. The camera sits at zoom 1.0 to 1.25 on a world whose ground line is y 900 of 1230, so the bottom quarter to third of the panel is bare sand while the actors are 45 to 90 px tall in the middle band. The planned acting (the bow, the builders watching their work as they blow away, the storyteller's hands, the chest on the camel) is in the code but cannot be seen. In addition, two props of the climax do not read: the "what he paid" load on the scale and the equals sign.

All camera numbers below are `M5_CAM` keys `[t, x, y, zoom]` in `src/m5_main.js` (world 1000 x 1230; `m5Cam` clamps to the world, so a higher zoom is what removes the empty sand). Check every changed shot with a still: no head closer than 40 px to a panel edge.

## Notes (most important first)

### 1. 72.3 to 87.6 (S9, the weighing). MAJOR. The cost side of the scale does not read, and the equals sign reads as a "B" or "8"
- What: the right pan carries a black dome with red dashes (f_77.6, f_83.3). Nothing says "this is what he paid"; it looks like an oven or a dark basket. At 82.94 the `=` (`sfx(ctx, '=', 500, 290, 130, ...)`, `m5_s2.js` line 99) is drawn in the outlined comic font and comes out as a boxed glyph that reads as a letter or digit between the two tags.
- Why: this is the surprise of the whole tale. The viewer must see two equal things, gold found and gold spent, at a glance.
- Fix:
  - Right pan: replace the dome with a pile of the same coins as the left pan drawn as red coins (flat `#e2231a`, black outline, the same pile silhouette and the same final height as the gold pile), arriving on arcs from the open pay chest or the vizier's ledger from بما 76.94 to للحفر 78.32. No black backing. Two piles of the same shape, one yellow and one red, under the yellow FOUND and red SPENT tags, make the equality self-evident.
  - Equals sign: draw it as two plain black bars with a white keyline (each about 70 x 16 px panel space, 16 px apart) at the same place, popping on نفقات 82.94; do not use the lettering font for it.
  - Framing: from 80.5 to 87.5 the push-in (zoom 1.5) cuts the caliph at the left edge and the vizier at the right edge (strips 81.0 to 87.2). Either hold zoom 1.32 at `[82.3, 500, 680, 1.32]`, or move both men 45 world units toward the scale before 79.1. Both whole heads and both pans must stay in frame for the press gags on أكثر 85.78 and أقل 86.88.
  - The tag words FOUND and SPENT are about 14 px high; raise the tag scale by about 1.4 so the word passes the 28 px label rule.

### 2. 129.8 to 152.6 (S14 and S15, the fireside). MAJOR. 23 seconds played in a wide shot with 50 px figures
- What: except for 138.7 to 142.3 the camera is `[.., 500, 615, 1.0]`. The storyteller and the two children are tiny on a mat in the middle, the lower 35 percent of the panel is flat grey ground, and none of the planned acting is visible: the lowered voice, the hands, the believing child and the sceptic, the laugh at هذه 142.32, the nod at NOT PROVEN FACT.
- Why: P6 to P8 are 66 s without plot. The plan itself warns "do not let these scenes become slides". At this size they are slides.
- Fix:
  - Base framing for the whole scene: zoom about 1.45 with the fire group in the lower third and the cloud above it, for example `[129.8, 520, 600, 1.45]` (verify with a still that the full cloud at (560, 400), the moon edge and all three seated figures are inside the panel). If the cloud does not fit, lower the cloud centre to about y 470 and shrink it to 560 x 340 instead of pulling the camera back.
  - Keep the existing push-in on حراسًا 138.42 but go from 1.45 to about 1.75 and re-centre so the storyteller is not cut at the left edge (he loses his left arm at 139.0 to 142.5); keep both children in frame because their hiding at 141.5 is the reaction.
  - 142.32 هذه: the laugh needs a body: `tip -0.10`, head back, mouth open, shoulders bouncing (3 bounces over 0.9 s), one hand slapping his knee. kid1's relief hop with `landSquash` on أسطورية 144.04 as the stamp lands.
  - 147.9 to 150.3: after the cloud pops, do not return to zoom 1.0. Go to a three-shot at about zoom 1.9 on the faces for NOT PROVEN FACT (kid2 nods on مؤكدة 148.70), then drift to the pyramid on تاريخ 150.34 as now.

### 3. 152.6 to 163.8 (S16, kings and builders turn to sand). MAJOR. The emotional beat is invisible
- What: camera `[152.62, 490, 615, 1.02]`. The ancient king and two builders are about 45 px tall at the foot of the pyramid (f_157.3); the king reads as a small boy in white. The sand dissolve at اختفى 158.52 is a faint speckle (f_159.0) and the rolling circlet at الملوك 161.68 cannot be found in the frames at all.
- Why: "the monuments remained after their owners vanished" is the moral. The plan's idea (they keep looking up at their work as they blow away) is strong but nobody will see it.
- Fix:
  - Stage it nearer the lens: draw the three figures at about 2.2 times their present size in the foreground (feet at world y about 1010, x 330 to 560), backs or three-quarter to the lens, heads tilted up at the pyramid (`gaze [0, -0.8]`), or keep them where they are and push the camera to about `[155.82, 420, 800, 2.0]` on الآثار 155.82, then ease out to the wide shot from 160.2 to 161.2 so the racing days still read in the wide.
  - Give the king an unmistakable silhouette (a tall double crown or a striped headcloth, and a staff).
  - Make the sand a real wipe: head-down erase over 1.2 s per figure, with 60 to 80 seeded grains at 4 to 7 px streaming to the right along a shared wind line, builders first on اختفى 158.52 and أصحابها 159.3, the king last on الملوك 161.68.
  - Circlet: 40 px or more on screen, damped roll for 0.7 s, then a sand ripple covers it on والبناؤون 162.36.

### 4. 163.8 to 174.0 (S17, the caliph's last halt and bow). MAJOR. The final gesture is unreadable
- What: camera at zoom 1.04 to 1.0. The rider, vizier and camel are about 70 px tall; the arrow at المأمون 169.64, the waved-away coin balloon at البحث 170.62 and the bow at ربح 171.40 are all smaller than a thumbnail (strips 169.7 to 172.0). Between 171.2 and 173.5 nothing visibly changes.
- Why: this is the resolution of the caliph's arc (respect replaces greed) and the last image before THE END.
- Fix:
  - On بينما 167.92 keep the wide for the entrance, then push in while he halts: `[168.98, 330, 800, 1.0]` to `[170.4, 330, 800, 1.9]` (centre on the rider and the tunnel scar; verify the scar and the rider's head are both in frame).
  - Bow on ربح 171.40 as a readable shape: hand to chest, torso `tip 0.22` held 0.8 s, turban drops, eyes closed; the horse lowers its head with him. The vizier bows 6 frames later.
  - Coin balloon at least 150 px wide at that zoom; he brushes it aside with a full forearm sweep and it pops.
  - Pull back to the wide shot from حجارتها 172.56 to 173.6 so THE END lands on the pyramid alone at dusk, as planned.
  - End hold: at 175.5 to 177.9 the pack camel is frozen half out of frame behind the left palm. Let the caravan leave the panel completely by 175.2, or stop it clearly inside the frame; nothing may sit clipped and static on the border during the hold.

### 5. 65.1 to 72.3 (S8, the breakthrough and the gold). MAJOR. The turn of the story is murky
- What: at zoom 2.4 to 3.0 the two workers are about 90 px tall under an olive halftone glow that covers their faces (f_69.6); the chest is grey-green on brown, low in contrast, and smaller than a worker's head; the lid opening on jewels at وكنوزًا 70.02 and the joy at داخل 71.06 are barely visible. About 30 percent of the frame is sand below the pyramid.
- Why: this is the one real surprise beat with its own chime (66.94). It should be the brightest picture of the film.
- Fix:
  - Camera: cut closer for the swing, `[66.01, 400, 790, 3.4]`, and after the wall falls `[67.3, 420, 790, 4.0]`, y chosen so the tunnel floor sits in the lower third and no sand band shows.
  - Light: draw the glow as flat process yellow with a soft ring of yellow dots behind the figures, never over them; faces and clothes keep their normal colours.
  - Hoard: chest at least 1.6 times its present size, yellow and red with a black outline, a heap of coins spilling forward, 8 to 10 radiating light strokes that grow on مالًا 68.88; on وكنوزًا 70.02 the lid flips open with a 2-frame overshoot and three gems arc out.
  - Joy on داخل 71.06: w3 raises the torch high, w1 drops the pick and throws both arms up with a hop and `landSquash`; a look between them (gaze to each other) before the cut.

### 6. 53.7 to 65.1 (S7, the cutaway). MAJOR. Workers are specks and the "nothing here" beat does not land
- What: at 54.0 to 59.9 (zoom 1.0) the workers in the tunnel are about 25 px tall inside a dotted blob; after the push-in (zoom 2.4, 61.0 to 64.4) they are still about 70 px with a third of the frame empty sand. The torch sweep over bare stone at ولم 61.26 and the palms-up at يظهر 62.06 are too small to read; only the struck-out coin balloon carries the meaning.
- Why: the low point needs disappointed faces, otherwise the LATER card has nothing to pay off.
- Fix:
  - Keep the wide view only for the tunnel drawing in and the TINY! bracket (55.2 to 60.2); that part is good. Remove the tiny figures from the wide view or reduce them to a single torch dot, since they cannot read.
  - Push to `[61.2, 300, 800, 3.6]` (lower third on the tunnel floor). In the close view: the torch sweeps left to right over 0.8 s with the light disc following on bare wall, both men's eyes follow it, then on يظهر 62.06 palms up, shoulders drop (`sq 0.95`), w2 sits down on the floor; the balloon as now, at least 160 px wide.
  - Same light rule as note 5: no halftone overlay across the faces.

### 7. 32.9 to 43.2 and 43.2 to 50.0 (S5 and S6, the digging). MAJOR. The lead worker looks frozen with his arm out, and the right worker is cut by the frame
- What: w1 (green) spends most of 33.5 to 38.5 and again 39.5 to 49.7 with his arm stretched straight out horizontally and the pick head parked on the X (strips 34.7 to 38.2, 39.5 to 43.0, and unchanged through the time-lapse at 43.5 to 49.7). His pick and w3's pick cross on the X so the contact is a tangle (f_35.6, f_36.9). w2 (red cap) is half out of the right edge for the whole close shot 33.0 to 41.0. The 3 percent gauge is yellow 20 px text on tan and cannot be read (f_38.3).
- Why: "the stones resisted their tools" needs effort and recoil; a held horizontal arm reads as pointing, not striking. The time-lapse is supposed to say "weeks of labour", but the men stand still while the sky spins.
- Fix:
  - Strikes: every contact must be followed within 2 frames by a `rebound` (pick thrown back 25 to 35 degrees, arms `tremble` for 0.3 s) and a return to a raised or resting pose; never hold the extended pose longer than 4 frames. Alternate w1 and w3 so only one pick is on the X at a time (w1 on الضخمة 34.76, w3 on قاومت 35.44, w1 again on أدواتهم 36.50 with the curl).
  - The bent pick gag is readable at full size (f_38.3); give it its beat: w3 lowers the hooked pick to eye level on وكان 37.86, looks at it, then one look to the lens for 10 frames.
  - Framing: shift the shot right so all three men are whole, for example `[32.96, 720, 770, 1.6]`, or move w2 60 units left.
  - Gauge: 1.5 times larger, the number in black on a white tab ("3%" at 44 px or more).
  - Time-lapse 43.2 to 46.4: drive the three strike cycles at 4 to 5 times speed with `stagger(i)` (a pure function of t), so the men blur with work while the caliph and vizier stand still; ease back to normal speed by 46.9.
  - 50.0 to 53.6: the coins to the men and the tool heap are a few pixels across at zoom 1.0. Either push to about zoom 1.35 on the chest and the workers while the SPENT counter runs, or enlarge the flying coins to 26 px or more and give each worker a catch pose in turn on الرجال 50.46.

### 8. 97.3 to 107.7 (S11, taking the find and leaving). MAJOR. A cluttered clump, and the "idea abandoned" wipe reads backwards
- What: horse, vizier's horse, caliph, kneeling camel and three workers overlap in one knot at the left third behind the palm (f_98.2); the chest going onto the camel on أخذ 97.28 cannot be seen. At 99.7 to 100.7 the red outline pops on as a new small rectangle over the group and then shrinks; it reads as something new being drawn, not as the earlier demolition plan being given up. At 106.5 to 107.2 the throne thought balloon is cut by the left panel edge as he rides out.
- Why: three story facts are in this sentence (he took the find, he gave up demolition, he went home to govern) and none is clear.
- Fix:
  - 97.28 to 99.6: clear the staging. Workers stand right of x 620, the camel kneels alone at x about 430 with clear ground around it, the caliph at x about 300 in front of the palm, not behind it. Two workers carry the chest on a visible arc onto the saddle (contact on ما 97.9), the camel rises rear first as planned. Camera about `[97.28, 430, 800, 1.8]`.
  - 99.6 to 101.2: show the demolition outline at its original place and size on the great pyramid first (full opacity at ترك 99.60 in the wide view), then erase it on هدم 100.62: either the dashes peel off and fall as red chips, or the caliph's sweeping hand wipes it left to right, with a small red X-out. The last look up (ثم 98.80) should be a held 0.6 s pose with `gaze [0.3, -0.8]` before the pull-out.
  - STOP! on بوقف 103.12 is fine; make the tool drop visible (tools at 1.5 times size falling with a bounce, w2 smiling first as planned).
  - Thought balloon: keep it inside the panel (clamp its x to 130 or more in panel space) and pop it before he exits, or have him exit 0.4 s later.

### 9. 18.8 to 21.8 (S3 push-in). MINOR. The vizier is cut in half and the question mark hangs on the frame edge
- What: the push to `[20.1, 430, 720, 1.6]` leaves half the vizier's face at the left border from 19.5 to 21.5 and puts the red "?" against the right border, clipped (f_20.5).
- Fix: either re-centre on the caliph and the block so the vizier is fully out, `[20.1, 520, 730, 1.7]`, or widen to keep him whole. Place the "?" on the dig block face at least 60 px inside the panel, and let the caliph's beard stroke (فأراد 19.32) finish with his eyes going to the "?" on يعرف 20.14.

### 10. 0.0 to 13.1 and 21.8 to 32.9 (S1, S2, S4 wide shots). MINOR. Half the panel is empty sand
- What: 0.0 to 5.8 the lower 55 percent of the panel is bare dune while the riders come in small behind the palm at the top left (f_3.5); 9.1 to 12.0 and 21.8 to 32.9 are at zoom 1.0 to 1.08 with the men about 90 px tall and the lower 30 percent empty.
- Fix:
  - S1: frame lower and tighter, about `[0, 330, 800, 2.0]`, so the ground line sits in the lower third, and bring the riders in front of the palm trunk (or move the palm 120 units left) so the caliph's entrance on الخليفة 2.62 is not hidden. Keep the tilt reveal to the wide pyramid on الأهرامات 6.96; that contrast (close, then vast) will be stronger.
  - S2: start at about zoom 1.5 on the caliph against the block for ضخامة 10.04 (his height arrow then reads), then tilt up as now.
  - S4: play the point and OPEN IT! at about zoom 1.5 on the two men and the dig block; widen only for the outline on إزالة 26.94 (the wide view is right for that), and keep w3 inside the right edge when the workers walk in (he is cut from 30.2 to 32.7).

### 11. 87.6 to 97.3 (S10, the realisation). MINOR. The deflation is too subtle, and the vizier's chest gag is lost
- What: the close-up is well framed, but apart from the turban scratch (90.2 to 91.0) the caliph stands hands on hips with the same face from 91.2 to 95.2; the planned drop on وأدرك 91.74 and the lens stare on شيئًا 94.34 cannot be told apart from the frames before them (f_94.4). At 96.0 to 97.2 the vizier holds the chest up by his face in a wide shot; the upturned chest and the single falling coin are a few pixels.
- Fix: on وأدرك 91.74 the hands slide off the hips and hang, shoulders sink (`sq 0.94`, body 8 px lower), brows up in the middle, `lid 0.45`, moustache droops; hold. On يربح 93.76 his eyes follow the rolling zero. On شيئًا 94.34 a slow blink (6 frames closed) and then the stare `gaze [0, 0.05]` held 0.7 s with no other motion. For المكلفة 96.12 cut to a two-shot at about zoom 2.0 on the vizier: chest upside down at arm's length above his head, two shakes, one coin drops and spins flat (0.5 s), apologetic smile.

### 12. Small items. MINOR
- 110.6 to 113.2 (S12): for about 2.5 s the frame is a bare wall of four blocks with a few sparkles, and the WONDER OF THE WORLD label sits on top of the sun so the rays stick out under it. Move the label below the sun or the sun to the right, and fill the hold: keep the storyteller inset on screen until 112.0, or start the first block dropping into its course on عجائب 111.94.
- 113.5 to 116.9: the builder is about 60 px; zoom 1.2 is too wide for "a block taller than the builder". Use about zoom 1.9 centred on the builder and the arriving block.
- 59.2 to 60.7: the TINY! label drifts out of the bottom-right while the camera pushes in; fade it before the push starts (by 59.86) instead.
- 127.8 to 129.7: the "? ? ?" sits on the sand under the pyramid, away from the chambers it describes; the chamber question marks already do the job. Remove the lower one or raise it into the sky beside the apex.
- English subtitle (report to the coordinator, not an animation task; text must not be changed by the animator): the chunk at 113.97 to 119.62 ends with a comma ("...carefully fitted stones,") where the Arabic sentence ends with a full stop. Otherwise the English is accurate, readable (two lines at most) and correctly timed.

## Reusable techniques worth adding to the Library
- **Wide-shot floor rule for the 1000 x 1230 world:** with the ground at y 900, any zoom below about 1.4 leaves a quarter of the panel as empty ground. Add to the guide: "people scenes: zoom 1.5 or more with the ground line in the lower third; zoom 1.0 only for scale shots of 3 s or less". A `frameOn(xs, groundY, {headroom})` helper that returns a camera key from the actors' x range would prevent this in every desert or plain set.
- **Equal piles for a comparison:** two piles of the same silhouette in two colours under matching colour tags, plus a plain two-bar equals sign drawn as shapes (never the outlined lettering font for single symbols such as `=`, `+`, `%`).
- **Demolition or plan outline as a state:** the red dashed outline that can be drawn on and later peeled off in chips is a clean way to show an intention and its abandonment; worth a small `planOutline(ctx, rect, {draw, erase})` effect.
- **Time-lapse with working figures:** sky from `skyCycle(u(t))` while strike cycles run at a multiple of t; record as a pattern beside the DAY counter.
- `pyramidSite` (far, face, section) and the macro joint with IRON and LEAD read well and are ready for the Library once the film is approved.

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1 to 8 change camera keys in 12 of 17 scenes and restage four of them (S8, S9, S11, S16); pushing in on a set drawn for zoom 1.0 commonly exposes new problems (cropped heads, labels and tags leaving the panel, the story cloud no longer fitting, thick outlines at zoom 3.4 to 4.0), and the readability of the cost pile, the sand dissolve and the final bow can only be judged from rendered frames. A short comparison review limited to 53 to 107 s and 129 to 178 s would be enough.
