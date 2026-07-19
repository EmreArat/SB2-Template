"use client";

import { useEffect, useRef } from "react";
import { drawPreview } from "./useTetris";
import { Panel, StatValue } from "./Panel";
import type { GameConfig } from "@/lib/tetris/types";
import type { PieceType } from "@/lib/tetris/types";

export function NextPreview({ type }: { type: PieceType }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawPreview(ctx, canvas, type);
  }, [type]);

  return (
    <canvas
      ref={ref}
      width={96}
      height={96}
      aria-label="Sıradaki parça"
      className="mx-auto block h-16 w-16 rounded-lg bg-slate-950 md:h-24 md:w-24"
    />
  );
}

export function DesktopSidebar({
  config,
  nextType,
  onPause,
  onRestart,
  canPause,
}: {
  config: GameConfig;
  nextType: PieceType;
  onPause: () => void;
  onRestart: () => void;
  canPause: boolean;
}) {
  return (
    <aside className="hidden w-56 flex-col gap-3 md:flex">
      <Panel title="Sıradaki">
        <NextPreview type={nextType} />
      </Panel>
      <Panel title="Kontroller">
        <ul className="space-y-1.5 text-sm text-slate-300">
          {config.controls.desktop.map((item) => (
            <li key={item.keys} className="flex items-center gap-2">
              <kbd className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 text-xs">
                {item.keys}
              </kbd>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={!canPause}
            onClick={onPause}
            className="flex-1 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 disabled:opacity-40"
          >
            Duraklat
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white"
          >
            Yeniden
          </button>
        </div>
      </Panel>
    </aside>
  );
}

export function StatsBar({
  score,
  level,
  lines,
  bestScore,
  lineProgress,
  nextType,
}: {
  score: number;
  level: number;
  lines: number;
  bestScore: number;
  lineProgress: number;
  nextType: PieceType;
}) {
  return (
    <header className="shrink-0 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-xl font-extrabold tracking-tight text-white md:text-4xl">
            BLOK
          </h1>
          <p className="hidden text-sm text-slate-400 md:block">
            Satırları temizle, ritmi yakala.
          </p>
        </div>
        <div className="md:hidden">
          <Panel title="Sıradaki" className="!p-2">
            <NextPreview type={nextType} />
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        <Panel title="Skor" className="!p-2 md:!p-3">
          <StatValue value={score} />
        </Panel>
        <Panel title="Seviye" className="!p-2 md:!p-3">
          <StatValue value={level} />
          <p className="mt-0.5 text-[0.65rem] text-slate-400">{lines} satır</p>
        </Panel>
        <Panel title="Rekor" className="!p-2 md:!p-3">
          <StatValue value={bestScore} />
        </Panel>
        <div className="col-span-3 hidden md:col-span-1 md:block">
          <Panel title="İlerleme" className="!p-3">
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-orange-400 transition-all duration-300"
                style={{ width: `${lineProgress * 10}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">Sonraki seviye</p>
          </Panel>
        </div>
      </div>
    </header>
  );
}
