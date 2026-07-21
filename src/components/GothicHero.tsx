import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './GothicHero.css';

/**
 * Cursor-driven mask reveal: a soft-edged trail of circles, drawn to an
 * offscreen canvas and composited with 'source-in', cuts a hole through
 * the top image to reveal the bottom image underneath as the mouse moves.
 */
export default function GothicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TRAIL_LENGTH = 60;
    const HEAD_RADIUS = 180;

    const bottom = new Image();
    const top = new Image();
    bottom.src = '/hero-portrait-gold.jpg';
    top.src = '/hero-portrait.jpg';

    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    hero.addEventListener('mousemove', onMove);

    let rafId: number;

    const cover = (img: HTMLImageElement, width: number, height: number) => {
      const scale = Math.max(width / img.width, height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      return { x: (width - w) / 2, y: (height - h) / 2, w, h };
    };

    const draw = () => {
      const { width, height } = canvas;
      const s = smoothRef.current;
      const m = mouseRef.current;
      s.x += (m.x - s.x) * 0.13;
      s.y += (m.y - s.y) * 0.13;

      trailRef.current.unshift({ x: s.x, y: s.y });
      if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.length = TRAIL_LENGTH;
      const trail = trailRef.current;

      ctx.clearRect(0, 0, width, height);
      const b = cover(bottom, width, height);
      ctx.drawImage(bottom, b.x, b.y, b.w, b.h);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const off = offscreen.getContext('2d');
      if (off) {
        for (let i = 0; i < trail.length; i++) {
          const t = 1 - i / trail.length;
          const r = HEAD_RADIUS * (0.25 + 0.75 * t);
          const alpha = Math.pow(t, 1.5);
          off.beginPath();
          off.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2);
          off.fillStyle = `rgba(0,0,0,${alpha})`;
          off.fill();
        }
        off.globalCompositeOperation = 'source-in';
        const t = cover(top, width, height);
        off.drawImage(top, t.x, t.y, t.w, t.h);
        ctx.drawImage(offscreen, 0, 0);
      }

      if (trail.length > 0) {
        const head = trail[0];
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, HEAD_RADIUS * 1.4);
        glow.addColorStop(0, 'rgba(201, 164, 74, 0.28)');
        glow.addColorStop(0.5, 'rgba(201, 164, 74, 0.12)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(head.x, head.y, HEAD_RADIUS * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    let loaded = 0;
    let started = false;
    const onLoad = () => {
      if (++loaded >= 2 && !started) {
        started = true;
        draw();
      }
    };
    bottom.onload = onLoad;
    top.onload = onLoad;
    // Images can already be complete (browser cache) by the time we attach
    // the handler above, in which case onload never fires — catch that.
    if (bottom.complete) onLoad();
    if (top.complete) onLoad();

    return () => {
      hero.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 70, damping: 12 } },
  };
  const navbarVariant = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 80, damping: 14 } },
  };

  return (
    <div className="gh-hero" ref={heroRef}>
      <canvas ref={canvasRef} className="gh-canvas" />

      <motion.nav
        className="gh-navbar"
        variants={navbarVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="gh-nav-logo">
          CODE<span>IISH</span>
        </div>
        <ul className="gh-nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </motion.nav>

      <motion.div className="gh-content" variants={container} initial="hidden" animate="visible">
        <motion.div className="gh-left" variants={item}>
          <motion.span className="gh-eyebrow" variants={item}>
            Remote · Worldwide
          </motion.span>
          <h1 className="gh-title">
            Backend
            <br />
            Engineer
          </h1>
          <motion.p className="gh-desc" variants={item}>
            Systems that don't fall over, and bridges between tools that were
            never meant to talk to each other — built quietly, kept running.
          </motion.p>
          <motion.a href="#work" className="gh-btn" variants={item}>
            View My Work
          </motion.a>
        </motion.div>

        <motion.div className="gh-right" variants={item}>
          <motion.span className="gh-eyebrow gh-eyebrow--accent" variants={item}>
            Alireza Rogni
          </motion.span>
          <h1 className="gh-title">
            The Mind
            <br />
            Behind The Code
          </h1>
          <motion.p className="gh-text" variants={item}>
            Linux administrator by trade, automation obsessive by nature.
            Every script a shortcut, every bridge a system that finally
            behaves. Founder of Codeiish.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
