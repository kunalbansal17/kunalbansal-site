// ============================
// FILE: app/projects/short-url/page.tsx  (Client UI — minimal, no header/footer)
// ============================
'use client';
import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';

export default function ShortURLPage() {
  const [url, setUrl] = useState('');
  const [custom, setCustom] = useState('');
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [links, setLinks] = useState<{ code: string; url: string; createdAt: number; clicks: number }[]>([]);

  async function refresh() {
    const r = await fetch('/api/links');
    const j = await r.json();
    setLinks(j.links || []);
  }

  useEffect(() => { refresh(); }, []);

  async function onShorten(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setBusy(true); setCreated(null);
    try {
      const r = await fetch('/api/shorten', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, custom }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Failed');
      setCreated(j.code); setUrl(''); setCustom('');
      refresh();
    } catch (err: any) { alert(err.message); }
    finally { setBusy(false); }
  }

  const lastCreatedUrl = created ? `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${created}` : '';

  // very light fake chart data for demo look (optional)
  const chartData = useMemo(() => {
    if (links.length === 0) return [] as { day: string; clicks: number }[];
    const l = links[0];
    const days = 10; const now = Date.now();
    return Array.from({ length: days }, (_, i) => ({
      day: new Date(now - (days - i) * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      clicks: Math.max(0, Math.round((l.clicks || 0) / days) + (Math.random() * 4 - 2)),
    }));
  }, [links]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head><title>ShortURL — Minimal</title></Head>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Shorten. Track. Learn.</h1>
        <p className="mt-2 text-gray-600">Create short links with real‑time tracking. Minimal and fast.</p>

        <section className="mt-8 rounded-2xl border border-gray-200 p-5 shadow-sm">
          <form onSubmit={onShorten} className="space-y-3">
            <label className="block text-sm font-medium">Destination URL</label>
            <input type="url" required placeholder="https://example.com/your/long/url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Custom code (optional)</label>
                <input type="text" placeholder="e.g. turmeric" value={custom} onChange={(e) => setCustom(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none" />
              </div>
              <div className="flex items-end">
                <button disabled={busy} className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-white disabled:opacity-60">{busy ? 'Creating…' : 'Shorten URL'}</button>
              </div>
            </div>
          </form>

          {created && (
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-gray-500">Your short link</div>
                  <div className="font-mono text-lg">{lastCreatedUrl}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigator.clipboard.writeText(lastCreatedUrl)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm">Copy</button>
                  <a href={lastCreatedUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white">Open</a>
                </div>
              </div>
              <p className="mt-2 text-gray-500">Phase 2 (QR): call <span className="font-mono">/api/qrcode?text={encodeURIComponent(lastCreatedUrl)}</span></p>
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Recent links</h2>
          <div className="mt-4 grid gap-3">
            {links.length === 0 && (<p className="text-sm text-gray-500">No links yet. Create one above to see it here.</p>)}
            {links.map((l) => (
              <div key={l.code} className="rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Short</div>
                    <a className="font-mono text-lg text-gray-900 hover:underline" href={`/r/${l.code}`} target="_blank" rel="noreferrer">{typeof window !== 'undefined' ? window.location.origin : ''}/r/{l.code}</a>
                    <div className="mt-1 text-sm text-gray-500 break-all"><span className="text-gray-500">→</span> {l.url}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold">{l.clicks}</div>
                    <div className="text-xs text-gray-500">clicks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Daily clicks (demo)</h2>
          <div className="mt-4 h-64 w-full rounded-2xl border border-gray-200 p-3">
            <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
              (Placeholder mini‑chart) — real aggregation when you add DB.
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Note: For MVP, clicks aggregate is basic. Replace with real aggregation later.</p>
        </section>
      </main>
    </div>
  );
}
