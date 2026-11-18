# AN-105 library proposals (story code in src/, move after approval)
- `soldier` costume preset via `a105Helmet` (steel dome, point, neck cloth; `big` option) and `a105HelmetBowl` (upturned helmet in the hands).
- `saddlebag` (`a105Bag`: bulge, slit with hanging flap, flap open, upside down, purse showing) + `a105Strap`.
- `purse` (`a105Purse`: fat drawstring purse with squash and glint).
- `stick` / cane bundle (`a105Cane` with bend, `a105Bundle` with spread).
- `poolBasin` (`a105Pool` back/front passes) + `splash` (`a105Splash`) + wet footprints (`a105Prints`).
- `lanesYard` set (`a105LanesYard`: lane mouths, flat roof, laundry line with travelling flap, hall outer door, far skyline with lighthouse).
- `lighthouse` (`a105Lighthouse`), `innSign` (`a105InnSign`), `lowTable` (`a105Table`), `balanceScale` (`a105Scale`), `padlock` + `chain`, `coinStack`.
- Expressions on a person: `coinEyes` (`a105CoinEyes`), `flush` (`a105Flush`).
- Effects: dream wash with ribbon (`a105Dream`), `iconBalloon` (`a105Balloon`), green tick and red cross (`a105Tick`, `a105Cross`), turnstile spin (`a105Spin`).

## From the v2 revision
- `heldPropRest`: rule plus helper for held props (cane, staff, sword): a rest pose that clears all faces (staff planted upright in the outer hand) and an explicit release beat.
- `peekOverCover(P, coverTopY)`: clip a character at a cover edge so only headgear and eyes show (barrel, wall, stall, palm trunk).
- `silhouetteArm` / `silhouetteHead`: rim-lit night intruder pieces (sleeve, cuff, hand; turban outline with one glint).
- `turbanDown(look, k, peek)`: slide a character's own headwear over the eyes and lift one side for a peek.
- `periscopeFist`: only a sleeve, fist and held prop crossing above a water line.
