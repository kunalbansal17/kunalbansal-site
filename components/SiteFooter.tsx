export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-gray-500">
        © {year} Kunal Bansal · Built with Next.js + Vibe Coding ☺
      </div>
    </footer>
  );
}
