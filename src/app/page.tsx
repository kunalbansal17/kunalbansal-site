import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Kunal Bansal</h1>
      <p className="mt-4 text-lg text-gray-700">
        Product + AI + AgriTech — I build hands-on tools (KrishiGPT, pricing dashboards) and D2C brand experiments.
      </p>

      <div className="mt-8 flex gap-3">
        <Link href="/projects" className="rounded-xl border px-4 py-2 hover:bg-gray-50">View Projects</Link>
        <Link href="/writing" className="rounded-xl border px-4 py-2 hover:bg-gray-50">Read Writing</Link>
      </div>
    </section>
  );
}