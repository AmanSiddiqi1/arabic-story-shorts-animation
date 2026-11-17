Verdict: REVISE

# KD-009 The Monkey and the Carpenter: Fable review, round 1 (v1 render)

Reviewer model: claude-fable-5-2. Material: all 28 strips of `review/v1_pack`, `narration.txt`, `planning/creative_plan.md`, `notes.md`, plus 20 frames pulled from `renders/KD-009_v1.mp4` to check detail (read only).

**Blockers: none.** The story events are all present and in order, subtitles are readable in both languages, the LATER card and THE END are there, no broken frames seen.

**Why REVISE:** the two moments the whole film hangs on, the snap (102.5 to 111) and the lesson (153.5 to 162), do not land yet. The victim's face is out of frame at the snap, he screams lying down, and the "hand starts to copy, then stops" payoff is hidden behind leaves. The rest is solid and mostly needs framing and a few acting beats.

What already works and should be kept: the leaf reveal and CURIOUS! (14.5 to 16.5), the eye line (17.2 to 18.2 and 158.2 to 159.2), the log carry and drop (20.5 to 26.5), chalk line and ghost halves 1 / 2 (28 to 30), the strain face with HNNGH! (93 to 94.5), the taut-tail leap that stops dead (112.0 to 112.7), the sad insert with STUCK! (115 to 116.7), growing pain rings with OW! (118.2 to 119.2), the kneel and the monkey taking his own tail back (133 to 137.7).

## Notes (most important first)

### 1. 102.48 to 111.0: the monkey spends the whole climax lying down, and his face is not in the snap shot
- **Wrong:** at خرجت 102.48 he flies back and then stays flat on the log until 111.0. That is 8.5 s covering the triumph, the snap, the delayed realisation and the scream. As the notes say, it reads as lying on his side. The triumph pose with the wedge (103.40) is not readable, and in the snap insert (105.6 to 108.3, zoom 2.8) only one foot and an ear are in frame at the left edge.
- **Why it matters:** the joke is "smug, then SNAP, then he feels it". All three need his face. A scream from a lying figure has no power.
- **Fix:** keep the fly-back as a 0.5 s tumble only (102.48 to 103.0, `tip` to about -1.2, legs up), then let him rock back up to the same seat (x 640) by 103.40 using `anticipate` + `settleTo`. On القطعة 103.40 he sits upright facing camera, one straight arm holding the wedge high (arm angle near vertical, not a hand near the head), `mouth: 'smirk'`, chest out (`sq` 1.05). On الصغيرة 103.94 he tosses it over his shoulder to the right (keep the existing spin and landing). The tail hangs behind him into the gap exactly as in 78.7 to 100, so no new tail route is needed.
- Snap shot: replace the zoom 2.8 key at 105.6 with about `{x: 640, y: 770, zoom: 2.0}` so that his head, the seam and the mouth are all in frame. He is still smirking through 105.78 to 107.8.
- Delayed take, seated: القرد! 108.36 smile freezes (`lid` 0, pupils small), 108.6 look to camera `gaze [0, 0.05]`, 108.9 look down at the seam, صرخ 109.98 scream upright with `sq` 1.12, arms up, `mouth: 'open'`, YEOWW! above him. This also removes the lying pose problem completely.

### 2. 105.78: the SNAP itself is small and off to the side
- **Wrong:** the SNAP! burst is about one fifth of the panel width and sits in the sky away from the seam; with the snap silent by rule, picture is all there is.
- **Fix:** burst at least 45 % of panel width, centred just above the seam, popping from scale 0.4 to 1.15 to 1.0 over 5 frames starting 105.78 and held to 107.0. Keep the 3 frame close, the white flash and the dust jets; add 6 to 8 black speed lines radiating from the seam for 6 frames and make the upper half overshoot down 4 units and settle (`settleTo`). Raise the panel-only shake from 10 to about 16 units decaying over 0.5 s. On ذيل 107.86 give the first tail throb a ring that is as large as the later OW! rings so the viewer's eye goes to the trapped spot at once. (Still recommend asking the user about one very quiet thud; not a reviewer decision.)

