// ===== acting wrapper + catalogue of every cast member, prop, effect and set =====
// Every character drawn through the library accepts these shared acting fields on top of its own pose fields:
//   gaze: [gx, gy]  pupils look this way in SCREEN space (-1..1; [1, 0] = screen right, [0, 1] = down). Use lookAt().
//   lid:  0..1      upper lid (0 open, 1 shut). Combine with blink(): P.lid = Math.max(P.lid || 0, blink(t, seed)).
//   wet:  true      wet eyes (highlight and a drop under the eye).
//   sq:   1         squash (<1) / stretch (>1) about the feet, volume kept.
//   tip:  radians   tilt the whole body about the feet, positive = forward (toward the facing side).
//                   (named tip, not lean: the person figure already has its own torso 'lean')
//   alpha: 0..1     fade.
// Without these fields each character draws exactly as in its original story.
// LIFE.t: set it once per frame in a scene (LIFE.t = t) and every character with no explicit lid blinks naturally on its own seed
// (P.seed, or one derived from kind/pal/scale). Leave it null for the original behaviour. P.noBlink = true opts a character out.
const LIFE = { t: null };
const lifeSeed = (P) => P.seed ?? (((P.kind || '').length * 7 + (P.pal || 0) * 13 + Math.round((P.s || 1) * 20) + (P.v || 0) * 5) % 97 + 1);
function acting(raw, skin) {
  return function (ctx, P) {
    if (LIFE.t != null && P.lid == null && !P.noBlink && P.eyes !== 'shut' && P.eyes !== 'wide' && P.eyes !== 'x') { const b = blink(LIFE.t, lifeSeed(P)); if (b > 0) P = { ...P, lid: b }; }
    const eyes = !!(P.gaze || P.lid || P.wet), sq = P.sq ?? 1, tip = P.tip || 0;
    if (!eyes && sq === 1 && !tip && P.alpha == null) return raw(ctx, P);
    const dir = P.dir ?? 1, keep = { ...EYE };
    ctx.save(); if (P.alpha != null) ctx.globalAlpha *= P.alpha;
    if (sq !== 1 || tip) { ctx.translate(P.x, P.y); if (tip) ctx.rotate(tip * Math.sign(dir || 1)); if (sq !== 1) ctx.scale(1 + (1 - sq) * 0.7, sq); ctx.translate(-P.x, -P.y); }
    if (eyes) { EYE.on = true; EYE.gaze = P.gaze ? [P.gaze[0] * Math.sign(dir || 1), P.gaze[1]] : null; EYE.lid = P.lid || 0; EYE.wet = !!P.wet; EYE.lidColor = skin(P); }
    try { raw(ctx, P); } finally { Object.assign(EYE, keep); ctx.restore(); }
  };
}
lion = acting(lion, (P) => LPAL[P.pal || 0].body);
hare = acting(hare, (P) => HPAL[P.pal || 0].body);
deer = acting(deer, () => DEERC);
fox = acting(fox, () => FOXC);
monkey = acting(monkey, () => FURL);
turtle = acting(turtle, () => GREEN2);
tortoise = acting(tortoise, () => GREEN2);
bird = acting(bird, (P) => BIRD[P.kind || 'lark'].body);
songbird = acting(songbird, (P) => P.col || C.red);
elephant = acting(elephant, () => ELEPH);
frog = acting(frog, () => GREEN2);
person = acting(person, () => C.white);
// round 3 animals (cast/hooves.js, cast/small.js, cast/birds2.js; bird kinds hawk, dove, sparrow use the bird wrapper above)
horse = acting(horse, (P) => (HORSE_PAL[P.pal || 0] || HORSE_PAL[0]).body);
donkey = acting(donkey, (P) => (DONKEY_PAL[P.pal || 0] || DONKEY_PAL[0]).body);
camel = acting(camel, (P) => (CAMEL_PAL[P.pal || 0] || CAMEL_PAL[0]).body);
cat = acting(cat, (P) => (CAT_PAL[P.pal || 0] || CAT_PAL[0]).body);
rat = acting(rat, (P) => (RAT_PAL[P.pal ?? (P.kind === 'mouse' ? 1 : 0)] || RAT_PAL[0]).body);
sheep = acting(sheep, (P) => (SHEEP_PAL[P.pal || 0] || SHEEP_PAL[0]).face);

