# HORSE-02 "Lost Above the Clouds" (80s Cel Anime): Fable review, round 1 (v1)

Film reviewed: `Animations/HORSE-02/renders/HORSE-02_v1.mp4` (151.5 s). Sources: all 26 contact strips in `review/v1_pack/strips/` (4 frames per second), 110 panel stills pulled from the MP4 at the moments cited below (including tight crops of the acting and of the take-off), eight stills of the owner's reference ALI-01-ANIME v4 for scale, and a rough stillness scan of the panel. Times are seconds on the film.

## Verdict: REVISE

**1 BLOCKER** (note 1): in the take-off the horse shrinks away under a full-size prince, who then floats alone and sinks toward the stair pavilion. This is the film's last narrated event.

Otherwise the story is in order, every narrated event has a picture, subtitles are sharp and complete in both languages, TO BE CONTINUED is present.

What is already right and should be kept: the two new sets are full and bright (roof terrace with rug, cushions, jar, orange tree, parapet, city and moon; garden with fountain, lamps, trees, flower border, the horse visible on the roof); the night is a repainted lilac and blue, never monochrome, with no tint over the cast; the dark horse reads everywhere (brass, red saddle, pale rim) and stays a lifeless machine; the lever insert (1.9-5.5), the whole-city wide (21.3-25.5), the landing with dust and the cat (25.7-29), the half-lidded look back at the tied horse (33.5), CLACK (39.2), the hover with the glow under the hooves (83.5-87.3), the laugh (91.4) and the charcoal map (135.7-139.9) all work.

What clearly hurts the story and the owner's points, apart from the blocker:
- **The acting is too small.** From 44 to 141 s the figures are about 18 percent of the panel height (ALI-01-ANIME v4: about 30 percent) under an empty sky that fills the upper 45 percent of every roof and garden shot. Faces and hands, which carry this episode, cannot be read on a phone.
- **Line-ups again.** The meeting (48-63) and the disbelief (72-80) are three figures shoulder to shoulder facing the camera, overlapping each other and standing in front of the horse. This is the same fault episode 1's review fixed in notes 1 and 6.
- **The three things he must remember do not read:** the moon path never appears, the TWO TOWERS and BLUE DOME arrows land on the wrong or hidden things, and the river is drawn as a pink road.

Not checked: sound was not listened to; stepped cel timing cannot be judged from stills.

## The owner's points, as seen on screen

| Owner point | Met? | Evidence |
|---|---|---|
| Wide views, pans | **Over-applied** | Good wides (21.3 city, 25.7 landing, 98.8 garden) and pans (34.8-39 tiptoe, 44-48 door). But nothing is ever closer than the wide, so the people are specks in their own scenes (note 2). |
| Full scenes | **Yes on roof and garden, no in the sky** | Roof and garden are the best sets of the series. 0-12 s is the bare one-band cloud deck that episode 1 replaced (note 8). The upper half of most ground shots is plain sky and one moon. |
| Varied bright colour, no tint | **Yes** | Dusk, warm night, garden: skin and every costume keep their colours. |
| English speech bubbles | **Yes, with the old defect** | Seven balloons, all English. Tails are wide black wedges (56.2-59.6, 77.4-78.6, 93.1-97.8, 119.3-126.3); at 93.1-97.8 the balloon covers the horse's head and the rider (notes 4, 8). |
| Every limb readable | **Mostly** | Standing figures are clear. The mounted prince still has cream arms crossed on a cream tunic (0-21, 83-97, 141-144): episode 1's v2 fix is not in this copy (note 8). |
| Library cast | **Yes** | Person presets, cat, guards. |
| Light presentation | **Yes** | Cream housing, light caption strip, gentle CRT. |
| No frozen holds | **Partly** | Nothing is dead, but 105.5-111 (bench) and 147.6-151.5 (end hold) are nearly still, the rider holds one pose for 15 s (5.8-21), and the cat stands in one walking pose on the parapet from 27 to 81 s. |

## Notes (most important first)

