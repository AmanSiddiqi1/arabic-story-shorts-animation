// Safe-Chromium guard for LOCAL headless Chromium launches (stills, contact sheets, implcheck, regression, catalogue).
// Switched on by  NODE_OPTIONS=--require "<repo>/tools/browser/safe-chromium.cjs"  in .claude/settings.local.json (this Mac only;
// see tools/browser/README.md). It changes nothing in Lemo-Opuscar or in any story script: it wraps playwright-core's
// chromium.launch() inside the Node process. GitHub Actions never loads it.
//  1. CPU rendering: drops Lemo-Opuscar's macOS flags (--use-angle=metal, --enable-gpu, --ignore-gpu-blocklist) and adds
//     --disable-gpu, so the Intel GPU is not used. ASS_BROWSER_GPU=disable-gpu (default) | swiftshader (4-9x slower) | off.
//  2. At most ASS_BROWSER_SLOTS (default 2) browsers at once across all processes on this Mac. A launch waits for a free slot.
//     Only browser launches wait: other Node and Python work is never blocked.
//  3. No permanent stalls: a slot is freed when its browser closes, crashes or its process exits; a slot whose process is gone,
//     or whose holder stopped refreshing it (heartbeat older than ASS_BROWSER_STALE_S, default 120 s), or that has been held
//     longer than ASS_BROWSER_HOLD_MAX_MIN (default 90 min) is reclaimed by the next waiter. A launch that waits longer than
//     ASS_BROWSER_WAIT_MAX_MIN (default 30 min) fails with a message instead of waiting for ever.
// Diagnose / recover: node tools/browser/queue.cjs status | reset [--all]
'use strict';
const Module = require('module'), fs = require('fs'), os = require('os'), path = require('path');
const env = process.env;
const MODE = (env.ASS_BROWSER_GPU || 'disable-gpu').toLowerCase();
const SLOTS = Math.max(1, parseInt(env.ASS_BROWSER_SLOTS || '2', 10) || 2);
const DIR = env.ASS_BROWSER_SLOT_DIR || path.join(os.tmpdir(), 'arabic-story-shorts-browser-slots');
const STALE_MS = (+env.ASS_BROWSER_STALE_S || 120) * 1000;
const HOLD_MAX_MS = (+env.ASS_BROWSER_HOLD_MAX_MIN || 90) * 60000;
const WAIT_MAX_MS = (+env.ASS_BROWSER_WAIT_MAX_MIN || 30) * 60000;
const BEAT_MS = 15000;
const QUIET = env.ASS_BROWSER_QUIET === '1';
const DROP = new Set(['--enable-gpu', '--ignore-gpu-blocklist']);
const MODE_ARGS = { swiftshader: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'], 'disable-gpu': ['--disable-gpu'] };
const say = (m) => { if (!QUIET) process.stderr.write(`[safe-chromium] ${m}\n`); };
const log = (m) => { if (env.ASS_BROWSER_LOG) try { fs.appendFileSync(env.ASS_BROWSER_LOG, `${Date.now()} ${m}\n`); } catch {} };

function fixArgs(args) {
  if (MODE === 'off') return args;
  if (!MODE_ARGS[MODE]) throw new Error(`ASS_BROWSER_GPU=${MODE}: use disable-gpu, swiftshader or off`);
  const extra = (env.ASS_BROWSER_EXTRA_ARGS || '').split(/\s+/).filter(Boolean);   // experiments only
  return [...(args || []).filter((a) => !DROP.has(a) && !a.startsWith('--use-angle=')), ...MODE_ARGS[MODE], ...extra];
}

const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };
// one slot = directory slotN/ holding "owner" (pid, start time, command); its mtime is the heartbeat
function inspect(i, now = Date.now()) {
  const s = path.join(DIR, `slot${i}`); let st; try { st = fs.statSync(s); } catch { return { i, path: s, free: true }; }
  let o = {}; try { o = JSON.parse(fs.readFileSync(path.join(s, 'owner'), 'utf8')); } catch {}
  const beat = now - st.mtimeMs, held = o.since ? now - o.since : beat;
  let why = null;
  if (o.pid && !alive(o.pid)) why = `process ${o.pid} is gone`;
  else if (!o.pid && beat > 10000) why = 'no owner record';
  else if (o.pid && beat > STALE_MS) why = `no heartbeat for ${Math.round(beat / 1000)} s`;
  else if (held > HOLD_MAX_MS) why = `held for ${Math.round(held / 60000)} min (> ${HOLD_MAX_MS / 60000})`;
  return { i, path: s, free: false, owner: o, beat, held, stale: why };
}
function tryTake() {
  fs.mkdirSync(DIR, { recursive: true });
  for (let i = 0; i < SLOTS; i++) {
    const s = path.join(DIR, `slot${i}`);
    try {
      fs.mkdirSync(s);
      fs.writeFileSync(path.join(s, 'owner'), JSON.stringify({ pid: process.pid, since: Date.now(), cwd: process.cwd(), cmd: process.argv.slice(1).join(' ').slice(0, 300) }));
      return s;
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
      const x = inspect(i);
      if (x.stale) { try { fs.rmSync(s, { recursive: true, force: true }); say(`reclaimed slot${i}: ${x.stale}`); log(`reclaim slot${i} ${x.stale}`); } catch {} i--; }
    }
  }
  return null;
}
const held = new Map();   // slot path -> heartbeat timer
function release(s) {
  const t = held.get(s); if (t === undefined) return; clearInterval(t); held.delete(s);
  try { const o = JSON.parse(fs.readFileSync(path.join(s, 'owner'), 'utf8')); if (o.pid !== process.pid) return; } catch {}   // reclaimed by someone else
  try { fs.rmSync(s, { recursive: true, force: true }); } catch {}
}
process.on('exit', () => { for (const s of [...held.keys()]) release(s); });
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.once(sig, () => { for (const s of [...held.keys()]) release(s); process.kill(process.pid, sig); });

