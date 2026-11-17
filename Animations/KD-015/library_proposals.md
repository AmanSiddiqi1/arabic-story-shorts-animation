# KD-015 Library proposals (drawings live in src/k15_parts.js)
- `hangingJar` (k15Jar, k15JarPoint): clay jar on a rope with sway, cutaway fill window (ghee over honey), glint, level pulse, drip bead, three-step crack and ooze, broken neck stub with goo, paper halo over a thought cloud.
- `jarShards` (K15SHARDS, k15ShardPos, k15Shard): nine seeded shards with fall, one bounce and skid; one big shard holding honey.
- `goat` (k15Goat): side-view goat with kinds `kid` and `cow`; walk phase, graze, chew, fat, hop, bleat arcs, lid.
- `dreamProps`: k15Stall, k15Coin/k15Coins, k15Abacus, k15Field (unrolling carpet), k15Wheat, k15Sheaf, k15Sack, k15Loaf (steam), k15House (blocks, storey, dome, doll's-house open), k15Furniture, k15Slate (abc / sum), k15Palace (crown, spear), k15Bundle.
- `gooSpill`: k15Blob, k15Drop, the person goo overlay and drip/puddle (k15goo, k15drips in k15_scene.js).
- Small fx: k15X (red cross-out), k15PopRing (soap-bubble pop).
- Helper idea: `personPoints(P)` giving world head/shoulder/hand points for the costumed person (k15L2W, k15clampW), so props can attach to hands reliably.

## v2 additions (Fable round 1)
- `gooSpill` (revised, replaces the v1 bars): K15CAP scalloped two-tone cap with glint, `k15drip` paint-drip band with round bulb (optional splat top), K15RUNS head-local runs that avoid eyes and mouth, K15BLOTS robe splats, K15DRIPS drops that form at a bead, stretch, fall (`fallY`) and land with `ripple`; flat two-tone puddle ending on the floor line. Head-local units, seated figure: hd + (x, y) * P.s.
- `splitThrough`: draw a person cut in two along a line (two half-plane clips, halves offset along the line, slide back together) for a blow passing through an imaginary figure (k15split / k15boy).
- `ghostList(items, times)`: the three crossed-out ghost pictograms (k15ghosts) now sized 1.6x and placed by hand; a helper should take the wall box and the word times.
- `k15W2L`: inverse of k15L2W (world point -> person-local hand target), useful for `personPoints`.
- Guide rule: key actions to timing.json word times (not planning/inputs/timeline.md, whose starts can include the preceding pause).
