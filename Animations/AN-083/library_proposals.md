# AN-083 library proposals (story code in src/an83_props.js; not moved)
- `waterskin` (an83Skin): goat-skin bag with fill, tilt, squeeze, slosh, glint.
- `quiver` (an83Quiver): flap open 0..1, n fletchings, rot.
- `goldArrow` / `arrowBundle` (an83Arrow, an83Bundle): gold or plain head, glint; fanned bundle with per-arrow glints.
- `bow` (an83Bow): stave with drawable string (pull).
- `purse`, `coin`, `bread`, `scroll` (unrolling with verse lines), tick/cross marks, icon badge, open-hand, robe and attendants icons.
- `insetCircle` (an83Inset): iris open, dotted coloured rim, inner draw space.
- `heatShimmer` (an83Heat), `goldGlow` (an83Glow), `groundShadow` (an83Shadow, stretches in late light), crossed `spears` silhouette.
- Person helpers: `an83W`/`an83L` (local <-> world incl. lean, tip, squash), `an83HandL`/`an83HandW` (true hand position from IK, reach-limited), `an83Local` (draw props in a figure's space). Useful for any prop handover.

## v2 additions (from fable_review_1)
- `arrowBundle` heads-up sheaf: five arrows fanned wide above the grip, heads staggered in two rows, `head` size multiplier and small cream fletching (`an83Bundle`, `an83Arrow` options `head`, `fl`, `flc`, `facet`). Proposed as `arrowBundle({ up: true })`.
- Panel-space `insetCircle` rule: draw insets after the world in panel coordinates, fade the sun (`an83SunA` windows) while open; inner content zoomed about its ground point (`AN83_VZ(c, f, zoom, dx)`).
- Camera helper `an83Ck(t, x, zoom)` putting feet at a fixed fraction of the panel height (`AN83_FY`).
- "Reveal insert" pattern (an83InsertDraw): plain gradient, one arm from the frame edge, one prop, radial burst on the cue word.
- Drawstring `purse` with gathered frill and cord ends; falling dust and moth for "empty purse".

## v3 (round-2 review)
- Held-prop face clearance clamp (`an83_cast.js`, bundle loop): lowers the holding hands until a held sheaf's top is >= 10 screen px below the holder's chin (zoom-aware), slide-in-fist fallback; deliberate raises are separate props. Candidate for a shared held-bundle helper.
- `an83Purse` v3: limp leather drawstring pouch with swinging sides and gravity-hanging drawstrings (`flap`, `t` options).
