'use client';
  
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ShamsehEightStar, BotehMark } from './motifs';

interface InteractiveSilkHeroProps {
  imageSrc?: string;
  audioSrc?: string;
  className?: string;
  onOpenConsultation?: () => void;
}

// تنظیمات اصلی؛ سرعت انیمیشن به نرخ فریم نمایشگر وابسته نیست.
const SILK = {
  cols: 15,
  rows: 22,
  step: 1 / 120,
  iterations: 8,
  maxSteps: 8,
  damping: 5.2,
  gravity: 95,
  hoverRadius: 115,
  hoverStrength: 2.4,
  grabResponse: 32,
  maxGrabSpeed: 1600,
  maxSpeed: 850,
  releaseSpeed: 190,
  structuralCompliance: 0.000008,
  shearCompliance: 0.00006,
  bendCompliance: 0.0005,
  grabCompliance: 0.000002,
} as const;

interface SilkPoint {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  rx: number;
  ry: number;
  vx: number;
  vy: number;
  origX: number;
  origY: number;
  u: number;
  v: number;
}

interface DistanceConstraint {
  a: SilkPoint;
  b: SilkPoint;
  length: number;
  compliance: number;
  lambda: number;
}

interface Attachment {
  point: SilkPoint;
  freedom: number;
  lambdaX: number;
  lambdaY: number;
}

interface Grab {
  point: SilkPoint;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  lambdaX: number;
  lambdaY: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
const follow = (rate: number, dt: number) => 1 - Math.exp(-rate * dt);

// فیزیک مستقل از React: state روی هر فریم تغییر نمی‌کند.
class SilkSimulation {
  points: SilkPoint[] = [];
  constraints: DistanceConstraint[] = [];
  attachments: Attachment[] = [];
  grab: Grab | null = null;
  width = 0;
  height = 0;
  clothWidth = 0;
  clothHeight = 0;
  left = 0;
  top = 52;
  time = 0;
  sound = 0;
  soundTarget = 0;
  tilt = 0;
  tiltTarget = 0;
  reducedMotion = false;
  releaseTime = 0;
  pointer = { x: 0, y: 0, targetX: 0, targetY: 0, inside: false };

  constructor(width: number, height: number) {
    for (let r = 0; r < SILK.rows; r++) {
      for (let c = 0; c < SILK.cols; c++) {
        this.points.push({
          x: 0, y: 0, prevX: 0, prevY: 0, rx: 0, ry: 0,
          vx: 0, vy: 0, origX: 0, origY: 0,
          u: c / (SILK.cols - 1), v: r / (SILK.rows - 1),
        });
      }
    }
    const connect = (a: SilkPoint, b: SilkPoint, compliance: number) => {
      this.constraints.push({ a, b, compliance, length: 0, lambda: 0 });
    };
    for (let r = 0; r < SILK.rows; r++) {
      for (let c = 0; c < SILK.cols; c++) {
        const p = this.at(c, r);
        if (r === 0) this.attachments.push({ point: p, freedom: 0, lambdaX: 0, lambdaY: 0 });
        if (c + 1 < SILK.cols) connect(p, this.at(c + 1, r), SILK.structuralCompliance);
        if (r + 1 < SILK.rows) connect(p, this.at(c, r + 1), SILK.structuralCompliance);
        if (c + 1 < SILK.cols && r + 1 < SILK.rows) {
          connect(p, this.at(c + 1, r + 1), SILK.shearCompliance);
          connect(this.at(c + 1, r), this.at(c, r + 1), SILK.shearCompliance);
        }
        if (c + 2 < SILK.cols) connect(p, this.at(c + 2, r), SILK.bendCompliance);
        if (r + 2 < SILK.rows) connect(p, this.at(c, r + 2), SILK.bendCompliance);
      }
    }
    this.resize(width, height);
  }

  at(c: number, r: number) { return this.points[r * SILK.cols + c]; }

  resize(width: number, height: number) {
    if (width === this.width && height === this.height) return;
    const oldWidth = this.clothWidth;
    const oldHeight = this.clothHeight;
    const oldLeft = this.left;
    const oldTop = this.top;
    this.width = width;
    this.height = height;
    this.top = Math.min(52, height * 0.13);
    this.clothWidth = Math.max(1, Math.min(width * 0.82, 400));
    // فضای کافی برای منگوله‌ها و راهنمای پایین حفظ می‌شود.
    this.clothHeight = Math.max(1, Math.min(540, height - this.top - 76));
    this.left = (width - this.clothWidth) / 2;
    const sx = oldWidth ? this.clothWidth / oldWidth : 1;
    const sy = oldHeight ? this.clothHeight / oldHeight : 1;
    this.endGrab();
    this.pointer.inside = false;
    for (const p of this.points) {
      p.origX = this.left + p.u * this.clothWidth;
      p.origY = this.top + p.v * this.clothHeight;
      p.x = oldWidth ? this.left + (p.x - oldLeft) * sx : p.origX;
      p.y = oldHeight ? this.top + (p.y - oldTop) * sy : p.origY;
      p.vx *= sx;
      p.vy *= sy;
      p.prevX = p.rx = p.x;
      p.prevY = p.ry = p.y;
    }
    for (const s of this.constraints) {
      s.length = Math.hypot(s.b.origX - s.a.origX, s.b.origY - s.a.origY);
    }
  }

  movePointer(x: number, y: number, inside: boolean, reset = false) {
    const p = this.pointer;
    // هنگام ورود، از مختصات واقعی شروع می‌کنیم؛ نه از -1000!
    if (reset || (!p.inside && !this.grab)) { p.x = x; p.y = y; }
    p.targetX = x;
    p.targetY = y;
    p.inside = inside;
  }

  nearest(x: number, y: number, radius: number): SilkPoint | null {
    let result: SilkPoint | null = null;
    let best = radius * radius;
    for (const p of this.points) {
      const distance = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (distance < best) { best = distance; result = p; }
    }
    return result;
  }

  beginGrab(x: number, y: number, radius: number) {
    const point = this.nearest(x, y, radius);
    if (!point) return false;
    this.movePointer(x, y, true, true);
    this.releaseTime = 0;
    this.grab = {
      point, offsetX: point.x - x, offsetY: point.y - y,
      x: point.x, y: point.y, lambdaX: 0, lambdaY: 0,
    };
    return true;
  }

  endGrab() {
    if (!this.grab) return;
    const held = this.grab.point;
    // انرژی رهاسازی محدود می‌شود، اما نقاط به جای اولیه teleport نمی‌شوند.
    for (const p of this.points) {
      if (Math.hypot(p.origX - held.origX, p.origY - held.origY) > 130) continue;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > SILK.releaseSpeed) {
        p.vx *= SILK.releaseSpeed / speed;
        p.vy *= SILK.releaseSpeed / speed;
      }
    }
    this.grab = null;
    this.releaseTime = 0.28;
  }

  resetInterpolation() {
    for (const p of this.points) { p.prevX = p.x; p.prevY = p.y; }
    this.pointer.x = this.pointer.targetX;
    this.pointer.y = this.pointer.targetY;
  }

