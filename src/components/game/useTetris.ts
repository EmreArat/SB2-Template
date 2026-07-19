"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  BLOCK,
  COLORS,
  COLS,
  ROWS,
  SHAPES,
} from "@/lib/tetris/constants";
import {
  applyLineClear,
  collide,
  createInitialState,
  hardDropDistance,
  mergePiece,
  clearLines,
  spawnPiece,
  tryRotate,
  randomType,
} from "@/lib/tetris/engine";
import type { GameAction, GameStatus, PieceType } from "@/lib/tetris/types";

function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
) {
  const pad = Math.max(1, size * 0.08);
  ctx.fillStyle = color;
  ctx.fillRect(x * size + pad, y * size + pad, size - pad * 2, size - pad * 2);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(x * size + pad, y * size + pad, size - pad * 2, size * 0.22);
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  grid: ReturnType<typeof createInitialState>["grid"],
  current: ReturnType<typeof createInitialState>["current"],
  gameOver: boolean,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * BLOCK, 0);
    ctx.lineTo(x * BLOCK, ROWS * BLOCK);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * BLOCK);
    ctx.lineTo(COLS * BLOCK, y * BLOCK);
    ctx.stroke();
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const type = grid[y][x];
      if (type) drawCell(ctx, x, y, COLORS[type], BLOCK);
    }
  }

  if (current && !gameOver) {
    const ghostY = current.y + hardDropDistance(grid, current);
    current.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell) return;
        drawCell(ctx, current.x + x, ghostY + y, COLORS.ghost, BLOCK);
      });
    });

    current.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell) return;
        const gy = current.y + y;
        const gx = current.x + x;
        if (gy >= 0) drawCell(ctx, gx, gy, COLORS[current.type], BLOCK);
      });
    });
  }
}

export function drawPreview(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  type: PieceType,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const matrix = SHAPES[type];
  const size = 22;
  const offsetX = (canvas.width - matrix[0].length * size) / 2 / size;
  const offsetY = (canvas.height - matrix.length * size) / 2 / size;

  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) return;
      drawCell(ctx, offsetX + x, offsetY + y, COLORS[type], size);
    });
  });
}

