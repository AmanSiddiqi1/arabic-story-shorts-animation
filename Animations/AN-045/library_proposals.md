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
