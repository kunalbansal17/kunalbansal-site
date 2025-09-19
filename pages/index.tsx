export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-bold">Kunal Bansal</h1>
      <p className="mt-4 text-lg text-gray-700">
        Product + AI + AgriTech — building practical tools and stories.
      </p>
      <div className="mt-8 flex gap-4">
        <a href="/projects" className="underline">Projects</a>
        <a href="/posts" className="underline">Posts</a>
        <a href="/cartoons" className="underline">Cartoons</a>
        <a href="/resume" className="underline">Resume</a>
        <a href="/contact" className="underline">Contact</a>
      </div>
    </section>
  );
}
