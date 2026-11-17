# Opus revision brief, v2 (completion loop 2026-11-17). Replace <ID> with the story id given to you.

Stage `revise`: implement the v2 revision from Fable's review, following .claude/agents/opus-animator.md and CLAUDE.md. Working directory: repository root.

Inputs: Animations/<ID>/review/fable_review_1.md (the creative direction: implement every BLOCKER/MAJOR note and the MINOR notes that are cheap and safe), the v1 pack Animations/<ID>/review/v1_pack/ (strips and extra/ frames show v1), planning/creative_plan.md, Library/Animation_Capabilities_Guide.md.

Changes to the normal procedure (production renders run in the cloud):
- Do NOT run a full render; write nothing into Animations/<ID>/renders/ or MP4s/. The coordinator renders v2 on GitHub Actions.
- Verify with stills (stills.mjs) and contact sheets (sh.sh / sheet.py) at every changed time range, written under scratch/<ID>-v2/. Look at the stills yourself and iterate until each note is visibly addressed. Short test clips only with --out into scratch/.
- Run `python3 tools/production/implcheck.py <ID>` until it reports PASS.
- Keep narration, Arabic/English subtitle text, chunking and word timing unchanged; film length unchanged and <= 180.0 s; Halftone Pop look. Work only in Animations/<ID>/ (Library frozen; reusable ideas go in library_proposals.md). Do not git commit.
- Write Animations/<ID>/review/revision_1.md: one line per review note: DONE / PARTLY / SKIPPED, what changed (with times), why for anything not done.

Final reply (8 lines max): implcheck result, film duration, notes done/partly/skipped, risky areas a second review should check.