### 3. 153.54 to 157.1: the lesson (hand starts to copy, he stops himself) cannot be seen
- **Wrong:** at zoom 2.0 the two foreground leaf clumps cover both arms. From 153.5 to 156.2 the strips show a sulking face only; then NOPE! appears with no visible cause.
- **Why it matters:** this is the moral shown as a choice. It is the payoff of the copycat gags at 15.9, 33.7 and 50.0.
- **Fix:** from 153.3 slide the two clumps apart by about 45 units each (same motion as 14.48) so the torso and both arms are clear. لكنه 153.54: right arm rises and makes two clear sawing strokes in the carpenter's rhythm (cut to it straight from the carpenter sawing at 152.2 to 153.3 so the match is obvious), with a faint dashed ghost saw in the hand. هذه 154.18: tail throb ring + star, he freezes mid stroke, eyes snap to the tail. لم 155.20: head shake (two `tip` swings of 0.12), he grabs the guilty wrist with the other hand and tucks it under his arm. تقليده. 156.36: NOPE! as now. If the clumps must stay, lower them instead; the arms have to be in the clear.

### 4. 35.58 to 46.06: the wedge, the key prop, is planted weakly and its purpose is told rather than shown
- **Wrong (a), 35.9 to 38.7:** the wedge is a tiny red-capped sliver inside an emphasis ring that overlaps the carpenter's face and hand. It reads as a pin or lollipop.
- **Wrong (b), 41.3 to 46.0:** "HOLDS IT OPEN" has a ring and two small red arrows (one of them down on the ground under the log), then the carpenter stands with folded arms for a full 2 s (44.0 to 46.0). The plan's proof (hand presses the top half, it springs back; double arrow in the gap) is not in the film.
- **Why it matters:** the suspense from 78.7 only works if the audience has learned that this small piece is all that keeps the log open.
- **Fix (a):** on قطعة 36.32 show the wedge as an insert: draw it at 3x in a round inset (or simply held out at arm's length to the LEFT, over the sky, away from his head), yellow body with the red head, emphasis ring around the wedge only, label WEDGE or SMALL PIECE with an arrow on صغيرة 36.88. Hold to 38.0, then داخل 38.74 push it in as now.
- **Fix (b):** in S3 step the carpenter 60 units to the right (about x 820) so only his arm crosses the log end. تُبقي 43.14: two fat red arrows, one above the top half pointing down and one below the bottom half pointing up, both touching the log (not the ground). النصفين 44.04: his palm presses the top half down, the gap closes by a third against the wedge, the wedge flashes; he lets go and the half springs back with `settleTo` (one overshoot). متباعدين 44.76: yellow double-headed arrow standing in the gap. Then the pull out at 46.1 as now.

### 5. 77.36 to 100.4: 23 s on almost one framing, and the tail in the gap fades from attention
- **Wrong:** after the nice red arrow at 79.7 the shot stays a mid shot with the monkey's arms and legs in front of the gap. The tail is the same brown as the log, and from 90 to 100 it is hard to pick out. The plan asked for the tail to be visible in every shot of this section.
- **Why it matters:** the audience should be thinking "your tail!" for the whole pull.
- **Fix:** give the tail tip a lighter belly-colour tuft (story-local, in `monkeyK`) so it reads against the dark blue gap, and let it twitch once every 2 s (`swing`) so it draws the eye. داخل 83.52: when he puts one eye to the gap, make the tip flick right in front of that eye and have him miss it. Break the framing three times: push in to about zoom 2.6 on the face for بكل 93.94 (red face, HNNGH!), cut to an insert of wedge + tail tip at تحركت 96.07 (wedge jerks out 6 units, top half sags 3, tail tip directly underneath), and back to the mid shot for the three tugs at 98.08. At وفجأة 101.73 the wedge hangs by its tip and wobbles for a full second before 102.48 (the "!" at 100.5 is fine, the hold is what is missing).

### 6. 51.3 to 60.7 and 120.1 to 124.0: the blue sky without sun or cloud reads as night
- **Wrong:** after the LATER card every medium shot crops the sun out, leaving flat dark blue with two yellow ray stubs at the top edge. "After a short while" looks like nightfall. At 120.2 to 123.7 the white wail arcs are thin crescents floating in that blue and read as crescent moons.
- **Fix:** keep at least one white `cloudFlat` (two is better) low enough to be inside every medium frame from 51.2 to the end, and bring the sun down so that a clear part of the disc is visible in the mediums at 51.5 to 60 and 126 to 142. For the wail (أكبر. 120.12): three concentric arcs that start at the monkey's mouth and travel right to the cottage window, stroke 5 to 6, in yellow with a black outline, each fading on arrival; never free-floating.

### 7. 51.3 to 60.7: the monkey is out of frame while the carpenter leaves
- **Wrong:** camera x 640 to 790 at zoom 1.4 shows only the branch tip and the bird. The plan's beat (his eyes follow the carpenter to the door, then snap back to the log) is missing, so the yard being "unguarded" is not felt. The yawn and the door are also small.
- **Fix:** either widen to about zoom 1.2, x 520 from وذهب 57.18 so the perch is in frame, or (better for size) keep the medium and add a round inset in the top left corner (monkey head and shoulders between the leaf clumps, about 220 px across) from 57.18 to 60.7: pupils track the carpenter right, hold on the door as it shuts (59.56), then snap to the log and the brows lift on 60.9 with the door thud. For بالتعب 54.52 exaggerate the yawn: arms up stretch, head back, `lid` 1, a "YAWN" letter-puff or three Z's, shoulders drop (`sq` 0.96, `tip` 0.08) on the exhale.

### 8. 0 to 9, 18 to 31, 139 to 145, 160 to 165: the wides are too far away for a phone
- **Wrong:** at zoom 1.06 the carpenter is about 8 % of the panel height and the bottom quarter of the panel is empty brown ground. The first 9 seconds (the hook) are a tiny man walking out of a tiny door.
- **Fix:** (a) open closer: start at about `{x: 760, y: 720, zoom: 1.7}` on the door and the carpenter stepping out (نجار 2.92), stretch at يعمل 3.56 at that size, then ease out to the wide by الغابة 5.57 for the bird and the forest, and hold the wide only until the existing push at 8.82. (b) Use zoom 1.25, x 540 as the standard wide (perch at 215 and door at 880 both still fit) and raise the y bias so the ground band is about 12 to 15 % of the panel. (c) Dress the remaining ground: a strip of sawdust and shavings under the work spot, a few grass tufts or a worn path in the foreground, so it is not a blank slab. (d) In 139.58 to 142.2 the pull out is correct for "he steps back", but the three seconds are static: let the carpenter take the three backing steps during وابتعد 138.99 to 140.16 inside this wide (they are over before the pull out now), palms low, and let the monkey's tremble visibly die away on يهدأ 140.70 with one long out-breath.

### 9. 126.93 to 131.2: "he understood what happened" is a 4.5 s near-static two-shot
- **Wrong:** after the skid and "!" the straight-on carpenter stands beside the log; the plan's reading order (tail, wedge on the ground, monkey) with the dotted line joining the three is not visible in any strip. The monkey's weak point at his tail (127.2) is small.
- **Fix:** الخشب، 128.20: head and pupils go to the trapped tail (small ring pulses there), 128.6: to the stray wedge on the ground by his feet (ring pulses, wedge gives one little hop), وفهم 129.28: back up to the monkey; draw the dotted line tail to wedge to monkey as each is looked at, then a small "AH!" or a lightbulb-style emphasis over his head. ما 129.82: slow head shake with half a smile, then the calming open palm toward the monkey at 130.4. Give the monkey an answering beat: he points at the tail with a straight arm (arm angle, not a hand near the body), `wet` eyes, brows pleading, and looks away guiltily when the carpenter looks at the wedge. On أداة 132.36 the pry bar is thin and dark against the log: thicken it, give it the yellow or red handle of the tool row, and flash an emphasis ring on it once.

### 10. 66.77 to 76.52: the thought cloud is mostly a brown slab
- **Wrong:** inside the cloud the log fills three quarters of the area and the little carpenter (and then the monkey in the cap) is about 45 px tall in the far right corner. The cap gag at 73.9 is the funniest idea in this stretch and it is nearly invisible. The cloud also sits on top of the sun and the white cloud.
- **Fix:** inside the cloud frame the figure waist-up with only the log end and the saw (figure at least 110 px on screen, per the Capabilities Guide), about scale 2.4 instead of 1.45. On ويمكنني 74.37 swap with a pop (scale 0.8 to 1.1 to 1.0) to the monkey in the oversized cap, sawing fast and winking, with a tiny star or "PRO!" sparkle. Hide the scene sun and cloud while the thought cloud is up, or move the thought cloud left of them.

### 11. 157.75 to 165.29: in the final image the monkey has all but vanished
- **Wrong:** in the ending wide he is a few brown pixels behind two leaf clumps at the left edge; the palms-away pose on الأدوات 161.24 and the bird on the mallet (160.10) do not read. THE END sits exactly on the sun, with rays poking out under the box.
- **Fix:** end on the tighter wide from note 8 (zoom 1.25) and part the clumps enough to show head, shoulders and both raised palms; on الأدوات. 161.24 he shows both palms toward the tools and leans back (`tip` -0.12), small and hunched (`sq` 0.93). Give the bird's landing a small hop and a pop ring so it is noticed, and let the monkey's eyes flick to it with alarm. Slide the sun about 200 units right before 162.4, or place THE END in clear sky.

### 12. Smaller polish
- 14.0: the move from the carpenter to the tree takes about 0.6 s and passes through one muddled frame (half a sun, half a carpenter). Make it a clean cut at وكان 14.04, or a full 1 s pan.
- 33.0 to 34.2: the GAP label box hangs off the sun's rays; drop it 40 units into clear sky. Same check for EASY! (clear) and HOLDS IT OPEN (clear).
- 62.5 to 63.0: the descent is a hop and a slide in half a second, as the notes say. Acceptable; a hand-over-hand pose down the trunk for 0.4 s more would read better as "climbed down", but only if time allows.
- 104.0 to 104.7: the tossed wedge is a nice arc; let it bounce once and settle where the carpenter later looks (note 9), with the existing click in the gap after 105.0 only if it does not touch a word.
- 121.2 to 123.7: the face in the window is a good idea; enlarge the window framing slightly or add one "?" so the head jerk on سمع 122.27 is seen. The spoon drop does not read at this size and can go.
- 142.68 to 144.0: the return leap with the limp red tail trailing is good; add two or three falling leaves on the landing at الشجرة 144.00 (the plan has them; only one or two specks are visible at 145.5).
- The carpenter is always straight-on. Not worth a rebuild for this film; where he works at the log end, a constant `gaze` down-left at the cut and a slight `tip` toward it are enough.

## Reusable techniques worth adding to the Library (after approval)
- `splitLog` with `kerf` / `gap` / `wedgeOut` scalars, the kinked `tailPath` and the taut-tail leap that stops in mid air (112.0 to 112.7): a general "tethered jump".
- `painPulse` (growing rings + stars with a size parameter) and the travelling sound arcs from note 6 as one `soundArcs(from, to, t)` helper.
- A round `inset(box, drawInside)` for off-screen reactions and prop close-ups (notes 4 and 7); a `leafPeek(open)` control for the perch clumps (notes 3 and 11).
- Template: a standard tall-panel wide (zoom 1.25 with the y bias) and a rule that a wide never holds more than about 15 % empty ground.
- Guide entry: "the victim's face stays in the shot at the hit" (same family as the existing two-shot rule), and "a character who must scream or react does it upright; lying poses read as side views with this cast".