export function useTetris(boardRef: RefObject<HTMLCanvasElement | null>) {
  const gameRef = useRef({ ...createInitialState(), status: "idle" as GameStatus });
  const rafRef = useRef<number>(0);
  const lastDropRef = useRef(0);
  const touchRepeats = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextType, setNextType] = useState<PieceType>("I");
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flash, setFlash] = useState(0);

  const syncUi = useCallback(() => {
    const g = gameRef.current;
    setScore(g.score);
    setLines(g.lines);
    setLevel(g.level);
    setNextType(g.nextType);
    setStatus(g.status);
    setFlash(g.clearedFlash);
    if (g.clearedFlash > 0) {
      window.setTimeout(() => {
        gameRef.current.clearedFlash = 0;
        setFlash(0);
      }, 320);
    }
  }, []);

  const render = useCallback(() => {
    const canvas = boardRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = gameRef.current;
    drawBoard(ctx, canvas, g.grid, g.current, g.status === "gameover");
  }, [boardRef]);

  const saveBestScore = useCallback(async (finalScore: number) => {
    try {
      const res = await fetch("/api/game/best-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: finalScore }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { bestScore: number; isNewBest: boolean };
      setBestScore(data.bestScore);
      setIsNewBest(data.isNewBest);
    } catch {
      // offline fallback
      setBestScore((prev) => Math.max(prev, finalScore));
    }
  }, []);

  const endGame = useCallback(() => {
    const g = gameRef.current;
    g.status = "gameover";
    cancelAnimationFrame(rafRef.current);
    syncUi();
    render();
    void saveBestScore(g.score);
  }, [render, saveBestScore, syncUi]);

  const spawnNext = useCallback(() => {
    const g = gameRef.current;
    g.current = spawnPiece(g.nextType);
    g.nextType = randomType();
    if (g.current && collide(g.grid, g.current)) {
      endGame();
    }
  }, [endGame]);

  const lockPiece = useCallback(() => {
    const g = gameRef.current;
    if (!g.current) return;
    g.grid = mergePiece(g.grid, g.current);
    const { grid, cleared } = clearLines(g.grid);
    g.grid = grid;
    if (cleared > 0) {
      const next = applyLineClear(g.score, g.lines, g.level, cleared);
      g.score = next.score;
      g.lines = next.lines;
      g.level = next.level;
      g.dropInterval = next.dropInterval;
      g.clearedFlash = next.clearedFlash;
    }
    spawnNext();
    syncUi();
    render();
  }, [render, spawnNext, syncUi]);

  const tick = useCallback(
    (now: number) => {
      const g = gameRef.current;
      if (g.status !== "playing") return;

      if (now - lastDropRef.current >= g.dropInterval) {
        if (g.current && !collide(g.grid, g.current, 0, 1)) {
          g.current = { ...g.current, y: g.current.y + 1 };
        } else {
          lockPiece();
        }
        lastDropRef.current = now;
        render();
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [lockPiece, render],
  );

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    gameRef.current = { ...createInitialState(), status: "playing" };
    lastDropRef.current = performance.now();
    setIsNewBest(false);
    syncUi();
    render();
    rafRef.current = requestAnimationFrame(tick);
  }, [render, syncUi, tick]);

  const togglePause = useCallback(() => {
    const g = gameRef.current;
    if (g.status === "playing") {
      g.status = "paused";
      cancelAnimationFrame(rafRef.current);
    } else if (g.status === "paused") {
      g.status = "playing";
      lastDropRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    syncUi();
    render();
  }, [render, syncUi, tick]);

  const move = useCallback(
    (dx: number, dy: number) => {
      const g = gameRef.current;
      if (g.status !== "playing" || !g.current) return false;
      if (!collide(g.grid, g.current, dx, dy)) {
        g.current = { ...g.current, x: g.current.x + dx, y: g.current.y + dy };
        render();
        return true;
      }
      return false;
    },
    [render],
  );

  const softDrop = useCallback(() => {
    if (!move(0, 1)) return;
    gameRef.current.score += 1;
    lastDropRef.current = performance.now();
    syncUi();
    render();
  }, [move, render, syncUi]);

  const hardDrop = useCallback(() => {
    const g = gameRef.current;
    if (g.status !== "playing" || !g.current) return;
    const distance = hardDropDistance(g.grid, g.current);
    if (distance <= 0) return;
    g.current = { ...g.current, y: g.current.y + distance };
    g.score += distance * 2;
    lastDropRef.current = performance.now();
    syncUi();
    lockPiece();
  }, [lockPiece, syncUi]);

  const rotate = useCallback(() => {
    const g = gameRef.current;
    if (g.status !== "playing" || !g.current) return;
    const rotated = tryRotate(g.grid, g.current);
    if (rotated) {
      g.current = rotated;
      render();
    }
  }, [render]);

  const handleAction = useCallback(
    (action: GameAction) => {
      const g = gameRef.current;
      switch (action) {
        case "left":
          move(-1, 0);
          break;
        case "right":
          move(1, 0);
          break;
        case "down":
          softDrop();
          break;
        case "rotate":
          rotate();
          break;
        case "drop":
          hardDrop();
          break;
        case "pause":
          if (g.status === "playing" || g.status === "paused") togglePause();
          break;
        case "restart":
          startGame();
          break;
      }
    },
    [hardDrop, move, rotate, softDrop, startGame, togglePause],
  );

  useEffect(() => {
    fetch("/api/game/best-score")
      .then((r) => r.json())
      .then((d: { bestScore: number }) => setBestScore(d.bestScore))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "p" || e.key === "P") {
        handleAction("pause");
        return;
      }
      if (gameRef.current.status !== "playing") return;
      if (e.key === "ArrowLeft") handleAction("left");
      else if (e.key === "ArrowRight") handleAction("right");
      else if (e.key === "ArrowDown") handleAction("down");
      else if (e.key === "ArrowUp" || e.key === " ") handleAction("rotate");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleAction]);

  useEffect(() => {
    const onHide = () => {
      if (document.hidden && gameRef.current.status === "playing") togglePause();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [togglePause]);

  const bindRepeat = useCallback(
    (action: GameAction, el: HTMLElement) => {
      const stop = () => {
        const timer = touchRepeats.current.get(action);
        if (timer) clearInterval(timer);
        touchRepeats.current.delete(action);
        el.classList.remove("scale-95");
      };

      const start = (e: Event) => {
        e.preventDefault();
        el.classList.add("scale-95");
        handleAction(action);
        if (!["left", "right", "down"].includes(action)) return;
        stop();
        const timer = setInterval(() => {
          if (gameRef.current.status !== "playing") {
            stop();
            return;
          }
          handleAction(action);
        }, 90);
        touchRepeats.current.set(action, timer);
      };

      el.addEventListener("pointerdown", start);
      el.addEventListener("pointerup", stop);
      el.addEventListener("pointerleave", stop);
      el.addEventListener("pointercancel", stop);

      return () => {
        stop();
        el.removeEventListener("pointerdown", start);
        el.removeEventListener("pointerup", stop);
        el.removeEventListener("pointerleave", stop);
        el.removeEventListener("pointercancel", stop);
      };
    },
    [handleAction],
  );

  return {
    status,
    score,
    lines,
    level,
    nextType,
    bestScore,
    isNewBest,
    flash,
    lineProgress: lines % 10,
    startGame,
    togglePause,
    handleAction,
    bindRepeat,
    render,
  };
}
