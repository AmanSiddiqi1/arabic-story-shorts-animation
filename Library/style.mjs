// Style profiles for the Node scripts (render.mjs, stills.mjs): same rules as Library/style.py.
//   const ST = await import(.../Library/style.mjs); ST.filmName(CFG[, font]) -> "<title> - <fileLabel> - <Arabic font family>" (default: the story's arabicFont)
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const LIB = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT = 'halftone-pop';
export const styleId = (cfg) => (typeof cfg === 'string' ? cfg : (cfg && cfg.style) || DEFAULT);
export function load(cfg) {
  const id = styleId(cfg), f = path.join(LIB, 'styles', id, 'style.json');
  if (!fs.existsSync(f)) throw new Error(`style profile "${id}" not found (${f})`);
  return { ...JSON.parse(fs.readFileSync(f, 'utf8')), dir: path.dirname(f) };
}
const ARABIC = JSON.parse(fs.readFileSync(path.join(LIB, 'fonts', 'arabic.json'), 'utf8'));
export function arabicFamily(cfg, key) {
  const P = load(cfg), F = { ...ARABIC, ...(P.arabicFonts || {}) }, k = key || (cfg && cfg.arabicFont) || P.arabicFont || 'naskh';
  if (!F[k]) throw new Error(`Arabic font "${k}" unknown for style ${P.id}`); return F[k][0];
}
export const filmName = (cfg, font, title) => `${title || cfg.title} - ${load(cfg).fileLabel} - ${font || arabicFamily(cfg)}`;
