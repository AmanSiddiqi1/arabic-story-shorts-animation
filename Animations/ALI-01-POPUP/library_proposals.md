# ALI-01-POPUP: Library proposals (drawn in this story's src/, for the coordinator to integrate one at a time)

1. **abSprite / abPut / abLive (paper-popup performance helpers)** (`src/ab_kit.js`): bake a set piece once through `castFinish` and draw it with a pop factor, pivot, sway or slide; finish live actors on a small fixed off-screen canvas (about 2x faster than `castFinish` on the full frame). Candidate for `Library/styles/paper-popup/` as a style helper, with a per-spread cache (`abMem`).
2. **sesameRock** (`abRockPts`, `abRockHalfArt`, `abRockBackArt`, `abRockArch`, `abGoldFan`, crack line in `ab_forest.js`): the great rock with a hidden door; whole card, two halves split on a zigzag, dark pointed arch with gold rim, gold fan; palette-aware (day, dusk). Any "door in the rock" or cave-mouth story.
3. **paper tree / bush / fern with palettes** (`abTreeArt`, `abCrowns`, `abBushArt`, `abFernArt`): palette-aware twins of `tree()` / `bush()` (day, dusk, dawn), with an optional climbing slot.
4. **thiefChain** (`abThiefChain`): concertina paper-doll riders unfolding panel by panel; any crowd in the pop-up style.
5. **pullTab, sunOnStick, slideStrip** (`abPullTab`, `abSunStick`, `abSlideStrip`, `abSlot`): the visible paper mechanisms of the pop-up style.
6. **cart** (`abCart`): two-wheeled cart with shafts, wheel angle from distance, heaped flat sacks.
7. **small props**: `abAxe`, `abWoodBundle`, `abSack` (fill 0..1, coin mark), `abCoin`, `abCoinPile` (gold or silver), `abMoth`, `abStar`, `abDust` (paper puff), `abSignArt` (signpost), `abQCard`.
8. **storyCard and mapCard** (`abStoryCard`, `abMapCard`): picture card with the miniature rock that opens; scrap map that draws itself (draw 0..1).
9. **treasureCave** (`ab_cave.js`: print, stalactite cards, heaps, chest with flipping lid, stars on strings, sliding slab): cave cross-section spread.

## Added in v2 (Fable review 1)
10. **pull-tab driven mechanism** (`abRockState` + `abRockTab` + printed groove in `ab_forest.js`): one eased value drives a tab in its slot and the mechanism it opens (halves in lockstep, back() overshoot, rock on stop, squash and paper puff on closing, jerk/twitch pulses). Generalises `abPullTab` from a decoration to the style's "the tab does it" grammar.
11. **into-a-slot clip** (`abDoorClip`, `ab_forest.js`): a walker drawn between two cards and clipped to the doorway region (arch plus everything beyond the seam), so he slides behind the front card instead of fading; opaque navy `source-atop` shade for depth. For any character entering a building, cave or tree in this style.
12. **concertina v2** (`abChain2`, `ab_kit.js`): paper-doll chain anchored at one end, each panel opening with its own back() overshoot, alternate panels turned (narrower, sheared, shaded); split into two finished layers for speed.
13. **peekFlap** (leaf flap with an eye gap, `ab_forest.js`): hinged foliage card, the hider clipped behind it with a "toes" gag field, eyes driven by gaze / lid / wink, dozing z's.
14. **hangCard** (`ab_hut.js` picture card): a card dropping in on two strings, swinging with `swing` + `idleSway`, rising out again.
15. **caveArch spread** (`ab_cave.js` v2): layered arch cards filling the board, stalactites hinged on the arch's underside, doorway card with the outside inside it, sliding slab on a tab.
16. **abFold** (`ab_kit.js`): a stronger crease (deeper `bookFold`, ink line and highlight). Could become a `bookFold` option.
