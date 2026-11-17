# AN-083 Ma'an and the Three Girls: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (d4d07800...) and its `.mp3.words.json` (6c8f4d3b...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 169.9 s = plan duration 165.407 + end_hold 4.5 (under 180). THE END at 165.2.
- Subtitles: chunk marks from the plan's `subtitles` (chunks_ar.txt / chunks_en.txt); align.py with the final words.json as whisper.json, 223/223 matched, 34 starts silence-refined.
- Owner questions: all plan defaults taken.

Decisions the plan left open or that the measured set changed:
- Source files: src/an83_props.js (props, effects, person geometry helpers), an83_cast.js (six characters + carried props, frame state memoised per t), an83_main.js (set, camera, effects, insets, lettering, sound).
- Set: Library `desertRoad` w 2000, road off, palm at 420, rock 1750, thorns 250/985, front lip crest (1560, 850); own sky (skyCycle u 0.25 + pale hot tint) and a sky-locked sun at panel (170,175). The plan's skyCycle warming to u 0.42 rendered a grey-blue dusk, so the late light is a warm gradient over the noon sky (162.44-165.1) with the sun sinking to (250,330).
- Girls rise behind the lip clipped at y 902, each crossing at her own crest point, then walk down to 1430/1530/1630. girl3 peeks behind girl2 (28.3-33.6).
- S5: girl2 and girl3 carry their skins to the huntsmen (to 1215 / 1105) and walk back after the drink (43.75-45.4).
- S8: Ma'an hands from 1335, 1480 and 1580 (between the girls, y 925 in front) instead of 1440/1540 (full overlap); he steps back to 1380 at 75.9-77.2 for the empty-quiver gag. Off-screen at 1200 during S9, back to 1300 under the 90.4 whip.
- Bundles are held diagonally (heads beside the chin, never over the face), arrows 1.3x girl scale so heads read.
- S7 insert: the quiver mouth at panel y 800, scale 6; the drawn arrow hangs head down from his fingers (nock first, head last), four more gold heads rise in a fan behind it on 68.9. The in-quiver fletchings are hidden in the insert so the head reads.
- Ma'an's quiver sits over his far shoulder (visible behind the keffiyeh) until the swing at 63.36; bows on everyone's backs.
- Verse insets: content drawn at 1.3x about the inset ground (figures about 200 px tall on screen). Verse 1 re-laid out right-to-left (warrior at 320 shoots to the poor man at 128, then walks left handing an arrow to a second kneeler at 205; spears on the ridge behind). Verse 2 friend 118 / foe 342, labels above their heads.
- S10 raised arrow is held near the nock so the glow sits above girl1's face.
- S14: girl1 and girl2 step to 1455/1500 to lay hands on girl3's shoulders; the final line re-forms as girl3 1420, girl1 1520, girl2 1620 (no crossing).
- S16 the men recede (y up 46, scale down 32 %) to x 730-930 so they stay small on the left of the last frame.
- Sound: the plan's nine cues, retimed into measured silences: whoosh 6.4, pop 11.95 (the drop lands), whoosh 19.85, pop 59.7, chime 60.15, chime 85.0, pop 88.25 (plan 87.8 is inside speech; pause is 88.06-88.62), chime 121.7, chime 165.45.
- Skipped: headcloth tail flick (no Library field); girl3 "corrects her number" (she is already number 3); hand stack/bounce kept small.

## v2 (revise from fable_review_1, see review/revision_1.md)
- Re-blocked: m2 1100 (y -12), m1 1160, Ma'an 1270, girls 1420 / 1510 / 1568 (g3 y -12). Verses: no position swaps, reciter steps forward 25.
- Camera: `an83Ck` keys put feet at 85 % of the panel; S9 zoom 2.4-2.55; S15/S16 cut moved 158.3 -> 158.5.
- S5: men run upstage to girl2/girl3 (37.9-40.4) and back (44.85-48.3); S6 Ma'an steps aside to 1315 (54.3-60.2) for the purse gag.
- S8: girls queue to x 1385; bundle landings 72.16 / 74.2 / 76.72 (AN83_RCV). Position snaps at the 80.24 cut use one-sided walk speed (AN83_SNAPS).
- Insets: panel space, centre (520, 352), r 318; gaze target AN83_INW. Sun faded in AN83_SUNOFF windows; sunset at panel (300, 470).
