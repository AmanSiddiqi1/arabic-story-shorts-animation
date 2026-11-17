# AN-105 The Sharper of Alexandria and the Chief of Police: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (1048b79c...) and its `.mp3.words.json` (b6e57e00...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 179.99 s = plan duration 178.262 + end hold 1.73 (3-minute cap, coordinator clamp). THE END at 178.3, the chief's peek at 179.6.
- Subtitles: chunk marks from the plan's `subtitles` (chunks_ar.txt / chunks_en.txt); align.py on the final words.json: 256/257 matched, 37 starts silence-refined. No dashes in either script.
- Owner questions: all plan defaults taken (title card, beating only threatened, small blade, sharper planted three times, no horse, NEXT MORNING card, comic additions kept: periscope, lane swap, moth, turban ending).
- Sources: src/a105_props.js (props, effects, person-frame helpers, lanesYard set), a105_cast.js (looks, actor drawing with helmet and bag), a105_hall.js (everyone in the police hall), a105_places.js (street, inn, Cairo, road, yard), a105_main.js (places, camera, overlays, transitions, sound).

Decisions the plan left open or that the measured sets changed:
- No soldier preset in the Library: soldier and guards are the servant costume (knee tunic, `pal.head: 'helm'`) plus a story helmet drawn in the figure's frame (`a105Helmet`; guard B's is 1.22x too big). Soldier red with a yellow neck cloth, guards blue.
- Chief: vizier at age 0.35 so the pointed beard stays black (the `pal.beard` field would also replace the beard style). The turban cannot slip separately: head tilt wobbles stand in for the slip; at 177.34 a story turban band covers his eyes and lifts for the peek.
- Hall re-blocked on the measured set (plan positions were approximate): door 40..250; guests upstage y 868 at x 270/355/440/525; table 620..780 (top 852), purse at x 700; dais 790..995 with the chief's cushion at 880; soldier home x 160 (y 935); the sharper rests at x 540 after the confession and stands at 600 by the table from 115; guard A (tall) by the guests, guard B (short) in front of the dais at 760; bundle of canes lands at x 330. Wide hall shot is zoom 1.15 (zoom 1.0 left too much empty floor).
- S7: the soldier's rush passes downstage of the sharper (y 955) to reach the purse; the chief's palm stops him.
- S9: the short guard sits for story time and pops up at the tall guard's raised finger (they stand apart in the new blocking, so no yank).
- S15: guard A crosses behind the table to x 760; guard B moves into the lane (x 270) so he can grab air and fall at 134.74.
- S19: the chief's gavel slap lands on the dais edge (he cannot reach the table from his cushion); the table still hops.
- S18: the chief clapping his forehead (151.84) happens off frame while the camera holds on the guards.
- S11: the mud wall is 1500..1760 with top 850 so the soldier can sit on it; the sharper behind it shows only his creeping hand until he pops up.
- Inn: hutRoom night, door right, mattress 250..520 (head left), stool + lamp at 560, a story mat 600..840. S2 right half stays black; S12/S13 use the same framings (wide 1.15, bag close-up zoom 1.9 at (330, 760)).
- Sound: thud 23.82, whoosh 95.4, chime 114.9, whoosh 142.62, thud 165.48, chime 178.2 (all in measured pauses or after the last word, gains 0.2-0.5).
- Skipped / simplified: per-guest S16 heap is a forward topple to a floor sit with dizzy stars (no pile physics); laundry-line wave is a travelling flap; the S22 wet footprints run from the table to the door as static prints.