// ---------- catalogue (used by catalogue/catalogue.html; also a quick reference) ----------
// h, w: height and width in world units at s = 1 (feet at y); poses: sample pose fields shown in the catalogue.
const CAST = [
  { name: 'lion', w: 440, from: 'The Lion and the Hare', h: 290, poses: [{ label: 'stand' }, { label: 'walk', P: { ph: 1.2, amp: 1 } }, { label: 'roar', P: { roar: 1, brow: 1, puff: 1.15 } }, { label: 'crouch, talk', P: { crouch: 1, talk: 0.8, tailUp: 0.9 } }, { label: 'orange, smug', P: { pal: 1, eyes: 'open', lid: 0.5, mouth: 'smile' } }] },
  { name: 'hare', w: 150, from: 'The Lion and the Hare', h: 240, poses: [{ label: 'sit' }, { label: 'ears down, sad', P: { ears: -1, mouth: 'frown', lid: 0.4 } }, { label: 'talk, paw up', P: { talk: 0.8, raise: 1, brow: 1 } }, { label: 'tan, smile', P: { pal: 1, mouth: 'smile' } }, { label: 'scared', P: { eyes: 'wide', ears: 0.2, sq: 0.9, mouth: 'o' } }] },
  { name: 'deer', w: 300, from: 'The Lion and the Hare', h: 300, poses: [{ label: 'stand' }, { label: 'walk', P: { ph: 1, amp: 1 } }, { label: 'graze', P: { graze: 1 } }, { label: 'talk', P: { talk: 0.8 } }] },
  { name: 'fox', w: 400, from: 'The Fox and the Drum', h: 190, poses: [{ label: 'stand' }, { label: 'trot', P: { ph: 1, amp: 1 } }, { label: 'sit', P: { sit: 1 } }, { label: 'growl', P: { mouth: 'open', brow: 1, ears: 1, tailUp: 0.8 } }, { label: 'paw up, smile', P: { raise: 1, mouth: 'smile' } }, { label: 'reach (touch)', P: { reach: 1, tip: -0.07, ears: 0.8 } }, { label: 'sit, paws planted', P: { sit: 0.4, plant: true } }] },
  { name: 'monkey', w: 220, from: 'The Monkey and the Turtle', h: 200, poses: [{ label: 'sit' }, { label: 'eat a fig', P: { eat: 1, hold: 'fig' } }, { label: 'talk', P: { talk: 0.8, aL: [1.6, 2.2] } }, { label: 'frown', P: { mouth: 'frown', brow: 1 } }] },
  { name: 'turtle', w: 300, from: 'The Monkey and the Turtle', h: 130, poses: [{ label: 'swim', P: { ph: 1 } }, { label: 'head in', P: { ext: 0 } }, { label: 'talk', P: { talk: 0.8 } }, { label: 'wife', P: { wife: true, shell: '#2b7a38' } }] },
  { name: 'tortoise', w: 140, from: 'The Lion and the Hare', h: 90, poses: [{ label: 'walk', P: { ph: 1, amp: 1 } }, { label: 'hide', P: { hide: 1 } }, { label: 'smile', P: { mouth: 'smile' } }] },
  { name: 'bird', w: 150, from: 'The Lark and the Elephant', h: 110, poses: [{ label: 'lark' }, { label: 'lark flying', P: { fly: true, flap: 0.8 } }, { label: 'lark wail', P: { headRot: -0.6, beak: 1.7, eyes: 'shut', sag: -0.85, crest: 0.6 } }, { label: 'crow', P: { kind: 'crow', dir: -1 } }, { label: 'yellow', P: { kind: 'y' } }, { label: 'red', P: { kind: 'r' } }, { label: 'blue', P: { kind: 'b' } }] },
  { name: 'songbird', w: 100, from: 'The Lion and the Hare', h: 60, poses: [{ label: 'perched' }, { label: 'flying', P: { fly: true, flap: 1.2, col: C.yellow } }] },
  { name: 'elephant', w: 480, from: 'The Lark and the Elephant', h: 330, poses: [{ label: 'stand' }, { label: 'walk', P: { ph: 1, amp: 1, trunk: 0.3 } }, { label: 'smug', P: { eyes: 'smug', brow: -0.6, drop: -10, trunk: 0.5 } }, { label: 'raised foot', P: { lift: 100, drop: -48, trunk: 0.75, eyes: 'smug' } }, { label: 'blind, thirsty', P: { eyes: 'x', tongue: true, earUp: 0.5 } }] },
  { name: 'frog', w: 90, from: 'The Lark and the Elephant', h: 70, poses: [{ label: 'sit' }, { label: 'croak', P: { croak: 1 } }, { label: 'sad', P: { lid: 0.45 } }] },
  { name: 'horse', w: 340, from: 'round 3 (cast/hooves.js)', h: 345, poses: [{ label: 'white, saddle' }, { label: 'bay walk', P: { pal: 1, ph: 1.2, amp: 1 } }, { label: 'gallop', P: { pal: 1, ph: 0.3, amp: 1, gallop: 1, earL: -0.3, earR: -0.3 } }, { label: 'rear', P: { rear: 1, mouth: 'open', earL: -0.6, earR: -0.6 } }, { label: 'black, graze', P: { pal: 2, headDown: 1, saddle: false } }, { label: 'look back', P: { pal: 1, headTurn: 1 } }] },
  { name: 'donkey', w: 300, from: 'round 3 (cast/hooves.js)', h: 330, poses: [{ label: 'stand' }, { label: 'walk', P: { ph: 1.2, amp: 1 } }, { label: 'bray', P: { bray: 1, eyes: 'shut' } }, { label: 'sad, brown', P: { pal: 1, sag: 1 } }, { label: 'lie', P: { lie: 1, lid: 0.5 } }, { label: 'loaded', P: { load: ['sack', 'sack'], earL: 0.9 } }] },
  { name: 'camel', w: 420, from: 'round 3 (cast/hooves.js)', h: 380, poses: [{ label: 'stand' }, { label: 'pace', P: { ph: 1.2, amp: 1 } }, { label: 'kneel 0.5', P: { kneel: 0.5 } }, { label: 'kneel 1', P: { kneel: 1, chew: 0.4 } }, { label: 'saddle + load', P: { saddle: true, load: ['rug', 'chest'], pal: 1 } }, { label: 'look back', P: { headTurn: 1, pal: 2 } }] },
  { name: 'cat', w: 200, from: 'round 3 (cast/small.js)', h: 160, poses: [{ label: 'stand' }, { label: 'walk', P: { ph: 1.2, amp: 1 } }, { label: 'sit', P: { sit: 1, tailCurl: 0.8, tailHairs: 5 } }, { label: 'arch, puff, hiss', P: { arch: 1, puff: 1, mouth: 'open', ears: -1 } }, { label: 'crouch', P: { crouch: 1, tailUp: 0, ears: -0.2 } }, { label: 'white, lick', P: { pal: 1, lick: 1, sit: 1 } }, { label: 'orange', P: { pal: 2, mouth: 'smile' } }] },
  { name: 'rat', w: 280, from: 'round 3 (cast/small.js)', h: 90, poses: [{ label: 'rat' }, { label: 'walk', P: { ph: 1.2, amp: 1 } }, { label: 'sit, chew', P: { sit: 1, chew: 0.6 } }, { label: 'mouse, sniff', P: { kind: 'mouse', sniff: 1 } }, { label: 'mouse, roll', P: { kind: 'mouse', roll: 1, eyes: 'x' } }, { label: 'white, bib', P: { pal: 2, bib: true, talk: 0.7 } }] },
  { name: 'sheep', w: 230, from: 'round 3 (cast/small.js)', h: 165, poses: [{ label: 'ewe' }, { label: 'walk', P: { ph: 1.2, amp: 1 } }, { label: 'graze', P: { headDown: 1, chew: 0.3 } }, { label: 'ram', P: { kind: 'ram', pal: 1 } }, { label: 'lamb hop', P: { kind: 'lamb', hop: 1, mouth: 'open' } }, { label: 'fat, dark', P: { fat: 1, pal: 2 } }] },
  { name: 'bird', w: 190, from: 'round 3 kinds: hawk (cast/birds2.js)', h: 160, poses: [{ label: 'falcon', P: { kind: 'hawk' } }, { label: 'falcon fly', P: { kind: 'hawk', fly: true, flap: 0.7 } }, { label: 'eagle', P: { kind: 'hawk', pal: 1, beak: 1 } }, { label: 'vulture', P: { kind: 'hawk', pal: 2 } }, { label: 'grip', P: { kind: 'hawk', grip: 1, brow: 1 } }, { label: 'silhouette fly', P: { kind: 'hawk', pal: 1, fly: true, flap: -0.6, silhouette: true } }] },
  { name: 'bird', w: 150, from: 'round 3 kinds: dove, sparrow', h: 110, poses: [{ label: 'white dove', P: { kind: 'dove' } }, { label: 'dove fly', P: { kind: 'dove', fly: true, flap: 0.9 } }, { label: 'pigeon male, puff', P: { kind: 'dove', pal: 1, puff: 1, eyes: 'wide' } }, { label: 'pigeon female, chest', P: { kind: 'dove', pal: 2, chest: 1 } }, { label: 'sparrow', P: { kind: 'sparrow' } }, { label: 'pale sparrow', P: { kind: 'sparrow', pal: 1, beak: 1 } }, { label: 'red, badge', P: { kind: 'sparrow', pal: 2, badge: true } }] },
  { name: 'person', w: 120, from: 'The Thief and the Moonbeam (core/helpers.js)', h: 240, poses: [{ label: 'thief', P: { kind: 'thief' } }, { label: 'thief walk', P: { kind: 'thief', v: 1, ph: 1, amp: 1 } }, { label: 'owner', P: { kind: 'owner', mouth: 'smile' } }, { label: 'wife', P: { kind: 'wife', talk: 0.7 } }] },
];
const PROPS = [
  { name: 'nest', from: 'The Lark and the Elephant', draw: (c, x, y, t) => nestDraw(c, x, y, { nb: 1, t, eggs: 3, chicks: 0 }), label: 'nest with eggs' },
  { name: 'nest (chicks)', from: 'The Lark and the Elephant', draw: (c, x, y, t) => nestDraw(c, x, y, { nb: 1, t, eggs: 3, chicks: 3, ck: [{ gx: -1, gy: -1, wide: true }, { open: 1, gy: -1 }, { gx: 1, cw: 0.6 }] }), label: 'chicks acting' },
  { name: 'nest (crushed)', from: 'The Lark and the Elephant', draw: (c, x, y, t) => nestDraw(c, x, y, { ruinT: 5 }), label: 'nestRuin' },
  { name: 'drum', from: 'The Fox and the Drum', draw: (c, x, y) => drum(c, x, y, { r: 60, hole: 1 }), label: 'drum (hole)' },
  { name: 'fig / worm / heart', from: 'Monkey, Lark', draw: (c, x, y, t) => { fig(c, x - 40, y - 30, 16); worm(c, x + 30, y - 10, t); heart(c, x, y - 80, 30); }, label: 'fig, worm, heart' },
];
const SETS = [
  { name: 'sky day + sun + clouds + hillTrees', draw: (c, t) => { sky(c); sun(c, 760, 130, t); cloudFlat(c, 260, 160, 1); hillTrees(c); ground(c); } },
  { name: 'sky dawn + treeRow + bush', draw: (c, t) => { sky(c, { preset: 'dawn' }); sun(c, 820, 200, t); treeRow(c); ground(c); bush(c, { x: 260 }); bush(c, { x: 640, w: 270, h: 150, seed: 7 }); } },
  { name: 'sky dusk + tree (lark) + groundWithPit', draw: (c, t) => { sky(c, { preset: 'dusk' }); tree(c, 26, 900, TREE.larkLeft); tree(c, 922, 900, TREE.larkRight); pitBack(c); groundWithPit(c); } },
  { name: 'nightCity (moon, stars, skyline)', draw: (c) => { nightCity(c); } },
  { name: 'den', draw: (c, t) => { sky(c); sun(c, 200, 150, t); treeRow(c, { hmin: 360 }); ground(c); den(c); } },
  { name: 'wellShaft', draw: (c, t) => { sky(c); c.save(); c.translate(0, -380); c.restore(); wellShaft(c); } },
  { name: 'river, riverBank, islandHut, figTree', draw: (c, t) => { sky(c, { preset: 'day' }); river(c, t, { back: true }); riverBank(c); islandHut(c); figTree(c); river(c, t, { front: true }); } },
  { name: 'thicket + tree (drum tree)', draw: (c, t) => { sky(c); thicket(c); tree(c, 900, 900, { w: 104, top: 300, crowns: [[940, 250, 130], [850, 330, 100], [1000, 340, 90], [900, 180, 90]] }); ground(c); drum(c, 640, 900); } },
  { name: 'houseRoom + houseRoof', draw: (c) => { c.fillStyle = NAVY2; c.fillRect(0, 0, 1000, 1450); houseRoof(c); houseRoom(c); } },
];

