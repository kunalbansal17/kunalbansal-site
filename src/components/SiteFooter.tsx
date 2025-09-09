export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-gray-500">
        © {year} Kunal Bansal · <a className="underline" href="https://github.com/your-github" target="_blank">GitHub</a> ·{" "}
        <a className="underline" href="https://www.linkedin.com/in/your-linkedin" target="_blank">LinkedIn</a>
      </div>
    </footer>
  );
}
