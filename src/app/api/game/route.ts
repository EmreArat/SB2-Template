import { gameConfig } from "@/lib/tetris/config";

export async function GET() {
  return Response.json(gameConfig);
}
