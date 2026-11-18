# AN-097 Yahya the Barmecide and Mansur: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (b040c0d9...) and its `.mp3.words.json` (1841640c...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 171.24 s = plan duration 168.24 + end hold 3.0 (under 180). THE END at 168.3.
- Subtitles: chunk marks from the plan's `subtitles` (chunks_ar.txt / chunks_en.txt); align.py with the final words.json as whisper.json: 232/233 matched, 39 starts silence-refined. The P7 English gap is kept (plan default).
- Owner questions: all plan defaults taken.
- Source files: src/a97_props.js (props, effects, person-frame helpers), a97_cast.js (looks, Harun and Salih builders, palace A, merchant house, street), a97_hall.js (Yahya's hall day/night/dawn, palace B), a97_main.js (sets, camera, overlays, lettering, sound).

Decisions the plan left open or that the measured sets changed:
- No soldier preset exists: Salih is the Library servant costume (blue knee tunic, yellow sash) with `pal.head: 'helm'` (no Library headwear) and a story helmet and spear drawn in the figure's own frame (`a97M`, which repeats the acting/person transform chain).
- No throne/chest/sack/jewel/hourglass props in Library: the palace throne is palaceHall's own; the others are story drawings (see library_proposals.md).
- Yahya's hall = palaceHall wall 'ochre', no throne, dais 600..860, cushion at x 740 (plan 700; moved so the needy can stand in front of him). Night = navy wash plus lamp pools; the time of day in the door arch is skyCycle with a story sun that sinks inside the arch (the skyCycle sun arc never passes through the door).
- Merchant house: palaceHall merchant variant with the desk off (its coin stacks contradicted "six coins"); a story table x 340..520. Salih stands in the doorway at x 150, Mansur at 600.
- S6-S9 blocking: after the LATER card the chests stand at 230 (al-Fadl), 400 (strongbox), 570 (Jaafar); Mansur 120-200 and Salih 80 by the arch; Yahya on the dais edge at 830. For the handover (79.76) the sack stands on the dais edge (x 760) and Mansur at 690 on the floor, Salih at 485 behind the chests; Salih carries Jaafar's chest out.
- The million is a coin sack Mansur carries at hip height; the casket rides in front of it (not on top, which covered his face).
- S13: Salih enters with the chest (set at 610), Mansur sets the sack at 455 and backs to 240; Salih turns, takes the casket from the sack, kneels (0.6) with raised arms; spear laid on the floor while kneeling.
- S10 thought cloud: the palace set itself is drawn inside (scale 0.62); cloud-Salih kneels raising the casket, a dotted line links the jewel to a Yahya portrait, three chest icons stack, a small Mansur kneels and is freed. The cloud heart and the S14 heart use the same body point and size (a97Pt(H, 0, -122), r 20).
- S15-S16 verse balloon is world-space (left of Yahya, above Salih) so Yahya's hand can reach it to mend the heart; FEAR / SORROW group is a panel-space vignette at the upper left.
- "Counted" money: 600 found at Mansur's house (plan: "tiny number"); running total overflows to 1,250,000 for AND MORE!.
- Sound: chime 44.3, whoosh 60.6, chime 71.7, chime 168.5 (all in measured pauses / after the last word).
- Skipped: turban tassel lag (no Library field); treasurer's look-to-camera kept short; Harun's single raised eyebrow is a whole-brow raise (no per-side brow).

## v2 (revision from fable_review_1.md; details in review/revision_1.md)
- New story helpers: `a97CasketHero` (close-shot casket, lid behind, thin rays in a fixed radius) and `a97Smile` (visible smile under a moustache, via `P.bigSmile`).
- Chests after LATER moved to 370 / 520 / 670 (pair clear of the left edge); treasurer leaves before the runners; runner A leaves after delivering.
- شكر real onset 84.04 (silencedetect 80-87 s: silence 82.64-84.04 and 85.90-86.91).
- Review word times for S11 were one word early; staged on the timeline words (وقد 107.56, غلبه 108.14, الخوف 108.72).