  step(dt: number) {
    this.time += dt;
    this.sound += (this.soundTarget - this.sound) * follow(5, dt);
    this.tilt += (this.tiltTarget - this.tilt) * follow(3, dt);
    this.releaseTime = Math.max(0, this.releaseTime - dt);
    const pointer = this.pointer;
    const previousX = pointer.x;
    const previousY = pointer.y;
    const pointerBlend = follow(24, dt);
    pointer.x += (pointer.targetX - pointer.x) * pointerBlend;
    pointer.y += (pointer.targetY - pointer.y) * pointerBlend;
    let hoverVX = (pointer.x - previousX) / dt;
    let hoverVY = (pointer.y - previousY) / dt;
    const hoverSpeed = Math.hypot(hoverVX, hoverVY);
    if (hoverSpeed > 900) { hoverVX *= 900 / hoverSpeed; hoverVY *= 900 / hoverSpeed; }

    const grab = this.grab;
    if (grab) {
      // offset محل واقعی گرفتن را حفظ می‌کند؛ نقطه زیر ماوس ناگهان جابه‌جا نمی‌شود.
      const targetX = clamp(pointer.targetX + grab.offsetX, -this.clothWidth * 0.3, this.width + this.clothWidth * 0.3);
      const targetY = clamp(pointer.targetY + grab.offsetY, 8, this.height + this.clothHeight * 0.3);
      let dx = (targetX - grab.x) * follow(SILK.grabResponse, dt);
      let dy = (targetY - grab.y) * follow(SILK.grabResponse, dt);
      const distance = Math.hypot(dx, dy);
      const limit = SILK.maxGrabSpeed * dt;
      if (distance > limit) { dx *= limit / distance; dy *= limit / distance; }
      grab.x += dx;
      grab.y += dy;
      grab.lambdaX = grab.lambdaY = 0;
    }

    // اتصال‌های بالایی نرم‌اند: گوشهٔ بالا هم قابل گرفتن است، نه pinned دائمی.
    for (const a of this.attachments) {
      let targetFreedom = 0;
      if (grab && grab.point.v < 0.22) {
        const distance = Math.hypot(grab.point.origX - a.point.origX, grab.point.origY - a.point.origY);
        const weight = Math.max(0, 1 - distance / Math.min(150, this.clothWidth * 0.5));
        targetFreedom = weight * weight;
      }
      a.freedom += (targetFreedom - a.freedom) * follow(targetFreedom > a.freedom ? 18 : 4, dt);
      a.lambdaX = a.lambdaY = 0;
    }

    const damping = Math.exp(-(this.reducedMotion ? 12 : SILK.damping + (this.releaseTime > 0 ? 6 : 0)) * dt);
    const startup = Math.min(1, this.time / 0.8);
    for (const p of this.points) {
      p.prevX = p.x;
      p.prevY = p.y;
      const free = 0.15 + p.v * 0.85;
      const breeze = this.reducedMotion ? 0 : (
        Math.sin(this.time * 0.9 + p.v * 3.4) * 13 +
        Math.sin(this.time * 1.7 + p.u * 2 + p.v * 4) * this.sound * 25 +
        this.tilt * 14
      ) * free * startup;
      let ax = breeze;
      let ay = SILK.gravity * startup;
      // فقط حرکت ماوس نسیم ایجاد می‌کند. ماوس ساکن پارچه را پس نمی‌زند.
      if (pointer.inside && !grab && !this.reducedMotion) {
        const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        const weight = Math.max(0, 1 - distance / SILK.hoverRadius) ** 2;
        ax += hoverVX * SILK.hoverStrength * weight;
        ay += hoverVY * SILK.hoverStrength * weight * 0.65;
      }
      p.vx = p.vx * damping + ax * dt;
      p.vy = p.vy * damping + ay * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }

    const invDtSquared = 1 / (dt * dt);
    for (const s of this.constraints) s.lambda = 0;
    for (let iteration = 0; iteration < SILK.iterations; iteration++) {
      // جهت حل یک‌درمیان عوض می‌شود تا شبکه به یک سمت سوگیری نداشته باشد.
      const reverse = iteration % 2 === 1;
      for (let j = 0; j < this.constraints.length; j++) {
        const s = this.constraints[reverse ? this.constraints.length - 1 - j : j];
        const dx = s.b.x - s.a.x;
        const dy = s.b.y - s.a.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 0.00001) continue;
        const alpha = s.compliance * invDtSquared;
        const deltaLambda = (-(distance - s.length) - alpha * s.lambda) / (2 + alpha);
        s.lambda += deltaLambda;
        const correction = deltaLambda / distance;
        s.a.x -= dx * correction;
        s.a.y -= dy * correction;
        s.b.x += dx * correction;
        s.b.y += dy * correction;
      }
      for (const a of this.attachments) {
        const alpha = (0.000001 + a.freedom * 0.025) * invDtSquared;
        const dx = (a.point.origX - a.point.x - alpha * a.lambdaX) / (1 + alpha);
        const dy = (a.point.origY - a.point.y - alpha * a.lambdaY) / (1 + alpha);
        a.lambdaX += dx;
        a.lambdaY += dy;
        a.point.x += dx;
        a.point.y += dy;
      }
      if (grab) {
        const alpha = SILK.grabCompliance * invDtSquared;
        const dx = (grab.x - grab.point.x - alpha * grab.lambdaX) / (1 + alpha);
        const dy = (grab.y - grab.point.y - alpha * grab.lambdaY) / (1 + alpha);
        grab.lambdaX += dx;
        grab.lambdaY += dy;
        grab.point.x += dx;
        grab.point.y += dy;
      }
    }
    for (const p of this.points) {
      p.vx = (p.x - p.prevX) / dt;
      p.vy = (p.y - p.prevY) / dt;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > SILK.maxSpeed) {
        p.vx *= SILK.maxSpeed / speed;
        p.vy *= SILK.maxSpeed / speed;
      }
    }
  }
}

function outline(ctx: CanvasRenderingContext2D, cloth: SilkSimulation) {
  ctx.beginPath();
  for (let c = 0; c < SILK.cols; c++) {
    const p = cloth.at(c, 0);
    if (c === 0) ctx.moveTo(p.rx, p.ry); else ctx.lineTo(p.rx, p.ry);
  }
  for (let r = 1; r < SILK.rows; r++) { const p = cloth.at(SILK.cols - 1, r); ctx.lineTo(p.rx, p.ry); }
  for (let c = SILK.cols - 2; c >= 0; c--) { const p = cloth.at(c, SILK.rows - 1); ctx.lineTo(p.rx, p.ry); }
  for (let r = SILK.rows - 2; r > 0; r--) { const p = cloth.at(0, r); ctx.lineTo(p.rx, p.ry); }
  ctx.closePath();
}

type SilkTexture = HTMLCanvasElement | HTMLImageElement;

