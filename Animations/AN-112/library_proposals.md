# AN-112 Library proposals

- `purse` (a112Purse): drawstring coin purse with fill (round to limp sock), open (glow, coin tops), bow, tassel swing, rot, sq.
- `coin` + `coinArc` (a112Coin, a112CoinArc): silver dirham with spin; flight on an arc between two points.
- `scroll` (a112Scroll): hanging strip with rolls, len, ruled lines, PAID stamp, wax seal, portrait.
- person costume preset `soldier` (A112_GUARD + a112DrawGuard): knee tunic, chest plate, helmet with neck cloth (a112HatShape 'helmet', a112HelmetBack), spear (a112Spear).
- person headwear offset fields (a112Hat): hatDx, hatDy, hatRot for crooked or jumping headwear, plus the oversized `judge` turban and `judgeTurban` on a cushion (a112TurbanCushion).
- dream frame (a112DreamFrame): a thoughtCloud that grows from a thinker's head to fill the panel and shrinks back.
- small props: travel bundle (a112Bundle), basket with loaves (a112Basket, a112Loaf), moth (a112Moth), signpost (a112Sign), comic story box (a112StoryBox), wipe panel (a112Wipe).
- rig helpers (a112W, a112Loc, a112Head, a112HandW, a112Arm): body-local/world conversion for the costumed person (also in AN-099 as a99*); worth one shared `personRig` in Library.
