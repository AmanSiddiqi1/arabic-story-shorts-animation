# The Monkey and the Turtle: creative director review 1 (original film)

Reviewed: `Originals/The Monkey and the Turtle - Halftone Pop 9x16 - Noto Naskh Arabic.mp4` (182 s). All 31 strips at 4 fps were read in order, plus 9-12 fps pulls of the fig sighting (24-28.8), the toss (39.2-41.6), the hop onto the shell (97.2-99.2) and the leap to the tree (150-152.6), and full-size stills of seven dialogue moments. Sync was judged against the word times in `narration.txt`; the audio itself was not re-measured.

All times are film times. Positions are world units of `scene_c.js` (1000 x 1230; bank top y 700, water y 772, river x 330..674, low branch (300, 422), high branch (300, 306), turtle at the bank x 430, mid-river x 520). "Head" positions used below: monkey head = (P.x + 8, P.y - 140); turtle head = `hd(T)`.

---

## 1. Diagnosis

### What works
- **The stage.** Tree on the left, hut on the right, river between: the whole story's geography is in the first frame and never has to be explained again.
- **Broad sync.** Paragraph-level beats sit in their narration windows (fig plops on "تسقط", laugh on "فضحك", hop on "وقفز", leap on "قفز").
- **Mood lighting.** The dusk tint under "حزن الغيلم" (76.3-81) and the dawn after "NEXT MORNING..." are the two places where the picture carries feeling without lettering.
- **Designs.** Both characters read at phone size in the closer shots, and the monkey's laugh (37.5-39.2) and arms-up joy (95.5-97.2) are clear poses.
- **Camera intent.** Most camera moves are motivated (pan with the turtle to the hut at 54-61, pull back for the ending).

### Main weaknesses
1. **The two friends never look at each other.** The monkey stares at the lens with wall-eyed pupils for almost the whole film (see 33.0, 52.0, 90.0, 118.0). The turtle delivers "شكرًا" (31.4-36.9) and the whole invitation (84-95.6) into the bank wall, not up at the monkey. On "ثم نظر إلى الغيلم" (154.14-156.12) the monkey does not look down. Nobody blinks.
2. **The story's turning point is three pose swaps.** Mid-river (104-140) the monkey goes surprised (113.7, eight seconds before the turtle has said "قلب قرد" at 119.54-120.70), holds one trembling frown for 4.3 s (122.7-127.0), then pops to bulb plus smile at 127.0. "فكر بسرعة" (125.76-127.02) is not acted at all. During the lie (127.9-140) he wears the angry V brow with an open mouth, so the clever, breezy lie reads as shouting. The turtle never reacts to the lie and "صدق الغيلم كلامه" (140.48-142.94) has no beat.
3. **Lettering and bubbles sit on the actors' faces.** About 25 s in total: "HA!" over the monkey's face (48.2-51.2), "HOP!" (97.5-98.2), "STOP!" over his whole head at the key shock (104.2-106.4), the turtle's heart bubble over half the monkey during the confession (115.4-121.9), the thought-cloud tail over his face for the whole lie (129.2-136.5), the arrow through his head (137-140), "U-TURN!" (140.8-144), "BOING!" (151-152), the "GOTCHA!" burst (164-166) and "THE END" (177.5 on).
4. **The payoff has no victim.** From 153.0 to 165.5 the camera crops the turtle to the top of his shell at the bottom edge. The entire taunt (154.14-165.86) plays with no turtle face on screen, so the realisation and the shame that the narration then describes are never seen arriving. On "لقد حاولت أن تخدعني!" the monkey shuts his eyes and wags his head (a laugh) under "GOTCHA!", which plays the line as a gag instead of an accusation.
5. **The wife's pretence is not shown.** She is already in bed under the blanket when the turtle arrives (59.0), so "ثم تظاهرت بالمرض" (68.28-70.44) is only a face swap from angry to squint. The scene (61.5-81.0, 20 s) is one static wide shot of the house in which the two heads are about 90 px wide; the roof and wall get most of the frame. The turtle's decision to betray (77.94-81.22) is played as a happy idea: a bright bulb and a smile.
6. **Jumps float, and nothing has weight.** Hop onto the shell (97.4-98.8): no crouch, 1.4 s in the air, the turtle does not dip. Leap to the tree (150.2-152.4): no crouch, 2.2 s of drifting, the shell does not react, the turtle keeps smiling until 154.1. The "climb down" at 43.2-46.4 is a diagonal float through the night sky with arms up.
7. **The turtle turns by collapsing into a sliver.** Each turn scales the body through zero width (23.7, 28.7, 54.2, 99.2, 140.7, 168.7); at 99.2 and 140.7 the monkey stands on a green sliver. Swimming is a rigid slide with barely moving flippers and no wake.
8. **Clarity gaps in the setup.** Figs fall while the monkey is cut off by the top of frame (12.0-17.0), so the cause is never seen. When "رأى الغيلم ثمرة تين تطفو" is narrated (23.78-28.16) no fig is visible: the three figs have drifted behind the turtle's body. The tossed fig (39.8-41.3) falls into the water beside him; he never catches it. In "ويأكلان التين" only the monkey eats.
9. **Dead holds.** 18.5-23.5 (turtle static 5 s), 84-95.5 (monkey frozen for the 11 s invitation), 106.5-108.7, 113.7-122.0 (monkey one pose 8 s), 122.7-127.0, 129.2-136.5, 144-150 (6 s ride with no acting), 153-156.5.
10. **Sync slips.** The stop is at 104.2 on "وفي", but "توقف" is 105.98-107.24. Heart bubbles pop at 71.6 and 115.4, well before "قلب" (75.02 and 119.54). The heart and its X in the taunt pop at 156.6 and 158.0; "قلبه" is 161.18 and "الشجرة؟" 162.60. "THE END" lands at 177.5, 3 s before the last word ends (180.58), and on top of the monkey.

