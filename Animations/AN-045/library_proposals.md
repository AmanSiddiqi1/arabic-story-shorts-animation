# AN-045 library proposals (drawn in src/a45_props.js; integrate one at a time)

- clothBundle (`a45Bundle`): knotted bundle, wrap 'plain' (patched grey) or 'rich' (red, yellow diamonds, gold fringe, cord and tassel), open 0..1 (four corners fall one at a time), contents rags / treasure / none, sq, tilt, peek (lifted corner with a sleeve), glint. Planned asset.
- oldClothes (`a45Rags`, `a45Shirt`): drab patched heap; the holed shirt with an optional eye seen through the hole.
- richCloth (`a45RichDrape`): rich cloth unfurling across a surface with an edge wave.
- coinPile (`a45Coin`, `a45CoinPile`): single coins and a heap of n coins. Planned asset.
- moth (`a45Moth`): a flapping moth on a seeded zigzag (running gag for old clothes).
- iconBalloon (`a45Balloon`, `a45Cross`, `a45EyeIcon`): round balloon with a tail holding a drawn icon; red X; eye icon. Planned asset.
- inset circle (`a45Inset`): round cutaway with a ring border. Planned asset.
- noPeekSign (`a45Sign`): board on a post that swings up and flips (story-specific; generic signboard if wanted).
- monkey pivot rotation and fez (`a45Monkey`): flips and handstands about the body centre, lift, red fez with tassel lag (proposed as optional monkey fields `fez`, `fezLag`, pivot `rot`).
- people helpers: `a45Brows` (brows for costumes without them, e.g. villageWoman), `a45Head` (head point for sit/kneel).

## v2 additions (Fable round 1)
- peekFromCover: a known character leaning out from behind a post or frame edge with a second head popping above (S4 41.55, replaces the generic `peekEyes` when the watcher is known).
- coinHeap (`a45Heap`): wide coin pyramid (rows 8, 7, 6 ...) for thought clouds; `a45CoinPile` grows a thin column past 20 coins.
- popBox (`a45PopBox`): lettering box whose content scales in with it (no empty box frame while it grows).
- noRing (`a45NoRing`): red "no" ring with a single diagonal; the icon underneath stays readable.
- looseSleeve (`a45Sleeve`): grey patched sleeve hanging over an edge (evidence beat).
- clothFill fix: a pattern fill must cover the polygon's own bounding box (v1 drew the rich diamonds in a fixed box at the origin, so they never showed).
- Guide rule: a cutaway or inset must never cover the object it explains; place it in free space with a leader line (S8).
