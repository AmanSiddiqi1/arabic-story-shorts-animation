# AN-111 library proposals (drawn in src/, not yet in Library/)

1. `spinningKit` (a111_props.js: `a111Spindle`, `a111Distaff`, `a111Basket` with `tip`, `a111Skein`): drop spindle with a spinning thread cone, distaff with a cotton cloud, cotton basket that can be turned upside down, stacked skeins. Any spinning/weaving home.
2. `platterJar` (`a111Platter` with `crack`, `a111Jar` with `chip`, `web` + swinging spider, `new`): poor-household props.
3. `fish` (dead market fish) (`a111Fish`): side view, `puff` (swollen), `open` (clean belly flap onto a dark hollow), `cut` (dotted knife line), `tail`, X eyes. Complements the KD-007/KD-019 swimming fish.
4. `pearl` (`a111Pearl`): any size, sliding highlight angle `hl`, turning band, four-point glint.
5. `stinkLines` (`a111Stink`): green wavy smell lines with flies, strength 0..1.
6. `goldGlow` colour option (`a111Glow` with `col: 'white' | 'gold'`).
7. `angelLight` without wings (`a111Cone` light cone from the top, `a111Column` column of light) plus the white-palette bleach-from-the-feet technique (S25).
8. `iconBalloon` (`a111Balloon`): wordless picture balloon with a clipped `inside(c)` and a tail.
9. Coins and goods: `a111Coin`, `a111CoinPile`, `a111Stack`, `a111Sack` (`open`, `sq`), `a111Purse` (`out` = turned inside out, `limp`), `a111Bread`, `a111Date`, `a111Tray`, `a111Bowl`, `a111Knot` (cloth bundle), `a111Fan` (palm-leaf fan), `a111Knife`, `a111Carpet`.
10. `balanceScale` (`a111Scale`): coins against a heart, tilt.
11. Small effects: `a111Ghost` (dashed crossed-out ghost icon), `a111Cross` / `a111Tick`.
12. Rig helpers worth generalising (a111_rig.js): `a111Arms` (per-frame hand targets in local or world space resolved to arm angles, returning world hand points), `a111HT` (hand tracks that mix world and local targets), `a111Head`/`a111Mouth` world points; and the `a111Give` setup-and-payoff gesture.
