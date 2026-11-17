# AN-113 The Poor Man and His Friend in Need: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (f056f017...) and its `.mp3.words.json` (9847d315...) match `Audio Files/Final Done/` and the shas inside `planning/inputs/timeline.json`.
- Film length 179.886 s = narration 176.386 + end hold 3.5 (plan). THE END at 176.5, end chime 176.4.
- Subtitles: the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (233/235 words matched; the two interpolated words are the ones the plan names). No dashes in either script.
- Sound: the plan's nine cues, all inside measured silences (46.4, 52.5, 58.4, 64.3, 108.3, 109.1, 131.5, 134.5, 176.4). There is no 'snap' voice in sound.js, so the seal snap is a click plus a high pop.
- Source files: `src/a113_base.js` (constants, rig, props, jewel stall, sets), `a113_s1.js` (S1-S4), `a113_s2.js` (market S4-S11), `a113_s3.js` (S12-S17 and the thought cloud), `a113_main.js` (camera, balloons, lettering, sound).
- Owner questions: all plan defaults kept.

Decisions the plan left open or the measured set changed:
- S1: the man stands at x 690 (between the desk and the alcove), not 520, so the desk and its coins stay visible; the wife stops at 840. The goods vanish by fading the full-room drawing out of three clip regions (shelves 2.18, desk 2.58, alcove 3.32) with dust puffs; pale patches stay where the shelves hung (also in S14-S17).
- S2: man 470 and wife 585 (closer than the plan's 440/640) so her hand reaches his sleeve and his purse; the stool sits between them at 528.
- S3: the friend starts at 650 and steps in to 430 (22.95-23.6) so the shoulder touch and the hand-over reach; the empty purse is tucked into the sash at 24.34; the fat purse lies on the desk until he takes it.
- Market: houses are given explicitly so the three doors are at x 180, 760, 930; the jewel stall is a story drawing (x 420-700, counter 790) with a hinged closing board and an unrolling awning. Market framings are tighter than the plan's numbers (zoom 1.3-1.95) for phone legibility; S11 keeps the plan's wide 1.05 for the doors.
- "JEWEL MARKET" label (S5) and the "2 BAGS" tag (S8) are not drawn: neither is in the plan's 19-word lettering list.
- S8: kin2 heaves bag 1 onto the counter at 466 (THUD) and the jeweller pulls it to 560; kin3 sets bag 2 at 470, which kin1 opens (coins, light, necklace, the rolling gems come from it). The man stands at 650 so the bags never cover his face.
- S10: each purse lands at x 455 and shoves the row along; the jeweller slides the jewel box to her and she takes it as she turns.
- S13: man 340, friend steps in to 520; the man moves the purse to his left hand at 124.3 and takes the note with his right.
- S14-S17: the man sits on a stool (seat 'stool') at 470; the 500-dinar purse lies on the floor beside the stool; the open letter is drawn in front of him.
- Thought cloud: centre (500, 360), 840 x 480 (raised so the couple's heads stay clear), inside scale 0.72 (figures about 150 px on screen; the plan map is drawn 0.68 smaller inside). Friend's arms round the relatives: he is drawn behind them and his hands are drawn on their shoulders.
- Title card THE POOR MAN AND / HIS FRIEND IN NEED for the first 2.1 s (series convention).