### 1. BLOCKER. 143.5-147.2 s (S18): the horse shrinks, the prince does not
- **What is wrong.** From 143.6 the horse gets smaller along the climb while the rider stays at full ground size. At 144.1-144.4 a full-size boy sits on a toy horse in front of the moon; by 145.0 the horse is a few pixels under his legs; from 145.6 to 147.0 he drifts down and right, alone, to the top of the stair pavilion, where the "last twinkle" fires on him; at 147.2 he pops off.
- **Cause (seen in the source).** `ehRide` takes the rider's size from `PP.s` (`ps = PP.s ?? D.s`), not from the horse. In `h02_roof.js` the take-off rig `H.s` is lerped down but `h2FzRide(t, H)` keeps the ground value. The thought-cloud calls in `h02_main.js` already do it correctly (`s: H.s * 0.95 / 0.9`).
- **Fix.** In the take-off make the rider's `s` follow the rig every frame (`fzR.s = H.s * 0.95 / 0.9`, or the same ratio the roof uses on the ground), and the cape and wind ribbons with it. Then check stills at 143.6, 144.2, 145.0, 146.0, 146.4, 147.0: horse and rider one unit, climbing up and right, crossing the moon disc at 144.2 as a clear pair, shrinking to a dot over the river beyond the towers by 146.4, never descending, twinkle on the dot at 146.38 (سيعود). Hide the rig only once it is a dot.

### 2. 44-141 s: bring the camera to the actors (owner reference scale)
- **What is wrong.** Every roof and garden shot is the establishing wide. People are about 110 px tall in a 598 px panel still; in ALI-01-ANIME v4 they are 170 to 200 px with the ground at the same height. The upper 45 percent of the panel is sky and a moon for about 90 s.
- **Why it matters.** The episode is two people learning to trust each other: wary lids, a crooked smile, a hand on a hip, wet eyes. None of that survives at this size.
- **Fix.** Keep the wides only where the place is the subject: 25.7-32.4 landing, 44.2-48.8 door reveal, 83.5-87.9 hover (at most 1.15x, the lift needs height), 98.8-101.5 garden reveal, 114.75-117.5 guards, 121.4-124.4 moon and river, 126.7-132.0 skyline, 142.7-151.5 take-off. Everywhere else frame at about **1.5x the present zoom, scaled about the floor line** (feet stay near panel y 900-960, so the zoom crops empty sky and the rug still fills the bottom; this does not empty the lower picture): 48.8-60.8 meeting, 60.8-71.7 bow and explanation, 71.7-82.8 inspection and controls, 87.9-97.9 wonder and laugh (after the eye close-up), 101.5-114.7 bench, 117.5-121.3 and 124.5-126.7 at the stair arch, 132.8-140.6 thanks and map. Move between framings with a slow push or a pan on a cue word, not a cut, except where a cut already exists. Balloons stay inside the panel, beside the speaker.

### 3. 44.2-63.3 s (S7-S9): the meeting has no distance, and the pointing-up joke is missing
- **What is wrong.** The princess walks out and stops touching distance from the stranger (45.0-48.9); from 54.6 to 62 Firuz, princess and maid stand shoulder to shoulder, all facing the camera, the maid stacked behind the princess. At 61.3-62.0 he bows into her shoulder. Firuz's crown sits in the foliage of the potted orange tree and the jar stand is behind his legs. At 59.7-60.8 (the pause after HOW DID YOU GET HERE?) he stands with folded arms: the planned answer, pointing straight up, is not there.
- **Why it matters.** "She asked cautiously" (بحذر) needs space between them; and pointing at the sky is the scene's laugh and the set-up for YOU ARE JOKING!
- **Fix (same cues).**
  - After CLACK he is frozen near x 1120. When the door opens (فخرجت 44.24) he backs two steps to about x 980 (walk + footfalls, cup hidden behind him), clear of the tree, the jar stand on his right.
  - Princess stops in the doorway at about x 1300 and stays there; maid at about x 1420, half behind the door frame, her head visible beside (not behind) the princess, lamp arm out toward Firuz so the light pool lies on the floor between the two leads. Gap between the leads at least 300 units.
  - 48.84 (تفاجأت): her half step back, hand to chest. 50.84 (بشاب): he brings the cup out, crooked smile, small wave. 52.78 (حصان): her eyes go along the rope to the horse and back (two glances, a blink on each turn).
  - 54.32 (فسألته): one wary step forward to 1250, palm raised, `lid` 0.25; she comes no closer. Balloons at 56.20 and 57.48 above her, toward the pavilion side, with the narrow tail (note 8).
  - 59.74-60.83: Firuz opens his mouth, shuts it, then raises one arm straight up, index at the sky, eyes up. Princess and maid tilt their heads up after him (maid 0.2 s later, lamp rising), then look back at him. The existing blip at 60.3 lands on the finger.
  - 60.83 (انحنى): the bow from where he stands, toward her (`tip` about 0.35, one hand on the chest, cape arriving late), 300 units of floor between them.
  - Camera: 1.5x, centred near x 1140.

