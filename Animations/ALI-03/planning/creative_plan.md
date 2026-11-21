# ALI-03 The Marked Door: creative plan (80s Cel Anime)

Style `cel-anime-80s`, episode 3 of 6 of the Ali Baba series. Narration 143.48 s, last word ends 142.96 s, end hold 4.0 s, film 147.48 s. 17 scenes, 184 actions, 19 lettering items, 10 sound effects. All times are seconds on the final MP3; every cue is a word start from `inputs/timeline.md`. Every action is in `creative_plan.json`; this file gives the direction.

The reference film is ALI-01-ANIME v4. The owner direction at the top of `Library/styles/cel-anime-80s/look.md` decides every doubt: wide views and pans, full sets, varied bright colour with no tint over the cast (night included), English speech balloons, readable limbs, moving holds.

## Series bible
Everything in the ALI-02 bible stands (Ali Baba olive `#8f8a40` with the one vermilion accent `#ff3b2f`; Cassim; the leader indigo with crimson cape; thieves indigo, plum, rust, green, saffron; horses; mule; rock; ground y 900). The animator copies `ab_kit.js`, `ab_cast.js`, `ab_sets.js` and the reusable parts of `ab_main.js` from ALI-01-ANIME (plus ALI-02's glade `morning` model, `farTown`, `tiptoeFreeze`) into `Animations/ALI-03/src/`. This episode adds:

| Who / what | Source | Look |
|---|---|---|
| **Morgiana** | new `abMorgiana`: person `villageWoman`, s 0.93, age 0.15, pal `AB_MORG0` | cream dress `#f4e6c8`, violet waistcoat `#6a3fa0` with lighter sleeves `#8a62c0`; **her one accent: turquoise `#14c2c8` headscarf and sash** (`AB_MORG_ACC`, never tinted), scarf tail as a ribbon two drawings late. Complementary to Ali Baba's vermilion, distinct from Cassim's emerald and the wife's rose |
| First spy | `abMan(1)` (plum) + `spyDisguise` | tall, thin; cream townsman's turban, tan cloak `#c8a070`; white chalk |
| Second spy | `abMan(3)` (green), s 0.84 + `spyDisguise` 2 | short, round; grey cloak, striped cap too big; red paint pot, brush behind the ear |
| Oil merchant | leader's rig, costume `merchant`, pal `AB_OILM0` | mustard robe `#d8a43a`, big white turban, brown cloak with a thin crimson lining; same beard and brows; **silver ring with a split blue stone** (pays off in episodes 4 to 6) |
| Old neighbour | person `oldWoman`, age 0.8, s 0.88, broom | lives behind door 2; one of the "trusted neighbours" of episodes 4 and 5 |
| Street cat | Library `cat` pal 2, s 0.55 | the silent witness on the roofs |
| Pack mules, oil jars | donkey pal 1 and 2, s 0.82 + `jarPannier`, `oilJar` | jar 70 x 150 on the mule (110 x 230 on the ground in episode 4), lid field |
| **townStreet** | new painted strip 2000 x 1230, models `day`, `night`, `evening` | arch x 0..220; doors (120 x 250, top y 650) D1 cx 370 green, D2 cx 660 plum, **D3 Ali Baba cx 930 wood**, D4 cx 1580 ochre, D5 cx 1860 teal; Ali Baba's house x 800..1180 in the ALI-01 cottage wash `#e0a888`, window x 1040..1150, y 430..550 with a vermilion geranium box; courtyard wall and gate x 1180..1440 (gate cx 1310) for episodes 4 to 6 |
| Marks | `doorMark` | chalk cross 36 x 36 beside each door at (cx + 90, 770); red dot r 14 on each door at (cx, 745) |
| Market | Library `marketStreet` w 2000 + `laneArch` at x 1760..1960 | the same arch is the left end of townStreet |

## 1. Narrative breakdown
- **Setup (0-16.9):** the leader, where episode 2 left him, sends a disguised man. In the market nobody knows Ali Baba, until a seller shows off a gold coin and thumbs at the narrow street.
- **Inciting (16.9-35.5):** the spy knows the house by the olive robe and vermilion sash on the washing line and the donkey at the gate. A small white chalk cross (21.9). He dreams of his reward and leaves, brushing past a young woman in the arch.
- **Turn (35.5-56):** Morgiana. Her first twenty seconds show who she is before she does anything clever: quick hands, kind to the neighbour and the donkey, eyes everywhere. She stops mid-step (41.44), reasons in pictures (only our door) and decides.
- **Comic payoff 1 (56-75.2):** she copies the cross on four doors. Day turns to night in one shot. The spy presents his mark and then sees the next, and the next (pan with a counter, 70.2-73.8).
- **Climax of act 1 (75.2-86.3):** WHICH DOOR?! hissed in a whisper (impact frame 78.94). He cannot answer. They back out. Tape transition NEXT DAY...
- **Repeat with a variation (86.3-116.2):** a second, keener spy, red paint, a dot on the door (95.86). Morgiana sees it from the window, laughs quietly (104.3) and dots every door. The second night fails faster.
- **Second turn (116.2-128.3):** the leader does not rage; he thinks. Someone here is cleverer than us. He will come himself.
- **Resolution and cliffhanger (128.3-147.5):** Morgiana warns Ali Baba. Evening: a long shadow, an oil merchant, mules with tall jars, a ringed fist on the door. The door opens; Morgiana watches from the window. TO BE CONTINUED...
- **Emotional arc:** smug (spy), alert, amused, triumphant (Morgiana); furious, then coldly intelligent (leader); warm and unsuspecting (Ali Baba); uneasy at the end.
- **Moral:** a calm, clever head beats force.

## 2. Scene-by-scene storyboard
| Scene | Time | Place and light | On screen | Key cues |
|---|---|---|---|---|
| S1 | 0-6.9 | glade, morning | crane down, title, leader picks a man, FIND HIS HOUSE!, disguise, exit | step out 1.84; arm 2.84; balloon 3.48 |
| S2 | 6.9-16.9 | market, day | long pan with the spy, ALI BABA? three times, the gold coin, THAT WAY!, the arch | ask 9.34; coin 12.62; clue 13.14; lane 15.0 |
| S3 | 16.9-26 | street, day | tilt down to the street, the washing line clue, house tag, chalk cross, hand insert | stop 17.61; strokes 21.9, 22.6; glint 24.42 |
| S4 | 26-35.5 | street | smile, I'LL BE BACK TONIGHT!, reward thought cloud, exit past Morgiana | smile 26.1; balloon 29.2; cloud 30.46 |
| S5 | 35.5-45 | street | Morgiana's walk, name tag, orange catch, carrot, freeze, eye close-up, fingertip | tag 36.6; catch 38.54; sees 41.44 |
| S6 | 45-56 | street | looks both ways (clean doors), WHY ONLY OUR DOOR? with door icons, memory inset, idea | look 45.24; ours 50.86; secret 54.9 |
| S7 | 56-64.4 | street | fetches chalk, measures, four crosses with counter 2..5, wink | chalk 58.28; marks 59.66, 60.78, 62.58, 63.32 |
| S8 | 64.4-75.2 | street, day to night | time-lapse, sneak chain, THIS ONE! NO... THIS ONE?, reveal pan with counter | in 66.58; whole street 70.18-73.88 |
| S9 | 75.2-84.2 | street, night | leader's anger, impact frame WHICH DOOR?!, eeny meeny, UH..., palm down the face | anger 75.55; which 78.94; cannot 80.94 |
| S10 | 84.2-86.3 | street, night | window lights, they back out, shutter slit closes, tape NEXT DAY... | withdraw 84.36; tape 86.3 |
| S11 | 86.3-93.5 | glade, morning | spy 1 in disgrace, spy 2 hops up, cross struck out and red dot, paint pot | sent 87.92; another 89.38; mark 90.88 |
| S12 | 93.5-100.8 | street, day | spy 2 finds the sash, red dot, brush insert, strolls off dripping; shutter opens | dot 95.86; red 96.54; leaves 99.76 |
| S13 | 100.8-111.3 | street, day | Morgiana at the window, HEE HEE, bowl of henna, four dots, neighbour let in | saw 101.2; laugh 104.3; dots 107.12-110.18 |
| S14 | 111.3-116.2 | street, night 2 | spy 2 presents, the leader points at the next door, pan, four fingers at four doors | return 111.68; not know 115.18 |
| S15 | 116.2-128.3 | street, night 2 | stillness, SOMEONE ON THIS STREET IS CLEVERER THAN US!, eye close-up, I WILL COME MYSELF., blue-paint volunteer | 118.28; 120.74; 124.42; third 127.16 |
| S16 | 128.3-134.6 | street, afternoon | Ali Baba home, Morgiana shows the doors, BEWARE OF STRANGERS! | told 128.71; beware 133.16 |
| S17 | 134.6-147.48 | street, evening | dusk time-lapse, shadow, oil merchant, mules and jars, ring insert, A BED FOR THE NIGHT?, door opens, window, TO BE CONTINUED... | evening 136.22; man 137.66; jars 140.38; knock 141.52 |

Transitions: whip 6.9, cuts on phrase boundaries, plate dissolves at 64.4, 111.3 and 128.3, the single tape transition (`later`, NEXT DAY...) at 86.3.

## 3. Character acting
All characters on twos (`celStep(t, 12)`), blinks and lip flaps on threes (`celStep(t, 8)`).
- **Morgiana** thinks with her eyes first: the eyes snap, the body stops one drawing later, the scarf tail swings on and settles (`swing`, `lagged`). She is quick but never frantic: reflex catch (38.54), finger and thumb measuring the cross (58.92), skids with `landSquash` at each door, a `wink` to the viewer only twice (63.9, 105.3). Laughing "quietly" is hand over mouth, eyes in crescents, shoulders bouncing on twos (104.3). With Ali Baba she is urgent and level, one finger raised.
- **First spy:** shifty eyes with a still head (`gazePlan`, saccades held 0.4 s), a smile that grows over three held drawings on the long word at 26.1, pride with eyes shut (69.26), then the grin staying on the mouth while the eyes fill with alarm (70.18), wilted finger, knocking knees, `wet`, `tremble`. In disgrace he sits with his back turned and lets the chalk fall.
- **Second spy:** the opposite silhouette and rhythm: short, bouncy, moves his whole head to look, tongue out to paint, artist's thumb. He repeats the first spy's showman bow exactly, so the audience is ahead of him.
- **Leader:** night 1 is heat (stretch, stomp, looming `tip` 0.15, a hissed line through shut teeth); night 2 is cold (flat palm, stillness, only cape and eyes move, slow beard stroke, eye close-up without a blink). Cape always three drawings late (`lagged`). The series arm throw (`ARM_KEYS`) returns at 2.84, 80.14 and 87.92.
- **Oil merchant:** the leader's heavy footfalls and brows under a merchant's smile (lid 0.3); eyes only when he reads the marks on the door (141.02).
- **Ali Baba:** easy and tired coming home; double take eyes, head, step; hand on chest (the worry gesture of episode 2); open and kind in the lit doorway.
- **Groups never in sync:** `stagger(i)` and a seed each for the row at the rock, the `sneakChain` (accordion bump at 68.5, reverse at 84.4), the four pointing arms at 115.2.
- **Animals and witnesses:** the donkey knows Morgiana (ears up 35.0) and distrusts both spies (ears flat); the cat watches every scene and is the only one who sees Morgiana at the window; the old neighbour's delight at 108.4.
- **Moving holds:** `idleSway` on tip and head, `breathe` on sq, scarf, cape, tails, ears, washing and lantern flicker in every pause; `groundShadow {flat: true}` under everyone.

## 4. Camera and composition
Camera on ones. The ground stays in the lower part of the picture in every framing.
- **Wides for places:** the glade (zoom 1.0), the market pan, the street establishing tilt (16.9), both night entrances, the dusk time-lapse.
- **Pans across the detailed street:** Morgiana's walk (35.5-41), her eyeline to the clean doors (45.9-47.4), the marking run with a whip (59.6-63.9), the reveal pan with counter (70.2-73.8), the second-night pan (113.7-115.1), her sweeping arm (129.6-130.6), the caravan (138.2-141.4).
- **Two-shots:** leader and spy (75.2-84.2, zoom 1.4), Morgiana and Ali Baba (128.3-134.6, zoom 1.35).
- **Close-ups only at peaks:** chalk hand 23.2-24.9, Morgiana's eyes 41.5-42.4, the mark 42.5-43.2, the brush and dot 96.5-97.2, the leader's eyes 120.7-121.6, the ringed fist 141.5-142.3.
- **Impact frame:** once, 78.94.
- **Vertical staging:** the window (y 430..550) above the door gives a second level: Morgiana above the spy (100.2), above the thieves (85.2, 127.9), above the merchant (143.0).
Faces and key action stay between world y 250 and y 900; balloons above the speaker, never over a face, a mark or the window.

## 5. Storytelling opportunities
- **Rule of three:** the showman bow at a marked door happens at 69.3 (spy 1), 113.2 (spy 2), and the third volunteer with blue paint is stopped before he starts (126.4).
- **The audience is always ahead of the thieves and level with Morgiana:** we see every mark made; the counters pay it off.
- **Clue logic:** robe, sash and donkey identify the house by day and are taken in at dusk, so at night only the marks remain.
- **Humour:** asking the cat; the reward daydream; hushing the leader; eeny meeny; the practice dot on spy 1's turban, still there next night; the neighbour joining the plot.
- **Suspense:** the brush past in the arch; the turquoise glint in the shutter; the shadow before the man; the lid that lifts.
- **Series seeds:** courtyard gate, neighbour, oil jars and the ring are all introduced here for episodes 4 to 6.
- **Colour as story:** green morning, busy bright market, warm day street, teal and amber moonlit night, a second night with a lower moon, apricot evening. Vermilion (Ali Baba) and turquoise (Morgiana) are the two brightest notes and meet in the last shot: his sash in the doorway, her scarf in the window.

## 6. Asset requirements
**Reused unchanged:** `abAli`, `abLeader`, `abMan(i)`, `abDonkey`, `abHorse`, `abGladePlate`, `abRock`, `abHandCel`, `abFace`, `abSay`, `abPurse`, `abBundle`, `abDust`, `abGlow`, `abGlint`, `abBands`, `abSpeed`, `abDress`, `abFlock`, `abSun`, `coinEyes`; ALI-02 `farTown`, `tiptoeFreeze`; Library `person` presets and `PERSON_HANDS`, `marketStreet`, `townDoor`, `townWindow`, `cat`, `donkey`, `thoughtCloud`, motion helpers.

**New (7 entries, 4 major; all reusable in episodes 4 to 6; sizes and build notes in `new_assets`):**
1. `morgiana` (character, M) with `windowBust` and a close-up face entry.
2. `townStreet` in three colour models (set, L).
3. `doorMark` with chalk and paint pot (prop, S).
4. `oilJar`, `jarPannier` and the `silverRing` hand insert (prop, M).
5. `spyDisguise` and `oilMerchant` palette variants (character, S).
6. `sneakChain` (motion, S).
7. `dayToNight` time-lapse (effect, S).

## 7. Implementation notes for Opus
- Frame order: `S.background`, `S.box` panel, plate (with cross-fade), live set parts, cels, light, lettering, transition, `subtitle`, `S.finish` last.
- `tc = celStep(t, THEME.celFps)` for every pose: `flow(tc, KEYS)`, `idleSway`, `walk(xf, tc)` with `footfalls`, `lagged` for scarf, cape, cloak, pot and jars. Camera, cross-fades, glows, glints and counters use `t`.
- Marks are data (`MARKS` list with door, kind and start time, in the JSON notes); every street shot draws all marks whose time has passed.
- Washing line and donkey are present in day street scenes and absent at night.
- `abSay` balloons size 52 (58 for WHICH DOOR?!), removed 0.4 s after the last cue. `S.emphasis` at 78.94 only. `S.transition {rect, caption: 'NEXT DAY...'}` 85.9-86.7, plate swap at 86.3. Titles at 0.3 (with `title_ar` in Lalezar) and 143.4.
- Night: light painted plate, no tint or multiply over cels, thin cool rim `castFinish {rim: '#bfe0ff'}` or warm near lanterns, sleeves lighter than robes.
- Sound (10, master 0.6): whoosh 6.7, blip 16.95, chime 35.4, pop 55.9, stamp 75.0, blip 93.2, pop 100.75, whoosh 111.2, thud 128.2, chime 143.6; tape bed. None at 86.3.
- Subtitles from `timing.json` unchanged.
- Contact sheets (every 4th frame): 21.0-23.2, 41.2-42.5, 59.6-64.0, 64.4-66.5, 66.5-68.7, 70.2-73.8, 84.4-85.8, 106.2-110.8, 137.6-141.4; then the frozen-hold scan.

## 8. Warnings and open questions
- One street for 110 seconds: time of day, end of the street and framing must make each scene a new picture.
- The marks are small; glow, rings, inserts and counters must make them read on a phone.
- Six figures in single file at night with live doors and lanterns: bake per model, skip off-screen parts.
- Library `marketStreet` is untested in the cel theme; dress it with a painted sky and `abDress`.
- `gladeMorning` and `farTown` depend on ALI-02; fall back to ALI-01's afternoon model.
- The English and Arabic scripts match; no SCRIPT question.
- Owner questions (9, in the JSON): TO BE CONTINUED..., the staged clue, the shape of the marks and the henna, invented balloon lines, Morgiana's design, the merchant as a hint only, the ring, lid and window additions, the comic additions, the time-lapses.
