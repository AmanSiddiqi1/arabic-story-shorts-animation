# ALI-01-ANIME Open Sesame: creative plan (80s Cel Anime)

Style `cel-anime-80s`. Narration 138.94 s, last word 138.71 s, end hold 4.0 s, film 142.94 s. 17 scenes, 141 actions, 18 lettering items, 14 sound effects. All times are seconds on the final MP3; every cue is a word start from `inputs/timeline.md`. The storyboard with every action is in `creative_plan.json`; this file gives the direction.

This is not a Halftone film re-skinned. Every shot is built from four layers: a soft painted plate, flat hard-shaded cels on twos, backlit light, and the CRT pass. The drama comes from held drawings, moving light and colour model changes, not from busy character animation.

## 1. Narrative breakdown
- **Setup (0-15.2):** Ali Baba is poor, kind and content: family, donkey, axe, an empty purse he smiles about. That contentment is what the ending tests.
- **Inciting and suspense (16.5-34.5):** hooves. The donkey hears first. A held close-up of his eyes, then the climb and the vanishing into leaves until only two eyes remain. From here to 70 s the audience watches the thieves from his hiding place (a dark leaf frame in the corner of every wide).
- **Surprise and reveal (34.5-50.3):** forty riders, heavy sacks, a blank rock. The leader calls the words (42.76) and the first impact frame (44.86) splits the rock with a seam of gold light.
- **Time passes (50.3-70.5):** in, door shut, tape transition MUCH LATER..., the same composition repainted at dusk, out, mounted, Close Sesame (64.06), an ordinary rock again (a sparrow lands on it).
- **Turn and climax (70.5-89.5):** he waits, climbs down, a small man before a huge rock; he copies the leader badly, eyes shut. One beat of nothing, then the second impact frame (85.02). The door opens "before his eyes": an extreme close-up with the door reflected in both irises (87.6).
- **Peak and character (89.5-105.6):** one slow pan across a painted gold-lit still. His hands rise toward the big chest, stop, and he takes the smallest sack (98.8). This is the emotional centre: decency under temptation.
- **Fall (105.6-131.8):** lamplit whisper with his wife, SHHH!, one coin left uncovered, Cassim's turban in the window. Cassim's coin eyes, three jump-cut questions, the secret given up. Cassim hears "gold" and stops hearing anything else: the words drift past his ear.
- **Ending (131.8-142.9):** Cassim's cart and flapping empty sacks under a pre-dawn sky; the three words fall off the cart one by one on "would he remember"; freeze frame on the last word with a chrome ? over the far rock. THE END.
- **Moral:** not stated in the script. The pictures contrast one small sack with a cart of empty ones.

## 2. Scene-by-scene storyboard
| Scene | Time | Colour model | On screen | Key cues |
|---|---|---|---|---|
| S1 | 0-7.78 | dawn | Crane down a painted sky to the cottage yard; chrome title; family, axe, empty purse | title 0.3; ALI BABA tag 5.52; purse 6.46 |
| S2 | 7.78-16.45 | morning forest | Side tracking with the donkey through light shafts; chopping; loading | donkey tug 10.18; first blow 11.96; bundle 13.50 |
| S3 | 16.45-25.61 | afternoon | Donkey's ears, cupped ear, dust cloud growing in three steps, eye close-up, THIEVES? | 18.03; 19.41; close-up 22.41; tag 24.61 |
| S4 | 25.61-34.5 | afternoon | Donkey into the thicket, climb with tilt, leaves close, eyes only, pan to the rock | climb 26.45; hide 29.65; pan 31.25 |
| S5 | 34.5-40.46 | afternoon | Riders tracking with speed lines, counter to 40, sack insert, accordion stop at the rock | counter 35.02; sacks 36.54; rock 38.72 |
| S6 | 40.46-50.32 | afternoon to gold | Leader, Arabic words in glowing Lalezar, impact frame, rock splits, door, Ali Baba's eyes | words 42.76; impact 44.86; door 47.88; eyes 48.34 |
| S7 | 50.32-57.03 | afternoon | Backlit file of men into the door; door shuts; tape transition | in 50.84; shut 53.88; transition 56.2 |
| S8 | 57.03-62.55 | dusk | Same framing repainted; men out with flat sacks; staggered mounting | out 59.00; mount 59.88 |
| S9 | 62.55-70.48 | dusk | Leader shouts from the saddle; rock seals; sparrow | words 64.06; shut 66.20; sparrow 68.60 |
| S10 | 70.48-78.0 | dusk | Gallop away under the tree; empty path; careful descent; landing | gone 72.64; down 74.70; land 76.20 |
| S11 | 78.0-89.48 | dusk to gold | Sneak walk, knock, finger counting, memory flash, timid words, impact frame, light, eyes | words 82.84; impact 85.02; eyes 87.60 |
| S12 | 89.48-95.4 | cave gold | Slow pan across the peak still: GOLD, SILVER, CLOTH | 90.82; 91.56; 92.56 |
| S13 | 95.4-105.57 | cave, then dusk to night | Held bust with gold bands; refuses the chest; ONE SMALL SACK; shuts the rock; donkey ride home | 97.30; 98.80; 101.30; 102.72 |
| S14 | 105.57-113.26 | night, lamp | Two-shot: coins on the mat, picture balloon, SHHH!, cloth over the coins, turban in the window | wife 107.11; hush 110.97 |
| S15 | 113.26-123.81 | night, lamp | Cassim at the window, coin insert, coin eyes, three jump-cut ?, the whisper, the grin | 114.55; 115.35; 118.47, 119.05, 119.61; 120.35 |
| S16 | 123.81-131.81 | night, gold bands | Cassim's eyes; gold thought; map card snatched; words slide past his ear | 126.35; 129.51; 130.77 |
| S17 | 131.81-142.94 | pre-dawn | Cart and empty sacks tracking; words fall off; rock on the horizon; freeze; THE END | 132.49; 135.87; 136.63; 137.93; end card 139.0 |

