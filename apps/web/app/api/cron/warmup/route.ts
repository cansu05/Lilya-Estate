import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WARMUP_TIMEOUT_MS = 7000;

function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

async function ping(url: string) {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    signal: AbortSignal.timeout(WARMUP_TIMEOUT_MS),
  });

  return {
    url,
    ok: res.ok,
    status: res.status,
  };
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const token = getBearerToken(request.headers.get("authorization"));

  if (!cronSecret || token !== cronSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const apiBaseUrl = process.env.API_WARMUP_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!apiBaseUrl) {
    return NextResponse.json(
      { ok: false, error: "API_WARMUP_URL or NEXT_PUBLIC_API_URL is not set" },
      { status: 500 },
    );
  }

  const normalizedBaseUrl = apiBaseUrl.replace(/\/+$/, "");
  const targets = [
    `${normalizedBaseUrl}/health`,
    `${normalizedBaseUrl}/locations/cities`,
    `${normalizedBaseUrl}/listings?page=1&limit=1`,
  ];

  const results = await Promise.allSettled(targets.map((url) => ping(url)));
  const checks = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }

    return {
      url: targets[index],
      ok: false,
      status: 0,
      error: result.reason instanceof Error ? result.reason.message : "Unknown error",
    };
  });

  const allOk = checks.every((item) => item.ok);
  return NextResponse.json(
    {
      ok: allOk,
      warmedAt: new Date().toISOString(),
      checks,
    },
    { status: allOk ? 200 : 500 },
  );
}
