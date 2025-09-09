// ============================
// FILE: app/api/clicks/route.ts
// ============================
import { NextResponse } from 'next/server';
import { getClicks } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || '';
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  const clicks = getClicks(code);
  return NextResponse.json({ code, total: clicks.length, clicks });
}
