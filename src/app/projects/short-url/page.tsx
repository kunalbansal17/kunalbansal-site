// src/app/projects/short-url/page.tsx
"use client";
import { useEffect, useState } from "react";

type LinkRow = { code: string; url: string; createdAt: number; clicks: number };

function normalizeUrl(raw: string): string {
  const s = raw.trim();
  if (!s) return s;
  if (!/^https?:\/\//i.test(s)) return `https://${s.replace(/^\/\//, "")}`;
  return s;
}
function isValidAbsoluteHttpUrl(u: string): boolean {
  try {
    const x = new URL(u);
    return x.protocol === "http:" || x.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ShortURLPage() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [origin, setOrigin] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [urlErr, setUrlErr] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
    void refresh();
  }, []);

  async function refresh() {
    const r = await fetch("/api/links");
    const j = (await r.json()) as { links?: LinkRow[] };
    setLinks(j.links || []);
  }

  function onUrlChange(v: string) {
    setUrl(v);
    setUrlErr("");
  }

  async function onShorten(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;

    const normalized = normalizeUrl(url);
    if (!isValidAbsoluteHttpUrl(normalized)) {
      setUrlErr("Please enter a valid URL (e.g., example.com or https://example.com)");
      return;
    }

    setBusy(true);
    setCreated(null);
    try {
      const r = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized, custom }),
      });
      const j = (await r.json()) as { code?: string; error?: string };
      if (!r.ok) throw new Error(j.error || "Failed");
      setCreated(j.code ?? null);
      setUrl("");
      setCustom("");
      setUrlErr("");
      void refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    } finally {
      setBusy(false);
    }
  }

  const shortUrl = created && origin ? `${origin}/r/${created}` : "";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          URL Shortener | QR Code Generator
        </h1>
        <p className="mt-2 text-gray-600">
          Create short links with real-time tracking. Minimal and Fast.
        </p>

        <section className="mt-8 rounded-2xl border border-gray-200 p-5 shadow-sm">
          <form onSubmit={onShorten} className="space-y-3">
            <label className="block text-sm font-medium">Paste a long URL</label>
            <input
              type="text"
              inputMode="url"
              required
              placeholder="example.com/your long url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 transition
                         hover:bg-gray-50 focus:bg-gray-50 focus:border-gray-500 focus:outline-none"
            />
            {urlErr && <p className="text-xs text-red-600">{urlErr}</p>}

            <details className="rounded-lg bg-gray-50 p-3">
              <summary className="cursor-pointer text-sm font-medium">Advanced</summary>
              <div className="mt-3 space-y-1">
                <label className="block text-sm font-medium">Custom alias (optional)</label>
                <input
                  type="text"
                  placeholder="dhoorvi"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 transition
                             hover:bg-gray-50 focus:bg-gray-50 focus:border-gray-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500">
                  Your short link will look like{" "}
                  <span className="font-mono">
                    {mounted && origin ? `${origin}/r/dhoorvi` : `/r/dhoorvi`}
                  </span>
                </p>
              </div>
            </details>

            <div className="flex items-end pt-1">
              <button
                disabled={busy}
                className="inline-flex w-full items-center justify-center rounded-xl
                           bg-gray-900 px-4 py-2 text-white transition
                           hover:bg-gray-800 active:bg-gray-950 active:scale-[.99]
                           disabled:opacity-60 cursor-pointer"  // ← ensures hand cursor
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
                  <div className="font-mono text-lg">
                    {mounted && origin ? shortUrl : `/r/${created}`}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => shortUrl && navigator.clipboard.writeText(shortUrl)}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm transition
                               hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
                    disabled={!shortUrl}
                  >
                    Copy
                  </button>
                  <a
                    href={shortUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white transition
                               hover:bg-gray-800 active:bg-gray-950 cursor-pointer"
                  >
                    Open
                  </a>
                </div>
              </div>

              {/* QR preview + download: responsive layout */}
              {mounted && origin && shortUrl && (
                <div className="mt-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <img
                      src={`/api/qrcode?text=${encodeURIComponent(shortUrl)}&w=200`}
                      alt="QR code for short URL"
                      width={200}
                      height={200}
                      className="block"
                    />
                    <div className="flex flex-col items-stretch gap-2">
                      <div className="text-sm font-medium text-gray-800">QR code</div>
                      <p className="text-xs text-gray-500">
                        Download high-resolution PNG for sharing or print.
                      </p>
                      <a
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-center transition
                                   hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
                        href={`/api/qrcode?text=${encodeURIComponent(shortUrl)}&w=512&download=1`}
                        download={`qr-${created}.png`}
                      >
                        Download PNG
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Recent links */}
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
                    <div className="text-sm text-gray-500">Short URL</div>
                    <a
                      className="font-mono text-lg text-gray-900 hover:underline cursor-pointer"
                      href={`/r/${l.code}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {mounted && origin ? `${origin}/r/${l.code}` : `/r/${l.code}`}
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
