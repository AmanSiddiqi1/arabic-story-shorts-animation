# SIND-02 library proposals (for the coordinator; Library/ is not edited from this story)

All are in this story's `src/` as separate files, one function per drawing, header comments with fields. Proposed after approval:

1. **roc** (`src/sb_roc.js`: `sbRoc`, `sbRocAnkle`, `sbRocFlap`): a gigantic gentle bird, side view, back/front passes so an egg or a
   rider can go between; fields spread, flap/flapLag (follow-through), nearA/farA (display spread), crouch, sit (brooding), neck, headTurn,
   beak, lid, gaze, shake, feet, reach, tuck, sil (silhouette), hipN/hipF. For any roc, simurgh, phoenix or giant bird.
2. **rocEgg** and **giantFeather** (`src/sb_roc.js`: `sbRocEgg`, `sbFeather`, `sbFeatherFall`).
3. **snake** (`src/sb_snake.js`: `sbSnake`, `sbCoilPath`, `sbResample`): a body on any path with a travelling wave, out, rear, yawn,
   tongue, sleepy lids, three palettes (planned name "snake").
4. **diamondValley / valleyRim / skyFlight** (`src/sb_valley.js`): a gorge with a vertical camera, live ledges, a stick nest; the rim
   terrace; three tileable mountain ranges for flights.
5. **woodedIsland / rocNest** (`src/sb_island.js`): the wooded island strip in two light models, the far island, the nest clearing with logs.
6. **Props** (`src/sb_props.js`): `sbGem` + `sbGemScatter` + `sbRays` (jewels colour 'diamond'), `sbSlab` (meatSlab), `sbCloth` + `sbSag` +
   `sbBow` (turbanCloth line), `sbPouch` (sashPouch), `sbEaglet`.
7. Series kit additions (`src/sb_kit.js`, `sb_ship.js`, `sb_sets.js`, `sb_cast.js`): sbFace `bare`, dhow `stripe`, harbourQuay 'port',
   `sbHairTufts`, valley traders (for SIND-06 to copy with the rest of the series files).
