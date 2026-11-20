# Animation Capabilities Guide (living document)

What our shared animation system can do, when to use each capability, which Library code implements it, where it has been used, and its limits.
Read this **before staging a new story**, together with the catalogue (`catalogue/cast.png`, `catalogue/sets.png`) and [README.md](README.md).

- **Status:** ✅ implemented (in `Library/`, tested). 🟡 implemented in one story only, not yet generalised. 💡 recommended by the Fable 5.2 director, not implemented yet.
- **Updated:** after each story of the 2026-11 five-story upgrade. The history is at the end.

Working method (from the upgrade so far): every character always has a **gaze target** and **blinks**, every pose change has **anticipation and settle**, groups **never move in unison**, and lettering **never covers a face**. Opus creates, Fable reviews, Opus improves.

---

## 1. Character acting and facial expressions
| Capability | What / when | Implementation | Example | Limits / next |
|---|---|---|---|---|
| ✅ Shared acting fields | `gaze`, `lid`, `wet`, `sq` (squash/stretch), `tip` (whole-body tilt), `alpha` on **every** character. Use them on every pose. | `registry.js` `acting()`, `core/helpers.js` `eye2` / `EYE` | All five upgrades | `lid` closes both eyes; use `wink` (person) for one eye. |
| ✅ Wink / one eye open | A conspiratorial wink, or feigned sleep with one eye open. | `person` `P.wink = 'L' \| 'R'` | Thief 49.3 (owner winks at his wife); 104.6-136 (one eye open while "asleep") | Person only so far. 💡 per-eye lids for the animals. |
| ✅ Mouth / brow sets per character | `mouth` (closed, smile, frown, o, open), `talk`, `brow` (positive = angry V, negative = raised) | each cast file | Thief owner `brow -0.4` (sly) | 💡 Fable (Monkey): a real raised/worried brow and a one-sided smile for the monkey and turtle. |
| ✅ Raised/worried brow, one-sided smirk | Negative `brow` on monkey, turtle and person = raised/worried; `mouth: 'smirk'` on monkey and turtle. | cast files | Monkey: the false-innocent mask 127-140 (brow −0.5), the taunt smirk 156.8 | |
| 💡 Named expression presets | `expr(P, 'sly' \| 'frightened' \| 'groggy' \| 'pleading' \| 'stifledLaugh' \| 'shame')` mapping to each species' fields | not yet | Thief review item 5 | Would make first drafts richer with less code. |