### 4. 71.7-82.8 s (S10-S11): the knock is invisible, the group hides the horse, the UP arrow is on the wrong part
- **What is wrong.** At 73.3-79.2 princess, Firuz and maid stand in a row in front of the horse's chest and forelegs, facing the camera. No knock can be seen at 73.9 (she stands with hands at her waist) and the maid's wave at the brass eye is lost behind the two leads. YOU ARE JOKING! (77.4-78.6) sits on the horse's head with a black wedge over its face. At 80.9-82.5 Firuz stands in front of the shoulder dial; the UP arrow and the DOWN arrow both end at the top of the neck, a head's width apart, and both stay on screen pointing at Firuz while he vaults (82.2-82.5).
- **Why it matters.** Knocking on the "statue" is the proof she does not believe him; and "he showed her the two controls" is the series' central device (episode 1 notes 1 and 8 made them visible).
- **Fix.**
  - Only the princess goes to the horse. 71.68 (نظرت): she walks to about x 800 at the muzzle; Firuz gives way to x 980 or more and stays there; maid follows to x 1060 or more.
  - 73.88 (إلى): her near arm goes out to the horse's neck and raps three times on twos, a small TOK TOK and a 2-frame spark at the contact, head tilted to listen; the horse does nothing. 74.30 (الآلة): the maid leans in from her right and waves the lamp hand at the brass eye, then snatches it back.
  - 75.66 (وظنت): hand on hip, turned back toward Firuz. 77.40 (أنه): balloon above her and to the right, over open sky, never over the horse. Firuz at 980: one finger up, "wait".
  - 79.52 (أراها): she steps back to about x 930 as he steps in to about x 790 (she does not turn her back). 80.94 (المقبضين): he points down-left at the brass shoulder dial, glint, UP label with its arrow tip on the dial; 81.3: he points up at the lever below the ear, glint, DOWN label with its tip on the lever. Check `kb` and `lv` on a still: the two tips must be at least 120 px apart, each on its brass part, nothing in front of either. Her head follows dial, then lever. Both labels off by 81.8, before the vault at 81.86.
  - Camera 1.5x centred near x 800 for 71.7-81.8, pulling back to the hover wide during the vault.

