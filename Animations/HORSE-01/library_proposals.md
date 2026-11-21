# HORSE-01 Library proposals (for the coordinator; nothing here has been added to Library/)

All live in this story's series files and are written to be copied by HORSE-02..05 unchanged. Proposed once the film is approved:

1. **ebonyHorse** (cast, `src/horse_cast.js`): the carved flying horse, rigid, Library-horse size and seat (works as a `rideOn` mount), knob/lever controls, `reveal`, `close` engraving, `lit` power-on, `frost`. Helpers `ehPowerOn`, `ehRigP` (place by body centre with pitch), `ehHorsePt`.
2. **palaceGarden** (set, `src/horse_sets.js`): king's festival court strip 2000 wide with tall sky (zoom 0.62): baked sky, far city, palace facade (domes, minarets, arcade), garden ground; live bunting, banners, lanterns, fountain jet, kites, gadgets; front pass; anchors `EH_GARDEN`.
3. **skyFlight** (set, `src/horse_sets.js`): sky plates by altitude/time (low, high, gold, sunset) cross-faded, three tiled cloud layers, cloud deck, sun with rays, `ehLand` (kingdomBelow in perspective bands, 'home' with palaceToy, 'far'), `ehWindRibbons`.
4. **platformCart** (prop, `src/horse_cast.js`): low four-wheeled trolley with push bar and leaf springs (`sag`, `wheel`).
5. **handInsert** (pose, `src/horse_cast.js`): large hand for close inserts (grip, point, sleeve, cuff).
6. **ehRibbon / ehCapeStand / ehCapeFly** (motion, `src/horse_cast.js`): tapered ribbon on a travelling wave for capes, turban tails and kite tails; standing and flying capes.
7. **ehInteg** (motion helper, `src/horse_kit.js`): position from velocity keys as a pure function of t (cloud scrolls).
