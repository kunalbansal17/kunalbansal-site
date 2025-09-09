import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kunal Bansal — Product, AI & AgriTech",
  description: "Portfolio of Kunal Bansal: hands-on product builder in AI & agri.",
  metadataBase: new URL("https://kunalbansal.in"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kunal Bansal",
    description: "Product + AI + AgriTech",
    url: "https://kunalbansal.in",
    siteName: "Kunal Bansal",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Kunal Bansal" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
