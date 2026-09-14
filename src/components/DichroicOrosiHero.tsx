'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BotehMark, ShamsehEightStar } from './motifs';

interface DichroicOrosiHeroProps {
  imageSrc?: string;
  className?: string;
  onOpenConsultation?: () => void;
}

type LightingMood = 'noon' | 'afternoon' | 'sunset';

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  maxAlpha: number;
  hue: string;
}

interface CausticBeam {
  angle: number;
  dist: number;
  color: string;
  alpha: number;
  points: number;
  radius: number;
  rotationSpeed: number;
}

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const MOOD_CONFIG: Record<
  LightingMood,
  {
    label: string;
    sublabel: string;
    sunPos: { x: number; y: number };
    lightColor: string;
    ambientTint: string;
    accentTone: string;
  }
> = {
  afternoon: {
    label: 'عصرگاه ارسی',
    sublabel: 'رقص پرتوهای هفت‌رنگ شیشه‌های پنج‌دری یزد',
    sunPos: { x: 0.72, y: 0.38 },
    lightColor: 'rgba(255, 215, 120, 0.95)',
    ambientTint: 'rgba(190, 24, 93, 0.25)',
    accentTone: '#06B6D4',
  },
  noon: {
    label: 'نیمروز زرین',
    sublabel: 'خورشید کویر و تلألؤ ناب گلابتون‌های زرین',
    sunPos: { x: 0.5, y: 0.2 },
    lightColor: 'rgba(255, 245, 190, 0.95)',
    ambientTint: 'rgba(217, 119, 6, 0.2)',
    accentTone: '#F59E0B',
  },
  sunset: {
    label: 'شامگاه شاه‌نشین',
    sublabel: 'فام یاقوتی و لاجوردی ابریشم دو رو در غروب',
    sunPos: { x: 0.24, y: 0.62 },
    lightColor: 'rgba(251, 146, 60, 0.9)',
    ambientTint: 'rgba(125, 211, 252, 0.15)',
    accentTone: '#E11D48',
  },
};

