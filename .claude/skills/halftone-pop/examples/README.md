# Example characters (optional; never loaded by default)

Representative characters from the four Kalila wa Dimna films, kept as working demonstrations of the animation system. They are drawn with the same helpers every film uses (`ink`, `shape`, `seg`, `eyeAt`, pose parameters such as `P.eyes`, `P.mouth`, `P.talk`, arm angles).

| File | Characters | Good for learning |
|---|---|---|
| `characters/monkey-turtle.js` | monkey (sitting, eating, riding, tail), turtle (swim cycle, head extension, shell hexagons, wife variant), heart, fig | side-view animals, partial submersion under a translucent water layer |
| `characters/birds-elephant-frog.js` | bird (lark, crow and coloured kinds, flap, beak), elephant (walk cycle, trunk, ears, eyes states), frog (croak), nest with eggs and chicks, worm | flying, large vs small figures, hatching |
| `characters/fox-drum.js` | fox (quadruped walk, sit, tail), drum (hit squash, hole), cached tree layers, swaying branch | impact animation, hiding behind scenery |

Use: list the library in `halftone.config.json` -> `"characters": ["monkey-turtle"]`, then call its functions from your scene. The story scenes that used them (timelines, camera keys, balloons) are not included; see `references/ARCHITECTURE.md` for how a scene is structured.