## 2. Eye movements, gaze, blinks and emotional reactions
| Capability | What / when | Implementation | Example | Limits / next |
|---|---|---|---|---|
| ✅ Gaze at a target | Pupils point at a world point: the listener at the speaker, a thief at the hole, a lark at the nest. | `lookAt(from, to)` -> `P.gaze` | Lark experiment; Thief throughout | Pupils only; add a 3-6 px head `tilt`/`drop` toward big gaze changes by hand. |
| ✅ Gaze plan | Eyes that hold on a target and ease to the next on cue words: `look(T, headPos, [[t0, pt], ...])`. | `gazePlan`, `look` (`motion.js`) | Thief: owner tracks the feet on the roof, then his wife, then the hole | 💡 saccade mode (2-frame snaps for darting eyes). |
| ✅ Blinks | Natural seeded blinks, one seed per character; suppress during held shock. `P.lid = Math.max(P.lid \|\| 0, blink(t, seed))`. | `blink` | Thief all characters | |
| ✅ Wake quietly | One eye, then the other, pupils sliding along the ceiling. | `wink` + `lid` ramp | Thief 21.15-22.6 | 💡 generalise as `wakeQuietly(t, t0)`. |
| ✅ Look to camera | The one deliberate lens stare (shock, "uh-oh"). `P.gaze = [0, 0.05]`. | gaze vector | Thief 93.3 (thieves' shock), 134.2 (the realisation) | Use rarely. |
| ✅ Auto-blink for everyone | Set `LIFE.t = t` once per frame (and back to `null` after) and every character without an explicit `lid` blinks on its own seed; `P.noBlink` opts out. Keep `LIFE.t = null` inside any approved section that must stay frame-identical. | `registry.js` `LIFE`, `lifeSeed` | Lion, Lark (outside 20.2-46.5), Fox | Explicit `lid` overrides it, so add hand blinks to characters with a set lid. |
| ✅ Saccades | Thinking or scanning eyes: `gazePlan(t, plan, 0.07)` gives 2-frame snaps with holds between. | `gazePlan` with a short ease | Lark 81.3-82.8 (the plan forming), Fox 46.6-48.1 (nothing there) | |
| ✅ Blind face | After the X eyes of the hit, use `eyes: 'shut'` with a worried (negative) `brow` so the character can still act with ears, head and trunk. | elephant `eyes`, `brow` | Lark 103.5 on | |

## 3. Body language and gestures
| Capability | What / when | Implementation | Example | Limits / next |
|---|---|---|---|---|
| ✅ Hand targets with arm IK (person) | Put a hand on a point: `P.handR = [x, y]` (figure-local, feet at 0,0). The elbow bends outward automatically. | `armTo` in `core/helpers.js` | Thief: nudging, sleeve tug, hands to cheeks | Arms are short (~74 units): "overhead" ends near head height. For raised arms use `aL/aR` angles (~[±2.45, ±2.85]). |
| ✅ Gesture library (person) | `PERSON_HANDS`: hush, cupMouth, cupEar, chin, moustache, pointUp/Fwd/Down, wave, headHold, mouthCover, cheeks, armsOut, shield, chest, folded, palmsUp, grip, reach, reachBoth, clasp, hipsHands. See the catalogue "gestures" rows. | `PERSON_HANDS` | Thief: hush 25.7, thumb at the roof 27.3, whisper 32.4, wife's cupped call 41.8, the rope grip 88.2 / 128.4 | 💡 the same for the monkey (two-segment arms) and the hare paw. |
| ✅ Setup and payoff pose | Show a pose in the setup (the flashback grip) so the payoff copies it. Use **arm angles** for poses that must read at a distance; hand targets near the head read as a salute. | `GRIP = {aR: [2.3, 2.42], aL: [1.95, 2.12]}` (Thief) | Thief: two-fist grip at 88.22 (flashback) = 128.4 (leader) = the hang | Fable review 2 caught the first version (hand at forehead) as unreadable. |
| ✅ Hand targets for the monkey | Same IK as the person figure, shoulders at ±30, y −92. | `monkey` `handL/handR` | Monkey: pats the shell, chest taps, palms up, points back at the tree | |
| ✅ Fox reach and planted sit | `reach` (0..1) stretches the near foreleg to touch something (paw at about x+185, y-70); `plant: true` with `sit > 0` draws both front legs straight down so the sit reads as sitting. Off by default. | `fox` `reach`, `plant` | Fox touch 96.5-98.3; the moral 139.4-157.7 | |
| ✅ Bird mime | A small bird acts an instruction without lettering: jab the beak (peck), shut eyes and sway (blind), sit low (`sq` 0.85), head back with beak open (be loud), dip to the water (drink), `sag` −0.8 throws a wing to point. | `bird` `drop`, `headRot`, `sag`, `beak`, `lid`, `sq` | Lark 90.4-93.1 (crows), 135.4-145.9 (frogs) | |

## 4. Movement, weight and physical animation
| Capability | What / when | Implementation | Example | Limits / next |
|---|---|---|---|---|
| ✅ Walk without sliding | Leg phase from the distance travelled; amplitude from speed. | `walk`, `speed` | Lark elephant | Quadrupeds and person. 💡 `swim()` for the turtle (stroke phase from distance, wake). |
| ✅ Footfalls | Landing times to drive dust, thuds, micro-shake and small objects hopping. | `footfalls`, `kick`, `dustBurst` | Lark arrival; Thief TIP/TAP steps | |
| ✅ Jump arc + landing | Anticipation crouch, stretch on take-off, arc, squash on landing. | `anticipate`, `hop`, `landSquash` | Thief leader jump 129.25-130.3; owner's spring-in 141.1-142.4 | 💡 `leap(t, a, from, to, h)` bundle; chainable two-stage leaps (Monkey). |
| ✅ Accelerating fall + impact | Gravity fall, then a 2-frame deep squash, rebound and settle. | `fallY`, `impactSquash`, `rebound` | Thief 135.14-136.1 | |
| ✅ Damped swing | Dangling legs, a hanging sign, a tail after a stop. | `swing` | Thief hang 130.3-131.9 | |
| ✅ Tremble / breathing | Fear and crying shake; idle breathing on long holds. | `tremble`, `breathe` | Thief: the wife's fear 27.3; idle thieves | |
| ✅ Blind grope | Each step: the trunk (or hand) taps ahead, then a short step, a pause; head low, ears wide. Steps as segments `[t0, t1, x0, x1, n]`. | `eX`/`gropeTap` pattern (Lark `SEG`) | Lark 105.9-112.8, 150.6-154.6 | 💡 move into `walk()` as a `grope` option. |
| ✅ Teeter, fall, failed climb | Foot finds air, body tips (`rot` 0.22), rear legs scrabble with dust, a held brink; release on the word; `fallY` with real acceleration; impact squash, dust column; two climbs (rear up, slide back with scrape marks, the second weaker); slump. | `fallY`, `impactSquash`, `rebound`, `settleTo` | Lark 161.98-167.3 | 💡 `teeter()` + `scrabble()` bundle. |
| ✅ Strike cycle (branch, mallet, knocker) | Gap at rest; lift 0.3 s; whip down (ease-in); contact on the hit time; damped rebound with no second contact. One near miss with no sound teaches cause and effect. | Fox `branchTipY` | Fox 61.2-71.4 (66.0 the near miss) | 💡 `strikeCycle(t, hits)`. |
| ✅ Struck object reacts | 8 % squash, 3-unit hop, ripple rings from the strike point; after damage, almost no reaction (the voice is gone). | Fox `drumWrap` | Fox hits; after 123.6 | |

## 5. Anticipation, follow-through and secondary motion
| Capability | What / when | Implementation | Example | Limits / next |
|---|---|---|---|---|
| ✅ Anticipation | Crouch or dip before any big action; also a 0.1 s dip before each counted beat. | `anticipate`, `countedBeats().dip` | Thief: the crouch before the leap; the chant | |
| ✅ Overshoot and settle | Pose changes overshoot ~10% and settle instead of snapping. | `settleTo` | Thief shock 93.3 | |
| 🟡 Stagger in groups | Each member reacts a few frames after the leader. | `stagger(i)` | Thief thieves | 💡 `ensemble(t, members, delays)`. |
| 💡 Lag on accessories | Caps and tassels trail head moves by 2-3 frames. | not yet | Thief review item 12 | |

## 6. Animal-specific movements
| Capability | Implementation | Example | Next |
|---|---|---|---|
| ✅ Elephant raised bent leg with the sole showing; trunk curl; head lag | `elephant` `lift`, `trunk`, `hbob` | Lark stomp | |
| ✅ Lark grief poses (crest flat, wings sag, head back to wail) | `bird` `crest`, `sag`, `headRot`, `tailDrop` | Lark 43-46 s | |
| ✅ Frog duck behind the bank | `frog` `duck` | Lark witnesses | |
| ✅ Turn around without collapsing to a sliver | Head tucks, body sinks, the facing flips with a squeeze of ≥ 0.7, head comes out. | `turnFlip(t, turns, dur)` | Monkey: every turtle turn (57.95, 81.4, 99.0, 142.94, 169.26) | |
| ✅ Swim strokes from distance; wake | Paddle phase and strength from speed; ripple wake on each stroke while moving. | `swimPhase`, `ripple` | Monkey | |
| ✅ Passenger riding a carrier | The rider's position, bob and flip come from the carrier; a lurch forward when it brakes. | `lurch`, rider = carrier pos | Monkey: the stop at 105.98 | 💡 generic `rideOn()`. |
| ✅ Platform reaction to a jump | What you jump from or land on reacts: the shell sinks and springs back, ripples. | spring on carrier y/x | Monkey 97.96 (landing), 150.04 (push-off) | |
| ✅ Elephant grazing idle | 3.2 s cycle: trunk down to a tuft, pluck, curl to the mouth, chew (head bob), ears flap; pauses to look up when something passes. | Lark `graze(t, t0)` | Lark 66-97 | 💡 generalise as `graze()` for big animals. |
| ✅ Ears that find a sound before the head | `earOff`/`earUp` springs toward the source first, head follows late; sources visible on screen (a caw, a chirp, a landing). | elephant `earOff`, `earUp`; `soundArcs` at the source | Lark 117.2-119.2, 152.48, 179.5-180.0 | 💡 `earToward(P, src, t0)`. |
| ✅ Turn-taking attackers | One diver at a time from a circling pattern, a 2-frame white flash covers each contact, peel off; the victim jerks, shuts the eye, backs up. | Lark `crowP`, `STRIKES` | Lark 98.62-101.3 | 💡 `takeTurns(t, members, strikes)`. |
| ✅ Peek from cover (quadruped) | Hide fully behind an occluder (draw the actor, then the occluder; no clipped second copy); only the tail shows on the danger side; edge out ear, nose, eye; snap back in 3 frames on each threat. | draw order + x keys | Fox 37-53 | 💡 `hideBehind()/peekFrom()`. |
| ✅ Bite and tug | Draw back, lunge, clamp, tug (`tip` −0.08, the object puckers toward the biter), slip, recoil; then a held bite with a head shake until it tears. | Fox `biteOff` | Fox 115.3-121.6 | |
| ✅ Head into a hole | Clip the actor out of the region past the opening's edge so the head disappears inside. | Fox `drawWorld` evenodd clip | Fox 124.5-131 | |

## 7. Character interactions
| Capability | What / when | Implementation | Example | Next |
|---|---|---|---|---|
| ✅ Listener / speaker eye contact | Always set both gazes. | gaze plans | Thief couple 32-54 | 💡 `listen()` helper (nod on stresses). |
| ✅ Double act / pretence readable without sound | A wink, a thumb at the roof, projecting at the ceiling. | gestures + `wink` | Thief 27-54 | |
| ✅ Distinct personalities in a group | Leader decides; No. 2 eager copycat; No. 3 nervous. Differ in reaction, gesture and delay. | per-member branches + `stagger` | Thief thieves | |
| ✅ Speaker on one side, listeners on the other | Never land a speaker in the middle of the listeners; space small birds ~65 units apart at scale 0.7. | perch positions | Lark birds (86/150/214 + lark 304) | |
| 💡 Hand an object over, toss and catch | | Monkey review item 7 | `tossTo`, `track` |

## 8. Camera framing, composition and transitions
| Capability | What / when | Example | Next |
|---|---|---|---|
| ✅ Hold, then eased moves on beat boundaries | Add keys in pairs for holds. | Lark experiment; Thief leap | |
| ✅ Two-shot that keeps both faces | `twoShot(a, b, {margin})` gives camera keys that keep two heads in frame. Never crop the victim of a taunt. | `twoShot` | Monkey taunt 150-169 (turtle's face in shot throughout) | |
| ✅ Reframe to include the people the narration names | E.g. pull back so the companions' heads are in frame when "he looked at his companions". | Thief 157.2-158.0 | 💡 `twoShot(a, b, margin)` helper. |
| ✅ Follow an accelerating fall | Camera keys on the fall start and the impact. | Thief 135.0-136.1 | |
| ✅ Thought-cloud flashback large enough to act in | `cloud(... inside)` with scale, or the generic `thoughtCloud` (section 11); figure at least ~110 px on screen. | Thief 62-93 | |
| ✅ Transition card | `S.transition(..., {caption: 'LATER...'})` | All films | |
| ✅ Camera cut hidden under the card | Put a camera key 0.01 s apart at the card's covered midpoint (p = 0.5) to move the actor and the camera unseen. | `CAM` keys | Lark 112.8 | |
| ✅ Cross-section cut | Cut to the inside of a hollow prop for the discovery: the actor's head enlarged (1.7x) through the opening, eyes sweep, then cut back out. | Fox `drawInside` | Fox 126.16-130.46 | 💡 move into `sets/` as a generic interior. |
| ✅ Top-down reflection POV | Look straight down a well: rings, water disc, the mirrored face copying the actor 2 frames late, the back of his head at the bottom. Keep the face ≥ 250 px. | Lion `wellPOV`, `mirrorFields` | Lion 129-140.5 | |
| ✅ Reveal by lifting the view | Instead of a dissolve, the foreground that hides something sinks out of the view as the actor lifts his head and the camera follows his eye line. | Fox bush layer, clipped at the ground | Fox 54.94-56.4 | |
| ✅ Panel-only shake | Apply hit shake inside the picture panel only, so the caption panel never moves. | `SCENE.draw`: translate inside the panel clip | Fox | Use in all new stories (template). |

## 9. Humour, suspense and emotional storytelling
- ✅ **Comedy beat structure:** hold, realise, look to camera, gulp, then fall. Example: the Thief leader 131.9-135.1 (`gaze`, `lid`, `drop` pulse).
- ✅ **Suspense by stillness:** only the pupils move. Example: the Thief owner, 22.6-23.5.
- ✅ **Remove clutter:** lettering never covers a face; one exclamation instead of three; icons pop on their word. Examples: Thief (sweat drops, "!" balloon and "?" balloon removed).
- ✅ **Mask on / mask off:** the liar's face changes only while the other cannot see (a smile drops when the turtle looks away, snaps back when he glances up). Example: Monkey 139.4-140.3, 146.0.
- ✅ **The peek:** one eye opens a crack while "ill" or "asleep", and shuts when looked at. Examples: Monkey wife 70.2; Thief owner 104.6-136.
- ✅ **Grief to resolve:** slow head drop, wet eyes, one tear, long blink, a breath, head level, mouth set (no bulb, no smile for a heavy decision). Example: Monkey 76.3-81.
- ✅ **Shame ending:** look up at the witnesses, then the eyes break away and the head drops. Example: Thief 158.96-164.
- ✅ **Dramatic irony:** food and water within a trunk's length; the blind elephant misses both while the witnesses freeze. Example: Lark 108.94-110.3.
- ✅ **The plan is the picture:** the victim walks past the silent real pond toward the croaking pit. Example: Lark 157.6-161.1.
- ✅ **Falling fear:** repeated scares get smaller reactions (full duck, half duck, ears only, braced near miss, no flinch). Example: Fox 61.2-71.4.
- ✅ **Mirror the appeal at the ending:** the small character stands still above the humbled one who looks up to her voice; no gloating, one shared beat of joy. Example: Lark 167.3-195.
- ✅ **Lettering diet:** keep only spoken words and true sound words (8-12 per film); thought clouds only for narrated thoughts or mistaken beliefs. Examples: Lark (45 → 8), Fox (45 → about 11), Lion (70 → 36).

## 10. Narration and subtitle synchronization
| Capability | What / when | Implementation | Example | Limits |
|---|---|---|---|---|
| ✅ Word cues | Cue every beat to a word from `timing.json`: `w(p, n)` in the template, or literal word times. | `timing.json` words | All stories | Word starts can include preceding silence (~0.4 s early). Measure onsets for repeated words. |
| ✅ Counted beats on measured onsets | Chants, knocks and repeated words: counter, mouth and accents from one onset list. | `countedBeats` | Thief "Shulam" x7 at 116.5 … 124.35 (the original counted one word early) | Onsets measured from the audio envelope. 💡 a small `onsets.py` tool. |
| ✅ Film clock vs authored clock | When a scene was authored on an old narration, convert with `toNew()` / `toOld()` and write new beats in film time. | Thief `warp.js` | Thief | |
| ✅ Effects never cover a word | Sparse, quiet effects in the gaps (`master: 0.6`). | `score()` | All | |
| ✅ Recreate the approved first frames exactly | When a new section meets an approved one, check frame identity at the boundary with `framecmp` (the Lark's approved section started on an old loop for 0.1 s). | scratch `framecmp.mjs` | Lark 20.2-20.3 | |

## 11. Human cast: costumes, poses, thought clouds, time of day (added 2026-11-16)
Look at `catalogue/people.png` first (every preset and pose). Code: `cast/people.js` (costumes, poses), `fx/fx.js` (`thoughtCloud`), `sets/sky.js` (`dayCycle`, `skyCycle`, `mixHex`). All opt-in: a `person` without these fields draws exactly as before (regression test).

| Capability | What / when | Fields / code | Example |
|---|---|---|---|
| ✅ Costume presets | Every human story: one body, face, arm IK and gestures; the preset sets robe, sash, trim, cape, headwear, beard. Presets: villager, villageWoman, carpenter, merchant, vizier, caliph (king), prince, lady, maiden, oldWoman, servant, bedouin, ascetic, physician, beanSeller (+ owner, wife, thief for the Thief film's people in the new poses). | `person` `costume: '<preset>'`; table `COSTUME` | `person(ctx, {x, y, s, costume: 'vizier', talk, gaze})` |
| ✅ Colour overrides | A second merchant, a rich man, a king of another land: same preset, other colours. | `pal: {robe, dot, sleeve, sash, trim, cape, capeDot, pants, shoes ('bare'), hc (headwear), hd (headwear dots), band, jewel, beard, hair}` | `{costume: 'merchant', pal: {robe: GREEN, dot: GREEND, hc: C.yellow}}` |
| ✅ Age | 0 young .. 1 very old: beard and hair black, grey, white; brows grey; eye lines; stoop (lean + head drop). Each preset has a default age. | `age: 0..1` | the ascetic (0.75), `physician age 1` |
| ✅ Child | A smaller figure (0.62) with a 1.25x head and no beard, in any costume. | `child: true` | `{costume: 'servant', child: true}` |
| ✅ Sit | Blend 0..1 from standing; the hips go back and down onto a seat 48 high while the feet stay (nearly) planted, so legs never slide. `seat: 'stool'` draws a stool (`seatStool`) under the hips (local x −22); `'bench'` is the same height with the seat drawn by the scene (cushion, bench, throne); `'floor'` is cross-legged on the ground. | `sit`, `seat` | guests on cushions, the judge on a bench |
| ✅ Kneel | Both knees down, body upright: prayer, pleading, at a stone. Combine with `clasp` or `reachBoth` hands. | `kneel: 0..1` | `{costume: 'villageWoman', kneel: 1, handL: PERSON_HANDS.reachBoth.L, handR: PERSON_HANDS.reachBoth.R}` |
| ✅ Lie on the back | For beds and sickbeds: the figure rotates about the hips, head toward −x, head propped a little toward the viewer. The origin is the bed surface under the hips (body length about 240 at s 1). Draw a blanket over it in the scene. | `lie: 0..1` (use `lid: 1` to sleep) | the sick prince, the sleeping king |
| ✅ Gestures in every pose | `handL/handR` stay body-local (so every `PERSON_HANDS` gesture works seated or kneeling); `handLW/handRW` take WORLD points to reach a prop. `P.hands` returns the hand positions (local). | `handL/handR`, `handLW/handRW` | beanSeller hands in the sheet |
| ✅ Thought cloud | A comic thought balloon with a three-bubble trail to the thinker; the trail pops first, then the cloud. The scene draws the thought inside it (clipped) in ordinary world units, reduced: `o.at` (default [500, 700]) lands on the cloud centre at `o.scale` (default 0.3). Use only for narrated thoughts, dreams, plans and mistaken beliefs; keep the figure inside at least ~110 px on screen. | `thoughtCloud(ctx, x, y, w, h, t, {p, tail, inside(c, t), scale, at, bg, fill, n, seed, lw})` | sets.png "thoughtCloud": a villager dreams of being a merchant |
| ✅ Time of day | `skyCycle(ctx, u)` draws the sky for u (0 dawn, 0.25 noon, 0.5 dusk, 0.75 night, 1 dawn): the `sky()` presets cross-faded, stars fading in, the sun and the moon on an arc behind the hills. `dayCycle(u)` returns the data (`a`, `b`, `f`, `sun`, `moon`, `stars`, `night`, `warm`, `hills`) so a scene can tint the land (`night`) or place its own sun. Animate u with `kfn` for "the day passed", "night fell". | `dayCycle`, `skyCycle(ctx, u, {w, t, sun, moon, stars, moonR, hills})`, `mixHex` | sets.png skyCycle cells |

Limits / next: the figure is the same front-facing person (no profile); `lie` shows the face turned to the viewer. Hands for `lie` use body-local targets. Costume accessories (bags, baskets, staffs other than `hold: 'stick'`) are drawn by the scene for now. 💡 a `devil`/jinn preset, `richMan`, thief disguise overlays, `chew` for children (planned assets).

## 12. Shared sets: streets, halls, roads, huts, yards (added 2026-11-16, round 2)
Code: `sets/towns.js`. Look at the new cells at the end of `catalogue/sets.png` first. Every set is one call `set(ctx, o)` in world units (ground or floor at y 900) that **returns its anchors**; `<set>Anchors(o)` gives the same anchors without drawing, and the default anchors are the constants `MARKET`, `HALL`, `MERCHANT`, `DESERT`, `HUT`, `VYARD`, `CROAD`. Static parts are baked once per option set; only keyed parts are live (doors, shutters, curtain, lamp flicker and rain with `o.t`, sun). Sky for every set: `o.preset` ('day', 'dawn', 'dusk', 'night'), or `o.u` (time of day, `skyCycle`), or `o.sky: false` to draw your own first. Strips (w > 1000) take `o.camX` (camera left x) for parallax; occluders are redrawn after the cast with `o.front: true` (or `layer: 'front'` for the hut).

| Set | What / when | Main options | Anchors |
|---|---|---|---|
| ✅ `marketStreet` | City street (Baghdad, Basra, any town): skyline with two domes, flat-roofed house fronts with shutters and opening doors, palace facade with steps, door and balcony window. Stalls and street props on top. | `w` (strip), `palette` 'clear' / 'dusk' / 'cold', `houses` (custom fronts), `palace` (false, 'lit', 'shut', or geometry), `lit`, `shut` (chain + planks), `palaceDoor`, `doors: [open...]`, `shutters`, `windowsLit`, `stalls: [{x, kind: fruit/cloth/seed/animal/jars/pots/empty, cols, state: 'closed'}]`, `props: [['crate' / 'barrel' / 'pots' / 'sacks' / 'mat' / 'basket' / 'hay', x, o]]`, `alley: true`, `rain`, `t` | `ground`, `houses`, `doors [{x0, x1, top, cx}]`, `palace {door {x0, x1, top, bottom (stand on the step), cx}, balcony {cx, cy, sill}, steps}`, `stalls [{x0, x1, cx, counter, awning}]` |
| ✅ `palaceHall` | Arched interior. `variant: 'palace'`: open door arch with the day outside (and a hitching post), three pointed arches, window light shaft, two hanging lamps, dais, throne, carpet runner, checker floor. `variant: 'merchant'` (merchantHouse): door with a leaf, shelves (jars, cloth bolts), low desk with coin stacks, a window pane that shows the time of day (`u`: sun, moon, stars), a curtain hiding a treasure alcove. | `wall` 'paper' / 'blue' / 'ochre', `door` (geometry or false), `doorOpen`, `outside(ctx)` (door and window view), `behind(ctx)` (actors outside, before the room), `arches`, `window`, `light`, `lamps`, `lampsLit`, `dais`, `throne` (x or false), `cushions`, `carpet`, `shelves`, `desk`, `curtain: 0..1`, `treasure`, `vault: {x0, x1, top, open}` (treasury door with coin and lock), `stools: [x]`, `u`, `t` | `floor`, `door`, `dais`, `throne {x, seat, sitY}` (`person({y: sitY, sit: 1, seat: 'bench'})`), `window`, `lamps`, `desk`, `curtain`, `vault`, `stools [{x, sitY}]` |
| ✅ `desertRoad` | Journeys: three dune layers (far 0.4, mid 0.7 parallax), sand track with ruts, milestones, palms (`palmTree`), thorn bushes, rocks, a low mud wall to hide behind, a city wall with a gate at one end, a far city silhouette, a front dune lip to rise from behind, wipe palms in front. | `w` (2400), `camX`, `sun: [x, y]`, `road`, `milestones`, `palms: [x or [x, h, lean]]`, `thorns`, `rocks`, `wall: [x0, x1, top]` (`wallFront: true` to hide people behind it), `city: 'left' / 'right'`, `farCity: x`; front pass: `front: true, lip, frontPalms` | `ground`, `milestones`, `palms`, `city {gate, gw, gh}`, `wall`, `lip`, `frontPalms` |
| ✅ `hutRoom` | A poor one-room hut in cutaway (hermit, woodcutter, old woman, sick friend): walls x 110..890, roof slab with beam ends, door in the left or right wall whose leaf swings in, window onto the live sky, ceiling hook with a hanging jar, lamp niche, mat, mattress, jug, shelf, peg, stool; a dark state where the lamp keeps a warm circle and moonlight falls from the window. | `palette` 'day' / 'dusk' / 'night', `u`, `door: 0..1`, `doorSide`, `doorY`, `window: [x, y, w, h]`, `hook`, `jar`, `jarSwing`, `mat`, `mattress: {x0, x1, head}`, `jug`, `shelf`, `peg`, `niche`, `lamp: 0..1`, `lampAt`, `stool`, `dark: 0..1`, `layer: 'back' / 'front'` (cast between), `t` | `floor`, `walls`, `door {x0, x1, top, inner, side}`, `window`, `hook`, `niche`, `lamp`, `mat`, `mattress {lieX}`, `jug`, `stool` |
| ✅ `villageYard` + `yardLeaves` | The KD-009 cottage yard made shared: forest row, perch tree with a branch, cottage with an opening door (dim inside) and a lit window (silhouette callback), keyed sun. Any village, craftsman or night-visit story. | `sun: 0..1` (rising, morning, noon) or `[x, y]`, `moon`, `cottage: {x0, x1, top, door, win, chimney}` (default: KD-009's at the right edge), `door`, `inside(ctx)`, `winLit`, `winInside(ctx)`, `tree` ({x} or false), `forest: [x0, x1]`, `trough`, `bench`, `night`, `w`; `yardLeaves(ctx, part, t, {deep, spread, dx})` after the cast | `ground`, `perch`, `door`, `win`, `trough`, `bench {sitY}` |
| ✅ `countryRoad` | Roadside and travel stories: a long road with named hiding places (tree, milestone, bush, low wall that is also a seat), a far house with a lit window, an optional city edge with a gate; the front pass redraws trunks, bushes and walls over the cast for peeks. | `w` (3000), `places: [{kind: 'tree' / 'milestone' / 'bush' / 'wall', x, small, w, h}]` (default KD-013: tree 420, milestone 1260, bush 1760, bush 2240, wall 2460, small tree 2700), `house: {x, lit}`, `city: 'left'`, `camX` (hills 0.3), `night`; `front: true, occlude: [indices]` | `ground`, `places [{kind, x, x0, x1, top, hideX, seatY}]`, `tree`, `milestone`, `bush`, `wall` (lists by kind), `house` |

Shared pieces in the same file (use them in scenes too): `townDoor(ctx, x0, x1, top, bottom, open, {arch, hinge, inside, paint, shut, lock, coin, leafOnly})`, `townWindow(ctx, x, y, w, h, {arch, lit, shutters, inside, bars})`, `townArchPts` (pointed, round or flat openings), `marketStall`, `townProp`, `townCityEdge`, `townFarCity`, `palmTree(ctx, x, baseY, {h, lean, fronds, nuts, t, sway})`, `hangingLamp(ctx, x, y, t, {lit})`, `rainStreaks(ctx, t, {amt})` (draw after the cast for rain in front).

Example (a walk along the road, hiding behind the wall):
```js
const camX = kfn(t, [[0, 0], [6, 1500]]);
ctx.save(); ctx.translate(-camX, 0);
const R = countryRoad(ctx, { w: 3000, u: 0.5, camX, house: { lit: 1 } });
person(ctx, { x: R.wall[0].hideX, y: 900, costume: 'villager', kneel: 1 });
countryRoad(ctx, { w: 3000, front: true });   // the wall, bushes and trunks over the cast
ctx.restore();
```

Limits / next: the merchant cutaway at 1800 wide with street and yard (KD-017 `house`) and the storeroom double door (KD-011) are composed by the story from `townDoor`, `townWall` and `palaceHall` pieces for now. The far layers of strips use simple parallax only (no vertical camera). Sun and moon in `skyCycle` follow a 1000-wide arc; on strips place your own `sun()` with `o.sun`.

## 13. Animals: hawk, dove, sparrow, horse, donkey, camel, cat, rat/mouse, sheep, riders (added 2026-11-16, round 3)
Look at `catalogue/animals.png` first (every new animal in poses, walk frames and riders; the same animals also have rows in `cast.png`). Code: `cast/hooves.js` (horse, donkey, camel, `rideOn`, `mountSeat`, `packLoad`, the shared `BEAST` leg rig and `GAIT`), `cast/small.js` (cat, rat, sheep), `cast/birds2.js` (bird kinds). All are additions: no existing drawing changed (regression test "all identical"); the original bird kinds (lark, crow, y, r, b) still go to the original rig.
All side view, feet at (x, y), facing `dir`, with the shared acting fields (`gaze`, `lid`/`blink`, `wet`, `sq`, `tip`, `alpha`, `LIFE` auto-blinks) and `silhouette: true` (flat black, for thought clouds, balloons and distance; horse, donkey, camel, cat, rat, sheep, all bird kinds). Legs are two-bone IK from hip to a foot target: a planted foot stays put. **Walk without sliding:** `Object.assign(P, walk(xf, t, { stride: GAIT.<animal> * s }))` (`GAIT.horse`, `donkey`, `camel`, `cat`, `rat`, `sheep`, `bird`); the figures use `ph * dir`, so this holds walking either way; `amp` >= 0.33 is a full stride, 0 is standing.

| Animal | What / when | Fields (besides x, y, s, dir, ph, amp, eyes, brow, talk, mouth, shake, rot) | Example |
|---|---|---|---|
| ✅ `bird` kind `'hawk'` | Bird of prey: hooked beak with cere, heavy brow (default 0.6), upright perch, talons. `pal` 0 falcon (barred cream chest, black moustache, pointed wings), 1 eagle (white head, fingered wings), 2 vulture (bare pink head, white ruff). Flying pitches the body level; with `carry` or `grip` the legs hang. | `fly`, `flap`, `grip 0..1` (claws curl), `carry: 'mouse' / 'lamb' / 'fish' / 'sack' / fn(ctx)` (origin at the grip, hangs down), `swing` (radians: `swing(t, tGrab, 0.4)`), `carryS`, `beak`, `headRot`, `drop`, `sag`, `tailDrop` | `bird(ctx, {x, y, kind: 'hawk', pal: 1, fly: true, flap: Math.sin(t * 9), carry: 'lamb', swing: swing(t, 12.3, 0.4)})` |
| ✅ `bird` kind `'dove'` | Doves and pigeons: `pal` 0 white dove, 1 wood pigeon male (blue-grey, white neck patch with a green edge, pink chest, wing bars), 2 female (8 % smaller, paler, no green). | `puff` (-1 sleek .. 1 feathers out in fear), `chest 0..1` (chest out: pride), `fly`, `flap`, `beak` | the pigeon king puffs at the net |
| ✅ `bird` kind `'sparrow'` | Small brown bird: `pal` 0 hero (chestnut cap, grey cheek, black bib, streaked wing), 1 paler grey cap, 2 redder, larger bib. No crest. | `badge: true` (medal on the chest), `fly`, `flap`, `beak`, walk `ph/amp` | `{kind: 'sparrow', pal: 2, badge: true}` |
| ✅ `horse` | Riding horse (320 wide, back 235, head top 335 at s 1). `pal` 0 white with blue saddle cloth and yellow trim, 1 bay, 2 black (white blaze). Saddle and red bridle by default. | `gallop 0..1` (or amp > 1.4: gathered/stretched pose pair, body pitch), `rear 0..1` (35 degrees about the hind feet, forelegs tucked), `lie`, `raise` (near foreleg), `headDown`, `headTurn 0..1` (looks back; flips at 0.5), `neck`, `earL/earR` (-1 flat .. 1 up), `tailUp`, `tailSwish`, `saddle`, `cloth`, `trim`, `bridle`, `reins`, `load`, `chew`, `tongue`, `snort`, `sag` | `horse(ctx, {...walk(xf, t, {stride: GAIT.horse * 0.8}), y: 900, s: 0.8, pal: 1})` |
| ✅ `donkey` | Same rig, donkey shape: 110-long ears with black tips, white muzzle, spiky mane, tufted tail, no saddle by default. `pal` 0 grey, 1 brown, 2 pale. | the horse fields plus `bray 0..1` (head back, mouth wide, teeth), `sag 0..1` (sad: ears, head and tail down), `mouth` closed/smile/smirk/frown/o/open/grit | the stubborn donkey brays; `load: ['sack', 'bindle']` |
| ✅ `camel` | One-humped camel (about 400 x 370, hump top 300). `pal` 0 sand, 1 brown, 2 white. Pacing gait (both legs of one side together). | `kneel 0..1` (alias `couch`: 0-0.5 front legs fold, 0.5-1 rear; body 120 lower), `neck` (-1 browse low .. 1 up), `headTurn`, `chew` (lip), `talk` (grumble), `ears`, `tailSwish`, `saddle` (rug and seat on the hump), `load` (on the hump, behind it with a saddle) | caravan: three camels with `stagger(i)` phase offsets |
| ✅ `cat` | Cat (190 x 150). `pal` 0 black, 1 white, 2 orange striped. | `sit`, `crouch` (stalk), `arch` (back up), `puff` (fur and tail bristle), `tailUp`, `tailCurl`, `tailHairs 0..7` (white hairs at the tip), `ears`, `lick` (paw to tongue), `raise`, `mouth: 'open'` (hiss with fangs) | `{arch: 1, puff: 1, mouth: 'open', ears: -1}` when the dog appears |
| ✅ `rat` (kinds `'rat'`, `'mouse'`) | Rat (about 150 x 70) or mouse (smaller, round pink ears; default pal 1). `pal` 0 brown-grey, 1 light grey, 2 white. | `sit` (on the haunches), `chew` (paws to the mouth, jaw), `sniff` (nose up, whiskers fan), `roll` (onto its back), `bib`, `tailCurl`, `tailUp`, `ears`, `earS`, `eyes: 'x'` | the mouse gnaws the net: `{kind: 'mouse', sit: 1, chew: t % 1}` |
| ✅ `sheep` (kinds `'ewe'`, `'ram'`, `'lamb'`) | Scalloped fleece, dark face and legs. Ram: curled horns; lamb: 0.62 size, 1.3x head. `pal` 0 white, 1 cream, 2 dark. | `fat 0..1`, `headDown` (graze), `chew`, `hop 0..1` (all feet up), `lie`, `ears` | a flock with `stagger` and different `ph` |
| ✅ `rideOn` | A Library person riding a horse, donkey or camel: hips on the saddle point, inheriting walk bob, rear, kneel and lie; the figure is clipped at the saddle and one leg hangs on the near side with a stirrup; default hands hold the reins (horse and donkey). | `rideOn(ctx, 'horse' / 'donkey' / 'camel', mountP, personP, {reins: false})`; personP: any person fields plus `lurch` (use `lurch(t, tStop)`), `bob`. Returns the seat `{x, y, rot}`. `mountSeat(name, P)` gives the seat without drawing. | `rideOn(ctx, 'horse', {...walk(xf, t, {stride: GAIT.horse * s}), y: 900, s}, {costume: 'prince', talk})` |
| ✅ `packLoad` | Cargo items stacked upward: `'sack'`, `'chest'`, `'bolt'` (cloth, `col`), `'rug'`, `'bindle'`, `'jar'` (or `{kind, col}`). Used by the `load` field of donkey, horse and camel, and by the hawk's `carry: 'sack'`; usable on the ground. | `packLoad(ctx, items, x, y, s)` returns the top y | market goods on the ground |

Example (a messenger gallops in, reins up and stops; the rider lurches):
```js
const xf = (t) => kfn(t, [[10, -300], [12.5, 520]], 'out');
const H = { ...walk(xf, t, { stride: GAIT.horse * 0.8 }), y: 900, s: 0.8, pal: 1 };
H.gallop = K.clamp(H.amp * 2 - 0.6); H.rear = pulse(t, 12.5, 0.7) * 0.6;
rideOn(ctx, 'horse', H, { costume: 'servant', lurch: lurch(t, 12.5), mouth: 'o' });
```

Limits / next: the rider is the front-facing person (no profile) seated with `sit: 1, seat: 'bench'`; the far leg is hidden. Two riders on one camel, the camel `fall`/`thrash`, the donkey `duck`, a dog and the leopard (planned assets) are not built yet. The gallop is a pose pair for speed, not a foot-planted gait (feet may skate a little at the turn of the cycle). The hawk's `carry` shows the carried thing upright under the talons (no struggle animation: animate `swing` and the thing's own fields through `carry: (c) => rat(c, {...})`).

---

## 14. Visual styles (style profiles, added 2026-11-21)
- **What:** a story can be made in another visual style without changing the workflow. `story.json` `"style"` picks a profile in `Library/styles/<id>/` (default `halftone-pop`, used by every film so far).
- **What changes with the style:** the engine style module (`S.title`, `S.label`, `S.arrow`, `S.box`, `S.counter`, `S.emphasis`, `S.transition`, `S.background`, `S.finish`: same calls, the medium's own look), the palette `C` and shared tones, the lettering font `BF`, the fill texture `dotPat` (Ben-Day dots in Halftone), the outline brush `ink`, the subtitle colours and caption panel, the player and MP4 names.
- **What stays the same:** every cast, prop, set and motion helper and its pose and acting fields, the layout, timing, subtitles (Arabic verbatim) and sound.
- **How to stage for any style:** frame the page and panel with `S.background(ctx, W, H, t, THEME.page)` and `S.box(ctx, 54, 54, 972, 1196, 1, THEME.panel)` (as in the template), use palette names (`C.yellow`, `GREEN`...) and `BF` rather than fixed colours or font names, and keep comic words short (they are drawn in the style's lettering).
- **Adding a style:** [styles/README.md](styles/README.md).

## 15. Acting that never freezes: flowing poses, follow-through, moving holds, ground shadows (added 2026-11-21)
From the character-motion method (`/rossark-motion-shorts`, `.claude/skills/rossark-motion/SKILL.md`). All in `Library/motion.js`, pure functions of `t`.
- **`flow(t, keys)`**: a chain of key poses `[[t0, v0], [t1, v1], ...]` (seconds) passed through with a continuous speed and no overshoot. Use it for acting channels (lean `tip`, head `nod`, an arm `raise`, ears): with `kfn` or `blend` the character eases to a dead stop at every key and reads as a robot. Repeat a value to hold; define the keys once, outside `draw`.
- **`lagged(f, t, delay = 0.09, k = 0.45)`**: follow-through by delay. Add it to a child part so it trails its parent: `P.raise = flow(t, RAISE) + lagged((u) => flow(u, RAISE), t, 0.12, 0.5)`. Counter-motion: `head = own(t) - 0.45 * lean(t - 0.11)`. Ears, tails, hands and hair arrive after the body, with no spring wobble.
- **`idleSway(t, seed, amp, period = 3)`** (moving holds): two waves of different periods, phased by seed. Add a little to every channel while a character is on screen (`tip` 0.02-0.035, `nod` ~0.03, limbs a few degrees, ears 0.05-0.1, `squash` via `breathe`), each with its own seed so left and right never mirror.
- **`osc(t, period, phase)`** and **`beatIn(t, a, b)`**: a -1..1 wave, and a time window as 0..1 for one beat (an accent switched on for a few words).
- **`groundShadow(ctx, x, y, w, lift, o)`**: a contact shadow that stays on the ground and shrinks and fades as the body rises (`lift` in world units), filled with the style's texture (Ben-Day dots in Halftone) or solid (`{ flat: true }`). Draw it before the character, at the feet's ground point, for every hop, jump, float or fall.
- **The "alive" checklist** (before a review): nothing frozen while on screen; no moment where every part stops at once; head and limb ends arrive after the body; left and right differ; the weight moves at least once; a head turn with a blink; landings squash (`impactSquash`, `landSquash`); anything in the air has a shrinking shadow and hanging feet; props enter already moving and the eyes follow them.
- **Example** (hare hops in and holds a living pose):
  ```js
  const RAISE = [[0, 0], [3.2, 0], [3.8, 0.9], [5.0, 0.9], [5.6, 0.3]];
  const [x, lift] = hop(t, 0.4, 0.6, -150, 160, 120);
  groundShadow(ctx, x, GR, 120, lift);
  hare(ctx, { x, y: GR - lift, s: 0.9, raise: flow(t, RAISE) + lagged((u) => flow(u, RAISE), t, 0.12, 0.5) + idleSway(t, 12, 0.06, 2.3),
              nod: idleSway(t, 11, 0.03, 4.4), ears: 1 + idleSway(t, 14, 0.08, 1.9), squash: 1 - impactSquash(t, 1.0), lid: blink(t, 4) });
  ```

## Recommended next (from Fable reviews, not yet implemented)
- Lessons from the Thief comparison review: poses must read at phone size (use arm angles for big shapes); keep flashback action inside its cloud; speech balloons never over the speaker; decorative camera tilts must not crop heads.
- From the Thief review: `leapAndFall` bundle, `getUpHurt` sequence, `gripRope`/`slidePole` as reusable person moves, `sneak` gait option for `walk`, a `bumpChain` accordion for a line of walkers, `peerOverEdge`, `lag()` for accessories, a `poseTo()` standard transition.
- From the Monkey review (story 2, implemented in the story, not yet generalised): `gazeSeq` saccades (done inline as 2-frame snaps), `tossTo`/`track`/`chew`, `rideOn`, `hangDrop`, (the `dayCycle` sky set is now done: section 11), a `clearOf()` bubble placer, and an end-title safe zone.
- From the Lark review (story 4): `teeter`, `scrabble`, `soundFrom` (arcs that travel from source to listener), `earToward`, `grope` gait, `fatigue` posture blend, footprints, `flight(t, path, mood)` (Lark `flyBz` is the start), bird `point`, `takeTurns`, `graze`, bird mime set, nest-on-the-tuck and staggered hatch options.
- From the Fox review (story 5): `fgWipe` (foreground reveal), `strikeCycle` + `struck`, `startle(t, hits, {habituate})`, `biteTug`, `headInto(hole)`, prop cross-sections, `hideBehind`/`peekFrom`, `tailMood`/`earMood` presets, panel-only shake in the template.
- From the Lion review (story 3): `mirrorOf()` (a reflection that copies an actor, delayed), a top-down well POV set, `roarCycle` (inhale, blast, follow-through), `blastReact` (the listener's ears streaming), `plunge` and `scrabble` (failed climb), ear and tail mood presets, `scatter` (an ensemble flight), `paceWait`, `leadFollow`.

## History
- 2026-11-16: Round 3 animals (planned_assets.md): bird kinds `hawk` (falcon, eagle, vulture; talons with `grip`, `carry`, `swing`), `dove` (white dove, wood pigeon male/female; `puff`, `chest`), `sparrow` (three palettes, `badge`); `horse` and `donkey` (one equine rig: gallop, rear, lie, bray, sag, ears, saddle, load), `camel` (pacing gait, kneel/couch, load, saddle), `cat`, `rat` (rat, mouse), `sheep` (ewe, ram, lamb); `rideOn`/`mountSeat` (a person on a mount), `packLoad` (cargo), the `BEAST` IK leg rig and `GAIT` strides; `silhouette` on all of them. New sheet `catalogue/animals.png`. Section 13.
- 2026-11-16: Round 2 shared sets (`sets/towns.js`): `marketStreet`, `palaceHall` (palace and merchant variants), `desertRoad`, `hutRoom`, `villageYard` + `yardLeaves` (from KD-009), `countryRoad`, with anchors objects and constants, plus `townDoor`, `townWindow`, `marketStall`, `townProp`, `palmTree`, `hangingLamp`, `rainStreaks`. Section 12.
- 2026-11-16: Human cast layer for the upcoming films (planned_assets.md): `person` costume presets (`costume`, `pal`, `age`, `child`), poses `sit`/`seat`, `kneel`, `lie`, world hand targets `handLW/handRW`, `seatStool`; `thoughtCloud`; `dayCycle`/`skyCycle`/`mixHex`. New sheet `catalogue/people.png`. Reused the KD-009 carpenter solutions (sit and kneel blends, turban, chin beard).
- 2026-11-16: Stories 3-5 (Lion, Lark, Fox). Added `LIFE` auto-blinks, the fox `reach` and `plant` options; in-story capabilities documented above (grope, teeter/fall/climb, strike cycle, struck object, graze, ears to sounds, turn-taking attackers, bite and tug, head into hole, cross-section, reflection POV, reveal by lifting the view, panel-only shake).
- 2026-11-15: Story 2 (The Monkey and the Turtle) added `turnFlip`, `swimPhase`, `lurch`, `twoShot`, monkey hand IK, raised brows and the `smirk` mouth.
- 2026-11-15: guide created at the start of the five-story upgrade. Story 1 (The Thief and the Moonbeam) added the arm IK and gestures, wink, gaze plans, counted beats, fall/impact/rebound, swing, breathe, stagger and settle.
