# Fable review brief, round 2 of v2 (completion loop 2026-11-17). Replace <ID> with the story id given to you.

Follow .claude/agents/fable-reviewer.md. Working directory: repository root. This is the second (and last full) review: check whether v2 fixed round 1, and whether it introduced new problems.

Material:
- Your round-1 review: Animations/<ID>/review/fable_review_1.md; the animator's change log: review/revision_1.md (DONE / PARTLY / SKIPPED per note, with risky areas).
- v2 film: Animations/<ID>/renders/<ID>_v2.mp4 (cloud render, QC PASS), pack review/v2_pack/ (strips at 4 fps with time stamps, narration.txt). v1 pack for comparison: review/v1_pack/.
- Look at EVERY v2 strip covering a changed range and the risky areas, and skim the rest for regressions. Pull full-size frames with ffmpeg into review/v2_pack/extra/ where detail matters. A code-only review is not acceptable.

Write Animations/<ID>/review/fable_review_2.md. First line exactly `Verdict: PASS`, `Verdict: PASS WITH NOTES` or `Verdict: REVISE`. Include a table: each round-1 note -> FIXED / PARTLY / NOT FIXED / REGRESSED, with a short comment. REVISE only if significant problems remain (a story beat still not readable, a new staging error, a BLOCKER); then list at most 5 targeted, concrete fixes for ONE final correction pass (v3). Minor polish goes under PASS WITH NOTES and does not trigger v3.

Never change narration, subtitle text or timing; edit no other file. Final reply at most 6 lines.