function drawTriangle(ctx: CanvasRenderingContext2D, p0: SilkPoint, p1: SilkPoint, p2: SilkPoint, image: SilkTexture) {
  const area = (p1.rx - p0.rx) * (p2.ry - p0.ry) - (p1.ry - p0.ry) * (p2.rx - p0.rx);
  if (Math.abs(area) < 0.05) return;
  const u0 = p0.u * image.width, v0 = p0.v * image.height;
  const u1 = p1.u * image.width, v1 = p1.v * image.height;
  const u2 = p2.u * image.width, v2 = p2.v * image.height;
  const determinant = u0 * (v1 - v2) - u1 * (v0 - v2) + u2 * (v0 - v1);
  if (Math.abs(determinant) < 0.00001) return;
  const a = (p0.rx * (v1 - v2) - p1.rx * (v0 - v2) + p2.rx * (v0 - v1)) / determinant;
  const b = (p0.ry * (v1 - v2) - p1.ry * (v0 - v2) + p2.ry * (v0 - v1)) / determinant;
  const c = (u0 * (p1.rx - p2.rx) - u1 * (p0.rx - p2.rx) + u2 * (p0.rx - p1.rx)) / determinant;
  const d = (u0 * (p1.ry - p2.ry) - u1 * (p0.ry - p2.ry) + u2 * (p0.ry - p1.ry)) / determinant;
  const e = p0.rx - a * u0 - c * v0;
  const f = p0.ry - b * u0 - d * v0;
  const centerX = (p0.rx + p1.rx + p2.rx) / 3;
  const centerY = (p0.ry + p1.ry + p2.ry) / 3;
  ctx.save();
  ctx.beginPath();
  // هم‌پوشانی بسیار کم برای کاهش درز سفید بین مثلث‌های بافت.
  for (let i = 0; i < 3; i++) {
    const p = i === 0 ? p0 : i === 1 ? p1 : p2;
    const dx = p.rx - centerX, dy = p.ry - centerY;
    const scale = 0.4 / Math.max(1, Math.hypot(dx, dy));
    const x = p.rx + dx * scale, y = p.ry + dy * scale;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  const sx = Math.max(0, Math.min(u0, u1, u2) - 2);
  const sy = Math.max(0, Math.min(v0, v1, v2) - 2);
  const sw = Math.min(image.width, Math.max(u0, u1, u2) + 2) - sx;
  const sh = Math.min(image.height, Math.max(v0, v1, v2) + 2) - sy;
  ctx.drawImage(image, sx, sy, sw, sh, sx, sy, sw, sh);
  ctx.restore();
}

interface SilkDot {
  c: number;
  r: number;
  u: number;
  v: number;
  radius: number;
  tier: 0 | 1 | 2;
}

interface SilkPointCloud {
  tier0: SilkDot[];
  tier1: SilkDot[];
  tier2: SilkDot[];
}

/**
 * طراحی شاهکار وکتوری نقشه ترمه اصیل یزد با نقاط سفید (Artisanal Royal Termeh Dotwork):
 * الهام‌گرفته از کهن‌ترین دست‌بافته‌های یزد و نقوش سنتی ترنج و چهاربته شاهی (مطابق با رفرنس‌های اصیل):
 * - بته‌جقه‌های اصیل شاهی (سرو خمیده - نماد جاودانگی و آزادگی با فرم گلابی‌شکل، دالبری‌های طاووسی و ترنجچه مرکزی)
 * - ترنج مرکزی شاه‌عباسی با شمسه ۱۶پر، گلبرگ‌های دالبری مقرنس و سرترنج‌های چهارگانه
 * - لچک‌های چهارگوشه محرابی با قوس‌های اسلیمی
 * - حاشیه کتیبه‌ای و زنجیره‌ای با بته‌های ریز متوالی و مرواریددوزی
 * - پیچک‌های اسلیمی و غنچه‌های ختایی
 */

// ارزیابی منحنی مکعبی بزیه برای خلق دقیق‌ترین انحناهای اسلیمی و بته‌جقه
function cubicBezierPoint(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

function sampleBezierPath(
  segments: { x: number; y: number }[][],
  pointsPerSeg: number = 10
) {
  const points: { x: number; y: number }[] = [];
  for (const seg of segments) {
    for (let i = 0; i < pointsPerSeg; i++) {
      const t = i / pointsPerSeg;
      points.push(cubicBezierPoint(seg[0], seg[1], seg[2], seg[3], t));
    }
  }
  return points;
}

// کالبدشناسی و هندسهٔ دقیق بته‌جقه اصیل ایرانی (منطبق بر رفرنس ۴ - سرو خمیده با قاعده گلابی و طره حلزونی)
const BOTEH_CONTOUR_SEGMENTS = [
  // ۱. کمان گرد و برآمدهٔ پایه (Base swell)
  [
    { x: 0.00, y: 0.44 },
    { x: -0.16, y: 0.44 },
    { x: -0.28, y: 0.32 },
    { x: -0.30, y: 0.14 },
  ],
  // ۲. صعود یال بیرونی و ستون فقرات سرو به سمت اوج (Outer spine)
  [
    { x: -0.30, y: 0.14 },
    { x: -0.32, y: -0.10 },
    { x: -0.22, y: -0.32 },
    { x: -0.06, y: -0.44 },
  ],
  // ۳. انحنای طرهٔ سرخمیده بر فراز تاج به سمت راست (Crown arch)
  [
    { x: -0.06, y: -0.44 },
    { x: 0.10, y: -0.48 },
    { x: 0.24, y: -0.38 },
    { x: 0.22, y: -0.22 },
  ],
  // ۴. پیچش مارپیچ حلزونی به درون قلب کلاله (Inward hook spiral)
  [
    { x: 0.22, y: -0.22 },
    { x: 0.20, y: -0.10 },
    { x: 0.08, y: -0.10 },
    { x: 0.06, y: -0.20 },
  ],
  // ۵. کانون مارپیچ سرخمیده
  [
    { x: 0.06, y: -0.20 },
    { x: 0.04, y: -0.28 },
    { x: 0.14, y: -0.30 },
    { x: 0.12, y: -0.18 },
  ],
  // ۶. فرود گلوی درونی به سمت کمرگاه تراشیده (Throat & waist)
  [
    { x: 0.12, y: -0.18 },
    { x: 0.08, y: -0.06 },
    { x: 0.06, y: 0.04 },
    { x: 0.09, y: 0.14 },
  ],
  // ۷. برآمدگی پهلوی راست به سمت شکم پایه
  [
    { x: 0.09, y: 0.14 },
    { x: 0.14, y: 0.24 },
    { x: 0.24, y: 0.30 },
    { x: 0.22, y: 0.40 },
  ],
  // ۸. بازگشت نرم به نقطهٔ اتصال مرکز پایه
  [
    { x: 0.22, y: 0.40 },
    { x: 0.20, y: 0.44 },
    { x: 0.10, y: 0.44 },
    { x: 0.00, y: 0.44 },
  ],
];

// لایه قاب درونی بته‌جقه
const BOTEH_INNER_SEGMENTS = BOTEH_CONTOUR_SEGMENTS.map((seg) =>
  seg.map((p) => ({
    x: p.x * 0.74 - 0.01,
    y: p.y * 0.74 + 0.04,
  }))
);

// ترنجچه اشکی کانون بته‌جقه
const BOTEH_MEDALLION_SEGMENTS = [
  [
    { x: -0.03, y: 0.14 },
    { x: -0.10, y: 0.20 },
    { x: -0.10, y: 0.32 },
    { x: -0.02, y: 0.36 },
  ],
  [
    { x: -0.02, y: 0.36 },
    { x: 0.05, y: 0.36 },
    { x: 0.08, y: 0.30 },
    { x: 0.06, y: 0.20 },
  ],
  [
    { x: 0.06, y: 0.20 },
    { x: 0.04, y: 0.15 },
    { x: 0.00, y: 0.12 },
    { x: -0.03, y: 0.14 },
  ],
];

// بته‌جقهٔ مینیاتوری حاشیه
const MINI_BOTEH_CONTOUR = [
  [
    { x: 0.0, y: 0.4 },
    { x: -0.25, y: 0.2 },
    { x: -0.2, y: -0.2 },
    { x: 0.0, y: -0.4 },
  ],
  [
    { x: 0.0, y: -0.4 },
    { x: 0.2, y: -0.3 },
    { x: 0.1, y: -0.1 },
    { x: 0.05, y: -0.15 },
  ],
  [
    { x: 0.05, y: -0.15 },
    { x: 0.05, y: 0.1 },
    { x: 0.2, y: 0.2 },
    { x: 0.0, y: 0.4 },
  ],
];

const BOTEH_OUTER_PTS = sampleBezierPath(BOTEH_CONTOUR_SEGMENTS, 10);
const BOTEH_INNER_PTS = sampleBezierPath(BOTEH_INNER_SEGMENTS, 8);
const BOTEH_CORE_PTS = sampleBezierPath(BOTEH_MEDALLION_SEGMENTS, 6);
const MINI_BOTEH_PTS = sampleBezierPath(MINI_BOTEH_CONTOUR, 5);

function generateArtisanalTermehDots(
  clothCols: number = SILK.cols,
  clothRows: number = SILK.rows
): SilkPointCloud {
  const tier0: SilkDot[] = [];
  const tier1: SilkDot[] = [];
  const tier2: SilkDot[] = [];
  const numCellCols = clothCols - 1;
  const numCellRows = clothRows - 1;
  const ASPECT = 1.48; // نسبت ابعاد قواره آویخته ترمه

  const addDot = (u: number, v: number, radius: number, tier: 0 | 1 | 2 = 1) => {
    if (u < 0.02 || u > 0.98 || v < 0.02 || v > 0.98) return;
    const cellC = Math.min(numCellCols - 1, Math.max(0, Math.floor(u * numCellCols)));
    const localU = u * numCellCols - cellC;
    const cellR = Math.min(numCellRows - 1, Math.max(0, Math.floor(v * numCellRows)));
    const localV = v * numCellRows - cellR;

    const dot: SilkDot = {
      c: cellC,
      r: cellR,
      u: Math.max(0, Math.min(1, localU)),
      v: Math.max(0, Math.min(1, localV)),
      radius,
      tier,
    };

    if (tier === 0) tier0.push(dot);
    else if (tier === 1) tier1.push(dot);
    else tier2.push(dot);
  };

  const drawLine = (
    u1: number,
    v1: number,
    u2: number,
    v2: number,
    count: number,
    r: number,
    tier: 0 | 1 | 2 = 1
  ) => {
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      addDot(u1 + (u2 - u1) * t, v1 + (v2 - v1) * t, r, tier);
    }
  };

  const drawRosette = (cx: number, cy: number, radius: number, petals = 8) => {
    addDot(cx, cy, 2.6, 0);
    for (let i = 0; i < petals; i++) {
      const a = (i * Math.PI * 2) / petals;
      addDot(cx + Math.cos(a) * radius, cy + (Math.sin(a) * radius) / ASPECT, 1.6, 0);
      addDot(cx + Math.cos(a) * radius * 1.6, cy + (Math.sin(a) * radius * 1.6) / ASPECT, 1.1, 1);
    }
  };

  // رسم بته‌جقه اصیل شاهی با تمامی جزئیات سنتی (دالبری، ترنجچه، گل شاه‌عباسی، نگین تاج)
  const drawMasterBoteh = (
    cx: number,
    cy: number,
    scale: number,
    angleRad: number,
    flipX: boolean = false
  ) => {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    const transform = (p: { x: number; y: number }) => {
      const px = (flipX ? -p.x : p.x) * scale;
      const py = p.y * scale;
      return {
        u: cx + px * cos - (py * sin) / ASPECT,
        v: cy + (px * sin + py * cos) / ASPECT,
      };
    };

    // ۱. کانتور بیرونی با دالبری‌های پر طاووسی (Peacock Scallops)
    for (let i = 0; i < BOTEH_OUTER_PTS.length; i++) {
      const pt = transform(BOTEH_OUTER_PTS[i]);
      addDot(pt.u, pt.v, 1.7, 0);

      if (i % 2 === 0) {
        const nextPt = transform(BOTEH_OUTER_PTS[(i + 1) % BOTEH_OUTER_PTS.length]);
        const prevPt = transform(BOTEH_OUTER_PTS[(i - 1 + BOTEH_OUTER_PTS.length) % BOTEH_OUTER_PTS.length]);
        const dx = nextPt.u - prevPt.u;
        const dy = (nextPt.v - prevPt.v) * ASPECT;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        addDot(pt.u + nx * 0.010, pt.v + (ny * 0.010) / ASPECT, 1.2, 1);
        if (i % 4 === 0) {
          addDot(pt.u + nx * 0.018, pt.v + (ny * 0.018) / ASPECT, 1.4, 0);
        }
      }
    }

    // ۲. قاب درونی بته‌جقه
    for (let i = 0; i < BOTEH_INNER_PTS.length; i++) {
      const pt = transform(BOTEH_INNER_PTS[i]);
      addDot(pt.u, pt.v, 1.2, 1);
    }

    // ۳. ترنجچه مرکزی درون پایه
    for (let i = 0; i < BOTEH_CORE_PTS.length; i++) {
      const pt = transform(BOTEH_CORE_PTS[i]);
      addDot(pt.u, pt.v, 1.3, 0);
    }

    // ۴. گل شاه‌عباسی ۸پر درون کانون ترنجچه
    const coreCenter = transform({ x: 0.0, y: 0.24 });
    drawRosette(coreCenter.u, coreCenter.v, (0.022 * scale) / 0.24, 8);

    // ۵. نگین درخشان مرصع بر نوک طره سرخمیده
    const tipJewel = transform({ x: 0.12, y: -0.18 });
    addDot(tipJewel.u, tipJewel.v, 2.5, 0);

    // ۶. گل‌های ختایی مینیاتوری درون بدنه بته
    const floret1 = transform({ x: -0.09, y: -0.06 });
    drawRosette(floret1.u, floret1.v, (0.011 * scale) / 0.24, 6);
    const floret2 = transform({ x: -0.02, y: -0.20 });
    drawRosette(floret2.u, floret2.v, (0.009 * scale) / 0.24, 6);
  };

  // رسم بته‌جقه ریز حاشیه
  const drawMiniBoteh = (
    cx: number,
    cy: number,
    scale: number,
    angleRad: number,
    flipX: boolean = false
  ) => {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    for (let i = 0; i < MINI_BOTEH_PTS.length; i++) {
      const px = (flipX ? -MINI_BOTEH_PTS[i].x : MINI_BOTEH_PTS[i].x) * scale;
      const py = MINI_BOTEH_PTS[i].y * scale;
      const u = cx + px * cos - (py * sin) / ASPECT;
      const v = cy + (px * sin + py * cos) / ASPECT;
      addDot(u, v, 1.2, 1);
    }
    addDot(cx, cy, 1.5, 0);
  };

  // =========================================================================
  // ترکیب‌بندی نقشه اصیل ترمه یزد (مطابق رفرنس ۳ - ترنج و چهاربته شاهی)
  // =========================================================================

  // ۱. حاشیه‌های زرین و قاب کتیبه‌ای (Borders)
  // حاشیه مروارید بیرونی
  const bOutL = 0.045, bOutR = 0.955, bOutT = 0.035, bOutB = 0.965;
  drawLine(bOutL, bOutT, bOutR, bOutT, 65, 1.5, 0);
  drawLine(bOutR, bOutT, bOutR, bOutB, 85, 1.5, 0);
  drawLine(bOutR, bOutB, bOutL, bOutB, 65, 1.5, 0);
  drawLine(bOutL, bOutB, bOutL, bOutT, 85, 1.5, 0);

  // نوار زنجیره میانی
  const bMidL = 0.062, bMidR = 0.938, bMidT = 0.048, bMidB = 0.952;
  drawLine(bMidL, bMidT, bMidR, bMidT, 60, 1.1, 2);
  drawLine(bMidR, bMidT, bMidR, bMidB, 80, 1.1, 2);
  drawLine(bMidR, bMidB, bMidL, bMidB, 60, 1.1, 2);
  drawLine(bMidL, bMidB, bMidL, bMidT, 80, 1.1, 2);

  // زنجیرهٔ بته‌های مینیاتوری متوالی در ۴ جهت حاشیه (Running Botehs)
  for (let u = 0.12; u <= 0.88; u += 0.055) {
    drawMiniBoteh(u, 0.041, 0.026, Math.PI / 2, false);
    drawMiniBoteh(u, 0.959, 0.026, -Math.PI / 2, false);
  }
  for (let v = 0.10; v <= 0.90; v += 0.045) {
    drawMiniBoteh(0.053, v, 0.026, 0, false);
    drawMiniBoteh(0.947, v, 0.026, Math.PI, false);
  }

  // حاشیه کتیبه‌ای درونی
  const bInL = 0.082, bInR = 0.918, bInT = 0.065, bInB = 0.935;
  drawLine(bInL, bInT, bInR, bInT, 55, 1.3, 1);
  drawLine(bInR, bInT, bInR, bInB, 75, 1.3, 1);
  drawLine(bInR, bInB, bInL, bInB, 55, 1.3, 1);
  drawLine(bInL, bInB, bInL, bInT, 75, 1.3, 1);

  // ۲. لچک‌های چهارگوشه محرابی با قوس‌های مقرنس (Architectural Lachaks)
  const corners = [
    { cx: bInL, cy: bInT, a1: 0, a2: Math.PI * 0.5 },
    { cx: bInR, cy: bInT, a1: Math.PI * 0.5, a2: Math.PI },
    { cx: bInR, cy: bInB, a1: Math.PI, a2: Math.PI * 1.5 },
    { cx: bInL, cy: bInB, a1: Math.PI * 1.5, a2: Math.PI * 2 },
  ];
  corners.forEach(({ cx, cy, a1, a2 }) => {
    for (let s = 1; s <= 3; s++) {
      const r = s * 0.050;
      for (let i = 0; i <= 14; i++) {
        const a = a1 + ((a2 - a1) * i) / 14;
        addDot(cx + Math.cos(a) * r, cy + (Math.sin(a) * r) / ASPECT, s === 2 ? 1.5 : 1.1, s === 2 ? 0 : 1);
      }
    }
  });

  // ۳. ترنج مرکزی شاه‌عباسی و سرترنج‌ها (Central Royal Toranj)
  const tCx = 0.5, tCy = 0.50;
  addDot(tCx, tCy, 3.6, 0); // نگین کانون

  // شمسه خورشیدی ۱۶پر کانون
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI * 2) / 16;
    addDot(tCx + Math.cos(a) * 0.024, tCy + (Math.sin(a) * 0.024) / ASPECT, 1.6, 0);
    addDot(tCx + Math.cos(a) * 0.048, tCy + (Math.sin(a) * 0.048) / ASPECT, 2.0, 0);
    addDot(tCx + Math.cos(a) * 0.072, tCy + (Math.sin(a) * 0.072) / ASPECT, 1.5, 1);
  }

  // ۱۲ گلبرگ دالبری مقرنس ترنج با نگین‌های سرتاج
  const lobes = 12;
  for (let i = 0; i < lobes; i++) {
    const aMid = (i * Math.PI * 2) / lobes;
    const aPrev = ((i - 0.5) * Math.PI * 2) / lobes;
    const aNext = ((i + 0.5) * Math.PI * 2) / lobes;

    const rBase = 0.082;
    const rPeak = 0.120;
    for (let s = 0; s <= 6; s++) {
      const frac = s / 6;
      const angle = aPrev + (aNext - aPrev) * frac;
      const radius = rBase + (rPeak - rBase) * Math.sin(frac * Math.PI);
      addDot(tCx + Math.cos(angle) * radius, tCy + (Math.sin(angle) * radius) / ASPECT, 1.5, s === 3 ? 0 : 1);
    }
    addDot(tCx + Math.cos(aMid) * (rPeak + 0.015), tCy + (Math.sin(aMid) * (rPeak + 0.015)) / ASPECT, 2.2, 0);
  }

  // سرترنج‌های شاهی در ۴ جهت جغرافیایی (Sar-Toranj Pendants)
  const sarToranj = [
    { dx: 0, dy: -0.14 },
    { dx: 0, dy: 0.14 },
    { dx: -0.15, dy: 0 },
    { dx: 0.15, dy: 0 },
  ];
  sarToranj.forEach(({ dx, dy }) => {
    drawRosette(tCx + dx, tCy + dy, 0.020, 8);
    addDot(tCx + dx * 1.25, tCy + dy * 1.25, 2.5, 0);
  });

  // ۴. چهار بته‌جقه بزرگ شاهی در چهار گوشه (منطبق بر رفرنس ۳):
  // پایه گرد در گوشه خارجی، یال بیرونی در امتداد حاشیه، و طره سرخمیده معطوف به سمت ترنج مرکزی!
  drawMasterBoteh(0.25, 0.25, 0.28, Math.PI * 0.72, false); // بالا چپ
  drawMasterBoteh(0.75, 0.25, 0.28, -Math.PI * 0.72, true); // بالا راست
  drawMasterBoteh(0.25, 0.75, 0.28, Math.PI * 0.28, false); // پایین چپ
  drawMasterBoteh(0.75, 0.75, 0.28, -Math.PI * 0.28, true); // پایین راست

  // ۵. چهار بته‌جقه اقماری جانبی (Satellite Botehs)
  drawMasterBoteh(0.18, 0.50, 0.16, 0, false); // جناح چپ
  drawMasterBoteh(0.82, 0.50, 0.16, 0, true);  // جناح راست
  drawMasterBoteh(0.50, 0.16, 0.16, -Math.PI / 2, false); // کلاله بالا
  drawMasterBoteh(0.50, 0.84, 0.16, Math.PI / 2, false);  // کلاله پایین

  // ۶. پیچک‌های اسلیمی و غنچه‌های ختایی رابط (Eslimi Arabesques)
  const eslimiRoutes = [
    { x1: 0.38, y1: 0.40, cx: 0.32, cy: 0.35, x2: 0.26, y2: 0.32 },
    { x1: 0.62, y1: 0.40, cx: 0.68, cy: 0.35, x2: 0.74, y2: 0.32 },
    { x1: 0.38, y1: 0.60, cx: 0.32, cy: 0.65, x2: 0.26, y2: 0.68 },
    { x1: 0.62, y1: 0.60, cx: 0.68, cy: 0.65, x2: 0.74, y2: 0.68 },
  ];
  eslimiRoutes.forEach(({ x1, y1, cx, cy, x2, y2 }) => {
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const u = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
      const v = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
      addDot(u, v, 1.2, 1);
    }
    drawRosette(cx, cy, 0.014, 6);
  });

  // ۷. تار و پود ریز بافت زری زمینه (Micro-Stippled Silk Weft)
  for (let v = 0.12; v <= 0.88; v += 0.040) {
    const offset = Math.round(v * 100) % 8 === 0 ? 0.020 : 0;
    for (let u = 0.12; u <= 0.88; u += 0.040) {
      const distCenter = Math.hypot(u - 0.5, (v - 0.50) * ASPECT);
      const distTopLeft = Math.hypot(u - 0.25, (v - 0.25) * ASPECT);
      const distTopRight = Math.hypot(u - 0.75, (v - 0.25) * ASPECT);
      const distBottomLeft = Math.hypot(u - 0.25, (v - 0.75) * ASPECT);
      const distBottomRight = Math.hypot(u - 0.75, (v - 0.75) * ASPECT);
      if (
        distCenter > 0.15 &&
        distTopLeft > 0.16 &&
        distTopRight > 0.16 &&
        distBottomLeft > 0.16 &&
        distBottomRight > 0.16
      ) {
        addDot(u + offset, v, 0.75, 2);
      }
    }
  }

  return { tier0, tier1, tier2 };
}

