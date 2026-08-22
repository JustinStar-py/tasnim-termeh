/* ------------------------------------------------------------------ */
/*  Full-bleed girih field of Termeh fragments (Khatam Stars).         */
/*                                                                     */
/*  The definitive Iranian star-and-cross girih tiling (eight-point    */
/*  khatam stars locked edge-to-edge with Persian crosses) covering    */
/*  the entire hero. No plain math polygons — authentic Khatam stars.  */
/*                                                                     */
/*  Every shape clips ONE shared Termeh image registered to the same   */
/*  coordinate space — each shape is a piece of the same textile,      */
/*  separated by hairline grout.                                       */
/* ------------------------------------------------------------------ */

export type Pt = [number, number];

export const VW = 1600;
export const VH = 900;
export const CENTER: Pt = [800, 450];

const rad = (d: number) => (d * Math.PI) / 180;

const polar = (cx: number, cy: number, r: number, deg: number): Pt => [
  cx + r * Math.cos(rad(deg)),
  cy - r * Math.sin(rad(deg)),
];

export const poly = (pts: Pt[]) =>
  pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/* ================= layer 1 — star-and-cross girih field ================= */
/*  The definitive Iranian tiling: eight-point khatam stars on a square   */
/*  lattice, their concavities locked edge-to-edge by Persian crosses.    */

const L = 400; // lattice spacing
const R = L / 2; // star circumradius — axial spikes touch tip to tip
const R_IN = 0.7654 * R; // star inner radius (two overlapping squares)
const R_NOTCH = 0.4142 * R; // cross diagonal notch depth

/** eight-point Khatam star (ستاره هشت‌پر خاتم), spikes on axes and diagonals */
const khatamStar = (cx: number, cy: number): Pt[] =>
  Array.from({ length: 16 }, (_, k) =>
    polar(cx, cy, k % 2 === 0 ? R : R_IN, k * 22.5)
  );

/** Persian cross (چلیپای ایرانی) nestled between four stars */
const girihCross = (cx: number, cy: number): Pt[] =>
  Array.from({ length: 16 }, (_, k) => {
    const radius = k % 4 === 0 ? R : k % 2 === 0 ? R_NOTCH : R_IN;
    return polar(cx, cy, radius, k * 22.5);
  });

export interface Piece {
  id: number;
  cx: number;
  cy: number;
  pts: Pt[];
  d: number; // entrance delay (ms)
  type: 'star' | 'cross';
}

const OX = CENTER[0] - 2 * L;
const OY = CENTER[1] - L;

const bloom = (cx: number, cy: number) =>
  Math.round(150 + Math.hypot(cx - CENTER[0], cy - CENTER[1]) * 0.35);

export const fieldPieces: Piece[] = [];
let pieceCounter = 0;

for (let i = -1; i <= 5; i++) {
  for (let j = -1; j <= 3; j++) {
    const cx = OX + i * L;
    const cy = OY + j * L;
    fieldPieces.push({
      id: pieceCounter++,
      cx,
      cy,
      pts: khatamStar(cx, cy),
      d: bloom(cx, cy),
      type: 'star',
    });
  }
}

for (let i = -1; i <= 4; i++) {
  for (let j = -1; j <= 2; j++) {
    const cx = OX + (i + 0.5) * L;
    const cy = OY + (j + 0.5) * L;
    fieldPieces.push({
      id: pieceCounter++,
      cx,
      cy,
      pts: girihCross(cx, cy),
      d: bloom(cx, cy),
      type: 'cross',
    });
  }
}

fieldPieces.sort((p, q) => p.d - q.d);