Known limit of the set (not asking to change it): the river is only 344 units wide and the turtle is 255, so "وسط الماء" has both shores in shot. Use depth instead of width there (item 1).

---

## 2. Prioritized improvements

Vocabulary: Library acting fields `gaze`, `lid`, `wet`, `sq`, `tip`; the monkey's own `aL/aR`, `tilt`, `drop`, `dx`, `brow`, `mouth`, `eyes`, `talk`, `eat`, `hold`, `kick`, `ph`; the turtle's `ext`, `drop`, `tilt`, `brow`, `mouth`, `eyes`, `talk`, `paddle`, `ph`; helpers `lookAt`, `blink`, `blend`, `pulse`, `anticipate`, `hop`, `landSquash`, `tremble`, `K.spring`, `ripple`, `dustBurst`. Two small pose additions are needed and should default to today's look: a **raised/worried brow** for both animals (the monkey's only brow today is the angry V), and a monkey **one-sided smile** mouth.

### 1. Mid-river, part one: the stop, the question, the confession (P1)
**Time and words:** 100.02-121.88. "وبدأ الغيلم يسبح به في النهر. وفي وسط الماء، توقف الغيلم فجأة. سأله القرد: «لماذا توقفت؟ هل هناك خطر؟» تنهد الغيلم وقال: «زوجتي مريضة، وتحتاج إلى قلب قرد كي تشفى»."

**Problem:** stop is 1.8 s early and hidden under "STOP!"; no inertia; no eye contact in the question; the monkey is frightened from 113.7, before he has heard anything; the heart bubble covers him while he should be reacting.

**Direction:**
- **100.0-105.9, the ride.** Monkey sits low on the shell, hands on the rim, delighted: looks ahead at the island (101.0), back at his tree (102.0), down at the water (103.0); tail waving. Turtle (his face is visible to us, not to the monkey): no smile, eyes ahead, `lid` 0.3; strokes slow from 103.8 ("وفي وسط الماء"); one glance up-back at the happy monkey at 104.9, then away.
- **105.98 "توقف", the stop.** Move the arrival at x 520 from 104.2 to 106.0. Turtle brakes in 4 frames: nose dips (`tip` 0.08), flippers spread and hold. Monkey keeps going: `tip` +0.28 forward over 3 frames, arms fly out, then springs back and overshoots (-0.1) and settles by 106.8, both hands grabbing the shell. One ripple ring runs on ahead of them. Hold still from 107.0 through "فجأة" (107.84-108.72): monkey blinks, looks down at the turtle's head.
- **108.72-113.66, the question.** Monkey leans forward over the turtle's head (`tip` 0.18), gaze on the turtle; palms-up shrug on "لماذا توقفت؟" (110.32-112.14). On "هل هناك خطر؟" (112.14-113.66) he straightens and scans: gaze left 112.2, right 112.7, down into the water 113.1, tail curling up. Turtle: gaze forward and down, slow blink, head sinking 4 units. "DANGER?" may stay but only 112.1-113.6 and clear of his head.
- **113.66 "تنهد".** Turtle breathes in (head rises 5, 113.7-114.2), then lets it go (head drops 8, `lid` 0.7, 114.2-114.8). Keep the small puff.
- **116.14-118.40 "زوجتي مريضة".** Turtle looks up-back at the monkey (`gaze` about [-0.6, -0.7]) for "زوجتي", cannot hold it, eyes go to the water by 118.4. Monkey listens with sympathy: raised brow, head tilt 0.12, small frown, nod. He is a good friend here; that is what makes the next beat hurt.
- **119.54-120.70 "قلب قرد".** Turtle shuts his eyes on "قلب", `wet` true. Monkey: blink on "قلب"; on "قرد" (120.06) he freezes: `eyes: 'wide'`, tail stops dead and straight, no tremble yet. 120.7-121.9 ("كي تشفى"): his gaze drops slowly to his own chest and one hand comes up to cover it.
- Heart bubble: move it to the turtle's front (island) side, over the hut wall, and pop it at 119.54, so the monkey's face is clear throughout.
- **Camera:** tilt down for depth: centre (530, 750), zoom 1.9 from 104 (60% of the frame is deep water under them). Slow push 113.7-122.6 to zoom 2.2 centred between the two heads.

