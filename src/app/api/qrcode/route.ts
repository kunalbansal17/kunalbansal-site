// src/app/api/qrcode/route.ts
import { NextResponse } from "next/server";
import QRCode from "qrcode";

// Use Node runtime because we return a Buffer
export const runtime = "nodejs";

// GET /api/qrcode?text=<short-url>&w=512&download=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text");
    const widthParam = searchParams.get("w");
    const download = searchParams.get("download") === "1";

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // Basic sanity: only allow absolute http(s) URLs (optional but nice)
    try {
      const u = new URL(text);
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const width = Math.min(Math.max(Number(widthParam || 512), 128), 1024);

    const png = await QRCode.toBuffer(text, {
      width,
      margin: 1,
      errorCorrectionLevel: "M",
    });

    const headers = new Headers({
      "Content-Type": "image/png",
      // Cache for a year; content is deterministic for a given text
      "Cache-Control": "public, max-age=31536000, immutable",
    });

    if (download) {
      // Derive a safe filename
      const fileSafe = text.replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 40) || "qr";
      headers.set("Content-Disposition", `attachment; filename="${fileSafe}.png"`);
    }

    return new NextResponse(png, { headers });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "QR generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
