# AN-099 library proposals (drawn in the story; for the coordinator to integrate one at a time)

1. `answerBalloon` (src/a99_props.js `a99Balloon`, with `a99KnotPts`, `a99Rope`, `a99Wedge`, `a99Badge`): speech balloon with picture content (knot with `untie`, three wedges as `pieces` / `wedge` / `whole` with `spin`, `wide` that grows and pops book, star, moon, compass; any function) and a red ? or green tick badge. Pure function of its fields.
2. `goblet` + `jug` (`a99Goblet`, `a99Jug`): stemmed cup with `fill`, `slosh`, `glint`; brass jug that tilts to pour.
3. `floorCushion` (`a99Cushion`): the palaceHall dais cushion as a loose prop (w, h, col, dot, rot, s).
4. `coinPile` silver + chest (`a99Coin`, `a99Chest`): silver coins (white with blue dots) and a chest with `open` 0..1 showing a silver mound.
5. `foodTray`, `bowl`, `bread`, `trayStand` (`a99Tray`, `a99Bowl`, `a99Bread`, `a99Table`): brass meal tray (bread, dates, optional goblets), blue bowl, bread loaf, brass tray on a stand at seated-hand height.
6. `weekDots` (`a99WeekDots`): seven discs, any of them lit with a star.
7. `templeTap` pose: hand target body-local [38, -206] with a 10-unit out-and-in tap (used by the caliph 57.4, the stranger 136.52 and 166.5).
8. Small icons (`a99Icon`): patched robe, equals, book (empty / full), moth, oil lamp (lit, out, smoke), coin, purse, star, crescent, compass; `a99Cross` red strike.
9. Rig helpers (`src/a99_rig.js`): `a99Loc` / `a99W` (world <-> body-local for the costumed person, including sit, lean, tip, sq), `a99Arm` (arm tracks in angle space from IK targets), `a99HandW` (world hand position for held props). Candidate for `cast/people.js` as `personLocal`, `personWorld`, `personHandW`.
