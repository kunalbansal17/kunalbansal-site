// src/app/r/[code]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getLink, recordClick } from "../../../lib/db";

// Next.js expects context.params to be a Promise<{ code: string }>
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params; // await because it's a Promise in type defs
  const link = getLink(code);
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const forwarded = (req.headers.get("x-forwarded-for") || "")
      .split(",")[0]
      .trim();
    const ip = forwarded || "";
    recordClick({
      code,
      ts: Date.now(),
      referrer: req.headers.get("referer") || "",
      ua: req.headers.get("user-agent") || "",
      ip,
    });
  } catch {
    // ignore logging errors
  }

  // 307 = temporary redirect (switch to 301 for permanent if you want)
  return NextResponse.redirect(link.url, 307);
}
