// Media resolver (Node). Same rules as Library/media.py: root = $ARABIC_STORY_MEDIA, else <repo>/.media-root,
// else defaultRoot in <repo>/media.config.json. LOCAL mode (default ".", root = the repository): paths are used as they
// are and finished MP4s go to <repo>/MP4s. SHARED mode (any other root): repository paths map to media paths through
// the prefix table, resolve() prefers the shared copy and falls back to the local file.
import fs from 'fs'; import os from 'os'; import path from 'path'; import { fileURLToPath } from 'url';
export const REPO = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CFG = JSON.parse(fs.readFileSync(path.join(REPO, 'media.config.json'), 'utf8'));
const expand = (p) => (p.startsWith('~/') ? path.join(os.homedir(), p.slice(2)) : p);
export function root() {
  let v = process.env[CFG.envVar];
  const f = path.join(REPO, '.media-root'); if (!v && fs.existsSync(f)) v = fs.readFileSync(f, 'utf8').trim();
  return path.resolve(REPO, expand(v || CFG.defaultRoot));
}
const real = (p) => { try { return fs.realpathSync(p); } catch { return path.resolve(p); } };
export const isLocal = () => real(root()) === real(REPO);
export const rel = (p) => path.relative(REPO, path.resolve(REPO, p)).split(path.sep).join('/');
export function toMedia(p) {
  const r = rel(p);
  if (isLocal()) return path.join(REPO, r);
  for (const [a, b] of [...CFG.map].sort((x, y) => y[0].length - x[0].length)) if (r.startsWith(a)) return path.join(root(), b + r.slice(a.length));
  return null;
}
export function resolve(p) {
  if (isLocal()) return path.resolve(REPO, p);
  const m = toMedia(p); return m && fs.existsSync(m) ? m : path.resolve(REPO, p);
}
export function finalDir() { return isLocal() || !fs.existsSync(root()) ? path.join(REPO, 'MP4s') : path.dirname(toMedia('MP4s/x')); }
