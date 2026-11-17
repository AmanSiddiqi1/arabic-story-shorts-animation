# AN-146 The Thief and the Merchant: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (3f4845b2...) and `.mp3.words.json` (49fbe2de...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json` (script sha 6208cf60...). Plan validated (17 scenes, 198 actions).
- Film 179.98 s = 177.576 narration + 2.4 s end hold (plan). THE END at 177.4. implcheck PASS.
- Subtitles: the plan's chunk marks (`chunks_ar.txt` / `chunks_en.txt`, 31 chunks), aligned by `align.py` on the final `.words.json` (`whisper.json` copy), 236/239 words matched, the rest interpolated. No dashes in either script.
- Sound: the plan's seven effects only (pop 4.35, pop 9.2, whoosh 21.7, chime 86.95, pop 91.0, thud 110.7, chime 177.9).
- Owner questions: all plan defaults kept (thief-stripes opening, look-alike impostor with red cloak and reddish beard, the stall change gag with the portrait, the failed first key / relock / own knot, the watchman's thought cloud, the cloak worn by the merchant and thrown back, the lettering list).
- Source: `src/a146_rig.js` (helpers, from the AN-135 rig pattern, plus `a146CapeBack`), `a146_props.js` (new drawings and the two new sets), `a146_cast.js` (cast builders, shop street, interior), `a146_day.js` (S1-S3), `a146_night.js` (S4-S6, one night timeline), `a146_shop.js` (S7, S8, S11), `a146_morning.js` (S9, S10, S12), `a146_quay.js` (S13-S17), `a146_main.js` (scene table, cameras, lettering, wipe, card, sound).

Decisions the plan left open or the measured sets changed:
- Planned-but-missing Library assets were drawn in the story: guard = `servant` costume in yellow with a blue sash and a story-drawn pointed helmet (`a146Helmet`) plus hand lantern; storeroom = own cutaway (`a146Store`, doorway in the back-left wall with a day light cone) instead of hutRoom; candle, ledger, keyRing, silver coin, portraitMedallion and picture balloon are story functions; balloon icons are cached black silhouettes of the Library person and camel.
- Camel scale 1.0 (plan 0.8): at 0.8 the camel stood shorter than the people (s 1.2-1.25). Its head turn in S16-S17 is capped at 0.62 (a full turn hides the head behind the load).
- Bale stack order: red and blue below, green top left, yellow (knot + tassel) top right, so the knot stays visible beside the merchant in S2 and S14. Shop stack centre x 780; storeroom stack x 710; row by the door x 330 (S8).
- The Library cape is a narrow strip behind the robe; the thief's cloak gets an extra flared back cloak (`a146CapeBack`, hem trailing the walk) so it reads at phone size.
- S4: the impostor freezes at x 360 (in the open, before the barrel), then darts behind the stall (x 165) at 26.64; the plan's stop at 200 was behind the stall.
- S9: the camel enters 74.5 and stops at 76.4 (plan 75.44; the distance needs ~1.9 s at a walk); the bale loading is a relay: the driver carries the first bale out, the impostor tosses the other three from the doorway, each landing on its cue.
- S12: final marks merchant 520, driver 690, watchman 860, camel 1080 (head turns back 120.6, forward again when the driver points left).
- S13: driver and camel stop past the door (driver 880, camel 680) so the merchant has the door alone.
- S14: the cloak lift folds the whole front up (left flap first) so all four bale faces and the knot show; the first bale is handed to the driver in the doorway at 145.52.
- S15-S16: merchant 470 -> 920 (154.3) -> 980 (156.32); the impostor runs in from x 520.
- Counters and labels sit in the sky band (panel y 230-250) or beside heads, never on faces.
