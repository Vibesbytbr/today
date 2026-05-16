"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { History } from "lucide-react";

export function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-40 bg-warm-50/80 backdrop-blur-md border-b border-warm-100">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-light tracking-wider text-warm-800 hover:text-warm-900 transition-colors"
        >
          Today
        </Link>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link
              href="/history"
              className="flex items-center gap-1.5 text-sm text-warm-500 hover:text-warm-700 transition-colors"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm text-warm-500 hover:text-warm-700 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
