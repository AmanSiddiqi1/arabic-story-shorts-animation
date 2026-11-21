# SIND-01 The Island That Moved: creative plan (80s Cel Anime)

Style `cel-anime-80s`, staged to the owner direction in `Library/styles/cel-anime-80s/look.md` (reference film: ALI-01-ANIME v4). Narration 145.83 s, last word 145.30 s, end hold 4.0 s, film 149.83 s. 18 scenes, 178 actions, 18 lettering items, 8 sound effects. All times are seconds on the final MP3; every cue is a word start from `inputs/timeline.md`. The full storyboard is in `creative_plan.json`; this file gives the direction. This episode sets the look for SIND-02 and SIND-06 (see the Series bible).

## 1. Narrative breakdown
- **Setup (0-15.1):** Sinbad on the Baghdad quay, in love with the sea and blind to it: a whale-sized shadow passes under him while he watches gulls. He seals three chests with a tangerine band and a star (the object that later proves who he is), hugs his family and sails.
- **Calm (15.1-31.7):** three days in three repainted skies, a sunny morning, LAND!, skiffs to a green island. The captain stays aboard; through his spyglass the shore has barnacles and breathes.
- **Suspense and turn (31.7-52.2):** a happy camp and a cooking fire. On "suddenly" (39.22) everything stops and, under the water, a giant eye opens. The ground jolts (41.60), the water climbs the shore.
- **Reveal (52.2-60.8):** the captain's shout; the camera sinks below the waterline and an impact frame on "whale" (58.92) shows the island is the cap of an enormous, grumpy, half-awake whale.
- **Climax (60.8-80.5):** the run to the boats, the fire hissing out, the palms going under like masts. Sinbad jumps (69.88), swims, and his hand closes on water a hand's width from the oar (74.02). The low point: a wave over his head. Then a plank.
- **Alone (80.5-95.7):** the grip close-up, the ship hidden by two swells and gone, a warm moonlit night, the wind dropping, sunrise.
- **Rescue and luck (95.7-129.4):** a real shore (he knocks on it to check), the king's grooms and horses, the amazed king, DAYS LATER, the same striped sail entering the harbour, the captain, his own three chests.
- **Home (129.4-149.8):** goods returned, the king's gift, Baghdad, the embrace, the story told to his family. He looks back at the water, older by one voyage, and far out a small green hump lifts its tail. THE END.
- **Moral:** the sea hides wonders (spoken at 141.94-145.30); the picture adds: and dangers the young do not see.

