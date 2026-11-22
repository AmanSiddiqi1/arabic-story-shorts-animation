# HORSE-03 Library proposals (for the coordinator; nothing here has been added to Library/)

All live in this story's new series files, written so HORSE-04..05 copy them unchanged (with the HORSE-01/02 series files). Proposed once the film is approved:

1. **princessGardenDay** + `princessGardenDayFront` (set, `src/horse_garden_day.js`): the princess's garden of HORSE-02 repainted as two bright baked plates, `'day'` (clear morning) and `'golden'` (same land colours, gold horizon, long soft lawn shadows), never a tint over the cast. New dressing: the **rose bower** (trellis arc with climbing roses behind the hide spot x 1210), `ehRoseBranch` (the movable front branch, `aside` 0..1), a sundial, `ehButterflies`, a live gate leaf (`ehPGGateLeaf`, open 0..1), a hedge patch that shivers at the peek point, and an `o.behind` callback for figures behind the hedge. Anchors `EH_PG3` (+ `EH_PGARDEN`).
2. **twoRiders** (pose, `src/horse_riders.js`): front and rear rider on one horse (Library `rideOn` called twice with the mount drawn once), seat offsets `EH_SEAT2`, `ehRiderFrame` / `ehRiderPt` for points on a seated rider, the rear rider's reaching arm redrawn over the front rider (`armOver`), veil, cape and turban tail per rider. Works on the ground, in the flight rig and inside thought clouds.
3. **coverCloth** (prop, `src/horse_riders.js`): striped carpet cloth with fringe; shapes `ehClothDraped` (over the horse, hem wave), `ehClothSpread` (flying / folded / on a bush), `ehClothHeap`, blended with `ehClothMix` (resampled outlines).
4. **turbanScrap** + `ehInvTailAt` / `ehInvTail` with `torn` (prop, `src/horse_riders.js`): the saffron clue (ragged edge, claw hole) and the inventor's turban tail, whole or torn short with a ragged end; `ehRibbonEnd` gives a ribbon's end point.
5. **ghostOutline** (effect, `src/horse_riders.js`): dashed, flickering outline of what is missing; `ehGhostHorse(H)` and `ehGhostSeated(x, y, s, dir)` outlines.
6. **travelCloak** (pose, `src/horse_riders.js`): hooded sand cloak in the hip frame (standing or riding; body behind the figure, hood over the turban), plus `EH_PLUGEAR` (finger in the ear).
7. **cardboardPrince** (effect, `src/horse_riders.js`): a flat cut-out of a person on a stick (baked sprite with a card edge and dashed outline) for imagined lies and plans.
8. **EH_FKING / EH_QUEEN** (costume settings, `src/horse_riders.js`): the princess's father (royal blue and silver caliph) and mother (lilac lady).
9. Pattern worth a guide entry: **a plan / rehearsal in a thought cloud** (`h03_plan.js`): one held real frame below (the schemer behind a hedge, acting with eyes, hands and turban only), the imagined version inside the cloud with its own inside camera (`at` keys that follow the action) and deliberately smooth plan acting (no anticipation, no overshoot).

## From revision 1 (v2)
- `h3Push` / `h2Push`: zoom factor over a base framing, scaled about the floor line (template camera helper).
- Rule for the guide: a movable foreground branch goes in front only while it hides something; pulled aside it joins the depth rows (`h3BranchBack`).
- Rule for the guide: front cloud layers are never drawn over the cast (S17 `ehSkyFront` before the rig).
