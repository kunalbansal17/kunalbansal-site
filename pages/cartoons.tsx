import { cartoons } from "../data/cartoons";

export default function Cartoons() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Cartoons</h1>
      <ul className="mt-6 space-y-4">
        {cartoons.map((c, idx) => (
          <li key={idx}>
            <a href={c.link} className="underline">{c.title}</a> — {c.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
