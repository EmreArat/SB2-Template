"use client";

import type { GameStatus } from "@/lib/tetris/types";

export function GameOverlay({
  status,
  score,
  isNewBest,
  isMobile,
  onPrimary,
}: {
  status: GameStatus;
  score: number;
  isNewBest: boolean;
  isMobile: boolean;
  onPrimary: () => void;
}) {
  if (status === "playing") return null;

  const copy = {
    idle: {
      title: "BLOK",
      text: isMobile
        ? "Başlamak için dokun. Alttaki butonlarla veya tahtada kaydırarak oyna."
        : "Klasik tetris deneyimi. Oklarla hareket et, boşlukla döndür.",
      cta: "Oyuna Başla",
    },
    paused: {
      title: "Duraklatıldı",
      text: isMobile ? "Devam etmek için dokun." : "Devam etmek için P tuşuna bas.",
      cta: "Devam Et",
    },
    gameover: {
      title: "Oyun Bitti",
      text: `Skorun: ${score}.${isNewBest ? " Yeni rekor!" : " Tekrar dene."}`,
      cta: "Tekrar Oyna",
    },
  } as const;

  const state = status === "paused" ? copy.paused : status === "gameover" ? copy.gameover : copy.idle;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-slate-950/85 p-4 backdrop-blur-sm">
      <div className="max-w-xs text-center">
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
          {state.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{state.text}</p>
        {isNewBest && status === "gameover" && (
          <p className="mt-2 text-sm font-semibold text-amber-300">🏆 Yeni rekor kırdın!</p>
        )}
        <button
          type="button"
          onClick={onPrimary}
          className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.98]"
        >
          {state.cta}
        </button>
      </div>
    </div>
  );
}
