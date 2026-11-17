# AN-083 library proposals (story code in src/an83_props.js; not moved)
- `waterskin` (an83Skin): goat-skin bag with fill, tilt, squeeze, slosh, glint.
- `quiver` (an83Quiver): flap open 0..1, n fletchings, rot.
- `goldArrow` / `arrowBundle` (an83Arrow, an83Bundle): gold or plain head, glint; fanned bundle with per-arrow glints.
- `bow` (an83Bow): stave with drawable string (pull).
- `purse`, `coin`, `bread`, `scroll` (unrolling with verse lines), tick/cross marks, icon badge, open-hand, robe and attendants icons.
- `insetCircle` (an83Inset): iris open, dotted coloured rim, inner draw space.
- `heatShimmer` (an83Heat), `goldGlow` (an83Glow), `groundShadow` (an83Shadow, stretches in late light), crossed `spears` silhouette.
- Person helpers: `an83W`/`an83L` (local <-> world incl. lean, tip, squash), `an83HandL`/`an83HandW` (true hand position from IK, reach-limited), `an83Local` (draw props in a figure's space). Useful for any prop handover.
