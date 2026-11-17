// ===== AN-041 The Fox and the Crow: the tall mountain set (proposed for Library/ as rockyHill, see library_proposals.md) =====
// One world 1000 x 2300 (drawn from x -700 to 1700 so wide shots never show an edge). Top zone: terrace ground y 900 (x -200..600),
// pale shadow wall behind it (x 40..400, y 470..900), chasm x 600..690, nest pinnacle x 690..890 with a flat top at y 610.
// Ramps: ledge B y 1300 (x 0..540), ledge A y 1700 (x 480..1000). Foot zone: ground y 2100, cave mouth arch x 200..460, 230 high.
const F41_WW = 1000, F41_WH = 2300, F41_GT = 900, F41_GF = 2100, F41_X0 = -700, F41_X1 = 1700;
const F41_WALL = [[50, 884], [58, 530], [118, 474], [300, 478], [384, 522], [398, 884]];
const F41_CAVE = (() => { const p = []; for (let i = 0; i <= 24; i++) { const a = Math.PI + (i / 24) * Math.PI; p.push([330 + Math.cos(a) * 130, F41_GF + 4 + Math.sin(a) * 230]); } return p; })();
const F41_CHASM = [[600, 900], [690, 900], [684, 1080], [662, 1300], [650, 1520], [628, 1300], [612, 1080]];
const F41_ROCK = [[-720, 2310], [-720, 1900], [-560, 1700], [-430, 1430], [-300, 1180], [-200, 960], [-200, 900], [-120, 880], [-30, 760], [10, 640], [40, 500], [120, 444], [300, 452], [392, 500],
  [414, 640], [422, 860], [440, 900], [600, 900], [690, 900], [692, 700], [698, 622], [712, 610], [872, 610], [886, 618], [896, 680], [960, 760], [1100, 900], [1250, 1100], [1400, 1400], [1550, 1700], [1720, 1900], [1720, 2310]];

function f41HillDraw(c) {
  shape(c, F41_ROCK, STONE, { lw: 10, seed: 141, dot: STONED, pitch: 13, rad: 0.2, da: 0.65 });
  // blue Ben-Day shading on the left-facing faces
  const shade = (pts, a = 0.5) => { c.save(); K.poly(c, pts, true); c.clip(); c.globalAlpha = a; c.fillStyle = dotPat(c, C.blue, 11, 0.3); c.fillRect(-800, 0, 2600, 2400); c.restore(); };
  shade([[-720, 2310], [-720, 1900], [-560, 1700], [-430, 1430], [-300, 1180], [-200, 960], [-200, 1200], [-260, 1600], [-380, 2100], [-400, 2310]]);
  shade([[692, 700], [698, 622], [712, 610], [740, 640], [736, 900], [690, 900]], 0.55);
  shade([[520, 905], [600, 905], [612, 1080], [628, 1300], [560, 1290], [540, 1060]], 0.45);
  shade([[886, 618], [896, 680], [960, 760], [1100, 900], [1250, 1100], [1180, 1120], [1000, 900], [900, 760]], 0.35);
  // the pale wall behind the terrace (the hunter shadow falls on it)
  shape(c, F41_WALL, STONE2, { lw: 7, seed: 142 });
  // the chasm
  shape(c, F41_CHASM, NAVY2, { lw: 8, seed: 143, dot: '#1b3a8f', pitch: 12, rad: 0.25 });
  // terrace and pinnacle top edges
  seg(c, -200, 904, 600, 904, 12, STONE2, 4); seg(c, 712, 614, 872, 614, 10, STONE2, 4);
  // ledges (ramps)
  for (const [x0, x1, y] of [[0, 540, 1300], [480, 1000, 1700]]) { c.save(); c.globalAlpha = 0.35; c.fillStyle = NAVY2; c.fillRect(x0, y + 6, x1 - x0, 34); c.restore(); seg(c, x0, y, x1, y, 14, STONE2, 4.5); }
  // a few cracks and dry tufts (sparse: the crane passes fast)
  c.lineCap = 'round'; c.strokeStyle = C.black; c.lineWidth = 6;
  for (const [ax, ay, bx, by, cx, cy] of [[150, 1050, 175, 1110, 160, 1170], [820, 1000, 850, 1060, 840, 1120], [300, 1480, 330, 1540, 318, 1610], [760, 1880, 790, 1930, 780, 1990], [-300, 1500, -270, 1560, -282, 1630], [1200, 1500, 1230, 1560, 1222, 1630], [920, 1350, 950, 1400, 944, 1460], [60, 1900, 90, 1950, 84, 2010]]) { c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.lineTo(cx, cy); c.stroke(); }
  for (const [tx, ty] of [[-120, 900], [520, 900], [140, 1300], [700, 1700], [-40, 2100], [600, 2100], [960, 1700], [880, 612]]) for (let i = -1; i <= 1; i++) seg(c, tx + i * 7, ty - 2, tx + i * 14, ty - 26 + Math.abs(i) * 6, 4, SAND, 2);
  // the foot: ground, the cave mouth, old bones
  shape(c, [[-720, F41_GF], [1720, F41_GF], [1720, 2310], [-720, 2310]], SAND, { lw: 8, seed: 144, dot: C.red, pitch: 11, rad: 0.2, da: 0.5 });
  shape(c, [[-720, F41_GF - 6], [1720, F41_GF - 6], [1720, F41_GF + 16], [-720, F41_GF + 16]], '#9a8a5a', { lw: 5, seed: 145 });
  shape(c, F41_CAVE, NAVY2, { lw: 9, seed: 146, dot: '#1b3a8f', pitch: 12, rad: 0.25 });
  for (const [bx, by, a] of [[100, F41_GF + 90, -0.2], [640, F41_GF + 130, 0.25], [-200, F41_GF + 110, 0.1]]) f41Bone(c, bx, by, 70, a);
}
// baked in two bands (top zone at 1.6x for the close two-shots, the rest at 1.25x)
const F41_BANDS = [[-720, 380, 2440, 1100, 1.6], [-720, 1480, 2440, 830, 1.25]];
function f41HillLayer(i) { const [x0, y0, w, h, k] = F41_BANDS[i];
  return K.cached('f41hill' + i, () => { const cv = K.layer(Math.ceil(w * k), Math.ceil(h * k)), c = cv.getContext('2d'); c.scale(k, k); c.translate(-x0, -y0); f41HillDraw(c); return cv; }); }
function f41Hill(ctx) { for (let i = 0; i < F41_BANDS.length; i++) { const [x0, y0, w, h] = F41_BANDS[i]; ctx.drawImage(f41HillLayer(i), x0, y0, w, h); } }
