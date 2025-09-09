// ============================
// FILE: app/r/[code]/route.ts  (Redirect + click tracking)
// ============================
import { NextResponse } from 'next/server';
import { getLink, recordClick } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { code: string } }) {
  const code = params.code || '';
  const link = getLink(code);
  if (!link) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // best-effort click logging
  try {
    const forwarded = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
    const ip = forwarded || '';
    recordClick({ code, ts: Date.now(), referrer: req.headers.get('referer') || '', ua: req.headers.get('user-agent') || '', ip });
  } catch {}

  // 307 temporary by default; switch to 301 if you want permanent
  return NextResponse.redirect(link.url, 307);
}