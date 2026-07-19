export type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export type GameStatus = "idle" | "playing" | "paused" | "gameover";

export type GameAction =
  | "left"
  | "right"
  | "down"
  | "rotate"
  | "drop"
  | "pause"
  | "restart";

export type Cell = PieceType | null;

export type Matrix = number[][];

export interface Piece {
  type: PieceType;
  matrix: Matrix;
  x: number;
  y: number;
}

export interface GameSnapshot {
  grid: Cell[][];
  current: Piece | null;
  nextType: PieceType;
  score: number;
  lines: number;
  level: number;
  status: GameStatus;
  dropInterval: number;
  clearedFlash: number;
}

export interface GameConfig {
  title: string;
  tagline: string;
  controls: {
    desktop: Array<{ keys: string; label: string }>;
    mobile: string[];
  };
  scoring: {
    softDrop: number;
    hardDropMultiplier: number;
    lineClear: number[];
  };
}
