'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShamsehEightStar, BotehMark } from './motifs';

interface InteractiveSilkHeroProps {
  imageSrc?: string;
  className?: string;
  onOpenConsultation?: () => void;
}

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  origX: number;
  origY: number;
  u: number;
  v: number;
  pinned: boolean;
}

interface Spring {
  p1: Point;
  p2: Point;
  length: number;
}

export function InteractiveSilkHero({
  imageSrc = '/images/hero.jpg',
  className = '',
}: InteractiveSilkHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasInteractedOnce, setHasInteractedOnce] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;
    let time = 0;

    // Load Textile Texture Image
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageLoaded(true);
    };

    // Physics Simulation Constants
    const COLS = 13;
    const ROWS = 19;
    const FRICTION = 0.962; // High-density silk drape damping
    const GRAVITY = 0.18;
    const RELAXATION_STEPS = 4;

    let points: Point[] = [];
    let springs: Spring[] = [];

    // Mouse & Touch State
    const pointer = {
      x: -1000,
      y: -1000,
      oldX: -1000,
      oldY: -1000,
      vx: 0,
      vy: 0,
      isDown: false,
      isHovering: false,
    };

    let gyroTiltX = 0;

    // Initialize/Resize Grid
    const initCloth = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const displayWidth = rect.width;
      const displayHeight = rect.height;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      points = [];
      springs = [];

      // Proportions: center the hanging textile with margins
      const clothWidth = Math.min(displayWidth * 0.88, 380);
      const clothHeight = Math.min(displayHeight * 0.82, 520);
      const startX = (displayWidth - clothWidth) / 2;
      const startY = 48; // Space for brass rod fixture at top

      const cellW = clothWidth / (COLS - 1);
      const cellH = clothHeight / (ROWS - 1);

      // Create Nodes
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = startX + c * cellW;
          const y = startY + r * cellH;
          const u = c / (COLS - 1);
          const v = r / (ROWS - 1);
          const pinned = r === 0; // Top row fixed to the brass rod

          points.push({
            x,
            y,
            oldX: x,
            oldY: y,
            origX: x,
            origY: y,
            u,
            v,
            pinned,
          });
        }
      }

      const getPoint = (c: number, r: number) => points[r * COLS + c];

      // Structural & Shear Springs
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = getPoint(c, r);

          // Horizontal spring
          if (c < COLS - 1) {
            const pRight = getPoint(c + 1, r);
            springs.push({
              p1: p,
              p2: pRight,
              length: cellW,
            });
          }

          // Vertical spring
          if (r < ROWS - 1) {
            const pDown = getPoint(c, r + 1);
            springs.push({
              p1: p,
              p2: pDown,
              length: cellH,
            });
          }

          // Diagonal shear spring (right-down) for realistic cloth stiffness
          if (c < COLS - 1 && r < ROWS - 1) {
            const pDiag = getPoint(c + 1, r + 1);
            springs.push({
              p1: p,
              p2: pDiag,
              length: Math.hypot(cellW, cellH),
            });
          }

          // Diagonal shear spring (left-down)
          if (c > 0 && r < ROWS - 1) {
            const pDiagLeft = getPoint(c - 1, r + 1);
            springs.push({
              p1: p,
              p2: pDiagLeft,
              length: Math.hypot(cellW, cellH),
            });
          }
        }
      }
    };

    initCloth();

    // Fast affine triangle drawing helper
    const drawTexturedTriangle = (
      p0: Point,
      p1: Point,
      p2: Point,
      sourceImg: HTMLImageElement
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.clip();

      const u0 = p0.u * sourceImg.width;
      const v0 = p0.v * sourceImg.height;
      const u1 = p1.u * sourceImg.width;
      const v1 = p1.v * sourceImg.height;
      const u2 = p2.u * sourceImg.width;
      const v2 = p2.v * sourceImg.height;

      const delta = u0 * (v1 - v2) - u1 * (v0 - v2) + u2 * (v0 - v1);
      if (Math.abs(delta) > 0.0001) {
        const a = (p0.x * (v1 - v2) - p1.x * (v0 - v2) + p2.x * (v0 - v1)) / delta;
        const b = (p0.y * (v1 - v2) - p1.y * (v0 - v2) + p2.y * (v0 - v1)) / delta;
        const c = (u0 * (p1.x - p2.x) - u1 * (p0.x - p2.x) + u2 * (p0.x - p1.x)) / delta;
        const d = (u0 * (p1.y - p2.y) - u1 * (p0.y - p2.y) + u2 * (p0.y - p1.y)) / delta;
        const e = p0.x - a * u0 - c * v0;
        const f = p0.y - b * u0 - d * v0;

        ctx.transform(a, b, c, d, e, f);
        ctx.drawImage(sourceImg, 0, 0);
      }
      ctx.restore();
    };

    // Physics Update Loop
    const updatePhysics = () => {
      time += 0.024;

      // Pointer velocity
      pointer.vx = (pointer.x - pointer.oldX) * 0.8;
      pointer.vy = (pointer.y - pointer.oldY) * 0.8;
      pointer.oldX = pointer.x;
      pointer.oldY = pointer.y;

      const mouseRadius = 140;

      // 1. Verlet Integration on Nodes
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.pinned) continue;

        const vx = (p.x - p.oldX) * FRICTION;
        const vy = (p.y - p.oldY) * FRICTION;

        p.oldX = p.x;
        p.oldY = p.y;

        // Subtle ambient breathing breeze (like a quiet palace hall)
        const verticalFactor = (p.y - 48) / 450;
        const ambientBreeze =
          Math.sin(time + p.y * 0.015) *
          Math.cos(time * 0.7 + p.x * 0.012) *
          0.38 *
          verticalFactor;

        // Gyroscope tilt reaction on mobile
        const tiltForce = gyroTiltX * 0.15 * verticalFactor;

        p.x += vx + ambientBreeze + tiltForce;
        p.y += vy + GRAVITY;

        // Interactive mouse wind/repulsion force
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 1) {
          const force = (1 - dist / mouseRadius) * 4.2;
          const nx = dx / dist;
          const ny = dy / dist;

          p.x += nx * force + pointer.vx * 0.35;
          p.y += ny * force * 0.4 + pointer.vy * 0.2;
        }

        // Direct Touch Dragging on lower hem
        if (pointer.isDown && dist < 100) {
          p.x += (pointer.x - p.x) * 0.15;
          p.y += (pointer.y - p.y) * 0.15;
        }
      }

      // 2. Spring Relaxation Constraints
      for (let step = 0; step < RELAXATION_STEPS; step++) {
        for (let i = 0; i < springs.length; i++) {
          const s = springs[i];
          const dx = s.p2.x - s.p1.x;
          const dy = s.p2.y - s.p1.y;
          const currentDist = Math.sqrt(dx * dx + dy * dy);
          if (currentDist === 0) continue;

          const diff = (currentDist - s.length) / currentDist;
          const offsetX = dx * 0.5 * diff;
          const offsetY = dy * 0.5 * diff;

          if (!s.p1.pinned && !s.p2.pinned) {
            s.p1.x += offsetX;
            s.p1.y += offsetY;
            s.p2.x -= offsetX;
            s.p2.y -= offsetY;
          } else if (s.p1.pinned && !s.p2.pinned) {
            s.p2.x -= offsetX * 2;
            s.p2.y -= offsetY * 2;
          } else if (!s.p1.pinned && s.p2.pinned) {
            s.p1.x += offsetX * 2;
            s.p1.y += offsetY * 2;
          }
        }
      }
    };

    // Render Canvas Scene
    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (points.length === 0) return;

      const getPoint = (c: number, r: number) => points[r * COLS + c];

      // 1. Soft Realistic Drop Shadow under Cloth
      ctx.save();
      ctx.beginPath();
      const pTopLeft = getPoint(0, 0);
      const pTopRight = getPoint(COLS - 1, 0);
      const pBottomRight = getPoint(COLS - 1, ROWS - 1);
      const pBottomLeft = getPoint(0, ROWS - 1);

      ctx.moveTo(pTopLeft.x + 14, pTopLeft.y + 12);
      ctx.lineTo(pTopRight.x + 14, pTopRight.y + 12);
      ctx.lineTo(pBottomRight.x + 18, pBottomRight.y + 24);
      ctx.lineTo(pBottomLeft.x + 18, pBottomLeft.y + 24);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.filter = 'blur(18px)';
      ctx.fill();
      ctx.restore();

      // 2. Draw Cloth Mesh (Photorealistic Termeh Weave Texture)
      if (img.complete && img.naturalWidth > 0) {
        for (let r = 0; r < ROWS - 1; r++) {
          for (let c = 0; c < COLS - 1; c++) {
            const pTL = getPoint(c, r);
            const pTR = getPoint(c + 1, r);
            const pBL = getPoint(c, r + 1);
            const pBR = getPoint(c + 1, r + 1);

            // Two triangles per cell
            drawTexturedTriangle(pTL, pTR, pBL, img);
            drawTexturedTriangle(pTR, pBR, pBL, img);
          }
        }
      } else {
        // Fallback procedural royal silk gradient if image is still loading
        ctx.save();
        ctx.fillStyle = '#6E1624';
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const pt = getPoint(c, 0);
          c === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        }
        for (let r = 0; r < ROWS; r++) {
          const pt = getPoint(COLS - 1, r);
          ctx.lineTo(pt.x, pt.y);
        }
        for (let c = COLS - 1; c >= 0; c--) {
          const pt = getPoint(c, ROWS - 1);
          ctx.lineTo(pt.x, pt.y);
        }
        for (let r = ROWS - 1; r >= 0; r--) {
          const pt = getPoint(0, r);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 3. Dynamic Specular Sheen (نور و درخشش زری گلابتون)
      if (pointer.isHovering) {
        ctx.save();
        const specGrad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          150
        );
        specGrad.addColorStop(0, 'rgba(255, 240, 185, 0.42)');
        specGrad.addColorStop(0.3, 'rgba(218, 165, 32, 0.22)');
        specGrad.addColorStop(0.7, 'rgba(180, 83, 9, 0.05)');
        specGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.globalCompositeOperation = 'color-dodge';
        ctx.fillStyle = specGrad;

        // Clip specular light to cloth contour
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const pt = getPoint(c, 0);
          c === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        }
        for (let r = 0; r < ROWS; r++) {
          const pt = getPoint(COLS - 1, r);
          ctx.lineTo(pt.x, pt.y);
        }
        for (let c = COLS - 1; c >= 0; c--) {
          const pt = getPoint(c, ROWS - 1);
          ctx.lineTo(pt.x, pt.y);
        }
        for (let r = ROWS - 1; r >= 0; r--) {
          const pt = getPoint(0, r);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 4. Hanging Antique Brass Rod Fixture with Carved Finials
      const firstTop = getPoint(0, 0);
      const lastTop = getPoint(COLS - 1, 0);
      const rodY = firstTop.y - 6;
      const rodStartX = firstTop.x - 22;
      const rodEndX = lastTop.x + 22;

      ctx.save();
      // Brass Rod Body
      const rodGrad = ctx.createLinearGradient(rodStartX, rodY - 5, rodStartX, rodY + 5);
      rodGrad.addColorStop(0, '#E5C068');
      rodGrad.addColorStop(0.3, '#FDF3D0');
      rodGrad.addColorStop(0.7, '#A87722');
      rodGrad.addColorStop(1, '#5E410C');

      ctx.fillStyle = rodGrad;
      ctx.beginPath();
      ctx.roundRect(rodStartX, rodY - 4, rodEndX - rodStartX, 8, 3);
      ctx.fill();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;

      // Carved Brass Finials (سرپنجه‌های برنجی میل‌پرده)
      const drawFinial = (x: number, y: number, flip: boolean) => {
        ctx.save();
        ctx.translate(x, y);
        if (flip) ctx.scale(-1, 1);
        ctx.fillStyle = rodGrad;
        ctx.beginPath();
        ctx.arc(-4, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-10, -8);
        ctx.lineTo(-18, 0);
        ctx.lineTo(-10, 8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      drawFinial(rodStartX, rodY, false);
      drawFinial(rodEndX, rodY, true);

      // Brass Hanging Rings attached to top hem
      ctx.fillStyle = '#E5C068';
      for (let c = 0; c < COLS; c += 2) {
        const pt = getPoint(c, 0);
        ctx.beginPath();
        ctx.arc(pt.x, rodY + 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 5. Braided Silk & Gold Tassels (منگوله‌های زری‌پوش لبه پایین)
      ctx.save();
      for (let c = 0; c < COLS; c += 2) {
        const pt = getPoint(c, ROWS - 1);
        const ptPrev = getPoint(c, ROWS - 2);
        const angle = Math.atan2(pt.y - ptPrev.y, pt.x - ptPrev.x);

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(angle - Math.PI / 2);

        // Golden Bead
        ctx.fillStyle = '#E5C068';
        ctx.beginPath();
        ctx.arc(0, 4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Tassel Fringe Body
        const tasselGrad = ctx.createLinearGradient(0, 6, 0, 26);
        tasselGrad.addColorStop(0, '#C49733');
        tasselGrad.addColorStop(0.5, '#E5C068');
        tasselGrad.addColorStop(1, '#8C6018');

        ctx.fillStyle = tasselGrad;
        ctx.beginPath();
        ctx.moveTo(-3.5, 7);
        ctx.lineTo(3.5, 7);
        ctx.lineTo(5.5, 24);
        ctx.lineTo(-5.5, 24);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
      ctx.restore();
    };

    // Main Animation Loop
    const loop = () => {
      if (isVisible) {
        updatePhysics();
        render();
      }
      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    // Event Handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.isHovering = true;
      setIsInteracting(true);
      setHasInteractedOnce(true);
    };

    const handlePointerLeave = () => {
      pointer.isHovering = false;
      pointer.x = -1000;
      pointer.y = -1000;
      setIsInteracting(false);
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointer.isDown = true;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      setIsInteracting(true);
      setHasInteractedOnce(true);
    };

    const handlePointerUp = () => {
      pointer.isDown = false;
    };

    // Gyroscope on mobile
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        // gamma: left-to-right tilt in degrees (-90 to 90)
        gyroTiltX = Math.max(-25, Math.min(25, e.gamma)) * 0.12;
      }
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('deviceorientation', handleOrientation);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      initCloth();
    });
    resizeObserver.observe(container);

    // Intersection Observer to save CPU when hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('deviceorientation', handleOrientation);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] xs:h-[500px] sm:h-[560px] lg:h-[620px] flex items-center justify-center select-none overflow-visible ${className}`}
      aria-label="قوارهٔ ابریشمی تعاملی ترمه تسنیم"
    >
      {/* Background Soft Glow Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 blur-3xl transition-opacity duration-700"
        aria-hidden="true"
      >
        <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-brand/60 via-gold/30 to-transparent" />
      </div>

      {/* Interactive Cloth Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating Interactive Prompt Badge */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-700 ${
          hasInteractedOnce ? 'opacity-40 hover:opacity-100' : 'opacity-90 animate-bounce'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18080E]/90 border border-gold/40 text-gold-soft text-[11px] font-bold shadow-xl backdrop-blur-md">
          <BotehMark className={`w-3.5 h-3.5 text-gold ${isInteracting ? 'animate-spin' : ''}`} />
          <span>ماوس را روی پارچه حرکت دهید یا لمس کنید</span>
          <ShamsehEightStar className="w-3 h-3 text-gold" />
        </div>
      </div>
    </div>
  );
}

