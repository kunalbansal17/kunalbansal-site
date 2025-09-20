import { posts } from "../data/posts";

export default function Posts() {
  return (
    <section>
      <h1 className="text-3xl font-semibold mb-4">Posts</h1>
      <p className="text-gray-700 mb-8">
        A collection of my thoughts, essays, and notes on product, AI, and life in general.
      </p>

      <ul className="space-y-6">
        {posts.map((post, idx) => (
          <li key={idx}>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <a
              href={post.link}
              className="text-xl font-medium text-blue-600 hover:underline"
             
              rel="noopener noreferrer"
            >
              {post.title}
            </a>
            
            <p className="mt-1 text-gray-600 text-sm">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