/**
 * رندر دسته‌بندی‌شده و بی‌نهایت سریع ابرنقاط سفید (Batched Vector Point Cloud):
 * به جای صدها برش مثلثی سنگین، تمام ۲۰۰۰+ نقطه صرفاً با ۳ دستور ترسیم کارت گرافیک رسم می‌شوند!
 */
function renderPointCloud(
  ctx: CanvasRenderingContext2D,
  cloth: SilkSimulation,
  cloud: SilkPointCloud
) {
  // رده اول: نقاط سفید درخشان خالص (شاه‌نقاط بته‌جقه و گلابتون)
  if (cloud.tier0.length > 0) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    for (let i = 0; i < cloud.tier0.length; i++) {
      const d = cloud.tier0[i];
      const tl = cloth.at(d.c, d.r);
      const tr = cloth.at(d.c + 1, d.r);
      const bl = cloth.at(d.c, d.r + 1);
      const br = cloth.at(d.c + 1, d.r + 1);
      const u1 = 1 - d.u, v1 = 1 - d.v;
      const x = u1 * v1 * tl.rx + d.u * v1 * tr.rx + u1 * d.v * bl.rx + d.u * d.v * br.rx;
      const y = u1 * v1 * tl.ry + d.u * v1 * tr.ry + u1 * d.v * bl.ry + d.u * d.v * br.ry;
      ctx.moveTo(x + d.radius, y);
      ctx.arc(x, y, d.radius, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  // رده دوم: نقاط سفید مرواریدی (بدنه اصلی نقوش اسلیمی)
  if (cloud.tier1.length > 0) {
    ctx.fillStyle = '#F5EFE6';
    ctx.beginPath();
    for (let i = 0; i < cloud.tier1.length; i++) {
      const d = cloud.tier1[i];
      const tl = cloth.at(d.c, d.r);
      const tr = cloth.at(d.c + 1, d.r);
      const bl = cloth.at(d.c, d.r + 1);
      const br = cloth.at(d.c + 1, d.r + 1);
      const u1 = 1 - d.u, v1 = 1 - d.v;
      const x = u1 * v1 * tl.rx + d.u * v1 * tr.rx + u1 * d.v * bl.rx + d.u * d.v * br.rx;
      const y = u1 * v1 * tl.ry + d.u * v1 * tr.ry + u1 * d.v * bl.ry + d.u * d.v * br.ry;
      ctx.moveTo(x + d.radius, y);
      ctx.arc(x, y, d.radius, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  // رده سوم: نقاط عاجی ملایم (سایه‌روشن‌های زمینه)
  if (cloud.tier2.length > 0) {
    ctx.fillStyle = '#D6C8B5';
    ctx.beginPath();
    for (let i = 0; i < cloud.tier2.length; i++) {
      const d = cloud.tier2[i];
      const tl = cloth.at(d.c, d.r);
      const tr = cloth.at(d.c + 1, d.r);
      const bl = cloth.at(d.c, d.r + 1);
      const br = cloth.at(d.c + 1, d.r + 1);
      const u1 = 1 - d.u, v1 = 1 - d.v;
      const x = u1 * v1 * tl.rx + d.u * v1 * tr.rx + u1 * d.v * bl.rx + d.u * d.v * br.rx;
      const y = u1 * v1 * tl.ry + d.u * v1 * tr.ry + u1 * d.v * bl.ry + d.u * d.v * br.ry;
      ctx.moveTo(x + d.radius, y);
      ctx.arc(x, y, d.radius, 0, Math.PI * 2);
    }
    ctx.fill();
  }
}

function renderSilk(
  ctx: CanvasRenderingContext2D,
  cloth: SilkSimulation,
  image: SilkTexture | null,
  blend: number,
  isHalftone: boolean = true,
  pointCloud: SilkPointCloud | null = null
) {
  ctx.clearRect(0, 0, cloth.width, cloth.height);
  for (const p of cloth.points) {
    p.rx = p.prevX + (p.x - p.prevX) * blend;
    p.ry = p.prevY + (p.y - p.prevY) * blend;
  }
  ctx.save();
  ctx.translate(13, 19);
  ctx.filter = 'blur(15px)';
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  outline(ctx, cloth);
  ctx.fill();
  ctx.restore();

  ctx.save();
  outline(ctx, cloth);
  ctx.clip();
  const base = ctx.createLinearGradient(0, cloth.top, 0, cloth.top + cloth.clothHeight);
  if (isHalftone) {
    base.addColorStop(0, '#15050A');
    base.addColorStop(0.5, '#0E0206');
    base.addColorStop(1, '#080104');
  } else {
    base.addColorStop(0, '#7E1826');
    base.addColorStop(0.5, '#6E1624');
    base.addColorStop(1, '#5A121E');
  }
  ctx.fillStyle = base;
  ctx.fillRect(-cloth.width, -cloth.height, cloth.width * 3, cloth.height * 3);

  // رندر پرسرعت وکتوری نقاط در حالت Halftone
  if (isHalftone && pointCloud) {
    renderPointCloud(ctx, cloth, pointCloud);
  } else if (image) {
    for (let r = 0; r < SILK.rows - 1; r++) {
      for (let c = 0; c < SILK.cols - 1; c++) {
        const tl = cloth.at(c, r), tr = cloth.at(c + 1, r);
        const bl = cloth.at(c, r + 1), br = cloth.at(c + 1, r + 1);
        drawTriangle(ctx, tl, tr, bl, image);
        drawTriangle(ctx, tr, br, bl, image);
      }
    }
  }

  // درخشش هاله نوری روی پارچه
  if (!cloth.reducedMotion && (cloth.pointer.inside || cloth.sound > 0.02)) {
    const x = cloth.pointer.inside ? cloth.pointer.x : cloth.width / 2;
    const y = cloth.pointer.inside ? cloth.pointer.y : cloth.top + cloth.clothHeight * 0.45;
    const shine = ctx.createRadialGradient(x, y, 0, x, y, 165);
    const intensity = Math.min(0.19, cloth.sound * 0.1 + (cloth.pointer.inside ? 0.11 : 0));
    shine.addColorStop(0, `rgba(255,241,208,${intensity})`);
    shine.addColorStop(1, 'rgba(255,241,208,0)');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = shine;
    ctx.fillRect(-cloth.width, -cloth.height, cloth.width * 3, cloth.height * 3);
  }
  ctx.restore();

  // خط حاشیه زرین پارچه در حالت نقاط سفید
  if (isHalftone) {
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
    ctx.lineWidth = 1.6;
    outline(ctx, cloth);
    ctx.stroke();
    ctx.restore();
  }

  // میله ثابت می‌ماند؛ اتصال‌های پارچه همراه گوشهٔ گرفته‌شده انعطاف دارند.
  const rodY = cloth.top - 8;
  const rodLeft = cloth.left - 24, rodRight = cloth.left + cloth.clothWidth + 24;
  ctx.save();
  const brass = ctx.createLinearGradient(0, rodY - 6, 0, rodY + 6);
  brass.addColorStop(0, '#E5C068');
  brass.addColorStop(0.3, '#FDF3D0');
  brass.addColorStop(0.7, '#A87722');
  brass.addColorStop(1, '#5E410C');
  ctx.fillStyle = brass;
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 9;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  ctx.roundRect(rodLeft, rodY - 5, rodRight - rodLeft, 10, 4);
  ctx.fill();
  for (const side of [-1, 1]) {
    const x = side === -1 ? rodLeft : rodRight;
    ctx.beginPath();
    ctx.arc(x + side * 4, rodY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + side * 10, rodY - 9);
    ctx.lineTo(x + side * 20, rodY);
    ctx.lineTo(x + side * 10, rodY + 9);
    ctx.closePath();
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = '#C49733';
  ctx.lineWidth = 1.8;
  for (let c = 0; c < SILK.cols; c += 2) {
    const p = cloth.at(c, 0);
    ctx.beginPath();
    ctx.moveTo(p.origX, rodY + 3);
    ctx.quadraticCurveTo((p.origX + p.rx) / 2, Math.max(rodY + 11, p.ry + 5), p.rx, p.ry);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.origX, rodY + 3, 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let c = 0; c < SILK.cols; c += 2) {
    const p = cloth.at(c, SILK.rows - 1), previous = cloth.at(c, SILK.rows - 2);
    ctx.save();
    ctx.translate(p.rx, p.ry);
    ctx.rotate(Math.atan2(p.ry - previous.ry, p.rx - previous.rx) - Math.PI / 2);
    ctx.fillStyle = '#E5C068';
    ctx.beginPath();
    ctx.arc(0, 5, 3.5, 0, Math.PI * 2);
    ctx.fill();
    const tassel = ctx.createLinearGradient(0, 7, 0, 26);
    tassel.addColorStop(0, '#C49733');
    tassel.addColorStop(0.5, '#E5C068');
    tassel.addColorStop(1, '#8C6018');
    ctx.fillStyle = tassel;
    ctx.beginPath();
    ctx.moveTo(-3, 8); ctx.lineTo(3, 8); ctx.lineTo(5, 25); ctx.lineTo(-5, 25);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function createAudioSession(src: string) {
  const AudioContextClass = window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) throw new Error('Web Audio is unavailable');
  const context = new AudioContextClass();
  try {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none';
    audio.loop = true;
    audio.src = src;
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.85;
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    return { context, audio, analyser, source, data: new Uint8Array(analyser.frequencyBinCount) };
  } catch (error) {
    void context.close().catch(() => undefined);
    throw error;
  }
}

type AudioSession = ReturnType<typeof createAudioSession>;

function audioEnergy(session: AudioSession | null) {
  if (!session || session.audio.paused || session.context.state !== 'running') return 0;
  const { analyser, data } = session;
  analyser.getByteFrequencyData(data);
  const bassEnd = Math.max(1, Math.floor(data.length * 0.1));
  const midEnd = Math.floor(data.length * 0.5);
  let bass = 0, mid = 0, treble = 0;
  for (let i = 0; i < data.length; i++) {
    if (i < bassEnd) bass += data[i];
    else if (i < midEnd) mid += data[i];
    else treble += data[i];
  }
  // به‌جای ضربهٔ ناگهانی beat، دامنهٔ پیوسته و سپس هموارشده استفاده می‌شود.
  return clamp((bass / bassEnd * 0.7 + mid / (midEnd - bassEnd) * 0.25 + treble / (data.length - midEnd) * 0.05) / 255, 0, 1);
}

export function InteractiveSilkHero({
  imageSrc = '/images/hero.jpg',
  audioSrc = '/audio/ambient.mp3',
  className = '',
}: InteractiveSilkHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<SilkTexture | null>(null);
  const originalTextureRef = useRef<SilkTexture | null>(null);
  const pointCloudRef = useRef<SilkPointCloud>(generateArtisanalTermehDots(SILK.cols, SILK.rows));
  const isHalftoneRef = useRef(true);

  const [textureMode, setTextureMode] = useState<'halftone' | 'classic'>('halftone');
  const audioRef = useRef<AudioSession | null>(null);
  const playAttemptRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBusy, setAudioBusy] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteractedOnce, setHasInteractedOnce] = useState(false);

  // Reset audio UI state when the source changes during render (avoids
  // synchronous setState inside an effect). Session teardown stays in the
  // effect cleanup below so play/pause never rebuilds the cloth network.
  const [prevAudioSrc, setPrevAudioSrc] = useState(audioSrc);
  if (prevAudioSrc !== audioSrc) {
    setPrevAudioSrc(audioSrc);
    setIsPlaying(false);
    setAudioBusy(false);
    setAudioError(false);
  }

  // Same render-phase reset for the image error flag.
  const [prevImageSrc, setPrevImageSrc] = useState(imageSrc);
  if (prevImageSrc !== imageSrc) {
    setPrevImageSrc(imageSrc);
    setImageError(false);
  }

  const setMode = useCallback((mode: 'halftone' | 'classic') => {
    setTextureMode(mode);
    isHalftoneRef.current = mode === 'halftone';
    textureRef.current =
      mode === 'halftone'
        ? null
        : originalTextureRef.current;
  }, []);

  const pauseAudio = useCallback(() => {
    playAttemptRef.current++;
    audioRef.current?.audio.pause();
    setIsPlaying(false);
    setAudioBusy(false);
  }, []);

  // چرخهٔ صدا مستقل از فیزیک است؛ play/pause هرگز شبکهٔ پارچه را بازسازی نمی‌کند.
  useEffect(() => {
    // Capture ref objects (not `.current` values) so the cleanup reads the
    // latest session at teardown time without tripping exhaustive-deps for
    // DOM-node refs. These refs hold a mutable audio session / counter.
    const audioRefHandle = audioRef;
    const playAttemptRefHandle = playAttemptRef;
    return () => {
      playAttemptRefHandle.current++;
      const session = audioRefHandle.current;
      audioRefHandle.current = null;
      if (!session) return;
      session.audio.onpause = null;
      session.audio.onended = null;
      session.audio.onerror = null;
      session.audio.pause();
      session.audio.removeAttribute('src');
      session.audio.load();
      session.source.disconnect();
      session.analyser.disconnect();
      void session.context.close().catch(() => undefined);
    };
  }, [audioSrc]);

  const toggleAudio = useCallback(async () => {
    if (audioBusy) return;
    if (audioRef.current && !audioRef.current.audio.paused) { pauseAudio(); return; }
    let session: AudioSession | null = null;
    const attempt = ++playAttemptRef.current;
    try {
      setAudioError(false);
      setAudioBusy(true);
      session = audioRef.current;
      if (!session) {
        session = createAudioSession(audioSrc);
        audioRef.current = session;
        const current = session;
        current.audio.onpause = current.audio.onended = () => {
          if (audioRef.current === current) setIsPlaying(false);
        };
        current.audio.onerror = () => {
          if (audioRef.current === current) { pauseAudio(); setAudioError(true); }
        };
      }
      // هر دو درخواست داخل همان gesture کاربر شروع می‌شوند (مهم در Safari).
      await Promise.all([session.context.resume(), session.audio.play()]);
      if (attempt !== playAttemptRef.current || audioRef.current !== session) {
        session.audio.pause();
        return;
      }
      setIsPlaying(true);
    } catch (error) {
      if (attempt === playAttemptRef.current) {
        session?.audio.pause();
        setIsPlaying(false);
        setAudioError(true);
        console.warn('Audio playback failed:', error);
      }
    } finally {
      if (attempt === playAttemptRef.current) setAudioBusy(false);
    }
  }, [audioSrc, audioBusy, pauseAudio]);

  // تعویض تصویر هم فیزیک را ریست نمی‌کند. هر دو نسخه ترام نقطه‌ای و رنگی تولید می‌شوند.
  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    textureRef.current = null;
    image.onload = () => {
      if (cancelled) return;
      const scale = Math.min(1, 1024 / Math.max(image.naturalWidth, image.naturalHeight));
      const classicTexture = document.createElement('canvas');
      classicTexture.width = Math.max(1, Math.round(image.naturalWidth * scale));
      classicTexture.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = classicTexture.getContext('2d');
      if (context) {
        context.drawImage(image, 0, 0, classicTexture.width, classicTexture.height);
        originalTextureRef.current = classicTexture;
      } else {
        originalTextureRef.current = image;
      }

      textureRef.current = isHalftoneRef.current ? null : (originalTextureRef.current || image);
    };
    image.onerror = () => { if (!cancelled) setImageError(true); };
    image.src = imageSrc;
    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
      textureRef.current = null;
      originalTextureRef.current = null;
    };
  }, [imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const cloth = new SilkSimulation(Math.max(1, rect.width), Math.max(1, rect.height));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    cloth.reducedMotion = motion.matches;
    let frameId = 0;
    let lastTime = 0;
    let accumulator = 0;
    let visible = true;
    let disposed = false;
    let activePointer: number | null = null;

    const finishDrag = () => {
      const id = activePointer;
      activePointer = null;
      cloth.endGrab();
      canvas.style.cursor = 'grab';
      setIsInteracting(false);
      if (id !== null && canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(bounds.width * dpr), height = Math.round(bounds.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      if (bounds.width !== cloth.width || bounds.height !== cloth.height) {
        finishDrag();
        cloth.resize(bounds.width, bounds.height);
        accumulator = 0;
      }
      renderSilk(ctx, cloth, textureRef.current, 1, isHalftoneRef.current, pointCloudRef.current);
    };
    const loop = (now: number) => {
      frameId = 0;
      if (disposed || !visible || document.hidden) return;
      const elapsed = lastTime ? Math.min((now - lastTime) / 1000, SILK.step * SILK.maxSteps) : 0;
      lastTime = now;
      accumulator += elapsed;
      cloth.soundTarget = audioEnergy(audioRef.current);
      let steps = 0;
      while (accumulator >= SILK.step && steps < SILK.maxSteps) {
        cloth.step(SILK.step);
        accumulator -= SILK.step;
        steps++;
      }
      renderSilk(ctx, cloth, textureRef.current, clamp(accumulator / SILK.step, 0, 1), isHalftoneRef.current, pointCloudRef.current);
      if (glowRef.current) glowRef.current.style.transform = `scale(${1 + (cloth.reducedMotion ? 0 : cloth.sound * 0.22)})`;
      frameId = requestAnimationFrame(loop);
    };
    const syncVisibility = () => {
      if (disposed) return;
      if (!visible || document.hidden) {
        cancelAnimationFrame(frameId);
        frameId = 0;
        lastTime = accumulator = 0;
        finishDrag();
        cloth.pointer.inside = false;
        pauseAudio();
      } else if (!frameId) {
        lastTime = accumulator = 0;
        cloth.resetInterpolation();
        frameId = requestAnimationFrame(loop);
      }
    };
    const coordinates = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const x = (event.clientX - bounds.left) * cloth.width / Math.max(1, bounds.width);
      const y = (event.clientY - bounds.top) * cloth.height / Math.max(1, bounds.height);
      return { x, y, inside: x >= 0 && y >= 0 && x <= cloth.width && y <= cloth.height };
    };
    const onMove = (event: PointerEvent) => {
      if (!event.isPrimary || (activePointer !== null && activePointer !== event.pointerId)) return;
      const { x, y, inside } = coordinates(event);
      cloth.movePointer(x, y, inside);
      const near = !!cloth.nearest(x, y, event.pointerType === 'touch' ? 44 : 28);
      if (near || cloth.grab) setHasInteractedOnce(true);
      setIsInteracting(near || !!cloth.grab);
      canvas.style.cursor = cloth.grab ? 'grabbing' : near ? 'grab' : 'default';
    };
    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || activePointer !== null) return;
      const { x, y } = coordinates(event);
      if (!cloth.beginGrab(x, y, event.pointerType === 'touch' ? 44 : 28)) return;
      event.preventDefault();
      activePointer = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = 'grabbing';
      setIsInteracting(true);
      setHasInteractedOnce(true);
    };
    const onLeave = () => {
      // هنگام capture، خروج از canvas کشیدن را قطع نمی‌کند.
      cloth.pointer.inside = false;
      if (activePointer === null) setIsInteracting(false);
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;
      if (event.pointerType !== 'mouse') cloth.pointer.inside = false;
      finishDrag();
    };
    const onCancel = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;
      cloth.pointer.inside = false;
      finishDrag();
    };
    const onBlur = () => { cloth.pointer.inside = false; finishDrag(); };
    const onMotion = () => { cloth.reducedMotion = motion.matches; };
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null) cloth.tiltTarget = clamp(event.gamma / 25, -1, 1);
    };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onCancel);
    canvas.addEventListener('lostpointercapture', onCancel);
    window.addEventListener('blur', onBlur);
    window.addEventListener('resize', resize);
    window.addEventListener('deviceorientation', onOrientation);
    document.addEventListener('visibilitychange', syncVisibility);
    motion.addEventListener('change', onMotion);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncVisibility();
    }, { threshold: 0 });
    intersectionObserver.observe(container);
    resize();
    syncVisibility();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onCancel);
      canvas.removeEventListener('lostpointercapture', onCancel);
      const id = activePointer;
      activePointer = null;
      if (id !== null && canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', resize);
      window.removeEventListener('deviceorientation', onOrientation);
      document.removeEventListener('visibilitychange', syncVisibility);
      motion.removeEventListener('change', onMotion);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [pauseAudio]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] xs:h-[500px] sm:h-[560px] lg:h-[620px] flex items-center justify-center select-none overflow-visible ${className}`}
      aria-label="قوارهٔ ابریشمی تعاملی ترمه تسنیم"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 blur-3xl" aria-hidden="true">
        <div ref={glowRef} className="h-72 w-72 rounded-full bg-gradient-to-tr from-brand/60 via-gold/30 to-transparent" />
      </div>
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab touch-none"
        style={{ touchAction: 'none' }}
        role="img"
        aria-label="پیش‌نمایش تعاملی پارچه؛ با ماوس یا لمس، گوشه‌ها و سطح آن را بگیرید و بکشید."
      >
        پیش‌نمایش پارچهٔ ترمه تسنیم
      </canvas>
      <button
        type="button"
        onClick={toggleAudio}
        disabled={audioBusy}
        aria-busy={audioBusy}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'قطع موسیقی' : 'پخش موسیقی'}
        className="absolute top-4 right-4 z-30 p-3 rounded-full bg-[#18080E]/80 border border-gold/40 text-gold shadow-xl backdrop-blur-md hover:bg-[#18080E] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-60"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
          {isPlaying ? (
            <path strokeLinecap="round" strokeWidth="2" d="M10 9v6m4-6v6" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 8 6 4-6 4V8Z" />
          )}
        </svg>
      </button>

      {/* Texture Style Toggle: نقاط سفید ترام (Halftone Dots) vs ترمه رنگی */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-1 p-1 rounded-full bg-[#18080E]/85 border border-gold/40 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMode('halftone')}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
            textureMode === 'halftone'
              ? 'bg-gold text-[#1D0C13] shadow-md shadow-gold/30 font-black'
              : 'text-[#F5E9D7]/75 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>نقشهٔ ترام نقاط سفید (شاه‌عباسی)</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('classic')}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
            textureMode === 'classic'
              ? 'bg-gold text-[#1D0C13] shadow-md shadow-gold/30 font-black'
              : 'text-[#F5E9D7]/75 hover:text-white'
          }`}
        >
          <span>ترمهٔ رنگی</span>
        </button>
      </div>

      {(audioError || imageError) && (
        <p role="status" dir="rtl" className="absolute top-20 right-4 left-4 z-30 text-right text-[11px] text-gold-soft pointer-events-none">
          {audioError ? 'موسیقی بارگذاری نشد؛ می‌توانید دوباره امتحان کنید.' : 'تصویر پارچه بارگذاری نشد؛ پیش‌نمایش ساده نمایش داده می‌شود.'}
        </p>
      )}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-700 ${hasInteractedOnce ? 'opacity-50' : 'opacity-90'}`}
      >
        <div dir="rtl" className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#18080E]/90 border border-gold/40 text-gold-soft text-[11px] font-bold shadow-xl backdrop-blur-md">
          <BotehMark className={`w-3.5 h-3.5 text-gold transition-transform duration-500 ${isInteracting ? 'rotate-12' : ''}`} />
          <span>گوشهٔ پارچه را بگیرید و بکشید (نقاط با کشش فیزیکی تغییر شکل می‌دهند)</span>
          <ShamsehEightStar className="w-3 h-3 text-gold" />
        </div>
      </div>
    </div>
  );
}