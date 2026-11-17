# AN-084 Library proposals (from src/an84_props.js)

- `cucumber` / `produceBasket`: cucumber; woven basket (bottom-centre anchor) with cucumber, coin or empty fill and an optional handle; `pannier(ctx, seat, dir, s)` hanging from `mountSeat()`.
- `priceTag` + ladder state: notched tag with Bangers price, strike slash, red lock, rays (`an84Tag`, `an84TagState`).
- `coinPile(ctx, x, y, fill)`, `coin`, `moneyBag` (sack with a coin mark).
- `throne` as a separate prop (back + arms, base height, can rotate) for palaceHall `throne: false`.
- `spear` (guard spear with tassel), `huntingBow`, `scroll` (rolled / open ledger).
- `insetCircle` (round recall inset with brush ring), `glint`, `sweatDrop`.
- Helpers: `riderPt(seat, dir, s, hx, hy)` (world point of a rider's body-local hand target), `gestureTrack(t, list, rest)` (eased hand-target segments).