async function acquire() {
  const t0 = Date.now(); let s = tryTake(), said = false;
  while (!s) {
    const w = Date.now() - t0;
    if (w > WAIT_MAX_MS) throw new Error(`[safe-chromium] no browser slot free after ${Math.round(w / 1000)} s (${SLOTS} slots in ${DIR}). ` +
      'Check with: node tools/browser/queue.cjs status   (reset stale slots: node tools/browser/queue.cjs reset)');
    if (!said && w > 1000) { say(`waiting for a browser slot (${SLOTS} in use; node tools/browser/queue.cjs status)`); said = true; }
    await new Promise((r) => setTimeout(r, 250)); s = tryTake();
  }
  const beat = setInterval(() => { try { const n = new Date(); fs.utimesSync(s, n, n); } catch {} }, BEAT_MS); beat.unref();
  held.set(s, beat); return { slot: s, waited: Date.now() - t0 };
}

function wrap(pw) {
  const ch = pw && pw.chromium;
  if (!ch || ch.__assSafe) return pw;
  const orig = ch.launch.bind(ch);
  ch.launch = async function (opts = {}) {
    const { slot, waited } = await acquire(); log(`acquire ${path.basename(slot)} pid=${process.pid} waited=${waited}`);
    let b;
    try { b = await orig({ ...opts, args: fixArgs(opts.args) }); }
    catch (e) { release(slot); log(`release ${path.basename(slot)} pid=${process.pid} (launch failed)`); throw e; }
    b.on('disconnected', () => { log(`release ${path.basename(slot)} pid=${process.pid}`); release(slot); });
    return b;
  };
  Object.defineProperty(ch, '__assSafe', { value: true });
  return pw;
}

if (!Module.__assSafeHook) {
  Module.__assSafeHook = true;
  const load = Module._load;
  Module._load = function (request) {
    const m = load.apply(this, arguments);
    return request === 'playwright-core' || request === 'playwright' ? wrap(m) : m;
  };
}
module.exports = { DIR, SLOTS, MODE, STALE_MS, HOLD_MAX_MS, WAIT_MAX_MS, inspect, fixArgs };
