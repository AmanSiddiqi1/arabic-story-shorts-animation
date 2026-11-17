# AN-046 library proposals (drawn in src/, not moved into Library/)
- `peacock` character (a46peaRaw / a46pea, a46peaHead): fan 0..1 with stagger and shimmer, neck, bow, preen, crest, wing/wingA, sit, tap, crown, gulp, walk, silhouette. src/a46_parts.js
- `crownProp` (a46crown, ghost dashed variant with "?"), `officeBadge` loose prop (a46badge, limp), `glint` (a46glint).
- `fishingNet` states roll, spread (unroll u, pegs, pull rope), bag (snap k, wobble, inside), thrown, draped (tent, bulge, back/front passes) and `meshShadow` (a46net, a46meshShadow, a46mesh, a46rope).
- `birdCage` (a46cage, from KD-031 k31cage), `bindle` (a46bindle), `grainPile` (a46grain, a46grainDot).
- `fightCloud` (a46fight), `featherFall` (a46featherFall), `picBalloon` (a46picBalloon), `dreamWash` (a46dream), `iris` (a46iris), `halftoneWipe` (a46wipe), `stampX` / `stampTick`.
- Sets: `rockyHill` summit terrace (a46SummitL: terrace slab, ledge, throne rock, post, peaks, cloud band), glade with fork nest and lookout branch.
- Hunter overlay (cap feather, stubble) on the beanSeller costume: a candidate `hunter` costume preset.

## v2 additions (candidates)
- a46medal: office badge (medal + ribbon tails) sized for small birds, limp variant for the dust.
- a46bird wrapper idea: badge/cover/glint/tint overlay over Library birds (tint via ctx.filter for palette variants).
- a46upper: draw a figure again clipped above a belt line (waist-deep in a bush or crowd).
- a46ghostSp: dashed outline of an absent character.
- thrown net (see-through lattice, opening bundle, trailing rim weights) and ground bag with poking beaks.