### 5. 142.7-151.5 s (S18): the ending has no picture of her wondering
- **What is wrong.** After the lift-off the princess walks to the right and stops beside the orange tree with the maid directly in front of her; the guards arrive and all four stand in a clump facing the camera (147.0-151.0). Her wave and the hand on her heart cannot be seen, nobody looks at the sky, and the end hold is almost still for 3.9 s.
- **Why it matters.** The last line is "the princess wondered whether he would return". That needs her, alone, looking after him.
- **Fix (after note 1).**
  - 143.46 (والأميرة): she runs to the parapet at about x 1000, clear of tree and pavilion, alone; the maid stays by the door.
  - Head and gaze up and right after the horse; arm up in a wave at 143.9, veil ribbon a beat behind; 145.74 (هل): the wave stops halfway; by 146.6 the hand rests on her chest, `lid` 0.3, a small breath out (`sq` 0.97).
  - Thought cloud (144.64) upper left as now, clear of the flight path; its contents larger (horse about 2x).
  - Guards step out of the door at 145.2 half a step apart, look left and right, then at each other, shrug at 148.0 and 148.3. The maid plants herself between them and the princess with the lamp and an innocent smile.
  - Hold 147.3-151.5: camera drifts up about 30 px toward moon and river; she keeps looking at the spot where the dot went out, one slow blink at 149.5; the cat hops down onto the empty star tile where the horse stood, sniffs it and looks up too (landing squash). Keep the tile and the loose rope in frame: the empty place is the closing image.

### 6. 117.6-126.7 s (S15): the password's picture, the moon path, is not on screen
- **What is wrong.** The three stand small in the bottom-left corner under a two-row balloon with a black wedge; the camera drifts right over a thin strip of water with a faint white streak (122.8-124.8). Nothing pulls together into a path. The upper half of the panel is empty sky.
- **Why it matters.** "The moon knows the river's path" is the plan's one surprise and the line the series will call back.
- **Fix.**
  - 117.56-121.3: the three at the stair arch at 1.5x; she catches his sleeve (فقالت 117.56); IF YOU RETURN, SAY: beside her head with the narrow tail.
  - 121.38 (القمر): pan and tilt to the moon above the river (moon upper centre, river across the middle third, towers at the right edge; zoom so the water band is at least 100 px tall). Scattered glints lie on the water. 122.58 (يعرف): they slide together in about 8 drawings into one gold path from the far bank under the moon to the near bank (white core, gold `#ffd27a` edge, widening toward the viewer, a 3-frame flash as it locks, then a slow shimmer). THE MOON KNOWS / THE RIVER'S PATH in gold as a lower caption without a tail, not over the moon or the path. Hold to 124.4.
  - 124.48 (عندها): back to the three at 1.5x; THEN I WILL KNOW YOU; the guards come through the gate behind them at 125.6 as now, torch flame clearly visible, and the three duck into the stair.

### 7. 126.7-132.0 s (S16) and 14.5-25.7 s: towers, dome and river are not the ones shown
- **What is wrong.**
  - TWO TOWERS (128.5-130.3): the arrow tip lands on a faint pale shape between the orange tree and the pavilion, while two large pink towers with blue caps stand unlabelled in the middle of the frame.
  - BLUE DOME (130.2-132.2): the arrow lands on the finial of the big dome, which is half hidden behind the striped cushion rack. Two more blue domes are in the frame.
  - "By the river" (عند النهر 129.30): no river reads; the water is a violet strip behind the parapet.
  - Firuz and the princess stand by the horse facing the camera; nobody is at the parapet.
  - In the sky pan (14.5-21) and the city wide (21.3-25.7) the river is a lilac-pink band with a white centre stripe. It reads as a paved road; the thin cyan wavy lines read as the rivers.
- **Why it matters.** These are the three landmarks of the map at 135.7 and of the next episodes.
- **Fix.**
  - Pick the two big blue-capped towers as "the two towers" (they are what the map draws). Arrow tip between their caps; each cap glints in turn.
  - Brighten the water between dome and towers into a clear blue band and lay the gold moon path of note 6 on it at 129.30.
  - Move the cushion rack about 200 units left (or drop it below the parapet line in this shot) so the big dome is clear; a light band sweeps it at 130.24 (وقبة). Tone down or remove the small extra blue dome on the stair pavilion in this framing.
  - Stage both at the parapet at about x 900-960: her arm to the towers (128.48), down to the river (129.30), across to the dome (130.24); his head follows each with a blink and he counts them off on his fingers. Camera about 1.2x, panning about 300 units from the towers to the dome on 130.24.
  - Sky plate and riverCity: paint the main river in the roof set's water blue with gold dusk glints, a darker bank line and boats at 2x; no white centre stripe.

