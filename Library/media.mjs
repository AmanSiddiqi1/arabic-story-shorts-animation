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
// map entries [repository prefix, media prefix]; '*' matches one path segment and carries over (Animations/*/renders/ -> Renders/*/)
const rx = (pat) => new RegExp('^' + pat.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '([^/]+)'));
const MAP = CFG.map.map(([a, b]) => ({ a, b, ra: rx(a) })).sort((x, y) => y.a.length - x.a.length);
const sub = (pat, groups) => { let i = 0; return pat.replace(/\*/g, () => groups[i++]); };
export function toMedia(p) {
  const r = rel(p);
  if (isLocal()) return path.join(REPO, r);
  for (const { b, ra } of MAP) { const m = r.match(ra); if (m) return path.join(root(), sub(b, m.slice(1)) + r.slice(m[0].length)); }
  return null;
}
// where to WRITE a media file for repository path p (local path in local mode); parent folders are created
export function out(p) {
  const t = !isLocal() && fs.existsSync(root()) ? toMedia(p) : null, f = t || path.resolve(REPO, p);
  fs.mkdirSync(path.dirname(f), { recursive: true }); return f;
}
export function resolve(p) {
  if (isLocal()) return path.resolve(REPO, p);
  const m = toMedia(p); return m && fs.existsSync(m) ? m : path.resolve(REPO, p);
}
export function finalDir() { return isLocal() || !fs.existsSync(root()) ? path.join(REPO, 'MP4s') : path.dirname(toMedia('MP4s/x')); }
