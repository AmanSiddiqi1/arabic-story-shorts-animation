---
name: rossark-motion-shorts
description: Character-motion method for Arabic Story Shorts (from rossark0/rossark-motion-skill, MIT, cloned beside this repository). Use when staging, implementing or reviewing how characters move in a story - acting, gaze and blinks, breathing and moving holds, follow-through, weight shifts, hops and landings, floating, props and contact, idle life of plants, water, fire, cloth - to make them feel alive instead of robotic. Maps the method onto this project's canvas engine (K, Library/motion.js, pose fields).
argument-hint: "[story ID or scene to improve]"
---

# Character motion (rossark-motion method, Arabic Story Shorts edition)

The method itself lives in a separate clone, **not in this repository** and never edited from here:
`rossark-motion-skill/` beside this repository (on this account `~/Downloads/Claude Code/rossark-motion-skill`; on another account, for example `~/Developer/rossark-motion-skill`), or `$ROSSARK_MOTION`. Find it by walking up from this repository's folder. If it is missing: `git clone https://github.com/rossark0/rossark-motion-skill.git` next to the repository (see DEVELOPMENT_SETUP.md).

## Read
1. **Project rules first** (they override the method, as its own section 0 says): `CLAUDE.md`, `Library/Animation_Capabilities_Guide.md`, the story's style `Library/styles/<style>/look.md`.
2. In the clone's `SKILL.md`: sections **1** (principles), **3** (recipes by subject), **4** (characters), **5** (acting, with the "alive" checklist), **6** (scenes that tell an action), **10** (working from a reference video), **11** (workflow).
3. Skip what does not apply here: section 7 (app interface motion), the React Native / SwiftUI parts of sections 2, 8 and 9, the `templates/` and `demo/` code (Swift and TypeScript; read them as worked examples only, never copy them into a story).

## How the method maps onto this project

| Method | Here |
|---|---|
| clock in ms, `useLoopClock` / `OneShotClock` | every frame is a pure function of `t` in **seconds** (`SCENE.draw(ctx, W, H, t, S)`); one film = one clock. Convert the method's ms to s |
| `track(t, keys)` (stops at each key) | `kfn(t, [[t0, v0], [t1, v1], ...], ease)` (core/helpers.js), `blend(t, a, b, v0, v1)` |
| `flow(t, keys)` (passes through poses without stopping) | `flow(t, keys)` (Library/motion.js, seconds; monotone cubic, no overshoot) |
| `wave(t, period, phase)` | `osc(t, period, phase)` (the name `wave` is taken by stories); `breathe(t, seed, amp)` for `P.sq`; `idleSway(t, seed, amp, period)` for moving holds |
| `seg(t, a, b)` | `beatIn(t, a, b)` (the Library's `seg` draws a limb segment) |
| `bell(p)` | `Math.sin(Math.PI * p)`; `pulse(t, a, d)` |
| `seeded(i)` | `K.rng(seed)` / `K.noise(seed)` (never `Math.random`) |
| gaze, glances held >= 1 s | `P.gaze` with `look(t, from, plan)` / `gazePlan` / `lookAt` |
| lid, blinks (close ~110 ms, hold 30-50, reopen ~190 ms; blink on head turns) | `P.lid` with `blink(t, seed)` (0.16 s blinks; keep its defaults, they protect the finished films); for a timed blink on a turn use `blend`/`kfn` on `P.lid` with the method's timings |
| head tilt, lean | `P.tip` (whole body about the feet); characters' own head fields (see each cast file header) |
| breathing, moving holds | `breathe()` on `P.sq`, small `wave`s on limbs, `tip` and head; never a fully frozen character while on screen |
| follow-through by delay (child = parent at `t - 0.06..0.15 s`, 0.3-0.6 strength) | `lagged(f, t, delay, k)` added to the child; counter-motion `head = own(t) - 0.45 * lean(t - 0.11)`; `swing(t, t0, amp)` for a damped dangle after a stop |
| squash with volume (`w = 1 / sy^0.6`) | `P.sq` (the acting wrapper keeps volume) |
| hop, landing (crouch, stretch, parabola, squash 15-20%, one small overshoot) | `anticipate`, `hop`, `fallY`, `impactSquash`, `landSquash`, `rebound`, `settleTo` |
| weight shift, feet planted | `walk(xf, t)` and `footfalls` for travel (legs never slide); for a shift in place move `P.x` a little and keep feet fixed |
| groups never in sync | `stagger(i)`, per-member seeds |
| shadow scales with height | `groundShadow(ctx, x, y, w, lift, o)` (style texture, or `{ flat: true }`) |
| props enter already moving, from beyond the edge; eyes follow them | stage in the scene; the panel edge (x 54..1026, y 54..1250) is the screen edge |
| reference video study (`tools/sheet.sh`, `track_edges.py`, `sample_colors.py`) | allowed for private study; keep downloaded videos in their own folder, run Python with `-I`; published films use our own characters |

## Project rules that win over the method
- **Frame rate:** films are 30 fps. Any move under ~100 ms is 2-3 frames: give blinks, contacts and snaps at least 3-4 frames.
- **Comic punch stays:** the method says "calm by default, no bouncy overshoot". In Halftone (and any comic style) the story beats keep their punch (`sfx` back-ease, `emphasis`, impact squash). Apply the calm rules to idle life, gaze and acting between beats.
- **Layout never moves:** the caption panel and the story panel frame stay still; camera moves and shakes happen inside the panel only (as in the template).
- **Timing:** acting beats are cued to word times (`w(p, n)`), not free-running loops; idle loops must not distract from the narrated action ("one main action per scene, plus two or three idle loops").
- **Backward compatible Library:** new helpers go into the story first, then `Library/motion.js` with `node Library/tests/regression.mjs` at "all identical". Examples and the checklist: `Library/Animation_Capabilities_Guide.md` section 15.

## Check before calling a scene alive
Run the method's section 5 checklist on stills and a contact sheet (`./sh.sh`), with a sheet of every 4th frame across the key action:
nothing frozen while on screen, no moment where every part stops at once, head and limb ends arrive after the body, left and right never mirror, the weight moves at least once, a head turn with a blink, landings squash, anything in the air has hanging feet and a changing shadow, props enter moving and the eyes follow them.
