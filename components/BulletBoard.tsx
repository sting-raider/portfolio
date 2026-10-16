"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "playing" | "won" | "lost";
type Bullet = { x: number; y: number; vx: number; vy: number; w: number; h: number; bone: boolean };

const MAX_HP = 20;
const DURATION = 12000;
const HIT = 3;
// 7x6 pixel heart, drawn at 3px per cell.
const HEART = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];

const overlaps = (b: Bullet, x: number, y: number, r: number) => x + r > b.x && x - r < b.x + b.w && y + r > b.y && y - r < b.y + b.h;

export function BulletBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hp, setHp] = useState(MAX_HP);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const box = canvas.getBoundingClientRect();
    const W = (canvas.width = Math.round(box.width));
    const H = (canvas.height = Math.round(box.height));
    const soul = { x: W / 2, y: H / 2 };
    let target = { ...soul };
    const keys = new Set<string>();
    let bullets: Bullet[] = [];
    let hpLeft = MAX_HP;
    let invulnerableUntil = 0;
    let spawnIn = 400;
    let shownSecond = 0;
    const start = performance.now();
    let last = start;
    let frame = 0;

    const onPointer = (event: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target = { x: ((event.clientX - r.left) * W) / r.width, y: ((event.clientY - r.top) * H) / r.height };
    };
    const onKey = (event: KeyboardEvent) => {
      if (!event.key.startsWith("Arrow")) return;
      event.preventDefault();
      if (event.type === "keydown") keys.add(event.key);
      else keys.delete(event.key);
    };

    const spawn = (t: number) => {
      const stage = t < 4000 ? 0 : t < 8000 ? 1 : 2;
      spawnIn = [560, 420, 300][stage];
      if (stage !== 1 || Math.random() < 0.35) {
        // Bones slide in from a side, anchored to the floor or ceiling, leaving a gap to slip through.
        const fromLeft = Math.random() < 0.5;
        const h = H * (0.25 + Math.random() * 0.35);
        bullets.push({ x: fromLeft ? -14 : W, y: Math.random() < 0.5 ? 0 : H - h, vx: (fromLeft ? 1 : -1) * (0.17 + stage * 0.05), vy: 0, w: 14, h, bone: true });
      }
      if (stage > 0) {
        for (let i = 0; i < stage; i++) bullets.push({ x: Math.random() * (W - 10), y: -12, vx: (Math.random() - 0.5) * 0.06, vy: 0.16 + stage * 0.05, w: 10, h: 10, bone: false });
      }
    };

    const draw = (now: number) => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      for (const b of bullets) {
        if (!b.bone) { ctx.fillRect(b.x, b.y, b.w, b.h); continue; }
        ctx.fillRect(b.x + 3, b.y, b.w - 6, b.h);
        ctx.fillRect(b.x, b.y, b.w, 6);
        ctx.fillRect(b.x, b.y + b.h - 6, b.w, 6);
      }
      if (now < invulnerableUntil && Math.floor(now / 80) % 2) return;
      ctx.fillStyle = "#ff1e2d";
      HEART.forEach((row, y) => [...row].forEach((cell, x) => { if (cell === "X") ctx.fillRect(soul.x - 10 + x * 3, soul.y - 9 + y * 3, 3, 3); }));
    };

    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const t = now - start;
      if (keys.size) {
        const step = 0.32 * dt;
        target = {
          x: soul.x + ((keys.has("ArrowRight") ? 1 : 0) - (keys.has("ArrowLeft") ? 1 : 0)) * step,
          y: soul.y + ((keys.has("ArrowDown") ? 1 : 0) - (keys.has("ArrowUp") ? 1 : 0)) * step,
        };
        soul.x = target.x;
        soul.y = target.y;
      } else {
        const ease = Math.min(1, dt / 45);
        soul.x += (target.x - soul.x) * ease;
        soul.y += (target.y - soul.y) * ease;
      }
      soul.x = Math.max(10, Math.min(W - 10, soul.x));
      soul.y = Math.max(10, Math.min(H - 10, soul.y));

      spawnIn -= dt;
      if (spawnIn <= 0) spawn(t);
      bullets = bullets.filter((b) => {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        return b.x > -40 && b.x < W + 40 && b.y < H + 20;
      });
      if (now >= invulnerableUntil && bullets.some((b) => overlaps(b, soul.x, soul.y, 7))) {
        hpLeft = Math.max(0, hpLeft - HIT);
        invulnerableUntil = now + 900;
        setHp(hpLeft);
        canvas.parentElement?.classList.remove("is-hit");
        void canvas.parentElement?.offsetWidth;
        canvas.parentElement?.classList.add("is-hit");
      }
      const second = Math.floor(t / 1000);
      if (second !== shownSecond) setSeconds((shownSecond = second));
      draw(now);
      if (hpLeft <= 0) return setPhase("lost");
      if (t >= DURATION) return setPhase("won");
      frame = requestAnimationFrame(tick);
    };

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [phase]);

  const begin = () => {
    setHp(MAX_HP);
    setSeconds(0);
    setPhase("playing");
    canvasRef.current?.focus();
  };

  return (
    <section className={`dw-fight dw-fight--${phase}`} aria-labelledby="dw-fight-title">
      <p className="dw-fight__kicker">* RANDOM ENCOUNTER</p>
      <h2 id="dw-fight-title">PRODUCTION BUG <span>BLOCKS THE WAY!</span></h2>
      <div className="dw-fight__board">
        <canvas ref={canvasRef} tabIndex={-1} aria-label="Bullet board. Move the SOUL with the pointer or arrow keys." />
        {phase !== "playing" && (
          <div className="dw-fight__overlay" role="status">
            {phase === "idle" && <><p>* Dodge for {DURATION / 1000} seconds.<br />* Mouse, touch, or arrow keys.</p><button type="button" className="undertale-button" onClick={begin}>FIGHT</button></>}
            {phase === "lost" && <><p>* You were defeated.<br />* But it refused to stay a bug forever.</p><button type="button" className="undertale-button" onClick={begin}>RETRY</button></>}
            {phase === "won" && <><p>* YOU WON!<br />* You spared PRODUCTION BUG. Ali would like to hear about yours.</p><Link href="/contact" className="undertale-button">REPORT IT</Link></>}
          </div>
        )}
      </div>
      <div className="dw-fight__hud" aria-live="off">
        <span>ALI</span><span>LV 20</span>
        <span className="dw-fight__hp">HP <i><b style={{ width: `${(hp / MAX_HP) * 100}%` }} /></i> {hp} / {MAX_HP}</span>
        <span>{String(Math.min(seconds, DURATION / 1000)).padStart(2, "0")}s</span>
      </div>
    </section>
  );
}
