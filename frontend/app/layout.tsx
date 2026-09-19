import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwarnLanka AI | Civic Intelligence",
  description: "AI-powered civic intelligence platform - Turning citizen reports into intelligent action",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fffbf0]">
        <nav className="sticky top-0 z-50 glass border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-white font-bold text-lg">S</div>
              <div>
                <div className="font-bold leading-none">SwarnLanka AI</div>
                <div className="text-xs text-stone-500">Civic Intelligence</div>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/report" className="px-4 py-2 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-black transition">Report Issue</Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-full border text-sm font-medium hover:bg-white transition">Dashboard</Link>
              <Link href="/report" className="hidden sm:block px-3 py-2 text-sm text-stone-600 hover:text-black">Map</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-white/60 mt-12">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-sm text-stone-500">
            <span>Built for Hack Devengers 2.0 - 24H Open Innovation</span>
            <span>SwarnLanka AI - Turning Reports into Action</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
