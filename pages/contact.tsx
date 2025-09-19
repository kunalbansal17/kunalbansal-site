export default function Contact() {
  return (
    <section>
      <h1 className="text-3xl font-semibold mb-2">Contact</h1>
      <hr className="border-gray-300 mb-6" />

      <p className="text-gray-700">
        Email:{" "}
        <span className="italic">kunalbansal17@gmail.com</span>
      </p>

      <h2 className="mt-6 text-lg font-medium">My other identities:</h2>
      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
        <li>
          X:{" "}
          <a
            href="https://x.com/hyper_casual"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @hyper_casual
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/kunalbansal17"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            kunalbansal17
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/kunalbansal17"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            kunalbansal17
          </a>
        </li>
        <li>
          Goodreads:{" "}
          <a
            href="https://www.goodreads.com/kunalbansal17"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            kunalbansal17
          </a>
        </li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        I’m always happy to connect about opportunities, collaborations, or ideas.
      </p>
    </section>
  );
}
