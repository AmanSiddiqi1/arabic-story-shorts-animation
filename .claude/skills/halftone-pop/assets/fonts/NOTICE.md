# Bundled fonts

The woff2 files are the Latin and Arabic subsets served by Google Fonts (downloaded unmodified; Google Fonts lists each family as OFL), used as base64 `@font-face` data inside generated players so renders work offline.

| Family | Files here | Licence | Copyright holder (from its OFL.txt) |
|---|---|---|---|
| Bangers | `bangers-latin-400` | SIL OFL 1.1 | The Bangers Project Authors (Vernon Adams) |
| Cairo (variable, used at weight 800) | `cairo-arabic-800`, `cairo-latin-800` | SIL OFL 1.1 | The Cairo Project Authors (Mohamed Gaber, Accademia di Belle Arti di Urbino) |
| Noto Naskh Arabic (variable, used at weight 700) | `naskh-arabic-700`, `naskh-latin-700` | SIL OFL 1.1 | The Noto Project Authors (Google) |
| Scheherazade New (static 700) | `sch-arabic-700`, `sch-latin-700` | SIL OFL 1.1, Reserved Font Names "Scheherazade" and "SIL" | SIL Global |

The full licence text for each family is in `licenses/`. The OFL permits bundling and redistributing the unmodified fonts with software provided the copyright notice and licence travel with them and the fonts are not sold on their own; Scheherazade New's Reserved Font Names mean the files must not be modified and renamed. These files are unmodified Google Fonts downloads. (The skill itself is still private: see `engine/original/PROVENANCE.md`.)

If you replace a font, download it from https://fonts.google.com, keep its OFL.txt in `licenses/`, and update `presets/arabic.json`.
