# AN-014 library proposals (drawn in src/, not moved)
- `shrineYard` set (k14_sets.js `k14Yard` + `k14WellFront`): domed prayer house, palm, old well with a front-rim pass for falls and rescues.
- `wellCavern` overlay (`k14Cavern`): lamplit pocket beside `wellShaft`, opened by an iris.
- `villageLane` helper (`k14Village` + `k14LowWall`): two houses from marketStreet and a shared low wall to peek over.
- person face overlays (k14_parts.js): `k14Tint` (flush / jinn skin / pallor), `k14Spiral` (spiralEyes), `k14Horns` (jinn), and `k14L2W` (figure-local point to world, incl. sit/kneel/tip).
- `k14Wisp` evil spirit with alarm / stretch / lift states.
- `k14Balloon` picture balloon + icons (`k14IconPrincess`, `k14IconBowl`, `k14Tick`, `k14Squiggle`).
- Props: `k14Brazier`, `k14StandLamp`, `k14Crown`, `k14Sandal`, `k14Purse`, `k14Chest`, `k14Robe`, `k14Bindle`, `k14Broom`, `k14Basket`, `k14Bucket`, `k14Hairs`.
- `k14Inset` round flashback inset; `k14Palm` open hand overlay.

## v2 additions
- `k14Ghost` / `k14GhostOn` (src/k14_parts.js): small evil-spirit ghost (dark sheet, wavy tail, yellow eyes; alarm, stretch) and an orbit helper that circles above a head without covering the eyes. Candidate Library fx `spiritGhost`.
- `k14CatTip` (src/k14_parts.js): read-only tail-tip position of the Library cat; better as a `catAnchors(P)` export in cast/small.js so props can attach to the tail.
