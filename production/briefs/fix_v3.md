# Opus fix brief, v3 (completion loop 2026-11-17). Replace <ID> with the story id given to you.

Stage `fix`: ONE final targeted correction pass from Fable's second review, following .claude/agents/opus-animator.md and CLAUDE.md. Working directory: repository root. This is the last allowed round (no v4), so be precise and conservative.

Inputs: Animations/<ID>/review/fable_review_2.md (implement every BLOCKER and each listed v3 fix; optional polish only if trivial and safe), review/revision_1.md (what v2 changed), v2 pack review/v2_pack/ (strips + extra/ frames show v2).

Rules (production renders run in the cloud):
- Do NOT run a full render; write nothing into renders/ or MP4s/. The coordinator renders v3 on GitHub Actions.
- Change only what the fixes need; do not restage anything else. Verify with stills/contact sheets at every fixed time range AND one frame either side, written under scratch/<ID>-v3/. Look at them and iterate until each fix is visibly done.
- Run `python3 tools/production/implcheck.py <ID>` until PASS.
- Narration, subtitle text, chunking, word timing and film length unchanged; Halftone Pop look; work only in Animations/<ID>/ (Library frozen). Do not git commit.
- Write Animations/<ID>/review/revision_2.md: one line per fix: DONE / PARTLY / SKIPPED, what changed (times), why for anything not done.

Final reply (6 lines max): implcheck result, fixes done/partly/skipped, anything still uncertain that the owner should look at.
