# AN-149 library proposals (drawn in the story, not moved to Library/)

- `writingTablet` (sm_props.js `smTablet`): lawh board with handle tab and ink bands; s, rot, n lines.
- `oud` (`smOud`): pear-body lute with bent pegbox, rose and strings; draw after the person and redraw the strumming hand.
- `musicNotes` (`smNotes`): quavers on seeded S-paths from a point (or a moving source) toward an optional target. Overlaps AN-124 `musicNotes`; merge.
- `iconBalloon` (`smBalloon`): smooth speech balloon with one pointed tail and a clipped picture inside (balloon-local units). Overlaps AN-124 `iconBalloon`; merge into one function.
- `mysteryFace` (`smMystery`): paper disc with a blue question mark over a person's face (works seated, riding, child).
- `bookStack` / `book` (`smBook`, `smBookStack`): closed or open book; stacks with pop-on.
- `graveMarker` (`smGrave`): rounded stone on a mound, rise from the ground, grey variant.
- `dreamWash` (`smDreamWash`): blue halftone corner vignette for told flashbacks.
- `goldGlow` (`smGlow`): rays and star glints behind a figure.
- `lampIcon`, `smTick`, `smCross`, `smEyeIcon`, `smMedallion` (knowledge emblems), `smClosedBoard` (swinging CLOSED sign), `smImpact` (knock lines), `smSpeed` (whip-pan lines).
- Set pieces: `schoolRoom` dressing (mats, cushions, book stand with lesson tablet, tablet shelf: `smSchoolDressing`, `smStand`, `smMat`, `smCushion`) and the window-bust pattern (`smTeachWin` + `smBust`: person clipped to a townWindow with a sill ledge on top).

## v2 additions (Fable review 1)
- `graveMarker` gained `noMound` (stone only, for stacking it on other props).
- `riseFromGround` reveal pattern (S15 tower): clip the content to the ground line and slide it up with `settleTo` instead of hiding it behind a cover patch. Guide rule proposed by Fable: never hide a later reveal behind a colour-matched patch; and props inside "evidence" pictures must not share a silhouette with the thing being denied (milestone vs grave).
- `panelWashUnderFigures`: draw a panel-space vignette (dream wash) between the set and the figures (store the panel transform before `K.camera`, `setTransform` it inside the segment) so characters keep full colour.
- `compareInsert` (S13): two stacked framed pictures on a Ben-Day field with caption labels and a thought tail to a bust; reusable for "what was said vs what he assumed".
