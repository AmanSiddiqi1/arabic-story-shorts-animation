# AN-104 library proposals (drawn in src/, not yet in Library/)

1. `dog` (src/a104_lib.js `a104Dog`, `a104DogGeo`, `a104DogHead`, `a104DogRing`, `a104DogNose`): the AN-040 sheepdog generalised. Fields ph, amp, sit, crouch, lie, headDown, chew, raise + pawW (world paw target, clamped to leg reach), collar 'gold' | 'rope', age, earFlick, ears, headTilt, nod, drop, tailWag, wagAmp, tailUp, tongue, mouth, brow, eyes, silhouette + acting fields. Four palettes (tan, white with black ear and saddle patch, brown, light tan with dark ears). Stride `A104_DOG_STRIDE`.
2. `goldDish` (`a104Dish`): rim 110 x 26, fill with steaming food, glint sweep, tilt.
3. `chainLine` (`a104Chain`) and `ringPost` (`a104Post`): sagging link chain with swing and a travelling glint.
4. `debtScroll` (`a104Scroll`): small scroll with a red seal and an animated red X (`struck`).
5. `coinPile` / `coin` (`a104CoinPile`, `a104Coin`), `purse` (`a104Purse`), `giftChest` (`a104Chest`, open with cloth, gems and glow), `foodTray` (`a104Tray`), `loaf`, `bowl` (steam), `handcart` (`a104Cart`).
6. Effects: `goldGlow` (`a104Glow`), `glint` star (`a104Glint`), `rays` burst (`a104Rays`), `redX` stamp (`a104X`), `soundArcs` (`a104Arcs`), `dashArrow` (`a104Dash`), `coinEyes` (`a104CoinEyes`).
7. `iconBalloon` (`a104Balloon`) and `insetCircle` (`a104Inset`, with dream wash), `bust` (`a104Bust`), and the person-frame helpers `a104M` / `a104Pt` / `a104Head` (same as AN-097's, worth one shared copy).
