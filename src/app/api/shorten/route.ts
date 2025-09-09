// ============================
// FILE: app/api/shorten/route.ts
// ============================
import { NextResponse } from 'next/server';
import { saveLink, codeExists } from '@/lib/db';

function genCode(len = 6) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = body?.url as string | undefined;
    const custom = (body?.custom as string | undefined) || '';

    if (!url || typeof url !== 'string') return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    let code = custom.trim();
    if (code) {
      if (!/^[a-zA-Z0-9_-]{3,32}$/.test(code)) return NextResponse.json({ error: 'Invalid custom code' }, { status: 400 });
      if (codeExists(code)) return NextResponse.json({ error: 'Custom code already in use' }, { status: 409 });
    } else {
      let tries = 0;
      do { code = genCode(6); tries++; } while (codeExists(code) && tries < 5);
      if (codeExists(code)) return NextResponse.json({ error: 'Could not allocate code' }, { status: 500 });
    }

    saveLink({ code, url, createdAt: Date.now(), meta: {} });
    return NextResponse.json({ code }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