// ---------- people sheet (catalogue/people.png): person costume presets and poses (cast/people.js, added 2026-11-16) ----------
const PEOPLE_SHEET = [
  { name: 'costumes', from: 'person costume: <preset>', cells: ['villager', 'villageWoman', 'carpenter', 'merchant', 'vizier', 'caliph', 'prince', 'lady'].map((c) => ({ label: c, P: { costume: c, mouth: 'smile' } })) },
  { name: 'costumes', from: '(continued)', cells: ['maiden', 'oldWoman', 'servant', 'bedouin', 'ascetic', 'physician', 'beanSeller'].map((c) => ({ label: c, P: { costume: c } })).concat([{ label: 'merchant pal', P: { costume: 'merchant', pal: { robe: GREEN, dot: GREEND, hc: C.yellow, hd: C.red } } }]) },
  { name: 'age, child', from: 'age 0..1, child: true', cells: [{ label: 'villager age 0', P: { costume: 'villager', age: 0 } }, { label: 'age 0.55', P: { costume: 'villager', age: 0.55 } }, { label: 'age 0.9', P: { costume: 'villager', age: 0.9 } }, { label: 'physician age 1', P: { costume: 'physician', age: 1, talk: 0.6 } },
    { label: 'child (servant)', P: { costume: 'servant', child: true, mouth: 'smile' } }, { label: 'child (maiden)', P: { costume: 'maiden', child: true } }, { label: 'child (prince)', P: { costume: 'prince', child: true, mouth: 'o' } }, { label: 'walk', P: { costume: 'bedouin', ph: 1.2, amp: 1 } }] },
  { name: 'poses', from: 'sit, seat, kneel, lie', cells: [{ label: 'sit stool', P: { costume: 'carpenter', sit: 1, seat: 'stool' } }, { label: 'sit 0.5', P: { costume: 'carpenter', sit: 0.5, seat: 'stool' } }, { label: 'sit floor', P: { costume: 'bedouin', sit: 1, seat: 'floor', handR: PERSON_HANDS.palmsUp.R } },
    { label: 'sit floor (tunic)', P: { costume: 'servant', sit: 1, seat: 'floor' } }, { label: 'kneel', P: { costume: 'ascetic', kneel: 1, handL: PERSON_HANDS.clasp.L, handR: PERSON_HANDS.clasp.R } }, { label: 'kneel, plead', P: { costume: 'villageWoman', kneel: 1, handL: PERSON_HANDS.reachBoth.L, handR: PERSON_HANDS.reachBoth.R, wet: true } },
    { label: 'lie', P: { costume: 'caliph', lie: 1, lid: 1, s: 0.8 }, dx: 60, dy: -60 }, { label: 'lie (owner)', P: { kind: 'owner', lie: 1, mouth: 'o', s: 0.8 }, dx: 60, dy: -60 }] },
  { name: 'poses', from: 'gestures + poses', cells: [{ label: 'vizier sit, chin', P: { costume: 'vizier', sit: 1, seat: 'bench', handR: PERSON_HANDS.chin.R } }, { label: 'lady sit, talk', P: { costume: 'lady', sit: 1, seat: 'floor', talk: 0.7 } }, { label: 'merchant kneel', P: { costume: 'merchant', kneel: 0.7, handR: PERSON_HANDS.pointFwd.R } },
    { label: 'wife sit', P: { kind: 'wife', sit: 1, seat: 'stool' } }, { label: 'thief kneel', P: { kind: 'thief', kneel: 1 } }, { label: 'oldWoman, stick', P: { costume: 'oldWoman', hold: 'stick', talk: 0.5 } }, { label: 'beanSeller hands', P: { costume: 'beanSeller', handLW: [-50, -120], handRW: [60, -150] }, world: true }, { label: 'prince wave', P: { costume: 'prince', handR: PERSON_HANDS.wave.R, mouth: 'smile' } }] },
];
SETS.push(
  { name: 'skyCycle u 0.08 (morning) + hillTrees', draw: (c, t) => { skyCycle(c, 0.08, { t }); hillTrees(c); ground(c); } },
  { name: 'skyCycle u 0.25 (noon)', draw: (c, t) => { skyCycle(c, 0.25, { t }); hillTrees(c); ground(c); } },
  { name: 'skyCycle u 0.45 (dusk)', draw: (c, t) => { skyCycle(c, 0.45, { t }); hillTrees(c); ground(c); } },
  { name: 'skyCycle u 0.72 (night)', draw: (c, t) => { skyCycle(c, 0.72, { t }); hillTrees(c); ground(c); } },
  { name: 'thoughtCloud (inside: a merchant dreams)', draw: (c, t) => { sky(c); ground(c); person(c, { x: 300, y: 900, s: 1.3, costume: 'villager', gaze: [0.6, -1], handR: PERSON_HANDS.chin.R });
    thoughtCloud(c, 600, 330, 620, 430, t, { tail: [330, 560], bg: C.yellow, scale: 0.75, at: [500, 760], inside: (k) => { sun(k, 760, 330, t); person(k, { x: 500, y: 960, s: 1, costume: 'merchant', mouth: 'smile', handL: PERSON_HANDS.armsOut.L, handR: PERSON_HANDS.armsOut.R }); } }); } },
);

