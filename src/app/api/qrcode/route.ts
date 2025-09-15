// src/app/api/qrcode/route.ts
import { NextResponse } from "next/server";
import { toBuffer } from "qrcode";

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

    // Only allow absolute http(s) URLs
    try {
      const u = new URL(text);
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const width = Math.min(Math.max(Number(widthParam || 512), 128), 1024);

    // Generate PNG as a Buffer/Uint8Array
    const bytes = await toBuffer(text, {
      width,
      margin: 1,
      errorCorrectionLevel: "M",
    });

    // ✅ Create a NEW ArrayBuffer and copy bytes — avoids ArrayBufferLike/SharedArrayBuffer unions
    const ab = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(ab).set(bytes as Uint8Array); // Buffer is a Uint8Array subclass; cast is safe

    const headers = new Headers({
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    });

    if (download) {
      const fileSafe = text.replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 40) || "qr";
      headers.set("Content-Disposition", `attachment; filename="${fileSafe}.png"`);
    }

    // Response accepts ArrayBuffer — TS clean
    return new Response(ab, { headers });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "QR generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
