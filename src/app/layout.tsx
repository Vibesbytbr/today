import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Today — Daily scripture-inspired direction",
  description:
    "A calm daily prompt rooted in scripture. One action. One verse. One day at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-warm-50 text-warm-950 antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
