#!/usr/bin/env node
// usage: node new-project.mjs <dir> [--preset arabic] [--title "My film"] [--narration file.mp3] [--layout 9x16]
// Copies the starter files (config + scene template, plus a sample timing.json for the Arabic preset) into <dir>. Never overwrites.
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url)), T = path.join(here, '..', 'templates'), a = process.argv.slice(2), opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : a[i + 1]; };
const dir = path.resolve(a[0] || '.'), preset = opt('preset', null); fs.mkdirSync(dir, { recursive: true });
const cfg = JSON.parse(fs.readFileSync(path.join(T, 'halftone.config.json'), 'utf8')); cfg.title = opt('title', 'My Halftone Pop film'); cfg.output = (cfg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) || 'film'; cfg.layout = opt('layout', '9x16');
if (preset) cfg.preset = preset; else delete cfg.preset; if (opt('narration')) cfg.narration = path.basename(opt('narration')); else delete cfg.narration;
if (!preset) delete cfg.timing; else cfg.timing = 'timing.json';
const put = (name, data) => { const p = path.join(dir, name); if (fs.existsSync(p)) { console.log('exists, kept:', p); return; } fs.writeFileSync(p, data); console.log('created:', p); };
put('halftone.config.json', JSON.stringify(cfg, null, 2) + '\n'); put('scene.js', fs.readFileSync(path.join(T, 'scene.template.js'), 'utf8'));
if (preset) put('timing.json', fs.readFileSync(path.join(T, 'timing.sample.json'), 'utf8'));
if (opt('narration')) { const p = path.join(dir, path.basename(opt('narration'))); if (!fs.existsSync(p)) fs.copyFileSync(opt('narration'), p); }
console.log('\nNext: node ' + path.join(here, 'check-deps.mjs') + '   then   python3 ' + path.join(here, 'hp-build.py') + ' ' + dir);
