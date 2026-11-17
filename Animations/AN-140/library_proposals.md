# AN-140 library proposals (drawn in the story; integrate one at a time)
- `letterFrame` / `letterFrameClip` (src/a140_base.js `a140LetterFrame`, `a140LFClip`, `a140LFRect`): an open letter that grows from a panel rect to the whole panel, rollers top and bottom, seal; for flashbacks "inside" a letter, with a match cut in and out.
- `priceTag` (`a140Tag` + `A140_TAG_ICON`): amount tag with hole, icon slot and Bangers amount, slam-in pop.
- `pictureBalloon` (`a140Balloon`): rounded speech balloon with a tail and a clipped picture inside (single or wide strip).
- `portraitMedallion` (`a140Medal`): any person preset's head in a rimmed circle (rim colour per character), gaze/mouth/brow/wink.
- `bill` and `letter` scrolls (`a140Bill` with struck state and flat sheet, `a140Letter` rolled to open with a whole or broken seal).
- `purse`, `floorCushion`, `openChest` (`a140Purse`, `a140Cushion`, `a140Chest`), `heap` of chests and sacks (`a140Heap`).
- `mule` option on the donkey (here faked by a 1.1x stretch; a real option would shorten the ears and fill the tail).
- `personSilhouette` (canvas brightness(0) filter wrapper `a140Sil`) for persons in balloons and clouds.