### 2. Mid-river, part two: fear, quick thinking, the lie, and the turtle buys it (P1)
**Time and words:** 122.66-145.56. "خاف القرد، لكنه فكر بسرعة وقال: «يا صديقي، لماذا لم تخبرني قبل أن نغادر؟ لقد تركت قلبي فوق الشجرة! عُد بي الآن، وسآخذه معي». صدق الغيلم كلامه، وعاد به إلى الشاطئ."

**Problem:** one frown for 4.3 s, then an instant bulb and smile; thinking is not acted; the lie is delivered with an angry brow; cloud tail, arrow and "U-TURN!" cover his face; the turtle does not react.

**Direction (monkey):**
- **122.66-124.2 "خاف القرد".** Now the fear: shrinks (`sq` 0.9), leans back away from the turtle's head (`tip` -0.15), `tremble` on, knees (`kick`), raised brow, gaze snaps to the far bank, then to the water left and right: he is trapped. Keep "!!" for 1.2 s at most.
- **124.26 "لكنه".** The trembling stops on the word. Gulp (mouth closed, `drop` 4 and back). He checks the turtle is not watching (gaze down-right; the turtle's eyes are shut).
- **125.76-127.02 "فكر بسرعة".** Eyes dart with 2-frame snaps and short holds: left 125.8, up 126.0, right 126.2; `lid` 0.35; tail tip flicking fast (`ph` rate x3). At 126.3 the gaze snaps left to his tree and holds 0.5 s. Widen and slide the camera left for that hold (centre x 430, zoom 1.5) so the tree is in frame while he looks at it: the idea is planted by an eye line. If the bulb stays, 126.6-127.4 only; this is the film's one bulb (see item 6).
- **127.02 "وقال".** He puts the mask on: one long blink (0.2 s), eyes reopen round and innocent, brows up, sweet smile. From here to 140 use the raised brow, never the angry V.
- **127.88-129.26 "يا صديقي".** Leans down toward the turtle's head and pats the shell twice (`pulse`). Turtle opens his eyes and looks up-back at him.
- **129.26-133.20 "لماذا لم تخبرني قبل أن نغادر؟"** Mock reproach: palms up, head tilting side to side, eyes on the turtle.
- **133.20-136.60 "لقد تركت قلبي فوق الشجرة!"** On "قلبي" (134.54) he pats his chest twice, then shows an empty palm. On "فوق الشجرة" (135.04-136.60) the far arm sweeps back and points at the tree, head and gaze following. Thought cloud: pop it at 134.54, place it up-left toward the tree with its tail starting behind the back of his head, never across the face.
- **136.60-140.48 "عُد بي الآن، وسآخذه معي".** Helpful and urgent: a small bounce on "الآن" (137.66), one "turn around" circle of the hand. Arrow: if kept, low over the water in front of the turtle, 137.4-139.4. **139.4-140.4:** the turtle looks forward again; behind his back the monkey's smile drops into a gulp with a side-eye and 1 px tremble for 0.4 s, then the smile snaps back when the turtle glances up.

**Direction (turtle):** 133-136.6 his gaze follows the pointing arm to the tree, mouth 'o', raised brow. **140.48-142.94 "صدق الغيلم كلامه":** two nods (140.7, 141.3), relieved smile; he is pleased the problem is solved. **142.94 "وعاد به":** the turn happens here (not at 140.2), using the turn in item 10, with the monkey holding on and swivelling with him. Remove "U-TURN!". Swim back 143.4-149.0.

### 3. The escape and the taunt, with the turtle in the shot (P1)
**Time and words:** 143.4-165.86. "وما إن اقتربا من الشجرة، حتى قفز القرد إلى أحد أغصانها العالية. ثم نظر إلى الغيلم وقال: «هل تصدق أن القرد يستطيع أن يترك قلبه فوق الشجرة؟ لقد حاولت أن تخدعني!»"

**Problem:** 6 s ride with a blank passenger; a 2.2 s floating leap with no push-off; turtle cropped out for the whole taunt; the accusation is played as a laugh under "GOTCHA!".

**Direction:**
- **143.4-149.0, the ride back (suspense).** Monkey faces the bank, body low, gaze locked on his branch, tail coiled. At 146.0 the turtle glances back for 0.5 s: the monkey flashes the big smile; the turtle looks ahead again: smile off, `lid` 0.3, crouch a little deeper. Arrive at x 420 at 149.0.
- **149.02-150.04 "حتى", anticipation.** 149.5-150.0 deep crouch (`sq` 0.78, arms swung back, eyes up at the branch). The turtle starts to turn his head and open his mouth to speak.
- **150.04 "قفز".** Launch: `sq` 1.2 for 3 frames. The push-off shoves the shell down 14 and right 10; it springs back with a bob (`K.spring`) and two ripple rings. The monkey goes up in two fast stages: shell to the low branch (300, 422) in 0.4 s, touch (`landSquash` 0.1, 3 frames), then to the high branch (300, 306) in 0.4 s; landed by 151.0 with `landSquash` 0.2. 151.0-152.4: he clings, chest heaving (`sq` 1 to 1.04, 3 Hz), eyes shut, one long exhale. 152.44-154.14 ("أغصانها العالية"): he sits, legs dangling, safe. Remove "BOING!" and the 150.3 shake.
- Turtle 150.1-154: head whips up to track him (gaze follows, head tilted up), mouth 'o', eyes wide; then two slow puzzled blinks, neck at full stretch.
- **Camera:** vertical two-shot instead of the monkey-only shot: centre (385, 500), zoom 1.3 from 150.0 (monkey top-left, turtle bottom-right, a strong diagonal eye line). Push slowly to zoom 1.55, centre (400, 480) over 156.8-163.8; the turtle's head stays inside the bottom of frame.
- **154.14-156.84 "ثم نظر إلى الغيلم وقال".** On "نظر" (154.80) the monkey leans out over the branch (`tip` 0.25) and looks straight down at him.
- **156.84-163.82, the question.** Amused, unhurried: `lid` 0.3, one-sided smile, raised brow. On "قلبه" (161.18) he taps his own chest twice. On "فوق الشجرة؟" (161.98-163.82) an open-palm gesture at the tree around him and a shrug. Heart bubble pops at 161.18, the X at 162.60.
- Turtle in three steps: 157-160 puzzled (gaze up, head tilt, mouth closed); 161.2 eyes widen, mouth 'o'; 162.6-163.8 it lands: raised brow, mouth to frown, `ext` 1 to 0.8, and he looks away for the first time.
- **163.82-165.86 "لقد حاولت أن تخدعني!"** The smile goes. Angry brow (here it is right), straight arm pointing down at the turtle, leaning out (`tip` 0.3), eyes open and on him, mouth wide on "تخدعني" (165.0). No head-wag laugh, no "GOTCHA!" burst, no shake at 163.9. Turtle flinches on "تخدعني": `ext` 0.8 to 0.5 in 3 frames, eyes shut.

### 4. Eye lines, blinks and listening for the whole film (P1)
**Problem:** see weakness 1. The monkey's default `look` gives the wall-eyed lens stare.

**Direction:** always pass `gaze`. Rules: the listener looks at the speaker; the speaker looks at the listener except where avoidance is the point (turtle in items 1, 6, 8); eyes lead any head or body move by 4-6 frames; a shift is a 2-3 frame snap followed by a hold of 0.6-2 s; `blink` on all three characters with different seeds, plus a blink on every big gaze change. Fixed targets:
- 4-13 monkey: the fig in his hand, then the next fig on the tree. 13-17: the falling fig (item 7).
- 31.3-42 turtle looks up at the monkey (head tilted up); monkey looks down.
- 46.4-54.4 at each other, breaking only to look at the fig being eaten.
- 54.6-60 monkey's gaze follows the departing turtle while he waves.
- 61.4-81 item 6. 82-97 item 8. 100-145 items 1 and 2. 150-166 item 3. 166-182 item 12.
- Idle life whenever a character is not acting: breathing (`sq` plus or minus 1.5% at 0.3 Hz), uneven tail sway for the monkey, slow bob and `paddle` 0.2 for the turtle. Stagger the two characters so they never change pose on the same frame.

### 5. Clear the faces: retime, move or remove the overlays (P1)
No new lettering. A bubble or word must never overlap a head, and an icon should pop on the word it stands for.

| Time | Overlay | Action |
|---|---|---|
| 24.2-27.0 | "!" over the turtle | 0.8 s only |
| 48.2-51.6 | "HA!" bubble on the monkey's face | remove (the laugh is acted), or move fully above his head |
| 50.5-54.0 | "YUM!" with its tail on the shell | tail to the turtle's mouth, or remove once he is seen chewing |
| 72.2-76.2 | counter "1" and "HEART" label | remove; the heart bubble already says it |
| 71.6-76.3 | wife's heart bubble | pop at 75.02 ("قلب") |
| 78.0-81.4 | bulb over the turtle | remove (item 6) |
| 84.7-88.0 | empty bubble for 3.3 s | bubble and island icon pop together at 89.30 ("بيتي") |
| 97.5-99.2 | "HOP!" on his face | remove |
| 104.2-106.4 | "STOP!" on his head | remove |
| 108.8-113.7 | "DANGER?" touching his head | 112.1-113.6, clear of the head |
| 115.4-121.9 | turtle's heart bubble over the monkey | turtle's front side, pop at 119.54 |
| 122.7-127.0 | "!!" and sweat for 4.3 s | 1.2 s |
| 127.0-129.2 | bulb | 126.6-127.4 at most |
| 129.2-136.6 | thought cloud, tail over his face | pop at 134.54, up-left, tail behind the head |
| 136.8-140.3 | arrow through his head | low over the water, 137.4-139.4, or remove |
| 140.8-144.0 | "U-TURN!" on his face | remove |
| 150.3-152.2 | "BOING!" in the flight path | remove |
| 156.6-163.8 | heart, then X | heart at 161.18, X at 162.60 |
| 163.8-166.8 | "GOTCHA!" burst on the monkey | remove |
| 166.2-172.0 | rain cloud over the turtle | remove (item 12) |
| 177.5-182 | "THE END" over the monkey | 180.7-182, in clear sky between canopy and roof |

Sound follows the picture: move or drop the matching `SND` cues (stamp and thud at 104.3 to the new stop; stamp and thud at 163.9 out; the 78.2 ding out) and keep every effect quiet enough not to cover a word.

### 6. The hut: her anger, her act, his grief, his decision (P1)
**Time and words:** 59.0-81.22. "غضبت زوجته وقالت: «أنت تقضي وقتك كله مع القرد!» ثم تظاهرت بالمرض، وقالت: «لن أشفى إلا إذا أكلت قلب قرد!» حزن الغيلم، لكنه قرر أن يخدع صديقه."

**Problem:** weakness 5.

**Direction:**
- **Camera.** Arrive as now (zoom 2.0 at 60.6), then push to zoom 2.9 centred (835, 655) by 62.0: both heads and the bed fill the frame, the wall and window are backdrop. For 76.3-81.0 drift to the husband alone: centre (790, 675), zoom 3.2. (The land layer is baked at 2x; check a still for softness at zoom 3.)
- **59.0-61.4.** The wife is out of bed, at the bed's near edge (x about 880), bed empty and flat behind her, eyes tracking him as he swims in. He arrives with a small smile that dies when he sees her face; `ext` 0.7.
- **61.42 "غضبت".** She thrusts her head into his face (x +14, `tip` 0.12, angry brow); he recoils (`ext` 0.5, flinch blink). **63.84-68.06** scolding with a head jab on each stressed word: "أنت" 63.84, "كله" 65.78, "القرد" 67.26 (0.25 s `pulse`, x +10). On "القرد" she jerks her head and gaze toward the far bank. He follows her look across the river, guilty, then looks down.
- **68.28 "ثم".** She stops, mouth shut. Her eye slides away from him, `lid` 0.5, held 0.6 s: the scheme. **68.98 "تظاهرت":** a theatrical swoon: head lolls back, she backs into the bed (x 880 to 935 in 0.7 s), the blanket comes up over her shell. **69.72 "بالمرض":** limp: `ext` 0.75, `drop` 10, eyes shut, weak frown. **70.2:** one eye opens a crack to check he is watching (`lid` to 0.25, gaze on him, 0.5 s) and shuts the moment he looks. This peek is the joke and it makes "pretended" readable with the sound off.
- Husband 69.0-71.5: alarm; he hurries 10 units closer and stretches his neck over her, raised brow, mouth 'o'.
- **71.60-76.30.** She speaks weakly, eyes shut, `talk` at low amplitude. On "قلب قرد" (75.02-76.30) her eye opens fully and fixes on him, hard and wide awake, for exactly those two words, then closes. Heart bubble pops at 75.02, above and between them.
- Husband on "قرد" (75.48): head pulls back (`ext` 0.6), eyes wide, gaze snaps left to the far bank and holds 0.5 s. We see him think of his friend.
- **76.30 "حزن".** His head lowers slowly (`drop` 0 to 12 over 1.2 s), `wet`, `lid` 0.6, one teardrop. Keep the dusk tint.
- **77.94 "لكنه".** He looks at his wife (she peeks, then shuts the eye as he turns). **79.14 "قرر":** a long blink, one breath (`sq` 1.03 then 1), head back to level, mouth set flat, brow slightly down. **80.08 "يخدع صديقه":** he looks across the river once more, `lid` 0.35, and holds into the transition. No bulb, no smile: it is a heavy decision, not a bright idea.

### 7. The first meeting: cause, sighting, thanks, toss, catch (P1)
**Time and words:** 9.84-42.04. "كان يأكل التين كل يوم، وأحيانًا تسقط بعض الثمار في الماء. وفي النهر، كان يعيش غيلم ... رأى الغيلم ثمرة تين تطفو على الماء، فأكلها وأعجبه طعمها. قال للقرد: «شكرًا لك على هذه الفاكهة اللذيذة!» فضحك القرد، وألقى إليه ثمرة أخرى."

**Problem:** weakness 8, plus the 5 s static turtle at 18.5-23.5 and two pointless turns (23.7, 28.7).

**Direction:**
- **9.84-16.78.** Keep the monkey in frame: from 12.4 use centre (385, 600), zoom 1.5 (branch and water both in shot) instead of panning off him. He takes one real bite on "يأكل" (10.36) and chews. On "وأحيانًا" (12.58) he reaches for the next fig, it slips from his fingers (hand jerk at 13.2), his eyes follow it down, mouth 'o'. First plop at 14.0 (inside "تسقط" 13.90-14.58); the others at 15.3 and 16.9 as now. After the first he leans over the branch to look (`tip` 0.25), shrugs, goes back to eating.
- **17.26-23.46.** The turtle surfaces at mid-river (x about 590), already facing the bank: rise with overshoot and a bob, two ripples. He shakes the water off (head tilt plus or minus 0.2, two cycles), blinks, looks right, left and up, then paddles lazily. Something changes every second.
- **23.78-28.16 "رأى ... ثمرة تين تطفو".** One fig must be plainly visible in open water 70-90 units ahead of his nose, bobbing (stop the figs at x 400-450; do not let them drift under him). 23.9: his gaze locks on it, eyes wide, neck stretches, a blink of disbelief. 24.5-27.6: slow approach, neck out. 27.0: he nudges it with his nose; it bobs away 10 units and back.
- **28.16 "فأكلها".** Pull back (`ext` 0.7, 0.2 s), lunge and snap; the fig is gone at 28.4; three chews (28.5-29.3) with a head bob, gulp. **29.40 "وأعجبه":** eyes widen, then shut in bliss, smile, a small happy wiggle. Hearts may stay. 30.6-31.3: eyes open; he looks up the trunk to see where figs come from and finds the monkey. That look motivates the thanks.
- **31.32-36.94.** He paddles to the foot of the bank and cranes up (head tilted up, `ext` full) to call the thanks. Monkey at 32.2 freezes mid-bite, looks left, right, then down (33.0): surprise, then delight; he leans over the branch.
- **37.42 "فضحك".** Keep the laugh, add body bounce; the turtle smiles up at him. 38.6-39.2: he plucks a fresh fig from the leaves above and holds it out with raised brows; the turtle nods and opens his mouth.
- **39.22 "وألقى".** Wind-up (arm back, 0.25 s), throw at 39.5. The fig arcs to the turtle's mouth; he tracks it with eyes and head, mouth wide at 40.2, catches at 40.4 ("إليه") with a snap and a small recoil, chews. The monkey throws both arms up at the catch.

### 8. The invitation: a guilty host and a trusting guest (P2)
**Time and words:** 81.78-97.46. "في الصباح، قال الغيلم للقرد: «يا صديقي، تعال معي إلى بيتي في الجزيرة. هناك أشجار جميلة وفاكهة كثيرة». فرح القرد..."

**Problem:** 11 s of a flapping mouth and a frozen listener; the audience knows the plan, but nothing in the turtle shows it.

**Direction:**
- 82.0-84.0: the turtle swims in from the island side, slower and lower than usual, eyes down. The monkey sees him and waves, fig in hand.
- 84.3: at the bank he lifts his head and visibly puts on a smile (frown to smile in one beat), one gulp.
- 86.26 "يا صديقي": eye contact for the word, then his gaze slides away by 87.4. 87.87 "تعال معي": two beckoning neck jerks toward the island. 89.30 "بيتي في الجزيرة": he looks back over his shell at the island; the island bubble pops here. The monkey looks where he looks, head tilted.
- 91.02-95.60: nods on "جميلة" (92.72) and "كثيرة" (94.80), smile a little too wide, eyes on the water. Monkey: on "وفاكهة" (93.64) eyes wide, mouth 'o' then smile; a bounce on "كثيرة".
- 95.60-96.9 "فرح القرد": arms up, eyes shut with joy. While his eyes are shut the turtle's smile falls and he looks down, for us only. He looks up smiling again as the monkey opens his eyes.
- Camera a little tighter than now: centre (300, 650), zoom 1.9.

### 9. Hopping aboard and riding (P2)
**Time and words:** 96.74-103.78. "وقفز على ظهر الغيلم. وبدأ الغيلم يسبح به في النهر."

**Direction:** 96.9-97.46 crouch (`sq` 0.82, arms back). 97.46 launch (`sq` 1.15); 0.5 s in the air, peak 60 above the bank; land at 97.96. On landing: monkey `landSquash` 0.2; the shell sinks 16 and rebounds (spring about 3 Hz); the turtle's eyes pop and his mouth makes an 'oof' for 0.3 s; two ripple rings; the monkey windmills his arms once (0.5 s, `tip` plus or minus 0.12 damped), then sits and grips the shell rim by 98.9. Turn at 99.0 with item 10. From then on the monkey is a passenger coupled to the shell: he inherits its bob, and leans back when it accelerates and forward when it brakes (lag about 0.1 s).

### 10. A swimming turtle: strokes, wake and a real turn (P2)
**Problem:** weakness 7.

**Direction:**
- **Stroke.** Derive flipper phase from distance travelled (as `walk` does for legs) so strokes match speed; `paddle` amplitude from speed; body bob 4 units per stroke and a small forward surge on each pull; nose lifts a little on starting and dips on braking. At rest: slow bob, `paddle` 0.2. While moving faster than about 20 units/s, a ripple arc trails behind the tail on each stroke.
- **Turn (0.7 s), for 54.0, 99.0, 142.9 and 169.3** (the 23.7 and 28.7 turns disappear in item 7): 0-0.3 s the head tucks (`ext` 1 to 0.35), the body slows and sinks 8; 0.3-0.4 s the facing flips in 3 frames with the horizontal scale never below 0.7 (the shell is symmetric, so with the head tucked this reads as a turn on the spot), under one ripple; 0.4-0.7 s the head comes out on the new side with a slight overshoot and the body rises. A rider flips on the same frames with a 3-frame `sq` 0.92 and arms out.

### 11. Becoming friends, and staying too long (P2)
**Time and words:** 42.62-60.76. "ومرَّت الأيام، وأصبح القرد والغيلم صديقين. كانا يتحدثان كل صباح، ويأكلان التين قرب النهر. لكن الغيلم صار يقضي وقتًا طويلًا بعيدًا عن بيته."

**Direction:**
- 42.3-43.3: a real descent before the sky starts to turn: he hangs from the branch by his arms (0.3 s), drops with acceleration (0.35 s), lands on the bank (`sq` 0.75, small `dustBurst`); the turtle watches him come down.
- 43.4-48.1 (sun and moon pass as now): hold the two-shot and let them be friends in three short vignettes: day, he hands down a fig and the turtle eats it; night, both look up at the moon in the same direction, still; morning, both laughing.
- 48.14-51.38 "يتحدثان": take turns: one talks with gestures while the other listens, nods and keeps eye contact; swap at 49.5; shared laugh at 50.6.
- 51.38-54.46 "ويأكلان التين": the monkey passes a fig down (arm reaches, turtle's neck stretches up to take it); both chew in the same rhythm, swallow together, look at each other and smile.
- 54.46-60.76: on "وقتًا طويلًا" (57.56-59.40) the turtle notices the clock or the low sun (eyes wide), a hurried nod goodbye, quick strokes home; the monkey waves and his gaze follows.

### 12. The ending: shame, a last look, and the monkey alone (P2)
**Time and words:** 165.86-182. "خفض الغيلم رأسه خجلًا، وسبح بعيدًا. أما القرد، فبقي فوق شجرته آمنًا، يأكل التين وينظر إلى النهر."

**Direction:**
- Stay in the two-shot until 169.2; only then pull back to the wide.
- 165.9-167.8: the head goes down slowly over 1.9 s (not 0.8): `drop` 0 to 16, `ext` to 0.45, lid closing, `wet`. No rain cloud.
- 168.52 "خجلًا": one last look up at the monkey (0.5 s). The monkey looks back, not smiling. The turtle cannot hold it and looks down.
- 169.26 "وسبح بعيدًا": slow turn (item 10 at 1.0 s), slow half-rate strokes, head low, small wake. He reaches the island shore about 177 and stops there, small.
- Monkey 169.3-171.5: watches him go (gaze follows), a slow blink, shoulders a little lower. 173-176.6 ("فبقي فوق شجرته آمنًا"): leans back against the trunk, long exhale. 176.60 "يأكل التين": picks a fig and takes one deliberate bite (not the looping eat cycle). 178.32 "وينظر إلى النهر": chewing slows, his gaze goes out over the river to where the turtle went, and holds, with one blink.
- "THE END" at 180.7, after the last word (180.58), placed clear of the monkey and the turtle.
- Optional (P3): at 179.6 a fig slips from his hand and plops into the empty river, with nobody there to eat it. It echoes the opening without words; use the existing plop.

---

## 3. Reusable Library capability from each improvement

| # | Improvement | Reusable capability |
|---|---|---|
| 1 | Stop and confession | **Motion helper** `lurch(t, t0, amp)`: a passenger's overshoot and settle when the carrier brakes. **Reaction sequence** "bad news": listen with sympathy, freeze on the key word, look at self, then fear. |
| 2 | Fear, thinking, the lie | **Helper** `gazeSeq(t, [[time, target], ...])` with 2-frame saccades and holds (darting eyes, look-then-act). **Expression sets**: "thinking" (narrow lids, flicking tail), "mask on / mask off" (a held false smile that drops when unobserved). **Gestures** for the monkey: hand on chest, empty palm, point at a world target (two-segment arm reach to a point). Raised/worried brow and one-sided smile as new pose values. |
| 3 | Escape and taunt | **Motion helper** `leap(t, a, from, to, h)` bundling anticipation, stretch, arc and `landSquash`, chainable for two-stage leaps; **platform reaction** `pushOff` (spring dip and ripples of whatever was jumped from). **Camera** `twoShot(a, b, margin)`: centre and zoom that keep two world points in frame. **Reaction sequence** "the penny drops" in three steps. |
| 4 | Eye lines | `gazeSeq`, a `listen(t, speakerTalk)` nod-and-look helper, `idle(t, seed)` breathing and sway, and the rules (listener looks at speaker, eyes lead by 4-6 frames) written into `Library/README.md`. |
| 5 | Clear the faces | **Helper** `clearOf(faceBoxes, candidates)` that picks a bubble anchor not overlapping any head, plus a README rule: icons pop on their word, lettering never covers a face. |
| 6 | The hut | **Expression set** for the turtle and wife: scolding head jab `jab(t, times)`, swoon, one-eye "peek" (`lid` pulse with gaze). **Reaction** "grief to resolve" (slow head drop, long blink, breath, set mouth). **Set piece**: hut bed with a `tuck` amount for the blanket. |
| 7 | First meeting | **Motion helpers** `tossTo(t, a, d, from, to, h)` for a thrown prop with wind-up and release times, `track(target)` (gaze and head follow a moving point), `chew(t, a, n)` mouth cycle, and a catch snap. **Gesture**: fumble and drop. |
| 8 | Invitation | **Reaction sequence** "guilty tell": eye contact, then the gaze slides away; a smile put on and dropped while the other is not looking. **Gesture**: beckon with the head. |
| 9 | Hopping aboard | **Motion helper** `rideOn(carrier, t)`: a passenger inherits position and bob with lagged lean; landing dip of the carrier. |
| 10 | Swimming | **Motion helpers** `swim(xf, t)` (stroke phase from distance, bob, surge, wake times, the water twin of `walk` and `footfalls`) and `turnAround(t, t0, dur)` for any side-view swimmer or boat. **Effect**: wake as a `ripple` trail. |
| 11 | Becoming friends | **Motion helper** `hangDrop` (hang, accelerate, land with dust). **Set**: `dayCycle(t, a, b, n)` sun and moon arc with tint, moved from this scene into `sets/sky`. **Gesture**: hand an object to another character. |
| 12 | Ending | **Reaction sequence** `hangHead(t, a, d)` (slow lowering, one look back, look away). A title safe-zone check so end titles avoid character boxes. |

---

## 4. Success criteria for comparing the upgrade with this original

1. **Eye contact.** In every spoken line the speaker and the listener look at each other, or one pointedly looks away where this review asks for it. Check at 33, 50, 65, 88, 110, 117, 131, 141, 158 and 165 s. No lens stare, and no character goes more than 4 s without a blink. (Original: none.)
2. **Faces are never covered.** Zero frames in which lettering, a bubble, an arrow or a title overlaps a character's head. (Original: about 25 s.)
3. **The turning point is acted.** Between 113.7 and 128 the monkey shows at least five distinct, readable states in order: puzzled, sympathetic, frozen, terrified, thinking, falsely cheerful. The fear starts at 120.06-122.66, not before. During the lie he never wears the angry brow.
4. **The victim is on screen.** The turtle's face is in frame for the whole taunt (154.14-165.86) and passes through puzzled, realising and ashamed. (Original: 0% of that span.)
5. **Readable with the sound off.** From a contact sheet alone a new viewer can say: the monkey dropped the figs; the turtle saw and ate one; the wife is faking; the turtle is unhappy about the plan; the monkey is scared and then lying; the turtle believed him; the turtle is ashamed.
6. **Weight.** Every jump has a crouch of at least 6 frames, no more than 0.65 s in the air per hop, a landing squash, and a visible reaction from what was landed on or pushed off. The stop at 106.0 throws the rider forward.
7. **Swimming.** No frame in which the turtle is narrower than 70% of his width; flipper beats proportional to distance travelled; a bob at rest; a wake when moving.
8. **No dead holds.** No stretch longer than 2 s in which neither character changes pose, gaze or expression. (Original: eight such holds, up to 11 s.)
9. **Word sync.** The stop within 0.15 s of 105.98; heart icons on "قلب" (75.02, 119.54, 161.18); the catch at 40.2-40.7; the leap at 150.04; "THE END" after 180.58.
10. **Constraints intact.** Narration audio and its timing unchanged, duration 182.0 s, subtitles identical, Halftone Pop look and character designs unchanged, same story events and ending, and no new bubbles or comic words.
