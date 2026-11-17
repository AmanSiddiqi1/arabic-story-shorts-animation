Verdict: REVISE

# KD-012 The Hare and the Elephants: Fable review, round 1 (v1 render)

Reviewer model: claude-fable-5-2. Reviewed: `renders/KD-012_v1.mp4` through `review/v1_pack/` (all 29 strips, 0.0 to 168.8 s) plus eight frames pulled at 35.9, 44.5, 85.3, 92.5, 100.6, 118.0, 124.8 and 152.8 s.

**Blockers: none.** Every story event is present and in order, both subtitle languages are readable in every chunk, the LATER card and THE END are there, and no frame is broken.

**Why REVISE and not PASS WITH NOTES.** The two actions the whole story turns on do not read: the foot that crushes the burrow (43 to 46.5 s) and the king bending to the water (122 to 125 s). On top of that the film has five holds of 2.5 to 8 s in which nothing changes, against the series rule of a change every 1 to 2 s. What works well and should be kept as it is: the DAY counter and drying pond (7 to 12 s), PFFT (14.2 s), the cutaway rooms, the SAFE HOMES counter down and back up, the elder's thought cloud with the leg (56 to 61.7 s), the bulb, the climb, the moonrise behind the hare (84.2 s), the angry-moon cloud (90.2 s), BONK, the reflection breaking into slices and the black water (130 to 133.7 s), the king's bow (139.5 to 140.7 s) and the sun button at the end.

Subtitle text and timing are not touched by any note below.

## Notes (most important first)

### 1. 43.0 to 46.5 s: the raised foot does not read (the turn of the story)
**Wrong.** For 3.3 s the frame is frozen. The lifted front foot sits at chest height, tucked behind the trunk, and looks like a paw holding a pebble. It never hangs over B2, there are no three steps on the words, and in the rooms the hares face each other instead of looking up. CRUNCH at 46.5 then arrives with no build.
**Why it matters.** This is the turn ("their footsteps were heavy"), and the plan's suspense depends on a foot hanging over a family.
**Fix.** Do not use the rig's `lift` here. Reuse the drawing that already works: the grey leg column with toenails from the elder's cloud (57 to 61 s), as a large foreground foot prop that enters from the top edge of the panel.
- Camera at 43.08: centre on the B2 doorway, zoom about 2.0, so the mound and doorway sit at about 55% of the panel height and the room with mother and kit fills the lower third. The king's body is out of frame; only the foot and its shadow matter.
- Foot descends in three counted drops with a 0.1 s dip before each: sole at the top edge on 44.02 (خطوات), half way on 44.70 (الفيلة), a hand's width above the mound on 45.50 (ثقيلة). Use `countedBeats` for the three onsets. A `halftoneShadow` ellipse on the mound grows with each drop.
- Room acting: mother and kit `gaze` up at the ceiling from 43.5 (`lookAt` to the foot), `wet` 1 from 44.70, kit `sq 0.92` + `tremble` from 45.50; two ceiling crumbs fall on each drop.
- Hold the hover 45.50 to 46.45, then the slam and the existing collapse. Cut back to the wider shot only at 46.7 so the escape by the back tunnel is seen.

### 2. 46.5 to 47.2 s: CRUNCH! is printed across the king's face
**Wrong.** The lettering covers the king's eye and trunk for 0.75 s, and it sits a body-height away from the impact.
**Why.** Plan rule: lettering never on a face; the word should mark the crushed mound.
**Fix.** Place CRUNCH! over the collapsed mound of B2 (in the dust burst, low in the panel), rotated a few degrees, on the same in/out times.

### 3. 36.5 to 38.7 s: "The elephants hurried toward the water" over a shot with no elephants
**Wrong.** The pan from the rock to the lake shows hares and water only; the first elephant appears at 39.0, after the words أسرعت الفيلة نحو الماء (36.57 to 38.94) are over. The charge itself, which was to make the mounds jump, is never seen at speed.
**Why.** The sentence's subject is missing from the picture, and the stampede is the cause of everything that follows.
**Fix.** Keep the pan but let it follow the herd: king, cow and scout enter from the left at 36.08 on fast `walk` keys with `footfalls` driving `dustBurst`, eyes and `gaze` fixed forward on the lake, scout a beat late with `stagger`. Camera leads them by a third of the frame so the lake slides in ahead of them on 38.40 (الماء). Hares on the mounds `kick` on each footfall and dive into their doors as the first foot passes. The low angle at 38.94 then cuts in on feet that are already running.

### 4. 122.0 to 125.6 s: the king does not bend
**Wrong.** On انحنى the camera pushes in but the king's head stays at standing height with the trunk hanging straight (frame 124.8). The bow he performs later at 139.5 to 140.7 proves the rig can do it.
**Why.** "Bent down to look at the reflection" is the action that puts the trunk in the water; without it the stir looks deliberate.
**Fix.** Use the 139.5 bow pose here: head `drop` and forward `rot` easing in from 122.06 to 123.06 (انحنى ملك), `gaze` locked on the reflection with `lookAt`, ears forward, eye `wide`. The trunk then sags toward the water as a consequence of the lowered head from 124.50, tip touching on 126.16 as now. Frame so the king's eye, the trunk tip and the reflection are all inside the panel at zoom 1.9 (at present the king's head is cut by the left edge from 126 s); move the king 60 to 80 units right or centre the camera left of the reflection.

