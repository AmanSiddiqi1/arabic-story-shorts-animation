# AN-084 Ma'an and the Bedouin: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (0ca2dc04...) and its `.mp3.words.json` (d2b07840...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 178.6 s = plan duration 175.6 + end_hold 3.0 (under 180.0). THE END at 175.6.
- Subtitles: the plan's chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (230/232 words matched, 45 silence-refined starts).
- Owner questions: all plan defaults taken (white horse; blue robe in both halves; both English asides; Western digits without a comma; donkey half inside the door chewing the tassel; mime and cucumber bite; faceless crowned silhouette; 'A LITTLE LATER...').
- Library: horse, donkey, rideOn, desertRoad and palaceHall now exist in the Library and are used directly (the plan listed them as new).

Decisions the plan left open or that the measured set changed:
- Ma'an's face: one `caliph` body in both halves (full black beard, age 0.3). Desert look = `pal.head: 'keffiyeh'` red head cloth, no cape, no belly; palace = crown turban, blue robe, red cape. `pal.beard` was not used (in the Library it overrides both the beard style and its colour).
- Hits on measured onsets: 1000 tag at 51.09 and 500 at 57.94 (the timeline's 50.78 / 58.48 include silence); the gulp sits in the real gap 57.52-57.94.
- Price ladder: the plan's column positions overlapped the heads at phone size, so the tags (scale 0.75) form a diagonal staircase: desert from (1900, 282) down-left 36/44 per step toward the gap between the faces; hall mirrored from (360, 282) down-right. The row in S11 is x 215..803 (spacing 98, scale 0.52) so the 1000 is not cropped by the S12 camera.
- Hall: dais raised to top 800 (Library default 860) so the prince's head is about 95 above the Bedouin's; own throne drawing (an84ThroneBack/Arms) so it can tip 6 degrees about its rear base at 149.0; wall kept 'paper' (the blue wall swallowed the blue robe). Courtiers at x 880/950, step back to 935/1005 for the treasurer (stops at 868).
- S1: the wide shot holds until 4.5 so the two men on the far crest are seen waving at 4.14; tracking starts after. The gazelle leaps over the far dune at 7.0-7.6 (fading, shrinking) with a dust puff; no front dune lip (it would have hidden the donkey's entrance).
- S8: the Bedouin leads the donkey on foot to the post (no dismount shown); he is drawn outside (behind the wall) until 98.1.
- S10: the plan pushed to the prince's face on 131.08; the push waits until 131.85 so the Bedouin's jolt and hop are seen first. The round inset is in panel space (top left), with the desert head winking in sync with the throne wink at 134.4.
- S12 end: the Bedouin stops in the doorway with both bags and looks to the lens; the donkey stays half inside the door (no walk-out, no turn), the final image the plan describes.
- Sound: exactly the plan's 11 cue times, each under 0.25 s (whoosh dur 0.22; the 162.5 coin clink is two short tones instead of the 0.8 s 'ding'), all inside measured gaps; bed 0.5 as in the template.

Skipped (small): the crown slipping over one eye at 147.12 (no separate crown field); the vase tipping in the S5 cloud; courtier A offering the basket at 173.8; cheek puffing (no field: shown with sq 1.03 and lid).

v2 (revision 1, see review/revision_1.md): tags moved to panel units (desert column right edge scale 0.8, hall column left edge scale 0.68, row in panel units); donkey stops at 1920; desert sun camera-fixed on the left third from 50.4; new cuts at 130.13 / 130.95 / 131.85 / 135.95; throne tip about 14 degrees; ending restaged (bags at hips, walk to the arch, donkey turned out behind the wall). The drought/emir cloud kept at x 1720 as in v1.
