'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BotehMark, ShamsehEightStar } from './motifs';

interface KineticLoomHeroProps {
  imageSrc?: string;
  className?: string;
  onOpenConsultation?: () => void;
}

interface WarpString {
  x: number;
  restX: number;
  amplitude: number;
  frequency: number;
  phase: number;
  decay: number;
  hue: number;
}

interface WeftParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

export function KineticLoomHero({
  imageSrc = '/images/hero.jpg',
  className = '',
}: KineticLoomHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wovenRowsCount, setWovenRowsCount] = useState(1280);
  const [isWeaving, setIsWeaving] = useState(false);
  const [autoWeave, setAutoWeave] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;
    let time = 0;

    // Load Master Termeh Artwork Image
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = 'anonymous';

    // Mask Canvas for Progressive Weaving Reveal
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    // Grid of Warp Strings (تارهای موازی دار بافندگی)
    const STRINGS_COUNT = 32;
    let warpStrings: WarpString[] = [];
    const particles: WeftParticle[] = [];

    // Shuttle (ماکو) State
    const shuttle = {
      x: 200,
      y: 260,
      targetX: 200,
      targetY: 260,
      vx: 0,
      vy: 0,
      angle: 0,
      width: 44,
      height: 14,
      color: '#E5C068',
    };

    // Mouse & Touch Pointer
    const pointer = {
      x: -1000,
      y: -1000,
      oldX: -1000,
      oldY: -1000,
      isDown: false,
      isHovering: false,
    };

    let totalWeftDistance = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const displayW = rect.width;
      const displayH = rect.height;

      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;

      maskCanvas.width = displayW * dpr;
      maskCanvas.height = displayH * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (maskCtx) {
        maskCtx.setTransform(1, 0, 0, 1, 0, 0);
        maskCtx.scale(dpr, dpr);

        // Pre-fill initial central woven band so textile is partially visible initially
        const loomW = Math.min(displayW * 0.88, 380);
        const loomH = Math.min(displayH * 0.82, 520);
        const startX = (displayW - loomW) / 2;
        const startY = 40;

        maskCtx.fillStyle = 'rgba(255, 255, 255, 0.96)';
        maskCtx.beginPath();
        maskCtx.roundRect(startX, startY + 60, loomW, loomH * 0.55, 16);
        maskCtx.fill();
      }

      // Initialize Stretched Warp Strings
      const loomW = Math.min(displayW * 0.88, 380);
      const startX = (displayW - loomW) / 2;
      const stepX = loomW / (STRINGS_COUNT - 1);

      warpStrings = [];
      for (let i = 0; i < STRINGS_COUNT; i++) {
        const x = startX + i * stepX;
        warpStrings.push({
          x,
          restX: x,
          amplitude: 0,
          frequency: 0.28 + (i % 5) * 0.04,
          phase: 0,
          decay: 0.945,
          hue: 42 + (i % 3) * 4,
        });
      }

      shuttle.x = displayW / 2;
      shuttle.y = displayH / 2;
      shuttle.targetX = shuttle.x;
      shuttle.targetY = shuttle.y;
    };

    resizeCanvas();

    // Spawn golden & ruby silk thread particles behind the shuttle
    const emitWeftParticles = (x: number, y: number, vx: number) => {
      const colors = ['#E5C068', '#FDF3D0', '#C53047', '#0EA5E9'];
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: -vx * 0.2 + (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          maxLife: 35 + Math.random() * 25,
          size: 1.5 + Math.random() * 2.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Weave a stroke on the mask canvas
    const paintWeftStroke = (x1: number, y1: number, x2: number, y2: number) => {
      if (!maskCtx) return;
      maskCtx.save();
      maskCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      maskCtx.lineWidth = 32;
      maskCtx.lineCap = 'round';
      maskCtx.lineJoin = 'round';
      maskCtx.beginPath();
      maskCtx.moveTo(x1, y1);
      maskCtx.lineTo(x2, y2);
      maskCtx.stroke();
      maskCtx.restore();

      const dist = Math.hypot(x2 - x1, y2 - y1);
      totalWeftDistance += dist;
      if (totalWeftDistance > 60) {
        totalWeftDistance = 0;
        setWovenRowsCount((prev) => prev + 1);
      }
    };

    // Update Strings, Shuttle & Particles
    const update = () => {
      time += 0.03;

      const rect = container.getBoundingClientRect();
      const displayW = rect.width;
      const loomW = Math.min(displayW * 0.88, 380);
      const startX = (displayW - loomW) / 2;
      const endX = startX + loomW;

      // Determine Target for Shuttle (Manual cursor or Auto-Weave pendulum)
      if (pointer.isHovering || pointer.isDown) {
        shuttle.targetX = Math.max(startX - 10, Math.min(endX + 10, pointer.x));
        shuttle.targetY = Math.max(70, Math.min(rect.height - 70, pointer.y));
      } else if (autoWeave) {
        // Automatic shuttle pacing across the loom
        const pace = Math.sin(time * 1.8);
        shuttle.targetX = startX + (loomW * 0.5) + (loomW * 0.44) * pace;
        shuttle.targetY = rect.height * 0.5 + Math.cos(time * 0.6) * 50;
      }

      // Smooth Shuttle Movement (Spring/Lerp)
      const oldShuttleX = shuttle.x;
      const oldShuttleY = shuttle.y;

      shuttle.vx = (shuttle.targetX - shuttle.x) * 0.14;
      shuttle.vy = (shuttle.targetY - shuttle.y) * 0.14;
      shuttle.x += shuttle.vx;
      shuttle.y += shuttle.vy;

      const speed = Math.hypot(shuttle.vx, shuttle.vy);
      if (speed > 0.4) {
        shuttle.angle = Math.atan2(shuttle.vy, shuttle.vx);
        emitWeftParticles(shuttle.x, shuttle.y, shuttle.vx);
        paintWeftStroke(oldShuttleX, oldShuttleY, shuttle.x, shuttle.y);
      }

      // Pluck & Resonate Warp Strings when shuttle passes through
      for (let i = 0; i < warpStrings.length; i++) {
        const s = warpStrings[i];
        const distToShuttle = Math.abs(s.x - shuttle.x);

        if (distToShuttle < 16 && speed > 0.8) {
          s.amplitude = Math.min(16, s.amplitude + speed * 1.2);
        }

        // String harmonic physics
        s.phase += s.frequency;
        s.amplitude *= s.decay;
        s.x = s.restX + Math.sin(s.phase) * s.amplitude;
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    // Render Canvas Scene
    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const loomW = Math.min(rect.width * 0.88, 380);
      const loomH = Math.min(rect.height * 0.82, 520);
      const startX = (rect.width - loomW) / 2;
      const startY = 40;
      const endX = startX + loomW;
      const endY = startY + loomH;

      // 1. Soft Realistic Shadow under the loom frame
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.filter = 'blur(22px)';
      ctx.beginPath();
      ctx.roundRect(startX - 10, startY + 8, loomW + 20, loomH + 16, 24);
      ctx.fill();
      ctx.restore();

      // 2. Dark Loom Background Vault (مخمل صحنه دار)
      ctx.save();
      const bgGrad = ctx.createLinearGradient(startX, startY, startX, endY);
      bgGrad.addColorStop(0, '#15060B');
      bgGrad.addColorStop(0.5, '#220B13');
      bgGrad.addColorStop(1, '#15060B');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.roundRect(startX, startY, loomW, loomH, 18);
      ctx.fill();
      ctx.restore();

      // 3. Render Woven Termeh Fabric through the Weft Reveal Mask
      if (img.complete && img.naturalWidth > 0 && maskCanvas) {
        ctx.save();
        // Clip to loom bounds
        ctx.beginPath();
        ctx.roundRect(startX, startY, loomW, loomH, 18);
        ctx.clip();

        // Draw the masked Termeh textile
        ctx.drawImage(img, startX, startY, loomW, loomH);

        // Apply progressive weaving mask (Destination-In)
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(maskCanvas, 0, 0, rect.width, rect.height);

        ctx.restore();
      }

      // 4. Stretched Golden Warp Strings (تارهای زری‌باف کشیده‌شده)
      ctx.save();
      for (let i = 0; i < warpStrings.length; i++) {
        const s = warpStrings[i];
        const isCenter = i % 4 === 0;

        ctx.beginPath();
        ctx.moveTo(s.restX, startY);
        // Curve through the plucked x position at the shuttle Y
        ctx.quadraticCurveTo(s.x, shuttle.y, s.restX, endY);

        ctx.lineWidth = isCenter ? 1.4 : 0.85;
        ctx.strokeStyle = isCenter
          ? `hsla(${s.hue}, 85%, 68%, 0.65)`
          : `hsla(${s.hue}, 70%, 55%, 0.35)`;
        ctx.stroke();

        // String golden highlights
        if (s.amplitude > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, shuttle.y, Math.min(3, s.amplitude * 0.25), 0, Math.PI * 2);
          ctx.fillStyle = '#FFF5D0';
          ctx.fill();
        }
      }
      ctx.restore();

      // 5. Active Weft Thread (نخ پود در حال بافت متصل به ماکو)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, shuttle.y);
      ctx.quadraticCurveTo(
        (startX + shuttle.x) / 2,
        shuttle.y + Math.sin(time * 3) * 6,
        shuttle.x,
        shuttle.y
      );
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.85)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Secondary crimson silk thread
      ctx.beginPath();
      ctx.moveTo(endX, shuttle.y);
      ctx.quadraticCurveTo(
        (endX + shuttle.x) / 2,
        shuttle.y - Math.sin(time * 3) * 6,
        shuttle.x,
        shuttle.y
      );
      ctx.strokeStyle = 'rgba(180, 28, 49, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // 6. Weft Silk Particles (ذرات درخشان پود زری)
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 7. Sculpted Master Shuttle (ماکوی منبت‌کاری‌شده چوبی و زرین)
      ctx.save();
      ctx.translate(shuttle.x, shuttle.y);
      ctx.rotate(shuttle.angle);

      // Shuttle Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(2, 4, shuttle.width * 0.5, shuttle.height * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shuttle Golden Wooden Body
      const shuttleGrad = ctx.createLinearGradient(
        -shuttle.width / 2,
        -shuttle.height / 2,
        shuttle.width / 2,
        shuttle.height / 2
      );
      shuttleGrad.addColorStop(0, '#5A3D18');
      shuttleGrad.addColorStop(0.3, '#E5C068');
      shuttleGrad.addColorStop(0.6, '#FDF3D0');
      shuttleGrad.addColorStop(0.8, '#A87722');
      shuttleGrad.addColorStop(1, '#4A3010');

      ctx.fillStyle = shuttleGrad;
      ctx.beginPath();
      ctx.moveTo(-shuttle.width / 2, 0);
      ctx.bezierCurveTo(
        -shuttle.width * 0.3,
        -shuttle.height * 0.6,
        shuttle.width * 0.3,
        -shuttle.height * 0.6,
        shuttle.width / 2,
        0
      );
      ctx.bezierCurveTo(
        shuttle.width * 0.3,
        shuttle.height * 0.6,
        -shuttle.width * 0.3,
        shuttle.height * 0.6,
        -shuttle.width / 2,
        0
      );
      ctx.closePath();
      ctx.fill();

      // Shuttle Inner Spool (ماسوره پود ابریشم سرخ)
      ctx.fillStyle = '#8B1527';
      ctx.beginPath();
      ctx.roundRect(-shuttle.width * 0.22, -shuttle.height * 0.25, shuttle.width * 0.44, shuttle.height * 0.5, 3);
      ctx.fill();

      // Spool Gold Core
      ctx.fillStyle = '#FDF3D0';
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 8. Top & Bottom Antique Walnut Loom Beams (نورد و دار چوبی سنتی)
      ctx.save();
      const beamGrad = ctx.createLinearGradient(startX, 0, endX, 0);
      beamGrad.addColorStop(0, '#3A2012');
      beamGrad.addColorStop(0.3, '#6A4125');
      beamGrad.addColorStop(0.7, '#8C5733');
      beamGrad.addColorStop(1, '#3A2012');

      // Top Beam
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.roundRect(startX - 14, startY - 8, loomW + 28, 14, 5);
      ctx.fill();

      // Bottom Beam
      ctx.beginPath();
      ctx.roundRect(startX - 14, endY - 6, loomW + 28, 14, 5);
      ctx.fill();

      // Brass Inlay Rivets on Loom Frame
      ctx.fillStyle = '#E5C068';
      ctx.beginPath();
      ctx.arc(startX - 6, startY - 1, 3, 0, Math.PI * 2);
      ctx.arc(endX + 6, startY - 1, 3, 0, Math.PI * 2);
      ctx.arc(startX - 6, endY + 1, 3, 0, Math.PI * 2);
      ctx.arc(endX + 6, endY + 1, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Main Animation Loop
    const loop = () => {
      if (isVisible) {
        update();
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
      setIsWeaving(true);
      setAutoWeave(false);
    };

    const handlePointerLeave = () => {
      pointer.isHovering = false;
      pointer.isDown = false;
      setIsWeaving(false);
      // Resume auto-weave after a moment of inactivity
      setTimeout(() => setAutoWeave(true), 1200);
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointer.isDown = true;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      setIsWeaving(true);
      setAutoWeave(false);
    };

    const handlePointerUp = () => {
      pointer.isDown = false;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

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
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [imageSrc, autoWeave]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] xs:h-[500px] sm:h-[560px] lg:h-[620px] flex items-center justify-center select-none overflow-visible ${className}`}
      aria-label="دار بافندگی و ماکوی زرین تعاملی ترمه تسنیم"
    >
      {/* Background Soft Glow Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 blur-3xl transition-opacity duration-700"
        aria-hidden="true"
      >
        <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-amber-600/50 via-brand/40 to-transparent" />
      </div>

      {/* Interactive Loom Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-crosshair touch-none"
      />

      {/* Real-Time Artisanal Loom Stats (پلاک کارگاهی رج‌های بافته‌شده) */}
      <div className="absolute top-2 left-4 sm:left-6 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-gold/40 text-gold-soft text-[10px] font-bold backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>دار فعال شعربافی</span>
          <span className="text-white/40">|</span>
          <span>رج‌های بافته‌شده: {toPersianDigits(wovenRowsCount)}</span>
        </div>
      </div>

      {/* Floating Interactive Prompt Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18080E]/90 border border-gold/40 text-gold-soft text-[11px] font-bold shadow-xl backdrop-blur-md">
          <BotehMark className={`w-3.5 h-3.5 text-gold ${isWeaving ? 'animate-spin' : ''}`} />
          <span>ماوس را برای حرکت ماکو و رویش تار و پود حرکت دهید</span>
          <ShamsehEightStar className="w-3 h-3 text-gold" />
        </div>
      </div>
    </div>
  );
}

