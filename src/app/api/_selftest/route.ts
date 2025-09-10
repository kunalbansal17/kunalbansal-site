// src/app/api/_selftest/route.ts
import { NextResponse } from "next/server";
import {
  saveLink,
  getLink,
  recordClick,
  getClicks,
  codeExists,
} from "../../../lib/db";

// SELF-TESTS:
//  - test1: save/read link
//  - test2: click increments
//  - test3: codeExists after save
//  - test4: invalid custom code regex behaviour
//  - test5: missing link lookup returns undefined

function assert(cond: boolean, message: string) {
  if (!cond) throw new Error(message);
}

export async function GET() {
  try {
    const results: { name: string; ok: boolean }[] = [];

    // test1: save/read
    const code = "test123";
    const url = "https://example.com/ok";
    if (!codeExists(code)) saveLink({ code, url, createdAt: Date.now(), meta: {} });
    const fetched = getLink(code);
    assert(!!fetched && fetched.url === url, "Link save/read failed");
    results.push({ name: "save/read", ok: true });

    // test2: click increments
    const before = getClicks(code).length;
    recordClick({ code, ts: Date.now(), referrer: "unit", ua: "jestless", ip: "127.0.0.1" });
    const after = getClicks(code).length;
    assert(after === before + 1, "Click record failed");
    results.push({ name: "click increment", ok: true });

    // test3: codeExists
    assert(codeExists(code) === true, "codeExists should return true after save");
    results.push({ name: "codeExists true after save", ok: true });

    // test4: regex
    const invalids = ["a", "!!", "sp ace", "xx", "this-code-is-way-too-long-over-32-chars________"];
    const valids = ["abc", "AB_12", "good-code", "hello_world", "XYZ123"];
    const re = /^[a-zA-Z0-9_-]{3,32}$/;
    assert(invalids.every((v) => !re.test(v)), "regex should reject invalid examples");
    assert(valids.every((v) => re.test(v)), "regex should accept valid examples");
    results.push({ name: "custom code regex", ok: true });

    // test5: getLink for missing
    const none = getLink("does-not-exist-xyz");
    assert(typeof none === "undefined", "getLink should return undefined for missing code");
    results.push({ name: "getLink missing returns undefined", ok: true });

    return NextResponse.json({ ok: true, results });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Self-tests failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
