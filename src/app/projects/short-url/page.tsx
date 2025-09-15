// src/app/projects/short-url/page.tsx
"use client";
import { useEffect, useState } from "react";
import Head from "next/head";

type LinkRow = { code: string; url: string; createdAt: number; clicks: number };

export default function ShortURLPage() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkRow[]>([]);

  async function refresh() {
    const r = await fetch("/api/links");
    const j = (await r.json()) as { links?: LinkRow[] };
    setLinks(j.links || []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onShorten(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setBusy(true);
    setCreated(null);
    try {
      const r = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, custom }),
      });
      const j = (await r.json()) as { code?: string; error?: string };
      if (!r.ok) throw new Error(j.error || "Failed");
      setCreated(j.code ?? null);
      setUrl("");
      setCustom("");
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    } finally {
      setBusy(false);
    }
  }

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://kunalbansal-site.vercel.app";
  const shortUrl = created ? `${origin}/r/${created}` : "";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>ShortURL — Minimal</title>
      </Head>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Shorten. Track. Learn.</h1>
        <p className="mt-2 text-gray-600">Create short links with real-time tracking. Minimal and fast.</p>

        <section className="mt-8 rounded-2xl border border-gray-200 p-5 shadow-sm">
          <form onSubmit={onShorten} className="space-y-3">
            <label className="block text-sm font-medium">Paste a long URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/your/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
            />

            <details className="rounded-lg bg-gray-50 p-3">
              <summary className="cursor-pointer text-sm font-medium">Advanced</summary>
              <div className="mt-3 space-y-1">
                <label className="block text-sm font-medium">Custom alias (optional)</label>
                <input
                  type="text"
                  placeholder="yourname"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500">
                  Your short link will look like{" "}
                  <span className="font-mono">{origin}/r/yourname</span>. Use 3–32 letters, numbers, dashes, or underscores.
                </p>
              </div>
            </details>

            <div className="flex items-end pt-1">
              <button
                disabled={busy}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-white disabled:opacity-60"
              >
                {busy ? "Creating…" : "Shorten URL"}
              </button>
            </div>
          </form>

          {created && (
            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm text-gray-500">Your short link</div>
                  <div className="font-mono text-lg">{shortUrl}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => shortUrl && navigator.clipboard.writeText(shortUrl)}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    Copy
                  </button>
                  <a
                    href={shortUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white"
                  >
                    Open
                  </a>
                </div>
              </div>

              {/* QR preview + download */}
              <div className="mt-4 grid gap-3 sm:grid-cols-[auto,1fr] sm:items-start">
                <div className="rounded-xl border border-gray-200 p-3 bg-white">
                  {/* ~256px inline preview; full 512px available for download */}
                  <img
                    src={`/api/qrcode?text=${encodeURIComponent(shortUrl)}&w=256`}
                    alt="QR code for short URL"
                    width={256}
                    height={256}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium text-gray-800 mb-2">QR code for this link</div>
                  <p className="mb-3">Scan to open the short URL. You can also download a high-resolution PNG.</p>
                  <div className="flex gap-2">
                    <a
                      className="rounded-lg border border-gray-300 px-3 py-1.5"
                      href={`/api/qrcode?text=${encodeURIComponent(shortUrl)}&w=512&download=1`}
                      download={`qr-${created}.png`}
                    >
                      Download PNG
                    </a>
                    {/* Optional: Copy image — modern browsers need canvas or ClipboardItem; can add later */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Recent links (unchanged) */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Recent links</h2>
          <div className="mt-4 grid gap-3">
            {links.length === 0 && (
              <p className="text-sm text-gray-500">No links yet. Create one above to see it here.</p>
            )}
            {links.map((l) => (
              <div key={l.code} className="rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Short</div>
                    <a
                      className="font-mono text-lg text-gray-900 hover:underline"
                      href={`/r/${l.code}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {origin}/r/{l.code}
                    </a>
                    <div className="mt-1 text-sm text-gray-500 break-all">
                      <span className="text-gray-500">→</span> {l.url}
                    </div>
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
      </main>
    </div>
  );
}
