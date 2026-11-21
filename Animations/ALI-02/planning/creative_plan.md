# ALI-02 The Forgotten Password: creative plan (80s Cel Anime)

Style `cel-anime-80s`, episode 2 of the Ali Baba series. Narration 138.69 s, last word ends 138.18 s, end hold 4.0 s, film 142.69 s. 14 scenes, 164 actions, 20 lettering items, 9 sound effects. All times are seconds on the final MP3; every cue is a word start from `inputs/timeline.md`. Every action is in `creative_plan.json`; this file gives the direction.

The reference film is ALI-01-ANIME v4 (owner approved). The owner direction at the top of `Library/styles/cel-anime-80s/look.md` decides every doubt: wide views and pans, full sets, varied bright colour with no tint over the cast, English speech balloons, readable limbs, moving holds.

## Series bible (what must match ALI-01)
The animator copies the ALI-01-ANIME drawings (`src/ab_kit.js`, `ab_cast.js`, `ab_sets.js`, and the reusable parts of `ab_main.js`, `ab_s1.js`, `ab_s2.js`, `ab_s3.js`) into `Animations/ALI-02/src/` and extends them there. No palette of an existing character changes.

| Who / what | Source | Look |
|---|---|---|
| Ali Baba | `abAli`, villager, s 0.95 | olive robe `#8f8a40`, cream turban; **the one accent: vermilion `#ff3b2f`** sash and turban band (`AB_ACC`) in every lighting set |
| Cassim | `abCassim`, merchant, s 1.1 | emerald `#1f9a6a`, saffron `#f2a71b` sash, trim and turban, rust band, red jewel, feather, belly |
| Leader | `abLeader`, bedouin, s 1.08 | indigo `#46559a`, lighter sleeves `#6c80c8`, crimson cape `#c8203f`, black beard |
| Thieves | `abMan(i)`, `AB_RIDER0` | indigo, plum, rust, green, saffron; sleeves a step lighter; own capes |
| Horses | `abHorse`, `AB_HORSE_PAL` | grey, bay, black (leader), chestnut, white, dun |
| Mule and cart | donkey pal 1, s 0.78 + `abCart` | brown mule, plank cart, flat tan sacks (the ending of episode 1) |
| Wife, child, donkey | `abWife`, `abKid`, `abDonkey` pal 0 | dusty rose; cream with orange cap; grey donkey |
| Great rock | `abRock` at (1820, 900) | 650 x 650, one painted mass, door 220 x 330, gold light |
| Places | `abGladePlate` (2400 wide: tree x 520, thicket x 900), `abCavePlate` and cels (1600 wide), forest layers, yard and village | ground y 900 everywhere |

Colour models are plate repaints only (`AB_MODEL` k = 0). Skin keeps its own colour in every set.

## 1. Narrative breakdown
- **Setup (0-14.5):** Cassim arrives where episode 1 left him, says the words correctly and gets in. The rock shuts behind him. Greed in one picture: five sacks, and he cannot lift the biggest.
- **Inciting (14.5-21):** at the door, arm raised in the leader's own gesture, the words are gone (18.34). The same arm throw that worked at 4.4 stalls in the air.
- **Rising, comic then cold (21-44):** OPEN WHEAT! OPEN BARLEY! Nothing. The light cools, a heart beats on his chest (29.92). Jump cuts of more grains, a ring of grain icons round his head, and a tiny sesame seed drifting past unnoticed. He sits down among sacks he no longer looks at.
- **Suspense (44-52.7):** the seed is about to come back when hooves arrive (impact frame 45.32). One cutaway outside shows the riders and the mule cart. He hides behind his own sacks.
- **Reveal and climax (52.7-71.4):** the door opens from outside; the leader follows the coin trail Cassim dropped to the stranger (impact frame 60.12, WHO ARE YOU?). Cassim kneels and promises; the leader answers with a shadow, not a word.
- **Turn (71.4-90.9):** Ali Baba, worried, follows the cart tracks, watches from the thicket of episode 1 and throws pebbles over the thieves' heads onto a scree slope. GUARDS?! Two men are sent to look.
- **Rescue (90.9-107.3):** a row of turned backs; Ali Baba's palm says wait; Cassim frozen on one foot; then the run through the trees with one sack, five left behind.
- **Resolution and moral (107.3-125.3):** after the one tape transition (BACK HOME...), the bright yard. Ali Baba speaks plainly, Cassim is ashamed (the long word 115.38-117.2 carries one slow piece of acting), thanks him and promises; the family hush closes it.
- **Cliffhanger (125.3-142.7):** sunset at the rock. The leader reads the footprints: two know the secret. The arm that opened the rock now points at the town. THE END.
- **Emotional arc:** smug, greedy, puzzled, frightened, hopeless, terrified, abject; then (Ali Baba) worried, clever, brave; then ashamed, grateful, warm; then threatened.