export function DichroicOrosiHero({
  imageSrc = '/images/hero.jpg',
  className = '',
}: DichroicOrosiHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeMood, setActiveMood] = useState<LightingMood>('afternoon');
  const [sunAngleDeg, setSunAngleDeg] = useState(48);
  const [isHovered, setIsHovered] = useState(false);
  const [opticalStateText, setOpticalStateText] = useState('انکسار فام: فیروزه‌ای و یاقوتی');

  // Interactive Target Positions for Smooth Physics Interpolation
  const lightTargetRef = useRef({ x: 0.72, y: 0.38 });
  const lightCurrentRef = useRef({ x: 0.72, y: 0.38 });
  const isDraggingRef = useRef(false);

  const setMood = useCallback((mood: LightingMood) => {
    setActiveMood(mood);
    const target = MOOD_CONFIG[mood].sunPos;
    lightTargetRef.current = { ...target };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let time = 0;

    // Load Master Royal Termeh Artwork
    const img = new Image();
    img.src = imageSrc;
    let imgLoaded = false;
    img.onload = () => {
      imgLoaded = true;
    };

    // Offscreen Canvas for Optical Caustic Processing
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    // Generate Gold Leaf Micro-Sparkles (گلابتون‌های درخشان)
    const sparkles: SparkleParticle[] = Array.from({ length: 65 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.2 + 0.8,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.04 + 0.02,
      maxAlpha: Math.random() * 0.7 + 0.3,
      hue: ['#FDE047', '#F59E0B', '#38BDF8', '#F43F5E', '#FFFFFF'][
        Math.floor(Math.random() * 5)
      ],
    }));

    // Orosi Stained Glass Geometric Caustic Beams
    const caustics: CausticBeam[] = [
      { angle: 0.2, dist: 0.25, color: '#E11D48', alpha: 0.38, points: 8, radius: 85, rotationSpeed: 0.003 },
      { angle: 1.4, dist: 0.35, color: '#06B6D4', alpha: 0.42, points: 12, radius: 105, rotationSpeed: -0.002 },
      { angle: 2.7, dist: 0.28, color: '#F59E0B', alpha: 0.48, points: 8, radius: 95, rotationSpeed: 0.004 },
      { angle: 3.9, dist: 0.38, color: '#10B981', alpha: 0.32, points: 12, radius: 78, rotationSpeed: -0.003 },
      { angle: 5.1, dist: 0.22, color: '#818CF8', alpha: 0.36, points: 8, radius: 88, rotationSpeed: 0.002 },
    ];

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      offCanvas.width = rect.width * dpr;
      offCanvas.height = rect.height * dpr;
    };

    resizeCanvas();

    // Render Geometric Persian Rosette / Star
    const drawPersianStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      points: number,
      rot: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.strokeStyle = color;
      c.lineWidth = 1.2;

      // 8-star or 12-star geometric polygon
      const step = Math.PI / points;
      c.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? radius : radius * 0.48;
        const a = i * step;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.fill();
      c.stroke();

      // Delicate inner center circle
      c.beginPath();
      c.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      c.fillStyle = '#FFFFFF';
      c.globalAlpha = alpha * 0.8;
      c.fill();

      c.restore();
    };

    // Draw Ornate Persian Cusped Arch Border on Canvas
    const drawPersianArchClip = (
      c: CanvasRenderingContext2D,
      w: number,
      h: number,
      pad: number
    ) => {
      const x1 = pad;
      const y1 = pad;
      const x2 = w - pad;
      const y2 = h - pad;
      const midX = w / 2;
      const archH = Math.min(h * 0.35, 140);

      c.beginPath();
      c.moveTo(x1, y2);
      c.lineTo(x1, y1 + archH);
      // Left shoulder curve
      c.bezierCurveTo(x1, y1 + archH * 0.4, midX - w * 0.15, y1, midX, y1);
      // Right shoulder curve
      c.bezierCurveTo(midX + w * 0.15, y1, x2, y1 + archH * 0.4, x2, y1 + archH);
      c.lineTo(x2, y2);
      c.closePath();
    };

    // Main 60fps Animation Loop
    const loop = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(loop);
        return;
      }

      time += 0.016;

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(loop);
        return;
      }

      // Smooth Spring-Damped Tracking of Light Position
      const cur = lightCurrentRef.current;
      const tgt = lightTargetRef.current;

      // When not dragging and idle, add very subtle solar breathing motion
      let targetX = tgt.x;
      let targetY = tgt.y;
      if (!isDraggingRef.current && !isHovered) {
        targetX += Math.sin(time * 0.4) * 0.04;
        targetY += Math.cos(time * 0.3) * 0.025;
      }

      cur.x += (targetX - cur.x) * 0.07;
      cur.y += (targetY - cur.y) * 0.07;

      const sunPixelX = cur.x * w;
      const sunPixelY = cur.y * h;

      // Calculate Angle & Distance for UI Display
      const centerOffsetX = cur.x - 0.5;
      const centerOffsetY = cur.y - 0.5;
      const angleRad = Math.atan2(centerOffsetY, centerOffsetX);
      const angleDeg = Math.round(((angleRad * 180) / Math.PI + 360) % 360);
      setSunAngleDeg(angleDeg);

      // Optical State Feedback
      if (cur.x > 0.6) {
        setOpticalStateText('فام زرین و فیروزه‌ای (انکسار پنجره‌های غربی)');
      } else if (cur.x < 0.4) {
        setOpticalStateText('فام یاقوتی و لاجوردی (انکسار زاویه شرقی)');
      } else {
        setOpticalStateText('فام کهربایی خالص (تلألؤ اوج عمودی خورشید)');
      }

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Architectural Outer Shadow & Border
      const pad = 12;
      ctx.save();
      drawPersianArchClip(ctx, w, h, pad);
      ctx.clip();

      // 2. Render Base Termeh Cloth Artwork with Dynamic Tone
      if (imgLoaded && img.complete) {
        // High quality cover scaling
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;
        let dw = w;
        let dh = h;
        let dx = 0;
        let dy = 0;

        if (canvasAspect > imgAspect) {
          dh = w / imgAspect;
          dy = (h - dh) / 2;
        } else {
          dw = h * imgAspect;
          dx = (w - dw) / 2;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
      } else {
        // Fallback luxury background gradient while image loads
        const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 20, w * 0.5, h * 0.5, w * 0.7);
        bgGrad.addColorStop(0, '#581023');
        bgGrad.addColorStop(0.5, '#2D0A14');
        bgGrad.addColorStop(1, '#15050A');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // 3. Dynamic Dichroic Iridescence (چفت‌رنگ هفت‌رنگ ابریشم)
      // When light angle changes, complementary silk colors shimmer over the surface
      const iridGrad = ctx.createRadialGradient(
        sunPixelX,
        sunPixelY,
        15,
        sunPixelX,
        sunPixelY,
        w * 0.85
      );

      // Iridescent chromatic spectrum based on silk refraction
      iridGrad.addColorStop(0, 'rgba(255, 248, 220, 0.45)');
      iridGrad.addColorStop(0.18, 'rgba(245, 158, 11, 0.35)'); // Amber Gold
      iridGrad.addColorStop(0.38, 'rgba(225, 29, 72, 0.28)'); // Ruby Crimson
      iridGrad.addColorStop(0.62, 'rgba(6, 182, 212, 0.25)'); // Persian Turquoise
      iridGrad.addColorStop(0.85, 'rgba(37, 99, 235, 0.22)'); // Lapis Lazuli
      iridGrad.addColorStop(1, 'rgba(15, 4, 8, 0.75)');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = iridGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 4. Stained Glass Orosi Caustics (پرتوهای هندسی ارسی پنج‌دری)
      // Delicate colorful rosettes cast across the fabric from the sun point
      if (offCtx) {
        offCtx.clearRect(0, 0, w, h);

        caustics.forEach((caustic, i) => {
          const orbitTime = time * caustic.rotationSpeed;
          const currentAngle = caustic.angle + orbitTime + (cur.x - 0.5) * 0.8;
          const causticDist = caustic.dist * w + (cur.y - 0.5) * 40;

          const cx = sunPixelX + Math.cos(currentAngle) * causticDist;
          const cy = sunPixelY + Math.sin(currentAngle) * causticDist;

          // Scale radius by distance and DPR
          const dynamicRadius = caustic.radius * (w / 520);
          const rot = orbitTime * 1.5 + i * 0.8;

          drawPersianStar(
            offCtx,
            cx,
            cy,
            dynamicRadius,
            caustic.points,
            rot,
            caustic.color,
            caustic.alpha
          );
        });

        // Blend caustics onto main canvas with color-dodge for intense luminous stained-glass feel
        ctx.save();
        ctx.globalCompositeOperation = 'color-dodge';
        ctx.drawImage(offCanvas, 0, 0);
        ctx.restore();
      }

      // 5. Specular Sunlight Sheen & Core Highlight (درخشش مستقیم کانون آفتاب)
      const sunBeamGrad = ctx.createRadialGradient(
        sunPixelX,
        sunPixelY,
        0,
        sunPixelX,
        sunPixelY,
        Math.min(w, h) * 0.45
      );
      sunBeamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      sunBeamGrad.addColorStop(0.2, 'rgba(254, 240, 138, 0.35)');
      sunBeamGrad.addColorStop(0.5, 'rgba(217, 119, 6, 0.12)');
      sunBeamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = sunBeamGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 6. Gold Leaf Micro-Sparkles (تلألؤ گلابتون‌های طلا در مسیر نور)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      sparkles.forEach((p) => {
        const px = p.x * w;
        const py = p.y * h;

        // Sparkles light up intensely when close to the sun beam
        const distToSun = Math.hypot(px - sunPixelX, py - sunPixelY);
        const proximityBoost = Math.max(0, 1 - distToSun / (w * 0.42));

        const shimmer = (Math.sin(time * 3 + p.phase) + 1) * 0.5;
        const alpha = p.maxAlpha * (0.2 + proximityBoost * 0.8) * shimmer;

        if (alpha > 0.05) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * (1 + proximityBoost * 0.7), 0, Math.PI * 2);
          ctx.fillStyle = p.hue;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Delicate 4-pointed micro-glint on brightest sparkles
          if (proximityBoost > 0.6 && shimmer > 0.7) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = alpha * 0.9;
            const len = p.size * 3;
            ctx.beginPath();
            ctx.moveTo(px - len, py);
            ctx.lineTo(px + len, py);
            ctx.moveTo(px, py - len);
            ctx.lineTo(px, py + len);
            ctx.stroke();
          }
        }
      });
      ctx.restore();

      // 7. Vignette / Depth Falloff around Border
      const vigGrad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.3,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.75
      );
      vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vigGrad.addColorStop(0.7, 'rgba(15,3,7,0.35)');
      vigGrad.addColorStop(1, 'rgba(12,2,6,0.82)');

      ctx.save();
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      ctx.restore(); // Restore arch clip

      // 8. Draw Ornate Gilded Arch Border (حاشیه کتیبه و طاق زرین محراب)
      ctx.save();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#D4AF37';
      drawPersianArchClip(ctx, w, h, pad);
      ctx.stroke();

      // Inner thin filigree border
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(245, 233, 215, 0.4)';
      drawPersianArchClip(ctx, w, h, pad + 6);
      ctx.stroke();
      ctx.restore();

      // 9. Draw Interactive Sun Disc & Halo (منبع نور هدایت‌پذیر)
      ctx.save();
      ctx.translate(sunPixelX, sunPixelY);

      // Glowing Golden Ring
      const pulseRing = Math.sin(time * 2.5) * 2;
      ctx.beginPath();
      ctx.arc(0, 0, 18 + pulseRing, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner Diamond Star core
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFBEB';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 16;
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Pointer Interaction Handlers (Mouse & Touch)
    const updateTargetFromPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = Math.max(0.08, Math.min(0.92, (clientX - rect.left) / rect.width));
      const ny = Math.max(0.08, Math.min(0.92, (clientY - rect.top) / rect.height));
      lightTargetRef.current = { x: nx, y: ny };
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateTargetFromPointer(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsHovered(true);
      canvas.setPointerCapture(e.pointerId);
      updateTargetFromPointer(e.clientX, e.clientY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    };

    const handlePointerEnter = () => setIsHovered(true);
    const handlePointerLeave = () => {
      setIsHovered(false);
      isDraggingRef.current = false;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerenter', handlePointerEnter);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerenter', handlePointerEnter);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [imageSrc, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[480px] xs:h-[520px] sm:h-[580px] lg:h-[640px] flex flex-col items-center justify-center select-none ${className}`}
      aria-label="دگرگونی هفت‌رنگ و پرتوهای ارسی ابریشم ترمه تسنیم"
    >
      {/* Ambient Stained Glass Floor Reflection Glow */}
      <div
        className="pointer-events-none absolute -inset-6 opacity-35 blur-3xl transition-opacity duration-700"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-tr from-[#E11D48]/30 via-[#06B6D4]/30 to-[#F59E0B]/30" />
      </div>

      {/* Main Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Top Bar: Optical Compass & Angle Meter (ساعت آفتابی و زاویه انکسار) */}
      <div className="absolute top-4 right-4 sm:right-6 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18080E]/90 border border-gold/40 text-gold-soft text-[11px] font-bold shadow-xl backdrop-blur-md">
          <BotehMark className="w-3.5 h-3.5 text-gold" />
          <span>زاویه تابش خورشید: {toPersianDigits(sunAngleDeg)}°</span>
          <span className="text-white/30">|</span>
          <span className="text-emerald-400 font-semibold">{opticalStateText}</span>
        </div>
      </div>

      {/* Atmospheric Lighting Mood Presets (انتخاب حالات سه‌گانه نور کویر) */}
      <div className="absolute top-4 left-4 sm:left-6 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md shadow-lg">
        {(['noon', 'afternoon', 'sunset'] as LightingMood[]).map((mood) => {
          const cfg = MOOD_CONFIG[mood];
          const isActive = activeMood === mood;
          return (
            <button
              key={mood}
              type="button"
              onClick={() => setMood(mood)}
              className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-300 flex items-center gap-1 ${
                isActive
                  ? 'bg-gold text-[#1D0C13] shadow-md shadow-gold/30 font-black'
                  : 'text-[#F5E9D7]/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cfg.accentTone }}
              />
              <span>{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Floating Interactive Instruction Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18080E]/95 border border-gold/40 text-gold-soft text-[11px] font-bold shadow-xl backdrop-blur-md">
          <BotehMark className="w-3.5 h-3.5 text-gold" />
          <span>منبع نور را لمس کرده یا جابجا کنید تا انکسار هفت‌رنگ پارچه را ببینید</span>
          <ShamsehEightStar className="w-3 h-3 text-gold" />
        </div>
      </div>
    </div>
  );
}

