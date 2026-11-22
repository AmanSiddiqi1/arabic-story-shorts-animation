# ALI-04 "The Merchant of Oil": library proposals

Reusable drawings written in this story's `src/` (not moved into `Library/`; the coordinator integrates them one at a time).

| Name | File | What | Notes |
|---|---|---|---|
| `courtyard` (+ `CY`, `AB_COURT`, `cySkyPlate`, `cyPlate`, `cyGate`, `cyBackGate`, `cyWindow`, `cyLanterns`, `cyLemon`, `cyPalm`, `cyWash`, `cyFig`) | `src/a4_series_court.js` | Ali Baba's walled yard, 2200 x 1230 strip, models `evening` and `night` (light, coloured night), baked sky (parallax 0.3) and yard plates, live gates, doors, windows, lanterns, trees | episodes 5 and 6; any town-house yard |
| `kitchen` (+ `KT`, `kitchenPlate`, `ktWindowView`) | `src/a4_series_court.js` | warm interior 1000 x 1230: hearth with embers, shelves, swinging pans and garlic, table, stool, window showing the yard plate at 0.45 scale, door | any kitchen / humble room |
| `oilJar` fields `cut` (jarCutaway), `oil`, `ghost`, `peek` (jarPeek), `wob`, `sq`, `noLid` | `src/a3_series_town.js` (the series oilJar, extended; default look unchanged) | cutaway with a figure or rocking oil, cyan ghost outline, a lid that rises with two eyes in the gap | backward compatible |
| `cyJar`, `CY_JARS`, `a4JarHead` | `src/a4_series_court.js`, `src/a4_base.js` | the jar row as data; a head and shoulders up through the jar mouth wearing the lid as a hat | |
| `guard` (+ `A4_GUARD0`, `A4_GUARDS`) | `src/a4_series_cast.js` | town guard preset: sky-blue tunic, saffron sash, brass helmet with point and lagging neck cloth, rag-wrapped spear (any angle, or butt on a point); captain with white cape, red plume, grey moustache and the dark lantern | Library `guard` costume preset candidate |
| `baker`, `apprentice`, `a4Cap` | `src/a4_series_cast.js` | the two new neighbours (carpenter / servant palettes, rolling pin, frying pan) | episodes 5-6 |
| `nightcap`, `neighbourNight`, `aliNight` | `src/a4_series_cast.js` | soft cap with a lagging tassel; night dress for the old neighbour and Ali Baba (vermilion sash kept), candle | |
| `jarMan` | `src/a4_series_cast.js` | a thief folded inside a jar (floor sit at s 0.62), six poses (thumb, yawn, fan, sleep + snore bubble, bite, scratch) | |
| `disguiseWipe` | `src/a4_series_court.js` | a tilted light band: identity A outside, B inside, same pose object | |
| `oilLamp`, `gateBar`, `darkLantern`, `rollingPin`, `fryingPan` (householdArms) | `src/a4_series_court.js` | small props | |
| `a4Glyph` | `src/a4_base.js` | drawn glyphs: question, exclamation, drop, lock | |

## From revision 1
- `cyFore` (yard foreground dressing pass with parallax) and `cyPools` (lantern light pools): reusable for any courtyard set.
- `oilJar` `xs` field (narrower jars in a row without changing height).
- Counter tied to landings (`A4_OUTL` pattern in a4CapOver): number pops on each arrival.
