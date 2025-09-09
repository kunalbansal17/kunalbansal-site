"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-medium">Kunal Bansal</Link>
        <nav className="flex items-center gap-4 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`hover:underline ${active ? "text-gray-900" : "text-gray-600"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