### 8. Series carry-over from HORSE-01 v2 (one note for all of it)
- **0-5.8 s must match episode 1's new last frame.** HORSE-01 v2 changed its ending: sun disc of radius 150 half sunk into the deck, violet, coral and gold sky bands, three-layer deck, rider at 1.6x overlapping the disc, first star and thin moon. This film still opens on the v1 frame (small rider, rays without a disc, one flat cloud band, lower half blank pink). Re-match S1 to `HORSE-01` v2 at 138.0 s.
- **0-12.5 s deck.** Use the three baked layers of `h01_deck.js` (far towers and peaks, deck with holes, near puffs crossing the bottom), sliding opposite to travel. During the descent the near puffs rise past the horse; replace the blank pink frames at 9.0-9.3 with puffs wiping up the panel.
- **12.5-21 s land.** The quilt of yellow and green tiles is the "abstract quilt" episode 1 replaced (its note 12). Use the v2 country plate idea: hills with long shadows, the broad river, golden fields, walled towns; the desert part (caravan and oasis, 12.5-15) is good, keep it. The city with the blue dome at 20.6 should be the same walled river city as episode 1's tilt and this film's 21.3 wide, about 1.5x its present size so the glint has something to land on.
- **Rider.** Re-copy `horse_cast.js` from HORSE-01 v2 (`EH_FIRUZ_RIDE`: whole leg teal, sleeves `#e2d2b0`; the `cover` field). Base riding pose: near hand on the pommel, far arm free, never both arms across the chest. Give 5.8-21 its planned beats at a readable size: 5.80 held breath (shoulders up, eyes shut); 10.08 (فتنفس) the whole body lets go (`sq` 0.94, arms drop, head arriving late); 14.30, 16.04, 17.34 he leans out and looks down at each thing as it passes; 18.68 (يعرف) palms-up shrug; 20.6 head snaps to the glint with a blink. Rig about 1.3x its present size in 9.5-21.
- **Balloons.** Use episode 1's `h1Say` rules for all seven: tail at most 70 long and 26 wide, balloon beside the speaker's head, top inside the panel, never over the horse's head, neck or controls.

### 9. 101.5-114.7 s (S13-S14): fifteen seconds on a bench in one pose
- **What is wrong.** Both sit facing the camera, arms folded on their laps, from 101.5 to 114.7 with the camera drifting; the stillness scan finds almost nothing changing from 105.5 to 111. The started-and-withdrawn reach (109.2) and the two arcs (111.12, 113.02) do not read: one dashed gold arc comes in from the left edge and ends near the princess.
- **Why it matters.** This is the tender scene and the promise "I go back, then I come back to you".
- **Fix (at the 1.5x framing).**
  - 102.20 (فتحدثا): he talks with his hands, big and happy, toward his cloud; 103.66 (عن): she answers with one arm toward hers; they lean a little toward each other, never in sync.
  - 104.86 (أخبرها): his hands sink to his knees, smile fades, `lid` 0.4, head down a little. 108.10 (أسرته): the cloud (note 10). 108.90 (قلقة): `wet` eyes, one blink. 109.2: her hand starts toward his shoulder, stops, goes back to her lap, eyes down then up.
  - 111.12 (العودة): he sits up, jaw set, and points up to the horse on the roof and then far left; a dashed arc draws from the horse out of the panel on the left. 113.02 (زيارتها): his hand comes back and points at the ground at her feet; a second arc returns from the left edge and lands there with a small spark; she looks at the spark, then at him, and smiles for the first time in the scene.
  - Maid: pretends to polish the lamp while leaning ever closer to listen, snaps upright at 114.3 (the chime).

