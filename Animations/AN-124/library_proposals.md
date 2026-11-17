# AN-124 library proposals (drawn in src/; not moved into Library/)
- `desertCamp(ctx, o)` set (src/mt_props.js): 1600-wide bedouin camp on skyCycle + desertRoad dunes: big black goat-hair tent (three poles, striped roof band, navy back wall, rug, carpet, guy ropes), small tent with lit door slit, far tent silhouettes (farLit), palm, fire ring (fire 0..1), lamp rope with seven hangingLamps (lamps[], swing[], disc pulse), deco flags, tally post, front dune lip (layer 'front'), `behind(ctx)` hook for far-dune actors; anchors MT_CAMP, `mtRoofY`, `mtRopeY`, `mtLampPos`.
- `verseRibbon(ctx, pts, t, {p, w, col, curl, fade, seed})`: poetry as a paper band on a cubic bezier with squiggle writing, curl and tail fade; returns the head point. Plus `mtBz`.
- `faceCover` (`mtFaceCover(ctx, P, k, puff)`): head-cloth flap across the lower face, eyes clear; better as a person field.
- `iconBalloon(ctx, x, y, w, h, p, tail, inside)` and `portraitMedallion(ctx, x, y, r, P, {bg, grey})`.
- `musicNotes(ctx, x, y, t, {t0, gap, n, life, to, loop, seed})`.
- Props: `tallyMarks`, `mtScroll` (rolled/open with camel doodle and glint), `mtFlower`, `mtCushion`, `mtNecklace`, `mtGiftChest`, `mtDustDevil`, `mtX` (drawn-on red X).
