# Cloud rendering (GitHub Actions)

Normal production renders run on GitHub's free standard Linux runners (`ubuntu-24.04`), not on the Mac, **in the public repository** named in `tools/cloud/target.json` (unlimited free minutes, 4-core runners). Development stays in the private repository; `tools/git/sync_public.py` publishes a neutralised snapshot (made by `tools/git/make_public.py`, stamped with `SOURCE_REVISION.json`), and `cloud.py submit` refuses unless that snapshot is exactly the private HEAD. `cloud.py --private` targets the private repository instead (fallback; 2-core runners, 2000 min/month). The cloud runs the project's own
scripts unchanged: `Animations/<ID>/build.py` -> `render.mjs` (headless Chrome, frame by frame, ffmpeg H.264/AAC, loudnorm) -> `tools/production/qc.py`.

## Workflow
```
git add/commit/push                                          # private repo: source committed and pushed (main)
python3 tools/git/sync_public.py --push                      # publish the snapshot the cloud will render (dry run without --push)
python3 tools/cloud/cloud.py inputs KD-008                   # once per story: final narration MP3 -> 'narration-inputs' release of the PRIVATE repo (not Git)
python3 tools/cloud/cloud.py submit KD-008 KD-010            # one submission, several films; prints the run id
python3 tools/cloud/cloud.py status <run> --watch            # or: list
python3 tools/cloud/cloud.py fetch <run>                     # MP4 -> Animations/<ID>/renders/, QC -> Animations/<ID>/qc/, production.db updated
# review the film (Fable review pack, tools/review/make_pack.py); fix source, push, submit with --version v2 ...
python3 tools/cloud/cloud.py publish KD-008 --run <run> --version v1 --approved   # Release asset KD-008-v1 (only after the owner approves)
```
Interrupted session: `cloud.py list` shows recent runs (the title carries the stories), `fetch <run>` retrieves them. Nothing depends on local state.

## Safeguards
| Guard | Where |
|---|---|
| Never on push; only `workflow_dispatch` by the repo owner | render.yml |
| <= 10 renders at once (raised from 2 on 2026-11-18; GitHub Free allows 20 concurrent jobs per account, shared by all its repositories) | `strategy.max-parallel: 10` |
| 1 batch run at a time (a second waits; GitHub keeps only ONE pending run and cancels older pending ones, so the client refuses to submit while a run is active, or waits with `--when-idle`) | workflow `concurrency` + cloud.py |
| 60 min per film; standard runner only | `timeout-minutes` |
| 1 retry, transient failures only, first 20 min; deterministic failures (build, page errors, QC, checksum) never retried | render_one.py |
| Identical render skipped (same source + Library + engines + settings + narration => same fingerprint => live artifact exists) | plan.py (`--force` / `submit --force` overrides) |
| <= 10 films per submit (raised from 8 on 2026-11-18, to match max-parallel 10); > 3 needs `--yes` (ask the owner); <= 100 runs per rolling 24 h (local runaway backstop; raised from 12 on 2026-11-18; GitHub sets no such limit) | cloud.py + plan.py |
| Same unchanged source failed twice => refused | cloud.py ledger |
| Artifact quota (free 500 MB, one film ~220 MB) checked before submit | cloud.py; `purge` frees it |
| Test renders: artifacts, 3 days. Approved films: Release asset (2 GB limit, not counted in the quota, not in Git history) | render.yml / publish.yml |

Limits that cannot be shared: GitHub concurrency and `max-parallel` apply per repository/workflow. Another repository (for example the public
snapshot) has its own independent pool; the 10-render cap is not shared between repositories.

## Details
- **Narration.** Only the final combined MP3s from `Audio Files/Final Done/` are used (never the paragraph clips, pauses or other production folders). They are not in Git. They sit in the `narration-inputs` Release of the PRIVATE repository; the public runner reads them with two Actions secrets on the public repo: `NARRATION_REPO` (owner/name of the private repo) and `NARRATION_TOKEN` (fine-grained token, Contents: read on that one repository, nothing else). The runner checks each file's SHA-256 against `production/state.json`. Putting the MP3s in the public repo's own release is possible (`inputs --to-render-repo --confirm-public-rights`) but only after the owner has cleared the rights.
- **Visibility.** In a public repository, run logs and artifacts (including the rendered MP4 with its narration) can be downloaded by any signed-in GitHub user for the 3-day retention. Unreleased films are therefore not private while they are test artifacts.
- Engines are fetched at pinned commits (`deps.json`): Lemo-Opuscar (Playwright) and claude-motion-faceless-skills. Changing a pin changes every fingerprint.
- Checks on the runner: narration checksum, build (missing assets), no page errors, ffmpeg success, frame count = player duration x 30, `qc.py` (H.264 1080x1920 30 fps, AAC 48 kHz, full decode, duration/end hold <= 180 s, loudness, narration sync, black/frozen frames). A film that fails QC is never uploaded; its report and logs are (artifact `FAILED-...`).
- Automated QC is technical only. Visual review (acting, staging, captions) still needs the Fable review.
- Local fallback: `tools/production/render_queue.py` (unchanged) for troubleshooting or when GitHub is unsuitable.
