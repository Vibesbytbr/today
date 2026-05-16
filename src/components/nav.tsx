"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { History } from "lucide-react";

export function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-warm-50/70 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-light tracking-wider text-warm-600 hover:text-warm-800 transition-colors"
        >
          Today
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <Link
              href="/history"
              className="flex items-center gap-1.5 text-sm text-warm-400 hover:text-warm-600 transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span className="text-xs">History</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm text-warm-400 hover:text-warm-600 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
