# AN-124 Al-Mutalammis and His Wife Umaymah: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (5157e43c...) and its `.mp3.words.json` (6f4b4ec2...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 176.1 s = narration 171.61 + end hold 4.49 (plan duration + end_hold). THE END at 171.5, after the last word (171.34).
- Subtitles: the plan's `subtitles` chunks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (239/242 words matched, the rest interpolated). No dashes in either script.
- Sound: pop 46.63 (inside the measured silence 46.49-47.06), chime 171.75, thud 172.6. The plan's chime at 121.32 is DROPPED: silencedetect shows speech there (the only gap is 121.87-122.41), and the plan says drop rather than move.
- Measured onset: his answer (فأجابها) really starts at 122.41 (Whisper lists 121.8), so his blue verse ribbon starts at 122.41.
- Source: `src/mt_rig.js` (time, body-local/world, walk, drum grid), `src/mt_props.js` (desertCamp set, tallyMarks, scroll, flower, cushion, necklace, dust devil, X, verseRibbon, iconBalloon, portraitMedallion, musicNotes, faceCover), `src/mt_cast.js` (one pose function per character), `src/mt_main.js` (road S1, camp draw order, effects, camera, lettering, sound).

Decisions the plan left open or the measured set changed:
- Camp layout (measured): the plan's drummers 330/430, guests 1150/1240, fire 1220 and children 1160/1210 overlapped each other and the tent. Used drummers 400/475, guests 1080/1160 (guestA shuffles to 1050 at 90.2), fire 1235, children 1300 (girl) / 1355 (boy), the poet kneels at 1420 in S8, stands between the guests at 1120 (S9-S11) and steps to 1095 (S12); dune lip x 1500..1600 (crest 1560, 848); camel kneels at 1470 (moved off screen to 1390 at 140 s so its head shows in the final wide).
- Tent poles are drawn behind the cast (not in the front pass), so no pole cuts a face; only the dune lip is a front piece.
- Cushions are 48 high (top y 852) and seated people use `y 900, sit 1, seat 'bench'` (feet on the carpet) instead of the plan's `y 870` (feet would float). The groom's cushion moves 740 -> 775 when he shuffles closer (101.7); after the cut at 150.32 the poet's cushion is at 760 and he sits at 740, she at 875.
- Camera: zoom never below 1.0 (world height 1230); wides use 1.15-1.2 and close shots are 45 units lower than the plan's y to cut empty floor. S1 road is framed at zoom 1.2 (the plan's 1.0 left the figures tiny) and holds on the gate until 3.0 so the king reads.
- Sky colours: u values nudged so no shot sits in a grey dawn/day cross-fade: S3 u 0.27, S4 u 0.06 -> 0.12 (yellow sunrise; the father points to the sunrise side, left).
- Children appear at 73.3 (the cut into S8) so the poet's arrival in S7 is not crowded.
- S4: Umaymah's hand on the tally marks at 42.6 skipped (the father stands between her and the post); the stick taps carry the beat.
- S1 rider's keffiyeh tail lag and the fading footprints are reduced to a few marks on the dune; the YEAR counter reads YEAR 1..3 with the sky wheel.
- The S8 picture strip: Umaymah, then his portrait with the X; on 83.14 his portrait drops away and the groom's slides in with a ring between them.
- faceCover is drawn by the story over the Library person (cloth from below the eyes to the chin, eyes always clear); full cover 89.4-117.8, 0.85 after the finger's-width loosening, off 131.54-131.84.

## v2 (Fable round 1) decisions
- Camp layout v2: guests 1120/1188, fire 1245, children 1300 (girl) / 1368 (boy), poet kneels at 1450 in S8, stands at 1010 (S9-S12, feet y 918, drawn after the crowd), 980 from 119.98, 990 in S13-S14.
- S14 handover happens left of Umaymah (poet crosses in front of her), so from 146 the poet is on her left; S15 starts with him at 800 (was 950).
- Night dim: desertRoad gets night 0 and the story draws `mtDimGrad` (soft-topped) instead, removing the hard band at y 420.
- Moon at (1290, 200) until 150.32, then (610, 210). Camel at 1425 after 150.32.
- YEAR counter 1..7 but only two day/night sky turns (more would flash at 3-4 Hz).
