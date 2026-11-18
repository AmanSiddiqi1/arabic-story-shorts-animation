Verdict: PASS WITH NOTES

# AN-146 The Thief and the Merchant: Fable review, round 2 (v2)

Film reviewed: `Animations/AN-146/renders/AN-146_v2.mp4` (cloud render, QC PASS). All 30 strips of `review/v2_pack/strips/` were looked at: every changed range strip by strip at full size (54-120 s, 120-180 s), the unchanged opening (0-54 s) as reduced overview sheets. 18 full-size detail frames were pulled into `review/v2_pack/extra/` (montages `m1.png`, `m2.png`, `m3.png`; overviews `s_a.jpg`, `s_b.jpg`, `s_c.jpg`).

## Summary

The round-1 BLOCKER is gone. In the candle-lit shop the light pools now form a union: the watchman is lit in the doorway, and the impostor's face is fully visible while the watchman leaves his candle (63.2-64.5 s), through ALL IS WELL and the push-in. The one-eye-open beat (65.35 s) and the wink and grin (65.7 s) read clearly at phone size; this is now one of the best moments in the film.

The three re-staged scenes work. The loading (78-81 s) is three clear columns with full-colour bales arcing from the door stack to the camel on the counter beats. The confrontation (156.5-165 s) holds the whole camel and all four bales, gets four ticks and a clean ALL BACK, and the close two-shot has no leftover marks. The ending holds both men in frame to 180.0 s with the thief waving in his cloak, the merchant heading for the gangplank, and THE END in the sky.

No new staging error, no broken frame, no subtitle problem was found. Nothing below justifies a v3; the notes are optional polish if the film is touched again for another reason.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | BLOCKER: light pools cancel in the dark shop (56.4-69.7) | FIXED | No dark lens between pools at 57.5, 63.5, 65.35, 65.7, 66-69 s. Both faces lit. Eye opens 65.3, grin and wink by 65.7, held to the cut. |
| 2 | Empty-quay ending (175.7-180.0) | FIXED | Both parties in frame to the last frame; waves at 175.7 and 176.6; THE END in the sky, clear of the sail. See polish notes 1 and 2. |
| 3 | Bows tip like a falling plank (86, 92.4, 94, 172.2) | PARTLY | Faces are no longer covered and the heads no longer merge; the merchant's wink at 172.6 is clear. The watchman's bows at 86.0-86.5 and 92.2-92.5 still lean the whole body about 25 degrees with the legs angled and a foot off the ground, so they read as a lunge more than a bow. Acceptable. See polish note 3. |
| 4 | Loading scene is one cluster (74.5-81.5) | FIXED | Camel left, driver in the gap, bale stack by the door, impostor and watchman right. Each bale is readable in the air and on the camel; counter 1-4 lands with them; salute at 80.5. |
| 5 | Confrontation: camel gag, stray marks (156-168.3) | PARTLY | Wide shot, no numerals, four ticks, ALL BACK inside the panel, clean two-shot: all fixed. The camel's look from robe to robe (157.3-158.5) is a small head swing that most viewers will miss; the animator explained the Library limit (headTurn above 0.5 flips the head behind the load). Not worth a v3. |
| 6 | Laugh too small (168.5-170.4) | PARTLY | Head back, eyes shut, bounces, thief's flinch then half smile, HA HA HA! growing in the sky: all present, and the release is clear. The merchant's forearms still sit crossed over the belly so the pose silhouette is close to the folded-arms pose before it, and the mouth is small. See polish note 4. |
| 7 | WAX arrow points at the coins (104.0-105.1) | FIXED | Arrow ends on the large stub at the desk end; he touches the puddle and rubs his fingers. |
| 8 | Camel placement at the storeroom (123.5-132.3) | FIXED | Door shot is merchant and door only. The camel still crosses in front of the door on the way in (123.5-125.0) and parks with its head cropped by the right edge at 125.2-126.5; minor. |
| 9 | Empty corner contrast (107.6-110.5) | FIXED | Black dashed outlines with tinted fills, paper label 4 BALES GONE!, counter 4 to 0, larger tassel picked up at 110.2. |
| 10 | Icon balloons (73.4-76.5, 115.2-118.2) | FIXED | Coloured icons: red-cloaked man, driver in white headcloth, camel with four coloured bales. First icon appears with the balloon at 73.5. In the second balloon the first icon sits alone at the far left for about 1 s (115.2-116.2), which is fine because it is tied to the words. |
| 11 | Ghost entrances (101.2-102.1, 132.4-132.8) | FIXED | Merchant is solid in both doorways from the first frame. |
| 12 | Sky continuity (87.2-123.5) | FIXED | Same morning palette at 87-101 s and 111-123 s. |

