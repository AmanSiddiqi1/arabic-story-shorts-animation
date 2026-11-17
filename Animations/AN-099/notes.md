# AN-099 Caliph al-Maamun and the Strange Scholar: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (70b54b4f...) and its `.mp3.words.json` (6d791c14...) match `Audio Files/Final Done/` and the shas inside `planning/inputs/timeline.json`.
- Film length 172.47 s = narration 169.475 + end hold 3.0 (plan). THE END at 169.8, chime 170.2.
- Subtitles: the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt, 4 per paragraph), aligned by align.py with the final `.words.json` as whisper.json (225/225 words matched). No dashes in either script.
- Sound: exactly the plan's seven cues (chime 3.8, thud 22.0, pop 43.1, chime 84.95, pop 126.8, chime 147.6, chime 170.2). No bed (the plan asks for nothing else).
- Owner questions: all plan defaults (wine shown, mild tipsy self only inside the cloud, wordless picture questions, cushion hand-over and bows kept, the 14 lettering words, three scholars, dark-bearded caliph who comes down to the floor for the meal).
- Source files: `src/a99_props.js` (props, icons, answerBalloon), `src/a99_rig.js` (body-local/world conversion for the Library person, arm tracks in angle space, held objects), `src/a99_cast.js` (one pose function per character), `src/a99_main.js` (hall, draw order, balloons and clouds, camera, lettering, sound).

Decisions the plan left open or the measured set changed:
- Every sit, walk and hand target is in the person rig: arms are animated as angle tracks (IK targets converted with `armTo`), so held things (book, bread, jug, goblet, cushion, trays, chest) are drawn at the real hand position.
- Floor line: the hall's back wall meets the floor at y 900, so everyone stands or sits at y >= 882 on cushions whose base is at y 905 (seat A and B on the bare floor at y 905, seat C on the handed-over cushion at (598, 930), seat D on the dais cushion at (705, 832)).
- Caliph `dir -1` (his right hand is on the hall side). The seated arm (59 units at s 0.8) cannot reach the floor, so the meal uses a brass tray on a stand (sini on a kursi, top y 852) between the stranger and the caliph; the bread, the goblet tray and the cup sit on it. Meal places: stranger 500 and caliph 600 (100 apart instead of 120, so the shoulder clasp at 150.66 reaches).
- The caliph cannot reach the honour cushion from the throne, so his two pats (92.3, 92.9) are patting motions toward it with a lean; the shoulder touch at 95.24 is a lean toward the stranger instead.
- The refusal uses the stranger's right hand (the hand toward the cup): hand on chest 117.94, then the same hand rises palm toward the cup at 120.06.
- In S16 the caliph stands at his floor cushion (he came down from the dais for the meal) and waves.
- The stranger leaves along the front of the cloth (y 968) and the servant follows him with the chest 0.55 s behind; both exit through the door (the doorway brightens from 165).
- Proud's spare cushion appears in his hands at 82.68 and slides under the stranger as he hops onto it (83.8).
- Servant staging: sets the bread tray on the stand and leaves (97.2-101.8); comes back for the trays (104.2-106.85; the cloth trays slide off left); returns with the goblet tray, offers it to the proud and young scholars (108.72, 108.9), sets it on the stand (109.65) and leaves; brings the chest at 155.25.
- The S10 inset (104.12-105.32) shows the door and the empty floor of seat A at zoom 1.3 in a circle top left.
- Two-shots are framed lower than the plan (y 790-805 instead of 730) so the faces and the cup sit in the middle of the panel; the S13 icons are placed in the top band of that framing.
- Lamps are drawn by the story (palaceHall `lamps: []`) so they can sway when the wide balloon passes (89.9, 90.4).

## v2 (Fable round-1 revision, 2026-11-18)
- Meal places widened so the offered cup has clear space on both sides: stranger 455 (was 500), caliph 615 (was 600); tray stand moved to the caliph's side (592, 868); cup on the stand at (566, 866), set aside to (668, 946). The seated arms (reach 53/59) only meet near x 530-550, so the cup is held at the caliph's reach limit (about x 545, base y 868, bowl at the stranger's chest height) rather than exactly on the centre line.
- The shoulder clasp at 150.66 is now a hand clasp between the two (the shoulders are out of reach at the wider spacing).
- Two-shot framing: zoom 2.8-3.2 (camera y 796-812) instead of 2.1-2.7 at y 795; the S13 icon row sits at world y 640, x 424-574, above the stranger and left of the caliph's crown.
- The refusal: right hand to chest with a small bow (117.94), left hand takes the chest (119.5), right hand rises as an upright open palm (`a99Palm`) about 40 units short of the cup (120.06-122.3); the caliph withdraws the cup 40 units at 122.0 before his brows go up at 122.35.
- S14 cloud: drawn in its own local coordinates (scale 1): a bust of the stranger drinking, the lamp going dark with a puff, the line knotting; then (142.04) a strip of the hall with door, four seats, throne and his small figure sliding from the honour seat to the door under a dashed arrow pointing left.
- Ending: medium tracking shot as he rises and bows (159.4-162.1), scholars bow with stagger (proud tip 0.36, longest), they sit back down at 163.5-163.9; wide for the walk (162.9-165.2); push to the doorway (zoom 2.0) for the turn, temple tap, lamp and bow; he walks out through the arch (drawn behind the wall, shrinking slightly into the light, no alpha); cut at 169.6 to the last image: the hall with the bright empty doorway and the untouched cup large in the right foreground (panel overlay), one glint at 170.2, THE END on top.
- Servant at the end: he sets the chest down at x 560 to the stranger's right and stays kneeling, bowing, out of the doorway shots; he and the chest are not in the last image (the cut implies the gift went with the guest).
- The S10 inset (empty spot by the door) is removed; the stranger's glance toward the door at 104.12 stays.
