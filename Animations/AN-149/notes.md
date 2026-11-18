# AN-149 The Schoolmaster Who Fell in Love by Report: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (3cd4ab0d...) and `.mp3.words.json` (adc63e9b...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film 174.9 s = 171.897 narration + 3.0 s end hold (plan). THE END 172.5. implcheck PASS.
- Subtitles: the plan's chunk marks (`chunks_ar.txt` / `chunks_en.txt`), aligned by `align.py` on the final `.words.json` (`whisper.json`, 233/234 words, 45 silence-refined starts). No dashes in either script.
- Sound: the plan's seven effects (pop 4.3, thud 12.3, chime 22.0, pop 85.1, thud 127.35, thud 171.8, chime 172.7), each checked inside a real gap of `timing.json`. Knocks and the door slam are silent (impact lines only).
- Source: `src/sm_rig.js` (helpers, palettes), `sm_props.js` (new props/effects), `sm_school.js` (S2-S4), `sm_street.js` (strip, S1, S5-S6, S9-S12, S14-S15), `sm_room.js` (S7-S8), `sm_main.js` (segments, cameras, S13 insert, S15 moral cloud, lettering, sound).
- No Library change; no owner question changed (all plan defaults kept).

Decisions the plan left open or the measured sets changed:
- Cues use the silence-refined onsets where the Whisper start includes a pause: recoil and panel shake at ازداد 99.82 (not 99.22), medallion 1 at 30.35, assumption cloud at 35.27, scholar's question at 70.40, confession push at 93.89, HOW? at 103.51, the run to the school at 142.62-143.4 (فأغلق 142.70), scholar exits at 150.4-151.6 (خرج 151.57).
- Street strip (marketStreet w 2000, palace off): school 300..700 (door 440..560, sign 500/640), neighbour 760..1060 (door 850..950, old woman's window 780..900 x 490..630), teacher's house 1320..1680 roof 330 (door 1370..1470, upper window 1475..1645 x 405..595, round arch, sill 595). The two upper windows and the school door furniture are drawn by the story (bust clipped to the opening, sill on top), not by marketStreet.
- The fallen book lands at x 1488 (it slides to the left end of the sill before dropping), so the scholar coming out of the door (x 1420) finds it on his right, picks it up, then walks left in S15. The plan put it at 1560 with the scholar walking left first.
- Cameras made tighter than the plan for phone legibility: school wide zoom 1.2 (plan 1.0), room wide 1.2 and two-shot centre y 645, S5 1.4 / 1.8 / 1.3, flashback window shot 1.4 (plan 1.25), S11 centre x 1440 so the song balloon fits.
- Clouds and balloons enlarged so figures reach about 110 px: S4 cloud (445, 450) 400 x 290 scale 0.6; S10/S12 cloud (1350, 290) 360 x 280 scale 0.55; S11 song balloon (1300, 330) 420 x 290; S15 cloud in panel space (520, 410) 700 x 500 scale 0.85.
- S9: the lady on the big note and the UMM AMR letters stop left of the window (they covered his face at the plan's end point).
- S12: pupils at x 270 / 330 / 390, the teacher stops at x 600 right of the school door; costume change inside turnFlip at 144.6 (palette cross-fade at 144.83).
- S15: the scholar walks 1452 -> 760 and stops at 166.38; the camera then drifts to x 600 so the locked school and the playing pupils are in frame. The foundation of two notes is hidden by a small mist until 2 SONGS (165.4) and the inner view tilts down 35 units; the grave block is grey stone with two plain lines (no religious mark).
- Head shakes are x oscillations of the whole figure (front-facing person), gaze flipping, lid 1 on the third (plan note).

## v2 (Fable review 1)
- See review/revision_1.md. Decisions: recoil kept on the silence-refined onset 99.82 (review said 99.22, the Whisper end of the previous word); THE END moved into the empty top of the moral cloud (panel y 300) because the larger cloud fills the sky; dream wash now drawn under the figures (SM_PTF panel transform); the S13 insert no longer draws the street.