## 2. Scene-by-scene storyboard
| Scene | Time | Place and light | On screen | Key cues |
|---|---|---|---|---|
| S1 | 0-5.84 | Baghdad quay, morning | Crane down, chrome title, Sinbad on a crate, the shadow under the gangplank | title 0.3; arms open 1.96; shadow 4.22 |
| S2 | 5.84-15.06 | quay | Three chests and the star seal, family goodbye, gangplank, sail drops | seal 7.28; hug 9.22; boards 11.56 |
| S3 | 15.06-24.9 | open sea, 3 skies, sunrise | Tracking ship, DAY counter, flying fish, lookout LAND!, pan to the island | days 16.56; LAND! 22.54; island 23.34 |
| S4 | 24.9-31.72 | sea | Skiffs to the island; captain and spyglass inset; bubbles | row 24.9; captain 28.46; inset 30.04 |
| S5 | 31.72-41.2 | whale island, noon | Camp, coconut, fire, pot; sudden stillness; the eye opens under water | fire 37.18; stop 39.22; eye 40.2 |
| S6 | 41.2-52.21 | island wide | RUMBLE!, breathing ground, water climbing both shores, spout | jolt 41.60; water 45.70; spout 51.2 |
| S7 | 52.21-60.82 | ship, then cross-section | Captain's three balloons, camera sinks, impact frame, whole whale | COME BACK! 54.58; whale 58.92 |
| S8 | 60.82-69.88 | island sinking | Run to the boats, HISS!, palms go under, tail, Sinbad alone | run 60.82; fire out 63.86; sink 66.56 |
| S9 | 69.88-80.48 | swell | Leap, SPLASH!, swim, the missed oar, under, the plank arrives | jump 69.88; miss 74.02; plank 77.14 |
| S10 | 80.48-89.17 | swell, gold afternoon | Clings, grip close-up, ship shrinking, two swells, empty horizon | grip 82.06; ship 84.66; gone 87.58 |
| S11 | 89.17-95.66 | warm moonlit night to morning | On the plank, wind drops, turtle cameo, sunrise, gull | calm 92.74; dawn 93.98 |
| S12 | 95.66-101.2 | real shore, morning | Surfed onto sand, knock knock, REAL LAND, asleep, horses on the meadow | shore 97.68; real 98.34; sleep 99.2 |
| S13 | 101.2-109.08 | shore | Grooms and three horses, THE KING'S HORSES, water, food, a stolen date | found 102.08; water 106.64 |
| S14 | 109.08-114.82 | palace hall | Welcome, story balloon, the crown hops | welcome 109.08; amazed 113.92 |
| S15 | 114.82-120.5 | island harbour | DAYS LATER..., the striped sail arrives and moors | later 114.82; ship 116.7 |
| S16 | 120.5-129.43 | harbour | Double take, eye close-up, THE CAPTAIN!, HIS CHESTS, memory flash, SINBAD?! ALIVE?! | eyes 121.52; chests 125.22 |
| S17 | 129.43-136.8 | harbour, then sea | Hug, chests down, king's gift, departure, Baghdad on the horizon | goods 131.22; king 134.12 |
| S18 | 136.8-149.83 | Baghdad quay, gold afternoon | Embrace, story balloon, the look back, the far whale, THE END | hug 138.56; whale 144.02; end 145.6 |

Transitions are cuts on phrase boundaries, one plate dissolve (night to morning, 93.98) and the single tape transition (114.82, `later`, caption DAYS LATER...).

