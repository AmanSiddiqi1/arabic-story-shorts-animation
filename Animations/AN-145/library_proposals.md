# AN-145 library proposals (drawn in src/, not yet in Library/)

- `pyramidSite(ctx, {view: 'far' | 'face' | 'section', ...})` (set, `src/m5_sets.js`: `m5Far`, `m5Face`, `m5Section`): three views of one pyramid. Far: three pyramids on dunes with skyCycle, shadow from the sun, scar, outline, pulses. Face: stepped wall of seeded blocks (courses 170 high, staggered joints), `dig` 0..1 (chips, dent, arched opening with rubble), chalk `xMark`, dashed `outline`, `upper: false` + `blocks(c)` for a building replay. Section: cutaway with tunnel `len`, torch `light`, hidden niche with `breach` and `hoard(c)`, legend chambers with dashed passages, contents, `dark` and question marks.
- `desertCamp` night state (`m5Camp`, `m5Fire`): tent, mat, pyramid silhouette with a moonlit rim, fire with a halftone glow.
- `pickaxe(ctx, x, y, ang, s, bend)` (`m5Pick`), `shovel` (`m5Shovel`), `torch` with light (`m5Torch`, `m5Glow`).
- `strikeCycle(t, hits, o)` + `strikePose(P, r)` (`m5Strike`, `m5StrikePose`): front-facing person swing with both hands on the shaft (arm angles + tool angle), contact time exact, rebound.
- `balanceScale(ctx, x, y, tilt, {left, right, level})` (`m5Scale`): table, post, beam, chained pans with content callbacks; returns pivot and pan points.
- `treasureChest(ctx, x, y, {open, fill, old, jewels, rot})` (`m5Chest`), `coinMound` with ghost state (`m5Mound`, `m5Ghost`), `m5Coin`, `m5Gem`.
- `ledger(ctx, x, y, {open, fill})` + reed pen (`m5Ledger`, `m5Pen`).
- `legendIcons` (`m5Icon`: gems, swords, books, throne, scroll, pyramid, hourglass) with a dashed `ghost` state.
- `priceTag(ctx, S, x, y, label, value, p, colour)` (`m5Tag`).
- `sandDissolve(ctx, key, box, draw, p, t)` (`m5Sand`): a figure crumbles from the head down into wind-blown grains (cached layer, pure in t).
- `insetCircle(ctx, cx, cy, r, k, at, zoom, draw)` (`m5Inset`).

## v2 additions (Fable round 1)
- `tunnelInterior(ctx, t)` (`m5TunBack` / `m5Tun` / `m5EndWall`): close interior of a stone passage (back wall, rubble floor, breakable end wall with crack and tumbling blocks) for big figures inside a monument.
- `flatLight(ctx, x, y, r, a)` (`m5Light`): process-yellow light disc with a ring of yellow dots, drawn behind figures (never over faces).
- `planOutlinePeel` (`m5Chips` with `m5DashRect`): a red dashed plan outline that peels off left to right as falling red chips (an intention given up).
- `equalsBars`: a plain two-bar equals sign drawn as shapes (S9 overlay) instead of the lettering font; `m5Mound(..., {red: true})` for a same-shape cost pile.
- Pattern: time-lapse strike cycles on a warped clock (`m5S6W`, closed-form piecewise speed ramp), pure in t.
- Guide note: in the 1000 x 1230 desert world, people scenes read at zoom 1.5 or more with the ground in the lower third; zoom 1.0 only for short scale shots.
