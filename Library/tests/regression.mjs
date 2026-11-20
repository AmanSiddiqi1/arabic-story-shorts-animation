// node regression.mjs
// Checks that every library drawing is pixel-identical to the drawing in its original story when no acting fields are used,
// and that the library loads with no duplicate top-level names. Uses frozen copies of the original story drawing files in tests/reference/.
// Then checks every other style profile (Library/styles/<id>/): its theme.js defines every top-level name the Halftone theme
// defines (the theme contract), the library loads with it and its engine style module without errors, and the cast draws.
import { createRequire } from 'module'; import { pathToFileURL, fileURLToPath } from 'url'; import fs from 'fs'; import path from 'path'; import { execFileSync } from 'child_process';
const findLib = (d) => { if (process.env.LIB) return process.env.LIB; for (let x = d; ; x = path.dirname(x)) { const c = path.join(x, 'lemo-opuscar'); if (fs.existsSync(path.join(c, 'core/render/page.mjs'))) return c; if (path.dirname(x) === x) throw new Error('lemo-opuscar not found'); } };
const here = path.dirname(fileURLToPath(import.meta.url)), LIBDIR = path.dirname(here), ROOT = path.dirname(LIBDIR), OL = findLib(here), req = createRequire(path.join(OL, 'package.json'));
const { chromium } = req('playwright-core'); const { ARGS, EXE } = await import(pathToFileURL(path.join(OL, 'core/render/browser.mjs')).href);
// frozen copies of each finished story's original drawing files (stories are upgraded in place, so the reference must not move)
const anim = (story) => path.join(here, 'reference', story);
const rd = (p) => fs.readFileSync(p, 'utf8');
const engine = ['kit.js', 'sound.js', 'halftone-pop.js'].map((f) => rd(execFileSync('python3', [path.join(LIBDIR, 'engine.py'), f]).toString().trim())).join('\n');   // installed claude-motion-faceless-skills
const libjs = execFileSync('python3', ['-c', 'import sys; sys.path.insert(0, sys.argv[1]); from lib import library_js; print(library_js())', LIBDIR]).toString();
// [label, story, original files, list of [original call, library call]]
const P = (o) => JSON.stringify({ x: 200, y: 330, s: 0.8, dir: 1, ...o });
const CASES = [
  ['lion story', 'lion-and-the-hare', ['scene_a.js', 'animals.js'], [
    [`lion(c, ${P({})})`], [`lion(c, ${P({ ph: 1.2, amp: 1, roar: 1, brow: 1, puff: 1.1 })})`], [`lion(c, ${P({ pal: 1, crouch: 1, talk: 0.7, raise: 1, dir: -1 })})`],
    [`lionFace(c, 200, 200, 0.8, { roar: 0.8, brow: 1 })`], [`hare(c, ${P({ ears: -0.5, raise: 1, talk: 0.6, squash: 0.4 })})`], [`hare(c, ${P({ pal: 2, mouth: 'smile', nod: 0.2 })})`],
    [`deer(c, ${P({ ph: 1, amp: 1, graze: 0.6 })})`], ['turtle(c, ' + P({ ph: 1, amp: 1, hide: 0.3 }) + ')', 'tortoise(c, ' + P({ ph: 1, amp: 1, hide: 0.3 }) + ')'],
    ['bird(c, ' + P({ fly: true, flap: 1, col: '#ffd21f', y: 200 }) + ')', 'songbird(c, ' + P({ fly: true, flap: 1, col: '#ffd21f', y: 200 }) + ')'],
    [`drops(c, 200, 200, 1.3)`], [`steam(c, 200, 250, 0.7)`], [`peekEyes(c, 200, 200, 0.5, false)`]]],
  ['monkey story', 'monkey-and-the-turtle', ['scene_a.js', 'animals.js'], [
    [`monkey(c, ${P({ eat: 0.6, hold: 'fig', talk: 0.5, brow: 1, tilt: 0.1 })})`], [`turtle(c, ${P({ ph: 2, ext: 0.5, wife: true, talk: 0.6 })})`], [`fig(c, 200, 200, 30, 0.3)`]]],
  ['fox story', 'fox-and-the-drum', ['scene_a.js', 'fox.js'], [
    [`fox(c, ${P({ ph: 1, amp: 1, tailUp: 0.7, mouth: 'open', brow: 1 })})`], [`fox(c, ${P({ sit: 1, raise: 1, headUp: -0.2, ears: 1 })})`], [`soundArcs(c, 200, 200, 1, 0.4)`]]],
  ['lark story', 'lark-and-the-elephant', ['scene_a.js', 'birds.js'], [
    [`bird(c, ${P({ kind: 'lark', beak: 0.6, brow: 1 })})`], [`bird(c, ${P({ kind: 'crow', fly: true, flap: 0.7, dir: -1 })})`], [`bird(c, ${P({ kind: 'b', eyes: 'shut', drop: 6 })})`],
    [`elephant(c, ${P({ s: 0.5, ph: 1, amp: 1, trunk: 0.6, eyes: 'smug', brow: 1 })})`], [`elephant(c, ${P({ s: 0.5, eyes: 'x', tongue: true, earUp: 0.5, rot: 0.1 })})`],
    [`frog(c, ${P({ croak: 0.8 })})`], [`nestDraw(c, 200, 300, { nb: 1, t: 1, eggs: 3, chicks: 2, feed: true })`], [`nestDraw(c, 200, 300, { ruin: 0.6 })`], [`worm(c, 200, 200, 1.1)`]]],
  ['thief story', 'thief-and-the-moonbeam', ['scene_a.js'], [
    [`person(c, ${P({ kind: 'thief', v: 1, ph: 1, amp: 1, talk: 0.5 })})`], [`person(c, ${P({ kind: 'owner', mouth: 'smile', aL: [1, 2] })})`], [`person(c, ${P({ kind: 'wife', look: -1, mouth: 'o' })})`]]],
];
const page = (scripts, calls, eng = engine) => `<!doctype html><html><body><canvas id="c" width="400" height="400"></canvas>
<script>window.MS = { styles: {}, register(s) { this.styles[s.id] = s; } };</script><script>${eng}</script>
<script>window.ARABIC_FONT = 'Noto Naskh Arabic'; window.ARABIC_WEIGHT = 700;</script>
<script>${scripts}</script>
<script>window.shots = ${JSON.stringify(calls)}.map((code) => { const cv = document.getElementById('c'), c = cv.getContext('2d'); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 400, 400); new Function('c', code)(c); return Array.from(c.getImageData(0, 0, 400, 400).data); });</script></body></html>`;
const b = await chromium.launch({ executablePath: EXE, args: ARGS }); let fail = 0;
const shoot = async (html) => { const f = path.join(here, '.tmp.html'); fs.writeFileSync(f, html); const p = await b.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); await p.goto(pathToFileURL(f).href); const s = await p.evaluate('window.shots'); await p.close(); fs.rmSync(f); if (errs.length) throw new Error(errs.join('; ')); return s; };
// 1. duplicate top-level names across library files
const names = {}; for (const m of libjs.matchAll(/^(?:function|const|let)\s+([A-Za-z_$][\w$]*)/gm)) names[m[1]] = (names[m[1]] || 0) + 1;
const dup = Object.entries(names).filter(([, n]) => n > 1).map(([k]) => k); if (dup.length) { console.log('DUPLICATE NAMES:', dup.join(', ')); fail++; } else console.log('names: ' + Object.keys(names).length + ' top-level, no duplicates');
// 2. pixel identity with each story
for (const [label, story, files, calls] of CASES) {
  const src = anim(story), orig = await shoot(page(files.map((f) => rd(path.join(src, f))).join('\n'), calls.map((c) => c[0]))), lib = await shoot(page(libjs, calls.map((c) => c[1] || c[0])));
  calls.forEach((c, i) => { let d = 0; for (let k = 0; k < orig[i].length; k++) if (orig[i][k] !== lib[i][k]) d++; const nonblank = orig[i].some((v, k) => k % 4 === 3 && v > 0); const ok = d === 0 && nonblank; if (!ok) fail++; console.log((ok ? 'same ' : 'DIFF ') + label.padEnd(14) + (c[1] || c[0]).slice(0, 70) + (ok ? '' : `  (${d} bytes differ${nonblank ? '' : ', blank'})`)); });
}
// 3. other style profiles: theme contract + loads and draws
const py = (code, ...args) => execFileSync('python3', ['-c', 'import sys, json; sys.path.insert(0, sys.argv[1]); ' + code, LIBDIR, ...args]).toString();
const topNames = (js) => new Set([...js.matchAll(/^(?:function|const|let)\s+([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]));
const themeOf = (id) => py('import lib; print(lib.read(lib.theme_rel(sys.argv[2])))', id);
const contract = topNames(themeOf('halftone-pop'));
for (const id of py('import style; print(" ".join(style.available()))').trim().split(/\s+/).filter((x) => x && x !== 'halftone-pop')) {
  const miss = [...contract].filter((n) => !topNames(themeOf(id)).has(n)), lj = py('import lib; print(lib.library_js(sys.argv[2]))', id);
  const nm = {}; for (const m of lj.matchAll(/^(?:function|const|let)\s+([A-Za-z_$][\w$]*)/gm)) nm[m[1]] = (nm[m[1]] || 0) + 1;
  const dupS = Object.entries(nm).filter(([, n]) => n > 1).map(([k]) => k);
  const eng = py('import lib; print(lib.engine_scripts(sys.argv[2]))', id);   // kit + sound + the profile's style module (Creator OS or its own)
  let err = '';
  try { const sh = await shoot(page(lj, ['lion(c, ' + P({}) + ')', 'person(c, ' + P({ kind: 'owner' }) + ')', 'bubble(c, 200, 120, 200, 110, 120, 260, 1, "HA!")', 'castFinish(c, 200, 330, 260, 300, (k) => hare(k, ' + P({}) + '))'], eng)); if (!sh.every((px) => px.some((v, k) => k % 4 === 3 && v > 0))) err = 'a test drawing came out blank'; } catch (e) { err = e.message.slice(0, 200); }
  const ok = !miss.length && !dupS.length && !err; if (!ok) fail++;
  console.log((ok ? 'style ' : 'STYLE ') + id.padEnd(16) + (ok ? 'theme contract met, loads and draws' : [miss.length && 'theme is missing: ' + miss.join(', '), dupS.length && 'duplicate names: ' + dupS.join(', '), err].filter(Boolean).join('; ')));
}
await b.close(); console.log(fail ? `${fail} problem(s)` : 'all identical'); process.exit(fail ? 1 : 0);
