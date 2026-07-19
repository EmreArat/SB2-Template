import type { GameConfig } from "./types";

export const gameConfig: GameConfig = {
  title: "BLOK",
  tagline: "Satırları temizle, ritmi yakala.",
  controls: {
    desktop: [
      { keys: "← →", label: "hareket" },
      { keys: "↓", label: "yumuşak düşüş" },
      { keys: "↑ / Space", label: "döndür" },
      { keys: "P", label: "duraklat" },
    ],
    mobile: [
      "Alttaki butonlarla oyna",
      "Tahtada kaydır: sol / sağ / aşağı",
      "Kısa dokunuş döndürür",
      "Uzun aşağı kaydırma: anında bırak",
    ],
  },
  scoring: {
    softDrop: 1,
    hardDropMultiplier: 2,
    lineClear: [0, 100, 300, 500, 800],
  },
};