## 2. Scene-by-scene storyboard
| Scene | Time | Place and light | On screen | Key cues |
|---|---|---|---|---|
| S1 | 0-8.22 | glade, dawn | crane down, title, cart arrives, OPEN SESAME!, rock opens and shuts | hop 1.40; call 4.42; balloon 5.66; in 6.28 |
| S2 | 8.22-14.55 | cave, gold | pan to the gold, five sacks (counter), the failed lift, TOO HEAVY! | fill 9.28; strain 11.82; drop 13.38 (pause) |
| S3 | 14.55-20.92 | cave | drag to the door, coin trail, arm stalls, seed turns to ?, eye close-up | stop 16.66; forgets 18.34; cloud 19.34 |
| S4 | 20.92-33.46 | cave, cooling | OPEN WHEAT!, OPEN BARLEY!, tilt up the slab, the heart | 23.18; 25.04; shut 28.16; heart 29.92 |
| S5 | 33.46-43.88 | cave | three jump cuts, grain ring, sits, thinks | 34.74; ring 36.40; sits 40.10 |
| S6 | 43.88-52.69 | cave / glade morning | hears, impact frame, CLOP CLOP, riders outside, eye close-up, hides | 44.78; 45.32; outside 47.48; 51.06 |
| S7 | 52.69-63.06 | cave with daylight | door opens, backlit leader, coin trail, WHO ARE YOU? | 52.69; 54.62; impact 60.12; 62.10 |
| S8 | 63.06-71.43 | cave | trembling, kneeling, NEVER AGAIN!, the silent shadow | 63.06; 64.82; 66.26; 69.52 |
| S9 | 71.43-77.22 | forest morning | Ali Baba tracking, picture balloon, the ruts light up | 73.36; 74.78; 75.78 |
| S10 | 77.22-90.9 | glade morning | eyes in the leaves, pan to the rock, throw, whip pan, CLATTER!, GUARDS?!, two sent | 80.30; 81.28; 82.02; 85.40; 88.34 |
| S11 | 90.9-99.06 | glade morning | backs, pan to Ali Baba's signal, whip to Cassim, WAIT!, the two vanish | 93.00; 95.10; 96.36; 98.22 |
| S12 | 99.06-107.3 | glade, forest | beckon, sprint, forest run, five sacks left, mule follows, double take, tape | 100.40; 101.76; 102.58; tape 106.45 |
| S13 | 107.3-125.27 | yard, full morning | arrival, the telling off, shame, thanks, oath, hush | 110.28; 115.38; 117.94; 120.86; 123.62 |
| S14 | 125.27-142.69 | glade, sunset | footprints, thought cloud, TWO KNOW OUR SECRET!, SEARCH THE TOWN!, far town, THE END | 129.36; 133.60; 135.54; 137.74; end 139.0 |

Transitions: cuts on phrase boundaries, a match cut on the gold light at 8.22, the single tape transition (`later`, BACK HOME...) at 106.45.

