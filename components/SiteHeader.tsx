import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"], // bold
});

export default function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className={`${dancing.className} text-2xl text-gray-600`}
        >
          Kunal Bansal
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/posts" className="hover:underline">Posts</Link>
 {/*}         <Link href="/cartoons" className="hover:underline">Cartoons</Link>
          <Link href="/resume" className="hover:underline">Resume</Link>
  */}        <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