### 5. 113.7 to 122.0 s: eight seconds with nothing changing (longest hold in the film)
**Wrong.** From the reflection's arrival to the bend, the lake triangle is a still. The planned double take (114.24), the hare's point (117.20), the hush (119.68) are absent or too small to see; the king looks straight ahead, not at either moon (frame 118.0).
**Why.** This is the hare's con; the audience has to see him sell it and the king buy it.
**Fix.**
- 114.24 (على): king double take. `gaze` up to the sky moon, down to the water moon, up again in 2-frame saccades (`gazePlan` ease 0.07), ears `earUp`, a 6 px head tilt following the eyes.
- 116.14: push to a two-shot (`twoShot(king head, hare)`, zoom about 1.6) that keeps the reflection in the bottom of frame; the hare is too small to act at the present width.
- 117.38 (انظر): hare `raise` arm pointing down at the reflection with `anticipate` first, `talk` on, ears up. A short yellow arrow from his paw to the reflection is allowed here.
- 119.43 (ولا تزعجه): hare leans forward (`tip`), brow down, paw to mouth for the hush; king's ears flatten and he freezes (`noBlink`).
- 120.6 to 121.5: keep the silent beat, but give it one thing: a single slow ripple line crossing the reflection, and the king swallowing (small `hbob`).

### 6. 107.7 to 112.0 s: four seconds of a static moon; and the hare leads from off screen
**Wrong.** (a) 108.0 to 112.0 is one unchanged frame while the narrator says the moon was shining. The moon is also already in shot from 105.2, so nothing is revealed on القمر (109.90). (b) 103.7 to 106.0: the hare has hopped out of frame, so "the hare led him" shows only the follower.
**Fix.** (a) Keep the moon out of frame until the tilt: hold the camera low on the walk, start the tilt up at 107.14 (ليلة) and land on the moon on 109.90. On 110.48 (يلمع) pulse the moon's halo once and let three `star` twinkles fire; king and hare both `gaze` up, king's ears lift. Arrow down on 112.04 as now. (b) During 103.6 to 105.9 frame both: camera centred between them, the hare two hops ahead, looking back over his shoulder on each landing (`turnFlip` or `gaze` back) and beckoning once at 104.24; the king's tiptoe and TIP TOE stay.

### 7. 81.0 to 84.0 s: three frozen seconds before the hare's big line; king asleep under the moonrise
**Wrong.** 81.0 to 84.0 is a still: no chest tap at 83.42, no reaction from the king. At 85.3 the king's eye is a closed line, so the moonrise that should wipe the smugness off him appears to happen while he dozes.
**Why.** The moonrise is the film's best image; the king's face is what tells us it worked.
**Fix.** 81.1: king arrives smug: `eyes:'smug'`, `brow -0.6`, slow blink, one ear flick, trunk swinging idly; a short snort puff from the trunk at 82.0 in the pause. 82.70: hare draws himself up (`sq 1.08`), 83.42 chest tap with `anticipate`. 84.16 to 84.80 moonrise as now. 85.48: king's `gaze` climbs to the hare and moon (`lookAt`), eyes `wide`, `brow` up, ears flatten back, crown lags the head tilt by 2 frames; hold that open-eyed look to 86.5.

### 8. 151.5 to 153.5 s: the gentle moment looks like a scowl; a rock sits on the king's back
**Wrong.** On ولن نؤذي هذه الأرانب the king has a low angry brow and half lids (frame 152.8), so the promise reads as a threat. The kit is only a pair of ears in a doorway under two trunks. From 143.0 to 153.5 the top of the rock pokes above the king's back and reads as a hat or howdah.
**Why.** This is the resolution and the only tender beat between the two sides.
**Fix.** King: `brow` slightly raised (positive), `lid` about 0.3 with a slow blink, `wet` 0.5, head `drop` toward the kit. Kit: comes fully out of the doorway on 151.98, sits upright, ears trembling, nose up; trunk tip lowers on 152.44 and touches the nose; the kit's ears spring up and `sq 1.08` on the touch. Push to a close two-shot of trunk tip and kit (zoom about 2.2) from 152.2 to 153.4, cow and scout out of frame. Staging: move the herd meeting 150 to 200 units left (or the camera so the rock is out of frame) so nothing grows out of the king's back.

