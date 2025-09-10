// src/lib/db.ts
export type Link = {
  code: string;
  url: string;
  createdAt: number;
  meta?: { title?: string; summary?: string; tags?: string[] };
};

export type Click = {
  code: string;
  ts: number;
  referrer?: string;
  ua?: string;
  ip?: string;
};

type DB = { links: Record<string, Link>; clicks: Record<string, Click[]> };

// Augment globalThis with our DB cache in a type-safe way
type GlobalWithDB = typeof globalThis & { __SHORTURL_DB__?: DB };

const g = globalThis as GlobalWithDB;
if (!g.__SHORTURL_DB__) {
  g.__SHORTURL_DB__ = { links: {}, clicks: {} };
}
const globalDB = g.__SHORTURL_DB__ as DB;

export function saveLink(link: Link) {
  globalDB.links[link.code] = link;
  if (!globalDB.clicks[link.code]) globalDB.clicks[link.code] = [];
}
export function getLink(code: string) {
  return globalDB.links[code];
}
export function recordClick(click: Click) {
  if (!globalDB.clicks[click.code]) globalDB.clicks[click.code] = [];
  globalDB.clicks[click.code].push(click);
}
export function listLinks() {
  return Object.values(globalDB.links).sort((a, b) => b.createdAt - a.createdAt);
}
export function getClicks(code: string) {
  return globalDB.clicks[code] || [];
}
export function codeExists(code: string) {
  return !!globalDB.links[code];
}
