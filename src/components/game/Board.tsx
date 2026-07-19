"use client";

import { useEffect, useRef } from "react";
import { BLOCK, COLS, ROWS } from "@/lib/tetris/constants";
import type { GameAction } from "@/lib/tetris/types";

export function BoardCanvas({
  boardRef,
  flash,
  onSwipe,
}: {
  boardRef: React.RefObject<HTMLCanvasElement | null>;
  flash: number;
  onSwipe: (action: "left" | "right" | "down" | "rotate" | "drop") => void;
}) {
  const touchRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const el = boardRef.current?.parentElement;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchRef.current = { x: t.clientX, y: t.clientY, active: true };
    };

    const onEnd = (e: TouchEvent) => {
      if (!touchRef.current.active) return;
      touchRef.current.active = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchRef.current.x;
      const dy = t.clientY - touchRef.current.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (Math.max(absX, absY) < 24) {
        onSwipe("rotate");
        return;
      }
      if (absX > absY) {
        onSwipe(dx < 0 ? "left" : "right");
        return;
      }
      if (dy > 0 && absY > 72) onSwipe("drop");
      else if (dy > 0) onSwipe("down");
      else onSwipe("rotate");
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [boardRef, onSwipe]);

  return (
    <div
      className={`relative flex min-h-0 flex-1 items-center justify-center touch-none ${
        flash > 0 ? "animate-pulse" : ""
      }`}
    >
      <canvas
        ref={boardRef}
        width={COLS * BLOCK}
        height={ROWS * BLOCK}
        aria-label="Tetris tahtası"
        className="max-h-full w-auto max-w-full rounded-xl bg-slate-950 shadow-2xl shadow-teal-900/20"
        style={{ aspectRatio: `${COLS} / ${ROWS}` }}
      />
    </div>
  );
}

const mobileButtons: Array<{ action: GameAction; label: string; primary?: boolean }> = [
  { action: "left", label: "◀" },
  { action: "rotate", label: "↻" },
  { action: "right", label: "▶" },
  { action: "down", label: "▼" },
  { action: "drop", label: "⬇", primary: true },
  { action: "pause", label: "⏸" },
  { action: "restart", label: "↺" },
];

export function MobileControls({
  bindRepeat,
}: {
  bindRepeat: (action: GameAction, el: HTMLElement) => () => void;
}) {
  const refs = useRef<Map<GameAction, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    mobileButtons.forEach(({ action }) => {
      const el = refs.current.get(action);
      if (el) cleanups.push(bindRepeat(action, el));
    });
    return () => cleanups.forEach((fn) => fn());
  }, [bindRepeat]);

  return (
    <div className="grid shrink-0 grid-cols-3 gap-1.5 border-t border-white/10 bg-slate-900/90 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      {mobileButtons.map(({ action, label, primary }) => (
        <button
          key={action}
          ref={(node) => {
            if (node) refs.current.set(action, node);
          }}
          type="button"
          aria-label={action}
          className={`min-h-11 rounded-xl text-sm font-semibold transition active:scale-95 ${
            primary
              ? "bg-orange-500 text-white"
              : "border border-white/10 bg-white/10 text-white"
          } ${action === "down" || action === "drop" ? "" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