Transitions are cuts on phrase boundaries, one match cut into the cave (89.48: the door light becomes the cave light) and the single tape transition (56.2, `later`, caption MUCH LATER...).

## 3. Character acting
All character channels are sampled on twos (`celStep(t, 12)`), blinks and lip flaps on threes (`celStep(t, 8)`).
- **Ali Baba** (villager preset, olive patched robe, one accent: vermilion sash and turban band in every colour model). Small, careful, honest body: he thinks with his eyes first (saccades via `gazePlan`), then the head, then the body. Signature moves: the patient smile, counting on fingers (80.6), the bad copy of the leader's pose with eyes shut and one eye opening (84.4, `wink`), hands rising toward the chest and being pulled back (96.36-98.2, `flow` on the hands, a blink on the head shake). Sash tail and turban tail follow with `lagged`. In hiding he is only an eye band in the leaves: lid, pupils and a 2 unit `tremble` carry everything.
- **The donkey** is the comic witness and always reacts first with the ears (`earL`, `earR` ahead of `headTurn`): hears the horses before him (17.6), peeks with one eye from the thicket (30.73), rises ears-first to ask "well?" (77.0), runs home with ears streaming (103.64).
- **The leader** (bedouin preset, black and crimson, s 1.08): economy and weight. Lands heavy (`landSquash`), cloak ribbon arrives three drawings late, breath in before each call (`anticipate`), arm overshoots and settles (`settleTo`). He never looks back.
- **The forty** (6 cel riders + 33 silhouettes): never in sync. `stagger(i)` plus a seed each for bob, lean, cloak phase; accordion stop at the rock (38.2), staggered flinch at the light (46.9), mounting one after another (59.88). Small individual business: one yawns, one hitches a sack, one stumbles, the last looks back toward the tree (52.04, the only direct threat to Ali Baba).
- **The wife** (villageWoman, dusty rose): quick hands. Cheeks (106.55), listens with her eyes going from the balloon to his face, nods a beat after him, copies the hush, covers the coins. Looks away during Cassim's questions.
- **Cassim** (merchant preset, emerald and saffron, s 1.1, belly): takes space. Saccade scan from the window, `coinEyes` pop (116.25), looms with `pointDown`, jump cuts closer on each question, grin growing over four drawings (121.37). In S16 his body is already turned to the door while Ali Baba is still talking.

## 4. Camera and composition
The camera is always on ones. Vocabulary used, each for a reason:
- **Multiplane crane** (0-4.6) to enter the world; **side tracking with 4 parallax layers** for the morning routine (7.78), the riders (34.5), the ride home (102.72) and Cassim's cart (131.81).
- **Held bust or extreme close-up with light bands** for the four inner moments: fear (22.41), the door opening in his eyes (87.6), amazement (95.4), Cassim's greed (123.81).
- **Small flat hero in a huge painted world:** the wides of the rock at zoom 1.0-1.1 (32.4, 38.2, 78.0) and the last shot.
- **An earlier composition repainted:** S7 and S8 share the framing {x 1760, y 620, zoom 1.1}; only the colour model changes.
- **Slow pan across a painted still** for the treasure (89.48-94.4).
- **Locked two-shot with lip flaps** for the whisper (105.57), broken by jump cuts when Cassim invades (118.47, 119.05).
- **Insert with bokeh and a sliding highlight** on the uncovered coin (115.35).
- **Impact frames** at 44.86, 85.02 and the freeze at 137.93.
Faces and key action stay between y 250 and y 900 of the world; Arabic display words sit above the speaker and never cover a face. The leaf frame (top left, 380 x 300) appears in every wide from 38.2 to 70.5.

