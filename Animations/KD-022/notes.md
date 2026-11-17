# KD-022 implementation notes (v1, code only)

Film length 174.9 s (narration 171.487 + 3.4 s THE END hold, from the plan). Cues use the plan's word times (timeline.md); subtitles are the plan's chunks (chunks_ar.txt / chunks_en.txt), rebuilt verbatim by align.py from the final .words.json.

Decisions the plan left open, or changes measured on the actual sets:
- Sickroom layout: bed x 450..890 with the head on the right (prince head about (794, 729), s 1.2); king behind the bed at x 640; the old physician's stool at x 885, in front of the bed head (not x 440), so his "nose-near" examination is possible. The door at the left, carpet chest x 170..400 in front.
- S2: the physician enters with three stick taps, then a cut at 28.9 to him already seated (the walk from the door to the stool is too long for 1.9 s).
- S7: the king holds the bowl to his son's lips himself (the official carries it to the bed foot and takes it back); the official standing at the bedside covered the king and the prince. The separate "king lifts the head" beat is folded into this.
- S8: the official with the bowl stands at x 630, the king plants himself at x 470, then steps back to 560 for the cold order so the official can step in.
- Store: the reachable shelf is the lowest (y 620): the recipe jars and the red poison jar (x 710) are on it, not on the middle shelf, because a standing figure at s 1.35 cannot reach above y about 610. The man's legs are hidden by the worktable, so his moves along the shelf are slides with a bob.
- S5 "brown jar": he takes the green jar down (the one within reach).
- S10 end: the old physician taps back and sits on his stool (172.4).
- The plan's chunk 7/2 splits "العلاج | الصحيح؟»" across two subtitles; kept as planned.
- The quack uses the beanSeller body (no beard, moustache) recoloured, with his own detachable turban (k22turban) so it can slip over his eyes and roll away.

## v2 (Fable round 1) blocking decisions
- Stool moved to x 925. In S2 the king steps back behind the bed to x 500 for the tray beat; the tray is held low in front of the physician (x ~760, y ~840).
- S7/S8: the tall official carries the bowl to the king, then leaves through the door (117.6). He comes back on 142.1, passes behind the man, takes the bowl from the bed (rest point K22BOWLBED 604,764) and holds it out at x 490. He backs out right after the S9 hand-over and is not in S10.
- The man is at x 255 for S8 and the king steps back to x 700 for the order. In S10 the king kneels at x 505 and the physician stands at x 650 to the end (he does not sit back down). The turban settles at x 425.
- Face overlays (flush, green) are drawn with multiply, eyes cut out, capped alpha (proposal: Library faceFx "under the features" rule).