## 3. Character acting
All character channels on twos (`celStep(t, 12)`), blinks and lip flaps on threes (`celStep(t, 8)`).
- **Cassim** carries 70 seconds almost alone, so his body must change state clearly: (1) smug and big: chest out, lid 0.3, hand rubbing; (2) straining: `strainLift`, squash and stretch, trembling knees; (3) blank: the arm wilts over three drawings, eyes slide up and left; (4) shouting: tiptoe, eyes shut, one eye peeking (`wink`); (5) afraid: knees together, `wet`, saccades held 0.4 s, 2 unit `tremble`; (6) beaten: sits heavily (`sit`, `seat: 'floor'`, `landSquash`), ignores spilled coins; (7) terror: only a turban top and feather; (8) abject: `kneel`, `PERSON_HANDS.clasp`, forehead to the floor; (9) ashamed at home: gaze down, head sinks, shoulders in, `blush`, toe scuffing. His **feather** is his antenna: it arrives late (`lagged`), buzzes when he trembles, droops when he gives up.
- **Ali Baba** thinks with his eyes first, then the head, then the body (as in episode 1). Worry is a hand on the chest and a slower step; the throw has a full anticipation (arm far back, `tip` -0.15) and follow-through with the sash tail; the signal is small and exact (palm, then `hush`). At home he is stern for nine seconds and softens over three drawings at 118.86.
- **The leader**: economy and weight. Backlit with a pink rim in the arch (53.4), heavy footfalls, cape three drawings late, one slow blink instead of an answer (69.52). At the end he crouches at the prints, paces, and throws the arm.
- **The men** are never in sync (`stagger(i)`, a seed each): one bites a coin, one yawns, one cracks his knuckles; heads snap right in a wave at 84.1; a ragged half circle at 130.2.
- **Animals** react first with the ears: the mule flinches when the rock opens and is the only one who looks left at 92.2; the chestnut horse nearly gives Ali Baba away at 79.7; the donkey's ears go flat on "danger".
- **Listeners:** the wife's hands go to her cheeks, the child hides behind her and later laughs; all copy the hush on staggered beats.
- **Moving holds:** `idleSway` on `tip` and head, `breathe` on `sq`, tail and ear cycles, in every pause listed in the implementation notes. `groundShadow(..., { flat: true })` under everyone.

## 4. Camera and composition
The camera is on ones. Ground stays in the lower part of the picture in every framing; nothing pushes in until the floor is empty.
- **Wides for places:** the dawn glade (zoom 1.0), the cave wide after the pull-out (1.15), the morning glade (1.0), the yard (1.18), the sunset rock (1.0), the far town.
- **Pans across detailed sets:** to the gold (8.22), back to the door (14.6), along the coin trail (56.6), thicket to rock (78.0), the travelling view backs, thicket, door, scree in S11.
- **Whip pans** for two eyelines: following the pebbles (81.3) and from Ali Baba's signal to Cassim (94.8); a third to the town (136.86).
- **Tilt up the slab** (25.74) to make the door huge and Cassim small.
- **Close-ups only at peaks:** Cassim's eyes when the words are gone (19.9) and when he knows who is outside (48.78); Ali Baba's eye gap in the leaves (77.22).
- **Two-shots for dialogue:** leader and Cassim (zoom 1.5), the brothers at home (1.5) with the wife at the frame edge.
- **Inset** (tape edged, top left) for Ali Baba's palm while the picture stays on Cassim (95.82).
- **Impact frames:** 45.32, 60.12, 137.74.
Faces and key action stay between world y 250 and y 900. Balloons sit above the speaker with the tail on the head and never cover a face or the door.