### 9. 27.2 to 28.0 s: the lake is on screen for 0.75 s
**Wrong.** The whip-pan lands on the lake at 27.2 and the film cuts back to the elephant at 28.0, while بحيرة جميلة runs to 28.97. The label THE LAKE barely registers. Hares are also already standing by the lake before their introduction at 30.42. The 22.7 to 27.0 walk before it is one elephant ambling for 4.3 s, and 20.7 to 22.5 is an empty frame for nearly 2 s.
**Fix.** Hold the lake to 29.0 (sparkles, one `ripple`, label up from 27.26 to 28.9). Put the finder's joy in the same shot: trunk and head enter from the left edge at 27.94 with the trumpet (`soundArcs`) and a bounce, rather than cutting away. Remove the hares from this shot. Earlier: at 25.53 (وجد) the lead elephant's ears snap up and it stops dead (`anticipate`, eyes `wide`) so the whip-pan has a cause. At 20.56 keep the scout in frame for its look back at the dry pond instead of the empty plain; start the wipe from that look.

### 10. 91.7 to 94.5 s and 134.2 to 139.2 s: small, static figures on the hare's two accusations
**Wrong.** (a) The witnesses on the rubble are a 2.8 s still, two small hares hugging; no over-acting, no nudge. (b) After AAH! the camera goes wide and the hare is about 40 px tall; "You have angered him again!" has no visible gesture for 4 s.
**Fix.** (a) Zoom about 1.7 on the witnesses. 91.42 (آذيتم): one points at the collapsed mound, `wet` 1, `teardrops`; 92.28: the second forgets to look sad, gets nudged, and overdoes it (ears flop, `tip` forward); 93.34: both glance sideways at the king to check it is working. (b) Stay close after AAH!: `twoShot(hare, king head)` at zoom about 1.6 from 134.2. 135.65 (أرأيت؟): hare flings one arm at the empty water, ears straight up. 137.06 (أغضبته): arm swings to point at the king, `brow` hard down, `talk`. King shrinks on each: `sq 0.96`, `tremble`, ears back, crown slips at 137.86 as now. Cut wide only at 139.28 for the bow.

### 11. 51.0 to 72.2 s (S5) and other wide shots: figures in a thin band, half the panel empty
**Wrong.** In the meeting the hares occupy a strip about 15% of the panel height, with empty orange above and empty ground below; the fear shrinking in three steps and the ear wave cannot be seen. The same looseness appears in S1 (0 to 7 s: the king is cut by the left edge until 3.5 s while the top half is sky) and S11 (157 to 162 s).
**Why.** On a phone these characters are a few millimetres tall; the acting is being done and thrown away.
**Fix.** S5: zoom 1.5 to 1.6 with the ground line at about 70% of the panel height, so heads sit mid-panel and the clouds still fit above. Cut in to the colony (zoom 2) for the three-step duck on STOMP (58.26) and the ear wave on 60.82, and to the hero for the idea at 62.4. S1: start with the camera 80 units further left so the king's whole head is in frame from 0.0. S11: zoom 1.4 on the returning hares from 157.68; the cutaway rooms can sit lower. Also in S5: the grey and blue object beside the stump that FAR AWAY points at (53.5 to 55.0) is unreadable; point the arrow at the huddle, or remove the object.

### 12. Small items
- 88.6 to 91.5: the yellow arrow from the hare runs off the right edge toward a lake that is not in frame, so it points at nothing. Either drop it (the 87.0 to 88.0 lake shot already says "this lake") or widen for 88.62 to 89.3 so the arrowhead lands on the water.
- 99.5 to 102.2: 2.7 s still on the question. On وأين (100.81) give the king a head tilt and `hbob`, on القمر؟ (101.64) a look up at the cloud and back to the hare. The trunk question mark is hidden behind the rock ledge; raise it clear of the rock or shift the king left.
- 142.04: the squeak that stops the king's foot is not visible. Add `soundArcs` at B4's rubble and a frozen `lift` with ears up for 0.5 s, or cut the idea.
- 7.0 to 7.4: the DAY burst overlaps the sun on its first pass; start the sun's arc lower or the counter 60 units right.
- 40.8 to 42.2: the BURROWS! label covers a room with hares in it; move it into the earth between rooms.
- Animator's skipped items: dropping HIS FRIENDS and OOPS is fine (the pictures carry both). The scout head turn in S10 is not missed. The S4 lake cut-in being replaced by a pan is the cause of note 3.

## Reusable techniques for the Library
- **Foreground foot prop** (`bigFoot`): the leg column with toenails and a growing ground shadow, entering from the top edge and driven by `countedBeats`. Needed here and useful for any "giant over small" beat; it sidesteps the elephant rig's weak close-up `lift`.
- **Cutaway burrow rooms with collapse states and a SAFE HOMES counter** (already built here): move to `Library/` once approved; KD-005 and KD-008 can share it.
- **`moonReflection` slices** (wobble, break-up, vanish, return with a tint): the strongest effect in the film; register it with the sun variant used at the end.
- **Disc-behind-figure reveal** (white figure on a rising yellow disc on the cue word): record in the Capabilities Guide as a staging pattern.
- **Hold audit**: a small tool that flags any stretch longer than 2 s in which consecutive sampled frames are near-identical would have caught notes 1, 5, 6, 7 and 10 before render.
