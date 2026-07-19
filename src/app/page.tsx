import { TetrisApp } from "@/components/game/TetrisApp";
import { gameConfig } from "@/lib/tetris/config";

export default function Home() {
  return <TetrisApp config={gameConfig} />;
}
