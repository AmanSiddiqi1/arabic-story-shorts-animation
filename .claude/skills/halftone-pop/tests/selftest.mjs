#!/usr/bin/env node
// Self-contained test of the skill: needs no film project and no conversation history. usage: node selftest.mjs [--keep]
// Builds sample projects in a temp folder, renders a few still frames (no video), and checks dependencies, the unchanged original engine,
// the plain style, the Arabic preset (font, RTL, wrapping, translation line) and the optional character libraries.
import fs from 'fs'; import os from 'os'; import path from 'path'; import crypto from 'crypto'; import { execFileSync, spawnSync } from 'child_process'; import { fileURLToPath } from 'url';
const SK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), SC = path.join(SK, 'scripts'), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hp-selftest-'));
let fails = 0; const ok = (name, cond, info = '') => { console.log((cond ? 'PASS ' : 'FAIL ') + name + (info ? '  ' + info : '')); if (!cond) fails++; };
const run = (cmd, args, opt = {}) => spawnSync(cmd, args, { encoding: 'utf8', cwd: tmp, ...opt });
// 1. dependencies
let r = run('node', [path.join(SC, 'check-deps.mjs')]); ok('dependencies resolve (node, ffmpeg, python3, playwright-core, chromium)', r.status === 0, r.status ? '\n' + r.stdout : '');
if (r.status) { console.log('Stopping: fix the missing dependencies above first.'); process.exit(1); }
// 2. original engine unchanged
const prov = fs.readFileSync(path.join(SK, 'engine/original/PROVENANCE.md'), 'utf8');
const mroot = execFileSync('python3', ['-c', "import sys; sys.path.insert(0, sys.argv[1]); from engine import motion_root; print(motion_root())", path.join(SK, '../../../Library')]).toString().trim();   // installed claude-motion-faceless-skills
for (const f of ['kit.js', 'sound.js', 'halftone-pop.js']) { const h = crypto.createHash('sha256').update(fs.readFileSync(path.join(mroot, f === 'halftone-pop.js' ? 'styles' : 'engine', f))).digest('hex'); ok(`original ${f} matches its recorded SHA-256`, prov.includes('`' + h + '`')); }
// 3. plain (no preset, no subtitles) sample
const mk = (name, args) => { const d = path.join(tmp, name); run('node', [path.join(SC, 'new-project.mjs'), d, '--title', name, ...args]); return d; };
const build = (d) => run('python3', [path.join(SC, 'hp-build.py'), d]);
const stills = (d, html, times, extra = []) => run('node', [path.join(SC, 'hp-stills.mjs'), path.join(d, html), ...times.map(String), '--out', path.join(d, 'stills'), ...extra]);
const dims = (f) => { const o = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f]).stdout.trim(); return o; };
let d = mk('plain', []); r = build(d); ok('plain project builds', r.status === 0 && fs.existsSync(path.join(d, 'plain.html')), r.stderr.trim());
r = stills(d, 'plain.html', [1, 7]); ok('plain stills render with no page errors', !/PAGEERR/.test(r.stdout + r.stderr) && fs.existsSync(path.join(d, 'stills/still-7.jpg')), (r.stdout + r.stderr).includes('PAGEERR') ? r.stdout : '');
ok('still is 1080x1920', dims(path.join(d, 'stills/still-7.jpg')) === '1080,1920');
// 4. Arabic preset: default font and the two alternatives
for (const [key, family, weight] of [['naskh', 'Noto Naskh Arabic', 700], ['cairo', 'Cairo', 800], ['scheherazade', 'Scheherazade New', 700]]) {
  d = mk('ar-' + key, ['--preset', 'arabic']); const cp = path.join(d, 'halftone.config.json'), c = JSON.parse(fs.readFileSync(cp, 'utf8')); c.arabicFont = key; fs.writeFileSync(cp, JSON.stringify(c));
  r = build(d); ok(`arabic preset (${key}) builds`, r.status === 0, r.stderr.trim());
  r = stills(d, `ar-${key}.html`, [1, 5], ['--json']); const js = r.stdout.split('\n').filter((l) => l.startsWith('{')).map((l) => JSON.parse(l));
  ok(`arabic (${key}): no page errors, two stills`, !/PAGEERR/.test(r.stdout + r.stderr) && js.length === 2);
  if (js.length === 2) {
    const s = js[1];
    ok(`arabic (${key}): font ${weight} ${family}`, s.primaryFont.includes(`${weight}`) && s.primaryFont.includes(family), s.primaryFont);
    ok(`arabic (${key}): right-to-left`, s.primaryDirection === 'rtl');
    ok(`arabic (${key}): long chunk wraps to several lines and keeps its diacritics`, s.primaryLines.length >= 2 && /[ً-ْ]/.test(s.primaryLines.join('')), s.primaryLines.length + ' lines, size ' + s.primarySize);
    ok(`arabic (${key}): translation line present, smaller`, s.secondaryLines.length >= 1 && s.secondarySize < s.primarySize, `size ${s.secondarySize}`);
    ok(`arabic (${key}): text verbatim from timing.json`, s.primaryLines.join(' ').replace(/\s+/g, ' ') === s.chunk.ar.replace(/\s+/g, ' '));
  }
}
const ev = run('node', [path.join(SC, 'hp-stills.mjs'), path.join(tmp, 'ar-naskh/ar-naskh.html'), '5', '--out', path.join(tmp, 'ar-naskh/stills'), '--eval', "({naskh: document.fonts.check('700 60px \"Noto Naskh Arabic\"','لُصوص'), bangers: document.fonts.check('400 40px Bangers','Abc'), blue: HP.config.subtitle.secondary.color})"]).stdout.trim().split('\n').pop();
ok('arabic fonts loaded in the page; translation colour is the preset blue', /"naskh":true/.test(ev) && /"bangers":true/.test(ev) && /#1d5bd0/.test(ev), ev);
// 5. optional example characters load together without name clashes
d = mk('chars', []); const cp = path.join(d, 'halftone.config.json'), c = JSON.parse(fs.readFileSync(cp, 'utf8')); c.characters = ['monkey-turtle', 'birds-elephant-frog', 'fox-drum']; fs.writeFileSync(cp, JSON.stringify(c));
r = build(d); r = stills(d, 'chars.html', [1]); ok('all three example character libraries load together without errors', !/PAGEERR/.test(r.stdout + r.stderr) && fs.existsSync(path.join(d, 'stills/still-1.jpg')), r.stdout);
console.log(fails ? `\n${fails} check(s) FAILED (files kept in ${tmp})` : '\nAll checks passed.'); if (!fails && !process.argv.includes('--keep')) fs.rmSync(tmp, { recursive: true, force: true }); process.exit(fails ? 1 : 0);
