// ============================
// FILE: app/api/qrcode/route.ts  (Phase 2 scaffold)
// ============================
import { NextResponse } from 'next/server';
// Enable later: npm i qrcode
// import QRCode from 'qrcode';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });
  // const png = await QRCode.toBuffer(text, { width: 512, margin: 1 });
  // return new NextResponse(png, { headers: { 'Content-Type': 'image/png' } });
  return NextResponse.json({ note: 'Install qrcode and uncomment to return PNG', sample: `/api/qrcode?text=${encodeURIComponent(text)}` });
}