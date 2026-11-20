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
