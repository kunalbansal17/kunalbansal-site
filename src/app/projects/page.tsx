// src/app/projects/page.tsx
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Dhoorvi",
      description:
        "D2C sustainable brand offering natural and eco-friendly wellness products.",
      href: "https://dhoorvi.com", // replace with your actual link if different
    },
    {
      title: "AgriKunba",
      description:
        "Agri-tech ecosystem with AI tools like KrishiGPT, price dashboards, and supply-chain solutions.",
      href: "https://agrikunba.com", // replace with your actual link if different
    },
    {
      title: "Short URL Service",
      description:
        "Minimal short URL generator with tracking, built hands-on with Next.js.",
      href: "/projects/short-url",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <li
              key={p.href}
              className="rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{p.description}</p>
              <Link
                href={p.href}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Visit →
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
