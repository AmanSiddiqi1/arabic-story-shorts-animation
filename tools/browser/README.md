# Safe-Chromium guard (local headless Chromium on this Mac)

**Why.** On 2026-11-18, during the completion loop, this MacBook Pro (Intel UHD Graphics 630) had a kernel panic involving `chrome-headless-shell`, and a GPU hang was logged the same evening. Full renders already ran on GitHub Actions, but the animator agents still started many local headless browsers for stills, contact sheets and `implcheck`. On macOS, Lemo-Opuscar's `core/render/browser.mjs` launches every one of them with `--use-angle=metal --enable-gpu --ignore-gpu-blocklist`, which puts the Intel GPU to work even though the films are plain 2D canvas.

**What it does.** `safe-chromium.cjs` is a Node preload. It wraps `playwright-core`'s `chromium.launch()` in every local Node process, without changing Lemo-Opuscar or any story script:

1. **CPU rendering.** It removes the three GPU flags and adds `--disable-gpu`. The 2D canvas is then drawn on the CPU (Skia), and WebGL, if anything used it, would run on SwiftShader. The Intel GPU is not used.
2. **At most 2 browsers at once** across all processes on this Mac. Each launch takes a slot, a directory `slotN/` in `$TMPDIR/arabic-story-shorts-browser-slots/`, and waits while both slots are busy. Agent reasoning and all non-browser work (Python, ffmpeg, other Node) never wait.
3. **No permanent stalls.**
   - A slot is freed when its browser closes or crashes, or when its process exits (including Ctrl-C and SIGTERM).
   - The next waiter reclaims a slot whose holder process is gone (for example after `kill -9`), whose holder stopped its 15 s heartbeat for 120 s, or that has been held for more than 90 minutes.
   - A launch that has waited 30 minutes fails with an error that points here, instead of waiting for ever.

**Where it is switched on.** `.claude/settings.local.json` (this Mac only, git-ignored) sets:

```json
{ "env": { "NODE_OPTIONS": "--require \"<absolute path of this checkout>/tools/browser/safe-chromium.cjs\"" } }
```

That covers every Claude Code session opened in this project folder, its subagents (Opus animators, Fable reviewers) and everything they run (`stills.mjs`, `sh.sh`, `implcheck.py` → `smoke.mjs`/`scan.mjs`, `regression.mjs`, `catalogue.mjs`, a local `render.mjs`). It does not affect other projects, your own Terminal (unless you export the same variable), or GitHub Actions, where the runner never sets it and renders exactly as before.

**Measured on this Mac (2026-11-19).** Times with `--disable-gpu` are about the same as with Metal, and the frames are visually identical:
- 8 stills: 3.1-3.6 s.
- 6-frame contact sheet: 3 s.
- Library regression test: "all identical", 192 s vs 184 s.
- Frame differences from Metal are anti-aliasing noise only: about 1.5/255 mean, PSNR 36-40 dB. The frames are slightly closer to the cloud render than Metal's.

The one slow part was the every-frame scan in `implcheck` (353 s vs 92 s). `tools/production/scan.mjs` now splits it over several pages of one browser (default 6 pages; tools/production/scan.mjs `PAGES_DEFAULT`), which gives the same report: about 80-125 s instead of 353 s, against 92 s with Metal on one page.

## Settings (environment variables, all optional)
| Variable | Default | Meaning |
|---|---|---|
| `ASS_BROWSER_GPU` | `disable-gpu` | `disable-gpu` (CPU), `swiftshader` (GPU emulated on the CPU, 4-9x slower), or `off` (keep Lemo's Metal flags; the slot limit still applies) |
| `ASS_BROWSER_SLOTS` | `2` | browsers allowed at once |
| `ASS_BROWSER_WAIT_MAX_MIN` | `30` | a launch fails after waiting this long |
| `ASS_BROWSER_STALE_S` | `120` | a slot with no heartbeat for this long is reclaimed |
| `ASS_BROWSER_HOLD_MAX_MIN` | `90` | a slot held longer than this is reclaimed |
| `ASS_BROWSER_LOG` | unset | file to append acquire/release/reclaim events to |
| `ASS_BROWSER_QUIET` | unset | `1` hides the "waiting for a browser slot" note |
| `SCAN_PAGES` | `6` | pages used by `tools/production/scan.mjs` (or `--pages n`) |

## Diagnose and recover a stalled browser queue
Symptoms: a stills or implcheck command prints `[safe-chromium] waiting for a browser slot` and doesn't continue, or fails with `no browser slot free after 30 min`.

```bash
node tools/browser/queue.cjs status
```
This shows whether the guard is on in this shell and, for each slot, the holder's pid, how long it has been held, the heartbeat age, its command and folder, and `STALE: <reason>` when it would be reclaimed.

1. **A slot is STALE.** The next launch reclaims it by itself. To free it now: `node tools/browser/queue.cjs reset`.
2. **Both slots are active and held by real jobs** (for example two implchecks): wait. A scan takes about 1.5-2 minutes.
3. **A holder is alive but hung** (its heartbeat keeps going but nothing progresses): look at it with `ps -p <pid> -o pid,etime,command`, stop that one process (`kill <pid>`; its slot is freed on exit), or wait for the 90-minute limit.
4. **Last resort** (nothing local is rendering): `node tools/browser/queue.cjs reset --all`.

## Turn it off
- **One command:** `NODE_OPTIONS= node Animations/<ID>/stills.mjs 10 20`, or keep the slot limit but use the GPU again with `ASS_BROWSER_GPU=off`.
- **For new Claude sessions in this project:** delete the `NODE_OPTIONS` line (or the whole file) in `.claude/settings.local.json`, then start a new session. Nothing else depends on it.
- **Fully undo:** do that, then `git revert` the commit that added `tools/browser/` and the parallel scan. `scan.mjs --pages 1` also restores the old single-page scan without a revert.

## Failure behaviour (tested 2026-11-19)
| Situation | Result |
|---|---|
| Holder killed with `kill -9` | Its slot is reclaimed by the next launch at once ("process … is gone") |
| Holder frozen (SIGSTOP) | Reclaimed once its heartbeat is older than `ASS_BROWSER_STALE_S` |
| Browser fails to launch | Slot released immediately; the error is passed on unchanged |
| Ctrl-C (SIGINT) | Process exits, slot released |
| SIGTERM / SIGHUP | Playwright closes the browser (slot released) but, as it does without the guard, leaves the Node process running; stop it with Ctrl-C or `kill -9` |
| Both slots busy for longer than `ASS_BROWSER_WAIT_MAX_MIN` | The launch fails with "no browser slot free after … s" and the `queue.cjs` hint |
| Leftover `chrome-headless-shell` processes after all the above | none |

## End-to-end check with the guard on (2026-11-19, via `.claude/settings.local.json`)
- 8 stills: 4.3 s. 6-frame contact sheet: 2-3 s. `implcheck KD-009`: PASS in 121 s (Metal, one-page scan: 92 s). Library regression: "all identical", 165 s.
- Load test: two implchecks (KD-009, AN-145) and three stills jobs started together. All passed with the same results as when run alone. Never more than 2 browsers; 12 slots taken, 12 released, no leftovers.
- **Queue latency:** in that test, the stills jobs waited about 150 s behind the two implchecks. When many agents run `implcheck` at once, a quick stills check can wait a few minutes. That is the price of the 2-browser limit; `ASS_BROWSER_SLOTS=3` raises it if the Mac stays stable.
