// Finds playwright-core and launches a Chromium without assuming any machine layout.
// Search order for playwright-core: $HP_PLAYWRIGHT (a folder holding node_modules/playwright-core, or the package itself),
// $LIB (e.g. a Lemo-Opuscar checkout), the skill's local.json (written by check-deps.mjs --save), node_modules/playwright-core or lemo-opuscar/node_modules/playwright-core in the cwd, the project
// folder and each parent folder, this skill's own scripts/node_modules, the global npm root, then a lemo-opuscar folder one or two levels under ~, ~/Downloads, ~/Documents, ~/Developer. Browser: $PLAYWRIGHT_CHROME, else
// Playwright's own installed Chromium, else the system Chrome. GPU flags are opt-in: HP_ANGLE=metal|gl|vulkan|swiftshader.
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module'; import { fileURLToPath } from 'url'; import { execSync } from 'child_process';
const here = path.dirname(fileURLToPath(import.meta.url));
const isPkg = (d) => fs.existsSync(path.join(d, 'package.json')) && fs.existsSync(path.join(d, 'index.js')) && /playwright-core/.test(fs.readFileSync(path.join(d, 'package.json'), 'utf8').slice(0, 200));
export function findPlaywright(extraStarts = []) {
  const tried = [], cand = [];
  const add = (dir, how) => cand.push([dir, how]);
  if (process.env.HP_PLAYWRIGHT) { const d = process.env.HP_PLAYWRIGHT; add(d, 'HP_PLAYWRIGHT'); add(path.join(d, 'node_modules', 'playwright-core'), 'HP_PLAYWRIGHT'); }
  if (process.env.LIB) add(path.join(process.env.LIB, 'node_modules', 'playwright-core'), 'LIB');
  for (const s of [process.cwd(), ...extraStarts, path.resolve(here, '..')]) for (let x = path.resolve(s); ; x = path.dirname(x)) { add(path.join(x, 'node_modules', 'playwright-core'), 'node_modules above ' + s); add(path.join(x, 'lemo-opuscar', 'node_modules', 'playwright-core'), 'lemo-opuscar beside/above ' + s); if (path.dirname(x) === x) break; }
  try { const lj = JSON.parse(fs.readFileSync(path.join(here, '..', 'local.json'), 'utf8')); if (lj.playwright) add(lj.playwright, 'skill local.json'); } catch {}
  try { add(path.join(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(), 'playwright-core'), 'global npm'); } catch {}
  const home = os.homedir(); // last resort: look one or two levels under the usual project folders for a Lemo-Opuscar checkout
  for (const base of [home, ...['Downloads', 'Documents', 'Developer', 'code', 'projects', 'src'].map((x) => path.join(home, x))]) { let ents = []; try { ents = fs.readdirSync(base, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith('.')).map((e) => path.join(base, e.name)); } catch {} for (const d of [base, ...ents]) add(path.join(d, 'lemo-opuscar', 'node_modules', 'playwright-core'), 'lemo-opuscar found under ' + base); }
  for (const [d, how] of cand) { tried.push(d); if (fs.existsSync(d) && isPkg(d)) return { dir: d, how, mod: createRequire(path.join(d, 'package.json'))(d) }; }
  const e = new Error('playwright-core not found.\nInstall it (npm i playwright-core, then npx playwright-core install chromium) or point HP_PLAYWRIGHT at a folder that has it\n(e.g. HP_PLAYWRIGHT=/path/to/lemo-opuscar/node_modules/playwright-core).\nSearched:\n  ' + [...new Set(tried)].slice(0, 12).join('\n  ')); e.code = 'HP_NO_PLAYWRIGHT'; throw e;
}
export function launchArgs() {
  const a = ['--enable-gpu', '--ignore-gpu-blocklist', '--font-render-hinting=none', '--force-color-profile=srgb'];
  if (process.env.HP_ANGLE) a.unshift('--use-angle=' + process.env.HP_ANGLE);
  return a;
}
export async function launch(extraStarts = []) {
  const pw = findPlaywright(extraStarts), chromium = pw.mod.chromium, args = launchArgs(), errs = [];
  const tries = [{ executablePath: process.env.PLAYWRIGHT_CHROME || undefined, args }, { channel: 'chrome', args }];
  for (const o of tries) { try { return { browser: await chromium.launch(o), pw }; } catch (e) { errs.push(String(e.message).split('\n')[0]); } }
  const e = new Error('Chromium could not be launched (' + errs.join(' | ') + ').\nInstall one with: npx playwright-core install chromium   (or set PLAYWRIGHT_CHROME=/path/to/chrome-or-chrome-headless-shell)'); e.code = 'HP_NO_BROWSER'; throw e;
}
export const ffmpegOk = () => { try { execSync('ffmpeg -version', { stdio: 'ignore' }); return true; } catch { return false; } };
