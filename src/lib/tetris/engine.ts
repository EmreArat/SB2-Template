import {
  COLS,
  getDropInterval,
  LINE_CLEAR_POINTS,
  PIECE_TYPES,
  ROWS,
  SHAPES,
} from "./constants";
import type { Cell, Matrix, Piece, PieceType } from "./types";

export function createGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

export function randomType(): PieceType {
  return PIECE_TYPES[(Math.random() * PIECE_TYPES.length) | 0];
}

export function spawnPiece(type: PieceType): Piece {
  const matrix = SHAPES[type].map((row) => row.slice());
  return {
    type,
    matrix,
    x: ((COLS / 2) | 0) - ((matrix[0].length / 2) | 0),
    y: 0,
  };
}

export function collide(
  grid: Cell[][],
  piece: Piece,
  ox = 0,
  oy = 0,
  matrix: Matrix = piece.matrix,
) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!matrix[y][x]) continue;
      const nx = piece.x + x + ox;
      const ny = piece.y + y + oy;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && grid[ny][nx]) return true;
    }
  }
  return false;
}

export function rotateMatrix(matrix: Matrix): Matrix {
  const size = matrix.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      rotated[x][size - 1 - y] = matrix[y][x];
    }
  }
  return rotated;
}

export function tryRotate(grid: Cell[][], piece: Piece): Piece | null {
  const rotated = rotateMatrix(piece.matrix);
  const kicks = [0, -1, 1, -2, 2];
  for (const kick of kicks) {
    if (!collide(grid, piece, kick, 0, rotated)) {
      return { ...piece, matrix: rotated, x: piece.x + kick };
    }
  }
  return null;
}

export function mergePiece(grid: Cell[][], piece: Piece): Cell[][] {
  const next = grid.map((row) => row.slice());
  piece.matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) return;
      const gy = piece.y + y;
      const gx = piece.x + x;
      if (gy >= 0) next[gy][gx] = piece.type;
    });
  });
  return next;
}

export function clearLines(grid: Cell[][]) {
  let cleared = 0;
  const next = grid.map((row) => row.slice());

  for (let y = ROWS - 1; y >= 0; y--) {
    if (next[y].every((cell) => cell)) {
      next.splice(y, 1);
      next.unshift(Array(COLS).fill(null));
      cleared++;
      y++;
    }
  }

  return { grid: next, cleared };
}

export function hardDropDistance(grid: Cell[][], piece: Piece) {
  let dist = 0;
  while (!collide(grid, piece, 0, dist + 1)) dist++;
  return dist;
}

export function createInitialState() {
  const nextType = randomType();
  return {
    grid: createGrid(),
    current: spawnPiece(randomType()),
    nextType,
    score: 0,
    lines: 0,
    level: 1,
    dropInterval: getDropInterval(1),
    clearedFlash: 0,
  };
}

export function applyLineClear(
  score: number,
  lines: number,
  level: number,
  cleared: number,
) {
  const points = LINE_CLEAR_POINTS[cleared] * level;
  const nextLines = lines + cleared;
  const nextLevel = Math.floor(nextLines / 10) + 1;
  return {
    score: score + points,
    lines: nextLines,
    level: nextLevel,
    dropInterval: getDropInterval(nextLevel),
    clearedFlash: cleared,
  };
}
