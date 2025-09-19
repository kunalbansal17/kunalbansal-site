import type { AppProps } from "next/app";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-8">
        <Component {...pageProps} />
      </main>
      <SiteFooter />
    </div>
  );
}