## 5. Storytelling opportunities
- **Setup and payoff:** one shared arm throw (`ARM_KEYS`, the leader's from episode 1): it works at 4.4, stalls at 18.3, fails at 22.2 and 24.0, and returns at 135.5 when the leader points at the town.
- **Humour:** the sack that wins; one eye peeking after each wrong word; grains circling his head while the sesame seed floats by; the turban that falls off mid-bow; frozen on one foot; the belly bump in the hug; the mule deciding to go home.
- **Suspense:** the coin trail he dropped out of greed is what leads the leader to him; the chestnut horse sniffing the thicket; the row of backs that might turn; the thief's double take as the tape cuts.
- **Surprise:** the daylight blade across the gold; pebbles flying over a yawning thief.
- **Emotion:** the first time he ignores gold (41.62); the leader's shadow; the long "ashamed" beat; the sack pushed away with a foot.
- **Colour as story:** rose dawn, intoxicating gold, the same gold gone cold, white-blue daylight cutting in, fresh green morning, the full bright yard, a warm sunset with a threat in it.

## 6. Asset requirements
**Reused unchanged (ALI-01 code and Library):** all cast above; `abRock`, `abSack`, `abCoinPile`, `abChest`, `abCart`, `abCavePlate`/`abCaveCels`/`abCaveLive`, forest layers, yard and village, `abSilRow`, `abDust`, `abFace` close-up heads, `abFoliageFront` (leaf gap), `coinEyes`; Library `person` presets and `PERSON_HANDS`, `donkey`, `horse`, `rideOn`, `bird` sparrow, `heart`, `thoughtCloud`, motion helpers.

**New (7 entries, 2 of them major; all reusable; sizes and build notes in `new_assets`):**
1. `caveDoorInside` (prop, M): the door from inside, arch x 60..280, top y 560; fields open, crack, light, sky.
2. Glade models `dawn` and `morning` with `screeSlope` (set, M): palette rows plus about 14 boulders at x 2200..2400 rising to y 600, bounce points exported.
3. `grainIcons` with `confusionRing` (prop, S): wheat, barley, rice, lentil, bean, corn, sesame at 48 px; ring 150 x 60.
4. `pebbleThrow` and `rollDown` (motion, S).
5. `cartTracks`, `coinTrail`, `footprints` (prop, S): one `trail` function with reveal and lit.
6. `strainLift`, `tiptoeFreeze` (pose, S): existing person fields only.
7. `blush` (expression, S).
Also small: `farTown` (the ALI-01 roof strip at half scale on the horizon).

## 7. Implementation notes for Opus
- Frame order: `S.background`, `S.box` panel, plate, cels, light, lettering, transition, `subtitle`, `S.finish` last. Palette names only.
- Pose at `tc = celStep(t, THEME.celFps)`: `flow(tc, KEYS)`, `idleSway(tc, seed, ...)`, `walk(xf, tc)` with `footfalls`; `lagged` for feather, sash tail, cape, hands. Camera, light, dust, glints and trails use `t`.
- Balloons with `abSay` (`S.label { balloon: true, to }`), size 52 (58 for WHO ARE YOU?, 60 for OPEN BARLEY!), removed 0.4 s after the last cue. THUMP THUMP, CLOP CLOP, CLATTER!, WAIT! are plain tags.
- `S.emphasis { rect: AB_PANEL }` at 45.32, 60.12, 137.74. `S.transition { rect, caption: 'BACK HOME...' }` 106.45-107.30, plate swap at the midpoint.
- Cave light: gold rim from the right while shut; a cool rim `#bfe0ff` from the left for anyone in the daylight blade after 52.69.
- Doorway figures outside reuse `abDoorState` / `abDoorFig`.
- Glade blocking for this film (approximate, adjust on stills): cart bed x 1200, mule x 1490; chestnut horse x 1040; black horse x 2060; back-row horses x 1380 and 1560 (y 860, s 0.5); men on the right of the door x 1960..2140; scree x 2200..2400.
- Sound (9, master 0.6, in pauses only): thud 13.42, blip 32.55, blip 32.95, riser 51.78, stamp 70.62, blip 90.3, glitch 106.6, whoosh 124.65, chime 139.1; tape bed.
- Subtitles: chunks already in `chunks_ar.txt` / `chunks_en.txt` and `timing.json`; unchanged.
- Check with contact sheets (every 4th frame): the lift 11.6-13.9, sitting 40.1-41.6, kneeling 64.8-66.0, throw and roll 80.3-83.4, the run 100.4-101.5; frame-difference scan for frozen holds.

## 8. Warnings and open questions
- 71 seconds in one cave: the shots listed in section 4 must read as different pictures; keep the silver and cloth zones alive.
- The pebble throw spans 1400 world units and depends on the whip pan; review it as a clip early.
- Up to nine figures and four animals in S10 to S12: bake scree and dressing, skip off-screen horses.
- The dawn and morning models must differ clearly from each other and from ALI-01's afternoon, and none may tint the cast.
- Arabic and English chunk breaks differ in P1 and P2 (as supplied); balloons follow the Arabic words.
- The English and Arabic scripts match; no SCRIPT question.
- Owner questions (9, in the JSON): invented balloon lines, the extra grain names, softened threat, the pebble staging, one sack taken home, the mule following home, footprints and THE END, the order of times of day, the title card.
