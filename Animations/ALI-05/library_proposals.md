# ALI-05 Library proposals (for the coordinator; one at a time, after the film is approved)

1. **dinnerRoom** (set, `src/a5_series_room.js` `drPlate`, `dinnerRoom`, `drTable`, `drCushion`, `drBeads`, `drLamps`, `DR` anchors): a 1600 x 1230 family dining room, floor y 900: street window and courtyard door with live views, niche, tapestry, kitchen arch with a bead curtain, low brass tray table with food in a front pass, floor cushions, three hanging lamps. Reusable for any indoor meal scene; would need theme colours instead of fixed ones for other styles.
2. **shopFront** (set piece, `shopFront`, `shopCounter`, `brassLamp`): a market booth with an unrolling striped awning, a hanging sign and glinting goods; drawn over `marketStreet`.
3. **giftBox, teaCup, ewer, lentilBowl, a5Crate / a5CrateStack** (props): small props with a bottom-centre origin and a scale.
4. **voiceWave** (effect): a ribbon of sound from a mouth, smooth or jagged (`jag`), with a break (`brk`): shows a voice, a match of two voices, a voice that cracks.
5. **clueCounter** (effect): a labelled counter (`CLUES n`) that pops when it ticks; generalises to any named tally.
6. **windowView / memoryPanel** (effects): a frame within the frame (any world drawn clipped into a rect) and a remembered picture in a cream rounded border with a light wash.
7. **cupFumble** (motion): the flight of a small object juggled and caught at the chest, returned as offsets, rotation and a spill value.
8. Engine-side note for the series files, not the Library: `abPerson` in the series `ab_cast.js` should copy `D.hands` back to `P` (done in ALI-05) so `a2Hand(P)` finds the drawn hands.
