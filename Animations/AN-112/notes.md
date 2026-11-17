# AN-112 Abu Hassan al-Ziyadi and the Khorasan Man: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (57ed422f...) and its `.mp3.words.json` (505f5efa...) match `Audio Files/Final Done/` and the shas inside `planning/inputs/timeline.json`.
- Film length 174.9 s = narration 171.904 + end hold 3.0 (plan). THE END at 171.9 with a chime.
- Subtitles: the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt, 4 per paragraph), aligned by align.py with the final `.words.json` as whisper.json (251/252 words matched, text rebuilt verbatim). No dashes in either script.
- Sources: `src/a112_base.js` (helpers, person rig body-local/world, story headwear, props: purse, coin, scroll, bundle, basket, loaf, moth, judge's turban on a cushion, spear, story box, signpost, wipe, home furniture), `src/a112_home.js` (S2-S9, S16-S17 and the single purse state function), `src/a112_street.js` (S1, S10-S11, soldier preset), `src/a112_court.js` (S12-S15, S18, the dream, S19), `src/a112_main.js` (dispatch, camera, lettering, transitions, sound).

Decisions the plan left open or the measured sets changed:
- Street (S1): the default marketStreet houses put the only house door behind the seed stall, so the story passes its own two house fronts (`houses`), giving Abu's door at x 352..448; Abu stands at x 400.
- Home: palaceHall merchant variant with `desk: false, shelves: [], lamps: [], curtain` off (the desk coin stacks cannot be switched off), so the poor room is the ochre wall, the door (60..200), the window (510..610) and the story's own desk (390..600, top 792), bare shelf, peg (752, 640, lowered from the plan's 560 so Abu can reach it), patched mat (700..950) and desk lamp.
- Abu's crooked turban, the turban hop (60.84), the slip (70.14) and the judge's turban are drawn by the story on the head point of the rig (`a112Hat`, Abu with `pal.head: 'none'`); while lying (S6, S9) and riding (S10-S11) he wears the Library smallTurban.
- The visitor leans his staff on the wall by the door while he needs both hands (20.0-44.3 and 61.9-78.1).
- Shopkeepers in S5 lean in through the open door (drawn behind the wall, seen through the doorway); the wife and child enter from the right.
- The dawn street is a 2000-wide strip (palace door at about x 1750) so the walk to the palace fits 94.64-96.3; the fork is two dark lane mouths at x 480 and 1010 with the mule stopping at 740 between them; guard 1 comes out of the right lane, guard 2 out of the left lane behind the mule.
- Soldier preset: villager costume with a knee tunic (red or blue), yellow sash, navy trousers, plus the story's helmet with neck cloth, chest plate and spear.
- Abu keeps his turban on at court in S12 (hands clasped) instead of holding it.
- S13 dream frame: a thoughtCloud drawn in panel space grows from the Caliph's head to 1060 x 1300 (edge inside the panel, court visible in the corners) and shrinks back at 112.6. The Caliph walks from the throne to the dais edge (640) while the dream covers the hall.
- S15: purses land on the floor in front of the carpet at x 300, 450, 620; labels sit under them (below every face).
- S18: Caliph steps to the dais edge (680) after the claps; the servant brings the cushion between him and Abu, steps back left, and returns with the salary purse and sealed scroll at 164.4.
- S19: judge on a bench on a centred dais [300, 700, 860]; the row of listeners rises into the bottom of the frame as the camera pulls out (168.4).
- Sound: 12 short quiet effects (pops, clicks for knocks, thuds, two chimes), the four true pauses used where possible (4.83, 69.0, 89.57, 152.78); the rest on word boundaries as the plan lists them. No bed.
- Owner questions: all plan defaults (historical figures as friendly comic figures, neutral Mecca/Medina signpost and palm town, father fades from a cloud, HELP ABU HASSAN! balloon three nights, the comic business kept, wife and child kept, total counter 50,000).
