import Link from "next/link";
import type { Project } from "@/data/projects";

type LinkItem = NonNullable<Project["links"]>[number];

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-xl border p-4 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        {p.year && <span className="text-xs text-gray-500">{p.year}</span>}
      </div>
      <p className="mt-1 text-sm text-gray-600">{p.tagline}</p>
      {p.links && p.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.links.map((l: LinkItem) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              className="text-sm underline"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
