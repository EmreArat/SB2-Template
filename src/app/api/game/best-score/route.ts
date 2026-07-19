import { cookies } from "next/headers";

const COOKIE_NAME = "blok_best_score";

export async function GET() {
  const cookieStore = await cookies();
  const bestScore = Number(cookieStore.get(COOKIE_NAME)?.value ?? 0);

  return Response.json({ bestScore });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { score?: number };
  const score = Number(body.score ?? 0);

  if (!Number.isFinite(score) || score < 0) {
    return Response.json({ error: "Geçersiz skor" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const current = Number(cookieStore.get(COOKIE_NAME)?.value ?? 0);
  const bestScore = Math.max(current, score);
  const isNewBest = score > current;

  cookieStore.set(COOKIE_NAME, String(bestScore), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return Response.json({ bestScore, isNewBest });
}