## 3. Character acting
Every character channel is sampled on twos (`celStep(t, 12)`); blinks and lip flaps on threes (`celStep(t, 8)`). Nobody is ever frozen: `idleSway`, `breathe`, ribbons, per-member seeds.
- **Sinbad:** light, quick, open. Leads with the chest and the arms (the open-armed breath at 1.96 is his signature and returns as the storyteller's arms at 112.06 and 139.12). His turban tail and sash end are ribbons that always arrive late (`lagged`). Eyes first, then head, then body (`gazePlan`, a blink on every head turn). In the water he is tired in steps: stroke period 0.8, 1.0, 1.3 s. The last look at the sea (141.94) is the same pose as S1 with `lid` 0.25 and a smaller smile: he has changed.
- **The captain:** weight and economy. Elbow leads, spyglass arrives last (`settleTo`); breath in before the shout (`anticipate`); beard and turban tail lag. Comic payoff: the spyglass raised at Sinbad from one pace away (127.96).
- **The three merchants:** distinct. Fat (emerald): comfort and food, pot on his head in the run. Plum: nervous, points, loses his turban. Rust: practical, lights the fire. Always `stagger(i)`, three idle loops of different periods.
- **The whale:** a sleeper disturbed, not a monster. Only the eye acts: lid opening over 5 drawings (40.2), slow blink, pupil rolling up toward the fire, brow down (60.08). At the end the tail lifts once like a hand.
- **Family:** mother close and quiet (wet eyes, small wave), father slow and formal (palm to the sky, hand on the turban), sister all movement (skips, tugs the sash, jumps into his arms, the only one who claps at the whale).
- **King and court:** the king round and generous (crown hop at 113.92 with a lagged settle); vizier doubtful a beat later; guards never in time.
- **Grooms and horses:** horses react ears first (`earL`, `earR` before `headDown`); the white horse is curious and steals a date; three coats, three rhythms.

## 4. Camera and composition
Owner direction first: wide where the place matters, pans across detailed sets, the lower picture never empty, close-ups only at peaks.
- **Wides at zoom 1.0-1.15** for the quay (S1, S2, S18), the sailing (S3), the island (S5, S6, S8), the sea (S9-S11), the shore, the hall, the harbour. Water, quay paving or beach always fills the lower panel.
- **Pans as storytelling:** along the lookout's arm to the island (23.34); round the island's rim as the water closes (47.24); along the deck to the chests (124.56); from Sinbad's eyes to the wide sea (143.32).
- **The crane below the waterline** (57.68-59.9): one group transform slides the world up and scales it to 0.55 so the whole whale fits. The film's single big camera idea.
- **Three close-ups only:** the whale's eye (40.2, 1.0 s), the grip on the plank (82.06, 1.6 s), the sail in Sinbad's irises (121.52, 0.8 s).
- **Impact frames:** RUMBLE! (41.60) and the reveal (58.92).
- **Echo framings:** S18 repeats S2's framing in gold light; the captain at 122.34 repeats his S4 pose and screen position.
- Faces and key action stay between world y 250 and y 900; balloons sit in the sky band and point at the speaker.

## 5. Storytelling opportunities
- **Dramatic irony:** the shadow under the quay (4.22); the captain's inset (30.04); the eye (40.2). The audience knows before Sinbad does.
- **Suspense by stillness:** at 39.22 bodies hold and only pupils move, in staggered saccades.
- **Surprise:** the island is drawn as a truly pleasant place first, so the cross-section is a real reveal.
- **Humour:** the coconut; the pot helmet; the grumpy whale eye; knocking on the real shore; the horse and the date; the crown; the point-blank spyglass.
- **Emotion:** the hand that misses the oar; the arm that comes down after the second swell; the mother's tear at the return.
- **Setup and payoff:** star seal and tangerine band (7.28 to 125.22, with a one second tape memory at 126.72); the open-armed pose; the whale shadow in the first shot and the whale's wave in the last.
- **Colour as story:** fresh morning, three skies for three days, bright noon, gold loneliness, a warm lilac night, a clean morning, gold homecoming. Plates change; the cast never takes a tint.

## 6. Series bible (SIND-01, SIND-02, SIND-06)
- **Sinbad:** Library `person`, costume `villager` with `pal` overrides, age 0, s 0.95, no beard. **Accent: tangerine `#ff7a1a`** (shade `#c8520e`) on the turban and sash, in every light, never tinted; nothing else in the series uses tangerine except his own seal and his sister's ribbon. Warm white knee tunic `#f7f0e0` (shade `#cfc4b0`) with short sleeves (bare forearms read), plum trousers `#7b4bb0`, brown shoes (bare feet after a wreck). The turban has a 60 unit tail ribbon; SIND-02 unwinds this turban to tie it to the roc's leg, so it must stay a clear separate piece.
- **His mark:** a white five-point star on a tangerine band, on chests, sacks and rafts.
- **Captain:** `merchant` preset, s 1.08, age 0.6, sea blue robe `#1f5f8a`, lighter sleeves `#4a90c0`, gold sash, big white turban with a red jewel, brass spyglass. SIND-06's captain is the same man.
- **Sailors:** `servant` preset, bare feet, tunics teal `#2aa39a`, mustard `#e0a82a`, rose `#d85a7a`, leaf `#5aa84a`, sky `#5a9ae0`, contrasting caps. **Merchants/traders:** `merchant` and `villager` presets in emerald, plum and rust.
- **The ship (`dhow`):** teak hull `#a8643a` with a turquoise band `#2ab0b0` and a cream strake, 520 x 120, mast 440, cream lateen sail with two crimson `#d0285a` stripes, cobalt pennant, a skiff in the same colours.
- **Sea grammar (`openSea`):** horizon at world y 600 in every wide; four flat water layers from far turquoise `#7fd6d8` to near cobalt `#1f5fc0`, each with a hard lighter crest strip and white foam dashes stepping on threes; one wave function `seaY` for everything that floats; the front layer drawn over hulls and swimmers. Moods glass, calm, swell, storm.
- **Sky grammar:** soft painted gradients, and tall white cumulus with flat lit tops and lilac undersides standing on the horizon in every day sky (the series signature). Night is lilac blue with a big cream moon, a peach glow at the horizon and a moon path; never monochrome. Gulls mean land.
- **Kings:** `caliph` preset recoloured per land (here emerald and violet). **Home:** the Baghdad quay (`harbourQuay` 'baghdad') opens and closes voyages, morning out and gold afternoon back.
- **Speech:** short English balloons; tags in plain label boxes; THE END in chrome.

## 7. Asset requirements
Reused from the Library: `person` presets (villager, merchant, servant, caliph, vizier, villageWoman, physician, maiden child) with `pal`; `horse` (three coats); `bird` (dove as gull); `turtle` (cameo); `palaceHall`; `palmTree`, `marketStall`, `townProp`; `thoughtCloud` (story balloon); `PERSON_HANDS`; `steam`, `drops`, `ripple`, `soundArcs`, `zzz`, `teardrops`; all motion helpers.

Planned names reused: `dhow`, `openSea`, `islandShore`, `harbourQuay`, chest (treasureHoard), `giftChest`, `cookPot`, `smallBowl`, `waterskin`, `foodTray`, `moonReflection`.

New (all reusable; sizes and build notes in the JSON):
1. **whale** (character, L): 1500 x 520, fields rise, tilt, breathe, lid, gaze, brow, tail, spout, dress (island), silhouette.
2. **dhow + skiff** (prop, M).
3. **openSea** sea kit (set, L): plates, four layers, `seaY`, `seaClip`, `swell`, `splash`, shore foam, the underSea cross-section.
4. **harbourQuay** (set, M): one geometry, plates 'baghdad' and 'island'.
5. **islandShore** (set, M).
6. **swim and cling** (pose, S): no new drawing, the person clipped at the wave line.
7. Small props (M together): chest with band and seal, campfire with cookPot, plank, spyglass, waterskin, foodTray.

## 8. Implementation notes for Opus
- Frame with `THEME.page` / `THEME.panel`; per frame: sky plate, far sea, cels, front sea, light, lettering, `S.finish` last.
- `tc = celStep(t, THEME.celFps)` for all pose channels (`flow(tc, KEYS)`, `idleSway(tc, ...)`, `walk(xf, tc)`); camera, layer slides, light bands and glows on `t`; foam, fire and splash on threes.
- No tint over the cast. Time of day = repainted plate, plus at most a rim (`castFinish(..., { rim, light })`).
- Sinbad's palette constant and the fallback if a `pal` override does not take are in `implementation_notes`.
- Vessels carry their passengers inside one transform (pitch, bob); gangplank walks use `walk` + `footfalls` bending the plank.
- Reveal group transform, whale rise schedule, balloon texts and times, the silent transition and the 8 effect times are listed in `implementation_notes`.
- Subtitles: keep the story's `chunks_ar.txt`, `chunks_en.txt` and `timing.json` as they are.
- Check the alive list on contact sheets of the six stretches named in the JSON.

## 9. Warnings and open questions
- The sea kit is the main risk: build and review it on stills before acting.
- The whale's face in the 0.55 wide is small: draw the eye 1.6x oversize there.
- Swimming with a front-facing figure must be checked early; the tangerine turban is the anchor in the water.
- Seven short pauses only: effects under 0.5 s; the transition is silent.
- Five set or prop modules are new (above the usual four) because the series shares them.
- Scripts match; no SCRIPT question. Owner questions: 8, in the JSON (ending card, title line, the two whale foreshadowings, the family members, the fire as the cause, balloon wording, comic additions, the series look).