// ---------- shared sets from sets/towns.js (added 2026-11-16, round 2). Strips show the whole strip on top and a 1:0.6 window below. ----------
const stripCell = (c, w, draw, a = 0) => { const k = 1000 / w; c.save(); c.beginPath(); c.rect(0, 0, 1000, 1230 * k); c.clip(); c.scale(k, k); draw(c); c.restore();
  const y0 = 1230 * k + 10, s = Math.min(0.6, (1230 - y0) / 1230); c.save(); c.beginPath(); c.rect(0, y0, 1000, 1230 - y0); c.clip(); c.translate(0, y0); c.scale(s, s); c.translate(-a, 0); draw(c); c.restore(); c.fillStyle = C.black; c.fillRect(0, y0 - 6, 1000, 6); };
SETS.push(
  { name: 'marketStreet clear + seed stall, door 0.6', draw: (c, t) => { marketStreet(c, { stalls: [{ x: 280, kind: 'seed' }], doors: [0.6], t }); } },
  { name: 'marketStreet dusk, rain, palace shut', draw: (c, t) => { marketStreet(c, { palette: 'dusk', palace: 'shut', rain: 1, t, shutters: 0.3 }); } },
  { name: 'marketStreet cold, palace lit, door open', draw: (c, t) => { marketStreet(c, { palette: 'cold', palace: 'lit', palaceDoor: 0.7, stalls: [{ x: 300, kind: 'jars', cols: [C.blue, C.white] }] }); } },
  { name: 'marketStreet alley: true', draw: (c, t) => { marketStreet(c, { alley: true, t }); } },
  { name: 'marketStreet w 2400, stalls, props', draw: (c, t) => stripCell(c, 2400, (k) => marketStreet(k, { w: 2400, stalls: [{ x: 300, kind: 'fruit' }, { x: 800, kind: 'cloth', cols: [C.yellow, C.red] }, { x: 1300, kind: 'animal' }, { x: 1700, kind: 'pots', state: 'closed' }], props: [['crate', 1050, {}], ['barrel', 1150, {}], ['mat', 560, {}]] }), 660) },
  { name: 'palaceHall (palace) + throne anchor', draw: (c, t) => { const A = palaceHall(c, { t }); person(c, { x: A.throne.x, y: A.throne.sitY, costume: 'caliph', sit: 1, seat: 'bench' }); } },
  { name: 'palaceHall wall blue, vault open 0.4', draw: (c, t) => { palaceHall(c, { wall: 'blue', vault: { open: 0.4 }, door: false, light: 0.6, t }); } },
  { name: 'palaceHall merchant, curtain 0.5, u 0.72', draw: (c, t) => { palaceHall(c, { variant: 'merchant', curtain: 0.5, doorOpen: 0.5, u: 0.72, stools: [720], t }); } },
  { name: 'desertRoad city left, wall, front palm', draw: (c, t) => stripCell(c, 2400, (k) => { desertRoad(k, { city: 'left', wall: [1340, 1560, 770], farCity: 2250, thorns: [1000], rocks: [1900] }); desertRoad(k, { front: true, frontPalms: [1100] }); }, 0) },
  { name: 'desertRoad w 2000, u 0.45, no road, lip', draw: (c, t) => stripCell(c, 2000, (k) => { desertRoad(k, { w: 2000, u: 0.45, road: false, rocks: [1750] }); desertRoad(k, { w: 2000, front: true, lip: { crest: [1560, 850] } }); }, 380) },
  { name: 'hutRoom day: jar, jug, mattress, door 0.5', draw: (c, t) => { hutRoom(c, { jar: true, jug: 520, mattress: { x0: 600, x1: 840 }, shelf: [180, 340, 470], door: 0.5, t }); } },
  { name: 'hutRoom night, dark 1, lamp on a stool', draw: (c, t) => { const o = { palette: 'night', window: [480, 420, 100, 100], peg: [860, 700], mat: [440, 700], stool: 430, lampAt: [430, 852], lamp: 1, t }; hutRoom(c, { ...o, layer: 'back' }); person(c, { x: 600, y: 892, costume: 'villager', lie: 1, lid: 1, s: 0.8 }); hutRoom(c, { ...o, dark: 1, layer: 'front' }); } },
  { name: 'villageYard (KD-009) sun 0.6 + yardLeaves', draw: (c, t) => { const A = villageYard(c, { sun: 0.6, door: 0.6, t }); monkey(c, { x: A.perch[0], y: A.perch[1] - 10, s: 0.8 }); yardLeaves(c, 0.3, t); } },
  { name: 'villageYard u 0.62, cottage moved, trough', draw: (c, t) => { villageYard(c, { u: 0.62, cottage: { x0: 560, x1: 960, top: 560, door: [620, 700, 720], win: [800, 880, 620, 700], chimney: [880, 915, 400] }, door: 0.3, trough: 500, tree: false, moon: [200, 330] }); bush(c, { x: 250, w: 280, h: 170 }); } },
  { name: 'countryRoad (KD-013 places) + front pass', draw: (c, t) => stripCell(c, 3000, (k) => { const A = countryRoad(k, {}); person(k, { x: A.wall[0].x, y: 900, costume: 'villager' }); countryRoad(k, { front: true }); }, 1300) },
  { name: 'countryRoad w 2400, u 0.55, city left', draw: (c, t) => stripCell(c, 2400, (k) => countryRoad(k, { w: 2400, u: 0.55, city: 'left', house: { x: 2300, lit: 1 }, places: [{ kind: 'tree', x: 900 }, { kind: 'milestone', x: 1100 }, { kind: 'bush', x: 1500 }] }), 0) },
);

