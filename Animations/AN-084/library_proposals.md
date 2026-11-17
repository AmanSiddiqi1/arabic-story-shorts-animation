# AN-084 Library proposals (from src/an84_props.js)

- `cucumber` / `produceBasket`: cucumber; woven basket (bottom-centre anchor) with cucumber, coin or empty fill and an optional handle; `pannier(ctx, seat, dir, s)` hanging from `mountSeat()`.
- `priceTag` + ladder state: notched tag with Bangers price, strike slash, red lock, rays (`an84Tag`, `an84TagState`).
- `coinPile(ctx, x, y, fill)`, `coin`, `moneyBag` (sack with a coin mark).
- `throne` as a separate prop (back + arms, base height, can rotate) for palaceHall `throne: false`.
- `spear` (guard spear with tassel), `huntingBow`, `scroll` (rolled / open ledger).
- `insetCircle` (round recall inset with brush ring), `glint`, `sweatDrop`.
- Helpers: `riderPt(seat, dir, s, hx, hy)` (world point of a rider's body-local hand target), `gestureTrack(t, list, rest)` (eased hand-target segments).

## v2 additions (revision 1)
- `an84ColP` / `an84RowP` + `an84Tag` struck state: a screen-space (panel-unit) price-tag ladder that camera pushes never crop, with a "struck but legible" state (dimmed paper-yellow, digits redrawn over a thin slash). Candidate `priceLadder` overlay.
- `an84Aside(P, t, t0, d)`: setup/payoff pose function (finger to lips, wink, corner smile to the lens) reused for a recognition beat.
- `an84Grin`: visible grin over a full black beard (the Library's white arc is thin at phone size).
- `an84Palace`: far palace silhouette (dome between two towers) for desert horizons.
- `an84Cucumber(..., bite)`: bitten food via an even-odd clip.
