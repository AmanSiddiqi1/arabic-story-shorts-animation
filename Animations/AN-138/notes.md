# AN-138 Yahya bin Khalid and the Poor Man: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (a4d37a7f...) and its `.mp3.words.json` (24238f3e...) match `Audio Files/Final Done/`. `whisper.json` is a copy of the final words.json; `align.py` built `timing.json` from the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt), verbatim.
- Film length 175.77 s = plan duration 172.269 + end hold 3.5 (under 180). THE END at 172.3.
- Owner questions: all plan defaults taken (horse, imagined angry Yahya, family diagram, dozing servant and door drifting open, aged-guest vision, LATER card over speech, condensed English kept verbatim).
- Source files: src/yp_props.js (helpers, person frame, props, icons, effects), yp_sets.js (street/room/hall sets, window clock `ypU`, cast builders, `ypSneak` gait), yp_street.js (S1-S4, S13, S17), yp_room.js (S5, S8-S12, S14a), yp_hall.js (S6-S7, S14b-S16), yp_main.js (scene table, camera, overlays, clouds, card, sound).

Decisions the plan left open or that the measured sets changed:
- Lettering diet (validation warning, 31 items): cut HOME, CALIPH'S PALACE (the dome still glints), GOOD FOOD, THE BIG SACK, POOF!, CLINK!, SALAM!, SHHH (the gestures carry them). About 20 items remain. The 30,000 emphasis word is RICH!.
- Guest room layout (plan positions approximate): diwan 600..880 (seat 836), low table 330..450, heap and later the sack at x 520 (in front of the diwan's left end, so the treasurer in the doorway and the guest can hand purses across). In S8 the food tray stands on the diwan beside him (the table was out of arm's reach).
- Room framing tightened from zoom 1.0 to 1.25-1.4 (at 1.0 the floor filled half the panel and the figures were small). The S5/S14 framing stays the same so the empty couch reads.
- Horse leaves empty (dir -1, led by servant A) from 12.5 while the camera is close on the guest; the rider is never seen dismounting.
- The S7 picture equation is a white diagram card (two trays, equals sign, lady + child under FAMILY, the guest under GUEST) over the left half of the hall, 53.98-56.5.
- Clouds (S11 fear, S15 warm, S16 vision) are drawn in panel space and moved/resized so they never cover a face: S11 760x450 at (490, 300) scale 0.72; S15 500x330 at (320, 300) scale 0.7; S16 780x390 at (440, 260) scale 0.8 with the hall camera at zoom 1.15 so the servants and Yahya stay below it.
- S13 night: marketStreet 'cold' + a navy night wash with a warm pool at the door; the padlock thought sits above-right of him so it stays in frame.
- The 1000 counter, coin stacks and EVERY DAY sit in panel space between the two heads; the ledger with the UNTIL box is held beside the treasurer's face (not in front of it).
- Sound: the plan's five effects (thud 7.72, chime 15.86, pop 22.4, pop 41.95, chime 172.6) plus the template bed.
- Skipped / simplified: toe curl and foot lift on the caught coin (no foot field: the coin lands on his near foot while he holds mid-step); turban/keys accessory lag only on the keys (swing); per-eye brows. The S14 opening is the full room (not an inset panel).

## v2 (revision 1, Fable round 1), decisions
- S13: servant at x 470 (YP_ZX), the house interior stays dark until 123.58 so the peeking eyes and the gap read; the sack is drawn snagged on the right jamb while he is in the gap.
- Fear cloud geometry in YP_FC (panel 500,330, 950x580, content scale 1.0 at [600,720]); coin column x 765..855 world, red line y 650.
- Vision push: camera (584,445,2.2) 154.5-160.4; cloud lerps to (480,425,920,760) scale 1.28.
- S8 time: ypS8U replaces ypDays; DAY label = ypDayIdx, WEEK label = ypWeekIdx.
- Ledger beat in S7 opens at 57.2 (panel held to 57.38).
