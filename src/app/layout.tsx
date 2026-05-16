import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { SessionProvider } from "@/components/session-provider";
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
      <body className="min-h-screen">
        <SessionProvider>
          <Nav />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