## 5. Storytelling opportunities
- **Suspense:** the dust cloud growing in three held steps; the last thief's backward look and the eye gap snapping shut (52.04); the beat of stillness before each impact frame.
- **Surprise:** the rock is deliberately blank and unlabelled when first seen (32.4), so the split is a real reveal.
- **Humour:** donkey ears that will not stay down (25.61); the eye in the thicket (30.73); Ali Baba's timid, half-size, wobbly version of the magic words and the one eye opening (82.84-85.0); patting the rock like a horse (102.14).
- **Emotion:** the hands that stop (97.3); the gold light going off their faces when the cloth covers the coins (111.67); Ali Baba's reaching hand after Cassim (122.65).
- **Setup and payoff:** the leader's thrown arm (42.76) is replayed as a tape memory flash (81.76) and copied by Ali Baba (82.84) and mimed again (101.3). The words as glowing objects pay off at the end when they slide past Cassim's ear (130.77) and fall off his cart (135.87): the picture answers the narrator's question without saying it.
- **Colour as story:** warm safe morning, amber afternoon, uneasy violet dusk, intoxicating gold, cold blue night with a small warm lamp, a pale uncertain dawn.

## 6. Asset requirements
Reused from the Library: `person` costume presets (villager, villageWoman, servant child, bedouin, merchant) with `pal` overrides; `donkey` (pal 0 and 1), `horse` (pal 1 and 2) with `rideOn`, `load`, `silhouette`; `bird` kind sparrow; `villageYard`, `hutRoom` (night), `countryRoad`; `PERSON_HANDS` gestures; `thoughtCloud`; motion helpers.

Planned names reused: `sack`, `coinPile` (gold and silver), `clothBale`, `treasureHoard` chest, `goldGlow`, `coinEyes`, `mapCard`, `iconBalloon`, `purse`, `woodBundle` with axe, `handcart`.

New for this story (5 entries, all reusable):
1. **sesameRock** (prop, M): 650 x 650, seam at x 1820, door 220 x 330; fields `open`, `crack`, `glow`, `model`, `s`.
2. **treasureCave** (set, L): 1600 x 1230 painted plate with emissive glows and cel treasure in three zones.
3. **celPlates** (effect module, L): `paintPlate`, the plates (dawnTown, forestMorning, rockGlade in three models, nightTown, preDawn), `lightBands`, `speedLines`, the colour model table `MODEL`.
4. **handcart** (prop, S): bed 260 x 60, wheels r 62, shafts 190, sack heap.
5. **treeClimb and leafHide** (pose, M): climb cycle on trunk points and the eye-gap foliage pass.

Exact dimensions and build notes for each are in `new_assets` and `sets` in the JSON.

## 7. Implementation notes for Opus
- Frame and finish as in the template with `THEME.page` / `THEME.panel`; `S.finish` last. Palette names and `BF` only.
- Order per frame: plate, cels, light (`goldGlow`, `lightBands`, `castFinish` rim), lettering, `S.finish`.
- Pose channels at `tc = celStep(t, THEME.celFps)`; write `flow(tc, KEYS)`, `idleSway(tc, seed, ...)`, `walk(xf, tc)`. Camera keys, plates, bands, dust and glows use `t`.
- Colour models are plate repaints plus a cel multiplier (offscreen, `source-atop`, as `castFinish` does). After tinting, redraw Ali Baba's sash and turban band in pure `#ff3b2f` and keep skin from the model table.
- New drawings use `celShade(ctx, pts, fill, shade, {light, hi})`; outlines are dark versions of the fill, never black.
- Riders: `rideOn(ctx, 'horse', {...walk(xf, tc, {stride: GAIT.horse * s}), gallop}, personP)`; cloaks and empty sacks are ribbons on a travelling sine (4 drawing cycle).
- Arabic calls: `S.title(word, {font: 'Lalezar'})`, one word per spoken word (42.76, 43.62, 43.80; 64.06, 64.78, 64.94; 82.84, 83.76, 83.94), removed 0.4 s after the last.
- Impact frames: `S.emphasis(..., {rect: panel})` exactly on 44.86, 85.02, 137.93; silent.
- Transition: `S.transition(..., {rect: panel, caption: 'MUCH LATER...'})` from 56.2, plate swap at its covered midpoint.
- Sound (14, master 0.6, all in listed pauses): blip 15.7, thud 22.0, riser 33.9, chime 49.5, glitch 56.3, whoosh 62.1, stamp 65.85, thud 69.75, blip 77.4, riser 88.9, chime 94.95, whoosh 105.0, stamp 123.2, chime 139.1.
- Run the "alive" checklist on contact sheets of the climb (25.6-30.6), the descent (74.1-77.0), the mounting (59.9-61.6) and the two-shot (105.6-113.3).

## 8. Warnings and open questions
- The Library cast is front-facing and simple; do not redraw heads. The anime feel must come from layers, light, timing and the eye close-up function. Review the four close-ups early.
- Skin under tinted colour models can go pink or grey: check stills in dusk, cave and night.
- Forty riders must stay cheap: one baked silhouette strip reused with offsets.
- Pauses are short (0.6 to 1.3 s): effects under 0.5 s.
- The English and Arabic scripts match; no SCRIPT question.
- Owner questions (7, in the JSON): THE END versus TO BE CONTINUED, Arabic magic words on screen, the added donkey and family business, Cassim's not listening as a visual hint, the donkey cart, 7 drawn + 33 silhouette thieves, the mimed closing at 101.30.
