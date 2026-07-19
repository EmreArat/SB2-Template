import type { PieceType } from "./types";

export const COLS = 10;
export const ROWS = 20;
export const BLOCK = 30;

export const COLORS: Record<PieceType | "ghost" | "grid", string> = {
  I: "#38bdf8",
  O: "#fbbf24",
  T: "#fb923c",
  S: "#34d399",
  Z: "#f87171",
  J: "#60a5fa",
  L: "#fbbf24",
  ghost: "rgba(148, 163, 184, 0.2)",
  grid: "rgba(148, 163, 184, 0.08)",
};

export const SHAPES: Record<PieceType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

export const PIECE_TYPES = Object.keys(SHAPES) as PieceType[];

export const LINE_CLEAR_POINTS = [0, 100, 300, 500, 800];

export function getDropInterval(level: number) {
  return Math.max(120, 800 - (level - 1) * 70);
}
