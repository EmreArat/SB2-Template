"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BoardCanvas, MobileControls } from "./Board";
import { GameOverlay } from "./GameOverlay";
import { DesktopSidebar, StatsBar } from "./Sidebar";
import { useTetris } from "./useTetris";
import type { GameConfig } from "@/lib/tetris/types";

export function TetrisApp({ config }: { config: GameConfig }) {
  const boardRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const {
    status,
    score,
    lines,
    level,
    nextType,
    bestScore,
    isNewBest,
    flash,
    lineProgress,
    startGame,
    togglePause,
    handleAction,
    bindRepeat,
    render,
  } = useTetris(boardRef);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px), (pointer: coarse)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    render();
  }, [render, status, score, level, nextType]);

  const onSwipe = useCallback(
    (action: "left" | "right" | "down" | "rotate" | "drop") => {
      if (status !== "playing") return;
      handleAction(action);
    },
    [handleAction, status],
  );

  const onPrimary = () => {
    if (status === "paused") togglePause();
    else startGame();
  };

  return (
    <div className="flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(251,146,60,0.1),transparent_35%)]" />

      <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col gap-2 p-2 md:grid md:grid-cols-[1fr_auto] md:grid-rows-[auto_1fr] md:gap-4 md:p-5">
        <div className="md:col-span-2">
          <StatsBar
            score={score}
            level={level}
            lines={lines}
            bestScore={bestScore}
            lineProgress={lineProgress}
            nextType={nextType}
          />
        </div>

        <section className="relative flex min-h-0 flex-1 flex-col md:row-start-2">
          <div className="relative flex min-h-0 flex-1 rounded-2xl border border-white/10 bg-white/5 p-1 md:p-2">
            <BoardCanvas boardRef={boardRef} flash={flash} onSwipe={onSwipe} />
            <GameOverlay
              status={status}
              score={score}
              isNewBest={isNewBest}
              isMobile={isMobile}
              onPrimary={onPrimary}
            />
          </div>
        </section>

        <DesktopSidebar
          config={config}
          nextType={nextType}
          onPause={togglePause}
          onRestart={startGame}
          canPause={status === "playing" || status === "paused"}
        />
      </div>

      <MobileControls bindRepeat={bindRepeat} />
    </div>
  );
}
