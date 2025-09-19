import { posts } from "../data/posts";

export default function Posts() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Posts</h1>
      <ul className="mt-6 space-y-4">
        {posts.map((p, idx) => (
          <li key={idx}>
            <a href={p.link} className="underline">{p.title}</a> — {p.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
