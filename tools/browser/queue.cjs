#!/usr/bin/env node
// Browser-queue diagnostics for the safe-Chromium guard (tools/browser/safe-chromium.cjs).
//   node tools/browser/queue.cjs status        show the slots, who holds them, heartbeat age, and whether the guard is on here
//   node tools/browser/queue.cjs reset         remove stale slots only (dead process, no heartbeat, or held too long)
//   node tools/browser/queue.cjs reset --all   remove every slot (only when no local render/still/implcheck is running)
'use strict';
const fs = require('fs'), path = require('path');
const G = require('./safe-chromium.cjs');
const [cmd = 'status', flag] = process.argv.slice(2);
const on = /safe-chromium\.cjs/.test(process.env.NODE_OPTIONS || '');
const rows = Array.from({ length: Math.max(G.SLOTS, countDirs()) }, (_, i) => G.inspect(i));
function countDirs() { try { return fs.readdirSync(G.DIR).filter((n) => /^slot\d+$/.test(n)).length; } catch { return 0; } }
if (cmd === 'status') {
  console.log(`guard in this shell: ${on ? 'ON' : 'off'} (NODE_OPTIONS ${on ? 'loads' : 'does not load'} safe-chromium.cjs); mode ${G.MODE}; ${G.SLOTS} slots in ${G.DIR}`);
  for (const r of rows) console.log(r.free ? `slot${r.i}: free` :
    `slot${r.i}: pid ${r.owner.pid || '?'}  held ${Math.round(r.held / 1000)} s  heartbeat ${Math.round(r.beat / 1000)} s ago  ${r.stale ? 'STALE: ' + r.stale : 'active'}\n        ${r.owner.cmd || ''}\n        cwd ${r.owner.cwd || ''}`);
} else if (cmd === 'reset') {
  let n = 0;
  for (const r of rows) if (!r.free && (r.stale || flag === '--all')) { fs.rmSync(r.path, { recursive: true, force: true }); n++; console.log(`removed slot${r.i}${r.stale ? ' (' + r.stale + ')' : ' (--all)'}`); }
  console.log(n ? `${n} slot(s) freed` : 'nothing to reset (no stale slots; use --all only if nothing is running)');
} else { console.error('usage: node tools/browser/queue.cjs status | reset [--all]'); process.exit(2); }
