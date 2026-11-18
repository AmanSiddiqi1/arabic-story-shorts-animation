# AN-097 library proposals (story code in src/, move after approval)
- `soldier` costume preset: helmet with point and neck cloth (`a97Helmet`), spear held at a hand (`a97Spear`, `a97SpearFree`); generic `personFrame(P)` matrix (`a97M`, `a97Pt`, `a97Head`, `a97OnBody`) so props can ride on any person.
- `chest` (treasure chest with open lid, heap, coin count) (`a97Chest`), `coinPile` / `mound` (`a97CoinPile`, `a97Mound`), `coin` (`a97Coin`).
- `sack` (coin sack with mark and squash) (`a97Sack`), `purse` (`a97Purse`), `loaf` (`a97Loaf`).
- `jewel` + `jewelBox` casket with glint and glow (`a97Jewel`, `a97Casket`, `a97Glow` = goldGlow).
- `hourglass` panel time meter (`a97Hourglass`).
- `scroll` (`a97Scroll`), `musicNotes` (`a97Notes`), `prisonIcon` / fear cloud that cracks apart (`a97Prison`), `crackHeart` (`a97CrackHeart`), `tear` (`a97Tear`), `moth` (`a97Moth`).
- `iconBalloon` (`a97Balloon`), `inset` circle with dream wash (`a97Inset`, `a97Bust`), money `bar` with overflow (`a97Bar`), `lampPost` (`a97LampPost`).

## From v2 (Fable round 1)
- `casketHero` / held-glow rule: a glowing held object in a close shot keeps its lid behind and its rays inside a radius that clears the holder's face.
- `smileUnderMoustache` (`bigSmile` field): a person's smile drawn below the moustache, since the engine smile hides under `tache`.
- Thought cloud push-in: animate `thoughtCloud` w/h/scale/at together to grow it to the panel width (figures >= 110 px) and back.
