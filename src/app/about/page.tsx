// src/app/about/page.tsx
export const metadata = {
  title: "About — Kunal Bansal",
  description: "About Kunal Bansal and this site.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-gray-700 leading-relaxed">
          Hi, I’m Kunal. This site is a home for my hands-on projects and experiments.
          Check out the{" "}
          <a className="text-blue-600 hover:underline" href="/projects">
            Projects
          </a>{" "}
          page to see what I’m building.
        </p>
      </main>
    </div>
  );
}
