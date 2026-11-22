# ALI-06 "Morgiana's Clever Plan" (80s Cel Anime): implementation notes (v1, code only)

Plan checked against the inputs: MP3 and `.words.json` SHA-256 match `planning/planning_metadata.json` and `planning/inputs/timeline.json`; MP3 142.13 s. Film = 142.13 + end hold 5.0 = **147.13 s** (`AB_DUR`). Library subtitles from `timing.json` (chunks unchanged). Style `cel-anime-80s`, no `arabicFont`. Arabic title `خطة مرجانة الذكية` (script.json `title_ar`) in Lalezar. Ends on THE END.

## Files
- Series copies from ALI-05: `ab_kit.js` (only `AB_DUR`), `ab_sets.js`, `ab_cast.js` (hand-point fix), `a3_series_cast.js`, `a3_shared.js`, `a4_series_cast.js`, `a5_series_room.js`, `a5_series_cast.js`, `a5_base.js` (ALI-05 story helpers reused as-is: pose base, market plate, cat, glyphs; `a5Say` now passes `thin: true`).
- **ALI-04 revision 1 series changes taken in (coordinator note):** `a4_series_court.js` (jar xs 0.8, blue-teal night paving, `cyPools`, `cyFore` + `CY_FG`), `a3_series_town.js` (oilJar `xs`, cutaway / peek fields), `a3_base.js` (thin balloon tail). `a6_main.js` resets `CY_FG.on` before each world and draws `cyFore` after it, as `a4DrawShot` does.
- New: `a6_series.js` (drawings, see library_proposals.md), `a6_yard.js` (the whole night stand-off as continuity data: one pose function per person 0-71 s, one world), `a6_s1.js` (S1-S10 shots, ring insert, memory inset, tags, map card), `a6_s2.js` (S11-S14 glade, cave, road, market returns), `a6_s3.js` (S15-S18 feast), `a6_s4.js` (S19-S21 shop, woodpile, storyteller, THE END), `a6_main.js` (framing, impact frame 14.26, tape 70.35-71.1, sound).

## Decisions the plan left open / changed
- Continuity follows the ALI-05 film, not the plan: frame 0 = ALI-05's last frame (guest at x 499 not 620, camera {510, 588, 1.25}, helmets 690..940 sinking 0.3-1.4, Ali Baba and the nephew in door K). They meet at Morgiana 390 / guest 488.
- Household comes out of door K one per beat (Ali 11.2, nephew 12.3, wife 12.9, kid 13.4). Ali 250 / nephew 172 (the nephew is behind him, so the arm across him works); the kid on the wife's hip at 28.58 is played as a hop and a pointing arm.
- Jars: the yard's three plain jars stand at x 1350 and 1460 (two jars) so nobody stands in front of the jar row when the guards form the half ring (guest 760, captain 890, guards 1000 / 1110 / 1220, neighbour by the back gate at 1530). Morgiana stands at 650 in S9. The jars are cleared away for the feast (the rug lies there).
- The light band at 14.26 is ALI-04's `disguiseWipe` over the guest (leader inside the band); impact frame word THE LEADER!.
- The cuffs: right cuff folded back from 1.52 (a cream roll at the wrist, `a6Guest`), left cuff slides down at the surrender (58.74), feather droop via `droop`.
- The procession leaves through the street gate: figures past x 770 after 69.9 are drawn inside the gate arch, smaller and fading, under the tape transition.
- Road S13 uses a painted `a6RoadPlate` (the Library countryRoad came out in the halftone palette); the far towns are `a2FarTown`.
- Camera zooms are tighter than the plan's 1.0 wides (1.05-1.3) to keep the ground low and no empty lower picture (owner direction).
- Sound moved inside the pauses: chime 10.9, stamp 15.4 (the impact frame itself is under a word), blip 34.75, pop 53.5, glitch 70.5, chime 88.3, chime 109.3, blip 123.85, chime 142.1.
- The future "road" picture uses the Library camel; the shop picture is a mini `lampShop`.

## Not done / simplified
- No turban slipping over one eye at 21.08 (a head tilt instead); no wife lifting the kid onto her hip (see above).
- The cat walk along the wall is one short walk (34.4-35.5); the cat does not rub Morgiana's ankle (it walks in at her feet 108.6-109.6).
- S15 Ali Baba "counts the cushions" is a small hand count; the nephew's sleeve mime is two hand keys.
- The storyteller's riders are `abSilRow` strips with a chrome counter to 40.
- Not rendered (code-only stage): checked with stills / contact sheets at about 50 times.
