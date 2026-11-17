# AN-146 Library proposals (drawn in src/, not moved into Library/)

1. `clothBale(ctx, x, y, o)` (`a146Bale`, src/a146_props.js): tied cloth bale 150 x 105, rope bands, bow knot with a yellow tassel (`knot`, `tassel` swing), `sq`, `rot`, `ghost` (dashed outline), `tick` (check mark pop). Plus `a146Stack` (2 x 2 stack) and `a146CamelLoad` (four bales at `mountSeat('camel')`, landing squash, ticks).
2. `cloakProp(ctx, x, y, o)` (`a146Cloak`): loose cloak with hanging/held/flying shapes from one function (top width, hem width, length, rotation, hem wave); `a146CloakDrape` (mound over a stack, front lifts).
3. `capeBack(ctx, P)` (`a146CapeBack`, src/a146_rig.js): a flared cloak behind any person, hem trailing the walk; would suit a `person` option (`cloak: 1`).
4. `harbourQuay(ctx, o)` (`a146Quay`): 1800 strip, warehouse with arched double door (live leaves), quay stones, sea, bollards with ropes, moored dhow (`a146Dhow`, sail billow), gangplank, gulls.
5. `storeroom(ctx, o)` (`a146Store` + `a146StoreCone`): cutaway with a back-left doorway, day light cone, crates, barrels, jars, shelf.
6. Small props: `candle` (melt, lit, flicker), `ledger` (closed/open, page flip), `keyRing` (swing, glint), silver `coin` + `coinFly`, `portraitMedallion`, picture `balloon` with cells, `silhouette` icon cache (`a146Sil`), guard `helmet` + `lantern`, `nightOverlay` with soft light holes (`a146Dark`).
7. Costume preset `guard` (servant body in yellow with blue sash + pointed helmet).