### 10. 63.3-71.2 and 108.1-113.9 s: the picture clouds are postage stamps
- **What is wrong.** Inside the clouds the king is about 20 px tall, the flying horse a few pixels, the red question mark tiny (70.8). The first cloud also covers the moon. The king "reaching at an empty sky" (108.9) cannot be told from a man standing at a palace.
- **Fix.** One large subject per beat instead of small scenes. S9: 64.86 (ابن ملك) the king's bust with the emerald crown and small Firuz beside him; 65.78 (بعيد) the toy palace small and far at one edge; 67.98 (طار) the horse and rider at about a quarter of the cloud's width arcing across on a dashed line; 69.94-70.48 the line frays into loops and a question mark at least 60 px tall. S14: the king's head and shoulders, arm stretched up to an empty sunset sky, at least half the cloud's height; at 111.78 the tiny horse appears in that sky and his face lifts. Clouds about 1.3x, placed left of the moon.

### 11. 88.2-90.6 s: the eye close-up is mostly cheek
- **What is wrong.** The eyes sit in the upper third; below them 55 percent of the panel is flat skin with a nose line and a very small mouth, between two cream veil slabs. The eyes are already wide on the first frame, so "widened" (اتسعت 87.90) has no before.
- **Fix.** Crop to the band from brows to the bridge of the nose so the two eyes fill the panel width (the mouth is not needed). Start at 88.2 with `lid` about 0.35 and brows low (the doubt of S10), open over 6 drawings to full with the brows up by 89.66 (عينا), irises growing a little; reflect the hovering horse's warm under-glow as a small gold shape low in each pupil, sinking as the horse lands. One blink at 90.2 before the cut.

### 12. Smaller things
- **Cat (27-81 s):** it stands in one mid-stride pose on the parapet for 54 s, and at 64.5-71 it sits exactly behind Firuz's head so it looks perched on his shoulder. Use the Library `sit` (and `tailCurl`, `lick` once) after the landing; keep it clear of heads (for example on the parapet at x 1000 or on a cushion); walk only when it moves.
- **Shared default pose:** Firuz, princess and maid all rest with both hands at the waist, mirrored left and right (48.9, 54.6, 62.0, 73.3, 133.0). Give each a different rest: Firuz one hand on the sash, the other loose; princess hands clasped low to one side; maid both hands on the lamp.
- **Maid stacked on the princess** (47.6, 55.0, 141.2-151): keep at least half a body between them.
- **93.1-97.9:** THE STRANGEST HORSE / IN THE WORLD! covers the horse's head and the rider. Put it to the right of the princess over open sky; let her free arm present the horse.
- **Title (0.3-1.9):** readable for about 1.4 s only. Keep it in the top band over the lever insert until 3.4 as planned.
- **Guards (115.8-117.5):** one helmet and one spear tip show above the hedge at the far right. Show both helmets, the spear and the torch flame sliding along the hedge top, half a step out of phase, starting further left so they travel.

## Smaller observations (no action required)
- 26.9-29.6: the level three-step descent, dust ring and stand-up dismount are clear and gentle; keep.
- 33.5: the look back at the tied wooden horse is the best face in the film; at the closer framing of note 2 it will land.
- 85.0-87.3: hover height, shrinking shadow, glow, the maid's crouch and the cat's arch all read; keep the wide here.
- 135.7-139.9: the map draws on in the spoken order (palace, towers, dome, river and road, arrow); keep. Shorten the cream beam so it does not cross the horse's head.

## Reusable techniques worth adding to the Library
- **Rider scale follows the mount.** `ehRide` (and any `rideOn` wrapper) should default the rider's `s` to the mount's `s` times the cast ratio when `PP.s` is not given, so a rig that shrinks cannot leave its rider behind. Add a line to the Capabilities Guide under riders.
- **Zoom about the floor line** (crop sky, keep the lower picture full): the way to get actor-size framings without breaking the owner's "no empty lower picture" rule. Worth a helper in the template camera.
- **Callout card that draws on in spoken order** (`mapSketch`): good for letters, plans, lists.
- **Hover proof** (lift with shrinking contact shadow plus a pale under-glow, onlookers reacting in stagger): a general "it really floats" device.
- **Narrow balloon tail** (`h1Say`): move it from HORSE-01 into `horse_kit.js` or the style's `label` guidance so every episode gets it.