// ---------- animals sheet (catalogue/animals.png): round 3 animals in poses, walk frames and riders (added 2026-11-16) ----------
// cells: { label, draw(c, x, y, s) } with (x, y) the feet point of the cell and s the row scale
const ANIMAL_SHEET = (() => {
  const F = (fn, extra) => (c, x, y, s) => window[fn](c, { x, y, s, dir: 1, ...extra });
  const walkCells = (fn, base, stride, n = 3) => Array.from({ length: n }, (_, i) => ({ label: `walk frame ${i + 1}`, draw: F(fn, { ...base, ph: i * 2.1, amp: 1 }) }));
  const ride = (mount, mP, pP) => (c, x, y, s) => rideOn(c, mount, { x, y, s, dir: 1, ...mP }, { s: s * 0.95, ...pP });
  return [
    { name: 'horse', s: 0.62, cells: [{ label: 'white, saddle', draw: F('horse', {}) }, ...walkCells('horse', { pal: 1 }), { label: 'gallop', draw: F('horse', { pal: 2, gallop: 1, ph: 0.4, amp: 1 }) }, { label: 'rear', draw: F('horse', { rear: 1, mouth: 'open', earL: -0.6, earR: -0.6 }) },
      { label: 'rider: prince', draw: ride('horse', {}, { costume: 'prince', mouth: 'smile' }) }, { label: 'rider: vizier, walk, lurch', draw: ride('horse', { pal: 1, ph: 1, amp: 1 }, { costume: 'vizier', lurch: 0.15, talk: 0.6 }) }] },
    { name: 'donkey', s: 0.68, cells: [{ label: 'stand', draw: F('donkey', {}) }, ...walkCells('donkey', {}), { label: 'bray', draw: F('donkey', { bray: 1, eyes: 'shut' }) }, { label: 'sad, lie', draw: F('donkey', { pal: 1, lie: 1, sag: 1 }) },
      { label: 'loaded, raise', draw: F('donkey', { load: ['sack', 'bindle'], raise: 1, mouth: 'smirk' }) }, { label: 'rider: villager', draw: ride('donkey', { pal: 1 }, { costume: 'villager', mouth: 'smile' }) }] },
    { name: 'camel', s: 0.56, cells: [{ label: 'stand', draw: F('camel', {}) }, ...walkCells('camel', {}), { label: 'kneel 0.5', draw: F('camel', { kneel: 0.5 }) }, { label: 'kneel 1, chew', draw: F('camel', { kneel: 1, chew: 0.5, pal: 1 }) },
      { label: 'rider: bedouin', draw: ride('camel', { saddle: true, load: ['rug'] }, { costume: 'bedouin', talk: 0.5 }) }, { label: 'rider, kneeling', draw: ride('camel', { saddle: true, kneel: 1, pal: 2 }, { costume: 'merchant', mouth: 'smile' }) }] },
    { name: 'cat', s: 1.1, cells: [{ label: 'stand', draw: F('cat', {}) }, ...walkCells('cat', {}), { label: 'sit, tail hairs', draw: F('cat', { sit: 1, tailHairs: 5, tailCurl: 0.8 }) }, { label: 'arch, puff, hiss', draw: F('cat', { arch: 1, puff: 1, mouth: 'open', ears: -1, eyes: 'wide' }) },
      { label: 'white, lick', draw: F('cat', { pal: 1, sit: 1, lick: 1, lid: 0.5 }) }, { label: 'orange, crouch', draw: F('cat', { pal: 2, crouch: 1, tailUp: 0, gaze: [1, 0] }) }] },
    { name: 'rat / mouse', s: 1.0, cells: [{ label: 'rat', draw: F('rat', {}) }, ...walkCells('rat', {}), { label: 'sit, chew', draw: F('rat', { sit: 1, chew: 0.5 }) }, { label: 'mouse, sniff', draw: F('rat', { kind: 'mouse', sniff: 1 }) },
      { label: 'mouse, roll, x eyes', draw: F('rat', { kind: 'mouse', roll: 1, eyes: 'x' }) }, { label: 'white, bib, talk', draw: F('rat', { pal: 2, bib: true, talk: 0.7 }) }] },
    { name: 'sheep', s: 1.0, cells: [{ label: 'ewe', draw: F('sheep', {}) }, ...walkCells('sheep', {}), { label: 'graze', draw: F('sheep', { headDown: 1, chew: 0.3 }) }, { label: 'ram', draw: F('sheep', { kind: 'ram', pal: 1, brow: 1 }) },
      { label: 'lamb hop', draw: F('sheep', { kind: 'lamb', hop: 1, mouth: 'open' }) }, { label: 'fat, dark, lie', draw: F('sheep', { fat: 1, pal: 2, lie: 1 }) }] },
    { name: 'hawk', s: 1.0, cells: [{ label: 'falcon', draw: F('bird', { kind: 'hawk' }) }, { label: 'falcon walk 1', draw: F('bird', { kind: 'hawk', ph: 0.6, amp: 1 }) }, { label: 'falcon walk 2', draw: F('bird', { kind: 'hawk', ph: 3.6, amp: 1 }) },
      { label: 'falcon fly, mouse', draw: (c, x, y, s) => bird(c, { x, y: y - 120 * s, s, kind: 'hawk', fly: true, flap: 0.6, carry: 'mouse', swing: 0.15 }) }, { label: 'eagle, grip', draw: F('bird', { kind: 'hawk', pal: 1, grip: 1, beak: 1 }) },
      { label: 'eagle fly, lamb', draw: (c, x, y, s) => bird(c, { x, y: y - 150 * s, s: s * 0.9, kind: 'hawk', pal: 1, fly: true, flap: -0.5, carry: 'lamb', swing: -0.1 }) }, { label: 'vulture', draw: F('bird', { kind: 'hawk', pal: 2, gaze: [1, 0.4] }) },
      { label: 'silhouette', draw: (c, x, y, s) => bird(c, { x, y: y - 90 * s, s, kind: 'hawk', fly: true, flap: 0.9, silhouette: true }) }] },
    { name: 'dove / sparrow', s: 1.3, cells: [{ label: 'white dove', draw: F('bird', { kind: 'dove' }) }, { label: 'dove fly', draw: (c, x, y, s) => bird(c, { x, y: y - 70 * s, s, kind: 'dove', fly: true, flap: 0.8 }) },
      { label: 'pigeon male, puff', draw: F('bird', { kind: 'dove', pal: 1, puff: 1, eyes: 'wide' }) }, { label: 'pigeon female, chest', draw: F('bird', { kind: 'dove', pal: 2, chest: 1 }) },
      { label: 'sparrow', draw: F('bird', { kind: 'sparrow' }) }, { label: 'sparrow walk', draw: F('bird', { kind: 'sparrow', ph: 1, amp: 1, beak: 0.8 }) }, { label: 'pale sparrow', draw: F('bird', { kind: 'sparrow', pal: 1 }) },
      { label: 'red, badge, fly', draw: (c, x, y, s) => bird(c, { x, y: y - 60 * s, s, kind: 'sparrow', pal: 2, badge: true, fly: true, flap: -0.4 }) }] },
  ];
})();
