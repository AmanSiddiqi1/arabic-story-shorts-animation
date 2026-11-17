# AN-151 library proposals (drawn in src/, not moved to Library/)

- `bigTurban` (src/il_base.js `ilTurban`): oversized turban at a head centre; fields s, rot, wob, slump (0..1, `side`, `even`), hopY, feather, tail, squeeze (jam), glint. Pair with `ilHead(P)` (world head centre/scale/rotation of a costumed person, mirrors personCostumed + acting) for any worn prop.
- `letterSheet` (`ilLetter`): letter with a portrait medallion, right-aligned squiggle lines, seal; rot, fold, crumple, read (lines turn blue right to left), portrait gaze.
- `writingTablet` (`ilTablet`): school tablet with handle tab, ink bands (0..4), glow band, optional letter.
- `quilt` (`ilQuilt` unroll from a tied bundle, `ilQuiltWrap` rolled round a lying figure with a spiral end).
- `candleSnuffer` + `candle` (`ilSnuffer` dip, `ilCandle` flicker, out, smoke curl).
- `worryScribble` (`ilWorry`), crooked idea bulb (`ilBulb`), green tick (`ilTick`), sweat drop, snore bubble, zigzag flash, impact stars.
- `mosqueFront` (`ilMosqueBack`, IL_MOSQUE geometry: wall, pointed door, dome with crescent, minaret) and the hanging `schoolSign` (`ilSign`: drop + swing on chains).
- `letterFrame` / `letterWorld` (`ilLetterFrame`, `ilLFRect`; also in AN-140): a picture that grows out of a held page and back.
- `picBalloon` (`ilPicBalloon`): speech balloon with a picture inside, world units.
- Motion: `handOver` (letter flies hand to hand over 0.25 s with a dip), `sneak` (stepped keyframe distance with high-knee amplitude, IL_SNEAK), `ilHandW` (world hand position from targets or arm angles).