Regressions: none found. The union change also touches the dusk and night street (15.5-51 s) and the storeroom (132.5-146.5 s); all look as in v1 or better.

## Optional polish (does not trigger v3)

1. **174.9-180.0 s. Seam line on the extended quay.** A thin horizontal line runs across the full width of the quay wall near the bottom of the panel (visible in `extra/f_175.0.png`, `f_178.5.png`, `f_179.9.png`). It is where the quay front was extended below the original strip. Fix: draw the extension with the same block-course pattern, or start it exactly on an existing course line so no extra stroke shows.
2. **176.6-180.0 s. The thief stands and waves, he does not leave.** From 176.6 s he stays at the left edge facing the camera in front of the storeroom wall, while the narration says each went his own way. It reads as a friendly goodbye and is acceptable. If touched: after his wave at 176.6 turn him away (`turnFlip`) and let him take three or four slow steps toward the left edge with the cloak hem on `swing`, still inside the frame at 180.0 s.
3. **86.0-86.5 and 92.2-92.5 s. Watchman's bow still leans from the ankles.** Fix in `a146ApplyBow`: keep the root upright (tip at most 0.1) and put the bend into head drop and `sq` 0.88, with both feet on the ground line for the whole bow; at 94.0 s keep the baton hand on the far side so the staff does not cross the merchant's robe.
4. **168.5-170.3 s. Laugh silhouette.** Move the merchant's hands apart to the sides of the belly (not crossed) and open the mouth to the widest shape on each bounce peak, so the pose differs clearly from the folded arms held at 165.4-168.4 s.
5. **157.3-158.5 s. Camel double look.** Within the headTurn 0.5 limit, sell it with the eyes: `gaze` hard toward the thief at 157.32, blink, `gaze` toward the merchant at 157.9, blink, plus a 0.3 s chew stop. A small "?" above the camel's head in the sky would also carry the gag.
6. **123.5-126.5 s. Camel at the storeroom.** Start the camel 150 px further right so it never passes in front of the door, and park it with its head inside the frame (or fully outside).
7. **66.5-67.5 s. Time lapse.** The impostor stands just outside the candle pool for about 1 s with a grey face. Extending the pool radius by about 60 px in the time lapse, or standing him 60 px nearer the desk, keeps his face lit.

## For the coordinator (unchanged from round 1, not an animator task)

- English subtitle 165.83-168.52 s: "and asking for his cloak back." does not match the tense of the chunk before it ("and told him that..."). Owner of the translation to decide.
- English 132.91-139.98 s omits "entered the storeroom". Meaning is clear from the picture.

## Reusable techniques worth adding to the Library

- `a146Dark` union light holes (one even-odd clip per hole, intersected): move into `Library/` as the shared dark-room and night overlay. It is proven here with three overlapping pools (door light, two candles).
- `a146Bow` / `a146ApplyBow` as the base of a shared `bow` helper, after polish note 3 (root upright, bend in head and squash).
- Coloured icon balloons cached with the clock frozen (deterministic): a clear way to show reported events ("he learned about the man and the camel") without new narration.
- The column staging of a loading scene (animal, worker, stack, supervisor, witness) with each item arcing on a counter beat: list as an example in the Capabilities Guide.
