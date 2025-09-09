// ============================
// FILE: app/api/links/route.ts
// ============================
import { NextResponse } from 'next/server';
import { listLinks, getClicks } from '@/lib/db';

export async function GET() {
  const links = listLinks().map((l) => ({ code: l.code, url: l.url, createdAt: l.createdAt, clicks: getClicks(l.code).length }));
  return NextResponse.json({ links });
}
