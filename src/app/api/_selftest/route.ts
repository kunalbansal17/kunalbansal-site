// ============================
// FILE: app/api/_selftest/route.ts
// ============================
import { NextResponse } from 'next/server';
import { saveLink, getLink, recordClick, getClicks, codeExists } from '@/lib/db';

export async function GET() {
  try {
    const code = 'test123';
    const url = 'https://example.com/ok';
    if (!codeExists(code)) saveLink({ code, url, createdAt: Date.now(), meta: {} });
    const fetched = getLink(code);
    if (!fetched || fetched.url !== url) throw new Error('Link save/read failed');
    const before = getClicks(code).length;
    recordClick({ code, ts: Date.now(), referrer: 'unit', ua: 'jestless', ip: '127.0.0.1' });
    const after = getClicks(code).length;
    if (after !== before + 1) throw new Error('Click record failed');
    return NextResponse.json({ ok: true, message: 'Self-tests passed', code, url, clicksBefore: before, clicksAfter: after });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Self-tests failed' }, { status: 500 });
  }
}